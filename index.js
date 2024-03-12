const elm = document.querySelector('#content');

async function fetchPosts() {
    try {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await response.json();

        let html = '';
        for(const datum of data) {
            console.log(datum);
            html += `
                 <div class="item">
                     <p>${datum.title}</p>
                   <p>${datum.body}</p>

                    <button class="tampilkan-komentar" data-id="${datum.id}">Tampilkan Komentar</button>
                    <div class="comments" data-id="${datum.id}">
                    </div>
                </div>
            `;
        }
        elm.innerHTML = html;

        document.querySelectorAll('.tampilkan-komentar').forEach((elm) => {
            elm.addEventListener('click', (event) => {
                fetchComments(dataId, document.querySelector(`div.comments[data-id="${event.target.getAttribute('data-id'}"]`))
            })
        })
    } catch (error) {
        console.error(error);
    }
}

fetchPosts();

async function fetchComments(id, whichElement) {
    console.log('dsdsdsd')
    try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`);
        const data = await response.json();

        let html = '';
        for(const datum of data) {
            console.log(datum);
            html += `
                <p><b>${datum.email} :</b> ${datum.body}</p>
            `;
        }
        whichElement.innerHTML = html;
    } catch (error) {
        console.error(error);
    }
}

