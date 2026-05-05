import { createFileRoute, Link } from "@tanstack/react-router";



export const Route = createFileRoute("/")({ component: App });

function App() {

	return (
		<main className="relative min-h-screen overflow-hidden px-4 py-8 text-[var(--sea-ink)] sm:px-6 sm:py-12 lg:py-16">
			<div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgb(79, 184, 179),transparent_30%),radial-gradient(circle_at_top_right,rgba(47,106,74,0.18),transparent_30%),linear-gradient(180deg,rgba(221,234,228,0.94),rgba(206,225,218,0.98))]" />
			<div className="pointer-events-none absolute inset-x-0 top-0 h-[28rem] bg-[radial-gradient(circle_at_50%_0%,rgba(244,251,247,0.34),transparent_72%)] opacity-70" />
			<Link to="/students/form">add Student</Link>
			<div>affichage liste</div>
		</main>
	);
}
