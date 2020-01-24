---
title: "99 Command Line Interface"
date: 2020-01-24T15:48:36+01:00
draft: true
---

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

```
-h, --help                  output usage information
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
