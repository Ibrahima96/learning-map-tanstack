import { createFileRoute } from "@tanstack/react-router";
import { useForm } from "react-hook-form";
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
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/")({ component: App });



function App() {
	const { register, handleSubmit, reset } = useForm<StudentFormValues>();

	const onSubmit = (data: StudentFormValues) => {
		console.log("Form Data:", data);
		reset();
	};

	return (
		<main className="min-h-screen bg-[#0a0a0a] text-zinc-100 flex flex-col items-center justify-center p-6 selection:bg-zinc-500/30">
			<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(24,24,27,1)_0%,rgba(0,0,0,1)_100%)] -z-10" />
			
			<form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-lg transition-all duration-500 ease-in-out">
				<Card className="bg-transparent border-zinc-800 shadow-2xl backdrop-blur-sm overflow-hidden">
					<CardHeader className="pt-12 pb-8 text-center">
						<CardTitle className="text-4xl font-bold tracking-tighter uppercase mb-2">
							Data Entry
						</CardTitle>
						<CardDescription className="text-zinc-500 uppercase tracking-widest text-[10px]">
							Mongodb — Learnity Internal System
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-6 px-10">
						<div className="space-y-1">
							<Label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Student Identity</Label>
							<Input type="text" placeholder="Full name" {...register("name")} className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-400 transition-colors h-12" />
						</div>
						<div className="grid grid-cols-2 gap-4">
							<div className="space-y-1">
								<Label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Age</Label>
								<Input type="number" placeholder="18" {...register("age")} className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-400 transition-colors h-12" />
							</div>
							<div className="space-y-1">
								<Label className="text-[10px] uppercase tracking-widest text-zinc-500 ml-1">Class</Label>
								<Input type="text" placeholder="Grade A" {...register("classe")} className="bg-zinc-900/50 border-zinc-800 focus:border-zinc-400 transition-colors h-12" />
							</div>
						</div>
					</CardContent>

					<CardFooter className="pb-12 pt-8 px-10">
						<Button
							type="submit"
							className="w-full h-14 bg-zinc-100 text-zinc-950 hover:bg-zinc-300 transition-all duration-300 font-bold uppercase tracking-widest text-xs rounded-none"
						>
							Submit Record
						</Button>
					</CardFooter>
				</Card>
				<p className="mt-8 text-center text-zinc-600 text-[10px] uppercase tracking-[0.2em] font-light">
					Secured Database Access — 2024
				</p>
			</form>
		</main>
	);
}
