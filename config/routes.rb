Rails.application.routes.draw do
  root :to => "welcome#index"

  resources :sessions, only: [:new, :create, :destroy]
  # match '/signup',  to: 'users#new',            via: 'get'
  # match '/signin',  to: 'sessions#new',         via: 'get'
  match '/signout', to: 'sessions#destroy',     via: 'delete'



  #Provides top-level routes for all resources except commnets as well as nested routes for one-to-many resources
  resources :users, shallow: true do
    resources :questions
    resources :answers
    resources :comments
  end

  resources :questions, shallow: true do
    resources :answers
    resources :comments
  end

  resources :answers, shallow: true do
    resources :comments
  end

end
