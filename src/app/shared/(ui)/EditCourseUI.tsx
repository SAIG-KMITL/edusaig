"use client";

import { SelectTheme } from "@/components/Inputs/SelectTheme";
import InputTheme from "@/components/Inputs/InputTheme";
import TextareaTheme from "@/components/Inputs/TextareaTheme";
import { motion } from "framer-motion";
import {
  AlertCircle,
  BarChart2,
  CheckCircle,
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
import { ChangeEvent, DragEvent, useRef, useState } from "react";
type UploadStatus = "idle" | "uploading" | "success" | "error";

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

const categoryOptions = [
  {
    id: "1",
    label: "Category1",
  },
  {
    id: "2",
    label: "Category2",
  },
  {
    id: "3",
    label: "Category3",
  }
];

const levelOptions = [
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
  }
];

const statusOptions = [
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
  }
];

export default function EditCourseUI() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploadStatus, setUploadStatus] = useState<UploadStatus>("idle");
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [dragState, setDragState] = useState<DragState>({
    isDragging: false,
    isOver: false,
  });

  const fileInputRef = useRef<HTMLInputElement>(null);

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
    console.log("Selected categoryId:", selectedOptionId);
  };

  const handleLevelChange = (selectedOptionId: string) => {
    console.log("Selected levelId:", selectedOptionId);
  };

  const handleStatusChange = (selectedOptionId: string) => {
    console.log("Selected statusId:", selectedOptionId);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

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
                  className="h-full flex flex-col items-center justify-center p-6 border-2 
                    border-dashed border-royalPurple/30 rounded-2xl transition-colors"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Upload className="w-12 h-12 text-silver mb-4" />
                  <p className="text-white text-lg font-medium mb-2">
                    Drag and drop your image here
                  </p>
                  <p className="text-silver text-sm">
                    or click the upload button above
                  </p>
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
                      <Image
                        src={previewUrl}
                        fill
                        alt="preview course thumbnail"
                        className="w-full h-full object-cover"
                      />
                    </motion.div>
                  )}

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
                    </div>
                    {uploadStatus === "success" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-4 py-2 bg-electricViolet text-white rounded-lg"
                      >
                        Save Image
                      </motion.button>
                    )}
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

          <div className="overflow-auto bg-steelGray/30 border border-royalPurple/20 my-1 text-left p-6 space-y-6 rounded-xl flex flex-col">
            <InputTheme
              type="text"
              label="Course Title"
              placeholder="Enter course title"
              leftIcon={<Type className="w-5 h-5" />}
              helper="Give your course a descriptive title"
              className="w-full"
            />

            <TextareaTheme
              label="Course Description"
              placeholder="Enter course description"
              leftIcon={<FileText className="absolute top-[13px] w-5 h-5" />}
              helper="Describe what this course covers"
              className="w-full h-[88px] no-scrollbar"
            />

            <SelectTheme 
              label="Course Category"
              placeholder="Select course category"
              leftIcon={<Tag className="w-5 h-5" />}
              helper="Choose the category that best fits your course content"
              options={categoryOptions}
              onChange={handleCategoryChange}
            />

            <InputTheme
              type="number"
              label="Course Duration"
              placeholder="Duration in minutes"
              leftIcon={<Clock className="w-5 h-5" />}
              helper="Estimated time to complete this course"
              className="w-full"
            />

            <SelectTheme 
              label="Course Level"
              placeholder="Select course level"
              leftIcon={<BarChart2 className="w-5 h-5" />}
              helper="Choose the course difficulty"
              options={levelOptions}
              onChange={handleLevelChange}
            />

            <InputTheme
              type="number"
              label="Course Price"
              placeholder="Enter the course price"
              leftIcon={<DollarSign className="w-5 h-5" />}
              helper="Specify the cost for enrolling in this course"
              className="w-full"
            />

            <SelectTheme 
              label="Course Status"
              placeholder="Select course status"
              leftIcon={<Globe className="w-5 h-5" />}
              helper="Manage how and where the course appears to users"
              options={statusOptions}
              onChange={handleStatusChange}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
            >
              Save Course
            </motion.button>
          </div>
        </div>
      </div>
    </div>
  );
}
