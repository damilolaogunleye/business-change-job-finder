let currentResults = [];

function searchJobs(){

    const role =
        document.getElementById('jobRole').value;

    const location =
        document.getElementById('location').value;

    const salary =
        document.getElementById('salary').value;

    currentResults = [

        {
            source:'LinkedIn',
            url:`https://www.linkedin.com/jobs/search/?keywords=${encodeURIComponent(role)}&location=${encodeURIComponent(location)}`
        },

        {
            source:'Reed',
            url:`https://www.reed.co.uk/jobs/${encodeURIComponent(role.toLowerCase().replaceAll(' ','-'))}-jobs`
        },

        {
            source:'CV-Library',
            url:`https://www.cv-library.co.uk/search-jobs?keywords=${encodeURIComponent(role)}`
        },

        {
            source:'TotalJobs',
            url:`https://www.totaljobs.com/jobs/${encodeURIComponent(role.toLowerCase().replaceAll(' ','-'))}`
        },

        {
            source:'Indeed',
            url:`https://uk.indeed.com/jobs?q=${encodeURIComponent(role)}`
        }

    ];

    buildTable();

    document.getElementById('resultsCount').innerText =
        currentResults.length;

    document.getElementById('avgSalary').innerText =
        `£${Number(salary).toLocaleString()}`;
}

function buildTable(){

    const table =
        document.querySelector('#resultsTable tbody');

    table.innerHTML='';

    currentResults.forEach(item => {

        table.innerHTML += `
            <tr>
                <td>${document.getElementById('jobRole').value}</td>
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
        `${document.getElementById('jobRole').value},${job.source},${job.url}\n`;

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
