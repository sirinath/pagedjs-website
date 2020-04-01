---
toptitle: "Creating Templates"
title: "Atla: humming the baseline"
date: 2020-03-19T09:39:10+01:00
draft: true
class:  
intro: "Previously, we’ve seen how we chose the main typeface for Atla. Let’s keep going by looking at the template. Today, we’re looking at the baseline."
---

plan:

- baseline and metronome
- setting the right baseline
- baseline on the web
- baseline in Paged.js
- see you next time.

The first time i learned about the baseline grid, it wasn’t in front of a computer, clicking buttons, 

It’s 2010, I’m in a print shop in Provence. One of those old places where your senses are lost between the smell of the ink and the sounds of those all Heidelberg machines. It’s my first time looking at how printing was done before we were surrounded by network and computers, and someone asks me if i want to print something.

Few years ago, i was in ~~London~~Derry, Ireland, where the stigmates of the bloody sundays was still in there. And there was that poem that this irish guy told me, and i always wanted to do something out of it. So i got the words in my memory and starting to think about what to do with it. It’s a not a long poem but it’s not a *haiku*. So i need to find some thing to do with it.

> “I could make drop caps!”

If you never tried to make a drop cap using the characters of lead in a print shop, let me tell you, it’s nothing like clicking a button or call some `.js` file. First, you need to know the exact size of your main font, and then, the difference with the size what you’ll be using for the drop cap. Easy maths.
And then, you’ll run all over the place to figure out where is that half millimeters piece of lead that you can use to make everything work. 

That experience was my first encounter with the idea of a baseline.If the baseline is the invisible line where all characters sit, when you’re on an old printing machine, it’s tangible, because you just can’t print if your baseline is off.

Luckily, that was a long time ago.

## A baseline that sounds great

If a book is a song, a baseline is a metronome. It clicks on every beat, helping all the musicians to be right in time so they can play together. That means that you can be off beat for a while when you want to play *solo*, but you always have something to look for when you want to join the band again.

The pieces we’re using when we’re making a book are the musicians: images, titles, figures, tables, etc., they all need to have their moments when they can shine solo, but they always need to come back to play with the band. 

The first musician to be recorded in our layout is the one with the more regularity, who will give the tempo to everyone. We’re not talking about beat per minutes, but about line per page. How much line do we want per page is gonna give us the kick beat of the book. 

## The stage

Before we start kicking the drum, let’s look at the stage.
Here is our page, <span class="measures">6 × 9 inches</span>. I set up the margins to have enough place for each thumb by having <span class="measures">.75in</span><span class="mm">20mm</span> for the outer margins.

With a font-size of 12px (around 10pt), this give us around 90 characters per line. It may look like a big number, but the target readers are mostly scholars and librarians, they’re used to long lines and complex text. Still, we don’t want the page to feel too crowded, so i added more leading and white space, making it 18px.

> By the way, if you’re used to listen to book designer, they never talk in pixel, but mostly in point. This is not possible using paged.js for one simple reason. As a screen is made of pixel, there is no such thing as a half pixel, which has only one way out: numbers are rounded: 1.4px is either turned into 1px or 2px, depending on the browser, or the OS, etc. Thus, using point to define a distance or a size will most likely shift one line of text somewhere from one pixel. So, when you’re working on screen, you see that line that doesn’t sit on its baseline, and it makes things really hard for a book designer. Therefore, let’s go with px, no one will be hurt, the book will be fine :)



It’s a big number so i needed to have a bigger line-height that i would usually have, 
