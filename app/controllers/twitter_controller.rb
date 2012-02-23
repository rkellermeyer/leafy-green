require 'twitter'
class TwitterController < ApplicationController

	def index
		render
	end
	
	def show
	  @recenttweet=Twitter.user_timeline(params[:username]).first.text
	end

end
