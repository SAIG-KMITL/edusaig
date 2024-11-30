"use client";

import { FilterDropdown } from "@/components/Button/FilterButton";
import { DashboardContainer } from "@/components/Containers/UserManagementDashboardContainer";
import InputTheme from "@/components/Inputs/InputTheme";
import { SelectTheme } from "@/components/Inputs/SelectTheme";
import Pagination from "@/components/Paginations/Pagination";
import { buttonStyles, Column, DataTable } from "@/components/Tables/UserDataTable";
import { Toast } from "@/components/Toast/Toast";
import { userManagementOptions } from "@/constants/userManagement";
import { UserManagementType } from "@/types/userManagement";
import { motion } from "framer-motion";
import { BarChart2, Delete, Edit, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import UserAvatar from "@/components/Avatar/UserAvatar";

export default function UserManagementDashboardPage({
  userManagementInfomation,
}: {
  userManagementInfomation: UserManagementType[];
}) {
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");

  const handleDeleteUserManagement = async (userUID: string): Promise<void> => {
    
  };

  const columns: Column<UserManagementType>[] = [
    {
      header: "Profile Picture",
      accessorKey: "profilePic",
      cell: (value) => <UserAvatar profilePic={value as string} />,
    },
    {
      header: " Address",
      accessorKey: "emailAddress",
    },
    {
      header: "Provider",
      accessorKey: "provider",
      cell: (value) => (
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
          {value as string}
        </span>
      ),
    },
    {
      header: "Created Date",
      accessorKey: "createdDate",
      cell: (value) => (
        <time dateTime={value as string}>
          {new Date(value as string).toLocaleDateString()}
        </time>
      ),
    },
    {
      header: "Last Sign In",
      accessorKey: "lastSignIn",
      cell: (value) => (
        <time dateTime={value as string}>
          {new Date(value as string).toLocaleDateString()}
        </time>
      ),
    },
    {
      header: "Actions",
      accessorKey: "userUID",
      cell: (value) => (
        <div className="flex justify-center gap-2">
          <Link href={`/form/edit-category/${value}`}>
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
            onClick={() => handleDeleteUserManagement(value as string)}
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
  const currentData = userManagementInfomation
    .filter((userManagement) =>
      userManagement.userUID.toLowerCase().includes(searchQuery.toLowerCase())
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

  const AddUserManagementButton = (
    <Link href="/form/create-userManagement">
      <button className={buttonStyles.primary}>Add User</button>
    </Link>
  );

  return (
    <div className="my-10">
      <div className="flex">
        <div className="p-6 w-1/4">
        <InputTheme
            placeholder="Search categories"
            value={searchQuery}
            onChange={handleSearch}
            leftIcon={<Search className="w-5 h-5" />}
            className="placeholder:text-white"
          />
        </div>
        <div className="p-6 w-1/4">
        <SelectTheme
            placeholder="Filter Category"
            leftIcon={<BarChart2 className="w-5 h-5" />}
            options={userManagementOptions}
            className="placeholder:text-white"
            onSelectedValueChange={handleFilterChange}
          />
        </div>
      </div>
      <DashboardContainer
        title="User Management"
        description="Manage User Infomation"
        actionButton={AddUserManagementButton}
      >
        <DataTable columns={columns} data={currentData} />
      </DashboardContainer>
      <Pagination
        currentPage={currentPage}
        totalItems={userManagementInfomation.length}
        onPageChange={handlePageChange}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
