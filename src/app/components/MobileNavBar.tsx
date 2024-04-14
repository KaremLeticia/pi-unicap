"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import LogoUnicap from "../assets/logo-branca-unicap 1.png";
import { House, Bell, Info, ChartPieSlice, GearSix, SignOut, X, List } from "@phosphor-icons/react";
import { MobileNavLink } from "./MobileNavLink";
import jwt, { JwtPayload } from 'jsonwebtoken';

export function MobileNavBar() {
    const [isMobileNavBarOpen, setIsMobileNavBarOpen] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem('userToken');
        const decodedToken = token ? jwt.decode(token) as JwtPayload : null;
        const isAdmin = decodedToken?.role === 'ADMIN';
        setIsAdmin(isAdmin);
    }, []);

    function handleOpenNavBar() {
        setIsMobileNavBarOpen(true);
    }

    function handleCloseNavBar() {
        setIsMobileNavBarOpen(false);
    }

    if (!isAdmin) {
        return null; // Não renderiza nada se o usuário não for um administrador
    }

    return (
        <>
            <header
                className="
                w-full flex items-center justify-between p-2 bg-default mb-6
                min-[640px]:hidden
                "
            >
                <strong className="text-xl font-bold text-white">UNICAP</strong>

                <button
                    className="
                    text-white transition-all p-1 rounded-sm bg-white/0
                    hover:bg-white/10
                    active:bg-white/20
                    outline-none ring-0 ring-sky-500 focus:ring-2
                    "

                    onClick={handleOpenNavBar}
                >
                    <List size={24} />
                </button>
            </header>

            {isMobileNavBarOpen && <div role="overlay" className="fixed inset-0 bg-transparent" onClick={handleCloseNavBar} />}
            <div
                data-state={isMobileNavBarOpen ? "opened" : "closed"}
                className="
                bg-default fixed inset-y-0 w-screen max-w-[800px] flex flex-col items-center gap-6 z-30 transition-[right] duration-500
                data-[state=opened]:right-0
                data-[state=closed]:-right-full
                "
            >
                <div className="w-full flex justify-end p-1">
                    <button
                        className="
                        text-white transition-all p-1 rounded-sm bg-white/0
                        hover:bg-white/10
                        active:bg-white/20
                        outline-none ring-0 ring-sky-500 focus:ring-2
                        "

                        onClick={handleCloseNavBar}
                    >
                        <X size={24} />
                    </button>
                </div>

                <img src={LogoUnicap.src} />

                <nav className="p-3 flex flex-col gap-0.5 w-full">
                    <MobileNavLink href="/" icon={House}>Início</MobileNavLink>
                    <MobileNavLink href="/" icon={Info}>Sivuca I.A</MobileNavLink>
                    <MobileNavLink href="/" icon={ChartPieSlice}>Dashboard</MobileNavLink>
                    <MobileNavLink href="/" icon={GearSix}>Configurações</MobileNavLink>
                    <MobileNavLink href="/" icon={SignOut}>Encerrar sessão</MobileNavLink>
                </nav>
            </div>
        </>
    );
}
