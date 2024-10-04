// src/features/SideMenu/SideMenu.jsx
import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from './sideMenuSlice';
import { navigateTo } from '../Navigation/navigationSlice';
import { setCurrentConversation } from '../Conversation/conversationSlice';

import logoWithText from '../../assets/light_vaidya_logo_original.png';
import profile_picture from '../../assets/profile_picture.png';

import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AutoAwesome as AutoAwesomeIcon,
  SportsVolleyball as SportsVolleyballIcon,
  HistoryEdu as HistoryEduIcon,
} from '@mui/icons-material';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import {
  FormControlLabel,
  Switch,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  Collapse,
  Container,
} from '@mui/material';

import { styled, useTheme } from '@mui/material/styles';

import './sideMenu.css';
import { toggleTheme } from '../theme/themeSlice';

const drawerWidth = 240;
const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
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
  ({ theme, open }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    ...(open && {
      ...openedMixin(theme),
      '& .MuiDrawer-paper': openedMixin(theme),
    }),
    ...(!open && {
      ...closedMixin(theme),
      '& .MuiDrawer-paper': closedMixin(theme),
    }),
  })
);

const SideMenu = () => {
  const open = useSelector((state) => state.sideMenu.isOpen);
  const themeState = useSelector((state) => state.theme);
  const muiTheme = useTheme();
  const dispatch = useDispatch();

  const conversations = useSelector((state) =>
    state.conversation.conversations.filter((conv) => conv.messages.length > 0)
  );

  // Sort conversations by the timestamp of their most recent message
  const sortedConversations = useMemo(() => {
    return [...conversations].sort((a, b) => {
      const aMessages = a.messages;
      const bMessages = b.messages;
      const aTime =
        aMessages.length > 0
          ? aMessages[aMessages.length - 1].createdAt
          : a.createdAt || 0;
      const bTime =
        bMessages.length > 0
          ? bMessages[bMessages.length - 1].createdAt
          : b.createdAt || 0;
      return bTime - aTime;
    });
  }, [conversations]);

  const menuItems = [
    {
      icon: AutoAwesomeIcon,
      text: 'New Chat',
      onClick: () => {
        dispatch(setCurrentConversation(null));
        dispatch(navigateTo('Home'));
      },
    },
    {
      icon: SportsVolleyballIcon,
      text: 'Discover',
      onClick: () => dispatch(navigateTo('Discover')), // Navigate to Discover
    },
    {
      icon: HistoryEduIcon,
      text: 'History',
      onClick: () => {
        dispatch(navigateTo('History'));
      },
      subItems: sortedConversations.slice(0, 5).map((conversation) => ({
        icon: null,
        text: conversation.title,
        conversationId: conversation.id,
      })),
    },
  ];

  const [historyOpen, setHistoryOpen] = useState(true);

  const handleHistoryClick = (e) => {
    e.stopPropagation(); // Prevent the click from triggering navigation
    setHistoryOpen(!historyOpen);
  };

  return (
    <Drawer variant="permanent" open={open}>
      <DrawerHeader>
        {open && (
          <a href="/" style={{ padding: '0 1rem' }}>
            <img
              alt="logo"
              src={logoWithText}
              style={{ maxWidth: '100%', height: 'auto' }}
            />
          </a>
        )}
        <IconButton onClick={() => dispatch(toggleSidebar(!open))}>
          {muiTheme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      <List>
        {menuItems.map((item) => (
          <React.Fragment key={item.text}>
            <ListItem disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  maxHeight: 30,
                  fontSize: '1.5rem',
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
                onClick={item.onClick}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {item.icon && React.createElement(item.icon, { fontSize: 'medium' })}
                </ListItemIcon>
                <ListItemText primary={item.text} sx={{ opacity: open ? 1 : 0 }} />
                {item.subItems && open && (
                  <IconButton
                    size="small"
                    onClick={handleHistoryClick}
                    sx={{ ml: 'auto' }}
                  >
                    {historyOpen ? <ExpandLess /> : <ExpandMore />}
                  </IconButton>
                )}
              </ListItemButton>
            </ListItem>
            {item.subItems && (
              <Collapse
                in={historyOpen && open}
                timeout="auto"
                unmountOnExit
                className="history-list"
              >
                <List component="div" disablePadding dense>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.conversationId}
                      sx={{ pl: 4 }}
                      onClick={() => {
                        dispatch(setCurrentConversation(subItem.conversationId));
                        dispatch(navigateTo('Home'));
                      }}
                    >
                      <ListItemText
                        primary={subItem.text}
                        title={subItem.text}
                        sx={{
                          whiteSpace: 'nowrap',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          cursor: 'pointer',
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </React.Fragment>
        ))}
      </List>
      <Container
        maxWidth="sm"
        sx={{ borderRadius: '0.3rem', margin: '0 0.5rem' }}
      >
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
              checked={themeState.darkTheme}
              onChange={() => dispatch(toggleTheme())}
            />
          }
          label="Toggle Theme"
        />
      </Container>
    </Drawer>
  );
};

export default SideMenu;
