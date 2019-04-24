// ==UserScript==
// @name         HN scores highlighter
// @namespace    http://elamperti.com/
// @version      0.1
// @description  Highlights scores with different colors
// @author       Enrico Lamperti
// @match        https://news.ycombinator.com/
// @match        https://news.ycombinator.com/news*
// @updateURL    https://github.com/elamperti/userscripts/raw/master/userscripts/hn-scores-highlighter.user.js
// @downloadURL  https://github.com/elamperti/userscripts/raw/master/userscripts/hn-scores-highlighter.user.js
// @supportURL   https://github.com/elamperti/userscripts/issues
// @grant        none
// @license      MIT
// ==/UserScript==
/* jshint -W097 */
'use strict';

var thresholds = [
    20,
    70,
    200,
    500,
    800
];
var defaultColor = '#CCCCCC';
var colors = [
    '#666666', // 20
    '#BD9910', // 70
    '#EA7C07', // 200
    '#FF0000', // 500
    '#0000FF', // 800
];


function parseScore(elem) {
  return parseInt(elem.innerHTML.split(" ")[0]);
};

function getColorForScore(score) {
  var color = defaultColor;
  for (var i=0; i < thresholds.length; i++) {
    if (score >= thresholds[i]) {
      color = colors[i];
    }
  }
  return color;
}

var items = document.querySelectorAll(".score");
for (var i=0; i < items.length; i++) {
  items[i].style.fontWeight = 'bold';
  items[i].style.color= getColorForScore(parseScore(items[i]));
}