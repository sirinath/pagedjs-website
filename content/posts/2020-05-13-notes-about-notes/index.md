---
title: "Notes About Notes"
date: 2020-05-13T15:42:08+02:00
draft: true
draft: false
author: "Julie Blanc"
intro:  "This article proposing new CSS specifications to design differents kind of notes  in  continuous and paged medias."
tags: 
- Specifications
- W3C
- Notes
---


CSS is a language that evolves by adopting new specifications. To be accepted as rules and properties published by the W3C, a proposal for new features is debated, adopted or rejected by the CSS Working Group which is made of a broad community of users, company representatives, invited experts and browser developers. Turning an idea for a new feature into an actual standard is a long process of discussion and debates in which complex cases are discussed, examples of implementations are shown, and decisions are made.


Since its third version, CSS has been divided into modules which share families of properties. Each “module” has one or more editors who coordinate community responses towards further module development. From the very first phase of writing, module discussion documents are made available to everyone interested to read them. These documents are initially known as “working drafts” and evolve towards "Candidate Recommendation" status as the community discusses and revises their ideas. Recently, the creation of the CSS Grid module has been a great example of the success of this process: the final module has been defined collectively, well written, and quickly implemented by the browser developers. 

However, not all CSS modules evolve at the same speed, and even though they’ve been started a long time ago, the paged media specifications  still need to be implemented in browsers, which is why Paged.js exists.

So how can we help get the page media specification process moving? 


## Proposing new specifications

