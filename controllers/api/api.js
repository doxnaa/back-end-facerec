const handleapi = (req, res) => {
    const CLARIFAI_API_KEY = 'c414274e99094b049bea84e10583e1fe'
    const USER_ID = 'v8hsaalob0w0';
    const APP_ID = 'doxna';
    const apiUrl = 'https://api.clarifai.com/v2/models/general-image-detection/outputs';

    const requestBody = {
        "user_app_id": {
            "user_id": USER_ID,  
            "app_id": APP_ID     
        },
        "inputs": req.body.inputs
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Key ${CLARIFAI_API_KEY}`
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => response.json())
    .then(data => res.json(data))
    .catch(err => res.status(500).json({ error: err }));
};

module.exports = {
    handleapi:handleapi
}