// src/features/Conversation/conversationSlice.js
import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';

const initialState = {
  conversations: [],
  currentConversationId: null,
};

export const conversationSlice = createSlice({
  name: 'conversation',
  initialState,
  reducers: {
    addConversation: (state, action) => {
      const newConversation = {
        id: action.payload.id || uuidv4(),
        title: action.payload.title || 'New Conversation',
        messages: [],
        createdAt: action.payload.createdAt || Date.now(),
      };
      // Only add to conversations if not already present
      if (!state.conversations.find((c) => c.id === newConversation.id)) {
        state.conversations.unshift(newConversation); // Add to the beginning
      }
      state.currentConversationId = newConversation.id;
    },
    addMessageToConversation: (state, action) => {
      const { conversationId, message } = action.payload;
      const conversation = state.conversations.find((c) => c.id === conversationId);
      if (conversation) {
        conversation.messages.push(message);
      }
    },
    setCurrentConversation: (state, action) => {
      state.currentConversationId = action.payload;
    },
    updateConversationTitle: (state, action) => {
      const { conversationId, title } = action.payload;
      const conversation = state.conversations.find((c) => c.id === conversationId);
      if (conversation) {
        conversation.title = title;
      }
    },
  },
});

export const {
  addConversation,
  addMessageToConversation,
  setCurrentConversation,
  updateConversationTitle,
} = conversationSlice.actions;

export default conversationSlice.reducer;
