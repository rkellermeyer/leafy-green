class CreatePosts < ActiveRecord::Migration
  def change
    create_table :posts do |t|
      t.string :title
      t.text :content
      t.decimal :score
      t.integer :rate_up
      t.integer :rate_down
      t.integer :votes
      t.integer :user_id
      t.integer :category_id
      t.boolean :visible

      t.timestamps
    end
  end
end
