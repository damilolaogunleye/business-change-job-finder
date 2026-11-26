async function searchJobs() {

    document.getElementById('resultsCount').innerText =
        'Loading...';

    try {

        const response =
            await fetch(
                'https://business-change-job-finder.vercel.app/api/jobs'
            );

        const data =
            await response.json();

        console.log(
            'API Data:',
            data
        );

        currentResults =
            data.results || [];

        buildTable();

        document.getElementById('rolesSelected').innerText =
            document.querySelectorAll('.role:checked').length;

        document.getElementById('resultsCount').innerText =
            currentResults.length;

    }
    catch(error){

        console.error(error);

        document.getElementById('resultsCount').innerText =
            '0';

    }

}
