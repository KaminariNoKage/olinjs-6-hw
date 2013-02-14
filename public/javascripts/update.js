$(document).ready(function(){
	
	var refreshindex = function(){
		var active_img = $("#carousel").rcarousel("getCurrentPage").attr('id')
			, curcom = '/comments/:' + active_img;
		$.get(curcom, function(html){
			$('#commentlist').replaceWith(html);
		});
	};

	setInterval(refreshindex, 2000);


});