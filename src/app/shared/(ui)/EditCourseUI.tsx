"use client";

import {
  editCourseAction,
  fetchCoursesAction,
  uploadCourseThumbnail,
} from "@/actions/courseAction";
import InputTheme from "@/components/Inputs/InputTheme";
import { SelectTheme } from "@/components/Inputs/SelectTheme";
import TextareaTheme from "@/components/Inputs/TextareaTheme";
import { Toast } from "@/components/Toast/Toast";
import { THUMBNAIL_BASE_URL } from "@/constants/thumbnail";
import { editCourseSchema } from "@/schema/course.schema";
import { CategoryType } from "@/types/category";
import {
  CourseLevelType,
  CourseStatusType,
  CourseType,
} from "@/types/course.type";
import { fetchThumbnail } from "@/utils/resource/fetchThumbnail";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
  ChevronLeft,
  Clock,
  DollarSign,
  FileText,
  Globe,
  ImageIcon,
  Loader,
  Tag,
  Type,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type UploadStatus = "idle" | "uploading" | "success" | "error";

type EditCourseFormData = z.infer<typeof editCourseSchema>;

interface CreateCourseUIProps {
  course: CourseType;
  categories: CategoryType[];
}

interface DragState {
  isDragging: boolean;
  isOver: boolean;
}

const formatFileSize = (bytes: number): string => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const validateImageFile = (file: File | undefined): boolean => {
  return Boolean(file && file.type.startsWith("image/"));
};

const levelOptions: { id: CourseLevelType; label: string }[] = [
  {
    id: "beginner",
    label: "Beginner",
  },
  {
    id: "intermediate",
    label: "Intermediate",
  },
  {
    id: "advanced",
    label: "Advanced",
  },
];

const statusOptions: { id: CourseStatusType; label: string }[] = [
  {
    id: "draft",
    label: "Draft",
  },
  {
    id: "published",
    label: "Published",
  },
  {
    id: "archived",
    label: "Archived",
  },
];

