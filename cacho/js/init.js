//UI RELATED
//todo add commas on thousands prices
//todo don't place active on select's label

//FUNCTIONALITIES
//todo login user type
//todo choose printing format
//todo add copy to clipboard

//FOR CLARIFICATION
//How will the project, supplier, PO list be sorted? //dont ask about this rn, hahaha, cuz sorting iz not good
//Should we allow function for archiving projects?
//Project length and average number of POs and suppliers per project


var item_count = 0;
var projects = [];
var suppliers = [];
var costrefs = [];

(function($){
  $(function(){
    
    init_components();
    load_projects();
    load_suppliers();
    load_costrefs();

    $('.add-project').click(function(){
      clear_input('.add-project-input');
      openModal('.add-project-modal');
    });

    $('.add-supplier').click(function(){
      clear_input('.add-supplier-input');
      openModal('.add-supplier-modal');
    });

    $('.add-po').click(function(){
      clear_add_po();
      var project_code = this.id.split(/-(.+)/)[1];
      var project = find_project_code(project_code);
      set_add_po(project);
      openModal('.add-po-modal');
    });

    $('.add-project-modal-btn-add').click(function(){
      if(check_project_input()){
        project = get_add_project_input(); 
        add_project(project);
        clear_input('.add-project-input');
      }
    });

    $('.add-supplier-modal-btn-add').click(function(){
      if(check_supplier_input()){
        supplier = get_add_supplier_input(); 
        add_supplier(supplier);
        clear_input('.add-supplier-input');
      }
    });

    $('.add-po-modal-btn-add').click(function(){
      if(check_po_input()){
        po = get_add_po_input(); 
        add_po(po);
        clear_add_po();
      }
    });

    $('.add-po-modal-btn-amend').click(function(){
      if(check_po_input()){
        po = get_amend_po_input(); 
        amend_po(po); 
        clear_add_po();
      }
    });

    $('.add-po-modal-btn-print').click(function(){
      print_po($('#hidden-po-number').val());
    });

    $('.add-item').click(function(){
      if(check_item_input()){
        item = get_add_item_input();
        add_item(item);
        clear_input('.add-item-input');
        $('#add-item-input-quantity').focus();

      }
    });

    $('.project-list').on('click', '.open-project', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var project = find_project_code(pid);
      if(project != null) {
        set_view_project(project);
        set_add_po(project);
        openModal('.view-project-modal');
      }
    });

    $('.supplier-list').on('click', '.open-supplier', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var supplier = find_supplier_code(pid);
      if(supplier != null) {
        set_view_supplier(supplier);
        openModal('.view-supplier-modal');
      }
    });

    $('.po-list').on('click', '.open-po', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var po = find_po_code(pid);
      if(po != null) {
        po['po-number'] = pid;
        clear_add_po();
        set_view_po(po);
        openModal('.add-po-modal');
      }
    });

    $('.po-list').on('click', '.amend-po', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var po = find_po_code(pid);
      if(po != null) {
        po['po-number'] = pid;
        clear_add_po();
        set_amend_po(po);
        openModal('.add-po-modal');
      }
    });

    $('.project-list').on('click', '.delete-project', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var project = find_project_code(pid);
      if(project != null) {
        con = confirm('Are you sure you want to delete Project: '+project.name+'('+project['project-code']+')?\nThis cannot be undone.');
        if(con){
          delete_project(project);
        }
      }
    });

    $('.po-list').on('click', '.delete-po', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var po = find_po_code(pid);
      if(po != null) {
        con = confirm('Are you sure you want to delete PO# '+pid+'?\nThis cannot be undone.');
        if(con){
          delete_po(pid);
        }
      }
    });

    $('.supplier-list').on('click', '.delete-supplier', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var supplier = find_supplier_code(pid);
      if(supplier != null) {
        con = confirm('Are you sure you want to delete Supplier: '+supplier.name+'?\nThis cannot be undone.');
        if(con){
          delete_supplier(supplier);
        }
      }
    });

    $('.item-list').on('click', '.delete-item', function(){
      var total = parseFloat($('.add-po-input-total-amount').html());
      total -= parseFloat(this.id);
      $('.add-po-input-total-amount').html(parseFloat(total).toFixed(2));
      $(this).parent().parent().remove();
    });

    $('.view-project-modal-btn-save').click(function(){
      if(check_project_edit()){
        project = get_edit('project');
        if(find_project_code(project['project-code']) != null){
          edit_project(project);
        }
      }
    });

    $('.view-supplier-modal-btn-save').click(function(){
      if(check_supplier_edit()){
        supplier = get_edit('supplier');
        if(find_supplier_code(supplier['supplier-code']) != null){
          edit_supplier(supplier);
        }
      }
    });

    $('.po-generator').click(function(){
      clear_add_po();
      openModal('.add-po-modal');
    });

    $('.po-summary').click(function(){
      create_options(projects, 'name', 'project-code', '#po-summary-input-project');
      openModal('.po-summary-modal');
    });

    $('.item-inventory').click(function(){
      $('.item-inventory-list').html('');
      create_options(projects, 'name', 'project-code', '#item-inventory-input-project');
      openModal('.item-inventory-modal');
    });

    $('input[type=radio][name=po-summary-input-type]').change(function() {
      if (this.value == 'billing') {
        $('.input-date-div').show(0);
      }
      else if (this.value == 'supplier') {
        $('.input-date-div').hide(0);
      }
    });

    $('.po-summary-input').change(function() {
      if(check_po_summary_input()){
        if($("input[name='po-summary-input-type']:checked").val() == 'billing'){
          get_billing_summary(find_project_code($('#po-summary-input-project').val()));
        }
        else{
          get_supplier_summary(find_project_code($('#po-summary-input-project').val()));
        }
      }
    });

    $('#item-inventory-input-project').change(function() {
      var code = $('#item-inventory-input-project').val();
      var project = find_project_code(code);
      create_po_item_status(project.pos);


      var arr = [];
      var pos = project.pos;
      for(var po in pos){
        if(pos.hasOwnProperty(po)){
          if(pos[po].status == 0) continue;
          var items = pos[po]['items'];
          for(var item in items){
            if(items.hasOwnProperty(item)){
              arr[items[item].description] = items[item];
            }
          }
        }
      }

      var numeric_array = [];
      for (var items in arr){
          numeric_array.push( arr[items] );
      }

      create_options(numeric_array, 'description', 'description', '#item-inventory-input-item');
      $('#item-inventory-input-item').material_select();

    });

    $('#item-inventory-input-item').change(function() {
      var val = $(this).val();
      if(val.trim() == '') return;
      var code = $('#item-inventory-input-project').val();
      var project = find_project_code(code);
      create_po_item_status(project.pos, val);
    });


    $('.item-inventory-list').on('click', '.complete-delivery', function(){
    	var temp = this.id.split('|');
	    var item = temp[0];
	    var code = temp[1];
	    var po = find_po_code(code);
		  var items = po.items;

	    var remaining = get_remaining(items[item]);

	    if(remaining <= 0){
	    	Materialize.toast('Item delivery status is already complete.', 5000);
      		return;
	    }

	    var delivery = {};
	    delivery['date'] = date_to_string(new Date());
	    delivery['quantity'] = remaining;

	    var i = 0;
	      while(items[item]['deliveries'][i]){
	        i++;
	      }

	    items[item]['deliveries'][i] = delivery;

	    Materialize.toast('Successfully completed delivery.', 5000);

	    var pcode = code.substring(0,6);
      var project = find_project_code(pcode);
      create_po_item_status(project.pos);


      localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));



    });


    $('.item-inventory-list').on('click', '.add-delivery', function(){
      var temp = this.id.split('|');
      var item = temp[0];
      var code = temp[1];
      var po = find_po_code(code);
      var items = po.items;
      var i = 0;
      while(items[item]['deliveries'][i]){
        i++;
      }

      res = new Date();

      var delivery = {};
      delivery['date'] = $('#'+item+'-'+code+'-date').val();
      delivery['quantity'] = $('#'+item+'-'+code+'-quantity').val();

      var remaining = get_remaining(items[item]);
      if(remaining - delivery['quantity'] < 0 || delivery['quantity'] < 1) {
      	Materialize.toast('Invalid value.', 5000);
      	return;
      } 


      items[item]['deliveries'][i] = delivery;

      Materialize.toast('Successfully added delivery.', 5000);
      var pcode = code.substring(0,6);
      var project = find_project_code(pcode);
      create_po_item_status(project.pos);
     
      localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));

    });

    $('.item-inventory-list').on('click', '.remove-delivery', function(){
      var con = confirm('Are you sure you want to remove this delivery?');
      if(!con) return; 

      var temp = $(this).attr('target').split('-');
      var po_code = temp[0] + '-' + temp[1];
      var item = temp[2];
      var key = temp[3];
      
      var po = find_po_code(po_code);
      var deliveries = po['items'][item]['deliveries'];
      var delivery = po['items'][item]['deliveries'][key];

      console.log(deliveries);

      var deleted = false;
      for(var d in deliveries){
        if(deliveries.hasOwnProperty(d)){
          if(d == key){
            delete deliveries[d];
            deleted = true;
          }
          else if(deleted){
            deliveries[d-1] = deliveries[d];
            delete deliveries[d];
          }
        }
      }


      Materialize.toast('Successfully removed delivery.', 5000);
      var pcode = po_code.substring(0,6);
      var project = find_project_code(pcode);
      create_po_item_status(project.pos);

      localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));


    });

    $('.add-item-input').keypress(function(e){
      if(e.keyCode == 13){
        $('.add-item').click();
      }
    });

    $('.cost-ref').click(function(){
      openModal('.cost-ref-modal');
    });



  }); // end of document ready
})(jQuery); // end of jQuery name space


