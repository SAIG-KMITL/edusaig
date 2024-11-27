import {
  BarChart2,
  Book,
  XIcon,
} from "lucide-react";
import { SelectTheme } from "../Inputs/SelectTheme";
import { FieldError } from "react-hook-form";

interface UserSkillCardProps {
  index: number;
  topicOptions: {
    id: string;
    label: string;
  }[];
  visibleTopicOption: {
    id: string;
    label: string;
  }[];
  topicLevelOptions: {
    id: string;
    label: string;
  }[];
  topic: string | undefined;
  level: string | undefined;
  handleTopicChange: (index: number, value: string) => void;
  handleLevelChange: (index: number, value: string) => void;
  handleDeleteBlockClick: (index: number) => void;
  topicError?: FieldError;
  levelError?: FieldError;
}

export default function UserSkillCard({
  index,
  topicOptions,
  visibleTopicOption,
  topicLevelOptions,
  topic,
  level,
  handleTopicChange,
  handleLevelChange,
  handleDeleteBlockClick,
  topicError,
  levelError,
}: UserSkillCardProps) {
  const onSelectedTopicChange = (selectedOptionId: string) => {
    handleTopicChange(index, selectedOptionId);
  };

  const onSelectedLevelChange = (selectedOptionId: string) => {
    handleLevelChange(index, selectedOptionId);
  };

  return (
    <div className="bg-steelGray/30 border border-royalPurple/20 text-left p-6 rounded-xl relative">
      <div className="flex flex-col space-y-4">
      <SelectTheme
        label="Skill"
        placeholder="Skill you know"
        leftIcon={<Book className="w-5 h-5" />}
        options={topicOptions}
        visibleOptions={visibleTopicOption}
        onSelectedValueChange={onSelectedTopicChange}
        value={topic}
        error={topicError}
      />
      <SelectTheme
        label="Skill Level"
        placeholder="Select expertise level"
        leftIcon={<BarChart2 className="w-5 h-5" />}
        options={topicLevelOptions}
        onSelectedValueChange={onSelectedLevelChange}
        value={level}
        error={levelError}
      />
      </div>
      <button
        type="button"
        onClick={() => handleDeleteBlockClick(index)}
        className="absolute top-2 right-2 p-2 hover:bg-white/20 rounded-full"
      >
        <XIcon className="w-5 h-5 text-white" />
      </button>
    </div>
  );
}
