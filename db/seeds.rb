require 'faker'

module QuestionImporter
  def self.import
    10.times do
      Question.create(title: Faker::Lorem.sentence,
                      body: Faker::Lorem.sentence,
                      :user_id => rand(1..10))
    end
  end
end

module UserImporter
  def self.import
    10.times do
      User.create(user_name: Faker::Internet.user_name,
                  email: Faker::Internet.email)
    end
  end
end

module AnswerImporter
  def self.import
    50.times do
      Answer.create(body: Faker::Lorem.sentence,
                    :user_id => rand(1..10))
    end
  end
end

AnswerImporter.import
QuestionImporter.import
UserImporter.import

