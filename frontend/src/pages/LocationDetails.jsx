import React, { useEffect, useState } from 'react';
import { getLocations, getAddressById } from '../services/locationService';

const LocationDetails = () => {
    const [locations, setLocations] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchLocations = async () => {
            setLoading(true);
            try {
                const { data } = await getLocations();
                if (data.success) {
                    const enrichedLocations = await Promise.all(
                        data.data.map(async (location) => {
                            try {
                                const addressResponse = await getAddressById(location.location);
                                return {
                                    ...location,
                                    address: addressResponse?.data?.address || 'Address not found',
                                };
                            } catch {
                                return { ...location, address: 'Failed to fetch address' };
                            }
                        })
                    );
                    setLocations(enrichedLocations);
                } else {
                    setError('Failed to fetch locations.');
                }
            } catch (err) {
                setError('Error fetching locations.');
            } finally {
                setLoading(false);
            }
        };

        fetchLocations();
    }, []);

    return (
        <div>
            <h1>Location Details</h1>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {locations.length > 0 ? (
                locations.map((location) => (
                    <div key={location._id} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '10px' }}>
                        <p><strong>User ID:</strong> {location.userId}</p>
                        <p><strong>Location ID:</strong> {location.location}</p>
                        <p><strong>Address:</strong> {location.address}</p>
                    </div>
                ))
            ) : (
                !loading && <p>No locations found.</p>
            )}
        </div>
    );
};

export default LocationDetails;
