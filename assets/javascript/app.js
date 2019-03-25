$(document).ready(function(){
    $("#start-button").on("click", gameState.startTimer);
});

var gameState = {
    timeRemaining : 60,

    startTimer: function() {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },

    countdown: function() {
        gameState.timeRemaining--;
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        if(gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    stopTimer: function() {
        clearInterval();
        trivia.checkAnswers();
    },
     showEndPage: function(numCorrect, numIncorrect, numUnanswered) {
         $("#end-page").show();
         $("#question-box").empty();
         $("#timer").empty();
         $("#timer").hide();
         $("#correct-answers").text("Correct answers: " + numCorrect);
         $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
         $("#unanswered").text("Skipped questions: " + numUnanswered);
     }
}

var trivia = {
    displayQuestions: function() {
        var divContainer = $("#question-box");
        divContainer.append('<h2>Answer the following questions:</h2>');

        for ( var i = 0; i < questionBank.length; i++) {
            divContainer.append('<div id="question">' + questionBank[i].question + '</div>');

            var answer1 = questionBank[i].answers[0];
            var answer2 = questionBank[i].answers[1];
            var answer3 = questionBank[i].answers[2];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group'+i+'" id="radio'+i+'"><label class="form-check-label" id="radio'+i+'label" for="radio'+i+'">' + answer3 + '</label></div>');
        }
            var doneButton = '<button class="btn btn-outline-light" id="done-button" type="submit">Done</button>';
            divContainer.append(doneButton);
            $("#done-button").on("click", gameState.stopTimer);
        },

        checkAnswers: function() {
         var correctAnswer;
         var userAnswer;
         var numCorrect = 0;
         var numIncorrect = 0;
         var numUnanswered = 0;

         for ( var i = 0; i < questionBank.length; i++) {
             correctAnswer = questionBank[i].correct;
             userAnswer = $('input[id=radio' + i +']:checked + label').text();

             if ( userAnswer === correctAnswer) {
                 numCorrect++;
             } else if (userAnswer === "") {
                 numUnanswered++;
             } else if (userAnswer !== correctAnswer) {
                 numIncorrect++;
             }
         }
        

        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);
    },
}

var questionBank =
      [
        {
          question: "Who is Luke Skywalker's father:",
          answers: ["Darth Maul", "Darth Sidious", "Darth Vader"],
          correct: "Darth Vader"
        },
      
        {
          question: "Luke Skywalker flys a:",
          answers: ["Y-Wing", "X-Wing", "A-Wing"],
          correct: "X-Wing"
        },
        {
          question: "Jabba the:",
          answers: ["Hutt", "Gutt", "Butt"],
          correct: "Hutt"
        },
        {
          question: "Who shot first?",
          answers: ["Chewbacca", "Greedo", "Han"],
          correct: "Han"
        },
        {
          question: "Chewbacca is a:",
          answers: ["Spookie", "Hookie", "Wookie"],
          correct: "Wookie"
        },
        {
          question: "Han and Chewbacca fly the:",
          answers: ["Millennium Falcon", "Aluminum Falcon", "Centennial Phoenix"],
          correct: "Millennium Falcon"
        },
        {
          question: "A Jedi sword is called:",
          answers: ["A life saver", "A Lightsaber", "A little safer"],
          correct: "A Lightsaber"
        }
        
      ]