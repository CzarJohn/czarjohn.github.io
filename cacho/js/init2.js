var item_count = 0;
var projects = [];
var suppliers = [];

//todne scrolltop whenever opening a new modal
//todne lock select on readonly, fixed with not showing add button on view po
//todne clear items on po
//todne add delete po with confirmation
//todne change po view
//todne change view po icon
//todne add print po links
//todne print po on add

//todo disable select
//todo don't place active on select's label
//todo add monitoring
//todo add list of items from supplier
//todo add amend po


(function($){
  $(function(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mmmm dd, yyyy'
    });

    $('select').material_select();

    $('.tooltipped').tooltip({delay: 50});

    load_projects();
    load_suppliers();

    $('.add-project').click(function(){
      clear_add_project();
      $('.add-project-modal').openModal();
      $('.add-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

    $('.add-supplier').click(function(){
      clear_add_supplier();
      $('.add-supplier-modal').openModal();
      $('.add-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

    $('.add-po').click(function(){
      clear_add_po();
      var pid = this.id.split(/-(.+)/)[1];
      var project = find_project_code(pid);
      set_add_po(project);
      $('.add-po-modal').openModal();
      $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });


    $('.add-project-modal-btn-add').click(function(){
      if(!check_project_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-project-modal').openModal();
          $('.add-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');

        },300);
      }
      else{
        project = get_add_project_input(); 
        add_project(project);
        clear_add_project();
      }
    });

    $('.add-supplier-modal-btn-add').click(function(){
      if(!check_supplier_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-supplier-modal').openModal();
          $('.add-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        supplier = get_add_supplier_input(); 
        add_supplier(supplier);
        clear_add_supplier();
      }
    });

    $('.add-po-modal-btn-add').click(function(){
      if(!check_po_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.add-po-modal').openModal();
          $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        po = get_add_po_input(); 
        add_po(po);
        clear_add_po();
      }
    });

    $('.add-po-modal-btn-print').click(function(){
      print_po($('#hidden-po-number').val());
    });

    $('.add-item').click(function(){
      if(!check_item_input()){
        Materialize.toast('Some fields are blank.',5000);
      }
      else{
        item = get_add_item_input();
        add_item(item);
        clear_add_item();
      }
    });

    $('.project-list').on('click', '.open-project', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var project = find_project_code(pid);
      if(project != null) {
        set_view_project(project);
        set_add_po(project);
        $('.view-project-modal').openModal();
        $('.view-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
      }
      else Materialize.toast('Project code '+pid+' cannot be found.',5000);
    });

    $('.supplier-list').on('click', '.open-supplier', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var supplier = find_supplier_code(pid);
      if(supplier != null) {
        set_view_supplier(supplier);
        $('.view-supplier-modal').openModal();
        $('.view-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
      }
      else Materialize.toast('Supplier id '+pid+' cannot be found.',5000);
    });

    $('.po-list').on('click', '.open-po', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var po = find_po_code(pid);
      if(po != null) {
        po['po-number'] = pid;
        clear_add_po();
        set_view_po(po);
        $('.add-po-modal').openModal();
        $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');

      }
      else Materialize.toast('PO code '+pid+' cannot be found.',5000);
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
      else Materialize.toast('Project code '+pid+' cannot be found.',5000);
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
      else Materialize.toast('PO number '+pid+' cannot be found.',5000);
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
      else Materialize.toast('Supplier id '+pid+' cannot be found.',5000);
    });

    $('.item-list').on('click', '.delete-item', function(){
      var total = parseInt($('.add-po-input-total-amount').html());
      total -= parseInt(this.id);
      $('.add-po-input-total-amount').html(total);
      $(this).parent().parent().remove();
    });

    $('.view-project-modal-btn-save').click(function(){
      if(!check_project_edit()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.view-project-modal').openModal();
          $('.view-project-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        project = get_edited_project();
        if(find_project_code(project['project-code']) != null){
          edit_project(project);
        }
        else Materialize.toast('Project code '+pid+' cannot be found.',5000); 
      }
    });

    $('.view-supplier-modal-btn-save').click(function(){
      if(!check_supplier_edit()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){
          $('.view-supplier-modal').openModal();
          $('.view-supplier-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
        },300);
      }
      else{
        supplier = get_edited_supplier();
        if(find_supplier_code(supplier['supplier-code']) != null){
          edit_supplier(supplier);
        }
        else Materialize.toast('Supplier id '+pid+' cannot be found.',5000); 
      }
    });

    $('.generate-project').click(generate_project);
    $('.generate-supplier').click(generate_supplier);
    $('.generate-po').click(generate_po);
    $('.generate-item').click(generate_item);

    $('.po-generator').click(function(){
      clear_add_po();
      $('.add-po-modal').openModal();
      $('.add-po-modal>.modal-content').animate({ scrollTop: 0 }, 'fast');
    });

  }); // end of document ready
})(jQuery); // end of jQuery name space

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
  $('.supplier-list').append(
    '<li id="'+supplier['supplier-code']+'" class="collection-item supplier">'+supplier['name']+'<span class="right teal-text">'+
      '<i id="open-'+supplier['supplier-code']+'" class="material-icons clickable open-supplier">mode_edit</i> '+
      '<i id="delete-'+supplier['supplier-code']+'" class="material-icons clickable delete-supplier">delete</i>'+
    '</span></li>'
  );
  Materialize.toast('Successfully added supplier',3000);
}

function add_item(item){
  $('.item-list').append(
    '<tr>'+
      '<td>'+item['quantity']+'</td>'+
      '<td>'+item['unit']+'</td>'+
      '<td>'+item['description']+'</td>'+
      '<td>'+item['unit-price']+'</td>'+
      '<td>'+parseInt(item['unit-price'])*parseInt(item['quantity'])+'</td>'+
      '<td><i id="'+parseInt(item['unit-price'])*parseInt(item['quantity'])+'" class="material-icons clickable delete-item">close</i></td>'+
    '</tr>'
  );

  var total = parseInt($('.add-po-input-total-amount').html());
  total += parseInt(item['unit-price'])*parseInt(item['quantity']);
  $('.add-po-input-total-amount').html(total);

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
    project['pos'][po['po-number']] = po;
    localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
    $('.po-list').append(
      '<tr id="'+po['po-number']+'">'+
        '<td>'+po['po-number']+'</td>'+ 
        '<td>'+po['total-amount']+'</td>'+
        '<td>'+po['date']+'</td>'+
        '<td>'+
          '<i id="open-'+po['po-number']+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+po['po-number']+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i>'+
        '</td>'+
      '</tr>'
    );
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
        //projects[index] = project;
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

function load_suppliers(){
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
}

function check_project_input(){
  var p = '#add-project-input-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function check_supplier_input(){
  var p = '#add-supplier-input-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
      return false;
    }
  } 
  return true;
}

