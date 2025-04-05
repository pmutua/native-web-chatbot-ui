export const defaultConfig = {
    streamingData: true,
    initialWidth: 300,
    resizable: true,
    position: 'bottom-right',
    theme: 'light',
    bubbleStyle: {},
    fontSize: '1rem',
    apiKey: '',
    delayTime: 500,
    apiEndpoint: 'https://api.openai.com/v1/completions'
  };
  
  export function applyConfig(component) {
    const container = component.shadowRoot.querySelector('.chat-container');
    
    // Apply position
    const positions = {
      'bottom-right': { right: '20px', bottom: '20px' },
      'bottom-left': { left: '20px', bottom: '20px' }
    };
    Object.assign(container.style, positions[component.config.position]);
  
    // Apply theme
    container.classList.add(component.config.theme);
  
    // Apply styles
    container.style.setProperty('--user-bubble-bg', component.config.bubbleStyle.userBackground);
    container.style.setProperty('--bot-bubble-bg', component.config.bubbleStyle.botBackground);
    container.style.fontSize = component.config.fontSize;
    container.style.width = `${component.config.initialWidth}px`;
  }