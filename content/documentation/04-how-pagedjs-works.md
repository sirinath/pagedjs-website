---
title: "How Paged.js works"
date: 2019-09-03T18:23:22+02:00
draft: true
part: 2
weight: 4
intro: "If you have ever tried to lay out a website for printing or to publish a book in HTML, you’ll have experienced the limitations of styling meant for displaying scrolling text on screens. Paged.js helps make it possible to produce paginated material from your browser."  
---




{{< figure src="https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/flux-page.png" >}}

Paged.js is made of three modules, each one has a very precise task:

- the **chunker** fragments the content into discrete pages;
- the **polisher** transforms the CSS declarations into ones that the browser can understand;
- and the **previewer** creates the preview of your book in the browser.

To start using Paged.js, all you have to do is to write the standardized CSS declarations and call the script. The library will interpret the declarations either by converting them to CSS styles  natively supportted by the browser or replacing them with JavaScript implementations.



## The Chunker: fragmenting the content


The chunker takes all your rendered content, with all the design rules applied to it, puts as much possible of it in a first box and looks for the overflowing content.

<!-- ![The chunker puts all your rendered content in a box and checks the overflow](https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/chuncker-1.png) -->

After that, the script creates a new box, puts as much as possible of the overflowing content in it looks for the next overflow, and again and again, until there is no content left to put in the boxes. Paged.js does this repeatedly until the book is done. 

<!-- ![The chunker creates a new box and puts the overflow content in it]() -->

{{< figure src="http://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/chuncker-2.png" >}}

To do so, we use the mighty CSS columns properties: each page is a column. This offers us an easy access to some of the properties already implemented in browsers, such as column-breaks, element(), or widows and orphans.

PS. This doesn't prevent you from using the CSS column property in your content



Since the content on each page is then fixed, you’ll need to refresh the page to repeat the process anytime something changes in your HTML or CSS.



We will see that it is possible to control page breaks and change the size of the content area by changing the margins from one page to another using a page master layout.


## The Polisher: polyfilling the print declarations

The Polisher is the part of Paged.js that translate the CSS rules for each of your page. It builds new boxes to create page layouts and places your content in these pages. We use the CSS tree library to parse the CSS from text and replace `@page` rules with classes. The polisher also replaces calls such as running headers, page counters, or CSS generated content functions with variables from the DOM.

{{< figure src="https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/div-pages.png" >}}

Let's take the following CSS as an example:

```css {linenos=table,linenostart=1}
@page {
  size: 148mm 210mm;
  margin-top: 10mm;
  margin-right: 20mm;
  margin-bottom: 25mm;
  margin-left: 15mm;

  @bottom-left {
    content: counter(page);
  }

  @bottom-center {
    content: string(title);
    text-transform: uppercase;
  }

}

h1#title {
  <!-- "Moby Dick" -->
  string-set: title content(text);
}
```


Paged.js transforms this into CSS that is understandable to the browser:

```css {linenos=table,linenostart=1}
.pagedjs_page {
	--pagedjs-string-title: "Moby Dick";
	margin-top: 10mm;
	margin-right: 20mm;
	margin-bottom: 25mm;
	margin-left: 15mm;
}

.pagedjs_page .pagedjs_margin-bottom-left::after {
	content: string(title);
}

.pagedjs_page .pagedjs_margin-bottom-center::after {
	content: var(--pagedjs-string-title);
	text-transform: uppercase;
}
```


This will apply to the transformed DOM (this is a simplified version of what Paged.js generates):

```html
<div id="page-1" class="pagedjs_page">
	<div class="pagedjs_pagebox">
    	<div class="pagedjs_margin pagedjs_margin-bottom-left hasContent">
				<div class="pagedjs_margin-content">
          <!-- ::after -->
        </div>
			</div>
      <div class="pagedjs_margin pagedjs_margin-bottom-center hasContent">
				<div class="pagedjs_margin-content">
          <!-- ::after -->
        </div>
			</div>
    </div>
		<div class="pagedjs_area">
			<!-- content of the page -->
		</div>
	</div>
</div>
```


Across this documentation, we will specify the CSS properties we implement and the one we use instead so that they can be interpreted by the browser.

## The Previewer: rendering the paginated document

The preview module of Paged.js loads the modules, uses the polisher and the chunker to layout the content. It builds the preview of your document in your browser, so you can see exactly how things are going to look and then adjust your content accordingly.

Behind the curtains, Paged.js modifies the DOM structure by adding some HTML elements to build and render your layout. Those modifications are made during the rendering, there is no modification of your original HTML document.

It also adds references to every node (for example, it adds classes to differentiate right or left pages). This gives us complete control over the page layout without any hacks.

This documentation will specify for each CSS property, the modifications of the DOM needed to build and render your book. You can also access these elements in Javascript directly with their classes if you want to go further with Paged.js and add your own functions.
