var item_count = 0;
var projects = [];
var suppliers = [];



(function($){
  $(function(){
    $('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'mmmm dd, yyyy'
    });

    $('select').material_select();

    load_projects();
    load_suppliers();

    var project = find_project_code('17-411');
    set_view_project(project);
    $('.view-project-modal').openModal();
    
    $('.add-project').click(function(){
      clear_add_project();
      $('.add-project-modal').openModal();
    });

    $('.add-supplier').click(function(){
      clear_add_supplier();
      $('.add-supplier-modal').openModal();
    });

    $('.add-po').click(function(){
      clear_add_po();
      $('.add-po-modal').openModal();
    });

    $('.add-project-modal-btn-add').click(function(){
      if(!check_project_input()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){$('.add-project-modal').openModal();},300);
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
        setTimeout(function(){$('.add-supplier-modal').openModal();},300);
      }
      else{
        supplier = get_add_supplier_input(); 
        add_supplier(supplier);
        clear_add_supplier();
      }
    });

    $('.project-list').on('click', '.open-project', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var project = find_project_code(pid);
      if(project != null) {
        set_view_project(project);
        $('.view-project-modal').openModal();
      }
      else Materialize.toast('Project code '+pid+' cannot be found.',5000);
    });

    $('.supplier-list').on('click', '.open-supplier', function(){
      var pid = this.id.split(/-(.+)/)[1];
      var supplier = find_supplier_code(pid);
      if(supplier != null) {
        set_view_supplier(supplier);
        $('.view-supplier-modal').openModal();
      }
      else Materialize.toast('Supplier id '+pid+' cannot be found.',5000);
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

    $('.view-project-modal-btn-save').click(function(){
      if(!check_project_edit()){
        Materialize.toast('Some fields are blank.',5000);
        setTimeout(function(){$('.view-project-modal').openModal();},300);
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
        setTimeout(function(){$('.view-supplier-modal').openModal();},300);
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

  }); // end of document ready
})(jQuery); // end of jQuery name space

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

function edit_project(project){
  $.each(projects, function(index, p){
      if(p['project-code'] == project['project-code']){
        projects[index] = project;
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

function load_projects(){
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
  //ensure that there are no duplicate project codes
  /*pn = generate_ponum();
  while(pn_is_existing(pn)){ 
    sc = generate_suppliercode();
  }
  $(p+'supplier-code').val(sc);*/
}

function set_view_project(project){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(project[keys[i]]);
  } 
}

function set_view_supplier(supplier){
  var p = '.supplier-';
  keys = ['name','vat-reg', 'address', 'mobile-number', 'contact-person', 'supplier-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(supplier[keys[i]]);
  } 
}

function get_add_project_input(){
  var p = '#add-project-input-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  project = {};
  for(var i=0; i<keys.length; i+=1){
    project[keys[i]] = $(p+keys[i]).val();
  }
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
  /*var p = '#add-po-input-';
  var selector = ''+
    p+'name'+
    ','+p+'work-type'+
    ','+p+'address'+
    ','+p+'mobile-number'+
    ','+p+'contact-person'+
    ','+p+'project-code';
  $(selector).val('');*/
  create_project_options();
  create_supplier_options();
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