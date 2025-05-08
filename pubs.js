document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        author.textContent = processAuthorText(author.textContent.trim());
    });
});

function processAuthorText(text) {
    if (text.endsWith(', editor.')) {
        console.log('Found editor in text:', text);
        return text.slice(0, -9) + ' (Hg.):';
    } else if (text.endsWith(', editor(s).')) {
        console.log('Found editor(s) in text:', text);
        return text.slice(0, -12) + ' (Hgg.):';
    } else {
        console.log('No editor found in text:', text);
    }
    return text + ':';
}
