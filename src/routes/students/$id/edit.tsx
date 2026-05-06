import { createFileRoute } from "@tanstack/react-router";
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
import { useForm } from "react-hook-form";
import { useState } from "react";
import { ArrowLeft, ArrowRight, Loader2, ShieldCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/students/$id/edit")({
  component: RouteComponent,
});

function RouteComponent() {
  const { id } = Route.useParams();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<StudentFormValues>();
  const [isPending, setIsPending] = useState(false);

  const onSubmit = () => {};
  return (
    <div className="max-w-6xl mx-auto px-8 pt-8 pb-16">
      <div className="pt-3 pb-8">
        <Link
          to="/students/$id/details"
          params={{ id }}
          className="flex gap-3 items-center"
        >
          <ArrowLeft className="h-4 w-4" />
          Retour au details
        </Link>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="overflow-hidden rounded-[1.75rem]"
      >
        <Card className="island-shell overflow-hidden rounded-[1.75rem] border-(--line) bg-(--surface-strong) p-0">
          <CardHeader className="border-b border-(--line) px-6 pb-5 pt-6 sm:px-8">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="island-kicker">Edited</p>
                <CardTitle className="mt-2 text-2xl font-bold tracking-tight text-(--sea-ink)">
                  Student Edited
                </CardTitle>
              </div>
              <div className="inline-flex items-center gap-2 rounded-full border border-(--chip-line) bg-(--chip-bg) px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-(--kicker)">
                <ShieldCheck className="size-4" />
                Secure
              </div>
            </div>
            <CardDescription className="mt-3 max-w-lg text-sm leading-7 text-(--sea-ink-soft)">
              Keep the form short and focused. The new card layout keeps the
              fields easy to scan and the action easy to find.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-5 px-6 py-6 sm:px-8">
            <div className="space-y-2">
              <Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-(--kicker)">
                Student name
              </Label>
              <Input
                type="text"
                placeholder="Full name"
                autoComplete="name"
                {...register("name", {
                  required: "Please enter a name.",
                })}
                className="h-12 rounded-xl border border-(--line) bg-white/80 px-4 text-(--sea-ink) shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-(--sea-ink-soft)/60 focus-visible:border-(--lagoon-deep) focus-visible:ring-2 focus-visible:ring-(--lagoon)/30"
              />
              {errors.name && (
                <span className="text-sm text-red-600">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-(--kicker)">
                  Age
                </Label>
                <Input
                  type="number"
                  placeholder="18"
                  inputMode="numeric"
                  {...register("age", {
                    valueAsNumber: true,
                    required: "Please enter an age.",
                  })}
                  className="h-12 rounded-xl border border-(--line) bg-white/80 px-4 text-(--sea-ink) shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-(--sea-ink-soft)/60 focus-visible:border-(--lagoon-deep) focus-visible:ring-2 focus-visible:ring-(--lagoon)/30"
                />
                {errors.age && (
                  <span className="text-sm text-red-600">
                    {errors.age.message}
                  </span>
                )}
              </div>
              <div className="space-y-2">
                <Label className="text-[10px] font-bold uppercase tracking-[0.24em] text-(--kicker)">
                  Class
                </Label>
                <Input
                  type="text"
                  placeholder="Grade A"
                  autoComplete="off"
                  {...register("classe", {
                    required: "Please enter a class.",
                  })}
                  className="h-12 rounded-xl border border-(--line) bg-white/80 px-4 text-(--sea-ink) shadow-[inset_0_1px_0_rgba(255,255,255,0.85)] placeholder:text-(--sea-ink-soft)/60 focus-visible:border-(--lagoon-deep) focus-visible:ring-2 focus-visible:ring-(--lagoon)/30"
                />
                {errors.classe && (
                  <span className="text-sm text-red-600">
                    {errors.classe.message}
                  </span>
                )}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t border-(--line) px-6 pb-6 pt-6 sm:px-8">
            <Button
              disabled={isPending}
              type="submit"
              aria-busy={isPending}
              className="h-12 w-full rounded-full bg-green-800 px-4 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(23,58,64,0.18)] transition hover:-translate-y-0.5 hover:bg-green-950"
            >
              {isPending ? (
                <>
                  <Loader2 className="size-4 animate-spin" />
                  chargement...
                </>
              ) : (
                <>
                  Modifier
                  <ArrowRight className="size-4" />
                </>
              )}
            </Button>
          </CardFooter>
        </Card>
      </form>
    </div>
  );
}
