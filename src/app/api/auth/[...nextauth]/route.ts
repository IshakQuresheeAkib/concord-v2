import NextAuth, { AuthOptions, User, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import axios from 'axios'
import { JWT } from 'next-auth/jwt'

// Backend API base URL
const API_URL = process.env.NEXT_PUBLIC_API_URL

// Extended user interface
interface ExtendedUser extends User {
  role?: string
}

// Backend response types
interface BackendLoginResponse {
  user: {
    _id: string
    email: string
    name: string
    role: string
    photoURL?: string
  }
}

interface BackendSignupResponse {
  user: {
    _id: string
    email: string
    name: string
    role: string
  }
}

// NextAuth configuration
export const authOptions: AuthOptions = {
  providers: [
    // Google Provider (replaces googleLogIn from AuthProvider)
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

    // Credentials Provider (replaces logIn from AuthProvider)
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
          // Call your Express backend (same as AuthProvider did)
          const response = await axios.post<BackendLoginResponse>(
            `${API_URL}/api/auth/login`,
            {
              email: credentials.email,
              password: credentials.password
            },
            { withCredentials: true }
          )

          if (response.data.user) {
            return {
              id: response.data.user._id,
              email: response.data.user.email,
              name: response.data.user.name,
              image: response.data.user.photoURL,
              role: response.data.user.role,
            }
          }

          return null
        } catch (error) {
          console.error('Login error:', error)
          return null
        }
      }
    })
  ],

  callbacks: {
    // JWT callback (manages token)
    async jwt({ token, user, account }: { token: JWT; user: ExtendedUser; account: any }) {
      // Initial sign in
      if (user) {
        token.id = user.id
        token.role = user.role
        token.email = user.email
        token.name = user.name

        // If Google login, send to backend
        if (account?.provider === 'google') {
          try {
            await axios.post(
              `${API_URL}/jwt`,
              { email: user.email },
              { withCredentials: true }
            )
          } catch (error) {
            console.error('JWT error:', error)
          }
        }
      }

      return token
    },

    // Session callback (what client receives)
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as ExtendedUser).role = token.role as string
        session.user.email = token.email as string
        session.user.name = token.name as string
      }
      return session
    },

    // Sign in callback
    async signIn({ user, account }: { user: ExtendedUser; account: any }) {
      // For Google sign in, create/update user in your backend
      if (account?.provider === 'google') {
        try {
          // Send user data to your Express backend
          await axios.post<BackendSignupResponse>(
            `${API_URL}/api/auth/google-login`,
            {
              email: user.email,
              name: user.name,
              photoURL: user.image
            },
            { withCredentials: true }
          )
        } catch (error) {
          console.error('Google sign in error:', error)
          return false
        }
      }
      return true
    }
  },

  pages: {
    signIn: '/login',
    error: '/login',
  },

  session: {
    strategy: 'jwt',
    // maxAge: 30 * 24 * 60 * 60, // 30 days
  },

  secret: process.env.NEXTAUTH_SECRET,
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }