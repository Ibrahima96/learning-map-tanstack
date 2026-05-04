import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { studentServerFn } from "#/servers/functions/student";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  UserPlus, 
  User, 
  Calendar, 
  GraduationCap, 
  PlusCircle, 
  CheckCircle2, 
  AlertCircle,
  Database,
  ArrowRight
} from "lucide-react";

export const Route = createFileRoute("/")({ component: App });

type StudentFormValues = {
	name: string;
	age: number;
	classe: string;
};

function App() {
	const { register, handleSubmit, reset } = useForm<StudentFormValues>();
	const createStudent = useServerFn(studentServerFn);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter()

	const onsubmit = async (values: StudentFormValues) => {
		setErrorMessage("");
		setSuccessMessage("");
		setIsSubmitting(true);

		try {
			await createStudent({
				data: values,
			});

			router.invalidate();
			reset();
			setSuccessMessage("Étudiant enregistré avec succès en base de données.");
			setTimeout(() => setSuccessMessage(""), 3000);
		} catch (error) {
			console.error("Erreur lors de l'enregistrement:", error);
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Impossible d'enregistrer l'étudiant.",
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<main className="min-h-screen py-20 px-4 flex items-center justify-center bg-transparent">
			<div className="w-full max-w-2xl rise-in">
				<div className="island-shell p-8 md:p-12 rounded-xl relative overflow-hidden">
					{/* Decorative background glow */}
					<div className="absolute -top-24 -left-24 w-64 h-64 bg-(--lagoon)/10 rounded-full blur-3xl" />
					
					<header className="mb-12 relative text-center">
						<div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-(--lagoon)/10 border border-(--lagoon)/20 mb-4">
							<Database className="w-4 h-4 text-(--lagoon-deep)" />
							<span className="island-kicker text-(--lagoon-deep) tracking-widest">MongoDB Integration</span>
						</div>
						<h1 className="display-title text-5xl md:text-6xl font-bold text-(--sea-ink) mb-4">
							Nouveau <span className="text-(--palm)">Étudiant</span>
						</h1>
						<p className="text-(--sea-ink-soft) text-lg max-w-md mx-auto">
							Enregistrez un nouvel élève dans la plateforme Learnity avec validation instantanée.
						</p>
					</header>

					<form onSubmit={handleSubmit(onsubmit)} className="space-y-8 relative">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
							{/* Name Field */}
							<div className="space-y-3 col-span-full">
								<label className="text-sm font-bold text-(--palm) flex items-center gap-2 ml-1">
									<User className="w-4 h-4" />
									Nom complet
								</label>
								<Input 
									type="text" 
									placeholder="Ex: Alice Martin" 
									className="h-14 pl-4 bg-white/40 border-(--line) focus:border-(--lagoon) transition-all duration-300 rounded-xl"
									{...register("name")} 
								/>
							</div>

							{/* Age Field */}
							<div className="space-y-3">
								<label className="text-sm font-bold text-(--palm) flex items-center gap-2 ml-1">
									<Calendar className="w-4 h-4" />
									Âge
								</label>
								<Input 
									type="number" 
									placeholder="Âge" 
									className="h-14 bg-white/40 border-(--line) focus:border-(--lagoon) transition-all duration-300 rounded-xl"
									{...register("age")} 
								/>
							</div>

							{/* Class Field */}
							<div className="space-y-3">
								<label className="text-sm font-bold text-(--palm) flex items-center gap-2 ml-1">
									<GraduationCap className="w-4 h-4" />
									Classe
								</label>
								<Input 
									type="text" 
									placeholder="Ex: Master 2" 
									className="h-14 bg-white/40 border-(--line) focus:border-(--lagoon) transition-all duration-300 rounded-xl"
									{...register("classe")} 
								/>
							</div>
						</div>

						<div className="pt-6 flex flex-col gap-6">
							<Button
								type="submit"
								disabled={isSubmitting}
								className="w-full h-16 text-xl font-black bg-(--sea-ink) hover:bg-(--lagoon-deep) text-white rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-500 flex items-center justify-center gap-4 active:scale-[0.97]"
							>
								{isSubmitting ? (
									<div className="w-7 h-7 border-3 border-white/20 border-t-white rounded-full animate-spin" />
								) : (
									<>
										<PlusCircle className="w-6 h-6" />
										Créer le profil
									</>
								)}
							</Button>

							<div className="flex items-center justify-between px-2">
								<Link 
									to="/student" 
									className="text-sm font-semibold text-(--lagoon-deep) hover:text-(--palm) flex items-center gap-2 transition-colors group"
								>
									Consulter la liste
									<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
								</Link>
							</div>

							{errorMessage && (
								<div className="flex items-center gap-3 p-5 rounded-2xl bg-red-50/50 border border-red-100 text-red-700 animate-in zoom-in-95 duration-300">
									<AlertCircle className="w-6 h-6 shrink-0" />
									<p className="text-sm font-semibold">{errorMessage}</p>
								</div>
							)}

							{successMessage && (
								<div className="flex items-center gap-3 p-5 rounded-2xl bg-green-50/50 border border-green-100 text-green-700 animate-in zoom-in-95 duration-300">
									<CheckCircle2 className="w-6 h-6 shrink-0" />
									<p className="text-sm font-semibold">{successMessage}</p>
								</div>
							)}
						</div>
					</form>
				</div>
			</div>
		</main>
	);
}
