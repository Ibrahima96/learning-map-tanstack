import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-xl">
      <nav className="page-wrap flex items-center justify-between py-4">
        <Link
          to="/"
          className="flex items-center gap-2.5 transition-opacity hover:opacity-90"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground shadow-sm">
            <span className="text-sm font-bold tracking-tighter">LM</span>
          </div>
          <span className="text-lg font-semibold tracking-tight text-foreground">
            Learning Map
          </span>
        </Link>

        <div className="flex items-center gap-6">
          <div className="hidden items-center gap-6 md:flex">
            <Link
              to="/"
              className="nav-link text-sm font-medium"
              activeProps={{ className: "nav-link is-active" }}
            >
              Home
            </Link>
            <Link
              to="/about"
              className="nav-link text-sm font-medium"
              activeProps={{ className: "nav-link is-active" }}
            >
              About
            </Link>
          </div>
          
          <div className="flex items-center gap-3 border-l border-border pl-6">
            <Link
              to="/students/form"
              className="inline-flex h-9 items-center gap-2 rounded-full bg-accent px-4 text-sm font-medium text-white shadow-sm transition-all hover:bg-accent/90 hover:shadow-md"
            >
              Add student
              <ArrowRight className="size-3.5" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </nav>
    </header>
  );
}
