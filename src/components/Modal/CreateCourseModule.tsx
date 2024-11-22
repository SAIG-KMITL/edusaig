import { z } from "zod";
import { Modal } from "./Modal";
import { courseModuleSchema } from "@/schema/course-module.schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../Inputs/Input";
import { useParams } from "next/navigation";

type createCourseModuleFormData = z.infer<typeof courseModuleSchema>;

export default function CreateCourseModule() {
  const onCreate = async () => {
    console.log("Create course module");
    reset();
  };

  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<createCourseModuleFormData>({
    resolver: zodResolver(courseModuleSchema),
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
