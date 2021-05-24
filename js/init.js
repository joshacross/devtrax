(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

var calendar = $('#calendar');
var daysInMonth = function()  {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

for (var day = 1; day < 32; day++){
  var dayEl = document.createElement('div');
  dayEl.className = 'day';
  dayEl.innerHTML = day;
  calendar.append(dayEl);
}
