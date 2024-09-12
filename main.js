const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const playAgainBtn = document.getElementById('play-button');
const popup = document.getElementById('popup-container');
const notification = document.getElementById('notification-container');
const finalMessage = document.getElementById('final-message');


const figurePart = document.querySelectorAll('.figure-part');

const words = ['application','programming','interface','algorithms']

let selectedWord = words[Math.floor(Math.random() * words.length)];
const correctLetters = [];
const wrongLetters = [];


const displayWord = () => {
    wordEl.innerHTML = `${selectedWord
        .split('')
        .map(letter => `<span class='letters'>${correctLetters.includes(letter) ? letter : ''}</span>`)
        .join('')}`;


    const innerWord = wordEl.innerText.replace(/\n/g, '');

    if (innerWord===selectedWord){
        finalMessage.innerText= 'Congratulations! you won!';
        popup.style.display = 'flex';
    }

};

const updateWrongLettersEl = ()=> {
    wrongLettersEl.innerHTML = `${wrongLetters.length>0 ? '<p>wrong</p>' : ''}
    ${wrongLetters.map(letter => `<span class='letters'>${letter}</span>`)}
    `;
    figurePart.forEach((part,index) => {
        const errors = wrongLetters.length;

        if(index<errors){
            part.style.display = 'block';
        }else{
            part.style.display = 'none';
        }
    })

    if (wrongLetters.length === figurePart.length) {
        finalMessage.innerText = 'unfortunately you lost';
        popup.style.display = 'flex';
    }

}

const ShowNotification = () => {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000);
}




window.addEventListener('keyup', (e) => {
    if (e.keyCode >= 65 && e.keyCode <= 90){
        const letter = e.key;
        if (selectedWord.includes(letter)) {
            if (!correctLetters.includes(letter)){
                correctLetters.push(letter);
                displayWord();
            } else{
                ShowNotification();
            }
        }else{
            if (!wrongLetters.includes(letter)){
                wrongLetters.push(letter);

                updateWrongLettersEl();
            }else{
                ShowNotification();
            }
        }
    }
})
playAgainBtn.addEventListener('click', (e) => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    selectedWord = words[Math.floor(Math.random() * words.length)];
    displayWord()
    updateWrongLettersEl();
    popup.style.display = 'none';
})
displayWord()