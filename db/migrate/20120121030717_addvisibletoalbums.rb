class Addvisibletoalbums < ActiveRecord::Migration
  def change
      add_column :albums, :visibletype, :integer
      add_column :albums, :accessusers, :string,  :limit => 2000
  end

  
end
