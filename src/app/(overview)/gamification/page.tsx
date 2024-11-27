import GamificationUI from "@/app/shared/(ui)/GamificationUI"
import { userPointStreak } from "@/constants/pointStreak"

export default function GamificationPage() {
    return <GamificationUI userPointStreak={userPointStreak}/>;
}