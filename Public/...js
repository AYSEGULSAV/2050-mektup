 document.getElementById('start-btn').addEventListener('click',startQuiz);

   function startQuiz(){ 
    const startBtn=document.getElementById('start-btn');
    startBtn.style.display='none';

    let countdown=3;
    const countdownId= document.getElementById('countdown');

    const countdownInterval=setInterval(()=>{
       countdownId.innerText=countdown;
       countdown--;
        if(countdown<0){
            clearInterval(countdownInterval);
            countdownId.remove();
            loadQuestions();
        }
    },750)

  }

    async function loadQuestions(){
        const questionBox =document.getElementById('question-box');
        const optionsBox=document.getElementById('opttions');
        const resultBox=document.getAnimations("result-box");
        const scoreText=document.getElementById("score-text");
        const badgeText=document.getElementById("bagde-text");
           // Rozetleri HTML'den al
        const bronzeBadge = document.getElementById("bronze-badge");
        const silverBadge = document.getElementById("silver-badge");
        const goldBadge = document.getElementById("gold-badge");

        
    // Önceki ve Sonraki Butonları
        const navigationButtons = document.getElementById("navigation-buttons");
        const prevBtn = document.getElementById("prev-btn");
        const nextBtn = document.getElementById("next-btn");

        questionBox.classList.remove('hidden');
        
   }