import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const [locationDetails, setLocationDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [formData, setFormData] = useState({
        street: '',
        city: '',
        state: '',
        zip: '',
        country: '',
        lat: '',
        lng: '',
    });

    const navigate = useNavigate();

    const handleEnableLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                async (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;

                    try {
                        setLoading(true);
                        const response = await fetch(`http://localhost:3000/api/location/geo?lat=${lat}&lng=${lng}`);
                        const data = await response.json();

                        if (data.success) {
                            const formattedData = {
                                street: data.data.address?.road || 'N/A',
                                city: data.data.address?.city || data.data.address?.town || data.data.address?.village || 'N/A',
                                state: data.data.address?.state || 'N/A',
                                zip: data.data.address?.postcode || 'N/A',
                                country: data.data.address?.country || 'N/A',
                                lat: parseFloat(data.data.lat) || lat,
                                lng: parseFloat(data.data.lon) || lng,
                            };

                            setLocationDetails(formattedData);
                            setFormData(formattedData);
                        } else {
                            setError('Failed to fetch location details.');
                        }
                    } catch (err) {
                        setError('Error fetching location details.');
                    } finally {
                        setLoading(false);
                    }
                },
                () => {
                    setError('Failed to get your current location. Please enable location services.');
                }
            );
        } else {
            setError('Geolocation is not supported by your browser.');
        }
    };

    const handleSearchLocation = () => {
        alert('Navigate to the search location page.');
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSaveAddress = async () => {
        try {
            setLoading(true);
            setError('');
            setSuccessMessage('');

            const response = await fetch('http://localhost:3000/api/address/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (data.success) {
                setSuccessMessage('Address added successfully.');
                setFormData({
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    country: '',
                    lat: '',
                    lng: '',
                });
            } else {
                setError('Failed to save address.');
            }
        } catch (err) {
            setError('Error saving address.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <h1>Location Management App</h1>
            <p>Navigate to different pages to explore user details, addresses, and locations.</p>
            <button onClick={handleEnableLocation}>Enable Location in Web</button>
            <button onClick={handleSearchLocation}>Search Your Location Manually</button>
            {loading && <p>Loading...</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            {locationDetails && (
                <div>
                    <p><strong>Street:</strong> {locationDetails.street}</p>
                    <p><strong>City:</strong> {locationDetails.city}</p>
                    <p><strong>State:</strong> {locationDetails.state}</p>
                    <p><strong>Zip:</strong> {locationDetails.zip}</p>
                    <p><strong>Country:</strong> {locationDetails.country}</p>
                    <p><strong>Latitude:</strong> {locationDetails.lat}</p>
                    <p><strong>Longitude:</strong> {locationDetails.lng}</p>
                </div>
            )}
            <hr />
            <h2>Manually Add Address</h2>
            <form>
                <label>
                    Street:
                    <input
                        type="text"
                        name="street"
                        value={formData.street}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    City:
                    <input
                        type="text"
                        name="city"
                        value={formData.city}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    State:
                    <input
                        type="text"
                        name="state"
                        value={formData.state}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Zip:
                    <input
                        type="text"
                        name="zip"
                        value={formData.zip}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Country:
                    <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Latitude:
                    <input
                        type="text"
                        name="lat"
                        value={formData.lat}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <label>
                    Longitude:
                    <input
                        type="text"
                        name="lng"
                        value={formData.lng}
                        onChange={handleInputChange}
                    />
                </label>
                <br />
                <button type="button" onClick={handleSaveAddress}>
                    Save Address
                </button>
            </form>
        </div>
    );
};

export default Home;
