export const getStatus = (
    startDateString: string,
    endDateString: string
): "upcoming" | "ongoing" | "past" => {
    const now = new Date();
    const start = new Date(startDateString);
    const end = new Date(endDateString);

    if (now < start) return "upcoming";
    if (now >= start && now <= end) return "ongoing";
    return "past";
};
