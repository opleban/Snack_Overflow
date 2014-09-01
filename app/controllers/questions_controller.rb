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

  def update
    @question = Question.find(params[:id])
    if params[:voteType] == "up"
      @question.score += 1
    else
      @question.score -= 1
    end
    @question.save
    respond_to do |format|
      format.json { render json: {score:@question.score}, status: :ok}
    end
  end

  def question_params
    params.require(:question).permit(:title,:body,:score,:user_id,:id,:score)
  end

end