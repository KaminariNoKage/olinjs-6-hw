$(document).ready(function(){

	var update_open = false;

	function makepage(){
		var bg = $("#bg").val()
			, txc = $("#txc").val()
			, txf = $("#txf").val()
			, txs = $("#txs").val();

			$('body').css({'background' : bg, 'color' : txc, 'font-family' : txf, 'font-size' : txs});
			$('#namehead').css('border-color', txc);
	};

	makepage();
	$("#pagestyle").hide();

	$("#pagestyle").submit(function(){
		var newpg = $("#pagestyle").serialize();
		var bg = $("#bg").val()
			, txc = $("#txc").val()
			, txf = $("#txf").val()
			, txs = $("#txs").val()
			, msg = $("#msg").val();
		console.log(newpg);
		$('body').css({'background' : bg, 'color' : txc, 'font-family' : txf, 'font-size' : txs, 'message' : msg});
		$('#namehead').css('border-color', txc);
		$("#pagestyle").hide();
		$.post("/update", newpg);
		return false;
	});

	$("#open").click(function(){
		if(update_open == false){
			$("#pagestyle").show();
			update_open = true;
		}
		else{
			$("#pagestyle").hide();
			update_open = false;
		};
	});

	$("#logout").click(function(){
		window.location = "/logout";
	});

	//Image Carousel

	$( "#carousel" ).rcarousel({
		width: 400, 
		height: 400,
		speed: 500,
		visible: 1,
		step: 1
	});

	var temp = $("#carousel").rcarousel("getCurrentPage");
	console.log(temp);

	$("#next").click(function(){
		$( "#carousel" ).rcarousel( "next" );
	});

	$("#prev").click(function(){
		$( "#carousel" ).rcarousel( "prev" );
	});

	$("#subcom").click(function(){
		var newmess = $("#new_comment").val()
			, img_id = $("#carousel").rcarousel("getCurrentPage").attr('id');
		console.log($("#new_comment").val());
		if (newmess.length > 500) {
			alert("Please keep your comment under 500 characters.");
		}
		else {
			$.post("/newcomment", {imgid: img_id, newcom: $("#new_comment").val()});
		};
		return false;
	});


});