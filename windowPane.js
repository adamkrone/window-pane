/******************************************************************************
 * windowPane.js
 *
 * Span images across multiple elements
 *****************************************************************************/

(function($){

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
				navNext: ".nav-next"
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

			WP.slide = function (direction) {
				if (WP.animating === false) {
					var windowElements = $(options.insertInto, WP.self);

					WP.stopSlideshow();
					WP.animating = true;

					windowElements.each(function (i, windowElement) {
						var windowElement = $(windowElement),
								slideWidth = $(".slide", windowElement).css("width"),
								firstSlide = $(".slide:first", windowElement),
								lastSlide = $(".slide:last", windowElement),
								marginLeft;

						if (direction === "next") {
							marginLeft = "-=" + slideWidth;
						} else if (direction == "prev") {
							marginLeft = "+=" + slideWidth;
							firstSlide.before(lastSlide);
							windowElement.css("margin-left", "-=" + slideWidth);
						}

						windowElement.animate({
							"margin-left": marginLeft
						}, options.slideSpeed, function () {
							if (direction === "next") {
								lastSlide.after(firstSlide);
								windowElement.css("margin-left", "+=" + slideWidth);
							}
						});
					});

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
							windowElementWidth = windowElement.css("width");

					$.each(options.image, function (j) {
						var slide = $('<div class="slide"></div>');

						windowElement.append(slide);

						slide.css({
							"float": "left",
							"width": windowElement.css("width"),
							"height": windowElement.css("height"),
							"background-image": "url(" + options.image[j] + ")",
							"background-repeat": options.bgRepeat,
							"background-position": "-" + WP.position[i].left + "px -" +
								WP.position[i].top + "px"
						});
					});

					windowElement.css("width",
						windowElementWidth.substring(0, windowElementWidth.length - 2) *
							options.image.length);
				});
			}

			// Reveal rollover state if image doesn't cover the background
			if (options.revealRollovers) {

				// Show all previously hidden elements
				$(options.insertInto).show();

				// Setup image height
				WP.image.src = options.image;
				WP.image.onload = function () {
					var i = 0,
					imageHeight = WP.image.height;

					// Find all window elements below image height
					$(options.windowPane, WP.self).each(function () {
						// Hide elements not covered by image height
						if (WP.position[i].top >= imageHeight) {
							$(this).children(options.insertInto).hide();
						}
						i++;
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

		}
	});

})(jQuery);