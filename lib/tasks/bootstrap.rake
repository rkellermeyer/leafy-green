namespace :bootstrap do
      desc "Add the  Categories "
      task :default_category => :environment do
       
        Category.create( :name => 'Music',  :parent_id => 1 )
         Category.create( :name => 'Country',  :parent_id => 1 )
          Category.create( :name => 'Pop',  :parent_id => 1 )
          Category.create( :name => 'Rock', :parent_id => 1 )
        Category.create( :name => 'Rap/Hip Hop', :parent_id => 1 )
        Category.create( :name => 'Extreme',  :parent_id => 1)
         Category.create( :name => 'Sports',  :parent_id => 1 )
         Category.create( :name => 'Baseball',  :parent_id => 1 )
        Category.create( :name => 'Basketball',  :parent_id => 1 )
        Category.create( :name => 'Football',  :parent_id => 1 )
        Category.create( :name => 'Soccer',  :parent_id => 1 )
        Category.create( :name => 'Hockey',  :parent_id => 1 )
       
         Category.create( :name => 'Television',  :parent_id => 1 )
        Category.create( :name => 'Comedy',  :parent_id => 1 )
        Category.create( :name => 'Drama',  :parent_id => 1 )
        Category.create( :name => 'Suspense',  :parent_id => 1 )
        Category.create( :name => 'Horror',  :parent_id => 1 )
        Category.create( :name => 'Movies', :parent_id => 1 )
        
      end

      task :all => [:default_category]
      
    end
