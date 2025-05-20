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
    const normalizedText = text.replace(/\s+/g, ' ').trim();

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
    // Access the next sibling node (text content after the given element)
    const textNode = element.nextSibling;
    console.log('Next sibling node:', textNode);

    // Check if the sibling is a text node and not empty
    if (textNode && textNode.nodeType === Node.TEXT_NODE && textNode.textContent.trim() !== '') {
        return textNode.textContent.trim();
    }
    return ''; // Return an empty string if no valid text node is found
}
