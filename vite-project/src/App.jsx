import './App.css'
// import React, { useState } from 'react';

// function App() {
//  return <h1>Hi I am App</h1> 
// }
// export default App

import React, { useState } from 'react';
import {
  Menu as MenuIcon,
  Close as CloseIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
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
import './sidebar.css';

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
              <ExpandMoreIcon
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
        <div className="flex items-center mb-4">
          <img
            src="/api/placeholder/40/40"
            alt="Profile"
            className="profile-image"
          />
          {isOpen && (
            <div className="ml-3">
              <p className="font-semibold">John Doe</p>
              <p className="text-sm">john@example.com</p>
            </div>
          )}
        </div>
        <div className="menu-item">
          <LogoutIcon fontSize="large" />
          {isOpen && <span className="ml-3">Logout</span>}
        </div>
      </div>
      <button
        className={`absolute top-1/2 -right-3 p-1 rounded-full ${isOpen ? 'rotate-180' : ''}`}
        onClick={toggleSidebar}
      >
        <ArrowForwardIcon fontSize="small" />
      </button>
    </div>
  );
};

const WelcomeMessage = () => (
  <div className="text-center mb-8">
    <h1 className="text-3xl font-bold mb-4">Welcome to Our Platform</h1>
    <p className="text-xl">How can we assist you today?</p>
  </div>
);

const Card = ({ title, description, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-md">
    <Icon className="w-12 h-12 mb-4 text-blue-500" />
    <h2 className="text-xl font-semibold mb-2">{title}</h2>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ChatMessage = ({ message, isUser }) => (
  <div className={`chat-message ${isUser ? 'chat-message-user' : 'chat-message-bot'}`}>
    {message}
  </div>
);

const ChatInterface = ({ onSendMessage }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center bg-gray-100 rounded-lg">
        <button
          type="button"
          onClick={() => console.log('Add attachment')}
        >
          <AddIcon />
        </button>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button
          type="submit"
          disabled={!message.trim()}
        >
          <SendIcon />
        </button>
      </div>
    </form>
  );
};

const MainContent = () => {
  const [messages, setMessages] = useState([]);
  const [showInitialContent, setShowInitialContent] = useState(true);

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, isUser: true }]);
    setShowInitialContent(false);

    setTimeout(() => {
      setMessages((prevMessages) => [...prevMessages, { text: "Thank you for your message. How else can I assist you?", isUser: false }]);
    }, 1000);
  };

  return (
    <div className="flex flex-col h-screen">
      <main className="flex-grow overflow-y-auto p-4">
        {showInitialContent ? (
          <>
            <WelcomeMessage />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card title="Get Started" description="Learn how to use our platform" icon={HomeIcon} />
              <Card title="Your Profile" description="Manage your account settings" icon={PersonIcon} />
              <Card title="Our Services" description="Explore what we offer" icon={ShoppingCartIcon} />
              <Card title="Help Center" description="Find answers to common questions" icon={HelpIcon} />
            </div>
          </>
        ) : (
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isUser={msg.isUser} />
            ))}
          </div>
        )}
      </main>
      <div className="p-4 border-t border-gray-200">
        <ChatInterface onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

const Layout = () => {
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen">
      <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
      <div className={`flex-1 transition-all duration-300 ${isOpen ? 'ml-64' : 'ml-20'}`}>
        <MainContent />
      </div>
    </div>
  );
};

export default Layout;

