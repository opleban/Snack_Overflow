class QuestionsController < ApplicationController

  def new
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers
  end

  def index
    @questions = Question.all
  end

end
