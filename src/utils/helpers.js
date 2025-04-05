export const debounce = (func, wait) => {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  };
  
  export const mergeConfig = (defaults, overrides) => {
    return {
      ...defaults,
      ...overrides,
      bubbleStyle: {
        ...defaults.bubbleStyle,
        ...overrides.bubbleStyle
      }
    };
  };
  
  export const setCSSVariables = (element, variables) => {
    Object.entries(variables).forEach(([key, value]) => {
      element.style.setProperty(`--${key}`, value);
    });
  };