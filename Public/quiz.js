document.getElementById("start-btn").addEventListener('click', startQuiz);

function startQuiz() {
    const startBtn = document.getElementById('start-btn');
    startBtn.style.display = "none";

    let countdown = 3;
    const countdownId = document.getElementById('countdown');
    countdownId.classList.remove('hidden');

    const countdownInterval = setInterval(() => {
        countdownId.innerText = countdown;
        countdown--;

        if (countdown < 0) {
            clearInterval(countdownInterval);
            countdownId.remove();
            loadQuestions();
        }
    }, 750);
}
document.getElementById("navigation-buttons").style.display = "none";


async function loadQuestions() {
    const questionBox = document.getElementById("question-box");
    const optionsBox = document.getElementById("options");
    const resultBox = document.getElementById("result-box");
    const scoreText = document.getElementById("score-text");
    const badgeText = document.getElementById("badge-text");


    const bronzeBadge = document.getElementById("bronze-badge");
    const silverBadge = document.getElementById("silver-badge");
    const goldBadge = document.getElementById("gold-badge");


    const navigationButtons = document.getElementById("navigation-buttons");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
   

   
    questionBox.classList.remove("hidden");
    navigationButtons.classList.remove("hidden");
    
 

    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/question/quiz");
        const data = await response.json();
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswers = Array(questions.length).fill(null);

        showQuestion(currentQuestionIndex);

 
        
            navigationButtons.style.display = "flex";
       
    
        function showQuestion(index) {
            const question = questions[index];
            const questionText = document.getElementById("question-text");
            optionsBox.innerHTML = ""; 
            questionText.innerText = question.questionText;

            question.options.forEach((option, i) => {
                const optionButton = document.createElement('button');
                optionButton.classList.add('bg-gray-100', 'hover:bg-amber-900', 'w-full', 'py-2', 'rounded', 'transition', 'duration-300');
                optionButton.innerText = option;

                if (selectedAnswers[index] === option) {
                    optionButton.classList.remove("bg-amber-700");
                    optionButton.classList.add("border-4", "border-black");
                }

                optionButton.onclick = () => {
                  
                    document.querySelectorAll("#options button").forEach(btn => {
                        btn.classList.remove("border-4", "border-black");
                        btn.classList.add("bg-amber-700");
                    });

                    optionButton.classList.remove("bg-amber-700");
                    optionButton.classList.add( "border-4", "border-black");

   
                    selectedAnswers[index] = option;
                };

                optionsBox.appendChild(optionButton);
            });

            
            prevBtn.style.display = index === 0 ? "none" : "inline-block";

            nextBtn.innerText = index === questions.length - 1 ? "Finished" : "Next";
        }

        nextBtn.addEventListener("click", () => {
            if (currentQuestionIndex < questions.length - 1) {
                currentQuestionIndex++;
                showQuestion(currentQuestionIndex);
            } else {
                finishQuiz();
            }
        });

        prevBtn.addEventListener("click", () => {
            if (currentQuestionIndex > 0) {
                currentQuestionIndex--;
                showQuestion(currentQuestionIndex);
            }
        });

        function finishQuiz() {
       
            score = selectedAnswers.reduce((acc, answer, index) => {
                return answer === questions[index].correctAnswer ? acc + 1 : acc;
            }, 0);

            questionBox.classList.add("hidden");
            document.getElementById("navigation-buttons").style.display = "none";
            resultBox.classList.remove("hidden");

            scoreText.innerText = `Total Number of Correct Answers: ${score} / ${questions.length}`;



            if (score >= 10 && score < 15) {
                badgeText.innerText = "Congratulations! You've Earned a Bronze Badge ";
                bronzeBadge.classList.remove("hidden");
            } else if (score >= 15 && score < 20) {
                badgeText.innerText = "Congratulations! You've Earned a Silver Badge ";
                silverBadge.classList.remove("hidden");
            } else if (score === 20) {
                badgeText.innerText = "Congratulations! You've Won a Gold Badge ";
                goldBadge.classList.remove("hidden");
            } else {
                badgeText.innerText = "Unfortunately, you did not earn a badge. You need to practice more!";
            }


            const homeButton = document.createElement("button");
            homeButton.innerText = "🏠 Return to Home Page";
            homeButton.classList.add("bg-green-700", "text-black","font-bold", "px-4", "py-2", "rounded", "mt-4");
            homeButton.onclick = () => window.location.href = "./../View/HomePage.html";
            resultBox.appendChild(homeButton);
        }

    } catch (error) {
        console.error("Sorular yüklenirken hata oluştu:", error);
        const errorBox = document.getElementById("error-box");
        errorBox.classList.remove("hidden"); 

    }
}
