require_relative '../rails_helper'
require_relative '../factories'

feature "homepage" do
  scenario "displays 'Welcome'" do
    visit root_path
    expect(page).to have_content "Welcome to Snack Overflow"
  end
end

feature "sign in" do
  scenario "displays error response when password too short" do
    visit new_session_path
    fill_in "session_password", :with => "x"
    click_on "Sign in"
    expect(page).to have_content "Invalid email/password combination"
  end
  scenario "displays error response when email is not unique" do
    2.times do 
      visit new_user_path
      fill_in "user_name", :with => "Turtle"
      fill_in "user_username", :with => "TurtleLover405"
      fill_in "user_email", :with => "turtlemolestor@dbc.com"
      fill_in "user_password", :with => "iliketurtles"
      click_on "Create my account"
    end
    expect(page).to have_content "Email has already been taken"
  end
end

feature "sign up" do
  scenario "displays username when user is successfully created" do
    visit new_user_path
    fill_in "user_name", :with => "Turtle"
    fill_in "user_username", :with => "TurtleLover405"
    fill_in "user_email", :with => "turtlemolestor@dbc.com"
    fill_in "user_password", :with => "iliketurtles"

    click_on "Create my account"
    expect(page).to have_content "turtlemolestor@dbc.com"
  end
end


feature "homepage" do 
  scenario "takes user to question form when user clicks 'ask question'" do 
    visit root_path
    click_link "Ask a Question"
    expect(page).to have_content "Ask a Question"
  end
end

feature "homepage" do 
  scenario "lists any recent questions when user clicks 'browse questions'" do 
    let!(:question) {FactoryGirl.create :question}
    visit root_path 
    click_link "Browse Questions"

    expect(page).to have_content question.title, question.body
  end
end

