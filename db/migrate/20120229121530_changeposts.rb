class Changeposts < ActiveRecord::Migration
  def change
    add_column :posts, :remote_image_url, :string
    
  end

end
