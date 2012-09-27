/******************************************************************************
 * windowPane.js
 *
 * Span images across multiple boxes
 *****************************************************************************/

 (function($){

 	$.fn.extend({
 		windowPane: function(options) {

 			//Default options
 			var defaults = {
 				windowPane: "",
 				image: ""
 			}

 			//Override with any provided options
 			var options = $.extend(defaults, options),

/******************************************************************************
 * Plugin Variables
 *****************************************************************************/
	 			self = $(this),
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
			$(options.windowPane, self).each(function () {
				$(this).css({
					"background-image": "url(" + options.image + ")",
					"background-repeat": "no-repeat",
					"background-position-x": "-" + WP.position[i].left + "px",
					"background-position-y": "-" + WP.position[i].top + "px"
				});
				i++;
			});

 		}
 	});

})(jQuery);