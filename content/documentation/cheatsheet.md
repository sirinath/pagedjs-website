---
title: "Supported feature of the W3C specifications"
date: 2019-09-03T18:23:22+02:00
draft: false
weight: 12
part: 14
---

<h3>CSS Paged Media Module Level 3</h3>
<p><a href="href="https://www.w3.org/TR/css3-page/">W3C Working Draft 14 March 2013</a></p>
<p><a href="https://drafts.csswg.org/css-page/#marks">Editor’s Draft, 9 November 2017</a></p>

<table class="specs">
<thead>
<tr>
<th colspan="4"><b>@page rules</b></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3">Size</td>
<td>size: &lt;length&gt;{1,2} ;</td>
<td><a href="https://s3.amazonaws.com/pagedmedia/pagedjs/specs/page-rules/size/length/length.html">HTML</a></td>
<td><a href="https://s3.amazonaws.com/pagedmedia/pagedjs/specs/page-rules/size/length/length.pdf">PDF</a></td>
</tr>
<tr>
<td>size: A5 | A4 | A3 | B5 | B4 | letter | legal | ledger ;</td>
<td rowspan="1"><a href="https://s3.amazonaws.com/pagedmedia/pagedjs/specs/page-rules/size/page-size/page-size.html">HTML</a></td>
<td><a href="https://s3.amazonaws.com/pagedmedia/pagedjs/specs/page-rules/size/page-size/page-size.pdf">PDF</a></td>
</tr>
<tr>
<td>size: portrait | landscape ;</td>
<td><a href="https://s3.amazonaws.com/pagedmedia/pagedjs/specs/page-rules/size/landscape/landscape.html">HTML</a></td>
<td><a href="https://s3.amazonaws.com/pagedmedia/pagedjs/specs/page-rules/size/landscape/landscape.pdf">PDF</a></td>
</tr>
<tr>
<td>Marks</td>
<td>marks: none | [ crop || cross ] ; </td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/blob/master/specs/marks/marks.html">HTML</a></td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/blob/master/specs/marks/__image_snapshots_linux__/marks-spec-js-marks-should-create-a-pdf-1-snap.png">Screenshot</a></td>
</tr>
<tr>
<td>Bleed</td>
<td>bleed: &lt;length&gt; ;</td>
<td> <a href="https://gitlab.pagedmedia.org/tools/pagedjs/blob/master/specs/bleed/bleed.html">HTML</a>  </td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/blob/master/specs/bleed/__image_snapshots_mac__/bleed-spec-js-bleed-should-create-a-pdf-1-snap.png">screenshot</a></td>
</tr>
<tr>
<td rowspan="3">Margins</td>
<td>margin: &lt;length&gt;{1,2} ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page/margins/two-lenghts/margins-2-lenghts.html">HTML</a></td>
<td><a href="/uploads/cc36931bb78fe4c5343130a2d9ae64d1/margins-2-lenghts.pdf">PDF</a></td>
</tr>
<tr>
<td>margin-top: &lt;length&gt; ;<br>      margin-bottom: &lt;length&gt; ;<br>      margin-left: &lt;length&gt; ;<br>      margin-right: &lt;length&gt; ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page/margins/four-lenghts/margins-4-lenghts.html">HTML</a></td>
<td><a href="/uploads/d8516dfa7c5a1d14088fd131f563fb40/margins-4-lenghts.pdf">PDF</a></td>
</tr>
<tr>
<td>margin-inside: &lt;length&gt; ;<br>      margin-outside: &lt;length&gt; ;</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td rowspan="3">Background</td>
<td>background-color: ... ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page/background/background-color/background-color.html">HTML</a></td>
<td><a href="/uploads/d535bf49ee2d6fe7b4f0974a941665a2/background-color.pdf">PDF</a></td>
</tr>
<tr>
<td>background-image: url(&lt;url&gt;) ;</td>
<td rowspan="1"><a https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page/background/background-image/background-image.html">HTML</a></td>
<td><a href="/uploads/4223661b63f2c361456cb5a942a12779/background-image.pdf">PDF</a></td>
</tr>
<tr>
<td>background-size: ... ;<br/>background-repeat: ... ;<br/>background-position: ... ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page/background/background-values/background-values.html">HTML</a></td>
<td><a href="/uploads/d7b9c1bdad9709cbdb459ebdc45095cd/background-values.pdf">PDF</a></td>
</tr>
</tbody>


