# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :question do
    title {Faker::Lorem.sentence}
    body {Faker::Lorem.sentences.join}
    user
  end
end
