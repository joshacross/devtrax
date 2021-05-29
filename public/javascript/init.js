(function($){
  $(function(){

    $('.sidenav').sidenav();

  }); // end of document ready
})(jQuery); // end of jQuery name space


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


