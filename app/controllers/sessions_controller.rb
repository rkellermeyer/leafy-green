class SessionsController < ApplicationController
  
  def new
  end
  
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.uid
    redirect_to root_url
  end

  def destroy
    session[:user_id] = nil
    session[:current_identity] = nil
    redirect_to root_url, :notice => "Logged out!"
  end
   
  def failure
    redirect_to root_url, alert: "Authentication failed, please try again."
  end
  
end