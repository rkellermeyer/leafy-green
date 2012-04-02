# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended to check this file into your version control system.

ActiveRecord::Schema.define(:version => 20120331083731) do

  create_table "albums", :force => true do |t|
    t.integer  "identity_id"
    t.string   "name"
    t.string   "caption"
    t.datetime "created_at",                  :null => false
    t.datetime "updated_at",                  :null => false
    t.integer  "visibletype"
    t.string   "accessusers", :limit => 2000
  end

  create_table "categories", :force => true do |t|
    t.string   "name"
    t.integer  "parent_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "channels", :force => true do |t|
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "chats", :force => true do |t|
    t.string   "from"
    t.string   "to"
    t.string   "message"
    t.datetime "sent"
    t.integer  "recd",       :default => 0
    t.datetime "created_at",                :null => false
    t.datetime "updated_at",                :null => false
  end

  create_table "facebooks", :force => true do |t|
    t.string   "identifier",   :limit => 20
    t.string   "access_token"
    t.datetime "created_at",                 :null => false
    t.datetime "updated_at",                 :null => false
  end

  create_table "friendships", :force => true do |t|
    t.integer  "user_id"
    t.integer  "friend_id"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "identities", :force => true do |t|
    t.string   "name"
    t.string   "email"
    t.string   "password_digest"
    t.datetime "created_at",      :null => false
    t.datetime "updated_at",      :null => false
    t.string   "last_name"
    t.string   "image"
    t.text     "categories"
    t.string   "username"
    t.string   "confirmemail"
    t.integer  "month"
    t.integer  "day"
    t.integer  "year"
    t.string   "gender"
  end

  create_table "invite_friends", :force => true do |t|
    t.integer  "channel_id"
    t.integer  "user_id"
    t.integer  "friend_id"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "messages", :force => true do |t|
    t.string   "msg_body"
    t.string   "sender"
    t.string   "channel"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "photos", :force => true do |t|
    t.integer  "identity_id"
    t.string   "photo_file_name"
    t.string   "photo_content_type"
    t.integer  "photo_file_size"
    t.integer  "visible"
    t.datetime "photo_updated_at"
    t.datetime "created_at",         :null => false
    t.datetime "updated_at",         :null => false
    t.string   "tag"
    t.datetime "publishdate"
    t.string   "caption"
    t.integer  "album_id"
  end

  create_table "postcomments", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.integer  "post_id"
    t.integer  "identity_id"
    t.datetime "created_at",  :null => false
    t.datetime "updated_at",  :null => false
  end

  create_table "posts", :force => true do |t|
    t.string   "title"
    t.text     "content"
    t.decimal  "score",            :precision => 10, :scale => 0
    t.integer  "rate_up"
    t.integer  "rate_down"
    t.integer  "votes"
    t.integer  "user_id"
    t.integer  "category_id"
    t.boolean  "visible"
    t.datetime "created_at",                                      :null => false
    t.datetime "updated_at",                                      :null => false
    t.string   "image"
    t.string   "remote_image_url"
  end

  create_table "spider_urls", :force => true do |t|
    t.string   "mainSpiderUrl"
    t.string   "subSpiderUrl"
    t.datetime "created_at",    :null => false
    t.datetime "updated_at",    :null => false
  end

  create_table "tags", :force => true do |t|
    t.integer  "photo_id"
    t.string   "tag_value"
    t.integer  "xpos"
    t.integer  "ypos"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

  create_table "users", :force => true do |t|
    t.string   "provider"
    t.string   "uid"
    t.string   "name"
    t.datetime "created_at", :null => false
    t.datetime "updated_at", :null => false
  end

end
