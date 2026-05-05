import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/students/$id/details')({
  component: RouteComponent,
})

function RouteComponent() {
  const {id} = Route.useParams()
  return <div>Hello "/students/$id/details"! {id}</div>
}
