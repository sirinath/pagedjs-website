---
title: "Web design for print"
date: 2019-09-03T18:23:22+02:00
draft: false
part: 5
weight: 5
intro: "If you want to start designing your own book, now is the perfect time!"
---


## The `@media print` query

Responsive design is made possible by the use of media queries: a set of CSS properties that you can use to define the styles when your web page is rendered on a tablet terminal, a phone, a TV screen, etc. One of those media queries, the `@media print` was specifically made to print a webpage. For example, you can remove menu, icons, change the way the hyperlinks will appear, etc. As a polyfill, Paged.js will use the CSS rules under that media queries to define the styles of your book:

```css 
@media print {
  /* All your print styles go here */
}
```

If you don’t use Paged.js, the styles declared in this media query will only be applied when the web page is printed (or saved as PDF) from the browser print dialog. For example, the font-size may vary from the screens to the printer or images might be removed (with `display:none`) to save some ink. If you use Paged.js, you’ll be able to see in your browser a preview of how your styles will appear when printing.

## @page rule

The @page rule lets you specify various aspects of your page model such as dimensions, orientation, background, margins, cropping, registration marks, and so on. All the CSS properties that affect the layout of your page must be declared inside.

### Page size property

The `size` property specifies the size of your page (excluding bleeds). This fixed size can be declared by length units in centimeters (`cm`) millimeters (`mm`) or inches (`in`). The first number is the width of your document and the second number is the height. By default, Paged.js uses the letter size (8.5in × 11in).
It's also possible to specify the page size by using keywords that can be combined with page orientation (`portrait` or `landscape`). By default, your page will always be printed as portrait.


```css 

/* Define a custom page size */
@page {
    size: 140mm 200mm;
}

/* Use A5 paper */
@page {
  size: A5;
}

/* Use A4 paper in landscape orientation */
@page {
  size: A4 landscape;
}
```

{{% table width="80%" caption="Page size keywords and their size" %}}

| Page size keyword     | Size          |
| :--                   |           --: |
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

{{% /table %}}

### CSS variables

You can’t use CSS variables to define the page size because as browsers do not support it. 

<!-- Unfortunately, the `@page { size }` property is the only thing we can't polyfill that we need to print (to generate the PDF). -->

However, Paged.js create a set of custom properties from your declaration and use them to layout. You can therefore reuse them in your document if you need them for your calculations:

- `var(--pagedjs-pagebox-width)` for the width of your page
- `var(--pagedjs-pagebox-height)` for the height of your page

{{< note >}}
Warning: the browser can only understand one page size for your document. If you need to create a document with different page sizes, you will need to create two separate HTML files and generate two PDFs.
{{< /note >}}

## Margin size property

The margins of your pages needs to be declared in the `@page` rule with the same syntax you usually use for the margins. You can use length units like centimeters (`cm`) millimeters (`mm`), inches (`in`) or pixels (`px`).

```css 
@page {
  margin: 20mm 30mm;
}
```


By default, the margins are set to 1 inch.

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


## Facing pages or recto/verso

Since Gutemberg, books are designed with facing pages in mind: the left and right pages are generally symmetrical to each other, using the fold as the axis. 
 y change, you can use `:left` and `:right` pseudo-selectors on `@page` rules and style your pages differently.


Let's look at an example with different margins: outside margins are bigger than inside onex.

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


If your document is a recto/verso book (ie has no need for facing pages), you can use `:recto` and `:verso` page selectors the same way.

## Page breaks

Paged.js automatically creates a page break when your content doesn't fit into a page. However, you may need to control this fragmentation. Typically, in a book, you may want to start all of the chapters of the book on a right page. There are a few properties to help you do that.

<!-- In this part, we only talk about breaks from the point of view of global layout. Controlling the breaks inside paragraphs (widows or orphans) or avoiding fragmenting specific elements will be discussed in another part. -->

The `break-before` property indicates that your element should start on a new page that can be:

- with `break-before: page`, element can start on any new page;

* with `break-before: right` or `break-before: left`, the element starts on the next right or on the next left page (a `blank` page will be automatically created if needed);

* with `break-before: recto` or `break-before: verso` are an alternative for `break-before: right`or `break-before: left`;

Let's imagine you have all your book chapters in `<section>` elements with a `chapter` class and you want your chapter to always start on the right page. You would write it like this:

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


If you prefer, you can also use `break-after` the same way:

- `break-after: page` will push the content after the element to the next page;

* `break-after: right` or `break-after: left` will push the content after the element on the next right or left page;

* `break-after: recto` or `break-after: verso` will push the content after the element on the next recto or verso page;



## Pseudo class selectors for pages

The W3C has defined Pseudo class selectors for specific pages. We have already met the `:left` and `:right` selector. But there are some useful other ones:

- `:first`, select the first page of you document,
- `nth()`, let you specify the page you want to select by writing its number (ex: `@page:nth(3)` selects the third page),
- `:blank`, select all the blank pages of your document (blank pages are a result of a forced page break right or left).

A page matched by a pseudo class selector can also be matched by other page pseudo-classes. The rules that apply are defined following the CSS cascade principles.


## Bleeds

To be sure that there won’t be any white paper visible while printing, we use the `bleed` property. It specifies the size of the bleed area outside the page box. It won’t affect the space on the page for your content

```css 
@page  {
  bleed: 6mm;
}
```


## Crop and cross marks

You can add crop marks outside the page box to facilitate the trimming. For professional printing, it's also possible to add registration marks. These are used to align sheets of paper during the printing process.

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


## Code Review for a chapter

```css 
@media print{
    @page {
        size: 140mm 200mm;
        margin: 10mm 15mm;
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

