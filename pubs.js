document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        let text = author.textContent.trim();

        if (text.endsWith('editor.')) {
            text = text.slice(0, -8) + ' (Hg.)';
        }

        author.textContent = text + ':';
    });
});
