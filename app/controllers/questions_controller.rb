class QuestionsController < ApplicationController

  def new
  end

  def index
    @sorted_questions = Question.all.order(:score)
    respond_to do |format|
      format.html {}
      format.json { render json: @sorted_questions }
    end
  end

  def show
    @question = Question.find(params[:id])
  end

end
