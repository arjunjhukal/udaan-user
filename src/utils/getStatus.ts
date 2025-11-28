export const getStatus = (
    testDateString: string
): "upcoming" | "today" | "past" => {
    const testDate = new Date(testDateString);
    const now = new Date();

    const isSameDay =
        testDate.getFullYear() === now.getFullYear() &&
        testDate.getMonth() === now.getMonth() &&
        testDate.getDate() === now.getDate();

    if (testDate > now) return "upcoming";
    else if (isSameDay) return "today";
    else return "today";
};
