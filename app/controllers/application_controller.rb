require "authentication"
require 'twitter'
class ApplicationController < ActionController::Base
 # protect_from_forgery
  helper_method :current_user1
  helper_method :flickr

  
  private
  def current_user1
    @current_user1 ||= User.find_by_uid(session[:user_id]) if session[:user_id]
  end

  
   def current_identity1
    @current_identity1 ||= Identity.find_by_id(session[:user_id]) if session[:user_id]
  end
  
  def login_required
    redirect_to root_path, :notice => "You must be logged in ." if !logged_in?
  end
  
  def logged_in?
    !!current_user1
  end
  
  
   helper_method :logged_in?

  helper_method :current_identity1
  
  rescue_from FbGraph::Exception, :with => :fb_graph_exception

  def fb_graph_exception(e)
    flash[:error] = {
      :title   => e.class,
      :message => e.message
    }
    current_identity.try(:destroy)
    redirect_to root_url
  end
  
  
end
