import axios from 'axios';

const API_URL = 'http://localhost:4000/api/categories';

export const fetchCategories = () => axios.get(API_URL);