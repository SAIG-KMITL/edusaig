"use client";

import { FilterDropdown } from "@/components/Button/FilterButton";
import RewardCard from "@/components/Cards/RewardCard";
import SearchInput from "@/components/Inputs/SearchInput";
import Pagination from "@/components/Paginations/Pagination";
import { rewardOptions, rewards } from "@/constants/reward";
import { useState } from "react";

import PointStreak from "@/components/PointStreak/PointStreak";
import { userPointStreak } from "@/constants/pointStreak";
import { RewardResponseType, RewardType } from "@/types/reward";
import { PointStreakType } from "@/types/pointStreak.type";
import { fetchRewardsAction } from "@/actions/rewardAction";

interface RewardUIProps {
  rewards: RewardResponseType;
  userPointStreak: PointStreakType;
}

export default function RewardUI({ rewards, userPointStreak }: RewardUIProps) {
  const ITEMS_PER_PAGE = rewards.meta?.pageSize || 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [currentData, setCurrentData] = useState<RewardType[]>(rewards.data);

  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const endIndex = startIndex + ITEMS_PER_PAGE;
  // const currentData = rewards.data
  //   .filter((reward) =>
  //     reward.name.toLowerCase().includes(searchQuery.toLowerCase())
  //   )
  //   .slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    handlefetchRewards(page);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (selectedOptions: string[]) => {
    console.log("Selected filters:", selectedOptions);
  };

  const handlefetchRewards = async (page: number) => {
    const response = await fetchRewardsAction(page);

    if (response.data) {
      setCurrentData(response.data.data);
    }
  };

  return (
    <div className="min-h-screen pt-10">
      <div className="w-[984px] mx-auto flex">
        {/* <div className="p-6 pl-0 w-1/3">
          <SearchInput
            placeholder="Search rewards by name"
            onSearch={handleSearch}
          />
        </div>
        <div className="p-6 w-1/3">
          <FilterDropdown
            title="Filter Reward"
            options={rewardOptions}
            onFilterChange={handleFilterChange}
          />
        </div> */}
        <PointStreak userPointStreak={userPointStreak} />
      </div>
      <div className="pb-9">
        <div className="w-[984px] mx-auto pt-9 pb-5 flex flex-row gap-12 gap-y-9 flex-wrap">
          {currentData.map((reward, index) => {
            return <RewardCard key={index} reward={reward} />;
          })}
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={rewards.meta?.total || 0}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  );
}
