class FlickrController < ApplicationController
require 'flickraw'

def index
render
end

def show
FlickRaw.api_key="1e327eadb60c60b16219f705db8dd5be"
FlickRaw.shared_secret="9a6ecebdc8814ad7"
url=params[:url]
id = flickr.people.findByUsername(:username => params[:url]).id
@photos=flickr.photos.search(:user_id => id)
#info = flickr.photos.getInfo(:photo_id =>url.split("/").last)
#@embed_photo={}
#@embed_photo["flickr"]=FlickRaw.url(info) rescue FlickRaw.url_o(info) rescue FlickRaw.url_b(info)
#@title = info.title
#@square_url = FlickRaw.url_s(info)
#@taken = info.dates.taken
#@views = info.views
#@tags = info.tags.map {|t| t.raw}
end

 def flickrphotos
 
	FlickRaw.api_key="1e327eadb60c60b16219f705db8dd5be"
	FlickRaw.shared_secret="9a6ecebdc8814ad7"
	url=params[:url]
	id = flickr.people.findByUsername(:username => params[:url]).id
     token = flickr.get_request_token
	puts "token---------------------"+token.to_s
	@photos=flickr.photos.search(:user_id => id)
    puts @photos
    respond_to do |format|

      format.json { render json: @photos }
    end
  end

def photo_url ( photo )
  return "http://farm#{photo.farm}.static.flickr.com/#{photo.server}/#{photo.id}_#{photo.secret}.jpg"
end


end
