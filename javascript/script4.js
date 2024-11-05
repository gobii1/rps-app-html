async function updateRPSStatus(rpsId, newStatus) {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch(`https://apiteam.v-project.my.id/api/rps/kaprodi`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                id: rpsId,
                status: newStatus  // Status baru yang akan diterapkan (misalnya 'disetujui' atau 'ditolak')
            })
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Error: ${result.message || response.status}`);
        }

        alert(`RPS berhasil diperbarui ke status ${newStatus}!`);
        return true;
    } catch (error) {
        console.error("Gagal memperbarui status RPS:", error);
        return false;
    }
}

async function konfirmasiRPS(rpsId) {
    const success = await updateRPSStatus(rpsId, "disetujui");
    if (success) {
        const rpsArray = await fetchRPSData();
        displayRPSDataInTable(rpsArray);
    }
}

async function tolakRPS(rpsId) {
    const success = await updateRPSStatus(rpsId, "ditolak");
    if (success) {
        const rpsArray = await fetchRPSData();
        displayRPSDataInTable(rpsArray);
    }
}
