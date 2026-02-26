import NextAuth, { AuthOptions, User, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '@/lib/firebase'

const API_URL = process.env.NEXT_PUBLIC_API_URL

interface ExtendedUser extends User {
  role?: string
}

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
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials): Promise<ExtendedUser | null> {
        if (!credentials?.email || !credentials?.password) {
          return null
        }

        try {
          // Use Firebase to authenticate
          const userCredential = await signInWithEmailAndPassword(
            auth,
            credentials.email,
            credentials.password
          )

          const user = userCredential.user

          if (user) {
            return {
              id: user.uid,
              email: user.email!,
              name: user.displayName || user.email!,
              image: user.photoURL,
            }
          }

          return null
        } catch (error: any) {
          console.error('Firebase login error:', error.code, error.message)
          
          // Return user-friendly error messages
          if (error.code === 'auth/wrong-password') {
            throw new Error('Invalid email or password')
          }
          if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with this email')
          }
          if (error.code === 'auth/too-many-requests') {
            throw new Error('Too many failed attempts. Try again later')
          }
          
          throw new Error('Authentication failed')
        }
      }
    })
  ],

  callbacks: {
    async jwt({ token, user, account }: { token: JWT; user: ExtendedUser; account: any }) {
      if (user) {
        token.id = user.id
        token.email = user.email
        token.name = user.name
        token.picture = user.image

        // Send to backend (same as your old code)
        try {
          await axios.post(
            `${API_URL}/jwt`,
            { email: user.email },
            { withCredentials: true }
          )
          console.log('✅ JWT sent to backend')
        } catch (error) {
          console.error('❌ Failed to send JWT to backend:', error)
        }

        // For Google login, also create/update user in backend
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
            console.log('✅ User synced to backend')
          } catch (error) {
            console.error('❌ Failed to sync user to backend:', error)
          }
        }
      }

      return token
    },

    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.email = token.email as string
        session.user.name = token.name as string
        session.user.image = token.picture as string
      }
      return session
    },

    async signIn({ user }: { user: ExtendedUser }) {
      return true // Always allow sign in if Firebase authenticated
    }
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