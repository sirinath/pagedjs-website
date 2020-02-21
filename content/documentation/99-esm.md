---
title: "Module vs Polyfill"
date: 2020-01-25T00:31:19+01:00
draft: true
part: 13
---

`paged.polyfill.js` script you can add to your HTML will start right away when the page is loaded and

With the script `paged.polyfill.js`, the previewer module is launched automatically and immediately (as soon as the page with the script is called). It will by default apply to all your HTML content.

Using es6 modules you can add the previewer to your own scripts. You can also specify the delay before the Paged.js script is launched. (We will see this in another part.) It is important to note that Paged.js is just a script like other scripts, so you can use it however you want.