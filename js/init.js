(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space

<<<<<<< HEAD

var searchBar = function() {
  var input = $('#search');
  var filter = input.val().toUpperCase();
  console.log(filter);
  var cardContainer = $('#card-container-row');
  var titles = document.getElementsByClassName('card-title');

  for (i=0; i<titles.length; i++){
    var contractCard = titles[i].parentElement.parentElement.parentElement;
    txtValue = titles[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      contractCard.style.visibility = "visible";
      cardContainer.prepend(contractCard);
    } else {
      contractCard.style.visibility = "hidden";
      cardContainer.append(contractCard);
    }
  }
}


=======
var calendar = $('#calendar');
var daysInMonth = function()  {
  var now = new Date();
  return new Date(now.getFullYear(), now.getMonth()+1, 0).getDate();
}

for (var day = 1; day < 32; day++){
  var dayEl = document.createElement('div');
  dayEl.className = 'col s2 day';
  dayEl.innerHTML = day;
  calendar.append(dayEl);
}
>>>>>>> 55b2b8459ce341d7a0b6546506f17c7ec873e200
