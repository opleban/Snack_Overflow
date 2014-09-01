require_relative '../rails_helper'

describe "Users pages", :js => true do 

  context "user profile page" do 
    let(:user) { FactoryGirl.create :user }
    before { visit user_path(user) }

    # puts page.inspect
    it { should have_content(user.name)}
    it { should have_title(user.name) }
  end

  context "sign up page" do 
    before { visit new_user_path}

    it {should have_content('Sign up') }
    it {should have_title(full_title('Sign up')) }
  end




end