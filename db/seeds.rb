require 'faker'

module OverflowImporter
  def self.import
    20.times do
      FactoryGirl.create(:user)
    end
    20.times do
      question = FactoryGirl.create(:question, user:User.all.sample)
      question.tags << FactoryGirl.create(:tag)

    end
    30.times do
      FactoryGirl.create(:answer, question:Question.all.sample, user:User.all.sample)
      comment = FactoryGirl.create(:comment, user:User.all.sample)
      [Question.all.sample, Answer.all.sample].sample.comments << comment
    end
  end
end

OverflowImporter.import

