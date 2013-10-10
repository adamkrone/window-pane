/******************************************************************************
 * windowPane.js
 *
 * Span images across multiple elements
 *****************************************************************************/

(function ($) {
	"use strict";

	$.fn.extend({
		windowPane: function(options) {

/******************************************************************************
 * Options
 *****************************************************************************/

			var defaults = {
				windowPane: "",
				insertInto: "",
				image: "",
				imageType: "single",
				bgRepeat: "no-repeat",
				revealRollovers: false,
				slideshowSpeed: 5000,
				slideSpeed: 1000,
				autoAdvance: false,
				slideDirection: "next",
				slideStyle: "single",
				includeNav: false,
				navPrev: ".nav-prev",
				navNext: ".nav-next",
				includeNavIcons: false,
				navIcon: ".nav-icon",
				includeParallax: false
			};

			defaults.insertInto = options.windowPane;

			options = $.extend(defaults, options);

/******************************************************************************
 * Variables
 *****************************************************************************/

			var WP = {};

			WP.self = $(this);
			WP.image = new Image();
			WP.position = [];
			WP.animating = false;
			WP.currentSlide = 1;

			WP.slide = function (direction, times) {
				var times = times || 1; 

				if (WP.animating === false) {
					var windowElements = $(options.insertInto, WP.self);

					WP.stopSlideshow();
					WP.animating = true;

					windowElements.each(function (i, windowElement) {
						var slideWidth = $(".slide", windowElement).width(),
								firstSlide,
								lastSlide,
								marginLeft,
								i;

						windowElement = $(windowElement);

						if (direction === "next") {
							marginLeft = "-=" + (slideWidth * times) + "px";
						} else if (direction == "prev") {
							for (i = 0; i < times; i++) {
								firstSlide = $(".slide:first", windowElement);
								lastSlide = $(".slide:last", windowElement);

								firstSlide.before(lastSlide);
								windowElement.css("margin-left", "-=" + slideWidth + "px");
							}

							marginLeft = "+=" + (slideWidth * times) + "px";
						}

						windowElement.animate({
							"margin-left": marginLeft
						}, options.slideSpeed, function () {
							if (direction === "next") {
								for (i = 0; i < times; i++) {
									firstSlide = $(".slide:first", windowElement);
									lastSlide = $(".slide:last", windowElement);

									lastSlide.after(firstSlide);
									windowElement.css("margin-left", "+=" + slideWidth + "px");
								}
							}
						});
					});

					for (var i = 0; i < times; i++) {
						// Update current slide
						if (direction === "next") {
							if (WP.currentSlide === options.image.length) {
								WP.currentSlide = 1;
							} else {
								WP.currentSlide += 1;
							}
						} else if (direction === "prev") {
							if (WP.currentSlide === 1) {
								WP.currentSlide = options.image.length;
							} else {
								WP.currentSlide -= 1;
							}
						}

						$(options.navIcon, WP.self).removeClass("current-slide");
						$(options.navIcon + ":eq(" + (WP.currentSlide - 1) + ")", WP.self)
							.addClass("current-slide");
					}

					setTimeout(function () {
						WP.animating = false;
						if(options.autoAdvance) {
							WP.startSlideshow();
						}
					}, options.slideSpeed);
				}
			};

			WP.startSlideshow = function () {
				WP.slideshow = setInterval(function () {
					WP.slide(options.slideDirection);
				}, options.slideshowSpeed);
			};

			WP.stopSlideshow = function () {
				clearInterval(WP.slideshow);
			};

/******************************************************************************
 * Setup
 *****************************************************************************/

			// Get top/left position of all "windows"
			$(options.windowPane, WP.self).each(function () {
				WP.position.push($(this).position());
			});

			// Set offsets
			WP.offsetTop = WP.position[0].top;
			WP.offsetLeft = WP.position[0].left;

			// Adjust all "windows" to zero out the position
			$.each(WP.position, function () {
				this.top -= WP.offsetTop;
				this.left -= WP.offsetLeft;
			});

			// Insert image(s)
			if (options.imageType === "single") {
				$(options.insertInto, WP.self).each(function (i) {
					$(this).css({
						"width": "100%",
						"height": "100%",
						"background-image": "url(" + options.image + ")",
						"background-repeat": options.bgRepeat,
						"background-position": "-" + WP.position[i].left + "px -" +
							WP.position[i].top + "px"
					});
					i++;
				});
			} else if (options.imageType === "slideshow") {
				$(options.insertInto, WP.self).each(function (i) {
					var windowElement = $(this),
							windowElementWidth = windowElement.width();

					$.each(options.image, function (j) {
						var slide = $('<div class="slide"></div>');

						windowElement.append(slide);

						if (options.slideStyle === "separate") {
							slide.css({
								"float": "left",
								"width": windowElement.css("width"),
								"height": windowElement.css("height"),
								"background-image": "url(" + options.image[j] + ")",
								"background-repeat": options.bgRepeat,
								"background-position": "-" + WP.position[i].left + "px -" +
									WP.position[i].top + "px"
							});
						} else if (options.slideStyle === "single") {
							slide.css({
								"float": "left",
								"width": options.imageWidth,
								"height": options.imageHeight,
								"background-image": "url(" + options.image[j] + ")",
								"background-repeat": options.bgRepeat,
								"background-position": "left top"
							});
						}
					});

					if (options.slideStyle === "separate") {
						windowElement.css({
							"width": (windowElementWidth * options.image.length) + "px"
						});
					} else if (options.slideStyle === "single" ){
						windowElement.css({
							"width": options.imageWidth * options.image.length,
							"margin-top":"-" + WP.position[i].top + "px",
							"margin-left": "-" + WP.position[i].left + "px"
						});
					}
				});
			}

			// Reveal rollover state if image doesn't cover the background
			if (options.revealRollovers) {

				// Show all previously hidden elements
				$(options.insertInto).show();

				// Setup image height
				WP.image.src = options.image;
				WP.image.onload = function () {
					var imageHeight = WP.image.height;

					// Find all window elements below image height
					$(options.windowPane, WP.self).each(function (i) {
						// Hide elements not covered by image height
						if (WP.position[i].top >= imageHeight) {
							$(this).children(options.insertInto).hide();
						}
					});
				};

			}

			// Start slideshow if autoAdvance is enabled
			if (options.autoAdvance) {
				WP.startSlideshow();
			}

			// Setup nav controls if enabled
			if (options.includeNav) {
				$(options.navPrev, WP.self).on("click", function (event) {
					WP.slide("prev");

					event.preventDefault();
				});

				$(options.navNext, WP.self).on("click", function (event) {
					WP.slide("next");

					event.preventDefault();
				});
			}

			// Setup nav icons if enabled
			if (options.includeNavIcons) {
				$(options.navIcon, WP.self).on("click", function (event) {
					var navIndex = $(this).index() + 1,
							direction = (navIndex > WP.currentSlide) ? "next" : "prev",
							times = Math.abs(navIndex - WP.currentSlide);

					WP.slide(direction, times);

					event.preventDefault();
				});
			}

			// Setup parallax effect if enabled
			$(window).on("mousemove", function (event) {
				if (options.includeParallax && ! WP.animating) {
					var windowWidth = $(window).width(),
							windowHeight = $(window).height(),
							cursorX = event.pageX,
							cursorY = event.pageY,
							percentX = cursorX / windowWidth,
							percentY = cursorY / windowHeight,
							widthDiff = Math.abs(options.imageWidth - WP.self.width()),
							heightDiff = Math.abs(options.imageHeight - WP.self.height());

					if (options.imageType === "single") {
						$(options.insertInto, WP.self).each(function (i, windowElement) {
							var newLeft = WP.position[i].left + (widthDiff * percentX),
									newTop = WP.position[i].top + (heightDiff * percentY);

							$(windowElement).css({
								"background-position": "-" + newLeft + "px -" +
									newTop + "px"
							});
						});
					} else if (options.imageType === "slideshow") {
						if (options.slideStyle === "single") {
							$(options.insertInto, WP.self).each(function (i, windowElement) {
								var newLeft = WP.position[i].left + (widthDiff * percentX),
										newTop = WP.position[i].top + (heightDiff * percentY);

								$(windowElement).css({
									"margin-left": "-" + newLeft + "px",
									"margin-top": "-" + newTop + "px"
								});
							});
						} else if (options.slideStyle === "separate") {
							$(options.insertInto, WP.self).each(function (i, windowElement) {
								var newLeft = WP.position[i].left + (widthDiff * percentX),
										newTop = WP.position[i].top + (heightDiff * percentY);

								$(windowElement).find(".slide:first").css({
									"background-position": "-" + newLeft + "px -" +
										newTop + "px"
								});
							});
						}
					}
				}
			});

		}
	});

})(jQuery);