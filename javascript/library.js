async function fetchRPSData() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('https://apiteam.v-project.my.id/api/rps', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status}`);
        }

        const data = await response.json();
        console.log("Data fetched from API:", data); // Log untuk melihat struktur data
        return data.data || []; // Pastikan data sesuai ekspektasi
    } catch (error) {
        console.error("Error fetching RPS data:", error);
        return []; // Mengembalikan array kosong jika terjadi error
    }
}



// Fungsi untuk menampilkan data RPS di tabel
async function displayRPSData() {
    const rpsData = await fetchRPSData();
    const tableBody = document.querySelector('#rpsTable tbody');
    tableBody.innerHTML = '';

    if (Array.isArray(rpsData)) {
        // Jika rpsData adalah array, tampilkan item RPS di tabel
        rpsData.forEach((rps, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${rps.kodeMataKuliah}</td>
                <td>${rps.namaMataKuliah}</td>
                <td><a href="${rps.fileUrl}" target="_blank">File</a></td>
            `;
            tableBody.appendChild(row);
        });
    } else if (typeof rpsData === 'object' && rpsData !== null) {
        // Jika rpsData adalah objek statistik
        console.log("Statistik RPS:", rpsData);
        
        // Tampilkan data statistik pada elemen tertentu
        document.getElementById("totalMatkul").textContent = rpsData.total_infomatkul || 0;
        document.getElementById("belumDisetujui").textContent = rpsData.belum_disetujui || 0;
        document.getElementById("sudahDisetujui").textContent = rpsData.sudah_disetujui || 0;
    } else {
        console.error("Format rpsData tidak dikenali:", rpsData);
    }
}



// Memastikan elemen dengan ID 'rpsTable' ada sebelum menambahkan event listener
document.addEventListener('DOMContentLoaded', () => {
    const rpsTable = document.querySelector('#rpsTable');
    if (rpsTable) {
        displayRPSData();
    } else {
        console.error("Element with ID 'rpsTable' not found.");
    }
});