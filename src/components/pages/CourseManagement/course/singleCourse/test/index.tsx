import type { TestList } from "../../../../../../types/question";
import { EmptyList } from "../../../../../molecules/EmptyList";

interface Props {
    data?: TestList;
    isLoading: boolean;
}
export default function SinlgeCourseTest({ data, isLoading }: Props) {
    console.log(data, isLoading)
    return (
        <>
            <h1>Arjun Jhukal</h1>
            <EmptyList
                image="/empty-list-placeholder.svg"
                title="No Test Found"
                description=""
            />
        </>
    )
}
