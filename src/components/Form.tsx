import { useServerFn } from "@tanstack/react-start";
import {
    ArrowRight,
    BadgeCheck,
    Database,
    Loader2,
    ShieldCheck,
    Sparkles,
    Users,
} from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
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
                console.log("Form Data:", data);
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
   <div className="page-wrap relative z-10 grid min-h-[calc(100vh-4rem)] items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
				<section className="rise-in space-y-8">
					<div className="inline-flex items-center gap-2 mt-4 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--kicker)] shadow-[0_10px_30px_rgba(30,90,72,0.08)]">
						<Sparkles className="size-4" />
						Student intake console
					</div>

					<div className="space-y-5">
						<p className="island-kicker">Learnity internal system</p>
						<h1 className="display-title max-w-2xl text-5xl font-bold leading-[0.92] text-[var(--sea-ink)] sm:text-6xl lg:text-[4.75rem]">
							A cleaner way to create student records.
						</h1>
						<p className="max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
							Capture identity, age, and class in one focused flow. The layout
							feels like a modern product dashboard: calm, structured, and fast
							to scan.
						</p>
					</div>

					<div className="grid gap-4 sm:grid-cols-3">
						<div className="feature-card rounded-2xl border border-[var(--line)] p-4">
							<Database className="mb-3 size-5 text-[var(--lagoon-deep)]" />
							<p className="text-sm font-semibold text-[var(--sea-ink)]">
								MongoDB ready
							</p>
							<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
								Structured for server-side creation and storage.
							</p>
						</div>
						<div className="feature-card rounded-2xl border border-[var(--line)] p-4">
							<Users className="mb-3 size-5 text-[var(--lagoon-deep)]" />
							<p className="text-sm font-semibold text-[var(--sea-ink)]">
								Focused flow
							</p>
							<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
								Short form, clear hierarchy, no visual clutter.
							</p>
						</div>
						<div className="feature-card rounded-2xl border border-[var(--line)] p-4">
							<ShieldCheck className="mb-3 size-5 text-[var(--lagoon-deep)]" />
							<p className="text-sm font-semibold text-[var(--sea-ink)]">
								Secure submit
							</p>
							<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
								Server function submission with explicit loading state.
							</p>
						</div>
					</div>

					<div className="flex flex-wrap gap-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--sea-ink-soft)] shadow-[0_10px_24px_rgba(30,90,72,0.06)]">
							<BadgeCheck className="size-4 text-[var(--lagoon-deep)]" />
							Validation feedback
						</div>
						<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface-strong)] px-4 py-2 text-sm text-[var(--sea-ink-soft)] shadow-[0_10px_24px_rgba(30,90,72,0.06)]">
							<Database className="size-4 text-[var(--lagoon-deep)]" />
							Live database write
						</div>
					</div>
				</section>

				<section className="rise-in">
					<form
						onSubmit={handleSubmit(onSubmit)}
						className="transition-all duration-500 ease-in-out"
					>
						<Card className="feature-card island-shell overflow-hidden rounded-[1.75rem] border-[var(--line)] bg-[var(--surface-strong)]">
							<CardHeader className="relative border-b border-[var(--line)] px-6 pb-6 pt-6 sm:px-8">
								<div className="mb-5 flex items-center justify-between gap-4">
									<div>
										<p className="island-kicker">New entry</p>
										<CardTitle className="display-title mt-2 text-3xl font-bold tracking-tight text-[var(--sea-ink)]">
											Add a student
										</CardTitle>
									</div>
									<div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--kicker)]">
										<ShieldCheck className="size-4" />
										Secure
									</div>
								</div>
								<CardDescription className="max-w-lg text-sm leading-7 text-[var(--sea-ink-soft)]">
									Keep the form short, readable, and responsive. The submission
									state now clearly reflects the server call.
								</CardDescription>
							</CardHeader>

							<CardContent className="space-y-5 px-6 py-6 sm:px-8">
								<div className="space-y-2">
									<Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--kicker)]">
										Student identity
									</Label>
									<Input
										type="text"
										placeholder="Full name"
										autoComplete="name"
										{...register("name", { required: "Please enter a name." })}
										className="h-12 rounded-xl border border-[var(--line)] bg-white/80 px-4 text-[var(--sea-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[var(--sea-ink-soft)]/60 focus-visible:border-[var(--lagoon-deep)] focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/30"
									/>
									{errors.name && (
										<span className="flex items-center gap-1.5 text-sm text-red-600">
											<BadgeCheck className="size-4" />
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
											{...register("age", { valueAsNumber: true })}
											className="h-12 rounded-xl border border-[var(--line)] bg-white/80 px-4 text-[var(--sea-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[var(--sea-ink-soft)]/60 focus-visible:border-[var(--lagoon-deep)] focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/30"
										/>
									</div>
									<div className="space-y-2">
										<Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-[var(--kicker)]">
											Class
										</Label>
										<Input
											type="text"
											placeholder="Grade A"
											autoComplete="off"
											{...register("classe")}
											className="h-12 rounded-xl border border-[var(--line)] bg-white/80 px-4 text-[var(--sea-ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-[var(--sea-ink-soft)]/60 focus-visible:border-[var(--lagoon-deep)] focus-visible:ring-2 focus-visible:ring-[var(--lagoon)]/30"
										/>
									</div>
								</div>
							</CardContent>

							<CardFooter className="border-t border-[var(--line)] px-6 pb-6 pt-6 sm:px-8">
								<Button
									disabled={isPending}
									type="submit"
									aria-busy={isPending}
									className="h-12 w-full rounded-xl bg-[linear-gradient(135deg,var(--sea-ink),var(--lagoon-deep))] px-4 text-sm font-bold uppercase tracking-[0.2em] text-white shadow-[0_16px_36px_rgba(47,106,74,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_46px_rgba(47,106,74,0.28)] text-green-900"
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

						<p className="mt-4 text-center text-xs uppercase tracking-[0.22em] text-[var(--sea-ink-soft)]">
							Secured database access - 2026
						</p>
					</form>
				</section>
			</div>
  )
}

export default Form