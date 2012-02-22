require "uri"
require "net/http"
class PicasaController < ApplicationController

def index
render
end

def show
url=params[:urlname]
album=params[:album]
puts url
puts album
x = Net::HTTP.get_response(URI.parse('http://picasaweb.google.com/data/feed/api/user/'+ url.to_s + '/album/' + album.to_s + '?kind=photo&alt=json-in-script&callback=renderer&access=public&start-index=1'))
puts "resuly----------------------"+x.body
@response=x.body
 respond_to do |format|
  format.html {
       
           redirect_to root_path
       
       }
 
      format.json { render json: @response }
    end
end

end
