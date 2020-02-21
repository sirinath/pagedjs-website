---
title: "Contribute"
date: 2020-01-24T15:47:43+01:00
draft: true
part: 11
---

### Collaborating on Paged.js aka accessing the developer branch

To get set up with the development version, clone the repository and run the project using npm (you need to have git and npm installed):

```bash {linenos=table,linenostart=1}
$ git clone https://gitlab.pagedmedia.org/tools/pagedjs.git
$ cd pagedjs
$ npm install
$ npm start
```


Link the script with your document:

```html
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

Note: With some browsers and some operating systems, you may not need a local server for Paged.js to work. To find out, simply open your HTML page (linked to the polyfill). If the paginated content appears, you don't need a local server.



## Generating a PDF

Paged.js transforms your content so that it can be viewed in a browser. PDF generation can be done in two ways:

- using the print features of your browser,
- using the [pagedjs-cli](https://gitlab.pagedmedia.org/tools/pagedjs-cli) tool based on Paged.js and [Puppeteer](https://github.com/GoogleChrome/puppeteer).




