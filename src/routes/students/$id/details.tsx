import { getOneStudent } from "#/servers/functions/student";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Button } from "#/components/ui/button";
import {
  User,
  GraduationCap,
  Calendar,
  Clock,
  ArrowLeft,
  Loader2,
  Hash,
} from "lucide-react";

export const Route = createFileRoute("/students/$id/details")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();

  const { data, isLoading, isError } = useQuery({
    queryKey: ["student", id],
    queryFn: async () => await getOneStudent({ data: { id } }),
  });

  if (isLoading) {
    return (
      <div className="flex h-[50vh] w-full items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-muted-foreground animate-pulse">
          <div className="relative flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
          <p className="text-sm font-medium">Chargement du profil étudiant...</p>
        </div>
      </div>
    );
  }

  if (isError || !data?.student) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center p-4">
        <Card className="w-full max-w-md border-destructive/20 bg-destructive/5 shadow-lg">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <User className="h-8 w-8 text-destructive" />
            </div>
            <CardTitle className="text-2xl text-destructive">
              Étudiant introuvable
            </CardTitle>
            <CardDescription className="text-base text-destructive/80 mt-2">
              Impossible de charger les informations de cet étudiant. Le profil a
              peut-être été supprimé ou l'identifiant est incorrect.
            </CardDescription>
          </CardHeader>
          <CardFooter className="flex justify-center pb-8">
            <Button asChild variant="default" className="min-w-[200px]">
              <Link to="/">Retour à l'accueil</Link>
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  const student = data.student;
  const createdAt = new Date(student.createdAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
  const updatedAt = new Date(student.updatedAt).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4 md:px-6 animate-in fade-in duration-500">
      <div className="mb-8">
        <Button
          asChild
          variant="ghost"
          className="gap-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <Link to="/">
            <ArrowLeft className="h-4 w-4" />
            Retour à la liste
          </Link>
        </Button>
      </div>

      <div className="space-y-8">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight bg-gradient-to-br from-foreground to-muted-foreground bg-clip-text text-transparent">
            Détails de l'étudiant
          </h1>
          <p className="text-muted-foreground text-lg">
            Informations complètes du profil de scolarité.
          </p>
        </div>

        <Card className="overflow-hidden border-border/40 shadow-xl bg-card/50 backdrop-blur-sm">
          <div className="h-32 bg-gradient-to-r from-primary/20 via-primary/10 to-background border-b border-border/40 relative">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0))]" />
          </div>

          <CardHeader className="relative px-6 sm:px-8 pb-0 -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end gap-5">
              <div className="h-28 w-28 rounded-full border-4 border-background bg-primary/10 flex items-center justify-center shadow-md ring-1 ring-border/20 z-10">
                <User className="h-14 w-14 text-primary" />
              </div>
              <div className="mb-2 space-y-1">
                <CardTitle className="text-3xl font-bold">
                  {student.name}
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono bg-muted/50 w-fit px-2 py-0.5 rounded-md">
                  <Hash className="h-3.5 w-3.5" />
                  {student._id}
                </div>
              </div>
            </div>
          </CardHeader>

          <CardContent className="px-6 sm:px-8 py-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-8">
              <div className="group space-y-2 rounded-xl border border-border/50 bg-background/50 p-5 transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <GraduationCap className="h-4 w-4" />
                  </div>
                  Classe Actuelle
                </div>
                <div className="text-2xl font-semibold pl-11">
                  {student.classe}
                </div>
              </div>

              <div className="group space-y-2 rounded-xl border border-border/50 bg-background/50 p-5 transition-all hover:shadow-md hover:border-primary/20">
                <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                  <div className="p-2 rounded-md bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <Calendar className="h-4 w-4" />
                  </div>
                  Âge
                </div>
                <div className="text-2xl font-semibold pl-11">
                  {student.age} ans
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-border/40 bg-muted/20 p-5 space-y-4">
              <h3 className="text-sm font-medium text-muted-foreground mb-4 uppercase tracking-wider">
                Historique du profil
              </h3>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Date de création
                </div>
                <div className="font-medium bg-background px-3 py-1 rounded-md border border-border/50 shadow-sm">
                  {createdAt}
                </div>
              </div>

              <div className="h-px bg-border/40 my-1" />

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-sm">
                <div className="flex items-center gap-2.5 text-foreground/80">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  Dernière modification
                </div>
                <div className="font-medium bg-background px-3 py-1 rounded-md border border-border/50 shadow-sm">
                  {updatedAt}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
