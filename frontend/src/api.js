import axios from 'axios';

const API_URL = 'http://localhost:4000/api/';

export const fetchCategories = () => axios.get(API_URL + 'categories');
export const createCategory = (data) => axios.post(API_URL + 'categories', data);

export const fetchCategoriesChildrens = (data) => axios.get(API_URL + 'categories/childrens', data);
