import { XIcon } from "lucide-react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { handleCloseModal } from "@/lib/modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "../Toast/Toast";
import { deleteChapterAction } from "@/actions/chapterAction";
import { ChapterResponseType } from "@/types/chapter.type";

interface DeleteChapterModalProps {
  chapter: ChapterResponseType | null;
  handleChapterDeselected: () => void;
}

export default function DeleteChapterModal({
  chapter,
  handleChapterDeselected,
}: DeleteChapterModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteChapter = async (): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await deleteChapterAction(chapter?.id ?? "");
      if (response.error?.message) {
        Toast(response.error?.message, "error");
      } else {
        Toast("The chapter has been deleted.", "success");
        handleCloseModal("delete-chapter-modal");
        router.refresh();
      }
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to delete chapter",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal
      modalId="delete-chapter-modal"
      needBackdrop={false}
      width="max-w-[320px]"
    >
      <div className="w-full max-w-xl bg-steelGray border border-royalPurple/20 text-left p-6 rounded-xl">
        <div className="mb-4 flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-white">
            {`Delete '${chapter?.title}' ?`}
          </h2>
          <button
            type="button"
            onClick={() => {
              handleCloseModal("delete-chapter-modal");
              handleChapterDeselected();
            }}
            className="-mr-2 p-2 hover:bg-white/20 rounded-full"
          >
            <XIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="mb-4 text-silver text-sm font-normal">
          This can’t be undone and it will be removed from your course module.
        </p>
        <div className="space-y-2">
          <motion.button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteChapter}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
          >
            Delete
          </motion.button>
          <motion.button
            type="button"
            disabled={isLoading}
            onClick={() => {
              handleCloseModal("delete-chapter-modal");
              handleChapterDeselected();
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full px-6 py-3 text-electricViolet rounded-xl font-medium
            border border-electricViolet hover:bg-white/5 transition-colors"
          >
            Cancel
          </motion.button>
        </div>
      </div>
    </Modal>
  );
}
