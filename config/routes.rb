Rails.application.routes.draw do
  root :to => "welcome#index"

  get '/users/logout' => "users#logout"
  get '/users/login' => "users#login"
  post '/login_user' => "users#login_user"

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
