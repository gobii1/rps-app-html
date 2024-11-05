// Fungsi untuk menampilkan data dari API
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

        const rpsData = await response.json();
        console.log("Data RPS dari API:", rpsData);
        return rpsData.data;
    } catch (error) {
        console.error("Error fetching RPS data:", error);
        return null;
    }
}

// Fungsi untuk menampilkan data di elemen HTML
function displayRPSData(rpsData) {
    if (!rpsData) return;

    const totalRPSElement = document.querySelector('.count[data-count-target="total-rps"]');
    const confirmationRPSElement = document.querySelector('.count[data-count-target="confirmation-rps"]');
    const acceptedRPSElement = document.querySelector('.count[data-count-target="accepted-rps"]');

    // Pastikan elemen ada sebelum mengubah isinya
    if (totalRPSElement) {
        totalRPSElement.textContent = rpsData.total_infomatkul || 0;
    } else {
        console.warn("Element with data-count-target='total-rps' not found");
    }

    if (confirmationRPSElement) {
        confirmationRPSElement.textContent = rpsData.belum_disetujui || 0;
    } else {
        console.warn("Element with data-count-target='confirmation-rps' not found");
    }

    if (acceptedRPSElement) {
        acceptedRPSElement.textContent = rpsData.sudah_disetujui || 0;
    } else {
        console.warn("Element with data-count-target='accepted-rps' not found");
    }
}

// Panggil semua fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', async () => {
    const rpsData = await fetchRPSData();
    displayRPSData(rpsData);
});
