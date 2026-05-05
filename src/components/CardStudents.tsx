import { ArrowUpRight, GraduationCap, UserRound } from "lucide-react";

import { Card } from "#/components/ui/card";
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
	if (!createdAt) {
		return "Recent entry";
	}

	return new Intl.DateTimeFormat("en-US", {
		month: "short",
		day: "numeric",
		year: "numeric",
	}).format(new Date(createdAt));
}

const CardStudents = ({ name, age, classe, createdAt,_id }: IStudentCard) => {
	const initials = getInitials(name);

	return (
		<Card className="group overflow-hidden rounded-3xl border-(--line) bg-(--surface-strong) p-0 shadow-[0_18px_36px_rgba(30,90,72,0.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_24px_48px_rgba(30,90,72,0.12)]">
			<div className="border-b border-(--line) p-5 sm:p-6">
				<div className="flex items-start justify-between gap-4">
					<div>
						<p className="island-kicker">Student</p>
						<h3 className="mt-2 text-xl font-semibold tracking-tight text-(--sea-ink)">
							{name}
						</h3>
					</div>
					<div className="flex size-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,var(--sea-ink),var(--lagoon-deep))] text-sm font-bold text-white shadow-[0_12px_24px_rgba(23,58,64,0.18)]">
						{initials}
					</div>
				</div>
			</div>

			<div className="grid gap-3 p-5 sm:grid-cols-2 sm:p-6">
				<div className="rounded-2xl border border-(--line) bg-[color-mix(in_oklab,var(--surface)_72%,white)] p-4">
					<div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-(--sea-ink-soft)">
						<UserRound className="size-4" />
						Age
					</div>
					<p className="text-2xl font-semibold text-(--sea-ink)">{age}</p>
				</div>
				<div className="rounded-2xl border border-(--line) bg-[color-mix(in_oklab,var(--surface)_72%,white)] p-4">
					<div className="mb-2 flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-(--sea-ink-soft)">
						<GraduationCap className="size-4" />
						Class
					</div>
					<p className="text-lg font-semibold text-(--sea-ink)">
						{classe}
					</p>
				</div>
			</div>

			<div className="flex items-center justify-between gap-3 border-t border-(--line) px-5 py-4 text-sm text-(--sea-ink-soft) sm:px-6">
				<span>Added {formatCreatedAt(createdAt)}</span>
				<span className="inline-flex items-center gap-1 font-semibold text-(--sea-ink)">
					<Link to="/students/$id/details" params={{id:_id}}>
                    {/* link qui nous dirigera vers les details des students */}
                        View
                        <ArrowUpRight className="size-4" />
                    </Link>
				</span>
			</div>
		</Card>
	);
};

export default CardStudents;
