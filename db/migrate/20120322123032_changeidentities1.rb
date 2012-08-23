class Changeidentities1 < ActiveRecord::Migration
   def change
   
    remove_column :identities, :zipcode
  end
end
