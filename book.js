document.addEventListener('DOMContentLoaded', function() {
    fetchAndDisplayBooks();
});

function fetchAndDisplayBooks() {
    fetch('book.xml')
        .then(response => response.text())
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'text/xml');
            displayBooks(xmlDoc);
        })
        .catch(error => console.error('Error fetching the XML:', error));
}

function displayBooks(xmlDoc) {
    const books = xmlDoc.getElementsByTagName('book');
    const catalogueDiv = document.getElementById('bookCatalogue');
    catalogueDiv.innerHTML = ''; // 清空现有的内容

    Array.from(books).forEach(book => {
        const title = book.getElementsByTagName('title')[0].textContent;
        const author = book.getElementsByTagName('author')[0].textContent;
        const price = book.getElementsByTagName('price')[0].textContent;

        // 创建书籍的HTML结构
        const bookDiv = document.createElement('div');
        bookDiv.className = 'book';
        bookDiv.innerHTML = `
            <h2>${title}</h2>
            <p>Author: ${author}</p>
            <p>Price: $${price}</p>
        `;
        catalogueDiv.appendChild(bookDiv);
    });
}

