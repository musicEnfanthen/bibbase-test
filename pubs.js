document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        author.textContent = processAuthorText(author.textContent);

        const nonSpannedContentElement = author.closest('.bibbase_paper_titleauthoryear');
        const nonSpannedContent = getNonSpannedContent(nonSpannedContentElement);
        console.log('Non-spanned content:', nonSpannedContent);
        replaceNonSpannedContent(nonSpannedContentElement, nonSpannedContent);
    });

    const titles = document.querySelectorAll('.bibbase_paper_title');
    titles.forEach(title => {
        title.textContent = processTitleText(title.textContent.trim());
    });
});

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

    const normalizedContent = normalizeText(content);
    return processNonSpannedText(normalizedContent);
}


function normalizeText(text) {
    // Normalize the text by replacing multiple spaces with a single space
    return text.replace(/\s+/g, ' ').trim();
}

function processAuthorText(text) {
    const normalizedText = normalizeText(text);

    if (text.endsWith('editor.')) {
        const slice = normalizedText.slice(0, -9);
        return slice + ' (Hg.):';
    } else if (normalizedText.endsWith('editors.')) {
        return normalizedText.slice(0, -10) + ' (Hg.):';
    } else {
        return normalizedText + ':';
    }
    
}

function processNonSpannedText(text) {
    // Replace "In" at the start of the text with "in"
    text = text.replace(/^In \b/, 'in: ');
    // Replace ", editor(s)," with " (Hg.),"
    text = text.replace(/, editor(s),/g, ' (Hg.),');
    // Replace ", pages" with ", S."
    text = text.replace(/, pages/g, ', S.');
    console.log('processedText', text);
    return text;
}

function processTitleText(text) {
    if (text.endsWith('“.')) {
        console.log('Found dep title in text:', text);
        return text.slice(0, -1) + ',';
    }
    return text;
}


function replaceNonSpannedContent(element, updatedContent) {
    let sibling = element.nextSibling;

    // Iterate through all siblings until the `.note` span is reached
    while (sibling && !(sibling.classList && sibling.classList.contains('note'))) {
        const nextSibling = sibling.nextSibling; // Save reference to the next sibling
        sibling.remove(); // Remove the current sibling
        sibling = nextSibling; // Move to the next sibling
    }

    // Insert the updated content as a new text node
    const textNode = document.createTextNode(updatedContent);
    element.parentNode.insertBefore(textNode, sibling);
}
