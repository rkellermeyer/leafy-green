class ConvertCategoriesToTextInUsers < ActiveRecord::Migration
  def change
    change_column :users, :categories, :text
  end
end
