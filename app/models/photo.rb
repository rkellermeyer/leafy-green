class Photo < ActiveRecord::Base

 attr_accessible :photo, :identity_id , :visible,:caption,:publishdate ,:album_id

  has_attached_file :photo,
       :styles => {
         :thumb => "70x70#",
         :small => "150x150#"
       },
         :storage => :s3,
     :s3_credentials => "#{Rails.root}/config/s3.yml",
     :path => ":attachment/:id/:style.:extension",
     :bucket => 'development_utilities_rnk2011'
     
        validates_presence_of :photo 
        validates_attachment_content_type :photo,
       :content_type => ['image/jpeg', 'image/pjpeg',
                                        'image/jpg', 'image/png']
                                        
   belongs_to :identity
                                        
   CONSTANT= [["True", "1"], ["False","0"]]
                                         
end
