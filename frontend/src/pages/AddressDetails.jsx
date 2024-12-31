import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAddressById } from '../services/addressService';

const AddressDetails = () => {
    const { id } = useParams();
    const [address, setAddress] = useState(null);

    useEffect(() => {
        const fetchAddress = async () => {
            try {
                const { data } = await getAddressById(id);
                setAddress(data);
            } catch (error) {
                console.error('Failed to fetch address:', error);
            }
        };

        fetchAddress();
    }, [id]);

    return (
        <div>
            <h1>Address Details</h1>
            {address ? (
                <div>
                    <p>Street: {address.street}</p>
                    <p>City: {address.city}</p>
                    <p>State: {address.state}</p>
                    <p>Zip: {address.zip}</p>
                    <p>Country: {address.country}</p>
                </div>
            ) : (
                <p>Loading address details...</p>
            )}
        </div>
    );
};

export default AddressDetails;
