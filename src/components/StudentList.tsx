import { Link } from "@tanstack/react-router"

/**
 * COMPOSANT DE LISTE D'ÉTUDIANTS
 * Ce composant affiche une carte cliquable pour chaque étudiant.
 * Il utilise l'interface 'IStudent' pour typer ses propriétés (props).
 */
const StudentList = ({ age, name, classe, _id }: IStudent) => {
    return (
        /**
         * LE COMPOSANT <Link> DE TANSTACK ROUTER
         * to : Le chemin de la route (doit correspondre exactement à la définition dans src/routes).
         * params : Objet contenant les valeurs pour les segments dynamiques (ex: $studentId).
         * Ici, on passe l'ID de l'étudiant pour que l'URL devienne /id/12345.
         */
        <Link to="/id/$studentId" params={{ studentId: _id! }}>
            {/* Design System : bordures arrondies, padding et couleurs personnalisées */}
            <div className="rounded-xl border border-(--sea-ink-soft) p-4 text-(--sea-ink) transition-all hover:border-(--sea-ink) hover:bg-sea-foam/10">
                <p className="font-semibold">{name}</p>
                <p className="text-sm text-(--sea-ink-soft)">
                    Âge : {age} — Classe : {classe}
                </p>
            </div>
        </Link>
    )
}

export default StudentList