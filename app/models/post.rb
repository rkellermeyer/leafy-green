class Post < ActiveRecord::Base
  # log high score
  def scored(score)
    if score > self.high_score
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

  #load top 20 by category
end
