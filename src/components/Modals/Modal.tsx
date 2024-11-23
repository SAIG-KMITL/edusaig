import { handleCloseModal } from "@/lib/modal";

interface ModalProps {
  children: React.ReactNode;
  modalId: string;
  needBackdrop: boolean;
  backDropRedirect?: string;
  background?: string;
  width?: string;
  maxWidth?: string;
}

export default function Modal(props: ModalProps) {

  return (
    <dialog
      id={props.modalId}
      className="modal-overlay items-stretch modal bg-gray-500 bg-opacity-30 opacity-0 backdrop-blur-sm transition-opacity duration-300"
    >
      <div
        className={`w-full ${props.width} mx-auto sm:my-auto sm:bg-transparent ${props.maxWidth && `max-w-[${props.maxWidth}px]`} ${props.background ? `${props.background}` : "bg-black"}`}
      >
        {props.children}
      </div>
      {props.needBackdrop && (
        <form method="dialog" className="modal-backdrop">
          {props.backDropRedirect && (
            <button onClick={() => handleCloseModal(props.modalId)}>close</button>
          )}
          {!props.backDropRedirect && <button>close</button>}
        </form>
      )}
    </dialog>
  );
}
