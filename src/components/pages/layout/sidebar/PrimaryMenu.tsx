import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useTheme
} from "@mui/material";
import { Book, Element4, SearchNormal } from "iconsax-reactjs";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../../routes/PATH";

export default function PrimaryMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const theme = useTheme();


  const isActive = (path: string) => location.pathname === path;





  return (
    <Box sx={{ padding: "0 32px 32px" }}>
      <div className="flex items-center gap-2 overflow-hidden mb-1">
        <Typography variant='caption' mb={1} sx={{
          color: theme.palette.text.light
        }}>{t("messages.main")}</Typography>
        <Divider sx={{
          borderColor: "#4B4B4B"
        }} className="w-full" />
      </div>
      <List>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.DASHBOARD.ROOT)}
            className={isActive(PATH.DASHBOARD.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <Element4 size={20} />
            </ListItemIcon>
            <ListItemText primary={t("menus.dashboard")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.MY_COURSE.ROOT)}
            className={isActive(PATH.MY_COURSE.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <Book size={20} />
            </ListItemIcon>
            <ListItemText primary={t("menus.myCourse")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.COURSE_MANAGEMENT.COURSES.ROOT)}
            className={isActive(PATH.COURSE_MANAGEMENT.COURSES.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <SearchNormal size={20} />
            </ListItemIcon>
            <ListItemText primary={t("menus.exploreCourse")} />
          </ListItemButton>
        </ListItem>
      </List>

      <div className="flex items-center gap-2 overflow-hidden mb-1 mt-8">
        <Typography variant='caption' mb={1} sx={{
          color: theme.palette.text.light
        }}>{t("messages.learning")}</Typography>
        <Divider sx={{
          borderColor: "#4B4B4B"
        }} className="w-full" />
      </div>

      <List>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.COURSE_MANAGEMENT.LIVE_CLASSES.ROOT)}
            className={isActive(PATH.COURSE_MANAGEMENT.LIVE_CLASSES.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <Element4 />
            </ListItemIcon>
            <ListItemText primary={t("menus.liveClasses")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.MY_COURSE.ROOT)}
            className={isActive(PATH.MY_COURSE.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <Book />
            </ListItemIcon>
            <ListItemText primary={t("menus.notes")} />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.COURSE_MANAGEMENT.COURSES.ROOT)}
            className={isActive(PATH.COURSE_MANAGEMENT.COURSES.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <SearchNormal size={20}/>
            </ListItemIcon>
            <ListItemText primary={t("menus.test")} />
          </ListItemButton>
        </ListItem>
      </List>

    </Box>
  );
}
