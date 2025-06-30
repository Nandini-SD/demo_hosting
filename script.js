// Add login check at the top of script.js
if (!localStorage.getItem('quiz_logged_in')) {
    window.location.href = "login.html";
}

const quizData = [
    {
        question: "What does HTML stand for?",
        a: "Hyper Trainer Marking Language",
        b: "Hyper Text Markup Language",
        c: "Hyper Text Marketing Language",
        d: "Hyper Text Markup Leveler",
        correct: "b"
    },
    {
        question: "What is the correct syntax for referring to an external script called 'xxx.js'?",
        a: "<script src='xxx.js'>",
        b: "<script href='xxx.js'>",
        c: "<script ref='xxx.js'>",
        d: "<script name='xxx.js'>",
        correct: "a"
    },
    {
        question: "Which property is used to change the background color in CSS?",
        a: "color",
        b: "bgcolor",
        c: "background-color",
        d: "backgroundColor",
        correct: "c"
    },
    {
        question: "How do you write 'Hello World' in an alert box in JavaScript?",
        a: "msgBox('Hello World');",
        b: "alertBox('Hello World');",
        c: "msg('Hello World');",
        d: "alert('Hello World');",
        correct: "d"
    }
];

let currentQuiz = 0;
let score = 0;

const questionEl = document.getElementById('question');
const answersEls = document.querySelectorAll('.answer');
const a_text = document.getElementById('a_text');
const b_text = document.getElementById('b_text');
const c_text = document.getElementById('c_text');
const d_text = document.getElementById('d_text');
const submitBtn = document.getElementById('submit');
const quiz = document.getElementById('quiz');

function loadQuiz() {
    deselectAnswers();
    const currentQuizData = quizData[currentQuiz];
    questionEl.textContent = currentQuizData.question;
    a_text.textContent = currentQuizData.a;
    b_text.textContent = currentQuizData.b;
    c_text.textContent = currentQuizData.c;
    d_text.textContent = currentQuizData.d;
}

function getSelected() {
    let answer = undefined;
    answersEls.forEach(ansEl => {
        if(ansEl.checked) {
            answer = ansEl.id;
        }
    });
    return answer;
}

function deselectAnswers() {
    answersEls.forEach(ansEl => ansEl.checked = false);
}

submitBtn.addEventListener('click', () => {
    const answer = getSelected();
    if(answer) {
        if(answer === quizData[currentQuiz].correct) {
            score++;
        }
        currentQuiz++;
        if(currentQuiz < quizData.length) {
            loadQuiz();
        } else {
            // Save student result to localStorage
            const username = localStorage.getItem('quiz_username') || "Unknown";
            const studentResults = JSON.parse(localStorage.getItem('quiz_student_results') || "[]");
            studentResults.push({
                username,
                score: `${score}/${quizData.length}`,
                date: new Date().toISOString()
            });
            localStorage.setItem('quiz_student_results', JSON.stringify(studentResults));
            quiz.innerHTML = `
                <h2>You answered ${score}/${quizData.length} questions correctly!</h2>
                <button onclick="location.reload()">Reload</button>
                <button onclick="logout()">Logout</button>
            `;
        }
    } else {
        alert("Please select an answer before submitting!");
    }
});

// Logout function
function logout() {
    localStorage.removeItem('quiz_logged_in');
    localStorage.removeItem('quiz_username');
    window.location.href = "login.html";
}

loadQuiz();