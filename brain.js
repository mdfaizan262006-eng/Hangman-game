const words = ["APPLE", "ORANGE", "BANANA", "MANGO", "GRAPES", "PENCIL", "ERASER", "SCHOOL", "TEACHER", "STUDENT", "COMPUTER", "KEYBOARD", "MONITOR", "MOUSE", "LAPTOP", "INTERNET", "WEBSITE", "JAVASCRIPT", "PYTHON", "PROGRAMMING", "ALGORITHM", "DATABASE", "ELEPHANT", "GIRAFFE", "TIGER", "LION", "MONKEY", "DOLPHIN", "WHALE", "PENGUIN", "CRICKET", "FOOTBALL", "BASEBALL", "BADMINTON", "HOCKEY", "TENNIS", "VOLLEYBALL", "SWIMMING", "MOUNTAIN", "RIVER", "OCEAN", "DESERT", "FOREST", "ISLAND", "COUNTRY", "VILLAGE", "AIRPLANE", "HELICOPTER", "BICYCLE", "MOTORCYCLE", "ROCKET", "SATELLITE", "ASTRONAUT", "GALAXY", "UNIVERSE", "KNOWLEDGE", "EDUCATION", "CREATIVITY", "ADVENTURE", "CHALLENGE", "MYSTERY", "TREASURE", "DIAMOND", "CHOCOLATE", "HOSPITAL", "ENGINEER", "SCIENTIST", "ARCHITECT", "POLITICIAN", "PHOTOGRAPHER", "MICROSCOPE", "TELESCOPE", "CHEMISTRY", "PHYSICS", "MATHEMATICS","REACT", "NODEJS", "FRONTEND", "BACKEND", "DEBUGGING", "FUNCTION", "VARIABLE", "COMPILER", "GITHUB", "LEETCODE"];
let blanks = document.querySelector(".blanks")
let randomword

let container = document.querySelector(".container")
blankgenerate()
function blankgenerate() {
    let idx = Math.floor(Math.random() * words.length)
    randomword = words[idx]
    for (let ch of randomword) {
        let sp = document.createElement("span")
        sp.textContent = "_"
        blanks.appendChild(sp)
    }
}

let alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
let guessarea = document.querySelector(".guessarea")
let guessword = document.querySelector(".guessword")

for (let letter of alphabets) {
    let btn = document.createElement("button")
    btn.classList.add("alpha-btns")
    btn.textContent = letter;
    guessword.appendChild(btn)

}

let guessedletters = document.getElementsByClassName("alpha-btns")
for (let presslet of guessedletters) {
    presslet.addEventListener("click", () => {
        let pressedletter = presslet.textContent
        presslet.disabled = true
        handleguess(pressedletter)
    })
}

let lives = document.querySelector(".lives")
let live = 5
lives.textContent = "❤️".repeat(live)
let msg = document.querySelector(".message")

function handleguess(char){
    if (live === 0) return
    if (randomword.includes(char)) {
        for (let i in randomword) {
            if (randomword[i] === char) {
                blanks.children[i].textContent = char;
            }
        }
        checkwin()
    }
    else {
        live--;
        lives.textContent = "❤️".repeat(live)
        if (live === 0) {
            setgame()
            msg.innerHTML = `You Lose<br>
            WORD : ${randomword}<br>
            <div class="reset-game"><button> Play Again</button></div>`
            let resbtn = document.querySelector(".reset-game")
            resbtn.addEventListener("click", restartgm)
        }
    }
}
function checkwin() {
    let guessword=""
    for(let span of blanks.children){
        guessword+=span.textContent
    }
    if (guessword === randomword) {
        setgame()
        msg.innerHTML = `🥳Yay You Win🥳
        <div class="reset-game"><button>Play Again</button></div>`
        let restartbtn = document.querySelector(".reset-game button")
        restartbtn.addEventListener("click", restartgm)
    }
}
function setgame() {
    container.style.filter = "blur(10px)"
    container.style.pointerEvents = "none"
    msg.style.display = "block"
}
function restartgm(){
    blanks.textContent = ""
    msg.innerHTML = ""
    msg.style.display="none"
    live = 5
    lives.textContent = "❤️".repeat(live)
    container.style.filter = "none"
    container.style.pointerEvents = "auto"
    for (let presslet of guessedletters) {
        presslet.disabled = false
    }
    blankgenerate();
}