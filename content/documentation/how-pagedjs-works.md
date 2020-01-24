---
title: "How paged.js works"
date: 2019-09-03T18:23:22+02:00
draft: true
part: 2
weight: 4
intro: "Implementing CSS for the print is not an easy task. Here is an overview of what Paged.js is doing without you being aware of that."  
---


If you have ever tried to lay out a website for printing or to publish a book in HTML, you’ll have experienced the limitations of styling meant for displaying scrolling text on screens. Paged.js helps make it possible to produce paginated material from your browser.

![Transform flux into pages](https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/flux-page.png)



## The paged.js library

The Paged.js library can be considered as a polyfill for the existing CSS modules - i.e., it is code that implements a feature on web browsers that do not support the feature. Note that this is our own interpretation of the implementation of this modules and, when the rules are implemented by browsers, they may differ.

We try to respect the specifications as much as possible, but they can be unclear and leave a certain degree of indeterminacy. In this case, we develop our own rules that seem to us to be the most technically appropriate and best meet the expectations of typographers and designers.

All you have to write the standardized CSS declarations and paged.js does its kind of magic. The library interprets the declarations and transforms them to other declarations that your browser understands, either by converting them to CSS styles that the browser does support or replacing them with JavaScript implementations.

The library is build in differents Javascript parts that work together:

- the **chunker** fragment the content into discrete pages,
- the **polisher** transforms the CSS declarations,
- and the **previewer** creates the preview of your book in the browser.

## The Chunker: fragmenting the content

The chunker part of paged.js gets your styled content split into page chunks.

It take all your rendered document content - this means your content with all the design rules applied to it. It put this content in a box that has the size of your content area (i.e. page size minus the size of the margins). It tries to fit everything into this container and then looks for the overflowing content.

![The chunker puts all your rendered content in a box and checks the overflow](https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/chuncker-1.png)

After that, the script creates a new box and puts the overflow content in it. Again, it looks for the next overflowing content.

Paged.js does this repeatedly until the book is done. Once you’ve got your content chunked, you’ll need to repeat the process anytime something changes.

![The chunker creates a new box and puts the overflow content in it](https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/chuncker-2.png)

We will see that it is possible to control page breaks and change the size of the content area by changing the margins from one page to another using a page master layout.

**Using CSS column**

Each content area is a CSS column independant from the other areas. Using columns allows the script to have easier access to the linked properties already implemented in browsers, such as breaks, element properties, or widows and orphans.

This doesn't prevent you from using the CSS column property in your content

## The Polisher: polyfilling the print declarations

With the polisher part, Paged.js also builds new boxes to create page layouts and and places your content boxes on these pages.
{{< figure src="https://gitlab.pagedmedia.org/tools/pagedjs-documentation/raw/master/images/div-pages.png" title="" >}}

In parallel, the script reads your CSS file to have information about the print styles and transforms your `@page` rules into classes that your browser understand today. We use the CSS tree library to parse the CSS from text and replace `@page` rules with classes. The polisher also replaces calls such as running headers, page counters, or CSS generated content functions with variables from the DOM.

Paged.js includes support for a lot of things from the CSS (generated content for) paged media specifications, so that you can write CSS that conforms to those specifications. Paged.js does the work of applying it on the transformed DOM.

Let's take the following CSS as an example:

```CSS
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

```CSS
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

## The Previewer: rendering the paginated document

The preview module of paged.js is specially dedicated to browsers. The previewer loads the modules, and uses the polisher and chunker to parse and layout the content. It builds the preview of your document in the browser, so you can see exactly how things are going to look and then adjust your content accordingly.

With the script `paged.polyfill.js`, the previewer module is launched automatically and immediately (as soon as the page with the script is called). It will by default apply to all your HTML content.

Using es6 modules you can add the previewer to your own scripts. You can also specify the delay before the paged.js script is launched. (We will see this in another part.) It is important to note that paged.js is just a script like other scripts, so you can use it however you want.

## DOM modifications

Paged.js modifies the DOM structure by adding some HTML elements to build and render your layout. This modification is only made during rendering, so there is no modification in your original HTML document.

It also adds references to every node (for example, it adds classes to differentiate right or left pages). This gives us complete control over the page layout without any hacks.

This documentation will specify for each CSS property the properties that are added to build and render the layout. You can access these elements in Javascript directly with their classes if you want to go further with paged.js and add your own functions.
