class Question < ActiveRecord::Base
	belongs_to :user
	has_many :answers
	has_many :comments, as: :feedback
	validates :title, :presence => true
	validates :body, :presence => true

  def self.top
    Question.order(:score).take(10)
  end

end
