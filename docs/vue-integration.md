# Native Web Chatbot UI Integration for Vue.js

## Installation

Ensure the necessary dependencies are installed in your Vue.js project. If the chatbot is not already available as a Vue.js component, you'll need to integrate it manually via dynamic imports.

```bash
npm install native-web-chatbot-ui
```

## Creating a Chatbot Component

Create a dedicated Vue component for the chatbot. This will be responsible for dynamically loading the chatbot script and configuring it.

### Example Chatbot.vue

```vue
<template>
    <div ref="chatbotContainer"></div>
</template>

<script>
export default {
    name: 'Chatbot',
    mounted() {
        // Dynamically load the chatbot script once the component is mounted
        this.loadChatbot();
    },
    methods: {
        loadChatbot() {
            // Dynamically import the chatbot script
            import('native-web-chatbot-ui/dist/main.js')
                .then(() => {
                    // Create the chatbot element after the script has been loaded
                    const chatbotElement = document.createElement('chat-bot');
                    this.$refs.chatbotContainer.appendChild(chatbotElement);

                    // Configure chatbot settings
                    chatbotElement.config = {
                        apiKey: 'sk-your-openai-key-here',  // Replace with your actual API key
                        theme: 'dark',
                        css: '@equity/.css',  // Your CSS path if needed
                        initialWidth: 400,
                        position: 'bottom-right',
                        bubbleStyle: {
                            userBackground: '#4CAF50',
                            botBackground: '#F5F5F5',
                            borderRadius: '20px',
                        },
                        streamingData: true,
                        delayTime: 50,
                    };

                    // Define custom behavior for the bot's response
                    chatbotElement.getBotResponse = async (message) => {
                        const longStarWarsResponse = `A long time ago in a galaxy far, far away... The Force will be with you. Always.`;
                        return new Promise((resolve) => {
                            setTimeout(() => {
                                resolve(longStarWarsResponse);
                            }, 1000);
                        });
                    };
                })
                .catch((error) => {
                    console.error('Error loading the chatbot script:', error);
                });
        },
    },
};
</script>

<style scoped>
/* You can add custom styles for the chatbot container here */
</style>
```

## Dynamic Import Support

Vue supports dynamic imports, so you can lazily load the chatbot script only when the component is mounted. This helps with performance, ensuring that the chatbot script isn't loaded upfront if not needed.

## Updating Main Application (App.vue)

After creating the Chatbot.vue component, ensure it's correctly rendered within the Vue application. Import and use it in your main app file, App.vue.

### Example App.vue

```vue
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
import Chatbot from './components/Chatbot.vue';
</script>

<template>
  <header>
    <img alt="Vue logo" class="logo" src="./assets/logo.svg" width="125" height="125" />

    <div class="wrapper">
      <HelloWorld msg="You did it!" />
    </div>
  </header>

  <main>
    <TheWelcome />
    <!-- Add the Chatbot component here to render it -->
    <Chatbot />
  </main>
</template>

<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>

```

## Configuration

### API Key and Settings

Configure the chatbot by passing parameters such as apiKey, theme, and other settings based on your requirements (e.g., setting the bot's position, styling, etc.).

Ensure that the apiKey used is a valid API key from your chatbot provider (e.g., OpenAI API).

### Error Handling

Add error handling in the `.catch()` block when loading the chatbot script, to capture any issues that may arise during the dynamic import (e.g., if the native-web-chatbot-ui package fails to load).

### Visibility Settings

Ensure that the chatbot element is appended to the DOM correctly. Sometimes, it might be positioned off-screen or have CSS properties causing it to be hidden.

Use the `position: fixed;` CSS rule to ensure the chatbot is always visible on the screen:

```css
div[ref="chatbotContainer"] {
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;  /* Ensures visibility on top of other content */
}
```

## Responsive Design

Ensure that the chatbot is responsive and looks good on different screen sizes. You may need to adjust the `initialWidth` or other dimensions depending on your layout.

## Testing & Debugging

### Testing Recommendations

- Test the integration thoroughly in both development and production environments
- Ensure the chatbot loads correctly, displays as expected, and interacts with the user properly
- Use browser dev tools to check for any console errors or warnings related to the chatbot script

### Common Issues to Look Out For

1. **API Key Issues**: Make sure you are using a valid API key for the chatbot's backend
2. **Script Loading**: Ensure that the chatbot script is loaded correctly and that dynamic imports are working without errors
3. **Positioning Issues**: Verify that the chatbot's container is visible by checking the CSS for visibility and position
