FactoryGirl.define do
  factory :user do
    name {Faker::Name.name}
    username {Faker::Internet.user_name}
    email {Faker::Internet.email}
    password {Faker::Internet.password}
  end

  factory :tag do
    name Faker::Hacker.adjective
  end

  factory :question do
    title {Faker::Lorem.sentence}
    body {Faker::Lorem.sentences.join}
    user
  end

  factory :comment do
    body {Faker::Lorem.sentence}
  end

  factory :answer do
    body Faker::Hacker.say_something_smart
    question
    user
  end
end

