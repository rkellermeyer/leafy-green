class DashboardsController < ApplicationController


  def show
  puts "Session obj ==&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%% = "+session[:current_user].to_s
    	puts "Session obj1 ==&&&&&&&&&&&&&&&&&&%%%%%%%%%%%%%%%% = "+session[:current_user1].to_s
  end

end
