class UsersController < ApplicationController
  respond_to :json, :html
  def new
    @user = User.new
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
