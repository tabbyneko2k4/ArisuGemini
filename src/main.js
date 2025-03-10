// src/main.js
import { sendMessage, updateEmote, displayUserMessage } from './chat.js';

document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const micBtn = document.getElementById('mic-btn');
    const chatBox = document.getElementById('chat-box');
    const toggleModeBtn = document.getElementById('toggle-mode');
    const chatInputArea = document.querySelector('.chat-input-area');

    // Dark mode toggle
    toggleModeBtn.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        document.body.classList.toggle('light-mode');
    });

    // Gửi tin nhắn khi click nút gửi
    sendBtn.addEventListener('click', () => {
        const message = userInput.value.trim();
        if (message) {
            displayUserMessage(message);
            sendMessage(message);
            userInput.value = '';
            userInput.focus();
        }
    });

    // Gửi tin nhắn khi nhấn Enter, xuống dòng khi nhấn Ctrl+Enter
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && !event.ctrlKey) {
            event.preventDefault();
            const message = userInput.value.trim();
            if (message) {
                displayUserMessage(message);
                sendMessage(message);
                userInput.value = '';
                userInput.focus();
            }
        } else if (event.key === 'Enter' && event.ctrlKey) {
            userInput.value += '\n';
        }
    });

    // Speech-to-text
    let recognition;
    let isRecording = false;

    if ('webkitSpeechRecognition' in window) {
        recognition = new webkitSpeechRecognition();
        recognition.continuous = false;
        recognition.interimResults = true;
        recognition.lang = 'vi-VN';

        recognition.onstart = () => {
            isRecording = true;
            chatInputArea.classList.add('recording');
            userInput.placeholder = 'Đang nghe...';
            userInput.readOnly = true; // Vô hiệu hóa chỉnh sửa trực tiếp
        };

        recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            isRecording = false;
            chatInputArea.classList.remove('recording');
            userInput.placeholder = 'Type something...';
            userInput.readOnly = false; // Cho phép chỉnh sửa lại
            if (event.error === 'no-speech') {
                alert('Không nhận diện được giọng nói. Vui lòng thử lại.');
            } else if (event.error === 'audio-capture') {
                alert('Không thể truy cập microphone. Vui lòng kiểm tra quyền truy cập.');
            } else if (event.error === 'not-allowed') {
                alert('Bạn chưa cho phép truy cập microphone. Vui lòng cấp quyền truy cập trong cài đặt trình duyệt.');
            }
        };

        recognition.onresult = (event) => {
            let finalTranscript = '';
            for (let i = event.resultIndex; i < event.results.length; ++i) {
                if (event.results[i].isFinal) {
                    finalTranscript += event.results[i][0].transcript;
                }
            }
            userInput.value = finalTranscript;

        };

        recognition.onend = () => {
            isRecording = false;
            chatInputArea.classList.remove('recording');
            userInput.placeholder = 'Type something...';
            userInput.readOnly = false; // Cho phép chỉnh sửa lại
            if (userInput.value.trim()) {
                displayUserMessage(userInput.value.trim());
                sendMessage(userInput.value.trim());
                userInput.value = '';
            }
        };

        micBtn.addEventListener('click', () => {
            if (isRecording) {
                recognition.stop();
            } else {
                recognition.start();
            }
        });
    } else {
        micBtn.disabled = true;
        userInput.placeholder = 'Speech recognition không được hỗ trợ trên trình duyệt này.';
    }

    // Cuộn xuống cuối chatbox khi có tin nhắn mới
    const scrollChatBox = () => {
        chatBox.scrollTop = chatBox.scrollHeight;
    };

    const observer = new MutationObserver(scrollChatBox);
    observer.observe(chatBox, { childList: true, subtree: true });

    updateEmote('stand'); // Khởi tạo emote mặc định
});