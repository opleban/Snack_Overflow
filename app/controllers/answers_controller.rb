class AnswersController < ApplicationController
  def new
  end

  def edit
  end

  def create
    @question = Question.find(params[:question_id])
    @question.answers << Answer.create(answer_params)
    redirect_to(question_path(@question))
  end

  def answer_params
    params.require(:answer).permit(:name, :username,
                                 :email, :password)
  end

end
