import { XIcon } from "lucide-react";
import Modal from "./Modal";
import { motion } from "framer-motion";
import { handleCloseModal } from "@/lib/modal";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "../Toast/Toast";
import { CourseResponseType } from "@/types/course.type";
import { deleteCourseAction } from "@/actions/courseAction";

interface DeleteCourseModalProps {
  course: CourseResponseType | null;
  handleCourseDeselected: () => void;
}

export default function DeleteCourseModal({
  course,
  handleCourseDeselected,
}: DeleteCourseModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleDeleteCourse = async (): Promise<void> => {
    try {
      setIsLoading(true);
      await deleteCourseAction(course?.id ?? "");

      Toast("The course has been deleted.", "success");
      handleCloseModal("delete-course-modal");
      router.refresh();
    } catch (error) {
      console.log("grand", error);
      Toast(
        error instanceof Error ? error.message : "Failed to delete course",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Modal
      modalId="delete-course-modal"
      needBackdrop={false}
      width="max-w-[320px]"
    >
      <div className="w-full max-w-xl bg-steelGray border border-royalPurple/20 text-left p-6 rounded-xl">
        <div className="mb-4 flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-white">
            {`Delete '${course?.title}' ?`}
          </h2>
          <button
            type="button"
            onClick={() => {
              handleCloseModal("delete-course-modal");
              handleCourseDeselected();
            }}
            className="-mr-2 p-2 hover:bg-white/20 rounded-full"
          >
            <XIcon className="w-5 h-5 text-white" />
          </button>
        </div>
        <p className="mb-4 text-silver text-sm font-normal">
          This can’t be undone and it will be removed from your account.
        </p>
        <div className="space-y-2">
          <motion.button
            type="button"
            disabled={isLoading}
            onClick={handleDeleteCourse}
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
              handleCloseModal("delete-course-modal");
              handleCourseDeselected();
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
