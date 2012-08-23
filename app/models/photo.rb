class Photo < ActiveRecord::Base
  attr_accessible  :identity_id , :visible, :caption, :publishdate, :album_id, :image, :category_id
  #validates_presence_of :image
  mount_uploader :image, ImageUploader
  # has_attached_file :photo,:styles => {:thumb => "70x70#",:small => "150x150#"}
  #,
  # :storage => :s3,
  # :s3_credentials => "#{Rails.root}/config/s3.yml",
  # :path => ":attachment/:id/:style.:extension",
  # :bucket => 'development_utilities_rnk2011'                                     
  belongs_to :identity 
  CONSTANT= [["True", "1"], ["False","0"]]
end
