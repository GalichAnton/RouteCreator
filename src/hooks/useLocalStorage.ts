const useLocalStorage = () => {
  const getFromLocalStorage = (name: string) => {
    const data = localStorage.getItem(name);
    if (data) return JSON.parse(data);
    alert("Сохраненных маршрутов еще нет");
  };

  const setToLocalStorage = (name: string, items: any) => {
    const stringifyItems = JSON.stringify(items);
    localStorage.setItem(name, stringifyItems);
  };

  return { getFromLocalStorage, setToLocalStorage };
};

export default useLocalStorage;
