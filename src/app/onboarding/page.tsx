"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useRouter } from "next/navigation";
import { ChevronRight, SkipBackIcon as Skip } from "lucide-react";

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    restaurantName: "",
    restaurantType: "",
  });
  const router = useRouter();

  const totalSteps = 2;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Complete onboarding
      router.push("/dashboard");
    }
  };

  const handleSkip = () => {
    router.push("/dashboard");
  };

  const updateFormData = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-3 sm:p-4">
      <div className="w-full max-w-sm sm:max-w-md">
        <div className="text-center mb-6 sm:mb-8">
          <div className="flex items-center justify-center mb-3 sm:mb-4">
            {/* <Image
              src="/logo.png"
              alt="Wedge"
              className="w-12 h-12 sm:w-16 sm:h-16"
            /> */}
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
            Welcome to Wedge
          </h1>
          <p className="text-sm sm:text-base text-gray-600">
            Let&apos;s set up your restaurant
          </p>
        </div>

        <Card className="w-full shadow-lg border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader className="pb-3 sm:pb-4">
            <div className="flex items-center justify-between mb-2">
              <CardTitle className="text-lg sm:text-xl">
                Setup Your Account
              </CardTitle>
              <span className="text-xs sm:text-sm text-neutral-500">
                Step {step} of {totalSteps}
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </CardHeader>

          <CardContent className="min-h-[280px] sm:min-h-[300px] flex flex-col px-4 sm:px-6">
            {step === 1 && (
              <div className="space-y-4 flex-1">
                <CardDescription className="text-sm sm:text-base">
                  Tell us about yourself
                </CardDescription>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName" className="text-sm sm:text-base">
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={(e) =>
                        updateFormData("firstName", e.target.value)
                      }
                      className="h-11 sm:h-12 text-base touch-manipulation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName" className="text-sm sm:text-base">
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={(e) =>
                        updateFormData("lastName", e.target.value)
                      }
                      className="h-11 sm:h-12 text-base touch-manipulation"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">
                  This helps us personalize your experience. You can always
                  change this later in settings.
                </p>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4 flex-1">
                <CardDescription className="text-sm sm:text-base">
                  Tell us about your restaurant
                </CardDescription>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="restaurantName"
                      className="text-sm sm:text-base"
                    >
                      Restaurant Name
                    </Label>
                    <Input
                      id="restaurantName"
                      placeholder="The Golden Fork"
                      value={formData.restaurantName}
                      onChange={(e) =>
                        updateFormData("restaurantName", e.target.value)
                      }
                      className="h-11 sm:h-12 text-base touch-manipulation"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="restaurantType"
                      className="text-sm sm:text-base"
                    >
                      Type of Cuisine (Optional)
                    </Label>
                    <Input
                      id="restaurantType"
                      placeholder="Italian, American, etc."
                      value={formData.restaurantType}
                      onChange={(e) =>
                        updateFormData("restaurantType", e.target.value)
                      }
                      className="h-11 sm:h-12 text-base touch-manipulation"
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-neutral-600">
                  This helps us customize features for your restaurant type. You
                  can update this anytime.
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row justify-between gap-3 pt-4 sm:pt-6 mt-auto">
              <Button
                variant="outline"
                onClick={handleSkip}
                className="border-lime-200 text-lime-700 hover:bg-lime-50 h-11 sm:h-12 touch-manipulation order-2 sm:order-1"
              >
                <Skip className="w-4 h-4 mr-2" />
                Skip for now
              </Button>
              <Button
                onClick={handleNext}
                className="bg-lime-600 hover:bg-lime-700 h-11 sm:h-12 touch-manipulation order-1 sm:order-2"
              >
                {step === totalSteps ? "Get Started" : "Continue"}
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="text-center mt-4 sm:mt-6">
          <p className="text-xs sm:text-sm text-neutral-600">
            You can always complete or modify this information later in your
            settings.
          </p>
        </div>
      </div>
    </div>
  );
}
