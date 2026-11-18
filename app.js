let currentResults = [];

function searchJobs() {

    const selectedRoles =
        [...document.querySelectorAll('.role:checked')]
        .map(role => role.value);

    currentResults = [];

    selectedRoles.forEach(role => {

        currentResults.push({
            role: role,
            source: 'LinkedIn',
            url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}`
        });

        currentResults.push({
            role: role,
            source: 'Reed',
            url: `https://www.reed.co.uk/jobs/${role.toLowerCase().replaceAll(' ','-')}-jobs`
        });

        currentResults.push({
            role: role,
            source: 'CV-Library',
            url: `https://www.cv-library.co.uk/search-jobs?keywords=${encodeURIComponent(role)}`
        });

        currentResults.push({
            role: role,
            source: 'Indeed',
            url: `https://uk.indeed.com/jobs?q=${encodeURIComponent(role)}`
        });

        currentResults.push({
            role: role,
            source: 'TotalJobs',
            url: `https://www.totaljobs.com/jobs/${encodeURIComponent(role)}`
        });

    });

    buildTable();

    document.getElementById('resultsCount').innerText =
        currentResults.length;

    document.getElementById('rolesSelected').innerText =
        selectedRoles.length;
}

function buildTable() {

    const tbody =
        document.querySelector('#resultsTable tbody');

    tbody.innerHTML = '';

    currentResults.forEach(item => {

        tbody.innerHTML += `
        <tr>
            <td>${item.role}</td>
            <td>${item.source}</td>
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

    let csv = 'Role,Source,URL\n';

    currentResults.forEach(job => {

        csv +=
            `${job.role},${job.source},${job.url}\n`;

    });

    const blob =
        new Blob([csv], { type: 'text/csv' });

    const link =
        document.createElement('a');

    link.href =
        URL.createObjectURL(blob);

    link.download =
        'BusinessChangeJobs.csv';

    link.click();
}

function openAllSearches() {

    const selectedRoles =
        [...document.querySelectorAll('.role:checked')]
        .map(role => role.value);

    if (selectedRoles.length === 0) {

        alert('Please select at least one role.');
        return;

    }

    const location =
        document.getElementById('location').value;

    const searchTerm =
        selectedRoles.join(' OR ');

    const searches = [

        `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(searchTerm)}&location=${encodeURIComponent(location)}`,

        `https://uk.indeed.com/jobs?q=${encodeURIComponent(searchTerm)}`,

        `https://www.cv-library.co.uk/search-jobs?keywords=${encodeURIComponent(searchTerm)}`,

        `https://www.reed.co.uk/jobs/business-change-manager-jobs`,

        `https://www.totaljobs.com/jobs/business-change-manager`

    ];

    searches.forEach(url => {

        window.open(url, '_blank');

    });
}
