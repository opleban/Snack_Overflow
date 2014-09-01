$(document).ready(function(){

// JQUERY ELEMENTS
  var qPage = {
    newCommentSubmit: $(".new_comment input[type='submit']"),
    commentTemplate: $("#comment-template")
  }

// VIEW FUNCTIONS
  var qPageView = {
    toggleAnswerCommentFormDisplay: function(e){
      var answerCommentButton = $(e.target);
      var answerCommentForm = $(e.target).siblings(".answer-comment-form");
      if (answerCommentForm.css("display") === "none"){
        answerCommentForm.slideToggle();
        answerCommentButton.html("Hide comment form");
      }
      else{
        answerCommentForm.slideToggle();
        answerCommentButton.html("Comment");
      }
    },

    toggleQuestionCommentFormDisplay: function(e){
      var questionCommentButton = $(e.target);
      var questionCommentForm = $(".question-comment-form");
      if (questionCommentForm.css("display") === "none"){
        questionCommentForm.slideToggle();
        questionCommentButton.html("Hide comment form");
      }
      else{
        questionCommentForm.slideToggle();
        questionCommentButton.html("Comment");
      }
    },

    toggleCommentsListDisplay:function(e){
      $(e.target).siblings(".comments-list").slideToggle();
      if ($(e.target).html() === "Show comments")
        $(e.target).html("Hide comments");
      else
        $(e.target).html("Show comments");
    },

      // RENDERS NEW COMMENT USING doT TEMPLATE
    renderNewComment: function(comment_data){
      var commentTemplate = qPage.commentTemplate.html();
      var compiledTemplate = doT.template(commentTemplate)
      var comment = compiledTemplate({comment:comment_data.comment, user:comment_data.user});
      if (comment_data.comment.feedback_type === "Question")
        container = ".question-comments-list"
      else
        container = ".answer-comments-list-"+ comment_data.comment.feedback_id
      $(container).append(comment);
    },

    clearCommentFormText: function(eventTarget){
      eventTarget.siblings("textarea").val("")
    },

    renderVoteCount:function(data){
      $(".question-score").html(data.score)
    }
  };

//CONTROLLER FUNCTIONS
  qPageController = {
    bindEvents: function(){
      this.addQuestionCommentButtonEventListener();
      this.addAnswerCommentButtonEventListener();
      this.addCommentSubmitEventListener();
      this.addCommentViewEventListener();
      this.addVoteArrowsEventListener();
    },

    unbindAll: function(){
      $(".comment-button").off();
      $(".new_comment input[type='submit']").off();
      $(".expand-comments-list").off();
      $(".question-comment-button").off();
      $(".up-vote").off();
      $(".down-vote").off();
    },

    addAnswerCommentButtonEventListener: function(){
      $(".comment-button").on("click", qPageView.toggleAnswerCommentFormDisplay);
    },

    addCommentSubmitEventListener: function(){
      $(".new_comment input[type='submit']").on("click", this.createAndRenderComment);
    },

    addCommentViewEventListener: function(){
      $(".expand-comments-list").on("click", qPageView.toggleCommentsListDisplay);
    },

    addQuestionCommentButtonEventListener: function(){
      $(".question-comment-button").on("click", qPageView.toggleQuestionCommentFormDisplay);
    },
    addVoteArrowsEventListener: function(){
      $(".up-vote").on("click", this.vote);
      $(".down-vote").on("click", this.vote);
    },

    vote:function(e){
      var id = $(e.target).parents(".vote-arrows").attr("id");
      if ($(e.target).attr("class").match(/up/))
        var voteType = "up";
      else
        voteType = "down";
      var voteAjax = $.ajax({
        url:"/questions/"+ id +".json",
        method:"put",
        dataType:"json",
        data: {voteType:voteType, id:id}
      }).
      done(qPageView.renderVoteCount);
    },

// MAKES AJAX POST REQUEST THEN CALLS VIEW FUNCTION TO RENDER THE COMMENT
// ON THE PAGE USING doT TEMPLATE. SEE questions/views/show.html.erb FOR doT SCRIPT AT THE BOTTOM OF THE PAGE.
  createAndRenderComment: function(e){
    e.preventDefault();
    var commentCreateAjax = $.ajax({
      url: $(this).parents().attr("action") + ".json",
      method:"post",
      dataType:"json",
      data: $(this).parents("form").serialize()
    }).
    done(qPageView.renderNewComment).
    fail(function(data){
      alert("Error: " + data.responseText + ".");
    })
    qPageView.clearCommentFormText($(e.target));
  }
};

  // qPageController.bindEvents();
});




