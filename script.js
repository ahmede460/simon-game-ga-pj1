const gameSquares = document.querySelectorAll(".square")
const startButton = document.querySelector(".start-button")
const messageElement = document.querySelector("#user-message")
const difficultyElement = document.querySelector("#difficulty")
const levelElement = document.querySelector("#level")
const easyModeButton = document.querySelector("#easy-mode-button")
const normalModeButton = document.querySelector("#normal-mode-button")
const hardModeButton = document.querySelector("#hard-mode-button")
const darkModeButton = document.querySelector("#dark-mode")
const endGameElement = document.querySelector("#end-game-overlay")
const endGameLevelElement = document.querySelector("#end-game")
const endGameSubmit = document.querySelector("#submit")
const colorBlindButton = document.querySelector("#color-blind-button")
const soundEnableDisableButton = document.querySelector("#sound-button")
const hintsButton = document.querySelector("#hints-button")
const modalCloseButton = document.querySelector(".close")
const modalText = document.querySelector("#modal-text")
const modalElement = document.querySelector("#alert-modal")
let highScores = [{
    name: "Ahmed Jaafar",
    levelReached: 1,
}]
let userChoices = []
let computerChoices = []
let lose = false
let buttonsOn = false
let soundEnabled = true
let colorBlind = false
const GAMECOLORS = ["green", "red", "yellow", "blue"]
let level = 1
let hints = 1
let numbersToAdd = 2
let gameSpeed = 1000
const audio = {
    "red": new Audio('./soundeffects/red.mp3'),
    "green": new Audio('./soundeffects/green.mp3'),
    "yellow": new Audio('./soundeffects/yellow.mp3'),
    "blue": new Audio('./soundeffects/blue.mp3')
};


addRandomNumbers()

levelElement.innerText = `Level: ${level}`


// Functions

function userPlay(event) {
    userChoices.push(event.target.id)
    animateSquare(event.target.id)
    evaluateRound()
    if(lose === true){
        messageElement.innerText = "You lost 😟"
        enableDisableGameButtons()
        endGameElement.classList.toggle("no-overlay")
        endGameLevelElement.innerText = `You've reached level ${level}`
    }
    else if (lose === false && userChoices.length === computerChoices.length){
        messageElement.innerText = "Passed the Level!! ✅"
        enableDisableGameButtons()
        levelUp()
    }

}

