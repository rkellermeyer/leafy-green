class AddFieldsToPhoto < ActiveRecord::Migration
  def change
    add_column :photos, :votes, :integer

    add_column :photos, :rate_up, :integer

    add_column :photos, :rate_down, :integer

    add_column :photos, :score, :float

  end
end
