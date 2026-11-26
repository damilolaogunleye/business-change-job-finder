export default async function handler(req, res) {

    // CORS headers
    res.setHeader(
        'Access-Control-Allow-Origin',
        '*'
    );

    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, OPTIONS'
    );

    res.setHeader(
        'Access-Control-Allow-Headers',
        'Content-Type'
    );

    // Handle browser preflight requests
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    try {

        const APP_ID =
            process.env.ADZUNA_APP_ID;

        const APP_KEY =
            process.env.ADZUNA_APP_KEY;

        const searchQuery =
            req.query.q ||
            'Business Change Manager';

        const response =
            await fetch(
                `https://api.adzuna.com/v1/api/jobs/gb/search/1?app_id=${APP_ID}&app_key=${APP_KEY}&what=${encodeURIComponent(searchQuery)}&results_per_page=20`
            );

        const data =
            await response.json();

        return res
            .status(200)
            .json(data.results);

    }
    catch(error){

        return res.status(500).json({
            error: error.message
        });

    }
}
