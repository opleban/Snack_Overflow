class Question < ActiveRecord::Base
	has_many :comments, as: :feedback

	validates :title, :presence => true
	validates :body, :presence => true
end
