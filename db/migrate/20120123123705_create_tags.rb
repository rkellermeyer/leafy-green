class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :photo_id
      t.string :tag_value
      t.integer :xpos
      t.integer :ypos

      t.timestamps
    end
  end
end
