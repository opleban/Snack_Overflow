class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
  end

  def new
   @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to the Sample App!"
      session[:user_id] = @user.id
      p session[:user_id]
      redirect_to @user
    else
      render 'new'
    end
  end

  def create

  end

  def 

end