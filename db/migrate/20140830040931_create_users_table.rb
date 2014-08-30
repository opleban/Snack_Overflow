class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, limit:30
      t.string :username, limit:30
      t.string :email, limit:30
      t.string :password, limit:30
      t.timestamps
    end
  end
end
