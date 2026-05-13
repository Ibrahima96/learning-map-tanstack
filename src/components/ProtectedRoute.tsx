import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth } from "#/hooks/useAuth";

interface ProtectedRouteProps {
	children: React.ReactNode;
	requireAuth?: boolean;
}

export function ProtectedRoute({
	children,
	requireAuth = true,
}: ProtectedRouteProps) {
	const { isAuthenticated, isPending } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isPending && requireAuth && !isAuthenticated) {
			navigate({ to: "/login" });
		}
	}, [isAuthenticated, isPending, requireAuth, navigate]);

	if (isPending) {
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
			</div>
		);
	}

	if (requireAuth && !isAuthenticated) {
		return null;
	}

	return <>{children}</>;
}
