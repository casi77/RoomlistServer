$(function() {
	Hammer.plugins.fakeMultitouch();
	Hammer.plugins.showTouches();
	
	/**
	 * Show selected Tab
	 * */
	$('#viewTab a').click(function (e){
		e.preventDefault()
		$(this).tab('show')
	})

	/**
	 * Hide Members and Status in Project Element
	 * */
	$( ".status").hide();
	$( ".members").hide();
	
	/**
	 * Make Projects Elements sortable
	 * */
	$( ".sortable" ).sortable();
	$( ".sortable" ).disableSelection();
	
	
	
	/**
	 * Switch between small medium and big class by Doubleclick Event
	 * */
	$( ".resizeable" ).dblclick(function() {
		
		if($( this ).hasClass('col-md-3'))
		{
			$( this ).switchClass('col-md-3', 'col-md-6');	
			
			
			$( this ).find(".status").show();
			$( this ).find(".members").show();
			$( this ).find(".overview").hide();			
					
		}
		else if($( this ).hasClass('col-md-6'))
		{
			$( this ).switchClass('col-sm-6', 'col-sm-12');
			$( this ).switchClass('col-md-6', 'col-md-12');
	
		}
		else if($( this ).hasClass('col-md-12'))
		{
			$( this ).switchClass('col-sm-12', 'col-sm-6');	
			$( this ).switchClass('col-md-12', 'col-md-3');	
	
			$( this ).find(".status").hide();
			$( this ).find(".members").hide();
			$( this ).find(".overview").show();
				
		}
		
		
		});
	
		$( ".resizeable" ).hammer().on("hold", function(event) {
		
		if($( this ).hasClass('col-md-3'))
		{
			$( this ).switchClass('col-md-3', 'col-md-6');	
			
			
			$( this ).find(".status").show();
			$( this ).find(".members").show();
			$( this ).find(".overview").hide();			
					
		}
		else if($( this ).hasClass('col-md-6'))
		{
			$( this ).switchClass('col-sm-6', 'col-sm-12');
			$( this ).switchClass('col-md-6', 'col-md-12');
	
		}
		else if($( this ).hasClass('col-md-12'))
		{
			$( this ).switchClass('col-sm-12', 'col-sm-6');	
			$( this ).switchClass('col-md-12', 'col-md-3');	
	
			$( this ).find(".status").hide();
			$( this ).find(".members").hide();
			$( this ).find(".overview").show();
				
		}
		
		
	});
	
	
	var scale = 0;
	var new_scale = 1;
	
	/**
	 * Switch between small medium and big class of Project Object by Pinch Event
	 * */
	$( ".resizeable" ).hammer().on("pinch", function(event) {
		
		$( this ).css( "width", "" );
		$( this ).css( "height", "" );	
		
		scale = Math.round(event.gesture.scale*10)/10;
		
		if(scale<new_scale && (scale == 0.5 || scale ==  0.9 || scale == 1.1 || scale == 1.5 || 2)){
							
			newScale = scale;
			
			if($( this ).hasClass('col-md-12'))
			{
				$( this ).switchClass('col-sm-12', 'col-sm-6');
				$( this ).switchClass('col-md-12', 'col-md-6');
	
			}	
			else if($( this ).hasClass('col-md-6'))
				{
					$( this ).switchClass('col-md-6', 'col-md-3');	
	
					$( this ).find(".status").hide();
					$( this ).find(".members").hide();
					$( this ).find(".overview").show();
						
				}	
		}
		else if(scale>new_scale && (scale == 0 || scale == 0.5 || scale ==  0.9  || scale == 1.1 || scale == 1.5)){
			if($( this ).hasClass('col-md-3'))
			{
				$( this ).switchClass('col-md-3', 'col-md-6');	
				
				$( this ).find(".status").show();
				$( this ).find(".members").show();
				$( this ).find(".overview").hide();
			}
			else if($( this ).hasClass('col-md-6'))
			{
				$( this ).switchClass('col-sm-6', 'col-sm-12');
				$( this ).switchClass('col-md-6', 'col-md-12');
	
			}	
			
			$( this ).css( "width", "" );
			$( this ).css( "height", "" );	
		}
	
		});
	
		var rotated = false;

		/**
		* Rotate Project Element 180 degrees by rotate Event
		* */
		$( ".resizeable" ).hammer().on("rotate", function(event) {
			$( this ).css( "width", "" );
			$( this ).css( "height", "" );	
			
	
			if((event.gesture.rotation < -20 || event.gesture.rotation > 20) && rotated == false){
				
			
				if( $( this ).css( "transform") == "matrix(-1, 0, 0, -1, 0, 0)")
				{
					$( this ).css( "transform", "rotate()" );
					
					rotated = true;
				}
				else
				{
					$( this ).css( "transform", "matrix(-1, 0, 0, -1, 0, 0)" );
					rotated = true;
				}
			}
			$( this ).css( "width", "" );
			$( this ).css( "height", "" );	
		});
		$( ".resizeable" ).hammer().on("release", function(event) {
			rotated = false;
			$( this ).css( "width", "" );
			$( this ).css( "height", "" );	
		});
});
