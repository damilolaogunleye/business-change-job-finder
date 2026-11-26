let currentResults = [];

async function searchJobs() {

    document.getElementById('resultsCount').innerText =
        'Loading...';

    try {

        const response =
            await fetch(
                'https://business-change-job-finder.vercel.app/api/jobs'
            );

        console.log(
            'Response status:',
            response.status
        );

        const data =
            await response.json();

        console.log(
            'API Data:',
            data
        );

        currentResults = data;

        buildTable();

        document.getElementById('rolesSelected').innerText =
            document.querySelectorAll('.role:checked').length;

        document.getElementById('resultsCount').innerText =
            currentResults.length;

    }
    catch(error){

        console.error(
            'Search Error:',
            error
        );

        document.getElementById('resultsCount').innerText =
            '0';

        alert(
            'Unable to retrieve vacancies.'
        );

    }

}

function buildTable() {

    const tbody =
        document.querySelector('#resultsTable tbody');

    if (!tbody) {

        console.error(
            'Table body not found.'
        );

        return;
    }

    tbody.innerHTML = '';

    if (!Array.isArray(currentResults)) {

        console.error(
            'currentResults is not an array',
            currentResults
        );

        return;
    }

    currentResults.forEach(job => {

        const title =
            job.title || 'No title';

        const employer =
            job.company?.display_name ||
            'Unknown';

        const location =
            job.location?.display_name ||
            'Unknown';

        const salary =
            job.salary_max
                ? '£' + Number(job.salary_max).toLocaleString()
                : 'Not specified';

        const applyUrl =
            job.redirect_url || '#';

        tbody.innerHTML += `
        <tr>
            <td>${title}</td>
            <td>${employer}</td>
            <td>${location}</td>
            <td>${salary}</td>
            <td>
                <a href="${applyUrl}"
                   target="_blank">
                   Apply
                </a>
            </td>
        </tr>
        `;
    });

}

function exportCSV() {

    if (currentResults.length === 0) {

        alert(
            'No vacancies available to export.'
        );

        return;
    }

    let csv =
        'Job Title,Employer,Location,Salary,Apply URL\n';

    currentResults.forEach(job => {

        csv +=
            `"${job.title || ''}",` +
            `"${job.company?.display_name || ''}",` +
            `"${job.location?.display_name || ''}",` +
            `"${job.salary_max || ''}",` +
            `"${job.redirect_url || ''}"\n`;

    });

    const blob =
        new Blob(
            [csv],
            { type: 'text/csv' }
        );

    const link =
        document.createElement('a');

    link.href =
        URL.createObjectURL(blob);

    link.download =
        'BusinessChangeVacancies.csv';

    link.click();
}

function openAllSearches() {

    if (currentResults.length === 0) {

        alert(
            'No vacancies available.'
        );

        return;
    }

    currentResults.forEach(job => {

        if (job.redirect_url) {

            window.open(
                job.redirect_url,
                '_blank'
            );

        }

    });

}

window.onload = function () {

    searchJobs();

};
