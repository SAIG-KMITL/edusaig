"use client";

import { FilterDropdown } from "@/components/Button/FilterButton";
import RewardCard from "@/components/Cards/RewardCard";
import SearchInput from "@/components/Inputs/SearchInput";
import Pagination from "@/components/Paginations/Pagination";
import { rewardOptions, rewards } from "@/constants/reward";
import { useState } from "react";

import PointStreak from "@/components/PointStreak/PointStreak";
import { userPointStreak } from "@/constants/pointStreak";

export default function RewardUI() {
  const ITEMS_PER_PAGE = 9;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentData = rewards
    .filter((reward) =>
      reward.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (selectedOptions: string[]) => {
    console.log("Selected filters:", selectedOptions);
  };

  return (
    <div className="pt-3">
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
        <PointStreak userPointStreak={userPointStreak}/>
      </div>
      <div className="pb-9">
        <div  className="w-[984px] mx-auto pt-9 pb-5 flex flex-row gap-12 gap-y-9 flex-wrap">
          {
            currentData.map((reward, index) => {
              return <RewardCard key={index} reward={reward}/>
            })
          }
        </div>
        <Pagination
          currentPage={currentPage}
          totalItems={rewards.length}
          onPageChange={handlePageChange}
          itemsPerPage={ITEMS_PER_PAGE}
        />
      </div>
    </div>
  )
}
