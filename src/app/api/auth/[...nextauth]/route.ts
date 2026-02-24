// app/api/auth/[...nextauth]/route.ts
import NextAuth, { AuthOptions, User, Session } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import CredentialsProvider from 'next-auth/providers/credentials'
import { axiosPublic } from '@/lib/axios'
import { JWT } from 'next-auth/jwt'

// Custom types (NO 'any' types!)
interface ExtendedUser extends User {
  role?: string
}

interface BackendLoginResponse {
  user: {
    _id: string
    email: string
    name: string
    role: string
  }
}

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
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
          const response = await axiosPublic.post<BackendLoginResponse>(
            '/api/auth/login',
            {
              email: credentials.email,
              password: credentials.password
            }
          )

          if (response.data.user) {
            return {
              id: response.data.user._id,
              email: response.data.user.email,
              name: response.data.user.name,
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
    async jwt({ token, user }: { token: JWT; user: ExtendedUser }) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        (session.user as ExtendedUser).role = token.role as string
      }
      return session
    }
  },
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
  },
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }