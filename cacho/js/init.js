var item_count = 0;

(function($){
  $(function(){

    $('.button-collapse').sideNav();

    $('.tooltipped').tooltip({delay: 50});

    $('.datepicker').pickadate({
	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year
		format: 'mmmm dd, yyyy'
	});

	$('#input-date').val(formatDate(new Date()));

	addItem(++item_count);

	$(window).resize(function() {
	    repositionButton();
	});

	$('.add-item').click(function(){
		addItem(++item_count);
	});

	$('.delete-item').click(function(){
		deleteItem(item_count);
	});

  }); // end of document ready
})(jQuery); // end of jQuery name space

function repositionButton(){
	var pos = $('.item.card').last().position();
	var width = $('.item.card').last().width();
	$('.delete-item').css({top: pos.top+10, left: pos.left+width+35, position:'absolute'});

	setTimeout(function(){
		var pos = $('.delete-item').last().position();
		var width = $('.delete-item').last().width();
		$('.add-item').css({top: pos.top, left: pos.left+width+5, position:'absolute'});
	}, 280);
}

function addItem(num){
	var item = '<div class="col s12 item card" id="item-'+num+'">'+
      '<div class="input-field col s2">'+
        '<label for="input-quantity-'+num+'">Qty</label>'+
        '<input type="text" id="input-quantity-'+num+'" name="input-quantity-'+num+'" class="validate" required />'+
      '</div>'+
      '<div class="input-field col s2">'+
        '<label for="input-unit-'+num+'">Unit</label>'+
        '<input type="text" id="input-unit-'+num+'" name="input-unit-'+num+'" class="validate" required />'+
      '</div>'+
      '<div class="input-field col s5">'+
        '<label for="input-description-'+num+'">Description</label>'+
        '<input type="text" id="input-description-'+num+'" name="input-description-'+num+'" class="validate" required />'+
      '</div>'+
      '<div class="input-field col s3">'+
        '<label for="input-unit-cost-'+num+'">Unit Cost</label>'+
        '<input type="text" id="input-unit-cost-'+num+'" name="input-unit-cost-'+num+'" class="validate" required />'+
      '</div>'+
    '</div>';
    $('.items').append(item);
    repositionButton();
}

function deleteItem(num){
	if(num == 1) {
		Materialize.toast('You need to have at least one item.', 3000);
		return;
	}
	$('#item-'+num).remove();
	item_count--;
	repositionButton();
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return monthNames[monthIndex] +' '+ day +', '+ year;
}