let currentResults = [];

function searchJobs() {

    const selectedRoles =
        [...document.querySelectorAll('.role:checked')]
        .map(role => role.value);

    const location =
        document.getElementById('location').value;

    currentResults = [

        {
            source: 'LinkedIn',
            roles: selectedRoles.length,
            url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(selectedRoles.join(' OR '))}&location=${encodeURIComponent(location)}`
        },

        {
            source: 'Reed',
            roles: selectedRoles.length,
            url: `https://www.reed.co.uk/jobs/business-change-manager-jobs`
        },

        {
            source: 'CV-Library',
            roles: selectedRoles.length,
            url: `https://www.cv-library.co.uk/search-jobs?keywords=${encodeURIComponent(selectedRoles.join(' OR '))}`
        },

        {
            source: 'Indeed',
            roles: selectedRoles.length,
            url: `https://uk.indeed.com/jobs?q=${encodeURIComponent(selectedRoles.join(' OR '))}`
        },

        {
            source: 'TotalJobs',
            roles: selectedRoles.length,
            url: `https://www.totaljobs.com/jobs/business-change-manager`
        }

    ];

    buildTable();

    document.getElementById('rolesSelected').innerText =
        selectedRoles.length;

    document.getElementById('resultsCount').innerText =
        currentResults.length;
}

function buildTable() {

    const tbody =
        document.querySelector('#resultsTable tbody');

    tbody.innerHTML = '';

    currentResults.forEach(item => {

        tbody.innerHTML += `
        <tr>
            <td>${item.source}</td>
            <td>${item.roles} Roles Selected</td>
            <td>
                <a href="${item.url}" target="_blank">
                    Open Search
                </a>
            </td>
        </tr>
        `;
    });
}

function exportCSV() {

    let csv =
        'Job Board,Roles Selected,URL\n';

    currentResults.forEach(item => {

        csv +=
            `${item.source},${item.roles},${item.url}\n`;

    });

    const blob =
        new Blob([csv], {
            type: 'text/csv'
        });

    const link =
        document.createElement('a');

    link.href =
        URL.createObjectURL(blob);

    link.download =
        'BusinessChangeJobs.csv';

    link.click();
}

function openAllSearches() {

    searchJobs();

    currentResults.forEach(item => {

        window.open(
            item.url,
            '_blank'
        );

    });
}

window.onload = function() {

    searchJobs();

};
