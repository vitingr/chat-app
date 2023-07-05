import ScrollReveal from 'scrollreveal';

const scrollReveal = () => {
    ScrollReveal().reveal('.color-menu', { delay: 125, origin: 'left', interval: 100, distance: '60px', duration: 2500 });
    ScrollReveal().reveal('.navbar', { delay: 125, origin: 'left', interval: 100, distance: '60px', duration: 1250, reset: true });
};

export default scrollReveal;

