import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/$student/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/$student/edit"!</div>
}
