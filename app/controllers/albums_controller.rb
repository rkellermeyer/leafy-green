class AlbumsController < ApplicationController
  # GET /albums
  # GET /albums.json
  def index
    @albums = Album.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @albums }
    end
  end

  # GET /albums/1
  # GET /albums/1.json
  def show
    @album = Album.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @album }
    end
  end

  # GET /albums/new
  # GET /albums/new.json
  def new
    @album = Album.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @album }
    end
  end

  # GET /albums/1/edit
  def edit
    @album = Album.find(params[:id])
  end

  # POST /albums
  # POST /albums.json
  def create
 	
    @album = Album.new(params[:album])
    
    if (@album.visibletype == 0)
	  	@accessuers = params[:album][:accessusers]
	  	@accessuers_str = ","
	  	@accessuers.each do| auser |
	  	 	@accessuers_str = @accessuers_str + auser+ ","
	  	end
		@album.accessusers = @accessuers_str
	else
		@album.accessusers = nil
	end
	
    respond_to do |format|
      if @album.save
        format.html { redirect_to root_url, notice: 'Album was successfully created.' }
        format.json { render json: @album, status: :created, location: @album }
      else
        format.html { render action: "new" }
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /albums/1
  # PUT /albums/1.json
  def update
  
    @album = Album.find(params[:id])
    if (params[:album][:visibletype] == '0')
	  	@accessuers = params[:album][:accessusers]
	  	@accessuers_str = ","
	  	@accessuers.each do| auser |
	  	 	@accessuers_str = @accessuers_str + auser+ ","
	  	end
		@album.accessusers = @accessuers_str
	else
		@album.accessusers = nil
	end
	@album.name = params[:album][:name]
	@album.caption = params[:album][:caption]
	@album.visibletype = params[:album][:visibletype]
    respond_to do |format|
      if @album.update_attributes(:name => @album.name, :caption => @album.caption, :visibletype => @album.visibletype, :accessusers => @album.accessusers)
        format.html { redirect_to root_url, notice: 'Album was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @album.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /albums/1
  # DELETE /albums/1.json
  def destroy
    @album = Album.find(params[:id])
    @album.destroy

    respond_to do |format|
      format.html { redirect_to albums_url }
      format.json { head :ok }
    end
  end
end
