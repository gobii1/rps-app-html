// Fungsi untuk menampilkan data dari API
async function fetchRPSData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('https://apiteam.v-project.my.id/api/rps/infomatkul', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const rpsData = await response.json();
        console.log("Data RPS dari API:", rpsData);
        return rpsData.data; // Pastikan 'data' adalah array dari RPS
    } catch (error) {
        console.error("Error fetching RPS data:", error);
        return null;
    }
}

// Fungsi untuk menampilkan data di tabel HTML
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
                </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}


// Panggil semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    const rpsArray = await fetchRPSData();
    displayRPSDataInTable(rpsArray);
});
