function init_components(){
	$('.datepicker').pickadate({
      selectMonths: true, // Creates a dropdown to control month
      selectYears: 15, // Creates a dropdown of 15 years to control year
      format: 'yyyy-mm-dd'
    });

    $('select').material_select();

    $('.tooltipped').tooltip({delay: 50});

    $('.collapsible').collapsible();

    $('.generate-project').click(generate_project);
    $('.generate-supplier').click(generate_supplier);
    $('.generate-po').click(generate_po);
    $('.generate-item').click(generate_item);
}

Number.prototype.formatMoney = function(c, d, t){
var n = this, 
    c = isNaN(c = Math.abs(c)) ? 2 : c, 
    d = d == undefined ? "." : d, 
    t = t == undefined ? "," : t, 
    s = n < 0 ? "-" : "", 
    i = String(parseInt(n = Math.abs(Number(n) || 0).toFixed(c))), 
    j = (j = i.length) > 3 ? j % 3 : 0;
   return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

function monetize(value){
  return (parseFloat(value)).formatMoney(2);
}

function demonetize(value){
  return (parseFloat(value.replace(/,/g, '')));
}

function date_to_string(dateX){
  return dateX.getFullYear()+'-'+pad(dateX.getMonth()+1,2)+'-'+pad(dateX.getDate(),2)
}

function openModal(selector){
	$(selector).openModal();
    $(selector+'>.modal-content').animate({ scrollTop: 0 }, 'fast');
}

function clear_input(selector){
	//todo clear select
	$(selector).val('').removeAttr('readonly').removeAttr('disabled');
}

function create_options(opts, label, value, selector){
  var sb = '<option value="" disabled selected>Choose your option</option>';
  if(Array.isArray(opts)){
    for(var i=0;i<opts.length; i++){
      sb += '<option value="'+opts[i][value]+'">'+opts[i][label]+'</option>'; 
    }
  }
  else{
    for(var key in opts){
      if(pos.hasOwnProperty(key)){
        sb += '<option value="'+key+'">'+key+'</option>'; 
      }
    }
  }
  $(selector).html(sb);
  $(selector).material_select();
}

function three_digits(num){
  if(num < 10) return '00'+num;
  if(num < 100) return '0'+num;
  return num;
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

function get_last_day(yearmonth){
  var parts = yearmonth.split('-');
  var year = parts[0];
  var month = parseInt(parts[1])-1;
  var d = new Date(year, month + 1, 0);
  return d.getDate();
}