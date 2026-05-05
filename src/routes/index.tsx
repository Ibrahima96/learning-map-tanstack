import CardStudents from "#/components/CardStudents";
import { Button } from "#/components/ui/button";
import { getAllStudents } from "#/servers/functions/student";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Sparkles, Users } from "lucide-react";

export const Route = createFileRoute("/")({
	component: App,
	loader: async () => await getAllStudents(),
});

function App() {
	const { students } = Route.useLoaderData() as {
		students: IStudentCard[];
	};
	const total = students.length;
	const latestStudent = students[0];

	return (
		<main className="page-wrap px-4 py-10 sm:py-12 lg:py-14">
			<section className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
				<div className="space-y-5">
					<div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--kicker)] shadow-[0_10px_28px_rgba(30,90,72,0.08)]">
						<Sparkles className="size-4" />
						Student overview
					</div>

					<div className="space-y-4">
						<p className="island-kicker">Class records</p>
						<h1 className="display-title max-w-2xl text-4xl font-bold leading-[0.95] tracking-tight text-[var(--sea-ink)] sm:text-5xl lg:text-6xl">
							Students at a glance.
						</h1>
						<p className="max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
							A calm dashboard for browsing student records and jumping directly
							into the add form.
						</p>
					</div>

					<div className="flex flex-wrap gap-3">
						<Button
						variant={"outline"}
							asChild
							className="h-12 rounded-full bg-(--sea-ink) px-5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(23,58,64,0.18)] transition hover:bg-(--lagoon-deep)"
						>
							<Link to="/students/form">
								Add student
								<ArrowRight className="size-4" />
							</Link>
						</Button>
						<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-(--surface-strong) px-4 py-2 text-sm text-[var(--sea-ink-soft)] shadow-[0_10px_24px_rgba(30,90,72,0.06)]">
							<Users className="size-4 text-[var(--lagoon-deep)]" />
							{total} student{total === 1 ? "" : "s"}
						</div>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-2">
					<div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<p className="island-kicker">Total</p>
						<p className="mt-3 text-3xl font-semibold text-[var(--sea-ink)]">
							{total}
						</p>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Records currently stored in the list.
						</p>
					</div>
					<div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<p className="island-kicker">Latest</p>
						<p className="mt-3 text-xl font-semibold text-[var(--sea-ink)]">
							{latestStudent?.name ?? "No student yet"}
						</p>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							{latestStudent
								? `Class ${latestStudent.classe} - Age ${latestStudent.age}`
								: "Create the first entry to start building the list."}
						</p>
					</div>
					<div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<p className="island-kicker">Display</p>
						<p className="mt-3 text-xl font-semibold text-[var(--sea-ink)]">
							Clean cards
						</p>
						<p className="mt-2 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Responsive cards keep the hierarchy readable on mobile and
							desktop.
						</p>
					</div>
				</div>
			</section>

			<section className="mt-10">
				<div className="mb-4 flex items-end justify-between gap-4">
					<div>
						<h2 className="text-xl font-semibold text-[var(--sea-ink)]">
							Student list
						</h2>
						<p className="mt-1 text-sm text-[var(--sea-ink-soft)]">
							Latest entries appear first.
						</p>
					</div>
					<p className="hidden text-sm text-[var(--sea-ink-soft)] sm:block">
						{total} record{total === 1 ? "" : "s"}
					</p>
				</div>

				{students.length ? (
					<div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
						{students.map((student) => (
							<CardStudents key={student._id} {...student} />
						))}
					</div>
				) : (
					<div className="island-shell rounded-3xl p-8 text-center sm:p-10">
						<p className="island-kicker">No data yet</p>
						<h3 className="display-title mt-3 text-3xl font-bold text-[var(--sea-ink)]">
							Add the first student record.
						</h3>
						<p className="mx-auto mt-3 max-w-xl text-base leading-8 text-[var(--sea-ink-soft)]">
							Use the form to create a clean list entry and see the new card
							layout in action.
						</p>
						<Button
							asChild
							className="mt-6 h-12 rounded-full bg-[var(--sea-ink)] px-5 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(23,58,64,0.18)] transition hover:bg-[var(--lagoon-deep)]"
						>
							<Link to="/students/form">
								Add student
								<ArrowRight className="size-4" />
							</Link>
						</Button>
					</div>
				)}
			</section>
		</main>
	);
}
