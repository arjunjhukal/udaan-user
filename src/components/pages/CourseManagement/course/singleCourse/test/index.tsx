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
            <EmptyList
                image="/empty-notes.png"
                title="No Test Found"
                description=""
            />
        </>
    )
}
