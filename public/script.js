document.addEventListener('DOMContentLoaded', () => {
    const loadBtn = document.getElementById('loadData');
    const resultDiv = document.getElementById('result');

    if (loadBtn) {
        loadBtn.addEventListener('click', async () => {
            resultDiv.innerHTML = "<p class='status-msg'>Loading users...</p>";
            try {
                const response = await fetch('/api');
                const users = await response.json();

                if (users.length === 0) {
                    resultDiv.innerHTML = "<p class='status-msg'>No users found in database.</p>";
                    return;
                }

                const cards = users.map(u => `
                    <div class="user-card">
                        <span class="user-name">${u.name}</span>
                        <span class="user-email">${u.email}</span>
                    </div>
                `).join('');

                resultDiv.innerHTML = cards;
            } catch (err) {
                console.error('Error fetching data:', err);
                resultDiv.innerHTML = "<p class='status-msg' style='color: #ef4444;'>Error loading data.</p>";
            }
        });
    }
});