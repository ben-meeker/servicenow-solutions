[Home](/) [Solutions](/solutions)

Fullcalendar Calendar Widget
============================

Widget
------

  

Creator: [@ben-meeker](https://github.com/ben-meeker)
-----------------------------------------------------

  

This is a basic widget for the ServiceNow Service Portal that implements [fullcalendar.io](https://fullcalendar.io) - this allows for dynamic event creation, on-click event actions, and calendar styling.

  

Getting Started
---------------

*   Create a new widget in your ServiceNow instance.
*   Add required dependencies.

*   Go to the widget platform view, scroll down to the Dependencies related list.
*   Click on New and name it Calendar. Press Submit.
*   Once your widget dependency has been created, open it and click on the JS Includes related list.
*   Click on New and set the Source to URL
*   Enter this URL into the JS file URL field: 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.5.1/fullcalendar.min.js'. Press Submit.
*   Navigate back to your widget dependency record and click on the CSS Includes related list.
*   Click on New and set the Source to URL.
*   Enter this URL into the CSS file URL field: 'https://cdnjs.cloudflare.com/ajax/libs/fullcalendar/3.5.1/fullcalendar.min.css'. Press Submit.

*   Fill out widget script fields with included code.

  

HTML Template
-------------

    
    <div>
        <!-- This div is a placeholer for the calendar (see Client Script) -->
        <div id="calendar"></div>
    </div>
            

  

CSS-SCSS
--------

    
    /* Override existing calendar CSS. Find these classes in Google Inspect */
    .fc td,.fc th {
        border-color: #309C42;
        background-color: #ffffff;
    }
    
    .fc-left {
        color: #212121;
        font-family: 'GT Super Text';
    }
    
    .fc button {
        border-color: #309C42;
        background-color: #ffffff;
    }
            

  

Client Script
-------------

    
    api.controller=function() {
        /* widget controller */
        var c = this;
    
        // Load fullcalendar.io calendar with options
        $("#calendar").fullCalendar({
        events: c.data.eventList,
        // Set default event color
        eventColor: '#344C38',
        // Do something when clicked
        eventClick: function (event) {
            alert("Give some sort of alert/message");
            // Redirect to page
            top.window.location = 'https://github.com/ben-meeker/servicenow-calendar-widget';
        }
        });
    };
            

  

Server Script
-------------

    
    (function() {
        data.eventList=[];
        
        // Get events from table
        var events = new GlideRecord('incident')
        // Add queries to narrow down data
        events.addQuery('date>=javascript:gs.beginningOfLastMonth()')
        events.query()
        while (events.next()) {
            var eventJSON = {};
            
            // Set event JSON fields with useful data
        
            // Set title of event
            eventJSON.title = events.getValue('short_description');
            // Set date field to tell calendar when to display event
            eventJSON.date = events.getValue('due_date');
            // Set allDay to true to remove time display on event in calendar
            eventJSON.allDay = true;
    
            // Set custom fields for specific use cases
            eventJSON.sys_id = events.getValue('sys_id');
            eventJSON.assigned_to = events.getValue('assigned_to');
            
            // Set additional fields based on criteria
            if (events.getValue('assigned_to') == false) {
                eventJSON.color = 'white';
                eventJSON.textColor = '#344C38';
                eventJSON.borderColor = '#344C38';
            }
                
            data.eventList.push(eventJSON);
        }
    })();