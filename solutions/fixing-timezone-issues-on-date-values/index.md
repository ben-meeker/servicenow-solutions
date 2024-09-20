# Fixing Timezone Issues on Date Values

### Script

### Creator: [@ben-meeker](https://github.com/ben-meeker)

Sometimes when using a value from a GlideDate or GlideDateTime field, when using that value in a flow or other method of displaying, it will give the incorrect date. This is because ServiceNow does not automatically convert the time to the users local timezone, so for example, when a date is for `August 17th`, it will show an incorrect value of `August 18th` (changes depending on timezone).

## The Fix

This can be resolved by using GlideDateTime javascript function to get the local time. See example below.

#### Getting local time in date format
```javascript
// Returns UTC date
var gdt = new GlideDateTime(record.getValue('date'));
// Get date in local time
var localDate = gdt.getLocalDate().getByFormat("yyyy-MM-dd'T'HH:mm:ss");
```

#### Other useful functions
```javascript
// Get current date, e.g. 09-20-2024 12:13:47
var gdt = new GlideDateTime(time.Now());

// Get day, e.g. 20
var day = gdt.getDayOfMonthLocalTime();
// Get month, e.g. 09
var month = gdt.getMonthLocalTime();
// Get year, e.g. 2024
var year = gdt.getYearLocalTime();
// Get time, e.g. 12:13:47
var time = gdt.getLocalTime()
```