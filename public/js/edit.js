/**
* Javascript Data for Edit View
* */
$(function() {

	$(".alert").hide();
	
	/**
	 * Send form Data
	 * */
	$("form").submit(function(event) {
		    		    		 
		event.preventDefault();

		var data = $( this ).serialize();
		var id = $( this ).attr("id");

	    var url = "update/"+id; // the script where you handle the form input.

	    console.log(data);
	    
	    $.ajax({
	           type: "PUT",
	           url: url,
	           data: data,   
	         }).done(function(){							
	        	 $(".alert-success").show();	
					
				})
				.fail(function(){
					$(".alert-danger").show();	
				});

	    return false; // avoid to execute the actual submit of the form.
	});
	
	/**
	 * Show Tab
	 * */
	$('#projectTab a').click(function (e) {
	  e.preventDefault()
	  $(this).tab('show')    	
	  $(".alert").hide();
	})
	
	/**
	 * Change status vale with slider
	 * */
	$( ".slider" ).slider({

	value:  0,
	min: -1,
	max: 1,
	step: 1,
	
	create: function( event, ui ) {
		
	$( this ).slider( "value", $($( this ).attr("data")+'_status').attr("value"));
	
	},
	slide: function( event, ui ) {
		
		
		
		$( $( this ).attr("data") + "_status").val(ui.value);
		
		if(ui.value==-1)
		{
			$( $( this ).attr("data")).attr("class", "form-group has-error");
		}
		else if(ui.value==0)
		{
			$( $( this ).attr("data")).attr("class", "form-group has-warning");

		}
		else if(ui.value==1)
		{
			$( $( this ).attr("data")).attr("class", "form-group has-success");
		}
		
	}
	});      
	 
 });
    
