import { applyConfig, defaultConfig } from '../utils/config-manager.js';
import { streamResponse } from '../utils/stream-manager.js';

const template = document.createElement('template');
template.innerHTML = `
  <style>
    @import './styles/base.css';
    @import './styles/animations.css';

    .chat-wrapper {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .chat-container {
      width: 320px;
      max-height: 500px;
      display: none;
      flex-direction: column;
      background: #fff;
      border-radius: 10px;
      box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
      overflow: hidden;
      resize: both;
      position: absolute;
      bottom: 0;
      right: 0;
    }

    .chat-container.visible {
      display: flex;
    }

    .chat-header {
      background-color: #1e1e2f;
      color: white;
      padding: 12px 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      align-items: center;
      cursor: move;
    }

    .chat-messages {
      padding: 12px;
      flex: 1;
      overflow-y: auto;
      background-color: #f9f9f9;
    }

    .chat-input-container {
      display: flex;
      padding: 10px;
      background-color: #fff;
      border-top: 1px solid #ddd;
    }

    .message-input {
      flex: 1;
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
      resize: none;
    }

    .send-button {
      background: #1e1e2f;
      color: white;
      border: none;
      padding: 0 16px;
      margin-left: 8px;
      border-radius: 5px;
      cursor: pointer;
    }

    .chat-trigger {
      background-color: #1e1e2f;
      color: white;
      border: none;
      border-radius: 50%;
      width: 56px;
      height: 56px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    }

    .resize-handle {
      width: 12px;
      height: 12px;
      background: transparent;
      position: absolute;
      bottom: 2px;
      right: 2px;
      cursor: nwse-resize;
    }

    @media screen and (max-width: 600px) {
      .chat-container {
        width: 100vw;
        height: 80vh;
        bottom: 0;
        right: 0;
        border-radius: 0;
      }


    /* Spinner Animation */
    .spinner {
      display: none;
      margin-left: 10px;
      border: 3px solid #f3f3f3;
      border-top: 3px solid #3498db;
      border-radius: 50%;
      width: 20px;
      height: 20px;
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }

    @media screen and (max-width: 600px) {
      .chat-container {
        width: 100vw;
        height: 80vh;
        bottom: 0;
        right: 0;
        border-radius: 0;
      }

      .chat-wrapper {
        bottom: 0;
        right: 0;
      }
    }
  </style>

  <div class="chat-wrapper">
    <div class="chat-container" part="container">
      <div class="chat-header" part="header">
        <slot name="header">Chat Assistant</slot>
        <button class="close-button" aria-label="Close chat">×</button>
      </div>
      <div class="chat-messages" part="messages" role="log"></div>
      <div class="chat-input-container" part="input">
        <textarea class="message-input" placeholder="Type your message..." aria-label="Chat input" rows="1"></textarea>
        <button class="send-button" aria-label="Send message">
          <slot name="send-icon">➤</slot>
        <div class="spinner" id="spinner"></div> <!-- Spinner added here -->
        </button>
      </div>
      <div class="resize-handle"></div>
    </div>
    <button class="chat-trigger" part="trigger" aria-label="Open chat">
      <slot name="trigger-icon">💬</slot>
    </button>
  </div>
`;

