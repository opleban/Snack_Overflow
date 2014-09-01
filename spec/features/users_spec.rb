require_relative '../rails_helper'




feature "homepage" do
  scenario "displays 'Welcome'" do
    visit root_path
    expect(page).to have_content "Welcome to Snack Overflow"
  end
end

feature "sign in" do
  scenario "displays response when password too short" do
    visit '/sessions/new'
    fill_in "session_password", :with => "x"
    click_on "Sign in"
    expect(page).to have_content "Invalid email/password combination"
  end
end

feature "grandma's normal response" do
  scenario "displays angry response when input is capitalized" do
    visit '/grandma'
    fill_in "input", :with => "GRANDMA YOU'RE LAME"
    click_on "Say it!"
    expect(page).to have_content "Shut the fuck up sonny!"
  end
end
