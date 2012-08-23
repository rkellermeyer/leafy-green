class AddRefIdToNotice < ActiveRecord::Migration
  def change
    add_column :notices, :ref_id, :integer

  end
end
