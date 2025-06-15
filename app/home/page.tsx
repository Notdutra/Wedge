import { WedgeLogo } from "@/components/wedge-logo";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-lime-50 to-neutral-100 text-neutral-800">
      {/* Header */}
      <header className="w-full py-6 px-4 sm:px-6 lg:px-8 h-[72px]">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/home" className="flex items-center gap-2 group">
            <WedgeLogo width={32} height={32} pos={true} />
          </Link>
          <nav className="flex items-center gap-3">
            <Link href="/signin">
              <button className="px-4 py-2 text-sm font-medium text-neutral-700 hover:text-lime-700 transition-colors h-[36px] flex items-center">
                Sign In
              </button>
            </Link>
            <Link href="/signup">
              <button className="px-4 py-2 rounded-lg bg-lime-600 text-white text-sm font-semibold shadow hover:bg-lime-700 transition-colors h-[36px] flex items-center">
                Sign Up
              </button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex items-center py-12 md:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left Column: Text Content & CTA */}
          <div className="flex flex-col items-start text-center md:text-left">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-neutral-900 leading-tight mb-6">
              The <span className="text-lime-600">Ultimate Restaurant POS</span>{" "}
              & Management System
            </h1>
            <p className="text-lg sm:text-xl text-neutral-600 max-w-xl mb-8">
              Wedge is a modern, all-in-one platform for restaurants to manage
              orders, staff, inventory, analytics, and more. Streamline your
              operations and deliver a better experience for your team and
              guests.
            </p>
          </div>

          {/* Right Column: Image/Illustration Placeholder */}
          <div className="flex-c items-center md:flex justify-center p-6">
            <div className="relative w-full max-w-md h-80 rounded-2xl shadow-xl overflow-hidden">
              <Image
                src="/wedgeDemo.png"
                fill
                alt="Cashier using POS system at a restaurant counter"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer (Optional) */}
      <footer className="w-full py-8 px-4 sm:px-6 lg:px-8 text-center">
        <p className="text-sm text-neutral-500">
          &copy; {new Date().getFullYear()} Wedge. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