function get_remaining(item){
	var deliveries = item.deliveries;
	var remaining = item.quantity;
	for(var key in deliveries){
	    if(deliveries.hasOwnProperty(key)){
	      remaining -= deliveries[key].quantity;
	    }
	  }
	return remaining;
}



function create_po_item_status(pos, filter){
  $('.item-inventory-list').html(
    '<li>'+
      '<div class="collapsible-header disabled">'+
        '<strong>ITEM LIST</strong>'+
        '<span class="right teal-text">'+
          'DELIVERY STATUS'+
            '<span class="btn btn-flat white custom-btn">Partial<br>Delivery</span>'+
            '<span class="btn btn-flat white custom-btn">Complete<br>Delivery</span>'+
        '</span>'+
      '</div>'+
    '</li>'
  );
  for(var po in pos){
    if(pos.hasOwnProperty(po)){
      if(pos[po].status == 0) {
        continue;
      }
      var first = true; 
      var entry = false; 

      var items = pos[po]['items'];
      for(var item in items){
        if(items.hasOwnProperty(item)){

          if(filter != undefined){
            if(filter != items[item].description) 
              continue;
          }

          if(first){
            $('.item-inventory-list').append('<h6>PO '+po+'</h6>');
            first = false;
            entry = true;
          }

  	      var deliveries = items[item].deliveries;
  	      var remaining = items[item].quantity;
  	      var dtext = '';
  	      for(var key in deliveries){
  	        if(deliveries.hasOwnProperty(key)){
  	          remaining -= deliveries[key].quantity;
  	          dtext += '<li class="collection-item"><span class="dtext">'+
                deliveries[key].quantity + ' ' + items[item].unit + ' on ' + deliveries[key].date+
                '</span>'+
                '<span class="right clickable remove-delivery tooltipped" data-position="top" data-delay="50" data-tooltip="Remove Delivery" target="'+po+'-'+item+'-'+key+'"><i class="material-icons">clear</i></span>'+
                '</li>';
  	        }
  	      }
  	      var status;
  	      if(remaining == items[item].quantity){
  	        status = 'PENDING';
  	        dtext = '<li class="collection-item">You have not yet received any deliveries.</li>';
  	      }
  	      else if(remaining == 0){
  	        status = 'COMPLETE';
  	      }
  	      else{               
  	        status = 'PARTIAL ('+remaining+items[item].unit+' left undelivered)';
  	      }

        	var now = date_to_string(new Date());

  	      $('.item-inventory-list').append(
  	        '<li>'+
  	          '<div class="collapsible-header"><i class="material-icons">event_note</i>'+
  	            items[item].description +' - '+ items[item].quantity + ' ' + items[item].unit +
  	            '<span class="right teal-text">'+
  	            	status+
  	              	'<span href="#" class="btn cust2 waves-effect waves-light tooltipped center-align" data-position="top" data-delay="50" data-tooltip="Partial Delivery"><i class="material-icons center">menu</i></span>'+
  	              	'<span href="#" id="'+item+'|'+po+'" class="btn cust2 waves-effect waves-light complete-delivery tooltipped center-align" data-position="top" data-delay="50" data-tooltip="Complete Delivery"><i class="material-icons center">check</i></span>'+
  	            '</span>'+
  	          '</div>'+
  	          '<div class="collapsible-body row">'+
  	            '<div class="col s4 offset-s1">'+
  	              '<br/>'+
  	              '<div class="input-field">'+
  			        '<label class="active" for="'+item+'-'+po+'-date">Delivery Date</label>'+
  			        '<input type="date" id="'+item+'-'+po+'-date" name="" value="'+now+'" class="datepicker"/>'+
  			      '</div>'+
  	              '<div class="input-field">'+
  	                '<label class="active" for="'+item+'-quantity">Quantity delivered (in '+items[item].unit+')</label>'+
  	                '<input id="'+item+'-'+po+'-quantity" class="" type="number" value="1" min="1" max="'+remaining+'"/>'+
  	              '</div>'+
  	              '<a href="#" id="'+item+'|'+po+'" class="btn  waves-effect waves-light add-delivery">Add Delivery</a>'+
  	            '</div>'+
  	            '<ul class="col s6 collection">'+
  	              dtext+
                '</ul>'+
  	            '<div class="col s12">&nbsp;</div>'+
  	          '</div>'+
  	        '</li>'
  	      );

  	    }
  	  }

      if(entry)
        $('.item-inventory-list').append('<br>');

    }
	}

  init_components();
}



