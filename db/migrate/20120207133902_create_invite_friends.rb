class CreateInviteFriends < ActiveRecord::Migration
  def change
    create_table :invite_friends do |t|
      t.integer :channel_id
      t.integer :user_id
      t.integer :friend_id

      t.timestamps
    end
  end
end
