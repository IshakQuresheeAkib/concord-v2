import NextAuth, { AuthOptions, User, Session, Account } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FirebaseError } from 'firebase/app'
import { auth } from '@/lib/firebase'

const API_URL = process.env.NEXT_PUBLIC_API_URL

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code"
        }
      }
    }),

    // Email/Password (Firebase)
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
        // These fields are used by the signup flow to pass an already-authenticated
        // Firebase session, avoiding a redundant signInWithEmailAndPassword call
        idToken: { label: "ID Token", type: "text" },
        name: { label: "Name", type: "text" },
        image: { label: "Image", type: "text" },
      },
      async authorize(credentials): Promise<User | null> {
        if (!credentials?.email) return null

        // Signup path: Firebase user was just created — use the ID token directly
        // instead of re-authenticating, which would be a redundant round-trip
        if (credentials.idToken) {
          const payload = JSON.parse(
            Buffer.from(credentials.idToken.split('.')[1], 'base64').toString()
          )
          return {
            id: payload.user_id ?? payload.sub,
            email: credentials.email,
            name: credentials.name || credentials.email,
            image: credentials.image || null,
          }
        }

        // Login path: authenticate against Firebase
        if (!credentials.password) return null

        try {
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )

          const user = userCredential.user
          return {
            id: user.uid,
            email: user.email!,
            name: user.displayName || user.email!,
            image: user.photoURL,
          }
        } catch (error) {
          if (error instanceof FirebaseError) {
            console.error('Firebase login error:', error.code, error.message)

            if (error.code === 'auth/invalid-credential') {
              throw new Error('Invalid email or password')
            }
            if (error.code === 'auth/user-not-found') {
              throw new Error('No account found with this email')
            }
            if (error.code === 'auth/too-many-requests') {
              throw new Error('Too many failed attempts. Try again later')
            }
          }

          throw new Error('Authentication failed')
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user: User; account: Account | null }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image

        try {
          await axios.post(
            `${API_URL}/jwt`,
            { email: user.email },
            { withCredentials: true }
          )
        } catch (error) {
          console.error('Failed to send JWT to backend:', error)
        }

        if (account?.provider === 'google') {
          try {
            await axios.post(
              `${API_URL}/users`,
              {
                name: user.name,
                email: user.email
              },
              { withCredentials: true }
            )
          } catch (error) {
            console.error('Failed to sync user to backend:', error)
          }
        }
      }

      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
      }
      return session
    },
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
