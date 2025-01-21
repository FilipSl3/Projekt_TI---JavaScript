        const wordForm = document.getElementById('wordForm');
        const wordList = document.getElementById('wordList');
        const startQuizButton = document.getElementById('startQuiz');
        const quizSection = document.getElementById('quiz');
        const quizQuestion = document.getElementById('quizQuestion');
        const quizAnswer = document.getElementById('quizAnswer');
        const submitAnswer = document.getElementById('submitAnswer');
        const quizFeedback = document.getElementById('quizFeedback');
        const quizScore = document.getElementById('quizScore');
        const quizRounds = document.getElementById('quizRounds');
        const resetQuizButton = document.getElementById('resetQuiz');
        const roundsInput = document.getElementById('rounds');

        let words = [];
        let currentWord = null;
        let score = 0;
        let round = 0;
        let totalRounds = 5;

        // Dodawanie słówka
        wordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const word = document.getElementById('word').value;
            const translation = document.getElementById('translation').value;

            words.push({ word, translation });
            renderWords();

            wordForm.reset();
        });

        // Renderowanie listy słówek
        function renderWords() {
            wordList.innerHTML = '';
            words.forEach((wordObj, index) => {
                const div = document.createElement('div');
                div.classList.add('word');
                div.innerHTML = `
                    <strong>${wordObj.word}</strong> - ${wordObj.translation}
                    <button onclick="removeWord(${index})">Usuń</button>
                `;
                wordList.appendChild(div);
            });
        }

        // Usuwanie słówka
        function removeWord(index) {
            words.splice(index, 1);
            renderWords();
        }

        // Rozpoczynanie quizu
        startQuizButton.addEventListener('click', () => {
            if (words.length === 0) {
                alert('Najpierw dodaj słówka do nauki!');
                return;
            }

            totalRounds = parseInt(roundsInput.value) || 5;
            score = 0;
            round = 0;
            quizScore.textContent = `Wynik: ${score}`;
            quizRounds.textContent = `Runda: ${round + 1} z ${totalRounds}`;
            quizSection.style.display = 'block';
            quizFeedback.textContent = '';
            resetQuizButton.style.display = 'none';
            nextQuestion();
        });

        // Przejście do następnego pytania
        function nextQuestion() {
            if (round >= totalRounds) {
                const percentage = ((score / totalRounds) * 100).toFixed(2);
                if(percentage > 50 && percentage <= 75){
                    quizFeedback.style.color = 'orange';
                }
                else if(percentage > 75){
                    quizFeedback.style.color = 'green';
                }
                else{
                    quizFeedback.style.color = 'red';
                }
                quizFeedback.textContent = `Koniec quizu! Twój wynik: ${score} z ${totalRounds} (${percentage}%)`;
                resetQuizButton.style.display = 'block';
                return;
            }

            currentWord = words[Math.floor(Math.random() * words.length)];
            quizQuestion.textContent = `Podaj tłumaczenie słówka: ${currentWord.word}`;
            quizAnswer.value = '';
            quizRounds.textContent = `Runda: ${round + 1} z ${totalRounds}`;
        }

        // Sprawdzanie odpowiedzi
        submitAnswer.addEventListener('click', () => {
            const userAnswer = quizAnswer.value.trim().toLowerCase();
            const correctAnswer = currentWord.translation.trim().toLowerCase();

            if (userAnswer === correctAnswer) {
                quizFeedback.textContent = 'Dobrze!';
                quizFeedback.style.color = 'green';
                score++;
            } else {
                quizFeedback.textContent = `Źle. Poprawna odpowiedź to: ${currentWord.translation}`;
                quizFeedback.style.color = 'red';
            }

            quizScore.textContent = `Wynik: ${score}`;
            round++;
            nextQuestion();
        });

        // Resetowanie quizu
        resetQuizButton.addEventListener('click', () => {
            quizSection.style.display = 'none';
            quizFeedback.textContent = '';
            quizScore.textContent = '';
            quizRounds.textContent = '';
        });