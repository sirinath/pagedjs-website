---
title: "Creating Templates: Atla"
date: 2020-03-08T16:53:38+01:00
draft: true
author: "Julien"
intro:  "The nice folks of Atla Open Press have been working with Coko to develop their new publishing workflow around the amazing [Editoria](https://www.editoria.pub). So we helped them designing their new book template, and they decided to offer it back to the community with an open source license."
---

## Atla 

Established in 1946 as the American Theological Library Association, Atla
is a membership association of librarians and information professionals,
and a producer of research tools, committed to advancing the study of
religion and theology. 


<img src="img/Atla-OpenPress.svg" style="display: inline; width: 40%; float: left; margin: 3em; margin-left: -2em"/>Atla Open Press publishes open access books, journals, and other serials that cover subjects at the intersection of librarianship and religious and theological studies that potentially impact libraries, that guide and support innovative library services, that enhance professional development for religious studies and theological librarians.

Atla is moving its publishing workflow toward [Editoria](https://www.editoria.pub), the community driven platform to make books that Coko is working on. As early adopters they’re an example of how you can change your publishing workflow by giving more space to collaboration to anyone involved in the making of the book. When they started to use the platform, we designed a book layout with them, and they kindly decided to offer it back to the community as an open source template for anyone, ready to be used with Paged.js. Even if some HTML classes are made specifically for the HTML output of Editoria, it’s pretty easy to change those to map it to your own work. 


In this serie of articles, we’ll go through the whole process of imagining a layout, looking at how we choose the fonts, looking at the paged media specifications to make pages with CSS, and the custom hooks we built for Paged.js to handle a lot of book design decisions.

### The physical book

The primary form of the books published by Atla Open Press are digital: epub and PDF made for the screen, downloadable from their website. But they also come as printed material, using Print On Demand services (or if someone wants to print a pdf at home using a cheap printer). Since that we can’t have a complete control over the final output of the book, we decided to stick to simple 6 × 9 inches. It’s working fine as a book, and it’s pretty easy to put 4 pages per sheet of paper, reducing the waste without loosing too much readability.

What happens next is never a nice and easy sequence of steps that we can follow. It’s more like a series of trails and path that are wandered at the same time: fonts, font-size, leading, margins, etc. as we need to figure out the amount of characters we’ll be able to put on a page. We don’t want to have too much character per line, but we don’t want to end up with 300 pages where 200 would be enough. It’s tweaking and looking at the smallest details. 
​
### The typefaces 

Typesetting is the act of putting letters on paper in an way that gracefully mix legibility and aesthetics. Therefore, it starts with drawn letters. Always.

When it comes to choosing a typeface, there are a set of things to keep in mind at all time, and based on what will be your specific needs for one particular project, you have to change the priority. It’s kind of my own checklist:

1. Remember the kind of letters you’ll need to work with.

   How much of letters outside of the latin glyphset will you need? Is your content only english — i’m not sure that there is such a thing by the way—, or latin, or greek? What about cyrillic? Does it include some old transcript from oral languages that has just been include in the unicode? Since the books Alta publishes is about theology and religions, it’s not gambling to say that there will be a lot of non-english characters. 

2. Remember every member of the family you’re going to need

   So we have a collection of glyphs that we need to render on screen. But sometimes you need to emphase on a part of the text, or show that a word has a different meaning or comes from another language. While an emphasis is not always set as italic, it has become over the year a kind of a standards:  the `em` HTML elemenet for the anphase is by default an italic in almost all browsers.

   Therefor, roman letters are not enough for this book. So we need to be sure that our letters will have those styles available. Italic is the minimum. We rarely use bold for emphasis as it’s often not subtle enough, but it’s always useful to have that options for headers and structure. 

3. Remember the type color

   Whatever font you will choose, you’ll need to have the right balance between white and black on the page (what we call the type color). That balance depends on how the type is set up based on the font: the amount of characters per line, the options for the justification: spacing, kerning, the size of the white space, etc. Especially when the text is justified. If you type color is too light, you can add more text per page. If it’s too dark, you need to add more line-height, or reduce the font-size. And if you really can’t make it work, then your typeface is not the right one for this book.

4. Remember the overall look

   I think that Tarantino said once that he never watched a movie without knowing it was a movie. I can say that i never read a book without knowing it was a book. It’s not that i couln’t get lost in the story, (it happened many times), but my designer’s eyes always get the overall feeling first: the type color, the font chosen, the margins, the alignments, etc. 

#### Choosing the right fonts

I’ve been through a lot of different direction at first  and I spent some time in the world of open source fonts, looking for the serif. The one that would be strict enough to say that the content is pretty serious and edited with care, but at the same time i wanted something that would represent the association that Atla is: warm and friendly. At the same time, we know that will need to support a wide range of letters and glyphs, so that’s where i looked first. 	

I’ve work with the [Brill](https://brill.com/page/1228?language=en) typeface, designed by the folks at [Tiro Typeworks](http://www.tiro.com/), before. First, because it supports Latin, Greek and Cyrillic. While it would have been a great choice, the end user licence agreement makes it pretty impossible to use in an open source project: the font can only be used in a non-commercial environement. Since we want to help every one who needs to make a book, either to sell it or to give it for free, we can’t choose the Brill.

Thanksfully, over the last 20 years, there have been a lot of movement in the world of open source type foundries, and there is even a specific license, the SIL Open Font License (OFL), around since 2005. There are a lot of foundries out there, and a lot of distributors, who offer font hosting, or tool to build webfonts kits to self host. So i went to my favorite sites and spent some time digging.

The [font library](https://fontlibrary.org/) is often a good place to start looking for open source fonts. It includes a CDN that let you test your fonts in your files without having to build any `@font-face` functions. I started to look at languages support: as much latin as possible, with greek and and cyrillic first. It’s always better to find a font that include greeks and latin, so you don’t have to adapt another font later. 

##### EB Garamond

First, the classic of the classics, the Garamond, but the one under OFL licence, the [EB Garamond](http://www.georgduffner.at/ebgaramond/). The glyph set and the open-type features are quite interesting. There are optical size: the font is redrawn for different size. You wouldn’t use the same glyphs for a text set in 12pt or for a text set in 10pt or in 16pt, which is a tremendous work. But there is one caveat: there is no bold, so that would leave us less option for the headings structure. 


{{<figure src="img/EBgaramond.png">}}

The other issue we had with the Garamond was the hardness of its shapes: the plume and the calligraphic gesture behind the letters survived in the digitalization of those letters. While this is giving a lot of authority to the letters, it doesn’t give the warm and kindness we can feel when discussing with the people of Atla. We won’t ditch that solution yet, but it’s not what we had in mind.


##### Noto Serif & Linguistics Pro

The [Noto fonts](https://www.google.com/get/noto/) project is an attempt from Google to have one super font family that support all languages ever with the same look and feel. If we’re decideing with Noto, we’ll have a font to use for any languages we’ll have in the coming books and there are plenty of styles and weight to use. Let’s look at it:

{{<figure src="img/NotoSerif.png" >}}

The last font i looked at was the [Linguistics Pro](https://fontlibrary.org/en/font/linguistics-pro), the most recent take on the Utopia Nova. The story of those letters go back to 1989 when Robert Slimbach designed the font for Adobe and licensed to the TeX Users Group (TUG) for free modification and redistribution. Over the year, it has evolved, to include polytonic Greek, modern and traditional Cyrillic, Vietnamese, among others, and rerelease in 2016 by Stefan Peev. It includes italic, bold and bold-italic which is gonna be useful for the headings.

{{<figure src="img/Linguistics.png" >}}

While the two fonts have a feeling close overall look and feel, they turn to be very different when you watching them carefully:

{{<figure src="img/notovslinguistics.png">}}


The Noto Sans is more friendly than the Garamond or the Linguistics. It’s a modern serif that bring back a lot of the manual gestures: the terminals of the f, r or capital S are all about calligraphic feelings, while the mechanical serifs are all about math and geometry. Those two characteristics are pretty useful when it comes to share shapes between letters from different part of the world but it comes at the price of the trustability of the text.
The Linguistics Pro, on the other hand feels less modern. It’s based on a character that could have been released at the end of the 18th century as we were slightly moving away from the calligraphic roots to enter the world of rationality that was coming. Thus, we can find in those drawing the characteristics of a sciencific drawn letter and the humanity of the rounded terminals, never being sharp. The friendly but trusty face.


So the choice was made. Onward to the grid.


*The part 2 of this article will look at how we defined the margin and the baseline grid and the different types of pages*