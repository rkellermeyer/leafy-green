class Category < ActiveRecord::Base

  def categoryContains(interestObjects, catId)

	puts "****************** interest OJbects = "+interestObjects.to_s
	puts "****************** catId = "+catId.to_s;
	cat_str = "\""+catId.to_s+"\""
	puts "****************** cat_str = "+cat_str;
	 if interestObjects.to_s.include? cat_str
	 	return true
	 end

	return false;
 end
 
end
