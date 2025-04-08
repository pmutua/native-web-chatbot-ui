# Native Chatbot Web Component

[![npm version](https://img.shields.io/npm/v/native-web-chatbot-ui)](https://www.npmjs.com/package/native-web-chatbot-ui)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A resizable, draggable, and customizable chatbot interface web component, supporting real-time streaming responses and framework-agnostic integration.

https://github.com/user-attachments/assets/73bb5b7f-0022-4768-93d5-75d05784711b

## Features (wip)

- 💬 **Chat Bubbles** with speaker indication
- ↔️ **Resizable & Draggable** container
- 🚀 **Real-time Streaming** responses
- 🎨 **Theme Customization** (light/dark)
- ♿ **Accessibility** compliant (ARIA roles, keyboard nav)
- 📱 **Responsive Design** for all screen sizes
- ⚙️ **Configurable** appearance and behavior
- 📦 **Framework Agnostic** (Works with React, Vue, Angular, etc.)

## Installation

```bash
npm install native-web-chatbot-ui
# or
yarn add native-web-chatbot-ui
```

## 🚀 Usage

### 📦 Basic Implementation

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ChatBot Demo</title>
  <style>
    body {
      min-height: 100vh;
      margin: 0;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
  </style>
</head>
<body>
  <h1>ChatBot UI Component Demo</h1>
  <script src="../dist/main.js"></script>
  <script src="./demo.js"></script>
</body>
</html>
```

### 🔌 Framework Integration Documentation

#### [✅Vue Integration](./docs/vue-integration.md)

- [Source code demo](./demo/my-vue-app/)

#### [✅React Integration](./docs/react-integration.md)

- [Source code demo](./demo/my-react-app/)

#### [✅Angular Integration](./docs/angular-integration.md)

- [Source code demo](./demo/my-angular-app/)

<!-- ### ⚙️ Configuration Options

| ⚙️ Configuration Options | Type     | Default       | Description                                      |
|--------------------------|----------|----------------|--------------------------------------------------|
| streamingData            | boolean  | true           | Enable/disable response streaming                |
| initialWidth             | number   | 300            | Initial width in pixels                          |
| resizable                | boolean  | true           | Enable container resizing                        |
| position                 | string   | bottom-right   | Position (bottom-right / bottom-left)            |
| theme                    | string   | light          | Color theme (light, dark, custom)                |
| bubbleStyle              | object   | {}             | Custom bubble styles                             |
| fontSize                 | string   | 1rem           | Base font size                                   |
| apiKey                   | string   | ''             | OpenAI API key                                   |
| delayTime                | number   | 50             | Streaming delay between characters (ms)          |

### 🎨 Customization

#### Theming Example

```css
chat-bot {
  --primary-color: #4CAF50;
  --background-color: #f5f5f5;
  --user-bubble-bg: #4CAF50;
  --bot-bubble-bg: #ffffff;
}

```

### 🧠 Component Methods

```javascript
// Toggle chat visibility
chatbot.toggleChat();

// Send programmatic message
chatbot.sendMessage("Hello bot!");

// Reset conversation
chatbot.clearHistory();

```

### 📡 Events

Handle component interactions:

```javascript
chatbot.addEventListener('message-sent', (e) => {
  console.log('User sent:', e.detail.message);
});

chatbot.addEventListener('message-received', (e) => {
  console.log('Bot responded:', e.detail.response);
});


```

### 🛠️ Development Setup

Clone repository

```bash



```

### 🌐 Browser Support

Modern evergreen browsers (Chrome, Firefox, Safari, Edge) with ES2015+ support -->

<!-- #### ✅ Features

Clear installation and usage instructions

Framework integration examples (React, Vue)

Comprehensive configuration options

Theming and customization guidelines

Component API and events

Full development and build setup

Responsive design ready

Compatible with modern browsers -->

<!-- 📸 Add a screenshot or GIF demo here for better UX! -->

<!-- 📌 Notes
Feel free to contribute, submit issues, or fork the project to make it your own. -->
