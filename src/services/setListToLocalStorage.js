export const setListToLocalStorage = (data) => {
  localStorage.setItem('list', JSON.stringify(data));
}