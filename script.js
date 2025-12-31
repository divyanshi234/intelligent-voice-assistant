
// elements
const startBtn = document.querySelector('#start');
const stopBtn = document.querySelector('#stop');
const speakBtn = document.querySelector('#speak');
const timedate = document.getElementById('time');
const battery  = document.querySelector('#Battery');
const internet = document.querySelector('#internet');
const turn_off  = document.querySelector('#turn_on')
const trun_on  = document.querySelector('#j_intro')
const messagesContainer = document.querySelector('.messages');
document.querySelector('#start_jarvis_btn').addEventListener('click',()=>{
recognition.start();
console.log('suno toh')
})

// j_intro
// speech recognition setup
const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();


// Function to add user message
function addUserMessage(text) {
    const p = document.createElement('p');
    p.classList.add('usermsg'); // CSS class apply
    p.textContent = text;       // message text
    messagesContainer.appendChild(p);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // auto scroll
}

// Function to add Siri message
function addSiriMessage(text) {
    const p = document.createElement('p');
    p.classList.add('jmsg'); // CSS class apply
    p.textContent = text;     // message text
    messagesContainer.appendChild(p);
    messagesContainer.scrollTop = messagesContainer.scrollHeight; // auto scroll
}


// sr start
recognition.onstart = function() {
    console.log("VR active");
};
// sr result
recognition.onresult= function(event){
//    console.log(event)
    let current =event.resultIndex;
    let transcript= event.results[current][0].transcript;
    transcript = transcript.toLowerCase();
    console.log(`user said: ${transcript}`)
     addUserMessage(transcript)
    if(transcript.includes("hello siri")){
       addSiriMessage("Hello mam");
        readOut("hello mam")
    }
    if(transcript.includes("siri how are you")){
        addSiriMessage("Hello mam, I am fine. What about you?");
        readOut("hello mam i am fine what about you")
    }
    if(transcript.includes('open youtube')){
         addSiriMessage("Opening YouTube...");
         readOut("opening youtube mam")
         window.open("https://www.youtube.com/")
    }
    
   
  if(transcript.includes('open google')){
         addSiriMessage("opening google mam");
         readOut("opening google mam")
         window.open("https://www.google.com/")
    }

     if(transcript.includes('open firebase') || transcript.includes('open fire base')){
         addSiriMessage("open firebase");
         readOut("opening firebase mam")
         window.open("https://console.firebase.google.com/")
    }
    



if (transcript.includes("search for")) {
    let input = transcript.split("search for")[1].trim(); // input define pehle
    addSiriMessage(`Searching for: ${input}`);            // phir use
    readOut("Here's the result");
    input = input.replace(/\s+/g, '+');                  // spaces replace
    console.log(input);
    window.open(`https://www.google.com/search?q=${input}`, '_blank');
}



    // YouTube search command
    if(transcript.includes("search youtube for")) {
        let input = transcript.split("search for")[1].trim();
        addSiriMessage(`Searching for: ${input}`);
        readOut("Here’s the result on YouTube");

        // extract song name after 'search youtube for'
        let songName = transcript.split("search youtube for")[1].trim();

        // replace spaces with +
        songName = songName.replace(/\s+/g, '+');

        console.log("YouTube search query:", songName);

        // open YouTube search results
        const url = `https://www.youtube.com/results?search_query=${songName}`;
        window.open(url, '_blank'); // new tab me open
    }
//github setup
if(transcript.includes("open github")){
    addSiriMessage("Opening github");
  readOut("opening github sir")
  window.open("https://github.com/divyanshi234")
}

if(transcript.includes("open my github profile")){
  addSiriMessage("Opening github profile");
  readOut("opening youtube github sir")
  window.open("https://github.com/")
}

if (transcript.includes("what time is it") || transcript.includes("tell me the time")) {
    const time = new Date().toLocaleTimeString();
    addSiriMessage(`The current time is ${time}`);
    readOut(`The current time is ${time}`);
}

if (transcript.includes("what is today's date") || transcript.includes("tell me the date")) {
    const date = new Date().toLocaleDateString();
    addSiriMessage(`Today's date is ${date}`);
    readOut(`Today's date is ${date}`);
}

if (transcript.includes("check battery")) {
    addSiriMessage(`Battery level is ${battery.textContent}`);
    readOut(`Your device battery is at ${battery.textContent}`);
}

if (transcript.includes("check internet")) {
    const status = navigator.onLine ? "online" : "offline";
    addSiriMessage(`Internet status: ${status}`);
    readOut(`You are currently ${status}`);
}


}
// sr stop
recognition.onend = function() {
   
    console.log("VR stop");
};

