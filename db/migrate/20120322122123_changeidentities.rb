class Changeidentities < ActiveRecord::Migration
   def change
   
    add_column :identities, :username, :string
    add_column :identities, :confirmemail, :string
    add_column :identities, :month, :integer
    add_column :identities, :day, :integer
    add_column :identities, :year, :integer 
    add_column :identities, :gender, :string
  end
end
