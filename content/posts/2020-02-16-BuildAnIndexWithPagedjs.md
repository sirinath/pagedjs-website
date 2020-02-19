---
title: "Build An Index With Pagedjs"
date: 2020-02-02T15:40:08+01:00
draft: false
author: "Julie Blanc"
class: cookbook
intro: "Indexing is not an easy task. But what if we could automatize a bit the whole experience, on the export? Here is how you can do it with Paged.js" 
tags:
- Indexing
- guide
---






## Preparing your HTML

In the simplest terms, a book index is simply a key to locating information contained in a book. The main idea of the book index is to help the reader find information quickly and easily. It is not a way to locate in the book all the paragraph where the word "music" appears but to locate the places in the book where the word music is "revealing" in relation to the content. In this way, create an index is a semantic work that cannot be done automatically.

When you think your content is revelant and need to be in the index, simply add a span around the content:

```HTML
<p>General definitions of <span class="book-index" data-book-index="music">music</span> include common elements such as pitch, rhythm, dynamics, and the sonic qualities of timbre and texture.</p>
```

Your span must contain at least two elements:
- **a class**: this class is common to all index span elements of your document, you can name it as you wish
- **a data attribute**: this data attribut must be named `data-book-index`, it indicates the word(s) that will appear in the index
- you can also add an id if you want but it's not required

About the data attribute: 
- all data attributes containing the same word will be combined in a single line in the index, so you can use the same data attribute several times in your document
- it is possible to use spaces, capital letters and dashes in the data attribute, like this for example: `data-book-index="Wolfgang Amadeus Mozart"`
- it is also possible to format the text with the `<em>` en `<i>` elements (only): `data-book-index="<em>String Quartet in C major</em>"`

Finally, you must add somewhere in your HTML an element in which the book index will be generated. It can be a section or a div but it must be indicated by an id (that you name as you wish):

```HTML
<div id="book-index"></div>
```


## Use the script with paged.js


1. Add the `async` property to the paged.js script:
* if you use paged.js with npm: `<script async src="http://localhost:9090/dist/paged.polyfill.js"></script>`
* if you use the online script of paged.js: `<script async src="http://unpkg.com/pagedjs/dist/paged.polyfill.js"></script>`

2. Add the book index script: 

```html
<script src="js/createIndex.js" type="text/javascript"></script>
```

3. Call the book index script:

The book index need to be generated before that paged.js fragmented the content into pages. You need to the hook `before` to call the script.   
Add this code in the `head` of you html document:

```html
<script>
    window.PagedConfig = {
      before: function () {
        createIndex({
            spanClassIndex: 'book-index',
            indexElement: '#book-index',  
            alphabet: true        
          });
      }
    };
  </script>
```

4. Use the print CSS properties in your stylesheet file to target the pages where the index elements appears: 

```CSS
.link-page a::after{ content: target-counter(attr(href), page); }

.link-page::after{ content: ", "; }

.link-page:last-of-type::after{ content: none; }

.index-value::after{ content: " – "; }
```


## Configuring the script
* `spanClassIndex`: define the id element where the toc list will be create
* `indexElement`: define the id element where the toc list will be create
* `alphabet`: choose if you want the alphabetical elements (`true`) or not (`false`)



## Styling the book index

The script generates a list whith items you can style. Here is an example of a book index generated: 

{{< figure src="../img/example-index.png" alt="Exemple of a generated book index">}}

```HTML
<ul id="list-index-generated">

  <li class="list-alphabet-element" id="alphabet-element-A">A</li>

  <li class="list-index-element" data-list-index="Apple">
    <span class="index-value">Apple</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-10"></a></span>
      <span class="link-page"><a href="#book-index-23"></a></span>
    </span>
  </li>

  <li class="list-index-element" data-list-index="Apricot">
    <span class="index-value">Apricot</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-15"></a></span>
      <span class="link-page"><a href="#book-index-35"></a></span>
    </span>
  </li>

  <li class="list-index-element" data-list-index="Avocado">
    <span class="index-value">Avocado</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-19"></a></span>
    </span>
  </li>

  <li class="list-alphabet-element" id="alphabet-element-B">B</li>

  <li class="list-index-element" data-list-index="Banana">
    <span class="index-value">Banana</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-2"></a></span>
      <span class="link-page"><a href="#book-index-38"></a></span>
      <span class="link-page"><a href="#book-index-12"></a></span>
    </span>
  </li>

  <li class="list-index-element" data-list-index="Blackberry">
    <span class="index-value">Blackberry</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-17"></a></span>
      <span class="link-page"><a href="#book-index-24"></a></span>
    </span>
  </li>

  <li class="list-alphabet-element" id="alphabet-element-C">C</li>

  <li class="list-index-element" data-list-index="Cherry">
    <span class="index-value">Cherry</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-32"></a></span>
      <span class="link-page"><a href="#book-index-27"></a></span>
    </span>
  </li>

  <li class="list-index-element" data-list-index="Coconut">
    <span class="index-value">Coconut</span>
    <span class="links-pages">
      <span class="link-page"><a href="#book-index-41"></a></span>
      <span class="link-page"><a href="#book-index-8"></a></span>
    </span>
  </li>

</ul>
```

An example of CSS to styling the book index:

{{< figure src="../img/example-index-styled.png" alt="Exemple of a generated and styled book index">}}


```CSS
#list-index-generated{
  list-style-type: none;
}

.list-alphabet-element{
  font-weight: bold;
  padding-top: 18px;
  padding-bottom: 9px;
  font-family: Arial, Helvetica, sans-serif;
}

.index-value{
  display: inline-block;
  min-width: 120px;
}
.index-value:first-letter{ text-transform: uppercase; }
.index-value::after{ content: "none"; }


.link-page a{ 
  text-decoration: none;
  color: currentColor;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 12px;
}
```

