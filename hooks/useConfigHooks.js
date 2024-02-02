import React from 'react'
import Cookies from 'js-cookie'
// import Router from 'next/router'

import { setUser } from '@/redux/slice/auth.slice'
// import { jwtDecode } from 'jwt-decode'
// import { removeUserCookies } from '@/hooks/helper/cookies'
// import pageRoutes from '@/utils/pageRoutes'

const useConfigHooks = (store) => {
    const { dispatch } = store

    const restoreCookies = () => {
        const email = Cookies.get("email") || ""
        const userId = Cookies.get("userId") || ""
        const name = Cookies.get("name") || ""
        dispatch(setUser({ email, userId, name }));



        // const currentTimestamp = Math.floor(Date.now() / 1000);

        // const user = JSON.parse(Cookies.get("user") || "{}")
        // const token = Cookies.get("token")
        // const company = JSON.parse(Cookies.get("company") || "{}")

        // try {
        //     if (token) {
        //         const decoded = jwtDecode(token);
        //         if (decoded.exp && decoded.exp > currentTimestamp) {
        //             dispatch(setUser({ token, user, company }));
        //         } else {
        //             Router.push(pageRoutes.SIGN_IN_PAGE())
        //             removeUserCookies()
        //         }
        //     } else {
        //         Router.push(pageRoutes.SIGN_IN_PAGE())
        //         removeUserCookies()
        //     }
        // } catch (error) {
        //     console.log(error)
        // }
    }

    return ({ restoreCookies })
}

export default useConfigHooks

