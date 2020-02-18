---
title: "Our position paper for the W3C CSS print workshop"
date: 2020-02-14T11:19:56+01:00
draft: false
class: 
intro: "With the upcoming W3C workshop on CSS print in Prague, we put together this position paper. If you never heard of Paged.js, it’s a pretty good start."
author: "the Paged.js folks"
---

# Paged.js  

*Position paper for the W3C Workshop on CSS Print (February 13th, 2020)*

Paged.js is a free and open source JavaScript library that paginates content in the browser to create PDF output from any HTML content. It was developed to meet the requirements encountered by Adam Hyde, Fred Chasen and Julien Taquet when building the book production platform Editoria: an open source solution was wanted and there were no existing solutions which did what Editoria needed. Right around that time, Julie Blanc joined the team and the four of us built it together.

Adam has spent years on helping organizations to define their own publishing workflows, and building publishing platforms. Fred has been working in the publishing field for quite a while and his work on epub.js has proven invaluable. Julien has been producing books with html and css for more than five years using a variety of tools, either at Book Sprints Ltd or for Coko. Julie was working on her PHD on evolution of design in typesetting and she was able to focus her research on the specifications which would be needed for the Paged.js project and how they might evolve.

Before the team jumped into the work, we decided to discuss the project first with the people in the field, and in January 2018, we organized the first such meeting at the MIT Press in Cambridge (MA). We were able to share our experience, examine existing solutions and share some of the experiments Fred has been working on.

Subequently, we started the next stage of development armed with the knowledge gained from that community meeting.

## Paged.js: a polyfill for print specifications

Following the Paged Media standards published by the W3C (ie the Paged Media Module, and the Generated Content for Paged Media Module), Paged.js acts as a polyfill for the CSS modules to print content in ways that are not normally supported by browsers.

### The technical bit behind Paged.js

When Paged.js starts on a webpage, it reads the HTML content and the CSS rules defined in the links or the header, and starts the paginating work by modifying the DOM structure, adding HTML elements to build pages, and translating the CSS to render the layout. The HTML source doesn’t need any specific properties or elements, as all the layout is defined in the CSS.

The library interprets the declarations and translates them into CSS and JavaScript, either by converting them to common CSS styles or by replacing them with JavaScript implementations. To achieve this, the page model from the Paged Media Specifications has been rebuilt using grid and flex-box, and since we use the browser to render our pages, we can leverage all the work put into implementing other CSS specifications such as flex-box, grid, svg management, etc.

### Three modules

Paged.js is made of three modules that work hand in hand:

- **the chunker** that fragments the content into discrete pages,
- **the polisher** that transforms the CSS declarations into ones the browser understands
- **the previewer** which shows how the book will be printed in the browser.

#### The chunker

The chunker is the part of Paged.js that manages the fragmentation of the content to flow it into pages. To do so, it takes all the rendered content (with their css styles), creates a page (following the page model of the specs), and pust the content in the content area.

To find where the content needs to be fragmented, CSS-columns are used: each page is a column with width and height set to be exactly as the page content area will be in the paginated output. Once an element overflows the page height, a new page is created, and the rest of the content goes in. The chunker keeps doing that until all the content is laid out. Once the script is done, the content area of each page is an independent HTML element. Using CSS columns allows easier access to the fragmentation properties already implemented in browsers, such as page-breaks, element properties, or widows and orphans.

#### The polisher

Thanks to the CSStree library, the polisher parses the CSS and translates the CSS stylesheet into classes that the browser understands. For example, the properties of the `@page` rules are turned into HTML classes. In other words, you provide CSS that conforms to the standards, and Paged.js applies those on the transformed DOM.

This way, the system is able to handle running headers, page counters, or any CSS-generated content functions with CSS custom properties from the DOM. Paged.js also adds references to every node (for example, data references to find elements that are split between pages). This gives a complete control over the page layout and users can access these elements in CSS or Javascript with their classes if they want to go further with Paged.js and add their own functions.

#### The previewer

The previewer makes it possible to have a visual preview of the printed output directly in the browser with a graphical interface. This allows designers to access development tools to make changes and control the rendering of the composition. Using simple css properties, pagesare shown as facing pages, single ones on top of the other, the same way you would see those in the classic book design applications.

But Paged.js can also be run in a fully automated workflow where the PDF is generated server side. This makes use of a command line version of Paged.js based on Puppeteer to open a Chromium headlesss instance and create the PDF files.

#### Plug into paged.js

Paged.js is a modular library that runs each part of the code in a specific sequence: from the parsing of the content and styles, when a new page is created, when a new element is added on the page, when a page has finished rendering, to when the library has finished its job. This lets you add any custom module you may need. For example, to set the image as `page-float: top` you can follow this simple algorithm: when a `img` or a `figure` element gets rendered, remove it from the flow, and prepend it as the first element on the page. The same idea can be used to create a baseline rhythm where you can add `padding-top` to element which are not starting on the grid.

