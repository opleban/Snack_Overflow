class Answer < ActiveRecord::Base
	has_many :comments, as: :feedback

	validates :body, :presence => true
end
