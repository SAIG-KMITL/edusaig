import {
  CourseModuleResponseType,
  CourseModuleType,
} from "@/types/course.type";
import { motion, progress } from "framer-motion";
import {
  CheckCircle,
  ChevronDown,
  Lock,
  MenuIcon,
  MoreVerticalIcon,
  PencilIcon,
  Play,
  PlusIcon,
  Trash,
} from "lucide-react";
import { useState } from "react";
import ActionButton, { ActionButtonEntryType } from "./ActionButton";
import { handleOpenModal } from "@/lib/modal";
import { ChapterResponseType } from "@/types/chapter.type";
import { useRouter } from "next/navigation";
import { courseModule } from "@/constants/courseModule";
import RadialProgress from "../Progresses/RadialProgress";
import { ProgressResponseType } from "@/types/progress.type";

interface CourseModuleEntryProps {
  module: CourseModuleResponseType;
  handleModuleSelected?: (module: CourseModuleResponseType) => void;
  handleChapterSelected?: (chapter: ChapterResponseType) => void;
  currentChapter?: ChapterResponseType;
  chapters: ChapterResponseType[];
  isOwner: boolean;
  editMode?: boolean;
  hasEnrolled?: boolean;
  progresses?: ProgressResponseType[];
}

export default function CourseModuleEntry({
  module,
  handleModuleSelected,
  handleChapterSelected,
  currentChapter,
  chapters,
  isOwner,
  editMode,
  hasEnrolled,
  progresses,
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
        handleModuleSelected?.(module);
        handleOpenModal("edit-course-module-modal");
      },
    },
    {
      label: "Delete Module",
      icon: <Trash className="w-[14px] h-[14px] mr-2" />,
      type: "button",
      onClick: () => {
        handleModuleSelected?.(module);
        handleOpenModal("delete-course-module-modal");
      },
    },
  ];

  const hasChapterCompleted = (chapter: ChapterResponseType): boolean => {
    return (
      progresses
        ?.filter((progress) => progress.chapter.id == chapter.id)
        ?.some((progress) => progress.status == "completed") ?? false
    );
  };

  const isPlaying = chapters.some(
    (chapter) => chapter.id == currentChapter?.id
  );
  const percent = Math.round(
    (chapters.filter((chapter) => hasChapterCompleted(chapter)).length /
      chapters.length) *
      100
  );

  if (!editMode && chapters.length == 0) {
    return null;
  }

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
    >
      <div
        onClick={() => setVisible(!visible)}
        className={`w-full px-6 py-2 flex items-start gap-2 rounded-lg ${
          isPlaying ? "bg-skyBlue/20" : "bg-silver/10 hover:bg-silver/15"
        } hover:cursor-pointer`}
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
          {isOwner ? (
            <div>
              {editMode && (
                <ActionButton
                  entries={actionButtonEntries}
                  buttonClassName="-mr-2"
                  popupClassName="w-[150px]"
                />
              )}
            </div>
          ) : (
            <div>
              {hasEnrolled && (
                <RadialProgress
                  value={percent}
                  className={
                    "-mr-1 text-xs text-skyBlue bg-steelGray/60 border-4 border-steelGray/60"
                  }
                />
              )}
            </div>
          )}
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
          {isOwner && editMode && (
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
          )}

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
                  isOwner={isOwner}
                  editMode={editMode}
                  isPlaying={
                    currentChapter ? chapter.id == currentChapter.id : false
                  }
                  isCompleted={hasChapterCompleted(chapter)}
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
  handleChapterSelected?: (chapter: ChapterResponseType) => void;
  isOwner: boolean;
  editMode?: boolean;
  isPlaying?: boolean;
  isCompleted?: boolean;
}

export function ChapterEntry({
  module,
  chapter,
  handleChapterSelected,
  isOwner,
  editMode,
  isPlaying,
  isCompleted,
}: ChapterEntryProps) {
  const router = useRouter();
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
        handleChapterSelected?.(chapter);
        handleOpenModal("delete-chapter-modal");
      },
    },
  ];

  const handleNavigate = () => {
    if (!editMode) {
      router.push(`/course/${module.course.id}/chapter/${chapter.id}`);
    }
  };

  return (
    <div
      onClick={handleNavigate}
      className={`py-2 px-6 flex justify-between items-center border-b border-silver/10 text-sm rounded-xl text-silver ${
        isPlaying ? "bg-skyBlue/10" : "hover:bg-silver/10"
      }`}
    >
      <div className="flex gap-2 items-center">
        <div
          className={`w-8 h-8 ${
            isPlaying ? "bg-skyBlue/30" : "bg-royalPurple/30"
          } rounded-full flex items-center justify-center -ml-2 mr-2`}
        >
          {isPlaying ? (
            <Play className="w-8 h-8 p-2" />
          ) : (
            <span>{chapter.orderIndex}</span>
          )}
        </div>
        <p>{chapter.title}</p>
        <p className="text-silver/40">{`(${chapter.duration} mins)`}</p>
      </div>
      {isOwner ? (
        <div>
          {editMode && (
            <ActionButton
              entries={actionButtonEntries}
              icon={<MoreVerticalIcon className="w-4 h-4 text-silver/60" />}
              popupClassName={"w-[150px]"}
            />
          )}
        </div>
      ) : (
        isCompleted && (
          <CheckCircle className="mr-[14px] w-5 h-5 text-skyBlue ml-auto" />
        )
      )}
    </div>
  );
}
