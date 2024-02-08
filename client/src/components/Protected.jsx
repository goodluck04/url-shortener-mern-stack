"use client"
import {redirect,  useRouter } from "next/navigation";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";


export default function Protected({ children }) {
    const isAuthenticated = useAuth(); // Check if the user is authenticated
    const router = useRouter();

    useEffect(() => {
        if (!isAuthenticated) {
            // Redirect the user if they are not authenticated
            router.push('/login');
        }
    }, [isAuthenticated, router]);

    return isAuthenticated ? children : null; // Render children only if authenticated
};