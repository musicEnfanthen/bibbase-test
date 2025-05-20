document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        console.log(author);
        console.log(author.textContent);
        author.textContent = processAuthorText(author.textContent);
    });

    const titles = document.querySelectorAll('.bibbase_paper_title');
    titles.forEach(title => {
        title.textContent = processTitleText(title.textContent.trim());
    });
});


function processAuthorText(text) {
    const normalizedText = text.replace(/\s+/g, ' ').trim();

    if (text.endsWith('editor.')) {
        const slice = normalizedText.slice(0, -9);
        console.log('Found editor in text:', escape(normalizedText));
        console.log('Slice:', slice);
        console.log('Slice + (Hg.):', slice + ' (Hg.):');
        return slice + ' (Hg.):';
    } else if (normalizedText.endsWith('editors.')) {
        console.log('Found editor(s) in text:', escape(normalizedText));
        return normalizedText.slice(0, -10) + ' (Hgg.):';
    } else {
        console.log('No editor found in text:', normalizedText);
    }
    return normalizedText + ':';
}

function processTitleText(text) {
    if (text.endsWith('“.')) {
        console.log('Found dep title in text:', escape(normalizedText));
        return text.slice(0, -1) + ',';
    }
    return text;
}
