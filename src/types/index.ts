export interface QueryParams {
  pageIndex?: number;
  pageSize?: number;
  search?: string;
}

export interface CategoryFilterParams {
  mega_category: number[];
  category: number[];
  sub_category: number[];
  positions: number[];
}

export interface Pagination {
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export interface TestProps {
  id?: number;
  name: string;
  duration: {
    hours: number;
    minutes: number;
  };
  description: string;
  full_marks: number;
  pass_marks: number;
  start_datetime: string;
  end_datetime: string;
  course_ids: number[];
  question_ids: number[];
  category?: string[];
  questions?: number;
  status?: null;
  no_of_students?: number;
}
