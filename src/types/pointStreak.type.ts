export type PointStreakType = {
    point: number;
    streak: UserStreakType[];
}

export type UserStreakType = {
    id: string;
    currentStreak: string;
    longestStreak: string;
    lastActivityDate: string;
    createdAt: string;
    updatedAt: string;
}

