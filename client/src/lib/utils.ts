import { isAxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { toast, } from "sonner"
import cookie from "js-cookie"
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getToken = () => {
  const token = cookie.get('token') || localStorage.getItem('token') || ""
  return token
}

export const HandlerToaster = (message: string, type: "success" | "error") => {
  const defaultSetting: Omit<Parameters<typeof toast>[0], "message"> = {
    dismissible: true,
    duration: 2000,
    position: "bottom-right",
  };

  switch (type) {
    case "success":
      toast.success(message, defaultSetting);
      break;
    case "error":
      toast.error(message, defaultSetting);
      break;
    default:
      console.warn(`Unknown toast type: ${type}`);
      toast.info(message, defaultSetting); // Default to "info" for unknown types
      break;
  }
};



export const CatchError = (err: Error) => {
  try {
    toast.dismiss()
    let messages = '';
    if (isAxiosError(err)) {
      messages = err.response?.data.message;
    } else {
      console.error(err);
      messages = err.message;
    }
    toast.error(messages, {
      dismissible: true,
      duration: 2000,
      position: "bottom-right",
    })
  } catch (error) {
    toast.error("Somethin went wrong", {
      dismissible: true,
      duration: 2000,
      position: "bottom-right",
    })

  }
}