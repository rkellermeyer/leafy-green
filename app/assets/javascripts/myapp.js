   var loggedInUserId = null;
   
     $(function () {
     
     
      
           var apiKey = '1e327eadb60c60b16219f705db8dd5be';
          var userId = '76738653@N02';
          var tag = '<COMMA SEPERATED LIST OF TAGS>';
          var perPage = '25';
          var showOnPage = '6';
          
            $('#new_photo').submit(function () {
            var myForm = $("#new_photo");
            var x=document.forms["new_photo"]["photo_photo"].value;
 
             if (x==null || x=="")
                {
                   alert("You have to select Photo");
                    return false;
                 }

});

          /* $.getJSON('http://api.flickr.com/services/rest/?format=json&method='+
           'flickr.people.getPublicPhotos&api_key=' + apiKey + '&user_id=' + userId +
           '&tags=' + tag + '&per_page=' + perPage + '&jsoncallback=?',
           function(data){
           var classShown = 'class="lightbox"';
           var classHidden = 'class="lightbox hidden"';
           $("<ul title='My Gallery' id='flickr_ul'></ul>").appendTo("#flickr");
           $.each(data.photos.photo, function(i, rPhoto){
           var basePhotoURL = 'http://farm' + rPhoto.farm + '.static.flickr.com/'
           + rPhoto.server + '/' + rPhoto.id + '_' + rPhoto.secret;

           var thumbPhotoURL = basePhotoURL + '_s.jpg';
           var mediumPhotoURL = basePhotoURL + '.jpg';

           var photoStringStart = '<li><a ';
           var photoStringEnd = 'title="' + rPhoto.title + '" href="'+
           mediumPhotoURL +'"><img src="' + thumbPhotoURL + '" alt="' +
           rPhoto.title + '"/></a></li>;'
           var photoString = (i < showOnPage) ?
           photoStringStart + classShown + photoStringEnd :
           photoStringStart + classHidden + photoStringEnd;

           $(photoString).appendTo("#flickr_ul");
           });
           document.getElementById('#flickr').style.display="block";
           $('#flickr_ul').jqGalViewII();
           //$("a.lightbox").lightBox();
           });*/
      });

         
         function getMessages2(channelId, channelName){
		console.log('chann = '+channelId);
		global_channelId = channelId;
		global_channelName = channelName;
		if (document.getElementById('channel_id')!=null)
			document.getElementById('channel_id').value = global_channelId;
		$.get('\getMessagesOnChannel', {channel_id: channelId}, function(data, textStatus, jqXHR){
		    	$('#messages2').show();
		    	$("#messages2").append("<br/>"+channelName+"&nbsp; Messages");
		    	$("#messages2").append("&nbsp; &nbsp; &nbsp; &nbsp; <a href='\downloadMessagesOnChannel?channel_id="+channelId+"'>Download Messages</a><hr/>");
		    	for(var i in data) {
			    	if ( jQuery.isPlainObject(data[i])){
			      		$("#messages2").append("<li>"+data[i].sender +":&nbsp;&nbsp;" + data[i].msg_body + "</li>");
			      	}
		        }
		    }, 'json');
		$('#messages2').empty();
        $('#messages2').hide();
	}
	
	function downloadMsgs(downloadChId){
		alert(downloadChId);
	}
	
	var global_channelId = '';
	var global_channelName = '';
	
	function myPooling(){
		if (global_channelId != '' && global_channelName!= ''){
			getMessages2(global_channelId,global_channelName);
		}
	}
	
	setInterval('myPooling()',5000);
	
      function flick() {
          var username = document.getElementById('url').value;

      }

     function getName1(identitiyId){
		console.log('name = '+identitiyId);
		$.get('\getNamesOnId', {id: identitiyId}, function(data, textStatus, jqXHR){
		    	
		    	//$("#friend_name").append(data[0].name);
		    	
		    	for(var i in data) {
				    	if ( jQuery.isPlainObject(data[i])){
					    	var dat="#album_name"+data[i].id
					    	//console.log("val 2222 = "+ i +" = "+ dat);
					    	$(dat).html("Albums of "+data[i].name+"<br/>");
					    	break;
				    	}
			    	}
		    	
		    }, 'json');
		
	}
	
	function showuserstoselect(val){
		if (val == 0){
			document.getElementById('selectvalidusers').style.display = "block";
		} else {
			document.getElementById('selectvalidusers').style.display = "none";
		}
	}
	
	function updatetheuserstoselect(val, albumId, existingSelUsers){
		if (val == 0){
			if (existingSelUsers==''){
				refreshAlubmFriendsList(albumId, null);
			} else {
				var strArray = existingSelUsers.split(",");
				refreshAlubmFriendsList(albumId, strArray);
			}
			document.getElementById('selectvalidusers_'+albumId).style.display = "block";
		} else {
			document.getElementById('selectvalidusers_'+albumId).style.display = "none";
			document.getElementById('selectvalidusers_'+albumId).innerHTML = "";
			
		}
		
	}
	
	function refreshAlubmFriendsList(albumId, selUsers){
		for(var i in friendsData) {
	    	if ( jQuery.isPlainObject(friendsData[i])){
	      		if (friendsData[i].friend_id) {
	      			if (selUsers == null || !Search_Array(selUsers, friendsData[i].friend_id )) {
	      				$("#selectvalidusers_"+albumId).append("<input type='checkbox' name='album[accessusers][]' value='"+ friendsData[i].friend_id +"'>" + friendsData[i].name + "</input> &nbsp;&nbsp;&nbsp;");
	      			} else {
	      				$("#selectvalidusers_"+albumId).append("<input type='checkbox' checked='checked' name='album[accessusers][]' value='"+ friendsData[i].friend_id +"'>" + friendsData[i].name + "</input> &nbsp;&nbsp;&nbsp;");
	      			}
	      		}
	      		else {
	      			if (selUsers == null  || !Search_Array(selUsers, friendsData[i].uid )){
	      				$("#selectvalidusers_"+albumId).append("<input type='checkbox' name='album[accessusers][]' value='"+ friendsData[i].uid +"'>" + friendsData[i].name + "</input> &nbsp;&nbsp;&nbsp;");
	      			} else {
	      				$("#selectvalidusers_"+albumId).append("<input type='checkbox' checked='checked' name='album[accessusers][]' value='"+ friendsData[i].uid +"'>" + friendsData[i].name + "</input> &nbsp;&nbsp;&nbsp;");
	      			}
	      		}
	      }
	    }
	}
	
	function Search_Array(ArrayObj, SearchFor){
	  var Found = false;
	  for (var i = 0; i < ArrayObj.length; i++){
	    if (ArrayObj[i] == SearchFor){
	      return true;
	      var Found = true;
	      break;
	    }
	    else if ((i == (ArrayObj.length - 1)) && (!Found)){
	      if (ArrayObj[i] != SearchFor){
	        return false;
	      }
	    }
	  }
	}
	
	 var targetX, targetY, photoId; var tagCounter = 0; 
    
    function openPhoto(currPhotoId, val){
    photoId = currPhotoId;
     $('#Photo').html("<img src='"+val+"'></img>");
     
      $("#Photo img").wrap('<div id="tag-wrapper"></div>'); 
    //Dynamically size wrapper div based on image dimensions 
    $("#tag-wrapper").css({width: $("#Photo img").outerWidth(), height: $("#Photo img").outerHeight()}); 
    //Append #tag-target content and #tag-input content && adding form tag
     $("#tag-wrapper").append('<div id="tag-target"></div><div id="tag-input"><form method="post" id="tag_post" action="/tagcreate"><label for="tag-name">Tag\'s Name:</label><input type="text" name="tag[tag_value]" id="tag-name"> <input type="hidden" name="tag[photo_id]" id="tag_photo_id"> <input type="hidden" name="tag[xpos]" id="tag_xpos"> <input type="hidden" name="tag[ypos]"  id="tag_ypos"> <button type="submit" id="tag-name-submit-button">Submit</button><button type="reset">Cancel</button></form></div>');
     
     $("#tag-wrapper").click(function(e){ $("img").click(function(e){ 
     //Determine area within element that mouse was clicked 
     mouseX = e.pageX - $("#tag-wrapper").offset().left; mouseY = e.pageY - $("#tag-wrapper").offset().top; 
     //Get height and width of #tag-target 
     targetWidth = $("#tag-target").outerWidth(); targetHeight = $("#tag-target").outerHeight();
      //Determine position for #tag-target
       targetX = mouseX-targetWidth/2; targetY = mouseY-targetHeight/2; 
      //Determine position for  #tag-input 
      inputX = mouseX+targetWidth/2; inputY = mouseY-targetHeight/2; 
      //Animate if second click, else position and fade in for first click
       if($("#tag-target").css("display")=="block") { 
       		$("#tag-target").animate({left: targetX, top: targetY}, 500);
        	$("#tag-input").animate({left: inputX, top: inputY}, 500); 
        } 
        else { 
        	$("#tag-target").css({left: targetX, top: targetY}).fadeIn(); 
        	$("#tag-input").css({left: inputX, top: inputY}).fadeIn(); 
        } 
      //Give input  focus
       $("#tag-name").focus(); 

 			
});}); 

       // post the form in Ajax req
          $('#tag_post').submit(function () {
			console.log("tag_post");
		    $.post(this.action, $(this).serialize(), function(data, textStatus, jqXHR){
			    	console.log('response from tag save');
			    }, 'json');

	    		return false;
  			}); 
  			
$('button[type="reset"]').click(function(){ closeTagInput(); }); 
//If enter button is clicked within #tag-input
// $("#tag-name").keyup(function(e) { if(e.keyCode == 13) submitTag(); });
  //If submit button is clicked 
  $("#tag-name-submit-button").bind('click', function(event){ submitTag(); }); 
    
      $.get('getTagsOnPhoto',{photo_id: currPhotoId},  function(data, textStatus, jqXHR){
   var removelink = "Remove";
    //console.log(data);
    for(var i in data) {
    	if ( jQuery.isPlainObject(data[i])){
    
    	$("#tag-wrapper").after('<p id="hotspot-item-' + data[i].id + '">' + data[i].tag_value + ' <span class="remove" onclick="removeTag(' + data[i].id + ')" onmouseover="showTag(' + data[i].id + ')" onmouseout="hideTag(' + data[i].id + ')">(Remove)</span></p>'); 
	      //Adds a new hotspot to image 
	      $("#tag-wrapper").append('<div id="hotspot-' + data[i].id + '" onmouseover="showTag(' + data[i].id + ')" onmouseout="hideTag(' + data[i].id + ')" class="hotspot" style="left:' + data[i].xpos + 'px; top:' + data[i].ypos + 'px;"><span>' + data[i].tag_value + '</span></div>');  closeTagInput();
	      
    	
	
      		
      	} }
      	 }, 'json');
      	
    }
    
    $(function() {
     
     
      $('#login_form').submit(function () {
			
		    $.post(this.action, $(this).serialize(), function(data, textStatus, jqXHR){
			    	console.log('response from login save'+jqXHR);
			    	
			    	// if(jqXHR && jqXHR.status == 200) {
               //document.location = 'http://localhost:3000/';
                //   }
                	loggedInUserId = data.uid;
                	afterLogin();
			    	document.getElementById("bodyContent").style.display="block";
			    	document.getElementById("loginForm").style.display="none";
			    	document.getElementById("newUserForm").style.display="none";
			    }, 'json');
            
	    		return false;
  			}); 
  			
      

       });

