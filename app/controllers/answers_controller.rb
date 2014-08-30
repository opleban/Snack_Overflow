class AnswersController < ApplicationController
  def new
    @answer = Answer.new
    render :answer_form
  end

  def edit

  end

end
