"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { GithubIcon, GoogleIcon } from "@/components/auth/auth-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";

export function SignInForm() {
  const router = useRouter();

  // Store email and password
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  // Store error and loading status
  const [error, setError] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);

  // Handle login form submission
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");

    // Check email
    if (!email.includes("@") || !email.includes(".")) {
      setError("Enter a valid email address.");
      return;
    }

    // Check password
    if (!password) {
      setError("Enter your password.");
      return;
    }

    try {
      setIsLoading(true);

      // Send login information to Better Auth
      const { error: loginError } = await authClient.signIn.email({
        email: email.trim(),
        password: password,
      });

      // Check login result
      if (loginError) {
        setError(loginError.message || "Invalid email or password.");
      } else {
        // Login successful
        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="w-full max-w-md">
      <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
        Welcome Back!
      </h1>

      <p className="mt-2 text-slate-600 dark:text-slate-300">
        Sign in to your Hermone account
      </p>

      <form onSubmit={handleSubmit} noValidate className="mt-8 space-y-5">
        <div>
          <label
            htmlFor="signin-email"
            className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Email Address <span className="text-red-500">*</span>
          </label>

          <Input
            id="signin-email"
            type="email"
            autoComplete="email"
            placeholder="Enter your email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="h-11 rounded-lg bg-white dark:bg-slate-900"
            disabled={isLoading}
          />
        </div>

        <div>
          <label
            htmlFor="signin-password"
            className="mb-1.5 block text-sm font-semibold text-slate-800 dark:text-slate-200"
          >
            Password <span className="text-red-500">*</span>
          </label>

          <Input
            id="signin-password"
            type="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className="h-11 rounded-lg bg-white dark:bg-slate-900"
            disabled={isLoading}
          />
        </div>

        {error && (
          <p role="alert" className="text-sm font-medium text-red-500">
            {error}
          </p>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="h-11 w-full gap-2 rounded-lg bg-[#312e81] text-base shadow-md hover:bg-[#3d3a99]"
        >
          {isLoading ? "Signing in..." : "Login"}
          {!isLoading && <ArrowRight className="size-4" />}
        </Button>
      </form>

      <div className="my-6 flex items-center gap-3">
        <span
          aria-hidden
          className="h-px flex-1 bg-slate-200 dark:bg-slate-700"
        />
        <span className="text-sm font-medium text-slate-600 dark:text-slate-400">
          or continue with
        </span>
        <span
          aria-hidden
          className="h-px flex-1 bg-slate-200 dark:bg-slate-700"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2 rounded-lg dark:border-slate-700"
          disabled
        >
          <GoogleIcon className="size-5 shrink-0" />
          <span className="truncate">Continue with Google</span>
        </Button>

        <Button
          type="button"
          variant="outline"
          className="h-11 gap-2 rounded-lg dark:border-slate-700"
          disabled
        >
          <GithubIcon className="size-5 shrink-0" />
          <span className="truncate">Continue with GitHub</span>
        </Button>
      </div>

      <p className="mt-8 text-center text-sm text-slate-600 dark:text-slate-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/sign-up"
          className="font-semibold text-violet-600 outline-none hover:underline focus-visible:ring-2 focus-visible:ring-violet-500/50 dark:text-violet-300"
        >
          Sign Up
        </Link>
      </p>
    </div>
  );
}
