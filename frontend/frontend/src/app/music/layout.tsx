"use client"

import "./music.globals.css";
import HeaderComp from "@/component/header-comp/header-comp";

export default function MusicLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <HeaderComp />
            {children}
        </>
    );
}
