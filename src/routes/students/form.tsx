// biome-ignore assist/source/organizeImports: <explanation>
import Form from "#/components/Form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/students/form")({
	component: RouteComponent,
});

function RouteComponent() {
	return <Form />;
}
