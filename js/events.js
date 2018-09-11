
function fetchEvents() {
  $.ajax({
    url: "https://api.startupsoc.kacperkielak.com/fb-events?fields=name,start_time,place,cover",
    type: "GET",
    success: function(data) {
      events = data.data;
      for (i in events) {
        events[i].start_time = new Date(events[i].start_time);
      }
      events.sort(function(e1, e2) {
        return e1.start_time.getTime() - e2.start_time.getTime();
      });

      renderEvents(events);
    },
    error: function(data) {
      console.log(data);
    }
  });
}


function renderEvents(events) {
  loader = document.getElementById("events-loader");
  if (events.length == 0) {
    document.getElementById("no-events-info").style.display = "block";
    loader.style.display = "none";
    return;
  }

  eventsContainer = document.getElementById("events-container");
  eventBoxes = $.map(events, createEventBox);
  eventRows = createEventRows(eventBoxes);
  loader.style.display = "none";
  for (i in eventRows) {
    eventsContainer.appendChild(eventRows[i]);
  }
}

function createEventRows(eventBoxes) {
  eventRows = [];
  row = document.createElement("row");
  row.className = "row";
  for (i in eventBoxes) {
    row.appendChild(eventBoxes[i]);
    if (i % 3 == 2) {
      eventRows.push(row);
      row = document.createElement("row");
      row.className = "row";
    }
  }

  return eventRows;
}

function createEventBox(event) {
  var div1 = document.createElement("div");
  div1.className = "col-xs-12 col-sm-4";

  // Create image
  var div2 = document.createElement("div");
  div2.className = "single_event item wow";

  var imgDiv = document.createElement("div");
  imgDiv.className = "single_event_img";

  var img = document.createElement("img");
  img.src = event.cover.source;

  imgDiv.appendChild(img);
  div2.appendChild(imgDiv);

  // Create details
  detailsDiv = document.createElement("div");
  detailsDiv.className = "single_event_content";

  nameHeader = document.createElement("h5");
  nameHeader.innerHTML = event.name;

  detailsList = document.createElement("ul");
  detailsList.className = "fa-ul";

  timeElement = document.createElement("li");
  timeElement.innerHTML = "<i class=\"fa-li fa fa-clock-o\" aria-hidden=\"true\"></i>"
                          + formatDatetime(event.start_time);

  placeElement = document.createElement("li");
  placeElement.innerHTML = "<i class=\"fa-li fa fa-map-marker\" aria-hidden=\"true\"></i>"
                           + event.place.name;

  detailsList.appendChild(timeElement);
  detailsList.appendChild(placeElement);
  detailsDiv.appendChild(nameHeader);
  detailsDiv.appendChild(detailsList);
  div2.appendChild(detailsDiv);

  div1.appendChild(div2);
  return div1;
} /*
<div class="col-xs-12 col-sm-4">
    <div class="single_event item wow">
        <div class="single_event_img">
            <img src="img/bg-img/service-1.jpg" alt="">
            <div class="single_event_title">
                <h4>Networking</h4>
            </div>
        </div>
        <div class="single_event_content">
            <h5>Startup Society Launch: Meet &amp; Greet Drinks</h5>
            <ul class="fa-ul">
                <li><i class="fa-li fa fa-clock-o" aria-hidden="true"></i> Tue, 24 Oct 20:00</li>
                <li><i class="fa-li fa fa-map-marker" aria-hidden="true"></i> Beorma Bar, University of Birmingham</li>
            </ul>
        </div>
    </div>
</div>
*/

var dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
var monthNames = ["Jan", "Feb", "Mar", "Apr", "May",
                  "Jun", "Jul", "Aug", "Sep", "Nov", "Dec"];
function formatDatetime(datetime) {
  var day = datetime.getDay();
  var date = datetime.getDate();
  var month = datetime.getMonth();
  var hours = datetime.getHours();
  var minutes = datetime.getMinutes();
  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  return dayNames[day] + ", " + date + " " + monthNames[month] +
         " " + hours + ":" + minutes;
}
