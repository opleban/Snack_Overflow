class SessionsController < ApplicationController

  def new

  end

  def show 

  end

  def create
    user = User.find_by(username: params[:session][:username].downcase)
    if user && user.password == params[:session][:password]
      session[:user_id] = user.id
      redirect_to user
    else
      flash.now[:error] = 'Invalid email/password combination'
      render 'new'
    end
  end


  def destroy
    session[:user_id]  = nil
    p session[:user_id]
    flash[:success] = "Successfully logged out."
    redirect_to root_path
  end



end