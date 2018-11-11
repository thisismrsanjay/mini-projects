const synth = window.speechSynthesis;


const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
const body = document.querySelector('body');

let voices = [];
const getVoices  =() =>{
    voices= synth.getVoices();
    //loop through voices and create an option for each one
    voices.forEach(voice=>{
        //create and fill option element with voice and language 
        const option = document.createElement('option');
        option.textContent = voice.name + '(' +voice.lang +')';
        

        option.setAttribute('data-lang',voice.lang);
        option.setAttribute('data-name',voice.name);
        voiceSelect.appendChild(option);

    })
}

getVoices();
if(synth.onvoiceschanged !== undefined){
    synth.onvoiceschanged =getVoices;
}

//speak 

const speak =()=>{
    //Add background animation
    

    if(synth.speaking){
        console.error('Already speaking...');
        return; 
    }
    if(textInput.value !=''){

        body.classList.add('background');


        const speakText = new SpeechSynthesisUtterance(textInput.value);
        speakText.onend = e=>{
            body.classList.remove('background');
            console.log('Done speaking...');
        } 

        speakText.onerror = e=> {
            console.error('Something went wrong');
        }

        //Selected voice 
        const selectedVoice  =voiceSelect.selectedOptions[0].getAttribute('data-name');
        //loop through voices 
        voices.forEach(voice=>{
            if(voice.name === selectedVoice){
                speakText.voice= voice;
            }
        });
        //set pitch and rate 
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak 
        synth.speak(speakText);
    }
}

//Event listeners 
textForm.addEventListener('submit',e=>{
    e.preventDefault();
    speak();
    textInput.blur();
})

//Rate value change 
rate.addEventListener('change',e=>rateValue.textContent= rate.value)


//Pitch value change 
pitch.addEventListener('change',e=>pitchValue.textContent= pitch.value);

//voice select change 
voiceSelect.addEventListener('change', e=> speak)