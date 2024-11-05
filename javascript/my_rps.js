function displayRPSDataInTable(rpsArray) {
    if (!rpsArray || !Array.isArray(rpsArray)) return;

    const tableBody = document.querySelector('#rpsTable tbody');
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data

    rpsArray.forEach((rps, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${rps.kode_matkul}</td>
                <td>${rps.nama}</td> <!-- Ganti rps.nama sesuai respons -->
                <td><a href="lihat_rps.html">${rps.file}</a></td>
                <td>
                    <button class="btn btn-sm btn-primary edit-btn" data-id="${rps.id}">Edit</button>
                    <button class="btn btn-sm btn-danger delete-btn" data-id="${rps.id}">Hapus</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });

    // Attach event listeners for Edit and Delete buttons
    document.querySelectorAll('.edit-btn').forEach(button => {
        button.addEventListener('click', handleEdit);
    });

    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', handleDelete);
    });
}

function handleEdit(event) {
    const rpsId = event.target.getAttribute('data-id');
    // Lakukan sesuatu, seperti mengarahkan ke halaman edit atau membuka modal edit
    alert(`Edit RPS ID: ${rpsId}`);
}

async function handleDelete(event) {
    const rpsId = event.target.getAttribute('data-id');
    
    if (confirm('Are you sure you want to delete this RPS?')) {
        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`https://apiteam.v-project.my.id/api/rps/delete${id}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`Error: ${response.status}`);
            }

            alert('RPS successfully deleted!');
            // Refresh the table
            const rpsArray = await fetchRPSData();
            displayRPSDataInTable(rpsArray);
        } catch (error) {
            console.error("Error deleting RPS:", error);
        }
    }
}
