document.addEventListener('DOMContentLoaded', function () {
    const authors = document.querySelectorAll('.bibbase_paper_author');
    authors.forEach(author => {
        // Trim any extra whitespace
        let text = author.textContent.trim();

        // Check if the text ends with "editor."
        if (text.endsWith('editor.')) {
            // Remove the trailing dot
            text = text.slice(0, -1);
        }

        // Update the text and append the colon
        author.textContent = text + ':';
    });
});
