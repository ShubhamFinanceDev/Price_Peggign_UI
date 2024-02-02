import { useSnackbar } from 'notistack';

const snackbarHooks = () => {
    const { enqueueSnackbar } = useSnackbar();

    const snackbar = (msg, variant = "success", autoHideDuration = 500) => {
        enqueueSnackbar(
            msg,
            { variant: variant },
            { autoHideDuration: autoHideDuration }
        )
    }

    return ({ snackbar })
}

export default snackbarHooks