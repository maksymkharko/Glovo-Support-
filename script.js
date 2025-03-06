const reasons = [
    "Не могу найти клиента",
    "Не могу найти ресторан",
    "Заведение долго готовит заказ",
    "У меня недостаточно наличных",
    "Клиент не отвечает на звонки",
    "Проблема с оплатой заказа",
    "Заказ не соответствует описанию",
    "Курьер опоздал на 2 часа",
    "Я получил не свой заказ",
    "Проблемы с приложением",
    "Не могу войти в аккаунт",
    "Заказ отменён, но деньги не вернули",
    "Клиент отказался от заказа",
    "Ресторан закрыт",
    "Неправильный адрес доставки",
    "Заказ уже забрал другой курьер",
    "Проблемы с картой оплаты",
    "Заказ слишком большой для моей сумки",
    "Клиент не может найти меня",
    "Проблемы с навигацией"
];

const categories = [
    "Проблемы с доставкой",
    "Проблемы с заказом",
    "Финансовые вопросы",
    "Проблемы с клиентом",
    "Проблемы с рестораном",
    "Технические проблемы",
    "Проблемы с аккаунтом",
    "Другое"
];

const trollMessages = [
    "О, вы выбрали правильную категорию! Шучу, ни хрена не правильную, долбоёб.",
    "Секунду, подключаем вас к консультанту... А нет, ошибка. Вы опять не туда нажали, уебан.",
    "Вы почти у цели! Ой, нет, это была шутка. Вы снова ошиблись, черт собака.",
    "Поздравляем! Вы выбрали... неправильный вариант. Мы переключаем вас на бота, пидорас.",
    "Вы уверены, что хотите выбрать эту категорию? Ладно, не важно, вы всё равно ошиблись, залупа.",
    "Сейчас я вам помогу... Шучу, ничем не могу помочь. Чат закрывается, сутулая собака.",
    "Один момент, я уже решаю вашу проблему... А нет, это не ваша категория. До свидания, педик.",
    "Кажется, я нашёл решение! Ой, нет, это не ваш случай. Чат закрыт, дебил.",
    "Пожалуйста, подождите, я передаю вас специалисту... Или нет. Вы ошиблись категорией, мудак.",
    "Всё понятно, сейчас помогу... Шучу, вы выбрали не ту категорию. Чат закрывается, урод.",
    "О, вы почти угадали! Но нет, вы снова облажались, тупой.",
    "Выбирайте быстрее, у меня обед через 5 минут... Шучу, я бот, мне не нужен обед, идиот.",
    "Вы думаете, что сможете выбрать правильно? Ха-ха, нет, кретин.",
    "Выбирайте, выбирайте... Всё равно ошибётесь, дурак.",
    "Я бы вам помог, но вы выбрали не ту категорию. Иди нахуй, козёл.",
    "Вы вообще читаете, что выбираете? Видимо, нет, дегенерат.",
    "Выбирайте быстрее, у меня другие клиенты ждут... Шучу, я бот, мне похуй, лох.",
    "Вы думаете, что я вам помогу? Ха-ха, нет, придурок.",
    "Выбирайте, выбирайте... Всё равно закрою чат, мразь.",
    "Вы почти угадали! Шучу, вы опять облажались, тупица."
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
    "До свидания, долбоёб!",
    "Чат закрыт. Попробуйте ещё раз, если хватит терпения, уебан.",
    "Всё, я ухожу. Выбирайте быстрее в следующий раз, черт собака.",
    "Чат закрыт. Вы слишком медлительны, пидорас.",
    "Чат закрыт. Идите нахуй, залупа.",
    "Чат закрыт. Выбирайте быстрее, если не тупой, сутулая собака.",
    "Чат закрыт. Вы опять облажались, педик.",
    "Чат закрыт. Попробуйте ещё раз, если не лох, дебил.",
    "Чат закрыт. Выбирайте быстрее, если не дебил, мудак.",
    "Чат закрыт. Пошёл в пизду, урод.",
    "Чат закрыт. Иди в очко, тупой.",
    "Чат закрыт. Валяй отсюда, балбес, идиот.",
    "Чат закрыт. Пшёл вон, козёл, кретин.",
    "Чат закрыт. Иди в жопу, дурак.",
    "Чат закрыт. Пошёл на хуй, дебил, мразь."
];

let currentStep = 0;
let chatBox = document.getElementById('chat-box');
let optionsDiv = document.getElementById('options');
let reasonText = document.getElementById('reason-text');
let newChatButton = document.getElementById('new-chat-button');

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
                disableOptions(); // Отключаем кнопки после закрытия чата
            }, 3000); // Задержка перед закрытием чата
        }, 3000); // Задержка перед троллингом
    } else {
        // Обычный троллинг
        let trollMessage = trollMessages[Math.floor(Math.random() * trollMessages.length)];
        addMessage(trollMessage);
        setTimeout(() => {
            let closeMessage = closeMessages[Math.floor(Math.random() * closeMessages.length)];
            addMessage(closeMessage);
            disableOptions(); // Отключаем кнопки после закрытия чата
        }, 3000); // Задержка перед закрытием чата
    }
}

function disableOptions() {
    optionsDiv.innerHTML = ''; // Убираем кнопки выбора
    newChatButton.style.display = 'block'; // Показываем кнопку "Начать новый чат"
}

function resetGame() {
    currentStep = 0;
    chatBox.innerHTML = '';
    optionsDiv.innerHTML = '';
    reasonText.textContent = getRandomReason();
    addMessage("Добрый день! Чем мы можем вам помочь?");
    showOptions();
    newChatButton.style.display = 'none'; // Скрываем кнопку "Начать новый чат"
}

newChatButton.addEventListener('click', resetGame);

function init() {
    reasonText.textContent = getRandomReason();
    addMessage("Добрый день! Чем мы можем вам помочь?");
    showOptions();
    newChatButton.style.display = 'none'; // Скрываем кнопку "Начать новый чат" в начале
}

init();