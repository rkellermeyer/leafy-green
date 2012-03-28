 require 'anemone'
class Post < ActiveRecord::Base
 before_save :default_values
  
  

  
  
  def default_values
    self.score = 0 unless self.score
  end


  #attr_accessible :title, :content, :category_id, :visible, :image
  validates_presence_of :title, :content, :category_id
  #serialize :content
  belongs_to :user
  belongs_to :identity
  mount_uploader :image, ImageUploader

  #build top 20 by category
  def self.build_top_20(category)
    c = Category.where(:name => category).first
    posts = Post.where(:category_id => c.id).order("score DESC").limit(20).all
    #logger.info posts.count
    $redis.lpush(c.name, posts)
  end

  #list top 20 by Category
  def self.list_top_20(category)
    $redis.lindex(category,0)
  end
end