/*
 	$(function() {
 		$('#categories_form').submit(function () {
			console.log("categories_form");
		    $.post(this.action, $(this).serialize(), function(data, textStatus, jqXHR){
			    	console.log('response from categories_form update');
			    	 getRateMy();
			    }, 'json');
				//location.reload(true);
	    		return false;
  		}); 
  	});
*/
  		
  	function categoriesFormSubmit(obj){
  		console.log("categories_form");
		    $.post(obj.action, $(obj).serialize(), function(data, textStatus, jqXHR){
			    	console.log('response from categories_form update');
			    	 getRateMy();
			    }, 'json');
	    		return false;
  	}
  	
  	function postsFormSubmit(obj){
			  
			  $.ajax({
			      type: $('#method_type').val(),
			      url: obj.action+'/'+$('#post_id').val(),
			      data: $(obj).serialize(),
			      dataType: 'json',
			      success: function(msg) {
			      	getRateMy();
			        $('#post_id').val('');
    				$('#method_type').val('POST');
    				$('#post_title').val('');
    				$('#post_content').val('');
    				$('#image_url').val('');
    				$('#post_remote_image_url').val('');
    				$('#post_visible').attr('checked',false);
    				$("#post_imageQueue").html(''); 
			      }
			});
			    
    		return false;
  	}
  	
  	function postsCommentsSubmit(obj){
  
		    $.post(obj.action, $(obj).serialize(), function(data, textStatus, jqXHR){
			    	
			    	console.log('commented');
			    	 getRateMy();
			    	 jQuery(document).trigger('close.facebox');
			    

			    }, 'json');
	    		return false;
  	}
  	
  	
  		 $('#new_post').submit(function () {
			
		    $.post(this.action, $(this).serialize(), function(data, textStatus, jqXHR){
			    	getRateMy();
			    	$('#postMsgBox').append("successfully added");
			    }, 'json');
  		});  
  				
  		 $(function() {
				$('#register_form').submit(function () {
							console.log("register_form");
						    $.post(this.action, $(this).serialize(), function(data, textStatus, jqXHR){
							    	console.log('response from register_form = '+data);
							    	if (data!=null && data!='null'){
							    		document.getElementById("bodyContent").style.display="none";
								    	document.getElementById("loginForm").style.display="block";
								    	document.getElementById("newUserForm").style.display="none";	
																																																																																																											    	
							    	}
							    }, 'json');
					    		return false;
				  }); 
		})
		
      function submitTag() { 
	      	tagValue = $("#tag-name").val(); 
	      //Adds a new list item below image. Also adds events inline since they are dynamically created after page load 
	      $("#tag-wrapper").after('<p id="hotspot-item-' + tagCounter + '">' + tagValue + ' <span class="remove" onclick="removeTag(' + tagCounter + ')" onmouseover="showTag(' + tagCounter + ')" onmouseout="hideTag(' + tagCounter + ')">(Remove)</span></p>'); 
	      //Adds a new hotspot to image 
	      $("#tag-wrapper").append('<div id="hotspot-' + tagCounter + '" onmouseover="showTag(' + tagCounter + ')" onmouseout="hideTag(' + tagCounter + ')" class="hotspot" style="left:' + targetX + 'px; top:' + targetY + 'px;"><span>' + tagValue + '</span></div>'); tagCounter++; closeTagInput();
	      
	      // posting data to server
	      document.getElementById("tag_photo_id").value = photoId;
	       document.getElementById("tag_xpos").value = targetX;
	        document.getElementById("tag_ypos").value = targetY;
	        document.getElementById("tag-name").value = tagValue;
	        return true;
   	 }
 		 
       function closeTagInput() { $("#tag-target").fadeOut(); $("#tag-input").fadeOut(); $("#tag-name").val(""); } 
       function removeTag(i) { $("#hotspot-item-"+i).fadeOut(); $("#hotspot-"+i).fadeOut(); } 
       function showTag(i) { $("#hotspot-"+i).addClass("hotspothover"); } 
       function hideTag(i) { $("#hotspot-"+i).removeClass("hotspothover"); } 
	
		$(function() {
		
		 $.getJSON("/friendships", function(data){
        friendsData = data;
      for(var i in data) {
    	if ( $.isPlainObject(data[i])){
    	      		$("#friends_list1").append("<li><span id="+data[i].id+"></span> Name &nbsp;&nbsp; <a  href='javascript:void(0)' onclick=javascript:chatWith('" + data[i].name + "') >"+data[i].name +"</a></li>");
      	     }
      	     }
         });
  
          $('#flickr_form').submit(function () {
              console.log("test");
              var perPage = '25';
              var showOnPage = '6';
              $("#flickr").empty();
              $.get(this.action, $(this).serialize(), function (data, textStatus, jqXHR) {
                  var classShown = 'class="lightbox"';
                  var classHidden = 'class="lightbox hidden"';
                  $("<ul title='My Gallery' id='flickr_ul'></ul>").appendTo("#flickr");
                  $.each(data, function (i, rPhoto) {
                      var basePhotoURL = 'http://farm' + rPhoto.farm + '.static.flickr.com/'
                              + rPhoto.server + '/' + rPhoto.id + '_' + rPhoto.secret;

                      var thumbPhotoURL = basePhotoURL + '_s.jpg';
                      var mediumPhotoURL = basePhotoURL + '.jpg';

                      var photoStringStart = '<li><a ';
                      var photoStringEnd = 'title="' + rPhoto.title + '" href="' +
                              mediumPhotoURL + '"><img src="' + thumbPhotoURL + '" alt="' +
                              rPhoto.title + '"/></a></li>;'
                      var photoString = (i < showOnPage) ?
                              photoStringStart + classShown + photoStringEnd :
                              photoStringStart + classHidden + photoStringEnd;

                      $(photoString).appendTo("#flickr_ul");
                  });
                  document.getElementById('flickr').style.display = "block";
                  $('#flickr_ul').jqGalViewII();
              }, 'json');
              return false;
          });
      });

       $(function () {
       		setTimeout('callme()',2000);
       });
       
       function callme(){
       		var contentsArr = $('li[name=postscontents]');
       		for (i=0; i<contentsArr.size();i++){
       			console.log('content ('+i+') = '+ contentsArr.get(i).innerHTML);
       			var content = contentsArr.get(i).innerHTML;
       			var newContent = replaceURLWithHTMLLinks(content);
       			contentsArr.get(i).innerHTML = newContent;
       			console.log('content ('+i+') = '+ contentsArr.get(i).innerHTML);
       		}
       }
       
       function replaceURLWithHTMLLinks(text) {
		    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
		    return text.replace(exp,"<iframe src='$1' width='0' height='0' style='display: none;'></iframe><br/><iframe src='$1' width='250' height='100'></iframe>"); 
		}

      function getDealsOnDivision() {
          // https://api.groupon.com/v2/deals.json?division_id=austin&client_id=e20cbbda286f1cf6a603594a75a8083dd5ede33f
          var division = document.getElementById('division_id').value;
          /* 	$.get('https://api.groupon.com/v2/deals.json?division_id='+division+'&client_id=e20cbbda286f1cf6a603594a75a8083dd5ede33f',
           function(data){
           $('#myDeals').append('Deals Response'+data);
           });*/

          $.getJSON('https://api.groupon.com/v2/deals/' + division + '.json?client_id=fe6dfb020d0e522e065cf064327eff527cd9a702', function (data) {

              console.log($.json_decode(data));
          });
      }

	
		function rateposts(postsurl){
			 $.getJSON(postsurl, function (data) {
	              console.log(data);
	              getRateMy();
	          });
		}
		
		
		function populatePostContent(spiderUrl){
			$.getJSON('/getPopulatePostContent?spiderUrl='+spiderUrl, function (data) {
	              console.log(data);
	              $("#image_url").val(data.src);
	              $("#post_title").val(data.title);
	              $("#post_content").val(data.title);
	          });
	          
	        $.getJSON('/storeSpiderUrlsAnemone?spiderUrl='+spiderUrl, function (data) {
	              console.log('sotored the sub spider urls = '+data);
	              
	          });
		}
		
      function picasaImages() {
          var user = document.getElementById('urlname').value;
          var album = document.getElementById('album').value;
          var maxres = 5;

          var url = 'http://picasaweb.google.com/data/feed/api/user/' + user + '/album/' + album + '?kind=photo&alt=json-in-script&callback=renderer&access=public&start-index=1';
          if (maxres != 0) {
              url = url + '&max-results=' + maxres;
          }
          $("#myGallery").empty();
          loadJS(url);
      }
      
      function clickablelogout(){
       var bb=document.getElementById('logout');
       
       if(bb.style.display =='none')
       {
         bb.style.display = "block";
         }
       else
         {bb.style.display = "none";
         }
      }
      
      function showsignup(){
        var bb= document.getElementById('newUserForm');
        var cc= document.getElementById('loginForm');
        if(bb.style.display =='none')
       {
         bb.style.display = "block";
         cc.style.display ="none";
         }
       else
         {bb.style.display = "none";
         }
      }
      
       function showlogin(){
        var bb= document.getElementById('loginForm');
        var cc= document.getElementById('newUserForm');
        if(bb.style.display =='none')
       {
         bb.style.display = "block";
         cc.style.display ="none";
         }
       else
         {bb.style.display = "none";
         }
      }
     
      
      
 