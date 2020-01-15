---
title: "Generated Content"
date: 2019-09-03T18:23:22+02:00
draft: true
part: 5
layout: doc-single
intro: "Content automatically created by Paged.js, based on your content, and you can put it in margins!"  
menu: "documentation"
weight: 5
---


One of the important advantages of CSS is that it helps you to separate a document’s style from its content ([W3C](https://www.w3.org/standards/webdesign/htmlcss#whatcss)). The separation of HTML from CSS makes it easier to maintain sites, share style sheets across pages, and display documents to different environments.

In some case, some elements are not essential to understand the content but are useful for a better reading into different environnements. This can be auxiliary information like inserting the word "Figure" before the caption of a figure, or "Chapter 7" before the seventh chapter title. ([W3C](https://www.w3.org/TR/CSS2/generate.html))

Generaly, it's better if this content is generated automatically. You will not be have problems with numbering if a figure is added in the middle of your content at the last minute. A lot of this material is also design choices (do you write "Chapter 7" or "Chap. 7"?), so it is logical that they are declared in CSS.

This element are called _generated content_. You can use CSS to add them when a document is displayed. In technical terms, generated content exists only in the layout of the web document: they are not part of the DOM tree.

## The content property

The `content` property is used with the [::before](https://www.w3schools.com/cssref/sel_before.asp) and [::after](https://www.w3schools.com/cssref/sel_after.asp) pseudo-elements, to insert generated content before or after an element's document tree content. To specify this, make a rule and add [::before](https://webplatform.github.io/docs/css/selectors/pseudo-elements/::before) or [::after](https://webplatform.github.io/docs/css/selectors/pseudo-elements/::after) to the selector. In the declaration, specify the [content](https://webplatform.github.io/docs/css/properties/content) property with the text content as its value.

For example, the following rule inserts the string "Note: " before the content of every element whose class attribute has the value "note":

```
.note::before {
	content: "Note: ";
}
```

The style of the element can be specify also info the delaration, like this:

```
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
<p class="ref" data-ref-id="0215">Text of the reference</p>
```

In your CSS:

```css
p.ref::before {
  content: attr(data-ref-id);
}
```

It's also possible to combine elements in the content property:

```css
p.ref::before {
  content: "Reference " attr(data-ref-id) ": ";
}
```

Once displayed you will have this text: `Reference 0215: Text of the reference`

## Generated counters

`css-counter` is a CSS property that lets you count elements within your content. For example, you might want to add a number before each figure caption. To do so, you would reset the counter for the `<body>`, increment it any time a caption appears in the content, and display that number in a `::before` pseudo-element.

```
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

If you need to have an image in your generated content, use this following code:

```css
.glossary:after {
  content: " " url("/images/glossary-icon.png");
}
```

## Generted links

It can be useful, espacially for print, to display the links of your content. The following example inserts the value of the href attribute in parentheses after each `<a>` element:

```css
a::after {
  content: " (" attr(href) ")";
}
```

## Generated content for paged media

Use generated content is possible without paged.js; `content` is a normal CSS property implemented in all browsers.

But to design a book (or a pagined content) you need some elements added to help readers navigate between pages: running headers and footers, page numbers, a table of content, an index, cross-references, and so on.

These elements make little sense on the web and don’t exist in HTML content; you need to create them automatically. To do that you can use Generated Content for Paged Media, a combination of syntaxes and properties that paged.js implements. We will see how to use these special techniques in the next parts.
