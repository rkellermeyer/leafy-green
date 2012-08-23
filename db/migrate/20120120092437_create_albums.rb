class CreateAlbums < ActiveRecord::Migration
  def change
    create_table :albums do |t|
      t.integer :identity_id
      t.string :name
      t.string :caption

      t.timestamps
    end
  end
end