## A community

For the last two years, the Paged.js project team has put a lot of effort into keeping the community informed and engaged. We regularly meet for a Mattermost chat with around 150 people, where we discuss issues, report on updates, code and plans for the various projects that are using Paged.js.

### Projects

Coko’s [**Editoria**](https://editoria.pub/) is the first project to include Paged.js export. With the developers, we’ve been working on providing support to explain how the library works and how they could add a templates manager, live update of the export when the css changes, etc. The users of Editoria are publishing houses who have a high expectations when it comes to the pdf output, and that offers us a wide variety of use cases.

[**Pagedown**](https://github.com/rstudio/pagedown) is another interresting project that uses Paged.js to generate PDF for the Rstudio community. RStudio develops free and open tools for R, and enterprise-ready professional products for teams who use both R and Python to scale and share their work. Romalin Lesur and Yihui Xie have been advocating for HTML and CSS instead of Latex, and the monthly download numbers are pretty high.

[**Hederis**](https://www.hederis.com/), a platform to design books and publish PDFs uses Paged.js for previewing and updating the books. Hederis project founder Nelly McKesson was part of the Cambridge meeting and came to meet us during an Editoria event in San Francisco last year. She’s also contributing to the project codebase.

[**AsciidocPDF**](https://github.com/Mogztter/asciidoctor-pdf.js) is a PDF converter for AsciiDoc based on web technologies. It allows complex layouts to be defined with CSS and JavaScript, while writing the content in AsciiDoc. Guillaume Grossetie and Thomas Parisot who are maintaining the tool are actually contributing back to Paged.js, offering us a tremendous help.

[**PanWriter**](https://panwriter.com/) and [**Ovide**](https://peritext.github.io/ovide/) also use Paged.js, and we’re discussing developments with [**Stylo**](http://blog.sens-public.org/marcellovitalirosati/stylo/), and others projects we’re helping.

Julie Blanc also worked on the [**Villa Chiragan**](https://villachiragan.saintraymond.toulouse.fr/) project that presented sculptures of the museum on the web. You can check the printer version if you print on any webpage, and you can also check what she managed to do using Paged.js [here](https://villachiragan.saintraymond.toulouse.fr/impression).

### Workshop, teaching and lectures

Since the beginning of the Paged.js project, the team has been part of a number of different events to introduce paged.js, from publishing events (such as the [digital publishing summit](https://www.youtube.com/watch?v=3SvfARdZRA4) in Paris) to open source meetings and conferences (*Write the docs* at Mozilla's office in Paris, *journées du logiciel libre* in Lyon, *Fosdem*, etc.) to present the project, or to discuss with other members of the community.

We also spent quite some time organizing workshops and meetings to show Paged.js to editors and designers. Many workshops also take place in art and design schools so that future professionals are trained in these ways of doing. We hope to do more in the coming months and years.

By providing more examples of what can be accomplished using print CSS, we hope to advocate for better support of print-related standards in browser engines. It's our first goal, until then we will provide support via our work.

During the second half of last year, we rewrote the documentation, and made a new website (we’re working on it and hope for a release pretty soon). You can have a quick preview [here](http://onepager--hungry-boyd-59d45a.netlify.com/) to have an idea of how it will be. We’ll also provides templates, insight into Paged Media specs, and use it as a platform to write for anyone who'd like to write a piece about what we're doing. We’ll also reprint some of the articles from[ www.pagedmedia.org](http://www.pagedmedia.org/) as a way to highlight that information.

Following the same idea, the [repository](https://gitlab.pagedmedia.org/tools/pagedjs) for Paged.js also contains some [examples](https://gitlab.pagedmedia.org/tools/experiments) which provide insight into how to build a table of contents, how to follow a baseline snapping layout, or use hooks, and even a first implementation of the footnotes.

### The future of Paged.js

As we now have a more mature library, we have stared to look at where we’d like to go with Paged Media. Therefore, as the time of writing this, we’re joining the W3C under the flag of the Cabbage Tree Lab as we want to be part of the continuing standards conversation.

Julien is now working on the community side of things, organizing events and fixing issues, keeping everyone happy while the codebase evolves. Julie is writing new specs ideas that we’ll hope to share and discuss as soon as possible. Fred is rewriting the whole chunker, as we’d like to support multiple flows, floats and offer a better footnote solution than the one we have now.

When this is done, we’ll layout a roadmap (more like a subway map) so anyone can contribute where they think they can best do so. Members of the community are also starting to offer services to those who may need custom development or specific stylesheest, as more and more users are getting confortable with designing books in browsers.

We welcome you to join us!