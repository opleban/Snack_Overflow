# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :answer do
    body Faker::Hacker.say_something_smart
    question
    user
  end
end
