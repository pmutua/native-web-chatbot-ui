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
  styleUrls: ['./chatbot.component.css']  // Corrected styleUrls (plural)
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
