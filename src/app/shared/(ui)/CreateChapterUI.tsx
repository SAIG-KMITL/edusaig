"use client";

import { createChapterAction, uploadChapterVideoAction } from "@/actions/chapterAction";
import InputTheme from "@/components/Inputs/InputTheme";
import { Toast } from "@/components/Toast/Toast";
import { createChapterSchema } from "@/schema/chapter.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  FileText,
  Hash,
  Loader,
  PlayCircle,
  Type,
  Upload,
  X,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type UploadStatus = "idle" | "uploading" | "success" | "error";

type CreateChapterFormData = z.infer<typeof createChapterSchema>;

interface CreateChapterUIProps {
  courseId: string;
  moduleId: string;
}

interface VideoFile extends File {
  type: string;
}

interface FileDetails {
  name: string;
  size: number;
  type: string;
  url: string;
}

interface DragState {
  isDragging: boolean;
  isOver: boolean;
}

const formatFileSize = (bytes: number): string => {
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
};

const validateVideoFile = (file: File | undefined): boolean => {
  return Boolean(file && file.type.startsWith("video/"));
};

export default function CreateChapterUI({ courseId, moduleId }: CreateChapterUIProps) {
  const [selectedFile, setSelectedFile] = useState<VideoFile | null>(null);
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateChapterFormData>({
    resolver: zodResolver(createChapterSchema),
    defaultValues: {
      title: "",
      description: "",
      content: "",
      summary: "",
      duration: undefined,
      moduleId: moduleId,
      isPreview: false,
      videoUrl: "",
    },
  });

  const onSubmit = async (data: CreateChapterFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const chapterResponse = await createChapterAction(
        data.title,
        data.description,
        data.content,
        data.summary,
        data.duration,
        data.moduleId,
        data.isPreview,
      );

      if (chapterResponse.error?.message) {
        Toast(chapterResponse.error.message, "error");
        return;
      }
    
      if (chapterResponse.data && selectedFile) {
        const uploadResponse = await uploadChapterVideoAction(
          chapterResponse.data.id,
          selectedFile
        );
    
        if (uploadResponse.error?.message) {
          Toast(uploadResponse.error.message, "error");
          return;
        }
      }

      Toast("The chapter has been created.", "success");
      router.push(`/dashboard/course/${courseId}/course-module`);
      reset();  
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to create chapter",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleFileSelect = (event: ChangeEvent<HTMLInputElement>): void => {
    const file = event.target.files?.[0] as VideoFile;
    if (validateVideoFile(file)) {
      processFile(file);
    }
  };

  const processFile = (file: VideoFile): void => {
    setSelectedFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    setValue("videoUrl", url);
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
    }, 500);
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

    const file = e.dataTransfer.files[0] as VideoFile;
    if (validateVideoFile(file)) {
      processFile(file);
    }
  };

  const clearSelection = (): void => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setValue("videoUrl", "");
    setUploadStatus("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="w-full p-12">
      <div className="flex flex-row h-full drop-shadow-lg rounded-xl">
        <div className="w-full max-w-4xl mx-auto p-6">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col space-y-6"
          >
            <div className="flex justify-end">
              <motion.label
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="relative flex items-center justify-center p-4 w-72 
                  bg-electricViolet hover:bg-electricViolet/90 text-white rounded-xl 
                  shadow-lg cursor-pointer transition-colors group"
              >
                <Upload className="w-5 h-5 mr-2" />
                <span className="font-medium">Choose Video to Upload</span>
                <input
                  type="file"
                  className="hidden"
                  accept="video/*"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                />
              </motion.label>
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
                  className="relative h-full flex flex-col items-center justify-center p-6 border-2 
                    border-dashed border-royalPurple/30 rounded-2xl transition-colors"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-silver mb-4" />
                  <p className="text-white text-lg font-medium mb-2">
                    Drag and drop your video here
                  </p>
                  <p className="text-silver text-sm">
                    or click the upload button above
                  </p>
                  {errors.videoUrl && (
                    <div>
                      <div className="absolute right-1/2 translate-x-1/2 bottom-3 ">
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-sm text-red-500`}
                        >
                          {errors.videoUrl.message}
                        </motion.p>
                      </div>
                      <div className="absolute right-3 top-3">
                        <AlertCircle className="w-5 h-5 text-red-500" />
                      </div>
                    </div>
                  )}
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

                  {previewUrl && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="relative aspect-video rounded-xl overflow-hidden bg-black/50"
                    >
                      <video
                        src={previewUrl}
                        className="w-full h-full object-contain"
                        controls
                      />
                    </motion.div>
                  )}

                  <div className="flex items-center justify-between p-4 bg-royalPurple/10 rounded-xl">
                    <div className="flex items-center">
                      <PlayCircle className="w-5 h-5 text-skyBlue mr-2" />
                      <div>
                        <p className="text-white font-medium">
                          {selectedFile.name}
                        </p>
                        <p className="text-silver text-sm">
                          {formatFileSize(selectedFile.size)}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="flex flex-col w-1/2 break-words p-5 py-0 flex-grow-1">
          <div className="flex justify-start text-white items-center font-semibold mb-3 text-left text-2xl p-3 mt-5 rounded-xl">
            <span>Create Chapter Details</span>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="overflow-auto bg-steelGray/30 border border-royalPurple/20 my-3 text-left p-6 space-y-6 rounded-xl flex flex-col">
            <InputTheme
              type="text"
              label="Chapter Title"
              placeholder="Enter chapter title"
              leftIcon={<Type className="w-5 h-5" />}
              helper="Give your chapter a descriptive title"
              className="w-full"
              error={errors.title}
              {...register("title")}
            />

            <InputTheme
              type="text"
              label="Chapter Description"
              placeholder="Enter chapter description"
              leftIcon={<FileText className="w-5 h-5" />}
              helper="Briefly describe what this chapter covers"
              className="w-full"
              error={errors.description}
              {...register("description")}
            />

            <InputTheme
              type="number"
              label="Chapter Duration"
              placeholder="Duration in minutes"
              leftIcon={<Clock className="w-5 h-5" />}
              helper="Estimated time to complete this chapter"
              className="w-full"
              error={errors.duration}
              {...register("duration",{
                valueAsNumber: true,
              })}
            />

            <InputTheme
              type="text"
              label="Chapter Content"
              placeholder="Enter chapter content"
              leftIcon={<Hash className="w-5 h-5" />}
              helper="Main content or key points of the chapter"
              className="w-full"
              error={errors.content}
              {...register("content")}
            />

            <InputTheme
              type="text"
              label="Chapter Summary"
              placeholder="Enter chapter summary"
              leftIcon={<FileText className="w-5 h-5" />}
              helper="Briefly summarize the key points or events of this chapter"
              className="w-full"
              error={errors.summary}
              {...register("summary")}
            />

            <motion.div
              className="flex items-center space-x-3 p-3 bg-royalPurple/10 rounded-xl"
              whileHover={{ backgroundColor: "rgba(88, 48, 145, 0.2)" }}
            >
              <input
                type="checkbox"
                id="isPreview"
                name="isPreview"
                className="w-5 h-5 rounded border-royalPurple/30 bg-steelGray/50 
        text-electricViolet focus:ring-electricViolet/50 cursor-pointer"
                onChange={(e) => setValue("isPreview", e.target.checked)}
              />
              <label
                htmlFor="isPreview"
                className="text-white text-sm font-medium cursor-pointer select-none"
              >
                Make this chapter available for preview
              </label>
            </motion.div>

            <motion.button
              type="submit"
              disabled={isLoading  || uploadStatus == "uploading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
            >
              Save Chapter
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
