class CreateQuestionsTagsJoinTable < ActiveRecord::Migration
  def change
    create_table :questions_tags do |t|
      t.integer :tag_id
      t.integer :question_id
    end
  end
end
