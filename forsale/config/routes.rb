Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create, :update]
      resources :users, only: [:index, :create, :update]
      resources :comments, only: [:index, :create, :update, :destroy]
      resources :ratings, only: [:index, :create, :update]
      resources :tags, only: [:index, :create, :update]
    end
  end
end
