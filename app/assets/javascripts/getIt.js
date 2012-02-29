var friendsData;

$(function() {
   
   $.getJSON("/albums.json", function(data){
   
    for(c in data){
   		
	    if ( jQuery.isPlainObject(data[c])){
	         
	        var jj="#slider_"+data[c].id
	   $(jj).easySlider({auto: true,continuous: true });
	   
	    }
	    }
   });
   
});

 
 $(function() {
  
  $.getJSON("/friendships", function(data){
    //console.log(data);
    friendsData = data;
    $("#selectvalidusers").append("<div>Select Access Users: </div>");
    for(var i in data) {
    	if ( jQuery.isPlainObject(data[i])){
    	
   

      		//$("#friends_list1").append("<li><span id="+data[i].id+"></span> Name &nbsp;&nbsp; <a  href='javascript:void(0)' onclick=javascript:chatWith('" + data[i].name + "') >"+data[i].name +"</a></li>");
      		$("#friends_list").append("<li><span id="+data[i].id+"></span> Name &nbsp;&nbsp;" + data[i].name + "</li>");
      		
      		if (data[i].friend_id) 
      			$("#selectvalidusers").append("<input type='checkbox' name='album[accessusers][]' value='"+ data[i].friend_id +"'>" + data[i].name + "</input> &nbsp;&nbsp;&nbsp;");
      		else
      			$("#selectvalidusers").append("<input type='checkbox' name='album[accessusers][]' value='"+ data[i].uid +"'>" + data[i].name + "</input> &nbsp;&nbsp;&nbsp;");
      }
    }
    
      
    
  });
  
 
  
  $.getJSON("/friend_photos", function(data){
    //console.log(data);
   
    for(var i in data) {
       if ( jQuery.isPlainObject(data[i])){
         	var dat1="friend_name"+data[i].identity_id;
         	$(dat1).append(getName( data[i].identity_id));
    	    $("#friendphotos_list").append("<br/><li><span id="+dat1+"></span><br/>"+data[i].photo_file_name + "&nbsp;&nbsp;<img width='50' height='50' src='/system/photos/" + data[i].id + "/thumb/" + data[i].photo_file_name + " 'alt='"+data[i].photo_file_name+"'> </li>");
      	}
    }
  });

  
  $.getJSON("/photos", function(data){
    //console.log(data);
    for(var i in data) {
    	if ( jQuery.isPlainObject(data[i])){
    	//if (data[i].caption == null)
    	 //  data[i].caption =""
    	
      		//$("#photos_list").append("<li>"+data[i].photo_file_name + "&nbsp;&nbsp;<div id='dialog"+i+"' > <img width='50' height='50' src='/system/photos/" + data[i].id + "/thumb/" + data[i].photo_file_name + "' title='Click to Tag It' alt='"+data[i].photo_file_name+"' onclick= openPhoto("+ data[i].id +",'/system/photos/" + data[i].id + "/original/" + data[i].photo_file_name +"')> </div>"+ data[i].caption + "</li>");
      	}
    }
  });
  
  
  
  
  
  
});