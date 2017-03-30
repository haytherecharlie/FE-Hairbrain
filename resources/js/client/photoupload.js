(function() {
	
	var PhotoUpload = {

		$src: '',
		$dest: '',

		photoListeners: function() {
			$('.thumbnail').each(function() {

			    $(this).click( function() {

			        var id = $(this).attr('id');
			            PhotoUpload.$src = $('#' + id);
			            PhotoUpload.$dest = $('#select-' + id);
			        
			        PhotoUpload.$dest.click();

			        PhotoUpload.photoUploaded();

			    })
			})
		},

		photoUploaded: function() {

		    PhotoUpload.$dest.change(function(evt) {

		        PhotoUpload.resizeImage(this.files[0])

		    });
		},

		resizeImage: function(img) {

		    ImageTools.resize(img, {

		        width: 320, // maximum width
		        height: 440 // maximum height

		    }, function(blob, didItResize) {

		        PhotoUpload.getPhotoDimensions(blob);

		    });
		},

		getPhotoDimensions: function(blob) {

		    var fr = new FileReader;
		    
		    fr.onload = function() {
		        
		        var img = new Image;
		        
		        img.onload = function() {
		            PhotoUpload.rotatePhoto(img, blob);
		        };

		        img.src = fr.result;
		    };
		    
		    fr.readAsDataURL(blob);
		},

		rotatePhoto: function(img, blob) {

			console.log(blob);

		    if (img.height < img.width) {

		        PhotoUpload.$src.removeClass('default');
		        PhotoUpload.$src.addClass('rotate');

		    } else {

		        PhotoUpload.$src.removeClass('rotate');
		        PhotoUpload.$src.addClass('default');

		    }

		    PhotoUpload.$src.css('background', 'url(' + img.src + ')' );
		    PhotoUpload.$src.css('background-size', 'cover');
		}
	};

	PhotoUpload.photoListeners();

})()