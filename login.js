document.getElementById('login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;

    // Teacher credentials: Username = "teacher", Password = "teach123"
    // Student credentials: Username = "user", Password = "quiz"
    if(username === "teacher" && password === "teach123") {
        localStorage.setItem('quiz_teacher_logged_in', 'true');
        window.location.href = "teacher.html";
    } else if(username === "user" && password === "quiz") {
        localStorage.setItem('quiz_logged_in', 'true');
        localStorage.setItem('quiz_username', username);
        window.location.href = "index.html";
    } else {
        document.getElementById('login-error').textContent = "Invalid username or password!";
    }
});