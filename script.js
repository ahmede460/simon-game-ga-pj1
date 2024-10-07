const gameSquares = document.querySelectorAll(".square")
const startButton = document.querySelector(".start-button")
const messageElement = document.querySelector("#user-message")
const levelElement = document.querySelector("#level")
let userChoices = []
let computerChoices = []
let lose = false
const GAMECOLORS = ["green", "red", "yellow", "blue"]
let level = 1
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
    }
    else if (lose === false && userChoices.length === computerChoices.length){
        messageElement.innerText = "Passed the Level!!"
        levelUp()
    }
    console.log(lose)
    console.log(userChoices.length)
    console.log(computerChoices.length)

}

function animateSquare(selector){
    setTimeout(function () {
        const currentSquare = document.querySelector(`#${selector}`)
        audio[`${selector}`].play()
        currentSquare.classList.toggle("get-rounder")
        
        setTimeout(function () {
            currentSquare.classList.toggle("get-rounder")
        }, 500)})
    }

    function playSequence() {
        if (startButton){
            startButton.remove()
        }

        messageElement.innerText = "Simon Says!"
        let delay = 1000
        for (const choice of computerChoices) {
            setTimeout(function () {
               animateSquare(choice)
            }, delay)
            delay += 1000
        }
        setTimeout(function (){
            messageElement.innerText = "Your Turn! :)"
        }, 1000 * (computerChoices.length + 1))
        console.log(computerChoices)
        for(const gameSquare of gameSquares){
            gameSquare.style.cursor = "pointer"
        }
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

        for (i = 0; i < 1; i++) {
            computerChoices.push(GAMECOLORS[Math.floor(Math.random() * 3)])
        }
    
    }


    // Event Listeners

    for (const gameSquare of gameSquares) {
        gameSquare.addEventListener("click", userPlay)
    }
    
    startButton.addEventListener("click", playSequence)