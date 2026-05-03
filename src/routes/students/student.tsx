import CardStudent from "#/components/CardStudent";
import { getStudentServerFn } from "#/servers/functions/student";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/students/student")({
	component: StudentComponent,
});

function StudentComponent() {
	const getStudents = useServerFn(getStudentServerFn)
	const { data, isLoading, error } = useQuery({
		queryKey: ["students"],
		queryFn: () => getStudents()
	})

	console.log(data)
	return (
		<div
			className="min-h-[calc(100vh-32px)] text-white p-8 flex items-center justify-center w-full"
			style={{
				backgroundImage:
					"radial-gradient(50% 50% at 80% 80%, #f4a460 0%, #8b4513 70%, #1a0f0a 100%)",
			}}
		>
			<div className="bg-white/10 backdrop-blur-lg rounded-xl p-8 shadow-lg flex flex-col gap-4 text-3xl min-w-1/2">
				{/* <CardStudent /> */}
				{data?.map((student) => (
					<div key={student._id}>
						{student.name} - {student.age} - {student.classe}
					</div>
				))}
			</div>
		</div>
	);
}
