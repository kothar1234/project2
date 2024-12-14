fetch('https://artificial-guru.github.io/students.json') // Koden säger att hämta information om 'student' från en extern källa (JSON-fil).
    .then(response => response.json()) //Koden här säger att när har du fått svar från servern, gör följande.
    .then(data => { // Koden säger när data har hämtats , kör följande kod
        document.getElementById('login').addEventListener('submit', function (event) { //hämta id som heter 'login' och en händelselyssnare för inloggning när formuläret skickas in
            event.preventDefault();
            // Hämta användarnamn och lösenord som användaren skriver in
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            let login = false; //en variabel för att hålla koll på om inloggningen lyckades eller misslyckades.
            for (let i = 0; i < data.length; i++) {  // Loopa igenom varje användare i användardatan
                if (username === data[i].login.username && password === data[i].login.password) { // Kontrollera om användarnamn och lösenord matchar en användare i datan.
                    // Om användarnamn och lösenord matchar, går användaren till kurssidan.
                    window.location.href = 'kurser.html';
                    login = true; // Markera att användaren hittades
                    break; // Avsluta loopen när användaren har hittats
                }
            }
            if (!login) {
                // Visa ett felmeddelande om användaren inte hittades
                alert("Incorrect username or password, please try again!");
            }
        });
    })
fetch('https://artificial-guru.github.io/courses.json')// Koden säger att hämta information om 'course' från en extern källa (JSON-fil).
    .then(response => response.json())//Koden här säger att när har du fått svar från servern, gör följande.
    .then(data => { // Koden säger när data har hämtats , kör följande kod

        data.forEach(course => { // loppar varje kurs 
            const courseListElement = document.getElementById('courseList');//skapar en variabel som heter courseListElement och lägger in courseList data i. 
            const courseElement = document.createElement('div'); //här skapar jag en div för varje kurs. 
            //här fyller jag in kursdata i den nya 'div' som jag skapade. 
            courseElement.innerHTML = `  
                <h3>Kursens ID: ${course.courseId}</h3>
                <p>Kursens namn: ${course.courseName}</p>
                <p>Poäng: ${course.credit}</p>
                <p>Skola: ${course.school}</p>
                <p>Startvecka: ${course.startWeek}</p>
                <p>Slutvecka: ${course.endWeek}</p>
                <p>Lärare: ${course.teachers}</p>
            `;
            courseListElement.appendChild(courseElement); //här lägger jag den nya div i den hmtl elementen 'courseList'
        });
    })
fetch('https://artificial-guru.github.io/quiz.json')// Koden säger att hämta information om 'quiz' från en extern källa (JSON-fil).
    .then(response => response.json())//Koden här säger att när har du fått svar från servern, gör följande.
    .then(data => {// Koden säger när data har hämtats , kör följande kod.
        data.forEach(question => { //// loppar varje frågan. 
            const quizContainer = document.getElementById('quiz');
            const questionDiv = document.createElement('div');   // Skapa en div för varje fråga
            questionDiv.classList.add('question');//Style til CSS
            const questionQuestion = document.createElement('h3');    // Skapa en rubrik för frågan
            questionQuestion.textContent = question.question;
            questionQuestion.classList.add('titel');
            questionDiv.appendChild(questionQuestion);
            const answerList = document.createElement('ul');      // Skapa en lista för svaren.
            const correctAnswerItem = document.createElement('li');        // Här lägger jag det korrekta svaret först.
            correctAnswerItem.textContent = question.correct_answer; //Här tar jag det rätta svaret på en fråga och skriverden på det HTML-element som jag skapade.
            answerList.appendChild(correctAnswerItem); // lägger det rätta svaret till 'i'  listan.
            question.incorrect_answers.forEach(incorrectAnswer => {    // Loopa igenom felaktiga svar och lägg till dem i listan
                const incorrectAnswerItem = document.createElement('li'); // Här lägger jag det fel svaret .
                incorrectAnswerItem.textContent = incorrectAnswer; // här tar jag felaktiva svaren och skriver den i sidan
                incorrectAnswerItem.classList.add('answer'); // här lägger jag en class för att style den felaktiva svaret i css. 
                answerList.appendChild(incorrectAnswerItem); // lägger de felaktiva svaret till 'i'  listan.
            });
            // Lägg till svarsalternativlistan till fråge diven
            questionDiv.appendChild(answerList); //lägger in svarlistan i div elementen. 
            // Lägg till fråge-diven till quizContainer
            quizContainer.appendChild(questionDiv);//här lägger jag in alla div elementen som innehåller svaret in i quiz element. 
        });
    })