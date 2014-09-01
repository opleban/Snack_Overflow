document.addEventListener('DOMContentLoaded', function(){
  controller = new QuestionShowController()
  controller.renderAnswerList()
  $(".submit_button").on('click', controller.renderNewAnswerList)
});

//QUESTION LIST MODEL
function QuestionList() {
  this.questionList = [];
}

QuestionList.prototype = {
  findByID: function(id) {
    for(i=0;i<this.questionList.length;i++) {
      if(questionList[i] == id) {return questionList[i]}
    }
  }
}

//QUESTION MODEL
function Question(JSONObject) {
  this.id = JSONObject.id;
  this.title = JSONObject.title
  this.body = JSONObject.body;
  this.score = JSONObject.score;
  this.user_id = JSONObject.user_id;
  this.answerList = [];
  this.commentList = [];
}

//ANSWER MODEL
function Answer(JSONObject) {
    this.id = JSONObject.id;
    this.body = JSONObject.body;
    this.score = JSONObject.score;
    this.user_id = JSONObject.user_id;
    this.question_id = JSONObject.question_id;
    this.commentList = [];
}


//ANSWER CONTROLLER
function QuestionShowController() {
  this.answerList = []
}

QuestionShowController.prototype = {

  renderAnswerList: function(event) {
    $.ajax({
      type: "GET",
      url: $(location).attr('href')+"/answers",
      dataType: 'JSON'
    }).done(function(answerJsonObjectsCollection) {
      controller.resetAnswerList()
      controller.populateAnswerList(answerJsonObjectsCollection)
      controller.displayAnswerList()
    })
  },

  renderNewAnswerList: function(event) {
    if(event) {event.preventDefault();}
    $.ajax({
      type: "POST",
      url: $(this).parents("form").attr('action'),
      data: $(this).parents("form").serialize(),
      dataType: 'JSON'
    }).done(function(answerJsonObjectsCollection) {
      controller.resetAnswerList()
      controller.populateAnswerList(answerJsonObjectsCollection)
      controller.displayAnswerList()
    })
  },

  populateAnswerList: function(answerCollection) {
    for(i=0;i<answerCollection.length;i++) {
      answerJSObject = new Answer(answerCollection[i])
      this.answerList.push(answerJSObject)
    }
  },

  displayAnswerList: function() {
    $(".answer_list").append('<h2>There are '+this.answerList.length+' answers</h2>')
    for(i=0;i<this.answerList.length;i++) {
      answerDiv = this.formatAnswerDiv(this.answerList[i])
      $(".answer_list").append(answerDiv)
    }
  },

  resetAnswerList: function() {
    this.answerList = []
    $(".answer_list").empty()
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
  }
}



