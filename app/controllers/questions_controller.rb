class QuestionsController < ApplicationController

  def new
  end

  def create
    @question = Question.create(question_params)
    @user = User.find(session[:user_id])
    @user.questions << @question
    redirect_to(@question)
  end

  def show
    @question = Question.find(params[:id])
    @answers = @question.answers
  end

  def index
    @sorted_questions = Question.all.order(:score)
  end

  def question_params
    params.require(:question).permit(:title,:body,:score,:user_id,:id)
  end

end