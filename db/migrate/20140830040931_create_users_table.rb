class CreateUsersTable < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :name, limit:50, :null => false
      t.string :username, limit:50, :null => false
      t.string :email, limit:50, :null => false
      t.string :password, limit:50, :null => false
      t.timestamps
    end
  end
end
