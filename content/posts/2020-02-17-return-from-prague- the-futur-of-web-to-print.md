---
draft: true
title: "Return from Prague:\_the futur of web to print"
class: ''
date: 2020-02-17T15:13:55.360Z
intro: >-
  On thursday, February 13th, a group of people gathered at the University of
  Economics in Prague (Czech) to participate in the [W3C Workshop on CSS
  Print](https://wiki.csswg.org/planning/print-workshop-2020) as a part of XML
  Prague conference. The workshop was organized by Rachel Andrew, Jirka Kosek
  and Dave Cramer, members of the CSS working group. Between 30 and 40 people
  were present, showing a real interest in CSS print.
---
## Report about the W3C Workshop on CSS Print

The workshop started with a [presentation by Rachel Andrews](https://noti.st/rachelandrew/Hy20NS/introduction-to-the-css-working-group#sWtnkmF), talking about the work of the W3C about the creation of freely open standars for the Web and how works the working groups, particulary the CSS working group. She recalled that standards take time to set up, because of the specification process but also because of the lack of funding for work on print specifications. She enumerated a list of possibilities for making things better: anyone can and are allowed to contribute to specifications (no need to be part of W3C or need persmission), read and comment on [specifications issues](https://github.com/w3c/csswg-drafts/issues) is a good start, like show use cases or developping web platform tests. It's also possible to contibute by examples and diagrams to specifications. If we want the specifications to improve, there's no secret, the W3C needs to find people to work on print-related specifications, testing and implementations.

After Rachel, several people who had submitted their paper positions, gave shorter presentations about their works and tools with CSS print and paged media.

* Dave Cramer starts [with his work at Hachette book Group](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0032/Cramer-PrintWorkshop-XMLPrague.pdf). Hachette make (a lot of) PDF with HTML and Print CSS since ten years. He also talk about the fluctuating of implementations of paged media and generated content for paged media in web browsers.
* Michel Miller [presents Antenna House](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0035/CSSWG_Antenna_House_XML_Prague_2020.pdf) and their AH formatter with make CSS and XSL-FO Paged media outputs. Antenna House have their own CSS formatting that encompasses the functionality of their over 20 years of XSL formatting engine develop. 
* Cornelia Kränzlein and Katharina Udemadu [presented Compart](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0036/Compart-PositionPaper.pdf), a supplier of document and content technology solutions. Compart is working on the creation of a transactions documents and use data from an XML data source to create multiples outputs, including PDF.
* Andreas Jung [presents his print-css.rocks project](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0034/01-part), a website where you can find inforrmation about tools that exist to create PDF outputs from HTML or XML content. The project gives tutorials and lessons and compares tools and implementations through small, simple tests.
* Liam Quin [spoke on a more general level](https://lists.w3.org/Archives/Public/public-css-print/2020JanMar/att-0041/02-css-workshop-prague.pdf) about why pages matter in app and websites and should be part of it. He reminded us that the things that people need today are not only about pretty but about function (initial caps, indexes, marginalia…).
* I also [presents Paged.js](http://slides.julie-blanc.fr/20200213_W3C-prague.html), how the library works and our position in relation to browsers and needs.

All the presentations talks about CSS pain point, print requirements and some useful specifications that are not yet implemented in any browser or tools (such as the initial letter for example).  There is a real need and there are still too many things we can't do today. A lot of specifications are missing in browsers and tools and adoption of what's out there is slow. Many tools also developp their own specific extentions because of the need of their users (like page float, footnotes in multicolumns…) and the compatibility between tools is limited. In short, there is a uge amount of work on the side of CSS print and CSS paged media. 

We continued the presentations with a one-hour discussion between all of us. Some questions, also asked in the presentations, came up a lot:

* What are the missing parts and what can we do? How identify relevant features missing in Print CSS ?  Footnotes or mixed writing modes, as examples where more work is needed.
* In the existing specifications, how prioritize the need of implementation ? For exemple, there's some low-hanging fruit, and things Web developpers will find useful (e.g. CSS exclusions), maybe we should start with that, because there's going to be strong interest in that. An other exemple, @page size bug is a major issue in some browsers, impossible to hack, if we don't start there, the rest might be for nothing.
* You can also see other questions and points by reading position papers or the transcription of the conversation [here](https://www.w3.org/2020/02/13-printcss-minutes.html)

Today, the specifications for print/paged media have been developed under the flag of the (CSS WG). The group also works on a lot of other things; print and paginated media are not necessarily its priority. The work on this subject is lost in the mass, not very visible and the status of CSS drafts specifications  are unclear (unmaintained, work-in-progress, discontinues?)  In other way, David Cramer is now the only editor of generated content for paged media module and needs help. Writing layout specs is hard, will enough people contribute and how ? 

So, during the final converstation, rather than make a wish list of new specifications, we've been talking about the process: how can we work more effectively with the CSS working group (CSS WG) ?

Like Liam Quin said in the conclusion of is presentation, "nothing will go forward until the stakeholders are proactive." During this workshop, we see there i a core of people very interested in what's going on today with CSS for print and paged media. The conclusion of the workshop was the creation of a new community group as a place of our own before bringing things to the CSS working group. Dave Cramer, supported by some of the participants, proposed to the W3C the **CSS Print Community Group**. 

The purpose of the group is to "work together to gather use cases, help with specifications, and advocate for more and better implementations". At the end of the day, the community group was launch and accepted in the list of the current W3C community group: https://www.w3.org/community/cssprint/. You don't need to be part of W3C to join it, so jump in !
