require 'nokogiri'
require 'open-uri'
require 'net/https'
require 'anemone'
  	
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
  
  def getHeaderBarData
  	 render :template  => 'identities/getHeaderBarData'
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
		@height = 0
    doc.xpath("//p").each do |header|
      puts header.text
    end
    puts "title-------"+doc.css('title').to_s
		doc.xpath("//img").each do |img| 
		puts "img tag **************"+img.to_s    
		# and !img['width'].nil? and img['width'].to_i > @width
		# ( (!img['title'].nil? and !img['title'].blank?) or ( !img['alt'].nil? and !img['alt'].blank? ) ) and
		if (!img.nil? and ( !img['src'].nil? or !img['data-src'].nil? ) and !img['width'].nil? and img['width'].to_i > @width and !img['height'].nil? and img['height'].to_i > @height  )
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
		  if (!img['data-src'].nil?)
		  	if (img['data-src'][0,1] == '/')
		   		@src=@src1+img['data-src']
		   	else
		   		@src = img['data-src']
		   	end
		  else
		   	if (img['src'][0,1] == '/')
		   		@src=@src1+img['src']
		   	else
		   		@src = img['src']
		   	end
		  end
		 	@width = img['width'].to_i
		 	@height = img['height'].to_i
		end
	end
	puts "%%%%%%%%%%%%%%%%% here end nokogiri Crawling"
	@title1 =doc.css('title').text.to_s
	@content1 =doc.css('p')[0].text.to_s
    doc.xpath("//meta[@name='description']/@content").each do |attr|
      puts "^^^^^^^^^^^^^^ META DESC = "+attr.value
      @content1 = attr.value
    end
    respond_to do |format|
      format.json { render json:  { title: @title1 , src: @src ,content: @content1, url: params[:spiderUrl]} }
    end  
  end
  
  def storeSpiderUrlsAnemone
  	spiderUrl = params[:spiderUrl]
  	puts "%%%%%%%%%%%%%%%% Anemone Spider Url = "+spiderUrl
  	spiderIns = 0;
	Anemone.crawl(spiderUrl) do |anemone|
	  anemone.on_every_page do |page|
	  	  spiderIns = spiderIns + 1;
	      puts "href urls = "+page.url.to_s
	      @exist_spiders = SpiderUrl.where("mainSpiderUrl = :mainUrl AND subSpiderUrl = :subUrl", { :mainUrl => spiderUrl, :subUrl =>  page.url.to_s  })
	      count = 0;
		  @exist_spiders.each do| obj|
     		if !(@exist_spiders.nil?)
     			count = count + 1
     		end
     	  end
	      if ( count <=0 ) 
		      @spider = SpiderUrl.new(:mainSpiderUrl => spiderUrl , :subSpiderUrl => page.url.to_s )
		      @spider.save
	      end
	      if (spiderIns >= 15)
	      		puts '$$$$$$$$$$$$$$$$$$$$$$$ breaking the loop as the spider urls are more than 15'
                return
	      end
	  end
	end
	puts "%%%%%%%%%%%%%%%% End of Anemone Spider Url = "+spiderUrl
	respond_to do |format|
         	format.json { render json:  { spiderUrl: spiderUrl} }
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
    respond_with(@identity, :success => :success)
  end  
end
