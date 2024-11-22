import { CourseModuleType } from "@/types/course.type";
import { Modal } from "./Modal";
import { z } from "zod";
import { courseModuleSchema } from "@/schema/course-module.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Inputs/Input";
import { useParams } from "next/navigation";

type eidtCourseModuleFormData = z.infer<typeof courseModuleSchema>;

export default function EditCourseModule({
  courseModule,
}: {
  courseModule: CourseModuleType;
}) {
  const onUpdate = async () => {
    reset();
  };

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<eidtCourseModuleFormData>({
    resolver: zodResolver(courseModuleSchema),
    defaultValues: {
      courseId: courseModule.id,
      title: courseModule.title,
      description: courseModule.description,
      orderIndex: courseModule.orderIndex,
    },
  });

  return (
    <Modal modalId="course-module-edit">
      <div className="w-80 flex flex-col">
        <h1 className="text-2xl font-semibold">Edit Course Module</h1>
        <form
          onSubmit={handleSubmit(onUpdate)}
          className="w-full h-auto flex flex-col space-y-3 mt-4"
        >
          <div className="space-y-2">
            <Input
              type="text"
              label="Course ID"
              placeholder="Enter course ID"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              error={errors.title}
              {...register("courseId")}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              label="Title"
              placeholder="Enter course module title"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              error={errors.title}
              {...register("title")}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="text"
              label="Description"
              placeholder="Enter course module description"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              error={errors.description}
              {...register("description")}
            />
          </div>
          <div className="space-y-2">
            <Input
              type="number"
              label="Order Index"
              placeholder="Enter course module order index"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              error={errors.orderIndex}
              {...register("orderIndex")}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-electricViolet text-white rounded-lg mt-4"
          >
            Edit Course Module
          </button>
        </form>
      </div>
    </Modal>
  );
}
