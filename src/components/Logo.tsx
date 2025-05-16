import { Link } from "react-router-dom";

import logo from "@/assets/logo.svg";

export function Logo() {
  return (
    <Link to="/" className="flex items-center gap-1">
      <img src={logo} alt="Wedge logo" className="h-8 w-8" />
      <span className="font-bold text-xl tracking-tight">Wedge</span>
    </Link>
  );
}
