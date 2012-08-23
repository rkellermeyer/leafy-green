require "juggernaut"
class MessagesController < ApplicationController

  def send_message
    @messg = params[:msg_body]
    @sender = params[:sender]
    @channel= params[:channel_id]
    puts "channel name .................."+@channel
    Juggernaut.publish(select_channel(@channel), parse_chat_message(params[:msg_body], params[:sender]))
    message = Message.new
    message.sender = current_identity1.name
    message.msg_body = @messg
    message.channel = @channel
    if message.save
      @messages =  Message.find_all_by_channel(params[:channel_id])
      respond_to do |format|
        format.json { render json: @messages }
      end
    end
  end

	def parse_chat_message(msg, user)
    return "#{user}: #{msg}"
	end

	def select_channel(receiver)
    puts "#{receiver}"
    return "/chats#{receiver}"
	end
	
	def getMessagesOnChannel
    # puts "come here messages"+params[:search]
    @messages = Message.find_all_by_channel(params[:channel_id], :order => "created_at ASC")
    #puts @messages
    respond_to do |format|
      format.json { render json: @messages }
    end
  end
  
  def downloadMessagesOnChannel
    channelId = params[:channel_id]
    @messages = Message.find_all_by_channel(channelId, :order => "created_at DESC")
    data = channelId  + " Channel Id Conversations\n"
    data = data + "-----------------------------------------------\n\n"
    @messages.each do| obj|
     	msg_date = obj.created_at.to_s(:rfc822) 
     	data = data + obj.sender + " : "+ obj.msg_body + "\t"+ msg_date + "\n"
    end
    filename = channelId+".txt"
    send_data( data, :filename => filename )
  end
 
	
  # GET /messages
  # GET /messages.json
  def index
    @messages = Message.all
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @messages }
    end
  end

  # GET /messages/1
  # GET /messages/1.json
  def show
    @message = Message.find(params[:id])
    respond_to do |format|
      format.html # show.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/new
  # GET /messages/new.json
  def new
    @message = Message.new
    respond_to do |format|
      format.html # new.html.erb
      format.json { render json: @message }
    end
  end

  # GET /messages/1/edit
  def edit
    @message = Message.find(params[:id])
  end

  # POST /messages
  # POST /messages.json
  def create
    @message = Message.new(params[:message])
    respond_to do |format|
      if @message.save
        format.html { redirect_to @message, notice: 'Message was successfully created.' }
        format.json { render json: @message, status: :created, location: @message }
      else
        format.html { render action: "new" }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # PUT /messages/1
  # PUT /messages/1.json
  def update
    @message = Message.find(params[:id])
    respond_to do |format|
      if @message.update_attributes(params[:message])
        format.html { redirect_to @message, notice: 'Message was successfully updated.' }
        format.json { head :no_content }
      else
        format.html { render action: "edit" }
        format.json { render json: @message.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /messages/1
  # DELETE /messages/1.json
  def destroy
    @message = Message.find(params[:id])
    @message.destroy
    respond_to do |format|
      format.html { redirect_to messages_url }
      format.json { head :no_content }
    end
  end
end