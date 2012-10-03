/******************************************************************************
 * windowPane.js
 *
 * Span images across multiple divs
 *****************************************************************************/

 (function($){

 	$.fn.extend({
 		windowPane: function(options) {

/******************************************************************************
 * Options
 *****************************************************************************/

 			//Default options
 			var defaults = {
 				windowPane: "",
 				insertInto: "test",
 				image: "",
 				bgRepeat: "no-repeat",
 				userCallback: ""
 			}

 			defaults.insertInto = options.windowPane;

 			//Override with any provided options
 			var options = $.extend(defaults, options),

/******************************************************************************
 * Variables
 *****************************************************************************/
	 			self = $(this),
	 			//Image
	 			image = new Image(),
				//Window Pane Object
				WP = {},
				//Top offset of first "window"
				offsetTop,
				//Left offset of first "window"
				offsetLeft,
				//counter
				i = 0;

			//Holds top/left position of all "windows"
			WP.position = [];

/******************************************************************************
 * Setup
 *****************************************************************************/

			//Get top/left position of all "windows"
			$(options.windowPane, self).each(function () {
				WP.position.push($(this).position());
			});

			//Set offsets
			offsetTop = WP.position[0].top;
			offsetLeft = WP.position[0].left;

			//Adjust all "windows" to zero out the position
			$.each(WP.position, function () {
				this.top -= offsetTop;
				this.left -= offsetLeft;
			});

			//Insert the image as the background to all targeted elements
			$(options.insertInto, self).each(function () {
				$(this).css({
					"background-image": "url(" + options.image + ")",
					"background-repeat": options.bgRepeat,
					"background-position": "-" + WP.position[i].left + "px -" + WP.position[i].top + "px"
				});
				i++;
			});

			//Setup image height
			image.src = options.image;
			image.onload = function () {
				var i = 0;

				//Get image height
				imageHeight = image.height;

				//Find all window elements below image height
				$(options.windowPane, self).each(function () {
					if (WP.position[i].top >= imageHeight) {
						options.userCallback($(this));
					}
					i++
				});
			};

 		}
 	});

})(jQuery);