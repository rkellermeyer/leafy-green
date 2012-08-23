class ChangePhotos < ActiveRecord::Migration
  def change
   add_column :photos, :tag, :string
    add_column :photos, :publishdate, :datetime
    add_column :photos, :caption, :string
  end
end
