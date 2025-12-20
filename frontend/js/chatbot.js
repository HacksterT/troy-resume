// FAQ Chatbot Class
class Chatbot {
    constructor() {
        this.faqData = null;
        this.isOpen = false;
        this.messages = [];
        this.init();
    }

    async init() {
        try {
            // Load FAQ data
            const response = await fetch('data/faq.json');
            this.faqData = await response.json();

            // Setup DOM elements
            this.setupElements();
            this.setupEventListeners();

            // Show greeting when first opened
            this.hasShownGreeting = false;
        } catch (error) {
            console.error('Error initializing chatbot:', error);
        }
    }

    setupElements() {
        this.toggle = document.getElementById('chatbotToggle');
        this.window = document.getElementById('chatbotWindow');
        this.close = document.getElementById('chatbotClose');
        this.messagesContainer = document.getElementById('chatbotMessages');
        this.input = document.getElementById('chatbotInput');
        this.sendBtn = document.getElementById('chatbotSend');
    }

    setupEventListeners() {
        // Toggle chatbot
        this.toggle.addEventListener('click', () => this.open());
        this.close.addEventListener('click', () => this.close_chatbot());

        // Send message
        this.sendBtn.addEventListener('click', () => this.sendMessage());
        this.input.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.sendMessage();
            }
        });

        // Close on escape
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.isOpen) {
                this.close_chatbot();
            }
        });
    }

    open() {
        this.isOpen = true;
        this.window.classList.add('open');
        this.toggle.classList.add('hidden');
        this.input.focus();

        // Show greeting and template questions on first open
        if (!this.hasShownGreeting && this.faqData) {
            this.addBotMessage(this.faqData.greeting, true);
            this.addTemplateQuestions();
            this.hasShownGreeting = true;
        }
    }

    addTemplateQuestions() {
        if (!this.faqData || !this.faqData.template_questions) return;

        const templateDiv = document.createElement('div');
        templateDiv.className = 'template-questions';

        this.faqData.template_questions.forEach(question => {
            const button = document.createElement('button');
            button.className = 'template-question-btn';
            button.textContent = question;
            button.addEventListener('click', () => {
                this.input.value = question;
                this.sendMessage();
            });
            templateDiv.appendChild(button);
        });

        this.messagesContainer.appendChild(templateDiv);
        this.scrollToBottom();
    }

    close_chatbot() {
        this.isOpen = false;
        this.window.classList.remove('open');
        this.toggle.classList.remove('hidden');
    }

    sendMessage() {
        const message = this.input.value.trim();
        if (!message) return;

        // Add user message
        this.addUserMessage(message);
        this.input.value = '';

        // Show typing indicator
        this.showTypingIndicator();

        // Find and send response
        setTimeout(() => {
            this.removeTypingIndicator();
            const response = this.findResponse(message);
            this.addBotMessage(response);
        }, 800);
    }

    addUserMessage(text) {
        const messageDiv = document.createElement('div');
        messageDiv.className = 'message user';
        messageDiv.textContent = text;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    addBotMessage(text, isGreeting = false) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isGreeting ? 'message bot greeting' : 'message bot';
        messageDiv.innerHTML = text;
        this.messagesContainer.appendChild(messageDiv);
        this.scrollToBottom();
    }

    showTypingIndicator() {
        const indicator = document.createElement('div');
        indicator.className = 'typing-indicator';
        indicator.id = 'typingIndicator';
        indicator.innerHTML = '<span></span><span></span><span></span>';
        this.messagesContainer.appendChild(indicator);
        this.scrollToBottom();
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typingIndicator');
        if (indicator) {
            indicator.remove();
        }
    }

    findResponse(message) {
        if (!this.faqData) {
            return "I'm still loading my knowledge base. Please try again in a moment.";
        }

        const lowerMessage = message.toLowerCase();

        // Find matching questions based on keywords
        const matches = this.faqData.questions.filter(q => {
            return q.keywords.some(keyword => lowerMessage.includes(keyword.toLowerCase()));
        });

        if (matches.length > 0) {
            // Return the first match (most relevant based on keyword order)
            return matches[0].answer;
        }

        // No match found
        return this.faqData.default_response;
    }

    scrollToBottom() {
        this.messagesContainer.scrollTop = this.messagesContainer.scrollHeight;
    }
}

// Initialize the Chatbot when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Chatbot();
});
