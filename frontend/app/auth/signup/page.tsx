"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { BookOpen, ArrowLeft, User, Mail, Lock, Github, ChromeIcon as Google } from "lucide-react"

export default function SignUp() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle sign up logic here
    console.log("Sign up with:", name, email, password)
  }

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container flex flex-col items-center justify-center min-h-screen max-w-md py-12">
        <Link href="/" className="absolute left-4 top-4 md:left-8 md:top-8">
          <Button variant="ghost" className="gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
        </Link>
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <div className="flex justify-center">
              <BookOpen className="h-8 w-8" />
            </div>
            <h1 className="text-2xl font-semibold tracking-tight">Create an account</h1>
            <p className="text-sm text-muted-foreground">Enter your information to create an account</p>
          </div>
          <div className="grid gap-6">
            <form onSubmit={handleSubmit}>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      type="text"
                      autoCapitalize="words"
                      autoComplete="name"
                      autoCorrect="off"
                      className="pl-10"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      placeholder="name@example.com"
                      type="email"
                      autoCapitalize="none"
                      autoComplete="email"
                      autoCorrect="off"
                      className="pl-10"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type="password"
                      className="pl-10"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>
                </div>
                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </div>
            </form>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Button variant="outline" className="w-full">
                <Github className="mr-2 h-4 w-4" />
                Github
              </Button>
              <Button variant="outline" className="w-full">
                <Google className="mr-2 h-4 w-4" />
                Google
              </Button>
            </div>
          </div>
          <p className="px-8 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/auth/signin" className="underline underline-offset-4 hover:text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}