function animateSquare(selector){
    setTimeout(function () {
        const currentSquare = document.querySelector(`#${selector}`)
        if(soundEnabled){
        audio[`${selector}`].play()
        }
        currentSquare.classList.toggle("get-rounder")
        
        setTimeout(function () {
            currentSquare.classList.toggle("get-rounder")
        }, (gameSpeed / 2))})
    }

    function playSequence() {
        if (startButton){
            startButton.remove()
        }
        messageElement.innerText = "Simon Says!"
        let delay = gameSpeed
        for (const choice of computerChoices) {
            setTimeout(function () {
               animateSquare(choice)
            }, delay)
            delay += gameSpeed
        }
        setTimeout(function (){
            messageElement.innerText = "Your Turn! 😉"
            enableDisableGameButtons()
            buttonsOn = true        
        }, gameSpeed * (computerChoices.length + 1))

        hintsButton.addEventListener("click", playHint)
    }


    function playHintSequence() {
        if (startButton){
            startButton.remove()
        }
        messageElement.innerText = "Simon Says!"
        let delay = gameSpeed
        for (let i = userChoices.length; i < computerChoices.length; i++) {
            setTimeout(function () {
               animateSquare(computerChoices[i])
            }, delay)
            delay += gameSpeed
        }
        setTimeout(function (){
            messageElement.innerText = "Your Turn! 😉"
            enableDisableGameButtons()
            buttonsOn = true        
        }, gameSpeed * ((computerChoices.length - userChoices.length) + 1))

        hintsButton.addEventListener("click", playHint)
    }


    function evaluateRound(){
        for(i=0;i<userChoices.length;i++){
            if(userChoices[i] != computerChoices[i]){
                lose = true
            }
        }
        return lose
    }

    function levelUp(){
        level +=1
        levelElement.innerText = `Level: ${level}`
        levelElement.classList.toggle("text-grow")
        setTimeout(function () {levelElement.classList.toggle("text-grow")}, 500)
        userChoices = []
        addRandomNumbers()
        setTimeout(function (){
            playSequence()
        }, 2000)
        addHint()
        
    }

    function addRandomNumbers() {

        for (i = 0; i < numbersToAdd; i++) {
            computerChoices.push(GAMECOLORS[Math.floor(Math.random() * 3)])
        }
    
    }

    function enableDisableGameButtons(){
        if (buttonsOn){
            for (const gameSquare of gameSquares) {
                gameSquare.removeEventListener("click", userPlay)
                gameSquare.style.cursor = "not-allowed"
                hintsButton.removeEventListener("click", playHint)
                document.querySelector("#hints-button").style.cursor = "not-allowed"
            }
            buttonsOn = false
        }
        else {
            for (const gameSquare of gameSquares) {
                gameSquare.addEventListener("click", userPlay)
                gameSquare.style.cursor = "pointer"
                hintsButton.addEventListener("click", playHint)
                document.querySelector("#hints-button").style.cursor = "pointer"
                
            }
            buttonsOn = true
        }
    }

    function enableDarkMode(){
        document.querySelector("body").classList.toggle("dark-mode")
        if (document.querySelector("body").classList.contains("dark-mode")){
            darkModeButton.innerText = "Disable Dark Mode"
            document.querySelector(".modal-content").style.backgroundColor = "rgb(77, 23, 255)"
        }
        else {
            darkModeButton.innerText = "Enable Dark Mode"
            document.querySelector(".modal-content").style.backgroundColor = "#fefefe"
        }
    }

    function enableDisableSound(){
        if (soundEnabled){
            soundEnabled = false
            soundEnableDisableButton.innerText = "Enable Audio"
        }
        else {
            soundEnabled = true
            soundEnableDisableButton.innerText = "Disable Audio"
        }
    }

    function enableDisableColorBlindMode(){
        for (const gameSquare of gameSquares){
            gameSquare.classList.toggle("color-blind")
        }
        if (colorBlind){
            colorBlind = false
            colorBlindButton.innerText = "Enable Color Blind Mode"
        }
        else {
            colorBlind = true
            colorBlindButton.innerText = "Disable Color Blind Mode"}

    }

    function enableEasyMode(){
        gameSpeed = 2000
        difficultyElement.innerText = "Difficulty: Easy"
        numbersToAdd = 1
    }

    function enableNormalMode(){
        gameSpeed = 1000
        difficultyElement.innerText = "Difficulty: Normal"
        numbersToAdd = 2
    }

    function enableHardMode(){
        gameSpeed = 500
        difficultyElement.innerText = "Difficulty: Hard"
        numbersToAdd = 3
    }

    function submitName(){
        updateHighscore()
        document.querySelector("#username").value = ""
        endGameElement.classList.toggle("no-overlay")
        lose = false
        computerChoices = []
        userChoices = []
        level = 1
        hints = 1
        document.querySelector("#hints-text").innerText = `Hints: ${hints}`
        levelElement.innerText = `Level: ${level}`
        addRandomNumbers()
        playSequence()
    }


    function updateHighscore(){
        highScores.push({
            name: document.querySelector("#username").value,
            levelReached: level
        })

        sortedTop3 = highScores.sort((a, b) => b.levelReached - a.levelReached)


        document.querySelector("#high-score").innerHTML = "Top 3 High Scores"
        for (i=0;i<3;i++){
            if(sortedTop3[i]){
            newLi = document.createElement("li")
            newLi.innerText = `🔥${sortedTop3[i].name}🔥 - Level ${sortedTop3[i].levelReached}`
            document.querySelector("#high-score").appendChild(newLi)
            }
        }


    }

    function playHint(){
        if(hints > 0 && buttonsOn){
            document.querySelector("#hints-button").style.cursor = "pointer"
            enableDisableGameButtons()
            playHintSequence()
            hints -= 1
            document.querySelector("#hints-text").innerText = `Hints: ${hints}`
        }
        else if (hints === 0){

            modalOpen("You are on your own, no more hints 😟")
            
        }
        else {
            modalOpen("Press the START button to start the game 😊")
        }

    }

    function addHint(){
        if (level % 3 == 0){
            hints +=1
            document.querySelector("#hints-text").innerText = `Hints: ${hints}`
        }
    }

    function modalClose(){
        modalElement.style.display = "none"
    }

    function modalOpen(message){
        modalText.innerText = message
        modalElement.style.display = "block"

    }

    // Event Listeners
    startButton.addEventListener("click", playSequence)
    darkModeButton.addEventListener("click", enableDarkMode)
    soundEnableDisableButton.addEventListener("click", enableDisableSound)
    colorBlindButton.addEventListener("click", enableDisableColorBlindMode)
    easyModeButton.addEventListener("click", enableEasyMode)
    normalModeButton.addEventListener("click", enableNormalMode)
    hardModeButton.addEventListener("click", enableHardMode)
    endGameSubmit.addEventListener("click", submitName)
    hintsButton.addEventListener("click", playHint)
    modalCloseButton.addEventListener("click", modalClose)
    window.onclick = function(event) {
        if(event.target == modalElement){
            modalElement.style.display = "none"
        }
    }

    // Game setter

    for (const gameSquare of gameSquares) {
        gameSquare.style.cursor = "not-allowed"
    }

