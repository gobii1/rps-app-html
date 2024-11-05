async function ambilRPSBaru() {
    try {
        const response = await fetch('https://apiteam.v-project.my.id/api/rps/kaprodi/', {
            method: 'GET',

        });

        // Cek apakah response ok (ini akan selalu false di no-cors)
        if (!response.ok) {
            throw new Error('Jaringan error: ' + response.statusText);
        }
        
        const data = await response.json();
        
        // Pastikan ada data yang diterima
        if (data && data.length > 0) {
            // Mengambil RPS terbaru (misalnya yang terakhir di array)
            const rpsTerbaru = data[data.length - 1];

            // Mengisi informasi ke elemen HTML
            document.getElementById('namaMataKuliah').textContent = rpsTerbaru.namaMataKuliah;
            document.getElementById('kodeMataKuliah').textContent = rpsTerbaru.kodeMataKuliah;
            document.getElementById('semester').textContent = rpsTerbaru.semester;
            document.getElementById('sks').textContent = rpsTerbaru.sks;
            document.getElementById('dosen').textContent = rpsTerbaru.dosen;
            document.getElementById('deskripsiMataKuliah').textContent = rpsTerbaru.deskripsiMataKuliah;
            document.getElementById('capaianPembelajaranProdi').textContent = rpsTerbaru.capaianPembelajaranProdi;
            document.getElementById('capaianPembelajaranMatkul').textContent = rpsTerbaru.capaianPembelajaranMatkul;
            document.getElementById('bobotPenilaian').textContent = rpsTerbaru.bobotPenilaian;
            document.getElementById('metodePenilaian').textContent = rpsTerbaru.metodePenilaian;
            document.getElementById('bukuReferensi').textContent = rpsTerbaru.bukuReferensi;

            // Mengisi tabel jadwal jika ada
            if (rpsTerbaru.jadwal && Array.isArray(rpsTerbaru.jadwal)) {
                updateJadwal(rpsTerbaru.jadwal);
            }
        } else {
            console.log('Tidak ada data RPS ditemukan.');
        }
    } catch (error) {
        console.error('Terjadi kesalahan saat mengambil data RPS:', error);
    }
}

// Fungsi untuk memperbarui tabel jadwal
function updateJadwal(jadwal) {
    const jadwalTableBody = document.getElementById('jadwalTableBody');
    jadwalTableBody.innerHTML = ''; // Kosongkan tabel sebelum mengisi

    jadwal.forEach((item) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.mingguKe}</td>
            <td>${item.waktu}</td>
            <td>${item.cpTahapan}</td>
            <td>${item.bahanKajian}</td>
            <td>${item.subBahanKajian}</td>
            <td>${item.bentukPembelajaran}</td>
            <td>${item.pengalamanBelajar}</td>
            <td>${item.kriteriaPenilaian}</td>
            <td>${item.bobotMateri}</td>
            <td>${item.referensi}</td>
        `;
        jadwalTableBody.appendChild(row);
    });
}

// Panggil fungsi saat halaman dimuat
document.addEventListener('DOMContentLoaded', ambilRPSBaru);
