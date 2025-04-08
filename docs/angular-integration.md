# Integration Steps for Native Web Chatbot UI in Angular

## 1. Install the Library

First, you need to install the native-web-chatbot-ui or any external JavaScript library in your Angular project.

If the library is available via npm:

```bash
npm install native-web-chatbot-ui --save
```

If not available through npm, manually add it by downloading the .js file and placing it into your src/assets folder.

## 2. Add External JS Library to Angular's angular.json

Add the library to the angular.json file so Angular includes it in the build process:

```json
"scripts": [
  "node_modules/native-web-chatbot-ui/dist/main.js
"
]
```

## 3. Declare the Module and Its Types

Create a declaration file to make TypeScript aware of the library:

```typescript
// src/typings/native-web-chatbot-ui.d.ts
declare module 'native-web-chatbot-ui/dist/main.js' {
  const content: any;
  export default content;
}
```

## 4. Import and Use the Library in Angular Component

```typescript
import { Component, OnInit, OnDestroy, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

declare global {
  interface HTMLElement {
    config: any;
    getBotResponse: (message: string) => Promise<string>;
  }
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  chatbotElement: HTMLElement | null = null;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      // Only run client-side code
      this.loadChatbot();
    }
  }

  ngOnDestroy(): void {
    // Clean up any dynamic elements if needed
    if (this.chatbotElement) {
      document.body.removeChild(this.chatbotElement);
    }
  }

  loadChatbot() {
    // Dynamically load the chatbot library in the browser
    import('native-web-chatbot-ui/dist/main.js').then(() => {
      // Dynamically create the chatbot element
      this.chatbotElement = document.createElement('chat-bot');
      document.body.appendChild(this.chatbotElement);

      // Configure chatbot settings
      if (this.chatbotElement) {
        this.chatbotElement.config = {
          apiKey: 'sk-your-openai-key-here',
          theme: 'dark',
          css: '@org/.css',
          initialWidth: 400,
          position: 'bottom-right',
          bubbleStyle: {
            userBackground: '#4CAF50',
            botBackground: '#F5F5F5',
            borderRadius: '20px'
          },
          streamingData: true,
          delayTime: 50
        };

        // Define the bot's response behavior
        this.chatbotElement.getBotResponse = async (message: string) => {
          const longStarWarsResponse = `A long time ago in a galaxy far, far away... The Force will be with you. Always.`;
          return new Promise(resolve => {
            setTimeout(() => {
              resolve(longStarWarsResponse);
            }, 1000);
          });
        };
      }
    }).catch(error => {
      console.error('Error loading the chatbot library:', error);
    });
  }
}
```

## 5. Add the Chatbot Component to Your App

Add the component to your Angular app's template:

```html
<app-chatbot></app-chatbot>
```

## 6. Style and Customize the Chatbot

Customize the chatbot's appearance through its configuration:

```typescript
this.chatbotElement.config = {
  // other config properties...
  bubbleStyle: {
    userBackground: '#4CAF50',
    botBackground: '#F5F5F5',
    borderRadius: '20px'
  },
  // more config properties...
};
```

## 7. Test and Debug

- Check for errors in the console when loading the script and creating the chatbot
- Verify performance to ensure the script doesn't block the main thread
- Test mobile responsiveness across various screen sizes

## 8. Clean Up After Component Destruction

Implement proper cleanup in ngOnDestroy:

```typescript
ngOnDestroy(): void {
  if (this.chatbotElement) {
    document.body.removeChild(this.chatbotElement);
  }
}
```

## 9. Handle API Keys Securely

- Don't hardcode API keys in frontend code
- Use environment variables or backend services to manage sensitive data

<!-- ## Summary of Integration Steps

1. **Install the Library**: Via npm or manual download
2. **Configure angular.json**: Include external scripts
3. **Declare Types**: Create type definitions for TypeScript
4. **Create Component**: Implement dynamic loading and initialization
5. **Add to Template**: Include the component in your app
6. **Style**: Customize appearance through configuration
7. **Cleanup**: Handle proper removal when component is destroyed
8. **Test**: Ensure smooth integration and responsive behavior
9. **Security**: Protect sensitive information like API keys -->
