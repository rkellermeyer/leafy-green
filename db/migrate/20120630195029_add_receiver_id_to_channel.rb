class AddReceiverIdToChannel < ActiveRecord::Migration
  def change
    add_column :channels, :receiver_id, :integer

  end
end
