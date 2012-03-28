class Postcomment < ActiveRecord::Base
  belongs_to :post
  belongs_to :identity
  
  scope :recent, :order => "created_at DESC", :limit => 5
  
end
