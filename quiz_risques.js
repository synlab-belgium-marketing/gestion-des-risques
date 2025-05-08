let quizCompleted = false; // Indicateur de complétion

const quizData = [

    {
        question: "1. Laquelle de ces méthodes n’est pas utilisée lors de l’identification d’un risque ?",
        a: "Approche par processus",
        b: "Méthode des 5 M",
        c: "Méthode des 5 pourquoi",
        d: "Méthode des 5 S",
        correct: ["d"]
    },

 {
	question: "2. Quelles informations retrouve-t-on au niveau d’un risque identifié ? <br> <span style='font-size:14px;'>Sélectionnez toutes les réponses correctes.</span>",
        a: "Code risque",
        b: "Description",
        c: "Moyen mis en place",
        d: "Indicateur spécifique",
        e: "Personnes responsables de la surveillance",
        correct: ["a", "b", "c", "d"]
},

 {
	question: "3. Par quel moyen peut-on accéder à la liste complète des risques identifiés (SPE-SHY-009) ? ",
        a: "Teams",
        b: "Disque W",
        c: "Intranet",
        d: "Kalilab",
        e: "Bureau de la cellule qualité",
        correct: ["a"]
},

 {
	question: "4. Sélectionnez toutes les affirmations <b> incorrectes </b> parmi les suivantes : ",
a: "La criticité d’un risque prend en compte la gravité du risque et la fréquence d’apparition des évènements.", 
b: "La criticité d’un risque prend uniquement en compte la fréquence d’apparition des évènements.", 
c: "Un évènement / incident qui aboutit à un arrêt de la routine / fermeture du poste est catégorisé avec une gravité de niveau 3.", 
d: "Le niveau de fréquence est identique quel que soit le risque identifié. <br> Exemple : 1000 TMANCITB (Tube citraté manquant) aura le même niveau de fréquence que 1000 5ERPB (Erreur patients)",

        correct: ["b", "d"]
},

 {
	question: "5. Quelles plateformes permettent le recensement d'un évènement survenu par le biais d’un risque non maitrisé ? <br> <span style='font-size:14px;'>Sélectionnez toutes les réponses correctes.</span> ",
a: "Molis [pour les non-conformités liées au dossier du patient (prélèvement, encodage, patient, résultat, facturation)]", 
b: "Disque W [pour les fiches d’incident : incident MAJEUR survenu lors d’une routine ayant un impact sur les résultats]", 
c: "Fichier Teams [pour les défaillances au sein d’un service (fiches d’écart) mises en évidence lors des audits internes]",
d: "PV de réunion de service",

        correct: ["a", "b", "c"]
},

 {
	question: "6. Sélectionnez toutes les affirmations correctes :",
a: "Le reporting des non-conformités liées au dossier du patient (prélèvement, encodage, patient, résultat, facturation) <br> est de la responsabilité de tous les acteurs ayant participé à ce dossier.", 
b: "L’attribution de code risque au niveau du reporting des fiches d’incidence est du ressort <br> du responsable de service et/ou référent qualité.", 
c: "L’attribution de code risque au niveau du reporting des fiches d’incidence est du ressort de la cellule qualité.",
d: "L’attribution de code risque au niveau du reporting des fiches d'écart est du ressort de l’auditeur interne du service.", 

        correct: ["a", "b", "d"]
},

 {
	question: "7. Sélectionnez toutes les affirmations correctes :",
a: "La surveillance des risques se manifestant par des incidents ou fiches d’écart d’audit interne est réalisée tous les 3 mois avant la réunion qualité.", 
b: "La surveillance des risques se manifestant par des non-conformités liées au dossier du patient est réalisée tous les 3 mois avant la réunion qualité.", 
c: "Un risque ayant une criticité élevée (5 ou 6) doit systématiquement faire l’objet d’une action afin de diminuer le risque.",
d: "Un risque ayant une criticité augmentée par rapport à la surveillance précédente doit faire l’objet d’une action correctrice afin de réduire le risque.",  


        correct: ["b", "d"]
},

];

const quiz = document.getElementById('quiz');
const feedback = document.getElementById('feedback');
const submitBtn = document.querySelector('.submit-btn');

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {
    const currentQuizData = quizData[currentQuiz];
    quiz.innerHTML = `
        <div class="question">${currentQuizData.question}</div>
        <ul class="options">
            ${currentQuizData.a ? `<li><input type="checkbox" name="answer" value="a"> ${currentQuizData.a}</li>` : ''}
            ${currentQuizData.b ? `<li><input type="checkbox" name="answer" value="b"> ${currentQuizData.b}</li>` : ''}
            ${currentQuizData.c ? `<li><input type="checkbox" name="answer" value="c"> ${currentQuizData.c}</li>` : ''}
            ${currentQuizData.d ? `<li><input type="checkbox" name="answer" value="d"> ${currentQuizData.d}</li>` : ''}
            ${currentQuizData.e ? `<li><input type="checkbox" name="answer" value="e"> ${currentQuizData.e}</li>` : ''}
        </ul>
    `;
    feedback.innerHTML = '';
}



function submitQuiz() {
    const answers = document.querySelectorAll('input[name="answer"]:checked');
    const selectedAnswers = Array.from(answers).map(answer => answer.value);
    const correctAnswers = quizData[currentQuiz].correct;

    // Calculer le score pour chaque réponse correcte cochée
    selectedAnswers.forEach(answer => {
        if (correctAnswers.includes(answer)) {
            score++;
        }
	else {
            score -= 0.25;
        }

    });

    currentQuiz++;
    feedback.innerHTML = ''; // Réinitialiser le feedback en cas de réponse correcte

    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        if (score >= 13) {
            quiz.innerHTML = `Félicitations ! Vous avez terminé cette formation avec une score de ${score}/16 (plusieurs points possibles par question). <br> Nous vous remercions pour votre engagement et votre participation. <br>`;
document.getElementById('finish').style.display = 'block';
        } else {
            quiz.innerHTML = ` Vous avez obtenu ${score} points (plusieurs points possibles par question). <br> Un score de minimum 13/16 est requis pour réussir cette formation. <br> Veuillez recommencer le questionnaire. <br>`;
            document.getElementById('retry-btn').style.display = 'block';
        }
        submitBtn.style.display = 'none';
    }
}


function restartQuiz() {
    currentQuiz = 0;
    score = 0;
    loadQuiz();
    submitBtn.style.display = 'block';
    document.getElementById('retry-btn').style.display = 'none';
}

function fermerOnglet() {
    window.close();
    document.getElementById('finish').style.display = 'none';
}



document.addEventListener('DOMContentLoaded', function() {
    Swal.fire({
        title: 'Place au quiz !',
        html: 'Cliquez sur « Je suis prêt » pour commencer.',
        showConfirmButton: true,
        confirmButtonText: 'Je suis prêt',
        confirmButtonColor: '#003765',
        allowOutsideClick: false
    }).then((result) => {
        if (result.isConfirmed) {
            document.getElementById('quiz-container').style.display = 'block'; // Afficher le contenu
            loadQuiz();
        }
    });

});
