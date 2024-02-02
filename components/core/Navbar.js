"use client";

import { icons } from '@/env/icons';
import UseAuthHooks from '@/hooks/useAuthHooks';
import pageRoutes from '@/utils/pageRoutes';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react'
import { useSelector } from 'react-redux';
// https://nextjs.org/docs/app/api-reference/functions/use-router


const navItems = [
    {
        name: "Price Pegging",
        href: pageRoutes.PRICE_PEGGING_PAGE()
    },
    {
        name: "DSA",
        href: pageRoutes.DSA_PAGE()
    },


]
const Navbar = () => {
    const router = useRouter()
    const pathname = usePathname()


    const { user } = useSelector((state) => state.authSlice)
    const { logoutHandler } = UseAuthHooks()

    const path = pathname.split("/")[1]


    switch (path) {
        case "sign-in":
            return (
                <></>
            )
        case "sign-up":
            return (
                <></>
            )
        default:
            return (
                <>

                    <div className="test-navbar">
                        <div className='branding'>
                            <img src={icons.NAV_LOGO} alt="Logo" onClick={() => router.push(pageRoutes.DASHBOARD_PAGE())} />
                        </div>
                        <div className='nav-link-div'>
                            <div className='ribbin'>
                                <button className='btn logout-btn' onClick={logoutHandler}>Logout as {user?.name || "Unknown"}</button>
                            </div>
                            <div className='nav-link-main-div'>
                                {navItems.map((navItem, idx) => {
                                    let comparePath = `/${path}`
                                    return (
                                        <li key={`nav-item__${idx}`}>
                                            <Link href={navItem.href} className={navItem.href == comparePath ? "active-page" : ""}>{navItem.name}</Link>
                                        </li>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                </>
            )
    }
}

export default Navbar