export default function EditCourseUI({
  course,
  categories,
}: CreateCourseUIProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    isOver: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fetchCoursesAction = async () => {
    try {
      await fetchCoursesAction();
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EditCourseFormData>({
    resolver: zodResolver(editCourseSchema),
    defaultValues: {
      title: course.title,
      description: course.description,
      categoryId: course.category.id,
      duration: course.duration,
      level: course.level,
      price: course.price,
      status: course.status,
      thumbnailKey: course.id,
    },
  });

  const onSubmit = async (data: EditCourseFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await editCourseAction(
        course.id,
        data.title,
        data.description,
        data.categoryId,
        data.duration,
        data.level as CourseLevelType,
        data.price,
        data.status as CourseStatusType,
        data.thumbnailKey
      );
      if (response.error?.message) {
        Toast(response.error?.message, "error");
      } else {
        Toast("The course has been updated.", "success");
      }

      await fetchCoursesAction();

      await handleUploadThumbnail();

      router.refresh();

      router.push(`/dashboard/course`);
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to edit course",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleUploadThumbnail = async () => {
    if (!selectedFile) return;

    try {
      setIsLoading(true);
      const response = await uploadCourseThumbnail(course.id, selectedFile);

      if (response.error?.message) {
        Toast(response.error?.message, "error");
      } else {
        Toast("The course thumbnail has been updated.", "success");
      }
    } catch (error) {
      Toast(
        error instanceof Error
          ? error.message
          : "Failed to upload course thumbnail",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] as File;
    if (validateImageFile(file)) {
      processFile(file);
    }
  };

  const processFile = (file: File): void => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setUploadStatus("idle");
    simulateUpload();
  };

  const simulateUpload = (): void => {
    setUploadStatus("uploading");
    setUploadProgress(0);

    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setUploadStatus("success");
          return 100;
        }
        return prev + 10;
      });
    }, 100);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragState((prev) => ({ ...prev, isOver: true }));
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragState((prev) => ({ ...prev, isOver: false }));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>): void => {
    e.preventDefault();
    e.stopPropagation();
    setDragState({ isDragging: false, isOver: false });

    const file = e.dataTransfer.files[0] as File;
    if (validateImageFile(file)) {
      processFile(file);
    }
  };

  const clearSelection = (): void => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setUploadStatus("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCategoryChange = (selectedOptionId: string) => {
    setValue("categoryId", selectedOptionId, { shouldValidate: true });
  };

  const handleLevelChange = (selectedOptionId: string) => {
    setValue("level", selectedOptionId, { shouldValidate: true });
  };

  const handleStatusChange = (selectedOptionId: string) => {
    setValue("status", selectedOptionId, { shouldValidate: true });
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const categoryOptions = categories
    .filter((category) => category.slug == "course")
    .map((category) => {
      return {
        id: category.id,
        label: category.title,
      };
    });

  return (
    <div className="w-full px-4 sm:px-6 lg:px-12 py-12">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-6 lg:items-start h-full drop-shadow-lg rounded-xl">
        <div className="w-full lg:flex-1 max-w-2xl px-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col space-y-6"
          >
            <div className="flex justify-between gap-4 flex-wrap">
              <Link
                href={`/dashboard/course`}
                className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Courses
              </Link>
              <div className="flex justify-end">
                <motion.label
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex items-center justify-center p-4 w-72 
                  bg-electricViolet hover:bg-electricViolet/90 text-white rounded-xl 
                  shadow-lg cursor-pointer transition-colors group"
                >
                  <Upload className="w-5 h-5 mr-2" />
                  <span className="font-medium">Choose Image to Upload</span>
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                  />
                </motion.label>
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{ height: selectedFile ? "auto" : "300px" }}
              className={`w-full bg-steelGray rounded-2xl overflow-hidden shadow-lg
                ${
                  dragState.isOver
                    ? "border-electricViolet"
                    : "border-royalPurple/30"
                }`}
            >
              {!selectedFile ? (
                <div
                  className="relative aspect-video rounded-xl overflow-hidden bg-black/50"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Image
                    src={fetchThumbnail(course.id) || THUMBNAIL_BASE_URL}
                    fill
                    alt="preview course thumbnail"
                    className="object-cover"
                  />
                </div>
              ) : (
                <div className="p-6 space-y-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-white font-medium">Upload Progress</h3>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={clearSelection}
                      className="p-1 hover:bg-royalPurple/20 rounded-full"
                    >
                      <X className="w-5 h-5 text-silver" />
                    </motion.button>
                  </div>

                  {/* Progress Bar */}
                  <div className="relative h-2 bg-royalPurple/20 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${uploadProgress}%` }}
                      className="absolute h-full bg-electricViolet"
                    />
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center">
                      {uploadStatus === "uploading" && (
                        <Loader className="w-4 h-4 text-skyBlue mr-2 animate-spin" />
                      )}
                      {uploadStatus === "success" && (
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2" />
                      )}
                      {uploadStatus === "error" && (
                        <AlertCircle className="w-4 h-4 text-red-500 mr-2" />
                      )}
                      <span className="text-silver">
                        {uploadStatus === "uploading" && "Uploading..."}
                        {uploadStatus === "success" && "Upload Complete"}
                        {uploadStatus === "error" && "Upload Failed"}
                      </span>
                    </div>
                    <span className="text-silver">{uploadProgress}%</span>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="relative aspect-video rounded-xl overflow-hidden bg-black/50"
                  >
                    <Image
                      src={
                        previewUrl ??
                        (fetchThumbnail(course.id) || THUMBNAIL_BASE_URL)
                      }
                      fill
                      alt="preview course thumbnail"
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  <div className="flex items-start justify-between gap-4 p-4 bg-royalPurple/10 rounded-xl">
                    <div className="flex-1 flex items-start gap-2">
                      <ImageIcon className="w-5 h-5 text-skyBlue" />
                      <div className="flex-1 min-w-0">
                        <p className="mb-1 text-white font-medium break-all">
                          {selectedFile.name}
                        </p>
                        <p className="text-silver text-sm">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                      {uploadStatus === "success" && (
                        <motion.button
                          type="button"
                          onClick={handleUploadThumbnail}
                          disabled={isLoading}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="px-4 py-2 bg-electricViolet text-white rounded-lg"
                        >
                          Save Image
                        </motion.button>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full lg:flex-1 max-w-2xl flex flex-col break-words px-6 flex-grow-1">
          <div className="flex justify-start text-white items-center font-semibold text-left text-2xl p-3 mt-5 rounded-xl">
            <span>Edit Course Details</span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-auto bg-steelGray/30 border border-royalPurple/20 my-1 text-left p-6 space-y-6 rounded-xl flex flex-col"
          >
            <InputTheme
              type="text"
              label="Course Title"
              placeholder="Enter course title"
              leftIcon={<Type className="w-5 h-5" />}
              helper="Give your course a descriptive title"
              className="w-full"
              error={errors.title}
              {...register("title")}
            />

            <TextareaTheme
              label="Course Description"
              placeholder="Enter course description"
              leftIcon={<FileText className="absolute top-[13px] w-5 h-5" />}
              helper="Describe what this course covers"
              className="w-full h-[88px] no-scrollbar"
              error={errors.description}
              {...register("description")}
            />

            <SelectTheme
              label="Course Category"
              placeholder="Select course category"
              leftIcon={<Tag className="w-5 h-5" />}
              helper="Choose the category that best fits your course content"
              options={categoryOptions}
              initialValue={course.category.id}
              onSelectedValueChange={handleCategoryChange}
              error={errors.categoryId}
              {...register("categoryId")}
            />

            <InputTheme
              type="number"
              label="Course Duration"
              placeholder="Duration in minutes"
              leftIcon={<Clock className="w-5 h-5" />}
              helper="Estimated time to complete this course"
              className="w-full"
              error={errors.duration}
              {...register("duration", {
                valueAsNumber: true,
              })}
            />

            <SelectTheme
              label="Course Level"
              placeholder="Select course level"
              leftIcon={<BarChart2 className="w-5 h-5" />}
              helper="Choose the course difficulty"
              options={levelOptions}
              initialValue={course.level}
              onSelectedValueChange={handleLevelChange}
              error={errors.level}
              {...register("level")}
            />

            <InputTheme
              type="number"
              label="Course Price"
              placeholder="Enter the course price"
              leftIcon={<DollarSign className="w-5 h-5" />}
              helper="Specify the cost for enrolling in this course"
              className="w-full"
              error={errors.price}
              {...register("price", {
                valueAsNumber: true,
              })}
            />

            <SelectTheme
              label="Course Status"
              placeholder="Select course status"
              leftIcon={<Globe className="w-5 h-5" />}
              helper="Manage how and where the course appears to users"
              options={statusOptions}
              initialValue={course.status}
              onSelectedValueChange={handleStatusChange}
              error={errors.status}
              {...register("status", {
                onChange: (e) => console.log(e.target.value),
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
              Save Course
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
