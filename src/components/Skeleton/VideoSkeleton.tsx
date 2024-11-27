import { motion } from "framer-motion";
import React from "react";

const VideoSkeleton = () => {
  return (
    <div className="w-full h-full bg-steelGray/20 rounded-xl overflow-hidden">
      <div className="relative w-full h-full">
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <div className="w-full h-full bg-gradient-to-r from-steelGray/10 via-royalPurple/20 to-steelGray/10" />
        </motion.div>

        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <motion.div
            className="w-16 h-16 rounded-full bg-darkMagenta/30"
            initial={{ scale: 0.8 }}
            animate={{
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1 bg-steelGray/20">
          <motion.div
            className="h-full bg-electricViolet/40"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default VideoSkeleton;
