class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.string :name
      t.timestamps
    end

    create_table :questions_tags do |t|
      t.belongs_to :tags
      t.belongs_to :questions
    end
  end
end
