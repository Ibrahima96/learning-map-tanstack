import { ArrowRight, GraduationCap, UserRound } from "lucide-react";
import { Link } from "@tanstack/react-router";

function getInitials(name: string) {
	return name
		.split(" ")
		.filter(Boolean)
		.slice(0, 2)
		.map((part) => part[0]?.toUpperCase() ?? "")
		.join("");
}

function formatCreatedAt(createdAt?: string) {
	if (!createdAt) return "Recent";
	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
	}).format(new Date(createdAt));
}

const CardStudents = ({ name, age, classe, createdAt, _id }: IStudentCard) => {
	const initials = getInitials(name);

	return (
		<Link 
			to="/students/$id/details" 
			params={{ id: _id }}
			className="group block"
		>
			<div className="relative overflow-hidden rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-accent hover:shadow-xl hover:shadow-accent/5">
				<div className="flex items-start justify-between">
					<div className="flex items-center gap-4">
						<div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-foreground font-bold transition-colors group-hover:bg-accent group-hover:text-white">
							{initials}
						</div>
						<div>
							<h3 className="text-lg font-semibold text-foreground group-hover:text-accent transition-colors">
								{name}
							</h3>
							<p className="text-sm text-muted-foreground">Student Profile</p>
						</div>
					</div>
					<div className="rounded-full bg-muted p-1.5 opacity-0 transition-all group-hover:opacity-100 group-hover:translate-x-1">
						<ArrowRight className="size-4 text-accent" />
					</div>
				</div>

				<div className="mt-8 grid grid-cols-2 gap-4">
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft">
							<GraduationCap className="size-4 text-accent" />
						</div>
						<div>
							<p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Class</p>
							<p className="text-sm font-medium text-foreground">{classe}</p>
						</div>
					</div>
					<div className="flex items-center gap-2">
						<div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent-soft">
							<UserRound className="size-4 text-accent" />
						</div>
						<div>
							<p className="text-[10px] font-bold uppercase tracking-wider text-muted-foreground">Age</p>
							<p className="text-sm font-medium text-foreground">{age} yrs</p>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-between border-t border-border pt-4">
					<span className="text-[11px] text-muted-foreground uppercase tracking-widest">
						Joined {formatCreatedAt(createdAt)}
					</span>
					<div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
				</div>
			</div>
		</Link>
	);
};

export default CardStudents;
