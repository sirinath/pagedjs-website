
// document.querySelector('footer').addEventListener("click", function() {
//     this.classList.toggle("show");
// })

// console.log(document.querySelector('#toggleMenu'));

// document.querySelector('#toggleMenu').addEventListener("click",  function() { document.querySelector("aside.menu").classList.toggle("leftHide")});

if (document.querySelector('.toc .title')) {
document.querySelector('.toc .title').addEventListener("click", function() {
    document.querySelector('.toc').classList.toggle("show");
})
}

document.querySelector(".menu-call").addEventListener("click", function() {document.querySelector(".menu").classList.toggle("hide")});


// remove print from bookish theme coz we’re gettin’ it from the paged.js theme 
// if (document.querySelector('#print')) {
// document.querySelector('#print').addEventListener("click", preview);
// }

// function preview() {
//   window.PagedPolyfill.preview();
// }

// if (document.querySelectorAll("#TableOfContents")) {
// document.querySelectorAll("#TableOfContents").forEach(toc => {
//   toc.classList.add("table-of-contents");
//   toc.id = "";
//   linkPrepend = toc.previousElementSibling.querySelector("a").getAttribute("href");
//   toc.querySelectorAll("a").forEach(item => {
//       let link = item.getAttribute("href");
//       item.setAttribute("href", linkPrepend + link) 
//   })
// })
// }