class IdentitiesController < ApplicationController
  respond_to :json
  before_filter :login_required , :except => [:index,:new]
  
  def index
    @identities=Identity.all
    
     respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @identities }
     
    end
  end


  def new
    @identity = env['omniauth.identity']
  end
  

  def edit
    @identity = Identity.find(params[:id])
    
    #respond_with @identity
  end
  
  def update
    @identity = Identity.find(params[:id])  
  	
  	respond_to do |format|
	      if @identity.update_attributes(params[:identity])
	        format.html { redirect_to(root_url) }
	        format.json { render json: @identity }
	      else
	        format.html { render :action => "edit" }
	        format.json { render :action => "edit" }
	      end
	    end    
  end
    
  def show
    @identity = Identity.find(params[:id])
    respond_to do |format|
      format.html 
      format.json { render json: @identity }
    end
  end  
end
