Rails.application.routes.draw do
  root :to => "welcome#index"

  resources :sessions, only: [:new, :create, :destroy]
  # match '/signup',  to: 'users#new',            via: 'get'
  # match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'

  resources :users do
    resources :questions
    resources :answers
    resources :comments
  end

  resources :questions do
    resources :answers
    resources :comments
  end

  resources :answers do
    resources :comments
  end
end
