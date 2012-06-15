/*!
Sselect.
Version: 0.6 (15.06.2012)
https://github.com/trolev/sslect/

$(document).ready(function(){
  $('select').sselect({
    create:     function(selected, select, block){},
    select:     function(selected){}
  });
});
*/

jQuery.fn.sselect = function(options){
  var settings = jQuery.extend({
    create:     function(selected, select, block){},
    select:     function(selected, block){}
  },options);
  $(document).unbind().bind('click', function(e){
    if ($(e.target).closest('.sselect').length) {
      return;
    } else {
      $('.sselect-open').removeClass('sselect-open');
    }
  });  
  this.each(function() {
    var $this = $(this);
    if (!$this.next(".sselect").length) {
      $this.after('<div class="sselect"><div class="sselect-text"><span class="txt"></span></div><div class="sselect-list"></div></div>')
    } else {
        return;
    }
    var $sselect = $this.next(".sselect");
    var stxt = $('.sselect-text', $sselect);
    var txt = $('.txt', $sselect);
    var list = $('.sselect-list', $sselect);
    function createUl(obj, index){
      n = index;
      l = "<ul class='sselect-ul'>";
      $('option', obj).each(function(){
        var $this = $(this);
        $this.attr({'data-index': n});
        var option = $this.text();
        l += "<li><a href='#' data-index='"+ n +"'>" + option + "</a></li>"
        n = n + 1;
      });
      l += "</ul>";
      return l;
    }
    if ($('optgroup', $this).length) {
      opt = 0;
      $('optgroup', $this).each(function() {
        var $this = $(this);
        label = $this.attr('label') ? $this.attr('label') : '';
        list.append('<span class="sselect-label">' + label + '</span>' + createUl($this, opt));
        opt = opt + $('option', $this).length;
      });
    } else {
      list.html(createUl($this, 0));
    }
    function selected(one) {
      var selected = $(':selected', $this);
      txt.html(selected.text());
      $('.selected', list).removeClass('selected');
      $('a[data-index="' + selected.data('index') + '"]', list).parent().addClass('selected');
      if (!one) {
        settings.select(selected, $sselect);
      }
    }
    selected(true);
    settings.create($(':selected', $this), $this, $sselect);
    $this.change(function () {
      selected();
    });
    $('a', list).unbind().bind('click', function() {
      $('option[data-index="' + $(this).data('index') + '"]', $this).attr("selected", "selected");
      selected();
      $sselect.removeClass('sselect-open');
      return false; 
    });
    stxt.unbind().bind('click', function() {
      $('.sselect-open').not($(this).parent()).removeClass('sselect-open');
      $sselect.toggleClass('sselect-open');
      return false; 
    });
  });
};