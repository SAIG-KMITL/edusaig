"use client";

import { createRewardAction, uploadRewardThumbnail } from "@/actions/rewardAction";
import InputTheme from "@/components/Inputs/InputTheme";
import { SelectTheme } from "@/components/Inputs/SelectTheme";
import TextareaTheme from "@/components/Inputs/TextareaTheme";
import { Toast } from "@/components/Toast/Toast";
import { createRewardSchema } from "@/schema/createReward.schema";
import { RewardOptions, RewardStatus } from "@/types/reward";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import {
  AlertCircle,
  Box,
  CheckCircle,
  ChevronLeft,
  Coins,
  FileText,
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

type CreateRewardFormData = z.infer<typeof createRewardSchema>;

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

const rewardTypeOptions: { id: RewardOptions; label: string }[] = [
  {
    id: "badge",
    label: "Badge",
  },
  {
    id: "certificate",
    label: "Certificate",
  },
  {
    id: "item",
    label: "Item",
  },
];

const statusOptions: { id: RewardStatus; label: string }[] = [
  {
    id: "active",
    label: "Active",
  },
  {
    id: "inactive",
    label: "Inactive",
  },
];

export default function CreateRewardUI() {
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

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateRewardFormData>({
    resolver: zodResolver(createRewardSchema),
    defaultValues: {
      name: "",
      description: "",
      type: undefined,
      points: undefined,
      stock: undefined,
      status: undefined,
      thumbnailUrl: "",
    },
  });

  const onSubmit = async (data: CreateRewardFormData): Promise<void> => {
    try {
      setIsLoading(true);
      const rewardResponse = await createRewardAction(
        data.name,
        data.description,
        data.type as RewardOptions,
        data.points,
        data.stock,
        data.status as RewardStatus
      );

      if (rewardResponse.error?.message) {
        Toast(rewardResponse.error.message, "error");
        return;
      }

      if (rewardResponse.data && selectedFile) {
        const uploadResponse = await uploadRewardThumbnail(
          rewardResponse.data.id,
          selectedFile
        );
        if (uploadResponse.error?.message) {
          Toast(uploadResponse.error.message, "error");
          return;
        }
      }

      Toast("The reward has been created.", "success");
      router.push("/dashboard/reward");
      reset();
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to create reward",
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
    setValue("thumbnailUrl", url);
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
    setValue("thumbnailUrl", "");
    setUploadStatus("idle");
    setUploadProgress(0);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCategoryChange = (selectedOptionId: string) => {
    setValue("type", selectedOptionId, { shouldValidate: true });
  };

  const handleStatusChange = (selectedOptionId: string) => {
    setValue("status", selectedOptionId, { shouldValidate: true });
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
            <div className="flex justify-between gap-4 flex-wrap">
              <Link
                href={`/dashboard/reward`}
                className="flex items-center px-4 py-2 text-white bg-royalPurple/20 rounded-full hover:bg-royalPurple/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5 mr-2" />
                Back to Dashboard
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
                  className="relative h-full flex flex-col items-center justify-center p-6 border-2 
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
                  {errors.thumbnailUrl && (
                    <div>
                      <div className="absolute right-1/2 translate-x-1/2 bottom-3 ">
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                          className={`text-sm text-red-500`}
                        >
                          {errors.thumbnailUrl.message}
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
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        </div>

        <div className="w-full lg:flex-1 max-w-2xl flex flex-col break-words px-6 flex-grow-1">
          <div className="flex justify-start text-white items-center font-semibold text-left text-2xl p-3 mt-5 rounded-xl">
            <span>Create Reward Details</span>
          </div>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="overflow-auto bg-steelGray/30 border border-royalPurple/20 my-1 text-left p-6 space-y-6 rounded-xl flex flex-col"
          >
            <InputTheme
              type="text"
              label="Reward Title"
              placeholder="Enter reward title"
              leftIcon={<Type className="w-5 h-5" />}
              helper="Give your reward a descriptive title"
              className="w-full"
              error={errors.name}
              {...register("name")}
            />

            <TextareaTheme
              label="Reward Description"
              placeholder="Enter reward description"
              leftIcon={<FileText className="absolute top-[13px] w-5 h-5" />}
              helper="Provide details about the reward's content"
              className="w-full h-[88px] no-scrollbar"
              error={errors.description}
              {...register("description")}
            />

            <SelectTheme
              label="Reward Type"
              placeholder="Select reward type"
              leftIcon={<Tag className="w-5 h-5" />}
              helper="Select the category this reward belongs to"
              options={rewardTypeOptions}
              onSelectedValueChange={handleCategoryChange}
              error={errors.type}
              {...register("type")}
            />

            <InputTheme
              type="number"
              label="Reward Points"
              placeholder="Enter the reward point"
              leftIcon={<Coins className="w-5 h-5" />}
              helper="Enter the points required for this reward"
              className="w-full"
              error={errors.points}
              {...register("points", {
                valueAsNumber: true,
              })}
            />

            <InputTheme
              type="number"
              label="Reward Stock"
              placeholder="Enter the reward stock"
              leftIcon={<Box className="w-5 h-5" />}
              helper="Specify how many of this reward are in stock"
              className="w-full"
              error={errors.stock}
              {...register("stock", {
                valueAsNumber: true,
              })}
            />

            <SelectTheme
              label="Reward Status"
              placeholder="Select reward status"
              leftIcon={<AlertCircle className="w-5 h-5" />}
              helper="Set the availability and visibility of this reward"
              options={statusOptions}
              onSelectedValueChange={handleStatusChange}
              error={errors.status}
              {...register("status", {
                onChange: (e) => console.log(e.target.value),
              })}
            />

            <motion.button
              type="submit"
              disabled={isLoading || uploadStatus == "uploading"}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
            >
              Save Reward
            </motion.button>
          </form>
        </div>
      </div>
    </div>
  );
}
