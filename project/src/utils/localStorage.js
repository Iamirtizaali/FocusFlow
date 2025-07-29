function getFromLocalStorage(key) {
  try {
    const data = localStorage.getItem(key);
    // Check if data exists and is not "undefined" string
    if (data && data !== "undefined" && data !== "null") {
      return JSON.parse(data);
    }
    return null;
  } catch (error) {
    console.error(`Error reading from localStorage for key "${key}":`, error);
    return null;
  }
}

function setInLocalStorage(key, value) {
  try {
    // Only store non-undefined values
    if (value !== undefined) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  } catch (error) {
    console.error(`Error writing to localStorage for key "${key}":`, error);
  }
}

function removeFromLocalStorage(key) {
  localStorage.removeItem(key);
}

export { getFromLocalStorage, setInLocalStorage, removeFromLocalStorage };