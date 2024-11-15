import { BaseTableData } from "@/components/Tables/UserDataTable";

export type UserManagementType = BaseTableData & {
  profilePic?: string; 
  emailAddress: string;
  provider: string;
  createdDate: string;
  lastSignIn: string;
  userUID: string;
};
