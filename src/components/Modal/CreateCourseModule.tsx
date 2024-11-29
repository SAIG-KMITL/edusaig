import { createCourseModuleSchema } from "@/schema/course-module.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Input from "../Inputs/Input";
import { Modal } from "./Modal";

type createCourseModuleFormData = z.infer<typeof createCourseModuleSchema>;

export default function CreateCourseModule() {
  const onCreate = async () => {
    reset();
  };

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createCourseModuleFormData>({
    resolver: zodResolver(createCourseModuleSchema),
    defaultValues: {
      courseId: id as string,
      title: "",
      description: "",
      orderIndex: 0,
    },
  });

  return (
    <Modal modalId="course-module-create">
      <div className="w-80 flex flex-col">
        <h1 className="text-2xl font-semibold">Create Course Module</h1>
        <form
          onSubmit={handleSubmit(onCreate)}
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
              label="Index"
              placeholder="Enter order index"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              error={errors.orderIndex}
              {...register("orderIndex")}
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 bg-electricViolet text-white rounded-lg mt-4"
          >
            Create Course Module
          </button>
        </form>
      </div>
    </Modal>
  );
}
