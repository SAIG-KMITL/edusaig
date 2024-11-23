import { chapters } from "@/constants/chapter";
import { CourseModuleType } from "@/types/course.type";
import { motion } from "framer-motion";
import {
  ChevronDown,
  MenuIcon,
  MoreVerticalIcon,
  PencilIcon,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import ActionButton, { ActionButtonEntryType } from "./ActionButton";
import { handleOpenModal } from "@/lib/modal";
import { ChapterType } from "@/types/chapter.type";

interface CourseModuleEntryProps {
  module: CourseModuleType;
  handleModuleSelected: (module: CourseModuleType) => void;
}

export default function CourseModuleEntry({
  module,
  handleModuleSelected,
}: CourseModuleEntryProps) {
  const [visible, setVisible] = useState<boolean>(false);

  const actionButtonEntries: ActionButtonEntryType[] = [
    {
      label: "Add Chapter",
      icon: <PlusIcon className="w-[14px] h-[14px] mr-2" />,
      type: "link",
      href: "/dashboard/chapter/create-chapter",
    },
    {
      label: "Edit Module",
      icon: <PencilIcon className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {
        handleModuleSelected(module);
        handleOpenModal("edit-module-modal");
      },
    },
    {
      label: "Delete Module",
      icon: <Trash className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {},
    },
  ];

  return (
    <motion.div 
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div
        onClick={() => setVisible(!visible)}
        className="w-full px-6 py-2 flex items-start gap-2 rounded-lg bg-silver/10 hover:bg-silver/15 hover:cursor-pointer"
      >
        {visible ? (
          <motion.div
            animate={{ rotate: visible ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <ChevronDown className="w-5 h-5 text-white/60" />
          </motion.div>
        ) : (
          <MenuIcon className="w-5 h-5 mt-[2px] text-white" />
        )}
        <div className="flex-1 flex justify-between items-start">
          <div className="flex flex-col items-start">
            <p className="text-white">{module.title}</p>
            <p className="text-sm font-light text-silver">
              {module.description}
            </p>
          </div>
          <ActionButton
            entries={actionButtonEntries}
            buttonClassName="-mr-2"
            popupClassName="w-[150px]"
          />
        </div>
      </div>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className={`
          w-full
          bg-steelGray
          text-white
          border border-royalPurple/30
          rounded-xl
          transition-all duration-200
          hover:border-electricViolet/50
          `}
        >
          {chapters.map((chapter, index) => {
            return <ChapterEntry key={index} chapter={chapter} />;
          })}
        </motion.div>
      )}
    </motion.div>
  );
}

interface ChapterEntryProps {
  chapter: ChapterType;
}

export function ChapterEntry({ chapter }: ChapterEntryProps) {
  const actionButtonEntries: ActionButtonEntryType[] = [
    {
      label: "Edit Chapter",
      icon: <PencilIcon className="w-[14px] h-[14px] mr-2" />,
      type: "link",
      href: `/dashboard/chapter/edit-chapter/${chapter.id}`,
    },
    {
      label: "Delete Chapter",
      icon: <Trash className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {},
    },
  ];

  return (
    <div
      className={`py-2 px-6 flex justify-between items-center ${"border-b border-silver/10"} text-sm text-silver hover:bg-silver/10`}
    >
      <div className="flex gap-2">
        <p className="text-silver/60">{`Chapter ${chapter.orderIndex}`}</p>
        <p>{chapter.title}</p>
      </div>
      <ActionButton
        entries={actionButtonEntries}
        icon={<MoreVerticalIcon className="w-4 h-4 text-silver/60" />}
        popupClassName={"w-[150px]"}
      />
    </div>
  );
}
