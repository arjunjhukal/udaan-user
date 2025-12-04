import type { Pagination } from ".";

export interface LiveClassProps {
    id: number;
    name: string;
    name_np: string | null;
    agenda: string;
    agenda_np: string | null;
    zoom_uuid: string;
    duration: number;
    schedule_date: string; // ISO 8601 datetime string
    end_date: string; // ISO 8601 datetime string
    is_recurring: boolean;
    recurring_type: number;
    repeat_interval: number;
    weekly_days: number[]; // Array of day numbers (0-6)
    monthly_day: number | null;
    start_url: string;
    join_url: string;
    is_active: boolean;
    teachers: Array<{
        id: number;
        name: string;
        profile_url: string | null;
        role: string;
    }>;
    teacher_ids: number[];
    is_enable_recording: 0 | 1;
    auto_recording: "cloud" | "local" | "none";
    registration_type: number;
    created_at: string; // ISO 8601 datetime string with microseconds
    active_students: number;
    courses: number[];
    start_time: string; // ISO 8601 datetime string
    end_time: string; // ISO 8601 datetime string
    status: "ongoing" | "scheduled" | "completed" | "cancelled"; // Inferred possible statuses
};
export interface LiveClassList {
    data: {
        data: LiveClassProps[];
        pagination: Pagination
    }
}