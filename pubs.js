document.addEventListener('DOMContentLoaded', function () {
    const papers = document.querySelectorAll('.bibbase_paper');
    papers.forEach(paper => {
        console.log(paper.textContent)
        paper.textContent = processPaperText(paper.textContent.trim());
    });
});

function processPaperText(text) {
    if (text.includes(', editor.')) {
        console.log('Found editor in text:', text);
        return text.replace(', editor.', ' (Hg.)');
    } else if (text.includes(', editor(s).')) {
        console.log('Found editor(s) in text:', text);
        return text.replace(', editor(s).', ' (Hgg.)');
    } else {
        console.log('No editor found in text:', text);
    }
    return text + ':';
}
