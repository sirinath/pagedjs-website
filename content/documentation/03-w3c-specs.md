---
title: "W3C specifications for printing"
date: 2019-10-03T10:23:22+03:00
draft: false
part: 3
weight: 3
intro: "W3C is thinking about everything."  
---


## W3C CSS modules

For printing pages you need very different rules from those used to display content in the browser. For example, you’ll want to declare fixed sized pages rather than lay out a continuous flow of text. Books also need many specific elements for the printed layout: margins, running headers, page numbers, a table of contents, and so on.

Fortunately the work on CSS at the W3C has resulted in special modules of the CSS standard for managing the layout of a HTML document during printing. These modules can be used in a print stylesheet with the media query `@media print{}` and will only be applied when
the web page is printed from the browser print dialog to create a PDF.

- [CSS Paged Media Module Level 3](https://www.w3.org/TR/css3-page/) “describes the page model that partitions a flow into pages. (…) It adds functionality for pagination, page margins, page size and orientation, headers and footers, widows and orphans, and image orientation.”
- [CSS Generated Content for Paged Media Module](https://www.w3.org/TR/css-gcpm-3/) defines many special requirements for the display of printed document content: running headers and footers, footnotes, generated text for cross-references or table of contents, PDF bookmarks, etc.
- [CSS Fragmentation Module Level 3](https://www.w3.org/TR/css-break-3/) defines how and where CSS boxes can be fragmented, including across page breaks. (This module is not specific for print.)
- [ CSS page floats](https://www.w3.org/TR/css-page-floats-3/) defines how an element is to be removed from the normal flow and instead be placed into a different place depends on page. ([see the article “Page Media approaches: page floats”](https://www.pagedmedia.org/page-floats/))

We try to respect the specifications as much as possible, but sometimes, they can be unclear or leave a certain degree of indeterminacy. Thus, Paged.js implementation is made of our own interpretation and when the rules will be implemented by the browsers, they may differ from what we would have built. 

At some point, we’ll need things that are not yet thought of by the W3C. Therefore, we may develop our own rules, based on what the community of users needs. We’ll try to take the most appropriate  technically to meet the expectations of typographers and designers. In that case, we’ll write down the specifications and share those with the other W3C members.

## Support of W3C specifications in browsers

The previous CSS standard modules were written by the World Wide Web Consortium (W3C). W3C publishes documents that define Web technologies (including CSS) which are considered Web Standards. W3C modules are published publicly throughout the process of their development until they are finally released as a [W3C Recommendation](https://www.w3.org/2018/Process-20180201/#rec-publication). The modules we need for pagined media are at various stages of the process, but most are still in the [Working Draft](https://www.w3.org/2018/Process-20180201/#revised-wd) stage.

Browser developers can start implementing these recommendations at any point, knowing they may change later, but the developers are not obliged to implement all the CSS specifications until they become W3C Recommendations.

Thankfully, browser developers have already taken some interest in implementing parts of the Paged Media Working Draft standards and [@page rules have partial support](https://caniuse.com/#search=%40page) in Chrome, Firefox and IE. But it’s still difficult to use these browsers effectively for the output of paginated content.

So when it comes to producing paginated content from the browser, this is where we are today: the rules for printing web pages from a browser are written, and even standardised, but we can’t as yet use them effectively.



### Which browser to use?

We really want Paged.js to work perfectly with all the browsers around, but as we’re writing those words, some are more suitable than others. It depends on the features you want to have for your documents (CSS flexbox, hyphens…). But you also maybe need a browser that take into account the size property to generate PDFs. Here are some explanations to help you choose.

#### Support of @page { size }

Paged.js acts like a sort of polyfill but there is one thing we can't manage that we need to print correctly: the support by the browser of the `@page { size }` property. This property will allow you to create a PDF at the right size when it is generated. These property is only supported in some browsers:

- Chromium
- Google Chrome
- Brave
- Opera

We know that many of you are attached to Mozilla Firefox (and so are we). It is still possible to use Paged.js with it but you will have to manually change the PDF size when you generate it (in the custom sizes). Be careful to calculate bleeds and crop marks if you need to add those.

#### Support of CSS grid

You must also use a recent version of these browsers because we use some CSS grid module properties for the construction of the pages. CSS grid is supported in most browsers since mid-2017. You can see here if your browser supports CSS grid: https://caniuse.com/#feat=css-grid

#### Different rendering between browsers

The result will not always be the same from one browser to another because they don't use the same browser engine. For example, line-height is not managed in the same way on Firefox and Chrome. The result will also not be the same depending on the OS you are using. For example, hyphenation is managed in Chrome only on Apple OSX.

We recommend staying on the same browser and OS for the design and generation of the PDF to avoid unpleasant surprises.