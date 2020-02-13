
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


if (document.querySelector('#print')) {
document.querySelector('#print').addEventListener("click", print);
}

function print() {
  window.PagedPolyfill.preview();
}