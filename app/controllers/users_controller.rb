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
    @user = User.find(params[:id])
    # if @user.password == params[:user][:password] && @user.update_attributes(user_params) 
    #   flash[:success] = 'User successfuly updated.'
    #   redirect_to @user
    # else
    #   flash.now[:error] = 'Invalid password. Failed to update.'
    #   render 'show'
    # end
    respond_to do |format|
      if @user.password == params[:user][:password] && @user.update_attributes(user_params) 
        format.html { redirect_to @user, notice: 'User was successfully updated.' }
        format.json { render json: @user, notice: 'User updated.' }
      else
        format.html { render action: "show" }
        format.json { render json: {:error => "Invalid Password"} }
      end
    end
  end

  private 

    def user_params
      params.require(:user).permit(:name, :username, 
                                   :email, :password)                           
    end

end