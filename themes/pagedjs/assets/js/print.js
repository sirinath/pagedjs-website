import { Previewer } from '/js/paged.esm.js'; 
// import { Previewer } from 'https://unpkg.com/pagedjs@0.1.35/dist/paged.esm.js';


// print stuff

window.onload = function(){

  // Recuperer contenu
  let content = document.body.innerHTML;
  document.body.innerHTML = "";

  // Move content into #content + build header
  document.body.innerHTML = '\
  <header id="header-pagedjs">\
    <div id="header-container">\
        <input type="radio" id="input-screen" name="toggle-input" value="screen" hidden checked/>\
        <input type="radio" id="input-print" name="toggle-input" value="print" hidden/>\
        <button id="button-screen" data-text="Version numérique">\
        <svg id="icon-screen" data-name="icon-screen" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>screen</title><path d="M177.72,151H23.16a6.72,6.72,0,0,1-6.72-6.72V36.72A6.72,6.72,0,0,1,23.16,30H177.72a6.73,6.73,0,0,1,6.72,6.72V144.28A6.73,6.73,0,0,1,177.72,151ZM23.16,35a1.72,1.72,0,0,0-1.72,1.72V144.28A1.72,1.72,0,0,0,23.16,146H177.72a1.72,1.72,0,0,0,1.72-1.72V36.72A1.72,1.72,0,0,0,177.72,35Z"/><rect x="26" y="40" width="149" height="88" rx="3.62" ry="3.62"/><path d="M139.44,173h-78a2.5,2.5,0,0,1,0-5h78a2.5,2.5,0,0,1,0,5Z"/><path d="M79.94,170a2.5,2.5,0,0,1-2.5-2.5v-19a2.5,2.5,0,0,1,5,0v19A2.5,2.5,0,0,1,79.94,170Z"/><path d="M120.94,170a2.5,2.5,0,0,1-2.5-2.5v-19a2.5,2.5,0,0,1,5,0v19A2.5,2.5,0,0,1,120.94,170Z"/></svg>\
        </button>\
        <button id="button-print-preview" data-text="Aperçu impression">\
        <svg id="icon-preview" data-name="icon-preview" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>preview</title><rect x="36" y="85" width="5" height="71"/><polygon points="129 159 129 179 41 179 41 159 36 159 36 184 134 184 134 159 129 159"/><path d="M193,101A88.76,88.76,0,0,0,69.59,85H21.06A8.07,8.07,0,0,0,13,93.06v54.88A8.07,8.07,0,0,0,21.06,156H147.94a8.07,8.07,0,0,0,8.06-8.06V128.72A89.14,89.14,0,0,0,193,101Zm-69.87,29a83.33,83.33,0,0,1-63.38-29,83.77,83.77,0,0,1,126.77,0A83.34,83.34,0,0,1,123.16,130Z"/><path d="M125.66,75.89a25.58,25.58,0,0,0-9.94,1A12.61,12.61,0,1,1,99.06,93.56a25.22,25.22,0,1,0,26.6-17.67Z"/><path d="M129,69.63c1.68.1,3.34.24,5,.42V17H36V82h5V22h88Z"/></svg> \
        </button>\
        <button id="button-print" data-text="Imprimer">\
        <svg id="icon-print" data-name="icon-print" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><title>print</title><path d="M163.94,85H37.06A8.07,8.07,0,0,0,29,93.06v54.88A8.07,8.07,0,0,0,37.06,156H163.94a8.07,8.07,0,0,0,8.06-8.06V93.06A8.07,8.07,0,0,0,163.94,85ZM119,119.54H93a9.54,9.54,0,0,1,0-19.08h26a9.54,9.54,0,0,1,0,19.08Zm30.5,1a10,10,0,1,1,10-10A10,10,0,0,1,149.5,120.54Z"/><polygon points="57 82 57 22 145 22 145 82 150 82 150 17 52 17 52 82 57 82"/><polygon points="145 159 145 179 57 179 57 159 52 159 52 184 150 184 150 159 145 159"/></svg>\
        </button>\
    </div>\
    </header>\
    <div id="renderbook"></div>\
    <div id="content">\
    ' + content + '</div>';


  // add onclick event -------------------------
  document.querySelector('#button-print-preview').addEventListener('click', printPreview);
  document.querySelector('#button-screen').addEventListener('click', screenReload);
  document.querySelector('#button-print').addEventListener('click', printPdf);

};


/* PREVIEW ----------------------------------------------------------- */

function printPreview() {

  let inputPrint = document.getElementById("input-print");
  document.getElementById("button-print").disabled = true;
  
  if(inputPrint.checked){
    document.getElementById("button-print").disabled = false;
  }else{
    // document.getElementById("style-screen").remove();
    let bookcontent = document.querySelector("#content");
    let content = bookcontent.innerHTML;
    bookcontent.innerHTML = "";
    let previewer = new Previewer();
    previewer.preview(content, ["/css/main.css"], document.querySelector("#renderbook"))
    previewer.hooks.afterPreview.register(function() {
      document.getElementById("button-print").disabled = false;
    });
    this.disabled = "disabled";
    document.getElementById("input-print").checked = "true";
  }
};



/* SCREEN ----------------------------------------------------------- */

function screenReload() {
  window.location.reload(false); 
};


/* PRINT ----------------------------------------------------------- */

function printPdf() {
  let inputPrint = document.getElementById("input-print");
  if(inputPrint.checked){
    window.print();
  }else{
    // document.getElementById("style-screen").remove();
    let bookcontent = document.querySelector("#content");
    let content = bookcontent.innerHTML;
    bookcontent.innerHTML = "";
    let previewer = new Previewer();
    previewer.hooks.afterPreview.register(function() {
      window.print();
    });
    previewer.preview(content, ["./css/main.css"], document.querySelector("#renderbook"));
    document.getElementById("input-print").checked = "true";
  }
};



