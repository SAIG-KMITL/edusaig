"use client";

import { FilterDropdown } from "@/components/Button/FilterButton";
import { DashboardContainer } from "@/components/Containers/UserManagementDashboardContainer";
import SearchInput from "@/components/Inputs/SearchInput";
import Pagination from "@/components/Paginations/Pagination";
import DataTable, { Column } from "@/components/Tables/UserDataTable";
import { userManagementOptions } from "@/constants/userManagement";
import { UserManagementType } from "@/types/userManagement";
import { div } from "framer-motion/client";
import Link from "next/link";
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
      cell: () => (
        <div className="flex justify-center gap-2">
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-gray-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
          >
            Edit
          </button>
          <button
            type="button"
            className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-red-600 bg-red-50 rounded-lg hover:bg-red-100 transition-colors duration-200"
          >
            Delete
          </button>
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

  const handleSearch = (value: string) => {
    setSearchQuery(value);
  };

  const handleFilterChange = (selectedOptions: string[]) => {
    console.log("Selected filters:", selectedOptions);
  };

  const AddUserManagementButton = (
    <Link href="/dashboard/create-userManagement">
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white gap-2">
        Add User
      </button>
    </Link>
  );

  return (
    <div className="my-10">
      <div className="flex">
        <div className="p-6 w-1/4">
          <SearchInput
            placeholder="Search User by userUID"
            onSearch={handleSearch}
          />
        </div>
        <div className="p-6 w-1/4">
          <FilterDropdown
            title="Filter User Management"
            options={userManagementOptions}
            onFilterChange={handleFilterChange}
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
