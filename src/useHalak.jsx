import { useState, useEffect } from "react";
import axios from "axios";

export const useHalak = () => {
    const [halak, setHalak] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get("https://halak.onrender.com/api/halak")
            .then((response) => {
                setHalak(response.data);
            })
            .catch((error) => {
                setError(error);
                console.error("Error fetching data:", error);
            });
    }, []);

    return { halak, error };
}