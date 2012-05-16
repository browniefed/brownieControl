# brownieControl
### A simple jQuery control slider


## Features
* Min / Maximum / Start Value
* Color Control

That's about it...

## Quickstart
To start using brownieControl just include the files, and create a container `div`.

Now that the 2 files are included all you need to do is call the `brownieControl` method, the options are optional 

```javascript
//  Vanilla install
$('#slider').brownieControl();

//  With Options
$('#slider').brownieControl({
    //  Options go here.
});

// With Options and Callback
$('#slider').brownieControl({
	// Options go here.
}, function(val) {
	console.log(this, val);
});

// With just Callback
$('#slider').brownieControl(function (val) {
	console.log(this, val);
});

// With events
$('#slider').brownieControl();
$('#slider').on('controlChange', function (val) {
	console.log(this, val);
});

```

## Options
It's also got a few options. Here are the defaults:

```javascript
{
	min: 0,
	max: 100,
	current: 10,
	bgColor: '#00AEFF'
}
```