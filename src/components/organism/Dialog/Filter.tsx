import { Button, Dialog, DialogContent, DialogTitle, Divider, IconButton, Typography } from "@mui/material";
import { CloseCircle } from "iconsax-reactjs";
import { useEffect, useState } from "react";
import type { CourseProps } from "../../../types/course";

interface Props {
    selections: string[];
    open: boolean;
    onClose: () => void;
    onResetFilter: () => void;
    myCourses?: CourseProps[];
    selectedCourseId?: number | null;
    setSelectedCourseId?: (id: number | null) => void;
}

export default function FilterModal({
    selections,
    open,
    onClose,
    onResetFilter,
    myCourses,
    selectedCourseId,
    setSelectedCourseId
}: Props) {
    const [tempSelectedCourseId, setTempSelectedCourseId] = useState<number | null>(selectedCourseId || null);

    // Update temp state when modal opens
    useEffect(() => {
        if (open) {
            setTempSelectedCourseId(selectedCourseId || null);
        }
    }, [open, selectedCourseId]);

    const handleApplyFilter = () => {
        if (setSelectedCourseId) {
            setSelectedCourseId(tempSelectedCourseId);
        }
        onClose();
    };

    const handleResetFilter = () => {
        if (myCourses && myCourses.length > 0 && setSelectedCourseId) {
            const firstCourseId = myCourses[0].id || null;
            setTempSelectedCourseId(firstCourseId);
            setSelectedCourseId(firstCourseId);
        }
        onResetFilter();
        onClose();
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="lg"
            fullWidth
        >
            <DialogContent>
                <DialogTitle className="flex justify-between items-center ">
                    <Typography variant="h5" fontWeight={500}>Filter</Typography>
                    <IconButton sx={{ color: (theme) => theme.palette.error.main }}>
                        <CloseCircle size={20} variant="Bold" onClick={onClose} color="currentColor" />
                    </IconButton>
                </DialogTitle>
                <Divider className="mb-4!" />
                {!!myCourses?.length && (
                    <div className="my__course__filter mb-6">
                        <Typography variant="subtitle1" fontWeight={600} className="mb-3!">
                            My Courses
                        </Typography>
                        <div className="flex flex-col flex-wrap gap-3">
                            {myCourses.map((course) => (
                                <label
                                    key={course.id}
                                    className={`
                                            flex items-center gap-2 px-4 py-2 rounded-lg border-2 cursor-pointer
                                            transition-all duration-200 hover:border-blue-400 hover:bg-white
                                            ${tempSelectedCourseId === course.id
                                            ? 'border-blue-500 bg-blue-50'
                                            : 'border-gray-300 bg-white'
                                        }
                                        `}
                                >
                                    <input
                                        type="radio"
                                        name="course"
                                        value={course.id}
                                        checked={tempSelectedCourseId === course.id}
                                        onChange={() => setTempSelectedCourseId(course.id || null)}
                                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                                    />
                                    <span className="font-medium text-gray-700 text-sm">
                                        {course.name}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>
                )}
                <div className="filter__wrapper flex flex-col gap-6">
                    {/* Action Footer */}
                    <div className="action__footer flex justify-end items-center gap-2">
                        <Button onClick={handleResetFilter} className="font-medium!"
                            sx={{
                                background: (theme) => theme.palette.separator.dark,
                                color: (theme) => theme.palette.text.middle
                            }}>
                            {selections?.length ? "Reset & Close Filter" : "Cancel"}
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleApplyFilter}
                            className="font-medium!"
                        >
                            Apply Filter
                        </Button>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    )
}