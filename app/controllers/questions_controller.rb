class QuestionsController < ApplicationController

  def new
    @question = Question.new
    render :index_form
  end

  def show

  end

  def index
    @questions = Question.all
  end
end
