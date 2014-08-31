$(".new_answer").on('click', renderNewAnswers.bind($(this)))

function AnswerController() {}

AnswerController.prototype = {
  renderNewAnswers: function() {
    console.log(this.url)
    $.ajax({
      type: "POST",
      url: this.url,
      data: this.serialize(),
      dataType: 'JSON'
    }).done(function(jsonCollectionObject)) {
      jsonCollectionObject
    }

  }
}

function Answer(args) {
    this.body = args[:body]
    this.body = args[:body]
    this.body = args[:body]
    this.body = args[:body]
    t.integer :score, :default => 0
    t.integer :user_id
    t.integer :question_id
}
