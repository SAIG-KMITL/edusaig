"use client";

import { deleteCategoryAction } from "@/actions/categoryAction";
import { DashboardContainer } from "@/components/Containers/DashboardContainer";
import InputTheme from "@/components/Inputs/InputTheme";
import { SelectTheme } from "@/components/Inputs/SelectTheme";
import Pagination from "@/components/Paginations/Pagination";
import { buttonStyles, Column, DataTable } from "@/components/Tables/DataTable";
import { Toast } from "@/components/Toast/Toast";
import { categoryOptions } from "@/constants/category";
import { CategoryType } from "@/types/category";
import { CATEGORY } from "@/utils/enums/category";
import { motion } from "framer-motion";
import { BarChart2, Delete, Edit, Search } from "lucide-react";
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
        <span className="inline-flex items-center rounded-md bg-royalPurple px-2 py-1 text-xs font-medium text-white">
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
            onClick={() => handleDeleteCategory(value as string)}
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
  const currentData = categories
    .filter((category) =>
      category.title.toLowerCase().includes(searchQuery.toLowerCase())
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

  const AddCategoryButton = (
    <Link href="/form/create-category">
      <button className={buttonStyles.primary}>Add Category</button>
    </Link>
  );

  return (
    <div className="my-10">
      <div className="flex">
        <div className="p-6 w-3/4">
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
            options={categoryOptions}
            className="placeholder:text-white"
            onSelectedValueChange={handleFilterChange}
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
