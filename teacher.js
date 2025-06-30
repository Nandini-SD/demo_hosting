// Simple login check for teacher
if (!localStorage.getItem('quiz_teacher_logged_in')) {
    window.location.href = "login.html";
}

function logout() {
    localStorage.removeItem('quiz_teacher_logged_in');
    window.location.href = "login.html";
}

// Simulated loading of student results from localStorage
function loadResults() {
    let results = JSON.parse(localStorage.getItem('quiz_student_results') || "[]");
    // Sort by date descending
    results.sort((a, b) => new Date(b.date) - new Date(a.date));
    const tbody = document.querySelector("#results-table tbody");
    tbody.innerHTML = "";
    if (results.length === 0) {
        tbody.innerHTML = `<tr><td colspan="4" style="text-align:center">No results yet.</td></tr>`;
    } else {
        results.forEach((res, idx) => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${idx+1}</td>
                <td>${res.username}</td>
                <td>${res.score}</td>
                <td>${new Date(res.date).toLocaleString()}</td>
            `;
            tbody.appendChild(tr);
        });
    }
}

loadResults();