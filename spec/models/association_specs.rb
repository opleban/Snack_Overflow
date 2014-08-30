require_relative "../rails_helper"
describe Question do
  it "should have many comments" do
    should have_many(:comments)
  end
end