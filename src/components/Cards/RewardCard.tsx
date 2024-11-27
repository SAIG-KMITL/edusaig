import { RewardType } from "@/types/reward";
import { fetchThumbnailReward } from "@/utils/resource/fetchThumbnail";
import { motion } from "framer-motion";
import { Coins } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const RewardCard = ({ reward }: { reward: RewardType }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/reward/${reward.id}`}
        className="block overflow-hidden cursor-pointer"
      >
        <div className="w-[296px] relative gradient-border p-2 rounded-2xl bg-gradient-to-t from-white/5 to-white/25 hover:to-white/30 shadow-lg hover:shadow-xl transition-all duration-300">
          <div className="relative overflow-hidden rounded-lg">
            <motion.div
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Image
                src={fetchThumbnailReward(reward.id)}
                width={560}
                height={400}
                alt="reward thumbnail"
                className="w-[296px] h-[200px] object-cover rounded-lg"
              />
            </motion.div>
            <motion.div
              className="absolute top-3 right-3 bg-silver backdrop-blur-sm rounded-full px-3 py-1 flex items-center gap-1"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              <p className="text-sm font-bold text-steelGray">
                {reward.points}
              </p>
              <Coins size={28} className="animate-pulse text-steelGray" />
            </motion.div>
          </div>

          <div className="p-4">
            <motion.div
              className="mb-2"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <h3 className="text-lg font-semibold text-white mb-2">
                {reward.name}
              </h3>
              <span className="inline-block px-3 py-1 rounded-full text-sm font-medium bg-gradient-to-r from-oceanBlue to-skyBlue text-white">
                {reward.type}
              </span>
            </motion.div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default RewardCard;