// recognition.continuous =true;
startBtn.addEventListener('click', () => {
    recognition.start();
});

stopBtn.addEventListener('click', () => {
    recognition.stop();
});

// shophia speak
// Global voices variable
let allVoices = [];

// Wait for voices to load properly
speechSynthesis.onvoiceschanged = () => {
  allVoices = speechSynthesis.getVoices();
  console.log("Voices loaded:", allVoices);
};

// ReadOut Function (fixed)
function readOut(message) {
  
  
  const speech = new SpeechSynthesisUtterance(message);

  // Ensure voices are loaded
  if (!allVoices.length) {
    allVoices = speechSynthesis.getVoices();
  }

  // Try to select a female voice (like "Google UK English Female" or similar)
  let femaleVoice =
    allVoices.find(
      (v) =>
        v.name.toLowerCase().includes("female") ||
        v.name.toLowerCase().includes("woman") ||
        v.name.toLowerCase().includes("uk english female")
    ) || allVoices[0];

  speech.voice = femaleVoice;
  speech.volume = 1;
  speech.rate = 1;
  speech.pitch = 1;
  speech.onend = () => {
      console.log("Speech finished:", message);
      resolve();
    };

  window.speechSynthesis.cancel(); // stop any previous voice
  window.speechSynthesis.speak(speech);
  console.log("Speaking:", message);
}



