---
title: "Global Layout"
date: 2019-09-03T18:23:22+02:00
draft: true
part: 4
layout: doc-single
intro: "If you want to start designing your own book, now is the perfect time!"
menu: "documentation"
weight: 4
---

<!-- 
- Print media query
- @page rule

* Page size property
* Margin size property
* Page spread or recto/verso
* Page breaks
* Crop marks and bleed
* Code resume of the chapter -->


## Print media query

The media queries allows you to target different media type and screen size. It's typically used in reponsive design to adapt and optimize your design according to the interface on which a reader will read your content.

Media queries can also be used to create your print styles using `@media print`.

The first thing to do in your style sheet is to specify this request:

```css
@media print {
  /* All your print styles go here */
}
```

The styles declared in this media query will only be applied when the web page is printed from the browser print dialog to create a PDF. For example, the size of the type for print might be declared differently to that for screen display so it is more suitable for printing, or images might be removed (with `display:none`) to save ink. Paged.js provides you a preview in the browser of how your styles will appear when printing.

## @page rule

The @page rule lets you specify various aspects of your page model such as dimensions, orientation, background, margins, cropping, registration marks, and so on.

All the CSS properties that affect the layout of your page must be declared inside.

## Page size property

The `size` property specifies the size of your page (excluding bleeds). This fixed size can be declared by length units in centimeters (`cm`) millimeters (`mm`) or inches (`in`). The first number is the width of your document and the second number is the height. By default, paged.js uses the A4 size (210 × 297 mm).

The size property is declared inside the `@page` rule:

```Css
@page {
    size: 140mm 200mm;
}
```

### Page size and page orientation keywords

It's also possible to specify the page size by using some page size keywords. Optionally, they can be combined with page orientation keywords (`portrait` or `landscape`) to change the orientation of the page (which is portrait by default).

```css
/* Use A5 paper */
@page {
  size: A5;
}

/* Use A4 paper in landscape orientation */
@page {
  size: A4 landscape;
}
```

**Page size keywords and their size**

| **Page size keyword** | **size**      |
| --------------------- | ------------- |
| A0                    | 841 × 1189 mm |
| A1                    | 594 × 841 mm  |
| A2                    | 420 × 594 mm  |
| A3                    | 297 × 420 mm  |
| A4                    | 210 × 297 mm  |
| A5                    | 148 × 210 mm  |
| A6                    | 105 × 148 mm  |
| A7                    | 74 × 105 mm   |
| A10                   | 26 × 37 mm    |
| B4                    | 250 × 353 mm  |
| B5                    | 176 × 250 mm  |
| letter                | 8.5 × 11 in   |
| legal                 | 8.5 × 14 in   |
| ledger                | 11 × 17 in    |

### CSS variables

You can’t use CSS variables in this property because browsers do not support it. Unfortunately, the `@page { size }` property is the only thing we can't polyfill that we need to print (to generate the PDF).

However, we create CSS variables from your declaration and use them in the previewer. You can therefore reuse them in your document if you need them for your calculations:

- `var(--pagedjs-pagebox-width)` for the width of your page
- `var(--pagedjs-pagebox-height)` for the height of your page

### Multiple page sizes

Your browser can only understand one page size for your document. If you want to create a document with different page sizes, you will need to create two separate HTML files and generate two PDFs.

## Margin size property

The margins of your pages are to be declared in the `@page` rules with the same syntax you usually use for your other elements. Use length units like centimeters (`cm`) millimeters (`mm`), inches (`in`) or pixels (`px`).

```css
@page {
  margin: 20mm 30mm;
}
```

By default, the margins are set to 20mm.

Other examples with different syntaxes:

```css
/* All margins are 30mm */
@page {
  margin: 30mm;
}

/* Top and bottom margins are 3in,
left and right margins are 2in */
@page {
  margin: 3in 4in;
}

/* All margins are different */
@page {
  margin-top: 20mm;
  margin-bottom: 25mm;
  margin-left: 10mm;
  margin-right: 35mm;
}
```

