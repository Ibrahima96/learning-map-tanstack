import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import {
  AlertTriangle,
  ArrowLeft,
  Calendar,
  Clock,
  Edit3,
  GraduationCap,
  IdCard,
  ShieldCheck,
  User,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { deletedStudentFn, getOneStudent } from "#/servers/functions/student";
import { useServerFn } from "@tanstack/react-start";

// Formateur de date pour un affichage lisible
const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

/**
 * Fonction utilitaire pour formater une chaîne de date ISO en format lisible.
 */
function formatDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "N/A";
  return dateFormatter.format(date);
}

// Définition de la route TanStack avec l'ID dynamique
export const Route = createFileRoute("/students/$id/details")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  
  // Utilisation de useServerFn pour appeler la fonction de suppression côté serveur
  const deleted = useServerFn(deletedStudentFn);

  /**
   * Gère la suppression d'un étudiant avec confirmation.
   */
  const onDeleted = async (studentId: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer cet étudiant ?")) return;
    
    try {
      await deleted({ data: { id: studentId } });
      toast.success("Étudiant supprimé avec succès");
      navigate({ to: "/" }); // Redirection vers l'accueil après suppression
    } catch (error) {
      toast.error("Échec de la suppression de l'étudiant");
      console.error(error);
    }
  };

  /**
   * Récupération des données de l'étudiant via TanStack Query.
   */
  const { data, isLoading, isError } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => await getOneStudent({ data: { id } }),
  });

  // Affichage de l'état de chargement (Squelette/Pulse)
  if (isLoading) {
    return (
      <div className="page-wrap py-12 md:py-20 animate-pulse">
        <div className="h-8 w-32 bg-muted rounded-full mb-8" />
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 h-[400px] bg-muted rounded-3xl" />
          <div className="h-[400px] bg-muted rounded-3xl" />
        </div>
      </div>
    );
  }

  // Affichage en cas d'erreur ou d'étudiant non trouvé
  if (isError || !data?.student) {
    return (
      <div className="page-wrap py-20 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10 text-destructive mb-6">
          <AlertTriangle className="size-8" />
        </div>
        <h1 className="text-3xl font-medium tracking-tight">
          Étudiant Introuvable
        </h1>
        <p className="mt-2 text-muted-foreground">
          Le profil que vous recherchez n'existe pas ou a été supprimé.
        </p>
        <Button asChild className="mt-8 rounded-full">
          <Link to="/">Retour au Registre</Link>
        </Button>
      </div>
    );
  }

  const student = data.student;

  return (
    <div className="page-wrap py-12 md:py-20 rise-in">
      {/* Barre de navigation supérieure */}
      <div className="mb-12 flex items-center justify-between">
        <Button
          asChild
          variant="ghost"
          className="group -ml-4 h-10 gap-2 rounded-full text-muted-foreground hover:text-foreground"
        >
          <Link to="/">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Registre
          </Link>
        </Button>

        <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-accent shadow-sm">
          <ShieldCheck className="size-3.5" />
          Profil Vérifié
        </div>
      </div>

      <div className="grid gap-12 lg:grid-cols-3">
        {/* Contenu principal : Informations de l'étudiant */}
        <div className="lg:col-span-2 space-y-12">
          <section>
            <h1 className="display-title text-5xl md:text-6xl font-medium tracking-tight mb-4">
              {student.name}
            </h1>
            <p className="text-xl text-muted-foreground max-w-xl">
              Un aperçu du statut académique et des informations personnelles de l'étudiant.
            </p>
          </section>

          {/* Cartes de statistiques rapides */}
          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent mb-6">
                <GraduationCap className="size-6" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Niveau Scolaire
              </h3>
              <p className="text-3xl font-medium">{student.classe}</p>
            </div>
            <div className="rounded-3xl border border-border bg-card p-8 shadow-sm">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-soft text-accent mb-6">
                <User className="size-6" />
              </div>
              <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground mb-1">
                Âge
              </h3>
              <p className="text-3xl font-medium">{student.age} ans</p>
            </div>
          </div>

          {/* Détails techniques du système */}
          <Card className="rounded-3xl border-border shadow-sm overflow-hidden">
            <CardHeader className="border-b border-border bg-muted/30 px-8 py-6">
              <div className="flex items-center gap-3">
                <IdCard className="size-5 text-accent" />
                <CardTitle className="text-lg">Identification Système</CardTitle>
              </div>
            </CardHeader>
            <CardContent className="p-8">
              <div className="grid gap-8 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    ID Interne (Database)
                  </p>
                  <code className="block rounded-lg bg-muted px-4 py-3 text-sm font-mono text-foreground border border-border">
                    {student._id}
                  </code>
                </div>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground mb-2">
                    Statut du Profil
                  </p>
                  <div className="inline-flex items-center gap-2 rounded-lg bg-accent/10 px-4 py-3 border border-accent/20">
                    <div className="size-2 rounded-full bg-accent animate-pulse" />
                    <span className="text-sm font-medium text-accent">
                      Entrée Active
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Barre latérale : Actions et Chronologie */}
        <aside className="space-y-6">
          <Card className="rounded-3xl border-border shadow-lg">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="text-xl">Actions Rapides</CardTitle>
              <CardDescription>Gérer les dossiers de cet étudiant.</CardDescription>
            </CardHeader>
            <CardContent className="px-8 space-y-4">
              <Button
                asChild
                className="w-full h-12 rounded-2xl bg-primary text-primary-foreground shadow-sm hover:opacity-90"
              >
                <Link to="/students/$id/edit" params={{ id }}>
                  <Edit3 className="mr-2 size-4" />
                  Modifier le Profil
                </Link>
              </Button>
              <Button
                onClick={() => onDeleted(student._id)}
                variant="outline"
                className="w-full h-12 rounded-2xl border-border hover:bg-muted/50 text-destructive hover:text-destructive"
              >
                Supprimer le Dossier
              </Button>
            </CardContent>
          </Card>

          {/* Chronologie de création/modification */}
          <Card className="rounded-3xl border-border shadow-sm bg-muted/20">
            <CardHeader className="px-8 pt-8">
              <CardTitle className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                Chronologie
              </CardTitle>
            </CardHeader>
            <CardContent className="px-8 pb-8 space-y-6">
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card border border-border shadow-sm">
                  <Calendar className="size-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Date de Création</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(student.createdAt)}
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card border border-border shadow-sm">
                  <Clock className="size-4 text-accent" />
                </div>
                <div>
                  <p className="text-sm font-semibold">Dernière Mise à Jour</p>
                  <p className="text-xs text-muted-foreground">
                    {formatDate(student.updatedAt)}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>
    </div>
  );
}
