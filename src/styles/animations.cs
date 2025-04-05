@keyframes slideIn {
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@keyframes bubbleAppear {
  from {
    transform: scale(0.9);
    opacity: 0;
  }
  to {
    transform: scale(1);
    opacity: 1;
  }
}

.chat-container.visible {
  animation: slideIn 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}

.chat-bubble {
  animation: bubbleAppear 0.2s ease-out;
}




.thinking-animation {
  display: inline-block;
  animation: blink 1s infinite step-start;
}

@keyframes blink {
  50% {
    opacity: 0;
  }
}