## Page spread or recto/verso

A basic unit for books is the page spread: the left and right page are of the same size and typically are symmetrical to each other and are centered on the gutter. So, it’s important to setup a page structure with the page size and rules making a distinction between right and left pages. For this, you can use `:left` and `:right` selectors on `@page` rules and style your pages differently.

Let's look at an example with differing margins:

```css
@page:left {
  margin-left: 25mm;
  margin-right: 10mm;
}

@page:right {
  margin-left: 10mm;
  margin-right: 25mm;
}
```

If your document is more a recto/verso style, you can use `:recto` and `:verso` page selectors in the same way.

## Page breaks

Paged.js automatically creates a break page when your content doesn't fit into a page. However, it will sometimes happen that you need to control this fragmentation. Typically, in a book, you need to start your chapters always on a right page. There are a few properties to help you do that.

In this part, we only talk about breaks from the point of view of global layout. Controlling the breaks inside paragraphs (widows or orphans) or avoiding fragmenting specific elements will be discussed in another part.

The `break-before` property indicates when your content should start on a new page depending on the option chosen:

- with `break-before: page`, the element start on the next page;

* with `break-before: right` or `break-before: left` the element start on the next right page or the next left page (a blank page will be automatically created if the right/left page is not the next one);
* with `break-before: recto` or `break-before: verso` the element behaves like `break-before: right`or `break-before: left`;

Let's imagine you have all your book chapters in `<section>` elements with a `.chapter` class and you want your chapter always to begin on the right page. You can use this code:

```css
.chapter {
  break-before: right;
}
```

You can also use page breaks on inline-element. For exemple, the following code forces the level 2 titles to always start on a new page:

```css
h2 {
  break-before: page;
}
```

If you prefer, you can also use `break-after` in the same way:

- `break-after: page` will push the content after the element to the next page;

* `break-after: right` or `break-after: left` will push the content after the element on the next right or left page;
* `break-after: recto` or `break-after: verso` will push the content after the element on the next recto or versopage;



## Pseudo class selectors for pages

The W3C has defined Pseudo class selectors for specific pages. We already see the `:left` and `:right` selector. But there is other:

- `:first` select the first page of you document,
- `nth()` let you specify a page number of your document (ex: `@page:nth(3)` selects the third page),
- `:blank` select all the blank pages of your document create because of a forced page breaks.

A page matched by a pseudo class selector can also be matched by other page pseudo-classes. The rules that apply are defined by the cascade principle.



## Bleed and crop marks

**Important**: Bleed, crop marks and cross marks were added to paged.js on February 28, 2019. However, we are still working on it. The implementation may change in the coming weeks, so we advise you to use the property with great care.

### Bleed

To cut the sheet correctly, the `bleed` size property can be used. This property specifies the extent of the bleed area outside the page box.

```css
@page  {
  bleed: 6mm;
}
```

### Crop and cross marks

To know where to cut the paper, you can add crop marks outside the page box to facilitate the trimming. For professional printing, it's also possible to add registration marks. These are typically cross-shaped marks outside each edge of the page box used to align sheets of paper during the printing process.

This two type of marks must be added in the same `marks` property, you can use either or both of them.

```css
/* To set crop and cross marks */
@page {
  marks: crop cross;
}

/* To set only crop marks */
@page {
  marks: crop;
}
```

## Code summary for a chapter

```CSS
@media print{
    @page {
        size: 140mm 200mm;
        margin: 10mm 15mm;
        /* /!\ be careful by using the following properties */
        bleed: 6mm;
        marks: crop cross;
    }
    @page:left {
        margin-left: 35mm;
        margin-right: 15mm;
    }
    @page:right {
        margin-left: 15mm;
        margin-right: 35mm;
    }
    .chapter{
        break-before: right;
    }
}
```
