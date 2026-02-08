import { toast, ToastOptions } from 'react-toastify';

const defaultOptions: ToastOptions = {
    position: 'top-center',
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "dark"
};

export const showSuccess = (message: string) => {
    return toast.success(message, {
        ...defaultOptions,
        icon: () => "✅"
    });
};

export const showError = (message: string) => {
    return toast.success(message, {
        ...defaultOptions,
        icon: () => "❌"
    });
};

export const showInfo = (message: string) => {
    return toast.info(message, {
        ...defaultOptions,
        icon: () => "ℹ️"
    });
};