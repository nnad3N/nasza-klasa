const nav = document.querySelector('.nav');
const burger = document.querySelector('.burger');
const burgerSvg = document.querySelector('.burger-svg');
const main = document.querySelector('main');
const links = nav.querySelectorAll('a');

burger.addEventListener('click', () => {
	nav.classList.toggle('nav-open');
	burger.classList.toggle('burger-active');
	main.classList.toggle('nav-open-main');
	burgerSvg.classList.toggle('burger-svg-active');
});

links.forEach((link) => {
	link.addEventListener('click', () => {
		setTimeout(() => {
			nav.classList.toggle('nav-open');
			main.classList.toggle('nav-open-main');
			burgerSvg.classList.toggle('burger-svg-active');
		}, 500);

		setTimeout(() => {
			burger.classList.toggle('burger-active');
		}, 800);
	});
});

window.addEventListener('resize', () => {
	if (window.innerWidth > 1050) {
		nav.classList.remove('nav-open');
		burger.classList.remove('burger-active');
		main.classList.remove('nav-open-main');
		burgerSvg.classList.remove('burger-svg-active');
	}
});