
const langWrapper = document.querySelector('.header__lang');
const langSelected = document.querySelector('.header__lang-selected');
const langLinks = document.querySelectorAll('.header__lang-select');
langSelected.addEventListener('click', (e) => {
    e.stopPropagation();
    langWrapper.classList.toggle('active');
});
langLinks.forEach(link => {
    link.addEventListener('click', () => {
        langWrapper.classList.remove('active');
    });
});
document.addEventListener('click', (e) => {
    if (!langWrapper.contains(e.target)) {
        langWrapper.classList.remove('active');
    }
});

document.addEventListener('DOMContentLoaded', () => {
    gsap.registerPlugin(ScrollTrigger);

    const mainTl = gsap.timeline({ defaults: { ease: "power4.out" } });

    gsap.from(".hero__banner", {
        scrollTrigger: {
            trigger: ".hero__banner",
            start: "top 95%",
            toggleActions: "play none none none"
        },
        y: 100,
        opacity: 0,
        duration: 1.5
    });

    mainTl.from(".hero__title", { y: 60, opacity: 0, duration: 1 })
          .from(".hero__btn", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
          .addLabel("startImages", "-=0.4");

    document.querySelectorAll('.hero__image').forEach((heroBlock) => {
        const center = heroBlock.querySelector('.hero__image-center');
        const backgrounds = heroBlock.querySelectorAll('.hero__image-bg img');

        mainTl.from(center, {
            scale: 0,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.5)"
        }, "startImages");

        mainTl.from(backgrounds, {
            x: () => gsap.utils.random(-120, 120),
            y: () => gsap.utils.random(-120, 120),
            rotation: () => gsap.utils.random(-60, 60),
            opacity: 0,
            duration: 1.3,
            stagger: 0.05,
            ease: "power3.out"
        }, "startImages+=0.3");
    });

    gsap.to(".hero__image-message img", {
        rotation: 360,
        duration: 12,
        repeat: -1,
        ease: "none"
    });

    const heroInner = document.querySelector('.hero__inner');
    const allBgs = document.querySelectorAll('.hero__image-bg img');

    allBgs.forEach(el => {
        el.dataset.speedX = gsap.utils.random(-60, 60);
        el.dataset.speedY = gsap.utils.random(-60, 60);
    });

    if (heroInner) {
        heroInner.addEventListener('mousemove', (e) => {
            const xPos = (e.clientX / window.innerWidth - 0.5);
            const yPos = (e.clientY / window.innerHeight - 0.5);

            allBgs.forEach(el => {
                gsap.to(el, {
                    x: xPos * el.dataset.speedX,
                    y: yPos * el.dataset.speedY,
                    duration: 1.2,
                    ease: "power2.out"
                });
            });
            gsap.to(".hero__image-center", { x: xPos * -25, y: yPos * -25, duration: 1 });
        });
    }

    document.querySelectorAll('.hero__image').forEach(block => {
        const centerImg = block.querySelector('.hero__image-center');

        block.addEventListener('mouseenter', () => {
            gsap.to(centerImg, { 
                rotation: () => gsap.utils.random(-15, 15), 
                scale: 1.15, 
                duration: 0.5, 
                ease: "back.out(1.7)",
                overwrite: true
            });
        });

        block.addEventListener('mouseleave', () => {
            gsap.to(centerImg, { rotation: 0, scale: 1, duration: 0.5, ease: "power2.out" });
        });
    });

    const bestProdTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".bestprod",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    bestProdTl.from(".bestprod__title", { y: 60, opacity: 0, duration: 1 })
              .from(".bestprod__descr", { y: 40, opacity: 0, duration: 1 }, "-=0.7")
              .from(".bestprod__btn", { y: 20, opacity: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.7");

    gsap.from(".advantages__info-title", {
        scrollTrigger: {
            trigger: ".advantages__info",
            start: "top 85%",
            toggleActions: "play none none none"
        },
        x: (index) => (index % 2 === 0 ? -50 : 50),
        opacity: 0,
        duration: 1,
        stagger: 0.2
    });

    document.querySelectorAll('.advantages__info-title').forEach(item => {
        const icon = item.querySelector('.advantages__info-icon img');
        item.addEventListener('mouseenter', () => {
            gsap.to(icon, { scale: 1.2, duration: 0.4, ease: "back.out(2)" });
            gsap.to(item, { x: 10, duration: 0.4 });
        });
        item.addEventListener('mouseleave', () => {
            gsap.to(icon, { rotation: 0, scale: 1, duration: 0.4 });
            gsap.to(item, { x: 0, duration: 0.4 });
        });
    });

    const initAdvantagesAnimation = () => {
        let mm = gsap.matchMedia();
        mm.add("(min-width: 768px)", () => {
            const advItems = gsap.utils.toArray('.advantages__item');
            advItems.forEach((item, i) => {
                const title = item.querySelector('.advantages__item-title');
                const contentToHide = item.querySelectorAll('.advantages__item-descr, .advantages__item-btn, .advantages__item-image');

                if (i !== advItems.length - 1) {
                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: item,
                            start: "top top",
                            end: "bottom top",
                            scrub: true,
                            pin: true,
                            pinSpacing: false,
                            invalidateOnRefresh: true
                        }
                    });

                    tl.to(title, { y: -100, duration: 1 }, 0)
                    .to(contentToHide, { opacity: 0, y: -20, pointerEvents: 'none', duration: 0.5 }, 0);
                }

                gsap.from(item.querySelectorAll('.advantages__item-title, .advantages__item-descr, .advantages__item-btn'), {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 80%",
                        toggleActions: "play none none reverse"
                    },
                    x: -50,
                    opacity: 0,
                    duration: 0.8,
                    stagger: 0.15
                });
            });
        });

        mm.add("(max-width: 767px)", () => {
            const advItems = gsap.utils.toArray('.advantages__item');
            
            advItems.forEach((item) => {
                gsap.from(item, {
                    scrollTrigger: {
                        trigger: item,
                        start: "top 85%",
                        toggleActions: "play none none reverse"
                    },
                    y: 60,
                    opacity: 0,
                    duration: 1,
                    ease: "power2.out"
                });
            });
        });
    };
    initAdvantagesAnimation();

    const chooseSections = document.querySelectorAll('.choose');

    chooseSections.forEach((section) => {
        const titleSpans = section.querySelectorAll('.choose__title span');
        titleSpans.forEach(span => {
            const text = span.textContent.trim();
            span.innerHTML = text.split('').map(char => 
                `<span class="letter" style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
            ).join('');
        });
        const chooseTl = gsap.timeline({
            scrollTrigger: {
                trigger: section,
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });
        const allLetters = section.querySelectorAll('.letter');
        chooseTl
            .from(allLetters, {
                opacity: 0,
                y: 20,
                rotateX: -90,
                stagger: 0.03,
                duration: 0.6,
                ease: "power2.out"
            })
            .from(section.querySelector(".choose__slider"), { 
                y: 60,
                opacity: 0, 
                duration: 1 
            }, "-=0.4")
            .from(section.querySelector(".choose__slide-btn"), { 
                y: 30, 
                opacity: 0, 
                duration: 0.8, 
                ease: "back.out(1.7)" 
            }, "-=0.6");
    });

    document.querySelectorAll('.choose__slide').forEach(slide => {
        slide.addEventListener('mousemove', (e) => {
            const img = slide.querySelector('.choose__slide-image > img');
            const rect = slide.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            gsap.to(img, { x: x * 20, y: y * 20, duration: 1 });
        });
    });

    ScrollTrigger.create({
        trigger: ".wherebuy",
        start: "top 80%",
        onEnter: () => document.querySelector(".wherebuy").classList.add("showed"),
        once: true
    });

    const followsTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".follows",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    followsTl.from(".follows__start", { scale: 0, opacity: 0, duration: 1, ease: "back.out(1.7)" })
              .from(".follows__title", { y: 40, opacity: 0, duration: 0.8 }, "-=0.6")
              .from(".follows__slide", { y: 60, scale: 0.8, opacity: 0, duration: 1.2, stagger: 0.15 }, "-=0.4");


    const whereBuyTl = gsap.timeline({
        scrollTrigger: {
            trigger: ".wherebuy",
            start: "top 80%",
            toggleActions: "play none none none"
        }
    });

    whereBuyTl.from(".wherebuy__title mark", { x: -50, opacity: 0, duration: 1 })
              .from(".wherebuy__title span", { x: 50, opacity: 0, duration: 1 }, "-=0.8")
              .from(".wherebuy__item", { scale: 0.5, opacity: 0, duration: 0.8, stagger: { amount: 0.6, grid: "auto", from: "center" }, ease: "back.out(1.7)" }, "-=0.5");

    document.querySelectorAll('.wherebuy__item').forEach(item => {
        item.addEventListener('mouseenter', () => gsap.to(item, { y: -10, scale: 1.05, boxShadow: "0 10px 20px rgba(0,0,0,0.1)", duration: 0.3 }));
        item.addEventListener('mouseleave', () => gsap.to(item, { y: 0, scale: 1, boxShadow: "0 0px 0px rgba(0,0,0,0)", duration: 0.3 }));
    });

    const footerTitle = document.querySelector('.footer__top-title');
    if (footerTitle) {
        footerTitle.innerHTML = footerTitle.textContent.trim().split('').map(char => 
            `<span style="display:inline-block;">${char === ' ' ? '&nbsp;' : char}</span>`
        ).join('');
        
        const footerTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".footer__top",
                start: "top 80%",
                toggleActions: "play none none none"
            }
        });

        footerTl.from(".footer__top-title span", { opacity: 0, y: 20, stagger: 0.05, duration: 0.5 })
                .from(".footer__top-icon", { scale: 0, opacity: 0, y: 50, rotation: () => gsap.utils.random(-30, 30), stagger: 0.1, duration: 0.8, ease: "back.out(1.7)" }, "-=0.3");
    }

    document.querySelectorAll('.footer__top-icon').forEach(icon => {
        const img = icon.querySelector('img');
        icon.addEventListener('mouseenter', () => gsap.to(img, { rotation: () => gsap.utils.random(-25, 25), scale: 1.2, duration: 0.4, ease: "back.out(2)" }));
        icon.addEventListener('mouseleave', () => gsap.to(img, { rotation: 0, scale: 1, duration: 0.4 }));
    });

    gsap.to(".footer__top-bg img", {
        scrollTrigger: { trigger: ".footer__top", start: "top bottom", end: "bottom top", scrub: true },
        y: -50,
        ease: "none"
    });

    if (document.querySelector(".choose__slider")) {
        new Swiper(".choose__slider", {
            loop: true,
            spaceBetween: 85,
            slidesPerView: 1,
            speed: 800,
            autoplay: { delay: 2500, disableOnInteraction: false },
        });
    }

    if (document.querySelector(".follows__slider")) {
        new Swiper(".follows__slider", {
            loop: false,
            spaceBetween: 20,
            slidesPerView: 1,
            pagination: { el: ".swiper-pagination", clickable: true },
            breakpoints: { 768: { spaceBetween: 49, slidesPerView: 4 } },
        });
    }

});


    const refreshScroll = () => {
        ScrollTrigger.refresh();
    };
    window.addEventListener('load', refreshScroll);
    window.addEventListener('resize', () => {
        setTimeout(refreshScroll, 200);
    });
    if (window.scrollY > 0) {
        window.scrollTo(window.scrollX, window.scrollY + 1);
        window.scrollTo(window.scrollX, window.scrollY - 1);
    }