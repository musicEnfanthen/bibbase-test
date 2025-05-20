document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        console.log(author);
        console.log(author.textContent);
        author.textContent = processAuthorText(author.textContent.trim());
    });
});

function processAuthorText(text) {
    if (text.endsWith('editor.')) {
        console.log('Found editor in text:', escape(text));
        console.log(text.slice(0, -10));
        return text.slice(0, -10) + ' (Hg.):';
    } else if (text.endsWith('editor(s).')) {
        console.log('Found editor(s) in text:', escape(text));
        return text.slice(0, -13) + ' (Hgg.):';
    } else {
        console.log('No editor found in text:', text);
    }
    return text + ':';
}
