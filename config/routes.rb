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
  # match "flickrshow" => "flickr#show",:as => :flickrshow
    match "/flickrshow", to: "flickr#flickrphotos"
    match "/picasashow", to: "picasa#show"
    match "twittershow" => "twitter#show",:as => :twittershow
  resources :identities
  
end