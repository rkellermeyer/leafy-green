class Post < ActiveRecord::Base
  attribute_accessible :title, :content, :category_id, :visible
  validate-presence_of :title, :content, :category_id
  serialize :content
  belongs_to :user
  
  # log high score
  def scored(score)
    if score < self.score
      $redis.zadd("highscores", score, self.id)
    end
  end

  # table rank
  def rank
    $redis.zrevrank("highscores", self.id) + 1
  end

  # high score
  def high_score
    $redis.zscore("highscores", self.id).to_i
  end

  # load top 100 posts
  def self.top_100
    $redis.zrevrange("highscores", 0, 99).map{|id| Post.find(id)}
  end

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
