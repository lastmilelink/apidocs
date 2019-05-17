//= require ./all_nosearch
//= require ./app/_search

document.addEventListener('DOMContentLoaded', (event) => {
  document.querySelectorAll('code.highlighted').forEach((block) => {
    console.log("what is this block", block)
    hljs.highlightBlock(block);
  });
});