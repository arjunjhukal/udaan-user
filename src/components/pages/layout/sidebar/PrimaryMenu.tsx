import {
  Box,
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "../../../../routes/PATH";
import React from "react";

export default function PrimaryMenu() {
  const { t } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  // const [content, setContent] = React.useState<boolean>(false);
  const [course, setCourse] = React.useState<boolean>(false);
  const [openCategory, setOpenCategory] = React.useState<boolean>(false);

  const isActive = (path: string) => location.pathname === path;
  //   const isChildActive = (basePath: string) =>
  //     location.pathname.startsWith(basePath);

  // Check if any of the child paths are active
  const isCourseManagementActive = () => {
    return (
      location.pathname.startsWith(PATH.COURSE_MANAGEMENT.COURSES.ROOT) ||
      location.pathname.startsWith(PATH.COURSE_MANAGEMENT.LIVE_CLASSES.ROOT) ||
      location.pathname.startsWith(PATH.COURSE_MANAGEMENT.TEST.ROOT)
    );
  };

  // Auto-expand menus if any child is active
  React.useEffect(() => {
    if (isCourseManagementActive()) {
      setCourse(true);
    }
  }, [location.pathname]);

  return (
    <Box sx={{ padding: "0 32px 32px" }}>
      {/* <Typography variant='body2' mb={1}>{t("messages.overview")}</Typography> */}
      <List>
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => navigate(PATH.DASHBOARD.ROOT)}
            className={isActive(PATH.DASHBOARD.ROOT) ? "active" : ""}
          >
            <ListItemIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 9.08341V3.41675C18.3333 2.16675 17.8 1.66675 16.475 1.66675H13.1083C11.7833 1.66675 11.25 2.16675 11.25 3.41675V9.08341C11.25 10.3334 11.7833 10.8334 13.1083 10.8334H16.475C17.8 10.8334 18.3333 10.3334 18.3333 9.08341Z"
                  stroke="#9CA3B0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M18.3333 16.5833V15.0833C18.3333 13.8333 17.8 13.3333 16.475 13.3333H13.1083C11.7833 13.3333 11.25 13.8333 11.25 15.0833V16.5833C11.25 17.8333 11.7833 18.3333 13.1083 18.3333H16.475C17.8 18.3333 18.3333 17.8333 18.3333 16.5833Z"
                  stroke="#9CA3B0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 10.9167V16.5834C8.75 17.8334 8.21667 18.3334 6.89167 18.3334H3.525C2.2 18.3334 1.66667 17.8334 1.66667 16.5834V10.9167C1.66667 9.66675 2.2 9.16675 3.525 9.16675H6.89167C8.21667 9.16675 8.75 9.66675 8.75 10.9167Z"
                  stroke="#9CA3B0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M8.75 3.41675V4.91675C8.75 6.16675 8.21667 6.66675 6.89167 6.66675H3.525C2.2 6.66675 1.66667 6.16675 1.66667 4.91675V3.41675C1.66667 2.16675 2.2 1.66675 3.525 1.66675H6.89167C8.21667 1.66675 8.75 2.16675 8.75 3.41675Z"
                  stroke="#9CA3B0"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </ListItemIcon>
            <ListItemText primary={t("menus.dashboard")} />
          </ListItemButton>
        </ListItem>
        {/* Course Management Menu */}
        <ListItem disablePadding className="menu__item">
          <ListItemButton
            onClick={() => setCourse((prev) => !prev)}
            className={isCourseManagementActive() ? "active" : ""}
          >
            <ListItemIcon>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M18.3333 13.9501V3.89174C18.3333 2.89174 17.5167 2.15008 16.525 2.23341H16.475C14.725 2.38341 12.0667 3.27508 10.5833 4.20841L10.4417 4.30008C10.2 4.45008 9.8 4.45008 9.55833 4.30008L9.35 4.17508C7.86667 3.25008 5.21667 2.36674 3.46667 2.22508C2.475 2.14174 1.66667 2.89174 1.66667 3.88341V13.9501C1.66667 14.7501 2.31667 15.5001 3.11667 15.6001L3.35833 15.6334C5.16667 15.8751 7.95833 16.7917 9.55833 17.6667L9.59167 17.6834C9.81667 17.8084 10.175 17.8084 10.3917 17.6834C11.9917 16.8001 14.7917 15.8751 16.6083 15.6334L16.8833 15.6001C17.6833 15.5001 18.3333 14.7501 18.3333 13.9501Z"
                  stroke="#9CA3B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M10 4.57495V17.075"
                  stroke="#9CA3B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M6.45833 7.07495H4.58333"
                  stroke="#9CA3B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <path
                  d="M7.08333 9.57495H4.58333"
                  stroke="#9CA3B0"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </ListItemIcon>
            <ListItemText primary={"Course Management"} />
            {/* {course ? <ExpandLess /> : <ExpandMore />} */}
          </ListItemButton>
          <Collapse in={course} timeout="auto" unmountOnExit>
            <List component="div" disablePadding sx={{ pl: 3 }}>
              <ListItem disablePadding className="menu__item">
                <ListItemButton
                  onClick={() => navigate(PATH.COURSE_MANAGEMENT.COURSES.ROOT)}
                  className={
                    location.pathname.startsWith(
                      PATH.COURSE_MANAGEMENT.COURSES.ROOT
                    )
                      ? "active-nested"
                      : ""
                  }
                >
                  <ListItemText primary={"Courses"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="menu__item">
                <ListItemButton
                  onClick={() =>
                    navigate(PATH.COURSE_MANAGEMENT.LIVE_CLASSES.ROOT)
                  }
                  className={
                    location.pathname.startsWith(
                      PATH.COURSE_MANAGEMENT.LIVE_CLASSES.ROOT
                    )
                      ? "active-nested"
                      : ""
                  }
                >
                  <ListItemText primary={"Live Classes"} />
                </ListItemButton>
              </ListItem>
              <ListItem disablePadding className="menu__item">
                <ListItemButton
                  onClick={() => navigate(PATH.COURSE_MANAGEMENT.TEST.ROOT)}
                  className={
                    location.pathname.startsWith(
                      PATH.COURSE_MANAGEMENT.TEST.ROOT
                    )
                      ? "active-nested"
                      : ""
                  }
                >
                  <ListItemText primary={"Test"} />
                </ListItemButton>
              </ListItem>
            </List>
          </Collapse>
        </ListItem>
      </List>

      {/* <Typography variant='body2' my={1}>{t("messages.master_data")}</Typography> */}
    </Box>
  );
}
