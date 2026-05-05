import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
	return (
		<header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color-mix(in_oklab,var(--header-bg)_92%,transparent)] backdrop-blur-xl">
			<nav className="page-wrap flex items-center gap-3 py-3 sm:gap-4 sm:py-4">
				<Link
					to="/"
					className="inline-flex items-center gap-3 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-2 text-left no-underline shadow-[0_10px_28px_rgba(30,90,72,0.08)] transition hover:-translate-y-0.5 sm:px-4"
				>
					<span className="flex size-9 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--sea-ink),var(--lagoon-deep))] text-sm font-bold text-white">
						LM
					</span>
					<span className="hidden flex-col leading-tight sm:flex">
						<span className="text-sm font-bold text-[var(--sea-ink)]">
							Learning Map
						</span>
						<span className="text-[10px] uppercase tracking-[0.2em] text-[var(--sea-ink-soft)]">
							Student records
						</span>
					</span>
				</Link>

				<div className="ml-auto flex items-center gap-2 sm:gap-3">
					<Link
						to="/"
						className="nav-link hidden text-sm font-semibold sm:inline-flex"
						activeProps={{
							className:
								"nav-link is-active hidden text-sm font-semibold sm:inline-flex",
						}}
					>
						Home
					</Link>
					<Link
						to="/about"
						className="nav-link hidden text-sm font-semibold sm:inline-flex"
						activeProps={{
							className:
								"nav-link is-active hidden text-sm font-semibold sm:inline-flex",
						}}
					>
						About
					</Link>
					<Link
						to="/students/form"
						className="inline-flex items-center gap-2 rounded-full bg-[var(--sea-ink)] px-4 py-2 text-sm font-semibold text-white no-underline shadow-[0_12px_28px_rgba(23,58,64,0.18)] transition hover:-translate-y-0.5 hover:bg-[var(--lagoon-deep)]"
					>
						Add student
						<ArrowRight className="size-4" />
					</Link>
					<ThemeToggle />
				</div>
			</nav>
		</header>
	);
}
