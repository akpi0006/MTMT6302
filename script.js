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
                <input type="checkbox" class="ans" data-answ="answer_a" name="question1" value="var">${questions[0].answers.answer_a}
            </li>
            <li>
                <input type="checkbox" class="ans" data-answ="answer_b" name="question1" value="let">${questions[0].answers.answer_b}
            </li>
            <li>
                <input type="checkbox" class="ans" data-answ="answer_c" name="question1" value="const">${questions[0].answers.answer_c}
            </li>
            <li>
                <input type="checkbox" class="ans" data-answ="answer_d" name="question1" value="variable"> ${questions[0].answers.answer_d}
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
            <button class="submit">Submit Answers</a></button>
        </div>`

  //use innerHTML to display the data in the container
container.innerHTML = questionTemplate;
}
// const nextQuestion = document.querySelector(".next");


/*** async / await */
async function getQuestions(difficulty){
    const response =  await fetch(`https://quizapi.io/api/v1/questions?apiKey=fIzlzqCAAPKQnXiToNo61XYMfZmRhDdhEseZCtMj&limit=10&difficulty=${difficulty}`)
    const question = await response.json()
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
    else if(e.target.classList.contains('ans')){
        console.log(e.target.dataset.answ)
        const selectedAnswer = e.target.dataset.answ;
        const selectedQuestion = questions[0].question;
        saveAnswer(selectedQuestion, selectedAnswer);
        // Proceed to the next question
    }
    else if(e.target.classList.contains('submit')){
        displayResults()
    }
    else if(e.target.classList.contains('retake')){
        buildHome()
    }
    //1. save answers, question in local storage
    function saveAnswer(question, answer) {
        let savedAnswers = JSON.parse(localStorage.getItem('savedAnswers')) || {};
        savedAnswers[question] = answer;
        localStorage.setItem('savedAnswers', JSON.stringify(savedAnswers));
    }  

    //2. display the next question
    function displayNextQuestion() {
       const nextQuestion = {}; 
        buildQuestion(nextQuestion);
    }
    //3. display the results
        function displayResults() {
        const savedAnswers = JSON.parse(localStorage.getItem('savedAnswers'));
        let correctAnswersCount = 0;
        for (let question in savedAnswers) {
            if (savedAnswers[question] === questions[0].correct_answer) {
                correctAnswersCount++;
            }
        }
        container.innerHTML = `
        <div class="flex-container">
            <section class="act">
    <div class="start">
         
        <div class="gradebox">
            <div>
                <span>
                    <div class="gradeline">Grade</div>
                    <br>
                     
                     You correctly answered ${correctAnswersCount} out of ${questions.length} questions
                  </span>
            </div>
        </div>

</div>

<div class="sa">
    <button class="retake">Retake Quiz</a></button>
</div>

`

  }
})
  
function buildHome(question){
    const homeTemplate =` 
    <div class="begin">

            <div class="intro">
                <p>Welcome to <strong>Quiz Me!</strong></ps>
                    <p>
                        The ultimate trivia challenge that will <br>
                        test your knowledge across various categories   and <br> keep you entertained <br> with fun and engaging questions!
                    </p> 
                </div>
    </div>
<br>
    <div class="start">
        <p>Pick your quiz difficulty and dive <br> into the perfect challenge !!</p>
        <br>
      
        <div class="options">
            <h3 class="pickone pickonebtn" data-difficulty="easy" >
             Easy
            </h3>
            <h3 class="pickone pickonebtn " data-difficulty="medium">
              Intermediate
            </h3>
            <h3 class="pickone pickonebtn" data-difficulty="hard">
              Hard
            </h3>
        </div>
    </div>
`
container.innerHTML =homeTemplate;

}
