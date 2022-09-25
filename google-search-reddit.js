// ==UserScript==
// @name         Google Search Reddit
// @namespace    http://github.com/egefeyzioglu/
// @version      1.0
// @description  Adds a "Search on Reddit" button to Google search
// @author       Ege
// @match        https://www.google.com/*
// @match        https://www.google.com/search*
// @icon         https://reddit.com/favicon.ico
// @grant        none
// @updateURL  http://github.com/egefeyzioglu/search-on-reddit/main/google-search-reddit.js
// @downloadURL  http://github.com/egefeyzioglu/search-on-reddit/main/google-search-reddit.js
// ==/UserScript==

(function() {
    'use strict';
    // Get the elements
    let searchBox = document.querySelector("input[aria-label=Search]");
    let insertBeforeThis = searchBox.parentElement.nextSibling;
    let searchBoxWrapper = searchBox.parentElement.parentElement;

    // Create the button
    let searchOnReddit = document.createElement("img");
    searchOnReddit.src = "https://reddit.com/favicon.ico";
    searchOnReddit.alt = "Search on Reddit";
    searchOnReddit.title = "Search on Reddit";
    searchOnReddit.style.marginBottom = "1%";
    searchOnReddit.style.cursor = "pointer";
    searchOnReddit.onclick = function(){
        // Get the search box
        let searchBox = document.querySelector("input[aria-label=Search]");

        // If we already have site:reddit.com in the query, do nothing
        if(searchBox.value.match(/\bsite:reddit.com\b/)) return;
        // If the search box is empty, just select it
        if(searchBox.value.replaceAll(" ", "").length == 0){searchBox.focus(); return;}
        // Otherwise, add site:reddit.com to the query
        searchBox.value += " site:reddit.com";

        // Find and click the search button

        // The main page
        let searchButton = document.querySelector("input[value='Google Search']");
        // Search results page
        if(!searchButton) searchButton = document.querySelector("button[aria-label='Search']");
        searchButton.click();
    }

    // Add the button
    searchBoxWrapper.insertBefore(searchOnReddit, insertBeforeThis);
})();
