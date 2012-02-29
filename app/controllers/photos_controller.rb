class PhotosController < ApplicationController
 
  # GET /photos
  # GET /photos.json
  def index
  if !(current_user1.nil?)
 @photos = Photo.where("identity_id = :identityId" , { :identityId => current_user1.id })
    
puts "today ***************** date----------"+Date.current.to_s
today=Date.current
@photos1=@photos

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @photos1 }
    end
       end
  end
  
  

  # GET /photos/1
  # GET /photos/1.json
  def show
    @photo = Photo.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @photo }
    end
  end

  # GET /photos/new
  # GET /photos/new.json
  def new
    @photo = Photo.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @photo }
    end
  end

  # GET /photos/1/edit
  def edit
    @photo = Photo.find(params[:id])
  end

  # POST /photos
  # POST /photos.json
  def create
    @photo = Photo.new(params[:photo])

    respond_to do |format|
      if @photo.save
     # puts "test----------"+params[:photo][:publishdate]
      if (params[:photo][:publishdate].nil? || params[:photo][:publishdate] == '')
             @photo.update_attributes(:publishdate => Date.current)
             else
            @photo.update_attributes(:publishdate => params[:photo][:publishdate].to_s)
        end
        format.html { redirect_to root_url }
        format.json { render json: @photo, status: :created, location: @photo }
      else
        format.html { render action: "new" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /photos/1
  # PUT /photos/1.json
  def update
    @photo = Photo.find(params[:id])
    puts "coming------------------"
puts "date------------"+params[:photo][:publishdate].to_s
    respond_to do |format|
      if @photo.update_attributes(params[:photo])
           if (params[:photo][:publishdate].nil? || params[:photo][:publishdate] == '')
             @photo.update_attributes(:publishdate => Date.current)
             else
            @photo.update_attributes(:publishdate => params[:photo][:publishdate].to_s)
        end
        format.html { redirect_to '/photos' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @photo.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /photos/1
  # DELETE /photos/1.json
  def destroy
    @photo = Photo.find(params[:id])
    @photo.destroy

    respond_to do |format|
      format.html { redirect_to photos_url }
      format.json { head :ok }
    end
  end
end