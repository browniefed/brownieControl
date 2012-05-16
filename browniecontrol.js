/**
 *  brownieControl 0.1
 *  by @browniefed
 *
 *  Licensed under WTFPL

 *  HTML:	<div id="slider">
 *			</div>
 *
 *  CSS:	Provided in browniecontrol.css
 *
 *	Basic JS:     $('#slider').brownieControl();
 *
 *  Example: $('#slider').brownieControl({min : 10, max : 250}, function(val) {
 *                console.log(val);
 *			 });
 *
 */
(function ($, w, d) {
	$.fn.brownieControl = function (options, callback) {
		callback = (typeof options === 'function') ? options : callback;
		callback = (typeof callback === 'function') ? callback : function() {};
		options = (typeof options === 'function') ? {} : options;
		
		var o = $.extend({
				min : 0,
				max : 100,
				current : 10,
				bgColor : '#00AEFF'
			}, options),
			s = this,
			c = callback,
			bClass = 'browniecontrol',
			pClass = 'slide',
			oClass = 'overlayslide';
		o.current = (o.min > o.current) ? o.min : o.current;
		o.current = (o.current > o.max) ? o.max : o.current;
		return s.each(function () {
			var me = $(this).addClass(bClass),
				slide = me.html($('<div />', {'class' : pClass})).find('.' + pClass).css({'background' : o.bgColor, 'width' : (Math.ceil((+o.current / +o.max) * 100)) + '%'}),
				overlay = me.prepend($('<div />', {'class' : oClass}));
				
			overlay.on('mousedown', mouseDown);
			
			function mouseDown(e) {
				e.preventDefault();
				$(w).on('mousemove', mouseDrag);
				$(w).on('mouseup', mouseUp);
				mouseDrag(e);
			}
			
			function mouseDrag(e) {
				e.preventDefault();
				slide.css('width', setValue(e.clientX, me.offset().left, me.width()) + '%');
				return false;
			}
			
			function mouseUp(e) {
				$(w).off('mousemove');
				$(w).off('mouseup');
				slide.css('width', setValue(e.clientX, me.offset().left, me.width()) + '%');
			}
			
			function setValue(clientX, meOffset, meWidth) {
				var val = Math.ceil(((clientX - meOffset) / meWidth) * 100);
				val = (val > 100) ? 100 : val;
				val = (val < 0) ? 0 : val;
				!val ? callback.call(me, o.min) : callback.call(me, (Math.ceil(((val / 100) * (o.max - o.min))) + o.min));
				me.trigger('controlChange',val);
				return val;
			}
			
		});
	};
}(jQuery, window, document));