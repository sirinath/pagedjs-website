// toc rebuild for the bugger table of content

document.querySelectorAll("#TableOfContents").forEach(toc => {
    toc.classList.add("table-of-contents");
    toc.id = "";
    linkPrepend = toc.previousElementSibling.querySelector("a").getAttribute("href");    toc.querySelectorAll("a").forEach(item => {
        let link = item.getAttribute("href");
        item.setAttribute("href", linkPrepend + link) 
    })
})

