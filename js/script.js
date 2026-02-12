
const langBlocks = document.querySelectorAll('.header__lang');

langBlocks.forEach(langWrapper => {
    const langSelected = langWrapper.querySelector('.header__lang-selected');
    const langLinks = langWrapper.querySelectorAll('.header__lang-select');

    langSelected.addEventListener('click', e => {
        e.stopPropagation();
        langBlocks.forEach(block => {
            if (block !== langWrapper) {
                block.classList.remove('active');
            }
        });

        langWrapper.classList.toggle('active');
    });

    langLinks.forEach(link => {
        link.addEventListener('click', () => {
            langWrapper.classList.remove('active');
        });
    });
});

document.addEventListener('click', () => {
    langBlocks.forEach(block => block.classList.remove('active'));
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


    if(document.querySelector('.wherebuy')){
        ScrollTrigger.create({
            trigger: ".wherebuy",
            start: "top 80%",
            onEnter: () => document.querySelector(".wherebuy").classList.add("showed"),
            once: true
        });
    }

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
    const swiper = new Swiper(".choose__slider", {
        loop: true,
        spaceBetween: 85,
        slidesPerView: 1,
        speed: 800,
        autoplay: { 
            delay: 2500, 
            disableOnInteraction: false,
            pauseOnMouseEnter: true // Это штатная настройка Swiper для остановки при наведении
        },
        breakpoints: {
            768: { spaceBetween: 250 },
        }
    });

    // Запускаем анимацию для ВСЕХ слайдов сразу
    const allSlides = document.querySelectorAll('.choose__slide');
    
    allSlides.forEach(slide => {
        const bgImages = slide.querySelectorAll('.choose__slide-bg');
        const mainImage = slide.querySelector('.choose__slide-image > img:not(.choose__slide-bg)');
        const allElements = [...bgImages, mainImage];

        allElements.forEach(img => {
            // Создаем и СРАЗУ запускаем анимацию
            gsap.to(img, {
                yPercent: gsap.utils.random(-5, -10),
                xPercent: gsap.utils.random(-2, 2),
                rotation: () => {
                    // Берем текущий rotate из inline-стилей или атрибутов, если GSAP его уже знает
                    // или просто добавляем к текущему значению
                    return "+=" + gsap.utils.random(-3, 3);
                },
                duration: gsap.utils.random(2, 4),
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true
            });
        });
    });
}
    if (document.querySelector(".sliderProd__slider")) {
        new Swiper(".sliderProd__slider", {
            loop: false,
            spaceBetween: 20,
            slidesPerView: 1.3,
            speed: 800,
            autoplay: { delay: 2500, disableOnInteraction: false },
            breakpoints: {
                768: {
                    slidesPerView: 4,
                    spaceBetween: 85
                },
            }
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

    if (document.querySelector(".ourprod__slider")) {
        new Swiper(".ourprod__slider", {
            loop: false,
            spaceBetween: 20,
            slidesPerView: 1,
            pagination: { el: ".ourprod__pagination", clickable: true },
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



const openBtn = document.querySelector('.header__button');
const closeBtn = document.querySelector('.header__button-close');
const content = document.querySelector('.header__content');
openBtn.addEventListener('click', () => {
  content.classList.add('active');
});
closeBtn.addEventListener('click', () => {
  content.classList.remove('active');
});



document.addEventListener("DOMContentLoaded", (event) => {
  gsap.registerPlugin(ScrollTrigger);
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".contact",
      start: "top 80%", 
    }
  });

  contactTl
    .from(".contact__title", {
      y: 30,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out"
    })
    .from(".contact__descr", {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: "power2.out"
    }, "-=0.4")
    .from(".contact__name", {
      x: -20,
      opacity: 0,
      duration: 0.6
    }, "-=0.2")
    .from(".contact__info", {
      y: 20,
      opacity: 0,
      stagger: 0.2,
      duration: 0.5
    }, "-=0.3");

  gsap.from(".map iframe", {
    scrollTrigger: {
      trigger: ".map",
      start: "top 85%",
    },
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: "power1.inOut"
  });

  const feedbackTl = gsap.timeline({
    scrollTrigger: {
      trigger: ".feedback",
      start: "top 75%",
    }
  });

  feedbackTl
    .from(".feedback__bg img", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5
    })
    .from(".feedback__title", {
      y: -30,
      opacity: 0,
      duration: 0.8
    }, "-=1")
    .from(".feedback__form-input, .feedback__form-select, .feedback__form-textarea", {
      y: 20,
      opacity: 0,
      stagger: 0.15,
      duration: 0.5
    }, "-=0.5")
    .from(".feedback__form-btn", {
      scale: 0.8,
      opacity: 0,
      duration: 0.5,
      ease: "back.out(1.7)"
    }, "-=0.2");
});


gsap.registerPlugin(ScrollTrigger);

const tlTop = gsap.timeline({
    scrollTrigger: {
        trigger: ".product__top",
        start: "top 70%",
    }
});

tlTop.from(".product__image > img", {
    opacity: 0,
    scale: 0.8,
    duration: 1.2,
    ease: "power2.out"
});

tlTop.from(".product__image-icons img", {
    opacity: 0,
    scale: 0,
    x: 0,
    y: 0,
    stagger: {
        amount: 0.8, 
        from: "random"
    },
    duration: 1,
    ease: "back.out(1.7)"
}, "-=0.5");

tlTop.from(".product__inner > *", {
    opacity: 0,
    x: 50,
    stagger: 0.2,
    duration: 0.8,
    ease: "power2.out"
}, "-=1");

gsap.from(".product__info-content", {
    scrollTrigger: {
        trigger: ".product__info",
        start: "top 80%",
    },
    opacity: 0,
    y: 30,
    stagger: 0.3,
    duration: 1,
    ease: "power2.out"
});

gsap.from(".product__info-image img", {
    scrollTrigger: {
        trigger: ".product__info-image",
        start: "top 85%",
    },
    opacity: 0,
    scale: 0.5,
    stagger: 0.2,
    duration: 1,
    ease: "back.out(1.5)"
});

gsap.to(".product__image-icons img", {
    y: "random(-15, 15)",
    x: "random(-10, 10)",
    duration: "random(2, 4)",
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
    delay: 2
});

const tlSlider = gsap.timeline({
    scrollTrigger: {
        trigger: ".sliderProd",
        start: "top 70%",
    }
});

tlSlider.from(".sliderProd__title", {
    opacity: 0,
    y: 50,
    duration: 1,
    ease: "power2.out"
});

tlSlider.from(".sliderProd__slide", {
    opacity: 0,
    y: 100,
    stagger: 0.2,
    duration: 1,
    ease: "power3.out"
}, "-=0.5");

tlSlider.from(".sliderProd__btn", {
    opacity: 0,
    scale: 0.8,
    duration: 0.8,
    ease: "back.out(1.7)"
}, "-=0.3");

const tlThanks = gsap.timeline({
    scrollTrigger: {
        trigger: ".thanks",
        start: "top 75%",
    }
});

tlThanks.from(".thanks__bg img", {
    opacity: 0,
    scale: 1.2,
    duration: 1.5,
    ease: "power2.out"
});

tlThanks.from(".thanks__title, .thanks__descr, .thanks__btn", {
    opacity: 0,
    y: 40,
    stagger: 0.3,
    duration: 1,
    ease: "power2.out"
}, "-=1");

const bestProdTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".bestprod",
        start: "top 80%",
        toggleActions: "play none none reverse"
    }
});
bestProdTl.from(".bestprod__name", {
    y: 30,
    opacity: 0,
    duration: 0.8,
    ease: "power2.out"
})
.from(".bestprod__item", {
    x: 50,
    opacity: 0,
    stagger: 0.2,
    duration: 0.6,
    ease: "power2.out"
}, "-=0.5");
gsap.from(".faq__item", {
    scrollTrigger: {
        trigger: ".faq__block",
        start: "top 85%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "back.out(1.7)"
});

const stepsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".steps__block",
        start: "top 70%",
    }
});
stepsTl.from(".steps__title", {
    scale: 0.9,
    opacity: 0,
    duration: 1
})
.from(".steps__item", {
    scale: 0.5,
    opacity: 0,
    stagger: 0.3,
    duration: 0.7,
    ease: "power2.out"
})
.from(".steps__name", {
    opacity: 0,
    y: 20
});

