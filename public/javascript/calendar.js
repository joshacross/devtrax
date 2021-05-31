document.addEventListener('DOMContentLoaded', function() {
  
  /* initialize the external events
  -----------------------------------------------------------------*/
  
  var containerEl = document.getElementById('external-events-list');
  new FullCalendar.Draggable(containerEl, {
    itemSelector: '.fc-event',
    eventData: function(eventEl) {
      return {
        title: eventEl.innerText.trim()
      }
    }
  });
  
  /* initialize the calendar
  -----------------------------------------------------------------*/
  
  var calendarEl = document.getElementById('calendar');
  var calendar = new FullCalendar.Calendar(calendarEl, {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    navLinks: true,
    navLinkDayClick: function () {
      console.log('time');
    },
  
    editable: true,
  
    eventResize: function (cChange) {
      console.log();
    },
  
    droppable: true, 
    drop: function(takeoff) {
      if (document.getElementById('drop-remove').checked) {
        takeoff.draggedEl.parentNode.removeChild(takeoff.draggedEl);
      }
    },
  
    
  });
  
  calendar.render();
  
  });