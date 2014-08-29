class Comment < ActiveRecord::Base
	belongs_to :feedback, polymorphic: true

	validates :body, :presence => true
end
