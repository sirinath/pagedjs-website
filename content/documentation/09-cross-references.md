---
title: "Cross References"
date: 2020-01-28T15:56:05+01:00
draft: false
weight: 10
intro: "References and links inside the book: send the reader to another page using hyperlinks"
---






Many documents contain internal references like “see chapter 7” or “on page 23”. The reference may change according to your layout (specially page number). So, you can use generated content to create it.

You can use specific values for the content property  to automatically create these types of cross-references: [target-counter()](https://www.w3.org/TR/css-gcpm-3/#funcdef-target-counter),  [target-text()](https://www.w3.org/TR/css-gcpm-3/#target-text-function). Each of these displays information obtained from the target of a link. 

You can use this target-counter() and target-text() functions to create table of content and book indexes for example (see the following parts).



## Link targeted

For cross-references, links are used that target anchors in the document. 

First of all, in your HTML, you define a relevant element with an unique id in your document. For example, the figure 3 of your document:

```html
<figure id="figure-3">
	<img src="image.jpg">
	<p class="caption">Figure 3: an image</p>
</figure>
```



In an other place of your HTML, you create a link anchor that refers to the unique identifier of your revelant element:

```html
<p>see the <a class="link" href="#figure-3">figure 3</a></p>
```



## Target-counter()

Generated content are set into your CSS. To find the pages on which the relevant elements appear inside the document, use the [target-counter()](https://www.w3.org/TR/css-gcpm-3/#target-counter) function in a `content` property set into `::before` or `::after` pseudo-elements. As all content properties, it can include some text:

```css
.link::after {
	content: ", page " target-counter(attr(href url), page);
}
```

This code take all the elements with a class named here `link` and search the element with the unique identifier specified in the `href` attribute of each first elements. When your document is rendered, it will generate the page number of the page where the element with the unique identifier appears.

With the example below, the text generated in your document will be  “see the  figure 3, page 27”.



You can also specified a counter style:

```css
.link::after {
	content: target-counter(attr(href url), page, lower-roman);
}
```

For the moment, the `targer-counter()` function works only with the counter page. That means you can't use counters with other given name.





## Target-text()

The [target-text()](https://www.w3.org/TR/css-gcpm-3/#target-text) function works like targer-counter() but retrieves the text value of the element referred to by the URL. You can use it to have title of chapter for example.

In you HTML, create the title of a chapter with an unique identifier:

```HTML
<h1 id="chapter-1">Chapter 1. The beginning</h1>
```

Later in your document, create an link to this chapter:

```HTML
<p>Some text that refer to the <a class="link" href="chapter-1">chapter</a>.<p>
```

In the CSS, use target-text to generate the cross reference:

```css
.link::after {
	content: "(see " target-text(attr(href url)) ")";
}
```

The text generated in your document will be  “Some text that refer to the chapter (see Chapter 1. The beginning).”



The W3C define an optional second argument specifies what content is retrieved, using the same values as the string-set property (`content`, `before `, `after`, `first-letter`) but it's not implemented yet in `paged.js`.



## Debug


These functions only take a fragment URL which points to a location in the current document. If there’s no fragment, if the ID referenced isn’t there, or if the URL points to an outside document, the function returns nothing in the case of target-text() and `0` in the case of target-counter().   
However, if your document is long, maybe your target element is not yet loaded and the function also returns nothing or `0`. Wait until the loading is completed for the page number to be generated.

If your page number seems wrong is maybe because the element that you target is fragmented on several pages. We recommend using short elements to target (chapter titles rather than the entire chapter section).
