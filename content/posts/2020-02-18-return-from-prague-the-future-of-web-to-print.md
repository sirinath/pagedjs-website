---
draft: false
title: 'Return from Prague: the future of web to print'
intro: "A report on the recent W3C print workshop."
class: journal
author: Julie Blanc
date: 2020-02-18T11:02:48.208Z
---


## Report about the W3C Workshop on CSS Print

  On Thursday, February 13th, a group of people gathered at the University of Economics in Prague (Czech Republic) to participate in the[W3C Workshop on CSS Print](https://wiki.csswg.org/planning/print-workshop-2020) as a part of the XML Prague conference. The event was organized by Rachel Andrew, Jirka Kosek and Dave Cramer, members of the CSS working group. Between 30 and 40 people were present, showing a real interest in CSS print. 
  
  The workshop started with a [presentation by Rachel Andrews](https://noti.st/rachelandrew/Hy20NS/introduction-to-the-css-working-group#sWtnkmF), talking about the work of the W3C about the creation of freely open standards for the Web and how the working groups operate, particularly the CSS working group. Rachel recalled that standards take time to set up, because of the specification process, but also because of the lack of funding for work on print specifications. She enumerated a list of possibilities for making things better. Anyone can and is allowed to contribute to specifications (no need to be part of W3C or need permission). Reading and commenting on [specifications issues](https://github.com/w3c/csswg-drafts/issues) is a good start, as is  showing use cases or developing web platform tests. It's also possible to contribute by providing examples and diagrams to specifications. If we want the specifications to improve, there's no secret; the W3C needs to find people to work on print-related specifications, testing and implementations.

After Rachel, several people who had submitted their paper positions, gave shorter presentations about their work and the tools used with CSS print and paged media.

* Dave Cramer started [with his work at Hachette Group](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0032/Cramer-PrintWorkshop-XMLPrague.pdf). Hachette have produced (many) PDFs with HTML and Print CSS over the last ten years. He also talked about the fluctuating implementations of paged media and generated content for paged media in web browsers.
* Michel Miller [presented Antenna House](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0035/CSSWG_Antenna_House_XML_Prague_2020.pdf) and their custom AH formatting engine used to make CSS and XSL-FO paged media outputs.
* Cornelia Kremlin and Katharina Udemadu [presented Compart](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0036/Compart-PositionPaper.pdf), a supplier of document and content technology solutions. Compart is working on the creation of transactions documents using data from an XML data source to create multiple outputs, including PDF.
* Andreas Jung [presented his print-CSS. Rocks project](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0034/01-part), a website where you can find information about tools that exist to create PDF outputs from HTML or XML content. The project offers tutorials and lessons and compares tools and implementations through small, simple tests.
* Liam Quin [spoke on a more general level](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0041/02-css-workshop-prague.pdf) about why pages matter in apps and websites and should be taken into account. He reminded us that the things that people need today are not only about pretty output but more importantly about functionality (initial caps, indexes, marginalia…).
* I also [presented Paged.js](http://slides.julie-blanc.fr/20200213_W3C-prague.html), how the library works and our position in relation to browsers and needs.

All the presentations talked about CSS pain points, print requirements, and some useful specifications that are not yet implemented in any browser or tools (such as handling the initial letter, for example). There is a real need and there are still too many things we can't do today. A lot of specifications are missing in browsers and tools and adoption of the standards is slow. Many tools also develop their own specific extensions to meet the needs of their users (such as page float, footnotes in multi-columns…) and the compatibility between tools is limited. In short, there is a huge amount of work to be done for full use of CSS print and CSS paged media.

A one-hour discussion involving all participants followed the presentations. Some questions which had been raised in the presentations, came up repeatedly:

* What are the missing parts and what can we do? How can we identify relevant features missing in Print CSS? Footnotes or mixed writing modes were often raised as examples where more work is needed.
* In the existing specifications, how can we best prioritize the various needs of implementation? For example, there's some low-hanging fruit, and things Web developers will find useful (e.g. CSS exclusions), maybe we should start with that, because there's going to be strong interest in that.
* Another example, @page size bug is a major issue in some browsers, impossible to hack, if we don't start there, the rest might be for nothing.
* You can also see other questions and points by reading position papers and/or the transcription of the conversation [here](https://www.w3.org/2020/02/13-printcss-minutes.html).

To date, the specifications for print/paged media have been developed under the flag of the (CSS WG). The group also works on a lot of other things; print and paginated media are not necessarily its priority. The work in this area is lost in the mass, not very visible, and the status of CSS draft specifications are unclear (unmaintained, work-in-progress, discontinued?) For example, Dave Cramer is now the only editor of generated content for paged media module and needs help. Writing layout specs is hard, and we need to figure out how to get enough people to contribute

So, during the final conversation, rather than make a wish list of new specifications, we focused on the process: how can we work more effectively with the CSS working group (CSS WG)?

As Liam Quin said in the conclusion of his presentation, "nothing will go forward until the stakeholders are proactive." During this workshop, we could see that there is a core of people very interested in what's going on today with CSS for print and paged media. At the end of the workshop, a new community group was established as a place of our own to raise issues before bringing items to the CSS working group. Dave Cramer, supported by some of the participants, proposed this new group be added to the W3C as the CSS Print Community Group.

The purpose of the group is to “work together to gather use cases, help with specifications, and advocate for more and better implementations”. At the end of the day, the community group was launched and accepted in the list of the current W3C community group: [https://www.w3.org/community/cssprint/](https://www.w3.org/community/cssprint/.). You don't need to be part of W3C to join it, so jump in!
