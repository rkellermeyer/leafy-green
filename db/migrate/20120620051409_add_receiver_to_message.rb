class AddReceiverToMessage < ActiveRecord::Migration
  def change
    add_column :messages, :receiver, :integer

  end
end
