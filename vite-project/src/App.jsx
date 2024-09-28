import React, { useState } from 'react';
import './sidebar.css';
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
} from '@mui/icons-material';

const MenuItem = ({ item, isOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    if (item.subItems) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
  };

  return (
    <div>
      <div className="menu-item" onClick={toggleSubMenu}>
        <item.icon fontSize="large" />
        {isOpen && (
          <>
            <span className="ml-4 flex-grow">{item.text}</span>
            {item.subItems && (
              <ArrowForwardIcon
                fontSize="small"
                className={`transform ${isSubMenuOpen ? 'rotate-180' : ''}`}
              />
            )}
          </>
        )}
      </div>
      {isOpen && isSubMenuOpen && item.subItems && (
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

const Sidebar = ({ isOpen, toggleSidebar }) => {
  const menuItems = [
    { icon: HomeIcon, text: 'Home' },
    {
      icon: PersonIcon,
      text: 'Profile',
      subItems: [
        { icon: DescriptionIcon, text: 'My Resume' },
        { icon: EmailIcon, text: 'Messages' },
      ],
    },
    {
      icon: ShoppingCartIcon,
      text: 'Shop',
      subItems: [
        { icon: ShoppingCartIcon, text: 'My Orders' },
        { icon: DescriptionIcon, text: 'Wishlist' },
      ],
    },
    { icon: SettingsIcon, text: 'Settings' },
    { icon: HelpIcon, text: 'Help' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="menu-item" onClick={toggleSidebar}>
        {isOpen ? <CloseIcon /> : <MenuIcon />}
        {isOpen && <span className="ml-4">Menu</span>}
      </div>

      <nav>
        {menuItems.map((item, index) => (
          <MenuItem key={index} item={item} isOpen={isOpen} />
        ))}
      </nav>

      <div className="profile-section">
        <img src="/api/placeholder/40/40" alt="Profile" className="profile-image" />
        {isOpen && (
          <div className="profile-details">
            <p className="font-semibold">John Doe</p>
            <p className="text-sm">john@example.com</p>
          </div>
        )}
      </div>

      <button
        className={`sidebar-toggle-btn ${!isOpen ? 'collapsed' : ''}`}
        onClick={toggleSidebar}
      >
        <ArrowForwardIcon />
      </button>
    </div>
  );
};

const MainContent = () => {
  const [messages, setMessages] = useState([]);
  const [showInitialContent, setShowInitialContent] = useState(true);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isUser: true }]);
    setShowInitialContent(false);

    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Thank you for your message. How else can I assist you?', isUser: false },
      ]);
    }, 1000);
  };

  return (
    <div className="main-content">
      <div className="main-section">
        {showInitialContent ? (
          <div className="cards-wrapper">
            <div className="card-container">
              <img src="path_to_image_1.jpg" alt="Image 1" className="card-icon"/>
              <h3>I'm working on controlling my cholesterol. Is this something I should eat today?</h3>
            </div>
            <div className="card-container">
              <img src="path_to_image_2.jpg" alt="Image 2" className="card-icon"/>
              <h3>Translate this card's title and content into Tamil</h3>
            </div>
            <div className="card-container">
              <img src="path_to_image_3.jpg" alt="Image 3" className="card-icon"/>
              <h3>Translate this card's title and content into Hindi</h3>
            </div>
            <div className="card-container">
              <img src="path_to_image_4.jpg" alt="Image 4" className="card-icon"/>
              <h3>Translate this card's title and content into Telugu</h3>
            </div>
          </div>
        ) : (
          <div className="chat-container">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`chat-message ${message.isUser ? 'chat-message-user' : 'chat-message-bot'}`}
              >
                {message.text}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="send-message-section">
        <SendMessageForm onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

const SendMessageForm = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form className="send-message-form" onSubmit={handleSubmit}>
      <AddIcon />
      <input
        className="send-message-input"
        type="text"
        placeholder="Type a message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">
        <SendIcon />
      </button>
    </form>
  );
};

const Layout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="layout">
      <Sidebar isOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
      <MainContent />
    </div>
  );
};

export default Layout;