class Question < ActiveRecord::Base
	belongs_to :user
	has_many :answers
	has_many :comments, as: :feedback
  has_and_belongs_to_many :tags

	validates :title, :presence => true
	validates :body, :presence => true

  def self.top
    User.take()
  end
  scope :top, -> (score) { where("scope < ?", time) }
end
