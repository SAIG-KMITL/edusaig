import { chapters } from "@/constants/chapter";
import {
  CourseModuleResponseType,
  CourseModuleType,
} from "@/types/course.type";
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
import { ChapterResponseType, ChapterType } from "@/types/chapter.type";

interface CourseModuleEntryProps {
  module: CourseModuleResponseType;
  handleModuleSelected: (module: CourseModuleResponseType) => void;
  handleChapterSelected: (chapter: ChapterResponseType) => void;
  chapters: ChapterResponseType[];
}

export default function CourseModuleEntry({
  module,
  handleModuleSelected,
  handleChapterSelected,
  chapters,
}: CourseModuleEntryProps) {
  const [visible, setVisible] = useState<boolean>(false);
  const actionButtonEntries: ActionButtonEntryType[] = [
    {
      label: "Add Chapter",
      icon: <PlusIcon className="w-[14px] h-[14px] mr-2" />,
      type: "link",
      href: `/dashboard/course/${module.course.id}/course-module/${module.id}/chapter/create-chapter`,
    },
    {
      label: "Edit Module",
      icon: <PencilIcon className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {
        handleModuleSelected(module);
        handleOpenModal("edit-course-module-modal");
      },
    },
    {
      label: "Delete Module",
      icon: <Trash className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {
        handleModuleSelected(module);
        handleOpenModal("delete-course-module-modal");
      },
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
          <motion.div
            animate={{ rotate: visible ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <MenuIcon className="w-5 h-5 mt-[2px] text-white" />
          </motion.div>
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
          <motion.a
            href={`/dashboard/course/${module.course.id}/course-module/${module.id}/chapter/create-chapter`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="m-2 px-6 py-3 bg-silver/50 text-white rounded-xl font-medium
      hover:bg-silver/40 transition-colors flex justify-center items-center gap-2 text-sm"
          >
            <PlusIcon className="w-5 h-5" />
            <p>Add Chapter</p>
          </motion.a>
          {chapters
            .sort((a, b) => a.orderIndex - b.orderIndex)
            .filter((chapter) => chapter.moduleId == module.id)
            .map((chapter, index) => {
              return (
                <ChapterEntry
                  key={index}
                  module={module}
                  chapter={chapter}
                  handleChapterSelected={handleChapterSelected}
                />
              );
            })}
        </motion.div>
      )}
    </motion.div>
  );
}

interface ChapterEntryProps {
  module: CourseModuleResponseType;
  chapter: ChapterResponseType;
  handleChapterSelected: (chapter: ChapterResponseType) => void;
}

export function ChapterEntry({
  module,
  chapter,
  handleChapterSelected,
}: ChapterEntryProps) {
  const actionButtonEntries: ActionButtonEntryType[] = [
    {
      label: "Edit Chapter",
      icon: <PencilIcon className="w-[14px] h-[14px] mr-2" />,
      type: "link",
      href: `/dashboard/course/${module.course.id}/course-module/${module.id}/chapter/${chapter.id}/edit-chapter`,
    },
    {
      label: "Delete Chapter",
      icon: <Trash className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {
        handleChapterSelected(chapter);
        handleOpenModal("delete-chapter-modal");
      },
    },
  ];

  return (
    <div
      className={`py-2 px-6 flex justify-between items-center ${"border-b border-silver/10"} text-sm rounded-xl text-silver hover:bg-silver/10`}
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
