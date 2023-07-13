


let bookContainer = document.querySelector(".cards-flex");
let searchBooks = document.getElementById("search-box");

const getBooks = async (book) => {
    const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${book}`
    );
    const data = await response.json();
    console.log(data);
    return data;
};

const extractThumbnail = ({ imageLinks }) => {
    const DEFAULT_THUMBNAIL = "/assets/logo-light.svg";
    if (!imageLinks || !imageLinks.thumbnail) {
        return DEFAULT_THUMBNAIL;
    }
    return imageLinks.thumbnail.replace("http://", "https://");
};

const drawListBook = async () => {
    console.log(searchBooks.value);
    if (searchBooks.value != "") {
        bookContainer.style.display = "flex";
        bookContainer.innerHTML = `<div class='prompt'><div class="loader"></div></div>`;
        const data = await getBooks(`${searchBooks.value}&maxResults=20`);
        if (data.error) {
            bookContainer.innerHTML = `<div class='prompt'>ツ Limit exceeded! Try after some time</div>`;
        } else if (data.totalItems == 0) {
            bookContainer.innerHTML = `<div class='prompt'>ツ No results, try a different term!</div>`;
        } else if (data.totalItems == undefined) {
            bookContainer.innerHTML = `<div class='prompt'>ツ Network problem!</div>`;
        } else {
            bookContainer.innerHTML = data.items
                .map(
                    ({ volumeInfo }) =>
                        `<div class="card-items books">
                    <img
                        src="` +
                        extractThumbnail(volumeInfo) +
                        `"
                        alt="book.png"
                        class="book-img"
                    />
                    <div class="search-description">
                        <h1 class="bookName">${
                            volumeInfo.title.slice(0, 20) + "..."
                        }</h1>
                        <h2 class="author">${volumeInfo.authors}</h2>
                        <div class="container">
                            <div class="genre-name">
                                <span class="description-title"
                                    >Genre:</span
                                >
                                <span class="update" id="title-update"
                                    >Romantic</span
                                >
                            </div>
                            <div class="yop">
                                <span class="description-title"
                                    >Yop:</span
                                >
                                <span class="update" id="yop-update"
                                    >${volumeInfo.publishedDate}</span
                                >
                            </div>
                            <div class="available">
                                <span class="description-title"
                                    >Available Copies:</span
                                >
                                <span class="update" id="copies-update"
                                    >25</span
                                >
                            </div>
                            <div class="origin">
                                <span class="description-title"
                                    >Language:</span
                                >
                                <span class="update" id="origin-update"
                                    >${volumeInfo.language}</span
                                >
                            </div>
                        </div>
                        <button type="submit" class="addToBag">
                            Add to Bag
                        </button>
                    </div>
                </div>
            </div>`
            )
            .join("");
        }
    } else {
        bookContainer.style.display = "none";
    }
};

const updateFilter = ({ innerHTML }, f) => {
    document.getElementById("main").scrollIntoView({
        behavior: "smooth",
    });
    let m;
    switch (f) {
        case "author":
            m = "inauthor:";
            break;
        case "subject":
            m = "subject:";
            break;
    }
    searchBooks.value = m + innerHTML;
    debounce(drawListBook, 1000);
};

const debounce = (fn, time, to = 0) => {
    to ? clearTimeout(to) : (to = setTimeout(drawListBook, time));
};
searchBooks.addEventListener("input", () => debounce(drawListBook, 1000));

// const API_KEY = "AIzaSyA0n3bCT4kqrLJnD8hF2-iacgX70Y3VWNc";

// function searchBooks(query) {
//     const url = `GET https://www.googleapis.com/books/v1/volumes?q=${query}`;
//     const request = new XMLHttpRequest();
//     request.open("GET", url);
//     request.setRequestHeader("Authorization", `Bearer ${API_KEY}`);
//     request.onload = function () {
//         if (request.status === 200) {
//             const data = JSON.parse(request.responseText);
//             console.log(data);
//         } else {
//             console.log("Error: " + request.statusText);
//         }
//     };
//     request.send();
// }

// searchBooks("s");
