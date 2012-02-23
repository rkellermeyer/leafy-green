class TimelinesController < ApplicationController
  include Authentication

  def show
    @posts = current_identity.profile.home
  end

  def create
    current_identity.profile.feed!(
      :message => params[:message]
    )
    redirect_to timeline_url
  end

end
