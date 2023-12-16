import axios from 'axios';

const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    }
});

// GET method wrapper
const get = async (path, params = {}) => {
    try {
        const response = await api.get(path, { params });
        return response.data;
    } catch (error) {
        // Handle or throw the error as needed
        throw error;
    }
};

// POST method wrapper
const post = async (path, data, options = {}) => {
    try {
        const response = await api.post(path, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// PUT method wrapper
const put = async (path, data, options = {}) => {
    try {
        const response = await api.put(path, data, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// DELETE method wrapper
const del = async (path, options = {}) => {
    try {
        const response = await api.delete(path, options);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Export all methods
export default {
    get,
    post,
    put,
    del,
};
