// src/chat.js
import { callGeminiAPI } from './api.js';

const chatBox = document.getElementById('chat-box');

// Function to show typing indicator
function showTypingIndicator() {
    const typingIndicator = document.createElement('div');
    typingIndicator.classList.add('typing-indicator');
    typingIndicator.innerHTML = '<span></span><span></span><span></span>';
    chatBox.appendChild(typingIndicator);
    chatBox.scrollTop = chatBox.scrollHeight;
}

// Function to hide typing indicator
function hideTypingIndicator() {
    const typingIndicator = chatBox.querySelector('.typing-indicator');
    if (typingIndicator) {
        chatBox.removeChild(typingIndicator);
    }
}

export function displayUserMessage(message) {
    const userMessageDiv = document.createElement('div');
    userMessageDiv.classList.add('message', 'user-message');
    userMessageDiv.textContent = message;
    chatBox.appendChild(userMessageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

export async function sendMessage(message) {
    showTypingIndicator();
    const response = await callGeminiAPI(message);
    hideTypingIndicator();
    if (response && response.text) {
        displayMessages(response.text);
    } else {
        console.error("Invalid response format:", response);
        displayMessages([{ message: "Lỗi: Phản hồi không hợp lệ.", emote: "cry" }]);
    }
}

export function updateEmote(emote) {
    const emoteImg = document.getElementById('emote');
    emoteImg.src = `/images/${emote}.gif`;
}

async function displayMessages(messages) {
    for (const message of messages) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.textContent = message.message;
        chatBox.appendChild(messageDiv);
        updateEmote(message.emote); // Cập nhật emote ở đây
        await new Promise(resolve => setTimeout(resolve, 500));
        chatBox.scrollTop = chatBox.scrollHeight;
    }
}