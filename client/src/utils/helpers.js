export const getFromLocalStorage = (item) => {
    return JSON.parse(localStorage.getItem(item));
};

export const setLocalStorage = (item, value) => {
    localStorage.setItem(item, JSON.stringify(value));
};
