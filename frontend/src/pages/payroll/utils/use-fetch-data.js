import { useEffect, useState } from 'react';
import axios from 'axios';

const useFetchData = (url, body) => {
    const [data, setData] = useState({ "rule": {}, "belong": {}, "g_rule": {} });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: response } = await axios.get(url, body);
                console.log({ response })
                setData(response);
            } catch (error) {
                console.error(error)
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return {
        data,
        loading,
    };
};

export default useFetchData;