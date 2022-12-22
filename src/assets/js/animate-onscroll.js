gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(ScrollToPlugin);

ScrollTrigger.defaults({
    toggleActions: "restart pause resume pause",
    scroller: ".main"
});

ScrollTrigger.create({
    trigger: ".section-menu",
    start: 'top 20%',
    end: 'bottom top',
    toggleClass: "active-menu",
});