On 13 February 2020 at XML Prague, a CSS Print Workshop took place. The workshop was chaired by Rachel Andrew and Dave Kramer, both members of the CSS working Group. Dave is also the editor of the CSS *Generated Content for Paged Media Module*. Paged.js team attended the workshop and were able to discuss with them how to make the specifications for paginated media and printing evolve more quickly. Following the workshop, the [CSS print community group](https://www.w3.org/community/cssprint/) was launched, “a community of users of CSS print, working together to gather use cases, help with specifications, and advocate for more and better implementations”. This subgroup will strengthen the work of the CSS working Group by focusing on CSS for print and paged media.

The work of the W3C and the CSS working Group is easily accessed on the [dedicated repo on github](https://github.com/w3c/csswg-drafts).  During that CSS Print Workshop, Rachel Andrew [described the status of the CSS Working Group](https://noti.st/rachelandrew/Hy20NS/introduction-to-the-css-working-group), how it works and how to contribute ([first part of the video](https://www.youtube.com/watch?v=Cp1QLxZLfmM)). Anyone can contribute to the specifications in multiple ways: showing use cases, contributing examples and diagrams to the specifications, writing tests or even proposing some properties. 

This new CSS print community group has decided to start participating in the specification as well. Our daily work with Paged.js has allowed us to develop a good knowledge of the existing specifications and also where they would need a new look. Cabbage Tree Labs, the house of Paged.js, is now part of the W3C, and as a first move, we want to propose specifications dedicated to the different types of notes that exist in editorial design.



## Types of notes and pattern

The W3C specifications only allow the creation of footnotes, but designers and editors like to make use of all kinds of notes. To name a few:


- **Footnotes**: notes placed at the bottom of the pages
- **Side notes**: notes related to the page content, grouped in the left or in the right of the page, alongside the text area
- **End notes**: notes grouped together in one place at the end of a document or at the end of a section of the document 
- **Marginal notes**: notes that are placed to one side of a page or both sides at the exact vertical position of the note reference number 
- **Column footnotes**: footnotes that can be placed according to the column in which they are located
- **Multiple notes area**: not for pages that share footnotes, margin notes, column footnote, etc.




You can find some example of layouts with footnotes in a [dedicated W3C page](https://www.w3.org/XML/2015/02/footnote-examples/).

To make use of notes easier, we would like to propose some CSS syntax which would allow all of these kinds of notes. This article is a quick tour of a proposed specification that is described in more detail in an issue on the CSS Print Community Group repo. The article explores the existing specifications and proposes some new CSS declarations for building notes for both continuous reading (screen) and paged media. This proposal is a working draft, a place to start a discussion. Do not hesitate to give your opinion directly as a comment of this article, or if you feel more comfortable, in the [issue](https://github.com/w3c/css-print/issues/3) we've opened on CSS Print Community Group.



### Pattern to create notes

Notes always depend on another flow but there are out-of-flow elements, *ie.* it’s ancillary content that can be moved to the bottom or the side of the page or the document. A note is created when the content is moved to another specific area of the document or the page, leaving a indicator of where it was (a reference). 

All types of notes are built to a similar pattern:

1. Declare that an element of a flow is a note.
2. Remove the item from the flow.
3. Leave a note reference indicator which points to the place the note element was moved from. This is an explicit link from a location in the document to a note element. 
4. Place the note element and its children in a special area with all the other notes of the page or the document, in the order of appearance in the flow.
5. Create a marker before the note that matches the note reference.
6. Place the note area in the page or the document using appropriate CSS layout facilities and position scheme.
7. (If paged media) If the note overflows the note area, move the items to the next page in the equivalent area according to note policy.



## How to tag a note in HTML ? 

The W3C doesn't provide a dedicated way to tag notes in HTML. Currently, there are two most commonly used methods of adding notes:

- A list of notes at the end of the document, with note references as link elements with `href` attributes pointing to the note using fragment URLs;
- or `<span>` elements directly in paragraphs to encapsulate note elements in the place where they appear. This is the method used in examples in the [css-gcpm-3](https://www.w3.org/TR/css-gcpm-3/#creating-footnotes). 


After some research, reflections and a closer look at some use cases and requirements, a proposal from paged.js team has been developed to allow for this need for various kinds of notes: that there should be a new HTML tag, the `<note>` element which will interact with appropriate CSS to handle notes of various kinds. (This choice is more fully detailed in the GitHub issue.)


A `note` element represents a note, eg. secondary content that is related to other content in the document. It’s a self-contained node that gives the information about where a note starts and where it ends. The `note` element must be placed where the note appears in the content flow. It's the CSS mechanism proposed in this article that allows you to place the note elsewhere in the layout and to create the note call.


The following example is a conforming HTML fragment:

{{< highlight html >}}
<p>Gutenberg  in 1439 was the first European to use movable type. Among his many contributions to printing are: the invention of a process for mass-producing movable type; the use of oil-based ink for printing books; <note>Soap, Sex, and Cigarettes: A Cultural History of American Advertising By Juliann Sivulka, page 5</note> adjustable molds; mechanical movable type; and the use of a wooden printing press similar to the agricultural  screw presses of the period.</p>
{{< /highlight >}}

This potential new HTML element is easy to use and allows a note to be always attached to the content it adds details to. This proposal is aligned to the way HTML works (a node mechanism) without adding an HTML element that would depend on another one (to create note references for example).

Until this element exists in HTML, a `span` element will be used with a class named “note” for illustrative purposes.

The new CSS specifications to be proposed will allow the transformation and layout of the targeted element into different types of notes. The stylesheet provides alternate ways to organize and display notes, for specific uses and for continuous and paged media alike.  In addition, the specification defines the area where the notes would be gathered / relocated in CSS if needed.



## Layout the notes



### Footnotes in W3C CSS specs

Let’s start by looking at what already exists in the W3C specifications. A part of the [CSS Generated Content for Paged Media Module](https://www.w3.org/TR/css-gcpm-3/#footnotes) (css-gcpm-3) is dedicated to footnotes. The first section defines the terms of the footnote objects: `footnote element`, `footnote marker`, `footnote body`, `footnote call`, `footnote area` and `footnote rule`. These definitions can be applied to all types of notes. For the rest of this article, these same terms will be used without the prefix “foot” to the term footnote.

The specification also describes how to create footnotes in a page with the following code:

{{< highlight css >}}
@page {
  @footnote {
    float: bottom;
    /* style of footnote area */
  }
}

span.footnote { 
	/* Display span as footnote */
	float: footnote; 
}
{{< /highlight >}}

This code also creates special [footnote counter](https://www.w3.org/TR/css-gcpm-3/#footnote-counters) and special pseudo-elements for [footnote calls](https://www.w3.org/TR/css-gcpm-3/#footnote-call) (`::footnote-call`) and [footnote markers](https://www.w3.org/TR/css-gcpm-3/#footnote-marker) (`::footnote-marker`). The position, size and the styles of the footnote area are defined by the `@footnote` declaration. The specification does not give much indications, [only a couple of paragraphs and a lot of issues and unanswered questions](https://www.w3.org/TR/css-gcpm-3/#footnote-area). The advantage is that we can do many proposals without conflicting with the current specifications.

A mechanism is needed to move the note element into specific areas of the page or the document. To do this, inspiration can be taken from a mechanism already present in the draft of the paged media specifications, the [running element](https://www.w3.org/TR/css-gcpm-3/#running-elements): by adding the `position: running()` declaration, an element can be removed from the flow, and reused in multiple places, perfect for the running heads of a book for example.


### New proposal to create note

This proposal is for a new way to create and place notes, based on new values (`note()` and `element()`) for properties already in the CSS specifications (`position` and `content`). This could work for both media: paged media and screen.

In paged media, a new `@note-area` at-rule must also be added to be able to move notes from the page to a specific place. Here is an example of how it would work:

{{< highlight css >}}
.note {
    position: note(notes);
}

@page {
    @note-area { 
        content: element(notes, all-once);
    }
}
{{< /highlight >}}

This proposal can also work for continuous media by placing the notes in a new pseudo element `::notearea` that is created at the end of the declared element (just before the pseudo element `::after`). All the notes contained in the element would be placed in this new pseudo element.

{{< highlight css >}}
.note {
    position: note(notes);
}


section::note-area { 
    content: element(notes, all-once);
}
{{< /highlight >}}

#### The `note()` and `element()` functions

In both cases, the `note()` function declares an element as a note, removes the element from the principal flow, and makes it available to place in a page margin-box, a page note-area `@note-area` or a `::note-area` pseudo element using `element()`. 

The `element()` function already exists in [css-gcpm-3](https://www.w3.org/TR/css-gcpm-3/#creating-footnotes). It's usable in the `content` property of margin boxes. The proposal would see it used in the new page area `@note-area` or a `::note-area` pseudo-element. 
To make `element()` work with `note()`, a specific behaviour needs to be added that can be declared via an optional keyword `all-once`. The value of all the assignments of the document or the page are used. ie. all the note elements are displayed in the new area where they're assigned in the same order of the flow and have only one assignment in the document or in the page (the elements are not repeated).

The note element inherits from its original position in the document, but is not rendered there, instead a `::note-call` pseudo-element is created and inserted in the original position of the note. When the note element is displayed in this new area, a `::note-marker` corresponding to the`::note-call` is created before the note body. 





### Using CSS layout possibilities with the notes area 


The `@note-area` at-rule creates special [page areas](http://dev.w3.org/csswg/css-page/#page-area) that can be used to display notes elements via the `element()` function. The other central idea of this proposal is that any of the CSS layout facilities can be used to create, position and size note areas: float, absolute positioning, grid, exclusion, etc. Some of those possibilities will now be explored.


#### Put the notes in the margin boxes

Sometimes the note area doesn't even need to be declared. Using the `element()` function, the margin-boxes can now receive the content of the `note` elements. Let’s look at an example: the following rules result in the placement of the note elements inside the left-top margin box. Margin and text alignment of the note elements are set to the note element itself and padding of the margin box are set in `@left-top` at-rule. 

{{< highlight css >}}
@page {
    @left-top {
        content: element(sidenote, all-once);
        padding: 5mm;
    }
}

.sidenote {
    position: note(sidenote);
    margin-bottom: 10px;
    text-align: left;
}
{{< /highlight >}}

{{< figure src="img/notes_margin-box.png">}}


#### Use of float pages


[CSS Page float](https://www.w3.org/TR/css-page-floats-3/) specifications add some values to the `float` property to positioning element in a page context and propose the [ `float-reference` property](https://www.w3.org/TR/css-page-floats-3/#propdef-float-reference) to indicate the "reference container" for a floated element. Extensive use will be made of these properties in the following examples.

First, it can be used to create classical footnotes. The following code sets the default values of properties for `@note-area` and places notes at the bottom of the page: 

{{< highlight css >}}
@note-area {
    float: bottom;
    float-reference: page;
    width: 100%;
    max-height: 80%;
}
{{< /highlight >}}



Using float on the page and negative margins can be helpful in creating the note area half on margin, half on text content.

{{< highlight css >}}
@page {
    @note-area {
        content: element(sidenotes, all-once);
        float: top right;
        float-reference: page;
        width: 42mm;
        margin-right: -30mm;
    }
}

notes {
    position: note(sidenotes);
}
{{< /highlight >}}

{{< figure src="img/notes_sidenotes.png">}}


Since a note area is a box, it's possible to layout the area itself (with columns for example).

{{< highlight css >}}
@page {
    @note {
        content: element(notes, all-once)
        float: bottom right;
        page-reference: float;
        width: 50%;
        columns: 2;
    }
}

notes {
    position: note(notes);
}
{{< /highlight >}}

{{< figure src="img/notes_note-area-columns.png">}}



#### Multiple notes areas in a page

There are already a lot of use cases in critical editions where you can find  multiple kind of notes (bibliographical references, explanations, etc.) The `@note-area` at-rules declaration make multiples notes easier by mixing multiple note areas in the same page context. The `@note-area` may be followed by a custom identifier if wanted. 


{{< highlight css >}}
@page {
    @note refsA {
        content: element(refsA, all-once);
        float: bottom left;
        float-reference: page;
        width: 30mm;
        margin-left: -12mm;
    }
    @note refsB {
        content: element(refsB, all-once);
        float: bottom right;
        float-reference: page;
        width: 60mm;
        columns: 2;
    }
}

note.refs-catA {
    position: note(refsA);
}

note.refs-catB {
    position: note(refsB);
}
{{< /highlight >}}

{{< figure src="img/notes_multiple-1.png">}}




In the other following example, a new value `line` is added to the `float-reference` property. This allows creation of marginal notes, i.e., notes paced to one side of the text with its first line on the same height of the flow that contains the note-call.

{{< highlight css >}}
@page {
    @left-top {
        content: element(refs, all-once);      
    }
    @bottom-left {
        content: element(footnotes, all-once);
        width: 100%;
        vertical-align: bottom;
    }
}

note.refs {
    position: note(refs);
    float-reference: line; 
    width: 50mm;
    padding-left: 50mm:
}

note.footnotes {
    position: note(footnotes); 
}
{{< /highlight >}}


{{< figure src="img/notes_multiple-2.png">}}


#### Notes for multi-column layout

In a multi-column layout, note elements may have to be displayed at the bottom of each column. This means that multiple note areas might have to be created for the same fragmented flow. 

Because a column is a anonymous box, there is currently no way in CSS to target a particular column of a multi-column element. This can be fixed by using the [CSS Page float](https://www.w3.org/TR/css-page-floats-3/) properties. The [`float-reference` property](https://www.w3.org/TR/css-page-floats-3/#propdef-float-reference) indicates the "reference container" for a floated element and the value `column` indicates that the float reference is the column in which the floated element is placed in a multi-column environment.

This reference can be used to indicate creation of note areas in the columns of the page where the note appears. As many boxes as necessary are created on each column. All the note areas have the same properties and can be targeted by one `@note-area` rule only.


{{< highlight css >}}
@page {
    @note-area {
      	content: element(notes, all-once);
        float: bottom;
        float-reference: column;
    }
}

#content {
    columns: 3;
}

#content note.notes {
    position: note(notes);
}
{{< /highlight >}}

{{< figure src="img/notes_columns.png">}}







Here are some examples of the CSS layout facilities used to layout notes areas of paginated media. Of course, the CSS layout facilities can also be used in continuous media on the pseudo element `::area-note`. Over to you to use your imagination. 



This article is an overview of the specifications imagined for the notes, and is an extract from the [issue](https://github.com/w3c/css-print/issues/3) published in the GitHub of the CSS print community group. That issue provides more detail than the few properties we have presented here and a few others (note policy for example). You are invited to take a look at this more complete document and comment on it. The specifications are a community work and it is only together that we will be able to improve them.



