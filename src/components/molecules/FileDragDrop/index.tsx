import { Box, FormHelperText, IconButton, InputLabel, Stack, Typography, useTheme } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

interface FileDragDropProps {
    onFileChange: (files: File[]) => void;
    onFileRemoval: (id: number) => void;
    initialFiles?: { media_id: number; media_url: string }[]; // Changed to include ID
    error?: boolean;
    helperText?: string;
    maxSize?: number;
    label?: string;
    multiple?: boolean;
}

export default function FileDragDrop({
    onFileChange,
    initialFiles = [],
    error = false,
    helperText = "",
    maxSize = 3,
    label,
    multiple = true,
    onFileRemoval
}: FileDragDropProps) {
    const theme = useTheme();

    const [files, setFiles] = useState<
        { file: File | null; preview: string; media_id?: number }[]
    >([]);

    // ✅ Load edit-mode images with IDs
    useEffect(() => {
        if (initialFiles.length) {
            const mapped = initialFiles.map((item) => ({
                file: null,
                preview: item.media_url,
                media_id: item.media_id
            }));
            setFiles(mapped);
        } else {
            setFiles([]);
        }
    }, [initialFiles]);

    const onDrop = useCallback(
        (acceptedFiles: File[], rejectedFiles: any[]) => {
            if (rejectedFiles?.length) {
                const err = rejectedFiles[0]?.errors[0]?.code;
                if (err === "file-too-large") {
                    alert(`File must be under ${maxSize}MB`);
                } else if (err === "file-invalid-type") {
                    alert("Only images are allowed");
                }
                return;
            }

            const mapped = acceptedFiles.map((file) => ({
                file,
                preview: URL.createObjectURL(file),
                media_id: undefined
            }));

            const updated = multiple ? [...files, ...mapped] : mapped;

            setFiles(updated);
            onFileChange(updated.map((f) => f.file).filter((f): f is File => f !== null));
        },
        [files, maxSize, multiple, onFileChange]
    );

    const removeImage = (index: number) => {
        const fileToRemove = files[index];

        // If file has media_id, call onFileRemoval with the ID
        if (fileToRemove.media_id) {
            onFileRemoval(fileToRemove.media_id);
        } else {
            // For newly uploaded files (not yet saved), just remove from local state
            const updated = [...files];
            updated.splice(index, 1);
            setFiles(updated);
            onFileChange(updated.map((f) => f.file).filter((f): f is File => f !== null));
        }
    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { "image/*": [".png", ".jpg", ".jpeg", ".webp"] },
        multiple,
        maxSize: maxSize * 1024 * 1024
    });

    return (
        <Box className="h-full flex flex-col">
            <InputLabel>{label}</InputLabel>

            <Box
                {...getRootProps()}
                className="flex flex-col justify-center items-center text-center flex-wrap gap-4 p-4 rounded-md h-full cursor-pointer transition-all"
                sx={{
                    border: error
                        ? `1px solid ${theme.palette.error.main}`
                        : `1px solid ${theme.palette.textField.border}`,
                    backgroundColor: isDragActive ? theme.palette.action.hover : "transparent"
                }}
            >
                <input {...getInputProps()} />

                <Box sx={{ position: "relative", width: 80, height: 80, flexShrink: 0 }}>
                    <img src={"/no-image.svg"} alt="uploaded preview" />
                </Box>

                <Box>
                    <Typography variant="subtitle1">
                        {isDragActive ? "Drop images here..." : "Click or drag images"}
                    </Typography>
                    <Typography variant="subtitle2">
                        Max file size {maxSize}MB
                    </Typography>
                </Box>
            </Box>

            {helperText && (
                <FormHelperText error={error} sx={{ mt: 0.5 }}>
                    {helperText}
                </FormHelperText>
            )}

            {files.length > 0 && (
                <Stack gap={1} mt={2}>
                    {files.map((item, index) => (
                        <Box key={index} sx={{ position: "relative" }}>
                            <img
                                src={item.preview}
                                style={{
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                    borderRadius: 8,
                                    border: `1px solid ${theme.palette.textField.border}`
                                }}
                            />
                            <IconButton
                                size="small"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                }}
                                sx={{
                                    position: "absolute",
                                    top: -10,
                                    right: -10,
                                    background: "#fff"
                                }}
                            >
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M16.19 2H7.81C4.17 2 2 4.17 2 7.81V16.18C2 19.83 4.17 22 7.81 22H16.18C19.82 22 21.99 19.83 21.99 16.19V7.81C22 4.17 19.83 2 16.19 2ZM15.36 14.3C15.65 14.59 15.65 15.07 15.36 15.36C15.21 15.51 15.02 15.58 14.83 15.58C14.64 15.58 14.45 15.51 14.3 15.36L12 13.06L9.7 15.36C9.55 15.51 9.36 15.58 9.17 15.58C8.98 15.58 8.79 15.51 8.64 15.36C8.35 15.07 8.35 14.59 8.64 14.3L10.94 12L8.64 9.7C8.35 9.41 8.35 8.93 8.64 8.64C8.93 8.35 9.41 8.35 9.7 8.64L12 10.94L14.3 8.64C14.59 8.35 15.07 8.35 15.36 8.64C15.65 8.93 15.65 9.41 15.36 9.7L13.06 12L15.36 14.3Z" fill="#E21D48" />
                                </svg>
                            </IconButton>
                        </Box>
                    ))}
                </Stack>
            )}
        </Box>
    );
}