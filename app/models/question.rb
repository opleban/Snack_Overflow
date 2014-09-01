class Question < ActiveRecord::Base
	belongs_to :user
	has_many :answers
	has_many :comments, as: :feedback
  has_and_belongs_to_many :tags

	validates :title, :presence => true
	validates :body, :presence => true

  def self.top
    Question.order(:score).last(10).reverse
  end

  def self.recent
    Question.order(:created_at).last(10).reverse
  end


  def show
  end

  def index
  end

  def new
  end

end
