---
title: "Welcome to paged.js 0.1.38" 
date: 2020-02-25T12:25:19+01:00 
draft: false 
author: "the paged.js team" 
class:
# intro: We just released a new version of Paged.js! The 0.1.38 is now available to download from [https://unpkg.com](https://unpkg.com/browse/pagedjs@0.1.38/dist/) or install it using [npm](https://www.npmjs.com/package/pagedjs).

# intro: What’s new in Paged.js
---

We just released a new version of Paged.js! The 0.1.38 is now available to download from [https://unpkg.com](https://unpkg.com/browse/pagedjs@0.1.38/dist/) or install it using [npm](https://www.npmjs.com/package/pagedjs).



## New in this release:

This is a minor release which includes one item:

- updated our support for the string-set property. Following the W3C specs, you have now more options to define which title will appear on the page. Here is the schema that helped us implement it, courtesy of Julie Blanc.

{{< figure src="img/graphic-issue-string.png" >}}

## Additional items:

- Thomas Parisot and Fred set up an automated workflow to publish new versions when the codebase on gitlab gets updated. This will help us provide a better support to the people who implement Paged.js in other tools or workflows.

- Pagedjs-CLI (now in its version 0.0.10) is updated to support post-processing PDF. As a first feature, we’re now able to define the crop box and the margin boxes of the PDF. Also if you use the CLI your PDF will now be tagged!

- We’re also documenting the roadmap for the coming months in order to give you an overview of where we’re going, and how you could help if you want to. We’ll share it soon!

## Updated Documentation

We have updated the list of the Paged media feature that paged.js supports. It contains links to some examples we made and to the W3C specifications. You’ll find everything in our documentation. Please drop us a line if there is something unclear, we’ll be happy to make a tutorial for that.

## Hugo Component

For those who never heard of it, Hugo is an open source static site generator written in Go, blazing fast and pretty efficient. It’s packed up with a ton of features and ideas so smart that building paged.js website with it has been a pleasure. One of the feature we need for the website, is Paged.js integration to make book out of the HTML. Thus, we made an implementation of Paged.js for Hugo. Hugo has a really well thought theme engine: to be able to use the print script and the button, you only need to add the information in your config theme, et voilà. It’s still early and experimental, but if you hit the top right button on this page, you can see what it does. Feel free to raise issue if you find any.

## Paged.js on Reddit

Last week, we were mentioned on Reddit! We ended up answering some questions as an improvised Q&A sessions. Since keeping tracks on things on Reddit is not an easy things, here are a quick overview of the questions we got and how we answered those.

### From /u/HarmonicAscendant

I am wondering how it could best work with markdown > pandoc to HTML > paged.js to PDF with Chromium.

Paged.js is a js library, you can use it in any workflow :) For instance, the paged.js website is developed using Hugo, documentation is written in Markdown, and the result is a website, to which we added a button to run paged.js, preview the book in the browser and make a PDF by printing the page. And yes, using CSS for the layout is easier than going with Tex :) You can make a PDF with any HTML source :)

#### From /u/ebichuhamster

> isn’t this a thing already just using css?

It should be. W3C wrote (and keep writing) a lot of specifications for print, but browsers haven’t really implemented those. That’s why we’re making a polyfill. Write your css as it will be usable in the future, but you can actually use it today. When the browsers will be ready, we’ll stop working on Paged.js (don’t expect to see that to happen in a near future)

#### From /u/brainbag

> Could you say more about how you implemented this? We're using puppeteer to render PDFs server-side, but I've been waiting for client side css to have better handling so we can drop it.

You can check the not so well hidden button top right (im still working on this for Paged.js website) to see how pagedjs in action. https://www.pagedjs.org/posts/2020-02-19-toc/. It will run paged.js and show the preview as A5 in the browser. You will then be able to generate a PDF by hittin print > save to PDF. Client side PDF rendering! A small warning though: Chromium and alike are the only browsers that let you print in custom paper size (A5, Square, custom, etc.). In the case you’d like to set the page size at A4 or letter, you’ll be safe in almost every browsers.

#### From /u/dhimmel

> numbering pages on the output PDF

This is pretty basic Paged media specs stuff, we got you covered in the doc. (you may want to read from the top of the page though) https://www.pagedjs.org/documentation/07-generated-content-in-margin-boxes/#page-counter

​

> numbering lines on the output PDF

A solution build by the community: https://github.com/rstudio/pagedown/issues/115 I’ll make a post about that. We also have a simple solution to build a baseline grid: https://www.pagedjs.org/img/linecount.png

​

> floating figures and tables to avoid large chunks of whitespace

We do have solutions to do that, but it depends on your content and how you want it to behave. Floating top is pretty much easy to do. But julie, our specialist of specifications wrote quite a good article about that: https://www.pagedjs.org/page-floats/

​

> multiple columns on PDF pages

Yes sir :) We’re using the browser and pages are made using css grid and flex, so you can do pretty much what you would do in a browser for screen. I’ll try to find some examples in the coming days.

#### From /u/Serei

>Is it possible to make footnotes that appear at the bottom of the current page?

The W3C specs for the footnotes are still at work, but we are actively working on some solutions to follow these specs (as much as joining the w3c print working group to make those evolve).We have some solutions for margin notes https://gitlab.pagedmedia.org/tools/experiments/tree/master/margin-notes and we made a couple of books with footnotes, but it needed some manual works to make sure the layout was great.

But we’re now upgrading the library core to handle multiple flows and float-top and bottom, which would allow us to have footnotes, and ones that would run on multiple pages if needed. We’ll make an article about that soon.

## One more for the road

The excellent [Hugo “Kitty” Giraudel](https://hugogiraudel.com) made a tool to turn any CSS selector into proper english. If you don’t understand why your CSS properties are not being applied, or if you only want to get better at targeting elements with precision, this is the webpage to consult: https://hugogiraudel.github.io/selectors-explained/. It also includes the selector specificity score. A nice tool to have on the road to the no more `!important` stylesheet.

{{< figure src="img/selectorTranslator.png">}}

And that’s all for this time folks, but we keep working.

Stay tuned!