import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cors());


app.get('/webflow-api', async (req, res) => {
    try {
        const response = await fetch('https://api.webflow.com/v2/collections/665bd736fe353cccc2c89489/items', {
            headers: {
                Authorization: 'Bearer 6e319b150e1ae1a1064c19c4cdf28c4723633f7f73ae5eca31ce177d79d12945',
                'Content-Type': 'application/json',
            },
        });

        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error('Error fetching data from Webflow API:', error);
        res.status(500).json({ error: 'Error fetching data from Webflow API' });
    }
});
// Route to fetch data from Webflow API
// app.get('/webflow-data', async (req, res) => {
//     const url = 'https://api.webflow.com/v2/collections/665bd736fe353cccc2c89489/items';
//     const options = {
//         method: 'GET',
//         headers: {
//             accept: 'application/json',
//             authorization: 'Bearer 6e319b150e1ae1a1064c19c4cdf28c4723633f7f73ae5eca31ce177d79d12945'
//         }
//     };

//     try {
//         const response = await fetch(url, options);
//         const json = await response.json();
//         res.json(json); // Send the JSON response received from Webflow API
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         res.status(500).json({ error: 'Failed to fetch data from Webflow API' });
//     }
// });

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});
