require_relative "../rails_helper"

describe User do
  it {should have_many(:comments)}
  it {should have_many(:questions)}
  it {should have_many(:answers)}
end

describe Question do
  it {should have_many(:comments)}
  it {should have_many(:answers)}
  it {should belong_to(:user)}
  it {should have_and_belong_to_many(:tags)}
end

describe Answer do
  it {should belong_to (:question)}
  it {should have_many(:comments)}
end

describe Comment do
  it {should belong_to(:user)}
  it {should belong_to(:feedback)}
end

describe Tag do
  it {should have_and_belong_to_many(:questions)}
end