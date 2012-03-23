class SessionsController < ApplicationController
  
  def new
  end
  
  def create
    user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.uid
    #redirect_to root_url
    
    
       respond_to do |format|
           # format.html { redirect_to root_url}
           format.json { render json: user, status: "logged In", location: root_url }
	    end
  end
  
   def callback
   user = User.from_omniauth(env["omniauth.auth"])
    session[:user_id] = user.uid
        respond_to do |format|
           format.html { redirect_to root_url}
           format.json { render json: user, status: "logged In", location: root_url }
	    end
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