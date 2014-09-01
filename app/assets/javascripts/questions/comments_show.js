$(document).ready(function(){

// JQUERY ELEMENTS
  var qPage = {
    newCommentSubmit: $(".new_comment input[type='submit']"),
    commentTemplate: $("#comment-template")
  }

// VIEW FUNCTIONS
  var qPageView = {
    toggleCommentFormDisplay: function(e){
      var commentButton = $(e.target);
      var commentForm = $(e.target).siblings(".comment-form");
      commentForm.slideToggle();
      if (commentForm.css("display") === "none")
        commentButton.html("Hide comment form");
      else
        commentButton.html("Comment");
    },

    toggleCommentsListDisplay:function(e){
      $(e.target).siblings(".comments-list").slideToggle();
      if ($(e.target).html() == "Show comments")
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
    }
  };

//CONTROLLER FUNCTIONS
  qPageController = {
    bindEvents: function(){
      this.addCommentButtonEventListener();
      this.addCommentSubmitEventListener();
      this.addCommentViewEventListener();
    },

    addCommentButtonEventListener: function(){
      $(".comment-button").on("click", qPageView.toggleCommentFormDisplay);
    },

    addCommentSubmitEventListener: function(){
      $(".new_comment input[type='submit']").on("click", this.createAndRenderComment);
    },

    addCommentViewEventListener: function(){
      $(".expand-comments-list").on("click", qPageView.toggleCommentsListDisplay);
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
}

  qPageController.bindEvents();
});




