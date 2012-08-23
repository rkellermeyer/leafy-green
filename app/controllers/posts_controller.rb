
class PostsController < ApplicationController
  respond_to :json, :html
  # GET /posts
  # GET /posts.json
  
 
  
  def index
    @posts = Post.all
     
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @posts }
    end
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
    @post = Post.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @post }
    end
  end

  # GET /posts/new
  # GET /posts/new.json
  def new
    @post = Post.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @post }
    end
  end

   
  # GET /posts/1/edit
  def edit
    @post = Post.find(params[:id])
    
  end

  def postimage
  
   @post = Post.new(:title => "temp" , :content =>"temp" , :category_id => "37" , :image => params[:Filedata] ,:visible => '0' , :user_id => params[:user_id])
       
    logger.debug "*****************Debug values : #{params}"
    respond_to do |format|
      if @post.save
        format.html { redirect_to root_url, notice: 'Post was successfully created.' }
        format.json { render json: @post, status: :created, location: root_url }
      else
        format.html { render action: "new" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
  end
  end
  
  # POST /posts
  # POST /posts.json
  def create 
  	@post = Post.new(params[:post])
    if @post.save
      respond_with(@post, status: 200)
    end
  end

  # PUT /posts/1
  # PUT /posts/1.json
  def update
    @post = Post.find(params[:id])
     puts "category id ==========="+params[:category_id]
    respond_to do |format|
      if @post.update_attributes(params[:post])
      @post.update_attributes(:category_id => params[:category_id])
        format.html { redirect_to @post, notice: 'Post was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @post.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    @post = Post.find(params[:id])
    @post.destroy

    respond_to do |format|
      format.html { redirect_to posts_url }
      format.json { head :no_content }
    end
  end

  def rate_up
    if params[:post]  
      @post = Post.find(params[:id])
      rate_down = @post.rate_down.to_f
      rate_up = @post.rate_up.to_f + 1
      votes = rate_up + rate_down
      score = (rate_up / votes)
      respond_to do |format|
        if @post.update_attributes(:votes => votes, :rate_up => rate_up, :rate_down => rate_down, :score => score.round(4))
          #format.html { redirect_to @post, notice: 'Post was successfully updated.' }
          format.json { render json: @post }
        else
          #format.html { render action: "edit" }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    elsif params[:photo]
      @photo = Photo.find(params[:id])
      rate_down = @photo.rate_down.to_f
      rate_up = @photo.rate_up.to_f + 1
      votes = rate_up + rate_down
      score = (rate_up / votes)
      respond_to do |format|
        if @photo.update_attributes(:votes => votes, :rate_up => rate_up, :rate_down => rate_down, :score => score.round(4))
          #format.html { redirect_to @post, notice: 'Photo was successfully updated.' }
          format.json { render json: @photo }
        else
          #format.html { render action: "edit" }
          format.json { render json: @photo.errors, status: :unprocessable_entity }
        end
      end
    else
      render status: :unprocessable_entity
    end
  end

  def rate_down
    if params[:post]
      @post = Post.find(params[:id])
      rate_down = @post.rate_down.to_f + 1
      rate_up = @post.rate_up.to_f
      votes = rate_up + rate_down
      score = (rate_up / votes)
      respond_to do |format|
        if @post.update_attributes(:votes => votes, :rate_up => rate_up, :rate_down => rate_down, :score => score.round(4))
          #format.html { redirect_to @post, notice: 'Post was successfully updated.' }
          format.json { render json: @post }
        else
          #format.html { render action: "edit" }
          format.json { render json: @post.errors, status: :unprocessable_entity }
        end
      end
    elsif params[:photo]
      @photo = Photo.find(params[:id])
      rate_down = @photo.rate_down.to_f + 1
      rate_up = @photo.rate_up.to_f
      votes = rate_up + rate_down
      score = (rate_up / votes)
      respond_to do |format|
        if @photo.update_attributes(:votes => votes, :rate_up => rate_up, :rate_down => rate_down, :score => score.round(4))
          #format.html { redirect_to @post, notice: 'Photo was successfully updated.' }
          format.json { render json: @photo }
        else
          #format.html { render action: "edit" }
          format.json { render json: @photo.errors, status: :unprocessable_entity }
        end
      end
    else
      render status: :unprocessable_entity
    end
  end
end