<thead>
<tr>
<th colspan="4"><b>Page selectors</b></th>
</tr>
</thead>
<tbody>
<tr>
<td>Spread</td>
<td>@page :left { }<br>      @page :right { }</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page-selector/page-spread/page-spread.html">HTML</a></td>
<td><a href="/uploads/6d59efe3792651070194cd6fd713ae49/page-spread.pdf">PDF</a></td>
</tr>
<tr>
<td>First page</td>
<td>@page :first { }</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page-selector/first-page/first-page.html">HTML</a></td>
<td><a href="/uploads/cb4c3e06b08905db83cd6cb583173da4/first-page.pdf">PDF</a></td>
</tr>
<tr>
<td>Blank page</td>
<td>@page :blank { }</td>
<td><a https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page-selector/blank-page/blank-page.html">HTML</a></td>
<td><a href="/uploads/014c511eb3b555bf3c46fdbaf50aceb1/blank-page.pdf">PDF</a></td>
</tr>
<tr>
<td><i>n</i>th page</td>
<td>@page :nth(<i>n</i>) { }</td>
<td><a https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page-selector/page-nth/page-nth.html">HTML</a></td>
<td><a href="/uploads/09d3b67b50b393aa87e193779e4703ef/page-nth.pdf">PDF</a></td>
</tr>
</tbody>




<thead>
<tr>
<th colspan="4"><b>Margin boxes</b></th>
</tr>
</thead>
<tbody>
<tr>
<td>Default</td>
<td></td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/margin-boxes/default-text-alignment/margin-boxes-default-text-alignment.html">HTML</a></td>
<td><a href="/uploads/b7dcbfb31bd02b585666daba8769ff14/margin-boxes-default-text-alignment.pdf">PDF</a></td>
</tr>
<tr>
<td>Styles</td>
<td>bakground: ... ;<br/>color: ... ;<br/>border:... ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/margin-boxes/style/margin-boxes-style.html">HTML</a></td>
<td><a href="/uploads/7a1f58ed55214e857cd20989e6fd7392/margin-boxes-style.pdf">PDF</a></td>
</tr>
<tr>
<td>Text alignment</td>
<td>text-align: left | center | right ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/margin-boxes/text-align/margin-boxes-text-align.html">HTML</a></td>
<td><a href="/uploads/8d87c106ebb3d737acb5d1023d0f0e62/margin-boxes-text-align.pdf">PDF</a></td>
</tr>
<tr>
<td>Vertical alignment</td>
<td>vertical-align: top | middle | bottom ;<br/><i>or </i>align-items: flex-start | center | flex-end ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/margin-boxes/vertical-align/margin-boxes-vertical-align.html">HTML</a></td>
<td><a href="/uploads/d7ee3b105bd8813a8f4e2799dbb7fab8/margin-boxes-vertical-align.pdf">PDF</a></td>
</tr>
<tr>
<td>Computed</td>
<td>...</td>
<td>in progress</td>
<td></td>
</tr>
</tbody>


<thead>
<tr>
<th colspan="4"><b>Page-based counters</b></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3">counter for page</td>
<td>content : counter(page) ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/counter-page/counter-page.html">HTML</a></td>
<td><a href="/uploads/22a0454f6d1925d89bd9baa7670d573b/counter-page.pdf">PDF</a></td>
</tr>
<tr>
<td>content : counter(pages) ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/counter-pages/counter-pages.html">HTML</a></td>
<td><a href="/uploads/f0d8cb270f4019dac4ad0963f5875857/counter-pages.pdf">PDF</a></td>
</tr>
</tbody>
<thead>
<tr>
<th colspan="4"><b>Named page</b></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">named @page</td>
<td>@page &lt;name&gt; { } <br>section { page: &lt;name&gt; }</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/named-page/named-page/named-page.html">HTML</a></td>
<td><a href="/uploads/6135c29ed8733da2bd2e87717aca74ad/named-page.pdf">PDF</a></td>
</tr>
</tbody>
<thead>
<tr>
<th colspan="4"><b>Page group</b></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="2">page group</td>
<td>@page &lt;name&gt; { } <br>section { page: &lt;name&gt; }</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/named-page/page-group/page-group.html">HTML</a></td>
<td><a href="/uploads/7cf2105a084ffdcc292e459dae39e797/page-group.pdf">PDF</a></td>
</tr>
</tbody>

