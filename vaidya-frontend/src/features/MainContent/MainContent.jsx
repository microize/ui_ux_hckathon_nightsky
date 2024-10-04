// src/features/MainContent/MainContent.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Typography,
  Grid,
  TextField,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  InputAdornment,
} from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import MicIcon from '@mui/icons-material/Mic';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { v4 as uuidv4 } from 'uuid';

import {
  addConversation,
  addMessageToConversation,
  updateConversationTitle,
  setCurrentConversation,
} from '../Conversation/conversationSlice';
import { navigateTo } from '../Navigation/navigationSlice';

import './MainContent.css';
import profile_picture from '../../assets/profile_picture.png';
import vaidya_logo from '../../assets/vaidya_logo.png';


const quickStartConversations = [
  {
    id: 1,
    title: 'Explain Quantum Computing',
    description: 'Get a simple explanation of quantum computing.',
  },
  {
    id: 2,
    title: 'Help with Coding',
    description: 'Ask for assistance with coding problems.',
  },
  {
    id: 3,
    title: 'Learn about AI',
    description: 'Understand the basics of artificial intelligence.',
  },
  {
    id: 4,
    title: 'Daily News Summary',
    description: 'Get a summary of today’s top news stories.',
  },
];

const blogPosts = [
  {
    id: 1,
    title: 'Understanding React Hooks',
    excerpt: 'An introduction to React Hooks and how to use them.',
  },
  {
    id: 2,
    title: 'JavaScript ES6 Features',
    excerpt: 'Explore the new features introduced in ES6.',
  },
  {
    id: 3,
    title: 'Web Development Trends 2023',
    excerpt: 'Stay ahead with the latest trends in web development.',
  },
];