function check_item_input(){
  var p = '#add-item-input-';
  keys = ['quantity','unit', 'description', 'unit-price'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).val();
    if(input.trim() == ''){
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
      return false;
    }
  } 
  return true;
}

function check_supplier_edit(){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    var input = $(p+keys[i]).html();
    if(input.trim() == ''){
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
  return null;
}

function find_supplier_code(code){
  for(var i=0; i<suppliers.length; i++){
    if(suppliers[i]['supplier-code'] == code){
      return suppliers[i];
    }
  }
  return null;
}

function find_po_code(code){
  var project_code = code.substring(0,6);
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == project_code){
      if(projects[i]['pos'][code] != undefined) return projects[i]['pos'][code];
      return null;
    }
  }
  return null;
}

function arr_to_obj(arr){
  var obj = {};
  $.each(arr, function(index, value){
    obj[index] = value;
  })
  return obj;
}

function obj_to_arr(obj){
  return $.map(obj, function(value, index){
    return [value];
  });
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

function generate_project(){
  var p = '#add-project-input-';
  $('.add-project-modal>.modal-content>.input-field>label').addClass('active');
  $(p+'name').val(generate_projectname());
  $(p+'work-type').val(generate_worktype());
  $(p+'address').val(generate_address());
  $(p+'mobile-number').val(generate_mobile());
  $(p+'contact-person').val(generate_name());
  //ensure that there are no duplicate project codes
  pc = generate_projectcode();
  while(pc_is_existing(pc)){ 
    pc = generate_projectcode();
  }
  $(p+'project-code').val(pc);
}

function generate_supplier(){
  var p = '#add-supplier-input-';
  $('.add-supplier-modal>.modal-content>.input-field>label').addClass('active');
  $(p+'name').val(generate_suppliername());
  $(p+'vat-reg').val(generate_vatreg());
  $(p+'address').val(generate_address());
  $(p+'mobile-number').val(generate_mobile());
  $(p+'contact-person').val(generate_name());
  //ensure that there are no duplicate project codes
  sc = generate_suppliercode();
  while(sc_is_existing(sc)){ 
    sc = generate_suppliercode();
  }
  $(p+'supplier-code').val(sc);
}

function generate_po(){
  var p = '#add-po-input-';

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  $(p+'completion-date').val(generate_date());
  $(p+'requested-by').val(generate_name());
  $(p+'ordered-by').val(generate_name());
  $(p+'cost-ref').val('This is not a random data string.');
  $(p+'to-be-used-for').val('So is this. Haha.');
  $(p+'conforme').val(generate_name());

  tos = [];
  deliver_tos = [];
  $("#add-po-input-to option").each(function(){
    tos.push($(this).val());
  });
  $("#add-po-input-deliver-to option").each(function(){
    deliver_tos.push($(this).val());
  });
  if($("#add-po-input-to").val()==""){
    $('#add-po-input-to').val(tos[Math.floor(Math.random()*tos.length)]);
    $('#add-po-input-to').material_select();
  }
  if($("#adddpo-input-deliver-to").val()==""){
    $('#add-po-input-deliver-to').val(deliver_tos[Math.floor(Math.random()*deliver_tos.length)]);
    $('#add-po-input-deliver-to').material_select();
  }
}

function generate_item(){
  $('.add-item-row>td>div>label').addClass('active');
  $('#add-item-input-quantity').val(generate_number(1,20));
  $('#add-item-input-unit').val(generate_unit());
  $('#add-item-input-description').val(generate_item2());
  $('#add-item-input-unit-price').val(generate_number(100,2500));
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
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(supplier[keys[i]]);
  } 
}

