export function streamResponse(element, content, delay) {
    let index = 0;
    const bubble = element.shadowRoot.querySelector('.bubble');
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (index < content.length) {
          bubble.textContent += content[index++];
          element.scrollIntoView({ behavior: 'smooth', block: 'end' });
        } else {
          clearInterval(interval);
          resolve();
        }
      }, delay);
    });
  }