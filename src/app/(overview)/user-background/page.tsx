import { fetchUserAction } from "@/actions/userAction";
import { fetchUserBackgroundTopicsAction } from "@/actions/userBackgroundTopicAction";
import { fetchUserOccupationsAction } from "@/actions/userOccupationAction";
import UserBackgroundFormUI from "@/app/shared/(ui)/UserBackGroundFormUI"

export default async function UserBackground() {
    const userResponse = await fetchUserAction();
    if(!userResponse.data) {
        return null;
    }

    const userOccupationsResponse = await fetchUserOccupationsAction();
    if(!userOccupationsResponse.data?.data) {
        return null;
    }

    const userBackgroundTopicsResponse = await fetchUserBackgroundTopicsAction();
    if(!userBackgroundTopicsResponse.data?.data) {
        return null;
    }

    return <UserBackgroundFormUI user={userResponse.data} userOccupations={userOccupationsResponse.data.data} userBackgroundTopics={userBackgroundTopicsResponse.data.data}/>;
}