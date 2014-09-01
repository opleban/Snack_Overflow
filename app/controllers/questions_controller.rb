class QuestionsController < ApplicationController

  def new
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers
  end

  def index
    @sorted_questions = Question.all.order(:score)
  end

end
