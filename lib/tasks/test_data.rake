#lib/tasks/test_data.rake

task :create_posts_for_categories => :environment do
  puts "Beginning posts creation"
  categories = Category.all
  5.times do
    categories.map do |category|
      postIt = (1..500).to_a
      rate_down = postIt.sample(1).first.to_f
      rate_up = postIt.sample(1).first.to_f
      votes = rate_up + rate_down
      score = (rate_up / votes)
      post = Post.create(:title => Faker::Company.bs, :category_id => category.id, :user_id => 1, :votes => votes, :rate_up => rate_up, :rate_down => rate_down, :score => score.round(4), :content => Faker::Lorem.paragraphs(paragraph_count = 3))
      #puts score.round(4).to_s
      puts "."
    end
  end
  puts "All set!"
end
