import { useServerFn } from "@tanstack/react-start";
import {
	ArrowLeft,
	ArrowRight,
	Loader2,
	ShieldCheck,
	Sparkles,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "@tanstack/react-router";
import { toast } from "sonner";

import { createStudentFn } from "#/servers/functions/student";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Form = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<StudentFormValues>();
	const [isPending, setIsPending] = useState(false);
	const createStudent = useServerFn(createStudentFn);

	const onSubmit = async (data: StudentFormValues) => {
		setIsPending(true);
		try {
			await createStudent({ data });
			reset();
			toast("Student created successfully.");
		} catch (error) {
			toast.error("Unable to create the student.");
			console.error(error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<main className="page-wrap px-4 py-10 sm:py-12 lg:py-14">
			<div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
				<section className="space-y-5 pt-2">
					<Link
						to="/"
						className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-sm font-semibold text-[var(--sea-ink)] no-underline shadow-[0_10px_24px_rgba(30,90,72,0.06)] transition hover:-translate-y-0.5"
					>
						<ArrowLeft className="size-4" />
						Back to list
					</Link>

					<div className="space-y-4">
						<p className="island-kicker">Student intake</p>
						<h1 className="display-title max-w-xl text-4xl font-bold leading-[0.95] tracking-tight text-[var(--sea-ink)] sm:text-5xl lg:text-6xl">
							Add a student record.
						</h1>
						<p className="max-w-xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
							Use this compact form to capture a name, an age, and a class in
							one pass. The layout stays readable on smaller screens and calm on
							larger ones.
						</p>
					</div>

					<div className="rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<div className="flex items-center gap-3">
							<div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--sea-ink),var(--lagoon-deep))] text-white shadow-[0_12px_24px_rgba(23,58,64,0.18)]">
								<Sparkles className="size-5" />
							</div>
							<div>
								<p className="text-sm font-semibold text-[var(--sea-ink)]">
									Clear input flow
								</p>
								<p className="text-sm text-[var(--sea-ink-soft)]">
									Short fields, visible feedback, and a simple submit action.
								</p>
							</div>
						</div>
						<div className="mt-4 grid gap-3 sm:grid-cols-2">
							<div className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_76%,white)] p-4">
								<p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea-ink-soft)]">
									Fields
								</p>
								<p className="mt-2 text-lg font-semibold text-[var(--sea-ink)]">
									Name, age, class
								</p>
							</div>
							<div className="rounded-2xl border border-[var(--line)] bg-[color-mix(in_oklab,var(--surface)_76%,white)] p-4">
								<p className="text-xs font-bold uppercase tracking-[0.2em] text-[var(--sea-ink-soft)]">
									Submission
								</p>
								<p className="mt-2 text-lg font-semibold text-[var(--sea-ink)]">
									Server function
								</p>
							</div>
						</div>
					</div>
				</section>

				<section>
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="overflow-hidden rounded-[1.75rem]"
					>
						<Card className="island-shell overflow-hidden rounded-[1.75rem] border-[var(--line)] bg-[var(--surface-strong)] p-0">
							<CardHeader className="border-b border-[var(--line)] px-6 pb-5 pt-6 sm:px-8">
								<div className="flex items-start justify-between gap-4">
									<div>
										<p className="island-kicker">New entry</p>
										<CardTitle className="mt-2 text-2xl font-bold tracking-tight text-[var(--sea-ink)]">
											Student details
										</CardTitle>
									</div>
									<div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--kicker)]">
										<ShieldCheck className="size-4" />
										Secure
									</div>
								</div>
								<CardDescription className="mt-3 max-w-lg text-sm leading-7 text-[var(--sea-ink-soft)]">
									Keep the form short and focused. The new card layout keeps the
									fields easy to scan and the action easy to find.
								</CardDescription>
							</CardHeader>

							<CardContent className="space-y-5 px-6 py-6 sm:px-8">
								<div className="space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--kicker)]">
										Student name
									</Label>
									<Input
										type="text"
										placeholder="Full name"
										autoComplete="name"
										{...register("name", {
											required: "Please enter a name.",
										})}
										className="h-12 rounded-xl border border-[var(--line)] bg-white/80 px-4 text-[var(--sea-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[var(--sea-ink-soft)]/60 focus-visible:border-[var(--lagoon-deep)] focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/30"
									/>
									{errors.name && (
										<span className="text-sm text-red-600">
											{errors.name.message}
										</span>
									)}
								</div>

								<div className="grid gap-4 sm:grid-cols-2">
									<div className="space-y-2">
										<Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--kicker)]">
											Age
										</Label>
										<Input
											type="number"
											placeholder="18"
											inputMode="numeric"
											{...register("age", {
												valueAsNumber: true,
												required: "Please enter an age.",
											})}
											className="h-12 rounded-xl border border-[var(--line)] bg-white/80 px-4 text-[var(--sea-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[var(--sea-ink-soft)]/60 focus-visible:border-[var(--lagoon-deep)] focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/30"
										/>
										{errors.age && (
											<span className="text-sm text-red-600">
												{errors.age.message}
											</span>
										)}
									</div>
									<div className="space-y-2">
										<Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--kicker)]">
											Class
										</Label>
										<Input
											type="text"
											placeholder="Grade A"
											autoComplete="off"
											{...register("classe", {
												required: "Please enter a class.",
											})}
											className="h-12 rounded-xl border border-[var(--line)] bg-white/80 px-4 text-[var(--sea-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[var(--sea-ink-soft)]/60 focus-visible:border-[var(--lagoon-deep)] focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/30"
										/>
										{errors.classe && (
											<span className="text-sm text-red-600">
												{errors.classe.message}
											</span>
										)}
									</div>
								</div>
							</CardContent>

							<CardFooter className="border-t border-(--line) px-6 pb-6 pt-6 sm:px-8">
								<Button
									disabled={isPending}
									type="submit"
									aria-busy={isPending}
									className="h-12 w-full rounded-full bg-green-800 px-4 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(23,58,64,0.18)] transition hover:-translate-y-0.5 hover:bg-green-950"
								>
									{isPending ? (
										<>
											<Loader2 className="size-4 animate-spin" />
											Creating...
										</>
									) : (
										<>
											Add student
											<ArrowRight className="size-4" />
										</>
									)}
								</Button>
							</CardFooter>
						</Card>
					</form>
				</section>
			</div>
		</main>
	);
};

export default Form;
