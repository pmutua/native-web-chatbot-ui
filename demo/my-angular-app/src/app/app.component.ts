import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbot/chatbot.component';
import { isPlatformBrowser } from '@angular/common';  // Importing isPlatformBrowser

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ChatbotComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']  // Corrected styleUrls (plural)
})
export class AppComponent {
  title = 'my-angular-app';
  isBrowser: boolean;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {
    // Check if the app is running in the browser
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit() {
    if (this.isBrowser) {
      console.log('The app is running in the browser');
    } else {
      console.log('The app is running on the server');
    }
  }
}
