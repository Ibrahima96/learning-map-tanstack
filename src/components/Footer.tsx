export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer className="mt-auto border-t border-border bg-muted/30 py-12">
			<div className="page-wrap flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
				<div>
					<p className="text-sm font-semibold text-foreground">
						Learning Map
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Professional student management for modern schools.
					</p>
				</div>
				
				<div className="flex flex-col gap-4 md:flex-row md:items-center md:gap-8">
					<p className="text-xs text-muted-foreground">
						&copy; {year} Learning Map. All rights reserved.
					</p>
					<div className="flex items-center gap-4 text-xs font-medium text-muted-foreground">
						<span className="h-1 w-1 rounded-full bg-accent" />
						Built with TanStack Start
					</div>
				</div>
			</div>
		</footer>
	);
}