gsap.from(".ourprod__title", {
    scrollTrigger: {
        trigger: ".ourprod",
        start: "top 80%",
    },
    x: -50,
    opacity: 0,
    duration: 1
});

gsap.from(".ourprod__slider", {
    scrollTrigger: {
        trigger: ".ourprod__slider",
        start: "top 85%",
    },
    opacity: 0,
    y: 50,
    duration: 1.2
});

const infoItems = document.querySelectorAll(".infoblock__item-descr");

infoItems.forEach((item) => {
    const span = item.querySelector("span");
    const targetValue = parseInt(span.innerText.replace("+", ""));

    gsap.from(item, {
        scrollTrigger: {
            trigger: ".infoblock",
            start: "top 90%",
        },
        y: 20,
        opacity: 0,
        duration: 0.8,
        onStart: () => {
            let obj = { val: 0 };
            gsap.to(obj, {
                val: targetValue,
                duration: 2,
                ease: "power1.out",
                onUpdate: () => {
                    span.innerText = Math.ceil(obj.val) + (span.innerText.includes("+") ? "+" : "");
                }
            });
        }
    });
});
const stepsBottomTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".steps__bottom",
        start: "top 75%",
    }
});
stepsBottomTl
    .from(".steps__bottom-image", {
        scale: 0.8,
        opacity: 0,
        duration: 1.2,
        ease: "power3.out"
    })
    .from(".steps__bottom-descr:first-of-type", {
        x: -100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=0.8")
    .from(".steps__bottom-descr:last-of-type", {
        x: 100,
        opacity: 0,
        duration: 1,
        ease: "power2.out"
    }, "-=1");


$(document).ready(function () {
    $('.faq__item-descr').not(':first').hide();
    $('.faq__item').first().addClass('is-active');
    $('.faq__item-title').on('click', function () {
        const $item = $(this).closest('.faq__item');
        const $descr = $item.find('.faq__item-descr');
        if ($item.hasClass('is-active')) {
            $descr.slideUp(300);
            $item.removeClass('is-active');
        } else {
            $('.faq__item.is-active .faq__item-descr').slideUp(300);
            $('.faq__item.is-active').removeClass('is-active');
            $descr.slideDown(300);
            $item.addClass('is-active');
        }
    });
});
const partnerTl = gsap.timeline();
partnerTl
    .from(".partner__title", {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: "power3.out"
    })
    .from(".partner__image", {
        scale: 1.1,
        opacity: 0,
        duration: 1.2,
        ease: "power2.out"
    }, "-=0.5");

gsap.from(".whystart__top p", {
    scrollTrigger: {
        trigger: ".whystart__top",
        start: "top 80%",
    },
    y: 30,
    opacity: 0,
    stagger: 0.2,
    duration: 0.8
});

gsap.from(".whystart__item", {
    scrollTrigger: {
        trigger: ".whystart__content",
        start: "top 70%",
    },
    y: 40,
    opacity: 0,
    stagger: 0.15,
    duration: 0.8,
    ease: "back.out(1.7)"
});

gsap.from(".whystart__info", {
    scrollTrigger: {
        trigger: ".whystart__info",
        start: "top 90%",
    },
    scale: 0.95,
    opacity: 0,
    duration: 1,
    ease: "power2.out"
});

const locationsTl = gsap.timeline({
    scrollTrigger: {
        trigger: ".locations__inner",
        start: "top 75%",
    }
});

locationsTl
    .from(".locations__title", {
        x: -50,
        opacity: 0,
        duration: 0.8
    })
    .from(".locations__item", {
        y: 30,
        opacity: 0,
        stagger: 0.2,
        duration: 0.6
    })
    .from(".locations__item-opened", {
        opacity: 0,
        y: 20,
        duration: 0.5
    });

gsap.to(".partner__image img", {
    scrollTrigger: {
        trigger: ".partner",
        start: "top top",
        end: "bottom top",
        scrub: true
    },
    y: 100
});


document.addEventListener('DOMContentLoaded', () => {
    const weightButtons = document.querySelectorAll('.product__weight-descr');
    const productImages = document.querySelectorAll('.product__image img:not(.product__image-icons img)');
    weightButtons.forEach((button, index) => {
        button.addEventListener('click', () => {
            document.querySelector('.product__weight-descr.active').classList.remove('active');
            button.classList.add('active');
            document.querySelector('.product__image img.active').classList.remove('active');
            if (productImages[index]) {
                productImages[index].classList.add('active');
            }
        });
    });
});