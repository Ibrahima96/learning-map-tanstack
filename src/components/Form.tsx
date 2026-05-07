import { useServerFn } from "@tanstack/react-start";
import {
	ArrowLeft,
	ArrowRight,
	Loader2,
	PlusCircle,
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
			toast.success("Student created successfully.");
		} catch (error) {
			toast.error("Unable to create the student.");
			console.error(error);
		} finally {
			setIsPending(false);
		}
	};

	return (
		<main className="page-wrap py-12 md:py-20 rise-in">
			<div className="mb-12">
				<Button
					asChild
					variant="ghost"
					className="group -ml-4 h-10 gap-2 rounded-full text-muted-foreground hover:text-foreground"
				>
					<Link to="/">
						<ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
						Back to Registry
					</Link>
				</Button>
			</div>

			<div className="grid gap-16 lg:grid-cols-2">
				<div className="space-y-8">
					<div className="space-y-4">
						<h1 className="display-title text-5xl md:text-6xl font-medium tracking-tight">
							Expand your <br />
							<span className="text-accent italic">class directory.</span>
						</h1>
						<p className="max-w-md text-lg text-muted-foreground leading-relaxed">
							Fill in the details to register a new student. Our system ensures data 
							integrity and provides an instant preview in the registry.
						</p>
					</div>

					<div className="space-y-6">
						<div className="flex gap-4">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
								<PlusCircle className="size-5" />
							</div>
							<div>
								<p className="font-semibold">Quick Addition</p>
								<p className="text-sm text-muted-foreground">Minimal required fields for fast intake.</p>
							</div>
						</div>
						<div className="flex gap-4">
							<div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
								<Sparkles className="size-5" />
							</div>
							<div>
								<p className="font-semibold">Instant Registry</p>
								<p className="text-sm text-muted-foreground">Profile becomes available immediately after submission.</p>
							</div>
						</div>
					</div>
				</div>

				<div>
					<Card className="rounded-3xl border-border shadow-2xl shadow-accent/5 overflow-hidden">
						<form onSubmit={handleSubmit(onSubmit)}>
							<CardHeader className="bg-muted/30 px-8 py-8 border-b border-border">
								<CardTitle className="text-2xl">New Student Profile</CardTitle>
								<CardDescription>Enter the personal details of the student.</CardDescription>
							</CardHeader>

							<CardContent className="p-8 space-y-6">
								<div className="space-y-2">
									<Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
										Full Name
									</Label>
									<Input
										type="text"
										placeholder="e.g. Jean Dupont"
										{...register("name", { required: "Name is required" })}
										className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
									/>
									{errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
								</div>

								<div className="grid gap-6 sm:grid-cols-2">
									<div className="space-y-2">
										<Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
											Age
										</Label>
										<Input
											type="number"
											placeholder="18"
											{...register("age", { 
												valueAsNumber: true, 
												required: "Age is required" 
											})}
											className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
										/>
										{errors.age && <p className="text-xs text-destructive mt-1">{errors.age.message}</p>}
									</div>
									<div className="space-y-2">
										<Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
											Class Level
										</Label>
										<Input
											type="text"
											placeholder="e.g. Master 1"
											{...register("classe", { required: "Class is required" })}
											className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
										/>
										{errors.classe && <p className="text-xs text-destructive mt-1">{errors.classe.message}</p>}
									</div>
								</div>
							</CardContent>

							<CardFooter className="p-8 pt-0">
								<Button
									disabled={isPending}
									type="submit"
									className="h-12 w-full rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90"
								>
									{isPending ? (
										<>
											<Loader2 className="mr-2 size-4 animate-spin" />
											Processing...
										</>
									) : (
										<>
											Register Student
											<ArrowRight className="ml-2 size-4" />
										</>
									)}
								</Button>
							</CardFooter>
						</form>
					</Card>
				</div>
			</div>
		</main>
	);
};

export default Form;
