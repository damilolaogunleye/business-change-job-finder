let currentResults = [];

async function searchJobs() {

    const selectedRoles =
        [...document.querySelectorAll('.role:checked')]
        .map(role => role.value);

    document.getElementById('resultsCount').innerText =
        '...';

    const searchText =
        selectedRoles.join(' OR ');

    try {

        const response =
            await fetch(
                `https://business-change-job-finder.vercel.app/api/jobs?q=${encodeURIComponent(searchText)}`
            );

        currentResults =
            await response.json();

        buildTable();

        document.getElementById('rolesSelected').innerText =
            selectedRoles.length;

        document.getElementById('resultsCount').innerText =
            currentResults.length;

    }
    catch(error){

        console.error(error);

        alert(
            'Unable to retrieve vacancies.'
        );

    }
}

function buildTable() {

    const tbody =
        document.querySelector('#resultsTable tbody');

    tbody.innerHTML = '';

    currentResults.forEach(job => {

        const company =
            job.company?.display_name ||
            'Unknown';

        const location =
            job.location?.display_name ||
            'Unknown';

        const salary =
            job.salary_max
            ? '£' +
              Math.round(job.salary_max).toLocaleString()
            : 'Not Specified';

        tbody.innerHTML += `
        <tr>
            <td>${job.title}</td>
            <td>${company}</td>
            <td>${location}</td>
            <td>${salary}</td>
            <td>
                <a href="${job.redirect_url}"
                   target="_blank">
                   Apply
                </a>
            </td>
        </tr>
        `;
    });
}

function exportCSV() {

    let csv =
        'Title,Company,Location,Salary,Link\n';

    currentResults.forEach(job => {

        csv +=
        `"${job.title}",
         "${job.company?.display_name}",
         "${job.location?.display_name}",
         "${job.salary_max}",
         "${job.redirect_url}"\n`;

    });

    const blob =
        new Blob([csv],
        {
            type:'text/csv'
        });

    const link =
        document.createElement('a');

    link.href =
        URL.createObjectURL(blob);

    link.download =
        'BusinessChangeVacancies.csv';

    link.click();
}

function openAllSearches() {

    currentResults.forEach(job => {

        window.open(
            job.redirect_url,
            '_blank'
        );

    });
}

window.onload = function() {

    searchJobs();

};
