"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { toast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { EnterIcon } from "@radix-ui/react-icons"
import { register } from "@/actions/auth"

// Schema for sign-up form validation
const FormSchema = z.object({
  fullName: z.string().min(2, { message: "Full Name must be at least 2 characters." }),
  username: z.string().min(2, { message: "Username must be at least 2 characters." }),
  email: z
    .string()
    .email({ message: "Invalid email address." }),
  password: z.string().min(6, { message: "Password must be at least 6 characters." }),
  confirmPassword: z.string().min(6, { message: "Confirm password must be at least 6 characters." }),
  phone: z
    .string()
    .regex(/^\d{10,15}$/, { message: "Enter a valid phone number with 10-15 digits." }),
  address: z.object({
    street: z.string().min(2, { message: "Street address is required." }),
    city: z.string().min(2, { message: "City is required." }),
    state: z.string().min(2, { message: "State is required." }),
    zip: z.string().min(5, { message: "Zip Code must be at least 5 characters." }),
  }),
  agreeToTerms: z.boolean().refine((val) => val === true, { message: "You must agree to the terms and conditions." }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match.",
  path: ["confirmPassword"],
})

export default function SignupPage() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      fullName: "",
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
      address: {
        street: "",
        city: "",
        state: "",
        zip: "",
      },
      agreeToTerms: false,
    },
  })

  function onSubmit(data: z.infer<typeof FormSchema>) {
    register(data)
    toast({
      title: "Sign-up Successful!",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 mt-4 md:mt-10 space-y-6 mx-auto border border-border p-4 sm:p-10">
        <h1 className="text-4xl">Sign Up for Frozen Store</h1>

        <FormField
          control={form.control}
          name="fullName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="John Doe" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Input placeholder="Username" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" placeholder="john@example.com" {...field} />
              </FormControl>
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
                <Input type="password" placeholder="Enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Re-enter password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="1234567890" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Address Section */}
        <FormLabel>Address</FormLabel>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="address.street"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="Street Address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex space-x-4">
            <FormField
              control={form.control}
              name="address.city"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormControl>
                    <Input placeholder="City" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.state"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormControl>
                    <Input placeholder="State" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address.zip"
              render={({ field }) => (
                <FormItem className="w-1/3">
                  <FormControl>
                    <Input placeholder="Zip Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <FormField
          control={form.control}
          name="agreeToTerms"
          render={({ field }) => (
            <FormItem className="flex items-center space-x-2">
              <FormControl>
                <Checkbox checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormLabel>I agree to the terms and conditions</FormLabel>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <EnterIcon /> Sign Up
        </Button>
      </form>



    </Form>
  )
}
