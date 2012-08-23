class ConvertCategoriesToTextInUsers < ActiveRecord::Migration
  def change
    change_column :identities, :categories, :text
  end
end
