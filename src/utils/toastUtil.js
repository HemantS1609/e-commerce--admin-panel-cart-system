import {toast} from "react-toastify"

export const showSuccess = (message)=>{
    toast.success(message,
        {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
    )
}

export const showError = (message)=>{
    toast.error(message,
        {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    }
    )
}