<thead>
<tr>
<th colspan="4"><b>Page selectors for page group</b></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="">Spread</td>
<td>@page &lt;name&gt;:left { }<br/>@page &lt;name&gt;:left { }</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page-selector/page-group/spread-of-page-group/spread-of-page-group.html">HTML</a></td>
<td><a href="/uploads/5218443c7f62008a5dd58ca6932dbfc2/spread-of-page-group.pdf">PDF</a></td>
</tr>
<tr>
<td>First page</td>
<td>@page &lt;name&gt;:first { }</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/page-selector/page-group/first-page-of-page-group/first-page-of-page-group.html">HTML</a></td>
<td><a href="/uploads/99407e57dc1da7a0a2a4e78e1d159781/first-page-of-page-group.pdf">PDF</a></td>
</tr>
<tr>
<td>Blank page</td>
<td>@page &lt;name&gt;:blank { }</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/issues/30">issue#30</a></td>
<td></td>
</tr>
<tr>
<td><i>n</i>th page</td>
<td>@page &lt;name&gt;:nth(<i>n</i>) { }</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/issues/29">issue#29</a></td>
<td></td>
</tr>

</tbody>

</table>


<h3>CSS Fragmentation Module Level 3</h3>
<p><a href="https://www.w3.org/TR/css-break-3/">W3C Candidate Recommendation, 9 February 2017</a></p>

<table>
<thead>

<tr>
<th colspan="4"><b>Breaks Between Boxes</b></th>
</tr>
<tr>
<td rowspan="7">Breaks before</td>
<td>break-before: avoid-page | avoid ;</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>break-before: page ; </td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-before/break-before-page/break-before-page.html">HTML</a></td>
<td><a href="/uploads/59e84cfeab36e16ff972ea2a7d531c6f/break-before-page.pdf">PDF</a></td>
</tr>
<tr>
<td>break-before: left ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-before/break-before-left/break-before-left.html">HTML</a></td>
<td><a href="/uploads/4db5e5f23488f4971436e7f81f9b1b53/break-before-left.pdf">PDF</a></td>
</tr>
<tr>
<td>break-before: right ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-before/break-before-right/break-before-right.html">HTML</a></td>
<td><a href="/uploads/e3b7e12f611c6986a991560c9a603ad6/break-before-right.pdf">PDF</a></td>
</tr>
<tr>
<td>break-before: recto ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-after/break-after-recto/break-after-recto.html">HTML</a></td>
<td><a href="/uploads/379f8598d66c3c233d9340eb415c07dd/break-before-recto.pdf">PDF</a></td>
</tr>
<tr>
<td>break-before: verso ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-after/break-after-verso/break-after-verso.html">HTML</a></td>
<td><a href="/uploads/35f6e1f5d4821eb584371b1baa48fbc6/break-before-verso.pdf">PDF</a></td>
</tr>
<tr>
<td>break-before: column | region;</td>
<td>?</td>
<td></td>
</tr>
<tr>
<td rowspan="7">Breaks after</td>
<td>break-after: avoid-page | avoid ; </td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>break-after: page ; </td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/tree/master/breaks/break-after/break-after-page">HTML</a></td>
<td><a href="/uploads/a6f8a23a94afa3c238aefd1b234f4be5/break-after-page.pdf">PDF</a></td>
</tr>
<tr>
<td>break-after: left ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-after/break-after-left/break-after-left.html">HTML</a></td>
<td><a href="/uploads/43ddeb6dccbb33258ea6ce350aa1bcb1/break-after-left.pdf">PDF</a></td>
</tr>
<tr>
<td>break-after: right ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-after/break-after-right/break-after-right.html">HTML</a></td>
<td><a href="/uploads/898ca2d4fe2c1952cb0c558e1bc73cd7/break-after-right.pdf">PDF</a></td>
</tr>
<tr>
<td>break-after: recto ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-after/break-after-recto/break-after-recto.html">HTML</a></td>
<td><a href="/uploads/75f1ea2d8279fdbbafc4c58dd06bb63e/break-after-recto.pdf">PDF</a></td>
</tr>
<tr>
<td>break-after: verso ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-after/break-after-verso/break-after-verso.html">HTML</a></td>
<td><a href="/uploads/eeac770f9d99b623a72aa62fffe906d2/break-after-verso.pdf">PDF</a></td>
</tr>
<tr>
<td>break-after: column | region ;</td>
<td>?</td>
<td></td>
</tr>
<tr>
<td rowspan="12">Avoid breaks inside</td>
<td>break-inside: avoid ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/breaks/break-inside/break-inside-avoid/break-inside-avoid.html">HTML</a></td>
<td><a href="/uploads/8e2763bb468daad880c75b2b534fba51/break-inside-avoid.pdf">PDF</a></td>
</tr>
<tr>
<td>break-inside: avoid-page ; </td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>break-inside: avoid-column; </td>
<td>?</td>
<td></td>
</tr>
<tr>
<td>break-inside: avoid-region ;</td>
<td>?</td>
<td></td>
</tr>
</thead>
<thead>
<tr>
<th colspan="4"><b>Breaks Between Lines</b></th>
</tr>
</thead>
<tbody>
<tr>
<td>Orphans</td>
<td>orphans: &lt;integer&gt; ;</td>
<td colspan="2">Chrome and blink browsers supports <code>orphans</code> out of the box. Firefox doen't. Check support from <a href="https://caniuse.com/#search=widows">caniuse.com</a></td>
</tr>
<tr>
<td>Widows</td>
<td>widows: &lt;integer&gt; ;</td>
<td colspan="2">Chrome and blink browsers supports <code>widows</code> out of the box. Firefox doen't. Check support from <a href="https://caniuse.com/#search=widows">caniuse.com</a></td>
</tr>
</tbody>
<thead>
<tr>
<th colspan="4"><b>Fragmented Borders and Backgrounds</b></th>
</tr>
</thead>
<tbody>
<tr>
<td>box-decorations</td>
<td>box-decoration-break: slice | clone ;</td>
<td>no</td>
<td></td>
</tr>
</tbody>
</table>

