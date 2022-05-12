const API_BASE_URL = "https://localhost:7190/api/";

const ENDPOINTS = {
    GET_BOOK: "Book/",
    GET_MULTIPLE_BOOKS: "Book/Multiple/",
    GET_BOOK_IMAGE: "Image/Book/",
    GET_CRITERIA: "Criteria"
};


const development = {
    API_URL_GET_BOOK: `${API_BASE_URL}${ENDPOINTS.GET_BOOK}`,
    API_URL_GET_MULTIPLE_BOOKS: `${API_BASE_URL}${ENDPOINTS.GET_MULTIPLE_BOOKS}`,
    API_URL_GET_BOOK_IMAGE: `${API_BASE_URL}${ENDPOINTS.GET_BOOK_IMAGE}`,
    API_URL_GET_CRITERIA: `${API_BASE_URL}${ENDPOINTS.GET_CRITERIA}`
};

const API = development;
export default API;