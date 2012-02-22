class TimelinesController < ApplicationController
  include Authentication

  def show
    puts "Session obj ==&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%% = "+session[:current_user].to_s
    	puts "Session obj1 ==&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%% = "+session[:current_user1].to_s
    @posts = current_identity.profile.home
    
  end

  def create
    current_identity.profile.feed!(
      :message => params[:message]
    )
    redirect_to timeline_url
  end

end
