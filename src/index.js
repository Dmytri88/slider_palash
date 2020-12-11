import  './img/1.jpg';
import  './img/2.jpg';
import  './img/3.jpg';
import  './img/4.jpg';
import  './img/5.jpg';
import  './img/6.jpg';
import  './img/7.jpg';
import  './img/8.jpg';
import './styles/main.css';

const prev = document.getElementById('btn__prev'),
	next = document.getElementById('btn__next'),
	slides = document.querySelectorAll('.slide'),
	slideContent = document.querySelector('.slider__content'),
	dots = document.querySelectorAll('.dot'),
	body = document.querySelector('body'),
	step = slides[0].clientWidth;

let counter = 0;

/*Desktop*/

const scroll = () => {
	activeDot(counter);
	setTimeout(() => {
		slideContent.style.transition = '';
	}, 500);
};

const nextSlide = () => {
	counter == slides.length - 1 ? counter = 0 : counter++;
	scroll();
};

const prevSlide = () => {
	counter == 0 ? counter = slides.length - 1 : counter--;
	scroll();
};

const activeDot = n => {
	for (let dot of dots) {
		dot.classList.remove('active');
	};
	dots[n].classList.add('active');
	slideContent.style.transition = `0.5s all ease-in-out`;
	slideContent.style.transform = `translateX(${-step*counter}px)`;
};

dots.forEach((item, indexDot) => {
	item.addEventListener('click', () => {
		counter = indexDot;
		activeDot(counter);
	});
});

next.addEventListener('click', nextSlide);
prev.addEventListener('click', prevSlide);

/*Touch*/

let start, change, touch;

slideContent.addEventListener('touchstart', e => {
	start = e.touches[0].clientX;
	start = start + step * counter;
});

slideContent.addEventListener('touchmove', e => {
	touch = e.touches[0].clientX;
	change = start - touch;
	if (change > 0) {
		slideContent.scrollLeft += slideContent.style.transform = `translateX(${-change}px)`;
	};
});



function sliderShow() {
	const move = start - (touch + step * counter);
	if (Math.abs(move) > step / 2) {
		move > 0 ? nextSlide() : prevSlide();
	}else {
		scroll();
	};
};

slideContent.addEventListener('touchend', sliderShow);

/*Keyboard arrows*/

const keySwitching = e => {
	let code = e.keyCode;
	let evt = new Event('click');
	if (code == 39) {
		nextSlide(evt);
	};
	if (code == 37) {
		prevSlide(evt);
	};
};

body.addEventListener('keydown', keySwitching);