$(".new_answer").on('click', renderNewAnswerList.bind($(this)))

function AnswerController() {
  this.answerList = [];
}

AnswerController.prototype = {

  renderNewAnswerList: function() {
    console.log(this.url)
    $.ajax({
      type: "POST",
      url: this.url,
      data: this.serialize(),
      dataType: 'JSON'
    }).done(function(data)) {
      var answerJsonObjectsCollection = JSON.parse(data)
      this.populateAnswerList(answerJsonObjectsCollection)
      this.renderAnswerList()
    }
  },

  populateAnswerList: function(answerCollection) {
    for(i=0;i<answerCollection.length;i++) {
      answerJSObject = new Answer(answerCollection[i])
      this.answerList.push(answerJSObject)
    }
  },

  renderAnswerList: function() {
    for(i=0;i<this.answerList.length;i++) {
      answerULElement = formatAnswerULElement(this.answerList[i])
      $(".answer_list").append(answerULElement)
    }
  },

  formatAnswerULElement: function(answer){
<ul class="question-item">
      <div class="question_title">
        <li class="question-category">Answers: <%= question.answers.count  %></li>
        <li class="question-category">Score: <%= question.score %></li>
        <li class="question-category">Question: <%= link_to(question.title, question) %></li>
      </div>
      <div>
        <li class="question-category">Asked By: <%= link_to(question.user.username,question.user) %> </li>
        <li class="question-category"><%= Time.at(question.created_at).to_time.strftime('%v %r') %></li>
      </div>
    </ul>
    var thisAnswer = {
      "body": answer.body,
      "score": answer.score,
      "address": [
        {"addr": vendor.city},
        {"addr": vendor.country},
        {"addr": vendor.postalcode}
      ]
    }

    var vendorNameTemplate = "<div class='vendor-name'>{{name}}</div>";
    var vendorNameHtml = Mustache.to_html(vendorNameTemplate, thisVendor);
    var vendorPriceTemplate = "<div class='vendor-price'>{{price}}</div>";
    var vendorPriceHtml = Mustache.to_html(vendorPriceTemplate, thisVendor);
    var addressList = "<ul class='address'>{{#address}}<li class='address-part'>{{addr}}</li>{{/address}}</ul>";
    var vendorAddressHtml = Mustache.to_html(addressList, thisVendor);
    var vendorPopupContent = [
                    "<div class='"+type+"'>",
                    vendorNameHtml,
                    vendorPriceHtml,
                    vendorAddressHtml,
                    vendor.telephone,
                    "</div>"
                  ]
    return vendorPopupContent.join("")
  }
}

function Answer(JSONObject) {
    this.id = JSONObject[:id];
    this.body = JSONObject[:body];
    this.score = JSONObject[:score];
    this.user_id = JSONObject[:user_id];
    this.question_id = JSONObject[:question_id];
}
