export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="border-t border-[var(--line)] bg-[color-mix(in_oklab,var(--header-bg)_84%,transparent)] px-4 py-8 text-[var(--sea-ink-soft)]">
			<div className="page-wrap flex flex-col gap-3 text-center sm:flex-row sm:items-center sm:justify-between sm:text-left">
				<p className="m-0 text-sm">
					&copy; {year} Learning Map. Built for clear student records.
				</p>
				<p className="island-kicker m-0">Minimal interface, TanStack Start</p>
			</div>
		</footer>
	);
}
