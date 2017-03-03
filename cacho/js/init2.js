var item_count = 0;
var projects = [];

(function($){
  $(function(){
    load_projects();

    //$('.view-project-modal').openModal();
    //$('.add-project-modal').openModal();
    
    $('.add-project').click(function(){
      clear_add_project();
      $('.add-project-modal').openModal();
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

    $('.project-list').on('click', '.open-project', function(){
      var pid = this.id.split(/-(.+)/)[1]
      var project = find_project_code(pid);
      if(project != null) {
        set_view_project(project);
        $('.view-project-modal').openModal();
      }
      else Materialize.toast('Project code '+pid+' cannot be found.',5000);
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



    $('.generate-project').click(generate_project);

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

function delete_project(project){
  projects = projects.filter(function( obj ) {
    return obj['project-code'] !== project['project-code'];
  });
  localStorage.setItem('projects', JSON.stringify(arr_to_obj(projects)));
  $('.project-list>#'+project['project-code']).remove();
  Materialize.toast('Successfully deleted project',3000);
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


function check_project_edit(){
    console.log('here');
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

function find_project_code(code){
  for(var i=0; i<projects.length; i++){
    if(projects[i]['project-code'] == code){
      return projects[i];
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

function set_view_project(project){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  for(var i=0; i<keys.length; i+=1){
    $(p+keys[i]).html(project[keys[i]]);
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

function get_edited_project(){
  var p = '.project-';
  keys = ['name','work-type', 'address', 'mobile-number', 'contact-person', 'project-code'];
  project = {};
  for(var i=0; i<keys.length; i+=1){
    project[keys[i]] = $(p+keys[i]).html();
  }
  return project;
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
