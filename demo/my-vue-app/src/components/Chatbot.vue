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