<h3>CSS Generated Content for Paged Media Module</h3>
<p><a href="https://www.w3.org/TR/css-gcpm-3/">W3C Working Draft, 13 May 2014</a></p>


<table>
<thead>
    <tr>
<th colspan="4"><b>Named strings</b></th>
</tr>
</thead>



<tbody>
<tr>
<td>String-set() on elements</td>
<td colspan="3">string-set: [[&lt;custom-ident&gt; &lt;content-list&gt;][, &lt;custom-ident&gt; &lt;content-list&gt;]* ]</td>

</tr>
<tr>
<td rowspan="8"><i>&lt;content-list&gt;</i>=</td>
<td>&lt;string&gt;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/string-set/string/string.html">HTML</a></td>
<td><a href="/uploads/5d980da4c88b94645e4da4bb1fab9236/string.pdf">PDF</a></td>
</tr>
<tr>
<td>content(text)</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/string-set/content/content-text/content-text.html">HTML</a></td>
<td><a href="/uploads/65de35d6dc785600e285ff0e96f4ddf6/content-text.pdf">PDF</a></td>
</tr>
<tr>
<td>content(before)</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/issues/45">Issue#45</a></td>
<td></td>
</tr>
<tr>
<td>content(after)</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/issues/45">Issue#45</a></td>
<td></td>
</tr>
<tr>
<td>content(first-letter)</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/issues/45">Issue#45</a></td>
<td></td>
</tr>
<tr>
<td>counter()</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>counters()</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>attr(&lt;identifier&gt;)</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>String in margin-boxes</td>
<td colspan="3">content: string( &lt;custom-ident&gt; [ , [ &lt;keyword&gt;] ]? )</td>
</tr>
<tr>
<td rowspan="4"><i>&lt;keyword&gt;</i>=</td>
<td>first</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/merge_requests/84">Pending merge request</a></td>
<td></td>
</tr>
<tr>
<td>start</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/merge_requests/84">Pending merge request</a></td>
<td></td>
</tr>
<tr>
<td>last</td>
<td><a href="https://gitlab.pagedmedia.org/tools/pagedjs/merge_requests/84">Pending merge request</a></td>
<td></td>
</tr>
<tr>
<td>first-except</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/string/first-except/first-except.html">HTML</a></td>
<td><a href="/uploads/835d25249e878e15b436288907d5ffba/first-except.pdf">PDF</a></td>
</tr>
</tbody>


