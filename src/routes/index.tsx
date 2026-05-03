import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
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
	const { register, handleSubmit, reset } = useForm<StudentFormValues>();
	const createStudent = useServerFn(studentServerFn);
	const [errorMessage, setErrorMessage] = useState("");
	const [successMessage, setSuccessMessage] = useState("");
	const router = useRouter()
	const onsubmit = async (values: StudentFormValues) => {
		setErrorMessage("");
		setSuccessMessage("");

		try {
			await createStudent({
				data: values,
			});

			router.invalidate()
			reset();
			setSuccessMessage("Validation enregistrée en base.");
			console.log(values);
		} catch (error) {
			console.error("Erreur lors de l'enregistrement:", error);
			setErrorMessage(
				error instanceof Error
					? error.message
					: "Impossible d'enregistrer la validation.",
			);
		}
	};

	return (
		<main className="h-screen justify-center items-center flex flex-col">
			<form onSubmit={handleSubmit(onsubmit)} className="w-full">
				<Card className="mx-auto w-full max-w-xl">
					<CardHeader>
						<CardTitle>DB</CardTitle>
						<CardDescription>Mongodb - Learnity variant.</CardDescription>
					</CardHeader>

					<CardContent className="space-y-3">
						<Input type="text" placeholder="name" {...register("name")} />
						<Input type="number" placeholder="age" {...register("age")} />
						<Input type="text" placeholder="classe" {...register("classe")} />
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
					<Link className="ml-8" to="/student">Lire</Link>
					{errorMessage ? (
						<p className="px-6 pb-6 text-sm text-red-600">{errorMessage}</p>
					) : null}
					{successMessage ? (
						<p className="px-6 pb-6 text-sm text-green-600">{successMessage}</p>
					) : null}
				</Card>
			</form>
		</main>
	);
}
