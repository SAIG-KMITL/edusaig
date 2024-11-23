export const handleOpenModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null;

  if (modal) {
    modal.showModal();
  }
};

export const handleCloseModal = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null;

  if (modal) {
    modal.close();
  }
};

export const clearModalInput = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null;

  if (modal) {
    const inputs = modal.querySelectorAll("input, textarea, select");
    inputs.forEach((field) => {
      if (
        field instanceof HTMLInputElement ||
        field instanceof HTMLTextAreaElement
      ) {
        field.value = "";
      } else if (field instanceof HTMLSelectElement) {
        field.selectedIndex = 0;
      }
    });
  }
};

export const isModalOpen = (modalId: string) => {
  const modal = document.getElementById(modalId) as HTMLDialogElement | null;

  return modal;
};