function set_view_po(po){
  create_project_options();
  create_supplier_options();

  $('.add-po-header').html('&nbsp;&nbsp;&nbsp;View Purchase Order ('+po['po-number']+')');
  $('.add-po-modal-btn-print').show();
  $('#hidden-po-number').val(po['po-number']);

  $('.add-po-modal>.modal-content>.input-field>label').addClass('active');
  var p = '#add-po-input-';
  keys = ['completion-date','requested-by', 'ordered-by', 'cost-ref', 'to-be-used-for', 'conforme', 'to', 'deliver-to'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).val(po[keys[i]]);
    $(p+keys[i]).attr('readonly', '');
  }
  $(p+'to,'+p+'deliver-to').material_select();
  $('.add-item-row').hide();
  $('.add-po-modal-btn-add').hide();
  $('.generate-po').hide();
  var items = po['items'];
  for(var key in items){
    if(items.hasOwnProperty(key)){
      $('.item-list').append(
        '<tr>'+
          '<td>'+items[key]['quantity']+'</td>'+
          '<td>'+items[key]['unit']+'</td>'+
          '<td>'+items[key]['description']+'</td>'+
          '<td>'+items[key]['unit-price']+'</td>'+
          '<td>'+items[key]['subtotal']+'</td>'+
          '<td></td>'+
        '</tr>'
      );
    }
  }
  $('.add-po-input-total-amount').html(po['total-amount']);
}

