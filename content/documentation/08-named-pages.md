---
title: "Named Page"
date: 2020-01-28T15:54:01+01:00
draft: false
intro: "How to setup the page master based on the content of your html: the named page"
weight: 8
---


There could be pages in your book that may need their own, more specific layout: different background, different margins, and even different styles from the main rule.
You can use what is called “named pages” to define this. Based on your HTML, you can bind a specific layout to any content.

![How named pages works](../images/named-pages.png)

Imagine you want a specific layout for the pages of your frontmatter. 

The `page` property is used to specify a particular type of page. With this property, you define that all sections with the class `frontmatter` will have a page template named here `frontmatterLayout`. Note that, page type names are case-sensitive identifiers.

You create also a specific @page rule with the same page type name where you create new properties of the page. 

That's how you will do with the code.:

```css
.frontmatter {
	page: frontmatterLayout;
}

@page frontmatterLayout {
	/* specifics rules for the frontmatter*/
}
```

With this rule, each element with the `frontmatter` class will have a page break by default. A **page group** is created at each instance of elements with the `frontmatter` class.  

It's possible to bind different section to the same @page rule.

```css
#half-title,
#copyright,
#table-of-content,
#introduction {
	page: frontmatterLayout;
}
```


## Mix page selectors and named pages

You can mix page selectors and named pages.

For example, the first page of each chapter often requires special treatment. You can define a layout for all your chapters and select the first page of each chapter (of each page group).

In the code bellow, each first page of elements with a class `chapter` are selected:

```css
.chapter {
	page: chapter;
}

@page chapter:first {
    /* specifics rules for first page of each chapter */
}
```

You can also select the `:left` and the `:right` pages of named pages and page groups.

The `:nth()` and `:blank` selector doesn't work with named pages for now. But you can use this trick to select the blank pages of named pages:

```css
.pagedjs_chapter_page + .pagedjs_blank_page {
	/* specific rules for blank pages of named page called "chapter" */
}
```



## Priority of @page rules

In paged.js, the page rules do not apply quite in cascade. The rules are defined by the order of priority below (ranked from lowest to highest priority):

- `@page { }`
- `@page :left { }` or `@page :right { }`
- `@page <namedPage> { }`
- `@page <namedPage> :left { }` or `@page <namedPage> :right { }`
- `@page :blank { }`
- `@page :first { }`



If a CSS property is defined in a lower priority page than another but not in the priority page, then the priority page inherits this property and its value. Otherwise, the property will take the new value defined in the priority page.
