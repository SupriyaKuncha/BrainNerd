let bookContainer = document.querySelector(".list-book");
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

// This function populates the search
const drawListBook = async () => {
  console.log(searchBooks.value);
  if (searchBooks.value != "") {
    bookContainer.style.display = "flex";
    bookContainer.style.justifyContent = "center";
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
            `<div class="search-card-items books">
                    <img
                        src="` +
            extractThumbnail(volumeInfo) +
            `"
                        alt="book.png"
                        class="search-book-img"
                    />
                    <div class="search-card-description">
                        <h1 class="search-bookName">${
                          volumeInfo.title.slice(0, 20) + "..."
                        }</h1>
                        <h2 class="search-author">${volumeInfo.authors}</h2>
                        <div class="search-container">
                            <div class="genre-name">
                                <span class="search-description-title"
                                    >Genre:</span
                                >
                                <span class="search-update" id="title-update"
                                    >Romantic</span
                                >
                            </div>
                            <div class="yop">
                                <span class="search-description-title"
                                    >Yop:</span
                                >
                                <span class="search-update" id="yop-update"
                                    >${volumeInfo.publishedDate}</span
                                >
                            </div>
                            <div class="available">
                                <span class="search-description-title"
                                    >Available Copies:</span
                                >
                                <span class="search-update" id="copies-update"
                                    >25</span
                                >
                            </div>
                            <div class="origin">
                                <span class="search-description-title"
                                    >Language:</span
                                >
                                <span class="search-update" id="origin-update"
                                    >${volumeInfo.language}</span
                                >
                            </div>
                        </div>
                        <button type="submit" class="search-addToBag">
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

// This function populates the page with the cards
let pageGrid = document.querySelector(".cards-flex");

const pageListBook = async () => {
  console.log(searchBooks.value);
  pageGrid.innerHTML = `<div class='prompt'><di v class="loader"></div></div>`;
  const data = await getBooks(`motivation&maxResults=38`);
  if (data.error) {
    pageGrid.innerHTML = `<div class='prompt'>ツ Limit exceeded! Try after some time</div>`;
  } else if (data.totalItems == 0) {
    pageGrid.innerHTML = `<div class='prompt'>ツ No results, try a different term!</div>`;
  } else if (data.totalItems == undefined) {
    pageGrid.innerHTML = `<div class='prompt'>ツ Network problem!</div>`;
  } else {
    pageGrid.innerHTML = data.items
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
                    <div class="description">
                        <h1 class="bookName">
                            ${volumeInfo.title.slice(0, 40) + "..."}
                        </h1>
                        <h2 class="author">${volumeInfo.authors}</h2>
                        <div class="container">
                            <div class="genre-name">
                                <span class="description-title">Genre:</span>
                                <span class="update" id="title-update"
                                    >Romantic</span
                                >
                            </div>
                            <div class="yop">
                                <span class="description-title">Yop:</span>
                                <span class="update" id="yop-update"
                                    >${volumeInfo.publishedDate}</span
                                >
                            </div>
                            <div class="available">
                                <span class="description-title"
                                    >Available Copies:</span
                                >
                                <span class="update" id="copies-update"
                                    >${Math.floor(Math.random() * 21)}</span
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
                </div>`
      )
      .join("");
  }
};

const pageupdateFilter = ({ innerHTML }, f) => {
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
  pageDebounce(pageListBook, 1000);
};

const pageDebounce = (fn, time, to = 0) => {
  to ? clearTimeout(to) : (to = setTimeout(pageListBook, time));
};
pageDebounce(pageListBook, 1000);

const searchDiv = document.querySelector("input");
const listBook = document.querySelector(".list-book");

searchDiv.addEventListener("click", () => {
  if (searchBooks.value != "") {
    listBook.style.display = "block";
  }
});

document.addEventListener("click", function (event) {
  if (!searchDiv.contains(event.target)) {
    //hide things classes.. yourContainer.classList.add('hidden');
    listBook.style.display = "none";
  }
});
