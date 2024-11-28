"use client";

import { deleteRewardAction } from "@/actions/rewardAction";
import { DashboardContainer } from "@/components/Containers/DashboardContainer";
import InputTheme from "@/components/Inputs/InputTheme";
import { SelectTheme } from "@/components/Inputs/SelectTheme";
import Pagination from "@/components/Paginations/Pagination";
import { buttonStyles, Column, DataTable } from "@/components/Tables/DataTable";
import { Toast } from "@/components/Toast/Toast";
import { categoryOptions } from "@/constants/category";
import { rewardOptions } from "@/constants/reward";
import { RewardType } from "@/types/reward";
import { motion } from "framer-motion";
import { BarChart2, Delete, Edit, Plus, Search, Tag } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RewardDashboardUI({
  rewards,
}: {
  rewards: RewardType[];
}) {
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleDeleteReward = async (id: string): Promise<void> => {
    try {
      const response = await deleteRewardAction(id);
      if (response.error?.statusCode === 404) {
        Toast(response.error?.message, "error");
      } else {
        Toast("The reward has been deleted", "success");
        router.push("/dashboard/reward");
      }
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : "Failed to delete reward",
        "error"
      );
    }
  };

  const columns: Column<RewardType>[] = [
    {
      header: "Title",
      accessorKey: "name",
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (value) => (
          <p className="max-w-[200px] truncate">{value as string}</p>
      ),
    },
    {
      header: "Type",
      accessorKey: "type",
      cell: (value) => (
        <span className="inline-flex items-center rounded-md bg-royalPurple px-2 py-1 text-xs font-medium text-white">
          {value as string}
        </span>
      ),
    },
    {
      header: "Points",
      accessorKey: "points",
    },
    {
      header: "Stock",
      accessorKey: "stock",
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: (value) => (
        <span className={`inline-flex items-center rounded-md ${value == "active" ? "bg-green-500/60" : "bg-red-500/60"} px-2 py-1 text-xs font-medium text-white`}>
          {value as string}
        </span>
      ),
    },
    {
      header: "Created Date",
      accessorKey: "createdAt",
      cell: (value) => (
        <time dateTime={value as string}>
          {new Date(value as string).toLocaleDateString()}
        </time>
      ),
    },
    {
      header: "Updated Date",
      accessorKey: "updatedAt",
      cell: (value) => (
        <time dateTime={value as string}>
          {new Date(value as string).toLocaleDateString()}
        </time>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: (value) => (
        <div className="flex justify-center gap-2">
          <Link href={`/dashboard/reward/${value}/edit-reward`}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full p-3 bg-electricViolet text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors flex items-center justify-center gap-2"
            >
              <Edit className="w-5 h-5" />
              Edit
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-3 bg-darkMagenta text-white rounded-xl font-medium
      hover:bg-electricViolet/90 transition-colors flex items-center justify-center gap-2"
            onClick={() => handleDeleteReward(value as string)}
          >
            <Delete className="w-5 h-5" />
            Delete
          </motion.button>
        </div>
      ),
    },
  ];

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

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleFilterChange = (selectedOptionId: string) => {
    console.log("Selected filter:", selectedOptionId);
  };

  const AddRewardButton = (
    <Link href="/dashboard/reward/create-reward">
      <button className={buttonStyles.primary}><Plus className="w-5 h-5 text-white"/> Add Reward</button>
    </Link>
  );

  return (
    <div className="my-10">
      <div className="flex flex-col md:flex-row">
        <div className="p-6  w-full md:w-2/3 lg:w-3/4">
          <InputTheme
            placeholder="Search rewards"
            value={searchQuery}
            onChange={handleSearch}
            leftIcon={<Search className="w-5 h-5" />}
            className="placeholder:text-white"
          />
        </div>
        <div className="p-6 w-full md:w-1/3 lg:w-1/4">
          <SelectTheme
            placeholder="Filter Reward"
            leftIcon={<Tag className="w-5 h-5" />}
            options={rewardOptions}
            className="placeholder:text-white"
            onSelectedValueChange={handleFilterChange}
          />
        </div>
      </div>
      <DashboardContainer
        title="Rewards"
        description="Manage your rewards"
        actionButton={AddRewardButton}
      >
        <DataTable columns={columns} data={currentData} />
      </DashboardContainer>
      <Pagination
        currentPage={currentPage}
        totalItems={rewards.length}
        onPageChange={handlePageChange}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
