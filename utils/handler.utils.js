const errorHandler = (error, snackbar = () => { }) => {
    try {
        console.log(error)
        snackbar(error?.response?.data?.msg || error?.message, "error")
    } catch (error) { }
}

export default errorHandler