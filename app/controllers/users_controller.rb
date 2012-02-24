class UsersController < ApplicationController
  respond_to :json, :html
  def new
    @user = User.new
  end
  
  def index
   @users = User.search(params[:search])
  end

  def search
    @users = User.search(params[:search])
    respond_to do |format|
       	format.html { redirect_to "/users?search="+params[:search] }
       	format.json { render json: @users }
    end
  end
  
  def show
    @user = User.find(params[:id])
    respond_with(@user, :notice => 200)
  end

  def create
    @user = User.new(params[:user])
    @user.categories = params[:categories]
    if @user.save
      respond_with(@user, :notice => "Signed Up!")
    else
      respond_with(@user, :error => 422)
    end
  end
end