const MainContent = () => {
  const dispatch = useDispatch();
  const currentPage = useSelector((state) => state.navigation.currentPage);
  const currentConversationId = useSelector(
    (state) => state.conversation.currentConversationId
  );
  const conversations = useSelector((state) => state.conversation.conversations);
  const currentConversation = conversations.find(
    (c) => c.id === currentConversationId
  );

  const messages = currentConversation ? currentConversation.messages : [];

  const [inputValue, setInputValue] = useState('');
  const [cardsVisible, setCardsVisible] = useState(true);
  const chatEndRef = useRef(null);

  // State for speech recognition
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef(null);

  // State for selected image
  const [selectedImage, setSelectedImage] = useState(null);

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  useEffect(() => {
    setCardsVisible(!currentConversation || currentConversation.messages.length === 0);
  }, [currentConversation]);

  useEffect(() => {
    // Initialize Speech Recognition API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInputValue((prev) => prev + ' ' + transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      console.warn('Speech Recognition API not supported in this browser.');
    }
  }, []);

  const handleCardClick = (topic) => {
    let conversationId = currentConversationId;
    if (!conversationId) {
      conversationId = uuidv4();
      dispatch(
        addConversation({
          id: conversationId,
          title: topic.title,
          createdAt: Date.now(),
        })
      );
      dispatch(setCurrentConversation(conversationId));
    }

    const userMessage = {
      id: uuidv4(),
      sender: 'user',
      text: topic.title,
      type: 'text',
      createdAt: Date.now(),
    };
    dispatch(
      addMessageToConversation({
        conversationId,
        message: userMessage,
      })
    );

    generateBotResponse(topic.title, conversationId);
    setCardsVisible(false);
  };

  const handleSendMessage = () => {
    if (inputValue.trim() !== '' || selectedImage) {
      let conversationId = currentConversationId;
      if (!conversationId) {
        // Create a new conversation
        conversationId = uuidv4();
        dispatch(
          addConversation({
            id: conversationId,
            title: inputValue || 'Image Message',
            createdAt: Date.now(),
          })
        );
        dispatch(setCurrentConversation(conversationId));
      }

      const userMessage = {
        id: uuidv4(),
        sender: 'user',
        text: inputValue.trim() !== '' ? inputValue : null,
        image: selectedImage,
        type: 'text_image', // Indicates that this message may contain both text and image
        createdAt: Date.now(),
      };
      dispatch(
        addMessageToConversation({
          conversationId,
          message: userMessage,
        })
      );

      generateBotResponse(inputValue || 'Image sent', conversationId);
      setInputValue('');
      setSelectedImage(null);

      // If this is the first user message, update the conversation title
      const conversation = conversations.find((c) => c.id === conversationId);
      if (conversation && conversation.messages.length === 1) {
        dispatch(
          updateConversationTitle({
            conversationId,
            title: inputValue || 'Image Message',
          })
        );
      }
    }
  };

  const generateBotResponse = (userText, conversationId) => {
    // Placeholder for bot's response logic
    const botResponseText = `Bot response to "${userText}" goes here.`;
    const botMessage = {
      id: uuidv4(),
      sender: 'bot',
      text: botResponseText,
      type: 'text',
      createdAt: Date.now(),
    };
    dispatch(
      addMessageToConversation({
        conversationId: conversationId,
        message: botMessage,
      })
    );
  };

  const handleAddImage = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Limit image types if necessary
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedImage({
          data: reader.result,
          fileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedImage(null);
  };

  const handleMic = () => {
    if (recognitionRef.current) {
      if (isListening) {
        recognitionRef.current.stop();
        setIsListening(false);
      } else {
        recognitionRef.current.start();
        setIsListening(true);
      }
    } else {
      alert('Speech Recognition API not supported in this browser.');
    }
  };

  if (currentPage === 'Discover') {
    // Display the list of blogs
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Discover Blogs
        </Typography>
        <List>
          {blogPosts.map((post) => (
            <ListItem key={post.id} sx={{ mb: 2 }}>
              <Box>
                <Typography variant="h6">{post.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {post.excerpt}
                </Typography>
              </Box>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  if (currentPage === 'History') {
    // Sort conversations based on createdAt timestamp
    const sortedConversations = [...conversations].sort((a, b) => {
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

    // Display all conversations
    return (
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Conversation History
        </Typography>
        <List>
          {sortedConversations.map((conv) => (
            <ListItem key={conv.id} disablePadding>
              <ListItemButton
                onClick={() => {
                  dispatch(setCurrentConversation(conv.id));
                  dispatch(navigateTo('Home'));
                }}
              >
                <ListItemText
                  primary={conv.title}
                  secondary={`Messages: ${conv.messages.length}`}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    );
  }

  // Default page (Home / Chat)
  return (
    <Box
      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', height: '100%' }}
    >
      {/* Conditionally render the welcome message and cards */}
      {cardsVisible && (
        <>
          {/* Welcome Message */}
          <Typography variant="h4" align="center" sx={{ mt: 2 }}>
            Hello everyone
          </Typography>

          {/* Cards at the top */}
          <Grid container spacing={2} sx={{ p: 2 }}>
            {quickStartConversations.map((item) => (
              <Grid item xs={12} sm={6} md={3} key={item.id}>
                <Card>
                  <CardActionArea onClick={() => handleCardClick(item)}>
                    <CardContent>
                      <Typography variant="h6" component="div">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.description}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Divider />
        </>
      )}

      {/* Chat messages */}
      <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
        {messages.map((message) => (
          <Box
            key={message.id}
            sx={{           
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 1,
            }}
          >
            <Box
              sx={{
                maxWidth: '75%',
                bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.300',
                color:
                  message.sender === 'user' ? 'primary.contrastText' : 'text.primary',
                p: 1,
                borderRadius: 1,
              }}
            >
              {message.text && (
                <Typography variant="body1">{message.text}</Typography>
              )}
              {message.image && (
                <img
                  src={message.image.data}
                  alt={message.image.fileName || 'Uploaded image'}
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: '8px',
                    marginTop: '0.5rem',
                  }}
                />
              )}
            </Box>
          </Box>
        ))}
        <div ref={chatEndRef} />
      </Box>

      {/* Text input at the bottom */}
      <Box sx={{ display: 'flex', alignItems: 'center', p: 2 }}>
        {/* Left side '+' icon */}
        <IconButton color="primary" component="label">
          <AddIcon />
          <input type="file" accept="image/*" hidden onChange={handleAddImage} />
        </IconButton>

        {/* Text Field */}
        <TextField
          variant="outlined"
          placeholder="Type your message..."
          fullWidth
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') handleSendMessage();
          }}
          sx={{ mx: 1 }}
          InputProps={{
            startAdornment: selectedImage && (
              <InputAdornment position="start">
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <img
                    src={selectedImage.data}
                    alt={selectedImage.fileName || 'Selected image'}
                    style={{ width: 20, height: 20 }}
                  />
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: -10,
                      right: -10,
                      backgroundColor: 'rgba(255,255,255,0.8)',
                    }}
                    onClick={handleRemoveImage}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </Box>
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  color={isListening ? 'secondary' : 'primary'}
                  onClick={handleMic}
                >
                  <MicIcon />
                </IconButton>
                <IconButton color="primary" onClick={handleSendMessage}>
                  <SendIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Box>
    </Box>
  );
};

export default MainContent;