// --------------weather related infomation write here-----------------
//weather function
function weather(location) {
  const weatherCont = document.querySelector(".temp").querySelectorAll("*");

  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=48ddfe8c9cf29f95b7d0e54d6e171008`;
  const xhr = new XMLHttpRequest();
  xhr.open("GET", url, true);
  xhr.onload = function () {
    if (this.status === 200) {
      let data = JSON.parse(this.responseText);
      weatherCont[0].textContent = `Location : ${data.name}`;
      weatherCont[1].textContent = `Country : ${data.sys.country}`;
      weatherCont[2].textContent = `Weather type : ${data.weather[0].main}`;
      weatherCont[3].textContent = `Weather description : ${data.weather[0].description}`;
      weatherCont[4].src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
      weatherCont[5].textContent = `Original Temperature : ${ktc(
        data.main.temp
      )}`;
      weatherCont[6].textContent = `feels like ${ktc(data.main.feels_like)}`;
      weatherCont[7].textContent = `Min temperature ${ktc(data.main.temp_min)}`;
      weatherCont[8].textContent = `Max temperature ${ktc(data.main.temp_max)}`;
      weatherStatement = `sir the weather in ${data.name} is ${
        data.weather[0].description
      } and the temperature feels like ${ktc(data.main.feels_like)}`;
    } else {
      weatherCont[0].textContent = "Weather Info Not Found";
    }
  };

  xhr.send();
}
function ktc(k) {
  k = k - 273.15;
  return k.toFixed(2);
}
 weather("Noida")


 // a webpage logged in  logged in info
 
// ---------------jarvis setup---------------

if(localStorage.getItem("jarvis_setup") !== null){
  weather(JSON.parse(localStorage.getItem("jarvis_setup")).location)
}

// jarvis infomation setup
const setup =document.querySelector(".jarvis_setup")
setup.style.display="none"
if(localStorage.getItem("jarvis_setup") === null){
  setup.style.display="flex"
  setup.querySelector("button").addEventListener("click",userInfo)
}
// userinfo func
function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("input")[0].value,
    bio: setup.querySelectorAll("input")[1].value,
    location: setup.querySelectorAll("input")[2].value,
    instagram: setup.querySelectorAll("input")[3].value,
    twitter: setup.querySelectorAll("input")[4].value,
    github: setup.querySelectorAll("input")[5].value,
  };

  let testArr = []

  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });

if (testArr.includes("")) {
    readOut("Mam, please fill out all your information.");
  } else {
    localStorage.setItem("jarvis_setup", JSON.stringify(setupInfo));
    setup.style.display = "none";
    readOut("Thank you mam, your information has been saved.");
displayUserInfo(setupInfo);

 
  }
}


function displayUserInfo(user) {
  const userIntro = document.querySelector(".User_intro");
  userIntro.innerHTML = `
    <h3> ${user.name}!</h3>
    <p> ${user.bio}</p>
    <p> ${user.location}</p>
    
  `;
}

window.addEventListener("DOMContentLoaded", () => {
  const savedData = localStorage.getItem("jarvis_setup");
  if (savedData) {
    const user = JSON.parse(savedData);
    displayUserInfo(user);
  }
});
`1  `
// here we are set FILL YOUR PERSONAL INFORMATION hidden or display
const personalInfo=document.querySelector('.profile')
personalInfo.addEventListener('click',()=>{
  setup.style.display='block';
})

personalInfo.addEventListener('click', () => {
  setup.style.display = 'flex';
});

// Agar aap cross button add karoge
const crossBtn = setup.querySelector(".cross");
crossBtn.addEventListener('click', () => {
  setup.style.display = 'none';
});
window.addEventListener('DOMContentLoaded', () => {
    const setup = document.querySelector(".jarvis_setup");

    // Force hide on page load
    setup.style.display = 'none';
});

function autoJarvis(){
  setTimeout(()=>{
    recognition.start()
  },1000);
}

// -----------------weather related infomation finish ---------------------
//here we are write function siri introduction 

// -----------------we are fix here Date--------------
 
  window.onload = () => {

 
   readOut(" ")
   trun_on.play()
  trun_on.addEventListener("ended", ()=>{ 
       addSiriMessage('Hello mam, I’m Siri — your personal intelligent assistant. I’m designed to make your digital life easier, faster, and smarter. I can understand your voice commands, open your favorite apps, tell you the latest weather, news, and time, and even help you stay organized. I constantly learn and adapt to your preferences, so the more you talk to me, the better I become. Ready to assist you anytime, anywhere — I’m Siri, always at your service.')
   readOut('Hello mam, I’m Siri — your personal intelligent assistant. I’m designed to make your digital life easier, faster, and smarter. I can understand your voice commands, open your favorite apps, tell you the latest weather, news, and time, and even help you stay organized. I constantly learn and adapt to your preferences, so the more you talk to me, the better I become. Ready to assist you anytime, anywhere — I’m Siri, always at your service.')
     setTimeout(()=>{
        autoJarvis();
      readOut("Ready TO Go sir")
      if(localStorage.getItem("jarvis_setup") === null){
        readOut("Sir,Kindly Fill Out the form")
      }
    },26440);
  });

  

   setInterval(() =>{
     let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
  timedate.textContent = `${hrs}:${mins}:${secs}`;
  
   },1000)

   //battery setup
   let batteryPromise = navigator.getBattery();
   batteryPromise.then(batteryCallback)
   function batteryCallback(batteryObject){
    printBatteryStatus(batteryObject)
    setInterval(()=>{
    printBatteryStatus(batteryObject)
    },5000);
   }

   function printBatteryStatus(batteryObject){
     const batteryLevel = (batteryObject.level * 100).toFixed(0); // 👈 rounds to whole number
      battery.textContent = `${batteryLevel}%`;
     
   }
   navigator.onLine?(internet.textContent="online"):internet.textContent="offline"

  };




  const commandsDiv = document.getElementById("commandsDiv");
const commandIcon = document.getElementById("commandIcon");
const closeCmd = document.getElementById("closeCmd");

// Show commands div on image click
commandIcon.addEventListener("click", () => {
  commandsDiv.style.display = "block";
});

// Hide commands div on cross click
closeCmd.addEventListener("click", () => {
  commandsDiv.style.display = "none";
});






