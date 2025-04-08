const template = document.createElement('template');
template.innerHTML = `
  <style>
    .bubble {
      max-width: 80%;
      padding: 12px 16px;
      margin: 8px;
      border-radius: 16px;
      position: relative;
      transition: opacity 0.3s ease;
    }
    
    .user {
      background: var(--user-bubble-bg, #007bff);
      color: var(--user-bubble-text, white);
      margin-left: auto;
    }
    
    .bot {
      background: var(--bot-bubble-bg, #f1f1f1);
      color: var(--bot-bubble-text, #333);
      margin-right: auto;
    }
    
    .bubble::after {
      content: '';
      position: absolute;
      width: 0;
      height: 0;
      border: 8px solid transparent;
    }
    
    .user::after {
      right: -8px;
      border-left-color: var(--user-bubble-bg, #007bff);
    }
    
    .bot::after {
      left: -8px;
      border-right-color: var(--bot-bubble-bg, #f1f1f1);
    }
  </style>
  <div class="bubble" role="log" aria-live="polite"></div>
`;

class ChatBubble extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['sender', 'stream', 'delay'];
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === 'sender') {
      this.shadowRoot.querySelector('.bubble').classList.add(newVal);
    }
  }
}

customElements.define('chat-bubble', ChatBubble);