function get_billing_summary(project){
  $('.po-summary-table').show();
  $('.po-summary-list').html('');
  $('.po-summary-varying-th').html('Date');

  var cutoff = null;
  var subtotal = 0;
  var total = 0;
  var breakdown;
  for(var key in project['pos']){
    if(project['pos'].hasOwnProperty(key)){
      var amount = (project['pos'][key]['status'] == 0)? '-----': parseFloat(project['pos'][key]['total-amount']).toFixed(2);
      var d = new Date(project['pos'][key]['date']);
      var month = d.getMonth()+1;
      var dateX = d.getDate();
      var year = d.getFullYear();

      breakdown = get_breakdown(project['pos'][key]['items']);

      if(cutoff == null){
        if(dateX <= 15){
          cutoff = new Date(year+'-'+month+'-15');
        }
        else{
          dateY = get_last_day(year+'-'+month);
          cutoff = new Date(year+'-'+month+'-'+dateY);
        }

        if(amount != '-----'){
          subtotal += parseFloat(amount);
        }
      }
      else if(d > cutoff){
        if(subtotal != '-----') total += parseFloat(subtotal);
        $('.po-summary-list').append(
          '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td>As of '+date_to_string(cutoff)+'</td>'+
            '<td class="right-align">'+monetize(subtotal)+'</td>'+
          '</tr>'
        );
        subtotal = 0;
        if(dateX <= 15){
          cutoff = new Date(year+'-'+month+'-15');
        }
        else{
          dateY = get_last_day(year+'-'+month);
          cutoff = new Date(year+'-'+month+'-'+dateY);
        }
        if(amount != '-----'){
          subtotal += parseFloat(amount);
        }
      }
      else if(amount != '-----'){
        subtotal += parseFloat(amount);
      }

 
      $('.po-summary-list').append(
        '<tr>'+
          '<td>'+project['pos'][key]['date']+'</td>'+
          '<td>'+key+'</td>'+
          '<td class="right-align">'+(breakdown.material)+'</td>'+
          '<td class="right-align">'+(breakdown.labor)+'</td>'+
          '<td class="right-align">'+(breakdown.subcon)+'</td>'+
          '<td class="right-align">'+(breakdown.others)+'</td>'+
          '<td class="right-align">'+monetize(amount)+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  total += parseFloat(subtotal);
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td>As of '+date_to_string(cutoff)+'</td>'+
      '<td class="right-align">'+monetize(subtotal)+'</td>'+
    '</tr>'
  );
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td><strong>GRAND TOTAL</strong></td>'+
      '<td class="right-align">'+monetize(total)+'</td>'+
    '</tr>'
  );
}

function get_breakdown(items){
	var material = 0;
	var labor = 0;
	var subcon = 0;
	var others = 0;

	for(var key in items){
    	if(items.hasOwnProperty(key)){
    		if(items[key]['type'] == 'Material') material += parseFloat(items[key]['subtotal']);
    		else if(items[key]['type'] == 'Labor') labor += parseFloat(items[key]['subtotal']);
    		else if(items[key]['type'] == 'Subcon') subcon += parseFloat(items[key]['subtotal']);
    		else others += parseFloat(items[key]['subtotal']);
    	}
    }
	var breakdown = {};
	breakdown.material = (material == 0)? '-' : monetize(material);
	breakdown.labor = (labor == 0)? '-' : monetize(labor);
	breakdown.subcon = (subcon == 0)? '-' : monetize(subcon);
	breakdown.others = (others == 0)? '-' : monetize(others);
	return breakdown;
}



function get_supplier_summary(project){
  $('.po-summary-table').show();
  $('.po-summary-list').html('');
  $('.po-summary-varying-th').html('Supplier');

  var curr = null;
  var subtotal = 0;
  var total = 0;
  var breakdown;
  var list = project['pos'];
  keysSorted = Object.keys(list).sort(function(a,b){return list[a].to-list[b].to});


  for(var i=0; i<keysSorted.length; i++){

    key = keysSorted[i];
    if(project['pos'].hasOwnProperty(key)){

      var supplier = find_supplier_code(project['pos'][key]['to']);
      var amount = (project['pos'][key]['status'] == 0)? '-----': parseFloat(project['pos'][key]['total-amount']);
      breakdown = get_breakdown(project['pos'][key]['items']);

      if(curr == null){
        curr = supplier;
        if(amount != '-----') subtotal += parseFloat(amount);
      }
      else if(supplier != curr){
        if(subtotal != '-----') total += parseFloat(subtotal);
        $('.po-summary-list').append(
          '<tr>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td></td>'+
            '<td class="right-align">'+monetize(subtotal)+'</td>'+
          '</tr>'
        );
        subtotal = 0;
        curr = supplier;
        if(amount != '-----')
          subtotal += parseFloat(amount);
      }
      else if(amount != '-----'){
        subtotal += parseFloat(amount);
      }

      $('.po-summary-list').append(
        '<tr>'+
          '<td>'+supplier.name+'</td>'+
          '<td>'+key+'</td>'+
          '<td class="right-align">'+(breakdown.material)+'</td>'+
          '<td class="right-align">'+(breakdown.labor)+'</td>'+
          '<td class="right-align">'+(breakdown.subcon)+'</td>'+
          '<td class="right-align">'+(breakdown.others)+'</td>'+
          '<td class="right-align">'+monetize(amount)+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  if(subtotal != '-----') total += parseFloat(subtotal);
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td class="right-align">'+monetize(subtotal)+'</td>'+
    '</tr>'
  );
  $('.po-summary-list').append(
    '<tr style="border-bottom:1px solid black;">'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td></td>'+
      '<td><strong>GRAND TOTAL</strong></td>'+
      '<td class="right-align">'+monetize(total)+'</td>'+
    '</tr>'
  );
}

function check_po_summary_input(){
  var input = $('#po-summary-input-project').val();
  if(input.trim() == ''){
    return false;
  }

  if (!$("input[name='po-summary-input-type']:checked").val()) {
    return false;
  }
  /*else {
    if($("input[name='po-summary-input-type']:checked").val() == 'billing'){
      var input = $('#po-summary-input-date').val();
      if(input.trim() == ''){
        return false;
      }
    }
  }*/
  return true;
}

function print_po(code){
  po = find_po_code(code);
  po['to'] = find_supplier_code(po['to']);
  po['deliver-to'] = find_project_code(po['deliver-to']);
  po['deliver-to']['pos'] = null;
  $('#hif').attr('src', 'print.html?po='+JSON.stringify(po));
  load_projects();
}

function add_project(project){
  projects.push(project);
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.project-list').append(
    '<li id="'+project['project-code']+'" class="collection-item project">'+project['name']+'<span class="right teal-text">'+
      '<i id="open-'+project['project-code']+'" class="material-icons clickable open-project">mode_edit</i> '+
      '<i id="delete-'+project['project-code']+'" class="material-icons clickable delete-project">delete</i>'+
    '</span></li>'
  );
  Materialize.toast('Successfully added project',3000);
}

function add_supplier(supplier){
  suppliers.push(supplier);
  localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));
  $('.supplier-list').prepend(
    '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
      '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
      '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
    '</span></li>'
  );
  Materialize.toast('Successfully added supplier',3000);
}

