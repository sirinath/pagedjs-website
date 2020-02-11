---
title: "Getting Started with Paged.js"
date: 2019-09-03T18:23:22+02:00
draft: false
part: 1 
weight: 2
intro: "The basics to run Paged.js" 
cover: "images/chuncker-1.png"
class: documentation
symbolContent: "𝄢"
symbolText: "The Musical Symbols block covers characters used by basic Western musical notation and its antecedents (mensural notation and plainsong - or Gregorian - notation)."
---

## Starting Paged.js

Paged.js comes in two flavours: a polyfill that will automatically run when you starts the browser and a npm module that you can run. Both can be adapted to your need pretty easily, but feel free to use what’s the more convenient for you, but in this chapter, we’ll focus on the polyfill. You can find more about the esm version [here !! PLEASE ADD A LINK]()


### Using Paged.js as a polyfill

To be able to run Paged.js on your document, you will need the following:


- The html and css files you want to transform into a book;
- Paged.js script (either locally, or using our CDN link);
- A web server to let the polyfill access your CSS file;
- a web browser to see the magic in the screen.

### Getting the script unpkg.com

You can use the hosted version of the script on [unpkg.com](https://unpkg.com/pagedjs) by copying the line of code below in the `head` of your document:

```html
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
```


You can also download that file and call it from the head of your HTML file: 

```html
<script src="js/paged.polyfill.js"></script>
```


As soon as your browser has loaded everything your HTML needs to be shown on screen (including images, font files, etc.), the script will start paginating the content and pages will appear on your screen. If you need a previous version of Paged.js you can check the releases on [unpgk.com](https://unpkg.com/browse/pagedjs/). Please notice the button top right to get to older versions.

### Preview your work

Paged.js will manipulate the DOM so the browser can understand the css rules you wrote. On screen, pages will be shown from top to bottom on the left side of the page. To have a better understanding of what’s happening on the page, we made a small CSS file call interface that defines the layout to show your book on screen. Since we’re using `@media screen`, page borders and shadow won’t appear on paper when printed. You can download this CSS file: [interface-01.1](https://gitlab.pagedmedia.org/tools/pagedjs-documentation/blob/master/ressources/interface-0.1.css) and link it to your document in the `<head>`: `<link href="path/to/file/interface-0.1.css" rel="stylesheet" type="text/css">`. Please check the file, as it already offers options to show facing pages, recto/verso, baseline, etc. 


### Generate your first PDF from the browser

Once Paged.js has done its work, you can generate the PDF using the Save as PDF function your browser is using. 
1. Click on the “Print” button of your browser. (It will most likely be in `File > Print` or, on your keyboard, `CTRL/CMD + P`)

2. Change the _Destination_ to "Save as a PDF file”.

3. In the avanced settings, as Paged.js is not using any of those options, you need to be sure the that the following statements are right:
   - _Margins_ are set to “none”,
   - “Headers and footers” is unchecked or set to none,
   - “Background graphics” is checked.

You can then open your PDF in your favorite PDF reading tool.