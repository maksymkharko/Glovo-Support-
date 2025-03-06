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

const politeMessages = [
    "Секундочку, уважаемый пользователь! Спасибо, что обратились в нашу службу поддержки. Ваш запрос уже принят в обработку.",
    "Добрый день! Благодарим за обращение в техническую поддержку. Пожалуйста, подождите немного, я занимаюсь вашим вопросом.",
    "Здравствуйте! Спасибо, что выбрали нашу службу поддержки. Один момент, я уточняю информацию по вашему запросу.",
    "Уважаемый клиент, благодарим за обращение! Подождите буквально секунду, я уже разбираюсь с вашим запросом.",
    "Добрый день, дорогой пользователь! Спасибо за ваш запрос в поддержку. Сейчас я всё проверю для вас."
];

const helpMessages = [
    "Сейчас я подключаю к вам консультанта, который оперативно решит вашу проблему. Пожалуйста, оставайтесь на линии!",
    "Одну минутку, я передаю ваш запрос специалисту, который поможет вам в кратчайшие сроки. Спасибо за терпение!",
    "Не волнуйтесь, я уже организую помощь. К вам подключается наш лучший консультант для решения вопроса.",
    "Ваш запрос в приоритете! Я подключаю к вам сотрудника службы поддержки, который всё уладит.",
    "Секундочку, я перенаправляю вас к консультанту, который профессионально разберётся с вашей ситуацией."
];

const trollMessages = [
    "К сожалению, вы выбрали неверную категорию обращения. Пошёл ты на хуй, тупой пидорас, не умеющий даже кнопку нажать правильно, бесполезный кусок говна!",
    "Оказывается, вы ошиблись с категорией запроса. Иди в жопу, конченый мудак, неспособный разобраться в простом меню, вонючий хуесос!",
    "Ваш выбор категории оказался некорректным. Пошёл ты в пизду, ебаный дебил, который не может ничего сделать нормально, гнойная мразь!",
    "Увы, вы указали неправильную категорию. Вали нахуй, сраный уёбок, не в состоянии понять базовые инструкции, тупорылая сволочь!",
    "К сожалению, категория выбрана неверно. Иди в пизду, гнилой пидор, не умеющий даже читать, жалкий хуй с ушами!"
];

let currentStep = 0;
let chatBox = document.getElementById('chat-box');
let optionsDiv = document.getElementById('options');
let reasonText = document.getElementById('reason-text');
let startChatButton = document.getElementById('start-chat-button');
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
        let politeMessage = politeMessages[Math.floor(Math.random() * politeMessages.length)];
        addMessage(politeMessage);
        setTimeout(() => {
            let helpMessage = helpMessages[Math.floor(Math.random() * helpMessages.length)];
            addMessage(helpMessage);
            setTimeout(() => {
                let trollMessage = trollMessages[Math.floor(Math.random() * trollMessages.length)];
                addMessage(trollMessage);
                disableOptions(); // Отключаем кнопки после закрытия чата
            }, 3000); // Задержка перед троллингом
        }, 3000); // Задержка перед обещанием помощи
    } else {
        // Обычный троллинг
        let trollMessage = trollMessages[Math.floor(Math.random() * trollMessages.length)];
        addMessage(trollMessage);
        setTimeout(() => {
            disableOptions(); // Отключаем кнопки после закрытия чата
        }, 3000); // Задержка перед закрытием чата
    }
}

function disableOptions() {
    optionsDiv.innerHTML = ''; // Убираем кнопки выбора
    newChatButton.style.display = 'block'; // Показываем кнопку "Начать новый чат"
}

function startGame() {
    startChatButton.style.display = 'none'; // Скрываем кнопку "Написать в поддержку"
    reasonText.textContent = getRandomReason();
    addMessage("Добрый день! Чем мы можем вам помочь?");
    showOptions();
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

startChatButton.addEventListener('click', startGame);
newChatButton.addEventListener('click', resetGame);

function init() {
    startChatButton.style.display = 'block'; // Показываем кнопку "Написать в поддержку"
    newChatButton.style.display = 'none'; // Скрываем кнопку "Начать новый чат"
}

init();