"use client";

import type React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export function SignUpForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate signup
    setTimeout(() => {
      setIsLoading(false);
      // Navigate logic would go here
    }, 1000);
  };

  return (
    <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm overflow-hidden mb-6">
      <form onSubmit={handleSignup}>
        <CardContent
          className="space-y-4 px-4 sm:px-6 pt-6"
          style={{ minHeight: "140px" }}
        >
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm sm:text-base text-neutral-700"
            >
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="name@domain.com"
              required
              className="h-11 sm:h-12 text-base touch-manipulation"
            />
          </div>
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm sm:text-base text-neutral-700"
            >
              Password
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                required
                className="pr-12 h-11 sm:h-12 text-base touch-manipulation"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent min-w-[44px] touch-manipulation"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4 text-neutral-500" />
                ) : (
                  <Eye className="h-4 w-4 text-neutral-500" />
                )}
                <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
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
            {isLoading ? "Creating account..." : "Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