class ChatBot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.messages = [];
    this.config = { ...defaultConfig };
    this.isDragging = false;
  }

  static get observedAttributes() {
    return Object.keys(defaultConfig);
  }

  connectedCallback() {
    applyConfig(this);
    this.initResizable();
    this.initDraggable();
    this.setupEventListeners();
  }

  initResizable() {
    const container = this.shadowRoot.querySelector('.chat-container');
    const resizeHandle = this.shadowRoot.querySelector('.resize-handle');

    let isResizing = false;
    resizeHandle.addEventListener('mousedown', (e) => {
      e.preventDefault();
      isResizing = true;
      const startWidth = container.offsetWidth;
      const startHeight = container.offsetHeight;
      const startX = e.clientX;
      const startY = e.clientY;

      const doResize = (e) => {
        if (!isResizing) return;
        const newWidth = startWidth + (e.clientX - startX);
        const newHeight = startHeight + (e.clientY - startY);
        container.style.width = `${Math.max(newWidth, 250)}px`;
        container.style.height = `${Math.max(newHeight, 300)}px`;
      };

      const stopResize = () => {
        isResizing = false;
        window.removeEventListener('mousemove', doResize);
        window.removeEventListener('mouseup', stopResize);
      };

      window.addEventListener('mousemove', doResize);
      window.addEventListener('mouseup', stopResize);
    });
  }

  initDraggable() {
    const container = this.shadowRoot.querySelector('.chat-container');
    const header = this.shadowRoot.querySelector('.chat-header');

    let offsetX = 0, offsetY = 0, isDragging = false;

    header.addEventListener('mousedown', (e) => {
      isDragging = true;
      const rect = container.getBoundingClientRect();
      offsetX = e.clientX - rect.left;
      offsetY = e.clientY - rect.top;

      const move = (e) => {
        if (!isDragging) return;
        container.style.left = `${e.clientX - offsetX}px`;
        container.style.top = `${e.clientY - offsetY}px`;
        container.style.bottom = 'auto';
        container.style.right = 'auto';
        container.style.position = 'fixed';
      };

      const stop = () => {
        isDragging = false;
        window.removeEventListener('mousemove', move);
        window.removeEventListener('mouseup', stop);
      };

      window.addEventListener('mousemove', move);
      window.addEventListener('mouseup', stop);
    });
  }

  setupEventListeners() {
    const trigger = this.shadowRoot.querySelector('.chat-trigger');
    const container = this.shadowRoot.querySelector('.chat-container');
    const input = this.shadowRoot.querySelector('.message-input');
    const sendButton = this.shadowRoot.querySelector('.send-button');
    const closeButton = this.shadowRoot.querySelector('.close-button');

    trigger.addEventListener('click', () => {
      container.classList.toggle('visible');
      if (container.classList.contains('visible')) {
        input.focus();
      }
    });

    closeButton.addEventListener('click', () => {
      container.classList.remove('visible');
    });

    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.handleUserMessage();
      }
    });

    sendButton.addEventListener('click', () => this.handleUserMessage());
  }

//   async handleUserMessage() {
//     const input = this.shadowRoot.querySelector('.message-input');
//     const message = input.value.trim();
//     if (!message) return;

//     this.addMessage(message, 'user');
//     input.value = '';

//     const response = await this.getBotResponse(message);
//     this.addMessage(response, 'bot');
//   }
async handleUserMessage() {
    const input = this.shadowRoot.querySelector('.message-input');
    const message = input.value.trim();
    const spinner = this.shadowRoot.querySelector('.spinner'); // Get spinner element
    if (!message) return;
  
    this.addMessage(message, 'user');
    input.value = '';
  
    // Show the spinner while the bot is "thinking"
    spinner.style.display = 'inline-block'; // Show the spinner
  
    const response = await this.getBotResponse(message);
  
    // Hide the spinner once the response is ready
    spinner.style.display = 'none'; // Hide the spinner
  
    this.addMessage(response, 'bot');
  }
  

//   addMessage(content, sender) {
//     const messagesContainer = this.shadowRoot.querySelector('.chat-messages');
//     const bubble = document.createElement('chat-bubble');

//     bubble.setAttribute('sender', sender);
//     bubble.setAttribute('stream', this.config.streamingData.toString());
//     bubble.setAttribute('delay', this.config.delayTime);

//     if (this.config.streamingData) {
//       streamResponse(bubble, content, this.config.delayTime);
//     } else {
//       bubble.textContent = content;
//     }

//     messagesContainer.appendChild(bubble);
//     messagesContainer.scrollTop = messagesContainer.scrollHeight;
//   }

  addMessage(content, sender) {
    const messagesContainer = this.shadowRoot.querySelector('.chat-messages');
    const bubble = document.createElement('chat-bubble');

    bubble.setAttribute('sender', sender);
    bubble.setAttribute('stream', this.config.streamingData.toString());
    bubble.setAttribute('delay', this.config.delayTime);

    if (this.config.streamingData) {
      // Start streaming and display thinking animation
      streamResponse(bubble, content, this.config.delayTime);
    } else {
      bubble.textContent = content;
    }

    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}


  async getBotResponse(message) {
    try {
      const response = await fetch(this.config.apiEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.config.apiKey}`
        },
        body: JSON.stringify({ message })
      });

      const result = await response.json();
      return result.reply || '...';
    } catch (err) {
      console.error('Error:', err);
      return 'Oops, something went wrong.';
    }
  }
}

customElements.define('chat-bot', ChatBot);
export { ChatBot };
