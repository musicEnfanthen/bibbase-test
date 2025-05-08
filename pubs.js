document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        let text = author.textContent.trim();

        if (text.endsWith(', editor.')) {
            console.log('Found editor string in ', text)
            text = text.slice(0, -9) + ' (Hg.)';
        }

        author.textContent = text + ':';
    });
});
