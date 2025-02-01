const numberDisplay = document.getElementById('number-display');
const decreaseButton = document.getElementById('decrease-button');
const increaseButton = document.getElementById('increase-button');
const signalButton = document.getElementById('signal-button');
const signalContainer = document.getElementById('signal-container');
const messageDisplay = document.createElement('div');
messageDisplay.style.color = 'blue'; 
messageDisplay.style.marginTop = '10px';
messageDisplay.style.fontWeight = 'bold';


signalContainer.parentNode.insertBefore(messageDisplay, signalContainer);

let currentValue = 1;

let firstSignalClick = true;

let isCountingDown = false;

let currentLanguage = 'ru';

// Шансы
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

// выбор img
function getRandomImage() {
    const randomNum = Math.random() * 100;
    let cumulativeChance = 0;

    for (const image of images) {
        cumulativeChance += image.chance;
        if (randomNum <= cumulativeChance) {
            return image.src;
        }
    }
}

decreaseButton.addEventListener('click', () => {
    if (currentValue === 3) {
        currentValue = 1;
        numberDisplay.textContent = currentValue;
    }
});

increaseButton.addEventListener('click', () => {
    if (currentValue === 1) {
        currentValue = 3;
        numberDisplay.textContent = currentValue;
    }
});

signalButton.addEventListener('click', () => {
    if (isCountingDown) {
        return;
    }

    const existingImages = signalContainer.querySelectorAll('img');

    if (existingImages.length > 0) {
        let fadeOutCount = existingImages.length;
        existingImages.forEach((img) => {
            img.classList.add('fade-out');

            img.addEventListener('transitionend', () => {
                signalContainer.removeChild(img);
                fadeOutCount--;
                if (fadeOutCount === 0) {
                    addNewSignals();
                    startCountdown(30);
                }
            });
        });
    } else {
        addNewSignals();
        startCountdown(30);
    }
});

function addNewSignals() {
    const numSignals = currentValue;

    for (let i = 0; i < numSignals; i++) {
        const newSignalImage = document.createElement('img');

        newSignalImage.src = getRandomImage();

        newSignalImage.classList.add('fade-in');

        signalContainer.appendChild(newSignalImage);
        
        setTimeout(() => {
            newSignalImage.classList.remove('fade-in');
        }, 10);
    }
}

function startCountdown(seconds) {
    isCountingDown = true;
    updateMessage(seconds);
    
    const countdownInterval = setInterval(() => {
        seconds--;
        
        if (seconds > 0) {
            updateMessage(seconds);
        } else {
            clearInterval(countdownInterval);
            messageDisplay.textContent = '';
            isCountingDown = false;
        }
    }, 1000);
}

function updateMessage(seconds) {
    messageDisplay.classList.remove('message-fade-in');

    if (currentLanguage === 'ru') {
        messageDisplay.textContent = `Для получения нового сигнала, пожалуйста, подождите ${seconds} секунд.`;
    } else if (currentLanguage === 'en') {
        messageDisplay.textContent = `Please wait ${seconds} seconds to receive a new signal.`;
    }
    messageDisplay.classList.add('message-fade-in');
}

const langRu = document.getElementById('lang-ru');
const langEn = document.getElementById('lang-en');

function changeLanguage(lang) {
    currentLanguage = lang;
    if (lang === 'ru') {
        document.documentElement.lang = 'ru';
        document.querySelector('.signal-button').textContent = 'Получить сигнал';
    } else if (lang === 'en') {
        document.documentElement.lang = 'en';
        document.querySelector('.signal-button').textContent = 'Get signal';
    }
}

function animateClick(element) {
    element.classList.add('clicked');
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 200);
}

langRu.addEventListener('click', () => {
    changeLanguage('ru');
    animateClick(langRu);
});
langEn.addEventListener('click', () => {
    changeLanguage('en');
    animateClick(langEn);
});
