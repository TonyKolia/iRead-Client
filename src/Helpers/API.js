const API_BASE_URL = "https://localhost:7190/api/";

const ENDPOINTS = {
    GET_BOOK: "Book/",
    GET_MULTIPLE_BOOKS: "Book/Multiple/",
    GET_BOOK_IMAGE: "Image/Book/",
    GET_CRITERIA: "Criteria",
    LOGIN: "Account/Login",
    ORDER: "Order",
    GET_GENDERS: "Gender",
    GET_ID_TYPES: "Identification",
    REGISTER: "Account/Register",
    GET_USER_ORDERS: "Order/User/",
    GET_USER_FAVORITES: "Favorite/User/",
    ADD_NEW_FAVORITE: "Favorite",
    DELETE_FAVORITE: "Favorite/User/:userId/Book/:bookId",
    GET_FAVORITE_EXISTS: "Favorite/User/:userId/Book/:bookId",
};


const development = {
    API_URL_GET_BOOK: `${API_BASE_URL}${ENDPOINTS.GET_BOOK}`,
    API_URL_GET_MULTIPLE_BOOKS: `${API_BASE_URL}${ENDPOINTS.GET_MULTIPLE_BOOKS}`,
    API_URL_GET_BOOK_IMAGE: `${API_BASE_URL}${ENDPOINTS.GET_BOOK_IMAGE}`,
    API_URL_GET_CRITERIA: `${API_BASE_URL}${ENDPOINTS.GET_CRITERIA}`,
    API_URL_LOGIN: `${API_BASE_URL}${ENDPOINTS.LOGIN}`,
    API_URL_ORDER: `${API_BASE_URL}${ENDPOINTS.ORDER}`,
    API_URL_GET_GENDERS: `${API_BASE_URL}${ENDPOINTS.GET_GENDERS}`,
    API_URL_GET_ID_TYPES: `${API_BASE_URL}${ENDPOINTS.GET_ID_TYPES}`,
    API_URL_REGISTER: `${API_BASE_URL}${ENDPOINTS.REGISTER}`,
    API_URL_GET_USER_ORDERS: `${API_BASE_URL}${ENDPOINTS.GET_USER_ORDERS}`,
    API_URL_GET_USER_FAVORITES: `${API_BASE_URL}${ENDPOINTS.GET_USER_FAVORITES}`,
    API_URL_ADD_NEW_FAVORITE: `${API_BASE_URL}${ENDPOINTS.ADD_NEW_FAVORITE}`,
    API_URL_DELETE_FAVORITE: `${API_BASE_URL}${ENDPOINTS.DELETE_FAVORITE}`,
    API_URL_GET_FAVORITE_EXISTS: `${API_BASE_URL}${ENDPOINTS.GET_FAVORITE_EXISTS}`
};

const API = development;
export default API;