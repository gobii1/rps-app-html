    document.addEventListener('DOMContentLoaded', function () {
        const userName = localStorage.getItem('nama');
        if (userName) {
            document.getElementById('userName').textContent = userName;
        }

        // Load update logs on page load
        fetchUpdates();
    });

    function fetchUpdates() {
        fetch('https://apiteam.v-project.my.id/api/rps/update/${id}', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(response => response.json())
        .then(data => {
            // Assuming the API returns an array of updates in data.data.updates
            const updates = data.data.updates;
            if (updates && updates.length > 0) {
                localStorage.setItem('updateLogs', JSON.stringify(updates.slice(0, 5))); // Store only 5 latest updates
                displayUpdates(updates);
            }
        })
        .catch(error => {
            console.error('Error fetching updates:', error);
        });
    }

    function displayUpdates(updates) {
        const updateLogContainer = document.getElementById('updateLog');
        updateLogContainer.innerHTML = '';

        updates.forEach(update => {
            const logItem = document.createElement('li');
            logItem.classList.add('media', 'event');
            logItem.innerHTML = `
                <a class="pull-left border-aero profile_thumb">
                    <i class="fa fa-user aero"></i>
                </a>
                <div class="media-body">
                    <a class="title" href="#">${update.user}</a>
                    <p><strong>${update.rpsName}</strong> diperbarui</p>
                    <p><small>${new Date(update.date).toLocaleString()}</small></p>
                </div>
            `;
            updateLogContainer.appendChild(logItem);
        });
    }

    function logout() {
        localStorage.removeItem('nama');
        localStorage.removeItem('token');
        localStorage.removeItem('updateLogs');
        alert("Anda telah keluar.");
        window.location.href = 'login.html';
    }

    