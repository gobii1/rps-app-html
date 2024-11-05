document.getElementById('input').addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(this);
    const token = localStorage.getItem('token');

    if (!token) {
        alert("Token tidak ditemukan, silakan login kembali.");
        return;
    }

     fetch('https://apiteam.v-project.my.id/api/rps/infomatkul/create', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                return response.json().then(errorData => {
                    throw new Error('Error: ' + errorData.message);
                });
            }
            return response.json();
        })
        .then(data => {
            alert("Data berhasil disimpan ke API!");
        })
        .catch(error => {
            console.error('Error:', error);
            alert("Terjadi kesalahan: " + error.message);
        });
});


// Event listener untuk tombol Tambah Jadwal
// document.getElementById('addJadwalBtn').addEventListener('click', function () {
//     const jadwalPelaksanaan = {
//         mingguKe: document.getElementById('mingguKe').value,
//         waktu: document.getElementById('waktu').value,
//         cpTahapanMatkul: document.getElementById('cp_tahapan_matkul').value,
//         bahanKajian: document.getElementById('bahan_kajian').value,
//         subBahanKajian: document.getElementById('sub_bahan_kajian').value,
//         bentukPembelajaran: document.getElementById('bentuk_pembelajaran').value,
//         kriteriaPenilaian: document.getElementById('kriteria_penilaian').value,
//         pengalamanBelajar: document.getElementById('pengalaman_belajar').value,
//         bobotMateri: document.getElementById('bobot_materi').value,
//         referensi: document.getElementById('referensi').value
//     };

//     // Menyimpan jadwal ke API
//     fetch('https://apiteam.v-project.my.id/api/rps/jadwal/update', {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(jadwalPelaksanaan)
//     })
//     .then(response => {
//         if (!response.ok) {
//             throw new Error('Gagal menyimpan jadwal!');
//         }
//         return response.json();
//     })
//     .then(data => {
//         alert("Jadwal berhasil disimpan ke API!");
//         // Reset form jadwal setelah berhasil disimpan
//         document.getElementById('inputrps').reset();
//     })
//     .catch(error => {
//         console.error('Error:', error);
//         alert("Terjadi kesalahan saat menyimpan jadwal.");
//     });
// });
