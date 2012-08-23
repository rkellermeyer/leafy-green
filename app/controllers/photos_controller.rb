class PhotosController < ApplicationController
  respond_to :json
  # GET /photos
  # GET /photos.json
  def index
    @photos = Photo.limit(133).order('created_at desc')
    respond_with(@photos)
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
    logger.debug "Params: #{params}"
    @photo = Photo.new(params[:photo])
    @photo.image = params[:photo][3]
    @photo.publisher = Identity.where(:id => params[:photo][:identity_id]).first.username
    if @photo.save
      redirect_to root_path
    else
      respond_with(status: 500)
    end
  end


  # Photo upload using ajax
  def photosimage
   @photo = Photo.new(:album_id => "0" ,  :image => params[:Filedata]  ,:visible => '0' , :identity_id => params[:user_id])
    logger.debug "*****************Debug values : #{params}"
    respond_to do |format|
      if @photo.save
        format.html { redirect_to root_url, notice: 'photo was successfully created.' }
        format.json { render json: @photo, status: :created, location: root_url }
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
      		@photo.update_attributes(:album_id => params[:photo][:album_id])
           if (params[:photo][:publishdate].nil? || params[:photo][:publishdate] == '')
             @photo.update_attributes(:publishdate => Date.current)
             else
            @photo.update_attributes(:publishdate => params[:photo][:publishdate].to_s)
        end
        #format.html { redirect_to '/photos' }
        format.json { render json: @photo }
      else
        #format.html { render action: "edit" }
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
