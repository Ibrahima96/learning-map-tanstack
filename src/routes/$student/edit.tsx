import { getOneStudentServerFn, updateStudentServerFn } from '#/servers/functions/student'
import { createFileRoute, useNavigate, useRouter, Link } from '@tanstack/react-router'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  User, 
  Calendar, 
  GraduationCap, 
  Save, 
  ArrowLeft,
  CheckCircle2,
  AlertCircle
} from "lucide-react"

export const Route = createFileRoute('/$student/edit')({
  loader: async ({ params }) => {
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
  const { student } = Route.useLoaderData()
  const router = useRouter()
  const navigate = useNavigate()
  const updateStudent = useServerFn(updateStudentServerFn)

  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

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
    setIsSubmitting(true)

    try {
      await updateStudent({
        data: {
          id: student._id,
          ...values,
        },
      })
      setSuccessMessage("Modifications enregistrées avec succès.")
      setTimeout(() => {
        navigate({ to: '/student', replace: true })
        router.invalidate()
      }, 1500)
    } catch (error) {
      console.error("Erreur lors de la modification:", error)
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Impossible de modifier l'étudiant."
      )
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen py-12 px-4 flex items-center justify-center bg-transparent">
      <div className="w-full max-w-2xl rise-in">
        <Link 
          to="/student" 
          className="inline-flex items-center gap-2 mb-8 text-sm font-medium nav-link group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Retour à la liste
        </Link>

        <div className="island-shell p-8 md:p-10 rounded-xl relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-lagoon/5 rounded-full -mr-16 -mt-16 blur-3xl" />
          
          <header className="mb-10 relative">
            <span className="island-kicker mb-2 block">Profil Étudiant</span>
            <h1 className="display-title text-4xl md:text-5xl font-bold text-(--sea-ink) leading-tight">
              Édition de <span className="text-(--lagoon-deep)">{student.name}</span>
            </h1>
            <p className="mt-3 text-(--sea-ink-soft) text-lg">
              Mettez à jour les informations essentielles de l'élève.
            </p>
          </header>

          <form onSubmit={handleSubmit(onsubmit)} className="space-y-8 relative">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name Field */}
              <div className="space-y-2 col-span-full">
                <label className="text-sm font-semibold text-(--palm) flex items-center gap-2 ml-1">
                  <User className="w-4 h-4" />
                  Nom complet
                </label>
                <div className="relative group">
                  <Input 
                    type="text" 
                    placeholder="Ex: Jean Dupont" 
                    className="h-12 pl-4 bg-white/40 border-(--line) focus:border-(--lagoon) transition-all duration-300"
                    {...register("name")} 
                  />
                </div>
              </div>

              {/* Age Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-(--palm) flex items-center gap-2 ml-1">
                  <Calendar className="w-4 h-4" />
                  Âge
                </label>
                <Input 
                  type="number" 
                  placeholder="Âge" 
                    className="h-12 bg-white/40 border-(--line) focus:border-(--lagoon) transition-all duration-300"
                  {...register("age")} 
                />
              </div>

              {/* Class Field */}
              <div className="space-y-2">
                <label className="text-sm font-semibold text-(--palm) flex items-center gap-2 ml-1">
                  <GraduationCap className="w-4 h-4" />
                  Classe
                </label>
                <Input 
                  type="text" 
                  placeholder="Ex: Terminale S" 
                    className="h-12 bg-white/40 border-(--line) focus:border-(--lagoon) transition-all duration-300"
                  {...register("classe")} 
                />
              </div>
            </div>

            <div className="pt-4 flex flex-col gap-4">
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full h-14 text-lg font-bold bg-(--lagoon-deep) hover:bg-(--palm) text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                {isSubmitting ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Sauvegarder les modifications
                  </>
                )}
              </Button>

              {errorMessage && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-red-50/50 border border-red-100 text-red-700 animate-in fade-in slide-in-from-top-2">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{errorMessage}</p>
                </div>
              )}

              {successMessage && (
                <div className="flex items-center gap-3 p-4 rounded-xl bg-green-50/50 border border-green-100 text-green-700 animate-in fade-in slide-in-from-top-2">
                  <CheckCircle2 className="w-5 h-5 shrink-0" />
                  <p className="text-sm font-medium">{successMessage}</p>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>
    </main>
  )
}
