require "authentication"
 
class ApplicationController < ActionController::Base
  protect_from_forgery
  helper_method :current_user1

 
  private
  def current_user1
    @current_user1 ||= User.find(session[:user_id]) if session[:user_id]
  end
  
  rescue_from FbGraph::Exception, :with => :fb_graph_exception

  def fb_graph_exception(e)
    flash[:error] = {
      :title   => e.class,
      :message => e.message
    }
    current_user.try(:destroy)
    redirect_to root_url
  end
  
  
end