function add_item(item){

  var subtotal = parseFloat(parseFloat(item['unit-price'])*parseInt(item['quantity'])).toFixed(2);

  $('.item-list').append(
    '<tr>'+
      '<td>'+item['quantity']+'</td>'+
      '<td>'+item['unit']+'</td>'+
      '<td>'+item['description']+'</td>'+
      '<td>'+item['type']+'</td>'+
      '<td>'+monetize(item['unit-price'])+'</td>'+
      '<td>'+monetize(subtotal)+'</td>'+
      '<td><i id="'+subtotal+'" class="material-icons clickable delete-item">close</i></td>'+
    '</tr>'
  );

  var total = demonetize($('.add-po-input-total-amount').html());
  total = parseFloat(parseFloat(total) + parseFloat(subtotal));
  $('.add-po-input-total-amount').html(monetize(total));

  Materialize.toast('Successfully added item',3000);
}

function add_po(po){
  var project = find_project_code(po['deliver-to']);
  if(project != null){
    var i = 0;
    while(project['pos'][po['deliver-to']+three_digits(i)] != undefined){
      i++;
    }
    po['po-number'] = po['deliver-to']+three_digits(i);
    po['status'] = '1';
    project['pos'][po['po-number']] = po;
    localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));

    var supplier = find_supplier_code(po['to']);

    $('.po-list').append(
      '<tr id="'+po['po-number']+'">'+
        '<td>'+po['po-number']+'</td>'+ 
        '<td>'+supplier.name+'</td>'+ 
        '<td>'+monetize(po['total-amount'])+'</td>'+
        '<td>'+po['date']+'</td>'+
        '<td>'+
          '<i id="open-'+po['po-number']+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="amend-'+po['po-number']+'" class="material-icons clickable tooltipped amend-po" data-position="top" data-delay="20" data-tooltip="Amend">build</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+po['po-number']+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i>'+
        '</td>'+
      '</tr>'
    );
    print_po(po['po-number']);
  }
  else Materialize.toast('Project code '+po['deliver-to']+' cannot be found.',5000); 
}

