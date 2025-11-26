import { Box, Collapse, Typography, useTheme } from "@mui/material";
import { ArrowRight2 } from "iconsax-reactjs";
import { useState } from "react";
import type { CurriculumProps } from "../../../../../../types/course";
import CustomCollapseIcon from "../../../../../atom/CustomCollapseIcon";

interface Props {
    data?: CurriculumProps[];
    isLoading: boolean;
}

export default function SinlgeCourseCurriculum({ data, isLoading }: Props) {
    const theme = useTheme();

    // Track which accordion is open
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setOpenIndex(prev => (prev === index ? null : index));
    };

    return (
        <Box className="grid gap-6 lg:grid-cols-12">
            <div className="col-span-3">
                {data?.map((subject, index) => {
                    const isOpen = openIndex === index;

                    return (
                        <div className="accordion__item" key={subject.id}>
                            <Box
                                className="rounded-md py-4 px-5 mb-2 flex justify-between items-center cursor-pointer"
                                sx={{ background: theme.palette.brand.main }}
                                onClick={() => toggleAccordion(index)}
                            >
                                <Typography
                                    variant="textLg"
                                    fontWeight={600}
                                    color="white"
                                    className="line-clamp-1"
                                >
                                    {subject?.name}
                                </Typography>

                                <CustomCollapseIcon isOpen={isOpen} />
                            </Box>

                            <Collapse in={isOpen}>
                                {subject?.chapters?.map((chapter) => (
                                    <Box
                                        key={chapter.id}
                                        className="rounded-md py-4 px-5 mb-2 flex justify-between items-center ml-4"
                                        sx={{ background: theme.palette.primary.light }}
                                    >
                                        <Typography
                                            variant="textSm"
                                            className="line-clamp-1"
                                        >
                                            {chapter?.name}
                                        </Typography>
                                        <ArrowRight2 />
                                    </Box>
                                ))}
                            </Collapse>
                        </div>
                    );
                })}
            </div>
        </Box>
    );
}
