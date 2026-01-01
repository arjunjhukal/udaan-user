import { Box, Divider, Stack, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { useGetAppSettingsQuery } from "../../../services/settingApi";
import PageHeader from "../../organism/PageHeader";

export default function SupportRoot() {
    const { t } = useTranslation();
    const { data, isLoading } = useGetAppSettingsQuery();
    return (
        <div className="support__page__root h-full flex flex-col justify-start">
            <PageHeader
                breadcrumb={[
                    {
                        title: t("menus.support")
                    }
                ]}
            />
            <Box className="h-full">
                <div className="flex flex-col gap-4 md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                    {data?.data?.support_email ? <Box className="py-4 px-6 rounded-md" sx={{
                        border: (theme) => `1px solid ${theme.palette.textField.border}`
                    }}>
                        <Typography variant="h6">Email Address</Typography>
                        <Divider className="mt-2! mb-6!" />
                        <Stack className="gap-3">
                            <Box>
                                <img src="/mail-icon.svg" alt="" />
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.middle" className="mb-1.5">Customer Support</Typography>
                                    <Link to={`mailto:${data?.data?.support_email}`}><Typography variant="subtitle1">{data?.data?.support_email}</Typography></Link>
                                </Box>
                            </Box>
                        </Stack>
                    </Box> : ""}
                    {data?.data?.support_contact_no || data?.data?.contact_no ? <Box className="py-4 px-6 rounded-md" sx={{
                        border: (theme) => `1px solid ${theme.palette.textField.border}`
                    }}>
                        <Typography variant="h6">Phone No.</Typography>
                        <Divider className="mt-2! mb-6!" />
                        <Stack className="gap-3">
                            <Box>
                                <img src="/phone-icon.svg" alt="" />
                            </Box>
                            <Box className="w-full">
                                {data?.data?.contact_no ? <Box>
                                    <Typography variant="subtitle2" color="text.middle" className="mb-1.5">Customer Support</Typography>
                                    <Link to={`tel:${data?.data?.support_contact_no}`}><Typography variant="subtitle1">{data?.data?.support_contact_no}</Typography></Link>
                                </Box> : ""}
                                <Divider className="my-3!" />
                                {data?.data?.contact_no ? <Box>
                                    <Typography variant="subtitle2" color="text.middle" className="mb-1.5">Contact Us</Typography>
                                    <Link to={`tel:${data?.data?.contact_no}`}><Typography variant="subtitle1">{data?.data?.contact_no}</Typography></Link>
                                </Box> : ""}
                            </Box>
                        </Stack>
                    </Box> : ""}
                </div>
            </Box>
        </div>
    )
}