import type { Pagination } from ".";
import type { GlobalResponse } from "./user";

export type QuestionTypeProps = "mcq" | "subjective"
export interface OptionProps {
    id: number | null,
    option: string,
    is_correct: boolean
}

export interface QuestionProps {
    id: number | null;
    points: number;
    question: string;
    options: OptionProps[],
    megacategory_id: number | null;
    question_type: QuestionTypeProps
}

export const QuestionInitialState: QuestionProps = {
    id: null,
    points: 0,
    question: "",
    options: [{ id: null, option: "", is_correct: false }],
    megacategory_id: null,
    question_type: "mcq"
};

export interface QuestionList extends GlobalResponse {
    data: {
        data: QuestionProps[];
        pagination: Pagination
    }
}

export interface TestProps {
    id?: number;
    name: string;
    test_type?: string;
    duration: {
        hours: number;
        minutes: number;
    };
    description: string;
    full_mark: number;
    pass_mark: number;
    start_datetime: string;
    end_datetime: string;
    course_ids: number[];
    question_ids: number[];
    category?: string[];
    questions?: number;
    status?: null;
    no_of_students?: number;
    total_questions?: number;
}



export const TestInitialState: TestProps = {
    name: "",
    test_type: "",
    duration: {
        hours: 0,
        minutes: 0
    },
    description: "",
    full_mark: 100,
    pass_mark: 40,
    start_datetime: "",
    end_datetime: "",
    course_ids: [],
    question_ids: []
};
export interface TestList {
    data: {
        data: TestProps[]
        pagination: Pagination
    }
}