<thead>
<tr>
<th colspan="4"><b>Running elements</b></th>
</tr>
<tr>
<td>Running value on elements</td>
<td> position: running(&lt;custom-ident&gt;) ;</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/running-element/running.html">HTML</a></td>
<td><a href="/uploads/3f21e22849812b0d25754cd9d5ec932d/running.pdf">PDF</a></td>
</tr>
<tr>
<td>Element value in margin boxes</td>
<td> content: element(...) ;<br><i>element( &lt;custom-ident&gt; [ , &lt;keyword&gt; ]? )</i></td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/running-element/running.html">HTML</a></td>
<td><a href="/uploads/3f21e22849812b0d25754cd9d5ec932d/running.pdf">PDF</a></td>
</tr>
<tr>
<td rowspan="4"><i>&lt;keyword&gt;</i>=</td>
<td>first</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>start</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>last</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>first-except</td>
<td>no</td>
<td></td>
</tr>
</thead>
<thead>
<tr>
<th colspan="4"><b>Footnotes</b></th>
</tr>
<tr>
<td>Footnotes area</td>
<td>@footnote{ float: bottom ; }</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>Footnote element</td>
<td>.note { float: footnote ; }</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>Footnote type</td>
<td>footnote-display: block | inline | compact ;</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>Rendering footnotes</td>
<td>footnote-policy: auto | line | block ;</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td rowspan="2">Footnotes counters</td>
<td>::footnote-call { }<br><i>::footnote-call { content: counter(footnote <br>[, &lt;counter-style&gt;, &lt;string&gt;] ; }</i></td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>::footnote-marker { }<br><i>::footnote-marker { content: counter(footnote <br>[, &lt;counter-style&gt;, &lt;string&gt;] ; }</i></td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>Reset footnotes</td>
<td>@page { counter-reset: footnote ; }</td>
<td>no</td>
<td></td>
</tr>
</thead>
<thead>
<tr>
<th colspan="4"><b>Leaders</b></th>
</tr>
<tr>
<td>leaders</td>
<td>content : leader(&lt;type&gt;) ;</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td rowspan="4"><i>&lt;type&gt;</i>=</td>
<td>dotted</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>solid</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>space</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>&lt;string&gt;</td>
<td>no</td>
<td></td>
</tr>
</thead>


<thead>
<tr>
<th colspan="4"><b>Cross-references</b></th>
</tr>
<tr>
<td rowspan="2">Counter type</td>
<td>content: target-counter(attr(href url), page) ;<br><i>target-counter( &lt;url&gt; , &lt;custom-ident&gt; [ , &lt;counter-style&gt; ]? )</i></td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/blob/master/target/target-counter/target-counter.html">HTML</a><br/>+ <a href="https://gitlab.pagedmedia.org/tools/pagedjs/issues/46">Issue#46</a></td>
<td><a href="/uploads/5d09dcfac85707bdb2b30f591bed4c37/targer-counter-wrong.pdf">PDF</a></td>
</tr>
<tr>
<td><i>target-counters( &lt;url&gt; , &lt;custom-ident&gt; [ , &lt;counter-style&gt; ]? )</i></td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>Text type</td>
<td>content: target-content(attr(href)) ;<br><i>target-text( &lt;url&gt; [ , &lt;keyword&gt; ]? )</i></td>
</tr>
<tr>
<td rowspan="4"><i>&lt;keyword&gt;</i>=</td>
<td>content</td>
<td><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/tree/master/target/target-text/target-text-content">HTML</a></td>
<td><a href="/uploads/8866ea1ba36d87f4c68f1b6c8d3c3747/target-text-content.pdf">PDF</a></td>
</tr>
<tr>
<td>before</td>
<td colspan="2"><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/tree/master/target/target-text/target-text-content">HTML</a></td>
</tr>
<tr>
<td>after</td>
<td colspan="2"><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/tree/master/target/target-text/target-text-content">HTML</a></td>
</tr>
<tr>
<td>first-letter</td>
<td colspan="2"><a href="https://gitlab.pagedmedia.org/JulieBlanc/refs-specifications/tree/master/target/target-text/target-text-content">HTML</a></td>
</tr>
</thead>
<thead>
<tr>
<th colspan="4"><b>PDF bookmarks</b></th>
</tr>
</thead>
<tbody>
<tr>
<td rowspan="3">Bookmarks</td>
<td>bookmark-level: &lt;integer&gt; ;
</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>bookmark-label: &lt;content-list&gt;
</td>
<td>no</td>
<td></td>
</tr>
<tr>
<td>bookmark-state: open | close ;</td>
<td>no</td>
<td></td>
</tr>
</tbody>
</table>