import { BaseTableData } from "@/components/Tables/DataTable";

export type CategoryType = BaseTableData & {
  id: string;
  title: string;
  description: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};
