class UsersController < ApplicationController
  respond_to :json, :html
  def new
    @user = User.new
  end

  def create
    @user = User.new(params[:user])
    if @user.save
      respond_with(@user, :notice => "Signed Up!")
    else
      respond_with(@user, :error => 422)
    end
  end
end
