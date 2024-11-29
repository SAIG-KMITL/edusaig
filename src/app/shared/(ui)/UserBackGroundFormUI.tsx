"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createPretestAction } from "@/actions/pretestAction";
import { createUserBackgroundAction } from "@/actions/userBackgroundAction";
import UserSkillCard from "@/components/Cards/UserSkillCard";
import { SelectTheme } from "@/components/Inputs/SelectTheme";
import { Toast } from "@/components/Toast/Toast";
import { createUserBackgroundSchema } from "@/schema/userBackground.schema";
import { UserResponseType } from "@/types/user.type";
import { UserBackgroundTopicResponseType } from "@/types/userBackgroundTopic.type";
import { UserOccupationResponseType } from "@/types/userOccupation.type";
import { zodResolver } from "@hookform/resolvers/zod";
import { PersonStanding, PlusIcon, Trophy } from "lucide-react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type CreateUserBackgroundFormData = z.infer<typeof createUserBackgroundSchema>;

interface UserBackGroundFormUIProps {
  user: UserResponseType;
  userOccupations: UserOccupationResponseType[];
  userBackgroundTopics: UserBackgroundTopicResponseType[];
}

export default function UserBackgroundFormUI({
  user,
  userOccupations,
  userBackgroundTopics,
}: UserBackGroundFormUIProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [topics, setTopics] = useState<(string | undefined)[]>([]);
  const [levels, setLevels] = useState<(string | undefined)[]>([]);

  const router = useRouter();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<CreateUserBackgroundFormData>({
    resolver: zodResolver(createUserBackgroundSchema),
    defaultValues: {
      userId: user.id,
      occupationId: undefined,
      topic: "",
      level: "",
    },
  });

  const onSubmit = async (
    data: CreateUserBackgroundFormData
  ): Promise<void> => {
    try {
      setIsLoading(true);
      const response = await createUserBackgroundAction(
        data.userId,
        data.occupationId,
        levels.filter((topicId): topicId is string => topicId !== undefined)
      );

      if (response.error?.message) {
        Toast(response.error.message, "error");
        return;
      }

      const pretest = await createPretestAction(
        "Pretest",
        "Pretest for background",
        20,
        3,
        1
      );

      Toast("Background has been sent.", "success");
      router.push("/pretest");
      reset();
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to send background",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddBlock = () => {
    setTopics([...topics, undefined]);
    setLevels([...levels, undefined]);

    setValue("level", "");
    setValue("topic", "");
  };

  const handleTopicChange = (index: number, value: string) => {
    const prevTopic = userBackgroundTopics.find(
      (topic) => topic.id == levels[index]
    );

    const updatedTopics = [...topics];
    updatedTopics[index] = value;
    setTopics(updatedTopics);

    const updatedLevels = [...levels];

    const newTopic = userBackgroundTopics.find((topic) => {
      return topic.title == value && topic.level == prevTopic?.level;
    });

    updatedLevels[index] = newTopic?.id;
    setLevels(updatedLevels);
  };

  const handleLevelChange = (index: number, value: string) => {
    const updatedLevels = [...levels];
    updatedLevels[index] = value;
    setLevels(updatedLevels);

    if (!updatedLevels.some((topicId) => topicId == undefined)) {
      setValue("level", "approved");
      setValue("topic", "approved");
    }
  };

  const handleDeleteBlock = (index: number) => {
    setTopics(topics.filter((_, idx) => idx !== index));
    setLevels(levels.filter((_, idx) => idx !== index));
  };

  const handleOccupationChange = (selectedOptionId: string) => {
    setValue("occupationId", selectedOptionId, { shouldValidate: true });
  };

  const occupationOptions = userOccupations.map((occupation) => {
    return {
      id: occupation.id,
      label: occupation.title,
    };
  });

  const uniqueWithKey = <T, K extends keyof T>(array: T[], key: K): T[] => {
    const seen = new Set<T[K]>();
    return array.filter((item) => {
      if (seen.has(item[key])) {
        return false;
      }
      seen.add(item[key]);
      return true;
    });
  };

  const topicOptions = uniqueWithKey(userBackgroundTopics, "title").map(
    (topic) => {
      return {
        id: topic.title,
        label: topic.title,
      };
    }
  );

  const visibleTopicOption = uniqueWithKey(userBackgroundTopics, "title")
    .filter((topic) => {
      return !topics.some((topicTitle) => topicTitle == topic.title);
    })
    .map((topic) => {
      return {
        id: topic.title,
        label: topic.title,
      };
    });

  const getTopicLevelOptions = (topicTitle: string) => {
    return userBackgroundTopics
      .filter((topic) => topic.title == topicTitle)
      .map((topic) => {
        return {
          id: topic.id,
          label: topic.level.charAt(0).toUpperCase() + topic.level.slice(1),
        };
      });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
    >
      <div className="flex flex-col mb-6 lg:mb-10">
        <h2 className="text-5xl font-bold text-white">
          Shape Your Future Journey
        </h2>
        <p className="text-silver">
          Provide your skills and aspirations to create a tailored roadmap just
          for you.
        </p>
      </div>
      <SelectTheme
        label="Your Dream Career Path"
        labelClassName="text-xl font-semibold mb-4"
        placeholder="Select your desired occupation"
        leftIcon={<Trophy className="w-5 h-5" />}
        helper="Pick the occupation you aspire to pursue. We'll use this to design a personalized course roadmap for you."
        options={occupationOptions}
        onSelectedValueChange={handleOccupationChange}
        error={errors.occupationId}
        {...register("occupationId")}
      />
      <div className="flex justify-between items-center w-full mt-10">
        <h2 className="text-xl text-white font-semibold">
          Highlight Your Expertise
        </h2>
      </div>
      <div className="mt-6 mb-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic, index) => {
          return (
            <UserSkillCard
              key={index}
              index={index}
              topic={topic}
              level={levels[index]}
              topicOptions={topicOptions}
              visibleTopicOption={visibleTopicOption}
              topicLevelOptions={getTopicLevelOptions(topic ?? "")}
              handleTopicChange={handleTopicChange}
              handleLevelChange={handleLevelChange}
              handleDeleteBlockClick={handleDeleteBlock}
              topicError={topic ? undefined : errors.topic}
              levelError={levels[index] ? undefined : errors.level}
            />
          );
        })}
        <motion.button
          type="button"
          disabled={isLoading || topics.length == topicOptions.length}
          onClick={handleAddBlock}
          whileHover={{ scale: 1.02 }}
          className="min-h-[212px] border-2 border-white/20 border-dashed rounded-2xl overflow-hidden"
        >
          <div className="w-full h-full flex flex-col justify-center items-center hover:cursor-pointer">
            <PlusIcon className="w-12 h-12 text-silver" />
            <p className="text-lg font-medium text-white">Add Skill</p>
          </div>
        </motion.button>
      </div>
      <motion.button
        type="submit"
        disabled={isLoading}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.01 }}
        className="w-full px-6 py-3 bg-electricViolet text-white rounded-xl text-xl font-medium
      hover:bg-electricViolet/90 transition-colors"
      >
        Confirm
      </motion.button>
    </form>
  );
}
