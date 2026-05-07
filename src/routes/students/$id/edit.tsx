import {
  createFileRoute,
  useNavigate,
  useRouter,
} from "@tanstack/react-router";
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
import { ArrowLeft, ArrowRight, Loader2, Save, UserCog } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getOneStudent, updatedStudent } from "#/servers/functions/student";
import { useServerFn } from "@tanstack/react-start";
import { toast } from "sonner";

export const Route = createFileRoute("/students/$id/edit")({
  component: RouteComponent,
  loader: async ({ params }) => {
    return getOneStudent({ data: { id: params.id } });
  },
});

function RouteComponent() {
  const { id } = Route.useParams();
  const { student } = Route.useLoaderData();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<StudentFormValues>({
    defaultValues: {
      name: student.name,
      age: student.age,
      classe: student.classe,
    },
  });
  
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const router = useRouter();
  const editStudent = useServerFn(updatedStudent);

  const onSubmit = async (data: StudentFormValues) => {
    setIsPending(true);
    try {
      await editStudent({ data: { id, ...data } });
      toast.success("Profile updated successfully.");
      router.invalidate();
      navigate({ to: "/students/$id/details", params: { id } });
    } catch (error) {
      toast.error("Failed to update profile.");
      console.error(error);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <main className="page-wrap py-12 md:py-20 rise-in">
      <div className="mb-12">
        <Button
          asChild
          variant="ghost"
          className="group -ml-4 h-10 gap-2 rounded-full text-muted-foreground hover:text-foreground"
        >
          <Link to="/students/$id/details" params={{ id }}>
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            Back to Details
          </Link>
        </Button>
      </div>

      <div className="grid gap-16 lg:grid-cols-2">
        <div className="space-y-8">
          <div className="space-y-4">
            <h1 className="display-title text-5xl md:text-6xl font-medium tracking-tight">
              Edit <br />
              <span className="text-accent italic">{student.name}</span>
            </h1>
            <p className="max-w-md text-lg text-muted-foreground leading-relaxed">
              Updating student records helps maintain an accurate registry. 
              Changes are reflected across the system immediately.
            </p>
          </div>

          <div className="rounded-2xl border border-border bg-muted/30 p-6 flex items-start gap-4">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-card border border-border shadow-sm">
              <UserCog className="size-5 text-accent" />
            </div>
            <div>
              <p className="font-semibold text-sm">Active Profile</p>
              <p className="text-xs text-muted-foreground mt-1">
                You are currently editing a verified record. 
                Ensure all details are correct before saving.
              </p>
            </div>
          </div>
        </div>

        <div>
          <Card className="rounded-3xl border-border shadow-2xl shadow-accent/5 overflow-hidden">
            <form onSubmit={handleSubmit(onSubmit)}>
              <CardHeader className="bg-muted/30 px-8 py-8 border-b border-border">
                <CardTitle className="text-2xl">Modify Details</CardTitle>
                <CardDescription>Adjust the student's information below.</CardDescription>
              </CardHeader>

              <CardContent className="p-8 space-y-6">
                <div className="space-y-2">
                  <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                    Full Name
                  </Label>
                  <Input
                    type="text"
                    {...register("name", { required: "Name is required" })}
                    className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
                  />
                  {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
                </div>

                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Age
                    </Label>
                    <Input
                      type="number"
                      {...register("age", { 
                        valueAsNumber: true, 
                        required: "Age is required" 
                      })}
                      className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
                    />
                    {errors.age && <p className="text-xs text-destructive mt-1">{errors.age.message}</p>}
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                      Class Level
                    </Label>
                    <Input
                      type="text"
                      {...register("classe", { required: "Class is required" })}
                      className="h-12 rounded-xl border-border bg-background px-4 focus:ring-accent/20"
                    />
                    {errors.classe && <p className="text-xs text-destructive mt-1">{errors.classe.message}</p>}
                  </div>
                </div>
              </CardContent>

              <CardFooter className="p-8 pt-0">
                <Button
                  disabled={isPending}
                  type="submit"
                  className="h-12 w-full rounded-2xl bg-primary text-primary-foreground font-semibold shadow-lg hover:opacity-90"
                >
                  {isPending ? (
                    <>
                      <Loader2 className="mr-2 size-4 animate-spin" />
                      Saving changes...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 size-4" />
                      Save Changes
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
}
