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

    // Rozetleri HTML'den al
    const bronzeBadge = document.getElementById("bronze-badge");
    const silverBadge = document.getElementById("silver-badge");
    const goldBadge = document.getElementById("gold-badge");

    // Önceki ve Sonraki Butonları
    const navigationButtons = document.getElementById("navigation-buttons");
    const prevBtn = document.getElementById("prev-btn");
    const nextBtn = document.getElementById("next-btn");
   

   
    questionBox.classList.remove("hidden");
    navigationButtons.classList.remove("hidden");
    
 

    try {
        const response = await fetch("http://127.0.0.1:3000/api/v1/questions/quiz");
        const data = await response.json();
        const questions = data.questions;
        let currentQuestionIndex = 0;
        let score = 0;
        let selectedAnswers = Array(questions.length).fill(null);

        showQuestion(currentQuestionIndex);

         // İlk sorudan sonra butonları aç
        
            navigationButtons.style.display = "flex";
       
    
        function showQuestion(index) {
            const question = questions[index];
            const questionText = document.getElementById("question-text");
            optionsBox.innerHTML = ""; // Önceki şıkları temizle

            questionText.innerText = question.questionText;

            question.options.forEach((option, i) => {
                const optionButton = document.createElement('button');
                optionButton.classList.add('bg-amber-800', 'hover:bg-amber-900', 'w-full', 'py-2', 'rounded', 'transition', 'duration-300');
                optionButton.innerText = option;

                // Önceden seçilen şıkkı göster
                if (selectedAnswers[index] === option) {
                    optionButton.classList.remove("bg-amber-700");
                    optionButton.classList.add("border-4", "border-black");
                }

                optionButton.onclick = () => {
                    // Tüm seçeneklerin rengini sıfırla
                    document.querySelectorAll("#options button").forEach(btn => {
                        btn.classList.remove("border-4", "border-black");
                        btn.classList.add("bg-amber-700");
                    });

                    // Seçilen şık için belirgin bir stil ekleyelim
                    optionButton.classList.remove("bg-amber-700");
                    optionButton.classList.add( "border-4", "border-black");

                    // Seçimi kaydet
                    selectedAnswers[index] = option;
                };

                optionsBox.appendChild(optionButton);
            });

            // Önceki butonu ilk sorudaysa gizle
            prevBtn.style.display = index === 0 ? "none" : "inline-block";
            // Sonraki butonu son sorudaysa "Bitti" olarak değiştir
            nextBtn.innerText = index === questions.length - 1 ? "Bitti" : "Sonraki";
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
            // Skoru hesapla
            score = selectedAnswers.reduce((acc, answer, index) => {
                return answer === questions[index].correctAnswer ? acc + 1 : acc;
            }, 0);

            questionBox.classList.add("hidden");
            document.getElementById("navigation-buttons").style.display = "none";
            resultBox.classList.remove("hidden");

            scoreText.innerText = `Toplam Doğru Sayısı: ${score} / ${questions.length}`;


            // Skora göre uygun rozeti göster
            if (score >= 10 && score < 15) {
                badgeText.innerText = "Tebrikler! Bronz Rozet Kazandınız ";
                bronzeBadge.classList.remove("hidden");
            } else if (score >= 15 && score < 20) {
                badgeText.innerText = "Tebrikler! Gümüş Rozet Kazandınız ";
                silverBadge.classList.remove("hidden");
            } else if (score === 20) {
                badgeText.innerText = "Tebrikler! Altın Rozet Kazandınız ";
                goldBadge.classList.remove("hidden");
            } else {
                badgeText.innerText = "Maalesef rozet kazanamadınız. Daha fazla pratik yapmalısınız!";
            }

            // Anasayfaya Dön Butonu
            const homeButton = document.createElement("button");
            homeButton.innerText = "🏠 Anasayfaya Dön";
            homeButton.classList.add("bg-green-700", "text-black","font-bold", "px-4", "py-2", "rounded", "mt-4");
            homeButton.onclick = () => window.location.href = "index.html";
            resultBox.appendChild(homeButton);
        }

    } catch (error) {
        console.error("Sorular yüklenirken hata oluştu:", error);
        const errorBox = document.getElementById("error-box");
        errorBox.classList.remove("hidden"); // Hata olduğunda göster

    }
}
