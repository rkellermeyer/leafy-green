class Identity < OmniAuth::Identity::Models::ActiveRecord

  self.table_name = 'identities'
  
  #attr_accessible  :categories
  #attr_accessor :password
  #before_save :encrypt_password
  
  serialize :categories
  has_many :postcomments
  
  #has_many :posts, :dependent => :destroy
  #accepts_nested_attributes_for :posts, :allow_destroy => true, :reject_if => :all_blank
  #has_many :photos
   
  validates :name, :presence => true
  validates :email, :presence => true


  # follow a user
  def follow!(identity)
    $redis.multi do
      $redis.sadd(self.redis_key(:following), identity.id)
      $redis.sadd(identity.redis_key(:followers), self.id)
    end
  end

  # unfollow a identity
  def unfollow!(identity)
    $redis.multi do
      $redis.srem(self.redis_key(:following), identity.id)
      $redis.srem(identity.redis_key(:followers), self.id)
    end
  end

  # identitys that self follows
  def followers
    identity_ids = $redis.smembers(self.redis_key(:followers))
    Identity.where(:id => identity_ids)
  end

  # identitys that follow self
  def following
    identity_ids = $redis.smembers(self.redis_key(:following))
    Identity.where(:id => identity_ids)
  end

  # identitys who follow and are being followed by self
  def friends
    identity_ids = $redis.sinter(self.redis_key(:following), self.redis_key(:followers))
    Identity.where(:id => identity_ids)
  end

  # does the identity follow self
  def followed_by?(identity)
    $redis.sismember(self.redis_key(:followers), identity.id)
  end

  # does self follow identity
  def following?(identity)
    $redis.sismember(self.redis_key(:following), identity.id)
  end

  # number of followers
  def followers_count
    $redis.scard(self.redis_key(:followers))
  end

  # number of identitys being followed
  def following_count
    $redis.scard(self.redis_key(:following))
  end

  # follow a category
  def fcategory(category)
    #c = Category.find(category)
    #cats = $redis.sadd(self.redis_key(:categories), c.to_json)
    #self.categories = cats.to_json
  end

  # follows categories
  def cfollows
    #category_ids = $redis.smembers(self.redis_key(:categories))
  end

  # helper method to generate redis keys
  def redis_key(str)
    "identity:#{self.id}:#{str}"
  end
 
end

