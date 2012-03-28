class PostcommentsController < ApplicationController

  before_filter :login_required
  
  
  # GET /comments
  # GET /Postcomments.json
  def index
    @Postcomments = Postcomment.recent
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @Postcomments }
    end
  end

  # GET /Postcomments/1
  # GET /Postcomments/1.json
  def show
    @Postcomment = Postcomment.find(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @Postcomment }
    end
  end

  # GET /Postcomments/new
  # GET /Postcomments/new.json
  def new
    @Postcomment = Postcomment.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @Postcomment }
    end
  end

  # GET /Postcomments/1/edit
  def edit
    @Postcomment = Postcomment.find(params[:id])
  end

  # POST /Postcomments
  # POST /Postcomments.json
  def create
    @Postcomment = Postcomment.new(params[:postcomment])

    respond_to do |format|
      if @Postcomment.save
        format.html { redirect_to root_url, notice: 'Postcomment was successfully created.' }
        format.json { render json: @Postcomment, status: :created, location: @Postcomment }
      else
        format.html { render action: "new" }
        format.json { render json: @Postcomment.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /Postcomments/1
  # PUT /Postcomments/1.json
  def update
    @Postcomment = Postcomment.find(params[:id])

    respond_to do |format|
      if @Postcomment.update_attributes(params[:Postcomment])
        format.html { redirect_to @Postcomment }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @Postcomment.errors, status: :unprocessable_entity }
      end
    end
  end

  def mercury_update  
    postcomment = Postcomment.find(params[:id])  
   postcomment.title = params[:content][:postcomment_title][:value]  
    postcomment.content = params[:content][:postcomment_content][:value]  
    postcomment.save!   
    render text: ""  
  end

  # DELETE /Postcomments/1
  # DELETE /Postcomments/1.json
  def destroy
    @Postcomment = Postcomment.find(params[:id])
    @Postcomment.destroy

    respond_to do |format|
      format.html { redirect_to Postcomments_url }
      format.json { head :ok }
    end
  end
end
