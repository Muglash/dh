import imagesLoaded from 'imagesloaded'
import { gsap } from 'gsap'
import * as myFunctions from './modules/functions.js'
import 'bootstrap/js/dist/modal.js'
import 'bootstrap/js/dist/tab.js'
import SmoothScroll from 'smoothscroll-for-websites'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger.js'
import { ScrollToPlugin } from "gsap/ScrollToPlugin.js";
import Swiper, { Navigation } from 'swiper'
import lightGallery from 'lightgallery'
import lgVideo from 'lightgallery/plugins/video/lg-video.min.js'
import lgThumbnail from 'lightgallery/plugins/thumbnail/lg-thumbnail.min.js'
import { Datepicker } from 'vanillajs-datepicker'
import mapboxgl from 'mapbox-gl'

myFunctions.isWebp();
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

// SmoothScroll
SmoothScroll({
	animationTime: 1200,
	stepSize: 80,
	keyboardSupport: true,
	arrowScroll: 100,
	touchpadSupport: true
})

// 

const elem = document.querySelector('input[name="datepicker"]');
const datepicker = new Datepicker(elem, {});

const images = gsap.utils.toArray("img");
const loader = document.querySelector(".loader__progress");
const updateProgress = (instance) =>
	(loader.setAttribute('style', `width: ${Math.round(
		(instance.progressedCount * 100) / images.length
		)}%`));
