var fuse; // holds our search engine
var searchVisible = false; 
var firstRun = true; // allow us to delay loading json data unless search activated
var list = document.getElementById('searchResults'); // targets the <ul>
var first = list.firstChild; // first child of search list
var last = list.lastChild; // last child of search list
var maininput = document.getElementById('searchInput'); // input box for search
var resultsAvailable = false; // Did we get any search results?


window.onload = function(e) {
  loadSearch(); // loads our json data and builds fuse.js search index
  firstRun = false; // let's never do this again
  console.log("loaded");
}
// ==========================================
// The main keyboard event listener running the show
//


document.getElementById("searchInput").onkeyup = function(e) { 
  executeSearch(this.value);
}


// ==========================================
// fetch some json without jquery
//
function fetchJSONFile(path, callback) {
  var httpRequest = new XMLHttpRequest();
  httpRequest.onreadystatechange = function() {
    if (httpRequest.readyState === 4) {
      if (httpRequest.status === 200) {
        var data = JSON.parse(httpRequest.responseText);
          if (callback) callback(data);
      }
    }
  };
  httpRequest.open('GET', path);
  httpRequest.send(); 
}


// ==========================================
// load our search index, only executed once
// on first call of search box (CMD-/)
//
function loadSearch() { 
  fetchJSONFile('/index.json', function(data){

    var options = { // fuse.js options; check fuse.js website for details
      shouldSort: true,
      location: 0,
      distance: 100,
      threshold: 0.5,
      minMatchCharLength: 2,
      keys: [
        'title',
        'permalink',
        'content', 
        'intro'
        ]
    };
    fuse = new Fuse(data, options); // build the index from the json file
  });
}


// ==========================================
// using the index we loaded on CMD-/, run 
// a search query (for "term") every time a letter is typed
// in the search box
//
function executeSearch(term) {
  let results = fuse.search(term); // the actual query being run using fuse.js
  let searchitems = ''; // our results bucket

  if (results.length === 0) { // no results based on what was typed into the input box
    resultsAvailable = false;
    searchitems = '';
  } else { // build our html 
    for (let item in results.slice(0,5)) { // only show first 5 results
      if (!results[item].intro) {
        results[item].intro = "";
      };
      if (results[item].type === "posts") {
        results[item].type = "Journal";
      };
      if (results[item].type === "documentation") {
        results[item].type = "Documentation";
      };
      searchitems = searchitems + '<li><span class="type">'+ results[item].type +'</span><a href="' + results[item].permalink + '" tabindex="0">' + '<span class="title">' + results[item].title + '</span></a> <p class="meta"><span class="intro">'+ results[item].intro +'</span></p></li>';
    }
    resultsAvailable = true;
  }

  document.getElementById("searchResults").innerHTML = searchitems;
}
