(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


var searchBar = function() {
  var input = $('#search');
  var filter = input.val().toUpperCase();
  console.log(filter);
  var cardContainer = $('#card-container');
  var contract = $("#contract-card");
  var titles = document.getElementsByClassName('card-title');

  for (i=0; i<titles.length; i++){
    txtValue = titles[i].innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      titles[i].parentElement.parentElement.parentElement.style.visibility = "visible";
    } else {
      titles[i].parentElement.parentElement.parentElement.style.visibility = "hidden";
    }
  }
}


