---
title: "The big picture"
date: 2019-09-03T18:23:22+02:00
draft: false
part: 1 
weight: 1
tocEmoji: " 🖼"
intro: "Heard about Paged.js but don’t know where to start? " 
cover: "images/chuncker-1.png"
class: documentation

---

## What is Paged.js?

Paged.js is a free and open-source library that paginates any HTML content to produce nice and print-ready PDF.
The library fragment the content, read your css print declarations and present a paginated preview in your browser that you can save as PDF.

By paginating content in the browser, Paged.js shows a preview of the PDF output in web browsers. This allows designers to access browsers development tools to make changes on the fly and control the rendering of the typesetting. 



It's also possible to insert Paged.js into other tools and to propose to users to configure their graphical rendering by adding functionalities.

As Paged.js follows the W3C standards, it can easily be a part of an automated workflows thanks to the command line interface version (using an headless browser) that can generate a PDF from scriptable and automated commands.

Since the tool is following the W3C specifications, it can adapt to any workflow.


## W3C specifications

<p>Paged.js is based on the CSS standards written by the World Wide Web Consortium (W3C). Paged.js is a <span class="dt">polyfill<span class="dd">A <a href="https://en.wikipedia.org/wiki/Polyfill_(programming))">polyfill</a> is a bit of code that implements a feature on web browsers that do not support the feature</span></span> for some CSS properties made to print HTML from the browser. It can parse CSS stylesheets, and translate the declarations in HTML and CSS that a browser can understand. The print declarations (by updating them with supported styles or replacing them with JavaScript implementations) and present a paginated rendering of the HTML document using the fragmentation provided by CSS columns.</p>

The W3C CSS modules that Paged.js aims to implement are the following:

- [CSS Paged Media Module Level 3](https://www.w3.org/TR/css3-page/)
- [CSS Generated Content for Paged Media Module](https://www.w3.org/TR/css-gcpm-3/)
- [CSS Fragmentation Module Level 3](https://www.w3.org/TR/css-break-3/)



## A community  

The code of Paged.js is open-source with a MIT license and the development is community-driven. Everyone is invited to join us! You can find the source code of Paged.js on the repo of our self-hosted gitlab: https://gitlab.pagedmedia.org/tools/pagedjs

We’re relying on designers and developers who want to discuss new features, ideas and bug fixes. If you’d like to participate to the conversation, you can add issues to the repo. But the easiest way to talk to us is to go to [our self-hosted chat](https://mattermost.pagedmedia.org/) and join the conversation.

