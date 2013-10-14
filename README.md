#windowPane.js

##Overview

Create a seamless "window-pane" effect using only one image.

##Usage

To use this plugin you must include:

- jQuery
- windowPane.js

**Example Initialization:**

```javascript

	$("#wrapper").windowPane({
		windowPane: ".box",
		image: "img/landscape.jpg”
	});

```

**Notes on Responsive Pages:**

If you want to incorporate windowPane.js on a responsive page, you will need to use a media query event listener such as [enquire.js](http://wickynilliams.github.com/enquire.js/), and re-initialize the plugin. This allows you to also utilize a unique image optimized for each media query.

##Options

A few options are required, while others allow customization of windowPane.js behavior:

###windowPane

_required_

**default:** none (provided by user)

CSS selector of all elements to be used as "window panes"

###insertInto

_optional_

**default:** windowPane selector

CSS selector of elements that will display the image as their background. Only necessary if you want to use the image on a child element of the "window pane". _Currently only supports child elements that fill the "window pane"._

**Example:** animation that reveals a different child element on rollover.

###image

_required_

**default:** none (provided by user)

Document relative link to the image displayed across "window panes". If you're using the slideshow functionality, this will be an array of links.

###bgRepeat

_optional_

**default:** "no-repeat"

CSS background-repeat argument to use on the background image.

###revealRollovers

_optional_

**default:** false

Automatically reveals any elements that are not covered by the background image. Useful in a responsive page if bgRepeat isn't practical.

###slideshowSpeed

_optional_

**default:** 5000

Time (in milliseconds) to wait before auto advancing slides.

###slideSpeed

_optional_

**default:** 1000

Time (in milliseconds) for the slide animation to last.

###autoAdvance

_optional_

**default:** false

Starts an automatically advancing slideshow.

###slideDirection

_optional_

**default:** "next"

Direction to slide when auto advancing ("next" or "prev").

###slideStyle

_optional_

**default:** "single"

Animation style for slides. "single" will move the background image as one unit. "separate" will move each "window-pane" separately. See the demo pages to clarify this difference.

###includeNav

_optional_

**default:** false

Includes navigation functionality ("prev"/"next" style buttons).

###navPrev

_optional_

**default:** ".nav-prev"

CSS selector that controls the "prev" action.

###navNext

_optional_

**default:** ".nav-next"

CSS selector that controls the "next" action.

###includeNavIcons

_optional_

**default:** false

Includes navigation icons, used to jump directly to a specific "slide".

###navIcon

_optional_

**default:** ".nav-icon"

CSS selector for nav icon controls.

###includeParallax

_optional_

**default:** false

Includes a parallax effect (background moves according to mouse). Requires imageWidth and imageHeight to be set. The image(s) must be larger than the width and height of the element windowPane is called on.

##License

windowPane.js is released under the [MIT](http://opensource.org/licenses/mit-license.php) license:

Copyright (c) 2012 Adam Krone

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.