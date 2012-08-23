class CreateNotices < ActiveRecord::Migration
  def change
    create_table :notices do |t|
      t.string :message
      t.integer :sender_id
      t.integer :receiver_id
      t.string :notice_type

      t.timestamps
    end
  end
end
