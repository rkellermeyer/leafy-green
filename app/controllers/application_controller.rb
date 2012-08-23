require 'anemone'
require 'authentication'
require 'juggernaut'
require 'twitter'

class ApplicationController < ActionController::Base
  #protect_from_forgery
  helper_method :current_user
  helper_method :flickr
  helper_method :anemone
  helper_method :logged_in?
  helper_method :current_identity
  rescue_from FbGraph::Exception, :with => :fb_graph_exception
  
  def send_message
    render_text "<li>" + params[:msg_body] + "</li>"
    Juggernaut.publish("/chats", parse_chat_message(params[:msg_body], "Prabhat"))
  end
  
  def parse_chat_message(msg, user)
    return "#{user} says: #{msg}"
  end

  private
  def current_user
    @current_user ||= User.find_by_id(session[:user_id]) if session[:user_id]
  end

  def current_identity
    @current_identity ||= Identity.find_by_id(session[:user_id]) if session[:user_id]
  end
  
  def login_required
    redirect_to root_path, :notice => "You must be logged in ." if !logged_in?
  end
  
  def logged_in?
    !!current_user
  end

  def fb_graph_exception(e)
    flash[:error] = {:title => e.class, :message => e.message}
    current_identity.try(:destroy)
    redirect_to root_url
  end  
end
