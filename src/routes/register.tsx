import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { UserPlus } from "lucide-react";

export const Route = createFileRoute("/register")({
	component: RegisterPage,
});

function RegisterPage() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const { error } = await authClient.signUp.email({
			email,
			password,
			name,
			callbackURL: "/",
		});

		if (error) {
			toast.error(error.message || "Erreur lors de l'inscription");
			setLoading(false);
		} else {
			toast.success("Compte créé avec succès !");
			navigate({ to: "/" });
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
			<Card className="w-full max-w-md border-border shadow-xl">
				<CardHeader className="space-y-1">
					<div className="flex justify-center mb-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
							<UserPlus className="size-6" />
						</div>
					</div>
					<CardTitle className="text-2xl text-center">Inscription</CardTitle>
					<CardDescription className="text-center">
						Créez votre compte pour commencer à gérer vos étudiants
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleRegister}>
					<CardContent className="space-y-4">
						<div className="space-y-2">
							<Label htmlFor="name">Nom complet</Label>
							<Input
								id="name"
								placeholder="Jean Dupont"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
								className="h-11"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="nom@exemple.com"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								required
								className="h-11"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="password">Mot de passe</Label>
							<Input
								id="password"
								type="password"
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								required
								className="h-11"
							/>
						</div>
					</CardContent>
					<CardFooter className="flex flex-col space-y-4">
						<Button type="submit" className="w-full h-11" disabled={loading}>
							{loading ? "Création..." : "S'inscrire"}
						</Button>
						<p className="text-center text-sm text-muted-foreground">
							Vous avez déjà un compte ?{" "}
							<Link to="/login" className="text-primary hover:underline font-medium">
								Se connecter
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
