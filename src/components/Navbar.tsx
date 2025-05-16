import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Logo } from "@/components/Logo";
import { Menu } from "lucide-react";
import { AccountDropdown } from "@/components/AccountDropdown";
import { useAuth } from "@/context/useAuth";
import AuthModal from "@/components/AuthModal";

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { isAuthenticated, logout } = useAuth();

  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 bg-background border-b">
      <div className="font-bold text-xl tracking-tight">
        <Logo />
      </div>
      {/* Desktop nav */}
      <div className="hidden md:flex items-center gap-4">
        {isAuthenticated ? (
          <>
            <Button variant="ghost" asChild>
              <Link to="/admin">Dashboard</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/reservations">Reservations</Link>
            </Button>
            <Button variant="ghost" asChild>
              <Link to="/floorplan">Floorplan</Link>
            </Button>
            <AccountDropdown />
          </>
        ) : (
          <Button variant="ghost" onClick={() => setAuthModalOpen(true)}>
            Login
          </Button>
        )}
      </div>
      {/* Mobile hamburger */}
      <div className="md:hidden">
        {isAuthenticated ? (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileOpen((open) => !open)}
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </Button>
            {mobileOpen && (
              <div className="absolute top-16 left-0 w-full bg-background border-b shadow-md flex flex-col items-start px-6 py-4 gap-2 z-50">
                <Link
                  to="/admin"
                  className="w-full py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/reservations"
                  className="w-full py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Reservations
                </Link>
                <Link
                  to="/floorplan"
                  className="w-full py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Floorplan
                </Link>
                <div className="w-full border-t my-2" />
                <Link
                  to="/profile"
                  className="w-full py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Profile
                </Link>
                <Link
                  to="/settings"
                  className="w-full py-2"
                  onClick={() => setMobileOpen(false)}
                >
                  Settings
                </Link>
                <button
                  className="w-full py-2 text-left"
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <Button
            variant="secondary"
            className="ml-2"
            onClick={() => {
              setAuthModalOpen(true);
            }}
          >
            Login
          </Button>
        )}
      </div>
      <AuthModal
        open={authModalOpen}
        onClose={() => {
          setAuthModalOpen(false);
        }}
      />
    </nav>
  );
}
