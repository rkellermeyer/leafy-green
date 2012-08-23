class SpiderUrlsController < ApplicationController
  # GET /spider_urls
  # GET /spider_urls.json
  def index
    @spider_urls = SpiderUrl.all

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @spider_urls }
    end
  end

  # GET /spider_urls/1
  # GET /spider_urls/1.json
  def show
    @spider_url = SpiderUrl.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @spider_url }
    end
  end

  # GET /spider_urls/new
  # GET /spider_urls/new.json
  def new
    @spider_url = SpiderUrl.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @spider_url }
    end
  end

  # GET /spider_urls/1/edit
  def edit
    @spider_url = SpiderUrl.find(params[:id])
  end

  # POST /spider_urls
  # POST /spider_urls.json
  def create
    @spider_url = SpiderUrl.new(params[:spider_url])

    respond_to do |format|
      if @spider_url.save
        format.html { redirect_to @spider_url, notice: 'Spider url was successfully created.' }
        format.json { render json: @spider_url, status: :created, location: @spider_url }
      else
        format.html { render action: "new" }
        format.json { render json: @spider_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /spider_urls/1
  # PUT /spider_urls/1.json
  def update
    @spider_url = SpiderUrl.find(params[:id])

    respond_to do |format|
      if @spider_url.update_attributes(params[:spider_url])
        format.html { redirect_to @spider_url, notice: 'Spider url was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @spider_url.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /spider_urls/1
  # DELETE /spider_urls/1.json
  def destroy
    @spider_url = SpiderUrl.find(params[:id])
    @spider_url.destroy

    respond_to do |format|
      format.html { redirect_to spider_urls_url }
      format.json { head :no_content }
    end
  end
end
