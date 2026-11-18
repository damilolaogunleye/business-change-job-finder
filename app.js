let currentResults = [];

function searchJobs() {

    const selectedRoles =
        [...document.querySelectorAll('.role:checked')]
        .map(role => role.value);

    const location =
        document.getElementById('location').value;

    const salary =
        document.getElementById('salary').value;

    currentResults = [];

    selectedRoles.forEach(role => {

        currentResults.push({
            role: role,
            source: 'LinkedIn',
            url: `https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`
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
            url: `https://www.totaljobs.com/jobs/${encodeURIComponent(role.toLowerCase().replaceAll(' ','-'))}`
        });

    });

    buildTable();

    document.getElementById('resultsCount').innerText =
        currentResults.length;

    document.getElementById('avgSalary').innerText =
        `£${Number(salary).toLocaleString()}`;
}

function buildTable(){

    const table =
        document.querySelector('#resultsTable tbody');

    table.innerHTML = '';

    currentResults.forEach(item => {

        table.innerHTML += `
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

function exportCSV(){

    let csv = 'Role,Source,URL\n';

    currentResults.forEach(job => {

        csv +=
        `${job.role},${job.source},${job.url}\n`;

    });

    const blob =
        new Blob([csv], {type:'text/csv'});

    const link =
        document.createElement('a');

    link.href =
        URL.createObjectURL(blob);

    link.download =
        'BusinessChangeJobs.csv';

    link.click();
}
function openAllSearches(){

    if(currentResults.length === 0){

        alert(
          'Please click Search Jobs first.'
        );

        return;
    }

    currentResults.forEach(job => {

        window.open(
            job.url,
            '_blank'
        );

    });

}
