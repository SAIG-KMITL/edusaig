import toast from "react-hot-toast";

export const Toast = (
  message: string,
  type?: "success" | "error" | "loading"
) => {
  switch (type) {
    case "success":
      return toast.success(message);
    case "error":
      return toast.error(message);
    case "loading":
      return toast(message, { icon: "⌛" });
    default:
      return toast(message);
  }
};
