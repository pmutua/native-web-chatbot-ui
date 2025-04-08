const chatbot = document.createElement('chat-bot');
document.body.appendChild(chatbot);


chatbot.config = {
  apiKey: 'sk-your-openai-key-here',
  theme: 'dark',
  css: '@equity/.css',
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

// Mock Star Wars-themed API response for demonstration
chatbot.getBotResponse = async (message) => {
  const longStarWarsResponse = `
A long time ago in a galaxy far, far away...

The Galactic Empire was tightening its grip on the galaxy. As the last of the Jedi were hunted down, a small group of rebels dared to rise against the tyranny. Among them was a young moisture farmer from Tatooine named Luke Skywalker. Guided by the spirit of Obi-Wan Kenobi and the wisdom of Master Yoda, Luke embraced his destiny and trained to become a Jedi Knight.

Meanwhile, Darth Vader, once the noble Anakin Skywalker, struggled with the dark side that consumed him. As the Rebel Alliance planned a daring assault on the Death Star, secrets about lineage and legacy were revealed.

"You must unlearn what you have learned," Yoda said, reminding us that growth often comes from letting go of the past.

The Force is what gives a Jedi their power. It's an energy field created by all living things. It surrounds us and penetrates us. It binds the galaxy together.

So, "${message}", always remember: The Force will be with you. Always.
  `;

  return new Promise(resolve => {
    setTimeout(() => {
      resolve(longStarWarsResponse);
    }, 1000); // Simulated delay
  });
};
