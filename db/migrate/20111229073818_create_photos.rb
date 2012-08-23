class CreatePhotos < ActiveRecord::Migration
  def up
    create_table :photos do |t|
      t.integer :identity_id
      t.string :photo_file_name
      t.string :photo_content_type
      t.integer :photo_file_size
      t.integer :visible
      t.datetime :photo_updated_at

      t.timestamps
    end
  end
end
