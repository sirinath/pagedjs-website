---
title: "Command Line Interface"
date: 2020-01-24T15:48:36+01:00
draft: false
weight: 14
part: 12
---

The command line version of Paged.js uses a headless browser (a browser without any graphical interface) to generate a PDF. It can be run on the server to launch a headless Chromium in fully automated workflows. With the command line version, you don't need to call the Paged.js script in your document: it will be done automatically.

First, download and install `pagedjs-cli` with your terminal (you need to have `git`, `node` and `npm` installed):

```bash 
$ git clone https://gitlab.pagedmedia.org/tools/pagedjs-cli.git
$ cd pagedjs-cli
$ npm install -g pagedjs-cli
```

Then, in a new terminal window, go to the folder where the code of your document is located (use the `cd` command) and generate your PDF with the following command:

```bash 
$ pagedjs-cli index.html -o result.pdf
```


Some options to generate the PDF:

```bash 
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

