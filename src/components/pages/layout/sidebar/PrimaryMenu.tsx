import { Box, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Typography } from '@mui/material';
import { Element4 } from 'iconsax-reactjs';
import { useTranslation } from 'react-i18next';
export default function PrimaryMenu() {
    const { t } = useTranslation();
    return (

        <Box sx={{
            padding: "0 32px 32px"
        }}>
            <Typography variant='body2'>Overview</Typography>
            <List>
                <ListItem>
                    <ListItemButton>
                        <ListItemIcon>
                            <Element4 />
                        </ListItemIcon>
                        <ListItemText primary={t("menus.dashboard")} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Box>
    )
}
