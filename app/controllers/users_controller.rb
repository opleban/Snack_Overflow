class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
  end

  def new
    @user = User.new
  end

  def create
   @user = User.new(user_params)
    if @user.save
      flash[:success] = "Welcome to the Sample App!"
      session[:user_id] = @user.id
      redirect_to @user
    else
      render 'new'
    end
  end

  def update
    p params["user"]["password"]
    @user = User.find(params[:id])
    if @user.password == params[:user][:password]
      @user.update_attributes(user_params)
      redirect_to @user
    else
      render 'show'
    end
  end

  private 

    def user_params
      params.require(:user).permit(:name, :username, 
                                   :email, :password)                           
    end

end