function set_add_po(project){
  $('#add-po-input-deliver-to').val(project['project-code']);
  $('#add-po-input-deliver-to').material_select();
  $('.po-list').html('');
  var pos = project['pos'];
  for(var key in pos){
    if(pos.hasOwnProperty(key)){
      $('.po-list').append(
        '<tr id="'+key+'">'+
          '<td>'+key+'</td>'+
          '<td>'+pos[key]['total-amount']+'</td>'+
          '<td>'+pos[key]['date']+'</td>'+
          '<td><i id="open-'+key+'" class="material-icons clickable tooltipped open-po" data-position="top" data-delay="20" data-tooltip="Open">open_in_browser</i>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+
          '<i id="delete-'+key+'" class="material-icons clickable tooltipped delete-po" data-position="top" data-delay="20" data-tooltip="Delete">delete</i></td>'+
        '</tr>'
      );
    }
    
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
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  supplier = {};
  for(var i=0; i<keys.length; i+=1){
    supplier[keys[i]] = $(p+keys[i]).val();
  }
  return supplier;
}

function get_add_item_input(){
  var p = '#add-item-input-';
  keys = ['quantity','unit', 'description', 'unit-price'];
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
  po['total-amount'] = parseInt($('.add-po-input-total-amount').html());
  po['date'] = 'March 05, 2017';
  return po;
}

function get_item_from_row(row){
  var item = {};
  item['quantity'] = row.children[0].innerHTML;
  item['unit'] = row.children[1].innerHTML;
  item['description'] = row.children[2].innerHTML;
  item['unit-price'] = row.children[3].innerHTML;
  item['subtotal'] = row.children[4].innerHTML;
  return item;
}

function get_edited_project(){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  project = {};
  for(var i=0; i<keys.length; i+=1){
    project[keys[i]] = $(p+keys[i]).html();
  }
  return project;
}

function get_edited_supplier(){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  supplier = {};
  for(var i=0; i<keys.length; i+=1){
    supplier[keys[i]] = $(p+keys[i]).html();
  }
  return supplier;
}

function clear_add_project(){
  var p = '#add-project-input-';
  var selector = ''+
    p+'name'+
    ','+p+'work-type'+
    ','+p+'address'+
    ','+p+'mobile-number'+
    ','+p+'contact-person'+
    ','+p+'project-code';
  $(selector).val('');
}

function clear_add_supplier(){
  var p = '#add-supplier-input-';
  var selector = ''+
    p+'name'+
    ','+p+'vat-reg'+
    ','+p+'address'+
    ','+p+'mobile-number'+
    ','+p+'contact-person';
  $(selector).val('');
}

function clear_add_po(){
  var p = '#add-po-input-';
  var selector = ''+
    p+'completion-date'+
    ','+p+'requested-by'+
    ','+p+'ordered-by'+
    ','+p+'cost-ref'+
    ','+p+'to-be-used-for'+
    ','+p+'conforme';
  $(selector).val('').removeAttr('readonly');
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
  create_project_options();
  create_supplier_options();
}

function clear_add_item(){
  var p = '#add-item-input-';
  var selector = ''+
    p+'quantity'+
    ','+p+'unit'+
    ','+p+'description'+
    ','+p+'unit-price';
  $(selector).val('');
}

function create_project_options(){
  var sb = '<option value="" disabled selected>Choose your option</option>';
  for(var i=0;i<projects.length; i++){
    sb += '<option value="'+projects[i]['project-code']+'">'+projects[i]['name']+'</option>'; 
  }
  $('#add-po-input-deliver-to').html(sb);
  $('#add-po-input-deliver-to').material_select();
}


function create_supplier_options(){
  var sb = '<option value="" disabled selected>Choose your option</option>';
  for(var i=0;i<suppliers.length; i++){
    sb += '<option value="'+suppliers[i]['supplier-code']+'">'+suppliers[i]['name']+'</option>'; 
  }
  $('#add-po-input-to').html(sb);
  $('#add-po-input-to').material_select();
}

function three_digits(num){
  if(num < 10) return '00'+num;
  if(num < 100) return '0'+num;
  return num;
}