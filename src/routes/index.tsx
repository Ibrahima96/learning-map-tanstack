import CardStudents from "#/components/CardStudents";
import { Button } from "#/components/ui/button";
import { getAllStudents } from "#/servers/functions/student";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Plus, Users } from "lucide-react";

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
		<main className="page-wrap py-12 md:py-20">
			<section className="mb-16 grid items-center gap-12 lg:grid-cols-2">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
						<Users className="size-3.5" />
						Database Status: Active
					</div>

					<div className="space-y-4">
						<h1 className="display-title text-5xl font-medium tracking-tight text-foreground md:text-7xl">
							Student Management <br />
							<span className="text-accent">Made Simple.</span>
						</h1>
						<p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
							A clean and efficient way to manage your student records. 
							Monitor performance, track attendance, and organize class lists in one place.
						</p>
					</div>

					<div className="flex flex-wrap gap-4">
						<Button
							asChild
							className="h-12 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 shadow-lg"
						>
							<Link to="/students/form">
								<Plus className="mr-2 size-4" />
								Add New Student
							</Link>
						</Button>
						<div className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground">
							<div className="flex -space-x-2">
								{[1, 2, 3].map((i) => (
									<div key={i} className="h-8 w-8 rounded-full border-2 border-background bg-muted flex items-center justify-center text-[10px]">
										{i}
									</div>
								))}
							</div>
							<span className="ml-2">{total} records stored</span>
						</div>
					</div>
				</div>

				<div className="relative">
					<div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/10 to-transparent blur-2xl" />
					<div className="relative grid gap-4 sm:grid-cols-2">
						<div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
							<p className="text-xs font-bold uppercase tracking-wider text-accent">System Total</p>
							<p className="mt-2 text-4xl font-medium text-foreground">{total}</p>
							<p className="mt-2 text-sm text-muted-foreground">Registered students</p>
						</div>
						<div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
							<p className="text-xs font-bold uppercase tracking-wider text-accent">Latest Entry</p>
							<p className="mt-2 text-xl font-medium text-foreground truncate">
								{latestStudent?.name ?? "N/A"}
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								{latestStudent ? `Class ${latestStudent.classe}` : "Waiting for data"}
							</p>
						</div>
					</div>
				</div>
			</section>

			<section className="rise-in">
				<div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-6">
					<div>
						<h2 className="text-2xl font-medium text-foreground">Student Registry</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Showing all {total} records in the system.
						</p>
					</div>
				</div>

				{students.length ? (
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{students.map((student) => (
							<CardStudents key={student._id} {...student} />
						))}
					</div>
				) : (
					<div className="rounded-3xl border-2 border-dashed border-border p-12 text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<Users className="size-6 text-muted-foreground" />
						</div>
						<h3 className="mt-4 text-lg font-medium text-foreground">No students found</h3>
						<p className="mt-2 text-muted-foreground">Get started by adding your first student record.</p>
						<Button
							asChild
							className="mt-6 h-10 rounded-full bg-primary px-5 text-sm font-medium"
						>
							<Link to="/students/form">Add Student</Link>
						</Button>
					</div>
				)}
			</section>
		</main>
	);
}
