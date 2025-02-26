export const getFromLocalStorage = (item) => {
    return localStorage.getItem(item);
};

export const setLocalStorage = (item, value) => {
    localStorage.setItem(item, value);
};
