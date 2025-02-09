let highestZ = 1;

class Draggable {
  constructor(element) {
    this.element = element;
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
    this.offsetX = 0;
    this.offsetY = 0;
    this.rotation = Math.random() * 30 - 15;
    this.init();
  }

  init() {
    this.element.addEventListener('mousedown', this.onMouseDown.bind(this));
    this.element.addEventListener('touchstart', this.onTouchStart.bind(this), { passive: false });
    this.element.style.transform = `rotateZ(${this.rotation}deg)`;
  }

  onMouseDown(e) {
    this.isDragging = true;
    this.offsetX = e.clientX - this.element.getBoundingClientRect().left;
    this.offsetY = e.clientY - this.element.getBoundingClientRect().top;
    this.element.style.zIndex = highestZ++;
    document.addEventListener('mousemove', this.onMouseMove.bind(this));
    document.addEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onTouchStart(e) {
    this.isDragging = true;
    const touch = e.touches[0];
    this.offsetX = touch.clientX - this.element.getBoundingClientRect().left;
    this.offsetY = touch.clientY - this.element.getBoundingClientRect().top;
    this.element.style.zIndex = highestZ++;
    document.addEventListener('touchmove', this.onTouchMove.bind(this), { passive: false });
    document.addEventListener('touchend', this.onTouchEnd.bind(this));
  }

  onMouseMove(e) {
    if (this.isDragging) {
      this.currentX = e.clientX - this.offsetX;
      this.currentY = e.clientY - this.offsetY;
      this.element.style.left = `${this.currentX}px`;
      this.element.style.top = `${this.currentY}px`;
    }
  }

  onTouchMove(e) {
    if (this.isDragging) {
      const touch = e.touches[0];
      this.currentX = touch.clientX - this.offsetX;
      this.currentY = touch.clientY - this.offsetY;
      this.element.style.left = `${this.currentX}px`;
      this.element.style.top = `${this.currentY}px`;
    }
  }

  onMouseUp() {
    this.isDragging = false;
    document.removeEventListener('mousemove', this.onMouseMove.bind(this));
    document.removeEventListener('mouseup', this.onMouseUp.bind(this));
  }

  onTouchEnd() {
    this.isDragging = false;
    document.removeEventListener('touchmove', this.onTouchMove.bind(this));
    document.removeEventListener('touchend', this.onTouchEnd.bind(this));
  }
}

// Initialize all papers and polaroids
const papers = document.querySelectorAll('.paper');
const polaroids = document.querySelectorAll('.polaroid');

papers.forEach(paper => new Draggable(paper));
polaroids.forEach(polaroid => new Draggable(polaroid));

// Valentine Message Logic
const yesButton = document.getElementById('yesButton');
const noButton = document.getElementById('noButton');
const emotionalMessage = document.getElementById('emotionalMessage');
const emailModal = document.getElementById('emailModal');
const valentineSong = document.getElementById('valentineSong');

yesButton.addEventListener('click', () => {
  emotionalMessage.style.display = 'none';
  emailModal.classList.remove('hidden');
  valentineSong.play();

  const message = `My Dearest Love,

Every moment with you feels like a page 
from a fairy tale. Your smile lights up 
my world, and your laughter is my 
favorite melody. I cherish...

- The way you make ordinary moments magical
- Our late-night conversations that never end
- The warmth of your hand in mine
- That special look only you give me

You're my forever and always. 

With all my heart,
Your Eternal Admirer ❤️`;

  typeMessage(message, 'typedMessage');
});

noButton.addEventListener('click', () => {
  alert("Oh no! Maybe next time? 😢");
  noButton.style.position = 'absolute';
  noButton.style.left = `${Math.random() * window.innerWidth}px`;
  noButton.style.top = `${Math.random() * window.innerHeight}px`;
});

// Email Modal Close
document.querySelector('.close-btn').addEventListener('click', () => {
  emailModal.classList.add('hidden');
});

// Hearts Animation
function createHearts() {
  const container = document.querySelector('.hearts-container');
  for (let i = 0; i < 50; i++) {
    const heart = document.createElement('div');
    heart.className = 'heart';
    heart.innerHTML = '❤';
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.animationDelay = `${Math.random() * 5}s`;
    container.appendChild(heart);
  }
}

// Typing Effect
function typeMessage(message, elementId, speed = 50) {
  let i = 0;
  const elem = document.getElementById(elementId);
  elem.innerHTML = '';

  function typeWriter() {
    if (i < message.length) {
      elem.innerHTML += message.charAt(i);
      i++;
      setTimeout(typeWriter, speed);
    }
  }

  typeWriter();
}

createHearts();
