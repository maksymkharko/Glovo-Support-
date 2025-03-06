const reasons = [
    "У меня сломалась машина",
    "Клиент не поднимает трубку",
    "Заведение долго делает заказ",
    "У меня недостаточно наличных"
];

const categories = [
    "Техническая поддержка",
    "Проблемы с доставкой",
    "Проблемы с заказом",
    "Финансовые вопросы"
];

let currentStep = 0;
let chatBox = document.getElementById('chat-box');
let optionsDiv = document.getElementById('options');
let reasonText = document.getElementById('reason-text');

function getRandomReason() {
    return reasons[Math.floor(Math.random() * reasons.length)];
}

function getRandomCategories() {
    let shuffled = categories.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, 3);
}

function addMessage(message, isUser = false) {
    let messageDiv = document.createElement('div');
    messageDiv.classList.add('message');
    messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
    messageDiv.textContent = message;
    chatBox.appendChild(messageDiv);
    chatBox.scrollTop = chatBox.scrollHeight;
}

function showOptions() {
    optionsDiv.innerHTML = '';
    let categories = getRandomCategories();
    categories.forEach(category => {
        let button = document.createElement('button');
        button.classList.add('option-button');
        button.textContent = category;
        button.onclick = () => selectOption(category);
        optionsDiv.appendChild(button);
    });
}

function selectOption(selectedCategory) {
    addMessage(selectedCategory, true);
    setTimeout(() => {
        addMessage("Вы выбрали неправильную категорию. Мы переключаем вас на бота...");
        setTimeout(() => {
            addMessage("Чат закрывается...");
            setTimeout(() => {
                chatBox.innerHTML = '';
                optionsDiv.innerHTML = '';
                currentStep++;
                if (currentStep < 5) {
                    reasonText.textContent = getRandomReason();
                    addMessage("Добрый день! Чем мы можем вам помочь?");
                    showOptions();
                } else {
                    addMessage("Нихуя ты опять выбрал неправильно!");
                }
            }, 1000);
        }, 2000);
    }, 1000);
}

function init() {
    reasonText.textContent = getRandomReason();
    addMessage("Добрый день! Чем мы можем вам помочь?");
    showOptions();
}

init();