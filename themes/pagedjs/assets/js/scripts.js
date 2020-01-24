document.querySelector('footer').addEventListener("click", function() {
    this.classList.toggle("show");
})

if (document.querySelector('.toc .title')) {
document.querySelector('.toc .title').addEventListener("click", function() {
    document.querySelector('.toc').classList.toggle("show");
})
}

