document.addEventListener('DOMContentLoaded', function(){
  controller = new QuestionShowController()
  controller.renderAnswerList()
  $(".submit_button").on('click', controller.renderNewAnswerList)
});

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
  this.answerList = []
}

QuestionShowController.prototype = {

  renderAnswerList: function(event) {
    $.ajax({
      type: "GET",
      url: $(location).attr('href')+"/answers",
      dataType: 'HTML'
    }).done(function(partial) {
      $(".answer-list").html(partial)
      qPageController.bindEvents()
    })
  },

  renderNewAnswerList: function(event) {
    console.log("insider renderNewAnswerList")
    if(event) {event.preventDefault();}
    $.ajax({
      type: "POST",
      url: $(this).parents("form").attr('action'),
      data: $(this).parents("form").serialize(),
      dataType: 'HTML'
    }).done(function(partial) {
      console.log("success")
      $(".answer-list").html(partial)
      qPageController.bindEvents()
    })
  }
}



