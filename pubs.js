document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        author.textContent = processAuthorText(author.textContent);

        const nonSpannedContent = getNonSpannedContent(author.closest('.bibbase_paper_titleauthoryear'));
        console.log('Non-spanned content:', nonSpannedContent);
    });

    const titles = document.querySelectorAll('.bibbase_paper_title');
    titles.forEach(title => {
        title.textContent = processTitleText(title.textContent.trim());
    });
});


function processAuthorText(text) {
    const normalizedText = normalizeText(text);

    if (text.endsWith('editor.')) {
        const slice = normalizedText.slice(0, -9);
        return slice + ' (Hg.):';
    } else if (normalizedText.endsWith('editors.')) {
        return normalizedText.slice(0, -10) + ' (Hgg.):';
    } else {
        return normalizedText + ':';
    }
    
}

function processTitleText(text) {
    if (text.endsWith('“.')) {
        console.log('Found dep title in text:', text);
        return text.slice(0, -1) + ',';
    }
    return text;
}

function getNonSpannedContent(element) {
    let content = '';
    let sibling = element.nextSibling;

    // Iterate through all siblings until the `.note` span is reached
    while (sibling && !(sibling.classList && sibling.classList.contains('note'))) {
        if (sibling.nodeType === Node.TEXT_NODE && sibling.textContent.trim() !== '') {
            content += sibling.textContent.trim();
        } else if (sibling.nodeType === Node.ELEMENT_NODE) {
            content += ' ' + sibling.outerHTML.trim();
        }
        sibling = sibling.nextSibling;
    }

    return normalizeText(content);
}

function normalizeText(text) {
    // Normalize the text by replacing multiple spaces with a single space
    return text.replace(/\s+/g, ' ').trim();
}