function amend_po(po){
  var project = find_project_code(po['deliver-to']);
  var parent = po['po-number'].substring(0,9); 
  if(project != null){
    $('tr#'+po['po-number']+'>td')[1].innerHTML = '-----';
    $('tr#'+parent+'>td')[1].innerHTML = '-----';

    var i = 0;
    var alpha = ['A','B','C','D','E','F','G','H','I','J'];
    while(project['pos'][parent+alpha[i]] != undefined){
      $('tr#'+parent+alpha[i]+'>td')[1].innerHTML = '-----';
      $('tr#'+parent+alpha[i]+'>td')[1].innerHTML = '-----';
      project['pos'][parent+alpha[i]]['status'] = 0;
      i++;
    }
    po['po-number'] = parent+alpha[i];
    po['status'] = 1;
    project['pos'][po['po-number']] = po;
    project['pos'][parent]['status'] = 0;

    localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
    $('.po-list').append(
      '<tr id="'+po['po-number']+'">'+
        '<td>'+po['po-number']+'</td>'+ 
        '<td>'+monetize(po['total-amount'])+'</td>'+
        '<td>'+po['date']+'</td>'+
        '<td>'+
          '<i id="open-'+po['po-number']+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="amend-'+po['po-number']+'" class="material-icons clickable tooltipped amend-po" data-position="top" data-delay="20" data-tooltip="Amend">build</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+po['po-number']+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i>'+
        '</td>'+
      '</tr>'
    );

    var $table=$('.po-list');
    var rows = $table.find('tr').get();
    rows.sort(function(a, b) {
      var keyA = $(a).attr('id');
      var keyB = $(b).attr('id');
      if (keyA < keyB) return 1;
      if (keyA > keyB) return -1;
      return 0;
    });
    $.each(rows, function(index, row) {
      $table.children('tbody').append(row);
    });

    print_po(po['po-number']);
  }
  else Materialize.toast('Project code '+po['deliver-to']+' cannot be found.',5000); 
}

