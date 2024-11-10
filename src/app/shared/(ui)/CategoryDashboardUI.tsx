import { DashboardContainer } from "@/components/Containers/DashboardContainer";
import DataTable, { Column } from "@/components/Tables/DataTable";
import { categories } from "@/constants/category";
import { CategoryType } from "@/types/category";

export default function CategoriesPage() {
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
      accessorKey: "createdDate",
      cell: (value) => (
        <time dateTime={value as string}>
          {new Date(value as string).toLocaleDateString()}
        </time>
      ),
    },
    {
      header: "Updated Date",
      accessorKey: "updatedDate",
      cell: (value) => (
        <time dateTime={value as string}>
          {new Date(value as string).toLocaleDateString()}
        </time>
      ),
    },
    {
      header: "Actions",
      accessorKey: "id",
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

  const AddCategoryButton = (
    <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 bg-blue-600 text-white gap-2">
      Add Category
    </button>
  );

  return (
    <DashboardContainer
      title="Categories"
      description="Manage your product categories"
      actionButton={AddCategoryButton}
    >
      <DataTable columns={columns} data={categories} />
    </DashboardContainer>
  );
}
