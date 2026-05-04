import { createFileRoute, Link, useNavigate } from '@tanstack/react-router'
import { deleteServerFn, getOneStudentServerFn } from '#/servers/functions/student'
import { useServerFn } from '@tanstack/react-start'
import { useState } from 'react'
import { Button } from '#/components/ui/button'

/**
 * 1. DÉFINITION DE LA ROUTE
 * Le nom du fichier '$studentId.tsx' crée un paramètre dynamique dans l'URL.
 * Accessible via params.studentId.
 */
export const Route = createFileRoute('/id/$studentId')({
  component: RouteComponent,
  /**
   * 2. LE LOADER (SSR / Pré-chargement)
   * S'exécute côté serveur pour récupérer les données avant d'afficher la page.
   * C'est ici qu'on appelle nos fonctions de lecture (GET).
   */
  loader: async ({ params }) => {
    // On passe l'ID récupéré de l'URL à notre fonction serveur
    return await getOneStudentServerFn({ data: { id: params.studentId } })
  },
})

function RouteComponent() {
  /**
   * 3. RÉCUPÉRATION DES DONNÉES DU LOADER
   * useLoaderData() donne accès à ce que la fonction loader a retourné.
   */
  const { student } = Route.useLoaderData()

  /**
   * 4. RÉCUPÉRATION DES PARAMÈTRES D'URL
   * Utile si on a besoin de l'ID pour une autre action (comme la suppression).
   */
  const { studentId } = Route.useParams()

  /**
   * 5. ACTIONS SERVEUR (MUTATIONS)
   * useServerFn permet d'appeler une fonction qui s'exécute sur le serveur.
   * Idéal pour créer, modifier ou supprimer (POST).
   */
  const deleteStudent = useServerFn(deleteServerFn)

  /**
   * 6. NAVIGATION PROGRAMMATIQUE
   * Hook pour rediriger l'utilisateur après une action.
   */
  const navigate = useNavigate()

  // État local pour gérer l'affichage pendant l'attente du serveur
  const [isPending, setIsPending] = useState(false)

  const handleClick = async () => {
    if (!confirm('Voulez-vous vraiment supprimer cet étudiant ?')) return

    setIsPending(true)
    try {
      // On appelle la fonction serveur pour supprimer
      await deleteStudent({ data: { id: studentId } })
      // Une fois fini, on retourne à la liste
      navigate({ to: '/student' })
    } catch (error) {
      console.error('Erreur lors de la suppression:', error)
      alert('Une erreur est survenue.')
    } finally {
      setIsPending(false)
    }
  }

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell mx-auto max-w-2xl rounded-2xl p-6 sm:p-10">

        {/* En-tête avec navigation de retour */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/student"
            className="text-sm font-medium text-(--sea-ink-soft) transition-colors hover:text-(--sea-ink)"
          >
            ← Retour à la liste
          </Link>
          <span className="island-kicker uppercase tracking-wider">Détails Étudiant</span>
        </div>

        <div className="space-y-6">
          <header>
            <h1 className="display-title text-4xl font-bold text-(--sea-ink) sm:text-5xl">
              {student.name}
            </h1>
            <p className="mt-2 text-xl text-(--sea-ink-soft)">
              Classe : <span className="font-semibold text-(--sea-ink)">{student.classe}</span>
            </p>
          </header>

          {/* Grille d'informations */}
          <div className="grid grid-cols-1 gap-6 border-y border-(--sea-ink-soft)/20 py-8 sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-(--sea-ink-soft)">Âge</p>
              <p className="mt-1 text-lg font-medium text-(--sea-ink)">{student.age} ans</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-(--sea-ink-soft)">Identifiant</p>
              <p className="mt-1 font-mono text-sm text-(--sea-ink-soft)">{student._id}</p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-(--sea-ink-soft)">Créé le</p>
              <p className="mt-1 text-sm text-(--sea-ink)">
                {student.createdAt ? new Date(student.createdAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : 'Non renseigné'}
              </p>
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-(--sea-ink-soft)">Dernière mise à jour</p>
              <p className="mt-1 text-sm text-(--sea-ink)">
                {student.updatedAt ? new Date(student.updatedAt).toLocaleDateString('fr-FR', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric'
                }) : 'Jamais'}
              </p>
            </div>
          </div>

          {/* Zone d'actions critiques */}
          <div className="flex justify-between pt-4">
            <Button
              onClick={handleClick}
              disabled={isPending}
              variant="outline"
              className="group border border-red-600 cursor-pointer relative flex items-center gap-2 overflow-hidden rounded-xl bg-red-50 px-6 py-3 font-semibold text-red-600 transition-all hover:bg-red-600 hover:text-white disabled:opacity-50"
            >
              <span className="relative z-10">
                {isPending ? 'Suppression en cours...' : 'Supprimer le profil'}
              </span>
            </Button>

            <Link to='/$student/edit' params={{ student: studentId }}>
              <Button
              className='cursor-pointer'
                variant="secondary"
              >
                Modifier
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
