const API_BASE_URL = "https://localhost:7190/api/";

const ENDPOINTS = {
    GET_BOOK: "Book/",
    GET_BOOK_IMAGE: "Image/Book/"
};


const development = {
    API_URL_GET_BOOK: `${API_BASE_URL}${ENDPOINTS.GET_BOOK}`,
    API_URL_GET_BOOK_IMAGE: `${API_BASE_URL}${ENDPOINTS.GET_BOOK_IMAGE}`
};

const API = development;
export default API;