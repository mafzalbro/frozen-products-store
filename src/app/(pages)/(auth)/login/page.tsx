"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { EnterIcon } from "@radix-ui/react-icons"
import { login } from "@/actions/auth"
import { useRouter } from "next/navigation"

// Schema allowing username or email
const FormSchema = z.object({
  userInput: z
    .string()
    .min(2, { message: "Username or email must be at least 2 characters." })
    .refine(
      (value) =>
        /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) || value.length >= 2,
      {
        message: "Enter a valid email or a username with at least 2 characters.",
      }
    ),
  password: z.string().min(2, {
    message: "Password must be at least 2 characters.",
  }),
})

export default function LoginPage() {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      userInput: "",
      password: "",
    },
  })


  async function onSubmit(data: z.infer<typeof FormSchema>) {

    try {
      login(data).then(result => {
        if (result?.success) {
          toast({
            title: "Login Successful",
            description: "You are now logged in!",
          })

          // Clear form on success
          form.reset()
          // redirect('/')
          router.push('/')
        } else {
          toast({
            title: "Login Failed",
            description: result?.message || "An error occurred.",
          })
        }
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later." + (error ? '' : ''),
      })
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-2/3 mt-4 md:mt-10 space-y-6 mx-auto border border-border p-4 sm:p-10"
      >
        <h1 className="text-4xl">Welcome to Login</h1>
        <FormField
          control={form.control}
          name="userInput"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username or Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter your username or email" {...field} />
              </FormControl>
              <FormDescription>
                Use your username or email to login.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter your password"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
        // disabled={isFormEmpty}
        >
          {form.formState.isSubmitting ? "Logging in..." : <><EnterIcon /> Login</>}
        </Button>
      </form>
    </Form>
  )
}
