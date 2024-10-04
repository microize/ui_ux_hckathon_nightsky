import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from './sideMenuSlice';

import logoWithText from "../../assets/light_vaidya_logo_original.png"
import profile_picture from "../../assets/profile_picture.png"

import {
  Menu as MenuIcon,
  Close as CloseIcon,
  Home as HomeIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
  ShoppingCart as ShoppingCartIcon,
  Description as DescriptionIcon,
  Email as EmailIcon,
  Add as AddIcon,
  Send as SendIcon,
  ArrowForward as ArrowForwardIcon,
  ArrowBackIosNew as ArrowBackIosNewIcon,
  Mail as MailIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  MoveToInbox as InboxIcon,
  AutoAwesome as AutoAwesomeIcon,
  SportsVolleyball as SportsVolleyballIcon,
  HistoryEdu as HistoryEduIcon
} from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  Box,
  FormGroup,
  FormControlLabel,
  Switch,
  Typography,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Divider,
  Collapse,
  Container
} from "@mui/material";

import { styled, useTheme } from '@mui/material/styles';


import './sideMenu.css';
import { toggleTheme } from '../theme/themeSlice';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));
const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);

const MenuItem = ({ item, open }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    if (item.subItems) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  return (
    <div>
      <div className="menu-item" onClick={toggleSubMenu}>
        <item.icon fontSize="medium" />
        {open && (
          <>
            <span className="ml-4 flex-grow menu-item-text">{item.text}</span>
            {item.subItems && (
              <ArrowForwardIcon
                fontSize="small"
                className={`transform ${isSubMenuOpen ? 'rotate-180' : ''}`}
              />
            )}
          </>
        )}
      </div>
      {open && isSubMenuOpen && item.subItems && (
        <div className="submenu">
          {item.subItems.map((subItem, index) => (
            <div key={index} className="menu-item">
              <subItem.icon fontSize="small" />
              <span className="ml-3">{subItem.text}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const SideMenu = () => {
  const open = useSelector((state) => state.sideMenu.isOpen);
  const theme = useSelector((state) => state.theme);

  const dispatch = useDispatch();

  // const [isExapnd, setIsExpand] = useState(true);

  // const handleHistoryExpand = () => {
  //   setIsExpand(!isExapnd);
  // };
  const menuItems = [
    { icon: <AutoAwesomeIcon />, text: 'New Chat' },
    {
      icon: <SportsVolleyballIcon />,
      text: 'Discover'
    },
    {
      icon: <HistoryEduIcon />,
      text: 'History',
      subItems: [
        { icon: <>|</>, text: 'I am working of somthing very sepcific to Databricks' },
        { icon: <>|</>, text: 'could you help me understand the logic of below expression' },
        { icon: <>|</>, text: 'could you help me understand the logic of below expression' },
        { icon: <>|</>, text: 'could you help me understand the logic of below expression' },
        { icon: <>|</>, text: 'could you help me understand the logic of below expression' }
      ],
    }
  ];

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open &&
          <a href="/" style={{ padding: '0 1rem' }}>
            <img
              alt="logo"
              src={logoWithText}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </a>}
        <IconButton onClick={() => dispatch(toggleSidebar(!open))}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item, index) => (
          <>
            <ListItem key={item.text} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={[
                  {
                    maxHeight: 30,
                    fontSize: '1.5rem',
                  },
                  open
                    ? {
                      justifyContent: 'initial',
                    }
                    : {
                      justifyContent: 'center',
                    },
                ]}
              >
                <ListItemIcon
                  sx={[
                    {
                      minWidth: 0,
                      justifyContent: 'center',
                    },
                    open
                      ? {
                        mr: 3,
                      }
                      : {
                        mr: 'auto',
                      },
                  ]}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  sx={[
                    open
                      ? {
                        opacity: 1,
                      }
                      : {
                        opacity: 0,
                      },
                  ]}
                />
                {/* {item?.subItems && open && (isExapnd ? <ExpandLess onClick={handleHistoryExpand} /> : <ExpandMore onClick={handleHistoryExpand} />)} */}
              </ListItemButton>
            </ListItem>
            {item?.subItems &&
              <Collapse in={open} timeout="auto" unmountOnExit className='history-list'>
                <List component="div" disablePadding dense>
                  {item?.subItems.map((item, index) => (
                    <ListItemButton sx={[
                      {
                        maxHeight: 30,
                        fontSize: '1.4rem',
                      }]}>
                      <ListItemText primary={item.text} title={item.text} sx={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        cursor: 'pointer'
                      }} />
                    </ListItemButton>))}
                </List>
              </Collapse>}
          </>
        ))}
      </List>
      <Container maxWidth="sm" sx={{borderRadius: "0.3rem", margin: "0 0.5rem"}}>
      <div className="profile-section">
          <img src={profile_picture} alt="Profile" className="profile-image" />
          {open && (
            <div className="profile-details">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">john@example.com</p>
            </div>
          )}
          

        </div>
        <FormControlLabel
            control={
              <Switch
                checked={theme.darkTheme}
                onChange={() => dispatch(toggleTheme())}
              />
            }
            label="Toggle Theme"
          />

      </Container>

    </Drawer>

    //   <Box className={`sidebar ${open ? 'sidebar-open' : 'sidebar-closed'}`}>
    //     {/* <div className="menu-item" onClick={toggleSidebar}>
    //       {open ? <CloseIcon /> : <MenuIcon />}
    //       {open && <span className="ml-4">Menu</span>}
    //     </div> */}
    //     <div>
    //     <img src="" alt="logo"/>

    //     <nav>
    //       {menuItems.map((item, index) => (
    //         <MenuItem key={index} item={item} open={open} />
    //       ))}
    //     </nav>
    //     </div>

        
    //   </Box>
  );
};

export default SideMenu;