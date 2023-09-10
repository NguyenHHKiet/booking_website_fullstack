import { useState, useCallback } from "react";

const useHTTP = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(null);

    // fetch API method
    const sendRequest = useCallback(async (requestConfig, applyData) => {
        const controller = new AbortController();
        const signal = controller.signal;

        // Cancel the fetch request in 20s
        setTimeout(() => controller.abort(), 20000);
        setIsLoading(true);
        setIsError(null);

        try {
            const response = await fetch(requestConfig.url, {
                method: requestConfig.method || "GET",
                headers: requestConfig.headers || {},
                body: requestConfig.body
                    ? JSON.stringify(requestConfig.body)
                    : null,
                signal,
            });

            if (!response.ok) {
                throw new Error("Invalid response");
            }

            const data = await response.json();
            // create new data object
            applyData({ ...data });
        } catch (error) {
            if (error instanceof SyntaxError) {
                // Unexpected token < in JSON
                console.log("There was a SyntaxError", error);
            } else {
                console.log("There was an error", error);
            }
            setIsError(error.message || "Something went wrong!!");
        }
        setIsLoading(false);
    }, []);

    return { isLoading, isError, sendRequest };
};

export default useHTTP;
