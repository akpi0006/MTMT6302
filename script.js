//API key: fIzlzqCAAPKQnXiToNo61XYMfZmRhDdhEseZCtMj

//target container using  getelementbyid
const container = document.getElementById("container");
const $nextquestion = document.querySelector('.next')
const $saved = document.getElementById('saved')


// Define the quiz questions and answers
let questions = [];
//create the html template for the question and answers

function buildQuestion(question){
const questionTemplate = ` 
<section class="act">
            <p>Level: ${questions[0].difficulty}</p>  
<br>
     
<section class="que">
<form id="quizForm">
    <ol class="qanda">
        <h3 class="questions">
            <p class="question-number">Question</p> 
            <br>
            <p>${questions[0].question}</p>
            <br>


            <div class="qoptions">
            <li>
                <input type="checkbox" name="question1" value="var">${questions[0].answers.answer_a}
            </li>
            <li>
                <input type="checkbox" name="question1" value="let">${questions[0].answers.answer_b}
            </li>
            <li>
                <input type="checkbox" name="question1" value="const">${questions[0].answers.answer_c}
            </li>
            <li>
                <input type="checkbox" name="question1" value="variable"> ${questions[0].answers.answer_d}
            </li>
      

            <hr>

            <div class="nq">
                <button data-difficulty = "${questions[0].difficulty}" class="next">Next Question</button>
            </div>
          </div>
        
        
          <br>

        </h3>
    </ol>

</form>
  </section>

  <div class="sa">
            <button class="submit"><a href="hard-answers.html">Submit Answers</a></button>
        </div>`

  //use innerHTML to display the data in the container
container.innerHTML = questionTemplate;
}
// const nextQuestion = document.querySelector(".next");


/*** async / await */
async function getQuestions(difficulty){
    const response =  await fetch(`https://quizapi.io/api/v1/questions?apiKey=fIzlzqCAAPKQnXiToNo61XYMfZmRhDdhEseZCtMj&limit=5&difficulty=${difficulty}`)
    question = await response.json()
    console.log(question)
    questions = question
    buildQuestion(question)
    // $question.innerHTML = html.join('')
}

//define the function to display the next question using event listener

/** Define the event listener for the click events */
container.addEventListener('click', function(e){
    e.preventDefault()
   
  if(e.target.classList.contains('pickone')){
    getQuestions(e.target.dataset.difficulty)
    
    }
   else if(e.target.classList.contains('next')){
    getQuestions(e.target.dataset.difficulty)
        console.log('clicked')
    }

})


//show only 10 questions and enable the user to select only one answer per question

// function displayResults() {
//     quizContainer.classList.add('hidden');
//     navigation.classList.add('hidden');
//     resultsDiv.classList.remove('hidden');
//     resultsDiv.innerHTML = <p>You correctly answered ${correctAnswersCount} out of ${questions.length} questions.</p>;
// }


//track the number of correct and incorrect answers and store them in local storage. You need to implement this functionality. You can use localStorage.setItem() to store values and localStorage.getItem() to retrieve them.
