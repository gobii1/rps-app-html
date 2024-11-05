// Mengambil ID dari URL
const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get('id');

// Mengambil data RPS berdasarkan ID
async function fetchRpsById() {
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Token tidak ditemukan, silakan login kembali.");
        return;
    }

    try {
        const response = await fetch(`https://apiteam.v-project.my.id/api/rps/infomatkul/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Gagal mengambil data: ' + errorData.message);
        }

        const rpsData = await response.json();
        // Isi form dengan data yang diambil
        document.getElementById('namaMataKuliah').value = rpsData.kode_matkul; // Contoh
        document.getElementById('semester').value = rpsData.semester; // Contoh
        document.getElementById('sks').value = rpsData.sks; // Contoh
    } catch (error) {
        alert("Terjadi kesalahan: " + error.message);
    }
}

// Mengirimkan perubahan ke server
async function updateRps(event) {
    event.preventDefault(); // Mencegah form dari pengiriman default

    const token = localStorage.getItem('token');
    const updatedData = {
        kode_matkul: document.getElementById('namaMataKuliah').value,
        semester: document.getElementById('semester').value,
        sks: document.getElementById('sks').value,
        // Tambahkan elemen lain sesuai kebutuhan
    };

    try {
        const response = await fetch(`https://apiteam.v-project.my.id/api/rps/infomatkul/update/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updatedData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error('Gagal mengupdate data: ' + errorData.message);
        }

        alert("RPS berhasil diperbarui!");
        // Redirect atau lakukan tindakan lain setelah sukses
        window.location.href = 'your_redirect_page.html'; // Ganti dengan halaman yang sesuai
    } catch (error) {
        alert("Terjadi kesalahan: " + error.message);
    }
}

// Menghubungkan fungsi ke form
document.getElementById('editRpsForm').addEventListener('submit', updateRps);

// Panggil fungsi untuk mengambil data RPS saat halaman dimuat
window.onload = fetchRpsById;