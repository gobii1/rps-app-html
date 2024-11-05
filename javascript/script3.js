// Fungsi untuk mengambil data RPS dari API
async function fetchRPSData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('https://apiteam.v-project.my.id/api/rps/kaprodi', {
            method: 'POST',
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
    tableBody.innerHTML = ''; // Kosongkan tabel sebelum menambahkan data baru

    rpsArray.forEach((rps, index) => {
        const row = `
            <tr>
                <td>${index + 1}</td>
                <td>${rps.kode_matkul}</td>
                <td>${rps.nama_matkul}</td>
                <td>${rps.nama_dosen}</td>
                <td>${rps.status}</td>
                <td>${rps.keterangan || '-'}</td>
                <td>
                    <button class="btn-konfirmasi" data-id="${rps.id}">Konfirmasi</button>
                    <button class="btn-tolak" data-id="${rps.id}" style="margin-left: 10px;">Tolak</button>
                </td>
            </tr>
        `;
        tableBody.insertAdjacentHTML('beforeend', row);
    });
}

// Fungsi untuk konfirmasi RPS
async function konfirmasiRPS(rpsId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://apiteam.v-project.my.id/api/rps/kaprodi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Gagal mengkonfirmasi RPS: ${response.status}`);
        }

        alert("RPS berhasil dikonfirmasi!");
        const rpsArray = await fetchRPSData(); // Ambil data terbaru
        displayRPSDataInTable(rpsArray); // Tampilkan data terbaru
    } catch (error) {
        console.error("Error konfirmasi RPS:", error);
    }
}

// Fungsi untuk tolak RPS
async function tolakRPS(rpsId) {
    try {
        const token = localStorage.getItem('token');
        const response = await fetch(`https://apiteam.v-project.my.id/api/rps/kaprodi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Gagal menolak RPS: ${response.status}`);
        }

        alert("RPS berhasil ditolak!");
        const rpsArray = await fetchRPSData(); // Ambil data terbaru
        displayRPSDataInTable(rpsArray); // Tampilkan data terbaru
    } catch (error) {
        console.error("Error tolak RPS:", error);
    }
}

// Event listener untuk tombol Konfirmasi dan Tolak
document.querySelector('#rpsTable').addEventListener('click', (e) => {
    const target = e.target;
    const rpsId = target.getAttribute('data-id');

    if (target.classList.contains('btn-konfirmasi')) {
        if (confirm("Apakah Anda yakin ingin mengkonfirmasi RPS ini?")) {
            konfirmasiRPS(rpsId);
        }
    } else if (target.classList.contains('btn-tolak')) {
        if (confirm("Apakah Anda yakin ingin menolak RPS ini?")) {
            tolakRPS(rpsId);
        }
    }
});

// Panggil semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    const rpsArray = await fetchRPSData();
    displayRPSDataInTable(rpsArray);
});
