/* Get our Elements */
const player = document.querySelector('.player');
const playerVideo = player.querySelector('.viewer');
const playerControls = player.querySelector('.player__controls');
const progress = player.querySelector('.progress');
const progressFilled = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');


/* Build our functions */
function togglePlay() {
  const method = playerVideo.paused ? 'play' : 'pause';
  playerVideo[method]();
}

function updateButton(e) {
  const buttonText = e.type === 'play' ? '||' : '►';
  toggle.textContent = buttonText;   
}

function skip() {
  playerVideo.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate() {
  playerVideo[this.name] = this.value;
}

function progressBar(e) {
  const progressPercentage = (this.currentTime / this.duration) * 100;
  progressFilled.style.flexBasis = `${progressPercentage}%`; 
}

function scrub(e) {
  //const scrubTime = (e.offsetX / this.offsetWidth) * playerVideo.duration;
  const scrubTime = (e.offsetX / progress.offsetWidth) * playerVideo.duration;
  playerVideo.currentTime = parseFloat(scrubTime);
}

/* Hook up the events to functions */
playerVideo.addEventListener('click', togglePlay);
playerVideo.addEventListener('play', updateButton);
playerVideo.addEventListener('pause', updateButton);
toggle.addEventListener('click', togglePlay);
skipButtons.forEach(button => button.addEventListener('click', skip));
playerVideo.addEventListener('timeupdate', progressBar);
ranges.forEach(range => range.addEventListener('change',handleRangeUpdate));
ranges.forEach(range => range.addEventListener('mousemove',handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click',scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
