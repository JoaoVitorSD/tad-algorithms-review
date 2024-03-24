import { toast } from "react-toastify";

export  function showSucessToast(message){
    toast.success(message, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
    })
}

export function showErrorToast(message) {
    toast.error(message, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
    })
}

export function showWarningToast(message) {
    toast.warning(message, {
        position: "bottom-right",
        autoClose: 5000,
        closeOnClick: true,
    })
}