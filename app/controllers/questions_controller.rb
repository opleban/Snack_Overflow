class QuestionsController < ApplicationController

  def new
    question = Question.new
  end

  def edit  

  end

  def index
    @questions = Question.all
  end
end
