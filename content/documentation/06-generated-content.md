---
title: "Generated Content"
date: 2019-09-03T18:23:22+02:00
draft: true
intro: "The content property in CSS is one powerfull way to add structure to your content, without fixing it in the HTML. Let’s check how the web manage those automatically created properties before we get to what Paged.js can create automatically"  
weight: 6
---


One of the important advantages of CSS is that it helps you to separate a document’s style from its content. The separation of HTML from CSS makes it easier to maintain sites, share style sheets across pages, and display documents to different environments. In some case, some elements are not part of the content itself, but are help to read in different environnements. This can be auxiliary information like inserting the word "Figure" before the caption of a figure, or "Chapter 7" before the seventh chapter title.

Those are usually made using CSS _generated content_ properties. That will avoid problems with numbering figures when one is added in the middle of your content. Or if you want to reuse the chapter in another book, and have a new way to number figures.

In technical terms, generated content exists only in the layout of the web document: they are not part of the DOM tree.

## The content property

The `content` property is used within `::before` and `::after` pseudo-elements. In the declaration, specify the `content` property what you want to generate automatically as its value. For example, the following rule inserts the string "Note: " before the every element whose class attribute contains "note":

```css {linenos=table,linenostart=1}
.note::before {
	content: "Note: ";
}
```


You can style the element right where it’s set, like this:

```css {linenos=table,linenostart=1}
.note::before {
	content: "Note: ";
	color: red;
	font-weight: bold;
}
```


## Generated text

You can directly declare your text in the CSS (like above) but you can also use text specified in a `data-` custom attribute.

In your HTML:

```html
<p class="ref" data-ref-id="0215">Some blabla as a reference</p>
```


In your CSS:

```css {linenos=table,linenostart=1}
p.ref::before {
  content: attr(data-ref-id);
}
```


It's also possible to combine elements in the content property:

```css {linenos=table,linenostart=1}
p.ref::before {
  content: "Reference " attr(data-ref-id) ": ";
}
```


Once displayed you will have this text: 

> `Reference 0215: Some blabla as a reference`

## Generated counters

`css-counter` is a CSS property that lets you count elements within your content. For example, you might want to add a number before each figure caption. To do so, you would reset the counter in the `<body>` selector, increment it any time a caption appears in the content, and display that number in a `::before` pseudo-element.

```css {linenos=table,linenostart=1}
body {
  counter-reset: figureNumber;
}

figcaption {
  counter-increment: figureNumber;
}

figcaption::before {
  content: counter(figureNumber);
}
```


## Generated images

If you need to have an image in your generated content, you can do it like this:

```css {linenos=table,linenostart=1}
.glossary::after {
  content: " " url("/images/glossary-icon.png");
}
```


## Generated links

It can be useful to display the actual links of your content as a long URL when you want to print your webpage. The following example inserts the value of the href attribute in parentheses after each `<a>` element:

```css {linenos=table,linenostart=1}
a::after {
  content: " (" attr(href) ")";
}
```


## Generated content for paged media

The use of generated content is possible without paged.js; `content` is a CSS property implemented in all browsers.

But to design a book (or a paginated content) you need some elements added to help readers navigate between pages: running heads and footers, page numbers, table of content, index, cross-references, etc.

These elements don’t exist in the HTML as a content, you need to create them automatically. To do that you can use  a combination of syntaxes and properties that paged.js implements called Generated Content for Paged Media.
