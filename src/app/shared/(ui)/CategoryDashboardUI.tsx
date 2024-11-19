"use client";

import { deleteCategoryAction } from "@/actions/categoryAction";
import { FilterDropdown } from "@/components/Button/FilterButton";
import { DashboardContainer } from "@/components/Containers/DashboardContainer";
import SearchInput from "@/components/Inputs/SearchInput";
import Pagination from "@/components/Paginations/Pagination";
import DataTable, { Column } from "@/components/Tables/DataTable";
import { Toast } from "@/components/Toast/Toast";
import { categoryOptions } from "@/constants/category";
import { CategoryType } from "@/types/category";
import { CATEGORY } from "@/utils/enums/category";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CategoriesPage({
  categories,
}: {
  categories: CategoryType[];
}) {
  const ITEMS_PER_PAGE = 7;
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const router = useRouter();

  const handleDeleteCategory = async (id: string): Promise<void> => {
    try {
      const response = await deleteCategoryAction(id);
      if (response.error?.statusCode === 404) {
        Toast(response.error?.message, "error");
      } else {
        Toast(CATEGORY.DELETE_SUCCESS, "success");
        router.push("/dashboard/category");
      }
    } catch (error) {
      Toast(
        error instanceof Error ? error.message : CATEGORY.DELETE_FAILED,
        "error"
      );
    }
  };

  const columns: Column<CategoryType>[] = [
    {
      header: "Title",
      accessorKey: "title",
    },
    {
      header: "Description",
      accessorKey: "description",
    },
    {
      header: "Slug",
      accessorKey: "slug",
      cell: (value) => (
        <span className="inline-flex items-center rounded-md bg-gray-100 px-2 py-1 text-xs font-medium text-gray-600">
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
          <Link href={`/form/edit-category/${value}`}>
            <button
              type="button"
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 text-sm font-medium text-blue-600 bg-gray-50 rounded-lg hover:bg-blue-100 transition-colors duration-200"
            >
              Edit
            </button>
          </Link>
          <button
            type="button"
            onClick={() => handleDeleteCategory(value as string)}
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
  const currentData = categories
    .filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const AddCategoryButton = (
    <Link href="/form/create-category">
      <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white gap-2">
        Add Category
      </button>
    </Link>
  );

  return (
    <div className="my-10">
      <div className="flex">
        <div className="p-6 w-1/4">
          <SearchInput
            placeholder="Search categories by title"
            onSearch={handleSearch}
          />
        </div>
        <div className="p-6 w-1/4">
          <FilterDropdown
            title="Filter Category"
            options={categoryOptions}
            onFilterChange={handleFilterChange}
          />
        </div>
      </div>
      <DashboardContainer
        title="Categories"
        description="Manage your product categories"
        actionButton={AddCategoryButton}
      >
        <DataTable columns={columns} data={currentData} />
      </DashboardContainer>
      <Pagination
        currentPage={currentPage}
        totalItems={categories.length}
        onPageChange={handlePageChange}
        itemsPerPage={ITEMS_PER_PAGE}
      />
    </div>
  );
}
