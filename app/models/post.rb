class Post < ActiveRecord::Base
<<<<<<< HEAD
  attribute_accessible :title, :content, :category_id, :visible
  validate-presence_of :title, :content, :category_id
=======
  #attr_accessible :title, :content, :category_id, :visible
  validates_presence_of :title, :content, :category_id
>>>>>>> ece7e9f0ae11afbc4ed625dc17ae4932c23badb8
  serialize :content
  belongs_to :user

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
