import Cookies from 'js-cookie'

export const removeUserCookies = () => {
    Cookies.remove("email")
    Cookies.remove("userId")
    Cookies.remove("name")
}