function edit_project(project){
  $.each(projects, function(index, p){
      if(p['project-code'] == project['project-code']){
        keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
        for(var i=0; i<keys.length; i+=1){
          projects[index][keys[i]] = project[keys[i]];
        }
        localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
        Materialize.toast('Successfully edited project',3000);
        return;
      }
  });
}

function edit_supplier(supplier){
  $.each(suppliers, function(index, p){
      if(p['supplier-code'] == supplier['supplier-code']){
        suppliers[index] = supplier;
        localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));
        Materialize.toast('Successfully edited supplier',3000);
        return;
      }
  });
}

function delete_project(project){
  projects = projects.filter(function( obj ) {
    return obj['project-code'] !== project['project-code'];
  });
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.project-list>#'+project['project-code']).remove();
  Materialize.toast('Successfully deleted project',3000);
}

function delete_supplier(supplier){
  suppliers = suppliers.filter(function( obj ) {
    return obj['supplier-code'] !== supplier['supplier-code'];
  });
  localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));
  $('.supplier-list>#'+supplier['supplier-code']).remove();
  Materialize.toast('Successfully deleted supplier',3000);
}

function delete_po(code){
  var project_code = code.substring(0,6);
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == project_code){
      delete projects[i]['pos'][code];
      break;
    }
  }
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.po-list>#'+code).remove();
  Materialize.toast('Successfully deleted PO',3000);
}

function load_projects(){
  $('.project-list').html('');
  projects = [];
  if(localStorage.getItem('projects') != null){
    projects = obj_to_arr(JSON.parse(localStorage.getItem('projects')));
    $.each(projects, function(index, project){
      $('.project-list').append(
        '<li id="'+project['project-code']+'" class="collection-item project">'+project['name']+'<span class="right teal-text">'+
          '<i id="open-'+project['project-code']+'" class="material-icons clickable open-project">mode_edit</i> '+
          '<i id="delete-'+project['project-code']+'" class="material-icons clickable delete-project">delete</i>'+
        '</span></li>'
      );
    });
  }
}

function load_costrefs(){
  $('.costrefs-list').html('');
  costrefs = [];
  if(localStorage.getItem('costrefs') != null){
  
  }
}

function load_suppliers(){
  suppliers = [];
  if(localStorage.getItem('suppliers') != null){
    suppliers = obj_to_arr(JSON.parse(localStorage.getItem('suppliers')));
    $.each(suppliers, function(index, supplier){
      $('.supplier-list').append(
        '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
          '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
          '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
        '</span></li>'
      );
    });
  }

  keys = ['name','vat-reg', 'address', 'mobile-number', 'telfax', 'contact-person', 'supplier-code']
  for(var i=0; i<supplierlist.length; i++){
  	var result = $.grep(suppliers, function(e){ return e.name == supplierlist[i][0]; });
  	if (result.length != 0) continue;


    s = {};
    sc = generate_suppliercode();
    while(sc_is_existing(sc)){ 
      sc = generate_suppliercode();
    }
    s['name'] = supplierlist[i][0];
    s['vat-reg'] = supplierlist[i][1];
    s['address'] = supplierlist[i][2];
    s['mobile-number'] = supplierlist[i][3];
    s['telfax'] = supplierlist[i][4];
    s['contact-person'] = supplierlist[i][5];
    s['supplier-code'] = sc;

    suppliers.push(s);
  }

  localStorage.setItem('suppliers', JSON.stringify(arr_to_obj(suppliers)));




  $.each(suppliers, function(index, supplier){
	  $('.supplier-list').append(
	    '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
	      '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
	      '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
	    '</span></li>'
	  );
	});

   

}

function check_project_input(){
  var p = '#add-project-input-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      Materialize.toast('Some fields are blank.',5000);
      setTimeout(function(){ openModal('.add-project-modal'); },300);
      return false;
    }
  } 
  return true;
}

function check_supplier_input(){
  var p = '#add-supplier-input-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'telfax', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      Materialize.toast('Some fields are blank.',5000);
      setTimeout(function(){ openModal('.add-supplier-modal'); },300);
      return false;
    }
  } 
  return true;
}

function check_item_input(){
  var p = '#add-item-input-';
  keys = ['quantity','unit', 'description', 'type', 'unit-price'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      Materialize.toast('Some fields are blank.',5000);
      return false;
    }
  } 
  return true;
}

function check_po_input(){
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
    for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      Materialize.toast('Some fields are blank.',5000);
      setTimeout(function(){ openModal('.add-po-modal'); },300);
      return false;
    }
  } 
  if($('.item-list>tr').length <= 1) return false;
  return true;
}

function check_project_edit(){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).html();
    if(input.trim() == ''){
      Materialize.toast('Some fields are blank.',5000);
      setTimeout(function(){ openModal('.view-project-modal'); },300);
      return false;
    }
  } 
  return true;
}

function check_supplier_edit(){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'telfax', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).html();
    if(input.trim() == ''){
      Materialize.toast('Some fields are blank.',5000);
      setTimeout(function(){ openModal('.view-supplier-modal'); },300);
      return false;
    }
  } 
  return true;
}

function find_project_code(code){
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == code){
      return projects[i];
    }
  }
  Materialize.toast('Project code '+code+' cannot be found.',5000);
  return null;
}

