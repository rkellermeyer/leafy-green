require 'nokogiri'
require 'open-uri'
require 'net/https'

class IdentitiesController < ApplicationController
layout "test"
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
     respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @identities }
     
    end
  end
  
  def getCategories
         render :template  => 'identities/getCategories'
  end

  def getRateMy
         render :template  => 'identities/getRateMy'
  end
  
  def getPhotosContent
         render :template  => 'identities/getPhotosContent'
  end
  
  def getUploadPhotosContent
         render :template  => 'identities/getUploadPhotosContent'
  end
  
  def getAlbumsContent
         render :template  => 'identities/getAlbumsContent'
  end
  
  def getFriendsAlbumsTabContent
         render :template  => 'identities/getFriendsAlbumsTabContent'
  end
  
  
  def getAddFriendsListContent
         render :template  => 'identities/getAddFriendsListContent'
  end
  
   def getCreateChatRoomTabContent
         render :template  => 'identities/getCreateChatRoomTabContent'
  end
  
  def getPopulatePostContent
  		puts "%%%%%%%%%%%%%%%%% here in nokogiri Crawling"
  		spiderUrl = params[:spiderUrl]
		doc = Nokogiri::HTML(open(spiderUrl))
		#puts "body tag==================="+doc.at_css("body").text  
		#img_srcs = doc.css('img').each do |i|
		#puts "iiiiiiiiiiii----------"+ i['src'] 
		#end
		 url = URI.parse(spiderUrl)
		 #puts "host-----------------"+url.host.to_s
		 @src1="http://"+url.host.to_s
		 @width = 0
		doc.xpath("//img").each do |img| 
		    puts "img tag **************"+img.to_s
		    #and !img['width'].nil? and img['width'].to_i > @width
		    if (!img.nil? and !img['src'].nil? and (!img['title'].nil? or !img['alt'].nil?) and !img['width'].nil? and img['width'].to_i > @width)
		    	puts "########## image contents are -------- "+ img.to_s
		    	#puts "first letter---------"+img['src'][0,1] 
		    	#puts "image next contents are -------- "+ img.parent.child.inner_text
		    	if (!img['title'].nil?)
		    		@title = img['title']
		    		@content = img['title']
		    	else
		    		@title = img['alt']
		    		@content = img['alt']
		    	end
		    	if (img['src'][0,1] == '/')
		    		@src=@src1+img['src']
		    	else
		    		@src = img['src']
		    	end
		    	@width = img['width'].to_i
		    	
		    end
		end
		puts "%%%%%%%%%%%%%%%%% here end nokogiri Crawling"
        respond_to do |format|
         	format.json { render json:  { title: @title , src: @src ,content: @content} }
      	end  
  end
  
   def getChatWithFriendsTabContent
   		
         render :template  => 'identities/getChatWithFriendsTabContent'
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
    
  def update_categories
    @identity = Identity.find(current_identity1.id)  
  	
  	respond_to do |format|
	    if @identity.update_attributes(:categories => params[:categories])
	       format.html { redirect_to(root_url) }
	       format.json { render json: @identity }
	    else
	        format.html { render :action => "edit" }
	        format.json { render :action => "edit" }
	    end
	 end    
  end
  
    def getNamesOnId
 
   @identities = Identity.find_all_by_id(params[:id])
    
    respond_to do |format|

      format.json { render json: @identities }
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
