Rails.application.routes.draw do

  get '/' => 'application#index'

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