function find_supplier_code(code){
  for(var i=0; i<suppliers.length; i++){
    if(suppliers[i]['supplier-code'] == code){
      return suppliers[i];
    }
  }
  Materialize.toast('Supplier code '+code+' cannot be found.',5000);
  return null;
}

function find_po_code(code){
  var project_code = code.substring(0,6);
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == project_code){
      if(projects[i]['pos'][code] != undefined) return projects[i]['pos'][code];
      Materialize.toast('PO code '+code+' cannot be found.',5000);
      return null;
    }
  }
  Materialize.toast('PO code '+code+' cannot be found.',5000);
  return null;
}

function pc_is_existing(project_code) {
  for(var i = 0; i < projects.length; i++) {
      if(projects[i].hasOwnProperty('project-code') && projects[i]['project-code'] === project_code) {
          return true;
      }
  }
  return false;
}

function sc_is_existing(supplier_code) {
  for(var i = 0; i < suppliers.length; i++) {
      if(suppliers[i].hasOwnProperty('supplier-code') && suppliers[i]['supplier-code'] === supplier_code) {
          return true;
      }
  }
  return false;
}

function set_view_project(project){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(project[keys[i]]);
  } 
  $('.add-po').attr('id', 'project-'+project['project-code']);
}

function set_view_supplier(supplier){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'telfax', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(supplier[keys[i]]);
  } 
}

