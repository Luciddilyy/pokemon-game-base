const body = document.querySelector('body');
const game = document.querySelector('.game');
const count = document.querySelector('h1');
const reset = document.querySelector('#reset');
const ash = document.querySelector('#ash');
const charmander = document.querySelector('#charmander');
const pikachu = document.querySelector('#pikachu');
const zoombat = document.querySelector('#zoombat');
const audio = document.querySelector('audio');
const musicControl = document.querySelector('.music-control');



// set found pokemon to false so they don't follow ash at the start
let findCharmander = false;
let findPikachu = false;
let findZoombat = false;



//audio controller
audio.volume = 0.1;
musicControl.addEventListener('click', (event) => {
    event.stopPropagation();
    event.target.src = `!${event.target.src}`.includes('on.png') ? '../assets/icons/off.png' : '../assets/icons/on.png';
    `${event.target.src}`.includes('on.png') ? audio.play() : audio.pause();
});



//reset handler
reset.addEventListener('click', (event) => {
    window.location.reload();
    reset.style.display = 'none';
});



// cleans scene and shows game over screen
function clearCharactersAndFinishGame() {
    ash.style.display = 'none';
    charmander.style.display = 'none';
    pikachu.style.display = 'none';
    zoombat.style.display = 'none';
    reset.style.display = 'block';
    audio.pause();
    count.textContent = '';
}



let currentCount = 60;
const interval = setInterval(() => {
    if (currentCount <= 0) {
        game.style.backgroundImage = 'url("../assets/game-over.jpg")';
        clearCharactersAndFinishGame();
        clearInterval(interval);
        return;
    }
    currentCount--;
    count.textContent = currentCount;
}, 1000);



function finishGame() {
    if (findCharmander && findPikachu && findZoombat) {
        const timeOut = setTimeout(() => {
            game.style.backgroundImage = 'url("../assets/winner.jpg")';
            clearInterval(interval);
            audio.pause();
            clearCharactersAndFinishGame();
        }, 800);
    }
}



//colision detection ash
function getRightPosition() {
    return parseInt(ash.style.right.split("px")) || 2;
};

function getTopPosition() {
    return parseInt(ash.style.top.split("px")) || 2;
};



function verifyLookPokemon(to) {
    // PROCURAR COMO TROCAR O ARROW* por um ENUM.... EXISTE UM CODE ANMSI para a teclas
    1 = ARROWLERT

    finishGame();

    //find pokemon 
    const pokemonRightPosition = to === Enumerator.key =  'ArrowLeft' ? `${getRightPosition() - 64}px` : `${getRightPosition() + 64}px`

    if (findCharmander) {
        const newTopPosition = to === 'ArrowUp' ? `${getTopPosition() + 8}px` : `${getTopPosition() - 8}px`;
        charmander.style.top = newTopPosition;
        charmander.style.right = pokemonRightPosition;
    };
    if (findPikachu) {
        const newTopPosition = to === 'ArrowUp' ? `${getTopPosition() + 36}px` : `${getTopPosition() - 36}px`;
        pikachu.style.top = newTopPosition;
        pikachu.style.right = pokemonRightPosition;
    };
    if (findZoombat) {
        const newTopPosition = to === 'ArrowUp' ? `${getTopPosition() + 72}px` : `${getTopPosition() - 72}px`;
        zoombat.style.top = newTopPosition;
        zoombat.style.right = pokemonRightPosition;
    };



    // position verification for pokemon / ash
    if (getTopPosition() >= 2 && getTopPosition() <= 98 && getRightPosition() >= 130 && getRightPosition() <= 216) {
        charmander.style.display = 'block';
        findCharmander = true;
        return;
    };

    if (getTopPosition() >= 474 && getTopPosition() <= 594 && getRightPosition() <= 138 && getRightPosition() >= 42) {
        zoombat.style.display = 'block';
        findZoombat = true;
        return;
    };
    if (getTopPosition() >= 266 && getTopPosition() <= 394 && getRightPosition() >= 546 && getRightPosition() <= 650) {
        pikachu.style.display = 'block';
        findPikachu = true;
        return;
    };
};



// movement controller for ash
body.addEventListener('keydown', (event) => {
    event.stopPropagation();
    console.log(event.code);
    switch (event.code) {
        case 'ArrowLeft':
            if (getRightPosition() < 770) {
                ash.style.right = `${getRightPosition() + 8}px`;
                ash.src = "../assets/ash-left.png";
            };
            break;
        case 'ArrowRight':
            if (getRightPosition() > 2) {
                ash.style.right = `${getRightPosition() - 8}px`;
                ash.src = "../assets/ash-right.png";
            };
            break;
        case 'ArrowUp':
            if (getTopPosition() > 2) {
                ash.style.top = `${getTopPosition() - 8}px`;
                ash.src = "../assets/ash-up.png";
            };
            break;
        case 'ArrowDown':
            if (getTopPosition() < 625) {
                ash.style.top = `${getTopPosition() + 8}px`;
                ash.src = '../assets/ash-down.png';
            };
            break;
    };
    verifyLookPokemon(event.code);
});