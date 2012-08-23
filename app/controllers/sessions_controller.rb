class SessionsController < ApplicationController
  respond_to :json
  def new
  end
  
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.id
    respond_with(user, status: 200)
  end
   
  def destroy
    session[:user_id] = nil
    session[:current_identity] = nil
    redirect_to root_url
  end
   
  def failure
    redirect_to root_url, alert: "Authentication failed, please try again."
  end 
end