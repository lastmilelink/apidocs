document.addEventListener('DOMContentLoaded', (event) => {
    document.querySelectorAll('code.highlighted').forEach((block) => {
        hljs.highlightBlock(block);
    });
});
