import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/Logo";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { findUserByEmail, addUser } from "@/mocks/mockUsers";

export default function AuthForm({
  mode: initialMode = "login",
  onModeChange,
  onClose,
}: {
  mode?: "login" | "signup";
  onModeChange?: (mode: "login" | "signup") => void;
  onClose?: () => void;
}) {
  const [mode, setMode] = useState<"login" | "signup">(initialMode);
  const [error, setError] = useState<string | null>(null);

  const handleModeChange = (newMode: "login" | "signup") => {
    setMode(newMode);
    setError(null);
    onModeChange?.(newMode);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    const form = e.currentTarget;
    const formData = new FormData(form);
    const name = formData.get("name") as string;
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;

    if (mode === "login") {
      const user = findUserByEmail(email);
      if (!user) {
        setError("No account found with this email.");
        return;
      }
      if (user.password !== password) {
        setError("Incorrect password.");
        return;
      }
      // Success: log in (for now, just alert)
      alert("Logged in successfully!");
      // TODO: Close modal or redirect
      onClose?.();
    } else {
      // signup
      if (findUserByEmail(email)) {
        setError("An account with this email already exists.");
        return;
      }
      if (!name) {
        setError("Please enter your full name.");
        return;
      }
      addUser({ name, email, password });
      alert("Account created! You can now log in.");
      setMode("login");
    }
  };

  return (
    <div className="w-full max-w-full sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-3xl mx-auto p-4 sm:p-6 md:p-8 lg:p-10">
      <div className="flex flex-col items-center mb-4">
        <Logo />
        <div className="h-3" />
        <h2 className="text-xl sm:text-2xl font-bold mt-1 text-center">
          {mode === "login" ? "Sign in to your account" : "Create your account"}
        </h2>
      </div>
      <div className="flex justify-center gap-2 mb-4">
        <Button
          variant={mode === "login" ? "default" : "ghost"}
          onClick={() => handleModeChange("login")}
          className="px-4"
        >
          Sign in
        </Button>
        <Button
          variant={mode === "signup" ? "default" : "ghost"}
          onClick={() => handleModeChange("signup")}
          className="px-4"
        >
          Sign up
        </Button>
      </div>
      <form className="space-y-3 w-full mx-auto" onSubmit={handleSubmit}>
        {mode === "signup" && (
          <div>
            <label className="block text-sm font-medium mb-1.5" htmlFor="name">
              Full name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full h-11 px-3 py-2 border rounded-lg bg-neutral-50 dark:bg-neutral-800"
              placeholder="Your name"
              required
              autoComplete="name"
            />
          </div>
        )}
        <div>
          <label className="block text-sm font-medium mb-1.5" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full h-11 px-3 py-2 border rounded-lg bg-neutral-50 dark:bg-neutral-800"
            placeholder="Your email address"
            autoComplete="email"
            required
          />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1.5">
            <label className="block text-sm font-medium" htmlFor="password">
              Password
            </label>
            {mode === "login" && (
              <a
                href="#"
                className="text-sm text-primary underline hover:text-primary/80"
              >
                Forgot your password?
              </a>
            )}
          </div>
          <input
            id="password"
            name="password"
            type="password"
            className="w-full h-11 px-3 py-2 border rounded-lg bg-neutral-50 dark:bg-neutral-800"
            placeholder="••••••••"
            autoComplete="current-password"
            required
          />
        </div>
        {error && <div className="text-sm text-red-500 mt-1">{error}</div>}
        <Button className="w-full h-11 sm:h-12 text-base mt-2" type="submit">
          {mode === "login" ? "Sign in" : "Create account"}
        </Button>
      </form>
      <div className="flex items-center gap-2 mt-5 mb-5 w-full mx-auto">
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
        <span className="text-sm text-neutral-400">Or</span>
        <div className="flex-1 h-px bg-neutral-200 dark:bg-neutral-700" />
      </div>
      <div className="space-y-2 w-full mx-auto">
        <Button
          className="w-full h-11 flex items-center justify-center gap-2"
          variant="outline"
        >
          <FaApple className="text-xl" />
          {mode === "login" ? "Sign in with Apple" : "Sign up with Apple"}
        </Button>
        <Button
          className="w-full h-11 flex items-center justify-center gap-2"
          variant="outline"
        >
          <FcGoogle className="text-xl" />
          {mode === "login" ? "Sign in with Google" : "Sign up with Google"}
        </Button>
      </div>
    </div>
  );
}
