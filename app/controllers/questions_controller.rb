class QuestionsController < ApplicationController

  def new
  end

<<<<<<< HEAD
  def index
    @sorted_questions = Question.all.order(:score)
    respond_to do |format|
      format.html {}
      format.json { render json: @sorted_questions }
    end
  end

  def show
    @question = Question.find(params[:id])
=======
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
>>>>>>> 9a81d1b09017138a23f4f60c8837343983554fe7
  end

end
