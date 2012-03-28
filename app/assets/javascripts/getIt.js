var friendsData;

$(function() {
   
   $.getJSON("/albums.json", function(data){
   
    for(c in data){
   		
	    if ( $.isPlainObject(data[c])){
	         
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
    	if ( $.isPlainObject(data[i])){
    	
   

      		//$("#friends_list1").append("<li><span id="+data[i].id+"></span> Name &nbsp;&nbsp; <a  href='javascript:void(0)' onclick=javascript:chatWith('" + data[i].name + "') >"+data[i].name +"</a></li>");
      		$("#friends_list").append("<li><span id="+data[i].id+"></span> Name &nbsp;&nbsp;" + data[i].name + "</li>");
      		
      		if (data[i].friend_id) 
      			$("#selectvalidusers").append("<input type='checkbox' name='album[accessusers][]' value='"+ data[i].friend_id +"'>" + data[i].name + "</input> &nbsp;&nbsp;&nbsp;");
      		else
      			$("#selectvalidusers").append("<input type='checkbox' name='album[accessusers][]' value='"+ data[i].uid +"'>" + data[i].name + "</input> &nbsp;&nbsp;&nbsp;");
      }
    }
    
      
    
  });
  
 
  $.getJSON("/photos", function(data){
    //console.log(data);
    for(var i in data) {
    	if ( $.isPlainObject(data[i])){
    	//if (data[i].caption == null)
    	 //  data[i].caption =""
    	
      		//$("#photos_list").append("<li>"+data[i].photo_file_name + "&nbsp;&nbsp;<div id='dialog"+i+"' > <img width='50' height='50' src='/system/photos/" + data[i].id + "/thumb/" + data[i].photo_file_name + "' title='Click to Tag It' alt='"+data[i].photo_file_name+"' onclick= openPhoto("+ data[i].id +",'/system/photos/" + data[i].id + "/original/" + data[i].photo_file_name +"')> </div>"+ data[i].caption + "</li>");
      	}
    }
  });
  
});

function getAlbumsData(){

  $.get("/getAlbumsContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getAlbumsContent');
	    	$("#alubmsTabContent").replaceWith(data);
	    }, 'html');
}

function getFriendsData(){
	  $.getJSON("/friendships", function(data){
	        friendsData = data;
	      	for(var i in data) {
		    	if ( $.isPlainObject(data[i])){
		    	      		$("#friends_list1").append("<li><span id="+data[i].id+"></span> Name &nbsp;&nbsp; <a  href='javascript:void(0)' onclick=javascript:chatWith('" + data[i].name + "') >"+data[i].name +"</a></li>");
		      	 }
	      	}
        });
}

function getPhotosData(){
  $.get("/getPhotosContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getPhotosData');
	    	$("#photosTabContent").replaceWith(data);
	    }, 'html');
}

function getUploadPhotosData(){
  $.get("/getUploadPhotosContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getUploadPhotosContent');
	    	$("#uploadPhotosTabContent").replaceWith(data);
	    }, 'html');
}

function getFriendsAlbumsTabContent(){
  $.get("/getFriendsAlbumsTabContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getUploadPhotosContent');
	    	$("#friendsAlbumsTabContent").replaceWith(data);
	    }, 'html');
}

function getGreenBlogs(){
    $.get("/getGreenBlogs", null, function(data, textStatus, jqXHR){
	    	console.log('response greenblogs');
	    	$("#greenBlog").replaceWith(data);
	    }, 'html');
}

function getRateMy(){
    $.get("/getRateMy", null, function(data, textStatus, jqXHR){
	    	console.log('response getRateMy');
	    	if ($("#getRateMy").length>0)
	    		$("#getRateMy").replaceWith(data);
	    	else
	    		$("#green_chat").replaceWith(data);
	    	//setTimeout('callme()',4000);
	    }, 'html');
}

function getAddFriendsListContent(){
  $.get("/getAddFriendsListContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getAddFriendsListContent');
	    	$("#addFriendsList").replaceWith(data);
	    }, 'html');
}

function getCreateChatRoomTabContent(){
  $.get("/getCreateChatRoomTabContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getCreateChatRoomTabContent');
	    	$("#createChatRoomTabContent").replaceWith(data);
	    }, 'html');
}

function getChatWithFriendsTabContent(){
  $.get("/getChatWithFriendsTabContent", null, function(data, textStatus, jqXHR){
	    	console.log('response getChatWithFriendsTabContent');
	    	$("#chatWithFriendsTabContent").replaceWith(data);
	    }, 'html');
}


function afterLogin(){
	getGreenBlogs();
	getRateMy();
	
	getAlbumsData();
	getPhotosData();
	getUploadPhotosData();
	getFriendsAlbumsTabContent();
	
	getAddFriendsListContent();
	getFriendsData();
	getCreateChatRoomTabContent();
	//getChatWithFriendsTabContent();
}