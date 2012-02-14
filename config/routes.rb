Ratemy::Application.routes.draw do
  get "log_in" => "sessions#new", :as => "log_in"
  get "log_out" => "sessions#destroy", :as => "log_out"
  get "sign_up" => "users#new", :as => "sign_up"

  root :to => "users#new"
  resources :users
  resources :sessions
  resources :posts
  match "users/posts/rate_up/:id" => "posts#rate_up"
  match "users/posts/rate_down/:id" => "posts#rate_down"
  resources :categories
end