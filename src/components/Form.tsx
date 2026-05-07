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
import { Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { z } from "zod";

import { createStudentFn } from "#/servers/functions/student";
import { studentSchema } from "#/lib/zod";
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

// Définition du type des valeurs du formulaire basé sur le schéma Zod
type StudentFormValues = z.infer<typeof studentSchema>;

/**
 * Composant de formulaire pour la création d'un étudiant.
 */
const Form = () => {
  const navigate = useNavigate();
  
  // Initialisation du formulaire avec react-hook-form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StudentFormValues>();

  const [isPending, setIsPending] = useState(false);
  
  // Hook pour appeler la fonction serveur de création
  const createStudent = useServerFn(createStudentFn);

  /**
   * Gère la soumission du formulaire.
   */
  const onSubmit = async (data: StudentFormValues) => {
    setIsPending(true);
    try {
      // Appel de la fonction serveur avec les données du formulaire
      await createStudent({data});
      
      // Feedback utilisateur et redirection
      toast.success("Étudiant créé avec succès.");
      navigate({ to: "/" });
      reset(); // Réinitialise le formulaire
    } catch (error) {
      toast.error("Impossible de créer l'étudiant.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="page-wrap py-12 md:py-20 rise-in">
      {/* Bouton retour */}
      <div className="mb-12">
        <Button
          asChild
          variant="ghost"
          className="group -ml-4 h-10 gap-2 rounded-full text-muted-foreground hover:text-foreground"
        >
          <Link to="/">
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Retour au Registre
          </Link>
        </Button>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        {/* Section Titre et Introduction */}
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="display-title text-5xl md:text-6xl font-medium tracking-tight">
              Étendez votre <br />
              <span className="text-accent italic">annuaire de classe.</span>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
              Remplissez les détails pour enregistrer un nouvel étudiant. Notre système garantit l'intégrité des données.
            </p>
          </div>

          {/* Points forts / Avantages */}
          <div className="space-y-6">
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <PlusCircle className="size-5" />
              </div>
              <div>
                <p className="font-semibold">Ajout Rapide</p>
                <p className="text-sm text-muted-foreground">
                  Champs minimaux requis pour une saisie efficace.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Sparkles className="size-5" />
              </div>
              <div>
                <p className="font-semibold">Registre Instantané</p>
                <p className="text-sm text-muted-foreground">
                  Le profil est disponible immédiatement après soumission.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Formulaire de création */}
        <div>
          <Card className="rounded-3xl border-border shadow-2xl shadow-accent/5 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader className="bg-muted/30 px-8 py-8 border-b border-border">
                <CardTitle className="text-2xl">Nouveau Profil Étudiant</CardTitle>
                <CardDescription>
                  Saisissez les informations personnelles de l'étudiant.
                </CardDescription>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                {/* Champ Nom */}
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Nom Complet
                  </Label>
                  <Input
                    type="text"
                    placeholder="ex. Jean Dupont"
                    {...register("name", { required: "Le nom est requis" })}
                    className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
                  />
                  {errors.name && (
                    <p className="text-xs text-destructive mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  {/* Champ Âge */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Âge
                    </Label>
                    <Input
                      type="number"
                      placeholder="18"
                      {...register("age", {
                        valueAsNumber: true,
                        required: "L'âge est requis",
                      })}
                      className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
                    />
                    {errors.age && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.age.message}
                      </p>
                    )}
                  </div>
                  {/* Champ Classe */}
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Niveau Scolaire
                    </Label>
                    <Input
                      type="text"
                      placeholder="ex. Master 1"
                      {...register("classe", { required: "La classe est requise" })}
                      className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
                    />
                    {errors.classe && (
                      <p className="text-xs text-destructive mt-1">
                        {errors.classe.message}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>

              {/* Bouton de soumission */}
              <CardFooter className="p-8 pt-0">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Traitement en cours...
                    </>
                  ) : (
                    <>
                      Enregistrer l'Étudiant
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
