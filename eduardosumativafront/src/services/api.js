import axios from 'axios';

const api = axios.create({
    baseURL: 'https://dummyjson.com',
    headers: {
        'Content-Type': 'application/json',
    },
});


export const loginUser = async (username, password) => {
    const { data } = await api.post('/auth/login', {
        username,
        password,
        expiresInMins: 30,
    });
    return data;
};

export const getCurrentUser = async (token) => {
    const { data } = await api.get('/auth/me', {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};

export const getProducts = async (token, limit = 10, skip = 0) => {
    const { data } = await api.get('/products', {
        params: { limit, skip },
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const addProduct = async (token, productData) => {
    const { data } = await api.post('/products/add', productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const updateProduct = async (token, id, productData) => {
    const { data } = await api.put(`/products/${id}`, productData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const patchProduct = async (token, id, partialData) => {
    const { data } = await api.patch(`/products/${id}`, partialData, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};


export const deleteProduct = async (token, id) => {
    const { data } = await api.delete(`/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return data;
};
