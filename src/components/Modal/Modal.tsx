import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ElementRef, useEffect, useRef } from "react";

interface ModalProps {
  modalId: string;
  children: React.ReactNode;
}

export function Modal({ modalId, children }: ModalProps) {
  const router = useRouter();
  const dialogRef = useRef<ElementRef<"dialog">>(null);

  useEffect(() => {
    if (!dialogRef.current?.open) {
      dialogRef.current?.showModal();
    }

    const dialog = dialogRef.current;
    const handleCancel = (e: Event) => {
      e.preventDefault();
      onDismiss();
    };

    dialog?.addEventListener("cancel", handleCancel);

    return () => {
      dialog?.removeEventListener("cancel", handleCancel);
    };
  }, []);

  function onDismiss() {
    router.back();
  }

  return (
    <div className="fixed inset-0 z-10 bg-white bg-opacity-5 rounded-lg backdrop-blur-md flex items-center justify-center">
      <motion.dialog
        id={modalId}
        ref={dialogRef}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        className="flex bg-transparent items-center justify-center"
      >
        <div className="bg-white rounded-lg w-full max-w-md mx-auto p-4 relative">
          <button
            onClick={onDismiss}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
          {children}
        </div>
      </motion.dialog>
    </div>
  );
}
