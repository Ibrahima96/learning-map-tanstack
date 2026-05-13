import { authClient } from "#/lib/auth-client";
import { Button } from "#/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "#/components/ui/card";
import { Input } from "#/components/ui/input";
import { Label } from "#/components/ui/label";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { LogIn } from "lucide-react";

export const Route = createFileRoute("/login")({
	component: LoginPage,
});

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [loading, setLoading] = useState(false);
	const navigate = useNavigate();

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		const { error } = await authClient.signIn.email({
			email,
			password,
			callbackURL: "/",
		});

		if (error) {
			toast.error(error.message || "Erreur lors de la connexion");
			setLoading(false);
		} else {
			toast.success("Connexion réussie !");
			navigate({ to: "/" });
		}
	};

	return (
		<div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
			<Card className="w-full max-w-md border-border shadow-xl">
				<CardHeader className="space-y-1">
					<div className="flex justify-center mb-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-lg">
							<LogIn className="size-6" />
						</div>
					</div>
					<CardTitle className="text-2xl text-center">Connexion</CardTitle>
					<CardDescription className="text-center">
						Entrez vos identifiants pour accéder à votre compte
					</CardDescription>
				</CardHeader>
				<form onSubmit={handleLogin}>
					<CardContent className="space-y-4">
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
							<div className="flex items-center justify-between">
								<Label htmlFor="password">Mot de passe</Label>
							</div>
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
							{loading ? "Connexion..." : "Se connecter"}
						</Button>
						<p className="text-center text-sm text-muted-foreground">
							Vous n'avez pas de compte ?{" "}
							<Link to="/register" className="text-primary hover:underline font-medium">
								S'inscrire
							</Link>
						</p>
					</CardFooter>
				</form>
			</Card>
		</div>
	);
}
