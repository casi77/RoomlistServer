/**
 * Javascript Data for Selection View
 * */
$(function() {
	 
	var add = [];
	var rem = [];
	
	/**
	 * Show Dialog
	 * */
	$("#confirm").on('show.bs.modal', function(e){
	$(".alert").hide();
	$("#save").show();
	$("#next").hide();
	});
	
	/**
	 * Make Lists Drag-and-Drop-able
	 * */
	$( "#inDb, #notInDb" ).sortable({
		connectWith: ".list-group",
		items: "li:not(.ui-state-disabled)",
	}).disableSelection();
	
	/**
	 * Save Selection
	 * Send DELETE HTTP-Requests to Delete Projects
	 * Send POST HTTP-Requests to Add Projects
	 * */	
	$( "#save" ).click(function() {
		
			$("#save").button("loading");
			
			var inDb = $( "#inDb" ).sortable( "toArray");
			var notInDb = $( "#notInDb" ).sortable("toArray" );
			var ready = 0;
			var target = inDb.length + notInDb.length;
			
			/**
			 * Hide Save Button, Show next Button and Message after all Requests have answered
			 * */
			var isReady = function(){
			
			if(ready == target){

					$(".alert-success").show();
						
					$("#save").hide();
					$("#save").button("reset");
					$("#next").show();
				}
			};
			//Check Elements in inDB List
			for(var i in inDb){
				if (inDb[i].match(/a/)){
					aid=inDb[i];
					
					//Send POST-Request for new added Project
					$.post("/projects/create",{
					roject_manager_id : null,
					quality_status :  null,
					quality_comment : null,
					date_comment : null,
					budget_comment : null,
					id : inDb[i].substring(2),
					project_type : 'C'
					})
					.done(function(){
						$('li#'+aid).attr( 'id', 'r_'+aid.substring(2));
						isReady();
					})
					.fail(function(){
						//Show Alert if failt
						$(".alert-danger").show();
						isReady();
					})
					.always(function(){
						ready++;
						isReady();
					});  
				}
				else{
					ready++;
					isReady();
				}
			}
			//Check Elements in noInDB List
			for(var j in notInDb){
				if (notInDb[j].match(/r/)){
					var rid=notInDb[j]; 
					//Send DELETE-Request for new deleted Project
					$.ajax({
						url: "/projects/remove/"+notInDb[j].substring(2),
						type: "DELETE"
					})
					.done(function(){
						$('#'+rid).attr( 'id', 'a_'+rid.substring(2));
						isReady();
					})
					.fail(function(){
						//Show Alert if failt
						$(".alert-danger").show();
						isReady();
					})
					.always(function(){ 
						ready++;
						isReady();
					});
				}
				else{
					ready++;
					isReady();
				}
			}
	});
});
