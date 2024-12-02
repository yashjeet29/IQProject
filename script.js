const questions = [
    "What is 2 + 2?", // Sample questions
    "Which shape has four equal sides?",
    "What is the capital of France?",
    "What comes after Monday?",
    "What is 5 x 5?",
    "Which is a mammal: Shark or Whale?",
    "Which planet is known as the Red Planet?",
    "What is 100 divided by 4?",
    "Which color is made by mixing blue and yellow?",
    "What is 7 + 3?",
    "What is the largest ocean on Earth?",
    "What is the square root of 81?",
    "Which year did World War II end?",
    "What is the chemical symbol for water?",
    "Which animal is known as the King of the Jungle?",
    "How many continents are there?",
    "Which country is famous for pizza?",
    "What is the opposite of 'cold'?",
    "How many days are in a leap year?",
    "What is the capital of Japan?",
  ];
  
  const correctAnswers = [
    "4", "square", "Paris", "Tuesday", "25", "Whale", "Mars", "25",
    "green", "10", "Pacific", "9", "1945", "H2O", "Lion", "7", "Italy",
    "hot", "366", "Tokyo"
  ];
  
  const quizContainer = document.getElementById("quiz-container");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");
  const timer = document.getElementById("timer");
  
  let currentQuestion = 0;
  let timeLeft = 20 * 60; // 20 minutes in seconds
  let userAnswers = new Array(questions.length).fill("");
  let timerStarted = false; // Track if timer has started
  let timerInterval; // Store timer interval ID
  
  // Initialize questions
  questions.forEach((q, index) => {
    const div = document.createElement("div");
    div.classList.add("question");
    if (index === 0) div.classList.add("active");
    div.innerHTML = `
      <p>${index + 1}. ${q}</p>
      <input type="text" data-index="${index}" />
    `;
    quizContainer.appendChild(div);
  });
  
  // Start Timer Function
  function startTimer() {
    timerInterval = setInterval(() => {
      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        finishQuiz();
      } else {
        timeLeft--;
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        timer.textContent = `Time Left: ${minutes}:${seconds.toString().padStart(2, '0')}`;
      }
    }, 1000);
  }
  
  // Finish Quiz Function
  function finishQuiz() {
    calculateScore();
    stopTimer();
  }
  
  // Stop Timer
  function stopTimer() {
    clearInterval(timerInterval);
    timer.textContent = "Time is Up!";
  }
  
  // Calculate IQ level
  function calculateScore() {
    let score = 0;
  
    userAnswers.forEach((answer, index) => {
      if (answer.trim().toLowerCase() === correctAnswers[index].trim().toLowerCase()) {
        score++;
      }
    });
  
    let percentage = (score / questions.length) * 100;
    let iqLevel = "";
  
    if (percentage > 80) {
      iqLevel = "Genius";
    } else if (percentage >= 60) {
      iqLevel = "Excellent";
    } else if (percentage >= 40) {
      iqLevel = "Good";
    } else if (percentage >= 20) {
      iqLevel = "Average";
    } else {
      iqLevel = "Below Average";
    }
  
    alert(`Quiz Finished! Your IQ Level is ${iqLevel}.`);
  }
  
  // Navigation
  function updateNavigation() {
    document.querySelectorAll(".question").forEach((q, index) => {
      q.classList.toggle("active", index === currentQuestion);
    });
  
    prevBtn.disabled = currentQuestion === 0;
    nextBtn.textContent = currentQuestion === questions.length - 1 ? "Finish" : "Next";
  }
  
  prevBtn.addEventListener("click", () => {
    if (currentQuestion > 0) {
      currentQuestion--;
      updateNavigation();
    }
  });
  
  nextBtn.addEventListener("click", () => {
    if (!timerStarted) {
      timerStarted = true;
      startTimer();
    }
  
    const input = document.querySelector(`input[data-index="${currentQuestion}"]`);
    userAnswers[currentQuestion] = input.value;
  
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      updateNavigation();
    } else {
      finishQuiz();
    }
  });
  
  updateNavigation();
  