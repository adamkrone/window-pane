#windowPane.js

##Overview

Creates a seamless "window-pane" effect by using only one image. 

##Usage

To work with this plugin you must include:

- jQuery
- windowPane.min.js

**Example Initialization:**

```javascript

	$("#wrapper").windowPane({
		windowPane: ".box",
		insertInto: ".sub-box
		image: "img/landscape.jpg"
	});

```
##Options

As you see above, three options can be passed into windowPane.js:

###windowPane

_required_

**default:** none (provided by user)

CSS selector of all elements to be used as "window panes"

###insertInto

_optional_

**default:** windowPane selector

CSS selector of elements that will display the image as their background. Only necessary if you want to use the image on a child element of the "window pane".

**Example:** animation that reveals a different child element on rollover.

###image

_required_

**default:** none (provided by user)

HTML document relative link to the image displayed across "window panes".