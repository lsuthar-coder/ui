import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCoa } from '../features/coaSlice'; 

export const Clients = () => {
    const dispatch = useDispatch();

    const coaList = useSelector((state) => state.coa.value);

    useEffect(() => {
        fetch('https://localhost:7117/coa')
            .then(response => response.json())
            .then(data => {
                console.log('Fetched data successfully:', data);
                dispatch(getAllCoa(data));
            })
            .catch(error => console.error("Error fetching COA:", error));
    }, [dispatch]);

    return (
        <div>
            <h2>Chart of Accounts</h2>
            <ul>
                {coaList.map((item) => (
                    <li key={item.Id}>
                        <strong>{item.Code}</strong> - {item.Name}
                    </li>
                ))}
            </ul>
        </div>
    );
}


