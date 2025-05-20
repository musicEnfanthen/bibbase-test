document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        console.log(author);
        console.log(author.textContent);
        author.textContent = processAuthorText(author.textContent.trim());
    });
});


function processAuthorText(text) {
    const normalizedText = text.replace(/\s+/g, ' ').trim();

    if (text.endsWith('editor.')) {
        const slice = normalizedText.slice(0, -10);
        console.log('Found editor in text:', escape(normalizedText));
        console.log('Slice:', slice);
        console.log('Slice + (Hg.):', slice + ' (Hg.):');
        return slice + ' (Hg.):';
    } else if (normalizedText.endsWith('editors.')) {
        console.log('Found editor(s) in text:', escape(normalizedText));
        return normalizedText.slice(0, -11) + ' (Hgg.):';
    } else {
        console.log('No editor found in text:', normalizedText);
    }
    return normalizedText + ':';
}
