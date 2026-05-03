import { createFileRoute, Link } from '@tanstack/react-router'
import { getstudentServerFn } from '../servers/functions/student'
import StudentList from '#/components/StudentList'

export const Route = createFileRoute('/student')({
  component: About,
  loader: async () => {
    return await getstudentServerFn()
  },
})

function About() {
  const { students } = Route.useLoaderData()
 

  return (
    <main className="page-wrap px-4 py-12">
      <section className="island-shell rounded-2xl p-6 sm:p-8">
        <Link to="/" className="island-kicker mb-2">accueil</Link>
        <p className="island-kicker mb-2">student</p>
        <h1 className="display-title mb-3 text-4xl font-bold text-(--sea-ink) sm:text-5xl">
          A small starter with room to grow.
        </h1>
        <div className="mt-6 flex flex-col gap-3">
          {students.length === 0 ? (
            <p className="text-(--sea-ink-soft)">Aucun étudiant trouvé.</p>
          ) : (
            students.map((student: IStudent) => (
             <StudentList key={student._id} {...student}/>
            ))
          )}
        </div>
      </section>
    </main>
  )
}
