import { FileText, Type, XIcon } from "lucide-react";
import InputTheme from "../Inputs/InputTheme";
import Modal from "./Modal";
import { motion } from "framer-motion";
import TextareaTheme from "../Inputs/TextareaTheme";
import { clearModalInput, handleCloseModal } from "@/lib/modal";

export default function CreateCourseModuleModal() {
  return (
    <Modal
      modalId="create-module-modal"
      needBackdrop={false}
      width="max-w-[600px]"
    >
      <div className="w-full max-w-xl bg-steelGray border border-royalPurple/20 text-left p-6 rounded-xl">
        <div className="mb-4 flex justify-between items-start">
          <h2 className="text-2xl font-semibold text-white">Create Course Module</h2>
          <button 
            onClick={() => {handleCloseModal("create-module-modal"); clearModalInput("create-module-modal")}}
            className="-mr-2 p-2 hover:bg-white/20 rounded-full"
          >
            <XIcon className="w-5 h-5 text-white"/>
          </button>
        </div>
          <div className="space-y-6">
            <InputTheme
              type="text"
              label="Module Title"
              placeholder="Enter module title"
              leftIcon={<Type className="w-5 h-5" />}
              helper="Give your module a descriptive title"
              className="w-full"
            />
            <TextareaTheme
              label="Module Description"
              placeholder="Enter module description"
              leftIcon={<FileText className="absolute top-[13px] w-5 h-5" />}
              helper="Describe what this module covers"
              className="w-full h-[88px] no-scrollbar"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
            >
              Save Module
            </motion.button>
          </div>
        </div>
    </Modal>
  );
}