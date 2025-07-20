const apiUrl = 'https://repo1-ryve.onrender.com/api/employees';
const authHeader = 'Basic ' + btoa('admin:password123');

// Load and show records
fetch(apiUrl, {
    headers: { 'Authorization': authHeader }
})
    .then(res => res.json())
    .then(data => {
        const table = document.getElementById("dataTable");
        table.innerHTML = "";

        if (data.length === 0) {
            table.innerHTML = "<tr><td>No data</td></tr>";
            return;
        }

        // Header row
        let headers = Object.keys(data[0]);
        let headerRow = table.insertRow();
        headers.forEach(key => {
            let th = document.createElement("th");
            th.innerText = key;
            headerRow.appendChild(th);
        });
        headerRow.appendChild(document.createElement("th")).innerText = "Actions";

        // Data rows
        data.forEach(row => {
            let tr = table.insertRow();
            headers.forEach(key => {
                tr.insertCell().innerText = row[key];
            });

            // Delete button
            let deleteCell = tr.insertCell();
            let btn = document.createElement("button");
            btn.innerText = "Delete";
            btn.onclick = () => deleteRecord(row.id);
            deleteCell.appendChild(btn);
        });

        // Dynamic form fields
        const form = document.getElementById("form");
        form.innerHTML = "";
        headers.forEach(key => {
            let input = document.createElement("input");
            input.placeholder = key;
            input.id = key;
            form.appendChild(input);
        });
    });

function createRecord() {
    let inputs = document.querySelectorAll("#form input");
    let obj = {};
    inputs.forEach(input => obj[input.id] = input.value);

    fetch(apiUrl, {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'Authorization': authHeader
        },
        body: JSON.stringify(obj)
    })
        .then(() => location.reload());
}

function deleteRecord(id) {
    fetch(`${apiUrl}/${id}`, {
        method: "DELETE",
        headers: { 'Authorization': authHeader }
    })
        .then(() => location.reload());
}
