if (window.location.href.match(/questions/) != null) {
  document.addEventListener('DOMContentLoaded', function(){
    console.log("inside addEventListener")
    questionList = new QuestionList()
    questionIndexController = new QuestionIndexController()
    questionIndexController.renderQuestionList()
  });
}

function QuestionIndexController() {}

QuestionIndexController.prototype = {
  renderQuestionList: function() {
    $.ajax({
      type: "GET",
      url: "/questions",
      dataType: 'JSON'
    }).done(function(questionJsonObjectsCollection) {
      console.log("success")
      this.resetQuestionList()
      this.populateQuestionList(questionJsonObjectsCollection)
      this.displayQuestionList()
    }.bind(this))
  },

  resetQuestionList: function() {
    questionList = []
    $(".question_list").empty()
  },

  populateQuestionList: function(questionCollection) {
    for(i=0;i<questionCollection.length;i++) {
      questionJSObject = new Question(questionCollection[i])
      questionList.push(questionJSObject)
    }
  },

  displayQuestionList: function() {
    $(".question_list").append('<h2>There are '+questionList.length+' questions</h2>')
    for(i=0;i<questionList.length;i++) {
      questionDiv = this.formatQuestionDiv(questionList[i])
      $(".question_list").append(questionDiv)
    }
  },

  formatQuestionDiv: function(question){
    var thisQuestion = {
      "title": question.title,
      "body": question.body,
      "score": question.score,
    }
    var questionMainTemplate = "<div class='question_main'>{{title}} {{body}} </div>";
    var questionMainHtml = Mustache.to_html(questionMainTemplate, thisQuestion);
    var questionLeftTemplate = "<div class='question_left'>{{score}}</div>";
    var questionLeftHtml = Mustache.to_html(questionLeftTemplate, thisQuestion);
    var questionContent = [
                    "<div class='question-div'>",
                    questionMainHtml,
                    questionLeftHtml,
                    "</div>"
                  ]
    return questionContent.join("")
  }
}

if (window.location.href.match(/\/questions\//) != null) {
  document.addEventListener('DOMContentLoaded', function(){
    questionShowController = new QuestionShowController()
    questionShowController.displayAnswerList()
    questionShowController.bindNewAnswerListener()
  });
}

//QUESTION LIST MODEL
function QuestionList() {
  this.all = [];
}

QuestionList.prototype = {
  findByID: function(id) {
    for(i=0;i<this.all.length;i++) {
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
  this.question_id = $(location).attr('href').match(/^d/);
  this.question = questionList.findByID(this.question_id);
}

QuestionShowController.prototype = {

  bindNewAnswerListener: function(event){
    $(".submit_button").on('click', questionShowController.renderNewAnswerList)
  },

  renderNewAnswerList: function(event) {
    if(event) {event.preventDefault();}
    $.ajax({
      type: "POST",
      url: $(this).parents("form").attr('action'),
      data: $(this).parents("form").serialize(),
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
  }
}



