# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :user do
    name {Faker::Name.name}
    username {Faker::Internet.user_name}
    email {Faker::Internet.email}
    password {Faker::Internet.password}
  end
end
