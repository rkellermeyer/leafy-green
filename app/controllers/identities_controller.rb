require 'nokogiri'
require 'open-uri'

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
		doc.xpath("//img").each do |img| 
		    puts "img tag **************"+img.to_s
		    if (!img.nil? and !img['src'].nil? and !img['title'].nil?)
		    	puts "########## image contents are -------- "+ img.to_s
		    	@title = img['title']
		    	@src = img['src']
		    end
		end
		puts "%%%%%%%%%%%%%%%%% here end nokogiri Crawling"
        respond_to do |format|
         	format.json { render json:  { title: @title , src: @src } }
      	end  
  end
  
   def getChatWithFriendsTabContent
   		puts "%%%%%%%%%%%%%%%%% here in Anemone Crawling"
   		
   		Anemone.crawl("http://gizmodo.com/5895975/ipad-3-review-better-than-anything-else-but-kind-of-a-letdown" , :depth_limit => 1) do |anemone|
				# anemone.on_every_page do |page|
				#  puts page.url
			    # end
			   # anemone.focus_crawl do |page|
			   #  links = page.links.delete_if do |link|
			   # (link.to_s =~ /.jpg/).nil?  puts links
			   # end
      
    anemone.focus_crawl do |page|
		     # page.links.slice(0..20)
		     # puts "body ---------"+page.body
		     # page.links.map do |url|
		     # puts url
		     # end
      doc = page.doc
     # puts "doc ----"+doc
     img_nodes = doc.css('.image')

	
		img_nodes.each do |img|
		  content = img.content
		  image_node = Nokogiri::XML::Node.new('img',doc)
		  image_node['src'] = content
		  img.add_child(image_node)
		  	puts "image nodes *******************123 "+content
		end
		#puts doc.to_html
     
     end
		  
		  end
		puts "%%%%%%%%%%%%%%%%%%%%%%%% After Anemone Crawling"
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
