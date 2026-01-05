"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
    useCallback,
} from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "sonner";
import api from "@/lib/api";
import Cookies from "js-cookie";
import { useRouter, usePathname } from "next/navigation";

interface User {
    id: string;
    fullName: string;
    email: string;
    profilePicture?: string;
    provider: string;
}

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (user: User, token: string) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

export default function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const fetchUser = useCallback(async () => {
        try {
            const token = Cookies.get("token");
            if (!token) {
                setLoading(false);
                return;
            }

            const { data } = await api.get("/auth/me");
            setUser(data.user);
        } catch (error) {
            console.error("Failed to fetch user:", error);
            Cookies.remove("token");
            setUser(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const login = (userData: User, token: string) => {
        Cookies.set("token", token, { expires: 7 });
        // We can optionally store user in localStorage too if needed for immediate access before hydration,
        // but context state is better for React lifecycle.
        localStorage.setItem("user", JSON.stringify(userData));
        setUser(userData);
        router.refresh(); // Refresh to update server components if any
    };

    const logout = () => {
        Cookies.remove("token");
        localStorage.removeItem("user");
        setUser(null);
        router.push("/login");
        router.refresh();
    };

    // Optional: Protect routes logic could go here or in middleware
    // For now we just provide the state

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            <GoogleOAuthProvider
                clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
            >
                {children}
                <Toaster />
            </GoogleOAuthProvider>
        </AuthContext.Provider>
    );
}
