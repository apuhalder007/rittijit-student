const { get } = require('mongoose');
const NodeGeocoder = require('node-geocoder');

exports.getGeocode = async (req, res) => {
    const options = {
        provider: 'google',
        httpAdapter: 'https',
        apiKey: "AIzaSyD-NTGDb6l7p4TnaIBSTPBwetZbdPSaD3E",
        formatter: null
    };
    const geocoder = NodeGeocoder(options);
    const { address } = req.body;
    try {
        const response = await geocoder.geocode(address);
        res.status(200).json(response);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}