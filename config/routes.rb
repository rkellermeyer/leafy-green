Ratemy::Application.routes.draw do
  get "log_in" => "sessions#new", :as => "log_in"
  get "log_out" => "sessions#destroy", :as => "log_out"
  get "sign_up" => "identities#new", :as => "sign_up"

  root :to => "users#new"
  resources :users
  resources :sessions
  resources :posts
  match "identities/posts/rate_up/:id" => "posts#rate_up"
  match "identities/posts/rate_down/:id" => "posts#rate_down"
  resources :categories
  
   match "/auth/:provider/callback", to: "sessions#create"
  match "/auth/failure", to: "sessions#failure"
  
  resource :facebook, :except => :create do
  get :callback, :to => :create
  end
  resource :dashboard, :only => :show
  resource :profile, :only => :show
  resource :timeline, :only => [:show, :create]
  resources :flickr
  resources :twitter
  resources :picasa
  resources :friendships
  
  resources :chats
  
  resource :users do
    resources :friendships
  end
  
  resource :friendships do
    member do
    #get 'add_friend'
    end
  end

  controller :friendships do
    match 'save_friend', :to => :save_friend, :as => :save_friend
    match 'remove_friend', :to => :remove_friend, :as => :remove_friend
    match 'add_friend', :to => :add_friend  , :as => :add_friend 
    match 'friend_photos', :to => :friend_photos  , :as => :friend_photos
    match 'friend_albums', :to => :friend_albums  , :as => :friend_albums
  end
  # match "flickrshow" => "flickr#show",:as => :flickrshow
    match "/flickrshow", to: "flickr#flickrphotos"
    match "/picasashow", to: "picasa#show"
    match "twittershow" => "twitter#show",:as => :twittershow
    
     match "/oldchats", to: "chats#oldchats"
     
  resources :identities
  
end