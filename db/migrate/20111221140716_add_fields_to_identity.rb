class AddFieldsToIdentity < ActiveRecord::Migration
  def change
   
    add_column :identities, :last_name, :string
    add_column :identities, :zipcode, :numeric
    add_column :identities, :image, :string
  end
end
