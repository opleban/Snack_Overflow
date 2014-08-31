class AnswersController < ApplicationController
  def new
  end

  def edit
  end

  def create
    #Add new answer to db
    @answer = Answer.create(answer_params)
    @question = Question.find(params[:question_id])
    @user = User.find(session[:user_id])
    @question.answers << @answer
    @user.answers << @answer

    #Prepare sorted answer list to be returned in response
    @sorted_answers = @question.answers.order(:score)

    respond_to do |format|
      if Answer.find(@answer.id)
        format.html { redirect_to @question, notice: 'Answer was successfully created.' }
        format.json { render json: @sorted_answers }
      else
        format.html { redirect_to @question, notice: 'Answer was not created.'  }
        format.json { render json: @answer.errors, status: :unprocessable_entity }
      end
    end
  end

  def answer_params
    params.require(:answer).permit(:body,:score,:user_id,:question_id,:id)
  end

end
