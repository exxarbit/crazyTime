// Получаем элементы из DOM
const numberDisplay = document.getElementById('number-display');
const decreaseButton = document.getElementById('decrease-button');
const increaseButton = document.getElementById('increase-button');
const signalButton = document.getElementById('signal-button');
const signalContainer = document.getElementById('signal-container');

// Создаем элемент для отображения сообщения
const messageDisplay = document.createElement('div');
messageDisplay.style.color = 'red'; // Устанавливаем цвет текста
messageDisplay.style.marginTop = '10px'; // Устанавливаем отступ сверху
messageDisplay.style.fontWeight = 'bold'; // Устанавливаем жирный шрифт
signalContainer.appendChild(messageDisplay); // Добавляем сообщение в контейнер

// Инициализируем текущее значение
let currentValue = 1;

// Флаг для отслеживания первого нажатия
let firstSignalClick = true;
// Флаг для отслеживания состояния обратного отсчета
let isCountingDown = false;

// Определяем шансы для изображений
const images = [
    { src: 'signal/1.jpg', chance: 45 },
    { src: 'signal/2.jpg', chance: 20 },
    { src: 'signal/5.jpg', chance: 10 },
    { src: 'signal/10.jpg', chance: 7 },
    { src: 'signal/pochinki.jpg', chance: 5 },
    { src: 'signal/cashhunt.jpg', chance: 5 },
    { src: 'signal/coinflip.jpg', chance: 6 },
    { src: 'signal/crazytime.jpg', chance: 2 }
];

// Функция для выбора изображения на основе шансов
function getRandomImage() {
    const randomNum = Math.random() * 100; // Генерируем случайное число от 0 до 100
    let cumulativeChance = 0;

    for (const image of images) {
        cumulativeChance += image.chance;
        if (randomNum <= cumulativeChance) {
            return image.src; // Возвращаем выбранное изображение
        }
    }
}

// Обработчик для уменьшения значения
decreaseButton.addEventListener('click', () => {
    if (currentValue === 3) {
        currentValue = 1;
        numberDisplay.textContent = currentValue;
    }
});

// Обработчик для увеличения значения
increaseButton.addEventListener('click', () => {
    if (currentValue === 1) {
        currentValue = 3;
        numberDisplay.textContent = currentValue;
    }
});

// Обработчик для получения сигнала
signalButton.addEventListener('click', () => {
    if (isCountingDown) {
        // Если отсчет идет, ничего не делаем
        return;
    }

    // Получаем все изображения в контейнере
    const existingImages = signalContainer.querySelectorAll('img');

    // Если есть существующие изображения, начинаем анимацию исчезновения
    if (existingImages.length > 0) {
        let fadeOutCount = existingImages.length; // Счетчик для отслеживания завершения анимации

        existingImages.forEach((img) => {
            img.classList.add('fade-out'); // Применяем класс исчезновения
            
            // Удаляем изображение после завершения анимации
            img.addEventListener('transitionend', () => {
                signalContainer.removeChild(img);
                fadeOutCount--; // Уменьшаем счетчик

                // Если все изображения исчезли, добавляем новые
                if (fadeOutCount === 0) {
                    if (firstSignalClick) {
                        // Если это первое нажатие, добавляем новые сигналы немедленно
                        addNewSignals();
                        firstSignalClick = false; // Устанавливаем флаг, что первое нажатие уже произошло
                    } else {
                        // Если это не первое нажатие, начинаем обратный отсчет
                        startCountdown(30); // 30 секунд
                    }
                }
            });
        });
    } else {
        // Если новых изображений нет
        if (firstSignalClick) {
            // Если это первое нажатие, добавляем новые сигналы немедленно
            addNewSignals();
            firstSignalClick = false; // Устанавливаем флаг, что первое нажатие уже произошло
        } else {
            // Если это не первое нажатие, начинаем обратный отсчет
            startCountdown(30); // 30 секунд
        }
    }
});

// Функция для добавления новых сигналов
function addNewSignals() {
    // Генерируем количество сигналов в зависимости от текущего значения
    const numSignals = currentValue;

    // Создаем новое изображение для каждого сигнала
    for (let i = 0; i < numSignals; i++) {
        const newSignalImage = document.createElement('img');
        
        // Получаем изображение на основе шансов
        newSignalImage.src = getRandomImage();
        
        // Применяем класс появления
        newSignalImage.classList.add('fade-in');
        
        // Добавляем новое изображение в контейнер
        signalContainer.appendChild(newSignalImage);
        
        // Сразу после добавления применяем анимацию появления
        setTimeout(() => {
            newSignalImage.classList.remove('fade-in');
        }, 10); // Небольшая задержка для применения анимации
    }
}

// Функция для обратного отсчета
function startCountdown(seconds) {
    isCountingDown = true; // Устанавливаем флаг, что отсчет идет
    messageDisplay.textContent = `Пожалуйста, подождите ${seconds} секунд.`;
    
    const countdownInterval = setInterval(() => {
        seconds--;
        messageDisplay.textContent = `Пожалуйста, подождите ${seconds} секунд.`;
        
        if (seconds <= 0) {
            clearInterval(countdownInterval); // Останавливаем обратный отсчет
            messageDisplay.textContent = ''; // Скрываем сообщение
            addNewSignals(); // Добавляем новые сигналы
            isCountingDown = false; // Сбрасываем флаг, что отсчет завершен
        }
    }, 1000);
}