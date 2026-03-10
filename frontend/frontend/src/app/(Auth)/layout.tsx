"use client"

import { Box } from "@mui/material";
import "./auth.globals.css";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <Box className="layout">
            {children}
        </Box>
    );
}
