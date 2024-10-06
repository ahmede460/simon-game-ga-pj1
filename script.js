const gameSquares = document.querySelectorAll(".square")
const startButton = document.querySelector(".start-button")
const messageElement = document.querySelector("#user-message")
let userChoices = []
let computerChoices = []
let lose = false
const GAMECOLORS = ["green", "red", "yellow", "blue"]
level = 1

function addRandomNumbers() {

    for (i = 0; i < 3; i++) {
        computerChoices.push(GAMECOLORS[Math.floor(Math.random() * 3)])
    }

}

addRandomNumbers()

function userPlay(event) {
    userChoices.push(event.target.id)
    animateSquare(event.target.id)
    evaluateRound()
    if(lose === true){
        messageElement.innerText = "You lost :(("
    }
    else if (lose === false && userChoices.length === computerChoices.length){
        messageElement.innerText = "Passed the Level!!"
    }
    console.log(lose)
    console.log(userChoices.length)
    console.log(computerChoices.length)

}

function evaluateRound(){
    for(i=0;i<userChoices.length;i++){
        if(userChoices[i] != computerChoices[i]){
            lose = true
        }
    }
    return lose
}


for (const gameSquare of gameSquares) {
    gameSquare.addEventListener("click", userPlay)
}

startButton.addEventListener("click", playSequence)

function playSequence() {
    messageElement.innerText = "Simon Says!"
    let delay = 0
    for (const choice of computerChoices) {
        setTimeout(function () {
           animateSquare(choice)
        }, delay)
        delay += 1000
    }
    setTimeout(function (){
        messageElement.innerText = "Your Turn! :)"
    }, 1000 * computerChoices.length)
    console.log(computerChoices)
}

function animateSquare(selector){
    setTimeout(function () {
        const currentSquare = document.querySelector(`#${selector}`)
        currentSquare.classList.toggle("get-rounder")
        setTimeout(function () {
            currentSquare.classList.toggle("get-rounder")
        }, 500)})
    }