function set_view_po(po){
  create_options(projects, 'name', 'project-code', '#add-po-input-deliver-to');
  create_options(suppliers, 'name', 'supplier-code', '#add-po-input-to');


  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;View Purchase Order ('+po['po-number']+')');
  $('.add-po-modal-btn-generate').hide();
  $('.add-po-modal-btn-add').hide();
  $('.add-po-modal-btn-amend').hide();
  $('.add-po-modal-btn-print').show();
  $('#hidden-po-number').val(po['po-number']);

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  var p = '#add-po-input-';
  keys = ['date', 'completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).val(po[keys[i]]);
    $(p+keys[i]).attr('readonly', '');
  }

  $(p+'to,'+p+'deliver-to').attr('disabled', '');

  $(p+'to,'+p+'deliver-to').material_select();
  $('.add-item-row').hide();
  $('.generate-po').hide();
  var items = po['items'];
  for(var key in items){
    if(items.hasOwnProperty(key)){
      $('.item-list').append(
        '<tr>'+
          '<td>'+items[key]['quantity']+'</td>'+
          '<td>'+items[key]['unit']+'</td>'+
          '<td>'+items[key]['description']+'</td>'+
          '<td>'+items[key]['type']+'</td>'+
          '<td>'+monetize(items[key]['unit-price'])+'</td>'+
          '<td>'+monetize(items[key]['subtotal'])+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  $('.add-po-input-total-amount').html(monetize(po['total-amount']));
}

function set_amend_po(po){
  create_options(projects, 'name', 'project-code', '#add-po-input-deliver-to');
  create_options(suppliers, 'name', 'supplier-code', '#add-po-input-to');

  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;Amend Purchase Order ('+po['po-number']+')');
  $('.add-po-modal-btn-generate').show();
  $('.add-po-modal-btn-add').hide();
  $('.add-po-modal-btn-amend').show();
  $('.add-po-modal-btn-amend').attr('id', po['po-number']);
  $('.add-po-modal-btn-print').hide();

  $('#hidden-po-number').val(po['po-number']);

  $('#add-po-input-date').val(date_to_string(new Date()));

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).val(po[keys[i]]);
  }
  $(p+'to,'+p+'deliver-to').material_select();
  var items = po['items'];
  for(var key in items){
    if(items.hasOwnProperty(key)){
      $('.item-list').append(
        '<tr>'+
          '<td>'+items[key]['quantity']+'</td>'+
          '<td>'+items[key]['unit']+'</td>'+
          '<td>'+items[key]['description']+'</td>'+
          '<td>'+items[key]['type']+'</td>'+
          '<td>'+monetize(items[key]['unit-price'])+'</td>'+
          '<td>'+monetize(items[key]['subtotal'])+'</td>'+
          '<td><i id="'+items[key]['subtotal']+'" class="material-icons clickable delete-item">close</i></td>'+
        '</tr>'
      );
    }
  }
  $('.add-po-input-total-amount').html(monetize(po['total-amount']));  
}



function set_add_po(project){

  $('#po-date-label').addClass('active');
  $('#add-po-input-date').val(date_to_string(new Date()));

  $('#add-po-input-deliver-to').val(project['project-code']);
  $('#add-po-input-deliver-to').material_select();
  $('.add-po-modal-btn-generate').show();
  $('.add-po-modal-btn-add').show();
  $('.add-po-modal-btn-amend').hide();
  $('.add-po-modal-btn-print').hide();
  $('.po-list').html('');
  var pos = project['pos'];

  var list = project['pos'];
  keysSorted = Object.keys(list).sort(function(a,b){return list[a]-list[b]});

  Array.prototype.move = function (old_index, new_index) {
    if (new_index >= this.length) {
        var k = new_index - this.length;
        while ((k--) + 1) {
            this.push(undefined);
        }
    }
    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
    return this; // for testing purposes
  };

  for(var i=0; i<keysSorted.length; i++){
    if(keysSorted[i].length > 9){
      original = keysSorted[i].substring(0, 9);
      for(var j=0; j<keysSorted.length; j++){
        if(keysSorted[j] == original){
          j++;
          if(j>=keysSorted.length) break;
          while(keysSorted[j].length > 9){
            j++;
            if(j>=keysSorted.length) break;
          }
          if(j>=keysSorted.length) break;
          keysSorted = keysSorted.move(i,j);
          break;
        }
      }
    }
  }


  for(var i=0; i<keysSorted.length; i++){
    key = keysSorted[i];
    if(pos.hasOwnProperty(key)){

      var supplier = find_supplier_code(pos[key]['to']);

      $('.po-list').append(
        '<tr id="'+key+'">'+
          '<td>'+key+'</td>'+
          '<td>'+supplier.name+'</td>'+
          '<td>'+((pos[key]['status'] == 1)?monetize(pos[key]['total-amount']):'-----')+'</td>'+
          '<td>'+pos[key]['date']+'</td>'+
          '<td><i id="open-'+key+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="amend-'+key+'" class="material-icons clickable tooltipped amend-po" data-position="top" data-delay="20" data-tooltip="Amend">build</i>&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+key+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i></td>'+
        '</tr>'
      );
    }

    $('.tooltipped').tooltip({delay: 50});
    
  }

}

function get_add_project_input(){
  var p = '#add-project-input-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  project = {};
  for(var i=0; i<keys.length; i+=1){
    project[keys[i]] = $(p+keys[i]).val();
  }
  project['pos'] = {};
  return project;
}

function get_add_supplier_input(){
  var p = '#add-supplier-input-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'telfax', 'contact-person', 'supplier-code'];
  supplier = {};
  for(var i=0; i<keys.length; i+=1){
    supplier[keys[i]] = $(p+keys[i]).val();
  }
  return supplier;
}

function get_add_item_input(){
  var p = '#add-item-input-';
  keys = ['quantity','unit', 'description', 'type', 'unit-price'];
  item = {};
  for(var i=0; i<keys.length; i+=1){
    item[keys[i]] = $(p+keys[i]).val();
  }
  return item;
}

function get_add_po_input(){
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  po = {};
  for(var i=0; i<keys.length; i+=1){
    po[keys[i]] = $(p+keys[i]).val();
  }
  var item_rows = $('.item-list>tr');
  var items = {};
  for(var i=1; i<item_rows.length; i++){
      items[i-1] = get_item_from_row(item_rows[i]);
  }
  po['items'] = items;
  po['total-amount'] = monetize($('.add-po-input-total-amount').html());
  po['date'] = date_to_string(new Date());
  return po;
}

function get_amend_po_input(){
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  po = {};
  for(var i=0; i<keys.length; i+=1){
    po[keys[i]] = $(p+keys[i]).val();
  }
  var item_rows = $('.item-list>tr');
  var items = {};
  for(var i=1; i<item_rows.length; i++){
      items[i-1] = get_item_from_row(item_rows[i]);
  }
  po['items'] = items;
  po['total-amount'] = monetize($('.add-po-input-total-amount').html());
  po['date'] = date_to_string(new Date());
  po['po-number'] = $('.add-po-modal-btn-amend').attr('id');
  return po;
}

function get_item_from_row(row){
  var arr = ['quantity', 'unit', 'description', 'type', 'unit-price', 'subtotal'];
  var item = {};
  for(var i=0; i<arr.length; i++){
    item[arr[i]] = row.children[i].innerHTML;
  }
  item['deliveries'] = {};
  return item;
}

function get_edit(type){
  if(type != 'supplier' && type != 'project') {
    console.log('Invalid type:' + type);
    return;
  }
  var p = '.'+type+'-';
  keys = (type == 'supplier')?['name','vat-reg', 'address', 'mobile-number', 'telfax', 'contact-person', 'supplier-code']:['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  obj = {};
  for(var i=0; i<keys.length; i+=1){
    obj[keys[i]] = $(p+keys[i]).html();
  }
  return obj;
}

function clear_add_po(){
  $('#po-date-label').addClass('active');
  $('#add-po-input-date').val(date_to_string(new Date()));

  $('.add-po-modal-btn-amend').hide();
  
  $('.add-po-input').val('').removeAttr('readonly');

  var p = '#add-po-input-';
  $(p+'to,'+p+'deliver-to').removeAttr('disabled');
  $(p+'to,'+p+'deliver-to').material_select();

  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;Add New Purchase Order');
  $('.add-po-modal-btn-print').hide();
  $('.add-item-row').show();
  $('.add-po-modal-btn-add').show();
  $('.generate-po').show();
  $('.add-po-input-total-amount').html('0');
  var item_rows = $('.item-list>tr');
  for(var i=item_rows.length-1; i>=1; i--){
    $('.item-list>tr')[1].remove();
  }

  create_options(projects, 'name', 'project-code', '#add-po-input-deliver-to');
  create_options(suppliers, 'name', 'supplier-code', '#add-po-input-to');
}


