function startGallery() {
document.getElementById('myGallery').style.display="block";
}

function renderer(data)
{
	for (var i = 0; i < data.feed.entry.length; i++)
	{
		addDiv(data.feed.entry[i]);
	}
	//window.addEvent('domready', startGallery);
	//window.onDomReady(startGallery);
	startGallery();
}

function addDiv (item) {
	var title = item.title.$t;// the filename
	var imgId = item.gphoto$id.$t;// the file id
	
	var targetURL     = item.content.src;//useful for downloading image
	var pictureURL    = item.content.src + '?imgmax=320' ; //288
	var pictureURL2   = item.content.src + '?imgmax=72';
	var commentCount  = item.gphoto$commentCount.$t;
	var description   = item.media$group.media$description.$t;// Picasa Web photo caption
	var keywords      = item.media$group.media$keywords.$t;// Picasa Web photo caption
	var description2  = "";

	try {
		var camera    = item.exif$tags.exif$make.$t + " " + item.exif$tags.exif$model.$t;
	} catch (err) {
		var camera    = "";
	}

	// comment this is line for remove tags data
	//if (keywords.length > 0)
	//	description2 = description2 + "Tags: <a href='http://picasaweb.google.com/lh/searchbrowse?q=" + keywords + "'>" + keywords + "</a>;  ";
	
	// comment this is line for remove comments counter
		//description2 = description2 + "Comments: " + commentCount + ";  ";

	// comment this is line for remove information about camera
	//if (camera.length > 0)
		//description2 = description2 + "Taken with: " + camera + "; ";
		
		var user="rahulindia25";
		var album="nisa"
	// title
	title = "<a href='http://picasaweb.google.com/" + user + "/" + album + "/photo#" + imgId + "'>" + title + "</a>";
	
	if (description.length > 0)
		title = title + " - " + description;

	HTML =	"<h3>" + title + "</h3>" + 
			"<p>" + description2 + "</p>" +
			"<a href='" + targetURL + "' title='open image' class='open'></a>" +
			//"<img src='" + pictureURL + "' class='full' />" ;
			"<img src='" + pictureURL2 + "' class='thumbnail' ></img>";

	newDiv = document.createElement("DIV");
	newDiv.className = "imageElement";
	newDiv.innerHTML = HTML;
	
	$('#myGallery').append(newDiv);
}

function loadJS(href) { with (document) {
	var span = createElement('SPAN');
	span.style.display = 'none';
	body.insertBefore(span, body.lastChild);
	span.innerHTML = 'Text for stupid IE.<s'+'cript></' + 'script>';
	setTimeout(function() {
		var s = span.getElementsByTagName('script')[0];
		s.language = 'JavaScript';
		if (s.setAttribute) s.setAttribute('src', href); else s.src = href;
	}, 10);
}}