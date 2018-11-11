window.addEventListener('load',init);

let time = 5;
let score = 0;
let isPlaying= true;

const wordInput = document.querySelector('#word-input');
const currentWord = document.querySelector('#current-word');
const scoreDisplay = document.querySelector('#score');
const timeDisplay = document.querySelector('#time');
const message = document.querySelector('#message');
const seconds = document.querySelector('#seconds');

const words = [
    "Apples",
  "Bananas",
  "Pears",
  "robot",
"inferno",
"giga",
"infinity",
"pow",
"smash",
"boom",
"crunch",
"robot",
"inferno","bad","easy","lol","Hurt","gay","code","hate","kill","ice","fire","icecream","hangman","destroy","computer","book","dictionary","technology","power","thunder","controller","dexterity","keyboard","thunderous","blizzard","hazardous","algorithm","destruction","operation","assignment","despicable"
];


function init(){
    showWord(words);

    //matching word input 
    wordInput.addEventListener('input',startMatch);

    setInterval(countdown,1000);//change time 
    setInterval(checkStatus,50);//check isPlaying or not


    

}
//Start Match 
function startMatch(){
    if(matchWords()){
        isPlaying = true;
        time = 6;
        showWord(words);
        wordInput.value = '';
        score++;
    }
    scoreDisplay.innerHTML = score;
}
function matchWords(){
    if(wordInput.value=== currentWord.innerHTML){
        message.innerHTML ='Correct!!';
        return true;
    }else{
        message.innerHTML= '';
        return false;
    }
}


function showWord(words){
     const randIndex = Math.floor(Math.random()*words.length);
     currentWord.innerHTML = words[randIndex];
}

function countdown(){
    if(time >0 ){
        time--;
    }else if(time===0){
        isPlaying =false;
    }
    //Show time 
    timeDisplay.innerHTML = time;
}

//check status 
function checkStatus(){
    if(!isPlaying && time ===0){
        message.innerHTML = 'Game Over!!!';
        score = 0;
    }
}