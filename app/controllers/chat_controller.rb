require "juggernaut"

class ChatController < ApplicationController

	def send_message
	@messg = params[:msg_body]
	@sender = params[:sender]
	@channel= params[:channel_id]
	puts "channel name .................."+@channel
 	Juggernaut.publish(select_channel(@channel), parse_chat_message(params[:msg_body], params[:sender]))
 	
 	 message = Message.new(params)
     if message.save
	     
	      @messages =  message.find_all_by_channel_id(params[:channel_id])
	      respond_to do |format|
	      	format.json { render json: @messages }
	      end
    end
    	
	respond_to do |format|
	    format.js
  	end
	end

	def parse_chat_message(msg, user)
	return "#{user}: #{msg}"
	end

	def select_channel(receiver)
	puts "#{receiver}"
	return "/chats#{receiver}"
	end
end
