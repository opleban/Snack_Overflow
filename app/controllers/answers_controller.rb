class AnswersController < ApplicationController
  def new
  end

  def edit
  end

  def index
    @question = Question.find(params[:question_id])

    respond_to do |format|
      format.html { render :partial => "answers/show", :locals => { :question => @question } }
    end
  end

  def create
    p "made it to create action"
    @answer = Answer.create(answer_params)
    @question = Question.find(params[:question_id])
    @user = User.find(session[:user_id])
    @question.answers << @answer
    @user.answers << @answer

    respond_to do |format|
<<<<<<< HEAD
      format.html { redirect_to @question, notice: 'Answer was successfully created.' }
      format.json { render json: @answer }
=======
      format.html { render :partial => "answers/show", :locals => { :question => @question } }
>>>>>>> 9a81d1b09017138a23f4f60c8837343983554fe7
    end
  end

  def answer_params
    params.require(:answer).permit(:body,:score,:user_id,:question_id,:id)
  end

end
