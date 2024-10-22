import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { db } from "@/utils/mysql"
import { NextResponse } from "next/server" // NextResponse import
import { RowDataPacket } from "mysql2"


interface User extends RowDataPacket {
  id: number
  name: string
  email: string
  password: string
}


const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password are required")
        }

        // Fetch the user from the MySQL database
        const [rows] = await db.query<User[]>(
          "SELECT * FROM users WHERE email = ? LIMIT 1",
          [credentials.email]
        )

        const user = rows[0]
        if (!user) {
          throw new Error("User not found")
        }

        // Check if the password is valid
        const isValidPassword = await bcrypt.compare(credentials.password, user.password)
        if (!isValidPassword) {
          throw new Error("Invalid password")
        }

        // Return user object if valid credentials
        return {
          id: String(user.id), // Convert `id` to string (NextAuth expects `id` as string)
          name: user.name,
          email: user.email,
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Use JWT for session handling
  },
  pages: {
    signIn: '/login', // Custom sign-in page
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id // Add user `id` to token
      }
      return token
    },
    async session({ session, token }) {
      if (token?.id && session.user) {
        session.user.email = token.email // Add `id` to session object
      }
      return session
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
})

export async function GET(request: unknown) {
  const response = await handler(request)
  return NextResponse.json(response) // Return NextResponse here
}

export async function POST(request: unknown) {
  const response = await handler(request)
  return NextResponse.json(response) // Return NextResponse here as well
}
