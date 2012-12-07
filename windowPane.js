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
				bgRepeat: "no-repeat",
				revealRollovers: false
			};

			defaults.insertInto = options.windowPane;

			options = $.extend(defaults, options);

/******************************************************************************
 * Variables
 *****************************************************************************/

			var WP = {},
				i = 0;

			WP.self = $(this);
			WP.image = new Image();
			WP.position = [];

/******************************************************************************
 * Setup
 *****************************************************************************/

			//Get top/left position of all "windows"
			$(options.windowPane, WP.self).each(function () {
				WP.position.push($(this).position());
			});

			//Set offsets
			WP.offsetTop = WP.position[0].top;
			WP.offsetLeft = WP.position[0].left;

			//Adjust all "windows" to zero out the position
			$.each(WP.position, function () {
				this.top -= WP.offsetTop;
				this.left -= WP.offsetLeft;
			});

			//Insert the image as the background to all targeted elements
			$(options.insertInto, WP.self).each(function () {
				$(this).css({
					"background-image": "url(" + options.image + ")",
					"background-repeat": options.bgRepeat,
					"background-position": "-" + WP.position[i].left + "px -" + WP.position[i].top + "px"
				});
				i++;
			});

			//Reveal rollover state if image doesn't cover the background
			if (options.revealRollovers) {

				//Show all previously hidden elements
				$(options.insertInto).show();

				//Setup image height
				WP.image.src = options.image;
				WP.image.onload = function () {
					var i = 0,
					imageHeight = WP.image.height;

					//Find all window elements below image height
					$(options.windowPane, WP.self).each(function () {
						//Hide elements not covered by image height
						if (WP.position[i].top >= imageHeight) {
							$(this).children(options.insertInto).hide();
						}
						i++;
					});
				};

			}

		}
	});

})(jQuery);