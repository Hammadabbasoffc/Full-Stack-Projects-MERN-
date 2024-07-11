import {
  AppBar,
  Backdrop,
  Box,
  Icon,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { lazy, Suspense, useState } from "react";
import { orange } from "../../constants/color";
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Add as AddIcon,
  Group as GroupIcon,
  Logout as LogoutIcon,
  Notifications as NotificationsIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const SearchDialogs = lazy(() => import("../specific/Search"));
const NotificationsDialogs = lazy(() => import("../specific/Notifications"));
const NewGroupDialogs = lazy(() => import("../specific/NewGroup"));

const Header = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isSearch, setIsSearch] = useState(false);
  const [isNewGroup, setIsNewGroup] = useState(false);
  const [isNotification, setIsNotification] = useState(false);

  const navigate = useNavigate();

  const handleMobile = () => {
    setIsMobile((prev) => !prev);
  };

  const openSearch = () => {
    setIsSearch((prev) => !prev);
  };
  const openNewGroup = () => {
    setIsNewGroup((prev) => !prev);
  };
  const logOutHandler = () => {
    console.log("logOutHandler");
  };

  const openNotification = () => {
    setIsNotification((prev) => !prev);
  };

  const navigateToGroup = () => navigate("/groups");

  return (
    <>
      <Box sx={{ flexGrow: 1 }} height={"4rem"}>
        <AppBar
          position="static"
          sx={{
            bgcolor: orange,
          }}
        >
          <Toolbar>
            <Typography
              variant="h6"
              sx={{
                display: { xs: "none", sm: "block" },
              }}
            >
              Chatt App
            </Typography>

            <Box
              sx={{
                display: { xs: "block", sm: "none" },
              }}
            >
              <IconButton color="inherit" onClick={handleMobile}>
                <MenuIcon />
              </IconButton>
            </Box>
            <Box
              sx={{
                flexGrow: 1,
              }}
            />

            <Box>
              <IconBtn
                title={"Search"}
                icon={<SearchIcon />}
                onClick={openSearch}
              />
              <IconBtn
                title={"New Group"}
                icon={<AddIcon />}
                onClick={openNewGroup}
              />
              <IconBtn
                title={"Manage Group"}
                icon={<GroupIcon />}
                onClick={navigateToGroup}
              />
              <IconBtn
                title={"Notifications"}
                icon={<NotificationsIcon />}
                onClick={openNotification}
              />
              <IconBtn
                title={"Logout"}
                icon={<LogoutIcon />}
                onClick={logOutHandler}
              />
            </Box>
          </Toolbar>
        </AppBar>
      </Box>

      {isSearch && (
        <Suspense fallback={<Backdrop open/>}>
          <SearchDialogs />
        </Suspense>
      )}
      {isNotification && (
        <Suspense fallback={<Backdrop open/>}>
          <NotificationsDialogs />
        </Suspense>
      )}
      {isNewGroup && (
        <Suspense fallback={<Backdrop open/>}>
          <NewGroupDialogs />
        </Suspense>
      )}
    </>
  );
};

const IconBtn = ({ title, icon, onClick }) => {
  return (
    <Tooltip title={title}>
      <IconButton color="inherit" size="large" onClick={onClick}>
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default Header;
