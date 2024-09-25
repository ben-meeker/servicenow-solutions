# Service Portal Widget Show/Hide Based on User Authentication

### Widget

### Creator: [@ben-meeker](https://github.com/ben-meeker)

Following these steps allow you to show/hide a widget based on whether or not a user is signed in. 

## Getting Started
* Create a new widget in your ServiceNow instance.
* Fill out widget script fields with included code.
* Apply the ng-if tag to the HTML element you want to show/hide based on user status
* Set a variable in your server script equal to the value of `gs.isLoggedIn();`
* Reference that variable in your ng-if tag on the HTML element. In this example, `ng-if="!data.loggediin"` will show for **unauthenticated** users, `ng-if="data.loggedin"` will show for **authenticated** users.
  
## HTML Template
```html
<!-- Example div -->
<div ng-if="!data.loggedin" class="card" onclick="location.href='https://some-link.com';"> 
  <p class="card-details">
    Sign into portal
  </p>
</div>
```         

## Client Script
```javascript
api.controller=function() {
  /* widget controller */
  var c = this;
};
```

## Server Script
```javascript
(function() {
    /* populate the 'data' object */
    /* e.g., data.table = $sp.getValue('table'); */

    data.loggedin = gs.isLoggedIn();
	
})();
```