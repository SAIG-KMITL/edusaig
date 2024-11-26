"use client";

import { createUserRewardAction } from "@/actions/userRewardAction";
import { Toast } from "@/components/Toast/Toast";
import { rewards } from "@/constants/reward";
import { RewardType } from "@/types/reward";
import { fetchThumbnailReward } from "@/utils/thumbnail/fetchThumbnail";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

interface RewardDetailProps {
  rewardId: string;
}

const fadeIn = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const imageVariants = {
  hover: { scale: 1.05 },
};

const buttonVariants = {
  initial: { scale: 1 },
  hover: { scale: 1.02 },
  tap: { scale: 0.98 },
};

export default function RewardDetailUI({ reward }: { reward: RewardType }) {
  if (!reward) {
    return null;
  }

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case "beginner":
        return "bg-beginner";
      case "intermediate":
        return "bg-intermediate";
      case "advanced":
        return "bg-advanced";
      default:
        return "bg-skyBlue";
    }
  };

  const handleCreateUserReward = async (): Promise<void> => {
    try {
      const response = await createUserRewardAction(reward.id);
      console.log(response);

      if (response.data) {
        Toast("Reward redeemed successfully", "success");
      } else {
        Toast(response.error?.message || "Failed to redeem reward", "error");
      }
    } catch (error) {
      console.log(error);
      Toast(
        error instanceof Error ? error.message : "Failed to redeem reward",
        "error"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-steelGray to-royalPurple py-20">
      <motion.div
        className="max-w-6xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        <div className="flex flex-col md:flex-row justify-center gap-12">
          <motion.div
            className="w-full md:w-[500px]"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <motion.div
              className="relative group"
              variants={imageVariants}
              whileHover="hover"
            >
              <Image
                src={fetchThumbnailReward(reward.id)}
                width={468}
                height={350}
                alt="reward thumbnail"
                className="w-full h-[350px] p-4 rounded-2xl bg-white/10 backdrop-blur-md object-cover shadow-xl transition-all duration-300 border border-white/20"
              />
              <div className="absolute inset-0 rounded-2xl bg-electricViolet/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.div>
          </motion.div>

          <motion.div
            className="w-full md:w-[400px] flex flex-col items-start gap-6"
            {...fadeIn}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="flex flex-col items-start gap-3">
              <motion.h1
                className="text-4xl font-bold text-white leading-tight"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                {reward.name}
              </motion.h1>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <span
                  className={`px-4 py-1 rounded-full text-white text-sm font-medium ${getTypeColor(
                    reward.type
                  )}`}
                >
                  {reward.type}
                </span>
              </motion.div>
            </div>

            <motion.div
              className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-xl p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
            >
              <p className="text-3xl font-bold text-skyBlue">{reward.points}</p>
              <Coins size={28} className="animate-pulse text-skyBlue" />
            </motion.div>

            <motion.div
              className="flex flex-col gap-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              <h2 className="text-xl font-semibold text-white">Description</h2>
              <p className="text-silver/90 leading-relaxed">
                {reward.description}
              </p>
            </motion.div>

            <motion.button
              onClick={() => handleCreateUserReward()}
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              className="py-3 w-full flex justify-center items-center gap-2 rounded-xl
                       bg-gradient-to-r from-electricViolet to-darkMagenta
                       hover:shadow-lg transition-all duration-300
                       border border-white/10"
            >
              <span className="text-xl text-white font-medium">
                Redeem Reward
              </span>
              <Image
                src="/icons/present.svg"
                width={24}
                height={24}
                alt="present icon"
                className="animate-bounce"
              />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
