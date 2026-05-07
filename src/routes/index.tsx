import CardStudents from "#/components/CardStudents";
import { Button } from "#/components/ui/button";
import { getAllStudents } from "#/servers/functions/student";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus, Users } from "lucide-react";

/**
 * Route principale (Accueil).
 * Utilise un loader pour récupérer la liste de tous les étudiants avant le rendu.
 */
export const Route = createFileRoute("/")({
	component: App,
	loader: async () => await getAllStudents(),
});

function App() {
    // Récupération des données chargées par le loader
	const { students } = Route.useLoaderData() as {
		students: any[]; // Remplacer par l'interface appropriée si disponible
	};
    
	const total = students.length;
	const latestStudent = students[0]; // Le plus récent (car trié par createdAt:-1)

	return (
		<main className="page-wrap py-12 md:py-20">
            {/* Section Hero / En-tête */}
			<section className="mb-16 grid items-center gap-12 lg:grid-cols-2">
				<div className="space-y-6">
					<div className="inline-flex items-center gap-2 rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold text-accent">
						<Users className="size-3.5" />
						Statut Base de Données : Actif
					</div>

					<div className="space-y-4">
						<h1 className="display-title text-5xl font-medium tracking-tight text-foreground md:text-7xl">
							Gestion des Étudiants <br />
							<span className="text-accent">Simplifiée.</span>
						</h1>
						<p className="max-w-lg text-lg leading-relaxed text-muted-foreground">
							Une façon propre et efficace de gérer vos dossiers étudiants. 
							Surveillez les performances et organisez vos listes de classe en un seul endroit.
						</p>
					</div>

					<div className="flex flex-wrap gap-4">
                        {/* Lien vers le formulaire de création */}
						<Button
							asChild
							className="h-12 rounded-full bg-primary px-6 text-sm font-medium text-primary-foreground transition-all hover:opacity-90 shadow-lg"
						>
							<Link to="/students/form">
								<Plus className="mr-2 size-4" />
								Ajouter un Étudiant
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
							<span className="ml-2">{total} dossiers enregistrés</span>
						</div>
					</div>
				</div>

                {/* Section Statistiques Rapides */}
				<div className="relative">
					<div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-tr from-accent/10 to-transparent blur-2xl" />
					<div className="relative grid gap-4 sm:grid-cols-2">
						<div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
							<p className="text-xs font-bold uppercase tracking-wider text-accent">Total Système</p>
							<p className="mt-2 text-4xl font-medium text-foreground">{total}</p>
							<p className="mt-2 text-sm text-muted-foreground">Étudiants inscrits</p>
						</div>
						<div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
							<p className="text-xs font-bold uppercase tracking-wider text-accent">Dernière Entrée</p>
							<p className="mt-2 text-xl font-medium text-foreground truncate">
								{latestStudent?.name ?? "N/A"}
							</p>
							<p className="mt-2 text-sm text-muted-foreground">
								{latestStudent ? `Classe ${latestStudent.classe}` : "En attente de données"}
							</p>
						</div>
					</div>
				</div>
			</section>

            {/* Liste des étudiants (Registre) */}
			<section className="rise-in">
				<div className="mb-8 flex items-end justify-between gap-4 border-b border-border pb-6">
					<div>
						<h2 className="text-2xl font-medium text-foreground">Registre des Étudiants</h2>
						<p className="mt-1 text-sm text-muted-foreground">
							Affichage de tous les {total} dossiers du système.
						</p>
					</div>
				</div>

				{students.length ? (
                    // Grille des cartes étudiants
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{students.map((student) => (
							<CardStudents key={student._id} {...student} />
						))}
					</div>
				) : (
                    // État vide si aucun étudiant n'est trouvé
					<div className="rounded-3xl border-2 border-dashed border-border p-12 text-center">
						<div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-muted">
							<Users className="size-6 text-muted-foreground" />
						</div>
						<h3 className="mt-4 text-lg font-medium text-foreground">Aucun étudiant trouvé</h3>
						<p className="mt-2 text-muted-foreground">Commencez par ajouter votre premier dossier étudiant.</p>
						<Button
							asChild
							className="mt-6 h-10 rounded-full bg-primary px-5 text-sm font-medium"
						>
							<Link to="/students/form">Ajouter un Étudiant</Link>
						</Button>
					</div>
				)}
			</section>
		</main>
	);
}

export default App;
