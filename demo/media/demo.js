$(document).ready(function(){

  $('ul').each(function() {
    $('li:odd', this).addClass('tw');
  })
  // 1...
  $('.js-select1 select').sselect();
  // 2...
  $('.js-go').click(function() {
    $(this).hide();
    $(this).prev('select').sselect({    
      create: function(selected){
        alert('create');
      },
      select: function(selected){
        alert(selected.text());
      }
    });
  });
  // 3...
  $('.js-select3 select').sselect();
  $('.js-reset').click(function() {
    var select = $('select', $(this).prev());
    $('option:last', select).remove();
    select.sselect();
  });
});