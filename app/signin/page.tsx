import { SignInForm } from "@/components/forms/sign-in-form";
import { WedgeLogo } from "@/components/wedge-logo";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lime-50 to-neutral-100 text-neutral-800">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 h-[72px]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2 group">
            <WedgeLogo width={32} height={32} pos={true} />
          </Link>
          <nav className="flex items-center gap-3">
            <span className="text-sm text-neutral-600 h-5 inline-flex items-center">
              Don't have an account?
            </span>
            <Link href="/signup">
              <button className="px-4 py-2 rounded-lg bg-lime-600 text-white text-sm font-semibold shadow hover:bg-lime-700 transition-colors h-[36px] flex items-center">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center pt-[120px] px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm sm:max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-neutral-900 mb-2">
              Sign In
            </h1>
            <p className="text-base text-neutral-600">
              Access your Wedge account.
            </p>
          </div>
          <SignInForm />
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Wedge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
