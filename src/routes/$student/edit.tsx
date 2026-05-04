import { getOneStudentServerFn, updateStudentServerFn } from '#/servers/functions/student'
import { createFileRoute, useNavigate, useRouter } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"

export const Route = createFileRoute('/$student/edit')({
  loader: async ({ params }) => {
    // params.student correspond au nom du dossier `$student`
    return getOneStudentServerFn({ data: { id: params.student } })
  },
  component: RouteComponent,
})

type StudentFormValues = {
  name: string
  age: number
  classe: string
}

function RouteComponent() {
  // Récupération des données initiales chargées par le loader
  const { student } = Route.useLoaderData()
  const router = useRouter()

  const navigate = useNavigate()
  // Utilisation de la fonction de modification côté serveur
  const updateStudent = useServerFn(updateStudentServerFn)

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  // Initialisation du formulaire avec les valeurs par défaut
  const { register, handleSubmit } = useForm<StudentFormValues>({
    defaultValues: {
      name: student.name,
      age: student.age,
      classe: student.classe,
    },
  })

  const onsubmit = async (values: StudentFormValues) => {
    setErrorMessage("")
    setSuccessMessage("")

    try {
      await updateStudent({
        data: {
          id: student._id, // Ne pas oublier de passer l'ID pour la modification
          ...values,
        },
      })
      navigate({ to: '/student', replace: true })
      router.invalidate() // Invalide le cache pour re-déclencher le loader
      setSuccessMessage("Modifications enregistrées avec succès.")
    } catch (error) {
      console.error("Erreur lors de la modification:", error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de modifier l'étudiant."
      )
    }
  }

  return (
    <main className="h-screen justify-center items-center flex flex-col">
      <form onSubmit={handleSubmit(onsubmit)} className="w-full">
        <Card className="mx-auto w-full max-w-xl">
          <CardHeader>
            <CardTitle>Édition de l'étudiant</CardTitle>
            <CardDescription>
              Modifier les informations de {student.name}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-3">
            <Input type="text" placeholder="Nom" {...register("name")} />
            <Input type="number" placeholder="Âge" {...register("age")} />
            <Input type="text" placeholder="Classe" {...register("classe")} />
          </CardContent>

          <CardFooter>
            <Button
              type="submit"
              variant="secondary"
              size="sm"
              className="w-full"
            >
              Sauvegarder les modifications
            </Button>
          </CardFooter>
          {errorMessage ? (
            <p className="px-6 pb-6 text-sm text-red-600">{errorMessage}</p>
          ) : null}
          {successMessage ? (
            <p className="px-6 pb-6 text-sm text-green-600">{successMessage}</p>
          ) : null}
        </Card>
      </form>
    </main>
  )
}
