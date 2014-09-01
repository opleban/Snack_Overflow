$(document).on('ready page:load', function(){
  if (window.location.href.match(/\/questions\//) != null) {
    controller = new QuestionShowController()
    controller.renderAnswerList()
    $(".submit_button").on('click', controller.renderNewAnswerList)
  }
})

//ANSWER MODEL
function Answer(JSONObject) {
    this.id = JSONObject.id;
    this.body = JSONObject.body;
    this.score = JSONObject.score;
    this.user_id = JSONObject.user_id;
    this.question_id = JSONObject.question_id;
    this.commentList = [];
}


//CONTROLLER+VIEW TO POPULATE ANSWERS W/ ATTACHED COMMENTS
function QuestionShowController() {
  this.question_id = $(location).attr('href').match(/^d/);
  this.question = questionList.findByID(this.question_id);
}

QuestionShowController.prototype = {

<<<<<<< HEAD
  bindNewAnswerListener: function(event){
    $(".submit_button").on('click', questionShowController.renderNewAnswerList)
=======
  renderAnswerList: function() {
    $.ajax({
      type: "GET",
      url: $(location).attr('href')+"/answers",
      dataType: 'HTML'
    }).done(function(partial) {
      $(".answer-list").html(partial)
      qPageController.bindEvents()
    })
>>>>>>> 9a81d1b09017138a23f4f60c8837343983554fe7
  },

  renderNewAnswerList: function(event) {
    console.log("insider renderNewAnswerList")
    if(event) {event.preventDefault();}
    $.ajax({
      type: "POST",
      url: $(this).parents("form").attr('action'),
      data: $(this).parents("form").serialize(),
<<<<<<< HEAD
      dataType: 'JSON'
    }).done(function(answerJsonObject) {
      questionShowController.addAnswerToAnswerList(answerJsonObject)
      questionShowController.sortAnswerList()
      questionShowController.displayAnswerList()
    })
  },

  addAnswerToAnswerList: function(answerJsonObject) {
    var answerJSObject = new Answer(answerJsonObject)
    this.question.questionList.push(answerJSObject)
  },

  sortAnswerList: function() {
    this.question.answerList.sort(compare)
    function compare(a,b) {
      if (a.score < b.score)
         return -1;
      if (a.score > b.score)
        return 1;
      return 0;
    }
  },

  displayAnswerList: function() {
    $(".answer_list").append('<h2>There are '+this.question.answerList.length+' answers</h2>')
    for(i=0;i<this.question.answerList.length;i++) {
      answerDiv = this.formatAnswerDiv(this.question.answerList[i])
      $(".answer_list").append(answerDiv)
    }
  },

  formatAnswerDiv: function(answer){
    var thisAnswer = {
      "body": answer.body,
      "score": answer.score,
    }
    var answerMainTemplate = "<div class='answer_main'>{{body}}</div>";
    var answerMainHtml = Mustache.to_html(answerMainTemplate, thisAnswer);
    var answerLeftTemplate = "<div class='answer_left'>{{score}}</div>";
    var answerLeftHtml = Mustache.to_html(answerLeftTemplate, thisAnswer);
    var answerContent = [
                    "<div class='answer-div'>",
                    answerMainHtml,
                    answerLeftHtml,
                    "</div>"
                  ]
    return answerContent.join("")
=======
      dataType: 'HTML'
    }).done(function(partial) {
      console.log("success")
      $(".answer-list").html(partial)
      qPageController.bindEvents()
    })
>>>>>>> 9a81d1b09017138a23f4f60c8837343983554fe7
  }
}



