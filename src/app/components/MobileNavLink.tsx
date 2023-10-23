"use client"
import { Icon } from "@phosphor-icons/react";
import Link, { LinkProps } from "next/link";
import { ReactNode } from "react";

type MobileNavLinkPropsType = LinkProps & {
    children: ReactNode;
    icon?: Icon
}

export function MobileNavLink({
    children,
    icon: PropsIcon,
    ...rest
}: MobileNavLinkPropsType) {
    return (
        <Link
        {...rest}
        className="
        p-3 rounded-sm bg-white/5 flex gap-3 text-white text-md font-medium transition-all
        hover:bg-white/10
        active:bg-white/25
        outline-none ring-0 ring-sky-500 focus:ring-2
        "
        >
            {PropsIcon && <PropsIcon size={24} weight="bold" />}

            {children}
        </Link>
    )
}