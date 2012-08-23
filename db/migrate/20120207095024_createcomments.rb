class Createcomments < ActiveRecord::Migration
  def change
    create_table :postcomments do |t|
      t.string :title
      t.text :content
      t.integer :post_id
      t.integer :identity_id
      t.timestamps
    end
  end
end
