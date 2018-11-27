const countdown = document.querySelector('.countdown');
//Set Launch Date
const launchDate = new Date('Dec 19,2018 13:00:00').getTime();

//Update every second
const intvl = setInterval(()=>{
    const now = new Date().getTime();
    const distance = launchDate-now;
    const days = Math.floor(distance/(1000*60*60*24));
    const hours = Math.floor((distance%(1000*60*60*24))/(1000*60*60));
    const minutes = Math.floor((distance%(1000*60*60))/(1000*60));
    const seconds =  Math.floor((distance%(1000*60))/(1000));

    //display result
    countdown.innerHTML = `
        <div>${days}<span>Days</span></div>
        <div>${hours}<span>Hours</span></div>
        <div>${minutes}<span>Minutes</span></div>
        <div>${seconds}<span>Seconds</span></div>
    `

    if(distance<0){
        clearInterval(intvl);
        countdown.style.color='#17a2b8';
        countdown.innerHTML='Launched!';
    }
},1000);