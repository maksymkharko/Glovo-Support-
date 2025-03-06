const reasons = [
    "У меня сломалась машина",
    "Клиент не поднимает трубку",
    "Заведение долго делает заказ",
    "У меня недостаточно наличных",
    "Курьер потерял мой заказ",
    "Я не могу войти в аккаунт",
    "Мой заказ пришёл холодным",
    "Я хочу вернуть деньги"
];

const categories = [
    "Техническая поддержка",
    "Проблемы с доставкой",
    "Проблемы с заказом",
    "Финансовые вопросы",
    "Проблемы с курьером",
    "Проблемы с аккаунтом",
    "Качество заказа",
    "Возврат средств"
];

const trollMessages = [
    "О, вы выбрали правильную категорию! Шучу, ни хрена не правильную.",
    "Секунду, подключаем вас к консультанту... А нет, ошибка. Вы опять не туда нажали.",
    "Вы почти у цели! Ой, нет, это была шутка. Вы снова ошиблись.",
    "Поздравляем! Вы выбрали... неправильный вариант. Мы переключаем вас на бота.",
    "Вы уверены, что хотите выбрать эту категорию? Ладно, не важно, вы всё равно ошиблись."
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
        let trollMessage = trollMessages[Math.floor(Math.random() * trollMessages.length)];
        addMessage(trollMessage);
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
                    addMessage("Нихуя ты опять выбрал неправильно! Попробуй ещё раз, если хватит терпения.");
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