const targetBox = document.getElementById('target');
const start = document.getElementById('start');
const scoreValue = document.getElementById('score-value');
const scoreBox = document.getElementById('score')
const bar = document.getElementById('bar')
const audioBGM = document.getElementById('audio-BGM');
const audioHit = document.getElementById('audio-hit');
const mute = document.getElementById('mute')

let score = 0;
let isPlaying = false;
let targetPosition = {
  row : 3,
  column : 6 
}
let timer;
let heal = 720

let isSoundOn = 1
let isSoundOnBool = true

function endgame() {
  targetBox.style.backgroundColor = ''; // Reset background color
  targetBox.style.backgroundImage = '';
  targetBox.style.gridRow = targetPosition.row //Reset location
  targetBox.style.gridColumn = targetPosition.column
  targetBox.style.display = 'none'
  start.classList.remove('disabled')
  clearInterval(timer)
  bar.style.display = 'none'

  score = 0;
  scoreValue.textContent = score;
  isPlaying = false;

  disableHardMode()
}


function isClickedBody(clickedElement) {
  if (
    clickedElement !== start && 
    clickedElement !== targetBox &&
    isPlaying &&
    score !== 0 &&
    mute !== clickedElement
  ) {
    window.alert('Game Over! : Misclicked!')
    endgame()
  }
}

const getRandomInt = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min)) + min; //최댓값은 제외, 최솟값은 포함
};

function updateTimer() {
  let percentage = timeLeft / 20
  if (percentage < 0) {
    bar.style.width = ''
    window.alert('Game Over! : Timeout')
    endgame()
  }
  timeLeft -= 10;
  bar.style.width = `${percentage}%`;
}

start.addEventListener('click', function() {
  start.classList.add('disabled')

  if (isSoundOn) {
    audioBGM.play()
  }

  if (!isPlaying) {
    timer = setInterval(updateTimer, 10);
    
    bar.style.display = 'block'

    timeLeft = 2000
    bar.style.width = `100%`
    
    isPlaying = true;
    targetBox.style.display = 'block'
    targetBox.style.gridRow = targetPosition.row //Reset location
    targetBox.style.gridColumn = targetPosition.column
    targetBox.style.backgroundColor = 'white'
    
    document.body.addEventListener('click', function(event) {
      const clickedElement = event.target;
      isClickedBody(clickedElement)
    });   
  }
});

targetBox.addEventListener('click', function() {  
  const randomX = getRandomInt(1,12);
  const randomY = getRandomInt(1,5);
  console.log('12312')
  targetBox.style.gridColumnStart = randomX  
  targetBox.style.gridRowStart = randomY   
  
  score ++
  audioHit.play();
  timeLeft += heal
  timeLeft = Math.min(timeLeft + heal, 2000);
  
  scoreValue.textContent = score
}); 

//hard mode
const background = document.querySelector('body')
const hardmodeBtn = document.getElementById('hard-mode')
let hardMode = 0;

function enableHardMode() {
  hardmodeBtn.classList.add('disabled')
  heal = 400
  bar.style.backgroundColor = '#E31837'
}

function disableHardMode() {
  hardmodeBtn.classList.remove('disabled')
  heal = 720
  bar.style.backgroundColor = '#00cc00'
}

hardmodeBtn.addEventListener('click', function(){
  hardMode += 1;
  enableHardMode()
  }
)

mute.addEventListener('click', function() {
  isSoundOn += 1
  if (isSoundOn % 2 == 0) {
    isSoundOnBool = false
    audioBGM.pause()
  } else {
    isSoundOnBool = true
    audioBGM.play() 
  }
  console.log(`sound option :${isSoundOnBool}`)
})