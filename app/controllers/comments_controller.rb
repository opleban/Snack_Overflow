class CommentsController < ApplicationController
  def new
  end

  def edit

  end

  def create
    @post = post
    user = User.find(session[:user_id])
    comment = Comment.new(comment_params)
    comment.user_id = user.id
    respond_to do |format|
      if comment.save
        @post.comments << comment if comment.save
        format.html { redirect_to :back}
        format.json { render json: {comment:comment, user:user}, status: :created }
      else
        format.html { redirect_to :back, notice: 'Comment was unsuccessfully created.' }
        format.json { render json: comment.errors.full_messages.join, status: :unprocessable_entity }
      end
    end
  end

  private
  def comment_params
    params.require(:comment).permit(:body, :user_id)
  end

  def post
    if params[:post_type] == "question"
      Question.find(params[:question_id])
    else
      Answer.find(params[:answer_id])
    end
  end

end
