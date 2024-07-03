const navbar = document.getElementById("nav");
const brandName = document.getElementById("brand");
const searchKey = document.getElementById("searchKey");
const searchBtn = document.getElementById("searchBtn");
const searchQuery = document.getElementById("searchQuery");
const column1 = document.getElementById("col-1");
const column2 = document.getElementById("col-2");
const column3 = document.getElementById("col-3");
const errorGrid = document.getElementById("errorGrid");
const modalBody = document.getElementById("modalBody");
const imageViewLink = document.getElementById("imageViewLink");
const showMoreBtn = document.getElementById("showMoreBtn");

var orderByValue = "";
var page = 1;
var searchTerm = "";

const API_KEY = "ofy4o3jxtwB8puBpDx3m_OgY19vOumxWPOc65VsZ_8I";
const apiUrl =
  "https://api.unsplash.com/photos/?client_id=" + API_KEY + "&per_page=10";
const searchUrl =
  "https://api.unsplash.com/search/photos/?client_id=" + API_KEY + "&query=";

var imageURLS = [];

window.onload = (event) => {
  fetchData();
};

const fetchData = async () => {
  var tempUrl = apiUrl + "&page=" + page;

  if (orderByValue != "") {
    tempUrl += "&order_by=" + orderByValue;
  }

  const response = await fetch(tempUrl).catch(handleError);
  const myJson = await response.json();

  var imageArrays = myJson;

  imageArrays.forEach((element) => {
    imageURLS.push(element.urls.small);
  });

  displayImage();
  page++;
};

const fetchSearchData = async () => {
  var tempUrl = searchUrl + searchTerm + "&page=" + page;

  if (orderByValue != "") {
    tempUrl += "&order_by=" + orderByValue;
  }

  const response = await fetch(tempUrl).catch(handleError);
  const myJson = await response.json();

  var imageArrays = myJson.results;

  imageArrays.forEach((element) => {
    imageURLS.push(element.urls.small);
  });

  displayImage();
  page++;
};

var handleError = function (err) {
  console.warn(err);
  errorGrid.innerHTML = "<h4>Unable to fetch data " + err + "</h5>";
};

function displayImage() {
  errorGrid.innerHTML = "";
  if (imageURLS.length == 0) {
    errorGrid.innerHTML = "<h4>Unable to fetch data.</h5>";
    return;
  }

  column1.innerHTML = "";
  column2.innerHTML = "";
  column3.innerHTML = "";

  imageURLS.forEach((url, index) => {
    var image = document.createElement("img");
    image.src = url;
    image.className = "pt-4";
    image.setAttribute("width", "100%");
    image.setAttribute("onclick", "displayFullImage(this.src)");

    if ((index + 1) % 3 == 0) {
      column1.appendChild(image);
    }
    if ((index + 2) % 3 == 0) {
      column2.appendChild(image);
    }
    if ((index + 3) % 3 == 0) {
      column3.appendChild(image);
    }
  });
}

function displayFullImage(src) {
  var image = document.createElement("img");
  image.src = src;
  image.className = "mt-3";
  image.setAttribute("width", "100%");

  modalBody.innerHTML = "";
  modalBody.appendChild(image);

  imageViewLink.href = src;

  var myModal = new bootstrap.Modal(document.getElementById("modal"), {});
  myModal.show();
}

searchBtn.addEventListener("click", function () {
  if (searchKey.value != "") {
    searchTerm = searchKey.value;
    imageURLS = [];
    page = 1;
    if (searchTerm.toLowerCase() === "arzoo") {
      displayLocalImages();
    } else {
      fetchSearchData();
    }
  }
});

function displayLocalImages() {
  const localImages = [
    "pic1.jpg",
    "pic2.jpg",
    "pic3.jpg",
    "pic4.jpg",
    "pic5.jpg",
    "pic6.jpeg",
  ];

  showMoreBtn.style.display = "none";

  column1.innerHTML = "";
  column2.innerHTML = "";
  column3.innerHTML = "";

  localImages.forEach((url, index) => {
    var image = document.createElement("img");
    image.src = url;
    image.className = "pt-4";
    image.setAttribute("width", "100%");
    image.setAttribute("onclick", "displayFullImage(this.src)");

    if ((index + 1) % 3 == 0) {
      column1.appendChild(image);
    }
    if ((index + 2) % 3 == 0) {
      column2.appendChild(image);
    }
    if ((index + 3) % 3 == 0) {
      column3.appendChild(image);
    }
  });
}

function orderBy() {
  orderByValue = document.getElementById("orderby").value;
  imageURLS = [];
  page = 1;

  if (searchKey.value != "") {
    if (searchTerm.toLowerCase() === "arzoo") {
      displayLocalImages();
    } else {
      fetchSearchData();
    }
  } else {
    fetchData();
  }
}

showMoreBtn.addEventListener("click", function () {
  if (searchTerm !== "" && searchTerm.toLowerCase() !== "arzoo") {
    fetchSearchData();
  } else {
    fetchData();
  }
});
