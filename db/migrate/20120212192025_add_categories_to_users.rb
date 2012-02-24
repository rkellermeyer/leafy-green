class AddCategoriesToUsers < ActiveRecord::Migration
  def change
    add_column :identities, :categories, :string

  end
end
