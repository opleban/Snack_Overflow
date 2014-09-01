class CommentsController < ApplicationController
  def new
    @comment = Comment.new
  end

  def edit

  end

  def create

    @post = post
    comment = Comment.create(comment_params)
    @post.comments << comment
    redirect_to :back
  end

  private
  def comment_params
    params.require(:comment).permit(:body)
  end

  def post
    if params[:post_type] == "question"
      Question.find(params[:question_id])
    else
      Answer.find(params[:answer_id])
    end
  end

end
