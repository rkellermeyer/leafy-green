class AddPublisherToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :publisher, :string

  end
end
