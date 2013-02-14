$(document).ready(function(){
	
	var refreshindex = function(){
		//FIND SOME WAY OF GETTING ACTIVE CAROUSEL ID
		$.get('/comments/:curcom', function(html){
			$('#commentlist').replaceWith(html);
		});
	};

	setInterval(refreshindex, 2000);


});