class FriendshipsController < ApplicationController
 

 before_filter :get_friend
 
 def index
    @users = User.search(params[:search])
    if  !(current_user1.nil?)
    @friendships = current_user1.friendships
   @inverse_friends = current_user1.inverse_friends
  
   
   @friend_data = @friendships | @inverse_friends
   
    respond_to do |format|
      format.html # index.html.erb
      format.json { render json: @friend_data }
     
    end
      end
end

 
  
 def friend_photos
 

   
   @friendships = current_user1.friendships
   @inverse_friends = current_user1.inverse_friends

@friends_photos = Array.new
@inverse_friends_photos = Array.new
   @friendships.each do| obj|
    if !(@friendships.nil?)
    
     @friends_photo = Photo.where("identity_id = :identityId AND publishdate <= :publishedDate", { :identityId => obj.friend_id, :publishedDate =>  Date.current })
     @friends_photos = @friends_photos | @friends_photo
     end
    end
    
    @inverse_friends.each do| obj|
     if !(@inverse_friends.nil?)
      @inverse_friends_photo = Photo.where("identity_id = :identityId AND publishdate <= :publishedDate", { :identityId => obj.uid, :publishedDate =>  Date.current })
     @inverse_friends_photos = @inverse_friends_photos | @inverse_friends_photo
     end
    end
   
   @fphotos = @friends_photos | @inverse_friends_photos

#puts "******** all photos -----------------------------------------------------"+ @fphotos.to_s

 respond_to do |format|
     
     format.html
      format.json { render json: @fphotos }
     
    end


 end
 
 def friend_albums
 
   @friendships = current_user1.friendships
   @inverse_friends = current_user1.inverse_friends

@friends_albums = Array.new
@inverse_friends_albums = Array.new
   @friendships.each do| obj|
    if !(@friendships.nil?)
    
     @friends_album = Album.where("identity_id = :identityId" , { :identityId => obj.friend_id })
     @friends_albums = @friends_albums | @friends_album
     end
    end
    
    @inverse_friends.each do| obj|
     if !(@inverse_friends.nil?)
      @inverse_friends_album = Album.where("identity_id = :identityId" ,{ :identityId => obj.uid })
     @inverse_friends_albums = @inverse_friends_albums | @inverse_friends_album
     end
    end
   
   @falbums = @friends_albums | @inverse_friends_albums

puts "******** all albums -----------------------------------------------------"+ @falbums.to_s

 respond_to do |format|
     
     format.html
      format.json { render json: @falbums }
     
    end


 end
  
def add_friend
   @friendship = current_user1.friendships.build(:friend_id => @friend.id) unless @friend.nil? and current_user1.friendships.nil?
   user = User.find(@friend)
   session[:friend_id] = user.id
   @friendship.name = user.name
 
   if !@friendship.nil? and @friendship.save
      flash[:notice] = "Added friend"
     else
       flash[:error] = "Error occurred when adding friend."
   end
   redirect_to root_url
 end
 
def save_friend

    @name = params[:friendship][:name]
    user = User.new()
     user.name = @name
     user.password = '123456'
     user.save(false)
     
     @friendship = current_user1.friendships.build(:friend_id => user.id) unless user.nil?
     @friendship.name = @name
 
   if !@friendship.nil? and @friendship.save

      flash[:notice] = "Added friend"
     else
       flash[:error] = "Error occurred when adding friend."
   end
   redirect_to root_url
 end

  def show
    @users = User.all
    @friend = Friendship.new
    @friendships = current_user1.friendships
    @inverse_friends = current_user1.inverse_friends

end

 def remove_friend
     
     @friendship = Friendship.find_by_user_id_and_friend_id(current_user1.id, @friend.id) unless @friend.nil?
      @friendship = Friendship.find_by_friend_id_and_user_id(current_user1.id, @friend.id) if @friendship.nil?
     if !@friendship.nil? and @friendship.destroy
        flash[:notice] = "Successfully destroyed friendship."
     else
       flash[:error] = "Unable to destroy."
     end
     redirect_to root_url
  end

  private
  
   def get_friend
     @friend = User.find(params[:friend_id]) unless params[:friend_id].nil?
     session[:friend_id] = @friend unless @friend.nil?
     @friend = session[:friend_id] unless session[:friend_id].nil?
     
  
  end
 
end