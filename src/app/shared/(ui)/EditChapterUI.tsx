"use client";

import {
  updateChapterAction,
  summarizeChapterAction,
  uploadChapterVideoAction,
} from "@/actions/chapterAction";
import InputTheme from "@/components/Inputs/InputTheme";
import VideoSkeleton from "@/components/Skeleton/VideoSkeleton";
import { Toast } from "@/components/Toast/Toast";
import VideoPlayer from "@/components/Video/VideoPlayer";
import { editChapterSchema } from "@/schema/chapter.schema";
import { ChapterResponseType } from "@/types/chapter.type";
import { fetchVideo } from "@/utils/resource/fetchVideo";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Bookmark,
  Brain,
  BrainCircuit,
  CheckCircle,
  ChevronLeft,
  Clock,
  FileText,
  Hash,
  List,
  ListOrdered,
  Loader,
  PlayCircle,
  Sparkle,
  Sparkles,
  Type,
  Upload,
  X,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, DragEvent, Suspense, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
type UploadStatus = "idle" | "uploading" | "success" | "error";

type EditChapterFormData = z.infer<typeof editChapterSchema>;

interface EditChapterUIProps {
  courseId: string;
  chapter: ChapterResponseType;
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

export default function EditChapterUI({
  courseId,
  chapter,
}: EditChapterUIProps) {
  const [selectedFile, setSelectedFile] = useState<VideoFile | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    isOver: false,
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<EditChapterFormData>({
    resolver: zodResolver(editChapterSchema),
    defaultValues: {
      orderIndex: chapter.orderIndex,
      videoKey: chapter.id,
    },
  });

  const onSubmit = async (data: EditChapterFormData) => {
    try {
      setIsLoading(true);
      const chapterResponse = await updateChapterAction(
        chapter.id,
        data.orderIndex,
        data.videoKey
      );

      console.log(chapterResponse);

      if (chapterResponse.error?.message || !chapterResponse.data) {
        throw new Error(
          chapterResponse.error?.message || "Failed to create chapter"
        );
      }

      if(selectedFile) {
        const uploadResponse = await uploadChapterVideoAction(
          chapterResponse.data.id,
          selectedFile
        );
  
        if (uploadResponse.error) {
          throw new Error(uploadResponse.error.message);
        }
      }
      

      Toast("Chapter created successfully!", "success");
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

  const handleSummarize = async () => {
    try {
      setIsLoading(true);

      const chapterResponse = await summarizeChapterAction(chapter.id);

      if (chapterResponse.error?.message) {
        Toast(chapterResponse.error.message, "error");
        return;
      }

      if (selectedFile && chapterResponse.data) {
        const uploadResponse = await uploadChapterVideoAction(
          chapterResponse.data.id,
          selectedFile
        );

        if (uploadResponse.error) {
          throw new Error(uploadResponse.error.message);
        }
      }

      Toast("The summary has been generated.", "success");
      router.refresh();
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to generate summary",
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
    <div className="min-h-screen">
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
              <div className="flex justify-between gap-4 flex-wrap">
                <Link
                  href={`/dashboard/course/${courseId}/course-module`}
                  className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
                >
                  <ChevronLeft className="w-5 h-5 mr-2" />
                  Back to Course Modules
                </Link>
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
              {!selectedFile && (
                <div className="relative aspect-video overflow-hidden rounded-xl bg-black">
                  <Suspense fallback={<VideoSkeleton />}>
                    <VideoPlayer source={fetchVideo(chapter.id)} />
                  </Suspense>
                </div>
              )}
              <motion.div
                initial={false}
                animate={{ height: "auto"}}
                className={`w-full bg-steelGray rounded-2xl overflow-hidden shadow-lg
                ${
                  dragState.isOver
                    ? "border-electricViolet"
                    : "border-royalPurple/30"
                }`}
              >
                {selectedFile && (
                  <div className="p-6 space-y-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-white font-medium">
                        Upload Progress
                      </h3>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={clearSelection}
                        className="p-1 hover:bg-royalPurple/20 rounded-full"
                      >
                        <X className="w-5 h-5 text-silver" />
                      </motion.button>
                    </div>
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

              {chapter.summary ? (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 p-6 rounded-2xl text-white text-sm bg-steelGray/30 border border-royalPurple/30"
                >
                  <p className="text-lg font-semibold mb-2">Summary</p>
                  <p className="text-silver">{chapter.summary}</p>
                </motion.div>
              ) : (
                <motion.button
                  type="button"
                  disabled={isLoading}
                  onClick={handleSummarize}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-6 w-full flex items-center justify-center px-4 py-3 bg-royalPurple text-white rounded-xl hover:bg-darkMagenta transition-colors"
                >
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate Summary
                </motion.button>
              )}
            </motion.div>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)} className="flex flex-col w-1/2 break-words p-5 py-0 flex-grow-1">
            <div className="flex justify-start text-white items-center font-semibold mb-3 text-left text-2xl p-3 mt-5 rounded-xl">
              <span>Edit Chapter Details</span>
            </div>

            <div className="overflow-auto bg-steelGray/30 border border-royalPurple/20 my-3 text-left p-6 space-y-6 rounded-xl flex flex-col">
              <InputTheme
                type="number"
                label="Chapter Order"
                placeholder="Enter chapter order index"
                leftIcon={<ListOrdered className="w-5 h-5" />}
                helper="Enter the position of this chapter in the module sequence."
                className="w-full"
                error={errors.orderIndex}
                { ...register("orderIndex", {
                  valueAsNumber: true,
                }) }
              />

              <motion.button
                type="submit"
                disabled={isLoading || uploadStatus == "uploading"}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
              >
                Save Chapter
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
