import { createFileRoute, Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { Eye } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { studentServerFn } from "#/servers/functions/student";
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

export const Route = createFileRoute("/")({ component: App });

type StudentFormValues = {
	name: string;
	age: number;
	classe: string;
};

function App() {
	const {
		register,
		handleSubmit,
		reset,
		setError,
		clearErrors,
		formState: { errors },
	} = useForm<StudentFormValues>();
	const createStudent = useServerFn(studentServerFn);
	const [successMessage, setSuccessMessage] = useState("");

	const onsubmit = async (values: StudentFormValues) => {
		clearErrors("root");
		setSuccessMessage("");

		try {
			await createStudent({
				data: values,
			});

			reset();
			setSuccessMessage("Validation enregistree en base.");
			console.log(values);
		} catch (error) {
			console.error("Erreur lors de l'enregistrement:", error);
			setError("root", {
				type: "server",
				message:
					error instanceof Error
						? error.message
						: "Impossible d'enregistrer la validation.",
			});
		}
	};

	return (
		<main className="flex h-screen flex-col items-center justify-center">
			<form onSubmit={handleSubmit(onsubmit)} className="w-full">
				<Card className="mx-auto w-full max-w-xl">
					<CardHeader>
						<CardTitle>DB</CardTitle>
						<Link to="/students/student">
							<Eye size={29} />
						</Link>
						<CardDescription>Mongodb - Learnity variant.</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Input
								type="text"
								placeholder="name"
								{...register("name", {
									required: "Soumettre un nom",
									minLength: {
										value: 2,
										message: "Le nom doit contenir au moins 2 caractères",
									},
								})}
							/>
							{errors.name?.message ? (
								<p className="text-sm text-red-600">{errors.name.message}</p>
							) : null}
						</div>
						<div className="space-y-2">
							<Input
								type="number"
								placeholder="age"
								{...register("age", {
									valueAsNumber: true,
									required: "Soumettre un âge",
									min: {
										value: 1,
										message: "L'âge doit être supérieur ou égal à 1",
									},
								})}
							/>
							{errors.age?.message ? (
								<p className="text-sm text-red-600">{errors.age.message}</p>
							) : null}
						</div>
						<div className="space-y-2">
							<Input
								type="text"
								placeholder="classe"
								{...register("classe", {
									required: "Soumettre une classe",
								})}
							/>
							{errors.classe?.message ? (
								<p className="text-sm text-red-600">{errors.classe.message}</p>
							) : null}
						</div>
					</CardContent>

					<CardFooter>
						<Button
							type="submit"
							variant="secondary"
							size="sm"
							className="w-full"
						>
							Action
						</Button>
					</CardFooter>
					{errors.root?.message ? (
						<p className="px-6 pb-6 text-sm text-red-600">
							{errors.root.message}
						</p>
					) : null}
					{successMessage ? (
						<p className="px-6 pb-6 text-sm text-green-600">{successMessage}</p>
					) : null}
				</Card>
			</form>
		</main>
	);
}
