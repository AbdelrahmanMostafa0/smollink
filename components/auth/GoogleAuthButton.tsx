
"use client";

import Cookies from "js-cookie";
import { GoogleLogin } from "@react-oauth/google";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import api from "@/lib/api";
import { useAuth } from "./AuthProvider";

export default function GoogleAuthButton() {
    const router = useRouter();
    const { login } = useAuth();

    const handleSuccess = async (credentialResponse: any) => {
        try {
            const { data } = await api.post("/auth/google", {
                idToken: credentialResponse.credential,
            });

            login(data.user, data.token);
            toast.success("Successfully logged in with Google!");
            router.push("/"); // Or wherever you want to redirect
        } catch (error: any) {
            console.error("Google Login Error:", error);
            const message =
                error.response?.data?.error ||
                error.message ||
                "Something went wrong with Google Login";
            toast.error(message);
        }
    };

    const handleError = () => {
        toast.error("Google Login Failed");
    };

    return (
        <div className="w-full flex justify-center">
            <GoogleLogin
                onSuccess={handleSuccess}
                onError={handleError}
                theme="outline"
                size="large"
                width="100%" // Try to make it full width if possible, or style wrapper
            />
        </div>
    );
}
