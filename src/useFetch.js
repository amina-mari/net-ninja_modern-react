import { useState, useEffect } from 'react';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [isPending, setIsPending] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const abortCont = new AbortController();

        setTimeout(() => {
            fetch(url, { signal: abortCont.signal })
                .then(res => {
                    if (!res.ok) {
                        throw Error('Could not fetch the data for that resource'); // throwing error to be catched by catch below
                    }
                    return res.json()
                })
                .then(data => {
                    setData(data)
                    setIsPending(false)
                    setError(null);
                })
                .catch((e) => {
                    if (e.name === 'AbortError') console.log('fetch aborted')
                    else {
                        setError(e.message);
                        setIsPending(false);
                    }
                })
        }, 1000)

        return () => abortCont.abort();
    }, [url])

    return { data, isPending, error }
}

export default useFetch;