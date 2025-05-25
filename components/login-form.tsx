"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";

export function LoginForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1000);
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden mb-6">
      <form onSubmit={handleLogin}>
        <CardContent
          className="space-y-4 px-4 sm:px-6 pt-6"
          style={{ minHeight: "140px" }}
        >
          <div className="space-y-2">
            <Label
              htmlFor="login-email"
              className="text-sm sm:text-base text-neutral-700"
            >
              Email
            </Label>
            <Input
              id="login-email"
              type="email"
              placeholder="manager@restaurant.com"
              required
              className="h-11 sm:h-12 text-base touch-manipulation"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="login-password"
              className="text-sm sm:text-base text-neutral-700"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="login-password"
                type={showLoginPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-12 h-11 sm:h-12 text-base touch-manipulation"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent min-w-[44px] touch-manipulation"
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              >
                {showLoginPassword ? (
                  <EyeOff className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Eye className="h-4 w-4 text-neutral-500" />
                )}
                <span className="sr-only">
                  {showLoginPassword ? "Hide password" : "Show password"}
                </span>
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter className="px-4 sm:px-6 pb-6">
          <Button
            type="submit"
            className="w-full bg-lime-600 hover:bg-lime-700 h-11 sm:h-12 text-base touch-manipulation"
            disabled={isLoading}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
