import { logout } from "@/actions/auth"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function LogoutPage() {
  // const { push } = useRouter()
  redirect('/login')
  return (
    <form onSubmit={logout}
      className="w-2/3 mt-4 md:mt-10 space-y-6 mx-auto border border-border p-4 sm:p-10"
    >
      <h1 className="text-4xl">Welcome to Logging out</h1>
      <Link href={'/login'}>Login</Link>
    </form>
  )
}
