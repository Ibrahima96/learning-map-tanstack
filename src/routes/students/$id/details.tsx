import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import {
	AlertTriangle,
	ArrowLeft,
	ArrowUpRight,
	CalendarDays,
	Clock3,
	GraduationCap,
	Hash,
	PencilLine,
	Sparkles,
	UserRound,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { getOneStudent } from "#/servers/functions/student";

const dateTimeFormatter = new Intl.DateTimeFormat("fr-FR", {
	day: "numeric",
	month: "long",
	year: "numeric",
	hour: "2-digit",
	minute: "2-digit",
});

function formatDateTime(value: string) {
	const date = new Date(value);

	if (Number.isNaN(date.getTime())) {
		return "Date indisponible";
	}

	return dateTimeFormatter.format(date);
}

export const Route = createFileRoute("/students/$id/details")({
	component: RouteComponent,
});

function RouteComponent() {
	const { id } = Route.useParams();

	const { data, isLoading, isError } = useQuery({
		queryKey: ["student", id],
		queryFn: async () => await getOneStudent({ data: { id } }),
	});

	if (isLoading) {
		return (
			<div className="page-wrap px-4 py-10 sm:py-12 lg:py-14">
				<div className="animate-pulse space-y-8">
					<div className="flex flex-wrap items-center justify-between gap-4">
						<div className="h-10 w-44 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]" />
						<div className="h-9 w-36 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]" />
					</div>

					<section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
						<div className="space-y-4">
							<div className="h-5 w-36 rounded-full border border-[var(--line)] bg-[var(--surface-strong)]" />
							<div className="h-14 w-full max-w-2xl rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface-strong)]" />
							<div className="h-8 w-full max-w-xl rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface-strong)]" />
						</div>
						<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
							<div className="h-28 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)]" />
							<div className="h-28 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)]" />
							<div className="h-28 rounded-3xl border border-[var(--line)] bg-[var(--surface-strong)]" />
						</div>
					</section>

					<Card className="overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_24px_60px_rgba(30,90,72,0.1)]">
						<CardHeader className="space-y-5 px-6 pt-6 sm:px-8 sm:pt-8">
							<div className="flex items-center gap-3">
								<div className="h-10 w-36 rounded-full border border-[var(--line)] bg-[var(--surface)]" />
								<div className="h-9 w-24 rounded-full border border-[var(--line)] bg-[var(--surface)]" />
							</div>
							<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
								<div className="h-24 w-24 rounded-[1.75rem] border border-[var(--line)] bg-[var(--surface)]" />
								<div className="flex-1 space-y-3">
									<div className="h-11 w-full max-w-sm rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
									<div className="h-6 w-full max-w-xl rounded-2xl border border-[var(--line)] bg-[var(--surface)]" />
									<div className="flex flex-wrap gap-2">
										<div className="h-8 w-32 rounded-full border border-[var(--line)] bg-[var(--surface)]" />
										<div className="h-8 w-28 rounded-full border border-[var(--line)] bg-[var(--surface)]" />
										<div className="h-8 w-24 rounded-full border border-[var(--line)] bg-[var(--surface)]" />
									</div>
								</div>
							</div>
						</CardHeader>
						<CardContent className="px-6 pb-6 pt-4 sm:px-8">
							<div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
								<div className="grid gap-5 sm:grid-cols-2">
									<div className="h-36 rounded-3xl border border-(--line) bg-(--surface)" />
									<div className="h-36 rounded-3xl border border-(--line) bg-(--surface)" />
								</div>
								<div className="h-64 rounded-3xl border border-(--line) bg-(--surface)" />
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		);
	}

	if (isError || !data?.student) {
		return (
			<div className="page-wrap px-4 py-10 sm:py-12 lg:py-14">
				<Card className="mx-auto max-w-xl overflow-hidden rounded-[2rem] border border-destructive/15 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,246,246,0.94))] shadow-[0_24px_60px_rgba(150,40,40,0.08)]">
					<CardHeader className="items-center space-y-5 px-6 pt-8 text-center sm:px-8">
						<div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-destructive/15 bg-destructive/10 text-destructive">
							<AlertTriangle className="h-8 w-8" />
						</div>
						<div className="space-y-2">
							<CardTitle className="text-2xl font-bold tracking-tight text-destructive">
								Étudiant introuvable
							</CardTitle>
							<CardDescription className="mx-auto max-w-md text-base leading-7 text-destructive/80">
								Impossible de charger les informations de ce profil.
								L&apos;étudiant a peut-être été supprimé, ou l&apos;identifiant
								est incorrect.
							</CardDescription>
						</div>
					</CardHeader>
					<CardFooter className="flex justify-center px-6 pb-8 pt-2 sm:px-8">
						<Button
							asChild
							className="h-12 rounded-full bg-[var(--sea-ink)] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(23,58,64,0.18)] transition hover:bg-[var(--lagoon-deep)]"
						>
							<Link to="/">Retour à l&apos;accueil</Link>
						</Button>
					</CardFooter>
				</Card>
			</div>
		);
	}

	const student = data.student;
	const createdAt = formatDateTime(student.createdAt);
	const updatedAt = formatDateTime(student.updatedAt);

	return (
		<div className="page-wrap px-4 py-10 sm:py-12 lg:py-14 rise-in">
			<div className="mb-8 flex flex-wrap items-center justify-between gap-4">
				<Button
					asChild
					variant="ghost"
					className="group -ml-2 h-11 gap-2 rounded-full px-3 text-[var(--sea-ink-soft)] transition hover:bg-[var(--link-bg-hover)] hover:text-[var(--sea-ink)]"
				>
					<Link to="/">
						<ArrowLeft className="size-4 transition group-hover:-translate-x-0.5" />
						Retour à la liste
					</Link>
				</Button>

				<div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--kicker)] shadow-[0_10px_28px_rgba(30,90,72,0.08)]">
					<Sparkles className="size-4" />
					Dossier étudiant
				</div>
			</div>

			<section className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
				<div className="space-y-5">
					<p className="island-kicker">Profil complet</p>
					<div className="space-y-4">
						<h1 className="display-title max-w-2xl text-4xl font-bold leading-[0.95] tracking-tight text-[var(--sea-ink)] sm:text-5xl lg:text-6xl">
							Une fiche étudiant pensée comme un portrait.
						</h1>
						<p className="max-w-2xl text-base leading-8 text-[var(--sea-ink-soft)] sm:text-lg">
							Les informations clés sont mises en scène pour être lues d&apos;un
							coup d&apos;œil, avec une hiérarchie claire sur mobile comme sur
							desktop.
						</p>
					</div>
				</div>

				<div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1 xl:grid-cols-3">
					<div className="island-shell rounded-3xl p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<p className="island-kicker">Identité</p>
						<p className="mt-3 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Référence du dossier
						</p>
						<p className="mt-2 font-mono text-sm font-semibold text-[var(--sea-ink)]">
							{student._id}
						</p>
					</div>
					<div className="island-shell rounded-3xl p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<p className="island-kicker">Classe</p>
						<p className="mt-3 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Niveau actuel
						</p>
						<p className="mt-2 text-2xl font-semibold text-[var(--sea-ink)]">
							{student.classe}
						</p>
					</div>
					<div className="island-shell rounded-3xl p-5 shadow-[0_12px_28px_rgba(30,90,72,0.08)]">
						<p className="island-kicker">Âge</p>
						<p className="mt-3 text-sm leading-6 text-[var(--sea-ink-soft)]">
							Information d&apos;éligibilité
						</p>
						<p className="mt-2 text-2xl font-semibold text-[var(--sea-ink)]">
							{student.age} ans
						</p>
					</div>
				</div>
			</section>

			<Card className="relative mt-8 overflow-hidden rounded-[2rem] border border-[var(--line)] bg-[var(--surface-strong)] shadow-[0_24px_60px_rgba(30,90,72,0.1)]">
				<div
					aria-hidden="true"
					className="absolute inset-x-0 top-0 h-44 bg-[linear-gradient(135deg,rgba(79,184,178,0.22),rgba(255,255,255,0)_42%),linear-gradient(225deg,rgba(47,106,74,0.14),rgba(255,255,255,0)_38%),linear-gradient(180deg,rgba(255,255,255,0.98),rgba(255,255,255,0.42))]"
				/>
				<div
					aria-hidden="true"
					className="absolute -right-12 top-0 h-48 w-48 rounded-full bg-[var(--hero-a)] blur-3xl"
				/>

				<CardHeader className="relative space-y-5 px-6 pt-6 sm:px-8 sm:pt-8">
					<div className="flex flex-wrap items-center gap-3">
						<div className="inline-flex items-center gap-2 rounded-full border border-[var(--chip-line)] bg-[var(--chip-bg)] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.22em] text-[var(--kicker)] shadow-[0_10px_28px_rgba(30,90,72,0.08)]">
							<UserRound className="size-4" />
							Profil étudiant
						</div>
						<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs font-semibold text-[var(--sea-ink-soft)] shadow-[0_10px_22px_rgba(30,90,72,0.06)]">
							<Clock3 className="size-4 text-[var(--lagoon-deep)]" />
							Mis à jour le {updatedAt}
						</div>
					</div>

					<div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
						<div className="flex flex-col gap-5 sm:flex-row sm:items-center">
							<div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-[1.75rem] border border-[var(--line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(236,245,239,0.95))] text-[var(--sea-ink)] shadow-[0_16px_30px_rgba(30,90,72,0.08)] ring-1 ring-white/40">
								<UserRound className="size-12 text-[var(--lagoon-deep)]" />
							</div>

							<div className="space-y-4">
								<CardTitle className="display-title text-3xl font-bold tracking-tight text-[var(--sea-ink)] sm:text-4xl">
									{student.name}
								</CardTitle>
								<CardDescription className="max-w-2xl text-base leading-7 text-[var(--sea-ink-soft)]">
									Dossier personnel centré sur l&apos;essentiel. La lecture
									reste rapide, élégante et confortable sur tous les écrans.
								</CardDescription>

								<div className="flex flex-wrap gap-2">
									<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--sea-ink)] shadow-[0_10px_22px_rgba(30,90,72,0.06)]">
										<Hash className="size-3.5 text-[var(--lagoon-deep)]" />
										{student._id}
									</div>
									<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--sea-ink)] shadow-[0_10px_22px_rgba(30,90,72,0.06)]">
										<GraduationCap className="size-3.5 text-[var(--lagoon-deep)]" />
										{student.classe}
									</div>
									<div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-sm font-medium text-[var(--sea-ink)] shadow-[0_10px_22px_rgba(30,90,72,0.06)]">
										<CalendarDays className="size-3.5 text-[var(--lagoon-deep)]" />
										{student.age} ans
									</div>
								</div>
							</div>
						</div>

						<div className="w-full max-w-sm rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-4 shadow-[0_14px_28px_rgba(30,90,72,0.08)] backdrop-blur">
							<p className="island-kicker">Snapshot</p>
							<div className="mt-4 space-y-3">
								<div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
									<span className="text-sm text-[var(--sea-ink-soft)]">
										Classe
									</span>
									<span className="text-sm font-semibold text-[var(--sea-ink)]">
										{student.classe}
									</span>
								</div>
								<div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
									<span className="text-sm text-[var(--sea-ink-soft)]">
										Âge
									</span>
									<span className="text-sm font-semibold text-[var(--sea-ink)]">
										{student.age} ans
									</span>
								</div>
								<div className="flex items-center justify-between gap-3 rounded-2xl border border-[var(--line)] bg-white/70 px-4 py-3">
									<span className="text-sm text-[var(--sea-ink-soft)]">
										Dernière mise à jour
									</span>
									<span className="text-sm font-semibold text-[var(--sea-ink)]">
										{updatedAt}
									</span>
								</div>
							</div>
						</div>
					</div>
				</CardHeader>

				<CardContent className="relative px-6 pb-6 pt-4 sm:px-8">
					<div className="grid gap-5 lg:grid-cols-[1fr_0.95fr]">
						<div className="grid gap-5 sm:grid-cols-2">
							<div className="group rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.06)] transition hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--lagoon-deep)_35%,var(--line))] hover:shadow-[0_18px_34px_rgba(30,90,72,0.1)]">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sea-ink)] text-white shadow-[0_14px_26px_rgba(23,58,64,0.16)] transition group-hover:bg-[var(--lagoon-deep)]">
										<GraduationCap className="size-5" />
									</div>
									<div>
										<p className="island-kicker">Classe actuelle</p>
										<p className="mt-1 text-xs text-[var(--sea-ink-soft)]">
											Niveau scolaire enregistré
										</p>
									</div>
								</div>
								<div className="mt-5 text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
									{student.classe}
								</div>
							</div>

							<div className="group rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.06)] transition hover:-translate-y-0.5 hover:border-[color-mix(in_oklab,var(--lagoon-deep)_35%,var(--line))] hover:shadow-[0_18px_34px_rgba(30,90,72,0.1)]">
								<div className="flex items-center gap-3">
									<div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[var(--sea-ink)] text-white shadow-[0_14px_26px_rgba(23,58,64,0.16)] transition group-hover:bg-[var(--lagoon-deep)]">
										<CalendarDays className="size-5" />
									</div>
									<div>
										<p className="island-kicker">Âge</p>
										<p className="mt-1 text-xs text-[var(--sea-ink-soft)]">
											Donnée affichée en clair
										</p>
									</div>
								</div>
								<div className="mt-5 text-3xl font-semibold tracking-tight text-[var(--sea-ink)]">
									{student.age} ans
								</div>
							</div>
						</div>

						<div className="rounded-[1.5rem] border border-[var(--line)] bg-[var(--surface)] p-5 shadow-[0_12px_28px_rgba(30,90,72,0.06)]">
							<div className="flex items-start justify-between gap-4">
								<div>
									<p className="island-kicker">Timeline</p>
									<h3 className="mt-2 text-lg font-semibold text-[var(--sea-ink)]">
										Historique du profil
									</h3>
								</div>
								<Clock3 className="size-5 text-[var(--lagoon-deep)]" />
							</div>

							<div className="mt-6 space-y-4">
								<div className="flex items-start gap-3">
									<div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--sea-ink)] text-white shadow-[0_14px_26px_rgba(23,58,64,0.16)]">
										<CalendarDays className="size-4" />
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-[var(--sea-ink)]">
											Création
										</p>
										<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
											Le profil a été créé et archivé dans le dossier.
										</p>
									</div>
									<div className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[var(--sea-ink)] shadow-sm">
										{createdAt}
									</div>
								</div>

								<div className="h-px bg-[var(--line)]" />

								<div className="flex items-start gap-3">
									<div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-[var(--lagoon-deep)] text-white shadow-[0_14px_26px_rgba(50,143,151,0.18)]">
										<Clock3 className="size-4" />
									</div>
									<div className="min-w-0 flex-1">
										<p className="text-sm font-semibold text-[var(--sea-ink)]">
											Dernière modification
										</p>
										<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
											La fiche a été mise à jour récemment pour refléter
											l&apos;état actuel.
										</p>
									</div>
									<div className="rounded-full border border-[var(--line)] bg-white/80 px-3 py-1.5 text-xs font-semibold text-[var(--sea-ink)] shadow-sm">
										{updatedAt}
									</div>
								</div>
							</div>
						</div>
					</div>
				</CardContent>

				<CardFooter className="relative flex flex-col gap-4 border-t border-[var(--line)] px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-8">
					<div className="max-w-xl">
						<p className="text-sm font-semibold text-[var(--sea-ink)]">
							Prêt à ajuster la fiche ?
						</p>
						<p className="mt-1 text-sm leading-6 text-[var(--sea-ink-soft)]">
							L&apos;éditeur permet de corriger les informations sans perdre la
							clarté de la mise en page.
						</p>
					</div>

					<div className="flex flex-col gap-3 sm:flex-row">
						<Button
							asChild
							variant="outline"
							className="h-12 rounded-full border-[var(--line)] bg-[var(--surface)] px-5 text-[var(--sea-ink)] shadow-sm hover:bg-white/90"
						>
							<Link to="/">Retour</Link>
						</Button>

						<Button
							asChild
							className="group h-12 rounded-full bg-[var(--sea-ink)] px-5 text-sm font-semibold text-white shadow-[0_16px_36px_rgba(23,58,64,0.18)] transition hover:bg-[var(--lagoon-deep)]"
						>
							<Link to="/students/$id/edit" params={{ id }}>
								<PencilLine className="size-4" />
								Modifier la fiche
								<ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
							</Link>
						</Button>
					</div>
				</CardFooter>
			</Card>
		</div>
	);
}
