Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :items, only: [:index, :create, :update]
      resources :users, only: [:index, :create, :update]
    end
  end
end
