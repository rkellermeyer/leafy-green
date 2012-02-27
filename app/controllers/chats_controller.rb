class ChatsController < ApplicationController
  respond_to :json

  def current_user1
    @current_user1 ||= User.find_by_uid(session[:user_id]) if session[:user_id]
  end
  
  # GET /chats
  # GET /chats.json
  def index
   
    @chats = Chat.where("`chats`.`to` = :toUser and `chats`.`recd`= :recieved",{:toUser => current_user1.name, :recieved => 0})
	@chats.each do| chat1 |
		Chat.where("`chats`.`id` = :chatId",{:chatId => chat1.id}).update_all(" `chats`.`recd`= 1 ")
	end
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @chats }
    end
  end

  # GET /chats
  # GET /chats.json
  def oldchats
    chatuser = params[:chatuser]
    numofdays = params[:numofdays]
    puts "old chats chatuser**********%%%%%%%%%%%%%% = "+chatuser
    puts "old chats numofdays %%%%%%%%%%%%%%%%%%%%%%*************= "+numofdays
    @chats = Chat.where(" ( (`chats`.`to` = :chatuser and `chats`.`from`= :curruser ) or (`chats`.`to` = :curruser and `chats`.`from`= :chatuser ) ) and `chats`.`sent` < date_add(NOW(),INTERVAL :numofdays DAY)",{:curruser => current_user1.name, :chatuser => chatuser, :numofdays => numofdays})

    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @chats }
    end
  end
  
  # GET /chats/1
  # GET /chats/1.json
  def show
  	puts "*******************%%%%%%%%%%%%%%%% id =="+params[:id]
    @chat = Chat.find_by_id(params[:id])

    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @chat }
    end
  end

  # GET /chats/1
  # GET /chats/1.json
  def friendschat
    #@chatmsgs = Chat.find_by_to_and_recd(current_user1.name, 0)
	@chatmsgs = Chat.where("`chats`.`to` = :toUser and `chats`.`recd`= :recieved",{:toUser => current_user1.name, :recieved => 0})
	
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @chatmsgs }
    end
  end


  # GET /chats/new
  # GET /chats/new.json
  def new
    @chat = Chat.new

    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @chat }
    end
  end

  # GET /chats/1/edit
  def edit
    @chat = Chat.find_by_id(params[:id])
  end

  # POST /chats
  # POST /chats.json
  def create
  	puts "current user ************************ %%%%%%%%%%%%%%%%"+ current_user1.to_s
    @chat = Chat.new(params[:chat])
     time = Time.new
     @chat.sent = time
     @chat.from = User.find_by_uid(session[:user_id]).name
     @chat.to = params[:to]
     @chat.message = params[:message]
   
    respond_to do |format|
      if @chat.save
        format.html { redirect_to @chat, notice: 'Chat was successfully created.' }
        format.json { render json: @chat, status: :created, location: @chat }
      else
        format.html { render action: "new" }
        format.json { render json: @chat.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /chats/1
  # PUT /chats/1.json
  def update
    @chat = Chat.find(params[:id])

    respond_to do |format|
      if @chat.update_attributes(params[:chat])
        format.html { redirect_to @chat, notice: 'Chat was successfully updated.' }
        format.json { head :ok }
      else
        format.html { render action: "edit" }
        format.json { render json: @chat.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /chats/1
  # DELETE /chats/1.json
  def destroy
    @chat = Chat.find(params[:id])
    @chat.destroy

    respond_to do |format|
      format.html { redirect_to chats_url }
      format.json { head :ok }
    end
  end
end
