# Important Notes for React Integration

## 1. `"use client"` Directive

In frameworks like **Next.js** that support **server-side rendering (SSR)** and **static site generation (SSG)**, React hooks like `useEffect` will only work on the client side. By adding the `"use client"` directive at the top of the file, we ensure the component runs only on the client side.

### Example

```tsx
'use client';
```

This is crucial for components that rely on DOM manipulation or when using browser-specific APIs like window, document, etc.

## 2. Custom Web Component (chat-bot)

When using custom web components (e.g., `<chat-bot>`), they don't natively support React-specific props or states. Therefore, we handle the custom properties (config and getBotResponse) directly via JavaScript.

### Example of Creating and Configuring the Chatbot 

```tsx
const chatbot = document.createElement('chat-bot') as HTMLElement;
document.body.appendChild(chatbot);

chatbot.config = {
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

chatbot.getBotResponse = async (message: string) => {
  const longStarWarsResponse = `
    A long time ago in a galaxy far, far away...
    ... The Force will be with you. Always.`;

  return new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(longStarWarsResponse);
    }, 1000);
  });
};
```

## 3. TypeScript Type Assertion

Since chat-bot is a custom web component, TypeScript doesn't automatically know about its properties. We use type assertion to tell TypeScript that the element is of type HTMLElement.

### Example

```tsx
const chatbot = document.createElement('chat-bot') as HTMLElement;
```

This is necessary when working with custom elements that extend HTML elements.

## 4. useEffect Hook

The useEffect hook is used to perform side effects, such as adding/removing elements from the DOM. In this case, we append the chatbot to the body when the component mounts and remove it when it unmounts.

### Example

```tsx
useEffect(() => {
  // Code for adding the chatbot element
  return () => {
    // Cleanup - remove chatbot when the component is unmounted
    document.body.removeChild(chatbot);
  };
}, []);
```

## 5. Global Declaration for Custom Properties

We use declare global to inform TypeScript about the custom properties (config and getBotResponse) on the HTMLElement interface. Without this, TypeScript wouldn't recognize these properties.

### Example

```tsx
declare global {
  interface HTMLElement {
    config: any;
    getBotResponse: (message: string) => Promise<string>;
  }
}
```

## 6. SSR Considerations

If you're using SSR (e.g., with Next.js), make sure the component with useEffect runs only on the client side. The "use client" directive ensures this behavior.

### Example

```tsx
'use client';  // Ensures the component is only run on the client side
```

## 7. Custom Element Compatibility

Web components (like `<chat-bot>`) are separate from React components. If you need to use React-specific features (like state or events) with a custom element, you will need to manage interactions manually since React doesn't support these natively.

## 8. Browser Support for Web Components

Ensure that the browser supports web components. Most modern browsers support them, but older browsers might need polyfills.

## 9. CSS Loading

Make sure that the CSS file (@org/.css) is available and properly linked, as the chatbot config includes a custom CSS path.

## Conclusion

- Ensure you use "use client" for client-side rendering when necessary.
- Custom web components need manual management for properties and events in React.
- TypeScript may need type assertions or global declarations for custom elements.
