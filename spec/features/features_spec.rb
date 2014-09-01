require_relative '../rails_helper'




feature "homepage" do
  scenario "displays 'Welcome'" do
    visit root_path
    expect(page).to have_content "Welcome to Snack Overflow"
  end
end

feature "sign in" do
  scenario "displays response when password too short" do
    visit new_session_path
    fill_in "session_password", :with => "x"
    click_on "Sign in"
    expect(page).to have_content "Invalid email/password combination"
  end
end

feature "sign up" do
  scenario "displays angry response when input is capitalized" do
    visit new_user_path
    fill_in "user_name", :with => "Turtle"
    fill_in "user_username", :with => "TurtleLover405"
    fill_in "user_email", :with => "turtlemolestor@dbc.com"
    fill_in "user_password", :with => "iliketurtles"

    click_on "Create my account"
    expect(page).to have_content "turtlemolestor@dbc.com"
  end
end
