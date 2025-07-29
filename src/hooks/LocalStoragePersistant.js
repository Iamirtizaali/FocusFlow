import { useEffect, useState } from "react";
import { getFromLocalStorage, setInLocalStorage } from "../utils/localStorage";

export function LocalStoragePersistant(key, initialValue) {
    const [value, setValue] = useState(() => {
        const item = getFromLocalStorage(key);
        // Return the parsed item if it exists, otherwise return initialValue
        return item !== null ? item : initialValue;
    });

    useEffect(() => {
        setInLocalStorage(key, value);
    }, [key, value]);

    return [value, setValue];
}