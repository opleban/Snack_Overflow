Rails.application.routes.draw do
  root :to =>'welcome#index'

  resources :questions
  resources :answers
  resources :comments

  devise_for :users
  devise_scope :user do
    authenticated :user do
      root "application#index", as: :authenticated_root
    end

    unauthenticated do
      root "devise/session#new", as: :unauthenticated_root
    end
  end
end
