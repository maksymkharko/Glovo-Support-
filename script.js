const reasons = [
    "У меня сломалась машина",
    "Клиент не поднимает трубку",
    "Заведение долго делает заказ",
    "У меня недостаточно наличных",
    "Курьер потерял мой заказ",
    "Я не могу войти в аккаунт",
    "Мой заказ пришёл холодным",
    "Я хочу вернуть деньги",
    "Мой заказ не соответствует описанию",
    "Курьер опоздал на 2 часа",
    "Я получил не свой заказ",
    "У меня проблемы с оплатой"
];

const categories = [
    "Техническая поддержка",
    "Проблемы с доставкой",
    "Проблемы с заказом",
    "Финансовые вопросы",
    "Проблемы с курьером",
    "Проблемы с аккаунтом",
    "Качество заказа",
    "Возврат средств",
    "Проблемы с меню",
    "Проблемы с оплатой",
    "Проблемы с приложением",
    "Другое"
];

const trollMessages = [
    "О, вы выбрали правильную категорию! Шучу, ни хрена не правильную.",
    "Секунду, подключаем вас к консультанту... А нет, ошибка. Вы опять не туда нажали.",
    "Вы почти у цели! Ой, нет, это была шутка. Вы снова ошиблись.",
    "Поздравляем! Вы выбрали... неправильный вариант. Мы переключаем вас на бота.",
    "Вы уверены, что хотите выбрать эту категорию? Ладно, не важно, вы всё равно ошиблись.",
    "Сейчас я вам помогу... Шучу, ничем не могу помочь. Чат закрывается.",
    "Один момент, я уже решаю вашу проблему... А нет, это не ваша категория. До свидания!",
    "Кажется, я нашёл решение! Ой, нет, это не ваш случай. Чат закрыт.",
    "Пожалуйста, подождите, я передаю вас специалисту... Или нет. Вы ошиблись категорией.",
    "Всё понятно, сейчас помогу... Шучу, вы выбрали не ту категорию. Чат закрывается.",
    "О, вы почти угадали! Но нет, вы снова облажались.",
    "Выбирайте быстрее, у меня обед через 5 минут... Шучу, я бот, мне не нужен обед.",
    "Вы думаете, что сможете выбрать правильно? Ха-ха, нет.",
    "Выбирайте, выбирайте... Всё равно ошибётесь.",
    "Я бы вам помог, но вы выбрали не ту категорию. Иди нахуй, короче.",
    "Вы вообще читаете, что выбираете? Видимо, нет.",
    "Выбирайте быстрее, у меня другие клиенты ждут... Шучу, я бот, мне похуй.",
    "Вы думаете, что я вам помогу? Ха-ха, нет.",
    "Выбирайте, выбирайте... Всё равно закрою чат.",
    "Вы почти угадали! Шучу, вы опять облажались."
];

const fakeHelpMessages = [
    "Секунду, я уже решаю вашу проблему...",
    "Пожалуйста, подождите, я передаю вас специалисту...",
    "Сейчас я вам помогу, один момент...",
    "Всё понятно, я уже работаю над вашим запросом...",
    "Один момент, я ищу решение вашей проблемы...",
    "Пожалуйста, подождите, я уточняю детали..."
];

const closeMessages = [
    "Чат закрывается...",
    "До свидания, неудачник!",
    "Чат закрыт. Попробуйте ещё раз, если хватит терпения.",
    "Всё, я ухожу. Выбирайте быстрее в следующий раз.",
    "Чат закрыт. Вы слишком медлительны.",
    "Чат закрыт. Идите нахуй.",
    "Чат закрыт. Выбирайте быстрее, если не тупой.",
    "Чат закрыт. Вы опять облажались.",
    "Чат закрыт. Попробуйте ещё раз, если не лох.",
    "Чат закрыт. Выбирайте быстрее, если не дебил.",
    "Чат закрыт. Пошёл в пизду.",
    "Чат закрыт. Иди в очко.",
    "Чат закрыт. Валяй отсюда, балбес.",
    "Чат закрыт. Пшёл вон, козёл.",
    "Чат закрыт. Иди в жопу.",
    "Чат закрыт. Пошёл на хуй, дебил."
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
    if (Math.random() < 0.3) {
        // Иногда чат "притворяется" человеком
        let fakeHelpMessage = fakeHelpMessages[Math.floor(Math.random() * fakeHelpMessages.length)];
        addMessage(fakeHelpMessage);
        setTimeout(() => {
            let trollMessage = trollMessages[Math.floor(Math.random() * trollMessages.length)];
            addMessage(trollMessage);
            setTimeout(() => {
                let closeMessage = closeMessages[Math.floor(Math.random() * closeMessages.length)];
                addMessage(closeMessage);
                setTimeout(() => {
                    chatBox.innerHTML = '';
                    optionsDiv.innerHTML = '';
                    currentStep++;
                    if (currentStep < 5) {
                        setTimeout(() => {
                            reasonText.textContent = getRandomReason();
                            addMessage("Добрый день! Чем мы можем вам помочь?");
                            showOptions();
                        }, 5000); // Задержка перед открытием нового чата
                    } else {
                        addMessage("Нихуя ты опять выбрал неправильно! Попробуй ещё раз, если хватит терпения.");
                        setTimeout(() => {
                            resetGame();
                        }, 10000); // Перезапуск игры через 10 секунд
                    }
                }, 1000);
            }, 2000);
        }, 2000);
    } else {
        // Обычный троллинг
        let trollMessage = trollMessages[Math.floor(Math.random() * trollMessages.length)];
        addMessage(trollMessage);
        setTimeout(() => {
            let closeMessage = closeMessages[Math.floor(Math.random() * closeMessages.length)];
            addMessage(closeMessage);
            setTimeout(() => {
                chatBox.innerHTML = '';
                optionsDiv.innerHTML = '';
                currentStep++;
                if (currentStep < 5) {
                    setTimeout(() => {
                        reasonText.textContent = getRandomReason();
                        addMessage("Добрый день! Чем мы можем вам помочь?");
                        showOptions();
                    }, 5000); // Задержка перед открытием нового чата
                } else {
                    addMessage("Нихуя ты опять выбрал неправильно! Попробуй ещё раз, если хватит терпения.");
                    setTimeout(() => {
                        resetGame();
                    }, 10000); // Перезапуск игры через 10 секунд
                }
            }, 1000);
        }, 2000);
    }
}

function resetGame() {
    currentStep = 0;
    chatBox.innerHTML = '';
    optionsDiv.innerHTML = '';
    reasonText.textContent = getRandomReason();
    addMessage("Добрый день! Чем мы можем вам помочь?");
    showOptions();
}

function init() {
    reasonText.textContent = getRandomReason();
    addMessage("Добрый день! Чем мы можем вам помочь?");
    showOptions();
}

init();