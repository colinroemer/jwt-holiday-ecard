

// display sparkSomethingDD and hide navDropdown

$('.addSpark').on('click', function(event) {
	event.preventDefault();
	$('.sparkSomethingDD').slideToggle();
	$('.navDropdown').slideToggle();
});


var $container = $('#container').isotope({
  // options
});

// filter items on button click
$('#filters button').on( 'click', function() {
  var filterValue = $(this).attr('data-filter');
  $container.isotope({ 
  	filter: filterValue,
  	transitionDuration: '0.9s'
  });
 
});

 $('.hideToggle').on('click', function() {
	// display hidden
	$(this).next().removeClass('hidden');

	// remove show more
	$(this).remove();
	
	// update isotope
	$container.isotope('layout');
});


$('.submitSpark').on('click', function() {
	// clone a spark
	var $newSpark = $('.isotope-item').first();
	// fill it with correct data
	$newSpark.find('a.sparkCat').html($('#addSparkCategory').val());
	$newSpark.find('h1').html($('#addSparkTitle').val());
	$newSpark.find('p').html($('#addSparkDescription').val());
	//$newSpark.find('Title').html($('.addSparkInput').val());

	// append it to isotope grid
	$("#container").append($newSpark);

	// tell isoptope about appended item
	//$container.isotope( 'appended', elem ).fadeIn();
	// update isotope layout
	$container.isotope('layout');
});


