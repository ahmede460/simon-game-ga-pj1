const gameSquares = document.querySelectorAll(".square")
const startButton = document.querySelector(".start-button")
const messageElement = document.querySelector("#user-message")
const difficultyElement = document.querySelector("#difficulty")
const levelElement = document.querySelector("#level")
const easyModeButton = document.querySelector("#easy-mode-button")
const normalModeButton = document.querySelector("#normal-mode-button")
const hardModeButton = document.querySelector("#hard-mode-button")
const darkModeButton = document.querySelector("#dark-mode")
const colorBlindButton = document.querySelector("#color-blind-button")
const soundEnableDisableButton = document.querySelector("#sound-button")
let userChoices = []
let computerChoices = []
let lose = false
let buttonsOn = false
let soundEnabled = true
let colorBlind = false
const GAMECOLORS = ["green", "red", "yellow", "blue"]
let level = 1
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
        messageElement.innerText = "You lost :(("
        enableDisableGameButtons()
    }
    else if (lose === false && userChoices.length === computerChoices.length){
        messageElement.innerText = "Passed the Level!!"
        enableDisableGameButtons()
        levelUp()
    }
    console.log(lose)
    console.log(userChoices.length)
    console.log(computerChoices.length)

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
            messageElement.innerText = "Your Turn! :)"
            enableDisableGameButtons()
            buttonsOn = true        
        }, gameSpeed * (computerChoices.length + 1))
        console.log(computerChoices)
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
            }
            buttonsOn = false
        }
        else {
            for (const gameSquare of gameSquares) {
                gameSquare.addEventListener("click", userPlay)
                gameSquare.style.cursor = "pointer"
                
            }
            buttonsOn = true
        }
    }

    function enableDarkMode(){
        document.querySelector("body").classList.toggle("dark-mode")
        if (document.querySelector("body").classList.contains("dark-mode")){
            darkModeButton.innerText = "Disable Dark Mode"
        }
        else {
            darkModeButton.innerText = "Enable Dark Mode"
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



    // Event Listeners

    startButton.addEventListener("click", playSequence)
    darkModeButton.addEventListener("click", enableDarkMode)
    soundEnableDisableButton.addEventListener("click", enableDisableSound)
    colorBlindButton.addEventListener("click", enableDisableColorBlindMode)
    easyModeButton.addEventListener("click", enableEasyMode)
    normalModeButton.addEventListener("click", enableNormalMode)
    hardModeButton.addEventListener("click", enableHardMode)

    // Game setter

    for (const gameSquare of gameSquares) {
        gameSquare.style.cursor = "not-allowed"
    }

    