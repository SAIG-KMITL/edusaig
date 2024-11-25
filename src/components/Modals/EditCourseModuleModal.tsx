import { FileText, ListOrdered, Type, XIcon } from "lucide-react";
import InputTheme from "../Inputs/InputTheme";
import Modal from "./Modal";
import { motion } from "framer-motion";
import TextareaTheme from "../Inputs/TextareaTheme";
import { clearModalInput, handleCloseModal } from "@/lib/modal";
import { CourseModuleResponseType } from "@/types/course.type";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { editCourseModuleSchema } from "@/schema/courseModule.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { editCourseModuleAction } from "@/actions/courseModuleAction";
import { Toast } from "../Toast/Toast";

type EditCourseModuleFormData = z.infer<typeof editCourseModuleSchema>;

interface EditCourseModuleModalProps {
  courseId: string;
  courseModule: CourseModuleResponseType | null;
  handleModuleDeselected: () => void;
}

export default function EditCourseModuleModal({ courseId, courseModule, handleModuleDeselected }: EditCourseModuleModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditCourseModuleFormData>({
    resolver: zodResolver(editCourseModuleSchema),
    defaultValues: {
      title: courseModule?.title,
      description: courseModule?.description,
      courseId: courseId,
      orderIndex: courseModule?.orderIndex,
    },
  });

  const onSubmit = async (data: EditCourseModuleFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await editCourseModuleAction(
        courseModule?.id ?? "",
        data.title,
        data.description,
        data.courseId,
        data.orderIndex
      );
      if (response.error?.message) {
        Toast(response.error?.message, "error");
      } else {
        reset();
        Toast("The course module has been created.", "success");
        handleCloseModal("edit-course-module-modal"); 
        router.refresh();
      }
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to create course module",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setValue("title", courseModule?.title ?? "");
    setValue("description", courseModule?.description ?? "");
    setValue("courseId", courseId ?? "");
    setValue("orderIndex", courseModule?.orderIndex ?? 1);
  }, [courseModule]);

  return (
    <Modal
      modalId="edit-course-module-modal"
      needBackdrop={false}
      width="max-w-[600px]"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-xl bg-steelGray border border-royalPurple/20 text-left p-6 rounded-xl">
        <div className="mb-4 flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-white">Edit Course Module</h2>
          <button 
            type="button"
            onClick={() => {
              handleCloseModal("edit-course-module-modal"); 
              handleModuleDeselected();
            }}
            className="-mr-2 p-2 hover:bg-white/20 rounded-full"
          >
            <XIcon className="w-5 h-5 text-white"/>
          </button>
        </div>
          <div className="space-y-6">
            <InputTheme
              type="text"
              label="Module Title"
              placeholder="Enter module title"
              leftIcon={<Type className="w-5 h-5" />}
              helper="Give your module a descriptive title"
              className="w-full"
              error={errors.title}
              {...register("title")}    
            />
            <TextareaTheme
              label="Module Description"
              placeholder="Enter module description"
              leftIcon={<FileText className="absolute top-[13px] w-5 h-5" />}
              helper="Describe what this module covers"
              className="w-full h-[88px] no-scrollbar"
              error={errors.description}
              {...register("description")}    
            />
            <InputTheme
              type="number"
              label="Module Order"
              placeholder="Enter module title"
              leftIcon={<ListOrdered className="w-5 h-5" />}
              helper="Enter the position of this module in the course sequence."
              className="w-full"
              error={errors.orderIndex}
              {...register("orderIndex", {
                valueAsNumber: true,
              })}    
            />
            <motion.button
              type="submit"
              disabled={isLoading}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
            >
              Save Module
            </motion.button>
          </div>
        </form>
    </Modal>
  );
}