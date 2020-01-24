---
title: "The big picture"
date: 2019-09-03T18:23:22+02:00
draft: true
part: 1 
weight: 1
tocEmoji: " 🖼"
intro: "Heard about Paged.js but don’t know where to start? " 
cover: "images/chuncker-1.png"
class: documentation

---

# Getting started with Paged.js

Paged.js is a free and open-source library that paginates any HTML content to produce nice and print-ready PDF.
The library fragment the content, read your css print declarations and present a paginated preview in your browser that you can save as PDF.
Since the tool is following the W3C specifications, it can adapt to any workflow.


### W3C specifications

<p>Paged.js is based on the CSS standards written by the World Wide Web Consortium (W3C). It acts like a sort of <span class="dt">polyfill<span class="dd">A <a href="https://en.wikipedia.org/wiki/Polyfill_(programming))">polyfill</a> is code that implements a feature on web browsers that do not support the feature</span> </span>to supports some CSS print modules in recent browser: it can parse CSS stylesheets, polyfill the print declarations (by updating them with supported styles or replacing them with JavaScript implementations) and present a paginated rendering of the HTML document using the fragmentation provided by CSS columns.</p>

W3C CSS modules implemented by paged.js :

- [CSS Paged Media Module Level 3](https://www.w3.org/TR/css3-page/)
- [CSS Generated Content for Paged Media Module](https://www.w3.org/TR/css-gcpm-3/)
- [CSS Fragmentation Module Level 3](https://www.w3.org/TR/css-break-3/)



### A community

The code of paged.js is open-source with a MIT license and the development is community-driven. Everyone is invited to join us!

You can find the source code of paged.js on the repo of our self-healing gitlab: https://gitlab.pagedmedia.org/tools/pagedjs

We have several tools to help designers and to discuss the addition of new features. You can add issues to the repo to suggest new features or simply report problems. But the easiest way to talk to us (if you're not using gitlab) is to join us on our self-hosted chat: https://mattermost.pagedmedia.org/



<!-- ### Visual preview and command line version -->

By paginating content in the browser, Paged.js shows a preview of the PDF output in web browsers. This allows designers to access browsers development tools to make changes on the fly and control the rendering of the typesetting. 

It's also possible to insert Paged.js into other tools and to propose to users to configure their graphical rendering by adding functionalities.

Paged.js can easily be inserted into automated workflows thanks to the command line interface version (using an headless browser) that can generate a PDF from scriptable and automated commands.



## Running paged.js

How to start with paged.js? The first thing is to make the script work on your document. For that, you need a few things:

- your usual html and css files,
- the paged.js script,
- a (local) server,
- a web browser.

### Access to paged.polyfill.js script

**Option 1: CDN version**

You can use the hosted version of the script, just copy this in the `head` of your document:

```HTML
<script src="https://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>
```

If you want to specify a specific version of paged.js, the different releases of the script will be available here: https://gitlab.pagedmedia.org/tools/pagedjs/releases. By default, the link below goes to the latest release.

To use the script locally, without an internet connection, just copy the script into a file and change the link to your script to something like:

```HTML
<script src="js/paged.polyfill.js"></script>
```

The script will start automatically when you go to your document from the browser. It will apply to all your content and fragment it into different pages. It is possible to run other scripts before paged.js starts, to integrate it into a tool or simply to delay its launch: we will see that later in this guide.

**Option 2: Development version**

To get set up with the development version, clone the repository and run the project using npm (you need to have git and npm installed):

```
$ git clone https://gitlab.pagedmedia.org/tools/pagedjs.git
$ cd pagedjs
$ npm install
$ npm start
```

Link the script with your document:

```
<script src="http://localhost:9090/dist/paged.polyfill.js"></script>
```

All you need to know about setup, development and testing with the local dev-server is available in the README.md of the repo.

### Use a local server

Paged.js need to access your files via a local server to read the CSS properties you write. There is a lot of way to create and lunch a local server. If you're not familiar with Linux, the easiest way is to use ready-to-use local web development solution like [WAMP](http://www.wampserver.com/) (for Windows) or [WAMP](https://www.mamp.info/en/) (for Mac).

You can find all the documentation on their respective websites. Broadly, what you need to do is:

1. Download the package and follow the step of your usual system installation manager.
2. Add the folder of your project in the folder automatically created by the application, typically in `c:\wamp\www` for WAMP or in `/Applications/MAMP/htdocs/`.
3. Start the local server.
4. In your favorite browser, go to the local address provided by your application (like `http://localhost:8888`).

Note: With some browsers and some operating systems, you may not need a local server for paged.js to work. To find out, simply open your HTML page (linked to the polyfill). If the paginated content appears, you don't need a local server.

### Which browser to use?

We really want paged.js to work perfectly  with all the browsers around, but some are more suitable than others. It depends on the features you want to have for your documents (CSS flexbox, hyphens…). But you also maybe need a browser that take into account the size property to generate PDFs. Here are some explanations to help you choose.

#### Support of @page { size }

Paged.js acts like a sort of polyfill but there is one thing we can't manage that we need to print correctly: the support by the browser of the `@page { size }` property. This property will allow you to create a PDF at the right size when it is generated. These property is only supported in some browsers:

- Chromium
- Google Chrome
- Brave
- Opera

We know that many of you are attached to Mozilla Firefox (and so are we). It is still possible to use paged.js with it but you will have to manually change the PDF size when you generate it (in the custom sizes). Be careful to calculate bleeds and crop marks if you add it.

#### Support of CSS grid

You must also use a recent version of these browsers because we use some CSS grid module properties for the construction of the pages. CSS grid is supported in most browsers since mid-2017. You can see here if your browser supports CSS grid: https://caniuse.com/#feat=css-grid

#### Different rendering between browsers

The result will not always be the same from one browser to another because they don't use the same browser engine. For example, line-height is not managed in the same way on Firefox and Chrome. The result will also not be the same depending on the OS you are using. For example, hyphenation is managed in Chrome only on Apple OSX.

We recommend staying on the same browser and OS for the design and generation of the PDF to avoid unpleasant surprises.

## Generating a PDF

Paged.js transforms your content so that it can be viewed in a browser. PDF generation can be done in two ways:

- using the print features of your browser,
- using the [pagedjs-cli](https://gitlab.pagedmedia.org/tools/pagedjs-cli) tool based on paged.js and [Puppeteer](https://github.com/GoogleChrome/puppeteer).

### Option 1: with a browser

1. Click on the “Print” button of your browser.

2. Change the _Destination_ to "Save as a PDF file”.

3. In the avanced settings:
   - Set _Margins_ to “none”,
   - Remove the option “Headers and footers”,
   - Select the option “Background graphics”.

Paged.js doesn't use the print engine from the browser to define the margins, page breaks or headers and footers, which is why you need to change these option. Printing without the library give a different output.

### Option 2: with pagedjs-cli

The command line version of paged.js uses a headless browser (that is, one without a graphical interface) to generate a PDF. The browser used is Chromium. This means that you can use paged.js in fully automated workflows. With the command line version, you don't need to call the paged.js script in your document: it will be done automatically.

First, download and install pagedjs-cli with your terminal (you need to have git and npm installed):

```
$ git clone https://gitlab.pagedmedia.org/tools/pagedjs-cli.git
$ cd pagedjs-cli
$ npm install -g pagedjs-cli
```

Then, in a new terminal window, go to the folder where the code of your document is located (use the `cd` command) and generate your PDF with the following command:

```
$ pagedjs-cli index.html -o result.pdf
```

Some options to generate the PDF:

```-h, --help                  output usage information
-V, --version               output the version number
-i, --inputs [inputs]       Inputs
-o, --output [output]       Output
-d, --debug                 Show Electron Window to Debug
-l, --landscape             Landscape printing
-s, --page-size [size]      Print to Page Size [size]
-w, --width [size]          Print to Page Width [width]
-h --height [size]          Print to Page Height [weight]
-m, --page-margin [margin]  Print with margin [margin]
-n, --hyphenate [lang]      Hyphenate with language [language], defaults to "en-us"
-hi, --hypher_ignore [str]  Ignore passed element selectors, such as ".class_to_ignore, h1"
-ho, --hypher_only [str]    Only hyphenate passed elements selector, such as ".hyphenate, aside"
-e, --encoding [type]       Set the encoding of the input html, defaults to "utf-8"
-t, --timeout [ms]          Set a max timeout of [ms]
```