const showDemo = () => {

	document.body.style.overflow = "auto";
	document.scrollingElement.scrollTo(0, 0);
	gsap.to(document.querySelector(".loader"), { autoAlpha: 0 });

	gsap.utils.toArray(".gallery__list").forEach((section, index) => {
		const w = section.querySelector(".gallery__list-wrapper");
		const [x, xEnd] =
			index % 2
				? ["0%", ((w.scrollWidth / 1.3) - section.offsetWidth) * -1]
				: [(w.scrollWidth / 6) * -1, 0];
		gsap.fromTo( w,
			{
				x,
			}, {
				x: xEnd,
				scrollTrigger: {
					trigger: section,
					scrub: 1.5
				}
			}
		);
	});
	
	// projects gallery
	const projectGallery = ()=>{
		let projectGallerys = document.querySelectorAll('.projects-gallery')
		let projectGalleryPrev = document.querySelectorAll('.projects-gallery__nav_prev')
		let projectGalleryNext = document.querySelectorAll('.projects-gallery__nav_next')
		projectGallerys.forEach((slider, index)=>{
			let sliderLength = slider.children[0].children.length
			let result = (sliderLength > 1) ? true : false
			const swiper = new Swiper(slider, {
				modules: [Navigation],
				slidesPerView: 1,
				spaceBetween: 30,
				speed: 900,
				watchSlidesProgress: true,
				observer: true,
				observeParents: true,
				navigation: {
					nextEl: projectGalleryPrev[index],
					prevEl: projectGalleryNext[index]
				}
			});
		})
	}
	projectGallery();
	
	// projects foorplans
	const floorplan = ()=>{
		let floorplans = document.querySelectorAll('.project-floorpans-swiper')
		let floorplanPrev = document.querySelectorAll('.project-floorpans__nav_prev')
		let floorplanNext = document.querySelectorAll('.project-floorpans__nav_next')
		floorplans.forEach((slider, index)=>{
			let sliderLength = slider.children[0].children.length
			let result = (sliderLength > 1) ? true : false
			const swiper = new Swiper(slider, {
				modules: [Navigation],
				slidesPerView: 1,
				spaceBetween: 30,
				watchSlidesProgress: true,
				navigation: {
					nextEl: floorplanPrev[index],
					prevEl: floorplanNext[index]
				}
			});
		})
	}
	floorplan();
	

	// gsap
	
	// main menu
	
	let bodyOverlay = document.createElement('div');
	bodyOverlay.classList.add('body-overlay')
	document.body.append(bodyOverlay);
	
	const tlMenu = gsap.timeline({ paused: true });
	
	tlMenu.to(".app-header__menu", { yPercent: 100 })
	.to(".body-overlay", { visibility: "visible", autoAlpha: 1 }, 0)
	.to(".btn-toggler__line_mid", { width: 0 }, 0)
	.to(".btn-toggler__tx_open", { yPercent: 100 }, 0)
	.to(".btn-toggler__tx_close", { yPercent: 100 }, 0)
	.to(".btn-toggler__line_top", { y: 8 }, 0)
	.to(".btn-toggler__line_bot", { y: -8 }, 0)
	.to(".btn-toggler__line_top", { rotate: 45 }, 0.5)
	.to(".btn-toggler__line_bot", { rotate: -45 }, 0.5)
	.from(".menu__item", { autoAlpha: 0, stagger: 0.05 }, 0.6)
	
	const btnToggler = document.querySelector(".btn-toggler");
	btnToggler.addEventListener("click", toggleMenu);
	document.querySelector(".body-overlay").addEventListener("click", toggleMenu);
	function toggleMenu() {
		tlMenu.reversed() ? tlMenu.timeScale(1).play() : tlMenu.timeScale(2).reverse();
		btnToggler.classList.toggle('open')
	}
	tlMenu.reverse();

	function getSamePageAnchor (link) {
		if (
			link.protocol !== window.location.protocol ||
			link.host !== window.location.host ||
			link.pathname !== window.location.pathname ||
			link.search !== window.location.search
		) {
			return false;
		}
	
		return link.hash;
	}
	function scrollToHash(hash, e) {
		const elem = hash ? document.querySelector(hash) : false;
		if(elem) {
			if(e) e.preventDefault();
			gsap.to(window, { duration: 0, scrollTo: elem, ease: "power2"});
		}
	}
	document.querySelectorAll('a[href]').forEach(a => {
		a.addEventListener('click', e => {
			scrollToHash(getSamePageAnchor(a), e);
		});
	});
	scrollToHash(window.location.hash);
	
	// main
	let tlmain = gsap.timeline();
	tlmain.from(".main-banner__bg", { duration: 1.5, backgroundPositionY: "0%"})
	.from(".app-header", { yPercent: -100})
	.from(".main-banner__title", { yPercent: 50}, 1.5)
	.from(".main-banner__btn-play", { scale: 0.5, autoAlpha: 0})
	.from(".main-banner__play-text", { autoAlpha: 0})

	tlmain.fromTo(".main-banner__bg", { backgroundPositionY: "50%"}, { backgroundPositionY: "100%", scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'top top',
		end: 'bottom bottom',
		pin: ".main-banner__bg"
	}})
	tlmain.to(".main-banner__bg-gradient", { autoAlpha: 1, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'top top',
		end: 'bottom bottom'
	}})
	
	tlmain.to(".main-banner__container", { yPercent: 30, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 100%',
		end: 'center 50%'
	}})
	tlmain.to(".main-banner__title", { autoAlpha: 0, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 70%',
		end: 'center 60%'
	}})
	tlmain.to(".main-banner__play", { autoAlpha: 0, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 60%',
		end: 'center 50%'
	}})
	tlmain.from(".main-about__title", { yPercent: 100, autoAlpha: 0, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 50%',
		end: 'bottom bottom'
	}})
	tlmain.from(".main-about__description", { yPercent: 100, autoAlpha: 0, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 30%',
		end: 'bottom bottom'
	}})
	tlmain.from(".main-about__num", { yPercent: 100, autoAlpha: 0, stagger: 0.1, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 20%',
		end: 'bottom bottom'
	}})
	tlmain.from(".main-about__name", { yPercent: 100, autoAlpha: 0, stagger: 0.1, scrollTrigger: {
		scrub: true,
		trigger: '.main-banner',
		start: 'center 10%',
		end: 'bottom bottom'
	}})

	// location

	mapboxgl.accessToken = 'pk.eyJ1IjoibXVnbGFzaCIsImEiOiJjbDFvc2YydDYwNzJvM3BrYmY0NGN1amVqIn0.UmXrtgUY_xCAKQFbuEl4NA';
	const geojson = {
		'type': 'FeatureCollection',
		'features': [{
			'type': 'Feature',
			'properties': {
				'group': 'appartments',
				'name': 'Title appartments 1',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.248, 25.114]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'appartments',
				'name': 'Title appartments 2',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.259, 25.114]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'appartments',
				'name': 'Title appartments 3',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.239, 25.096]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'appartments',
				'name': 'Title appartments 4',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.239, 25.120]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'villas',
				'name': 'Title villas 1',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.248, 25.124]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'villas',
				'name': 'Title villas 2',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.269, 25.114]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'villas',
				'name': 'Title villas 3',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.249, 25.096]
				}
			}, {
			'type': 'Feature',
			'properties': {
				'group': 'villas',
				'name': 'Title villas 4',
				'img': 'location-img-1.jpg'
			},
			'geometry': {
				'type': 'Point',
				'coordinates': [55.249, 25.120]
			}
		}
	]};
	const lc = [55.257, 25.113];
	const map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/muglash/cl1osh0tw001g14sectjllxfh',
		center: lc,
		zoom: 14,
		pitch: 0,
		scrollZoom: false
	});
	map.rotateTo(-51)
	map.addControl(new mapboxgl.NavigationControl());
	map.addControl(new mapboxgl.FullscreenControl());

	for (const marker of geojson.features) {
		const el = document.createElement('div');
		el.className = `marker`;
		el.style.backgroundImage = `url(img/map-point.svg)`;
		el.style.width = "55px";
		el.style.height = "55px";
		el.style.backgroundSize = '100%';
		el.setAttribute('data-marker-group', `${marker.properties.group}`)
		const popup = new mapboxgl.Popup({ 
			offset: 40,
			maxWidth: 262
		}).setHTML(`<div class="location-points__img"><img src="img/${marker.properties.img}" alt=""></div><div class="location-points__title">${marker.properties.name}</div>`);

		new mapboxgl.Marker(el)
			.setLngLat(marker.geometry.coordinates)
			.setPopup(popup)
			.addTo(map);
	}

	

	let firstGroupMarkers = document.querySelectorAll('[data-marker-group="appartments"]');
	for (let i = 0; i < firstGroupMarkers.length; i++) {
		firstGroupMarkers[i].classList.add('active');
	}

	const mapGroupSwitcher = document.querySelectorAll('.location__tabs-item');
	const mapMarkers = document.querySelectorAll('.marker');
	
	for (let i = 0; i < mapGroupSwitcher.length; i++) {
		mapGroupSwitcher[i].addEventListener("click", function() {

			const popup = document.getElementsByClassName('mapboxgl-popup');
			if ( popup.length ) {
					popup[0].remove();
			}

			let targetData = this.getAttribute("data-group");

			const mapGroupMarkers = document.querySelectorAll(`[data-marker-group="${targetData}"]`);

			for (let i = 0; i < mapMarkers.length; i++) {
				mapMarkers[i].classList.remove('active');
			}

			for (let i = 0; i < mapGroupMarkers.length; i++) {
				mapGroupMarkers[i].classList.add('active');
			}
			
			for (let i = 0; i < mapGroupSwitcher.length; i++) {
				mapGroupSwitcher[i].classList.remove('active');
			}

			this.classList.add('active');
			
		});
	}
	

	ScrollTrigger.create({
		trigger: ".location",
		start: "top top",
		end: "bottom bottom",
		pin: ".location__body",
	});

	let tlLocation = gsap.timeline({
		scrollTrigger: {
			scrub: true,
			trigger: '.location',
			start: 'top top',
			end: 'bottom bottom'
		}
	});
	tlLocation.to(".location__img-box .box img", { scale: 5 })
	.to(".location__img-box .box", { height: 605, yPercent: 15 })
	.from(".location__title", { y: -100, autoAlpha: 0 })
	.to(".location__img-box .box", { width: 1300 })
	.from(".location__tabs-list", { autoAlpha: 0})
	.from(".location__tabs-map", { autoAlpha: 0})
	.to(".location__img-box .box", { autoAlpha: 0})


	// excursion
	// let tlExcursion = gsap.timeline();
	let tlExcursion = gsap.timeline({
		scrollTrigger: {
			trigger: ".excursion",
			start: "top top",
			end: "bottom bottom",
			scrub: true,
			pin: ".excursion__bg"
		}
	}).to(".excursion__bg", { yPercent: -25 }, 0)
	.fromTo(".excursion-form", { yPercent: 100 }, { yPercent: 0 }, 0.5)

	let tlInvestment = gsap.timeline({
		scrollTrigger: {
			trigger: ".investment",
			start: "top bottom",
			end: "bottom bottom",
			scrub: 1,
		}
	}).to(".investment__visa", { paddingTop: 200 }, 1)

	let tlForm = gsap.timeline({
		scrollTrigger: {
			trigger: ".footer-request-a-call__body",
			start: "top 90%",
			end: "bottom 80%",
			scrub: true
		}
	}).from(".footer-request-a-call__top-line", { width: 0 })
	.from(".footer-request-a-call__left-line, .footer-request-a-call__right-line", { height: 0 })
	.from(".footer-request-a-call__bot-line-left, .footer-request-a-call__bot-line-right", { width: 0 })

	
	// images
	function animateFrom(elem, direction) {
		direction = direction || 1;
		var x = 0,
			y = direction * 300;
		elem.style.transform = "translate(" + x + "px, " + y + "px)";
		elem.style.opacity = "0";
		gsap.fromTo(elem, {x: x, y: y, autoAlpha: 0}, {
			duration: 2, 
			x: 0,
			y: 0, 
			autoAlpha: 1, 
			ease: "expo", 
			overwrite: "auto"
		});
	}
	
	function hide(elem) {
		gsap.set(elem, {autoAlpha: 0});
	}
	
	gsap.utils.toArray(".gs-anim").forEach(function(elem) {
		hide(elem);
		
		ScrollTrigger.create({
			trigger: elem,
			onEnter: function() { animateFrom(elem) }, 
			onEnterBack: function() { animateFrom(elem, -1) },
			onLeave: function() { hide(elem) }
		});
	});

	gsap.utils.toArray(".key-features__item_odd .box").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "center 80%",
				end: "center 40%",
				scrub: 1,
			}
		}).fromTo(elem, {x: 20, y: -20}, {x: 0, y: 0})
	})

	gsap.utils.toArray(".key-features__img img").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "top 100%",
				end: "bottom 0%",
				scrub: 2,
			}
		}).to(elem, { scale: 1.2 })
	})
	gsap.utils.toArray(".developer-card__img img").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "top 100%",
				end: "bottom 0%",
				scrub: 2,
			}
		}).to(elem, { scale: 1.2 })
	})
	gsap.utils.toArray(".key-features__item_even .box").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "center 80%",
				end: "center 40%",
				scrub: 1,
			}
		}).fromTo(elem, {x: -20, y: -20}, {x: 0, y: 0})
	})
	

	gsap.from(".about-brochure__img", { y: 400, x: 200, scrollTrigger: {
		trigger: ".about-brochure",
		start: "top 100%",
		end: "center 10%",
		scrub: 1,
	}})

	let tlbr = gsap.timeline({
		scrollTrigger: {
			trigger: ".about-brochure__list",
			start: "center 80%",
			end: "center 40%"
		}
	})
	tlbr.from(".about-brochure__item", { autoAlpha: 0, stagger: 0.1 })
	.from(".about-brochure__item .ico", { autoAlpha: 0, stagger: 0.1 })

	gsap.utils.toArray(".project__title .box").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "center 100%",
				end: "center 40%",
				scrub: 1,
			}
		}).from(elem, {right: 999})
	})
	gsap.utils.toArray(".project__title .tx").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "center 80%",
				end: "center 40%",
				scrub: 1,
			}
		}).from(elem, { autoAlpha: 0, x: 100 })
	})
	gsap.utils.toArray(".project-gallery").forEach(function(elem) {
		gsap.timeline({
			scrollTrigger: {
				trigger: elem,
				start: "top 99%",
				end: "center 99%"
			}
		}).from(elem, { scale: 2, yPercent: 50 })
	})


	// gsap.utils.toArray(".section-line-left").forEach(function(elem) {
	// 	gsap.to(elem, {
	// 		height: "100%",
	// 		ease: 'none',
	// 		scrollTrigger: { 
	// 			trigger: elem,
	// 			scrub: 0.3
	// 		}
	// 	});
	// })

	// gsap.utils.toArray(".key-features .section-line-left").forEach(function(elem) {
	// 	gsap.timeline({
	// 		scrollTrigger: {
	// 			trigger: elem,
	// 			scrub: true,
	// 			start: "top 10%",
	// 			end: "top 90%",
	// 			pin: true,
	// 			markers: true
	// 		}
	// 	}).from(elem, { scaleY: 0})
	// })

	
	// lightGallery
	const lg = document.querySelectorAll( '.lg-list')
	lg.forEach(item => {
		lightGallery( item, {
			plugins: [lgVideo, lgThumbnail],
			videojs: true,
			licenseKey: 'your_license_key',
			selector: '.lg-item',
			mode: 'lg-slide',
			speed: 800,
			loop: false,
			counter: false,
			download: false,
			thumbnail: true,
			mobileSettings: {
				showCloseIcon: true
			}
		})
	})
	

	// lightGallery images
	const lgimg = document.querySelectorAll( '.lg-images')
	lgimg.forEach(item => {
		lightGallery( item, {
			licenseKey: 'your_license_key',
			selector: '.lg-image',
			speed: 500,
			loop: false,
			counter: false,
			download: false,
			// thumbnail: true,
			mobileSettings: {
				showCloseIcon: true
			}
		})
	})
	
	// lightGallery videos
	const lgvid = document.querySelectorAll( '.lg-videos')
	lgvid.forEach(item => {
		lightGallery( item, {
			plugins: [lgVideo],
			videojs: true,
			licenseKey: 'your_license_key',
			selector: '.lg-video',
			// speed: 500,
			// loop: false,
			download: false,
			counter: false,
			// showCloseIcon: false,
			iframeWidth: "1320",
			mobileSettings: {
				showCloseIcon: true
			}
		})
	})




};

imagesLoaded(images).on("progress", updateProgress).on("always", showDemo);

// let lgCloseBtn = document.createElement('btn');
// lgCloseBtn.classList.add('lg-custom-close', 'btn')
// lgCloseBtn.setAttribute('type', 'button')
// lgCloseBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M0 3.03747L3.03747 0L10.9783 7.94083L18.7022 0.216962L21.783 3.29783L14.0592 11.0217L22 18.9625L18.9625 22L11.0217 14.0592L3.12426 21.9566L0.0433928 18.8757L7.94083 10.9783L0 3.03747Z" fill="white"/></svg>'
// let lgInner = document.querySelector('.lg-inner');
// lgInner.append(lgCloseBtn);

// lgCloseBtn.addEventListener("click", function(){
// 	this.classList.add('show')
// });

// let lgToolbar = document.querySelector('.lg-toolbar');
// lgInner.append(lgToolbar);


