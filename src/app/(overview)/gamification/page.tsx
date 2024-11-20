import GamificationUI from "@/app/shared/(ui)/Gamification"
import { userPointStreak } from "@/constants/pointStreak"

export default function GamificationPage() {
    return <GamificationUI userPointStreak={userPointStreak}/>;
}