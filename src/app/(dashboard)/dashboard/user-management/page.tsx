import UserManagementDashboardUI from "@/app/shared/(ui)/UserManagementDashboardUI";
import { userManagementInfomation } from "@/constants/userManagement";

export default function CategoryDashboard() {
  return <UserManagementDashboardUI userManagementInfomation={userManagementInfomation} />;
}
