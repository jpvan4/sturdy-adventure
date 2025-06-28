
/*!
* Bootstrap v3.3.7 (http://getbootstrap.com)
* Copyright 2011-2016 Twitter, Inc.
* Licensed under the MIT license
*/
if (typeof jQuery === 'undefined') {
throw new Error('Bootstrap\'s JavaScript requires jQuery')
}
+function ($) {
'use strict';
var version = $.fn.jquery.split(' ')[0].split('.')
if ((version[0] < 2 && version[1] < 9) || (version[0] == 1 && version[1] ==
9 && version[2] < 1) || (version[0] > 3)) {
throw new Error('Bootstrap\'s JavaScript requires jQuery version 1.9.1 or
higher, but lower than version 4')
}
}(jQuery);
/*
========================================================================
* Bootstrap: transition.js v3.3.7
* http://getbootstrap.com/javascript/#transitions
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// CSS TRANSITION SUPPORT (Shoutout: http://www.modernizr.com/)
// ============================================================
function transitionEnd() {
var el = document.createElement('bootstrap')
var transEndEventNames = {
WebkitTransition : 'webkitTransitionEnd',
MozTransition : 'transitionend',
OTransition : 'oTransitionEnd otransitionend',
transition : 'transitionend'

}
for (var name in transEndEventNames) {
if (el.style[name] !== undefined) {
return { end: transEndEventNames[name] }
}
}
return false // explicit for ie8 ( ._.)
}
// http://blog.alexmaccaw.com/css-transitions
$.fn.emulateTransitionEnd = function (duration) {
var called = false
var $el = this
$(this).one('bsTransitionEnd', function () { called = true })
var callback = function () { if (!called)
$($el).trigger($.support.transition.end) }
setTimeout(callback, duration)
return this
}
$(function () {
$.support.transition = transitionEnd()
if (!$.support.transition) return
$.event.special.bsTransitionEnd = {
bindType: $.support.transition.end,
delegateType: $.support.transition.end,
handle: function (e) {
if ($(e.target).is(this)) return e.handleObj.handler.apply(this,
arguments)
}
}
})
}(jQuery);
/*
========================================================================
* Bootstrap: alert.js v3.3.7
* http://getbootstrap.com/javascript/#alerts
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)

*
========================================================================
*/

+function ($) {
'use strict';
// ALERT CLASS DEFINITION
// ======================
var dismiss = '[data-dismiss="alert"]'
var Alert = function (el) {
$(el).on('click', dismiss, this.close)
}
Alert.VERSION = '3.3.7'
Alert.TRANSITION_DURATION = 150
Alert.prototype.close = function (e) {
var $this = $(this)
var selector = $this.attr('data-target')
if (!selector) {
selector = $this.attr('href')
selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip
for ie7
}
var $parent = $(selector === '#' ? [] : selector)
if (e) e.preventDefault()
if (!$parent.length) {
$parent = $this.closest('.alert')
}
$parent.trigger(e = $.Event('close.bs.alert'))
if (e.isDefaultPrevented()) return
$parent.removeClass('in')
function removeElement() {
// detach from parent, fire event then clean up data
$parent.detach().trigger('closed.bs.alert').remove()
}

$.support.transition && $parent.hasClass('fade') ?
$parent
.one('bsTransitionEnd', removeElement)
.emulateTransitionEnd(Alert.TRANSITION_DURATION) :
removeElement()
}

// ALERT PLUGIN DEFINITION
// =======================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.alert')
if (!data) $this.data('bs.alert', (data = new Alert(this)))
if (typeof option == 'string') data[option].call($this)
})
}
var old = $.fn.alert
$.fn.alert = Plugin
$.fn.alert.Constructor = Alert

// ALERT NO CONFLICT
// =================
$.fn.alert.noConflict = function () {
$.fn.alert = old
return this
}

// ALERT DATA-API
// ==============
$(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)
}(jQuery);
/*
========================================================================
* Bootstrap: button.js v3.3.7
* http://getbootstrap.com/javascript/#buttons

*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// BUTTON PUBLIC CLASS DEFINITION
// ==============================
var Button = function (element, options) {
this.$element = $(element)
this.options = $.extend({}, Button.DEFAULTS, options)
this.isLoading = false
}
Button.VERSION = '3.3.7'
Button.DEFAULTS = {
loadingText: 'loading...'
}
Button.prototype.setState = function (state) {
var d = 'disabled'
var $el = this.$element
var val = $el.is('input') ? 'val' : 'html'
var data = $el.data()
state += 'Text'
if (data.resetText == null) $el.data('resetText', $el[val]())
// push to event loop to allow forms to submit
setTimeout($.proxy(function () {
$el[val](data[state] == null ? this.options[state] : data[state])
if (state == 'loadingText') {
this.isLoading = true
$el.addClass(d).attr(d, d).prop(d, true)
} else if (this.isLoading) {
this.isLoading = false
$el.removeClass(d).removeAttr(d).prop(d, false)

}
}, this), 0)
}
Button.prototype.toggle = function () {
var changed = true
var $parent = this.$element.closest('[data-toggle="buttons"]')
if ($parent.length) {
var $input = this.$element.find('input')
if ($input.prop('type') == 'radio') {
if ($input.prop('checked')) changed = false
$parent.find('.active').removeClass('active')
this.$element.addClass('active')
} else if ($input.prop('type') == 'checkbox') {
if (($input.prop('checked')) !== this.$element.hasClass('active'))
changed = false
this.$element.toggleClass('active')
}
$input.prop('checked', this.$element.hasClass('active'))
if (changed) $input.trigger('change')
} else {
this.$element.attr('aria-pressed',
!this.$element.hasClass('active'))
this.$element.toggleClass('active')
}
}

// BUTTON PLUGIN DEFINITION
// ========================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.button')
var options = typeof option == 'object' && option
if (!data) $this.data('bs.button', (data = new Button(this, options)))
if (option == 'toggle') data.toggle()
else if (option) data.setState(option)
})
}
var old = $.fn.button
$.fn.button = Plugin

$.fn.button.Constructor = Button

// BUTTON NO CONFLICT
// ==================
$.fn.button.noConflict = function () {
$.fn.button = old
return this
}

// BUTTON DATA-API
// ===============
$(document)
.on('click.bs.button.data-api', '[data-toggle^="button"]', function (e)
{
var $btn = $(e.target).closest('.btn')
Plugin.call($btn, 'toggle')
if (!($(e.target).is('input[type="radio"], input[type="checkbox"]')))
{
// Prevent double click on radios, and the double selections (so
cancellation) on checkboxes
e.preventDefault()
// The target component still receive the focus
if ($btn.is('input,button')) $btn.trigger('focus')
else
$btn.find('input:visible,button:visible').first().trigger('focus')
}
})
.on('focus.bs.button.data-api blur.bs.button.data-api',
'[data-toggle^="button"]', function (e) {
$(e.target).closest('.btn').toggleClass('focus',
/^focus(in)?$/.test(e.type))
})
}(jQuery);
/*
========================================================================
* Bootstrap: carousel.js v3.3.7
* http://getbootstrap.com/javascript/#carousel
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)

*
========================================================================
*/

+function ($) {
'use strict';
// CAROUSEL CLASS DEFINITION
// =========================
var Carousel = function (element, options) {
this.$element = $(element)
this.$indicators = this.$element.find('.carousel-indicators')
this.options = options
this.paused = null
this.sliding = null
this.interval = null
this.$active = null
this.$items = null
this.options.keyboard && this.$element.on('keydown.bs.carousel',
$.proxy(this.keydown, this))
this.options.pause == 'hover' && !('ontouchstart' in
document.documentElement) && this.$element
.on('mouseenter.bs.carousel', $.proxy(this.pause, this))
.on('mouseleave.bs.carousel', $.proxy(this.cycle, this))
}
Carousel.VERSION = '3.3.7'
Carousel.TRANSITION_DURATION = 600
Carousel.DEFAULTS = {
interval: 5000,
pause: 'hover',
wrap: true,
keyboard: true
}
Carousel.prototype.keydown = function (e) {
if (/input|textarea/i.test(e.target.tagName)) return
switch (e.which) {
case 37: this.prev(); break
case 39: this.next(); break
default: return
}

e.preventDefault()
}
Carousel.prototype.cycle = function (e) {
e || (this.paused = false)
this.interval && clearInterval(this.interval)
this.options.interval
&& !this.paused
&& (this.interval = setInterval($.proxy(this.next, this),
this.options.interval))
return this
}
Carousel.prototype.getItemIndex = function (item) {
this.$items = item.parent().children('.item')
return this.$items.index(item || this.$active)
}
Carousel.prototype.getItemForDirection = function (direction, active) {
var activeIndex = this.getItemIndex(active)
var willWrap = (direction == 'prev' && activeIndex === 0)
|| (direction == 'next' && activeIndex == (this.$items.length
- 1))
if (willWrap && !this.options.wrap) return active
var delta = direction == 'prev' ? -1 : 1
var itemIndex = (activeIndex + delta) % this.$items.length
return this.$items.eq(itemIndex)
}
Carousel.prototype.to = function (pos) {
var that = this
var activeIndex = this.getItemIndex(this.$active =
this.$element.find('.item.active'))
if (pos > (this.$items.length - 1) || pos < 0) return
if (this.sliding) return this.$element.one('slid.bs.carousel',
function () { that.to(pos) }) // yes, "slid"
if (activeIndex == pos) return this.pause().cycle()
return this.slide(pos > activeIndex ? 'next' : 'prev',
this.$items.eq(pos))
}

Carousel.prototype.pause = function (e) {
e || (this.paused = true)
if (this.$element.find('.next, .prev').length && $.support.transition) {
this.$element.trigger($.support.transition.end)
this.cycle(true)
}
this.interval = clearInterval(this.interval)
return this
}
Carousel.prototype.next = function () {
if (this.sliding) return
return this.slide('next')
}
Carousel.prototype.prev = function () {
if (this.sliding) return
return this.slide('prev')
}
Carousel.prototype.slide = function (type, next) {
var $active = this.$element.find('.item.active')
var $next = next || this.getItemForDirection(type, $active)
var isCycling = this.interval
var direction = type == 'next' ? 'left' : 'right'
var that = this
if ($next.hasClass('active')) return (this.sliding = false)
var relatedTarget = $next[0]
var slideEvent = $.Event('slide.bs.carousel', {
relatedTarget: relatedTarget,
direction: direction
})
this.$element.trigger(slideEvent)
if (slideEvent.isDefaultPrevented()) return
this.sliding = true
isCycling && this.pause()
if (this.$indicators.length) {
this.$indicators.find('.active').removeClass('active')
var $nextIndicator =
$(this.$indicators.children()[this.getItemIndex($next)])

$nextIndicator && $nextIndicator.addClass('active')
}
var slidEvent = $.Event('slid.bs.carousel', { relatedTarget:
relatedTarget, direction: direction }) // yes, "slid"
if ($.support.transition && this.$element.hasClass('slide')) {
$next.addClass(type)
$next[0].offsetWidth // force reflow
$active.addClass(direction)
$next.addClass(direction)
$active
.one('bsTransitionEnd', function () {
$next.removeClass([type, direction].join(' ')).addClass('active')
$active.removeClass(['active', direction].join(' '))
that.sliding = false
setTimeout(function () {
that.$element.trigger(slidEvent)
}, 0)
})
.emulateTransitionEnd(Carousel.TRANSITION_DURATION)
} else {
$active.removeClass('active')
$next.addClass('active')
this.sliding = false
this.$element.trigger(slidEvent)
}
isCycling && this.cycle()
return this
}

// CAROUSEL PLUGIN DEFINITION
// ==========================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.carousel')
var options = $.extend({}, Carousel.DEFAULTS, $this.data(), typeof
option == 'object' && option)
var action = typeof option == 'string' ? option : options.slide
if (!data) $this.data('bs.carousel', (data = new Carousel(this,
options)))
if (typeof option == 'number') data.to(option)
else if (action) data[action]()

else if (options.interval) data.pause().cycle()
})
}
var old = $.fn.carousel
$.fn.carousel = Plugin
$.fn.carousel.Constructor = Carousel

// CAROUSEL NO CONFLICT
// ====================
$.fn.carousel.noConflict = function () {
$.fn.carousel = old
return this
}

// CAROUSEL DATA-API
// =================
var clickHandler = function (e) {
var href
var $this = $(this)
var $target = $($this.attr('data-target') || (href = $this.attr('href'))
&& href.replace(/.*(?=#[^\s]+$)/, '')) // strip for ie7
if (!$target.hasClass('carousel')) return
var options = $.extend({}, $target.data(), $this.data())
var slideIndex = $this.attr('data-slide-to')
if (slideIndex) options.interval = false
Plugin.call($target, options)
if (slideIndex) {
$target.data('bs.carousel').to(slideIndex)
}
e.preventDefault()
}
$(document)
.on('click.bs.carousel.data-api', '[data-slide]', clickHandler)
.on('click.bs.carousel.data-api', '[data-slide-to]', clickHandler)
$(window).on('load', function () {
$('[data-ride="carousel"]').each(function () {
var $carousel = $(this)

Plugin.call($carousel, $carousel.data())
})
})
}(jQuery);
/*
========================================================================
* Bootstrap: collapse.js v3.3.7
* http://getbootstrap.com/javascript/#collapse
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/
/* jshint latedef: false */
+function ($) {
'use strict';
// COLLAPSE PUBLIC CLASS DEFINITION
// ================================
var Collapse = function (element, options) {
this.$element = $(element)
this.options = $.extend({}, Collapse.DEFAULTS, options)
this.$trigger = $('[data-toggle="collapse"][href="#' + element.id +
'"],' +
'[data-toggle="collapse"][data-target="#' +
element.id + '"]')
this.transitioning = null
if (this.options.parent) {
this.$parent = this.getParent()
} else {
this.addAriaAndCollapsedClass(this.$element, this.$trigger)
}
if (this.options.toggle) this.toggle()
}
Collapse.VERSION = '3.3.7'
Collapse.TRANSITION_DURATION = 350

Collapse.DEFAULTS = {
toggle: true
}
Collapse.prototype.dimension = function () {
var hasWidth = this.$element.hasClass('width')
return hasWidth ? 'width' : 'height'
}
Collapse.prototype.show = function () {
if (this.transitioning || this.$element.hasClass('in')) return
var activesData
var actives = this.$parent &&
this.$parent.children('.panel').children('.in, .collapsing')
if (actives && actives.length) {
activesData = actives.data('bs.collapse')
if (activesData && activesData.transitioning) return
}
var startEvent = $.Event('show.bs.collapse')
this.$element.trigger(startEvent)
if (startEvent.isDefaultPrevented()) return
if (actives && actives.length) {
Plugin.call(actives, 'hide')
activesData || actives.data('bs.collapse', null)
}
var dimension = this.dimension()
this.$element
.removeClass('collapse')
.addClass('collapsing')[dimension](0)
.attr('aria-expanded', true)
this.$trigger
.removeClass('collapsed')
.attr('aria-expanded', true)
this.transitioning = 1
var complete = function () {
this.$element
.removeClass('collapsing')
.addClass('collapse in')[dimension]('')

this.transitioning = 0
this.$element
.trigger('shown.bs.collapse')
}
if (!$.support.transition) return complete.call(this)
var scrollSize = $.camelCase(['scroll', dimension].join('-'))
this.$element
.one('bsTransitionEnd', $.proxy(complete, this))
.emulateTransitionEnd(Collapse.TRANSITION_DURATION)[dimension](this.$eleme
nt[0][scrollSize])
}
Collapse.prototype.hide = function () {
if (this.transitioning || !this.$element.hasClass('in')) return
var startEvent = $.Event('hide.bs.collapse')
this.$element.trigger(startEvent)
if (startEvent.isDefaultPrevented()) return
var dimension = this.dimension()
this.$element[dimension](this.$element[dimension]())[0].offsetHeight
this.$element
.addClass('collapsing')
.removeClass('collapse in')
.attr('aria-expanded', false)
this.$trigger
.addClass('collapsed')
.attr('aria-expanded', false)
this.transitioning = 1
var complete = function () {
this.transitioning = 0
this.$element
.removeClass('collapsing')
.addClass('collapse')
.trigger('hidden.bs.collapse')
}
if (!$.support.transition) return complete.call(this)

this.$element
[dimension](0)
.one('bsTransitionEnd', $.proxy(complete, this))
.emulateTransitionEnd(Collapse.TRANSITION_DURATION)
}
Collapse.prototype.toggle = function () {
this[this.$element.hasClass('in') ? 'hide' : 'show']()
}
Collapse.prototype.getParent = function () {
return $(this.options.parent)
.find('[data-toggle="collapse"][data-parent="' + this.options.parent
+ '"]')
.each($.proxy(function (i, element) {
var $element = $(element)
this.addAriaAndCollapsedClass(getTargetFromTrigger($element),
$element)
}, this))
.end()
}
Collapse.prototype.addAriaAndCollapsedClass = function ($element,
$trigger) {
var isOpen = $element.hasClass('in')
$element.attr('aria-expanded', isOpen)
$trigger
.toggleClass('collapsed', !isOpen)
.attr('aria-expanded', isOpen)
}
function getTargetFromTrigger($trigger) {
var href
var target = $trigger.attr('data-target')
|| (href = $trigger.attr('href')) && href.replace(/.*(?=#[^\s]+$)/, '')
// strip for ie7
return $(target)
}

// COLLAPSE PLUGIN DEFINITION
// ==========================
function Plugin(option) {
return this.each(function () {
var $this = $(this)

var data = $this.data('bs.collapse')
var options = $.extend({}, Collapse.DEFAULTS, $this.data(), typeof
option == 'object' && option)
if (!data && options.toggle && /show|hide/.test(option)) options.toggle
= false
if (!data) $this.data('bs.collapse', (data = new Collapse(this,
options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.collapse
$.fn.collapse = Plugin
$.fn.collapse.Constructor = Collapse

// COLLAPSE NO CONFLICT
// ====================
$.fn.collapse.noConflict = function () {
$.fn.collapse = old
return this
}

// COLLAPSE DATA-API
// =================
$(document).on('click.bs.collapse.data-api', '[data-toggle="collapse"]',
function (e) {
var $this = $(this)
if (!$this.attr('data-target')) e.preventDefault()
var $target = getTargetFromTrigger($this)
var data = $target.data('bs.collapse')
var option = data ? 'toggle' : $this.data()
Plugin.call($target, option)
})
}(jQuery);
/*
========================================================================
* Bootstrap: dropdown.js v3.3.7

* http://getbootstrap.com/javascript/#dropdowns
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// DROPDOWN CLASS DEFINITION
// =========================
var backdrop = '.dropdown-backdrop'
var toggle = '[data-toggle="dropdown"]'
var Dropdown = function (element) {
$(element).on('click.bs.dropdown', this.toggle)
}
Dropdown.VERSION = '3.3.7'
function getParent($this) {
var selector = $this.attr('data-target')
if (!selector) {
selector = $this.attr('href')
selector = selector && /#[A-Za-z]/.test(selector) &&
selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
}
var $parent = selector && $(selector)
return $parent && $parent.length ? $parent : $this.parent()
}
function clearMenus(e) {
if (e && e.which === 3) return
$(backdrop).remove()
$(toggle).each(function () {
var $this = $(this)
var $parent = getParent($this)
var relatedTarget = { relatedTarget: this }
if (!$parent.hasClass('open')) return

if (e && e.type == 'click' && /input|textarea/i.test(e.target.tagName)
&& $.contains($parent[0], e.target)) return
$parent.trigger(e = $.Event('hide.bs.dropdown', relatedTarget))
if (e.isDefaultPrevented()) return
$this.attr('aria-expanded', 'false')
$parent.removeClass('open').trigger($.Event('hidden.bs.dropdown',
relatedTarget))
})
}
Dropdown.prototype.toggle = function (e) {
var $this = $(this)
if ($this.is('.disabled, :disabled')) return
var $parent = getParent($this)
var isActive = $parent.hasClass('open')
clearMenus()
if (!isActive) {
if ('ontouchstart' in document.documentElement &&
!$parent.closest('.navbar-nav').length) {
// if mobile we use a backdrop because click events don't delegate
$(document.createElement('div'))
.addClass('dropdown-backdrop')
.insertAfter($(this))
.on('click', clearMenus)
}
var relatedTarget = { relatedTarget: this }
$parent.trigger(e = $.Event('show.bs.dropdown', relatedTarget))
if (e.isDefaultPrevented()) return
$this
.trigger('focus')
.attr('aria-expanded', 'true')
$parent
.toggleClass('open')
.trigger($.Event('shown.bs.dropdown', relatedTarget))
}

return false
}
Dropdown.prototype.keydown = function (e) {
if (!/(38|40|27|32)/.test(e.which) ||
/input|textarea/i.test(e.target.tagName)) return
var $this = $(this)
e.preventDefault()
e.stopPropagation()
if ($this.is('.disabled, :disabled')) return
var $parent = getParent($this)
var isActive = $parent.hasClass('open')
if (!isActive && e.which != 27 || isActive && e.which == 27) {
if (e.which == 27) $parent.find(toggle).trigger('focus')
return $this.trigger('click')
}
var desc = ' li:not(.disabled):visible a'
var $items = $parent.find('.dropdown-menu' + desc)
if (!$items.length) return
var index = $items.index(e.target)
if (e.which == 38 && index > 0) index-- // up
if (e.which == 40 && index < $items.length - 1) index++ // down
if (!~index) index = 0
$items.eq(index).trigger('focus')
}

// DROPDOWN PLUGIN DEFINITION
// ==========================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.dropdown')
if (!data) $this.data('bs.dropdown', (data = new Dropdown(this)))
if (typeof option == 'string') data[option].call($this)
})

}
var old = $.fn.dropdown
$.fn.dropdown = Plugin
$.fn.dropdown.Constructor = Dropdown

// DROPDOWN NO CONFLICT
// ====================
$.fn.dropdown.noConflict = function () {
$.fn.dropdown = old
return this
}

// APPLY TO STANDARD DROPDOWN ELEMENTS
// ===================================
$(document)
.on('click.bs.dropdown.data-api', clearMenus)
.on('click.bs.dropdown.data-api', '.dropdown form', function (e) {
e.stopPropagation() })
.on('click.bs.dropdown.data-api', toggle, Dropdown.prototype.toggle)
.on('keydown.bs.dropdown.data-api', toggle, Dropdown.prototype.keydown)
.on('keydown.bs.dropdown.data-api', '.dropdown-menu',
Dropdown.prototype.keydown)
}(jQuery);
/*
========================================================================
* Bootstrap: modal.js v3.3.7
* http://getbootstrap.com/javascript/#modals
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';

// MODAL CLASS DEFINITION
// ======================
var Modal = function (element, options) {
this.options = options
this.$body = $(document.body)
this.$element = $(element)
this.$dialog = this.$element.find('.modal-dialog')
this.$backdrop = null
this.isShown = null
this.originalBodyPad = null
this.scrollbarWidth = 0
this.ignoreBackdropClick = false
if (this.options.remote) {
this.$element
.find('.modal-content')
.load(this.options.remote, $.proxy(function () {
this.$element.trigger('loaded.bs.modal')
}, this))
}
}
Modal.VERSION = '3.3.7'
Modal.TRANSITION_DURATION = 300
Modal.BACKDROP_TRANSITION_DURATION = 150
Modal.DEFAULTS = {
backdrop: true,
keyboard: true,
show: true
}
Modal.prototype.toggle = function (_relatedTarget) {
return this.isShown ? this.hide() : this.show(_relatedTarget)
}
Modal.prototype.show = function (_relatedTarget) {
var that = this
var e = $.Event('show.bs.modal', { relatedTarget: _relatedTarget })
this.$element.trigger(e)
if (this.isShown || e.isDefaultPrevented()) return
this.isShown = true

this.checkScrollbar()
this.setScrollbar()
this.$body.addClass('modal-open')
this.escape()
this.resize()
this.$element.on('click.dismiss.bs.modal', '[data-dismiss="modal"]',
$.proxy(this.hide, this))
this.$dialog.on('mousedown.dismiss.bs.modal', function () {
that.$element.one('mouseup.dismiss.bs.modal', function (e) {
if ($(e.target).is(that.$element)) that.ignoreBackdropClick = true
})
})
this.backdrop(function () {
var transition = $.support.transition &&
that.$element.hasClass('fade')
if (!that.$element.parent().length) {
that.$element.appendTo(that.$body) // don't move modals dom position
}
that.$element
.show()
.scrollTop(0)
that.adjustDialog()
if (transition) {
that.$element[0].offsetWidth // force reflow
}
that.$element.addClass('in')
that.enforceFocus()
var e = $.Event('shown.bs.modal', { relatedTarget: _relatedTarget })
transition ?
that.$dialog // wait for modal to slide in
.one('bsTransitionEnd', function () {
that.$element.trigger('focus').trigger(e)
})
.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
that.$element.trigger('focus').trigger(e)
})

}
Modal.prototype.hide = function (e) {
if (e) e.preventDefault()
e = $.Event('hide.bs.modal')
this.$element.trigger(e)
if (!this.isShown || e.isDefaultPrevented()) return
this.isShown = false
this.escape()
this.resize()
$(document).off('focusin.bs.modal')
this.$element
.removeClass('in')
.off('click.dismiss.bs.modal')
.off('mouseup.dismiss.bs.modal')
this.$dialog.off('mousedown.dismiss.bs.modal')
$.support.transition && this.$element.hasClass('fade') ?
this.$element
.one('bsTransitionEnd', $.proxy(this.hideModal, this))
.emulateTransitionEnd(Modal.TRANSITION_DURATION) :
this.hideModal()
}
Modal.prototype.enforceFocus = function () {
$(document)
.off('focusin.bs.modal') // guard against infinite focus loop
.on('focusin.bs.modal', $.proxy(function (e) {
if (document !== e.target &&
this.$element[0] !== e.target &&
!this.$element.has(e.target).length) {
this.$element.trigger('focus')
}
}, this))
}
Modal.prototype.escape = function () {
if (this.isShown && this.options.keyboard) {
this.$element.on('keydown.dismiss.bs.modal', $.proxy(function (e) {
e.which == 27 && this.hide()

}, this))
} else if (!this.isShown) {
this.$element.off('keydown.dismiss.bs.modal')
}
}
Modal.prototype.resize = function () {
if (this.isShown) {
$(window).on('resize.bs.modal', $.proxy(this.handleUpdate, this))
} else {
$(window).off('resize.bs.modal')
}
}
Modal.prototype.hideModal = function () {
var that = this
this.$element.hide()
this.backdrop(function () {
that.$body.removeClass('modal-open')
that.resetAdjustments()
that.resetScrollbar()
that.$element.trigger('hidden.bs.modal')
})
}
Modal.prototype.removeBackdrop = function () {
this.$backdrop && this.$backdrop.remove()
this.$backdrop = null
}
Modal.prototype.backdrop = function (callback) {
var that = this
var animate = this.$element.hasClass('fade') ? 'fade' : ''
if (this.isShown && this.options.backdrop) {
var doAnimate = $.support.transition && animate
this.$backdrop = $(document.createElement('div'))
.addClass('modal-backdrop ' + animate)
.appendTo(this.$body)
this.$element.on('click.dismiss.bs.modal', $.proxy(function (e) {
if (this.ignoreBackdropClick) {
this.ignoreBackdropClick = false
return
}
if (e.target !== e.currentTarget) return
this.options.backdrop == 'static'

? this.$element[0].focus()
: this.hide()
}, this))
if (doAnimate) this.$backdrop[0].offsetWidth // force reflow
this.$backdrop.addClass('in')
if (!callback) return
doAnimate ?
this.$backdrop
.one('bsTransitionEnd', callback)
.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
callback()
} else if (!this.isShown && this.$backdrop) {
this.$backdrop.removeClass('in')
var callbackRemove = function () {
that.removeBackdrop()
callback && callback()
}
$.support.transition && this.$element.hasClass('fade') ?
this.$backdrop
.one('bsTransitionEnd', callbackRemove)
.emulateTransitionEnd(Modal.BACKDROP_TRANSITION_DURATION) :
callbackRemove()
} else if (callback) {
callback()
}
}
// these following methods are used to handle overflowing modals
Modal.prototype.handleUpdate = function () {
this.adjustDialog()
}
Modal.prototype.adjustDialog = function () {
var modalIsOverflowing = this.$element[0].scrollHeight >
document.documentElement.clientHeight
this.$element.css({
paddingLeft: !this.bodyIsOverflowing && modalIsOverflowing ?
this.scrollbarWidth : '',
paddingRight: this.bodyIsOverflowing && !modalIsOverflowing ?

this.scrollbarWidth : ''
})
}
Modal.prototype.resetAdjustments = function () {
this.$element.css({
paddingLeft: '',
paddingRight: ''
})
}
Modal.prototype.checkScrollbar = function () {
var fullWindowWidth = window.innerWidth
if (!fullWindowWidth) { // workaround for missing window.innerWidth in IE8
var documentElementRect =
document.documentElement.getBoundingClientRect()
fullWindowWidth = documentElementRect.right -
Math.abs(documentElementRect.left)
}
this.bodyIsOverflowing = document.body.clientWidth < fullWindowWidth
this.scrollbarWidth = this.measureScrollbar()
}
Modal.prototype.setScrollbar = function () {
var bodyPad = parseInt((this.$body.css('padding-right') || 0), 10)
this.originalBodyPad = document.body.style.paddingRight || ''
if (this.bodyIsOverflowing) this.$body.css('padding-right', bodyPad +
this.scrollbarWidth)
}
Modal.prototype.resetScrollbar = function () {
this.$body.css('padding-right', this.originalBodyPad)
}
Modal.prototype.measureScrollbar = function () { // thx walsh
var scrollDiv = document.createElement('div')
scrollDiv.className = 'modal-scrollbar-measure'
this.$body.append(scrollDiv)
var scrollbarWidth = scrollDiv.offsetWidth - scrollDiv.clientWidth
this.$body[0].removeChild(scrollDiv)
return scrollbarWidth
}

// MODAL PLUGIN DEFINITION
// =======================
function Plugin(option, _relatedTarget) {

return this.each(function () {
var $this = $(this)
var data = $this.data('bs.modal')
var options = $.extend({}, Modal.DEFAULTS, $this.data(), typeof option
== 'object' && option)
if (!data) $this.data('bs.modal', (data = new Modal(this, options)))
if (typeof option == 'string') data[option](_relatedTarget)
else if (options.show) data.show(_relatedTarget)
})
}
var old = $.fn.modal
$.fn.modal = Plugin
$.fn.modal.Constructor = Modal

// MODAL NO CONFLICT
// =================
$.fn.modal.noConflict = function () {
$.fn.modal = old
return this
}

// MODAL DATA-API
// ==============
$(document).on('click.bs.modal.data-api', '[data-toggle="modal"]',
function (e) {
var $this = $(this)
var href = $this.attr('href')
var $target = $($this.attr('data-target') || (href &&
href.replace(/.*(?=#[^\s]+$)/, ''))) // strip for ie7
var option = $target.data('bs.modal') ? 'toggle' : $.extend({ remote:
!/#/.test(href) && href }, $target.data(), $this.data())
if ($this.is('a')) e.preventDefault()
$target.one('show.bs.modal', function (showEvent) {
if (showEvent.isDefaultPrevented()) return // only register focus
restorer if modal will actually get shown
$target.one('hidden.bs.modal', function () {
$this.is(':visible') && $this.trigger('focus')
})
})

Plugin.call($target, option, this)
})
}(jQuery);
/*
========================================================================
* Bootstrap: tooltip.js v3.3.7
* http://getbootstrap.com/javascript/#tooltip
* Inspired by the original jQuery.tipsy by Jason Frame
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// TOOLTIP PUBLIC CLASS DEFINITION
// ===============================
var Tooltip = function (element, options) {
this.type = null
this.options = null
this.enabled = null
this.timeout = null
this.hoverState = null
this.$element = null
this.inState = null
this.init('tooltip', element, options)
}
Tooltip.VERSION = '3.3.7'
Tooltip.TRANSITION_DURATION = 150
Tooltip.DEFAULTS = {
animation: true,
placement: 'top',
selector: false,
template: '<div class="tooltip" role="tooltip"><div
class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',

trigger: 'hover focus',
title: '',
delay: 0,
html: false,
container: false,
viewport: {
selector: 'body',
padding: 0
}
}
Tooltip.prototype.init = function (type, element, options) {
this.enabled = true
this.type = type
this.$element = $(element)
this.options = this.getOptions(options)
this.$viewport = this.options.viewport &&
$($.isFunction(this.options.viewport) ? this.options.viewport.call(this,
this.$element) : (this.options.viewport.selector || this.options.viewport))
this.inState = { click: false, hover: false, focus: false }
if (this.$element[0] instanceof document.constructor &&
!this.options.selector) {
throw new Error('`selector` option must be specified when initializing
' + this.type + ' on the window.document object!')
}
var triggers = this.options.trigger.split(' ')
for (var i = triggers.length; i--;) {
var trigger = triggers[i]
if (trigger == 'click') {
this.$element.on('click.' + this.type, this.options.selector,
$.proxy(this.toggle, this))
} else if (trigger != 'manual') {
var eventIn = trigger == 'hover' ? 'mouseenter' : 'focusin'
var eventOut = trigger == 'hover' ? 'mouseleave' : 'focusout'
this.$element.on(eventIn + '.' + this.type, this.options.selector,
$.proxy(this.enter, this))
this.$element.on(eventOut + '.' + this.type, this.options.selector,
$.proxy(this.leave, this))
}
}
this.options.selector ?
(this._options = $.extend({}, this.options, { trigger: 'manual',

selector: '' })) :
this.fixTitle()
}
Tooltip.prototype.getDefaults = function () {
return Tooltip.DEFAULTS
}
Tooltip.prototype.getOptions = function (options) {
options = $.extend({}, this.getDefaults(), this.$element.data(),
options)
if (options.delay && typeof options.delay == 'number') {
options.delay = {
show: options.delay,
hide: options.delay
}
}
return options
}
Tooltip.prototype.getDelegateOptions = function () {
var options = {}
var defaults = this.getDefaults()
this._options && $.each(this._options, function (key, value) {
if (defaults[key] != value) options[key] = value
})
return options
}
Tooltip.prototype.enter = function (obj) {
var self = obj instanceof this.constructor ?
obj : $(obj.currentTarget).data('bs.' + this.type)
if (!self) {
self = new this.constructor(obj.currentTarget,
this.getDelegateOptions())
$(obj.currentTarget).data('bs.' + this.type, self)
}
if (obj instanceof $.Event) {
self.inState[obj.type == 'focusin' ? 'focus' : 'hover'] = true
}
if (self.tip().hasClass('in') || self.hoverState == 'in') {

self.hoverState = 'in'
return
}
clearTimeout(self.timeout)
self.hoverState = 'in'
if (!self.options.delay || !self.options.delay.show) return self.show()
self.timeout = setTimeout(function () {
if (self.hoverState == 'in') self.show()
}, self.options.delay.show)
}
Tooltip.prototype.isInStateTrue = function () {
for (var key in this.inState) {
if (this.inState[key]) return true
}
return false
}
Tooltip.prototype.leave = function (obj) {
var self = obj instanceof this.constructor ?
obj : $(obj.currentTarget).data('bs.' + this.type)
if (!self) {
self = new this.constructor(obj.currentTarget,
this.getDelegateOptions())
$(obj.currentTarget).data('bs.' + this.type, self)
}
if (obj instanceof $.Event) {
self.inState[obj.type == 'focusout' ? 'focus' : 'hover'] = false
}
if (self.isInStateTrue()) return
clearTimeout(self.timeout)
self.hoverState = 'out'
if (!self.options.delay || !self.options.delay.hide) return self.hide()
self.timeout = setTimeout(function () {
if (self.hoverState == 'out') self.hide()
}, self.options.delay.hide)

}
Tooltip.prototype.show = function () {
var e = $.Event('show.bs.' + this.type)
if (this.hasContent() && this.enabled) {
this.$element.trigger(e)
var inDom =
$.contains(this.$element[0].ownerDocument.documentElement,
this.$element[0])
if (e.isDefaultPrevented() || !inDom) return
var that = this
var $tip = this.tip()
var tipId = this.getUID(this.type)
this.setContent()
$tip.attr('id', tipId)
this.$element.attr('aria-describedby', tipId)
if (this.options.animation) $tip.addClass('fade')
var placement = typeof this.options.placement == 'function' ?
this.options.placement.call(this, $tip[0], this.$element[0]) :
this.options.placement
var autoToken = /\s?auto?\s?/i
var autoPlace = autoToken.test(placement)
if (autoPlace) placement = placement.replace(autoToken, '') || 'top'
$tip
.detach()
.css({ top: 0, left: 0, display: 'block' })
.addClass(placement)
.data('bs.' + this.type, this)
this.options.container ? $tip.appendTo(this.options.container) :
$tip.insertAfter(this.$element)
this.$element.trigger('inserted.bs.' + this.type)
var pos = this.getPosition()
var actualWidth = $tip[0].offsetWidth
var actualHeight = $tip[0].offsetHeight
if (autoPlace) {
var orgPlacement = placement

var viewportDim = this.getPosition(this.$viewport)
placement = placement == 'bottom' && pos.bottom + actualHeight >
viewportDim.bottom ? 'top' :
placement == 'top' && pos.top - actualHeight <
viewportDim.top ? 'bottom' :
placement == 'right' && pos.right + actualWidth >
viewportDim.width ? 'left' :
placement == 'left' && pos.left - actualWidth <
viewportDim.left ? 'right' :
placement
$tip
.removeClass(orgPlacement)
.addClass(placement)
}
var calculatedOffset = this.getCalculatedOffset(placement, pos,
actualWidth, actualHeight)
this.applyPlacement(calculatedOffset, placement)
var complete = function () {
var prevHoverState = that.hoverState
that.$element.trigger('shown.bs.' + that.type)
that.hoverState = null
if (prevHoverState == 'out') that.leave(that)
}
$.support.transition && this.$tip.hasClass('fade') ?
$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
complete()
}
}
Tooltip.prototype.applyPlacement = function (offset, placement) {
var $tip = this.tip()
var width = $tip[0].offsetWidth
var height = $tip[0].offsetHeight
// manually read margins because getBoundingClientRect includes
difference
var marginTop = parseInt($tip.css('margin-top'), 10)
var marginLeft = parseInt($tip.css('margin-left'), 10)

// we must check for NaN for ie 8/9
if (isNaN(marginTop)) marginTop = 0
if (isNaN(marginLeft)) marginLeft = 0
offset.top += marginTop
offset.left += marginLeft
// $.fn.offset doesn't round pixel values
// so we use setOffset directly with our own function B-0
$.offset.setOffset($tip[0], $.extend({
using: function (props) {
$tip.css({
top: Math.round(props.top),
left: Math.round(props.left)
})
}
}, offset), 0)
$tip.addClass('in')
// check to see if placing tip in new offset caused the tip to resize itself
var actualWidth = $tip[0].offsetWidth
var actualHeight = $tip[0].offsetHeight
if (placement == 'top' && actualHeight != height) {
offset.top = offset.top + height - actualHeight
}
var delta = this.getViewportAdjustedDelta(placement, offset,
actualWidth, actualHeight)
if (delta.left) offset.left += delta.left
else offset.top += delta.top
var isVertical = /top|bottom/.test(placement)
var arrowDelta = isVertical ? delta.left * 2 - width + actualWidth
: delta.top * 2 - height + actualHeight
var arrowOffsetPosition = isVertical ? 'offsetWidth' : 'offsetHeight'
$tip.offset(offset)
this.replaceArrow(arrowDelta, $tip[0][arrowOffsetPosition], isVertical)
}
Tooltip.prototype.replaceArrow = function (delta, dimension, isVertical) {
this.arrow()
.css(isVertical ? 'left' : 'top', 50 * (1 - delta / dimension) + '%')
.css(isVertical ? 'top' : 'left', '')
}

Tooltip.prototype.setContent = function () {
var $tip = this.tip()
var title = this.getTitle()
$tip.find('.tooltip-inner')[this.options.html ? 'html' : 'text'](title)
$tip.removeClass('fade in top bottom left right')
}
Tooltip.prototype.hide = function (callback) {
var that = this
var $tip = $(this.$tip)
var e = $.Event('hide.bs.' + this.type)
function complete() {
if (that.hoverState != 'in') $tip.detach()
if (that.$element) { // TODO: Check whether guarding this code with this
`if` is really necessary.
that.$element
.removeAttr('aria-describedby')
.trigger('hidden.bs.' + that.type)
}
callback && callback()
}
this.$element.trigger(e)
if (e.isDefaultPrevented()) return
$tip.removeClass('in')
$.support.transition && $tip.hasClass('fade') ?
$tip
.one('bsTransitionEnd', complete)
.emulateTransitionEnd(Tooltip.TRANSITION_DURATION) :
complete()
this.hoverState = null
return this
}
Tooltip.prototype.fixTitle = function () {
var $e = this.$element
if ($e.attr('title') || typeof $e.attr('data-original-title') !=
'string') {
$e.attr('data-original-title', $e.attr('title') || '').attr('title',
'')

}
}
Tooltip.prototype.hasContent = function () {
return this.getTitle()
}
Tooltip.prototype.getPosition = function ($element) {
$element = $element || this.$element
var el = $element[0]
var isBody = el.tagName == 'BODY'
var elRect = el.getBoundingClientRect()
if (elRect.width == null) {
// width and height are missing in IE8, so compute them manually; see
https://github.com/twbs/bootstrap/issues/14093
elRect = $.extend({}, elRect, { width: elRect.right - elRect.left,
height: elRect.bottom - elRect.top })
}
var isSvg = window.SVGElement && el instanceof window.SVGElement
// Avoid using $.offset() on SVGs since it gives incorrect results in jQuery
3.
// See https://github.com/twbs/bootstrap/issues/20280
var elOffset = isBody ? { top: 0, left: 0 } : (isSvg ? null :
$element.offset())
var scroll = { scroll: isBody ? document.documentElement.scrollTop ||
document.body.scrollTop : $element.scrollTop() }
var outerDims = isBody ? { width: $(window).width(), height:
$(window).height() } : null
return $.extend({}, elRect, scroll, outerDims, elOffset)
}
Tooltip.prototype.getCalculatedOffset = function (placement, pos,
actualWidth, actualHeight) {
return placement == 'bottom' ? { top: pos.top + pos.height, left:
pos.left + pos.width / 2 - actualWidth / 2 } :
placement == 'top' ? { top: pos.top - actualHeight, left:
pos.left + pos.width / 2 - actualWidth / 2 } :
placement == 'left' ? { top: pos.top + pos.height / 2 -
actualHeight / 2, left: pos.left - actualWidth } :
/* placement == 'right' */ { top: pos.top + pos.height / 2 -
actualHeight / 2, left: pos.left + pos.width }
}
Tooltip.prototype.getViewportAdjustedDelta = function (placement, pos,

actualWidth, actualHeight) {
var delta = { top: 0, left: 0 }
if (!this.$viewport) return delta
var viewportPadding = this.options.viewport &&
this.options.viewport.padding || 0
var viewportDimensions = this.getPosition(this.$viewport)
if (/right|left/.test(placement)) {
var topEdgeOffset = pos.top - viewportPadding -
viewportDimensions.scroll
var bottomEdgeOffset = pos.top + viewportPadding -
viewportDimensions.scroll + actualHeight
if (topEdgeOffset < viewportDimensions.top) { // top overflow
delta.top = viewportDimensions.top - topEdgeOffset
} else if (bottomEdgeOffset > viewportDimensions.top +
viewportDimensions.height) { // bottom overflow
delta.top = viewportDimensions.top + viewportDimensions.height -
bottomEdgeOffset
}
} else {
var leftEdgeOffset = pos.left - viewportPadding
var rightEdgeOffset = pos.left + viewportPadding + actualWidth
if (leftEdgeOffset < viewportDimensions.left) { // left overflow
delta.left = viewportDimensions.left - leftEdgeOffset
} else if (rightEdgeOffset > viewportDimensions.right) { // right
overflow
delta.left = viewportDimensions.left + viewportDimensions.width -
rightEdgeOffset
}
}
return delta
}
Tooltip.prototype.getTitle = function () {
var title
var $e = this.$element
var o = this.options
title = $e.attr('data-original-title')
|| (typeof o.title == 'function' ? o.title.call($e[0]) : o.title)
return title
}
Tooltip.prototype.getUID = function (prefix) {
do prefix += ~~(Math.random() * 1000000)

while (document.getElementById(prefix))
return prefix
}
Tooltip.prototype.tip = function () {
if (!this.$tip) {
this.$tip = $(this.options.template)
if (this.$tip.length != 1) {
throw new Error(this.type + ' `template` option must consist of exactly
1 top-level element!')
}
}
return this.$tip
}
Tooltip.prototype.arrow = function () {
return (this.$arrow = this.$arrow || this.tip().find('.tooltip-arrow'))
}
Tooltip.prototype.enable = function () {
this.enabled = true
}
Tooltip.prototype.disable = function () {
this.enabled = false
}
Tooltip.prototype.toggleEnabled = function () {
this.enabled = !this.enabled
}
Tooltip.prototype.toggle = function (e) {
var self = this
if (e) {
self = $(e.currentTarget).data('bs.' + this.type)
if (!self) {
self = new this.constructor(e.currentTarget,
this.getDelegateOptions())
$(e.currentTarget).data('bs.' + this.type, self)
}
}
if (e) {
self.inState.click = !self.inState.click
if (self.isInStateTrue()) self.enter(self)
else self.leave(self)
} else {
self.tip().hasClass('in') ? self.leave(self) : self.enter(self)

}
}
Tooltip.prototype.destroy = function () {
var that = this
clearTimeout(this.timeout)
this.hide(function () {
that.$element.off('.' + that.type).removeData('bs.' + that.type)
if (that.$tip) {
that.$tip.detach()
}
that.$tip = null
that.$arrow = null
that.$viewport = null
that.$element = null
})
}

// TOOLTIP PLUGIN DEFINITION
// =========================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.tooltip')
var options = typeof option == 'object' && option
if (!data && /destroy|hide/.test(option)) return
if (!data) $this.data('bs.tooltip', (data = new Tooltip(this,
options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.tooltip
$.fn.tooltip = Plugin
$.fn.tooltip.Constructor = Tooltip

// TOOLTIP NO CONFLICT
// ===================
$.fn.tooltip.noConflict = function () {
$.fn.tooltip = old
return this
}

}(jQuery);
/*
========================================================================
* Bootstrap: popover.js v3.3.7
* http://getbootstrap.com/javascript/#popovers
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// POPOVER PUBLIC CLASS DEFINITION
// ===============================
var Popover = function (element, options) {
this.init('popover', element, options)
}
if (!$.fn.tooltip) throw new Error('Popover requires tooltip.js')
Popover.VERSION = '3.3.7'
Popover.DEFAULTS = $.extend({}, $.fn.tooltip.Constructor.DEFAULTS, {
placement: 'right',
trigger: 'click',
content: '',
template: '<div class="popover" role="tooltip"><div
class="arrow"></div><h3 class="popover-title"></h3><div
class="popover-content"></div></div>'
})

// NOTE: POPOVER EXTENDS tooltip.js
// ================================
Popover.prototype = $.extend({}, $.fn.tooltip.Constructor.prototype)
Popover.prototype.constructor = Popover

Popover.prototype.getDefaults = function () {
return Popover.DEFAULTS
}
Popover.prototype.setContent = function () {
var $tip = this.tip()
var title = this.getTitle()
var content = this.getContent()
$tip.find('.popover-title')[this.options.html ? 'html' : 'text'](title)
$tip.find('.popover-content').children().detach().end()[ // we use
append for html objects to maintain js events
this.options.html ? (typeof content == 'string' ? 'html' : 'append') :
'text'
](content)
$tip.removeClass('fade top bottom left right in')
// IE8 doesn't accept hiding via the `:empty` pseudo selector, we have to
do
// this manually by checking the contents.
if (!$tip.find('.popover-title').html())
$tip.find('.popover-title').hide()
}
Popover.prototype.hasContent = function () {
return this.getTitle() || this.getContent()
}
Popover.prototype.getContent = function () {
var $e = this.$element
var o = this.options
return $e.attr('data-content')
|| (typeof o.content == 'function' ?
o.content.call($e[0]) :
o.content)
}
Popover.prototype.arrow = function () {
return (this.$arrow = this.$arrow || this.tip().find('.arrow'))
}

// POPOVER PLUGIN DEFINITION
// =========================
function Plugin(option) {

return this.each(function () {
var $this = $(this)
var data = $this.data('bs.popover')
var options = typeof option == 'object' && option
if (!data && /destroy|hide/.test(option)) return
if (!data) $this.data('bs.popover', (data = new Popover(this,
options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.popover
$.fn.popover = Plugin
$.fn.popover.Constructor = Popover

// POPOVER NO CONFLICT
// ===================
$.fn.popover.noConflict = function () {
$.fn.popover = old
return this
}
}(jQuery);
/*
========================================================================
* Bootstrap: scrollspy.js v3.3.7
* http://getbootstrap.com/javascript/#scrollspy
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// SCROLLSPY CLASS DEFINITION
// ==========================

function ScrollSpy(element, options) {
this.$body = $(document.body)
this.$scrollElement = $(element).is(document.body) ? $(window) :
$(element)
this.options = $.extend({}, ScrollSpy.DEFAULTS, options)
this.selector = (this.options.target || '') + ' .nav li > a'
this.offsets = []
this.targets = []
this.activeTarget = null
this.scrollHeight = 0
this.$scrollElement.on('scroll.bs.scrollspy', $.proxy(this.process,
this))
this.refresh()
this.process()
}
ScrollSpy.VERSION = '3.3.7'
ScrollSpy.DEFAULTS = {
offset: 10
}
ScrollSpy.prototype.getScrollHeight = function () {
return this.$scrollElement[0].scrollHeight ||
Math.max(this.$body[0].scrollHeight,
document.documentElement.scrollHeight)
}
ScrollSpy.prototype.refresh = function () {
var that = this
var offsetMethod = 'offset'
var offsetBase = 0
this.offsets = []
this.targets = []
this.scrollHeight = this.getScrollHeight()
if (!$.isWindow(this.$scrollElement[0])) {
offsetMethod = 'position'
offsetBase = this.$scrollElement.scrollTop()
}
this.$body
.find(this.selector)
.map(function () {
var $el = $(this)
var href = $el.data('target') || $el.attr('href')

var $href = /^#./.test(href) && $(href)
return ($href
&& $href.length
&& $href.is(':visible')
&& [[$href[offsetMethod]().top + offsetBase, href]]) || null
})
.sort(function (a, b) { return a[0] - b[0] })
.each(function () {
that.offsets.push(this[0])
that.targets.push(this[1])
})
}
ScrollSpy.prototype.process = function () {
var scrollTop = this.$scrollElement.scrollTop() + this.options.offset
var scrollHeight = this.getScrollHeight()
var maxScroll = this.options.offset + scrollHeight -
this.$scrollElement.height()
var offsets = this.offsets
var targets = this.targets
var activeTarget = this.activeTarget
var i
if (this.scrollHeight != scrollHeight) {
this.refresh()
}
if (scrollTop >= maxScroll) {
return activeTarget != (i = targets[targets.length - 1]) &&
this.activate(i)
}
if (activeTarget && scrollTop < offsets[0]) {
this.activeTarget = null
return this.clear()
}
for (i = offsets.length; i--;) {
activeTarget != targets[i]
&& scrollTop >= offsets[i]
&& (offsets[i + 1] === undefined || scrollTop < offsets[i + 1])
&& this.activate(targets[i])
}
}
ScrollSpy.prototype.activate = function (target) {
this.activeTarget = target

this.clear()
var selector = this.selector +
'[data-target="' + target + '"],' +
this.selector + '[href="' + target + '"]'
var active = $(selector)
.parents('li')
.addClass('active')
if (active.parent('.dropdown-menu').length) {
active = active
.closest('li.dropdown')
.addClass('active')
}
active.trigger('activate.bs.scrollspy')
}
ScrollSpy.prototype.clear = function () {
$(this.selector)
.parentsUntil(this.options.target, '.active')
.removeClass('active')
}

// SCROLLSPY PLUGIN DEFINITION
// ===========================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.scrollspy')
var options = typeof option == 'object' && option
if (!data) $this.data('bs.scrollspy', (data = new ScrollSpy(this,
options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.scrollspy
$.fn.scrollspy = Plugin
$.fn.scrollspy.Constructor = ScrollSpy

// SCROLLSPY NO CONFLICT
// =====================
$.fn.scrollspy.noConflict = function () {
$.fn.scrollspy = old
return this
}

// SCROLLSPY DATA-API
// ==================
$(window).on('load.bs.scrollspy.data-api', function () {
$('[data-spy="scroll"]').each(function () {
var $spy = $(this)
Plugin.call($spy, $spy.data())
})
})
}(jQuery);
/*
========================================================================
* Bootstrap: tab.js v3.3.7
* http://getbootstrap.com/javascript/#tabs
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.
* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// TAB CLASS DEFINITION
// ====================
var Tab = function (element) {
// jscs:disable requireDollarBeforejQueryAssignment
this.element = $(element)
// jscs:enable requireDollarBeforejQueryAssignment
}
Tab.VERSION = '3.3.7'

Tab.TRANSITION_DURATION = 150
Tab.prototype.show = function () {
var $this = this.element
var $ul = $this.closest('ul:not(.dropdown-menu)')
var selector = $this.data('target')
if (!selector) {
selector = $this.attr('href')
selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip
for ie7
}
if ($this.parent('li').hasClass('active')) return
var $previous = $ul.find('.active:last a')
var hideEvent = $.Event('hide.bs.tab', {
relatedTarget: $this[0]
})
var showEvent = $.Event('show.bs.tab', {
relatedTarget: $previous[0]
})
$previous.trigger(hideEvent)
$this.trigger(showEvent)
if (showEvent.isDefaultPrevented() || hideEvent.isDefaultPrevented())
return
var $target = $(selector)
this.activate($this.closest('li'), $ul)
this.activate($target, $target.parent(), function () {
$previous.trigger({
type: 'hidden.bs.tab',
relatedTarget: $this[0]
})
$this.trigger({
type: 'shown.bs.tab',
relatedTarget: $previous[0]
})
})
}
Tab.prototype.activate = function (element, container, callback) {
var $active = container.find('> .active')
var transition = callback

&& $.support.transition
&& ($active.length && $active.hasClass('fade') || !!container.find('>
.fade').length)
function next() {
$active
.removeClass('active')
.find('> .dropdown-menu > .active')
.removeClass('active')
.end()
.find('[data-toggle="tab"]')
.attr('aria-expanded', false)
element
.addClass('active')
.find('[data-toggle="tab"]')
.attr('aria-expanded', true)
if (transition) {
element[0].offsetWidth // reflow for transition
element.addClass('in')
} else {
element.removeClass('fade')
}
if (element.parent('.dropdown-menu').length) {
element
.closest('li.dropdown')
.addClass('active')
.end()
.find('[data-toggle="tab"]')
.attr('aria-expanded', true)
}
callback && callback()
}
$active.length && transition ?
$active
.one('bsTransitionEnd', next)
.emulateTransitionEnd(Tab.TRANSITION_DURATION) :
next()
$active.removeClass('in')
}

// TAB PLUGIN DEFINITION

// =====================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.tab')
if (!data) $this.data('bs.tab', (data = new Tab(this)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.tab
$.fn.tab = Plugin
$.fn.tab.Constructor = Tab

// TAB NO CONFLICT
// ===============
$.fn.tab.noConflict = function () {
$.fn.tab = old
return this
}

// TAB DATA-API
// ============
var clickHandler = function (e) {
e.preventDefault()
Plugin.call($(this), 'show')
}
$(document)
.on('click.bs.tab.data-api', '[data-toggle="tab"]', clickHandler)
.on('click.bs.tab.data-api', '[data-toggle="pill"]', clickHandler)
}(jQuery);
/*
========================================================================
* Bootstrap: affix.js v3.3.7
* http://getbootstrap.com/javascript/#affix
*
========================================================================
* Copyright 2011-2016 Twitter, Inc.

* Licensed under MIT
(https://github.com/twbs/bootstrap/blob/master/LICENSE)
*
========================================================================
*/

+function ($) {
'use strict';
// AFFIX CLASS DEFINITION
// ======================
var Affix = function (element, options) {
this.options = $.extend({}, Affix.DEFAULTS, options)
this.$target = $(this.options.target)
.on('scroll.bs.affix.data-api', $.proxy(this.checkPosition, this))
.on('click.bs.affix.data-api',
$.proxy(this.checkPositionWithEventLoop, this))
this.$element = $(element)
this.affixed = null
this.unpin = null
this.pinnedOffset = null
this.checkPosition()
}
Affix.VERSION = '3.3.7'
Affix.RESET = 'affix affix-top affix-bottom'
Affix.DEFAULTS = {
offset: 0,
target: window
}
Affix.prototype.getState = function (scrollHeight, height, offsetTop,
offsetBottom) {
var scrollTop = this.$target.scrollTop()
var position = this.$element.offset()
var targetHeight = this.$target.height()
if (offsetTop != null && this.affixed == 'top') return scrollTop <
offsetTop ? 'top' : false
if (this.affixed == 'bottom') {

if (offsetTop != null) return (scrollTop + this.unpin <= position.top)
? false : 'bottom'
return (scrollTop + targetHeight <= scrollHeight - offsetBottom) ? false
: 'bottom'
}
var initializing = this.affixed == null
var colliderTop = initializing ? scrollTop : position.top
var colliderHeight = initializing ? targetHeight : height
if (offsetTop != null && scrollTop <= offsetTop) return 'top'
if (offsetBottom != null && (colliderTop + colliderHeight >= scrollHeight
- offsetBottom)) return 'bottom'
return false
}
Affix.prototype.getPinnedOffset = function () {
if (this.pinnedOffset) return this.pinnedOffset
this.$element.removeClass(Affix.RESET).addClass('affix')
var scrollTop = this.$target.scrollTop()
var position = this.$element.offset()
return (this.pinnedOffset = position.top - scrollTop)
}
Affix.prototype.checkPositionWithEventLoop = function () {
setTimeout($.proxy(this.checkPosition, this), 1)
}
Affix.prototype.checkPosition = function () {
if (!this.$element.is(':visible')) return
var height = this.$element.height()
var offset = this.options.offset
var offsetTop = offset.top
var offsetBottom = offset.bottom
var scrollHeight = Math.max($(document).height(),
$(document.body).height())
if (typeof offset != 'object') offsetBottom = offsetTop = offset
if (typeof offsetTop == 'function') offsetTop =
offset.top(this.$element)
if (typeof offsetBottom == 'function') offsetBottom =
offset.bottom(this.$element)
var affix = this.getState(scrollHeight, height, offsetTop, offsetBottom)
if (this.affixed != affix) {

if (this.unpin != null) this.$element.css('top', '')
var affixType = 'affix' + (affix ? '-' + affix : '')
var e = $.Event(affixType + '.bs.affix')
this.$element.trigger(e)
if (e.isDefaultPrevented()) return
this.affixed = affix
this.unpin = affix == 'bottom' ? this.getPinnedOffset() : null
this.$element
.removeClass(Affix.RESET)
.addClass(affixType)
.trigger(affixType.replace('affix', 'affixed') + '.bs.affix')
}
if (affix == 'bottom') {
this.$element.offset({
top: scrollHeight - height - offsetBottom
})
}
}

// AFFIX PLUGIN DEFINITION
// =======================
function Plugin(option) {
return this.each(function () {
var $this = $(this)
var data = $this.data('bs.affix')
var options = typeof option == 'object' && option
if (!data) $this.data('bs.affix', (data = new Affix(this, options)))
if (typeof option == 'string') data[option]()
})
}
var old = $.fn.affix
$.fn.affix = Plugin
$.fn.affix.Constructor = Affix

// AFFIX NO CONFLICT
// =================

$.fn.affix.noConflict = function () {
$.fn.affix = old
return this
}

// AFFIX DATA-API
// ==============
$(window).on('load', function () {
$('[data-spy="affix"]').each(function () {
var $spy = $(this)
var data = $spy.data()
data.offset = data.offset || {}
if (data.offsetBottom != null) data.offset.bottom = data.offsetBottom
if (data.offsetTop != null) data.offset.top = data.offsetTop
Plugin.call($spy, data)
})
})
}(jQuery);

bitcoinjs.bitcoin.networks.shadow = {
messagePrefix: 'unused',
bip32: {
public: 0xEE80286A,
private: 0xEE8031E8
},
pubKeyHash: 0x3f,
scriptHash: 0x7d,
wif: 0xbf
};
bitcoinjs.bitcoin.networks.shadowtn = {
messagePrefix: 'unused',
bip32: {
public: 0x76C0FDFB,
private: 0x76C1077A
},
pubKeyHash: 0x7f,
scriptHash: 0xc4,
wif: 0xff
};
bitcoinjs.bitcoin.networks.clam = {
messagePrefix: 'unused',
bip32: {
public: 0xa8c26d64,
private: 0xa8c17826
},
pubKeyHash: 0x89,
scriptHash: 0x00, // TODO set this correctly
wif: 0x85
};
bitcoinjs.bitcoin.networks.crown = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x00,
scriptHash: 0x05,
wif: 0x80
};
bitcoinjs.bitcoin.networks.dash = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,

private: 0x0488ade4
},
pubKeyHash: 0x4c,
scriptHash: 0x10,
wif: 0xcc
};
bitcoinjs.bitcoin.networks.maza = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x32,
scriptHash: 0x09,
wif: 0xe0
};
bitcoinjs.bitcoin.networks.dashtn = {
messagePrefix: 'unused',
bip32: {
public: 0x043587cf,
private: 0x04358394
},
pubKeyHash: 0x8c,
scriptHash: 0x13,
wif: 0xef
};
bitcoinjs.bitcoin.networks.game = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x26,
scriptHash: 0x05,
wif: 0xa6
};
bitcoinjs.bitcoin.networks.namecoin = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x34,
scriptHash: 0x00, // TODO set this correctly

wif: 0x80
};
bitcoinjs.bitcoin.networks.peercoin = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x37,
scriptHash: 0x00, // TODO set this correctly
wif: 0xb7
};
bitcoinjs.bitcoin.networks.axe = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x37,
scriptHash: 0x10, // TODO set this correctly
wif: 0xcc
};
bitcoinjs.bitcoin.networks.slimcoin = {
messagePrefix: 'unused',
bip32: {
public: 0xef6adf10,
private: 0xef69ea80
},
pubKeyHash: 0x3f,
scriptHash: 0x7d,
wif: 0x46
};
bitcoinjs.bitcoin.networks.slimcointn = {
messagePrefix: 'unused',
bip32: {
public: 0x043587CF,
private: 0x04358394
},
pubKeyHash: 0x6f,
scriptHash: 0xc4,
wif: 0x57
};
bitcoinjs.bitcoin.networks.dogecoin = {

messagePrefix: '\x19Dogecoin Signed Message:\n',
bip32: {
public: 0x02facafd,
private: 0x02fac398
},
pubKeyHash: 0x1e,
scriptHash: 0x16,
wif: 0x9e
};
bitcoinjs.bitcoin.networks.denarius = {
messagePrefix: '\x19Denarius Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x1e,
scriptHash: 0x5a,
wif: 0x9e
};
bitcoinjs.bitcoin.networks.neblio = {
messagePrefix: '\x18Neblio Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x35,
scriptHash: 0x70,
wif: 0xb5
};
bitcoinjs.bitcoin.networks.viacoin = {
messagePrefix: '\x18Viacoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x47,
scriptHash: 0x21,
wif: 0xc7
};
bitcoinjs.bitcoin.networks.viacointestnet = {
messagePrefix: '\x18Viacoin Signed Message:\n',
bip32: {
public: 0x043587cf,
private: 0x04358394

},
pubKeyHash: 0x7f,
scriptHash: 0xc4,
wif: 0xff
};
bitcoinjs.bitcoin.networks.gamerscoin = {
messagePrefix: '\x19Gamerscoin Signed Message:\n',
bip32: {
public: 0x019da462,
private: 0x019d9cfe
},
pubKeyHash: 0x26,
scriptHash: 0x05,
wif: 0xA6
};
bitcoinjs.bitcoin.networks.jumbucks = {
messagePrefix: '\x19Jumbucks Signed Message:\n',
bip32: {
public: 0x037a689a,
private: 0x037a6460
},
pubKeyHash: 0x2b,
scriptHash: 0x05,
wif: 0xab
};
bitcoinjs.bitcoin.networks.zetacoin = {
messagePrefix: '\x18Zetacoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x50,
scriptHash: 0x09,
wif: 0xe0
};
bitcoinjs.bitcoin.networks.myriadcoin = {
messagePrefix: 'unused',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x32,
scriptHash: 0x00, // TODO set this correctly
wif: 0xb2

};

bitcoinjs.bitcoin.networks.onixcoin = {
messagePrefix: 'unused',
bip32: {
public: 0x049d7cb2,
private: 0x049d7878
},
pubKeyHash: 0x4B,
scriptHash: 0x05,
wif: 0x80
};
bitcoinjs.bitcoin.networks.pivx = {
messagePrefix: 'unused',
bip32: {
public: 0x022d2533,
private: 0x0221312b
},
pubKeyHash: 0x1e,
scriptHash: 0x0d,
wif: 0xd4
};
bitcoinjs.bitcoin.networks.pivxtestnet = {
messagePrefix: 'unused',
bip32: {
public: 0x3a8061a0,
private: 0x3a805837
},
pubKeyHash: 0x8b,
scriptHash: 0x13,
wif: 0xef
};
bitcoinjs.bitcoin.networks.fujicoin = {
messagePrefix: '\x19FujiCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x24,
scriptHash: 0x10,
wif: 0xa4
};
bitcoinjs.bitcoin.networks.nubits = {

messagePrefix: '\x18Nu Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x19,
scriptHash: 0x1a,
wif: 0x96,
};
bitcoinjs.bitcoin.networks.bgold = {
messagePrefix: '\x1DBitcoin Gold Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 38,
scriptHash: 23,
wif: 128
};
bitcoinjs.bitcoin.networks.monacoin = {
messagePrefix: '\x18Monacoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x32,
scriptHash: 0x37,
wif: 0xb0
};
bitcoinjs.bitcoin.networks.litecoinXprv = {
messagePrefix: '\x19Litecoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x30,
scriptHash: 0x32,
wif: 0xb0
};
bitcoinjs.bitcoin.networks.komodo = {
messagePrefix: '\x18Komodo Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4

},
pubKeyHash: 0x3c,
scriptHash: 0x55,
wif: 0xbc
};
bitcoinjs.bitcoin.networks.blackcoin = {
messagePrefix: '\x18BlackCoin Signed Message:\n',
bip32: {
public: 0x02CFBEDE,
private: 0x02CFBF60
},
pubKeyHash: 0x19,
scriptHash: 0x55,
wif: 0x99
};
bitcoinjs.bitcoin.networks.beetlecoin = {
messagePrefix: '\x19Beetlecoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x1A,
scriptHash: 0x55,
wif: 0x99,
};

bitcoinjs.bitcoin.networks.adcoin = {
messagePrefix: '\x18AdCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x17,
scriptHash: 0x05,
wif: 0xb0,
};
bitcoinjs.bitcoin.networks.asiacoin = {
messagePrefix: '\x18AsiaCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x17,
scriptHash: 0x08,

wif: 0x97,
};
bitcoinjs.bitcoin.networks.auroracoin = {
messagePrefix: '\x18AuroraCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x17,
scriptHash: 0x05,
wif: 0x97,
};
bitcoinjs.bitcoin.networks.bata = {
messagePrefix: '\x18Bata Signed Message:\n',
bip32: {
public: 0xA40C86FA,
private: 0xA40B91BD,
},
pubKeyHash: 0x19,
scriptHash: 0x05,
wif: 0xa4,
};
bitcoinjs.bitcoin.networks.belacoin = {
messagePrefix: '\x18BelaCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x19,
scriptHash: 0x05,
wif: 0x99,
};
bitcoinjs.bitcoin.networks.atom = {
messagePrefix: '\x18Bitcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x17,
scriptHash: 0x0a,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.bitcoinplus = {

messagePrefix: '\x18BitcoinPlus Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x19,
scriptHash: 0x08,
wif: 0x99,
};
bitcoinjs.bitcoin.networks.bitcloud = {
messagePrefix: '\x18BitCloud Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x19,
scriptHash: 0x05,
wif: 0x99,
};
bitcoinjs.bitcoin.networks.bitcore = {
messagePrefix: '\x18BitCore Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x03,
scriptHash: 0x7D,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.bitsend = {
messagePrefix: '\x18Bitsend Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x66,
scriptHash: 0x05,
wif: 0xcc,
};
bitcoinjs.bitcoin.networks.britcoin = {
messagePrefix: '\x18BritCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,

},
pubKeyHash: 0x19,
scriptHash: 0x55,
wif: 0x99,
};
bitcoinjs.bitcoin.networks.canadaecoin = {
messagePrefix: '\x18Canada eCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x1c,
scriptHash: 0x05,
wif: 0x9c,
};
bitcoinjs.bitcoin.networks.cannacoin = {
messagePrefix: '\x18Cannacoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x1c,
scriptHash: 0x05,
wif: 0x9c,
};
bitcoinjs.bitcoin.networks.cryptoescudo = {
messagePrefix: '\x18Cryptoescudo Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x1c,
scriptHash: 0x05,
wif: 0x9c,
};
bitcoinjs.bitcoin.networks.clubcoin = {
messagePrefix: '\x18ClubCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1c,
scriptHash: 0x55,
wif: 0x99,

};
bitcoinjs.bitcoin.networks.compcoin = {
messagePrefix: '\x18CompCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x1c,
scriptHash: 0x55,
wif: 0x9c,
};
bitcoinjs.bitcoin.networks.crave = {
messagePrefix: '\x18DarkNet Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x46,
scriptHash: 0x55,
wif: 0x99,
};
bitcoinjs.bitcoin.networks.defcoin = {
messagePrefix: '\x18defcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x1e,
scriptHash: 0x05,
wif: 0x9e,
};
bitcoinjs.bitcoin.networks.diamond = {
messagePrefix: '\x18Diamond Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x5a,
scriptHash: 0x08,
wif: 0xda,
};
bitcoinjs.bitcoin.networks.digibyte = {
messagePrefix: '\x18DigiByte Signed Message:\n',

bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1e,
scriptHash: 0x05,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.digitalcoin = {
messagePrefix: '\x18Digitalcoin Signed Message:\n',
bip32: {
public: 0x9e0488B2,
private: 0x0488ADE4,
},
pubKeyHash: 0x1e,
scriptHash: 0x05,
wif: 0x9e,
};
bitcoinjs.bitcoin.networks.ecoin = {
messagePrefix: '\x18eCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x5c,
scriptHash: 0x14,
wif: 0xdc,
};
bitcoinjs.bitcoin.networks.edrcoin = {
messagePrefix: '\x18EDRcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x5d,
scriptHash: 0x1c,
wif: 0xdd,
};
bitcoinjs.bitcoin.networks.egulden = {
messagePrefix: '\x18Egulden Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},

pubKeyHash: 0x30,
scriptHash: 0x05,
wif: 0xb0,
};
bitcoinjs.bitcoin.networks.einsteinium = {
messagePrefix: '\x18Einsteinium Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x21,
scriptHash: 0x05,
wif: 0xa1,
};
bitcoinjs.bitcoin.networks.europecoin = {
messagePrefix: '\x18Bitcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x21,
scriptHash: 0x05,
wif: 0xa8,
};
bitcoinjs.bitcoin.networks.exclusivecoin = {
messagePrefix: '\x18ExclusiveCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x21,
scriptHash: 0x89,
wif: 0xa1,
};
bitcoinjs.bitcoin.networks.feathercoin = {
messagePrefix: '\x18Feathercoin Signed Message:\n',
bip32: {
public: 0x0488BC26,
private: 0x0488DAEE,
},
pubKeyHash: 0x0e,
scriptHash: 0x05,
wif: 0x8e,
};

bitcoinjs.bitcoin.networks.firstcoin = {
messagePrefix: '\x18FirstCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x23,
scriptHash: 0x05,
wif: 0xa3,
};
bitcoinjs.bitcoin.networks.flashcoin = {
messagePrefix: '\x18Flashcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x44,
scriptHash: 0x82,
wif: 0xc4,
};
bitcoinjs.bitcoin.networks.gcr = {
messagePrefix: '\x18GCR Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x26,
scriptHash: 0x61,
wif: 0x9a,
};
bitcoinjs.bitcoin.networks.gobyte = {
messagePrefix: '\x18DarkCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x26,
scriptHash: 0x0a,
wif: 0xc6,
};
bitcoinjs.bitcoin.networks.gridcoin = {
messagePrefix: '\x18Gridcoin Signed Message:\n',
bip32: {

public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x3e,
scriptHash: 0x55,
wif: 0xbe,
};
bitcoinjs.bitcoin.networks.gulden = {
messagePrefix: '\x18Guldencoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x26,
scriptHash: 0x62,
wif: 0x62,
};
bitcoinjs.bitcoin.networks.helleniccoin = {
messagePrefix: '\x18helleniccoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x30,
scriptHash: 0x05,
wif: 0xb0,
};
bitcoinjs.bitcoin.networks.hempcoin = {
messagePrefix: '\x18Hempcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x28,
scriptHash: 0x08,
wif: 0xa8,
};
bitcoinjs.bitcoin.networks.insane = {
messagePrefix: '\x18INSaNe Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x66,

scriptHash: 0x39,
wif: 0x37,
};
bitcoinjs.bitcoin.networks.iop = {
messagePrefix: '\x18IoP Signed Message:\n',
bip32: {
public: 0x2780915F,
private: 0xAE3416F6,
},
pubKeyHash: 0x75,
scriptHash: 0xae,
wif: 0x31,
};
bitcoinjs.bitcoin.networks.ixcoin = {
messagePrefix: '\x18Ixcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x8a,
scriptHash: 0x05,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.kobocoin = {
messagePrefix: '\x18Kobocoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x23,
scriptHash: 0x1c,
wif: 0xa3,
};
bitcoinjs.bitcoin.networks.landcoin = {
messagePrefix: '\x18Landcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x30,
scriptHash: 0x7a,
wif: 0xb0,
};

bitcoinjs.bitcoin.networks.lbry = {
messagePrefix: '\x18LBRYcrd Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x55,
scriptHash: 0x7a,
wif: 0x1c,
};
bitcoinjs.bitcoin.networks.linx = {
messagePrefix: '\x18LinX Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x4b,
scriptHash: 0x05,
wif: 0xcb,
};
bitcoinjs.bitcoin.networks.litecoincash = {
messagePrefix: '\x18Litecoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1c,
scriptHash: 0x05,
wif: 0xb0,
};
bitcoinjs.bitcoin.networks.lynx = {
messagePrefix: '\x18Lynx Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x2d,
scriptHash: 0x32,
wif: 0xad,
};
bitcoinjs.bitcoin.networks.megacoin = {
messagePrefix: '\x18Megacoin Signed Message:\n',
bip32: {
public: 0x0488B21E,

private: 0x0488ADE4,
},
pubKeyHash: 0x32,
scriptHash: 0x05,
wif: 0xB2,
};
bitcoinjs.bitcoin.networks.minexcoin = {
messagePrefix: '\x18Bitcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x4b,
scriptHash: 0x05,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.navcoin = {
messagePrefix: '\x18Navcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x35,
scriptHash: 0x55,
wif: 0x96,
};
bitcoinjs.bitcoin.networks.neoscoin = {
messagePrefix: '\x18NeosCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x35,
scriptHash: 0x05,
wif: 0xb1,
};
bitcoinjs.bitcoin.networks.neurocoin = {
messagePrefix: '\x18PPCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x35,
scriptHash: 0x75,

wif: 0xb5,
};
bitcoinjs.bitcoin.networks.newyorkc = {
messagePrefix: '\x18newyorkc Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x3c,
scriptHash: 0x16,
wif: 0xbc,
};
bitcoinjs.bitcoin.networks.novacoin = {
messagePrefix: '\x18NovaCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x08,
scriptHash: 0x14,
wif: 0x88,
};
bitcoinjs.bitcoin.networks.nushares = {
messagePrefix: '\x18Nu Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x3f,
scriptHash: 0x40,
wif: 0x95,
};
bitcoinjs.bitcoin.networks.okcash = {
messagePrefix: '\x18OKCash Signed Message:\n',
bip32: {
public: 0x03CC23D7,
private: 0x03CC1C73,
},
pubKeyHash: 0x37,
scriptHash: 0x1c,
wif: 0x03,
};
bitcoinjs.bitcoin.networks.omnicore = {

messagePrefix: '\x18Bitcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x00,
scriptHash: 0x05,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.pesobit = {
messagePrefix: '\x18Pesobit Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x37,
scriptHash: 0x55,
wif: 0xb7,
};
bitcoinjs.bitcoin.networks.pinkcoin = {
messagePrefix: '\x18Pinkcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x03,
scriptHash: 0x1c,
wif: 0x83,
};
bitcoinjs.bitcoin.networks.poswcoin = {
messagePrefix: '\x18Poswcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x37,
scriptHash: 0x55,
wif: 0xb7,
};
bitcoinjs.bitcoin.networks.potcoin = {
messagePrefix: '\x18Potcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,

},
pubKeyHash: 0x37,
scriptHash: 0x05,
wif: 0xb7,
};
bitcoinjs.bitcoin.networks.putincoin = {
messagePrefix: '\x18PutinCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x37,
scriptHash: 0x14,
wif: 0xb7,
};
bitcoinjs.bitcoin.networks.ravencoin = {
messagePrefix: '\x16Raven Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x3c,
scriptHash: 0x7a,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.reddcoin = {
messagePrefix: '\x18Reddcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x3d,
scriptHash: 0x05,
wif: 0xbd,
};
bitcoinjs.bitcoin.networks.revolutionvr = {
messagePrefix: '\x18Voxels Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x46,
scriptHash: 0x05,
wif: 0xc6,

};
bitcoinjs.bitcoin.networks.rubycoin = {
messagePrefix: '\x18Rubycoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x3c,
scriptHash: 0x55,
wif: 0xbc,
};
bitcoinjs.bitcoin.networks.safecoin = {
messagePrefix: '\x18Safecoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x3d,
scriptHash: 0x56,
wif: 0xbd,
};
bitcoinjs.bitcoin.networks.salus = {
messagePrefix: '\x18Salus Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x3f,
scriptHash: 0xc4,
wif: 0xbf,
};
bitcoinjs.bitcoin.networks.smileycoin = {
messagePrefix: '\x18Smileycoin Signed Message:\n',
bip32: {
public: 0x1E562D9A,
private: 0x1E5631BC,
},
pubKeyHash: 0x19,
scriptHash: 0x05,
wif: 0x05,
};
bitcoinjs.bitcoin.networks.solarcoin = {
messagePrefix: '\x18SolarCoin Signed Message:\n',

bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x12,
scriptHash: 0x05,
wif: 0x92,
};
bitcoinjs.bitcoin.networks.stash = {
messagePrefix: '\x18Stash Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x4c,
scriptHash: 0x10,
wif: 0xcc
};
bitcoinjs.bitcoin.networks.stashtn = {
messagePrefix: '\x18Stash Test Signed Message:\n',
bip32: {
public: 0x043587cf,
private: 0x04358394
},
pubKeyHash: 0x8c,
scriptHash: 0x13,
wif: 0xef
};
bitcoinjs.bitcoin.networks.stratis = {
messagePrefix: '\x18Stratis Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x3f,
scriptHash: 0x7d,
wif: 0xbf,
};
bitcoinjs.bitcoin.networks.stratistest = {
messagePrefix: '\x18Stratis Test Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},

pubKeyHash: 0x41,
scriptHash: 0x7d,
wif: 0xbf,
};
bitcoinjs.bitcoin.networks.syscoin = {
messagePrefix: '\x18Syscoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x3f,
scriptHash: 0x05,
wif: 0x80,
};

bitcoinjs.bitcoin.networks.toa = {
messagePrefix: '\x18TOA Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x41,
scriptHash: 0x17,
wif: 0xc1,
};
bitcoinjs.bitcoin.networks.ultimatesecurecash = {
messagePrefix: '\x18UltimateSecureCash Signed Message:\n',
bip32: {
public: 0xEE80286A,
private: 0xEE8031E8,
},
pubKeyHash: 0x44,
scriptHash: 0x7d,
wif: 0xbf,
};
bitcoinjs.bitcoin.networks.unobtanium = {
messagePrefix: '\x18Unobtanium Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x82,
scriptHash: 0x1e,
wif: 0xe0,

};
bitcoinjs.bitcoin.networks.vcash = {
messagePrefix: '\x18Vcash Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x47,
scriptHash: 0x08,
wif: 0xc7,
};
bitcoinjs.bitcoin.networks.verge = {
messagePrefix: '\x18VERGE Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x1e,
scriptHash: 0x21,
wif: 0x9e,
};
bitcoinjs.bitcoin.networks.vertcoin = {
messagePrefix: '\x18Vertcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x47,
scriptHash: 0x05,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.vivo = {
messagePrefix: '\x18DarkCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x46,
scriptHash: 0x0a,
wif: 0xc6,
};
bitcoinjs.bitcoin.networks.vpncoin = {
messagePrefix: '\x18VpnCoin Signed Message:\n',

bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x47,
scriptHash: 0x05,
wif: 0xc7,
};
bitcoinjs.bitcoin.networks.whitecoin = {
messagePrefix: '\x18Whitecoin Signed Message:\n',
bip32: {
public: 0x04887F1E,
private: 0x048894ED,
},
pubKeyHash: 0x49,
scriptHash: 0x57,
wif: 0xc9,
};
bitcoinjs.bitcoin.networks.wincoin = {
messagePrefix: '\x18WinCoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4,
},
pubKeyHash: 0x49,
scriptHash: 0x1c,
wif: 0xc9,
};
bitcoinjs.bitcoin.networks.zcoin = {
messagePrefix: '\x18Zcoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x52,
scriptHash: 0x07,
wif: 0xd2,
};
bitcoinjs.bitcoin.networks.zcash = {
messagePrefix: '\x18Zcash Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},

pubKeyHash: 0x1CB8,
scriptHash: 0x1CBD,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.xuez = {
messagePrefix: 'unused',
bip32: {
public: 0x022d2533,
private: 0x0221312b
},
pubKeyHash: 0x4b,
scriptHash: 0x12,
wif: 0xd4
};
bitcoinjs.bitcoin.networks.bitcoinprivate = {
messagePrefix: '\x18BitcoinPrivate Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1325,
scriptHash: 0x13AF,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.bitcoinz = {
messagePrefix: '\x18BitcoinZ Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1CB8,
scriptHash: 0x1CBD,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.hush = {
messagePrefix: '\x18Hush Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1CB8,
scriptHash: 0x1CBD,
wif: 0x80,
};

bitcoinjs.bitcoin.networks.zclassic = {
messagePrefix: '\x18Zcash Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x1CB8,
scriptHash: 0x1CBD,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.zencash = {
messagePrefix: '\x18Zcash Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x2089,
scriptHash: 0x2096,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.energi = {
messagePrefix: 'DarkCoin Signed Message:\n',
bip32: {
public: 0x03B8C856,
private: 0xD7DC6E9F,
},
pubKeyHash: 0x21,
scriptHash: 0x35,
wif: 0x6a,
};
bitcoinjs.bitcoin.networks.exchangecoin = {
messagePrefix: 'ExchangeCoin Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x21B9,
scriptHash: 0x34AF,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.artax = {
messagePrefix: '\x18Artax Signed Message:\n',
bip32: {

public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x17,
scriptHash: 0x1CBD,
wif: 0x97,
};
bitcoinjs.bitcoin.networks.bitcoingreen = {
messagePrefix: '\x18BitcoinGreen Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4,
},
pubKeyHash: 0x26,
scriptHash: 0x1CBD,
wif: 0x2E,
};
bitcoinjs.bitcoin.networks.anon = {
messagePrefix: '\x18ANON Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x0582,
scriptHash: 0x5389,
wif: 0x80
};
bitcoinjs.bitcoin.networks.projectcoin = {
messagePrefix: '\x18ProjectCoin Signed Message:\n',
bip32: {
public: 0x022D2533,
private: 0x0221312B,
},
pubKeyHash: 0x37,
scriptHash: 0x08,
wif: 0x75,
};
bitcoinjs.bitcoin.networks.phore = {
messagePrefix: '\x18Phore Signed Message:\n',
bip32: {
public: 0x022D2533,
private: 0x0221312B,
},
pubKeyHash: 0x37,

scriptHash: 0x0D,
wif: 0xD4,
};
bitcoinjs.bitcoin.networks.blocknode = {
messagePrefix: '\x18Blocknode Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 0x19,
scriptHash: 0x3F,
wif: 0x4b,
};
bitcoinjs.bitcoin.networks.blocknode_testnet = {
messagePrefix: '\x18Blocknode Testnet Signed Message:\n',
bip32: {
public: 0x043587cf,
private: 0x04358394
},
pubKeyHash: 0x55,
scriptHash: 0x7d,
wif: 0x89,
};
bitcoinjs.bitcoin.networks.litecoinz = {
messagePrefix: '\x18LitecoinZ Signed Message:\n',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE3,
},
pubKeyHash: 0x0AB3,
scriptHash: 0x0AB8,
wif: 0x80,
};

(function(f){if(typeof exports==="object"&&typeof
module!=="undefined"){module.exports=f()}else if(typeof
define==="function"&&define.amd){define([],f)}else{var g;if(typeof
window!=="undefined"){g=window}else if(typeof
global!=="undefined"){g=global}else if(typeof
self!=="undefined"){g=self}else{g=this}g.bitcoinjsBip38 =
f()}})(function(){var define,module,exports;return (function
e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof
require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return
i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw
f.code="MODULE_NOT_FOUND",f}var
l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var
n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var
i=typeof require=="function"&&require;for(var
o=0;o<r.length;o++)s(r[o]);return
s})({1:[function(require,module,exports){
var asn1 = exports;
asn1.bignum = require('bn.js');
asn1.define = require('./asn1/api').define;
asn1.base = require('./asn1/base');
asn1.constants = require('./asn1/constants');
asn1.decoders = require('./asn1/decoders');
asn1.encoders = require('./asn1/encoders');
},{"./asn1/api":2,"./asn1/base":4,"./asn1/constants":8,"./asn1/decoders":1
0,"./asn1/encoders":13,"bn.js":17}],2:[function(require,module,exports){
var asn1 = require('../asn1');
var inherits = require('inherits');
var api = exports;
api.define = function define(name, body) {
return new Entity(name, body);
};
function Entity(name, body) {
this.name = name;
this.body = body;
this.decoders = {};
this.encoders = {};
};
Entity.prototype._createNamed = function createNamed(base) {
var named;
try {

named = require('vm').runInThisContext(
'(function ' + this.name + '(entity) {\n' +
' this._initNamed(entity);\n' +
'})'
);
} catch (e) {
named = function (entity) {
this._initNamed(entity);
};
}
inherits(named, base);
named.prototype._initNamed = function initnamed(entity) {
base.call(this, entity);
};
return new named(this);
};
Entity.prototype._getDecoder = function _getDecoder(enc) {
enc = enc || 'der';
// Lazily create decoder
if (!this.decoders.hasOwnProperty(enc))
this.decoders[enc] = this._createNamed(asn1.decoders[enc]);
return this.decoders[enc];
};
Entity.prototype.decode = function decode(data, enc, options) {
return this._getDecoder(enc).decode(data, options);
};
Entity.prototype._getEncoder = function _getEncoder(enc) {
enc = enc || 'der';
// Lazily create encoder
if (!this.encoders.hasOwnProperty(enc))
this.encoders[enc] = this._createNamed(asn1.encoders[enc]);
return this.encoders[enc];
};
Entity.prototype.encode = function encode(data, enc, /* internal */ reporter)
{
return this._getEncoder(enc).encode(data, reporter);
};
},{"../asn1":1,"inherits":95,"vm":149}],3:[function(require,module,exports
){
var inherits = require('inherits');
var Reporter = require('../base').Reporter;
var Buffer = require('buffer').Buffer;

function DecoderBuffer(base, options) {
Reporter.call(this, options);
if (!Buffer.isBuffer(base)) {
this.error('Input not Buffer');
return;
}
this.base = base;
this.offset = 0;
this.length = base.length;
}
inherits(DecoderBuffer, Reporter);
exports.DecoderBuffer = DecoderBuffer;
DecoderBuffer.prototype.save = function save() {
return { offset: this.offset, reporter: Reporter.prototype.save.call(this)
};
};
DecoderBuffer.prototype.restore = function restore(save) {
// Return skipped data
var res = new DecoderBuffer(this.base);
res.offset = save.offset;
res.length = this.offset;
this.offset = save.offset;
Reporter.prototype.restore.call(this, save.reporter);
return res;
};
DecoderBuffer.prototype.isEmpty = function isEmpty() {
return this.offset === this.length;
};
DecoderBuffer.prototype.readUInt8 = function readUInt8(fail) {
if (this.offset + 1 <= this.length)
return this.base.readUInt8(this.offset++, true);
else
return this.error(fail || 'DecoderBuffer overrun');
}
DecoderBuffer.prototype.skip = function skip(bytes, fail) {
if (!(this.offset + bytes <= this.length))
return this.error(fail || 'DecoderBuffer overrun');
var res = new DecoderBuffer(this.base);

// Share reporter state
res._reporterState = this._reporterState;
res.offset = this.offset;
res.length = this.offset + bytes;
this.offset += bytes;
return res;
}
DecoderBuffer.prototype.raw = function raw(save) {
return this.base.slice(save ? save.offset : this.offset, this.length);
}
function EncoderBuffer(value, reporter) {
if (Array.isArray(value)) {
this.length = 0;
this.value = value.map(function(item) {
if (!(item instanceof EncoderBuffer))
item = new EncoderBuffer(item, reporter);
this.length += item.length;
return item;
}, this);
} else if (typeof value === 'number') {
if (!(0 <= value && value <= 0xff))
return reporter.error('non-byte EncoderBuffer value');
this.value = value;
this.length = 1;
} else if (typeof value === 'string') {
this.value = value;
this.length = Buffer.byteLength(value);
} else if (Buffer.isBuffer(value)) {
this.value = value;
this.length = value.length;
} else {
return reporter.error('Unsupported type: ' + typeof value);
}
}
exports.EncoderBuffer = EncoderBuffer;
EncoderBuffer.prototype.join = function join(out, offset) {
if (!out)
out = new Buffer(this.length);
if (!offset)
offset = 0;
if (this.length === 0)
return out;

if (Array.isArray(this.value)) {
this.value.forEach(function(item) {
item.join(out, offset);
offset += item.length;
});
} else {
if (typeof this.value === 'number')
out[offset] = this.value;
else if (typeof this.value === 'string')
out.write(this.value, offset);
else if (Buffer.isBuffer(this.value))
this.value.copy(out, offset);
offset += this.length;
}
return out;
};
},{"../base":4,"buffer":47,"inherits":95}],4:[function(require,module,expo
rts){
var base = exports;
base.Reporter = require('./reporter').Reporter;
base.DecoderBuffer = require('./buffer').DecoderBuffer;
base.EncoderBuffer = require('./buffer').EncoderBuffer;
base.Node = require('./node');
},{"./buffer":3,"./node":5,"./reporter":6}],5:[function(require,module,exp
orts){
var Reporter = require('../base').Reporter;
var EncoderBuffer = require('../base').EncoderBuffer;
var DecoderBuffer = require('../base').DecoderBuffer;
var assert = require('minimalistic-assert');
// Supported tags
var tags = [
'seq', 'seqof', 'set', 'setof', 'objid', 'bool',
'gentime', 'utctime', 'null_', 'enum', 'int', 'objDesc',
'bitstr', 'bmpstr', 'charstr', 'genstr', 'graphstr', 'ia5str', 'iso646str',
'numstr', 'octstr', 'printstr', 't61str', 'unistr', 'utf8str', 'videostr'
];
// Public methods list
var methods = [
'key', 'obj', 'use', 'optional', 'explicit', 'implicit', 'def', 'choice',
'any', 'contains'
].concat(tags);

// Overrided methods list
var overrided = [
'_peekTag', '_decodeTag', '_use',
'_decodeStr', '_decodeObjid', '_decodeTime',
'_decodeNull', '_decodeInt', '_decodeBool', '_decodeList',
'_encodeComposite', '_encodeStr', '_encodeObjid', '_encodeTime',
'_encodeNull', '_encodeInt', '_encodeBool'
];
function Node(enc, parent) {
var state = {};
this._baseState = state;
state.enc = enc;
state.parent = parent || null;
state.children = null;
// State
state.tag = null;
state.args = null;
state.reverseArgs = null;
state.choice = null;
state.optional = false;
state.any = false;
state.obj = false;
state.use = null;
state.useDecoder = null;
state.key = null;
state['default'] = null;
state.explicit = null;
state.implicit = null;
state.contains = null;
// Should create new instance on each method
if (!state.parent) {
state.children = [];
this._wrap();
}
}
module.exports = Node;
var stateProps = [
'enc', 'parent', 'children', 'tag', 'args', 'reverseArgs', 'choice',
'optional', 'any', 'obj', 'use', 'alteredUse', 'key', 'default',
'explicit',

'implicit', 'contains'
];
Node.prototype.clone = function clone() {
var state = this._baseState;
var cstate = {};
stateProps.forEach(function(prop) {
cstate[prop] = state[prop];
});
var res = new this.constructor(cstate.parent);
res._baseState = cstate;
return res;
};
Node.prototype._wrap = function wrap() {
var state = this._baseState;
methods.forEach(function(method) {
this[method] = function _wrappedMethod() {
var clone = new this.constructor(this);
state.children.push(clone);
return clone[method].apply(clone, arguments);
};
}, this);
};
Node.prototype._init = function init(body) {
var state = this._baseState;
assert(state.parent === null);
body.call(this);
// Filter children
state.children = state.children.filter(function(child) {
return child._baseState.parent === this;
}, this);
assert.equal(state.children.length, 1, 'Root node can have only one child');
};
Node.prototype._useArgs = function useArgs(args) {
var state = this._baseState;
// Filter children and args
var children = args.filter(function(arg) {
return arg instanceof this.constructor;
}, this);
args = args.filter(function(arg) {
return !(arg instanceof this.constructor);
}, this);

if (children.length !== 0) {
assert(state.children === null);
state.children = children;
// Replace parent to maintain backward link
children.forEach(function(child) {
child._baseState.parent = this;
}, this);
}
if (args.length !== 0) {
assert(state.args === null);
state.args = args;
state.reverseArgs = args.map(function(arg) {
if (typeof arg !== 'object' || arg.constructor !== Object)
return arg;
var res = {};
Object.keys(arg).forEach(function(key) {
if (key == (key | 0))
key |= 0;
var value = arg[key];
res[value] = key;
});
return res;
});
}
};
//
// Overrided methods
//
overrided.forEach(function(method) {
Node.prototype[method] = function _overrided() {
var state = this._baseState;
throw new Error(method + ' not implemented for encoding: ' + state.enc);
};
});
//
// Public methods
//
tags.forEach(function(tag) {
Node.prototype[tag] = function _tagMethod() {
var state = this._baseState;
var args = Array.prototype.slice.call(arguments);

assert(state.tag === null);
state.tag = tag;
this._useArgs(args);
return this;
};
});
Node.prototype.use = function use(item) {
assert(item);
var state = this._baseState;
assert(state.use === null);
state.use = item;
return this;
};
Node.prototype.optional = function optional() {
var state = this._baseState;
state.optional = true;
return this;
};
Node.prototype.def = function def(val) {
var state = this._baseState;
assert(state['default'] === null);
state['default'] = val;
state.optional = true;
return this;
};
Node.prototype.explicit = function explicit(num) {
var state = this._baseState;
assert(state.explicit === null && state.implicit === null);
state.explicit = num;
return this;
};
Node.prototype.implicit = function implicit(num) {

var state = this._baseState;
assert(state.explicit === null && state.implicit === null);
state.implicit = num;
return this;
};
Node.prototype.obj = function obj() {
var state = this._baseState;
var args = Array.prototype.slice.call(arguments);
state.obj = true;
if (args.length !== 0)
this._useArgs(args);
return this;
};
Node.prototype.key = function key(newKey) {
var state = this._baseState;
assert(state.key === null);
state.key = newKey;
return this;
};
Node.prototype.any = function any() {
var state = this._baseState;
state.any = true;
return this;
};
Node.prototype.choice = function choice(obj) {
var state = this._baseState;
assert(state.choice === null);
state.choice = obj;
this._useArgs(Object.keys(obj).map(function(key) {
return obj[key];
}));
return this;
};

Node.prototype.contains = function contains(item) {
var state = this._baseState;
assert(state.use === null);
state.contains = item;
return this;
};
//
// Decoding
//
Node.prototype._decode = function decode(input, options) {
var state = this._baseState;
// Decode root node
if (state.parent === null)
return input.wrapResult(state.children[0]._decode(input, options));
var result = state['default'];
var present = true;
var prevKey = null;
if (state.key !== null)
prevKey = input.enterKey(state.key);
// Check if tag is there
if (state.optional) {
var tag = null;
if (state.explicit !== null)
tag = state.explicit;
else if (state.implicit !== null)
tag = state.implicit;
else if (state.tag !== null)
tag = state.tag;
if (tag === null && !state.any) {
// Trial and Error
var save = input.save();
try {
if (state.choice === null)
this._decodeGeneric(state.tag, input, options);
else
this._decodeChoice(input, options);
present = true;
} catch (e) {

present = false;
}
input.restore(save);
} else {
present = this._peekTag(input, tag, state.any);
if (input.isError(present))
return present;
}
}
// Push object on stack
var prevObj;
if (state.obj && present)
prevObj = input.enterObject();
if (present) {
// Unwrap explicit values
if (state.explicit !== null) {
var explicit = this._decodeTag(input, state.explicit);
if (input.isError(explicit))
return explicit;
input = explicit;
}
var start = input.offset;
// Unwrap implicit and normal values
if (state.use === null && state.choice === null) {
if (state.any)
var save = input.save();
var body = this._decodeTag(
input,
state.implicit !== null ? state.implicit : state.tag,
state.any
);
if (input.isError(body))
return body;
if (state.any)
result = input.raw(save);
else
input = body;
}
if (options && options.track && state.tag !== null)
options.track(input.path(), start, input.length, 'tagged');

if (options && options.track && state.tag !== null)
options.track(input.path(), input.offset, input.length, 'content');
// Select proper method for tag
if (state.any)
result = result;
else if (state.choice === null)
result = this._decodeGeneric(state.tag, input, options);
else
result = this._decodeChoice(input, options);
if (input.isError(result))
return result;
// Decode children
if (!state.any && state.choice === null && state.children !== null) {
state.children.forEach(function decodeChildren(child) {
// NOTE: We are ignoring errors here, to let parser continue with other
// parts of encoded data
child._decode(input, options);
});
}
// Decode contained/encoded by schema, only in bit or octet strings
if (state.contains && (state.tag === 'octstr' || state.tag === 'bitstr'))
{
var data = new DecoderBuffer(result);
result = this._getUse(state.contains, input._reporterState.obj)
._decode(data, options);
}
}
// Pop object
if (state.obj && present)
result = input.leaveObject(prevObj);
// Set key
if (state.key !== null && (result !== null || present === true))
input.leaveKey(prevKey, state.key, result);
else if (prevKey !== null)
input.exitKey(prevKey);
return result;
};
Node.prototype._decodeGeneric = function decodeGeneric(tag, input, options)
{
var state = this._baseState;

if (tag === 'seq' || tag === 'set')
return null;
if (tag === 'seqof' || tag === 'setof')
return this._decodeList(input, tag, state.args[0], options);
else if (/str$/.test(tag))
return this._decodeStr(input, tag, options);
else if (tag === 'objid' && state.args)
return this._decodeObjid(input, state.args[0], state.args[1], options);
else if (tag === 'objid')
return this._decodeObjid(input, null, null, options);
else if (tag === 'gentime' || tag === 'utctime')
return this._decodeTime(input, tag, options);
else if (tag === 'null_')
return this._decodeNull(input, options);
else if (tag === 'bool')
return this._decodeBool(input, options);
else if (tag === 'objDesc')
return this._decodeStr(input, tag, options);
else if (tag === 'int' || tag === 'enum')
return this._decodeInt(input, state.args && state.args[0], options);
if (state.use !== null) {
return this._getUse(state.use, input._reporterState.obj)
._decode(input, options);
} else {
return input.error('unknown tag: ' + tag);
}
};
Node.prototype._getUse = function _getUse(entity, obj) {
var state = this._baseState;
// Create altered use decoder if implicit is set
state.useDecoder = this._use(entity, obj);
assert(state.useDecoder._baseState.parent === null);
state.useDecoder = state.useDecoder._baseState.children[0];
if (state.implicit !== state.useDecoder._baseState.implicit) {
state.useDecoder = state.useDecoder.clone();
state.useDecoder._baseState.implicit = state.implicit;
}
return state.useDecoder;
};
Node.prototype._decodeChoice = function decodeChoice(input, options) {
var state = this._baseState;
var result = null;
var match = false;

Object.keys(state.choice).some(function(key) {
var save = input.save();
var node = state.choice[key];
try {
var value = node._decode(input, options);
if (input.isError(value))
return false;
result = { type: key, value: value };
match = true;
} catch (e) {
input.restore(save);
return false;
}
return true;
}, this);
if (!match)
return input.error('Choice not matched');
return result;
};
//
// Encoding
//
Node.prototype._createEncoderBuffer = function createEncoderBuffer(data) {
return new EncoderBuffer(data, this.reporter);
};
Node.prototype._encode = function encode(data, reporter, parent) {
var state = this._baseState;
if (state['default'] !== null && state['default'] === data)
return;
var result = this._encodeValue(data, reporter, parent);
if (result === undefined)
return;
if (this._skipDefault(result, reporter, parent))
return;
return result;
};
Node.prototype._encodeValue = function encode(data, reporter, parent) {

var state = this._baseState;
// Decode root node
if (state.parent === null)
return state.children[0]._encode(data, reporter || new Reporter());
var result = null;
// Set reporter to share it with a child class
this.reporter = reporter;
// Check if data is there
if (state.optional && data === undefined) {
if (state['default'] !== null)
data = state['default']
else
return;
}
// Encode children first
var content = null;
var primitive = false;
if (state.any) {
// Anything that was given is translated to buffer
result = this._createEncoderBuffer(data);
} else if (state.choice) {
result = this._encodeChoice(data, reporter);
} else if (state.contains) {
content = this._getUse(state.contains, parent)._encode(data, reporter);
primitive = true;
} else if (state.children) {
content = state.children.map(function(child) {
if (child._baseState.tag === 'null_')
return child._encode(null, reporter, data);
if (child._baseState.key === null)
return reporter.error('Child should have a key');
var prevKey = reporter.enterKey(child._baseState.key);
if (typeof data !== 'object')
return reporter.error('Child expected, but input is not object');
var res = child._encode(data[child._baseState.key], reporter, data);
reporter.leaveKey(prevKey);
return res;
}, this).filter(function(child) {
return child;

});
content = this._createEncoderBuffer(content);
} else {
if (state.tag === 'seqof' || state.tag === 'setof') {
// TODO(indutny): this should be thrown on DSL level
if (!(state.args && state.args.length === 1))
return reporter.error('Too many args for : ' + state.tag);
if (!Array.isArray(data))
return reporter.error('seqof/setof, but data is not Array');
var child = this.clone();
child._baseState.implicit = null;
content = this._createEncoderBuffer(data.map(function(item) {
var state = this._baseState;
return this._getUse(state.args[0], data)._encode(item, reporter);
}, child));
} else if (state.use !== null) {
result = this._getUse(state.use, parent)._encode(data, reporter);
} else {
content = this._encodePrimitive(state.tag, data);
primitive = true;
}
}
// Encode data itself
var result;
if (!state.any && state.choice === null) {
var tag = state.implicit !== null ? state.implicit : state.tag;
var cls = state.implicit === null ? 'universal' : 'context';
if (tag === null) {
if (state.use === null)
reporter.error('Tag could be ommited only for .use()');
} else {
if (state.use === null)
result = this._encodeComposite(tag, primitive, cls, content);
}
}
// Wrap in explicit
if (state.explicit !== null)
result = this._encodeComposite(state.explicit, false, 'context',
result);
return result;
};

Node.prototype._encodeChoice = function encodeChoice(data, reporter) {
var state = this._baseState;
var node = state.choice[data.type];
if (!node) {
assert(
false,
data.type + ' not found in ' +
JSON.stringify(Object.keys(state.choice)));
}
return node._encode(data.value, reporter);
};
Node.prototype._encodePrimitive = function encodePrimitive(tag, data) {
var state = this._baseState;
if (/str$/.test(tag))
return this._encodeStr(data, tag);
else if (tag === 'objid' && state.args)
return this._encodeObjid(data, state.reverseArgs[0], state.args[1]);
else if (tag === 'objid')
return this._encodeObjid(data, null, null);
else if (tag === 'gentime' || tag === 'utctime')
return this._encodeTime(data, tag);
else if (tag === 'null_')
return this._encodeNull();
else if (tag === 'int' || tag === 'enum')
return this._encodeInt(data, state.args && state.reverseArgs[0]);
else if (tag === 'bool')
return this._encodeBool(data);
else if (tag === 'objDesc')
return this._encodeStr(data, tag);
else
throw new Error('Unsupported tag: ' + tag);
};
Node.prototype._isNumstr = function isNumstr(str) {
return /^[0-9 ]*$/.test(str);
};
Node.prototype._isPrintstr = function isPrintstr(str) {
return /^[A-Za-z0-9 '\(\)\+,\-\.\/:=\?]*$/.test(str);
};
},{"../base":4,"minimalistic-assert":99}],6:[function(require,module,expor
ts){
var inherits = require('inherits');

function Reporter(options) {
this._reporterState = {
obj: null,
path: [],
options: options || {},
errors: []
};
}
exports.Reporter = Reporter;
Reporter.prototype.isError = function isError(obj) {
return obj instanceof ReporterError;
};
Reporter.prototype.save = function save() {
var state = this._reporterState;
return { obj: state.obj, pathLen: state.path.length };
};
Reporter.prototype.restore = function restore(data) {
var state = this._reporterState;
state.obj = data.obj;
state.path = state.path.slice(0, data.pathLen);
};
Reporter.prototype.enterKey = function enterKey(key) {
return this._reporterState.path.push(key);
};
Reporter.prototype.exitKey = function exitKey(index) {
var state = this._reporterState;
state.path = state.path.slice(0, index - 1);
};
Reporter.prototype.leaveKey = function leaveKey(index, key, value) {
var state = this._reporterState;
this.exitKey(index);
if (state.obj !== null)
state.obj[key] = value;
};
Reporter.prototype.path = function path() {
return this._reporterState.path.join('/');

};
Reporter.prototype.enterObject = function enterObject() {
var state = this._reporterState;
var prev = state.obj;
state.obj = {};
return prev;
};
Reporter.prototype.leaveObject = function leaveObject(prev) {
var state = this._reporterState;
var now = state.obj;
state.obj = prev;
return now;
};
Reporter.prototype.error = function error(msg) {
var err;
var state = this._reporterState;
var inherited = msg instanceof ReporterError;
if (inherited) {
err = msg;
} else {
err = new ReporterError(state.path.map(function(elem) {
return '[' + JSON.stringify(elem) + ']';
}).join(''), msg.message || msg, msg.stack);
}
if (!state.options.partial)
throw err;
if (!inherited)
state.errors.push(err);
return err;
};
Reporter.prototype.wrapResult = function wrapResult(result) {
var state = this._reporterState;
if (!state.options.partial)
return result;
return {
result: this.isError(result) ? null : result,
errors: state.errors

};
};
function ReporterError(path, msg) {
this.path = path;
this.rethrow(msg);
};
inherits(ReporterError, Error);
ReporterError.prototype.rethrow = function rethrow(msg) {
this.message = msg + ' at: ' + (this.path || '(shallow)');
if (Error.captureStackTrace)
Error.captureStackTrace(this, ReporterError);
if (!this.stack) {
try {
// IE only adds stack when thrown
throw new Error(this.message);
} catch (e) {
this.stack = e.stack;
}
}
return this;
};
},{"inherits":95}],7:[function(require,module,exports){
var constants = require('../constants');
exports.tagClass = {
0: 'universal',
1: 'application',
2: 'context',
3: 'private'
};
exports.tagClassByName = constants._reverse(exports.tagClass);
exports.tag = {
0x00: 'end',
0x01: 'bool',
0x02: 'int',
0x03: 'bitstr',
0x04: 'octstr',
0x05: 'null_',
0x06: 'objid',
0x07: 'objDesc',
0x08: 'external',
0x09: 'real',
0x0a: 'enum',

0x0b: 'embed',
0x0c: 'utf8str',
0x0d: 'relativeOid',
0x10: 'seq',
0x11: 'set',
0x12: 'numstr',
0x13: 'printstr',
0x14: 't61str',
0x15: 'videostr',
0x16: 'ia5str',
0x17: 'utctime',
0x18: 'gentime',
0x19: 'graphstr',
0x1a: 'iso646str',
0x1b: 'genstr',
0x1c: 'unistr',
0x1d: 'charstr',
0x1e: 'bmpstr'
};
exports.tagByName = constants._reverse(exports.tag);
},{"../constants":8}],8:[function(require,module,exports){
var constants = exports;
// Helper
constants._reverse = function reverse(map) {
var res = {};
Object.keys(map).forEach(function(key) {
// Convert key to integer if it is stringified
if ((key | 0) == key)
key = key | 0;
var value = map[key];
res[value] = key;
});
return res;
};
constants.der = require('./der');
},{"./der":7}],9:[function(require,module,exports){
var inherits = require('inherits');
var asn1 = require('../../asn1');
var base = asn1.base;
var bignum = asn1.bignum;

// Import DER constants
var der = asn1.constants.der;
function DERDecoder(entity) {
this.enc = 'der';
this.name = entity.name;
this.entity = entity;
// Construct base tree
this.tree = new DERNode();
this.tree._init(entity.body);
};
module.exports = DERDecoder;
DERDecoder.prototype.decode = function decode(data, options) {
if (!(data instanceof base.DecoderBuffer))
data = new base.DecoderBuffer(data, options);
return this.tree._decode(data, options);
};
// Tree methods
function DERNode(parent) {
base.Node.call(this, 'der', parent);
}
inherits(DERNode, base.Node);
DERNode.prototype._peekTag = function peekTag(buffer, tag, any) {
if (buffer.isEmpty())
return false;
var state = buffer.save();
var decodedTag = derDecodeTag(buffer, 'Failed to peek tag: "' + tag + '"');
if (buffer.isError(decodedTag))
return decodedTag;
buffer.restore(state);
return decodedTag.tag === tag || decodedTag.tagStr === tag ||
(decodedTag.tagStr + 'of') === tag || any;
};
DERNode.prototype._decodeTag = function decodeTag(buffer, tag, any) {
var decodedTag = derDecodeTag(buffer,
'Failed to decode tag of "' + tag + '"');
if (buffer.isError(decodedTag))

return decodedTag;
var len = derDecodeLen(buffer,
decodedTag.primitive,

'Failed to get length of "' + tag + '"');

// Failure
if (buffer.isError(len))
return len;
if (!any &&
decodedTag.tag !== tag &&
decodedTag.tagStr !== tag &&
decodedTag.tagStr + 'of' !== tag) {
return buffer.error('Failed to match tag: "' + tag + '"');
}
if (decodedTag.primitive || len !== null)
return buffer.skip(len, 'Failed to match body of: "' + tag + '"');
// Indefinite length... find END tag
var state = buffer.save();
var res = this._skipUntilEnd(
buffer,
'Failed to skip indefinite length body: "' + this.tag + '"');
if (buffer.isError(res))
return res;
len = buffer.offset - state.offset;
buffer.restore(state);
return buffer.skip(len, 'Failed to match body of: "' + tag + '"');
};
DERNode.prototype._skipUntilEnd = function skipUntilEnd(buffer, fail) {
while (true) {
var tag = derDecodeTag(buffer, fail);
if (buffer.isError(tag))
return tag;
var len = derDecodeLen(buffer, tag.primitive, fail);
if (buffer.isError(len))
return len;
var res;
if (tag.primitive || len !== null)
res = buffer.skip(len)
else
res = this._skipUntilEnd(buffer, fail);

// Failure
if (buffer.isError(res))
return res;
if (tag.tagStr === 'end')
break;
}
};
DERNode.prototype._decodeList = function decodeList(buffer, tag, decoder,
options) {
var result = [];
while (!buffer.isEmpty()) {
var possibleEnd = this._peekTag(buffer, 'end');
if (buffer.isError(possibleEnd))
return possibleEnd;
var res = decoder.decode(buffer, 'der', options);
if (buffer.isError(res) && possibleEnd)
break;
result.push(res);
}
return result;
};
DERNode.prototype._decodeStr = function decodeStr(buffer, tag) {
if (tag === 'bitstr') {
var unused = buffer.readUInt8();
if (buffer.isError(unused))
return unused;
return { unused: unused, data: buffer.raw() };
} else if (tag === 'bmpstr') {
var raw = buffer.raw();
if (raw.length % 2 === 1)
return buffer.error('Decoding of string type: bmpstr length mismatch');
var str = '';
for (var i = 0; i < raw.length / 2; i++) {
str += String.fromCharCode(raw.readUInt16BE(i * 2));
}
return str;
} else if (tag === 'numstr') {
var numstr = buffer.raw().toString('ascii');
if (!this._isNumstr(numstr)) {
return buffer.error('Decoding of string type: ' +
'numstr unsupported characters');
}
return numstr;

} else if (tag === 'octstr') {
return buffer.raw();
} else if (tag === 'objDesc') {
return buffer.raw();
} else if (tag === 'printstr') {
var printstr = buffer.raw().toString('ascii');
if (!this._isPrintstr(printstr)) {
return buffer.error('Decoding of string type: ' +
'printstr unsupported characters');
}
return printstr;
} else if (/str$/.test(tag)) {
return buffer.raw().toString();
} else {
return buffer.error('Decoding of string type: ' + tag + ' unsupported');
}
};
DERNode.prototype._decodeObjid = function decodeObjid(buffer, values,
relative) {
var result;
var identifiers = [];
var ident = 0;
while (!buffer.isEmpty()) {
var subident = buffer.readUInt8();
ident <<= 7;
ident |= subident & 0x7f;
if ((subident & 0x80) === 0) {
identifiers.push(ident);
ident = 0;
}
}
if (subident & 0x80)
identifiers.push(ident);
var first = (identifiers[0] / 40) | 0;
var second = identifiers[0] % 40;
if (relative)
result = identifiers;
else
result = [first, second].concat(identifiers.slice(1));
if (values) {
var tmp = values[result.join(' ')];
if (tmp === undefined)
tmp = values[result.join('.')];
if (tmp !== undefined)

result = tmp;
}
return result;
};
DERNode.prototype._decodeTime = function decodeTime(buffer, tag) {
var str = buffer.raw().toString();
if (tag === 'gentime') {
var year = str.slice(0, 4) | 0;
var mon = str.slice(4, 6) | 0;
var day = str.slice(6, 8) | 0;
var hour = str.slice(8, 10) | 0;
var min = str.slice(10, 12) | 0;
var sec = str.slice(12, 14) | 0;
} else if (tag === 'utctime') {
var year = str.slice(0, 2) | 0;
var mon = str.slice(2, 4) | 0;
var day = str.slice(4, 6) | 0;
var hour = str.slice(6, 8) | 0;
var min = str.slice(8, 10) | 0;
var sec = str.slice(10, 12) | 0;
if (year < 70)
year = 2000 + year;
else
year = 1900 + year;
} else {
return buffer.error('Decoding ' + tag + ' time is not supported yet');
}
return Date.UTC(year, mon - 1, day, hour, min, sec, 0);
};
DERNode.prototype._decodeNull = function decodeNull(buffer) {
return null;
};
DERNode.prototype._decodeBool = function decodeBool(buffer) {
var res = buffer.readUInt8();
if (buffer.isError(res))
return res;
else
return res !== 0;
};
DERNode.prototype._decodeInt = function decodeInt(buffer, values) {
// Bigint, return as it is (assume big endian)
var raw = buffer.raw();

var res = new bignum(raw);
if (values)
res = values[res.toString(10)] || res;
return res;
};
DERNode.prototype._use = function use(entity, obj) {
if (typeof entity === 'function')
entity = entity(obj);
return entity._getDecoder('der').tree;
};
// Utility methods
function derDecodeTag(buf, fail) {
var tag = buf.readUInt8(fail);
if (buf.isError(tag))
return tag;
var cls = der.tagClass[tag >> 6];
var primitive = (tag & 0x20) === 0;
// Multi-octet tag - load
if ((tag & 0x1f) === 0x1f) {
var oct = tag;
tag = 0;
while ((oct & 0x80) === 0x80) {
oct = buf.readUInt8(fail);
if (buf.isError(oct))
return oct;
tag <<= 7;
tag |= oct & 0x7f;
}
} else {
tag &= 0x1f;
}
var tagStr = der.tag[tag];
return {
cls: cls,
primitive: primitive,
tag: tag,
tagStr: tagStr
};
}

function derDecodeLen(buf, primitive, fail) {
var len = buf.readUInt8(fail);
if (buf.isError(len))
return len;
// Indefinite form
if (!primitive && len === 0x80)
return null;
// Definite form
if ((len & 0x80) === 0) {
// Short form
return len;
}
// Long form
var num = len & 0x7f;
if (num > 4)
return buf.error('length octect is too long');
len = 0;
for (var i = 0; i < num; i++) {
len <<= 8;
var j = buf.readUInt8(fail);
if (buf.isError(j))
return j;
len |= j;
}
return len;
}
},{"../../asn1":1,"inherits":95}],10:[function(require,module,exports){
var decoders = exports;
decoders.der = require('./der');
decoders.pem = require('./pem');
},{"./der":9,"./pem":11}],11:[function(require,module,exports){
var inherits = require('inherits');
var Buffer = require('buffer').Buffer;
var DERDecoder = require('./der');
function PEMDecoder(entity) {
DERDecoder.call(this, entity);
this.enc = 'pem';

};
inherits(PEMDecoder, DERDecoder);
module.exports = PEMDecoder;
PEMDecoder.prototype.decode = function decode(data, options) {
var lines = data.toString().split(/[\r\n]+/g);
var label = options.label.toUpperCase();
var re = /^-----(BEGIN|END) ([^-]+)-----$/;
var start = -1;
var end = -1;
for (var i = 0; i < lines.length; i++) {
var match = lines[i].match(re);
if (match === null)
continue;
if (match[2] !== label)
continue;
if (start === -1) {
if (match[1] !== 'BEGIN')
break;
start = i;
} else {
if (match[1] !== 'END')
break;
end = i;
break;
}
}
if (start === -1 || end === -1)
throw new Error('PEM section not found for: ' + label);
var base64 = lines.slice(start + 1, end).join('');
// Remove excessive symbols
base64.replace(/[^a-z0-9\+\/=]+/gi, '');
var input = new Buffer(base64, 'base64');
return DERDecoder.prototype.decode.call(this, input, options);
};
},{"./der":9,"buffer":47,"inherits":95}],12:[function(require,module,expor
ts){
var inherits = require('inherits');
var Buffer = require('buffer').Buffer;
var asn1 = require('../../asn1');

var base = asn1.base;
// Import DER constants
var der = asn1.constants.der;
function DEREncoder(entity) {
this.enc = 'der';
this.name = entity.name;
this.entity = entity;
// Construct base tree
this.tree = new DERNode();
this.tree._init(entity.body);
};
module.exports = DEREncoder;
DEREncoder.prototype.encode = function encode(data, reporter) {
return this.tree._encode(data, reporter).join();
};
// Tree methods
function DERNode(parent) {
base.Node.call(this, 'der', parent);
}
inherits(DERNode, base.Node);
DERNode.prototype._encodeComposite = function encodeComposite(tag,
primitive,
cls,
content) {
var encodedTag = encodeTag(tag, primitive, cls, this.reporter);
// Short form
if (content.length < 0x80) {
var header = new Buffer(2);
header[0] = encodedTag;
header[1] = content.length;
return this._createEncoderBuffer([ header, content ]);
}
// Long form
// Count octets required to store length
var lenOctets = 1;
for (var i = content.length; i >= 0x100; i >>= 8)
lenOctets++;
var header = new Buffer(1 + 1 + lenOctets);

header[0] = encodedTag;
header[1] = 0x80 | lenOctets;
for (var i = 1 + lenOctets, j = content.length; j > 0; i--, j >>= 8)
header[i] = j & 0xff;
return this._createEncoderBuffer([ header, content ]);
};
DERNode.prototype._encodeStr = function encodeStr(str, tag) {
if (tag === 'bitstr') {
return this._createEncoderBuffer([ str.unused | 0, str.data ]);
} else if (tag === 'bmpstr') {
var buf = new Buffer(str.length * 2);
for (var i = 0; i < str.length; i++) {
buf.writeUInt16BE(str.charCodeAt(i), i * 2);
}
return this._createEncoderBuffer(buf);
} else if (tag === 'numstr') {
if (!this._isNumstr(str)) {
return this.reporter.error('Encoding of string type: numstr supports '
+
'only digits and space');
}
return this._createEncoderBuffer(str);
} else if (tag === 'printstr') {
if (!this._isPrintstr(str)) {
return this.reporter.error('Encoding of string type: printstr supports
' +
'only latin upper and lower case letters, '
+
'digits, space, apostrophe, left and rigth
' +
'parenthesis, plus sign, comma, hyphen, ' +
'dot, slash, colon, equal sign, ' +
'question mark');
}
return this._createEncoderBuffer(str);
} else if (/str$/.test(tag)) {
return this._createEncoderBuffer(str);
} else if (tag === 'objDesc') {
return this._createEncoderBuffer(str);
} else {
return this.reporter.error('Encoding of string type: ' + tag +
' unsupported');
}
};

DERNode.prototype._encodeObjid = function encodeObjid(id, values, relative)
{
if (typeof id === 'string') {
if (!values)
return this.reporter.error('string objid given, but no values map
found');
if (!values.hasOwnProperty(id))
return this.reporter.error('objid not found in values map');
id = values[id].split(/[\s\.]+/g);
for (var i = 0; i < id.length; i++)
id[i] |= 0;
} else if (Array.isArray(id)) {
id = id.slice();
for (var i = 0; i < id.length; i++)
id[i] |= 0;
}
if (!Array.isArray(id)) {
return this.reporter.error('objid() should be either array or string, '
+
'got: ' + JSON.stringify(id));
}
if (!relative) {
if (id[1] >= 40)
return this.reporter.error('Second objid identifier OOB');
id.splice(0, 2, id[0] * 40 + id[1]);
}
// Count number of octets
var size = 0;
for (var i = 0; i < id.length; i++) {
var ident = id[i];
for (size++; ident >= 0x80; ident >>= 7)
size++;
}
var objid = new Buffer(size);
var offset = objid.length - 1;
for (var i = id.length - 1; i >= 0; i--) {
var ident = id[i];
objid[offset--] = ident & 0x7f;
while ((ident >>= 7) > 0)
objid[offset--] = 0x80 | (ident & 0x7f);
}
return this._createEncoderBuffer(objid);
};

function two(num) {
if (num < 10)
return '0' + num;
else
return num;
}
DERNode.prototype._encodeTime = function encodeTime(time, tag) {
var str;
var date = new Date(time);
if (tag === 'gentime') {
str = [
two(date.getFullYear()),
two(date.getUTCMonth() + 1),
two(date.getUTCDate()),
two(date.getUTCHours()),
two(date.getUTCMinutes()),
two(date.getUTCSeconds()),
'Z'
].join('');
} else if (tag === 'utctime') {
str = [
two(date.getFullYear() % 100),
two(date.getUTCMonth() + 1),
two(date.getUTCDate()),
two(date.getUTCHours()),
two(date.getUTCMinutes()),
two(date.getUTCSeconds()),
'Z'
].join('');
} else {
this.reporter.error('Encoding ' + tag + ' time is not supported yet');
}
return this._encodeStr(str, 'octstr');
};
DERNode.prototype._encodeNull = function encodeNull() {
return this._createEncoderBuffer('');
};
DERNode.prototype._encodeInt = function encodeInt(num, values) {
if (typeof num === 'string') {
if (!values)
return this.reporter.error('String int or enum given, but no values
map');

if (!values.hasOwnProperty(num)) {
return this.reporter.error('Values map doesn\'t contain: ' +
JSON.stringify(num));
}
num = values[num];
}
// Bignum, assume big endian
if (typeof num !== 'number' && !Buffer.isBuffer(num)) {
var numArray = num.toArray();
if (!num.sign && numArray[0] & 0x80) {
numArray.unshift(0);
}
num = new Buffer(numArray);
}
if (Buffer.isBuffer(num)) {
var size = num.length;
if (num.length === 0)
size++;
var out = new Buffer(size);
num.copy(out);
if (num.length === 0)
out[0] = 0
return this._createEncoderBuffer(out);
}
if (num < 0x80)
return this._createEncoderBuffer(num);
if (num < 0x100)
return this._createEncoderBuffer([0, num]);
var size = 1;
for (var i = num; i >= 0x100; i >>= 8)
size++;
var out = new Array(size);
for (var i = out.length - 1; i >= 0; i--) {
out[i] = num & 0xff;
num >>= 8;
}
if(out[0] & 0x80) {
out.unshift(0);
}
return this._createEncoderBuffer(new Buffer(out));

};
DERNode.prototype._encodeBool = function encodeBool(value) {
return this._createEncoderBuffer(value ? 0xff : 0);
};
DERNode.prototype._use = function use(entity, obj) {
if (typeof entity === 'function')
entity = entity(obj);
return entity._getEncoder('der').tree;
};
DERNode.prototype._skipDefault = function skipDefault(dataBuffer, reporter,
parent) {
var state = this._baseState;
var i;
if (state['default'] === null)
return false;
var data = dataBuffer.join();
if (state.defaultBuffer === undefined)
state.defaultBuffer = this._encodeValue(state['default'], reporter,
parent).join();
if (data.length !== state.defaultBuffer.length)
return false;
for (i=0; i < data.length; i++)
if (data[i] !== state.defaultBuffer[i])
return false;
return true;
};
// Utility methods
function encodeTag(tag, primitive, cls, reporter) {
var res;
if (tag === 'seqof')
tag = 'seq';
else if (tag === 'setof')
tag = 'set';
if (der.tagByName.hasOwnProperty(tag))
res = der.tagByName[tag];
else if (typeof tag === 'number' && (tag | 0) === tag)
res = tag;

else
return reporter.error('Unknown tag: ' + tag);
if (res >= 0x1f)
return reporter.error('Multi-octet tag encoding unsupported');
if (!primitive)
res |= 0x20;
res |= (der.tagClassByName[cls || 'universal'] << 6);
return res;
}
},{"../../asn1":1,"buffer":47,"inherits":95}],13:[function(require,module,
exports){
var encoders = exports;
encoders.der = require('./der');
encoders.pem = require('./pem');
},{"./der":12,"./pem":14}],14:[function(require,module,exports){
var inherits = require('inherits');
var DEREncoder = require('./der');
function PEMEncoder(entity) {
DEREncoder.call(this, entity);
this.enc = 'pem';
};
inherits(PEMEncoder, DEREncoder);
module.exports = PEMEncoder;
PEMEncoder.prototype.encode = function encode(data, options) {
var buf = DEREncoder.prototype.encode.call(this, data);
var p = buf.toString('base64');
var out = [ '-----BEGIN ' + options.label + '-----' ];
for (var i = 0; i < p.length; i += 64)
out.push(p.slice(i, i + 64));
out.push('-----END ' + options.label + '-----');
return out.join('\n');
};
},{"./der":12,"inherits":95}],15:[function(require,module,exports){
(function (global){
'use strict';

// compare and isBuffer taken from
https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a63159
28dd/index.js
// original notice:
/*!
* The buffer module from node.js, for the browser.
*
* @author Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
* @license MIT
*/
function compare(a, b) {
if (a === b) {
return 0;
}
var x = a.length;
var y = b.length;
for (var i = 0, len = Math.min(x, y); i < len; ++i) {
if (a[i] !== b[i]) {
x = a[i];
y = b[i];
break;
}
}
if (x < y) {
return -1;
}
if (y < x) {
return 1;
}
return 0;
}
function isBuffer(b) {
if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
return global.Buffer.isBuffer(b);
}
return !!(b != null && b._isBuffer);
}
// based on node assert, original notice:
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//

// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
return function foo() {}.name === 'foo';
}());
function pToString (obj) {
return Object.prototype.toString.call(obj);
}
function isView(arrbuf) {
if (isBuffer(arrbuf)) {
return false;
}
if (typeof global.ArrayBuffer !== 'function') {
return false;
}
if (typeof ArrayBuffer.isView === 'function') {
return ArrayBuffer.isView(arrbuf);
}
if (!arrbuf) {
return false;
}
if (arrbuf instanceof DataView) {
return true;
}
if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
return true;
}

return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.
var assert = module.exports = ok;
// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
// actual: actual,
// expected: expected })
var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on
https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b18
7d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
if (!util.isFunction(func)) {
return;
}
if (functionsHaveNames) {
return func.name;
}
var str = func.toString();
var match = str.match(regex);
return match && match[1];
}
assert.AssertionError = function AssertionError(options) {
this.name = 'AssertionError';
this.actual = options.actual;
this.expected = options.expected;
this.operator = options.operator;
if (options.message) {
this.message = options.message;
this.generatedMessage = false;
} else {
this.message = getMessage(this);
this.generatedMessage = true;
}
var stackStartFunction = options.stackStartFunction || fail;
if (Error.captureStackTrace) {
Error.captureStackTrace(this, stackStartFunction);
} else {
// non v8 browsers so we can have a stacktrace
var err = new Error();
if (err.stack) {
var out = err.stack;

// bit patterns are not identical.
} else if (isView(actual) && isView(expected) &&
pToString(actual) === pToString(expected) &&
!(actual instanceof Float32Array ||
actual instanceof Float64Array)) {
return compare(new Uint8Array(actual.buffer),
new Uint8Array(expected.buffer)) === 0;
// 7.5 For all other Object pairs, including Array objects, equivalence is
// determined by having the same number of owned properties (as verified
// with Object.prototype.hasOwnProperty.call), the same set of keys
// (although not necessarily the same order), equivalent values for every
// corresponding key, and an identical 'prototype' property. Note: this
// accounts for both named and indexed properties on Arrays.
} else if (isBuffer(actual) !== isBuffer(expected)) {
return false;
} else {
memos = memos || {actual: [], expected: []};
var actualIndex = memos.actual.indexOf(actual);
if (actualIndex !== -1) {
if (actualIndex === memos.expected.indexOf(expected)) {
return true;
}
}
memos.actual.push(actual);
memos.expected.push(expected);
return objEquiv(actual, expected, strict, memos);
}
}
function isArguments(object) {
return Object.prototype.toString.call(object) == '[object Arguments]';
}
function objEquiv(a, b, strict, actualVisitedObjects) {
if (a === null || a === undefined || b === null || b === undefined)
return false;
// if one is a primitive, the other must be same
if (util.isPrimitive(a) || util.isPrimitive(b))
return a === b;
if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
return false;
var aIsArgs = isArguments(a);
var bIsArgs = isArguments(b);
if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))

return false;
if (aIsArgs) {
a = pSlice.call(a);
b = pSlice.call(b);
return _deepEqual(a, b, strict);
}
var ka = objectKeys(a);
var kb = objectKeys(b);
var key, i;
// having the same number of owned properties (keys incorporates
// hasOwnProperty)
if (ka.length !== kb.length)
return false;
//the same set of keys (although not necessarily the same order),
ka.sort();
kb.sort();
//~~~cheap key test
for (i = ka.length - 1; i >= 0; i--) {
if (ka[i] !== kb[i])
return false;
}
//equivalent values for every corresponding key, and
//~~~possibly expensive deep test
for (i = ka.length - 1; i >= 0; i--) {
key = ka[i];
if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
return false;
}
return true;
}
// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
if (_deepEqual(actual, expected, false)) {
fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
}
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
if (_deepEqual(actual, expected, true)) {
fail(actual, expected, message, 'notDeepStrictEqual',
notDeepStrictEqual);
}
}

// 9. The strict equality assertion tests strict equality, as determined by
===.
// assert.strictEqual(actual, expected, message_opt);
assert.strictEqual = function strictEqual(actual, expected, message) {
if (actual !== expected) {
fail(actual, expected, message, '===', assert.strictEqual);
}
};
// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==. assert.notStrictEqual(actual, expected, message_opt);
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
if (actual === expected) {
fail(actual, expected, message, '!==', assert.notStrictEqual);
}
};
function expectedException(actual, expected) {
if (!actual || !expected) {
return false;
}
if (Object.prototype.toString.call(expected) == '[object RegExp]') {
return expected.test(actual);
}
try {
if (actual instanceof expected) {
return true;
}
} catch (e) {
// Ignore. The instanceof check doesn't work for arrow functions.
}
if (Error.isPrototypeOf(expected)) {
return false;
}
return expected.call({}, actual) === true;
}
function _tryBlock(block) {
var error;
try {
block();

} catch (e) {
error = e;
}
return error;
}
function _throws(shouldThrow, block, expected, message) {
var actual;
if (typeof block !== 'function') {
throw new TypeError('"block" argument must be a function');
}
if (typeof expected === 'string') {
message = expected;
expected = null;
}
actual = _tryBlock(block);
message = (expected && expected.name ? ' (' + expected.name + ').' : '.')
+
(message ? ' ' + message : '.');
if (shouldThrow && !actual) {
fail(actual, expected, 'Missing expected exception' + message);
}
var userProvidedMessage = typeof message === 'string';
var isUnwantedException = !shouldThrow && util.isError(actual);
var isUnexpectedException = !shouldThrow && actual && !expected;
if ((isUnwantedException &&
userProvidedMessage &&
expectedException(actual, expected)) ||
isUnexpectedException) {
fail(actual, expected, 'Got unwanted exception' + message);
}
if ((shouldThrow && actual && expected &&
!expectedException(actual, expected)) || (!shouldThrow && actual)) {
throw actual;
}
}
// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);

assert.throws = function(block, /*optional*/error, /*optional*/message) {
_throws(true, block, error, message);
};
// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error,
/*optional*/message) {
_throws(false, block, error, message);
};
assert.ifError = function(err) { if (err) throw err; };
var objectKeys = Object.keys || function (obj) {
var keys = [];
for (var key in obj) {
if (hasOwn.call(obj, key)) keys.push(key);
}
return keys;
};
}).call(this,typeof global !== "undefined" ? global : typeof self !==
"undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":148}],16:[function(require,module,exports){
'use strict'
exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray
var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
var code =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
lookup[i] = code[i]
revLookup[code.charCodeAt(i)] = i
}
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63
function placeHoldersCount (b64) {
var len = b64.length
if (len % 4 > 0) {
throw new Error('Invalid string. Length must be a multiple of 4')
}

// the number of equal signs (place holders)
// if there are two placeholders, than the two characters before it
// represent one byte
// if there is only one, then the three characters before it represent 2 bytes
// this is just a cheap hack to not do indexOf twice
return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}
function byteLength (b64) {
// base64 is 4/3 + up to two characters of the original data
return b64.length * 3 / 4 - placeHoldersCount(b64)
}
function toByteArray (b64) {
var i, j, l, tmp, placeHolders, arr
var len = b64.length
placeHolders = placeHoldersCount(b64)
arr = new Arr(len * 3 / 4 - placeHolders)
// if there are placeholders, only get up to the last complete 4 chars
l = placeHolders > 0 ? len - 4 : len
var L = 0
for (i = 0, j = 0; i < l; i += 4, j += 3) {
tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i
+ 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) |
revLookup[b64.charCodeAt(i + 3)]
arr[L++] = (tmp >> 16) & 0xFF
arr[L++] = (tmp >> 8) & 0xFF
arr[L++] = tmp & 0xFF
}
if (placeHolders === 2) {
tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i
+ 1)] >> 4)
arr[L++] = tmp & 0xFF
} else if (placeHolders === 1) {
tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i
+ 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
arr[L++] = (tmp >> 8) & 0xFF
arr[L++] = tmp & 0xFF
}
return arr
}

function tripletToBase64 (num) {
return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >>
6 & 0x3F] + lookup[num & 0x3F]
}
function encodeChunk (uint8, start, end) {
var tmp
var output = []
for (var i = start; i < end; i += 3) {
tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
output.push(tripletToBase64(tmp))
}
return output.join('')
}
function fromByteArray (uint8) {
var tmp
var len = uint8.length
var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
var output = ''
var parts = []
var maxChunkLength = 16383 // must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff
later
for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i
+ maxChunkLength)))
}
// pad the end with zeros, but make sure to not forget the extra bytes
if (extraBytes === 1) {
tmp = uint8[len - 1]
output += lookup[tmp >> 2]
output += lookup[(tmp << 4) & 0x3F]
output += '=='
} else if (extraBytes === 2) {
tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
output += lookup[tmp >> 10]
output += lookup[(tmp >> 4) & 0x3F]
output += lookup[(tmp << 2) & 0x3F]
output += '='
}
parts.push(output)
return parts.join('')

}
},{}],17:[function(require,module,exports){
(function (module, exports) {
'use strict';
// Utils
function assert (val, msg) {
if (!val) throw new Error(msg || 'Assertion failed');
}
// Could use `inherits` module, but don't want to move from single file
// architecture yet.
function inherits (ctor, superCtor) {
ctor.super_ = superCtor;
var TempCtor = function () {};
TempCtor.prototype = superCtor.prototype;
ctor.prototype = new TempCtor();
ctor.prototype.constructor = ctor;
}
// BN
function BN (number, base, endian) {
if (BN.isBN(number)) {
return number;
}
this.negative = 0;
this.words = null;
this.length = 0;
// Reduction context
this.red = null;
if (number !== null) {
if (base === 'le' || base === 'be') {
endian = base;
base = 10;
}
this._init(number || 0, base || 10, endian || 'be');
}
}
if (typeof module === 'object') {
module.exports = BN;
} else {
exports.BN = BN;

}
BN.BN = BN;
BN.wordSize = 26;
var Buffer;
try {
Buffer = require('buf' + 'fer').Buffer;
} catch (e) {
}
BN.isBN = function isBN (num) {
if (num instanceof BN) {
return true;
}
return num !== null && typeof num === 'object' &&
num.constructor.wordSize === BN.wordSize && Array.isArray(num.words);
};
BN.max = function max (left, right) {
if (left.cmp(right) > 0) return left;
return right;
};
BN.min = function min (left, right) {
if (left.cmp(right) < 0) return left;
return right;
};
BN.prototype._init = function init (number, base, endian) {
if (typeof number === 'number') {
return this._initNumber(number, base, endian);
}
if (typeof number === 'object') {
return this._initArray(number, base, endian);
}
if (base === 'hex') {
base = 16;
}
assert(base === (base | 0) && base >= 2 && base <= 36);
number = number.toString().replace(/\s+/g, '');
var start = 0;
if (number[0] === '-') {
start++;

}
if (base === 16) {
this._parseHex(number, start);
} else {
this._parseBase(number, base, start);
}
if (number[0] === '-') {
this.negative = 1;
}
this.strip();
if (endian !== 'le') return;
this._initArray(this.toArray(), base, endian);
};
BN.prototype._initNumber = function _initNumber (number, base, endian) {
if (number < 0) {
this.negative = 1;
number = -number;
}
if (number < 0x4000000) {
this.words = [ number & 0x3ffffff ];
this.length = 1;
} else if (number < 0x10000000000000) {
this.words = [
number & 0x3ffffff,
(number / 0x4000000) & 0x3ffffff
];
this.length = 2;
} else {
assert(number < 0x20000000000000); // 2 ^ 53 (unsafe)
this.words = [
number & 0x3ffffff,
(number / 0x4000000) & 0x3ffffff,
1
];
this.length = 3;
}
if (endian !== 'le') return;
// Reverse the bytes
this._initArray(this.toArray(), base, endian);
};

BN.prototype._initArray = function _initArray (number, base, endian) {
// Perhaps a Uint8Array
assert(typeof number.length === 'number');
if (number.length <= 0) {
this.words = [ 0 ];
this.length = 1;
return this;
}
this.length = Math.ceil(number.length / 3);
this.words = new Array(this.length);
for (var i = 0; i < this.length; i++) {
this.words[i] = 0;
}
var j, w;
var off = 0;
if (endian === 'be') {
for (i = number.length - 1, j = 0; i >= 0; i -= 3) {
w = number[i] | (number[i - 1] << 8) | (number[i - 2] << 16);
this.words[j] |= (w << off) & 0x3ffffff;
this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
off += 24;
if (off >= 26) {
off -= 26;
j++;
}
}
} else if (endian === 'le') {
for (i = 0, j = 0; i < number.length; i += 3) {
w = number[i] | (number[i + 1] << 8) | (number[i + 2] << 16);
this.words[j] |= (w << off) & 0x3ffffff;
this.words[j + 1] = (w >>> (26 - off)) & 0x3ffffff;
off += 24;
if (off >= 26) {
off -= 26;
j++;
}
}
}
return this.strip();
};
function parseHex (str, start, end) {
var r = 0;
var len = Math.min(str.length, end);
for (var i = start; i < len; i++) {

var c = str.charCodeAt(i) - 48;
r <<= 4;
// 'a' - 'f'
if (c >= 49 && c <= 54) {
r |= c - 49 + 0xa;
// 'A' - 'F'
} else if (c >= 17 && c <= 22) {
r |= c - 17 + 0xa;
// '0' - '9'
} else {
r |= c & 0xf;
}
}
return r;
}
BN.prototype._parseHex = function _parseHex (number, start) {
// Create possibly bigger array to ensure that it fits the number
this.length = Math.ceil((number.length - start) / 6);
this.words = new Array(this.length);
for (var i = 0; i < this.length; i++) {
this.words[i] = 0;
}
var j, w;
// Scan 24-bit chunks and add them to the number
var off = 0;
for (i = number.length - 6, j = 0; i >= start; i -= 6) {
w = parseHex(number, i, i + 6);
this.words[j] |= (w << off) & 0x3ffffff;
// NOTE: `0x3fffff` is intentional here, 26bits max shift + 24bit hex
limb
this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
off += 24;
if (off >= 26) {
off -= 26;
j++;
}
}
if (i + 6 !== start) {
w = parseHex(number, start, i + 6);
this.words[j] |= (w << off) & 0x3ffffff;
this.words[j + 1] |= w >>> (26 - off) & 0x3fffff;
}

};
// And `num` with `this` in-place
BN.prototype.iuand = function iuand (num) {
// b = min-length(num, this)
var b;
if (this.length > num.length) {
b = num;
} else {
b = this;
}
for (var i = 0; i < b.length; i++) {
this.words[i] = this.words[i] & num.words[i];
}
this.length = b.length;
return this.strip();
};
BN.prototype.iand = function iand (num) {
assert((this.negative | num.negative) === 0);
return this.iuand(num);
};
// And `num` with `this`
BN.prototype.and = function and (num) {
if (this.length > num.length) return this.clone().iand(num);
return num.clone().iand(this);
};
BN.prototype.uand = function uand (num) {
if (this.length > num.length) return this.clone().iuand(num);
return num.clone().iuand(this);
};
// Xor `num` with `this` in-place
BN.prototype.iuxor = function iuxor (num) {
// a.length > b.length
var a;
var b;
if (this.length > num.length) {
a = this;
b = num;
} else {
a = num;
b = this;

}
for (var i = 0; i < b.length; i++) {
this.words[i] = a.words[i] ^ b.words[i];
}
if (this !== a) {
for (; i < a.length; i++) {
this.words[i] = a.words[i];
}
}
this.length = a.length;
return this.strip();
};
BN.prototype.ixor = function ixor (num) {
assert((this.negative | num.negative) === 0);
return this.iuxor(num);
};
// Xor `num` with `this`
BN.prototype.xor = function xor (num) {
if (this.length > num.length) return this.clone().ixor(num);
return num.clone().ixor(this);
};
BN.prototype.uxor = function uxor (num) {
if (this.length > num.length) return this.clone().iuxor(num);
return num.clone().iuxor(this);
};
// Not ``this`` with ``width`` bitwidth
BN.prototype.inotn = function inotn (width) {
assert(typeof width === 'number' && width >= 0);
var bytesNeeded = Math.ceil(width / 26) | 0;
var bitsLeft = width % 26;
// Extend the buffer with leading zeroes
this._expand(bytesNeeded);
if (bitsLeft > 0) {
bytesNeeded--;
}
// Handle complete words

for (var i = 0; i < bytesNeeded; i++) {
this.words[i] = ~this.words[i] & 0x3ffffff;
}
// Handle the residue
if (bitsLeft > 0) {
this.words[i] = ~this.words[i] & (0x3ffffff >> (26 - bitsLeft));
}
// And remove leading zeroes
return this.strip();
};
BN.prototype.notn = function notn (width) {
return this.clone().inotn(width);
};
// Set `bit` of `this`
BN.prototype.setn = function setn (bit, val) {
assert(typeof bit === 'number' && bit >= 0);
var off = (bit / 26) | 0;
var wbit = bit % 26;
this._expand(off + 1);
if (val) {
this.words[off] = this.words[off] | (1 << wbit);
} else {
this.words[off] = this.words[off] & ~(1 << wbit);
}
return this.strip();
};
// Add `num` to `this` in-place
BN.prototype.iadd = function iadd (num) {
var r;
// negative + positive
if (this.negative !== 0 && num.negative === 0) {
this.negative = 0;
r = this.isub(num);
this.negative ^= 1;
return this._normSign();
// positive + negative
} else if (this.negative === 0 && num.negative !== 0) {

num.negative = 0;
r = this.isub(num);
num.negative = 1;
return r._normSign();
}
// a.length > b.length
var a, b;
if (this.length > num.length) {
a = this;
b = num;
} else {
a = num;
b = this;
}
var carry = 0;
for (var i = 0; i < b.length; i++) {
r = (a.words[i] | 0) + (b.words[i] | 0) + carry;
this.words[i] = r & 0x3ffffff;
carry = r >>> 26;
}
for (; carry !== 0 && i < a.length; i++) {
r = (a.words[i] | 0) + carry;
this.words[i] = r & 0x3ffffff;
carry = r >>> 26;
}
this.length = a.length;
if (carry !== 0) {
this.words[this.length] = carry;
this.length++;
// Copy the rest of the words
} else if (a !== this) {
for (; i < a.length; i++) {
this.words[i] = a.words[i];
}
}
return this;
};
// Add `num` to `this`
BN.prototype.add = function add (num) {
var res;
if (num.negative !== 0 && this.negative === 0) {
num.negative = 0;
res = this.sub(num);

num.negative ^= 1;
return res;
} else if (num.negative === 0 && this.negative !== 0) {
this.negative = 0;
res = num.sub(this);
this.negative = 1;
return res;
}
if (this.length > num.length) return this.clone().iadd(num);
return num.clone().iadd(this);
};
// Subtract `num` from `this` in-place
BN.prototype.isub = function isub (num) {
// this - (-num) = this + num
if (num.negative !== 0) {
num.negative = 0;
var r = this.iadd(num);
num.negative = 1;
return r._normSign();
// -this - num = -(this + num)
} else if (this.negative !== 0) {
this.negative = 0;
this.iadd(num);
this.negative = 1;
return this._normSign();
}
// At this point both numbers are positive
var cmp = this.cmp(num);
// Optimization - zeroify
if (cmp === 0) {
this.negative = 0;
this.length = 1;
this.words[0] = 0;
return this;
}
// a > b
var a, b;
if (cmp > 0) {
a = this;
b = num;
} else {

a = num;
b = this;
}
var carry = 0;
for (var i = 0; i < b.length; i++) {
r = (a.words[i] | 0) - (b.words[i] | 0) + carry;
carry = r >> 26;
this.words[i] = r & 0x3ffffff;
}
for (; carry !== 0 && i < a.length; i++) {
r = (a.words[i] | 0) + carry;
carry = r >> 26;
this.words[i] = r & 0x3ffffff;
}
// Copy rest of the words
if (carry === 0 && i < a.length && a !== this) {
for (; i < a.length; i++) {
this.words[i] = a.words[i];
}
}
this.length = Math.max(this.length, i);
if (a !== this) {
this.negative = 1;
}
return this.strip();
};
// Subtract `num` from `this`
BN.prototype.sub = function sub (num) {
return this.clone().isub(num);
};
function smallMulTo (self, num, out) {
out.negative = num.negative ^ self.negative;
var len = (self.length + num.length) | 0;
out.length = len;
len = (len - 1) | 0;
// Peel one iteration (compiler can't do it, because of code complexity)
var a = self.words[0] | 0;
var b = num.words[0] | 0;
var r = a * b;

var lo = r & 0x3ffffff;
var carry = (r / 0x4000000) | 0;
out.words[0] = lo;
for (var k = 1; k < len; k++) {
// Sum all words with the same `i + j = k` and accumulate `ncarry`,
// note that ncarry could be >= 0x3ffffff
var ncarry = carry >>> 26;
var rword = carry & 0x3ffffff;
var maxJ = Math.min(k, num.length - 1);
for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
var i = (k - j) | 0;
a = self.words[i] | 0;
b = num.words[j] | 0;
r = a * b + rword;
ncarry += (r / 0x4000000) | 0;
rword = r & 0x3ffffff;
}
out.words[k] = rword | 0;
carry = ncarry | 0;
}
if (carry !== 0) {
out.words[k] = carry | 0;
} else {
out.length--;
}
return out.strip();
}
// TODO(indutny): it may be reasonable to omit it for users who don't need
// to work with 256-bit numbers, otherwise it gives 20% improvement for
256-bit
// multiplication (like elliptic secp256k1).
var comb10MulTo = function comb10MulTo (self, num, out) {
var a = self.words;
var b = num.words;
var o = out.words;
var c = 0;
var lo;
var mid;
var hi;
var a0 = a[0] | 0;
var al0 = a0 & 0x1fff;
var ah0 = a0 >>> 13;
var a1 = a[1] | 0;
var al1 = a1 & 0x1fff;
var ah1 = a1 >>> 13;

var a2 = a[2] | 0;
var al2 = a2 & 0x1fff;
var ah2 = a2 >>> 13;
var a3 = a[3] | 0;
var al3 = a3 & 0x1fff;
var ah3 = a3 >>> 13;
var a4 = a[4] | 0;
var al4 = a4 & 0x1fff;
var ah4 = a4 >>> 13;
var a5 = a[5] | 0;
var al5 = a5 & 0x1fff;
var ah5 = a5 >>> 13;
var a6 = a[6] | 0;
var al6 = a6 & 0x1fff;
var ah6 = a6 >>> 13;
var a7 = a[7] | 0;
var al7 = a7 & 0x1fff;
var ah7 = a7 >>> 13;
var a8 = a[8] | 0;
var al8 = a8 & 0x1fff;
var ah8 = a8 >>> 13;
var a9 = a[9] | 0;
var al9 = a9 & 0x1fff;
var ah9 = a9 >>> 13;
var b0 = b[0] | 0;
var bl0 = b0 & 0x1fff;
var bh0 = b0 >>> 13;
var b1 = b[1] | 0;
var bl1 = b1 & 0x1fff;
var bh1 = b1 >>> 13;
var b2 = b[2] | 0;
var bl2 = b2 & 0x1fff;
var bh2 = b2 >>> 13;
var b3 = b[3] | 0;
var bl3 = b3 & 0x1fff;
var bh3 = b3 >>> 13;
var b4 = b[4] | 0;
var bl4 = b4 & 0x1fff;
var bh4 = b4 >>> 13;
var b5 = b[5] | 0;
var bl5 = b5 & 0x1fff;
var bh5 = b5 >>> 13;
var b6 = b[6] | 0;
var bl6 = b6 & 0x1fff;
var bh6 = b6 >>> 13;
var b7 = b[7] | 0;
var bl7 = b7 & 0x1fff;
var bh7 = b7 >>> 13;

var b8 = b[8] | 0;
var bl8 = b8 & 0x1fff;
var bh8 = b8 >>> 13;
var b9 = b[9] | 0;
var bl9 = b9 & 0x1fff;
var bh9 = b9 >>> 13;
out.negative = self.negative ^ num.negative;
out.length = 19;
/* k = 0 */
lo = Math.imul(al0, bl0);
mid = Math.imul(al0, bh0);
mid = (mid + Math.imul(ah0, bl0)) | 0;
hi = Math.imul(ah0, bh0);
var w0 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w0 >>> 26)) | 0;
w0 &= 0x3ffffff;
/* k = 1 */
lo = Math.imul(al1, bl0);
mid = Math.imul(al1, bh0);
mid = (mid + Math.imul(ah1, bl0)) | 0;
hi = Math.imul(ah1, bh0);
lo = (lo + Math.imul(al0, bl1)) | 0;
mid = (mid + Math.imul(al0, bh1)) | 0;
mid = (mid + Math.imul(ah0, bl1)) | 0;
hi = (hi + Math.imul(ah0, bh1)) | 0;
var w1 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w1 >>> 26)) | 0;
w1 &= 0x3ffffff;
/* k = 2 */
lo = Math.imul(al2, bl0);
mid = Math.imul(al2, bh0);
mid = (mid + Math.imul(ah2, bl0)) | 0;
hi = Math.imul(ah2, bh0);
lo = (lo + Math.imul(al1, bl1)) | 0;
mid = (mid + Math.imul(al1, bh1)) | 0;
mid = (mid + Math.imul(ah1, bl1)) | 0;
hi = (hi + Math.imul(ah1, bh1)) | 0;
lo = (lo + Math.imul(al0, bl2)) | 0;
mid = (mid + Math.imul(al0, bh2)) | 0;
mid = (mid + Math.imul(ah0, bl2)) | 0;
hi = (hi + Math.imul(ah0, bh2)) | 0;
var w2 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w2 >>> 26)) | 0;
w2 &= 0x3ffffff;
/* k = 3 */
lo = Math.imul(al3, bl0);
mid = Math.imul(al3, bh0);

mid = (mid + Math.imul(ah3, bl0)) | 0;
hi = Math.imul(ah3, bh0);
lo = (lo + Math.imul(al2, bl1)) | 0;
mid = (mid + Math.imul(al2, bh1)) | 0;
mid = (mid + Math.imul(ah2, bl1)) | 0;
hi = (hi + Math.imul(ah2, bh1)) | 0;
lo = (lo + Math.imul(al1, bl2)) | 0;
mid = (mid + Math.imul(al1, bh2)) | 0;
mid = (mid + Math.imul(ah1, bl2)) | 0;
hi = (hi + Math.imul(ah1, bh2)) | 0;
lo = (lo + Math.imul(al0, bl3)) | 0;
mid = (mid + Math.imul(al0, bh3)) | 0;
mid = (mid + Math.imul(ah0, bl3)) | 0;
hi = (hi + Math.imul(ah0, bh3)) | 0;
var w3 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w3 >>> 26)) | 0;
w3 &= 0x3ffffff;
/* k = 4 */
lo = Math.imul(al4, bl0);
mid = Math.imul(al4, bh0);
mid = (mid + Math.imul(ah4, bl0)) | 0;
hi = Math.imul(ah4, bh0);
lo = (lo + Math.imul(al3, bl1)) | 0;
mid = (mid + Math.imul(al3, bh1)) | 0;
mid = (mid + Math.imul(ah3, bl1)) | 0;
hi = (hi + Math.imul(ah3, bh1)) | 0;
lo = (lo + Math.imul(al2, bl2)) | 0;
mid = (mid + Math.imul(al2, bh2)) | 0;
mid = (mid + Math.imul(ah2, bl2)) | 0;
hi = (hi + Math.imul(ah2, bh2)) | 0;
lo = (lo + Math.imul(al1, bl3)) | 0;
mid = (mid + Math.imul(al1, bh3)) | 0;
mid = (mid + Math.imul(ah1, bl3)) | 0;
hi = (hi + Math.imul(ah1, bh3)) | 0;
lo = (lo + Math.imul(al0, bl4)) | 0;
mid = (mid + Math.imul(al0, bh4)) | 0;
mid = (mid + Math.imul(ah0, bl4)) | 0;
hi = (hi + Math.imul(ah0, bh4)) | 0;
var w4 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w4 >>> 26)) | 0;
w4 &= 0x3ffffff;
/* k = 5 */
lo = Math.imul(al5, bl0);
mid = Math.imul(al5, bh0);
mid = (mid + Math.imul(ah5, bl0)) | 0;
hi = Math.imul(ah5, bh0);
lo = (lo + Math.imul(al4, bl1)) | 0;
mid = (mid + Math.imul(al4, bh1)) | 0;

mid = (mid + Math.imul(ah4, bl1)) | 0;
hi = (hi + Math.imul(ah4, bh1)) | 0;
lo = (lo + Math.imul(al3, bl2)) | 0;
mid = (mid + Math.imul(al3, bh2)) | 0;
mid = (mid + Math.imul(ah3, bl2)) | 0;
hi = (hi + Math.imul(ah3, bh2)) | 0;
lo = (lo + Math.imul(al2, bl3)) | 0;
mid = (mid + Math.imul(al2, bh3)) | 0;
mid = (mid + Math.imul(ah2, bl3)) | 0;
hi = (hi + Math.imul(ah2, bh3)) | 0;
lo = (lo + Math.imul(al1, bl4)) | 0;
mid = (mid + Math.imul(al1, bh4)) | 0;
mid = (mid + Math.imul(ah1, bl4)) | 0;
hi = (hi + Math.imul(ah1, bh4)) | 0;
lo = (lo + Math.imul(al0, bl5)) | 0;
mid = (mid + Math.imul(al0, bh5)) | 0;
mid = (mid + Math.imul(ah0, bl5)) | 0;
hi = (hi + Math.imul(ah0, bh5)) | 0;
var w5 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w5 >>> 26)) | 0;
w5 &= 0x3ffffff;
/* k = 6 */
lo = Math.imul(al6, bl0);
mid = Math.imul(al6, bh0);
mid = (mid + Math.imul(ah6, bl0)) | 0;
hi = Math.imul(ah6, bh0);
lo = (lo + Math.imul(al5, bl1)) | 0;
mid = (mid + Math.imul(al5, bh1)) | 0;
mid = (mid + Math.imul(ah5, bl1)) | 0;
hi = (hi + Math.imul(ah5, bh1)) | 0;
lo = (lo + Math.imul(al4, bl2)) | 0;
mid = (mid + Math.imul(al4, bh2)) | 0;
mid = (mid + Math.imul(ah4, bl2)) | 0;
hi = (hi + Math.imul(ah4, bh2)) | 0;
lo = (lo + Math.imul(al3, bl3)) | 0;
mid = (mid + Math.imul(al3, bh3)) | 0;
mid = (mid + Math.imul(ah3, bl3)) | 0;
hi = (hi + Math.imul(ah3, bh3)) | 0;
lo = (lo + Math.imul(al2, bl4)) | 0;
mid = (mid + Math.imul(al2, bh4)) | 0;
mid = (mid + Math.imul(ah2, bl4)) | 0;
hi = (hi + Math.imul(ah2, bh4)) | 0;
lo = (lo + Math.imul(al1, bl5)) | 0;
mid = (mid + Math.imul(al1, bh5)) | 0;
mid = (mid + Math.imul(ah1, bl5)) | 0;
hi = (hi + Math.imul(ah1, bh5)) | 0;
lo = (lo + Math.imul(al0, bl6)) | 0;
mid = (mid + Math.imul(al0, bh6)) | 0;

mid = (mid + Math.imul(ah0, bl6)) | 0;
hi = (hi + Math.imul(ah0, bh6)) | 0;
var w6 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w6 >>> 26)) | 0;
w6 &= 0x3ffffff;
/* k = 7 */
lo = Math.imul(al7, bl0);
mid = Math.imul(al7, bh0);
mid = (mid + Math.imul(ah7, bl0)) | 0;
hi = Math.imul(ah7, bh0);
lo = (lo + Math.imul(al6, bl1)) | 0;
mid = (mid + Math.imul(al6, bh1)) | 0;
mid = (mid + Math.imul(ah6, bl1)) | 0;
hi = (hi + Math.imul(ah6, bh1)) | 0;
lo = (lo + Math.imul(al5, bl2)) | 0;
mid = (mid + Math.imul(al5, bh2)) | 0;
mid = (mid + Math.imul(ah5, bl2)) | 0;
hi = (hi + Math.imul(ah5, bh2)) | 0;
lo = (lo + Math.imul(al4, bl3)) | 0;
mid = (mid + Math.imul(al4, bh3)) | 0;
mid = (mid + Math.imul(ah4, bl3)) | 0;
hi = (hi + Math.imul(ah4, bh3)) | 0;
lo = (lo + Math.imul(al3, bl4)) | 0;
mid = (mid + Math.imul(al3, bh4)) | 0;
mid = (mid + Math.imul(ah3, bl4)) | 0;
hi = (hi + Math.imul(ah3, bh4)) | 0;
lo = (lo + Math.imul(al2, bl5)) | 0;
mid = (mid + Math.imul(al2, bh5)) | 0;
mid = (mid + Math.imul(ah2, bl5)) | 0;
hi = (hi + Math.imul(ah2, bh5)) | 0;
lo = (lo + Math.imul(al1, bl6)) | 0;
mid = (mid + Math.imul(al1, bh6)) | 0;
mid = (mid + Math.imul(ah1, bl6)) | 0;
hi = (hi + Math.imul(ah1, bh6)) | 0;
lo = (lo + Math.imul(al0, bl7)) | 0;
mid = (mid + Math.imul(al0, bh7)) | 0;
mid = (mid + Math.imul(ah0, bl7)) | 0;
hi = (hi + Math.imul(ah0, bh7)) | 0;
var w7 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w7 >>> 26)) | 0;
w7 &= 0x3ffffff;
/* k = 8 */
lo = Math.imul(al8, bl0);
mid = Math.imul(al8, bh0);
mid = (mid + Math.imul(ah8, bl0)) | 0;
hi = Math.imul(ah8, bh0);
lo = (lo + Math.imul(al7, bl1)) | 0;
mid = (mid + Math.imul(al7, bh1)) | 0;

mid = (mid + Math.imul(ah7, bl1)) | 0;
hi = (hi + Math.imul(ah7, bh1)) | 0;
lo = (lo + Math.imul(al6, bl2)) | 0;
mid = (mid + Math.imul(al6, bh2)) | 0;
mid = (mid + Math.imul(ah6, bl2)) | 0;
hi = (hi + Math.imul(ah6, bh2)) | 0;
lo = (lo + Math.imul(al5, bl3)) | 0;
mid = (mid + Math.imul(al5, bh3)) | 0;
mid = (mid + Math.imul(ah5, bl3)) | 0;
hi = (hi + Math.imul(ah5, bh3)) | 0;
lo = (lo + Math.imul(al4, bl4)) | 0;
mid = (mid + Math.imul(al4, bh4)) | 0;
mid = (mid + Math.imul(ah4, bl4)) | 0;
hi = (hi + Math.imul(ah4, bh4)) | 0;
lo = (lo + Math.imul(al3, bl5)) | 0;
mid = (mid + Math.imul(al3, bh5)) | 0;
mid = (mid + Math.imul(ah3, bl5)) | 0;
hi = (hi + Math.imul(ah3, bh5)) | 0;
lo = (lo + Math.imul(al2, bl6)) | 0;
mid = (mid + Math.imul(al2, bh6)) | 0;
mid = (mid + Math.imul(ah2, bl6)) | 0;
hi = (hi + Math.imul(ah2, bh6)) | 0;
lo = (lo + Math.imul(al1, bl7)) | 0;
mid = (mid + Math.imul(al1, bh7)) | 0;
mid = (mid + Math.imul(ah1, bl7)) | 0;
hi = (hi + Math.imul(ah1, bh7)) | 0;
lo = (lo + Math.imul(al0, bl8)) | 0;
mid = (mid + Math.imul(al0, bh8)) | 0;
mid = (mid + Math.imul(ah0, bl8)) | 0;
hi = (hi + Math.imul(ah0, bh8)) | 0;
var w8 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w8 >>> 26)) | 0;
w8 &= 0x3ffffff;
/* k = 9 */
lo = Math.imul(al9, bl0);
mid = Math.imul(al9, bh0);
mid = (mid + Math.imul(ah9, bl0)) | 0;
hi = Math.imul(ah9, bh0);
lo = (lo + Math.imul(al8, bl1)) | 0;
mid = (mid + Math.imul(al8, bh1)) | 0;
mid = (mid + Math.imul(ah8, bl1)) | 0;
hi = (hi + Math.imul(ah8, bh1)) | 0;
lo = (lo + Math.imul(al7, bl2)) | 0;
mid = (mid + Math.imul(al7, bh2)) | 0;
mid = (mid + Math.imul(ah7, bl2)) | 0;
hi = (hi + Math.imul(ah7, bh2)) | 0;
lo = (lo + Math.imul(al6, bl3)) | 0;
mid = (mid + Math.imul(al6, bh3)) | 0;

mid = (mid + Math.imul(ah6, bl3)) | 0;
hi = (hi + Math.imul(ah6, bh3)) | 0;
lo = (lo + Math.imul(al5, bl4)) | 0;
mid = (mid + Math.imul(al5, bh4)) | 0;
mid = (mid + Math.imul(ah5, bl4)) | 0;
hi = (hi + Math.imul(ah5, bh4)) | 0;
lo = (lo + Math.imul(al4, bl5)) | 0;
mid = (mid + Math.imul(al4, bh5)) | 0;
mid = (mid + Math.imul(ah4, bl5)) | 0;
hi = (hi + Math.imul(ah4, bh5)) | 0;
lo = (lo + Math.imul(al3, bl6)) | 0;
mid = (mid + Math.imul(al3, bh6)) | 0;
mid = (mid + Math.imul(ah3, bl6)) | 0;
hi = (hi + Math.imul(ah3, bh6)) | 0;
lo = (lo + Math.imul(al2, bl7)) | 0;
mid = (mid + Math.imul(al2, bh7)) | 0;
mid = (mid + Math.imul(ah2, bl7)) | 0;
hi = (hi + Math.imul(ah2, bh7)) | 0;
lo = (lo + Math.imul(al1, bl8)) | 0;
mid = (mid + Math.imul(al1, bh8)) | 0;
mid = (mid + Math.imul(ah1, bl8)) | 0;
hi = (hi + Math.imul(ah1, bh8)) | 0;
lo = (lo + Math.imul(al0, bl9)) | 0;
mid = (mid + Math.imul(al0, bh9)) | 0;
mid = (mid + Math.imul(ah0, bl9)) | 0;
hi = (hi + Math.imul(ah0, bh9)) | 0;
var w9 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w9 >>> 26)) | 0;
w9 &= 0x3ffffff;
/* k = 10 */
lo = Math.imul(al9, bl1);
mid = Math.imul(al9, bh1);
mid = (mid + Math.imul(ah9, bl1)) | 0;
hi = Math.imul(ah9, bh1);
lo = (lo + Math.imul(al8, bl2)) | 0;
mid = (mid + Math.imul(al8, bh2)) | 0;
mid = (mid + Math.imul(ah8, bl2)) | 0;
hi = (hi + Math.imul(ah8, bh2)) | 0;
lo = (lo + Math.imul(al7, bl3)) | 0;
mid = (mid + Math.imul(al7, bh3)) | 0;
mid = (mid + Math.imul(ah7, bl3)) | 0;
hi = (hi + Math.imul(ah7, bh3)) | 0;
lo = (lo + Math.imul(al6, bl4)) | 0;
mid = (mid + Math.imul(al6, bh4)) | 0;
mid = (mid + Math.imul(ah6, bl4)) | 0;
hi = (hi + Math.imul(ah6, bh4)) | 0;
lo = (lo + Math.imul(al5, bl5)) | 0;
mid = (mid + Math.imul(al5, bh5)) | 0;

mid = (mid + Math.imul(ah5, bl5)) | 0;
hi = (hi + Math.imul(ah5, bh5)) | 0;
lo = (lo + Math.imul(al4, bl6)) | 0;
mid = (mid + Math.imul(al4, bh6)) | 0;
mid = (mid + Math.imul(ah4, bl6)) | 0;
hi = (hi + Math.imul(ah4, bh6)) | 0;
lo = (lo + Math.imul(al3, bl7)) | 0;
mid = (mid + Math.imul(al3, bh7)) | 0;
mid = (mid + Math.imul(ah3, bl7)) | 0;
hi = (hi + Math.imul(ah3, bh7)) | 0;
lo = (lo + Math.imul(al2, bl8)) | 0;
mid = (mid + Math.imul(al2, bh8)) | 0;
mid = (mid + Math.imul(ah2, bl8)) | 0;
hi = (hi + Math.imul(ah2, bh8)) | 0;
lo = (lo + Math.imul(al1, bl9)) | 0;
mid = (mid + Math.imul(al1, bh9)) | 0;
mid = (mid + Math.imul(ah1, bl9)) | 0;
hi = (hi + Math.imul(ah1, bh9)) | 0;
var w10 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w10 >>> 26)) | 0;
w10 &= 0x3ffffff;
/* k = 11 */
lo = Math.imul(al9, bl2);
mid = Math.imul(al9, bh2);
mid = (mid + Math.imul(ah9, bl2)) | 0;
hi = Math.imul(ah9, bh2);
lo = (lo + Math.imul(al8, bl3)) | 0;
mid = (mid + Math.imul(al8, bh3)) | 0;
mid = (mid + Math.imul(ah8, bl3)) | 0;
hi = (hi + Math.imul(ah8, bh3)) | 0;
lo = (lo + Math.imul(al7, bl4)) | 0;
mid = (mid + Math.imul(al7, bh4)) | 0;
mid = (mid + Math.imul(ah7, bl4)) | 0;
hi = (hi + Math.imul(ah7, bh4)) | 0;
lo = (lo + Math.imul(al6, bl5)) | 0;
mid = (mid + Math.imul(al6, bh5)) | 0;
mid = (mid + Math.imul(ah6, bl5)) | 0;
hi = (hi + Math.imul(ah6, bh5)) | 0;
lo = (lo + Math.imul(al5, bl6)) | 0;
mid = (mid + Math.imul(al5, bh6)) | 0;
mid = (mid + Math.imul(ah5, bl6)) | 0;
hi = (hi + Math.imul(ah5, bh6)) | 0;
lo = (lo + Math.imul(al4, bl7)) | 0;
mid = (mid + Math.imul(al4, bh7)) | 0;
mid = (mid + Math.imul(ah4, bl7)) | 0;
hi = (hi + Math.imul(ah4, bh7)) | 0;
lo = (lo + Math.imul(al3, bl8)) | 0;
mid = (mid + Math.imul(al3, bh8)) | 0;

mid = (mid + Math.imul(ah3, bl8)) | 0;
hi = (hi + Math.imul(ah3, bh8)) | 0;
lo = (lo + Math.imul(al2, bl9)) | 0;
mid = (mid + Math.imul(al2, bh9)) | 0;
mid = (mid + Math.imul(ah2, bl9)) | 0;
hi = (hi + Math.imul(ah2, bh9)) | 0;
var w11 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w11 >>> 26)) | 0;
w11 &= 0x3ffffff;
/* k = 12 */
lo = Math.imul(al9, bl3);
mid = Math.imul(al9, bh3);
mid = (mid + Math.imul(ah9, bl3)) | 0;
hi = Math.imul(ah9, bh3);
lo = (lo + Math.imul(al8, bl4)) | 0;
mid = (mid + Math.imul(al8, bh4)) | 0;
mid = (mid + Math.imul(ah8, bl4)) | 0;
hi = (hi + Math.imul(ah8, bh4)) | 0;
lo = (lo + Math.imul(al7, bl5)) | 0;
mid = (mid + Math.imul(al7, bh5)) | 0;
mid = (mid + Math.imul(ah7, bl5)) | 0;
hi = (hi + Math.imul(ah7, bh5)) | 0;
lo = (lo + Math.imul(al6, bl6)) | 0;
mid = (mid + Math.imul(al6, bh6)) | 0;
mid = (mid + Math.imul(ah6, bl6)) | 0;
hi = (hi + Math.imul(ah6, bh6)) | 0;
lo = (lo + Math.imul(al5, bl7)) | 0;
mid = (mid + Math.imul(al5, bh7)) | 0;
mid = (mid + Math.imul(ah5, bl7)) | 0;
hi = (hi + Math.imul(ah5, bh7)) | 0;
lo = (lo + Math.imul(al4, bl8)) | 0;
mid = (mid + Math.imul(al4, bh8)) | 0;
mid = (mid + Math.imul(ah4, bl8)) | 0;
hi = (hi + Math.imul(ah4, bh8)) | 0;
lo = (lo + Math.imul(al3, bl9)) | 0;
mid = (mid + Math.imul(al3, bh9)) | 0;
mid = (mid + Math.imul(ah3, bl9)) | 0;
hi = (hi + Math.imul(ah3, bh9)) | 0;
var w12 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w12 >>> 26)) | 0;
w12 &= 0x3ffffff;
/* k = 13 */
lo = Math.imul(al9, bl4);
mid = Math.imul(al9, bh4);
mid = (mid + Math.imul(ah9, bl4)) | 0;
hi = Math.imul(ah9, bh4);
lo = (lo + Math.imul(al8, bl5)) | 0;
mid = (mid + Math.imul(al8, bh5)) | 0;

mid = (mid + Math.imul(ah8, bl5)) | 0;
hi = (hi + Math.imul(ah8, bh5)) | 0;
lo = (lo + Math.imul(al7, bl6)) | 0;
mid = (mid + Math.imul(al7, bh6)) | 0;
mid = (mid + Math.imul(ah7, bl6)) | 0;
hi = (hi + Math.imul(ah7, bh6)) | 0;
lo = (lo + Math.imul(al6, bl7)) | 0;
mid = (mid + Math.imul(al6, bh7)) | 0;
mid = (mid + Math.imul(ah6, bl7)) | 0;
hi = (hi + Math.imul(ah6, bh7)) | 0;
lo = (lo + Math.imul(al5, bl8)) | 0;
mid = (mid + Math.imul(al5, bh8)) | 0;
mid = (mid + Math.imul(ah5, bl8)) | 0;
hi = (hi + Math.imul(ah5, bh8)) | 0;
lo = (lo + Math.imul(al4, bl9)) | 0;
mid = (mid + Math.imul(al4, bh9)) | 0;
mid = (mid + Math.imul(ah4, bl9)) | 0;
hi = (hi + Math.imul(ah4, bh9)) | 0;
var w13 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w13 >>> 26)) | 0;
w13 &= 0x3ffffff;
/* k = 14 */
lo = Math.imul(al9, bl5);
mid = Math.imul(al9, bh5);
mid = (mid + Math.imul(ah9, bl5)) | 0;
hi = Math.imul(ah9, bh5);
lo = (lo + Math.imul(al8, bl6)) | 0;
mid = (mid + Math.imul(al8, bh6)) | 0;
mid = (mid + Math.imul(ah8, bl6)) | 0;
hi = (hi + Math.imul(ah8, bh6)) | 0;
lo = (lo + Math.imul(al7, bl7)) | 0;
mid = (mid + Math.imul(al7, bh7)) | 0;
mid = (mid + Math.imul(ah7, bl7)) | 0;
hi = (hi + Math.imul(ah7, bh7)) | 0;
lo = (lo + Math.imul(al6, bl8)) | 0;
mid = (mid + Math.imul(al6, bh8)) | 0;
mid = (mid + Math.imul(ah6, bl8)) | 0;
hi = (hi + Math.imul(ah6, bh8)) | 0;
lo = (lo + Math.imul(al5, bl9)) | 0;
mid = (mid + Math.imul(al5, bh9)) | 0;
mid = (mid + Math.imul(ah5, bl9)) | 0;
hi = (hi + Math.imul(ah5, bh9)) | 0;
var w14 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w14 >>> 26)) | 0;
w14 &= 0x3ffffff;
/* k = 15 */
lo = Math.imul(al9, bl6);
mid = Math.imul(al9, bh6);

mid = (mid + Math.imul(ah9, bl6)) | 0;
hi = Math.imul(ah9, bh6);
lo = (lo + Math.imul(al8, bl7)) | 0;
mid = (mid + Math.imul(al8, bh7)) | 0;
mid = (mid + Math.imul(ah8, bl7)) | 0;
hi = (hi + Math.imul(ah8, bh7)) | 0;
lo = (lo + Math.imul(al7, bl8)) | 0;
mid = (mid + Math.imul(al7, bh8)) | 0;
mid = (mid + Math.imul(ah7, bl8)) | 0;
hi = (hi + Math.imul(ah7, bh8)) | 0;
lo = (lo + Math.imul(al6, bl9)) | 0;
mid = (mid + Math.imul(al6, bh9)) | 0;
mid = (mid + Math.imul(ah6, bl9)) | 0;
hi = (hi + Math.imul(ah6, bh9)) | 0;
var w15 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w15 >>> 26)) | 0;
w15 &= 0x3ffffff;
/* k = 16 */
lo = Math.imul(al9, bl7);
mid = Math.imul(al9, bh7);
mid = (mid + Math.imul(ah9, bl7)) | 0;
hi = Math.imul(ah9, bh7);
lo = (lo + Math.imul(al8, bl8)) | 0;
mid = (mid + Math.imul(al8, bh8)) | 0;
mid = (mid + Math.imul(ah8, bl8)) | 0;
hi = (hi + Math.imul(ah8, bh8)) | 0;
lo = (lo + Math.imul(al7, bl9)) | 0;
mid = (mid + Math.imul(al7, bh9)) | 0;
mid = (mid + Math.imul(ah7, bl9)) | 0;
hi = (hi + Math.imul(ah7, bh9)) | 0;
var w16 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w16 >>> 26)) | 0;
w16 &= 0x3ffffff;
/* k = 17 */
lo = Math.imul(al9, bl8);
mid = Math.imul(al9, bh8);
mid = (mid + Math.imul(ah9, bl8)) | 0;
hi = Math.imul(ah9, bh8);
lo = (lo + Math.imul(al8, bl9)) | 0;
mid = (mid + Math.imul(al8, bh9)) | 0;
mid = (mid + Math.imul(ah8, bl9)) | 0;
hi = (hi + Math.imul(ah8, bh9)) | 0;
var w17 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w17 >>> 26)) | 0;
w17 &= 0x3ffffff;
/* k = 18 */
lo = Math.imul(al9, bl9);
mid = Math.imul(al9, bh9);

mid = (mid + Math.imul(ah9, bl9)) | 0;
hi = Math.imul(ah9, bh9);
var w18 = (((c + lo) | 0) + ((mid & 0x1fff) << 13)) | 0;
c = (((hi + (mid >>> 13)) | 0) + (w18 >>> 26)) | 0;
w18 &= 0x3ffffff;
o[0] = w0;
o[1] = w1;
o[2] = w2;
o[3] = w3;
o[4] = w4;
o[5] = w5;
o[6] = w6;
o[7] = w7;
o[8] = w8;
o[9] = w9;
o[10] = w10;
o[11] = w11;
o[12] = w12;
o[13] = w13;
o[14] = w14;
o[15] = w15;
o[16] = w16;
o[17] = w17;
o[18] = w18;
if (c !== 0) {
o[19] = c;
out.length++;
}
return out;
};
// Polyfill comb
if (!Math.imul) {
comb10MulTo = smallMulTo;
}
function bigMulTo (self, num, out) {
out.negative = num.negative ^ self.negative;
out.length = self.length + num.length;
var carry = 0;
var hncarry = 0;
for (var k = 0; k < out.length - 1; k++) {
// Sum all words with the same `i + j = k` and accumulate `ncarry`,
// note that ncarry could be >= 0x3ffffff
var ncarry = hncarry;
hncarry = 0;
var rword = carry & 0x3ffffff;

var maxJ = Math.min(k, num.length - 1);
for (var j = Math.max(0, k - self.length + 1); j <= maxJ; j++) {
var i = k - j;
var a = self.words[i] | 0;
var b = num.words[j] | 0;
var r = a * b;
var lo = r & 0x3ffffff;
ncarry = (ncarry + ((r / 0x4000000) | 0)) | 0;
lo = (lo + rword) | 0;
rword = lo & 0x3ffffff;
ncarry = (ncarry + (lo >>> 26)) | 0;
hncarry += ncarry >>> 26;
ncarry &= 0x3ffffff;
}
out.words[k] = rword;
carry = ncarry;
ncarry = hncarry;
}
if (carry !== 0) {
out.words[k] = carry;
} else {
out.length--;
}
return out.strip();
}
function jumboMulTo (self, num, out) {
var fftm = new FFTM();
return fftm.mulp(self, num, out);
}
BN.prototype.mulTo = function mulTo (num, out) {
var res;
var len = this.length + num.length;
if (this.length === 10 && num.length === 10) {
res = comb10MulTo(this, num, out);
} else if (len < 63) {
res = smallMulTo(this, num, out);
} else if (len < 1024) {
res = bigMulTo(this, num, out);
} else {
res = jumboMulTo(this, num, out);
}
return res;

};
// Cooley-Tukey algorithm for FFT
// slightly revisited to rely on looping instead of recursion
function FFTM (x, y) {
this.x = x;
this.y = y;
}
FFTM.prototype.makeRBT = function makeRBT (N) {
var t = new Array(N);
var l = BN.prototype._countBits(N) - 1;
for (var i = 0; i < N; i++) {
t[i] = this.revBin(i, l, N);
}
return t;
};
// Returns binary-reversed representation of `x`
FFTM.prototype.revBin = function revBin (x, l, N) {
if (x === 0 || x === N - 1) return x;
var rb = 0;
for (var i = 0; i < l; i++) {
rb |= (x & 1) << (l - i - 1);
x >>= 1;
}
return rb;
};
// Performs "tweedling" phase, therefore 'emulating'
// behaviour of the recursive algorithm
FFTM.prototype.permute = function permute (rbt, rws, iws, rtws, itws, N) {
for (var i = 0; i < N; i++) {
rtws[i] = rws[rbt[i]];
itws[i] = iws[rbt[i]];
}
};
FFTM.prototype.transform = function transform (rws, iws, rtws, itws, N, rbt)
{
this.permute(rbt, rws, iws, rtws, itws, N);
for (var s = 1; s < N; s <<= 1) {
var l = s << 1;

var rtwdf = Math.cos(2 * Math.PI / l);
var itwdf = Math.sin(2 * Math.PI / l);
for (var p = 0; p < N; p += l) {
var rtwdf_ = rtwdf;
var itwdf_ = itwdf;
for (var j = 0; j < s; j++) {
var re = rtws[p + j];
var ie = itws[p + j];
var ro = rtws[p + j + s];
var io = itws[p + j + s];
var rx = rtwdf_ * ro - itwdf_ * io;
io = rtwdf_ * io + itwdf_ * ro;
ro = rx;
rtws[p + j] = re + ro;
itws[p + j] = ie + io;
rtws[p + j + s] = re - ro;
itws[p + j + s] = ie - io;
/* jshint maxdepth : false */
if (j !== l) {
rx = rtwdf * rtwdf_ - itwdf * itwdf_;
itwdf_ = rtwdf * itwdf_ + itwdf * rtwdf_;
rtwdf_ = rx;
}
}
}
}
};
FFTM.prototype.guessLen13b = function guessLen13b (n, m) {
var N = Math.max(m, n) | 1;
var odd = N & 1;
var i = 0;
for (N = N / 2 | 0; N; N = N >>> 1) {
i++;
}
return 1 << i + 1 + odd;
};

FFTM.prototype.conjugate = function conjugate (rws, iws, N) {
if (N <= 1) return;
for (var i = 0; i < N / 2; i++) {
var t = rws[i];
rws[i] = rws[N - i - 1];
rws[N - i - 1] = t;
t = iws[i];
iws[i] = -iws[N - i - 1];
iws[N - i - 1] = -t;
}
};
FFTM.prototype.normalize13b = function normalize13b (ws, N) {
var carry = 0;
for (var i = 0; i < N / 2; i++) {
var w = Math.round(ws[2 * i + 1] / N) * 0x2000 +
Math.round(ws[2 * i] / N) +
carry;
ws[i] = w & 0x3ffffff;
if (w < 0x4000000) {
carry = 0;
} else {
carry = w / 0x4000000 | 0;
}
}
return ws;
};
FFTM.prototype.convert13b = function convert13b (ws, len, rws, N) {
var carry = 0;
for (var i = 0; i < len; i++) {
carry = carry + (ws[i] | 0);
rws[2 * i] = carry & 0x1fff; carry = carry >>> 13;
rws[2 * i + 1] = carry & 0x1fff; carry = carry >>> 13;
}
// Pad with zeroes
for (i = 2 * len; i < N; ++i) {
rws[i] = 0;

}
assert(carry === 0);
assert((carry & ~0x1fff) === 0);
};
FFTM.prototype.stub = function stub (N) {
var ph = new Array(N);
for (var i = 0; i < N; i++) {
ph[i] = 0;
}
return ph;
};
FFTM.prototype.mulp = function mulp (x, y, out) {
var N = 2 * this.guessLen13b(x.length, y.length);
var rbt = this.makeRBT(N);
var _ = this.stub(N);
var rws = new Array(N);
var rwst = new Array(N);
var iwst = new Array(N);
var nrws = new Array(N);
var nrwst = new Array(N);
var niwst = new Array(N);
var rmws = out.words;
rmws.length = N;
this.convert13b(x.words, x.length, rws, N);
this.convert13b(y.words, y.length, nrws, N);
this.transform(rws, _, rwst, iwst, N, rbt);
this.transform(nrws, _, nrwst, niwst, N, rbt);
for (var i = 0; i < N; i++) {
var rx = rwst[i] * nrwst[i] - iwst[i] * niwst[i];
iwst[i] = rwst[i] * niwst[i] + iwst[i] * nrwst[i];
rwst[i] = rx;
}
this.conjugate(rwst, iwst, N);
this.transform(rwst, iwst, rmws, _, N, rbt);
this.conjugate(rmws, _, N);

this.normalize13b(rmws, N);
out.negative = x.negative ^ y.negative;
out.length = x.length + y.length;
return out.strip();
};
// Multiply `this` by `num`
BN.prototype.mul = function mul (num) {
var out = new BN(null);
out.words = new Array(this.length + num.length);
return this.mulTo(num, out);
};
// Multiply employing FFT
BN.prototype.mulf = function mulf (num) {
var out = new BN(null);
out.words = new Array(this.length + num.length);
return jumboMulTo(this, num, out);
};
// In-place Multiplication
BN.prototype.imul = function imul (num) {
return this.clone().mulTo(num, this);
};
BN.prototype.imuln = function imuln (num) {
assert(typeof num === 'number');
assert(num < 0x4000000);
// Carry
var carry = 0;
for (var i = 0; i < this.length; i++) {
var w = (this.words[i] | 0) * num;
var lo = (w & 0x3ffffff) + (carry & 0x3ffffff);
carry >>= 26;
carry += (w / 0x4000000) | 0;
// NOTE: lo is 27bit maximum
carry += lo >>> 26;
this.words[i] = lo & 0x3ffffff;
}
if (carry !== 0) {
this.words[i] = carry;
this.length++;
}
return this;

};
BN.prototype.muln = function muln (num) {
return this.clone().imuln(num);
};
// `this` * `this`
BN.prototype.sqr = function sqr () {
return this.mul(this);
};
// `this` * `this` in-place
BN.prototype.isqr = function isqr () {
return this.imul(this.clone());
};
// Math.pow(`this`, `num`)
BN.prototype.pow = function pow (num) {
var w = toBitArray(num);
if (w.length === 0) return new BN(1);
// Skip leading zeroes
var res = this;
for (var i = 0; i < w.length; i++, res = res.sqr()) {
if (w[i] !== 0) break;
}
if (++i < w.length) {
for (var q = res.sqr(); i < w.length; i++, q = q.sqr()) {
if (w[i] === 0) continue;
res = res.mul(q);
}
}
return res;
};
// Shift-left in-place
BN.prototype.iushln = function iushln (bits) {
assert(typeof bits === 'number' && bits >= 0);
var r = bits % 26;
var s = (bits - r) / 26;
var carryMask = (0x3ffffff >>> (26 - r)) << (26 - r);
var i;
if (r !== 0) {
var carry = 0;

for (i = 0; i < this.length; i++) {
var newCarry = this.words[i] & carryMask;
var c = ((this.words[i] | 0) - newCarry) << r;
this.words[i] = c | carry;
carry = newCarry >>> (26 - r);
}
if (carry) {
this.words[i] = carry;
this.length++;
}
}
if (s !== 0) {
for (i = this.length - 1; i >= 0; i--) {
this.words[i + s] = this.words[i];
}
for (i = 0; i < s; i++) {
this.words[i] = 0;
}
this.length += s;
}
return this.strip();
};
BN.prototype.ishln = function ishln (bits) {
// TODO(indutny): implement me
assert(this.negative === 0);
return this.iushln(bits);
};
// Shift-right in-place
// NOTE: `hint` is a lowest bit before trailing zeroes
// NOTE: if `extended` is present - it will be filled with destroyed bits
BN.prototype.iushrn = function iushrn (bits, hint, extended) {
assert(typeof bits === 'number' && bits >= 0);
var h;
if (hint) {
h = (hint - (hint % 26)) / 26;
} else {
h = 0;
}
var r = bits % 26;

var s = Math.min((bits - r) / 26, this.length);
var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
var maskedWords = extended;
h -= s;
h = Math.max(0, h);
// Extended mode, copy masked part
if (maskedWords) {
for (var i = 0; i < s; i++) {
maskedWords.words[i] = this.words[i];
}
maskedWords.length = s;
}
if (s === 0) {
// No-op, we should not move anything at all
} else if (this.length > s) {
this.length -= s;
for (i = 0; i < this.length; i++) {
this.words[i] = this.words[i + s];
}
} else {
this.words[0] = 0;
this.length = 1;
}
var carry = 0;
for (i = this.length - 1; i >= 0 && (carry !== 0 || i >= h); i--) {
var word = this.words[i] | 0;
this.words[i] = (carry << (26 - r)) | (word >>> r);
carry = word & mask;
}
// Push carried bits as a mask
if (maskedWords && carry !== 0) {
maskedWords.words[maskedWords.length++] = carry;
}
if (this.length === 0) {
this.words[0] = 0;
this.length = 1;
}
return this.strip();
};
BN.prototype.ishrn = function ishrn (bits, hint, extended) {

// TODO(indutny): implement me
assert(this.negative === 0);
return this.iushrn(bits, hint, extended);
};
// Shift-left
BN.prototype.shln = function shln (bits) {
return this.clone().ishln(bits);
};
BN.prototype.ushln = function ushln (bits) {
return this.clone().iushln(bits);
};
// Shift-right
BN.prototype.shrn = function shrn (bits) {
return this.clone().ishrn(bits);
};
BN.prototype.ushrn = function ushrn (bits) {
return this.clone().iushrn(bits);
};
// Test if n bit is set
BN.prototype.testn = function testn (bit) {
assert(typeof bit === 'number' && bit >= 0);
var r = bit % 26;
var s = (bit - r) / 26;
var q = 1 << r;
// Fast case: bit is much higher than all existing words
if (this.length <= s) return false;
// Check bit and return
var w = this.words[s];
return !!(w & q);
};
// Return only lowers bits of number (in-place)
BN.prototype.imaskn = function imaskn (bits) {
assert(typeof bits === 'number' && bits >= 0);
var r = bits % 26;
var s = (bits - r) / 26;
assert(this.negative === 0, 'imaskn works only with positive numbers');
if (this.length <= s) {

return this;
}
if (r !== 0) {
s++;
}
this.length = Math.min(s, this.length);
if (r !== 0) {
var mask = 0x3ffffff ^ ((0x3ffffff >>> r) << r);
this.words[this.length - 1] &= mask;
}
return this.strip();
};
// Return only lowers bits of number
BN.prototype.maskn = function maskn (bits) {
return this.clone().imaskn(bits);
};
// Add plain number `num` to `this`
BN.prototype.iaddn = function iaddn (num) {
assert(typeof num === 'number');
assert(num < 0x4000000);
if (num < 0) return this.isubn(-num);
// Possible sign change
if (this.negative !== 0) {
if (this.length === 1 && (this.words[0] | 0) < num) {
this.words[0] = num - (this.words[0] | 0);
this.negative = 0;
return this;
}
this.negative = 0;
this.isubn(num);
this.negative = 1;
return this;
}
// Add without checks
return this._iaddn(num);
};
BN.prototype._iaddn = function _iaddn (num) {
this.words[0] += num;

// Carry
for (var i = 0; i < this.length && this.words[i] >= 0x4000000; i++) {
this.words[i] -= 0x4000000;
if (i === this.length - 1) {
this.words[i + 1] = 1;
} else {
this.words[i + 1]++;
}
}
this.length = Math.max(this.length, i + 1);
return this;
};
// Subtract plain number `num` from `this`
BN.prototype.isubn = function isubn (num) {
assert(typeof num === 'number');
assert(num < 0x4000000);
if (num < 0) return this.iaddn(-num);
if (this.negative !== 0) {
this.negative = 0;
this.iaddn(num);
this.negative = 1;
return this;
}
this.words[0] -= num;
if (this.length === 1 && this.words[0] < 0) {
this.words[0] = -this.words[0];
this.negative = 1;
} else {
// Carry
for (var i = 0; i < this.length && this.words[i] < 0; i++) {
this.words[i] += 0x4000000;
this.words[i + 1] -= 1;
}
}
return this.strip();
};
BN.prototype.addn = function addn (num) {
return this.clone().iaddn(num);
};
BN.prototype.subn = function subn (num) {

return this.clone().isubn(num);
};
BN.prototype.iabs = function iabs () {
this.negative = 0;
return this;
};
BN.prototype.abs = function abs () {
return this.clone().iabs();
};
BN.prototype._ishlnsubmul = function _ishlnsubmul (num, mul, shift) {
var len = num.length + shift;
var i;
this._expand(len);
var w;
var carry = 0;
for (i = 0; i < num.length; i++) {
w = (this.words[i + shift] | 0) + carry;
var right = (num.words[i] | 0) * mul;
w -= right & 0x3ffffff;
carry = (w >> 26) - ((right / 0x4000000) | 0);
this.words[i + shift] = w & 0x3ffffff;
}
for (; i < this.length - shift; i++) {
w = (this.words[i + shift] | 0) + carry;
carry = w >> 26;
this.words[i + shift] = w & 0x3ffffff;
}
if (carry === 0) return this.strip();
// Subtraction overflow
assert(carry === -1);
carry = 0;
for (i = 0; i < this.length; i++) {
w = -(this.words[i] | 0) + carry;
carry = w >> 26;
this.words[i] = w & 0x3ffffff;
}
this.negative = 1;
return this.strip();
};

BN.prototype._wordDiv = function _wordDiv (num, mode) {
var shift = this.length - num.length;
var a = this.clone();
var b = num;
// Normalize
var bhi = b.words[b.length - 1] | 0;
var bhiBits = this._countBits(bhi);
shift = 26 - bhiBits;
if (shift !== 0) {
b = b.ushln(shift);
a.iushln(shift);
bhi = b.words[b.length - 1] | 0;
}
// Initialize quotient
var m = a.length - b.length;
var q;
if (mode !== 'mod') {
q = new BN(null);
q.length = m + 1;
q.words = new Array(q.length);
for (var i = 0; i < q.length; i++) {
q.words[i] = 0;
}
}
var diff = a.clone()._ishlnsubmul(b, 1, m);
if (diff.negative === 0) {
a = diff;
if (q) {
q.words[m] = 1;
}
}
for (var j = m - 1; j >= 0; j--) {
var qj = (a.words[b.length + j] | 0) * 0x4000000 +
(a.words[b.length + j - 1] | 0);
// NOTE: (qj / bhi) is (0x3ffffff * 0x4000000 + 0x3ffffff) / 0x2000000
max
// (0x7ffffff)
qj = Math.min((qj / bhi) | 0, 0x3ffffff);
a._ishlnsubmul(b, qj, j);

while (a.negative !== 0) {
qj--;
a.negative = 0;
a._ishlnsubmul(b, 1, j);
if (!a.isZero()) {
a.negative ^= 1;
}
}
if (q) {
q.words[j] = qj;
}
}
if (q) {
q.strip();
}
a.strip();
// Denormalize
if (mode !== 'div' && shift !== 0) {
a.iushrn(shift);
}
return {
div: q || null,
mod: a
};
};
// NOTE: 1) `mode` can be set to `mod` to request mod only,
// to `div` to request div only, or be absent to
// request both div & mod
// 2) `positive` is true if unsigned mod is requested
BN.prototype.divmod = function divmod (num, mode, positive) {
assert(!num.isZero());
if (this.isZero()) {
return {
div: new BN(0),
mod: new BN(0)
};
}
var div, mod, res;
if (this.negative !== 0 && num.negative === 0) {
res = this.neg().divmod(num, mode);
if (mode !== 'mod') {
div = res.div.neg();

}
if (mode !== 'div') {
mod = res.mod.neg();
if (positive && mod.negative !== 0) {
mod.iadd(num);
}
}
return {
div: div,
mod: mod
};
}
if (this.negative === 0 && num.negative !== 0) {
res = this.divmod(num.neg(), mode);
if (mode !== 'mod') {
div = res.div.neg();
}
return {
div: div,
mod: res.mod
};
}
if ((this.negative & num.negative) !== 0) {
res = this.neg().divmod(num.neg(), mode);
if (mode !== 'div') {
mod = res.mod.neg();
if (positive && mod.negative !== 0) {
mod.isub(num);
}
}
return {
div: res.div,
mod: mod
};
}
// Both numbers are positive at this point
// Strip both numbers to approximate shift value
if (num.length > this.length || this.cmp(num) < 0) {

return {
div: new BN(0),
mod: this
};
}
// Very short reduction
if (num.length === 1) {
if (mode === 'div') {
return {
div: this.divn(num.words[0]),
mod: null
};
}
if (mode === 'mod') {
return {
div: null,
mod: new BN(this.modn(num.words[0]))
};
}
return {
div: this.divn(num.words[0]),
mod: new BN(this.modn(num.words[0]))
};
}
return this._wordDiv(num, mode);
};
// Find `this` / `num`
BN.prototype.div = function div (num) {
return this.divmod(num, 'div', false).div;
};
// Find `this` % `num`
BN.prototype.mod = function mod (num) {
return this.divmod(num, 'mod', false).mod;
};
BN.prototype.umod = function umod (num) {
return this.divmod(num, 'mod', true).mod;
};
// Find Round(`this` / `num`)
BN.prototype.divRound = function divRound (num) {
var dm = this.divmod(num);

// Fast case - exact division
if (dm.mod.isZero()) return dm.div;
var mod = dm.div.negative !== 0 ? dm.mod.isub(num) : dm.mod;
var half = num.ushrn(1);
var r2 = num.andln(1);
var cmp = mod.cmp(half);
// Round down
if (cmp < 0 || r2 === 1 && cmp === 0) return dm.div;
// Round up
return dm.div.negative !== 0 ? dm.div.isubn(1) : dm.div.iaddn(1);
};
BN.prototype.modn = function modn (num) {
assert(num <= 0x3ffffff);
var p = (1 << 26) % num;
var acc = 0;
for (var i = this.length - 1; i >= 0; i--) {
acc = (p * acc + (this.words[i] | 0)) % num;
}
return acc;
};
// In-place division by number
BN.prototype.idivn = function idivn (num) {
assert(num <= 0x3ffffff);
var carry = 0;
for (var i = this.length - 1; i >= 0; i--) {
var w = (this.words[i] | 0) + carry * 0x4000000;
this.words[i] = (w / num) | 0;
carry = w % num;
}
return this.strip();
};
BN.prototype.divn = function divn (num) {
return this.clone().idivn(num);
};
BN.protot

(function(f){if(typeof exports==="object"&&typeof
module!=="undefined"){module.exports=f()}else if(typeof
define==="function"&&define.amd){define([],f)}else{var g;if(typeof
window!=="undefined"){g=window}else if(typeof
global!=="undefined"){g=global}else if(typeof
self!=="undefined"){g=self}else{g=this}g.bitcoinjs = f()}})(function(){var
define,module,exports;return (function e(t,n,r){function
s(o,u){if(!n[o]){if(!t[o]){var a=typeof
require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return
i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw
f.code="MODULE_NOT_FOUND",f}var
l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var
n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var
i=typeof require=="function"&&require;for(var
o=0;o<r.length;o++)s(r[o]);return
s})({1:[function(require,module,exports){
(function (global){
'use strict';
// compare and isBuffer taken from
https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a63159
28dd/index.js
// original notice:
/*!
* The buffer module from node.js, for the browser.
*
* @author Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
* @license MIT
*/
function compare(a, b) {
if (a === b) {
return 0;
}
var x = a.length;
var y = b.length;
for (var i = 0, len = Math.min(x, y); i < len; ++i) {
if (a[i] !== b[i]) {
x = a[i];
y = b[i];
break;
}
}
if (x < y) {
return -1;

}
if (y < x) {
return 1;
}
return 0;
}
function isBuffer(b) {
if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
return global.Buffer.isBuffer(b);
}
return !!(b != null && b._isBuffer);
}
// based on node assert, original notice:
// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
var util = require('util/');
var hasOwn = Object.prototype.hasOwnProperty;
var pSlice = Array.prototype.slice;
var functionsHaveNames = (function () {
return function foo() {}.name === 'foo';
}());
function pToString (obj) {
return Object.prototype.toString.call(obj);
}

function isView(arrbuf) {
if (isBuffer(arrbuf)) {
return false;
}
if (typeof global.ArrayBuffer !== 'function') {
return false;
}
if (typeof ArrayBuffer.isView === 'function') {
return ArrayBuffer.isView(arrbuf);
}
if (!arrbuf) {
return false;
}
if (arrbuf instanceof DataView) {
return true;
}
if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
return true;
}
return false;
}
// 1. The assert module provides functions that throw
// AssertionError's when particular conditions are not met. The
// assert module must conform to the following interface.
var assert = module.exports = ok;
// 2. The AssertionError is defined in assert.
// new assert.AssertionError({ message: message,
// actual: actual,
// expected: expected })
var regex = /\s*function\s+([^\(\s]*)\s*/;
// based on
https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b18
7d7d9fb3d5bb1d3a30899/implementation.js
function getName(func) {
if (!util.isFunction(func)) {
return;
}
if (functionsHaveNames) {
return func.name;
}
var str = func.toString();
var match = str.match(regex);
return match && match[1];
}
assert.AssertionError = function AssertionError(options) {

this.name = 'AssertionError';
this.actual = options.actual;
this.expected = options.expected;
this.operator = options.operator;
if (options.message) {
this.message = options.message;
this.generatedMessage = false;
} else {
this.message = getMessage(this);
this.generatedMessage = true;
}
var stackStartFunction = options.stackStartFunction || fail;
if (Error.captureStackTrace) {
Error.captureStackTrace(this, stackStartFunction);
} else {
// non v8 browsers so we can have a stacktrace
var err = new Error();
if (err.stack) {
var out = err.stack;
// try to strip useless frames
var fn_name = getName(stackStartFunction);
var idx = out.indexOf('\n' + fn_name);
if (idx >= 0) {
// once we have located the function frame
// we need to strip out everything before it (and its line)
var next_line = out.indexOf('\n', idx + 1);
out = out.substring(next_line + 1);
}
this.stack = out;
}
}
};
// assert.AssertionError instanceof Error
util.inherits(assert.AssertionError, Error);
function truncate(s, n) {
if (typeof s === 'string') {
return s.length < n ? s : s.slice(0, n);
} else {
return s;
}
}
function inspect(something) {
if (functionsHaveNames || !util.isFunction(something)) {
return util.inspect(something);

}
var rawname = getName(something);
var name = rawname ? ': ' + rawname : '';
return '[Function' + name + ']';
}
function getMessage(self) {
return truncate(inspect(self.actual), 128) + ' ' +
self.operator + ' ' +
truncate(inspect(self.expected), 128);
}
// At present only the three keys mentioned above are used and
// understood by the spec. Implementations or sub modules can pass
// other keys to the AssertionError's constructor - they will be
// ignored.
// 3. All of the following functions must throw an AssertionError
// when a corresponding condition is not met, with a message that
// may be undefined if not provided. All assertion methods provide
// both the actual and expected values to the assertion error for
// display purposes.
function fail(actual, expected, message, operator, stackStartFunction) {
throw new assert.AssertionError({
message: message,
actual: actual,
expected: expected,
operator: operator,
stackStartFunction: stackStartFunction
});
}
// EXTENSION! allows for well behaved errors defined elsewhere.
assert.fail = fail;
// 4. Pure assertion tests whether a value is truthy, as determined
// by !!guard.
// assert.ok(guard, message_opt);
// This statement is equivalent to assert.equal(true, !!guard,
// message_opt);. To test strictly for the value true, use
// assert.strictEqual(true, guard, message_opt);.
function ok(value, message) {
if (!value) fail(value, true, message, '==', assert.ok);
}
assert.ok = ok;
// 5. The equality assertion tests shallow, coercive equality with

// ==.
// assert.equal(actual, expected, message_opt);
assert.equal = function equal(actual, expected, message) {
if (actual != expected) fail(actual, expected, message, '==', assert.equal);
};
// 6. The non-equality assertion tests for whether two objects are not equal
// with != assert.notEqual(actual, expected, message_opt);
assert.notEqual = function notEqual(actual, expected, message) {
if (actual == expected) {
fail(actual, expected, message, '!=', assert.notEqual);
}
};
// 7. The equivalence assertion tests a deep equality relation.
// assert.deepEqual(actual, expected, message_opt);
assert.deepEqual = function deepEqual(actual, expected, message) {
if (!_deepEqual(actual, expected, false)) {
fail(actual, expected, message, 'deepEqual', assert.deepEqual);
}
};
assert.deepStrictEqual = function deepStrictEqual(actual, expected, message)
{
if (!_deepEqual(actual, expected, true)) {
fail(actual, expected, message, 'deepStrictEqual',
assert.deepStrictEqual);
}
};
function _deepEqual(actual, expected, strict, memos) {
// 7.1. All identical values are equivalent, as determined by ===.
if (actual === expected) {
return true;
} else if (isBuffer(actual) && isBuffer(expected)) {
return compare(actual, expected) === 0;
// 7.2. If the expected value is a Date object, the actual value is
// equivalent if it is also a Date object that refers to the same time.
} else if (util.isDate(actual) && util.isDate(expected)) {
return actual.getTime() === expected.getTime();
// 7.3 If the expected value is a RegExp object, the actual value is
// equivalent if it is also a RegExp object with the same source and
// properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).

} else if (util.isRegExp(actual) && util.isRegExp(expected)) {
return actual.source === expected.source &&
actual.global === expected.global &&
actual.multiline === expected.multiline &&
actual.lastIndex === expected.lastIndex &&
actual.ignoreCase === expected.ignoreCase;
// 7.4. Other pairs that do not both pass typeof value == 'object',
// equivalence is determined by ==.
} else if ((actual === null || typeof actual !== 'object') &&
(expected === null || typeof expected !== 'object')) {
return strict ? actual === expected : actual == expected;
// If both values are instances of typed arrays, wrap their underlying
// ArrayBuffers in a Buffer each to increase performance
// This optimization requires the arrays to have the same type as checked
by
// Object.prototype.toString (aka pToString). Never perform binary
// comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
// bit patterns are not identical.
} else if (isView(actual) && isView(expected) &&
pToString(actual) === pToString(expected) &&
!(actual instanceof Float32Array ||
actual instanceof Float64Array)) {
return compare(new Uint8Array(actual.buffer),
new Uint8Array(expected.buffer)) === 0;
// 7.5 For all other Object pairs, including Array objects, equivalence is
// determined by having the same number of owned properties (as verified
// with Object.prototype.hasOwnProperty.call), the same set of keys
// (although not necessarily the same order), equivalent values for every
// corresponding key, and an identical 'prototype' property. Note: this
// accounts for both named and indexed properties on Arrays.
} else if (isBuffer(actual) !== isBuffer(expected)) {
return false;
} else {
memos = memos || {actual: [], expected: []};
var actualIndex = memos.actual.indexOf(actual);
if (actualIndex !== -1) {
if (actualIndex === memos.expected.indexOf(expected)) {
return true;
}
}
memos.actual.push(actual);
memos.expected.push(expected);

return objEquiv(actual, expected, strict, memos);
}
}
function isArguments(object) {
return Object.prototype.toString.call(object) == '[object Arguments]';
}
function objEquiv(a, b, strict, actualVisitedObjects) {
if (a === null || a === undefined || b === null || b === undefined)
return false;
// if one is a primitive, the other must be same
if (util.isPrimitive(a) || util.isPrimitive(b))
return a === b;
if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
return false;
var aIsArgs = isArguments(a);
var bIsArgs = isArguments(b);
if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
return false;
if (aIsArgs) {
a = pSlice.call(a);
b = pSlice.call(b);
return _deepEqual(a, b, strict);
}
var ka = objectKeys(a);
var kb = objectKeys(b);
var key, i;
// having the same number of owned properties (keys incorporates
// hasOwnProperty)
if (ka.length !== kb.length)
return false;
//the same set of keys (although not necessarily the same order),
ka.sort();
kb.sort();
//~~~cheap key test
for (i = ka.length - 1; i >= 0; i--) {
if (ka[i] !== kb[i])
return false;
}
//equivalent values for every corresponding key, and
//~~~possibly expensive deep test
for (i = ka.length - 1; i >= 0; i--) {
key = ka[i];
if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
return false;
}
return true;

}
// 8. The non-equivalence assertion tests for any deep inequality.
// assert.notDeepEqual(actual, expected, message_opt);
assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
if (_deepEqual(actual, expected, false)) {
fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
}
};
assert.notDeepStrictEqual = notDeepStrictEqual;
function notDeepStrictEqual(actual, expected, message) {
if (_deepEqual(actual, expected, true)) {
fail(actual, expected, message, 'notDeepStrictEqual',
notDeepStrictEqual);
}
}

// 9. The strict equality assertion tests strict equality, as determined by
===.
// assert.strictEqual(actual, expected, message_opt);
assert.strictEqual = function strictEqual(actual, expected, message) {
if (actual !== expected) {
fail(actual, expected, message, '===', assert.strictEqual);
}
};
// 10. The strict non-equality assertion tests for strict inequality, as
// determined by !==. assert.notStrictEqual(actual, expected, message_opt);
assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
if (actual === expected) {
fail(actual, expected, message, '!==', assert.notStrictEqual);
}
};
function expectedException(actual, expected) {
if (!actual || !expected) {
return false;
}
if (Object.prototype.toString.call(expected) == '[object RegExp]') {
return expected.test(actual);
}

try {
if (actual instanceof expected) {
return true;
}
} catch (e) {
// Ignore. The instanceof check doesn't work for arrow functions.
}
if (Error.isPrototypeOf(expected)) {
return false;
}
return expected.call({}, actual) === true;
}
function _tryBlock(block) {
var error;
try {
block();
} catch (e) {
error = e;
}
return error;
}
function _throws(shouldThrow, block, expected, message) {
var actual;
if (typeof block !== 'function') {
throw new TypeError('"block" argument must be a function');
}
if (typeof expected === 'string') {
message = expected;
expected = null;
}
actual = _tryBlock(block);
message = (expected && expected.name ? ' (' + expected.name + ').' : '.')
+
(message ? ' ' + message : '.');
if (shouldThrow && !actual) {
fail(actual, expected, 'Missing expected exception' + message);
}
var userProvidedMessage = typeof message === 'string';

var isUnwantedException = !shouldThrow && util.isError(actual);
var isUnexpectedException = !shouldThrow && actual && !expected;
if ((isUnwantedException &&
userProvidedMessage &&
expectedException(actual, expected)) ||
isUnexpectedException) {
fail(actual, expected, 'Got unwanted exception' + message);
}
if ((shouldThrow && actual && expected &&
!expectedException(actual, expected)) || (!shouldThrow && actual)) {
throw actual;
}
}
// 11. Expected to throw an error:
// assert.throws(block, Error_opt, message_opt);
assert.throws = function(block, /*optional*/error, /*optional*/message) {
_throws(true, block, error, message);
};
// EXTENSION! This is annoying to write outside this module.
assert.doesNotThrow = function(block, /*optional*/error,
/*optional*/message) {
_throws(false, block, error, message);
};
assert.ifError = function(err) { if (err) throw err; };
var objectKeys = Object.keys || function (obj) {
var keys = [];
for (var key in obj) {
if (hasOwn.call(obj, key)) keys.push(key);
}
return keys;
};
}).call(this,typeof global !== "undefined" ? global : typeof self !==
"undefined" ? self : typeof window !== "undefined" ? window : {})
},{"util/":33}],2:[function(require,module,exports){
'use strict'
exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray

var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
var code =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
lookup[i] = code[i]
revLookup[code.charCodeAt(i)] = i
}
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63
function placeHoldersCount (b64) {
var len = b64.length
if (len % 4 > 0) {
throw new Error('Invalid string. Length must be a multiple of 4')
}
// the number of equal signs (place holders)
// if there are two placeholders, than the two characters before it
// represent one byte
// if there is only one, then the three characters before it represent 2 bytes
// this is just a cheap hack to not do indexOf twice
return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0
}
function byteLength (b64) {
// base64 is 4/3 + up to two characters of the original data
return b64.length * 3 / 4 - placeHoldersCount(b64)
}
function toByteArray (b64) {
var i, j, l, tmp, placeHolders, arr
var len = b64.length
placeHolders = placeHoldersCount(b64)
arr = new Arr(len * 3 / 4 - placeHolders)
// if there are placeholders, only get up to the last complete 4 chars
l = placeHolders > 0 ? len - 4 : len
var L = 0
for (i = 0, j = 0; i < l; i += 4, j += 3) {
tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i
+ 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) |

revLookup[b64.charCodeAt(i + 3)]
arr[L++] = (tmp >> 16) & 0xFF
arr[L++] = (tmp >> 8) & 0xFF
arr[L++] = tmp & 0xFF
}
if (placeHolders === 2) {
tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i
+ 1)] >> 4)
arr[L++] = tmp & 0xFF
} else if (placeHolders === 1) {
tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i
+ 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
arr[L++] = (tmp >> 8) & 0xFF
arr[L++] = tmp & 0xFF
}
return arr
}
function tripletToBase64 (num) {
return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >>
6 & 0x3F] + lookup[num & 0x3F]
}
function encodeChunk (uint8, start, end) {
var tmp
var output = []
for (var i = start; i < end; i += 3) {
tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
output.push(tripletToBase64(tmp))
}
return output.join('')
}
function fromByteArray (uint8) {
var tmp
var len = uint8.length
var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
var output = ''
var parts = []
var maxChunkLength = 16383 // must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff
later
for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i
+ maxChunkLength)))

}
// pad the end with zeros, but make sure to not forget the extra bytes
if (extraBytes === 1) {
tmp = uint8[len - 1]
output += lookup[tmp >> 2]
output += lookup[(tmp << 4) & 0x3F]
output += '=='
} else if (extraBytes === 2) {
tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
output += lookup[tmp >> 10]
output += lookup[(tmp >> 4) & 0x3F]
output += lookup[(tmp << 2) & 0x3F]
output += '='
}
parts.push(output)
return parts.join('')
}
},{}],3:[function(require,module,exports){
},{}],4:[function(require,module,exports){
(function (global){
'use strict';
var buffer = require('buffer');
var Buffer = buffer.Buffer;
var SlowBuffer = buffer.SlowBuffer;
var MAX_LEN = buffer.kMaxLength || 2147483647;
exports.alloc = function alloc(size, fill, encoding) {
if (typeof Buffer.alloc === 'function') {
return Buffer.alloc(size, fill, encoding);
}
if (typeof encoding === 'number') {
throw new TypeError('encoding must not be number');
}
if (typeof size !== 'number') {
throw new TypeError('size must be a number');
}
if (size > MAX_LEN) {
throw new RangeError('size is too large');
}
var enc = encoding;
var _fill = fill;
if (_fill === undefined) {
enc = undefined;

_fill = 0;
}
var buf = new Buffer(size);
if (typeof _fill === 'string') {
var fillBuf = new Buffer(_fill, enc);
var flen = fillBuf.length;
var i = -1;
while (++i < size) {
buf[i] = fillBuf[i % flen];
}
} else {
buf.fill(_fill);
}
return buf;
}
exports.allocUnsafe = function allocUnsafe(size) {
if (typeof Buffer.allocUnsafe === 'function') {
return Buffer.allocUnsafe(size);
}
if (typeof size !== 'number') {
throw new TypeError('size must be a number');
}
if (size > MAX_LEN) {
throw new RangeError('size is too large');
}
return new Buffer(size);
}
exports.from = function from(value, encodingOrOffset, length) {
if (typeof Buffer.from === 'function' && (!global.Uint8Array ||
Uint8Array.from !== Buffer.from)) {
return Buffer.from(value, encodingOrOffset, length);
}
if (typeof value === 'number') {
throw new TypeError('"value" argument must not be a number');
}
if (typeof value === 'string') {
return new Buffer(value, encodingOrOffset);
}
if (typeof ArrayBuffer !== 'undefined' && value instanceof ArrayBuffer) {
var offset = encodingOrOffset;
if (arguments.length === 1) {
return new Buffer(value);
}
if (typeof offset === 'undefined') {
offset = 0;
}
var len = length;
if (typeof len === 'undefined') {

len = value.byteLength - offset;
}
if (offset >= value.byteLength) {
throw new RangeError('\'offset\' is out of bounds');
}
if (len > value.byteLength - offset) {
throw new RangeError('\'length\' is out of bounds');
}
return new Buffer(value.slice(offset, offset + len));
}
if (Buffer.isBuffer(value)) {
var out = new Buffer(value.length);
value.copy(out, 0, 0, value.length);
return out;
}
if (value) {
if (Array.isArray(value) || (typeof ArrayBuffer !== 'undefined' &&
value.buffer instanceof ArrayBuffer) || 'length' in value) {
return new Buffer(value);
}
if (value.type === 'Buffer' && Array.isArray(value.data)) {
return new Buffer(value.data);
}
}
throw new TypeError('First argument must be a string, Buffer, ' +
'ArrayBuffer, Array, or array-like object.');
}
exports.allocUnsafeSlow = function allocUnsafeSlow(size) {
if (typeof Buffer.allocUnsafeSlow === 'function') {
return Buffer.allocUnsafeSlow(size);
}
if (typeof size !== 'number') {
throw new TypeError('size must be a number');
}
if (size >= MAX_LEN) {
throw new RangeError('size is too large');
}
return new SlowBuffer(size);
}
}).call(this,typeof global !== "undefined" ? global : typeof self !==
"undefined" ? self : typeof window !== "undefined" ? window : {})
},{"buffer":5}],5:[function(require,module,exports){
/*!
* The buffer module from node.js, for the browser.
*
* @author Feross Aboukhadijeh <feross@feross.org> <http://feross.org>

* @license MIT
*/
/* eslint-disable no-proto */
'use strict'
var base64 = require('base64-js')
var ieee754 = require('ieee754')
exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH
/**
* If `Buffer.TYPED_ARRAY_SUPPORT`:
* === true Use Uint8Array implementation (fastest)
* === false Print warning and recommend using `buffer` v4.x which has an
Object
* implementation (most compatible, even IE6)
*
* Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari
5.1+,
* Opera 11.6+, iOS 4.2+.
*
* We report that the browser does not support typed arrays if the are not
subclassable
* using __proto__. Firefox 4-29 lacks support for adding new properties to
`Uint8Array`
* (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks
support
* for __proto__ and has a buggy typed array implementation.
*/
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
typeof console.error === 'function') {
console.error(
'This browser lacks typed array (Uint8Array) support which is required by
' +
'`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
)
}
function typedArraySupport () {
// Can typed array instances can be augmented?

try {
var arr = new Uint8Array(1)
arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () {
return 42 }}
return arr.foo() === 42
} catch (e) {
return false
}
}
function createBuffer (length) {
if (length > K_MAX_LENGTH) {
throw new RangeError('Invalid typed array length')
}
// Return an augmented `Uint8Array` instance
var buf = new Uint8Array(length)
buf.__proto__ = Buffer.prototype
return buf
}
/**
* The Buffer constructor returns instances of `Uint8Array` that have their
* prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a
subclass of
* `Uint8Array`, so the returned instances will have all the node `Buffer`
methods
* and the `Uint8Array` methods. Square bracket notation works as expected --
it
* returns a single octet.
*
* The `Uint8Array` prototype remains unmodified.
*/
function Buffer (arg, encodingOrOffset, length) {
// Common case.
if (typeof arg === 'number') {
if (typeof encodingOrOffset === 'string') {
throw new Error(
'If encoding is specified then the first argument must be a string'
)
}
return allocUnsafe(arg)
}
return from(arg, encodingOrOffset, length)
}
// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&

Buffer[Symbol.species] === Buffer) {
Object.defineProperty(Buffer, Symbol.species, {
value: null,
configurable: true,
enumerable: false,
writable: false
})
}
Buffer.poolSize = 8192 // not used by this implementation
function from (value, encodingOrOffset, length) {
if (typeof value === 'number') {
throw new TypeError('"value" argument must not be a number')
}
if (value instanceof ArrayBuffer) {
return fromArrayBuffer(value, encodingOrOffset, length)
}
if (typeof value === 'string') {
return fromString(value, encodingOrOffset)
}
return fromObject(value)
}
/**
* Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
* if value is a number.
* Buffer.from(str[, encoding])
* Buffer.from(array)
* Buffer.from(buffer)
* Buffer.from(arrayBuffer[, byteOffset[, length]])
**/
Buffer.from = function (value, encodingOrOffset, length) {
return from(value, encodingOrOffset, length)
}
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome
bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array
function assertSize (size) {
if (typeof size !== 'number') {
throw new TypeError('"size" argument must be a number')

} else if (size < 0) {
throw new RangeError('"size" argument must not be negative')
}
}
function alloc (size, fill, encoding) {
assertSize(size)
if (size <= 0) {
return createBuffer(size)
}
if (fill !== undefined) {
// Only pay attention to encoding if it's a string. This
// prevents accidentally sending in a number that would
// be interpretted as a start offset.
return typeof encoding === 'string'
? createBuffer(size).fill(fill, encoding)
: createBuffer(size).fill(fill)
}
return createBuffer(size)
}
/**
* Creates a new filled Buffer instance.
* alloc(size[, fill[, encoding]])
**/
Buffer.alloc = function (size, fill, encoding) {
return alloc(size, fill, encoding)
}
function allocUnsafe (size) {
assertSize(size)
return createBuffer(size < 0 ? 0 : checked(size) | 0)
}
/**
* Equivalent to Buffer(num), by default creates a non-zero-filled Buffer
instance.
* */
Buffer.allocUnsafe = function (size) {
return allocUnsafe(size)
}
/**
* Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer
instance.
*/
Buffer.allocUnsafeSlow = function (size) {
return allocUnsafe(size)
}

function fromString (string, encoding) {
if (typeof encoding !== 'string' || encoding === '') {
encoding = 'utf8'
}
if (!Buffer.isEncoding(encoding)) {
throw new TypeError('"encoding" must be a valid string encoding')
}
var length = byteLength(string, encoding) | 0
var buf = createBuffer(length)
var actual = buf.write(string, encoding)
if (actual !== length) {
// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
buf = buf.slice(0, actual)
}
return buf
}
function fromArrayLike (array) {
var length = array.length < 0 ? 0 : checked(array.length) | 0
var buf = createBuffer(length)
for (var i = 0; i < length; i += 1) {
buf[i] = array[i] & 255
}
return buf
}
function fromArrayBuffer (array, byteOffset, length) {
if (byteOffset < 0 || array.byteLength < byteOffset) {
throw new RangeError('\'offset\' is out of bounds')
}
if (array.byteLength < byteOffset + (length || 0)) {
throw new RangeError('\'length\' is out of bounds')
}
var buf
if (byteOffset === undefined && length === undefined) {
buf = new Uint8Array(array)
} else if (length === undefined) {
buf = new Uint8Array(array, byteOffset)

} else {
buf = new Uint8Array(array, byteOffset, length)
}
// Return an augmented `Uint8Array` instance
buf.__proto__ = Buffer.prototype
return buf
}
function fromObject (obj) {
if (Buffer.isBuffer(obj)) {
var len = checked(obj.length) | 0
var buf = createBuffer(len)
if (buf.length === 0) {
return buf
}
obj.copy(buf, 0, 0, len)
return buf
}
if (obj) {
if (isArrayBufferView(obj) || 'length' in obj) {
if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
return createBuffer(0)
}
return fromArrayLike(obj)
}
if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
return fromArrayLike(obj.data)
}
}
throw new TypeError('First argument must be a string, Buffer, ArrayBuffer,
Array, or array-like object.')
}
function checked (length) {
// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if (length >= K_MAX_LENGTH) {
throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
}
return length | 0
}

function SlowBuffer (length) {
if (+length != length) { // eslint-disable-line eqeqeq
length = 0
}
return Buffer.alloc(+length)
}
Buffer.isBuffer = function isBuffer (b) {
return b != null && b._isBuffer === true
}
Buffer.compare = function compare (a, b) {
if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
throw new TypeError('Arguments must be Buffers')
}
if (a === b) return 0
var x = a.length
var y = b.length
for (var i = 0, len = Math.min(x, y); i < len; ++i) {
if (a[i] !== b[i]) {
x = a[i]
y = b[i]
break
}
}
if (x < y) return -1
if (y < x) return 1
return 0
}
Buffer.isEncoding = function isEncoding (encoding) {
switch (String(encoding).toLowerCase()) {
case 'hex':
case 'utf8':
case 'utf-8':
case 'ascii':
case 'latin1':
case 'binary':
case 'base64':
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':

return true
default:
return false
}
}
Buffer.concat = function concat (list, length) {
if (!Array.isArray(list)) {
throw new TypeError('"list" argument must be an Array of Buffers')
}
if (list.length === 0) {
return Buffer.alloc(0)
}
var i
if (length === undefined) {
length = 0
for (i = 0; i < list.length; ++i) {
length += list[i].length
}
}
var buffer = Buffer.allocUnsafe(length)
var pos = 0
for (i = 0; i < list.length; ++i) {
var buf = list[i]
if (!Buffer.isBuffer(buf)) {
throw new TypeError('"list" argument must be an Array of Buffers')
}
buf.copy(buffer, pos)
pos += buf.length
}
return buffer
}
function byteLength (string, encoding) {
if (Buffer.isBuffer(string)) {
return string.length
}
if (isArrayBufferView(string) || string instanceof ArrayBuffer) {
return string.byteLength
}
if (typeof string !== 'string') {
string = '' + string
}
var len = string.length

if (len === 0) return 0
// Use a for loop to avoid recursion
var loweredCase = false
for (;;) {
switch (encoding) {
case 'ascii':
case 'latin1':
case 'binary':
return len
case 'utf8':
case 'utf-8':
case undefined:
return utf8ToBytes(string).length
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':
return len * 2
case 'hex':
return len >>> 1
case 'base64':
return base64ToBytes(string).length
default:
if (loweredCase) return utf8ToBytes(string).length // assume utf8
encoding = ('' + encoding).toLowerCase()
loweredCase = true
}
}
}
Buffer.byteLength = byteLength
function slowToString (encoding, start, end) {
var loweredCase = false
// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
if (start === undefined || start < 0) {
start = 0
}
// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if (start > this.length) {

return ''
}
if (end === undefined || end > this.length) {
end = this.length
}
if (end <= 0) {
return ''
}
// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
end >>>= 0
start >>>= 0
if (end <= start) {
return ''
}
if (!encoding) encoding = 'utf8'
while (true) {
switch (encoding) {
case 'hex':
return hexSlice(this, start, end)
case 'utf8':
case 'utf-8':
return utf8Slice(this, start, end)
case 'ascii':
return asciiSlice(this, start, end)
case 'latin1':
case 'binary':
return latin1Slice(this, start, end)
case 'base64':
return base64Slice(this, start, end)
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':
return utf16leSlice(this, start, end)
default:
if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)

encoding = (encoding + '').toLowerCase()
loweredCase = true
}
}
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true
function swap (b, n, m) {
var i = b[n]
b[n] = b[m]
b[m] = i
}
Buffer.prototype.swap16 = function swap16 () {
var len = this.length
if (len % 2 !== 0) {
throw new RangeError('Buffer size must be a multiple of 16-bits')
}
for (var i = 0; i < len; i += 2) {
swap(this, i, i + 1)
}
return this
}
Buffer.prototype.swap32 = function swap32 () {
var len = this.length
if (len % 4 !== 0) {
throw new RangeError('Buffer size must be a multiple of 32-bits')
}
for (var i = 0; i < len; i += 4) {
swap(this, i, i + 3)
swap(this, i + 1, i + 2)
}
return this
}
Buffer.prototype.swap64 = function swap64 () {
var len = this.length
if (len % 8 !== 0) {
throw new RangeError('Buffer size must be a multiple of 64-bits')
}

for (var i = 0; i < len; i += 8) {
swap(this, i, i + 7)
swap(this, i + 1, i + 6)
swap(this, i + 2, i + 5)
swap(this, i + 3, i + 4)
}
return this
}
Buffer.prototype.toString = function toString () {
var length = this.length
if (length === 0) return ''
if (arguments.length === 0) return utf8Slice(this, 0, length)
return slowToString.apply(this, arguments)
}
Buffer.prototype.equals = function equals (b) {
if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
if (this === b) return true
return Buffer.compare(this, b) === 0
}
Buffer.prototype.inspect = function inspect () {
var str = ''
var max = exports.INSPECT_MAX_BYTES
if (this.length > 0) {
str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
if (this.length > max) str += ' ... '
}
return '<Buffer ' + str + '>'
}
Buffer.prototype.compare = function compare (target, start, end, thisStart,
thisEnd) {
if (!Buffer.isBuffer(target)) {
throw new TypeError('Argument must be a Buffer')
}
if (start === undefined) {
start = 0
}
if (end === undefined) {
end = target ? target.length : 0
}
if (thisStart === undefined) {
thisStart = 0
}
if (thisEnd === undefined) {

thisEnd = this.length
}
if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length)
{
throw new RangeError('out of range index')
}
if (thisStart >= thisEnd && start >= end) {
return 0
}
if (thisStart >= thisEnd) {
return -1
}
if (start >= end) {
return 1
}
start >>>= 0
end >>>= 0
thisStart >>>= 0
thisEnd >>>= 0
if (this === target) return 0
var x = thisEnd - thisStart
var y = end - start
var len = Math.min(x, y)
var thisCopy = this.slice(thisStart, thisEnd)
var targetCopy = target.slice(start, end)
for (var i = 0; i < len; ++i) {
if (thisCopy[i] !== targetCopy[i]) {
x = thisCopy[i]
y = targetCopy[i]
break
}
}
if (x < y) return -1
if (y < x) return 1
return 0
}
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//

// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
// Empty buffer means no match
if (buffer.length === 0) return -1
// Normalize byteOffset
if (typeof byteOffset === 'string') {
encoding = byteOffset
byteOffset = 0
} else if (byteOffset > 0x7fffffff) {
byteOffset = 0x7fffffff
} else if (byteOffset < -0x80000000) {
byteOffset = -0x80000000
}
byteOffset = +byteOffset // Coerce to Number.
if (numberIsNaN(byteOffset)) {
// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole
buffer
byteOffset = dir ? 0 : (buffer.length - 1)
}
// Normalize byteOffset: negative offsets start from the end of the buffer
if (byteOffset < 0) byteOffset = buffer.length + byteOffset
if (byteOffset >= buffer.length) {
if (dir) return -1
else byteOffset = buffer.length - 1
} else if (byteOffset < 0) {
if (dir) byteOffset = 0
else return -1
}
// Normalize val
if (typeof val === 'string') {
val = Buffer.from(val, encoding)
}
// Finally, search either indexOf (if dir is true) or lastIndexOf
if (Buffer.isBuffer(val)) {
// Special case: looking for empty string/buffer always fails
if (val.length === 0) {
return -1
}
return arrayIndexOf(buffer, val, byteOffset, encoding, dir)

} else if (typeof val === 'number') {
val = val & 0xFF // Search for a byte value [0-255]
if (typeof Uint8Array.prototype.indexOf === 'function') {
if (dir) {
return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
} else {
return Uint8Array.prototype.lastIndexOf.call(buffer, val,
byteOffset)
}
}
return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
}
throw new TypeError('val must be string, number or Buffer')
}
function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
var indexSize = 1
var arrLength = arr.length
var valLength = val.length
if (encoding !== undefined) {
encoding = String(encoding).toLowerCase()
if (encoding === 'ucs2' || encoding === 'ucs-2' ||
encoding === 'utf16le' || encoding === 'utf-16le') {
if (arr.length < 2 || val.length < 2) {
return -1
}
indexSize = 2
arrLength /= 2
valLength /= 2
byteOffset /= 2
}
}
function read (buf, i) {
if (indexSize === 1) {
return buf[i]
} else {
return buf.readUInt16BE(i * indexSize)
}
}
var i
if (dir) {
var foundIndex = -1
for (i = byteOffset; i < arrLength; i++) {
if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex))

{
if (foundIndex === -1) foundIndex = i
if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
} else {
if (foundIndex !== -1) i -= i - foundIndex
foundIndex = -1
}
}
} else {
if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
for (i = byteOffset; i >= 0; i--) {
var found = true
for (var j = 0; j < valLength; j++) {
if (read(arr, i + j) !== read(val, j)) {
found = false
break
}
}
if (found) return i
}
}
return -1
}
Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
return this.indexOf(val, byteOffset, encoding) !== -1
}
Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}
Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset,
encoding) {
return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}
function hexWrite (buf, string, offset, length) {
offset = Number(offset) || 0
var remaining = buf.length - offset
if (!length) {
length = remaining
} else {
length = Number(length)
if (length > remaining) {
length = remaining
}

}
// must be an even number of digits
var strLen = string.length
if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
if (length > strLen / 2) {
length = strLen / 2
}
for (var i = 0; i < length; ++i) {
var parsed = parseInt(string.substr(i * 2, 2), 16)
if (numberIsNaN(parsed)) return i
buf[offset + i] = parsed
}
return i
}
function utf8Write (buf, string, offset, length) {
return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset,
length)
}
function asciiWrite (buf, string, offset, length) {
return blitBuffer(asciiToBytes(string), buf, offset, length)
}
function latin1Write (buf, string, offset, length) {
return asciiWrite(buf, string, offset, length)
}
function base64Write (buf, string, offset, length) {
return blitBuffer(base64ToBytes(string), buf, offset, length)
}
function ucs2Write (buf, string, offset, length) {
return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset,
length)
}
Buffer.prototype.write = function write (string, offset, length, encoding) {
// Buffer#write(string)
if (offset === undefined) {
encoding = 'utf8'
length = this.length
offset = 0
// Buffer#write(string, encoding)
} else if (length === undefined && typeof offset === 'string') {
encoding = offset

length = this.length
offset = 0
// Buffer#write(string, offset[, length][, encoding])
} else if (isFinite(offset)) {
offset = offset >>> 0
if (isFinite(length)) {
length = length >>> 0
if (encoding === undefined) encoding = 'utf8'
} else {
encoding = length
length = undefined
}
} else {
throw new Error(
'Buffer.write(string, encoding, offset[, length]) is no longer
supported'
)
}
var remaining = this.length - offset
if (length === undefined || length > remaining) length = remaining
if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length)
{
throw new RangeError('Attempt to write outside buffer bounds')
}
if (!encoding) encoding = 'utf8'
var loweredCase = false
for (;;) {
switch (encoding) {
case 'hex':
return hexWrite(this, string, offset, length)
case 'utf8':
case 'utf-8':
return utf8Write(this, string, offset, length)
case 'ascii':
return asciiWrite(this, string, offset, length)
case 'latin1':
case 'binary':
return latin1Write(this, string, offset, length)
case 'base64':
// Warning: maxLength not taken into account in base64Write

return base64Write(this, string, offset, length)
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':
return ucs2Write(this, string, offset, length)
default:
if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
encoding = ('' + encoding).toLowerCase()
loweredCase = true
}
}
}
Buffer.prototype.toJSON = function toJSON () {
return {
type: 'Buffer',
data: Array.prototype.slice.call(this._arr || this, 0)
}
}
function base64Slice (buf, start, end) {
if (start === 0 && end === buf.length) {
return base64.fromByteArray(buf)
} else {
return base64.fromByteArray(buf.slice(start, end))
}
}
function utf8Slice (buf, start, end) {
end = Math.min(buf.length, end)
var res = []
var i = start
while (i < end) {
var firstByte = buf[i]
var codePoint = null
var bytesPerSequence = (firstByte > 0xEF) ? 4
: (firstByte > 0xDF) ? 3
: (firstByte > 0xBF) ? 2
: 1
if (i + bytesPerSequence <= end) {
var secondByte, thirdByte, fourthByte, tempCodePoint
switch (bytesPerSequence) {

case 1:
if (firstByte < 0x80) {
codePoint = firstByte
}
break
case 2:
secondByte = buf[i + 1]
if ((secondByte & 0xC0) === 0x80) {
tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
if (tempCodePoint > 0x7F) {
codePoint = tempCodePoint
}
}
break
case 3:
secondByte = buf[i + 1]
thirdByte = buf[i + 2]
if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) <<
0x6 | (thirdByte & 0x3F)
if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 ||
tempCodePoint > 0xDFFF)) {
codePoint = tempCodePoint
}
}
break
case 4:
secondByte = buf[i + 1]
thirdByte = buf[i + 2]
fourthByte = buf[i + 3]
if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 &&
(fourthByte & 0xC0) === 0x80) {
tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F)
<< 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
codePoint = tempCodePoint
}
}
}
}
if (codePoint === null) {
// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
codePoint = 0xFFFD
bytesPerSequence = 1
} else if (codePoint > 0xFFFF) {
// encode to utf16 (surrogate pair dance)

codePoint -= 0x10000
res.push(codePoint >>> 10 & 0x3FF | 0xD800)
codePoint = 0xDC00 | codePoint & 0x3FF
}
res.push(codePoint)
i += bytesPerSequence
}
return decodeCodePointsArray(res)
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000
function decodeCodePointsArray (codePoints) {
var len = codePoints.length
if (len <= MAX_ARGUMENTS_LENGTH) {
return String.fromCharCode.apply(String, codePoints) // avoid extra
slice()
}
// Decode in chunks to avoid "call stack size exceeded".
var res = ''
var i = 0
while (i < len) {
res += String.fromCharCode.apply(
String,
codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
)
}
return res
}
function asciiSlice (buf, start, end) {
var ret = ''
end = Math.min(buf.length, end)
for (var i = start; i < end; ++i) {
ret += String.fromCharCode(buf[i] & 0x7F)
}
return ret
}
function latin1Slice (buf, start, end) {
var ret = ''

end = Math.min(buf.length, end)
for (var i = start; i < end; ++i) {
ret += String.fromCharCode(buf[i])
}
return ret
}
function hexSlice (buf, start, end) {
var len = buf.length
if (!start || start < 0) start = 0
if (!end || end < 0 || end > len) end = len
var out = ''
for (var i = start; i < end; ++i) {
out += toHex(buf[i])
}
return out
}
function utf16leSlice (buf, start, end) {
var bytes = buf.slice(start, end)
var res = ''
for (var i = 0; i < bytes.length; i += 2) {
res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
}
return res
}
Buffer.prototype.slice = function slice (start, end) {
var len = this.length
start = ~~start
end = end === undefined ? len : ~~end
if (start < 0) {
start += len
if (start < 0) start = 0
} else if (start > len) {
start = len
}
if (end < 0) {
end += len
if (end < 0) end = 0
} else if (end > len) {
end = len
}

if (end < start) end = start
var newBuf = this.subarray(start, end)
// Return an augmented `Uint8Array` instance
newBuf.__proto__ = Buffer.prototype
return newBuf
}
/*
* Need to make sure that buffer isn't trying to write out of bounds.
*/
function checkOffset (offset, ext, length) {
if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not
uint')
if (offset + ext > length) throw new RangeError('Trying to access beyond
buffer length')
}
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) checkOffset(offset, byteLength, this.length)
var val = this[offset]
var mul = 1
var i = 0
while (++i < byteLength && (mul *= 0x100)) {
val += this[offset + i] * mul
}
return val
}
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) {
checkOffset(offset, byteLength, this.length)
}
var val = this[offset + --byteLength]
var mul = 1
while (byteLength > 0 && (mul *= 0x100)) {
val += this[offset + --byteLength] * mul
}

return val
}
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 1, this.length)
return this[offset]
}
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 2, this.length)
return this[offset] | (this[offset + 1] << 8)
}
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 2, this.length)
return (this[offset] << 8) | this[offset + 1]
}
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return ((this[offset]) |
(this[offset + 1] << 8) |
(this[offset + 2] << 16)) +
(this[offset + 3] * 0x1000000)
}
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return (this[offset] * 0x1000000) +
((this[offset + 1] << 16) |
(this[offset + 2] << 8) |
this[offset + 3])
}
Buffer.prototype.readIntLE = function readIntLE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) checkOffset(offset, byteLength, this.length)

var val = this[offset]
var mul = 1
var i = 0
while (++i < byteLength && (mul *= 0x100)) {
val += this[offset + i] * mul
}
mul *= 0x80
if (val >= mul) val -= Math.pow(2, 8 * byteLength)
return val
}
Buffer.prototype.readIntBE = function readIntBE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) checkOffset(offset, byteLength, this.length)
var i = byteLength
var mul = 1
var val = this[offset + --i]
while (i > 0 && (mul *= 0x100)) {
val += this[offset + --i] * mul
}
mul *= 0x80
if (val >= mul) val -= Math.pow(2, 8 * byteLength)
return val
}
Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 1, this.length)
if (!(this[offset] & 0x80)) return (this[offset])
return ((0xff - this[offset] + 1) * -1)
}
Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 2, this.length)
var val = this[offset] | (this[offset + 1] << 8)
return (val & 0x8000) ? val | 0xFFFF0000 : val
}
Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
offset = offset >>> 0

if (!noAssert) checkOffset(offset, 2, this.length)
var val = this[offset + 1] | (this[offset] << 8)
return (val & 0x8000) ? val | 0xFFFF0000 : val
}
Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return (this[offset]) |
(this[offset + 1] << 8) |
(this[offset + 2] << 16) |
(this[offset + 3] << 24)
}
Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return (this[offset] << 24) |
(this[offset + 1] << 16) |
(this[offset + 2] << 8) |
(this[offset + 3])
}
Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return ieee754.read(this, offset, true, 23, 4)
}
Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return ieee754.read(this, offset, false, 23, 4)
}
Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 8, this.length)
return ieee754.read(this, offset, true, 52, 8)
}
Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 8, this.length)
return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be
a Buffer instance')
if (value > max || value < min) throw new RangeError('"value" argument is
out of bounds')
if (offset + ext > buf.length) throw new RangeError('Index out of range')
}
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset,
byteLength, noAssert) {
value = +value
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) {
var maxBytes = Math.pow(2, 8 * byteLength) - 1
checkInt(this, value, offset, byteLength, maxBytes, 0)
}
var mul = 1
var i = 0
this[offset] = value & 0xFF
while (++i < byteLength && (mul *= 0x100)) {
this[offset + i] = (value / mul) & 0xFF
}
return offset + byteLength
}
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset,
byteLength, noAssert) {
value = +value
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) {
var maxBytes = Math.pow(2, 8 * byteLength) - 1
checkInt(this, value, offset, byteLength, maxBytes, 0)
}
var i = byteLength - 1
var mul = 1
this[offset + i] = value & 0xFF
while (--i >= 0 && (mul *= 0x100)) {
this[offset + i] = (value / mul) & 0xFF
}
return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert)
{
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
this[offset] = (value & 0xff)
return offset + 1
}
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
this[offset] = (value & 0xff)
this[offset + 1] = (value >>> 8)
return offset + 2
}
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
this[offset] = (value >>> 8)
this[offset + 1] = (value & 0xff)
return offset + 2
}
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
this[offset + 3] = (value >>> 24)
this[offset + 2] = (value >>> 16)
this[offset + 1] = (value >>> 8)
this[offset] = (value & 0xff)
return offset + 4
}
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
this[offset] = (value >>> 24)

this[offset + 1] = (value >>> 16)
this[offset + 2] = (value >>> 8)
this[offset + 3] = (value & 0xff)
return offset + 4
}
Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
var limit = Math.pow(2, (8 * byteLength) - 1)
checkInt(this, value, offset, byteLength, limit - 1, -limit)
}
var i = 0
var mul = 1
var sub = 0
this[offset] = value & 0xFF
while (++i < byteLength && (mul *= 0x100)) {
if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
sub = 1
}
this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
}
return offset + byteLength
}
Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
var limit = Math.pow(2, (8 * byteLength) - 1)
checkInt(this, value, offset, byteLength, limit - 1, -limit)
}
var i = byteLength - 1
var mul = 1
var sub = 0
this[offset + i] = value & 0xFF
while (--i >= 0 && (mul *= 0x100)) {
if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
sub = 1
}

this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
}
return offset + byteLength
}
Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
if (value < 0) value = 0xff + value + 1
this[offset] = (value & 0xff)
return offset + 1
}
Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
this[offset] = (value & 0xff)
this[offset + 1] = (value >>> 8)
return offset + 2
}
Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
this[offset] = (value >>> 8)
this[offset + 1] = (value & 0xff)
return offset + 2
}
Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
this[offset] = (value & 0xff)
this[offset + 1] = (value >>> 8)
this[offset + 2] = (value >>> 16)
this[offset + 3] = (value >>> 24)
return offset + 4
}
Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset,

noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
if (value < 0) value = 0xffffffff + value + 1
this[offset] = (value >>> 24)
this[offset + 1] = (value >>> 16)
this[offset + 2] = (value >>> 8)
this[offset + 3] = (value & 0xff)
return offset + 4
}
function checkIEEE754 (buf, value, offset, ext, max, min) {
if (offset + ext > buf.length) throw new RangeError('Index out of range')
if (offset < 0) throw new RangeError('Index out of range')
}
function writeFloat (buf, value, offset, littleEndian, noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38,
-3.4028234663852886e+38)
}
ieee754.write(buf, value, offset, littleEndian, 23, 4)
return offset + 4
}
Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset,
noAssert) {
return writeFloat(this, value, offset, true, noAssert)
}
Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset,
noAssert) {
return writeFloat(this, value, offset, false, noAssert)
}
function writeDouble (buf, value, offset, littleEndian, noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308,
-1.7976931348623157E+308)
}
ieee754.write(buf, value, offset, littleEndian, 52, 8)
return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset,
noAssert) {
return writeDouble(this, value, offset, true, noAssert)
}
Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset,
noAssert) {
return writeDouble(this, value, offset, false, noAssert)
}
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
if (!start) start = 0
if (!end && end !== 0) end = this.length
if (targetStart >= target.length) targetStart = target.length
if (!targetStart) targetStart = 0
if (end > 0 && end < start) end = start
// Copy 0 bytes; we're done
if (end === start) return 0
if (target.length === 0 || this.length === 0) return 0
// Fatal error conditions
if (targetStart < 0) {
throw new RangeError('targetStart out of bounds')
}
if (start < 0 || start >= this.length) throw new RangeError('sourceStart out
of bounds')
if (end < 0) throw new RangeError('sourceEnd out of bounds')
// Are we oob?
if (end > this.length) end = this.length
if (target.length - targetStart < end - start) {
end = target.length - targetStart + start
}
var len = end - start
var i
if (this === target && start < targetStart && targetStart < end) {
// descending copy from end
for (i = len - 1; i >= 0; --i) {
target[i + targetStart] = this[i + start]
}
} else if (len < 1000) {
// ascending copy from start
for (i = 0; i < len; ++i) {

target[i + targetStart] = this[i + start]
}
} else {
Uint8Array.prototype.set.call(
target,
this.subarray(start, start + len),
targetStart
)
}
return len
}
// Usage:
// buffer.fill(number[, offset[, end]])
// buffer.fill(buffer[, offset[, end]])
// buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
// Handle string cases:
if (typeof val === 'string') {
if (typeof start === 'string') {
encoding = start
start = 0
end = this.length
} else if (typeof end === 'string') {
encoding = end
end = this.length
}
if (val.length === 1) {
var code = val.charCodeAt(0)
if (code < 256) {
val = code
}
}
if (encoding !== undefined && typeof encoding !== 'string') {
throw new TypeError('encoding must be a string')
}
if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
throw new TypeError('Unknown encoding: ' + encoding)
}
} else if (typeof val === 'number') {
val = val & 255
}
// Invalid ranges are not set to a default, so can range check early.
if (start < 0 || this.length < start || this.length < end) {
throw new RangeError('Out of range index')
}

if (end <= start) {
return this
}
start = start >>> 0
end = end === undefined ? this.length : end >>> 0
if (!val) val = 0
var i
if (typeof val === 'number') {
for (i = start; i < end; ++i) {
this[i] = val
}
} else {
var bytes = Buffer.isBuffer(val)
? val
: new Buffer(val, encoding)
var len = bytes.length
for (i = 0; i < end - start; ++i) {
this[i + start] = bytes[i % len]
}
}
return this
}
// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g
function base64clean (str) {
// Node strips out invalid characters like \n and \t from the string,
base64-js does not
str = str.trim().replace(INVALID_BASE64_RE, '')
// Node converts strings with length < 2 to ''
if (str.length < 2) return ''
// Node allows for non-padded base64 strings (missing trailing ===),
base64-js does not
while (str.length % 4 !== 0) {
str = str + '='
}
return str
}
function toHex (n) {

if (n < 16) return '0' + n.toString(16)
return n.toString(16)
}
function utf8ToBytes (string, units) {
units = units || Infinity
var codePoint
var length = string.length
var leadSurrogate = null
var bytes = []
for (var i = 0; i < length; ++i) {
codePoint = string.charCodeAt(i)
// is surrogate component
if (codePoint > 0xD7FF && codePoint < 0xE000) {
// last char was a lead
if (!leadSurrogate) {
// no lead yet
if (codePoint > 0xDBFF) {
// unexpected trail
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
continue
} else if (i + 1 === length) {
// unpaired lead
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
continue
}
// valid lead
leadSurrogate = codePoint
continue
}
// 2 leads in a row
if (codePoint < 0xDC00) {
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
leadSurrogate = codePoint
continue
}
// valid surrogate pair
codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
} else if (leadSurrogate) {
// valid bmp char, but last char was a lead
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
}

leadSurrogate = null
// encode utf8
if (codePoint < 0x80) {
if ((units -= 1) < 0) break
bytes.push(codePoint)
} else if (codePoint < 0x800) {
if ((units -= 2) < 0) break
bytes.push(
codePoint >> 0x6 | 0xC0,
codePoint & 0x3F | 0x80
)
} else if (codePoint < 0x10000) {
if ((units -= 3) < 0) break
bytes.push(
codePoint >> 0xC | 0xE0,
codePoint >> 0x6 & 0x3F | 0x80,
codePoint & 0x3F | 0x80
)
} else if (codePoint < 0x110000) {
if ((units -= 4) < 0) break
bytes.push(
codePoint >> 0x12 | 0xF0,
codePoint >> 0xC & 0x3F | 0x80,
codePoint >> 0x6 & 0x3F | 0x80,
codePoint & 0x3F | 0x80
)
} else {
throw new Error('Invalid code point')
}
}
return bytes
}
function asciiToBytes (str) {
var byteArray = []
for (var i = 0; i < str.length; ++i) {
// Node's code seems to be doing this and not & 0x7F..
byteArray.push(str.charCodeAt(i) & 0xFF)
}
return byteArray
}
function utf16leToBytes (str, units) {
var c, hi, lo
var byteArray = []

for (var i = 0; i < str.length; ++i) {
if ((units -= 2) < 0) break
c = str.charCodeAt(i)
hi = c >> 8
lo = c % 256
byteArray.push(lo)
byteArray.push(hi)
}
return byteArray
}
function base64ToBytes (str) {
return base64.toByteArray(base64clean(str))
}
function blitBuffer (src, dst, offset, length) {
for (var i = 0; i < length; ++i) {
if ((i + offset >= dst.length) || (i >= src.length)) break
dst[i + offset] = src[i]
}
return i
}
// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
return (typeof ArrayBuffer.isView === 'function') &&
ArrayBuffer.isView(obj)
}
function numberIsNaN (obj) {
return obj !== obj // eslint-disable-line no-self-compare
}
},{"base64-js":2,"ieee754":8}],6:[function(require,module,exports){
(function (Buffer){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included

// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
// NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.
function isArray(arg) {
if (Array.isArray) {
return Array.isArray(arg);
}
return objectToString(arg) === '[object Array]';
}
exports.isArray = isArray;
function isBoolean(arg) {
return typeof arg === 'boolean';
}
exports.isBoolean = isBoolean;
function isNull(arg) {
return arg === null;
}
exports.isNull = isNull;
function isNullOrUndefined(arg) {
return arg == null;
}
exports.isNullOrUndefined = isNullOrUndefined;
function isNumber(arg) {
return typeof arg === 'number';
}
exports.isNumber = isNumber;
function isString(arg) {
return typeof arg === 'string';
}
exports.isString = isString;
function isSymbol(arg) {
return typeof arg === 'symbol';

}
exports.isSymbol = isSymbol;
function isUndefined(arg) {
return arg === void 0;
}
exports.isUndefined = isUndefined;
function isRegExp(re) {
return objectToString(re) === '[object RegExp]';
}
exports.isRegExp = isRegExp;
function isObject(arg) {
return typeof arg === 'object' && arg !== null;
}
exports.isObject = isObject;
function isDate(d) {
return objectToString(d) === '[object Date]';
}
exports.isDate = isDate;
function isError(e) {
return (objectToString(e) === '[object Error]' || e instanceof Error);
}
exports.isError = isError;
function isFunction(arg) {
return typeof arg === 'function';
}
exports.isFunction = isFunction;
function isPrimitive(arg) {
return arg === null ||
typeof arg === 'boolean' ||
typeof arg === 'number' ||
typeof arg === 'string' ||
typeof arg === 'symbol' || // ES6 symbol
typeof arg === 'undefined';
}
exports.isPrimitive = isPrimitive;
exports.isBuffer = Buffer.isBuffer;
function objectToString(o) {
return Object.prototype.toString.call(o);
}

}).call(this,{"isBuffer":require("../../is-buffer/index.js")})
},{"../../is-buffer/index.js":10}],7:[function(require,module,exports){
// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
function EventEmitter() {
this._events = this._events || {};
this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;
// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;
// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;
// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
if (!isNumber(n) || n < 0 || isNaN(n))
throw TypeError('n must be a positive number');
this._maxListeners = n;
return this;
};

EventEmitter.prototype.emit = function(type) {
var er, handler, len, args, i, listeners;
if (!this._events)
this._events = {};
// If there is no 'error' event listener then throw.
if (type === 'error') {
if (!this._events.error ||
(isObject(this._events.error) && !this._events.error.length)) {
er = arguments[1];
if (er instanceof Error) {
throw er; // Unhandled 'error' event
} else {
// At least give some kind of context to the user
var err = new Error('Uncaught, unspecified "error" event. (' + er +
')');
err.context = er;
throw err;
}
}
}
handler = this._events[type];
if (isUndefined(handler))
return false;
if (isFunction(handler)) {
switch (arguments.length) {
// fast cases
case 1:
handler.call(this);
break;
case 2:
handler.call(this, arguments[1]);
break;
case 3:
handler.call(this, arguments[1], arguments[2]);
break;
// slower
default:
args = Array.prototype.slice.call(arguments, 1);
handler.apply(this, args);
}
} else if (isObject(handler)) {
args = Array.prototype.slice.call(arguments, 1);

listeners = handler.slice();
len = listeners.length;
for (i = 0; i < len; i++)
listeners[i].apply(this, args);
}
return true;
};
EventEmitter.prototype.addListener = function(type, listener) {
var m;
if (!isFunction(listener))
throw TypeError('listener must be a function');
if (!this._events)
this._events = {};
// To avoid recursion in the case that type === "newListener"! Before
// adding it to the listeners, first emit "newListener".
if (this._events.newListener)
this.emit('newListener', type,
isFunction(listener.listener) ?
listener.listener : listener);
if (!this._events[type])
// Optimize the case of one listener. Don't need the extra array object.
this._events[type] = listener;
else if (isObject(this._events[type]))
// If we've already got an array, just append.
this._events[type].push(listener);
else
// Adding the second element, need to change to array.
this._events[type] = [this._events[type], listener];
// Check for listener leak
if (isObject(this._events[type]) && !this._events[type].warned) {
if (!isUndefined(this._maxListeners)) {
m = this._maxListeners;
} else {
m = EventEmitter.defaultMaxListeners;
}
if (m && m > 0 && this._events[type].length > m) {
this._events[type].warned = true;
console.error('(node) warning: possible EventEmitter memory ' +
'leak detected. %d listeners added. ' +
'Use emitter.setMaxListeners() to increase limit.',

this._events[type].length);
if (typeof console.trace === 'function') {
// not supported in IE 10
console.trace();
}
}
}
return this;
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.once = function(type, listener) {
if (!isFunction(listener))
throw TypeError('listener must be a function');
var fired = false;
function g() {
this.removeListener(type, g);
if (!fired) {
fired = true;
listener.apply(this, arguments);
}
}
g.listener = listener;
this.on(type, g);
return this;
};
// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
var list, position, length, i;
if (!isFunction(listener))
throw TypeError('listener must be a function');
if (!this._events || !this._events[type])
return this;
list = this._events[type];
length = list.length;
position = -1;

if (list === listener ||
(isFunction(list.listener) && list.listener === listener)) {
delete this._events[type];
if (this._events.removeListener)
this.emit('removeListener', type, listener);
} else if (isObject(list)) {
for (i = length; i-- > 0;) {
if (list[i] === listener ||
(list[i].listener && list[i].listener === listener)) {
position = i;
break;
}
}
if (position < 0)
return this;
if (list.length === 1) {
list.length = 0;
delete this._events[type];
} else {
list.splice(position, 1);
}
if (this._events.removeListener)
this.emit('removeListener', type, listener);
}
return this;
};
EventEmitter.prototype.removeAllListeners = function(type) {
var key, listeners;
if (!this._events)
return this;
// not listening for removeListener, no need to emit
if (!this._events.removeListener) {
if (arguments.length === 0)
this._events = {};
else if (this._events[type])
delete this._events[type];
return this;
}
// emit removeListener for all listeners on all events

if (arguments.length === 0) {
for (key in this._events) {
if (key === 'removeListener') continue;
this.removeAllListeners(key);
}
this.removeAllListeners('removeListener');
this._events = {};
return this;
}
listeners = this._events[type];
if (isFunction(listeners)) {
this.removeListener(type, listeners);
} else if (listeners) {
// LIFO order
while (listeners.length)
this.removeListener(type, listeners[listeners.length - 1]);
}
delete this._events[type];
return this;
};
EventEmitter.prototype.listeners = function(type) {
var ret;
if (!this._events || !this._events[type])
ret = [];
else if (isFunction(this._events[type]))
ret = [this._events[type]];
else
ret = this._events[type].slice();
return ret;
};
EventEmitter.prototype.listenerCount = function(type) {
if (this._events) {
var evlistener = this._events[type];
if (isFunction(evlistener))
return 1;
else if (evlistener)
return evlistener.length;
}
return 0;
};
EventEmitter.listenerCount = function(emitter, type) {

return emitter.listenerCount(type);
};
function isFunction(arg) {
return typeof arg === 'function';
}
function isNumber(arg) {
return typeof arg === 'number';
}
function isObject(arg) {
return typeof arg === 'object' && arg !== null;
}
function isUndefined(arg) {
return arg === void 0;
}
},{}],8:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
var e, m
var eLen = nBytes * 8 - mLen - 1
var eMax = (1 << eLen) - 1
var eBias = eMax >> 1
var nBits = -7
var i = isLE ? (nBytes - 1) : 0
var d = isLE ? -1 : 1
var s = buffer[offset + i]
i += d
e = s & ((1 << (-nBits)) - 1)
s >>= (-nBits)
nBits += eLen
for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
m = e & ((1 << (-nBits)) - 1)
e >>= (-nBits)
nBits += mLen
for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
if (e === 0) {
e = 1 - eBias
} else if (e === eMax) {
return m ? NaN : ((s ? -1 : 1) * Infinity)
} else {
m = m + Math.pow(2, mLen)

e = e - eBias
}
return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}
exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
var e, m, c
var eLen = nBytes * 8 - mLen - 1
var eMax = (1 << eLen) - 1
var eBias = eMax >> 1
var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
var i = isLE ? 0 : (nBytes - 1)
var d = isLE ? 1 : -1
var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
value = Math.abs(value)
if (isNaN(value) || value === Infinity) {
m = isNaN(value) ? 1 : 0
e = eMax
} else {
e = Math.floor(Math.log(value) / Math.LN2)
if (value * (c = Math.pow(2, -e)) < 1) {
e--
c *= 2
}
if (e + eBias >= 1) {
value += rt / c
} else {
value += rt * Math.pow(2, 1 - eBias)
}
if (value * c >= 2) {
e++
c /= 2
}
if (e + eBias >= eMax) {
m = 0
e = eMax
} else if (e + eBias >= 1) {
m = (value * c - 1) * Math.pow(2, mLen)
e = e + eBias
} else {
m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
e = 0
}
}

for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -=
8) {}
e = (e << mLen) | m
eLen += mLen
for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -=
8) {}
buffer[offset + i - d] |= s * 128
}
},{}],9:[function(require,module,exports){
if (typeof Object.create === 'function') {
// implementation from standard node.js 'util' module
module.exports = function inherits(ctor, superCtor) {
ctor.super_ = superCtor
ctor.prototype = Object.create(superCtor.prototype, {
constructor: {
value: ctor,
enumerable: false,
writable: true,
configurable: true
}
});
};
} else {
// old school shim for old browsers
module.exports = function inherits(ctor, superCtor) {
ctor.super_ = superCtor
var TempCtor = function () {}
TempCtor.prototype = superCtor.prototype
ctor.prototype = new TempCtor()
ctor.prototype.constructor = ctor
}
}
},{}],10:[function(require,module,exports){
/*!
* Determine if an object is a Buffer
*
* @author Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
* @license MIT
*/
// The _isBuffer check is for Safari 5-7 support, because it's missing
// Object.prototype.constructor. Remove this eventually
module.exports = function (obj) {
return obj != null && (isBuffer(obj) || isSlowBuffer(obj) ||

!!obj._isBuffer)
}
function isBuffer (obj) {
return !!obj.constructor && typeof obj.constructor.isBuffer === 'function'
&& obj.constructor.isBuffer(obj)
}
// For Node v0.10 support. Remove this eventually.
function isSlowBuffer (obj) {
return typeof obj.readFloatLE === 'function' && typeof obj.slice ===
'function' && isBuffer(obj.slice(0, 0))
}
},{}],11:[function(require,module,exports){
var toString = {}.toString;
module.exports = Array.isArray || function (arr) {
return toString.call(arr) == '[object Array]';
};
},{}],12:[function(require,module,exports){
(function (process){
'use strict';
if (!process.version ||
process.version.indexOf('v0.') === 0 ||
process.version.indexOf('v1.') === 0 && process.version.indexOf('v1.8.')
!== 0) {
module.exports = nextTick;
} else {
module.exports = process.nextTick;
}
function nextTick(fn, arg1, arg2, arg3) {
if (typeof fn !== 'function') {
throw new TypeError('"callback" argument must be a function');
}
var len = arguments.length;
var args, i;
switch (len) {
case 0:
case 1:
return process.nextTick(fn);
case 2:
return process.nextTick(function afterTickOne() {
fn.call(null, arg1);
});

case 3:
return process.nextTick(function afterTickTwo() {
fn.call(null, arg1, arg2);
});
case 4:
return process.nextTick(function afterTickThree() {
fn.call(null, arg1, arg2, arg3);
});
default:
args = new Array(len - 1);
i = 0;
while (i < args.length) {
args[i++] = arguments[i];
}
return process.nextTick(function afterTick() {
fn.apply(null, args);
});
}
}
}).call(this,require('_process'))
},{"_process":13}],13:[function(require,module,exports){
// shim for using process in browser
var process = module.exports = {};
// cached from whatever global is present so that test runners that stub it
// don't break things. But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals. It's inside
a
// function because try/catches deoptimize in certain engines.
var cachedSetTimeout;
var cachedClearTimeout;
function defaultSetTimout() {
throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
throw new Error('clearTimeout has not been defined');
}
(function () {
try {
if (typeof setTimeout === 'function') {
cachedSetTimeout = setTimeout;
} else {
cachedSetTimeout = defaultSetTimout;
}
} catch (e) {

cachedSetTimeout = defaultSetTimout;
}
try {
if (typeof clearTimeout === 'function') {
cachedClearTimeout = clearTimeout;
} else {
cachedClearTimeout = defaultClearTimeout;
}
} catch (e) {
cachedClearTimeout = defaultClearTimeout;
}
} ())
function runTimeout(fun) {
if (cachedSetTimeout === setTimeout) {
//normal enviroments in sane situations
return setTimeout(fun, 0);
}
// if setTimeout wasn't available but was latter defined
if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) &&
setTimeout) {
cachedSetTimeout = setTimeout;
return setTimeout(fun, 0);
}
try {
// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedSetTimeout(fun, 0);
} catch(e){
try {
// When we are in I.E. but the script has been evaled so I.E. doesn't
trust the global object when called normally
return cachedSetTimeout.call(null, fun, 0);
} catch(e){
// same as above but when it's a version of I.E. that must have
the global object for 'this', hopfully our context correct otherwise it will
throw a global error
return cachedSetTimeout.call(this, fun, 0);
}
}

}
function runClearTimeout(marker) {
if (cachedClearTimeout === clearTimeout) {
//normal enviroments in sane situations
return clearTimeout(marker);
}
// if clearTimeout wasn't available but was latter defined
if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout)

&& clearTimeout) {
cachedClearTimeout = clearTimeout;
return clearTimeout(marker);
}
try {
// when when somebody has screwed with setTimeout but no I.E. maddness
return cachedClearTimeout(marker);
} catch (e){
try {
// When we are in I.E. but the script has been evaled so I.E. doesn't
trust the global object when called normally
return cachedClearTimeout.call(null, marker);
} catch (e){
// same as above but when it's a version of I.E. that must have
the global object for 'this', hopfully our context correct otherwise it will
throw a global error.
// Some versions of I.E. have different rules for clearTimeout vs
setTimeout
return cachedClearTimeout.call(this, marker);
}
}

}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;
function cleanUpNextTick() {
if (!draining || !currentQueue) {
return;
}
draining = false;
if (currentQueue.length) {
queue = currentQueue.concat(queue);
} else {
queueIndex = -1;
}
if (queue.length) {
drainQueue();
}
}
function drainQueue() {
if (draining) {
return;

}
var timeout = runTimeout(cleanUpNextTick);
draining = true;
var len = queue.length;
while(len) {
currentQueue = queue;
queue = [];
while (++queueIndex < len) {
if (currentQueue) {
currentQueue[queueIndex].run();
}
}
queueIndex = -1;
len = queue.length;
}
currentQueue = null;
draining = false;
runClearTimeout(timeout);
}
process.nextTick = function (fun) {
var args = new Array(arguments.length - 1);
if (arguments.length > 1) {
for (var i = 1; i < arguments.length; i++) {
args[i - 1] = arguments[i];
}
}
queue.push(new Item(fun, args));
if (queue.length === 1 && !draining) {
runTimeout(drainQueue);
}
};
// v8 likes predictible objects
function Item(fun, array) {
this.fun = fun;
this.array = array;
}
Item.prototype.run = function () {
this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}
process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;
process.listeners = function (name) { return [] }
process.binding = function (name) {
throw new Error('process.binding is not supported');
};
process.cwd = function () { return '/' };
process.chdir = function (dir) {
throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };
},{}],14:[function(require,module,exports){
module.exports = require('./lib/_stream_duplex.js');
},{"./lib/_stream_duplex.js":15}],15:[function(require,module,exports){
// a duplex stream is just a stream that is both readable and writable.
// Since JS doesn't have multiple prototypal inheritance, this class
// prototypally inherits from Readable, and then parasitically from
// Writable.
'use strict';
/*<replacement>*/
var objectKeys = Object.keys || function (obj) {
var keys = [];
for (var key in obj) {
keys.push(key);
}return keys;
};
/*</replacement>*/
module.exports = Duplex;

/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/
/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/
var Readable = require('./_stream_readable');
var Writable = require('./_stream_writable');
util.inherits(Duplex, Readable);
var keys = objectKeys(Writable.prototype);
for (var v = 0; v < keys.length; v++) {
var method = keys[v];
if (!Duplex.prototype[method]) Duplex.prototype[method] =
Writable.prototype[method];
}
function Duplex(options) {
if (!(this instanceof Duplex)) return new Duplex(options);
Readable.call(this, options);
Writable.call(this, options);
if (options && options.readable === false) this.readable = false;
if (options && options.writable === false) this.writable = false;
this.allowHalfOpen = true;
if (options && options.allowHalfOpen === false) this.allowHalfOpen = false;
this.once('end', onend);
}
// the no-half-open enforcer
function onend() {
// if we allow half-open state, or if the writable side ended,
// then we're ok.
if (this.allowHalfOpen || this._writableState.ended) return;
// no more data can be written.
// But allow more writes to happen in this tick.
processNextTick(onEndNT, this);
}

function onEndNT(self) {
self.end();
}
function forEach(xs, f) {
for (var i = 0, l = xs.length; i < l; i++) {
f(xs[i], i);
}
}
},{"./_stream_readable":17,"./_stream_writable":19,"core-util-is":6,"inher
its":9,"process-nextick-args":12}],16:[function(require,module,exports){
// a passthrough stream.
// basically just the most minimal sort of Transform stream.
// Every written chunk gets output as-is.
'use strict';
module.exports = PassThrough;
var Transform = require('./_stream_transform');
/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/
util.inherits(PassThrough, Transform);
function PassThrough(options) {
if (!(this instanceof PassThrough)) return new PassThrough(options);
Transform.call(this, options);
}
PassThrough.prototype._transform = function (chunk, encoding, cb) {
cb(null, chunk);
};
},{"./_stream_transform":18,"core-util-is":6,"inherits":9}],17:[function(r
equire,module,exports){
(function (process){
'use strict';
module.exports = Readable;
/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/

/*<replacement>*/
var isArray = require('isarray');
/*</replacement>*/
/*<replacement>*/
var Duplex;
/*</replacement>*/
Readable.ReadableState = ReadableState;
/*<replacement>*/
var EE = require('events').EventEmitter;
var EElistenerCount = function (emitter, type) {
return emitter.listeners(type).length;
};
/*</replacement>*/
/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/
var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/
/*<replacement>*/
var debugUtil = require('util');
var debug = void 0;
if (debugUtil && debugUtil.debuglog) {
debug = debugUtil.debuglog('stream');
} else {
debug = function () {};
}
/*</replacement>*/
var BufferList = require('./internal/streams/BufferList');
var StringDecoder;
util.inherits(Readable, Stream);
var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

function prependListener(emitter, event, fn) {
// Sadly this is not cacheable as some libraries bundle their own
// event emitter implementation with them.
if (typeof emitter.prependListener === 'function') {
return emitter.prependListener(event, fn);
} else {
// This is a hack to make sure that our error handler is attached before
any
// userland ones. NEVER DO THIS. This is here only because this code needs
// to continue to work with older versions of Node.js that do not include
// the prependListener() method. The goal is to eventually remove this
hack.
if (!emitter._events || !emitter._events[event]) emitter.on(event,
fn);else if (isArray(emitter._events[event]))
emitter._events[event].unshift(fn);else emitter._events[event] = [fn,
emitter._events[event]];
}
}
function ReadableState(options, stream) {
Duplex = Duplex || require('./_stream_duplex');
options = options || {};
// object stream flag. Used to make read(n) ignore n and to
// make all the buffer merging and length checks go away
this.objectMode = !!options.objectMode;
if (stream instanceof Duplex) this.objectMode = this.objectMode ||
!!options.readableObjectMode;
// the point at which it stops calling _read() to fill the buffer
// Note: 0 is a valid value, means "don't call _read preemptively ever"
var hwm = options.highWaterMark;
var defaultHwm = this.objectMode ? 16 : 16 * 1024;
this.highWaterMark = hwm || hwm === 0 ? hwm : defaultHwm;
// cast to ints.
this.highWaterMark = ~~this.highWaterMark;
// A linked list is used to store data chunks instead of an array because
the
// linked list can remove elements from the beginning faster than
// array.shift()
this.buffer = new BufferList();
this.length = 0;
this.pipes = null;

this.pipesCount = 0;
this.flowing = null;
this.ended = false;
this.endEmitted = false;
this.reading = false;
// a flag to be able to tell if the onwrite cb is called immediately,
// or on a later tick. We set this to true at first, because any
// actions that shouldn't happen until "later" should generally also
// not happen before the first write call.
this.sync = true;
// whenever we return null, then we set a flag to say
// that we're awaiting a 'readable' event emission.
this.needReadable = false;
this.emittedReadable = false;
this.readableListening = false;
this.resumeScheduled = false;
// Crypto is kind of old and crusty. Historically, its default string
// encoding is 'binary' so we have to make this configurable.
// Everything else in the universe uses 'utf8', though.
this.defaultEncoding = options.defaultEncoding || 'utf8';
// when piping, we only care about 'readable' events that happen
// after read()ing all the bytes and not getting any pushback.
this.ranOut = false;
// the number of writers that are awaiting a drain event in .pipe()s
this.awaitDrain = 0;
// if true, a maybeReadMore has been scheduled
this.readingMore = false;
this.decoder = null;
this.encoding = null;
if (options.encoding) {
if (!StringDecoder) StringDecoder =
require('string_decoder/').StringDecoder;
this.decoder = new StringDecoder(options.encoding);
this.encoding = options.encoding;
}
}
function Readable(options) {
Duplex = Duplex || require('./_stream_duplex');
if (!(this instanceof Readable)) return new Readable(options);

this._readableState = new ReadableState(options, this);
// legacy
this.readable = true;
if (options && typeof options.read === 'function') this._read =
options.read;
Stream.call(this);
}
// Manually shove something into the read() buffer.
// This returns true if the highWaterMark has not been hit yet,
// similar to how Writable.write() returns true if you should
// write() some more.
Readable.prototype.push = function (chunk, encoding) {
var state = this._readableState;
if (!state.objectMode && typeof chunk === 'string') {
encoding = encoding || state.defaultEncoding;
if (encoding !== state.encoding) {
chunk = bufferShim.from(chunk, encoding);
encoding = '';
}
}
return readableAddChunk(this, state, chunk, encoding, false);
};
// Unshift should *always* be something directly out of read()
Readable.prototype.unshift = function (chunk) {
var state = this._readableState;
return readableAddChunk(this, state, chunk, '', true);
};
Readable.prototype.isPaused = function () {
return this._readableState.flowing === false;
};
function readableAddChunk(stream, state, chunk, encoding, addToFront) {
var er = chunkInvalid(state, chunk);
if (er) {
stream.emit('error', er);
} else if (chunk === null) {
state.reading = false;
onEofChunk(stream, state);
} else if (state.objectMode || chunk && chunk.length > 0) {

if (state.ended && !addToFront) {
var e = new Error('stream.push() after EOF');
stream.emit('error', e);
} else if (state.endEmitted && addToFront) {
var _e = new Error('stream.unshift() after end event');
stream.emit('error', _e);
} else {
var skipAdd;
if (state.decoder && !addToFront && !encoding) {
chunk = state.decoder.write(chunk);
skipAdd = !state.objectMode && chunk.length === 0;
}
if (!addToFront) state.reading = false;
// Don't add to the buffer if we've decoded to an empty string chunk and
// we're not in object mode
if (!skipAdd) {
// if we want the data now, just emit it.
if (state.flowing && state.length === 0 && !state.sync) {
stream.emit('data', chunk);
stream.read(0);
} else {
// update the buffer info.
state.length += state.objectMode ? 1 : chunk.length;
if (addToFront) state.buffer.unshift(chunk);else
state.buffer.push(chunk);
if (state.needReadable) emitReadable(stream);
}
}
maybeReadMore(stream, state);
}
} else if (!addToFront) {
state.reading = false;
}
return needMoreData(state);
}
// if it's past the high water mark, we can push in some more.
// Also, if we have no data yet, we can stand some
// more bytes. This is to work around cases where hwm=0,
// such as the repl. Also, if the push() triggered a
// readable event, and the user called read(largeNumber) such that
// needReadable was set, then we ought to push more, so that another
// 'readable' event will be triggered.

function needMoreData(state) {
return !state.ended && (state.needReadable || state.length <
state.highWaterMark || state.length === 0);
}
// backwards compatibility.
Readable.prototype.setEncoding = function (enc) {
if (!StringDecoder) StringDecoder =
require('string_decoder/').StringDecoder;
this._readableState.decoder = new StringDecoder(enc);
this._readableState.encoding = enc;
return this;
};
// Don't raise the hwm > 8MB
var MAX_HWM = 0x800000;
function computeNewHighWaterMark(n) {
if (n >= MAX_HWM) {
n = MAX_HWM;
} else {
// Get the next highest power of 2 to prevent increasing hwm excessively
in
// tiny amounts
n--;
n |= n >>> 1;
n |= n >>> 2;
n |= n >>> 4;
n |= n >>> 8;
n |= n >>> 16;
n++;
}
return n;
}
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function howMuchToRead(n, state) {
if (n <= 0 || state.length === 0 && state.ended) return 0;
if (state.objectMode) return 1;
if (n !== n) {
// Only flow one buffer at a time
if (state.flowing && state.length) return
state.buffer.head.data.length;else return state.length;
}
// If we're asking for more than the current hwm, then raise the hwm.
if (n > state.highWaterMark) state.highWaterMark =
computeNewHighWaterMark(n);
if (n <= state.length) return n;

// Don't have enough
if (!state.ended) {
state.needReadable = true;
return 0;
}
return state.length;
}
// you can override either this method, or the async _read(n) below.
Readable.prototype.read = function (n) {
debug('read', n);
n = parseInt(n, 10);
var state = this._readableState;
var nOrig = n;
if (n !== 0) state.emittedReadable = false;
// if we're doing read(0) to trigger a readable event, but we
// already have a bunch of data in the buffer, then just trigger
// the 'readable' event and move on.
if (n === 0 && state.needReadable && (state.length >= state.highWaterMark
|| state.ended)) {
debug('read: emitReadable', state.length, state.ended);
if (state.length === 0 && state.ended) endReadable(this);else
emitReadable(this);
return null;
}
n = howMuchToRead(n, state);
// if we've ended, and we're now clear, then finish it up.
if (n === 0 && state.ended) {
if (state.length === 0) endReadable(this);
return null;
}
// All the actual chunk generation logic needs to be
// *below* the call to _read. The reason is that in certain
// synthetic stream cases, such as passthrough streams, _read
// may be a completely synchronous operation which may change
// the state of the read buffer, providing enough data when
// before there was *not* enough.
//
// So, the steps are:
// 1. Figure out what the state of things will be after we do
// a read from the buffer.
//
// 2. If that resulting state will trigger a _read, then call _read.

// Note that this may be asynchronous, or synchronous. Yes, it is
// deeply ugly to write APIs this way, but that still doesn't mean
// that the Readable class should behave improperly, as streams are
// designed to be sync/async agnostic.
// Take note if the _read call is sync or async (ie, if the read call
// has returned yet), so that we know whether or not it's safe to emit
// 'readable' etc.
//
// 3. Actually pull the requested chunks out of the buffer and return.
// if we need a readable event, then we need to do some reading.
var doRead = state.needReadable;
debug('need readable', doRead);
// if we currently have less than the highWaterMark, then also read some
if (state.length === 0 || state.length - n < state.highWaterMark) {
doRead = true;
debug('length less than watermark', doRead);
}
// however, if we've ended, then there's no point, and if we're already
// reading, then it's unnecessary.
if (state.ended || state.reading) {
doRead = false;
debug('reading or ended', doRead);
} else if (doRead) {
debug('do read');
state.reading = true;
state.sync = true;
// if the length is currently zero, then we *need* a readable event.
if (state.length === 0) state.needReadable = true;
// call internal read method
this._read(state.highWaterMark);
state.sync = false;
// If _read pushed data synchronously, then `reading` will be false,
// and we need to re-evaluate how much data we can return to the user.
if (!state.reading) n = howMuchToRead(nOrig, state);
}
var ret;
if (n > 0) ret = fromList(n, state);else ret = null;
if (ret === null) {
state.needReadable = true;
n = 0;
} else {
state.length -= n;
}

if (state.length === 0) {
// If we have nothing in the buffer, then we want to know
// as soon as we *do* get something into the buffer.
if (!state.ended) state.needReadable = true;
// If we tried to read() past the EOF, then emit end on the next tick.
if (nOrig !== n && state.ended) endReadable(this);
}
if (ret !== null) this.emit('data', ret);
return ret;
};
function chunkInvalid(state, chunk) {
var er = null;
if (!Buffer.isBuffer(chunk) && typeof chunk !== 'string' && chunk !== null
&& chunk !== undefined && !state.objectMode) {
er = new TypeError('Invalid non-string/buffer chunk');
}
return er;
}
function onEofChunk(stream, state) {
if (state.ended) return;
if (state.decoder) {
var chunk = state.decoder.end();
if (chunk && chunk.length) {
state.buffer.push(chunk);
state.length += state.objectMode ? 1 : chunk.length;
}
}
state.ended = true;
// emit 'readable' now to make sure it gets picked up.
emitReadable(stream);
}
// Don't emit readable right away in sync mode, because this can trigger
// another read() call => stack overflow. This way, it might trigger
// a nextTick recursion warning, but that's not so bad.
function emitReadable(stream) {
var state = stream._readableState;
state.needReadable = false;
if (!state.emittedReadable) {
debug('emitReadable', state.flowing);
state.emittedReadable = true;

if (state.sync) processNextTick(emitReadable_, stream);else
emitReadable_(stream);
}
}
function emitReadable_(stream) {
debug('emit readable');
stream.emit('readable');
flow(stream);
}
// at this point, the user has presumably seen the 'readable' event,
// and called read() to consume some data. that may have triggered
// in turn another _read(n) call, in which case reading = true if
// it's in progress.
// However, if we're not ended, or reading, and the length < hwm,
// then go ahead and try to read some more preemptively.
function maybeReadMore(stream, state) {
if (!state.readingMore) {
state.readingMore = true;
processNextTick(maybeReadMore_, stream, state);
}
}
function maybeReadMore_(stream, state) {
var len = state.length;
while (!state.reading && !state.flowing && !state.ended && state.length <
state.highWaterMark) {
debug('maybeReadMore read 0');
stream.read(0);
if (len === state.length)
// didn't get any data, stop spinning.
break;else len = state.length;
}
state.readingMore = false;
}
// abstract method. to be overridden in specific implementation classes.
// call cb(er, data) where data is <= n in length.
// for virtual (non-string, non-buffer) streams, "length" is somewhat
// arbitrary, and perhaps not very meaningful.
Readable.prototype._read = function (n) {
this.emit('error', new Error('_read() is not implemented'));
};
Readable.prototype.pipe = function (dest, pipeOpts) {
var src = this;
var state = this._readableState;

switch (state.pipesCount) {
case 0:
state.pipes = dest;
break;
case 1:
state.pipes = [state.pipes, dest];
break;
default:
state.pipes.push(dest);
break;
}
state.pipesCount += 1;
debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout
&& dest !== process.stderr;
var endFn = doEnd ? onend : cleanup;
if (state.endEmitted) processNextTick(endFn);else src.once('end', endFn);
dest.on('unpipe', onunpipe);
function onunpipe(readable) {
debug('onunpipe');
if (readable === src) {
cleanup();
}
}
function onend() {
debug('onend');
dest.end();
}
// when the dest drains, it reduces the awaitDrain counter
// on the source. This would be more elegant with a .once()
// handler in flow(), but adding and removing repeatedly is
// too slow.
var ondrain = pipeOnDrain(src);
dest.on('drain', ondrain);
var cleanedUp = false;
function cleanup() {
debug('cleanup');
// cleanup event handlers once the pipe is broken
dest.removeListener('close', onclose);
dest.removeListener('finish', onfinish);
dest.removeListener('drain', ondrain);

dest.removeListener('error', onerror);
dest.removeListener('unpipe', onunpipe);
src.removeListener('end', onend);
src.removeListener('end', cleanup);
src.removeListener('data', ondata);
cleanedUp = true;
// if the reader is waiting for a drain event from this
// specific writer, then it would cause it to never start
// flowing again.
// So, if this is awaiting a drain, then we just call it now.
// If we don't know, then assume that we are waiting for one.
if (state.awaitDrain && (!dest._writableState ||
dest._writableState.needDrain)) ondrain();
}
// If the user pushes more data while we're writing to dest then we'll end
up
// in ondata again. However, we only want to increase awaitDrain once because
// dest will only emit one 'drain' event for the multiple writes.
// => Introduce a guard on increasing awaitDrain.
var increasedAwaitDrain = false;
src.on('data', ondata);
function ondata(chunk) {
debug('ondata');
increasedAwaitDrain = false;
var ret = dest.write(chunk);
if (false === ret && !increasedAwaitDrain) {
// If the user unpiped during `dest.write()`, it is possible
// to get stuck in a permanently paused state if that write
// also returned false.
// => Check whether `dest` is still a piping destination.
if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount
> 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
debug('false write response, pause', src._readableState.awaitDrain);
src._readableState.awaitDrain++;
increasedAwaitDrain = true;
}
src.pause();
}
}
// if the dest has an error, then stop piping into it.
// however, don't suppress the throwing behavior for this.
function onerror(er) {
debug('onerror', er);
unpipe();

dest.removeListener('error', onerror);
if (EElistenerCount(dest, 'error') === 0) dest.emit('error', er);
}
// Make sure our error handler is attached before userland ones.
prependListener(dest, 'error', onerror);
// Both close and finish should trigger unpipe, but only once.
function onclose() {
dest.removeListener('finish', onfinish);
unpipe();
}
dest.once('close', onclose);
function onfinish() {
debug('onfinish');
dest.removeListener('close', onclose);
unpipe();
}
dest.once('finish', onfinish);
function unpipe() {
debug('unpipe');
src.unpipe(dest);
}
// tell the dest that it's being piped to
dest.emit('pipe', src);
// start the flow if it hasn't been started already.
if (!state.flowing) {
debug('pipe resume');
src.resume();
}
return dest;
};
function pipeOnDrain(src) {
return function () {
var state = src._readableState;
debug('pipeOnDrain', state.awaitDrain);
if (state.awaitDrain) state.awaitDrain--;
if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
state.flowing = true;
flow(src);
}
};
}

Readable.prototype.unpipe = function (dest) {
var state = this._readableState;
// if we're not piping anywhere, then do nothing.
if (state.pipesCount === 0) return this;
// just one destination. most common case.
if (state.pipesCount === 1) {
// passed in one, but it's not the right one.
if (dest && dest !== state.pipes) return this;
if (!dest) dest = state.pipes;
// got a match.
state.pipes = null;
state.pipesCount = 0;
state.flowing = false;
if (dest) dest.emit('unpipe', this);
return this;
}
// slow case. multiple pipe destinations.
if (!dest) {
// remove all.
var dests = state.pipes;
var len = state.pipesCount;
state.pipes = null;
state.pipesCount = 0;
state.flowing = false;
for (var i = 0; i < len; i++) {
dests[i].emit('unpipe', this);
}return this;
}
// try to find the right one.
var index = indexOf(state.pipes, dest);
if (index === -1) return this;
state.pipes.splice(index, 1);
state.pipesCount -= 1;
if (state.pipesCount === 1) state.pipes = state.pipes[0];
dest.emit('unpipe', this);
return this;

};
// set up data events if they are asked for
// Ensure readable listeners eventually get something
Readable.prototype.on = function (ev, fn) {
var res = Stream.prototype.on.call(this, ev, fn);
if (ev === 'data') {
// Start flowing on next tick if stream isn't explicitly paused
if (this._readableState.flowing !== false) this.resume();
} else if (ev === 'readable') {
var state = this._readableState;
if (!state.endEmitted && !state.readableListening) {
state.readableListening = state.needReadable = true;
state.emittedReadable = false;
if (!state.reading) {
processNextTick(nReadingNextTick, this);
} else if (state.length) {
emitReadable(this, state);
}
}
}
return res;
};
Readable.prototype.addListener = Readable.prototype.on;
function nReadingNextTick(self) {
debug('readable nexttick read 0');
self.read(0);
}
// pause() and resume() are remnants of the legacy readable stream API
// If the user uses them, then switch into old mode.
Readable.prototype.resume = function () {
var state = this._readableState;
if (!state.flowing) {
debug('resume');
state.flowing = true;
resume(this, state);
}
return this;
};
function resume(stream, state) {
if (!state.resumeScheduled) {
state.resumeScheduled = true;
processNextTick(resume_, stream, state);

}
}
function resume_(stream, state) {
if (!state.reading) {
debug('resume read 0');
stream.read(0);
}
state.resumeScheduled = false;
state.awaitDrain = 0;
stream.emit('resume');
flow(stream);
if (state.flowing && !state.reading) stream.read(0);
}
Readable.prototype.pause = function () {
debug('call pause flowing=%j', this._readableState.flowing);
if (false !== this._readableState.flowing) {
debug('pause');
this._readableState.flowing = false;
this.emit('pause');
}
return this;
};
function flow(stream) {
var state = stream._readableState;
debug('flow', state.flowing);
while (state.flowing && stream.read() !== null) {}
}
// wrap an old-style stream as the async data source.
// This is *not* part of the readable stream interface.
// It is an ugly unfortunate mess of history.
Readable.prototype.wrap = function (stream) {
var state = this._readableState;
var paused = false;
var self = this;
stream.on('end', function () {
debug('wrapped end');
if (state.decoder && !state.ended) {
var chunk = state.decoder.end();
if (chunk && chunk.length) self.push(chunk);
}
self.push(null);

});
stream.on('data', function (chunk) {
debug('wrapped data');
if (state.decoder) chunk = state.decoder.write(chunk);
// don't skip over falsy values in objectMode
if (state.objectMode && (chunk === null || chunk === undefined))
return;else if (!state.objectMode && (!chunk || !chunk.length)) return;
var ret = self.push(chunk);
if (!ret) {
paused = true;
stream.pause();
}
});
// proxy all the other methods.
// important when wrapping filters and duplexes.
for (var i in stream) {
if (this[i] === undefined && typeof stream[i] === 'function') {
this[i] = function (method) {
return function () {
return stream[method].apply(stream, arguments);
};
}(i);
}
}
// proxy certain important events.
for (var n = 0; n < kProxyEvents.length; n++) {
stream.on(kProxyEvents[n], self.emit.bind(self, kProxyEvents[n]));
}
// when we try to consume some more bytes, simply unpause the
// underlying stream.
self._read = function (n) {
debug('wrapped _read', n);
if (paused) {
paused = false;
stream.resume();
}
};
return self;
};
// exposed for testing purposes only.

Readable._fromList = fromList;
// Pluck off n bytes from an array of buffers.
// Length is the combined lengths of all the buffers in the list.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromList(n, state) {
// nothing buffered
if (state.length === 0) return null;
var ret;
if (state.objectMode) ret = state.buffer.shift();else if (!n || n >=
state.length) {
// read it all, truncate the list
if (state.decoder) ret = state.buffer.join('');else if
(state.buffer.length === 1) ret = state.buffer.head.data;else ret =
state.buffer.concat(state.length);
state.buffer.clear();
} else {
// read part of list
ret = fromListPartial(n, state.buffer, state.decoder);
}
return ret;
}
// Extracts only enough buffered data to satisfy the amount requested.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function fromListPartial(n, list, hasStrings) {
var ret;
if (n < list.head.data.length) {
// slice is the same for buffers and strings
ret = list.head.data.slice(0, n);
list.head.data = list.head.data.slice(n);
} else if (n === list.head.data.length) {
// first chunk is a perfect match
ret = list.shift();
} else {
// result spans more than one buffer
ret = hasStrings ? copyFromBufferString(n, list) : copyFromBuffer(n,
list);
}
return ret;
}
// Copies a specified amount of characters from the list of buffered data
// chunks.

// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBufferString(n, list) {
var p = list.head;
var c = 1;
var ret = p.data;
n -= ret.length;
while (p = p.next) {
var str = p.data;
var nb = n > str.length ? str.length : n;
if (nb === str.length) ret += str;else ret += str.slice(0, n);
n -= nb;
if (n === 0) {
if (nb === str.length) {
++c;
if (p.next) list.head = p.next;else list.head = list.tail = null;
} else {
list.head = p;
p.data = str.slice(nb);
}
break;
}
++c;
}
list.length -= c;
return ret;
}
// Copies a specified amount of bytes from the list of buffered data chunks.
// This function is designed to be inlinable, so please take care when making
// changes to the function body.
function copyFromBuffer(n, list) {
var ret = bufferShim.allocUnsafe(n);
var p = list.head;
var c = 1;
p.data.copy(ret);
n -= p.data.length;
while (p = p.next) {
var buf = p.data;
var nb = n > buf.length ? buf.length : n;
buf.copy(ret, ret.length - n, 0, nb);
n -= nb;
if (n === 0) {
if (nb === buf.length) {
++c;
if (p.next) list.head = p.next;else list.head = list.tail = null;
} else {
list.head = p;

p.data = buf.slice(nb);
}
break;
}
++c;
}
list.length -= c;
return ret;
}
function endReadable(stream) {
var state = stream._readableState;
// If we get here before consuming all the bytes, then that is a
// bug in node. Should never happen.
if (state.length > 0) throw new Error('"endReadable()" called on non-empty
stream');
if (!state.endEmitted) {
state.ended = true;
processNextTick(endReadableNT, state, stream);
}
}
function endReadableNT(state, stream) {
// Check that we didn't get one last unshift.
if (!state.endEmitted && state.length === 0) {
state.endEmitted = true;
stream.readable = false;
stream.emit('end');
}
}
function forEach(xs, f) {
for (var i = 0, l = xs.length; i < l; i++) {
f(xs[i], i);
}
}
function indexOf(xs, x) {
for (var i = 0, l = xs.length; i < l; i++) {
if (xs[i] === x) return i;
}
return -1;
}
}).call(this,require('_process'))
},{"./_stream_duplex":15,"./internal/streams/BufferList":20,"./internal/st
reams/stream":21,"_process":13,"buffer":5,"buffer-shims":4,"core-util-is":

6,"events":7,"inherits":9,"isarray":11,"process-nextick-args":12,"string_d
ecoder/":22,"util":3}],18:[function(require,module,exports){
// a transform stream is a readable/writable stream where you do
// something with the data. Sometimes it's called a "filter",
// but that's not a great name for it, since that implies a thing where
// some bits pass through, and others are simply ignored. (That would
// be a valid example of a transform, of course.)
//
// While the output is causally related to the input, it's not a
// necessarily symmetric or synchronous transformation. For example,
// a zlib stream might take multiple plain-text writes(), and then
// emit a single compressed chunk some time in the future.
//
// Here's how this works:
//
// The Transform stream has all the aspects of the readable and writable
// stream classes. When you write(chunk), that calls _write(chunk,cb)
// internally, and returns false if there's a lot of pending writes
// buffered up. When you call read(), that calls _read(n) until
// there's enough pending readable data buffered up.
//
// In a transform stream, the written data is placed in a buffer. When
// _read(n) is called, it transforms the queued up data, calling the
// buffered _write cb's as it consumes chunks. If consuming a single
// written chunk would result in multiple output chunks, then the first
// outputted bit calls the readcb, and subsequent chunks just go into
// the read buffer, and will cause it to emit 'readable' if necessary.
//
// This way, back-pressure is actually determined by the reading side,
// since _read has to be called to start processing a new chunk. However,
// a pathological inflate type of transform can cause excessive buffering
// here. For example, imagine a stream where every byte of input is
// interpreted as an integer from 0-255, and then results in that many
// bytes of output. Writing the 4 bytes {ff,ff,ff,ff} would result in
// 1kb of data being output. In this case, you could write a very small
// amount of input, and end up with a very large amount of output. In
// such a pathological inflating mechanism, there'd be no way to tell
// the system to stop doing the transform. A single 4MB write could
// cause the system to run out of memory.
//
// However, even in such a pathological case, only a single written chunk
// would be consumed, and then the rest would wait (un-transformed) until
// the results of the previous transformed chunk were consumed.
'use strict';
module.exports = Transform;

var Duplex = require('./_stream_duplex');
/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/
util.inherits(Transform, Duplex);
function TransformState(stream) {
this.afterTransform = function (er, data) {
return afterTransform(stream, er, data);
};
this.needTransform = false;
this.transforming = false;
this.writecb = null;
this.writechunk = null;
this.writeencoding = null;
}
function afterTransform(stream, er, data) {
var ts = stream._transformState;
ts.transforming = false;
var cb = ts.writecb;
if (!cb) return stream.emit('error', new Error('no writecb in Transform
class'));
ts.writechunk = null;
ts.writecb = null;
if (data !== null && data !== undefined) stream.push(data);
cb(er);
var rs = stream._readableState;
rs.reading = false;
if (rs.needReadable || rs.length < rs.highWaterMark) {
stream._read(rs.highWaterMark);
}
}
function Transform(options) {
if (!(this instanceof Transform)) return new Transform(options);
Duplex.call(this, options);

this._transformState = new TransformState(this);
var stream = this;
// start out asking for a readable event once data is transformed.
this._readableState.needReadable = true;
// we have implemented the _read method, and done the other things
// that Readable wants before the first _read call, so unset the
// sync guard flag.
this._readableState.sync = false;
if (options) {
if (typeof options.transform === 'function') this._transform =
options.transform;
if (typeof options.flush === 'function') this._flush = options.flush;
}
// When the writable side finishes, then flush out anything remaining.
this.once('prefinish', function () {
if (typeof this._flush === 'function') this._flush(function (er, data) {
done(stream, er, data);
});else done(stream);
});
}
Transform.prototype.push = function (chunk, encoding) {
this._transformState.needTransform = false;
return Duplex.prototype.push.call(this, chunk, encoding);
};
// This is the part where you do stuff!
// override this function in implementation classes.
// 'chunk' is an input chunk.
//
// Call `push(newChunk)` to pass along transformed output
// to the readable side. You may call 'push' zero or more times.
//
// Call `cb(err)` when you are done with this chunk. If you pass
// an error, then that'll put the hurt on the whole operation. If you
// never call cb(), then you'll never get another chunk.
Transform.prototype._transform = function (chunk, encoding, cb) {
throw new Error('_transform() is not implemented');
};
Transform.prototype._write = function (chunk, encoding, cb) {

var ts = this._transformState;
ts.writecb = cb;
ts.writechunk = chunk;
ts.writeencoding = encoding;
if (!ts.transforming) {
var rs = this._readableState;
if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark)
this._read(rs.highWaterMark);
}
};
// Doesn't matter what the args are here.
// _transform does all the work.
// That we got here means that the readable side wants more data.
Transform.prototype._read = function (n) {
var ts = this._transformState;
if (ts.writechunk !== null && ts.writecb && !ts.transforming) {
ts.transforming = true;
this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
} else {
// mark that we need a transform, so that any data that comes in
// will get processed, now that we've asked for it.
ts.needTransform = true;
}
};
function done(stream, er, data) {
if (er) return stream.emit('error', er);
if (data !== null && data !== undefined) stream.push(data);
// if there's nothing in the write buffer, then that means
// that nothing more will ever be provided
var ws = stream._writableState;
var ts = stream._transformState;
if (ws.length) throw new Error('Calling transform done when ws.length != 0');
if (ts.transforming) throw new Error('Calling transform done when still
transforming');
return stream.push(null);
}
},{"./_stream_duplex":15,"core-util-is":6,"inherits":9}],19:[function(requ
ire,module,exports){
(function (process){
// A bit simpler than readable streams.

// Implement an async ._write(chunk, encoding, cb), and it'll handle all
// the drain event emission and buffering.
'use strict';
module.exports = Writable;
/*<replacement>*/
var processNextTick = require('process-nextick-args');
/*</replacement>*/
/*<replacement>*/
var asyncWrite = !process.browser && ['v0.10',
'v0.9.'].indexOf(process.version.slice(0, 5)) > -1 ? setImmediate :
processNextTick;
/*</replacement>*/
/*<replacement>*/
var Duplex;
/*</replacement>*/
Writable.WritableState = WritableState;
/*<replacement>*/
var util = require('core-util-is');
util.inherits = require('inherits');
/*</replacement>*/
/*<replacement>*/
var internalUtil = {
deprecate: require('util-deprecate')
};
/*</replacement>*/
/*<replacement>*/
var Stream = require('./internal/streams/stream');
/*</replacement>*/
var Buffer = require('buffer').Buffer;
/*<replacement>*/
var bufferShim = require('buffer-shims');
/*</replacement>*/
util.inherits(Writable, Stream);
function nop() {}
function WriteRe

/*
JavaScript BigInteger library version 0.9.1
http://silentmatt.com/biginteger/
Copyright (c) 2009 Matthew Crumley <email@matthewcrumley.com>
Copyright (c) 2010,2011 by John Tobey <John.Tobey@gmail.com>
Licensed under the MIT license.
Support for arbitrary internal representation base was added by
Vitaly Magerya.
*/
/*
File: biginteger.js
Exports:
<BigInteger>

*/
(function(exports) {
"use strict";
/*
Class: BigInteger
An arbitrarily-large integer.
<BigInteger> objects should be considered immutable. None of the
"built-in"
methods modify *this* or their arguments. All properties should be
considered private.
All the methods of <BigInteger> instances can be called "statically".
The
static versions are convenient if you don't already have a <BigInteger>
object.
As an example, these calls are equivalent.
> BigInteger(4).multiply(5); // returns BigInteger(20);
> BigInteger.multiply(4, 5); // returns BigInteger(20);
> var a = 42;
> var a = BigInteger.toJSValue("0b101010"); // Not completely useless...
*/
var CONSTRUCT = {}; // Unique token to call "private" version of constructor
/*
Constructor: BigInteger()

Convert a value to a <BigInteger>.
Although <BigInteger()> is the constructor for <BigInteger> objects, it
is
best not to call it as a constructor. If *n* is a <BigInteger> object,
it is
simply returned as-is. Otherwise, <BigInteger()> is equivalent to
<parse>
without a radix argument.
> var n0 = BigInteger(); // Same as <BigInteger.ZERO>
> var n1 = BigInteger("123"); // Create a new <BigInteger> with value
123
> var n2 = BigInteger(123); // Create a new <BigInteger> with value
123
> var n3 = BigInteger(n2); // Return n2, unchanged
The constructor form only takes an array and a sign. *n* must be an
array of numbers in little-endian order, where each digit is between 0
and BigInteger.base. The second parameter sets the sign: -1 for
negative, +1 for positive, or 0 for zero. The array is *not copied and
may be modified*. If the array contains only zeros, the sign parameter
is ignored and is forced to zero.
> new BigInteger([5], -1): create a new BigInteger with value -5
Parameters:
n - Value to convert to a <BigInteger>.
Returns:
A <BigInteger> value.
See Also:
<parse>, <BigInteger>

*/
function BigInteger(n, s, token) {
if (token !== CONSTRUCT) {
if (n instanceof BigInteger) {
return n;
}
else if (typeof n === "undefined") {
return ZERO;
}
return BigInteger.parse(n);
}

n = n || []; // Provide the nullary constructor for subclasses.
while (n.length && !n[n.length - 1]) {
--n.length;
}
this._d = n;
this._s = n.length ? (s || 1) : 0;
}
BigInteger._construct = function(n, s) {
return new BigInteger(n, s, CONSTRUCT);
};
// Base-10 speedup hacks in parse, toString, exp10 and log functions
// require base to be a power of 10. 10^7 is the largest such power
// that won't cause a precision loss when digits are multiplied.
var BigInteger_base = 10000000;
var BigInteger_base_log10 = 7;
BigInteger.base = BigInteger_base;
BigInteger.base_log10 = BigInteger_base_log10;
var ZERO = new BigInteger([], 0, CONSTRUCT);
// Constant: ZERO
// <BigInteger> 0.
BigInteger.ZERO = ZERO;
var ONE = new BigInteger([1], 1, CONSTRUCT);
// Constant: ONE
// <BigInteger> 1.
BigInteger.ONE = ONE;
var M_ONE = new BigInteger(ONE._d, -1, CONSTRUCT);
// Constant: M_ONE
// <BigInteger> -1.
BigInteger.M_ONE = M_ONE;
// Constant: _0
// Shortcut for <ZERO>.
BigInteger._0 = ZERO;
// Constant: _1
// Shortcut for <ONE>.
BigInteger._1 = ONE;
/*
Constant: small
Array of <BigIntegers> from 0 to 36.

These are used internally for parsing, but useful when you need a "small"
<BigInteger>.
See Also:
<ZERO>, <ONE>, <_0>, <_1>

*/
BigInteger.small = [
ZERO,
ONE,
/* Assuming BigInteger_base > 36 */
new BigInteger( [2], 1, CONSTRUCT),
new BigInteger( [3], 1, CONSTRUCT),
new BigInteger( [4], 1, CONSTRUCT),
new BigInteger( [5], 1, CONSTRUCT),
new BigInteger( [6], 1, CONSTRUCT),
new BigInteger( [7], 1, CONSTRUCT),
new BigInteger( [8], 1, CONSTRUCT),
new BigInteger( [9], 1, CONSTRUCT),
new BigInteger([10], 1, CONSTRUCT),
new BigInteger([11], 1, CONSTRUCT),
new BigInteger([12], 1, CONSTRUCT),
new BigInteger([13], 1, CONSTRUCT),
new BigInteger([14], 1, CONSTRUCT),
new BigInteger([15], 1, CONSTRUCT),
new BigInteger([16], 1, CONSTRUCT),
new BigInteger([17], 1, CONSTRUCT),
new BigInteger([18], 1, CONSTRUCT),
new BigInteger([19], 1, CONSTRUCT),
new BigInteger([20], 1, CONSTRUCT),
new BigInteger([21], 1, CONSTRUCT),
new BigInteger([22], 1, CONSTRUCT),
new BigInteger([23], 1, CONSTRUCT),
new BigInteger([24], 1, CONSTRUCT),
new BigInteger([25], 1, CONSTRUCT),
new BigInteger([26], 1, CONSTRUCT),
new BigInteger([27], 1, CONSTRUCT),
new BigInteger([28], 1, CONSTRUCT),
new BigInteger([29], 1, CONSTRUCT),
new BigInteger([30], 1, CONSTRUCT),
new BigInteger([31], 1, CONSTRUCT),
new BigInteger([32], 1, CONSTRUCT),
new BigInteger([33], 1, CONSTRUCT),
new BigInteger([34], 1, CONSTRUCT),
new BigInteger([35], 1, CONSTRUCT),
new BigInteger([36], 1, CONSTRUCT)
];

// Used for parsing/radix conversion
BigInteger.digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
/*
Method: toString
Convert a <BigInteger> to a string.
When *base* is greater than 10, letters are upper case.
Parameters:
base - Optional base to represent the number in (default is base

10).

Must be between 2 and 36 inclusive, or an Error will be

thrown.
Returns:
The string representation of the <BigInteger>.

*/
BigInteger.prototype.toString = function(base) {
base = +base || 10;
if (base < 2 || base > 36) {
throw new Error("illegal radix " + base + ".");
}
if (this._s === 0) {
return "0";
}
if (base === 10) {
var str = this._s < 0 ? "-" : "";
str += this._d[this._d.length - 1].toString();
for (var i = this._d.length - 2; i >= 0; i--) {
var group = this._d[i].toString();
while (group.length < BigInteger_base_log10) group = '0' +

group;

str += group;
}
return str;
}
else {
var numerals = BigInteger.digits;
base = BigInteger.small[base];
var sign = this._s;
var n = this.abs();
var digits = [];
var digit;

while (n._s !== 0) {
var divmod = n.divRem(base);
n = divmod[0];
digit = divmod[1];
// TODO: This could be changed to unshift instead of

reversing at the end.

// Benchmark both to compare speeds.
digits.push(numerals[digit.valueOf()]);
}
return (sign < 0 ? "-" : "") + digits.reverse().join("");
}
};
// Verify strings for parsing
BigInteger.radixRegex = [
/^$/,
/^$/,
/^[01]*$/,
/^[012]*$/,
/^[0-3]*$/,
/^[0-4]*$/,
/^[0-5]*$/,
/^[0-6]*$/,
/^[0-7]*$/,
/^[0-8]*$/,
/^[0-9]*$/,
/^[0-9aA]*$/,
/^[0-9abAB]*$/,
/^[0-9abcABC]*$/,
/^[0-9a-dA-D]*$/,
/^[0-9a-eA-E]*$/,
/^[0-9a-fA-F]*$/,
/^[0-9a-gA-G]*$/,
/^[0-9a-hA-H]*$/,
/^[0-9a-iA-I]*$/,
/^[0-9a-jA-J]*$/,
/^[0-9a-kA-K]*$/,
/^[0-9a-lA-L]*$/,
/^[0-9a-mA-M]*$/,
/^[0-9a-nA-N]*$/,
/^[0-9a-oA-O]*$/,
/^[0-9a-pA-P]*$/,
/^[0-9a-qA-Q]*$/,
/^[0-9a-rA-R]*$/,
/^[0-9a-sA-S]*$/,
/^[0-9a-tA-T]*$/,
/^[0-9a-uA-U]*$/,

/^[0-9a-vA-V]*$/,
/^[0-9a-wA-W]*$/,
/^[0-9a-xA-X]*$/,
/^[0-9a-yA-Y]*$/,
/^[0-9a-zA-Z]*$/
];
/*
Function: parse
Parse a string into a <BigInteger>.
*base* is optional but, if provided, must be from 2 to 36 inclusive. If
*base* is not provided, it will be guessed based on the leading characters
of *s* as follows:
- "0x" or "0X": *base* = 16
- "0c" or "0C": *base* = 8
- "0b" or "0B": *base* = 2
- else: *base* = 10
If no base is provided, or *base* is 10, the number can be in exponential
form. For example, these are all valid:
> BigInteger.parse("1e9"); // Same as "1000000000"
> BigInteger.parse("1.234*10^3"); // Same as 1234
> BigInteger.parse("56789 * 10 ** -2"); // Same as 567
If any characters fall outside the range defined by the radix, an
exception
will be thrown.
Parameters:
s - The string to parse.
base - Optional radix (default is to guess based on *s*).
Returns:
a <BigInteger> instance.

*/
BigInteger.parse = function(s, base) {
// Expands a number in exponential form to decimal form.
// expandExponential("-13.441*10^5") === "1344100";
// expandExponential("1.12300e-1") === "0.112300";
// expandExponential(1000000000000000000000000000000) ===
"1000000000000000000000000000000";
function expandExponential(str) {
str = str.replace(/\s*[*xX]\s*10\s*(\^|\*\*)\s*/, "e");

return str.replace(/^([+\-])?(\d+)\.?(\d*)[eE]([+\-]?\d+)$/,

function(x, s, n, f, c) {
c = +c;
var l = c < 0;
var i = n.length + c;
x = (l ? n : f).length;
c = ((c = Math.abs(c)) >= x ? c - x + l : 0);
var z = (new Array(c + 1)).join("0");
var r = n + f;
return (s || "") + (l ? r = z + r : r += z).substr(0, i +=

l ? z.length : 0) + (i < r.length ? "." + r.substr(i) : "");

});
}
s = s.toString();
if (typeof base === "undefined" || +base === 10) {
s = expandExponential(s);
}
var prefixRE;
if (typeof base === "undefined") {
prefixRE = '0[xcb]';
}
else if (base == 16) {
prefixRE = '0x';
}
else if (base == 8) {
prefixRE = '0c';
}
else if (base == 2) {
prefixRE = '0b';
}
else {
prefixRE = '';
}
var parts = new RegExp('^([+\\-]?)(' + prefixRE +
')?([0-9a-z]*)(?:\\.\\d*)?$', 'i').exec(s);
if (parts) {
var sign = parts[1] || "+";
var baseSection = parts[2] || "";
var digits = parts[3] || "";
if (typeof base === "undefined") {
// Guess base
if (baseSection === "0x" || baseSection === "0X") { // Hex
base = 16;
}

else if (baseSection === "0c" || baseSection === "0C") { //

Octal

base = 8;
}
else if (baseSection === "0b" || baseSection === "0B") { //

Binary

base = 2;
}
else {
base = 10;
}
}
else if (base < 2 || base > 36) {
throw new Error("Illegal radix " + base + ".");
}
base = +base;
// Check for digits outside the range
if (!(BigInteger.radixRegex[base].test(digits))) {
throw new Error("Bad digit for radix " + base);
}
// Strip leading zeros, and convert to array
digits = digits.replace(/^0+/, "").split("");
if (digits.length === 0) {
return ZERO;
}
// Get the sign (we know it's not zero)
sign = (sign === "-") ? -1 : 1;
// Optimize 10
if (base == 10) {
var d = [];
while (digits.length >= BigInteger_base_log10) {
d.push(parseInt(digits.splice(digits.length-BigInteger.base_log10,
BigInteger.base_log10).join(''), 10));

}
d.push(parseInt(digits.join(''), 10));
return new BigInteger(d, sign, CONSTRUCT);
}
// Do the conversion
var d = ZERO;
base = BigInteger.small[base];
var small = BigInteger.small;

for (var i = 0; i < digits.length; i++) {
d = d.multiply(base).add(small[parseInt(digits[i], 36)]);
}
return new BigInteger(d._d, sign, CONSTRUCT);
}
else {
throw new Error("Invalid BigInteger format: " + s);
}
};
/*
Function: add
Add two <BigIntegers>.
Parameters:
n - The number to add to *this*. Will be converted to a <BigInteger>.
Returns:
The numbers added together.
See Also:
<subtract>, <multiply>, <quotient>, <next>

*/
BigInteger.prototype.add = function(n) {
if (this._s === 0) {
return BigInteger(n);
}
n = BigInteger(n);
if (n._s === 0) {
return this;
}
if (this._s !== n._s) {
n = n.negate();
return this.subtract(n);
}
var a = this._d;
var b = n._d;
var al = a.length;
var bl = b.length;
var sum = new Array(Math.max(al, bl) + 1);
var size = Math.min(al, bl);
var carry = 0;
var digit;

for (var i = 0; i < size; i++) {
digit = a[i] + b[i] + carry;
sum[i] = digit % BigInteger_base;
carry = (digit / BigInteger_base) | 0;
}
if (bl > al) {
a = b;
al = bl;
}
for (i = size; carry && i < al; i++) {
digit = a[i] + carry;
sum[i] = digit % BigInteger_base;
carry = (digit / BigInteger_base) | 0;
}
if (carry) {
sum[i] = carry;
}
for ( ; i < al; i++) {
sum[i] = a[i];
}
return new BigInteger(sum, this._s, CONSTRUCT);
};
/*
Function: negate
Get the additive inverse of a <BigInteger>.
Returns:
A <BigInteger> with the same magnatude, but with the opposite sign.
See Also:
<abs>

*/
BigInteger.prototype.negate = function() {
return new BigInteger(this._d, (-this._s) | 0, CONSTRUCT);
};
/*
Function: abs
Get the absolute value of a <BigInteger>.
Returns:

A <BigInteger> with the same magnatude, but always positive (or

zero).
See Also:
<negate>

*/
BigInteger.prototype.abs = function() {
return (this._s < 0) ? this.negate() : this;
};
/*
Function: subtract
Subtract two <BigIntegers>.
Parameters:
n - The number to subtract from *this*. Will be converted to a

<BigInteger>.
Returns:
The *n* subtracted from *this*.
See Also:
<add>, <multiply>, <quotient>, <prev>

*/
BigInteger.prototype.subtract = function(n) {
if (this._s === 0) {
return BigInteger(n).negate();
}
n = BigInteger(n);
if (n._s === 0) {
return this;
}
if (this._s !== n._s) {
n = n.negate();
return this.add(n);
}
var m = this;
// negative - negative => -|a| - -|b| => -|a| + |b| => |b| - |a|
if (this._s < 0) {
m = new BigInteger(n._d, 1, CONSTRUCT);
n = new BigInteger(this._d, 1, CONSTRUCT);
}

// Both are positive => a - b
var sign = m.compareAbs(n);
if (sign === 0) {
return ZERO;
}
else if (sign < 0) {
// swap m and n
var t = n;
n = m;
m = t;
}
// a > b
var a = m._d;
var b = n._d;
var al = a.length;
var bl = b.length;
var diff = new Array(al); // al >= bl since a > b
var borrow = 0;
var i;
var digit;
for (i = 0; i < bl; i++) {
digit = a[i] - borrow - b[i];
if (digit < 0) {
digit += BigInteger_base;
borrow = 1;
}
else {
borrow = 0;
}
diff[i] = digit;
}
for (i = bl; i < al; i++) {
digit = a[i] - borrow;
if (digit < 0) {
digit += BigInteger_base;
}
else {
diff[i++] = digit;
break;
}
diff[i] = digit;
}
for ( ; i < al; i++) {
diff[i] = a[i];
}

return new BigInteger(diff, sign, CONSTRUCT);
};
(function() {
function addOne(n, sign) {
var a = n._d;
var sum = a.slice();
var carry = true;
var i = 0;
while (true) {
var digit = (a[i] || 0) + 1;
sum[i] = digit % BigInteger_base;
if (digit <= BigInteger_base - 1) {
break;
}
++i;
}
return new BigInteger(sum, sign, CONSTRUCT);
}
function subtractOne(n, sign) {
var a = n._d;
var sum = a.slice();
var borrow = true;
var i = 0;
while (true) {
var digit = (a[i] || 0) - 1;
if (digit < 0) {
sum[i] = digit + BigInteger_base;
}
else {
sum[i] = digit;
break;
}
++i;
}
return new BigInteger(sum, sign, CONSTRUCT);
}
/*
Function: next
Get the next <BigInteger> (add one).

Returns:
*this* + 1.
See Also:
<add>, <prev>

*/
BigInteger.prototype.next = function() {
switch (this._s) {
case 0:
return ONE;
case -1:
return subtractOne(this, -1);
// case 1:
default:
return addOne(this, 1);
}
};
/*
Function: prev
Get the previous <BigInteger> (subtract one).
Returns:
*this* - 1.
See Also:
<next>, <subtract>

*/
BigInteger.prototype.prev = function() {
switch (this._s) {
case 0:
return M_ONE;
case -1:
return addOne(this, -1);
// case 1:
default:
return subtractOne(this, 1);
}
};
})();
/*
Function: compareAbs
Compare the absolute value of two <BigIntegers>.

Calling <compareAbs> is faster than calling <abs> twice, then <compare>.
Parameters:
n - The number to compare to *this*. Will be converted to a

<BigInteger>.
Returns:
-1, 0, or +1 if *|this|* is less than, equal to, or greater than

*|n|*.
See Also:
<compare>, <abs>

*/
BigInteger.prototype.compareAbs = function(n) {
if (this === n) {
return 0;
}
if (!(n instanceof BigInteger)) {
if (!isFinite(n)) {
return(isNaN(n) ? n : -1);
}
n = BigInteger(n);
}
if (this._s === 0) {
return (n._s !== 0) ? -1 : 0;
}
if (n._s === 0) {
return 1;
}
var l = this._d.length;
var nl = n._d.length;
if (l < nl) {
return -1;
}
else if (l > nl) {
return 1;
}
var a = this._d;
var b = n._d;
for (var i = l-1; i >= 0; i--) {

if (a[i] !== b[i]) {
return a[i] < b[i] ? -1 : 1;
}
}
return 0;
};
/*
Function: compare
Compare two <BigIntegers>.
Parameters:
n - The number to compare to *this*. Will be converted to a

<BigInteger>.
Returns:
-1, 0, or +1 if *this* is less than, equal to, or greater than *n*.
See Also:
<compareAbs>, <isPositive>, <isNegative>, <isUnit>

*/
BigInteger.prototype.compare = function(n) {
if (this === n) {
return 0;
}
n = BigInteger(n);
if (this._s === 0) {
return -n._s;
}
if (this._s === n._s) { // both positive or both negative
var cmp = this.compareAbs(n);
return cmp * this._s;
}
else {
return this._s;
}
};
/*
Function: isUnit
Return true iff *this* is either 1 or -1.

Returns:
true if *this* compares equal to <BigInteger.ONE> or

<BigInteger.M_ONE>.
See Also:
<isZero>, <isNegative>, <isPositive>, <compareAbs>, <compare>,
<BigInteger.ONE>, <BigInteger.M_ONE>

*/
BigInteger.prototype.isUnit = function() {
return this === ONE ||
this === M_ONE ||
(this._d.length === 1 && this._d[0] === 1);

};
/*
Function: multiply
Multiply two <BigIntegers>.
Parameters:
n - The number to multiply *this* by. Will be converted to a
<BigInteger>.
Returns:
The numbers multiplied together.
See Also:
<add>, <subtract>, <quotient>, <square>

*/
BigInteger.prototype.multiply = function(n) {
// TODO: Consider adding Karatsuba multiplication for large numbers
if (this._s === 0) {
return ZERO;
}
n = BigInteger(n);
if (n._s === 0) {
return ZERO;
}
if (this.isUnit()) {
if (this._s < 0) {
return n.negate();
}

return n;
}
if (n.isUnit()) {
if (n._s < 0) {
return this.negate();
}
return this;
}
if (this === n) {
return this.square();
}
var r = (this._d.length >= n._d.length);
var a = (r ? this : n)._d; // a will be longer than b
var b = (r ? n : this)._d;
var al = a.length;
var bl = b.length;
var pl = al + bl;
var partial = new Array(pl);
var i;
for (i = 0; i < pl; i++) {
partial[i] = 0;
}
for (i = 0; i < bl; i++) {
var carry = 0;
var bi = b[i];
var jlimit = al + i;
var digit;
for (var j = i; j < jlimit; j++) {
digit = partial[j] + bi * a[j - i] + carry;
carry = (digit / BigInteger_base) | 0;
partial[j] = (digit % BigInteger_base) | 0;
}
if (carry) {
digit = partial[j] + carry;
carry = (digit / BigInteger_base) | 0;
partial[j] = digit % BigInteger_base;
}
}
return new BigInteger(partial, this._s * n._s, CONSTRUCT);
};
// Multiply a BigInteger by a single-digit native number
// Assumes that this and n are >= 0
// This is not really intended to be used outside the library itself
BigInteger.prototype.multiplySingleDigit = function(n) {

if (n === 0 || this._s === 0) {
return ZERO;
}
if (n === 1) {
return this;
}
var digit;
if (this._d.length === 1) {
digit = this._d[0] * n;
if (digit >= BigInteger_base) {
return new BigInteger([(digit % BigInteger_base)|0,
(digit / BigInteger_base)|0], 1, CONSTRUCT);

}
return new BigInteger([digit], 1, CONSTRUCT);
}
if (n === 2) {
return this.add(this);
}
if (this.isUnit()) {
return new BigInteger([n], 1, CONSTRUCT);
}
var a = this._d;
var al = a.length;
var pl = al + 1;
var partial = new Array(pl);
for (var i = 0; i < pl; i++) {
partial[i] = 0;
}
var carry = 0;
for (var j = 0; j < al; j++) {
digit = n * a[j] + carry;
carry = (digit / BigInteger_base) | 0;
partial[j] = (digit % BigInteger_base) | 0;
}
if (carry) {
partial[j] = carry;
}
return new BigInteger(partial, 1, CONSTRUCT);
};
/*
Function: square

Multiply a <BigInteger> by itself.
This is slightly faster than regular multiplication, since it removes
the
duplicated multiplcations.
Returns:
> this.multiply(this)
See Also:
<multiply>

*/
BigInteger.prototype.square = function() {
// Normally, squaring a 10-digit number would take 100 multiplications.
// Of these 10 are unique diagonals, of the remaining 90 (100-10), 45
are repeated.
// This procedure saves (N*(N-1))/2 multiplications, (e.g., 45 of 100
multiplies).
// Based on code by Gary Darby, Intellitech Systems Inc.,
www.DelphiForFun.org
if (this._s === 0) {
return ZERO;
}
if (this.isUnit()) {
return ONE;
}
var digits = this._d;
var length = digits.length;
var imult1 = new Array(length + length + 1);
var product, carry, k;
var i;
// Calculate diagonal
for (i = 0; i < length; i++) {
k = i * 2;
product = digits[i] * digits[i];
carry = (product / BigInteger_base) | 0;
imult1[k] = product % BigInteger_base;
imult1[k + 1] = carry;
}
// Calculate repeating part
for (i = 0; i < length; i++) {
carry = 0;
k = i * 2 + 1;

for (var j = i + 1; j < length; j++, k++) {
product = digits[j] * digits[i] * 2 + imult1[k] + carry;
carry = (product / BigInteger_base) | 0;
imult1[k] = product % BigInteger_base;
}
k = length + i;
var digit = carry + imult1[k];
carry = (digit / BigInteger_base) | 0;
imult1[k] = digit % BigInteger_base;
imult1[k + 1] += carry;
}
return new BigInteger(imult1, 1, CONSTRUCT);
};
/*
Function: quotient
Divide two <BigIntegers> and truncate towards zero.
<quotient> throws an exception if *n* is zero.
Parameters:
n - The number to divide *this* by. Will be converted to a

<BigInteger>.
Returns:
The *this* / *n*, truncated to an integer.
See Also:
<add>, <subtract>, <multiply>, <divRem>, <remainder>

*/
BigInteger.prototype.quotient = function(n) {
return this.divRem(n)[0];
};
/*
Function: divide
Deprecated synonym for <quotient>.
*/
BigInteger.prototype.divide = BigInteger.prototype.quotient;
/*
Function: remainder
Calculate the remainder of two <BigIntegers>.

<remainder> throws an exception if *n* is zero.
Parameters:
n - The remainder after *this* is divided *this* by *n*. Will be
converted to a <BigInteger>.
Returns:
*this* % *n*.
See Also:
<divRem>, <quotient>

*/
BigInteger.prototype.remainder = function(n) {
return this.divRem(n)[1];
};
/*
Function: divRem
Calculate the integer quotient and remainder of two <BigIntegers>.
<divRem> throws an exception if *n* is zero.
Parameters:
n - The number to divide *this* by. Will be converted to a

<BigInteger>.
Returns:
A two-element array containing the quotient and the remainder.
> a.divRem(b)
is exactly equivalent to
> [a.quotient(b), a.remainder(b)]
except it is faster, because they are calculated at the same time.
See Also:
<quotient>, <remainder>

*/
BigInteger.prototype.divRem = function(n) {
n = BigInteger(n);

if (n._s === 0) {
throw new Error("Divide by zero");
}
if (this._s === 0) {
return [ZERO, ZERO];
}
if (n._d.length === 1) {
return this.divRemSmall(n._s * n._d[0]);
}
// Test for easy cases -- |n1| <= |n2|
switch (this.compareAbs(n)) {
case 0: // n1 == n2
return [this._s === n._s ? ONE : M_ONE, ZERO];
case -1: // |n1| < |n2|
return [ZERO, this];
}
var sign = this._s * n._s;
var a = n.abs();
var b_digits = this._d;
var b_index = b_digits.length;
var digits = n._d.length;
var quot = [];
var guess;
var part = new BigInteger([], 0, CONSTRUCT);
while (b_index) {
part._d.unshift(b_digits[--b_index]);
part = new BigInteger(part._d, 1, CONSTRUCT);
if (part.compareAbs(n) < 0) {
quot.push(0);
continue;
}
if (part._s === 0) {
guess = 0;
}
else {
var xlen = part._d.length, ylen = a._d.length;
var highx = part._d[xlen-1]*BigInteger_base +

part._d[xlen-2];

var highy = a._d[ylen-1]*BigInteger_base + a._d[ylen-2];
if (part._d.length > a._d.length) {
// The length of part._d can either match a._d length,
// or exceed it by one.
highx = (highx+1)*BigInteger_base;

}
guess = Math.ceil(highx/highy);
}
do {
var check = a.multiplySingleDigit(guess);
if (check.compareAbs(part) <= 0) {
break;
}
guess--;
} while (guess);
quot.push(guess);
if (!guess) {
continue;
}
var diff = part.subtract(check);
part._d = diff._d.slice();
}
return [new BigInteger(quot.reverse(), sign, CONSTRUCT),
new BigInteger(part._d, this._s, CONSTRUCT)];

};
// Throws an exception if n is outside of (-BigInteger.base, -1] or
// [1, BigInteger.base). It's not necessary to call this, since the
// other division functions will call it if they are able to.
BigInteger.prototype.divRemSmall = function(n) {
var r;
n = +n;
if (n === 0) {
throw new Error("Divide by zero");
}
var n_s = n < 0 ? -1 : 1;
var sign = this._s * n_s;
n = Math.abs(n);
if (n < 1 || n >= BigInteger_base) {
throw new Error("Argument out of range");
}
if (this._s === 0) {
return [ZERO, ZERO];
}
if (n === 1 || n === -1) {
return [(sign === 1) ? this.abs() : new BigInteger(this._d, sign,

CONSTRUCT), ZERO];

}
// 2 <= n < BigInteger_base
// divide a single digit by a single digit
if (this._d.length === 1) {
var q = new BigInteger([(this._d[0] / n) | 0], 1, CONSTRUCT);
r = new BigInteger([(this._d[0] % n) | 0], 1, CONSTRUCT);
if (sign < 0) {
q = q.negate();
}
if (this._s < 0) {
r = r.negate();
}
return [q, r];
}
var digits = this._d.slice();
var quot = new Array(digits.length);
var part = 0;
var diff = 0;
var i = 0;
var guess;
while (digits.length) {
part = part * BigInteger_base + digits[digits.length - 1];
if (part < n) {
quot[i++] = 0;
digits.pop();
diff = BigInteger_base * diff + part;
continue;
}
if (part === 0) {
guess = 0;
}
else {
guess = (part / n) | 0;
}
var check = n * guess;
diff = part - check;
quot[i++] = guess;
if (!guess) {
digits.pop();
continue;
}
digits.pop();

part = diff;
}
r = new BigInteger([diff], 1, CONSTRUCT);
if (this._s < 0) {
r = r.negate();
}
return [new BigInteger(quot.reverse(), sign, CONSTRUCT), r];
};
/*
Function: isEven
Return true iff *this* is divisible by two.
Note that <BigInteger.ZERO> is even.
Returns:
true if *this* is even, false otherwise.
See Also:
<isOdd>

*/
BigInteger.prototype.isEven = function() {
var digits = this._d;
return this._s === 0 || digits.length === 0 || (digits[0] % 2) === 0;
};
/*
Function: isOdd
Return true iff *this* is not divisible by two.
Returns:
true if *this* is odd, false otherwise.
See Also:
<isEven>

*/
BigInteger.prototype.isOdd = function() {
return !this.isEven();
};
/*
Function: sign
Get the sign of a <BigInteger>.

Returns:
* -1 if *this* < 0
* 0 if *this* == 0
* +1 if *this* > 0
See Also:
<isZero>, <isPositive>, <isNegative>, <compare>,

<BigInteger.ZERO>
*/
BigInteger.prototype.sign = function() {
return this._s;
};
/*
Function: isPositive
Return true iff *this* > 0.
Returns:
true if *this*.compare(<BigInteger.ZERO>) == 1.
See Also:
<sign>, <isZero>, <isNegative>, <isUnit>, <compare>,

<BigInteger.ZERO>
*/
BigInteger.prototype.isPositive = function() {
return this._s > 0;
};
/*
Function: isNegative
Return true iff *this* < 0.
Returns:
true if *this*.compare(<BigInteger.ZERO>) == -1.
See Also:
<sign>, <isPositive>, <isZero>, <isUnit>, <compare>,

<BigInteger.ZERO>
*/
BigInteger.prototype.isNegative = function() {
return this._s < 0;

};
/*
Function: isZero
Return true iff *this* == 0.
Returns:
true if *this*.compare(<BigInteger.ZERO>) == 0.
See Also:
<sign>, <isPositive>, <isNegative>, <isUnit>, <BigInteger.ZERO>

*/
BigInteger.prototype.isZero = function() {
return this._s === 0;
};
/*
Function: exp10
Multiply a <BigInteger> by a power of 10.
This is equivalent to, but faster than
> if (n >= 0) {
> return this.multiply(BigInteger("1e" + n));
> }
> else { // n <= 0
> return this.quotient(BigInteger("1e" + -n));
> }
Parameters:
n - The power of 10 to multiply *this* by. *n* is converted to a
javascipt number and must be no greater than <BigInteger.MAX_EXP>
(0x7FFFFFFF), or an exception will be thrown.
Returns:
*this* * (10 ** *n*), truncated to an integer if necessary.
See Also:
<pow>, <multiply>

*/
BigInteger.prototype.exp10 = function(n) {
n = +n;
if (n === 0) {

return this;
}
if (Math.abs(n) > Number(MAX_EXP)) {
throw new Error("exponent too large in BigInteger.exp10");
}
// Optimization for this == 0. This also keeps us from having to trim
zeros in the positive n case
if (this._s === 0) {
return ZERO;
}
if (n > 0) {
var k = new BigInteger(this._d.slice(), this._s, CONSTRUCT);
for (; n >= BigInteger_base_log10; n -= BigInteger_base_log10) {
k._d.unshift(0);
}
if (n == 0)
return k;
k._s = 1;
k = k.multiplySingleDigit(Math.pow(10, n));
return (this._s < 0 ? k.negate() : k);
} else if (-n >= this._d.length*BigInteger_base_log10) {
return ZERO;
} else {
var k = new BigInteger(this._d.slice(), this._s, CONSTRUCT);
for (n = -n; n >= BigInteger_base_log10; n -=

BigInteger_base_log10) {
k._d.shift();
}
return (n == 0) ? k : k.divRemSmall(Math.pow(10, n))[0];
}
};
/*
Function: pow
Raise a <BigInteger> to a power.
In this implementation, 0**0 is 1.
Parameters:
n - The exponent to raise *this* by. *n* must be no greater than
<BigInteger.MAX_EXP> (0x7FFFFFFF), or an exception will be thrown.
Returns:
*this* raised to the *nth* power.

See Also:
<modPow>

*/
BigInteger.prototype.pow = function(n) {
if (this.isUnit()) {
if (this._s > 0) {
return this;
}
else {
return BigInteger(n).isOdd() ? this : this.negate();
}
}
n = BigInteger(n);
if (n._s === 0) {
return ONE;
}
else if (n._s < 0) {
if (this._s === 0) {
throw new Error("Divide by zero");
}
else {
return ZERO;
}
}
if (this._s === 0) {
return ZERO;
}
if (n.isUnit()) {
return this;
}
if (n.compareAbs(MAX_EXP) > 0) {
throw new Error("exponent too large in BigInteger.pow");
}
var x = this;
var aux = ONE;
var two = BigInteger.small[2];
while (n.isPositive()) {
if (n.isOdd()) {
aux = aux.multiply(x);
if (n.isUnit()) {
return aux;
}
}

x = x.square();
n = n.quotient(two);
}
return aux;
};
/*
Function: modPow
Raise a <BigInteger> to a power (mod m).
Because it is reduced by a modulus, <modPow> is not limited by
<BigInteger.MAX_EXP> like <pow>.
Parameters:
exponent - The exponent to raise *this* by. Must be positive.
modulus - The modulus.
Returns:
*this* ^ *exponent* (mod *modulus*).
See Also:
<pow>, <mod>

*/
BigInteger.prototype.modPow = function(exponent, modulus) {
var result = ONE;
var base = this;
while (exponent.isPositive()) {
if (exponent.isOdd()) {
result = result.multiply(base).remainder(modulus);
}
exponent = exponent.quotient(BigInteger.small[2]);
if (exponent.isPositive()) {
base = base.square().remainder(modulus);
}
}
return result;
};
/*
Function: log
Get the natural logarithm of a <BigInteger> as a native JavaScript

number.
This is equivalent to
> Math.log(this.toJSValue())
but handles values outside of the native number range.
Returns:
log( *this* )
See Also:
<toJSValue>

*/
BigInteger.prototype.log = function() {
switch (this._s) {
case 0: return -Infinity;
case -1: return NaN;
default: // Fall through.
}
var l = this._d.length;
if (l*BigInteger_base_log10 < 30) {
return Math.log(this.valueOf());
}
var N = Math.ceil(30/BigInteger_base_log10);
var firstNdigits = this._d.slice(l - N);
return Math.log((new BigInteger(firstNdigits, 1,
CONSTRUCT)).valueOf()) + (l - N) * Math.log(BigInteger_base);
};
/*
Function: valueOf
Convert a <BigInteger> to a native JavaScript integer.
This is called automatically by JavaScipt to convert a <BigInteger> to
a
native value.
Returns:
> parseInt(this.toString(), 10)
See Also:

<toString>, <toJSValue>

*/
BigInteger.prototype.valueOf = function() {
return parseInt(this.toString(), 10);
};
/*
Function: toJSValue
Convert a <BigInteger> to a native JavaScript integer.
This is the same as valueOf, but more explicitly named.
Returns:
> parseInt(this.toString(), 10)
See Also:
<toString>, <valueOf>

*/
BigInteger.prototype.toJSValue = function() {
return parseInt(this.toString(), 10);
};
var MAX_EXP = BigInteger(0x7FFFFFFF);
// Constant: MAX_EXP
// The largest exponent allowed in <pow> and <exp10> (0x7FFFFFFF or
2147483647).
BigInteger.MAX_EXP = MAX_EXP;
(function() {
function makeUnary(fn) {
return function(a) {
return fn.call(BigInteger(a));
};
}
function makeBinary(fn) {
return function(a, b) {
return fn.call(BigInteger(a), BigInteger(b));
};
}
function makeTrinary(fn) {
return function(a, b, c) {
return fn.call(BigInteger(a), BigInteger(b),

BigInteger(c));

};
}
(function() {
var i, fn;
var unary =

"toJSValue,isEven,isOdd,sign,isZero,isNegative,abs,isUnit,square,negate,is
Positive,toString,next,prev,log".split(",");

var binary =

"compare,remainder,divRem,subtract,add,quotient,divide,multiply,pow,compar
eAbs".split(",");

var trinary = ["modPow"];
for (i = 0; i < unary.length; i++) {
fn = unary[i];
BigInteger[fn] = makeUnary(BigInteger.prototype[fn]);
}
for (i = 0; i < binary.length; i++) {
fn = binary[i];
BigInteger[fn] = makeBinary(BigInteger.prototype[fn]);
}
for (i = 0; i < trinary.length; i++) {
fn = trinary[i];
BigInteger[fn] = makeTrinary(BigInteger.prototype[fn]);
}
BigInteger.exp10 = function(x, n) {
return BigInteger(x).exp10(n);
};
})();
})();
exports.BigInteger = BigInteger;
})(typeof exports !== 'undefined' ? exports : this);

(function(f){if(typeof exports==="object"&&typeof
module!=="undefined"){module.exports=f()}else if(typeof
define==="function"&&define.amd){define([],f)}else{var g;if(typeof
window!=="undefined"){g=window}else if(typeof
global!=="undefined"){g=global}else if(typeof
self!=="undefined"){g=self}else{g=this}g.foo = f()}})(function(){var
define,module,exports;return (function e(t,n,r){function
s(o,u){if(!n[o]){if(!t[o]){var a=typeof
require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return
i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw
f.code="MODULE_NOT_FOUND",f}var
l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var
n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var
i=typeof require=="function"&&require;for(var
o=0;o<r.length;o++)s(r[o]);return
s})({1:[function(require,module,exports){
'use strict'
exports.byteLength = byteLength
exports.toByteArray = toByteArray
exports.fromByteArray = fromByteArray
var lookup = []
var revLookup = []
var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array
var code =
'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'
for (var i = 0, len = code.length; i < len; ++i) {
lookup[i] = code[i]
revLookup[code.charCodeAt(i)] = i
}
revLookup['-'.charCodeAt(0)] = 62
revLookup['_'.charCodeAt(0)] = 63
function placeHoldersCount (b64) {
var len = b64.length
if (len % 4 > 0) {
throw new Error('Invalid string. Length must be a multiple of 4')
}
// the number of equal signs (place holders)
// if there are two placeholders, than the two characters before it
// represent one byte
// if there is only one, then the three characters before it represent 2 bytes
// this is just a cheap hack to not do indexOf twice
return b64[len - 2] === '=' ? 2 : b64[len - 1] === '=' ? 1 : 0

}
function byteLength (b64) {
// base64 is 4/3 + up to two characters of the original data
return b64.length * 3 / 4 - placeHoldersCount(b64)
}
function toByteArray (b64) {
var i, j, l, tmp, placeHolders, arr
var len = b64.length
placeHolders = placeHoldersCount(b64)
arr = new Arr(len * 3 / 4 - placeHolders)
// if there are placeholders, only get up to the last complete 4 chars
l = placeHolders > 0 ? len - 4 : len
var L = 0
for (i = 0, j = 0; i < l; i += 4, j += 3) {
tmp = (revLookup[b64.charCodeAt(i)] << 18) | (revLookup[b64.charCodeAt(i
+ 1)] << 12) | (revLookup[b64.charCodeAt(i + 2)] << 6) |
revLookup[b64.charCodeAt(i + 3)]
arr[L++] = (tmp >> 16) & 0xFF
arr[L++] = (tmp >> 8) & 0xFF
arr[L++] = tmp & 0xFF
}
if (placeHolders === 2) {
tmp = (revLookup[b64.charCodeAt(i)] << 2) | (revLookup[b64.charCodeAt(i
+ 1)] >> 4)
arr[L++] = tmp & 0xFF
} else if (placeHolders === 1) {
tmp = (revLookup[b64.charCodeAt(i)] << 10) | (revLookup[b64.charCodeAt(i
+ 1)] << 4) | (revLookup[b64.charCodeAt(i + 2)] >> 2)
arr[L++] = (tmp >> 8) & 0xFF
arr[L++] = tmp & 0xFF
}
return arr
}
function tripletToBase64 (num) {
return lookup[num >> 18 & 0x3F] + lookup[num >> 12 & 0x3F] + lookup[num >>
6 & 0x3F] + lookup[num & 0x3F]
}
function encodeChunk (uint8, start, end) {

var tmp
var output = []
for (var i = start; i < end; i += 3) {
tmp = (uint8[i] << 16) + (uint8[i + 1] << 8) + (uint8[i + 2])
output.push(tripletToBase64(tmp))
}
return output.join('')
}
function fromByteArray (uint8) {
var tmp
var len = uint8.length
var extraBytes = len % 3 // if we have 1 byte left, pad 2 bytes
var output = ''
var parts = []
var maxChunkLength = 16383 // must be multiple of 3
// go through the array every three bytes, we'll deal with trailing stuff
later
for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i
+ maxChunkLength)))
}
// pad the end with zeros, but make sure to not forget the extra bytes
if (extraBytes === 1) {
tmp = uint8[len - 1]
output += lookup[tmp >> 2]
output += lookup[(tmp << 4) & 0x3F]
output += '=='
} else if (extraBytes === 2) {
tmp = (uint8[len - 2] << 8) + (uint8[len - 1])
output += lookup[tmp >> 10]
output += lookup[(tmp >> 4) & 0x3F]
output += lookup[(tmp << 2) & 0x3F]
output += '='
}
parts.push(output)
return parts.join('')
}
},{}],2:[function(require,module,exports){
/*!
* The buffer module from node.js, for the browser.
*
* @author Feross Aboukhadijeh <feross@feross.org> <http://feross.org>

* @license MIT
*/
/* eslint-disable no-proto */
'use strict'
var base64 = require('base64-js')
var ieee754 = require('ieee754')
exports.Buffer = Buffer
exports.SlowBuffer = SlowBuffer
exports.INSPECT_MAX_BYTES = 50
var K_MAX_LENGTH = 0x7fffffff
exports.kMaxLength = K_MAX_LENGTH
/**
* If `Buffer.TYPED_ARRAY_SUPPORT`:
* === true Use Uint8Array implementation (fastest)
* === false Print warning and recommend using `buffer` v4.x which has an
Object
* implementation (most compatible, even IE6)
*
* Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari
5.1+,
* Opera 11.6+, iOS 4.2+.
*
* We report that the browser does not support typed arrays if the are not
subclassable
* using __proto__. Firefox 4-29 lacks support for adding new properties to
`Uint8Array`
* (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks
support
* for __proto__ and has a buggy typed array implementation.
*/
Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport()
if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
typeof console.error === 'function') {
console.error(
'This browser lacks typed array (Uint8Array) support which is required by
' +
'`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
)
}
function typedArraySupport () {
// Can typed array instances can be augmented?

try {
var arr = new Uint8Array(1)
arr.__proto__ = {__proto__: Uint8Array.prototype, foo: function () {
return 42 }}
return arr.foo() === 42
} catch (e) {
return false
}
}
function createBuffer (length) {
if (length > K_MAX_LENGTH) {
throw new RangeError('Invalid typed array length')
}
// Return an augmented `Uint8Array` instance
var buf = new Uint8Array(length)
buf.__proto__ = Buffer.prototype
return buf
}
/**
* The Buffer constructor returns instances of `Uint8Array` that have their
* prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a
subclass of
* `Uint8Array`, so the returned instances will have all the node `Buffer`
methods
* and the `Uint8Array` methods. Square bracket notation works as expected --
it
* returns a single octet.
*
* The `Uint8Array` prototype remains unmodified.
*/
function Buffer (arg, encodingOrOffset, length) {
// Common case.
if (typeof arg === 'number') {
if (typeof encodingOrOffset === 'string') {
throw new Error(
'If encoding is specified then the first argument must be a string'
)
}
return allocUnsafe(arg)
}
return from(arg, encodingOrOffset, length)
}
// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
if (typeof Symbol !== 'undefined' && Symbol.species &&

Buffer[Symbol.species] === Buffer) {
Object.defineProperty(Buffer, Symbol.species, {
value: null,
configurable: true,
enumerable: false,
writable: false
})
}
Buffer.poolSize = 8192 // not used by this implementation
function from (value, encodingOrOffset, length) {
if (typeof value === 'number') {
throw new TypeError('"value" argument must not be a number')
}
if (value instanceof ArrayBuffer) {
return fromArrayBuffer(value, encodingOrOffset, length)
}
if (typeof value === 'string') {
return fromString(value, encodingOrOffset)
}
return fromObject(value)
}
/**
* Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
* if value is a number.
* Buffer.from(str[, encoding])
* Buffer.from(array)
* Buffer.from(buffer)
* Buffer.from(arrayBuffer[, byteOffset[, length]])
**/
Buffer.from = function (value, encodingOrOffset, length) {
return from(value, encodingOrOffset, length)
}
// Note: Change prototype *after* Buffer.from is defined to workaround Chrome
bug:
// https://github.com/feross/buffer/pull/148
Buffer.prototype.__proto__ = Uint8Array.prototype
Buffer.__proto__ = Uint8Array
function assertSize (size) {
if (typeof size !== 'number') {
throw new TypeError('"size" argument must be a number')

} else if (size < 0) {
throw new RangeError('"size" argument must not be negative')
}
}
function alloc (size, fill, encoding) {
assertSize(size)
if (size <= 0) {
return createBuffer(size)
}
if (fill !== undefined) {
// Only pay attention to encoding if it's a string. This
// prevents accidentally sending in a number that would
// be interpretted as a start offset.
return typeof encoding === 'string'
? createBuffer(size).fill(fill, encoding)
: createBuffer(size).fill(fill)
}
return createBuffer(size)
}
/**
* Creates a new filled Buffer instance.
* alloc(size[, fill[, encoding]])
**/
Buffer.alloc = function (size, fill, encoding) {
return alloc(size, fill, encoding)
}
function allocUnsafe (size) {
assertSize(size)
return createBuffer(size < 0 ? 0 : checked(size) | 0)
}
/**
* Equivalent to Buffer(num), by default creates a non-zero-filled Buffer
instance.
* */
Buffer.allocUnsafe = function (size) {
return allocUnsafe(size)
}
/**
* Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer
instance.
*/
Buffer.allocUnsafeSlow = function (size) {
return allocUnsafe(size)
}

function fromString (string, encoding) {
if (typeof encoding !== 'string' || encoding === '') {
encoding = 'utf8'
}
if (!Buffer.isEncoding(encoding)) {
throw new TypeError('"encoding" must be a valid string encoding')
}
var length = byteLength(string, encoding) | 0
var buf = createBuffer(length)
var actual = buf.write(string, encoding)
if (actual !== length) {
// Writing a hex string, for example, that contains invalid characters will
// cause everything after the first invalid character to be ignored. (e.g.
// 'abxxcd' will be treated as 'ab')
buf = buf.slice(0, actual)
}
return buf
}
function fromArrayLike (array) {
var length = array.length < 0 ? 0 : checked(array.length) | 0
var buf = createBuffer(length)
for (var i = 0; i < length; i += 1) {
buf[i] = array[i] & 255
}
return buf
}
function fromArrayBuffer (array, byteOffset, length) {
if (byteOffset < 0 || array.byteLength < byteOffset) {
throw new RangeError('\'offset\' is out of bounds')
}
if (array.byteLength < byteOffset + (length || 0)) {
throw new RangeError('\'length\' is out of bounds')
}
var buf
if (byteOffset === undefined && length === undefined) {
buf = new Uint8Array(array)
} else if (length === undefined) {
buf = new Uint8Array(array, byteOffset)

} else {
buf = new Uint8Array(array, byteOffset, length)
}
// Return an augmented `Uint8Array` instance
buf.__proto__ = Buffer.prototype
return buf
}
function fromObject (obj) {
if (Buffer.isBuffer(obj)) {
var len = checked(obj.length) | 0
var buf = createBuffer(len)
if (buf.length === 0) {
return buf
}
obj.copy(buf, 0, 0, len)
return buf
}
if (obj) {
if (isArrayBufferView(obj) || 'length' in obj) {
if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
return createBuffer(0)
}
return fromArrayLike(obj)
}
if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
return fromArrayLike(obj.data)
}
}
throw new TypeError('First argument must be a string, Buffer, ArrayBuffer,
Array, or array-like object.')
}
function checked (length) {
// Note: cannot use `length < K_MAX_LENGTH` here because that fails when
// length is NaN (which is otherwise coerced to zero.)
if (length >= K_MAX_LENGTH) {
throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
}
return length | 0
}

function SlowBuffer (length) {
if (+length != length) { // eslint-disable-line eqeqeq
length = 0
}
return Buffer.alloc(+length)
}
Buffer.isBuffer = function isBuffer (b) {
return b != null && b._isBuffer === true
}
Buffer.compare = function compare (a, b) {
if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
throw new TypeError('Arguments must be Buffers')
}
if (a === b) return 0
var x = a.length
var y = b.length
for (var i = 0, len = Math.min(x, y); i < len; ++i) {
if (a[i] !== b[i]) {
x = a[i]
y = b[i]
break
}
}
if (x < y) return -1
if (y < x) return 1
return 0
}
Buffer.isEncoding = function isEncoding (encoding) {
switch (String(encoding).toLowerCase()) {
case 'hex':
case 'utf8':
case 'utf-8':
case 'ascii':
case 'latin1':
case 'binary':
case 'base64':
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':

return true
default:
return false
}
}
Buffer.concat = function concat (list, length) {
if (!Array.isArray(list)) {
throw new TypeError('"list" argument must be an Array of Buffers')
}
if (list.length === 0) {
return Buffer.alloc(0)
}
var i
if (length === undefined) {
length = 0
for (i = 0; i < list.length; ++i) {
length += list[i].length
}
}
var buffer = Buffer.allocUnsafe(length)
var pos = 0
for (i = 0; i < list.length; ++i) {
var buf = list[i]
if (!Buffer.isBuffer(buf)) {
throw new TypeError('"list" argument must be an Array of Buffers')
}
buf.copy(buffer, pos)
pos += buf.length
}
return buffer
}
function byteLength (string, encoding) {
if (Buffer.isBuffer(string)) {
return string.length
}
if (isArrayBufferView(string) || string instanceof ArrayBuffer) {
return string.byteLength
}
if (typeof string !== 'string') {
string = '' + string
}
var len = string.length

if (len === 0) return 0
// Use a for loop to avoid recursion
var loweredCase = false
for (;;) {
switch (encoding) {
case 'ascii':
case 'latin1':
case 'binary':
return len
case 'utf8':
case 'utf-8':
case undefined:
return utf8ToBytes(string).length
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':
return len * 2
case 'hex':
return len >>> 1
case 'base64':
return base64ToBytes(string).length
default:
if (loweredCase) return utf8ToBytes(string).length // assume utf8
encoding = ('' + encoding).toLowerCase()
loweredCase = true
}
}
}
Buffer.byteLength = byteLength
function slowToString (encoding, start, end) {
var loweredCase = false
// No need to verify that "this.length <= MAX_UINT32" since it's a read-only
// property of a typed array.
// This behaves neither like String nor Uint8Array in that we set start/end
// to their upper/lower bounds if the value passed is out of range.
// undefined is handled specially as per ECMA-262 6th Edition,
// Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
if (start === undefined || start < 0) {
start = 0
}
// Return early if start > this.length. Done here to prevent potential uint32
// coercion fail below.
if (start > this.length) {

return ''
}
if (end === undefined || end > this.length) {
end = this.length
}
if (end <= 0) {
return ''
}
// Force coersion to uint32. This will also coerce falsey/NaN values to 0.
end >>>= 0
start >>>= 0
if (end <= start) {
return ''
}
if (!encoding) encoding = 'utf8'
while (true) {
switch (encoding) {
case 'hex':
return hexSlice(this, start, end)
case 'utf8':
case 'utf-8':
return utf8Slice(this, start, end)
case 'ascii':
return asciiSlice(this, start, end)
case 'latin1':
case 'binary':
return latin1Slice(this, start, end)
case 'base64':
return base64Slice(this, start, end)
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':
return utf16leSlice(this, start, end)
default:
if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)

encoding = (encoding + '').toLowerCase()
loweredCase = true
}
}
}
// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
// reliably in a browserify context because there could be multiple different
// copies of the 'buffer' package in use. This method works even for Buffer
// instances that were created from another copy of the `buffer` package.
// See: https://github.com/feross/buffer/issues/154
Buffer.prototype._isBuffer = true
function swap (b, n, m) {
var i = b[n]
b[n] = b[m]
b[m] = i
}
Buffer.prototype.swap16 = function swap16 () {
var len = this.length
if (len % 2 !== 0) {
throw new RangeError('Buffer size must be a multiple of 16-bits')
}
for (var i = 0; i < len; i += 2) {
swap(this, i, i + 1)
}
return this
}
Buffer.prototype.swap32 = function swap32 () {
var len = this.length
if (len % 4 !== 0) {
throw new RangeError('Buffer size must be a multiple of 32-bits')
}
for (var i = 0; i < len; i += 4) {
swap(this, i, i + 3)
swap(this, i + 1, i + 2)
}
return this
}
Buffer.prototype.swap64 = function swap64 () {
var len = this.length
if (len % 8 !== 0) {
throw new RangeError('Buffer size must be a multiple of 64-bits')
}

for (var i = 0; i < len; i += 8) {
swap(this, i, i + 7)
swap(this, i + 1, i + 6)
swap(this, i + 2, i + 5)
swap(this, i + 3, i + 4)
}
return this
}
Buffer.prototype.toString = function toString () {
var length = this.length
if (length === 0) return ''
if (arguments.length === 0) return utf8Slice(this, 0, length)
return slowToString.apply(this, arguments)
}
Buffer.prototype.equals = function equals (b) {
if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
if (this === b) return true
return Buffer.compare(this, b) === 0
}
Buffer.prototype.inspect = function inspect () {
var str = ''
var max = exports.INSPECT_MAX_BYTES
if (this.length > 0) {
str = this.toString('hex', 0, max).match(/.{2}/g).join(' ')
if (this.length > max) str += ' ... '
}
return '<Buffer ' + str + '>'
}
Buffer.prototype.compare = function compare (target, start, end, thisStart,
thisEnd) {
if (!Buffer.isBuffer(target)) {
throw new TypeError('Argument must be a Buffer')
}
if (start === undefined) {
start = 0
}
if (end === undefined) {
end = target ? target.length : 0
}
if (thisStart === undefined) {
thisStart = 0
}
if (thisEnd === undefined) {

thisEnd = this.length
}
if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length)
{
throw new RangeError('out of range index')
}
if (thisStart >= thisEnd && start >= end) {
return 0
}
if (thisStart >= thisEnd) {
return -1
}
if (start >= end) {
return 1
}
start >>>= 0
end >>>= 0
thisStart >>>= 0
thisEnd >>>= 0
if (this === target) return 0
var x = thisEnd - thisStart
var y = end - start
var len = Math.min(x, y)
var thisCopy = this.slice(thisStart, thisEnd)
var targetCopy = target.slice(start, end)
for (var i = 0; i < len; ++i) {
if (thisCopy[i] !== targetCopy[i]) {
x = thisCopy[i]
y = targetCopy[i]
break
}
}
if (x < y) return -1
if (y < x) return 1
return 0
}
// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
//

// Arguments:
// - buffer - a Buffer to search
// - val - a string, Buffer, or number
// - byteOffset - an index into `buffer`; will be clamped to an int32
// - encoding - an optional encoding, relevant is val is a string
// - dir - true for indexOf, false for lastIndexOf
function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
// Empty buffer means no match
if (buffer.length === 0) return -1
// Normalize byteOffset
if (typeof byteOffset === 'string') {
encoding = byteOffset
byteOffset = 0
} else if (byteOffset > 0x7fffffff) {
byteOffset = 0x7fffffff
} else if (byteOffset < -0x80000000) {
byteOffset = -0x80000000
}
byteOffset = +byteOffset // Coerce to Number.
if (numberIsNaN(byteOffset)) {
// byteOffset: it it's undefined, null, NaN, "foo", etc, search whole
buffer
byteOffset = dir ? 0 : (buffer.length - 1)
}
// Normalize byteOffset: negative offsets start from the end of the buffer
if (byteOffset < 0) byteOffset = buffer.length + byteOffset
if (byteOffset >= buffer.length) {
if (dir) return -1
else byteOffset = buffer.length - 1
} else if (byteOffset < 0) {
if (dir) byteOffset = 0
else return -1
}
// Normalize val
if (typeof val === 'string') {
val = Buffer.from(val, encoding)
}
// Finally, search either indexOf (if dir is true) or lastIndexOf
if (Buffer.isBuffer(val)) {
// Special case: looking for empty string/buffer always fails
if (val.length === 0) {
return -1
}
return arrayIndexOf(buffer, val, byteOffset, encoding, dir)

} else if (typeof val === 'number') {
val = val & 0xFF // Search for a byte value [0-255]
if (typeof Uint8Array.prototype.indexOf === 'function') {
if (dir) {
return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
} else {
return Uint8Array.prototype.lastIndexOf.call(buffer, val,
byteOffset)
}
}
return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
}
throw new TypeError('val must be string, number or Buffer')
}
function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
var indexSize = 1
var arrLength = arr.length
var valLength = val.length
if (encoding !== undefined) {
encoding = String(encoding).toLowerCase()
if (encoding === 'ucs2' || encoding === 'ucs-2' ||
encoding === 'utf16le' || encoding === 'utf-16le') {
if (arr.length < 2 || val.length < 2) {
return -1
}
indexSize = 2
arrLength /= 2
valLength /= 2
byteOffset /= 2
}
}
function read (buf, i) {
if (indexSize === 1) {
return buf[i]
} else {
return buf.readUInt16BE(i * indexSize)
}
}
var i
if (dir) {
var foundIndex = -1
for (i = byteOffset; i < arrLength; i++) {
if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex))

{
if (foundIndex === -1) foundIndex = i
if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
} else {
if (foundIndex !== -1) i -= i - foundIndex
foundIndex = -1
}
}
} else {
if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength
for (i = byteOffset; i >= 0; i--) {
var found = true
for (var j = 0; j < valLength; j++) {
if (read(arr, i + j) !== read(val, j)) {
found = false
break
}
}
if (found) return i
}
}
return -1
}
Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
return this.indexOf(val, byteOffset, encoding) !== -1
}
Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
}
Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset,
encoding) {
return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
}
function hexWrite (buf, string, offset, length) {
offset = Number(offset) || 0
var remaining = buf.length - offset
if (!length) {
length = remaining
} else {
length = Number(length)
if (length > remaining) {
length = remaining
}

}
// must be an even number of digits
var strLen = string.length
if (strLen % 2 !== 0) throw new TypeError('Invalid hex string')
if (length > strLen / 2) {
length = strLen / 2
}
for (var i = 0; i < length; ++i) {
var parsed = parseInt(string.substr(i * 2, 2), 16)
if (numberIsNaN(parsed)) return i
buf[offset + i] = parsed
}
return i
}
function utf8Write (buf, string, offset, length) {
return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset,
length)
}
function asciiWrite (buf, string, offset, length) {
return blitBuffer(asciiToBytes(string), buf, offset, length)
}
function latin1Write (buf, string, offset, length) {
return asciiWrite(buf, string, offset, length)
}
function base64Write (buf, string, offset, length) {
return blitBuffer(base64ToBytes(string), buf, offset, length)
}
function ucs2Write (buf, string, offset, length) {
return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset,
length)
}
Buffer.prototype.write = function write (string, offset, length, encoding) {
// Buffer#write(string)
if (offset === undefined) {
encoding = 'utf8'
length = this.length
offset = 0
// Buffer#write(string, encoding)
} else if (length === undefined && typeof offset === 'string') {
encoding = offset

length = this.length
offset = 0
// Buffer#write(string, offset[, length][, encoding])
} else if (isFinite(offset)) {
offset = offset >>> 0
if (isFinite(length)) {
length = length >>> 0
if (encoding === undefined) encoding = 'utf8'
} else {
encoding = length
length = undefined
}
} else {
throw new Error(
'Buffer.write(string, encoding, offset[, length]) is no longer
supported'
)
}
var remaining = this.length - offset
if (length === undefined || length > remaining) length = remaining
if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length)
{
throw new RangeError('Attempt to write outside buffer bounds')
}
if (!encoding) encoding = 'utf8'
var loweredCase = false
for (;;) {
switch (encoding) {
case 'hex':
return hexWrite(this, string, offset, length)
case 'utf8':
case 'utf-8':
return utf8Write(this, string, offset, length)
case 'ascii':
return asciiWrite(this, string, offset, length)
case 'latin1':
case 'binary':
return latin1Write(this, string, offset, length)
case 'base64':
// Warning: maxLength not taken into account in base64Write

return base64Write(this, string, offset, length)
case 'ucs2':
case 'ucs-2':
case 'utf16le':
case 'utf-16le':
return ucs2Write(this, string, offset, length)
default:
if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
encoding = ('' + encoding).toLowerCase()
loweredCase = true
}
}
}
Buffer.prototype.toJSON = function toJSON () {
return {
type: 'Buffer',
data: Array.prototype.slice.call(this._arr || this, 0)
}
}
function base64Slice (buf, start, end) {
if (start === 0 && end === buf.length) {
return base64.fromByteArray(buf)
} else {
return base64.fromByteArray(buf.slice(start, end))
}
}
function utf8Slice (buf, start, end) {
end = Math.min(buf.length, end)
var res = []
var i = start
while (i < end) {
var firstByte = buf[i]
var codePoint = null
var bytesPerSequence = (firstByte > 0xEF) ? 4
: (firstByte > 0xDF) ? 3
: (firstByte > 0xBF) ? 2
: 1
if (i + bytesPerSequence <= end) {
var secondByte, thirdByte, fourthByte, tempCodePoint
switch (bytesPerSequence) {

case 1:
if (firstByte < 0x80) {
codePoint = firstByte
}
break
case 2:
secondByte = buf[i + 1]
if ((secondByte & 0xC0) === 0x80) {
tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F)
if (tempCodePoint > 0x7F) {
codePoint = tempCodePoint
}
}
break
case 3:
secondByte = buf[i + 1]
thirdByte = buf[i + 2]
if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) <<
0x6 | (thirdByte & 0x3F)
if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 ||
tempCodePoint > 0xDFFF)) {
codePoint = tempCodePoint
}
}
break
case 4:
secondByte = buf[i + 1]
thirdByte = buf[i + 2]
fourthByte = buf[i + 3]
if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 &&
(fourthByte & 0xC0) === 0x80) {
tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F)
<< 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F)
if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
codePoint = tempCodePoint
}
}
}
}
if (codePoint === null) {
// we did not generate a valid codePoint so insert a
// replacement char (U+FFFD) and advance only 1 byte
codePoint = 0xFFFD
bytesPerSequence = 1
} else if (codePoint > 0xFFFF) {
// encode to utf16 (surrogate pair dance)

codePoint -= 0x10000
res.push(codePoint >>> 10 & 0x3FF | 0xD800)
codePoint = 0xDC00 | codePoint & 0x3FF
}
res.push(codePoint)
i += bytesPerSequence
}
return decodeCodePointsArray(res)
}
// Based on http://stackoverflow.com/a/22747272/680742, the browser with
// the lowest limit is Chrome, with 0x10000 args.
// We go 1 magnitude less, for safety
var MAX_ARGUMENTS_LENGTH = 0x1000
function decodeCodePointsArray (codePoints) {
var len = codePoints.length
if (len <= MAX_ARGUMENTS_LENGTH) {
return String.fromCharCode.apply(String, codePoints) // avoid extra
slice()
}
// Decode in chunks to avoid "call stack size exceeded".
var res = ''
var i = 0
while (i < len) {
res += String.fromCharCode.apply(
String,
codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
)
}
return res
}
function asciiSlice (buf, start, end) {
var ret = ''
end = Math.min(buf.length, end)
for (var i = start; i < end; ++i) {
ret += String.fromCharCode(buf[i] & 0x7F)
}
return ret
}
function latin1Slice (buf, start, end) {
var ret = ''

end = Math.min(buf.length, end)
for (var i = start; i < end; ++i) {
ret += String.fromCharCode(buf[i])
}
return ret
}
function hexSlice (buf, start, end) {
var len = buf.length
if (!start || start < 0) start = 0
if (!end || end < 0 || end > len) end = len
var out = ''
for (var i = start; i < end; ++i) {
out += toHex(buf[i])
}
return out
}
function utf16leSlice (buf, start, end) {
var bytes = buf.slice(start, end)
var res = ''
for (var i = 0; i < bytes.length; i += 2) {
res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256))
}
return res
}
Buffer.prototype.slice = function slice (start, end) {
var len = this.length
start = ~~start
end = end === undefined ? len : ~~end
if (start < 0) {
start += len
if (start < 0) start = 0
} else if (start > len) {
start = len
}
if (end < 0) {
end += len
if (end < 0) end = 0
} else if (end > len) {
end = len
}

if (end < start) end = start
var newBuf = this.subarray(start, end)
// Return an augmented `Uint8Array` instance
newBuf.__proto__ = Buffer.prototype
return newBuf
}
/*
* Need to make sure that buffer isn't trying to write out of bounds.
*/
function checkOffset (offset, ext, length) {
if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not
uint')
if (offset + ext > length) throw new RangeError('Trying to access beyond
buffer length')
}
Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) checkOffset(offset, byteLength, this.length)
var val = this[offset]
var mul = 1
var i = 0
while (++i < byteLength && (mul *= 0x100)) {
val += this[offset + i] * mul
}
return val
}
Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) {
checkOffset(offset, byteLength, this.length)
}
var val = this[offset + --byteLength]
var mul = 1
while (byteLength > 0 && (mul *= 0x100)) {
val += this[offset + --byteLength] * mul
}

return val
}
Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 1, this.length)
return this[offset]
}
Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 2, this.length)
return this[offset] | (this[offset + 1] << 8)
}
Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 2, this.length)
return (this[offset] << 8) | this[offset + 1]
}
Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return ((this[offset]) |
(this[offset + 1] << 8) |
(this[offset + 2] << 16)) +
(this[offset + 3] * 0x1000000)
}
Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return (this[offset] * 0x1000000) +
((this[offset + 1] << 16) |
(this[offset + 2] << 8) |
this[offset + 3])
}
Buffer.prototype.readIntLE = function readIntLE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) checkOffset(offset, byteLength, this.length)

var val = this[offset]
var mul = 1
var i = 0
while (++i < byteLength && (mul *= 0x100)) {
val += this[offset + i] * mul
}
mul *= 0x80
if (val >= mul) val -= Math.pow(2, 8 * byteLength)
return val
}
Buffer.prototype.readIntBE = function readIntBE (offset, byteLength,
noAssert) {
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) checkOffset(offset, byteLength, this.length)
var i = byteLength
var mul = 1
var val = this[offset + --i]
while (i > 0 && (mul *= 0x100)) {
val += this[offset + --i] * mul
}
mul *= 0x80
if (val >= mul) val -= Math.pow(2, 8 * byteLength)
return val
}
Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 1, this.length)
if (!(this[offset] & 0x80)) return (this[offset])
return ((0xff - this[offset] + 1) * -1)
}
Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 2, this.length)
var val = this[offset] | (this[offset + 1] << 8)
return (val & 0x8000) ? val | 0xFFFF0000 : val
}
Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
offset = offset >>> 0

if (!noAssert) checkOffset(offset, 2, this.length)
var val = this[offset + 1] | (this[offset] << 8)
return (val & 0x8000) ? val | 0xFFFF0000 : val
}
Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return (this[offset]) |
(this[offset + 1] << 8) |
(this[offset + 2] << 16) |
(this[offset + 3] << 24)
}
Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return (this[offset] << 24) |
(this[offset + 1] << 16) |
(this[offset + 2] << 8) |
(this[offset + 3])
}
Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return ieee754.read(this, offset, true, 23, 4)
}
Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 4, this.length)
return ieee754.read(this, offset, false, 23, 4)
}
Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 8, this.length)
return ieee754.read(this, offset, true, 52, 8)
}
Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
offset = offset >>> 0
if (!noAssert) checkOffset(offset, 8, this.length)
return ieee754.read(this, offset, false, 52, 8)
}

function checkInt (buf, value, offset, ext, max, min) {
if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be
a Buffer instance')
if (value > max || value < min) throw new RangeError('"value" argument is
out of bounds')
if (offset + ext > buf.length) throw new RangeError('Index out of range')
}
Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset,
byteLength, noAssert) {
value = +value
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) {
var maxBytes = Math.pow(2, 8 * byteLength) - 1
checkInt(this, value, offset, byteLength, maxBytes, 0)
}
var mul = 1
var i = 0
this[offset] = value & 0xFF
while (++i < byteLength && (mul *= 0x100)) {
this[offset + i] = (value / mul) & 0xFF
}
return offset + byteLength
}
Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset,
byteLength, noAssert) {
value = +value
offset = offset >>> 0
byteLength = byteLength >>> 0
if (!noAssert) {
var maxBytes = Math.pow(2, 8 * byteLength) - 1
checkInt(this, value, offset, byteLength, maxBytes, 0)
}
var i = byteLength - 1
var mul = 1
this[offset + i] = value & 0xFF
while (--i >= 0 && (mul *= 0x100)) {
this[offset + i] = (value / mul) & 0xFF
}
return offset + byteLength
}

Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert)
{
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0)
this[offset] = (value & 0xff)
return offset + 1
}
Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
this[offset] = (value & 0xff)
this[offset + 1] = (value >>> 8)
return offset + 2
}
Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0)
this[offset] = (value >>> 8)
this[offset + 1] = (value & 0xff)
return offset + 2
}
Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
this[offset + 3] = (value >>> 24)
this[offset + 2] = (value >>> 16)
this[offset + 1] = (value >>> 8)
this[offset] = (value & 0xff)
return offset + 4
}
Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0)
this[offset] = (value >>> 24)

this[offset + 1] = (value >>> 16)
this[offset + 2] = (value >>> 8)
this[offset + 3] = (value & 0xff)
return offset + 4
}
Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
var limit = Math.pow(2, (8 * byteLength) - 1)
checkInt(this, value, offset, byteLength, limit - 1, -limit)
}
var i = 0
var mul = 1
var sub = 0
this[offset] = value & 0xFF
while (++i < byteLength && (mul *= 0x100)) {
if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
sub = 1
}
this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
}
return offset + byteLength
}
Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
var limit = Math.pow(2, (8 * byteLength) - 1)
checkInt(this, value, offset, byteLength, limit - 1, -limit)
}
var i = byteLength - 1
var mul = 1
var sub = 0
this[offset + i] = value & 0xFF
while (--i >= 0 && (mul *= 0x100)) {
if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
sub = 1
}

this[offset + i] = ((value / mul) >> 0) - sub & 0xFF
}
return offset + byteLength
}
Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80)
if (value < 0) value = 0xff + value + 1
this[offset] = (value & 0xff)
return offset + 1
}
Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
this[offset] = (value & 0xff)
this[offset + 1] = (value >>> 8)
return offset + 2
}
Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000)
this[offset] = (value >>> 8)
this[offset + 1] = (value & 0xff)
return offset + 2
}
Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset,
noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
this[offset] = (value & 0xff)
this[offset + 1] = (value >>> 8)
this[offset + 2] = (value >>> 16)
this[offset + 3] = (value >>> 24)
return offset + 4
}
Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset,

noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000)
if (value < 0) value = 0xffffffff + value + 1
this[offset] = (value >>> 24)
this[offset + 1] = (value >>> 16)
this[offset + 2] = (value >>> 8)
this[offset + 3] = (value & 0xff)
return offset + 4
}
function checkIEEE754 (buf, value, offset, ext, max, min) {
if (offset + ext > buf.length) throw new RangeError('Index out of range')
if (offset < 0) throw new RangeError('Index out of range')
}
function writeFloat (buf, value, offset, littleEndian, noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
checkIEEE754(buf, value, offset, 4, 3.4028234663852886e+38,
-3.4028234663852886e+38)
}
ieee754.write(buf, value, offset, littleEndian, 23, 4)
return offset + 4
}
Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset,
noAssert) {
return writeFloat(this, value, offset, true, noAssert)
}
Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset,
noAssert) {
return writeFloat(this, value, offset, false, noAssert)
}
function writeDouble (buf, value, offset, littleEndian, noAssert) {
value = +value
offset = offset >>> 0
if (!noAssert) {
checkIEEE754(buf, value, offset, 8, 1.7976931348623157E+308,
-1.7976931348623157E+308)
}
ieee754.write(buf, value, offset, littleEndian, 52, 8)
return offset + 8
}

Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset,
noAssert) {
return writeDouble(this, value, offset, true, noAssert)
}
Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset,
noAssert) {
return writeDouble(this, value, offset, false, noAssert)
}
// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
Buffer.prototype.copy = function copy (target, targetStart, start, end) {
if (!start) start = 0
if (!end && end !== 0) end = this.length
if (targetStart >= target.length) targetStart = target.length
if (!targetStart) targetStart = 0
if (end > 0 && end < start) end = start
// Copy 0 bytes; we're done
if (end === start) return 0
if (target.length === 0 || this.length === 0) return 0
// Fatal error conditions
if (targetStart < 0) {
throw new RangeError('targetStart out of bounds')
}
if (start < 0 || start >= this.length) throw new RangeError('sourceStart out
of bounds')
if (end < 0) throw new RangeError('sourceEnd out of bounds')
// Are we oob?
if (end > this.length) end = this.length
if (target.length - targetStart < end - start) {
end = target.length - targetStart + start
}
var len = end - start
var i
if (this === target && start < targetStart && targetStart < end) {
// descending copy from end
for (i = len - 1; i >= 0; --i) {
target[i + targetStart] = this[i + start]
}
} else if (len < 1000) {
// ascending copy from start
for (i = 0; i < len; ++i) {

target[i + targetStart] = this[i + start]
}
} else {
Uint8Array.prototype.set.call(
target,
this.subarray(start, start + len),
targetStart
)
}
return len
}
// Usage:
// buffer.fill(number[, offset[, end]])
// buffer.fill(buffer[, offset[, end]])
// buffer.fill(string[, offset[, end]][, encoding])
Buffer.prototype.fill = function fill (val, start, end, encoding) {
// Handle string cases:
if (typeof val === 'string') {
if (typeof start === 'string') {
encoding = start
start = 0
end = this.length
} else if (typeof end === 'string') {
encoding = end
end = this.length
}
if (val.length === 1) {
var code = val.charCodeAt(0)
if (code < 256) {
val = code
}
}
if (encoding !== undefined && typeof encoding !== 'string') {
throw new TypeError('encoding must be a string')
}
if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
throw new TypeError('Unknown encoding: ' + encoding)
}
} else if (typeof val === 'number') {
val = val & 255
}
// Invalid ranges are not set to a default, so can range check early.
if (start < 0 || this.length < start || this.length < end) {
throw new RangeError('Out of range index')
}

if (end <= start) {
return this
}
start = start >>> 0
end = end === undefined ? this.length : end >>> 0
if (!val) val = 0
var i
if (typeof val === 'number') {
for (i = start; i < end; ++i) {
this[i] = val
}
} else {
var bytes = Buffer.isBuffer(val)
? val
: new Buffer(val, encoding)
var len = bytes.length
for (i = 0; i < end - start; ++i) {
this[i + start] = bytes[i % len]
}
}
return this
}
// HELPER FUNCTIONS
// ================
var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g
function base64clean (str) {
// Node strips out invalid characters like \n and \t from the string,
base64-js does not
str = str.trim().replace(INVALID_BASE64_RE, '')
// Node converts strings with length < 2 to ''
if (str.length < 2) return ''
// Node allows for non-padded base64 strings (missing trailing ===),
base64-js does not
while (str.length % 4 !== 0) {
str = str + '='
}
return str
}
function toHex (n) {

if (n < 16) return '0' + n.toString(16)
return n.toString(16)
}
function utf8ToBytes (string, units) {
units = units || Infinity
var codePoint
var length = string.length
var leadSurrogate = null
var bytes = []
for (var i = 0; i < length; ++i) {
codePoint = string.charCodeAt(i)
// is surrogate component
if (codePoint > 0xD7FF && codePoint < 0xE000) {
// last char was a lead
if (!leadSurrogate) {
// no lead yet
if (codePoint > 0xDBFF) {
// unexpected trail
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
continue
} else if (i + 1 === length) {
// unpaired lead
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
continue
}
// valid lead
leadSurrogate = codePoint
continue
}
// 2 leads in a row
if (codePoint < 0xDC00) {
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
leadSurrogate = codePoint
continue
}
// valid surrogate pair
codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000
} else if (leadSurrogate) {
// valid bmp char, but last char was a lead
if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD)
}

leadSurrogate = null
// encode utf8
if (codePoint < 0x80) {
if ((units -= 1) < 0) break
bytes.push(codePoint)
} else if (codePoint < 0x800) {
if ((units -= 2) < 0) break
bytes.push(
codePoint >> 0x6 | 0xC0,
codePoint & 0x3F | 0x80
)
} else if (codePoint < 0x10000) {
if ((units -= 3) < 0) break
bytes.push(
codePoint >> 0xC | 0xE0,
codePoint >> 0x6 & 0x3F | 0x80,
codePoint & 0x3F | 0x80
)
} else if (codePoint < 0x110000) {
if ((units -= 4) < 0) break
bytes.push(
codePoint >> 0x12 | 0xF0,
codePoint >> 0xC & 0x3F | 0x80,
codePoint >> 0x6 & 0x3F | 0x80,
codePoint & 0x3F | 0x80
)
} else {
throw new Error('Invalid code point')
}
}
return bytes
}
function asciiToBytes (str) {
var byteArray = []
for (var i = 0; i < str.length; ++i) {
// Node's code seems to be doing this and not & 0x7F..
byteArray.push(str.charCodeAt(i) & 0xFF)
}
return byteArray
}
function utf16leToBytes (str, units) {
var c, hi, lo
var byteArray = []

for (var i = 0; i < str.length; ++i) {
if ((units -= 2) < 0) break
c = str.charCodeAt(i)
hi = c >> 8
lo = c % 256
byteArray.push(lo)
byteArray.push(hi)
}
return byteArray
}
function base64ToBytes (str) {
return base64.toByteArray(base64clean(str))
}
function blitBuffer (src, dst, offset, length) {
for (var i = 0; i < length; ++i) {
if ((i + offset >= dst.length) || (i >= src.length)) break
dst[i + offset] = src[i]
}
return i
}
// Node 0.10 supports `ArrayBuffer` but lacks `ArrayBuffer.isView`
function isArrayBufferView (obj) {
return (typeof ArrayBuffer.isView === 'function') &&
ArrayBuffer.isView(obj)
}
function numberIsNaN (obj) {
return obj !== obj // eslint-disable-line no-self-compare
}
},{"base64-js":1,"ieee754":3}],3:[function(require,module,exports){
exports.read = function (buffer, offset, isLE, mLen, nBytes) {
var e, m
var eLen = nBytes * 8 - mLen - 1
var eMax = (1 << eLen) - 1
var eBias = eMax >> 1
var nBits = -7
var i = isLE ? (nBytes - 1) : 0
var d = isLE ? -1 : 1
var s = buffer[offset + i]
i += d

e = s & ((1 << (-nBits)) - 1)
s >>= (-nBits)
nBits += eLen
for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {}
m = e & ((1 << (-nBits)) - 1)
e >>= (-nBits)
nBits += mLen
for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {}
if (e === 0) {
e = 1 - eBias
} else if (e === eMax) {
return m ? NaN : ((s ? -1 : 1) * Infinity)
} else {
m = m + Math.pow(2, mLen)
e = e - eBias
}
return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
}
exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
var e, m, c
var eLen = nBytes * 8 - mLen - 1
var eMax = (1 << eLen) - 1
var eBias = eMax >> 1
var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0)
var i = isLE ? 0 : (nBytes - 1)
var d = isLE ? 1 : -1
var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0
value = Math.abs(value)
if (isNaN(value) || value === Infinity) {
m = isNaN(value) ? 1 : 0
e = eMax
} else {
e = Math.floor(Math.log(value) / Math.LN2)
if (value * (c = Math.pow(2, -e)) < 1) {
e--
c *= 2
}
if (e + eBias >= 1) {
value += rt / c
} else {
value += rt * Math.pow(2, 1 - eBias)
}
if (value * c >= 2) {

e++
c /= 2
}
if (e + eBias >= eMax) {
m = 0
e = eMax
} else if (e + eBias >= 1) {
m = (value * c - 1) * Math.pow(2, mLen)
e = e + eBias
} else {
m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen)
e = 0
}
}
for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -=
8) {}
e = (e << mLen) | m
eLen += mLen
for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -=
8) {}
buffer[offset + i - d] |= s * 128
}
},{}],4:[function(require,module,exports){
window.basex = require('base-x')
},{"base-x":5}],5:[function(require,module,exports){
// base-x encoding
// Forked from https://github.com/cryptocoinjs/bs58
// Originally written by Mike Hearn for BitcoinJ
// Copyright (c) 2011 Google Inc
// Ported to JavaScript by Stefan Thomas
// Merged Buffer refactorings from base58-native by Stephen Pair
// Copyright (c) 2013 BitPay Inc
var Buffer = require('safe-buffer').Buffer
module.exports = function base (ALPHABET) {
var ALPHABET_MAP = {}
var BASE = ALPHABET.length
var LEADER = ALPHABET.charAt(0)
// pre-compute lookup table
for (var z = 0; z < ALPHABET.length; z++) {
var x = ALPHABET.charAt(z)

if (ALPHABET_MAP[x] !== undefined) throw new TypeError(x + ' is ambiguous')
ALPHABET_MAP[x] = z
}
function encode (source) {
if (source.length === 0) return ''
var digits = [0]
for (var i = 0; i < source.length; ++i) {
for (var j = 0, carry = source[i]; j < digits.length; ++j) {
carry += digits[j] << 8
digits[j] = carry % BASE
carry = (carry / BASE) | 0
}
while (carry > 0) {
digits.push(carry % BASE)
carry = (carry / BASE) | 0
}
}
var string = ''
// deal with leading zeros
for (var k = 0; source[k] === 0 && k < source.length - 1; ++k) string +=
ALPHABET[0]
// convert digits to a string
for (var q = digits.length - 1; q >= 0; --q) string += ALPHABET[digits[q]]
return string
}
function decodeUnsafe (string) {
if (string.length === 0) return Buffer.allocUnsafe(0)
var bytes = [0]
for (var i = 0; i < string.length; i++) {
var value = ALPHABET_MAP[string[i]]
if (value === undefined) return
for (var j = 0, carry = value; j < bytes.length; ++j) {
carry += bytes[j] * BASE
bytes[j] = carry & 0xff
carry >>= 8
}
while (carry > 0) {

bytes.push(carry & 0xff)
carry >>= 8
}
}
// deal with leading zeros
for (var k = 0; string[k] === LEADER && k < string.length - 1; ++k) {
bytes.push(0)
}
return Buffer.from(bytes.reverse())
}
function decode (string) {
var buffer = decodeUnsafe(string)
if (buffer) return buffer
throw new Error('Non-base' + BASE + ' character')
}
return {
encode: encode,
decodeUnsafe: decodeUnsafe,
decode: decode
}
}
},{"safe-buffer":6}],6:[function(require,module,exports){
module.exports = require('buffer')
},{"buffer":2}]},{},[4])(4)
});

(function() {
// p2wpkh
bitcoinjs.bitcoin.networks.bitcoin.p2wpkh = {
baseNetwork: "bitcoin",
messagePrefix: '\x18Bitcoin Signed Message:\n',
bech32: 'bc',
bip32: {
public: 0x04b24746,
private: 0x04b2430c
},
pubKeyHash: 0x00,
scriptHash: 0x05,
wif: 0x80
};
bitcoinjs.bitcoin.networks.testnet.p2wpkh = {
baseNetwork: "testnet",
messagePrefix: '\x18Bitcoin Signed Message:\n',
bech32: 'tb',
bip32: {
public: 0x045f1cf6,
private: 0x045f18bc
},
pubKeyHash: 0x6f,
scriptHash: 0xc4,
wif: 0xef
};
// p2wpkh in p2sh
bitcoinjs.bitcoin.networks.bitcoin.p2wpkhInP2sh = {
baseNetwork: "bitcoin",
messagePrefix: '\x18Bitcoin Signed Message:\n',
bech32: 'bc',
bip32: {
public: 0x049d7cb2,
private: 0x049d7878
},
pubKeyHash: 0x00,
scriptHash: 0x05,
wif: 0x80
};
bitcoinjs.bitcoin.networks.testnet.p2wpkhInP2sh = {
baseNetwork: "testnet",
messagePrefix: '\x18Bitcoin Signed Message:\n',

bech32: 'tb',
bip32: {
public: 0x044a5262,
private: 0x044a4e28
},
pubKeyHash: 0x6f,
scriptHash: 0xc4,
wif: 0xef
};
bitcoinjs.bitcoin.networks.litecoin.p2wpkh = {
baseNetwork: "litecoin",
messagePrefix: '\x19Litecoin Signed Message:\n',
bech32: 'ltc',
bip32: {
public: 0x04b24746,
private: 0x04b2430c
},
pubKeyHash: 0x30,
scriptHash: 0x32,
wif: 0xb0
};
bitcoinjs.bitcoin.networks.litecoin.p2wpkhInP2sh = {
baseNetwork: "litecoin",
messagePrefix: '\x19Litecoin Signed Message:\n',
bech32: 'ltc',
bip32: {
public: 0x01b26ef6,
private: 0x01b26792
},
pubKeyHash: 0x30,
scriptHash: 0x32,
wif: 0xb0
};
bitcoinjs.bitcoin.networks.fujicoin.p2wpkh = {
baseNetwork: "fujicoin",
messagePrefix: '\x19FujiCoin Signed Message:\n',
bech32: 'fc',
bip32: {
public: 0x04b24746,
private: 0x04b2430c
},
pubKeyHash: 0x24,
scriptHash: 0x10,
wif: 0xa4
};

bitcoinjs.bitcoin.networks.fujicoin.p2wpkhInP2sh = {
baseNetwork: "fujicoin",
messagePrefix: '\x19FujiCoin Signed Message:\n',
bech32: 'fc',
bip32: {
public: 0x049d7cb2,
private: 0x049d7878
},
pubKeyHash: 0x24,
scriptHash: 0x10,
wif: 0xa4
};
bitcoinjs.bitcoin.networks.vertcoin.p2wpkh = {
baseNetwork: "vertcoin",
messagePrefix: '\x18Vertcoin Signed Message:\n',
bech32: 'vtc',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 71,
scriptHash: 5,
wif: 0x80
};
bitcoinjs.bitcoin.networks.vertcoin.p2wpkhInP2sh = {
baseNetwork: "vertcoin",
messagePrefix: '\x18Vertcoin Signed Message:\n',
bip32: {
public: 0x0488b21e,
private: 0x0488ade4
},
pubKeyHash: 71,
scriptHash: 5,
wif: 0x80
};
bitcoinjs.bitcoin.networks.bgold.p2wpkh = {
baseNetwork: "bgold",
messagePrefix: '\x1DBitcoin Gold Signed Message:\n',
bech32: 'btg',
bip32: {
public: 0x04b24746,
private: 0x04b2430c
},
pubKeyHash: 0x26,

scriptHash: 0x17,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.bgold.p2wpkhInP2sh = {
baseNetwork: "bgold",
messagePrefix: '\x1DBitcoin Gold Signed Message:\n',
bech32: 'btg',
bip32: {
public: 0x049d7cb2,
private: 0x049d7878
},
pubKeyHash: 0x26,
scriptHash: 0x17,
wif: 0x80,
};
bitcoinjs.bitcoin.networks.digibyte.p2wpkh = {
baseNetwork: "digibyte",
messagePrefix: '\x18DigiByte Signed Message:\n',
bech32: 'dgb',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4
},
pubKeyHash: 0x1e,
scriptHash: 0x3f,
wif: 0x80
};
bitcoinjs.bitcoin.networks.digibyte.p2wpkhInP2sh = {
baseNetwork: "digibyte",
messagePrefix: '\x18DigiByte Signed Message:\n',
bech32: 'dgb',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4
},
pubKeyHash: 0x1e,
scriptHash: 0x3f,
wif: 0x80
};
bitcoinjs.bitcoin.networks.deimos.p2wpkh = {
baseNetwork: "deimos",
messagePrefix: '\x18Deimos Signed Message:\n',
bech32: 'dei',
bip32: {
public: 0x0488B21E,

private: 0x0488ADE4
},
pubKeyHash: 0x1f,
scriptHash: 0x21,
wif: 0x8a
};
bitcoinjs.bitcoin.networks.deimos.p2wpkhInP2sh = {
baseNetwork: "deimos",
messagePrefix: '\x18Deimos Signed Message:\n',
bech32: 'dei',
bip32: {
public: 0x0488B21E,
private: 0x0488ADE4
},
pubKeyHash: 0x1f,
scriptHash: 0x21,
wif: 0x8a
};
})();

(function(f){if(typeof exports==="object"&&typeof
module!=="undefined"){module.exports=f()}else if(typeof
define==="function"&&define.amd){define([],f)}else{var g;if(typeof
window!=="undefined"){g=window}else if(typeof
global!=="undefined"){g=global}else if(typeof
self!=="undefined"){g=self}else{g=this}g.zxcvbn = f()}})(function(){var
define,module,exports;return (function e(t,n,r){function
s(o,u){if(!n[o]){if(!t[o]){var a=typeof
require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return
i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw
f.code="MODULE_NOT_FOUND",f}var
l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var
n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var
i=typeof require=="function"&&require;for(var
o=0;o<r.length;o++)s(r[o]);return
s})({1:[function(require,module,exports){
var
adjacency_graphs;adjacency_graphs={qwerty:{"!":["`~",null,null,"2@","qQ",n
ull],'"':[";:","[{","]}",null,null,"/?"],"#":["2@",null,null,"4$","eE","wW
"],$:["3#",null,null,"5%","rR","eE"],"%":["4$",null,null,"6^","tT","rR"],"
&":["6^",null,null,"8*","uU","yY"],"'":[";:","[{","]}",null,null,"/?"],"("
:["8*",null,null,"0)","oO","iI"],")":["9(",null,null,"-_","pP","oO"],"*":[
"7&",null,null,"9(","iI","uU"],"+":["-_",null,null,null,"]}","[{"],",":["m
M","kK","lL",".>",null,null],"-":["0)",null,null,"=+","[{","pP"],".":[",<"
,"lL",";:","/?",null,null],"/":[".>",";:","'\"",null,null,null],0:["9(",nu
ll,null,"-_","pP","oO"],1:["`~",null,null,"2@","qQ",null],2:["1!",null,nul
l,"3#","wW","qQ"],3:["2@",null,null,"4$","eE","wW"],4:["3#",null,null,"5%"
,"rR","eE"],5:["4$",null,null,"6^","tT","rR"],6:["5%",null,null,"7&","yY",
"tT"],7:["6^",null,null,"8*","uU","yY"],8:["7&",null,null,"9(","iI","uU"],
9:["8*",null,null,"0)","oO","iI"],":":["lL","pP","[{","'\"","/?",".>"],";"
:["lL","pP","[{","'\"","/?",".>"],"<":["mM","kK","lL",".>",null,null],"=":
["-_",null,null,null,"]}","[{"],">":[",<","lL",";:","/?",null,null],"?":["
.>",";:","'\"",null,null,null],"@":["1!",null,null,"3#","wW","qQ"],A:[null
,"qQ","wW","sS","zZ",null],B:["vV","gG","hH","nN",null,null],C:["xX","dD",
"fF","vV",null,null],D:["sS","eE","rR","fF","cC","xX"],E:["wW","3#","4$","
rR","dD","sS"],F:["dD","rR","tT","gG","vV","cC"],G:["fF","tT","yY","hH","b
B","vV"],H:["gG","yY","uU","jJ","nN","bB"],I:["uU","8*","9(","oO","kK","jJ
"],J:["hH","uU","iI","kK","mM","nN"],K:["jJ","iI","oO","lL",",<","mM"],L:[
"kK","oO","pP",";:",".>",",<"],M:["nN","jJ","kK",",<",null,null],N:["bB","
hH","jJ","mM",null,null],O:["iI","9(","0)","pP","lL","kK"],P:["oO","0)","-
_","[{",";:","lL"],Q:[null,"1!","2@","wW","aA",null],R:["eE","4$","5%","tT
","fF","dD"],S:["aA","wW","eE","dD","xX","zZ"],T:["rR","5%","6^","yY","gG"
,"fF"],U:["yY","7&","8*","iI","jJ","hH"],V:["cC","fF","gG","bB",null,null]
,W:["qQ","2@","3#","eE","sS","aA"],X:["zZ","sS","dD","cC",null,null],Y:["t
T","6^","7&","uU","hH","gG"],Z:[null,"aA","sS","xX",null,null],"[":["pP","
-_","=+","]}","'\"",";:"],"\\":["]}",null,null,null,null,null],"]":["[{","
=+",null,"\\|",null,"'\""],"^":["5%",null,null,"7&","yY","tT"],_:["0)",nul
l,null,"=+","[{","pP"],"`":[null,null,null,"1!",null,null],a:[null,"qQ","w

W","sS","zZ",null],b:["vV","gG","hH","nN",null,null],c:["xX","dD","fF","vV
",null,null],d:["sS","eE","rR","fF","cC","xX"],e:["wW","3#","4$","rR","dD"
,"sS"],f:["dD","rR","tT","gG","vV","cC"],g:["fF","tT","yY","hH","bB","vV"]
,h:["gG","yY","uU","jJ","nN","bB"],i:["uU","8*","9(","oO","kK","jJ"],j:["h
H","uU","iI","kK","mM","nN"],k:["jJ","iI","oO","lL",",<","mM"],l:["kK","oO
","pP",";:",".>",",<"],m:["nN","jJ","kK",",<",null,null],n:["bB","hH","jJ"
,"mM",null,null],o:["iI","9(","0)","pP","lL","kK"],p:["oO","0)","-_","[{",
";:","lL"],q:[null,"1!","2@","wW","aA",null],r:["eE","4$","5%","tT","fF","
dD"],s:["aA","wW","eE","dD","xX","zZ"],t:["rR","5%","6^","yY","gG","fF"],u
:["yY","7&","8*","iI","jJ","hH"],v:["cC","fF","gG","bB",null,null],w:["qQ"
,"2@","3#","eE","sS","aA"],x:["zZ","sS","dD","cC",null,null],y:["tT","6^",
"7&","uU","hH","gG"],z:[null,"aA","sS","xX",null,null],"{":["pP","-_","=+"
,"]}","'\"",";:"],"|":["]}",null,null,null,null,null],"}":["[{","=+",null,
"\\|",null,"'\""],"~":[null,null,null,"1!",null,null]},dvorak:{"!":["`~",n
ull,null,"2@","'\"",null],'"':[null,"1!","2@",",<","aA",null],"#":["2@",nu
ll,null,"4$",".>",",<"],$:["3#",null,null,"5%","pP",".>"],"%":["4$",null,n
ull,"6^","yY","pP"],"&":["6^",null,null,"8*","gG","fF"],"'":[null,"1!","2@
",",<","aA",null],"(":["8*",null,null,"0)","rR","cC"],")":["9(",null,null,
"[{","lL","rR"],"*":["7&",null,null,"9(","cC","gG"],"+":["/?","]}",null,"\
\|",null,"-_"],",":["'\"","2@","3#",".>","oO","aA"],"-":["sS","/?","=+",nu
ll,null,"zZ"],".":[",<","3#","4$","pP","eE","oO"],"/":["lL","[{","]}","=+"
,"-_","sS"],0:["9(",null,null,"[{","lL","rR"],1:["`~",null,null,"2@","'\""
,null],2:["1!",null,null,"3#",",<","'\""],3:["2@",null,null,"4$",".>",",<"
],4:["3#",null,null,"5%","pP",".>"],5:["4$",null,null,"6^","yY","pP"],6:["
5%",null,null,"7&","fF","yY"],7:["6^",null,null,"8*","gG","fF"],8:["7&",nu
ll,null,"9(","cC","gG"],9:["8*",null,null,"0)","rR","cC"],":":[null,"aA","
oO","qQ",null,null],";":[null,"aA","oO","qQ",null,null],"<":["'\"","2@","3
#",".>","oO","aA"],"=":["/?","]}",null,"\\|",null,"-_"],">":[",<","3#","4$
","pP","eE","oO"],"?":["lL","[{","]}","=+","-_","sS"],"@":["1!",null,null,
"3#",",<","'\""],A:[null,"'\"",",<","oO",";:",null],B:["xX","dD","hH","mM"
,null,null],C:["gG","8*","9(","rR","tT","hH"],D:["iI","fF","gG","hH","bB",
"xX"],E:["oO",".>","pP","uU","jJ","qQ"],F:["yY","6^","7&","gG","dD","iI"],
G:["fF","7&","8*","cC","hH","dD"],H:["dD","gG","cC","tT","mM","bB"],I:["uU
","yY","fF","dD","xX","kK"],J:["qQ","eE","uU","kK",null,null],K:["jJ","uU"
,"iI","xX",null,null],L:["rR","0)","[{","/?","sS","nN"],M:["bB","hH","tT",
"wW",null,null],N:["tT","rR","lL","sS","vV","wW"],O:["aA",",<",".>","eE","
qQ",";:"],P:[".>","4$","5%","yY","uU","eE"],Q:[";:","oO","eE","jJ",null,nu
ll],R:["cC","9(","0)","lL","nN","tT"],S:["nN","lL","/?","-_","zZ","vV"],T:
["hH","cC","rR","nN","wW","mM"],U:["eE","pP","yY","iI","kK","jJ"],V:["wW",
"nN","sS","zZ",null,null],W:["mM","tT","nN","vV",null,null],X:["kK","iI","
dD","bB",null,null],Y:["pP","5%","6^","fF","iI","uU"],Z:["vV","sS","-_",nu
ll,null,null],"[":["0)",null,null,"]}","/?","lL"],"\\":["=+",null,null,nul
l,null,null],"]":["[{",null,null,null,"=+","/?"],"^":["5%",null,null,"7&",
"fF","yY"],_:["sS","/?","=+",null,null,"zZ"],"`":[null,null,null,"1!",null
,null],a:[null,"'\"",",<","oO",";:",null],b:["xX","dD","hH","mM",null,null
],c:["gG","8*","9(","rR","tT","hH"],d:["iI","fF","gG","hH","bB","xX"],e:["
oO",".>","pP","uU","jJ","qQ"],f:["yY","6^","7&","gG","dD","iI"],g:["fF","7
&","8*","cC","hH","dD"],h:["dD","gG","cC","tT","mM","bB"],i:["uU","yY","fF

","dD","xX","kK"],j:["qQ","eE","uU","kK",null,null],k:["jJ","uU","iI","xX"
,null,null],l:["rR","0)","[{","/?","sS","nN"],m:["bB","hH","tT","wW",null,
null],n:["tT","rR","lL","sS","vV","wW"],o:["aA",",<",".>","eE","qQ",";:"],
p:[".>","4$","5%","yY","uU","eE"],q:[";:","oO","eE","jJ",null,null],r:["cC
","9(","0)","lL","nN","tT"],s:["nN","lL","/?","-_","zZ","vV"],t:["hH","cC"
,"rR","nN","wW","mM"],u:["eE","pP","yY","iI","kK","jJ"],v:["wW","nN","sS",
"zZ",null,null],w:["mM","tT","nN","vV",null,null],x:["kK","iI","dD","bB",n
ull,null],y:["pP","5%","6^","fF","iI","uU"],z:["vV","sS","-_",null,null,nu
ll],"{":["0)",null,null,"]}","/?","lL"],"|":["=+",null,null,null,null,null
],"}":["[{",null,null,null,"=+","/?"],"~":[null,null,null,"1!",null,null]}
,keypad:{"*":["/",null,null,null,"-","+","9","8"],"+":["9","*","-",null,nu
ll,null,null,"6"],"-":["*",null,null,null,null,null,"+","9"],".":["0","2",
"3",null,null,null,null,null],"/":[null,null,null,null,"*","9","8","7"],0:
[null,"1","2","3",".",null,null,null],1:[null,null,"4","5","2","0",null,nu
ll],2:["1","4","5","6","3",".","0",null],3:["2","5","6",null,null,null,"."
,"0"],4:[null,null,"7","8","5","2","1",null],5:["4","7","8","9","6","3","2
","1"],6:["5","8","9","+",null,null,"3","2"],7:[null,null,null,"/","8","5"
,"4",null],8:["7",null,"/","*","9","6","5","4"],9:["8","/","*","-","+",nul
l,"6","5"]},mac_keypad:{"*":["/",null,null,null,null,null,"-","9"],"+":["6
","9","-",null,null,null,null,"3"],"-":["9","/","*",null,null,null,"+","6"
],".":["0","2","3",null,null,null,null,null],"/":["=",null,null,null,"*","
-","9","8"],0:[null,"1","2","3",".",null,null,null],1:[null,null,"4","5","
2","0",null,null],2:["1","4","5","6","3",".","0",null],3:["2","5","6","+",
null,null,".","0"],4:[null,null,"7","8","5","2","1",null],5:["4","7","8","
9","6","3","2","1"],6:["5","8","9","-","+",null,"3","2"],7:[null,null,null
,"=","8","5","4",null],8:["7",null,"=","/","9","6","5","4"],9:["8","=","/"
,"*","-","+","6","5"],"=":[null,null,null,null,"/","9","8","7"]}},module.e
xports=adjacency_graphs;
},{}],2:[function(require,module,exports){
var
feedback,scoring;scoring=require("./scoring"),feedback={default_feedback:{
warning:"",suggestions:["Use a few words, avoid common phrases","No need for
symbols, digits, or uppercase letters"]},get_feedback:function(e,s){var
a,t,r,n,o,i;if(0===s.length)return
this.default_feedback;if(e>2)return{warning:"",suggestions:[]};for(n=s[0],
i=s.slice(1),t=0,r=i.length;t<r;t++)o=i[t],o.token.length>n.token.length&&
(n=o);return feedback=this.get_match_feedback(n,1===s.length),a="Add
another word or two. Uncommon words are
better.",null!=feedback?(feedback.suggestions.unshift(a),null==feedback.wa
rning&&(feedback.warning="")):feedback={warning:"",suggestions:[a]},feedba
ck},get_match_feedback:function(e,s){var
a,t;switch(e.pattern){case"dictionary":return
this.get_dictionary_match_feedback(e,s);case"spatial":return
a=e.graph.toUpperCase(),t=1===e.turns?"Straight rows of keys are easy to
guess":"Short keyboard patterns are easy to
guess",{warning:t,suggestions:["Use a longer keyboard pattern with more
turns"]};case"repeat":return t=1===e.base_token.length?'Repeats like "aaa"

are easy to guess':'Repeats like "abcabcabc" are only slightly harder to guess
than "abc"',{warning:t,suggestions:["Avoid repeated words and
characters"]};case"sequence":return{warning:"Sequences like abc or 6543 are
easy to guess",suggestions:["Avoid
sequences"]};case"regex":if("recent_year"===e.regex_name)return{warning:"R
ecent years are easy to guess",suggestions:["Avoid recent years","Avoid years
that are associated with you"]};break;case"date":return{warning:"Dates are
often easy to guess",suggestions:["Avoid dates and years that are associated
with you"]}}},get_dictionary_match_feedback:function(e,s){var
a,t,r,n,o;return
n="passwords"===e.dictionary_name?!s||e.l33t||e.reversed?e.guesses_log10<=
4?"This is similar to a commonly used password":void 0:e.rank<=10?"This is a
top-10 common password":e.rank<=100?"This is a top-100 common password":"This
is a very common password":"english"===e.dictionary_name?s?"A word by itself
is easy to guess":void
0:"surnames"===(a=e.dictionary_name)||"male_names"===a||"female_names"===a
?s?"Names and surnames by themselves are easy to guess":"Common names and
surnames are easy to
guess":"",r=[],o=e.token,o.match(scoring.START_UPPER)?r.push("Capitalizati
on doesn't help very
much"):o.match(scoring.ALL_UPPER)&&o.toLowerCase()!==o&&r.push("All-upperc
ase is almost as easy to guess as
all-lowercase"),e.reversed&&e.token.length>=4&&r.push("Reversed words
aren't much harder to guess"),e.l33t&&r.push("Predictable substitutions like
'@' instead of 'a' don't help very
much"),t={warning:n,suggestions:r}}},module.exports=feedback;
},{"./scoring":6}],3:[function(require,module,exports){
var
frequency_lists;frequency_lists={passwords:"123456,password,12345678,qwert
y,123456789,12345,1234,111111,1234567,dragon,123123,baseball,abc123,footba
ll,monkey,letmein,shadow,master,696969,mustang,666666,qwertyuiop,123321,12
34567890,pussy,superman,654321,1qaz2wsx,7777777,fuckyou,qazwsx,jordan,123q
we,000000,killer,trustno1,hunter,harley,zxcvbnm,asdfgh,buster,batman,socce
r,tigger,charlie,sunshine,iloveyou,fuckme,ranger,hockey,computer,starwars,
asshole,pepper,klaster,112233,zxcvbn,freedom,princess,maggie,pass,ginger,1
1111111,131313,fuck,love,cheese,159753,summer,chelsea,dallas,biteme,matrix
,yankees,6969,corvette,austin,access,thunder,merlin,secret,diamond,hello,h
ammer,fucker,1234qwer,silver,gfhjkm,internet,samantha,golfer,scooter,test,
orange,cookie,q1w2e3r4t5,maverick,sparky,phoenix,mickey,bigdog,snoopy,guit
ar,whatever,chicken,camaro,mercedes,peanut,ferrari,falcon,cowboy,welcome,s
exy,samsung,steelers,smokey,dakota,arsenal,boomer,eagles,tigers,marina,nas
car,booboo,gateway,yellow,porsche,monster,spider,diablo,hannah,bulldog,jun
ior,london,purple,compaq,lakers,iceman,qwer1234,hardcore,cowboys,money,ban
ana,ncc1701,boston,tennis,q1w2e3r4,coffee,scooby,123654,nikita,yamaha,moth
er,barney,brandy,chester,fuckoff,oliver,player,forever,rangers,midnight,ch
icago,bigdaddy,redsox,angel,badboy,fender,jasper,slayer,rabbit,natasha,mar
ine,bigdick,wizard,marlboro,raiders,prince,casper,fishing,flower,jasmine,i

wantu,panties,adidas,winter,winner,gandalf,password1,enter,ghbdtn,1q2w3e4r
,golden,cocacola,jordan23,winston,madison,angels,panther,blowme,sexsex,big
tits,spanky,bitch,sophie,asdfasdf,horny,thx1138,toyota,tiger,dick,canada,1
2344321,blowjob,8675309,muffin,liverpoo,apples,qwerty123,passw0rd,abcd1234
,pokemon,123abc,slipknot,qazxsw,123456a,scorpion,qwaszx,butter,startrek,ra
inbow,asdfghjkl,razz,newyork,redskins,gemini,cameron,qazwsxedc,florida,liv
erpool,turtle,sierra,viking,booger,butthead,doctor,rocket,159357,dolphins,
captain,bandit,jaguar,packers,pookie,peaches,789456,asdf,dolphin,helpme,bl
ue,theman,maxwell,qwertyui,shithead,lovers,maddog,giants,nirvana,metallic,
hotdog,rosebud,mountain,warrior,stupid,elephant,suckit,success,bond007,jac
kass,alexis,porn,lucky,scorpio,samson,q1w2e3,azerty,rush2112,driver,freddy
,1q2w3e4r5t,sydney,gators,dexter,red123,123456q,12345a,bubba,creative,vood
oo,golf,trouble,america,nissan,gunner,garfield,bullshit,asdfghjk,5150,fuck
ing,apollo,1qazxsw2,2112,eminem,legend,airborne,bear,beavis,apple,brooklyn
,godzilla,skippy,4815162342,buddy,qwert,kitten,magic,shelby,beaver,phantom
,asdasd,xavier,braves,darkness,blink182,copper,platinum,qweqwe,tomcat,0101
2011,girls,bigboy,102030,animal,police,online,11223344,voyager,lifehack,12
qwaszx,fish,sniper,315475,trinity,blazer,heaven,lover,snowball,playboy,lov
eme,bubbles,hooters,cricket,willow,donkey,topgun,nintendo,saturn,destiny,p
akistan,pumpkin,digital,sergey,redwings,explorer,tits,private,runner,thero
ck,guinness,lasvegas,beatles,789456123,fire,cassie,christin,qwerty1,celtic
,asdf1234,andrey,broncos,007007,babygirl,eclipse,fluffy,cartman,michigan,c
arolina,testing,alexande,birdie,pantera,cherry,vampire,mexico,dickhead,buf
falo,genius,montana,beer,minecraft,maximus,flyers,lovely,stalker,metallica
,doggie,snickers,speedy,bronco,lol123,paradise,yankee,horses,magnum,dreams
,147258369,lacrosse,ou812,goober,enigma,qwertyu,scotty,pimpin,bollocks,sur
fer,cock,poohbear,genesis,star,asd123,qweasdzxc,racing,hello1,hawaii,eagle
1,viper,poopoo,einstein,boobies,12345q,bitches,drowssap,simple,badger,alas
ka,action,jester,drummer,111222,spitfire,forest,maryjane,champion,diesel,s
vetlana,friday,hotrod,147258,chevy,lucky1,westside,security,google,badass,
tester,shorty,thumper,hitman,mozart,zaq12wsx,boobs,reddog,010203,lizard,a1
23456,123456789a,ruslan,eagle,1232323q,scarface,qwerty12,147852,a12345,bud
dha,porno,420420,spirit,money1,stargate,qwe123,naruto,mercury,liberty,1234
5qwert,semperfi,suzuki,popcorn,spooky,marley,scotland,kitty,cherokee,vikin
gs,simpsons,rascal,qweasd,hummer,loveyou,michael1,patches,russia,jupiter,p
enguin,passion,cumshot,vfhbyf,honda,vladimir,sandman,passport,raider,basta
rd,123789,infinity,assman,bulldogs,fantasy,sucker,1234554321,horney,domino
,budlight,disney,ironman,usuckballz1,softball,brutus,redrum,bigred,mnbvcxz
,fktrcfylh,karina,marines,digger,kawasaki,cougar,fireman,oksana,monday,cun
t,justice,nigger,super,wildcats,tinker,logitech,dancer,swordfis,avalon,eve
rton,alexandr,motorola,patriots,hentai,madonna,pussy1,ducati,colorado,conn
or,juventus,galore,smooth,freeuser,warcraft,boogie,titanic,wolverin,elizab
et,arizona,valentin,saints,asdfg,accord,test123,password123,christ,yfnfif,
stinky,slut,spiderma,naughty,chopper,hello123,ncc1701d,extreme,skyline,poo
p,zombie,pearljam,123qweasd,froggy,awesome,vision,pirate,fylhtq,dreamer,bu
llet,predator,empire,123123a,kirill,charlie1,panthers,penis,skipper,nemesi
s,rasdzv3,peekaboo,rolltide,cardinal,psycho,danger,mookie,happy1,wanker,ch
evelle,manutd,goblue,9379992,hobbes,vegeta,fyfcnfcbz,852456,picard,159951,

windows,loverboy,victory,vfrcbv,bambam,serega,123654789,turkey,tweety,gali
na,hiphop,rooster,changeme,berlin,taurus,suckme,polina,electric,avatar,134
679,maksim,raptor,alpha1,hendrix,newport,bigcock,brazil,spring,a1b2c3,madm
ax,alpha,britney,sublime,darkside,bigman,wolfpack,classic,hercules,ronaldo
,letmein1,1q2w3e,741852963,spiderman,blizzard,123456789q,cheyenne,cjkysirj
,tiger1,wombat,bubba1,pandora,zxc123,holiday,wildcat,devils,horse,alabama,
147852369,caesar,12312,buddy1,bondage,pussycat,pickle,shaggy,catch22,leath
er,chronic,a1b2c3d4,admin,qqq111,qaz123,airplane,kodiak,freepass,billybob,
sunset,katana,phpbb,chocolat,snowman,angel1,stingray,firebird,wolves,zeppe
lin,detroit,pontiac,gundam,panzer,vagina,outlaw,redhead,tarheels,greenday,
nastya,01011980,hardon,engineer,dragon1,hellfire,serenity,cobra,fireball,l
ickme,darkstar,1029384756,01011,mustang1,flash,124578,strike,beauty,pavili
on,01012000,bobafett,dbrnjhbz,bigmac,bowling,chris1,ytrewq,natali,pyramid,
rulez,welcome1,dodgers,apache,swimming,whynot,teens,trooper,fuckit,defende
r,precious,135790,packard,weasel,popeye,lucifer,cancer,icecream,142536,rav
en,swordfish,presario,viktor,rockstar,blonde,james1,wutang,spike,pimp,atla
nta,airforce,thailand,casino,lennon,mouse,741852,hacker,bluebird,hawkeye,4
56123,theone,catfish,sailor,goldfish,nfnmzyf,tattoo,pervert,barbie,maxima,
nipples,machine,trucks,wrangler,rocks,tornado,lights,cadillac,bubble,pegas
us,madman,longhorn,browns,target,666999,eatme,qazwsx123,microsoft,dilbert,
christia,baller,lesbian,shooter,xfiles,seattle,qazqaz,cthutq,amateur,prelu
de,corona,freaky,malibu,123qweasdzxc,assassin,246810,atlantis,integra,puss
ies,iloveu,lonewolf,dragons,monkey1,unicorn,software,bobcat,stealth,peewee
,openup,753951,srinivas,zaqwsx,valentina,shotgun,trigger,veronika,bruins,c
oyote,babydoll,joker,dollar,lestat,rocky1,hottie,random,butterfly,wordpass
,smiley,sweety,snake,chipper,woody,samurai,devildog,gizmo,maddie,soso123al
jg,mistress,freedom1,flipper,express,hjvfirf,moose,cessna,piglet,polaris,t
eacher,montreal,cookies,wolfgang,scully,fatboy,wicked,balls,tickle,bunny,d
fvgbh,foobar,transam,pepsi,fetish,oicu812,basketba,toshiba,hotstuff,sunday
,booty,gambit,31415926,impala,stephani,jessica1,hooker,lancer,knicks,shamr
ock,fuckyou2,stinger,314159,redneck,deftones,squirt,siemens,blaster,trucke
r,subaru,renegade,ibanez,manson,swinger,reaper,blondie,mylove,galaxy,blahb
lah,enterpri,travel,1234abcd,babylon5,indiana,skeeter,master1,sugar,ficken
,smoke,bigone,sweetpea,fucked,trfnthbyf,marino,escort,smitty,bigfoot,babes
,larisa,trumpet,spartan,valera,babylon,asdfghj,yankees1,bigboobs,stormy,mi
ster,hamlet,aardvark,butterfl,marathon,paladin,cavalier,manchester,skater,
indigo,hornet,buckeyes,01011990,indians,karate,hesoyam,toronto,diamonds,ch
iefs,buckeye,1qaz2wsx3edc,highland,hotsex,charger,redman,passwor,maiden,dr
pepper,storm,pornstar,garden,12345678910,pencil,sherlock,timber,thuglife,i
nsane,pizza,jungle,jesus1,aragorn,1a2b3c,hamster,david1,triumph,techno,lol
lol,pioneer,catdog,321654,fktrctq,morpheus,141627,pascal,shadow1,hobbit,we
tpussy,erotic,consumer,blabla,justme,stones,chrissy,spartak,goforit,burger
,pitbull,adgjmptw,italia,barcelona,hunting,colors,kissme,virgin,overlord,p
ebbles,sundance,emerald,doggy,racecar,irina,element,1478963,zipper,alpine,
basket,goddess,poison,nipple,sakura,chichi,huskers,13579,pussys,q12345,ult
imate,ncc1701e,blackie,nicola,rommel,matthew1,caserta,omega,geronimo,sammy
1,trojan,123qwe123,philips,nugget,tarzan,chicks,aleksandr,bassman,trixie,p
ortugal,anakin,dodger,bomber,superfly,madness,q1w2e3r4t5y6,loser,123asd,fa

tcat,ybrbnf,soldier,warlock,wrinkle1,desire,sexual,babe,seminole,alejandr,
951753,11235813,westham,andrei,concrete,access14,weed,letmein2,ladybug,nak
ed,christop,trombone,tintin,bluesky,rhbcnbyf,qazxswedc,onelove,cdtnkfyf,wh
ore,vfvjxrf,titans,stallion,truck,hansolo,blue22,smiles,beagle,panama,king
kong,flatron,inferno,mongoose,connect,poiuyt,snatch,qawsed,juice,blessed,r
ocker,snakes,turbo,bluemoon,sex4me,finger,jamaica,a1234567,mulder,beetle,f
uckyou1,passat,immortal,plastic,123454321,anthony1,whiskey,dietcoke,suck,s
punky,magic1,monitor,cactus,exigen,planet,ripper,teen,spyder,apple1,nolimi
t,hollywoo,sluts,sticky,trunks,1234321,14789632,pickles,sailing,bonehead,g
hbdtnbr,delta,charlott,rubber,911911,112358,molly1,yomama,hongkong,jumper,
william1,ilovesex,faster,unreal,cumming,memphis,1123581321,nylons,legion,s
ebastia,shalom,pentium,geheim,werewolf,funtime,ferret,orion,curious,555666
,niners,cantona,sprite,philly,pirates,abgrtyu,lollipop,eternity,boeing,sup
er123,sweets,cooldude,tottenha,green1,jackoff,stocking,7895123,moomoo,mart
ini,biscuit,drizzt,colt45,fossil,makaveli,snapper,satan666,maniac,salmon,p
atriot,verbatim,nasty,shasta,asdzxc,shaved,blackcat,raistlin,qwerty12345,p
unkrock,cjkywt,01012010,4128,waterloo,crimson,twister,oxford,musicman,sein
feld,biggie,condor,ravens,megadeth,wolfman,cosmos,sharks,banshee,keeper,fo
xtrot,gn56gn56,skywalke,velvet,black1,sesame,dogs,squirrel,privet,sunrise,
wolverine,sucks,legolas,grendel,ghost,cats,carrot,frosty,lvbnhbq,blades,st
ardust,frog,qazwsxed,121314,coolio,brownie,groovy,twilight,daytona,vanhale
n,pikachu,peanuts,licker,hershey,jericho,intrepid,ninja,1234567a,zaq123,lo
bster,goblin,punisher,strider,shogun,kansas,amadeus,seven7,jason1,neptune,
showtime,muscle,oldman,ekaterina,rfrfirf,getsome,showme,111222333,obiwan,s
kittles,danni,tanker,maestro,tarheel,anubis,hannibal,anal,newlife,gothic,s
hark,fighter,blue123,blues,123456z,princes,slick,chaos,thunder1,sabine,1q2
w3e4r5t6y,python,test1,mirage,devil,clover,tequila,chelsea1,surfing,delete
,potato,chubby,panasonic,sandiego,portland,baggins,fusion,sooners,blackdog
,buttons,californ,moscow,playtime,mature,1a2b3c4d,dagger,dima,stimpy,asdf1
23,gangster,warriors,iverson,chargers,byteme,swallow,liquid,lucky7,dingdon
g,nymets,cracker,mushroom,456852,crusader,bigguy,miami,dkflbvbh,bugger,nim
rod,tazman,stranger,newpass,doodle,powder,gotcha,guardian,dublin,slapshot,
septembe,147896325,pepsi1,milano,grizzly,woody1,knights,photos,2468,nookie
,charly,rammstein,brasil,123321123,scruffy,munchkin,poopie,123098,kittycat
,latino,walnut,1701,thegame,viper1,1passwor,kolobok,picasso,robert1,barcel
on,bananas,trance,auburn,coltrane,eatshit,goodluck,starcraft,wheels,parrot
,postal,blade,wisdom,pink,gorilla,katerina,pass123,andrew1,shaney14,dumbas
s,osiris,fuck_inside,oakland,discover,ranger1,spanking,lonestar,bingo,meri
dian,ping,heather1,dookie,stonecol,megaman,192837465,rjntyjr,ledzep,lowrid
er,25802580,richard1,firefly,griffey,racerx,paradox,ghjcnj,gangsta,zaq1xsw
2,tacobell,weezer,sirius,halflife,buffett,shiloh,123698745,vertigo,sergei,
aliens,sobaka,keyboard,kangaroo,sinner,soccer1,0.0.000,bonjour,socrates,ch
ucky,hotboy,sprint,0007,sarah1,scarlet,celica,shazam,formula1,sommer,trebo
r,qwerasdf,jeep,mailcreated5240,bollox,asshole1,fuckface,honda1,rebels,vac
ation,lexmark,penguins,12369874,ragnarok,formula,258456,tempest,vfhecz,tac
oma,qwertz,colombia,flames,rockon,duck,prodigy,wookie,dodgeram,mustangs,12
3qaz,sithlord,smoker,server,bang,incubus,scoobydo,oblivion,molson,kitkat,t
itleist,rescue,zxcv1234,carpet,1122,bigballs,tardis,jimbob,xanadu,blueeyes

,shaman,mersedes,pooper,pussy69,golfing,hearts,mallard,12312312,kenwood,pa
trick1,dogg,cowboys1,oracle,123zxc,nuttertools,102938,topper,1122334455,sh
emale,sleepy,gremlin,yourmom,123987,gateway1,printer,monkeys,peterpan,mike
y,kingston,cooler,analsex,jimbo,pa55word,asterix,freckles,birdman,frank1,d
efiant,aussie,stud,blondes,tatyana,445566,aspirine,mariners,jackal,deadhea
d,katrin,anime,rootbeer,frogger,polo,scooter1,hallo,noodles,thomas1,parola
,shaolin,celine,11112222,plymouth,creampie,justdoit,ohyeah,fatass,assfuck,
amazon,1234567q,kisses,magnus,camel,nopass,bosco,987456,6751520,harley1,pu
tter,champs,massive,spidey,lightnin,camelot,letsgo,gizmodo,aezakmi,bones,c
aliente,12121,goodtime,thankyou,raiders1,brucelee,redalert,aquarius,456654
,catherin,smokin,pooh,mypass,astros,roller,porkchop,sapphire,qwert123,kevi
n1,a1s2d3f4,beckham,atomic,rusty1,vanilla,qazwsxedcrfv,hunter1,kaktus,cxfc
nmt,blacky,753159,elvis1,aggies,blackjac,bangkok,scream,123321q,iforgot,po
wer1,kasper,abc12,buster1,slappy,shitty,veritas,chevrole,amber1,01012001,v
ader,amsterdam,jammer,primus,spectrum,eduard,granny,horny1,sasha1,clancy,u
sa123,satan,diamond1,hitler,avenger,1221,spankme,123456qwerty,simba,smudge
,scrappy,labrador,john316,syracuse,front242,falcons,husker,candyman,comman
do,gator,pacman,delta1,pancho,krishna,fatman,clitoris,pineappl,lesbians,8j
4ye3uz,barkley,vulcan,punkin,boner,celtics,monopoly,flyboy,romashka,hambur
g,123456aa,lick,gangbang,223344,area51,spartans,aaa111,tricky,snuggles,dra
go,homerun,vectra,homer1,hermes,topcat,cuddles,infiniti,1234567890q,coswor
th,goose,phoenix1,killer1,ivanov,bossman,qawsedrf,peugeot,exigent,doberman
,durango,brandon1,plumber,telefon,horndog,laguna,rbhbkk,dawg,webmaster,bre
eze,beast,porsche9,beefcake,leopard,redbull,oscar1,topdog,godsmack,theking
,pics,omega1,speaker,viktoria,fuckers,bowler,starbuck,gjkbyf,valhalla,anar
chy,blacks,herbie,kingpin,starfish,nokia,loveit,achilles,906090,labtec,ncc
1701a,fitness,jordan1,brando,arsenal1,bull,kicker,napass,desert,sailboat,b
ohica,tractor,hidden,muppet,jackson1,jimmy1,terminator,phillies,pa55w0rd,t
error,farside,swingers,legacy,frontier,butthole,doughboy,jrcfyf,tuesday,sa
bbath,daniel1,nebraska,homers,qwertyuio,azamat,fallen,agent007,striker,cam
els,iguana,looker,pinkfloy,moloko,qwerty123456,dannyboy,luckydog,789654,pi
stol,whocares,charmed,skiing,select,franky,puppy,daniil,vladik,vette,vfrcb
vrf,ihateyou,nevada,moneys,vkontakte,mandingo,puppies,666777,mystic,zidane
,kotenok,dilligaf,budman,bunghole,zvezda,123457,triton,golfball,technics,t
rojans,panda,laptop,rookie,01011991,15426378,aberdeen,gustav,jethro,enterp
rise,igor,stripper,filter,hurrican,rfnthbyf,lespaul,gizmo1,butch,132435,dt
hjybrf,1366613,excalibu,963852,nofear,momoney,possum,cutter,oilers,moocow,
cupcake,gbpltw,batman1,splash,svetik,super1,soleil,bogdan,melissa1,vipers,
babyboy,tdutybq,lancelot,ccbill,keystone,passwort,flamingo,firefox,dogman,
vortex,rebel,noodle,raven1,zaphod,killme,pokemon1,coolman,danila,designer,
skinny,kamikaze,deadman,gopher,doobie,warhammer,deeznuts,freaks,engage,che
vy1,steve1,apollo13,poncho,hammers,azsxdc,dracula,000007,sassy,bitch1,boot
s,deskjet,12332,macdaddy,mighty,rangers1,manchest,sterlin,casey1,meatball,
mailman,sinatra,cthulhu,summer1,bubbas,cartoon,bicycle,eatpussy,truelove,s
entinel,tolkien,breast,capone,lickit,summit,123456k,peter1,daisy1,kitty1,1
23456789z,crazy1,jamesbon,texas1,sexygirl,362436,sonic,billyboy,redhot,mic
rosof,microlab,daddy1,rockets,iloveyo,fernand,gordon24,danie,cutlass,polsk
a,star69,titties,pantyhos,01011985,thekid,aikido,gofish,mayday,1234qwe,cok

e,anfield,sony,lansing,smut,scotch,sexx,catman,73501505,hustler,saun,dfkth
bz,passwor1,jenny1,azsxdcfv,cheers,irish1,gabrie,tinman,orioles,1225,charl
ton,fortuna,01011970,airbus,rustam,xtreme,bigmoney,zxcasd,retard,grumpy,hu
skies,boxing,4runner,kelly1,ultima,warlord,fordf150,oranges,rotten,asdfjkl
,superstar,denali,sultan,bikini,saratoga,thor,figaro,sixers,wildfire,vladi
slav,128500,sparta,mayhem,greenbay,chewie,music1,number1,cancun,fabie,mell
on,poiuytrewq,cloud9,crunch,bigtime,chicken1,piccolo,bigbird,321654987,bil
ly1,mojo,01011981,maradona,sandro,chester1,bizkit,rjirfrgbde,789123,rightn
ow,jasmine1,hyperion,treasure,meatloaf,armani,rovers,jarhead,01011986,crui
se,coconut,dragoon,utopia,davids,cosmo,rfhbyf,reebok,1066,charli,giorgi,st
icks,sayang,pass1234,exodus,anaconda,zaqxsw,illini,woofwoof,emily1,sandy1,
packer,poontang,govols,jedi,tomato,beaner,cooter,creamy,lionking,happy123,
albatros,poodle,kenworth,dinosaur,greens,goku,happyday,eeyore,tsunami,cabb
age,holyshit,turkey50,memorex,chaser,bogart,orgasm,tommy1,volley,whisper,k
nopka,ericsson,walleye,321123,pepper1,katie1,chickens,tyler1,corrado,twist
ed,100000,zorro,clemson,zxcasdqwe,tootsie,milana,zenith,fktrcfylhf,shania,
frisco,polniypizdec0211,crazybab,junebug,fugazi,rereirf,vfvekz,1001,sausag
e,vfczyz,koshka,clapton,justin1,anhyeuem,condom,fubar,hardrock,skywalker,t
undra,cocks,gringo,150781,canon,vitalik,aspire,stocks,samsung1,applepie,ab
c12345,arjay,gandalf1,boob,pillow,sparkle,gmoney,rockhard,lucky13,samiam,e
verest,hellyeah,bigsexy,skorpion,rfrnec,hedgehog,australi,candle,slacker,d
icks,voyeur,jazzman,america1,bobby1,br0d3r,wolfie,vfksirf,1qa2ws3ed,132435
46,fright,yosemite,temp,karolina,fart,barsik,surf,cheetah,baddog,deniska,s
tarship,bootie,milena,hithere,kume,greatone,dildo,50cent,0.0.0.000,albion,
amanda1,midget,lion,maxell,football1,cyclone,freeporn,nikola,bonsai,kenshi
n,slider,balloon,roadkill,killbill,222333,jerkoff,78945612,dinamo,tekken,r
ambler,goliath,cinnamon,malaka,backdoor,fiesta,packers1,rastaman,fletch,so
jdlg123aljg,stefano,artemis,calico,nyjets,damnit,robotech,duchess,rctybz,h
ooter,keywest,18436572,hal9000,mechanic,pingpong,operator,presto,sword,ras
putin,spank,bristol,faggot,shado,963852741,amsterda,321456,wibble,carrera,
alibaba,majestic,ramses,duster,route66,trident,clipper,steeler,wrestlin,di
vine,kipper,gotohell,kingfish,snake1,passwords,buttman,pompey,viagra,zxcvb
nm1,spurs,332211,slutty,lineage2,oleg,macross,pooter,brian1,qwert1,charles
1,slave,jokers,yzerman,swimmer,ne1469,nwo4life,solnce,seamus,lolipop,pupsi
k,moose1,ivanova,secret1,matador,love69,420247,ktyjxrf,subway,cinder,vermo
nt,pussie,chico,florian,magick,guiness,allsop,ghetto,flash1,a123456789,typ
hoon,dfkthf,depeche,skydive,dammit,seeker,fuckthis,crysis,kcj9wx5n,umbrell
a,r2d2c3po,123123q,snoopdog,critter,theboss,ding,162534,splinter,kinky,cyc
lops,jayhawk,456321,caramel,qwer123,underdog,caveman,onlyme,grapes,feather
,hotshot,fuckher,renault,george1,sex123,pippen,000001,789987,floppy,cunts,
megapass,1000,pornos,usmc,kickass,great1,quattro,135246,wassup,helloo,p001
5123,nicole1,chivas,shannon1,bullseye,java,fishes,blackhaw,jamesbond,tunaf
ish,juggalo,dkflbckfd,123789456,dallas1,translator,122333,beanie,alucard,g
fhjkm123,supersta,magicman,ashley1,cohiba,xbox360,caligula,12131415,facial
,7753191,dfktynbyf,cobra1,cigars,fang,klingon,bob123,safari,looser,10203,d
eepthroat,malina,200000,tazmania,gonzo,goalie,jacob1,monaco,cruiser,misfit
,vh5150,tommyboy,marino13,yousuck,sharky,vfhufhbnf,horizon,absolut,brighto
n,123456r,death1,kungfu,maxx,forfun,mamapapa,enter1,budweise,banker,getmon

ey,kostya,qazwsx12,bigbear,vector,fallout,nudist,gunners,royals,chainsaw,s
cania,trader,blueboy,walrus,eastside,kahuna,qwerty1234,love123,steph,01011
989,cypress,champ,undertaker,ybrjkfq,europa,snowboar,sabres,moneyman,chris
bln,minime,nipper,groucho,whitey,viewsonic,penthous,wolf359,fabric,flounde
r,coolguy,whitesox,passme,smegma,skidoo,thanatos,fucku2,snapple,dalejr,mon
deo,thesims,mybaby,panasoni,sinbad,thecat,topher,frodo,sneakers,q123456,z1
x2c3,alfa,chicago1,taylor1,ghjcnjnfr,cat123,olivier,cyber,titanium,0420,ma
dison1,jabroni,dang,hambone,intruder,holly1,gargoyle,sadie1,static,poseido
n,studly,newcastl,sexxxx,poppy,johannes,danzig,beastie,musica,buckshot,sun
nyday,adonis,bluedog,bonkers,2128506,chrono,compute,spawn,01011988,turbo1,
smelly,wapbbs,goldstar,ferrari1,778899,quantum,pisces,boomboom,gunnar,1024
,test1234,florida1,nike,superman1,multiplelo,custom,motherlode,1qwerty,wes
twood,usnavy,apple123,daewoo,korn,stereo,sasuke,sunflowe,watcher,dharma,55
5777,mouse1,assholes,babyblue,123qwerty,marius,walmart,snoop,starfire,tigg
er1,paintbal,knickers,aaliyah,lokomotiv,theend,winston1,sapper,rover,eroti
ca,scanner,racer,zeus,sexy69,doogie,bayern,joshua1,newbie,scott1,losers,dr
oopy,outkast,martin1,dodge1,wasser,ufkbyf,rjycnfynby,thirteen,12345z,11221
1,hotred,deejay,hotpussy,192837,jessic,philippe,scout,panther1,cubbies,hav
efun,magpie,fghtkm,avalanch,newyork1,pudding,leonid,harry1,cbr600,audia4,b
immer,fucku,01011984,idontknow,vfvfgfgf,1357,aleksey,builder,01011987,zero
cool,godfather,mylife,donuts,allmine,redfish,777888,sascha,nitram,bounce,3
33666,smokes,1x2zkg8w,rodman,stunner,zxasqw12,hoosier,hairy,beretta,insert
,123456s,rtyuehe,francesc,tights,cheese1,micron,quartz,hockey1,gegcbr,sear
ay,jewels,bogey,paintball,celeron,padres,bing,syncmaster,ziggy,simon1,beac
hes,prissy,diehard,orange1,mittens,aleksandra,queens,02071986,biggles,thon
gs,southpark,artur,twinkle,gretzky,rabota,cambiami,monalisa,gollum,chuckle
s,spike1,gladiator,whisky,spongebob,sexy1,03082006,mazafaka,meathead,4121,
ou8122,barefoot,12345678q,cfitymrf,bigass,a1s2d3,kosmos,blessing,titty,cle
velan,terrapin,ginger1,johnboy,maggot,clarinet,deeznutz,336699,stumpy,ston
ey,footbal,traveler,volvo,bucket,snapon,pianoman,hawkeyes,futbol,casanova,
tango,goodboy,scuba,honey1,sexyman,warthog,mustard,abc1234,nickel,10203040
,meowmeow,1012,boricua,prophet,sauron,12qwas,reefer,andromeda,crystal1,jok
er1,90210,goofy,loco,lovesex,triangle,whatsup,mellow,bengals,monster1,mast
e,01011910,lover1,love1,123aaa,sunshin,smeghead,hokies,sting,welder,rambo,
cerberus,bunny1,rockford,monke,1q2w3e4r5,goldwing,gabriell,buzzard,crjhgbj
y,james007,rainman,groove,tiberius,purdue,nokia6300,hayabusa,shou,jagger,d
iver,zigzag,poochie,usarmy,phish,redwood,redwing,12345679,salamander,silve
r1,abcd123,sputnik,boobie,ripple,eternal,12qw34er,thegreat,allstar,slinky,
gesperrt,mishka,whiskers,pinhead,overkill,sweet1,rhfcjnrf,montgom240,serso
lution,jamie1,starman,proxy,swords,nikolay,bacardi,rasta,badgirl,rebecca1,
wildman,penny1,spaceman,1007,10101,logan1,hacked,bulldog1,helmet,windsor,b
uffy1,runescape,trapper,123451,banane,dbrnjh,ripken,12345qwe,frisky,shun,f
ester,oasis,lightning,ib6ub9,cicero,kool,pony,thedog,784512,01011992,megat
ron,illusion,edward1,napster,11223,squash,roadking,woohoo,19411945,hoosier
s,01091989,tracker,bagira,midway,leavemealone,br549,14725836,235689,menace
,rachel1,feng,laser,stoned,realmadrid,787898,balloons,tinkerbell,5551212,m
aria1,pobeda,heineken,sonics,moonlight,optimus,comet,orchid,02071982,jaybi
rd,kashmir,12345678a,chuang,chunky,peach,mortgage,rulezzz,saleen,chuckie,z

ippy,fishing1,gsxr750,doghouse,maxim,reader,shai,buddah,benfica,chou,salom
on,meister,eraser,blackbir,bigmike,starter,pissing,angus,deluxe,eagles1,ha
rdcock,135792468,mian,seahawks,godfathe,bookworm,gregor,intel,talisman,bla
ckjack,babyface,hawaiian,dogfood,zhong,01011975,sancho,ludmila,medusa,mort
imer,123456654321,roadrunn,just4me,stalin,01011993,handyman,alphabet,pizza
s,calgary,clouds,password2,cgfhnfr,f**k,cubswin,gong,lexus,max123,xxx123,d
igital1,gfhjkm1,7779311,missy1,michae,beautifu,gator1,1005,pacers,buddie,c
hinook,heckfy,dutchess,sally1,breasts,beowulf,darkman,jenn,tiffany1,zhei,q
uan,qazwsx1,satana,shang,idontkno,smiths,puddin,nasty1,teddybea,valkyrie,p
asswd,chao,boxster,killers,yoda,cheater,inuyasha,beast1,wareagle,foryou,dr
agonball,mermaid,bhbirf,teddy1,dolphin1,misty1,delphi,gromit,sponge,qazzaq
,fytxrf,gameover,diao,sergi,beamer,beemer,kittykat,rancid,manowar,adam12,d
iggler,assword,austin1,wishbone,gonavy,sparky1,fisting,thedude,sinister,12
13,venera,novell,salsero,jayden,fuckoff1,linda1,vedder,02021987,1pussy,red
line,lust,jktymrf,02011985,dfcbkbq,dragon12,chrome,gamecube,titten,cong,be
lla1,leng,02081988,eureka,bitchass,147369,banner,lakota,123321a,mustafa,pr
eacher,hotbox,02041986,z1x2c3v4,playstation,01011977,claymore,electra,chec
kers,zheng,qing,armagedon,02051986,wrestle,svoboda,bulls,nimbus,alenka,mad
ina,newpass6,onetime,aa123456,bartman,02091987,silverad,electron,12345t,de
vil666,oliver1,skylar,rhtdtlrj,gobucks,johann,12011987,milkman,02101985,ca
mper,thunderb,bigbutt,jammin,davide,cheeks,goaway,lighter,claudi,thumbs,pi
ssoff,ghostrider,cocaine,teng,squall,lotus,hootie,blackout,doitnow,subzero
,02031986,marine1,02021988,pothead,123456qw,skate,1369,peng,antoni,neng,mi
ao,bcfields,1492,marika,794613,musashi,tulips,nong,piao,chai,ruan,southpar
,02061985,nude,mandarin,654123,ninjas,cannabis,jetski,xerxes,zhuang,kleopa
tra,dickie,bilbo,pinky,morgan1,1020,1017,dieter,baseball1,tottenham,quest,
yfnfkmz,dirtbike,1234567890a,mango,jackson5,ipswich,iamgod,02011987,tdutyb
z,modena,qiao,slippery,qweasd123,bluefish,samtron,toon,111333,iscool,02091
986,petrov,fuzzy,zhou,1357924680,mollydog,deng,02021986,1236987,pheonix,zh
un,ghblehjr,othello,starcraf,000111,sanfran,a11111,cameltoe,badman,vasilis
a,jiang,1qaz2ws,luan,sveta,12qw12,akira,chuai,369963,cheech,beatle,pickup,
paloma,01011983,caravan,elizaveta,gawker,banzai,pussey,mullet,seng,bingo1,
bearcat,flexible,farscape,borussia,zhuai,templar,guitar1,toolman,yfcntymrf
,chloe1,xiang,slave1,guai,nuggets,02081984,mantis,slim,scorpio1,fyutkbyf,t
hedoors,02081987,02061986,123qq123,zappa,fergie,7ugd5hip2j,huai,asdfzxcv,s
unflower,pussyman,deadpool,bigtit,01011982,love12,lassie,skyler,gatorade,c
arpedie,jockey,mancity,spectre,02021984,cameron1,artemka,reng,02031984,iom
ega,jing,moritz,spice,rhino,spinner,heater,zhai,hover,talon,grease,qiong,c
orleone,ltybcrf,tian,cowboy1,hippie,chimera,ting,alex123,02021985,mickey1,
corsair,sonoma,aaron1,xxxpass,bacchus,webmaste,chuo,xyz123,chrysler,spurs1
,artem,shei,cosmic,01020304,deutsch,gabriel1,123455,oceans,987456321,binla
den,latinas,a12345678,speedo,buttercu,02081989,21031988,merlot,millwall,ce
ng,kotaku,jiong,dragonba,2580,stonecold,snuffy,01011999,02011986,hellos,bl
aze,maggie1,slapper,istanbul,bonjovi,babylove,mazda,bullfrog,phoeni,meng,p
orsche1,nomore,02061989,bobdylan,capslock,orion1,zaraza,teddybear,ntktajy,
myname,rong,wraith,mets,niao,02041984,smokie,chevrolet,dialog,gfhjkmgfhjkm
,dotcom,vadim,monarch,athlon,mikey1,hamish,pian,liang,coolness,chui,thoma,
ramones,ciccio,chippy,eddie1,house1,ning,marker,cougars,jackpot,barbados,r

eds,pdtplf,knockers,cobalt,amateurs,dipshit,napoli,kilroy,pulsar,jayhawks,
daemon,alexey,weng,shuang,9293709b13,shiner,eldorado,soulmate,mclaren,golf
er1,andromed,duan,50spanks,sexyboy,dogshit,02021983,shuo,kakashka,syzygy,1
11111a,yeahbaby,qiang,netscape,fulham,120676,gooner,zhui,rainbow6,laurent,
dog123,halifax,freeway,carlitos,147963,eastwood,microphone,monkey12,1123,p
ersik,coldbeer,geng,nuan,danny1,fgtkmcby,entropy,gadget,just4fun,sophi,bag
gio,carlito,1234567891,02021989,02041983,specialk,piramida,suan,bigblue,sa
lasana,hopeful,mephisto,bailey1,hack,annie1,generic,violetta,spencer1,arca
dia,02051983,hondas,9562876,trainer,jones1,smashing,liao,159632,iceberg,re
bel1,snooker,temp123,zang,matteo,fastball,q2w3e4r5,bamboo,fuckyo,shutup,as
tro,buddyboy,nikitos,redbird,maxxxx,shitface,02031987,kuai,kissmyass,sahar
a,radiohea,1234asdf,wildcard,maxwell1,patric,plasma,heynow,bruno1,shao,big
fish,misfits,sassy1,sheng,02011988,02081986,testpass,nanook,cygnus,licking
,slavik,pringles,xing,1022,ninja1,submit,dundee,tiburon,pinkfloyd,yummy,sh
uai,guang,chopin,obelix,insomnia,stroker,1a2s3d4f,1223,playboy1,lazarus,jo
rda,spider1,homerj,sleeper,02041982,darklord,cang,02041988,02041987,tripod
,magician,jelly,telephon,15975,vsjasnel12,pasword,iverson3,pavlov,homeboy,
gamecock,amigo,brodie,budapest,yjdsqgfhjkm,reckless,02011980,pang,tiger123
,2469,mason1,orient,01011979,zong,cdtnbr,maksimka,1011,bushido,taxman,gior
gio,sphinx,kazantip,02101984,concorde,verizon,lovebug,georg,sam123,seadoo,
qazwsxedc123,jiao,jezebel,pharmacy,abnormal,jellybea,maxime,puffy,islander
,bunnies,jiggaman,drakon,010180,pluto,zhjckfd,12365,classics,crusher,mordo
r,hooligan,strawberry,02081985,scrabble,hawaii50,1224,wg8e3wjf,cthtuf,prem
ium,arrow,123456qwe,mazda626,ramrod,tootie,rhjrjlbk,ghost1,1211,bounty,nia
ng,02071984,goat,killer12,sweetnes,porno1,masamune,426hemi,corolla,maripos
a,hjccbz,doomsday,bummer,blue12,zhao,bird33,excalibur,samsun,kirsty,buttfu
ck,kfhbcf,zhuo,marcello,ozzy,02021982,dynamite,655321,master12,123465,loll
ypop,stepan,1qa2ws,spiker,goirish,callum,michael2,moonbeam,attila,henry1,l
indros,andrea1,sporty,lantern,12365478,nextel,violin,volcom,998877,water1,
imation,inspiron,dynamo,citadel,placebo,clowns,tiao,02061988,tripper,dabea
rs,haggis,merlin1,02031985,anthrax,amerika,iloveme,vsegda,burrito,bombers,
snowboard,forsaken,katarina,a1a2a3,woofer,tigger2,fullmoon,tiger2,spock,ha
nnah1,snoopy1,sexxxy,sausages,stanislav,cobain,robotics,exotic,green123,mo
bydick,senators,pumpkins,fergus,asddsa,147741,258852,windsurf,reddevil,vfi
tymrf,nevermind,nang,woodland,4417,mick,shui,q1q2q3,wingman,69696,superb,z
uan,ganesh,pecker,zephyr,anastasiya,icu812,larry1,02081982,broker,zalupa,m
ihail,vfibyf,dogger,7007,paddle,varvara,schalke,1z2x3c,presiden,yankees2,t
uning,poopy,02051982,concord,vanguard,stiffy,rjhjktdf,felix1,wrench,firewa
ll,boxer,bubba69,popper,02011984,temppass,gobears,cuan,tipper,fuckme1,kami
la,thong,puss,bigcat,drummer1,02031982,sowhat,digimon,tigers1,rang,jingle,
bian,uranus,soprano,mandy1,dusty1,fandango,aloha,pumpkin1,postman,02061980
,dogcat,bombay,pussy123,onetwo,highheel,pippo,julie1,laura1,pepito,beng,sm
okey1,stylus,stratus,reload,duckie,karen1,jimbo1,225588,369258,krusty,snap
py,asdf12,electro,111qqq,kuang,fishin,clit,abstr,christma,qqqqq1,1234560,c
arnage,guyver,boxers,kittens,zeng,1000000,qwerty11,toaster,cramps,yugioh,0
2061987,icehouse,zxcvbnm123,pineapple,namaste,harrypotter,mygirl,falcon1,e
arnhard,fender1,spikes,nutmeg,01081989,dogboy,02091983,369852,softail,mypa
ssword,prowler,bigboss,1112,harvest,heng,jubilee,killjoy,basset,keng,zaqxs

wcde,redsox1,biao,titan,misfit99,robot,wifey,kidrock,02101987,gameboy,enri
co,1z2x3c4v,broncos1,arrows,havana,banger,cookie1,chriss,123qw,platypus,ci
ndy1,lumber,pinball,foxy,london1,1023,05051987,02041985,password12,superma
,longbow,radiohead,nigga,12051988,spongebo,qwert12345,abrakadabra,dodgers1
,02101989,chillin,niceguy,pistons,hookup,santafe,bigben,jets,1013,vikings1
,mankind,viktoriya,beardog,hammer1,02071980,reddwarf,magelan,longjohn,jenn
ife,gilles,carmex2,02071987,stasik,bumper,doofus,slamdunk,pixies,garion,st
effi,alessandro,beerman,niceass,warrior1,honolulu,134679852,visa,johndeer,
mother1,windmill,boozer,oatmeal,aptiva,busty,delight,tasty,slick1,bergkamp
,badgers,guitars,puffin,02091981,nikki1,irishman,miller1,zildjian,123000,a
irwolf,magnet,anai,install,02041981,02061983,astra,romans,megan1,mudvayne,
freebird,muscles,dogbert,02091980,02091984,snowflak,01011900,mang,joseph1,
nygiants,playstat,junior1,vjcrdf,qwer12,webhompas,giraffe,pelican,jefferso
,comanche,bruiser,monkeybo,kjkszpj,123456l,micro,albany,02051987,angel123,
epsilon,aladin,death666,hounddog,josephin,altima,chilly,02071988,78945,ult
ra,02041979,gasman,thisisit,pavel,idunno,kimmie,05051985,paulie,ballin,med
ion,moondog,manolo,pallmall,climber,fishbone,genesis1,153624,toffee,tbone,
clippers,krypton,jerry1,picturs,compass,111111q,02051988,1121,02081977,sai
ram,getout,333777,cobras,22041987,bigblock,severin,booster,norwich,whiteou
t,ctrhtn,123456m,02061984,hewlett,shocker,fuckinside,02031981,chase1,white
1,versace,123456789s,basebal,iloveyou2,bluebell,08031986,anthon,stubby,for
eve,undertak,werder,saiyan,mama123,medic,chipmunk,mike123,mazdarx7,qwe123q
we,bowwow,kjrjvjnbd,celeb,choochoo,demo,lovelife,02051984,colnago,lithium,
02051989,15051981,zzzxxx,welcom,anastasi,fidelio,franc,26061987,roadster,s
tone55,drifter,hookem,hellboy,1234qw,cbr900rr,sinned,good123654,storm1,gyp
sy,zebra,zachary1,toejam,buceta,02021979,testing1,redfox,lineage,mike1,hig
hbury,koroleva,nathan1,washingt,02061982,02091985,vintage,redbaron,dalshe,
mykids,11051987,macbeth,julien,james123,krasotka,111000,10011986,987123,pi
peline,tatarin,sensei,codered,komodo,frogman,7894561230,nascar24,juicy,010
31988,redrose,mydick,pigeon,tkbpfdtnf,smirnoff,1215,spam,winner1,flyfish,m
oskva,81fukkc,21031987,olesya,starligh,summer99,13041988,fishhead,freesex,
super12,06061986,azazel,scoobydoo,02021981,cabron,yogibear,sheba1,konstant
in,tranny,chilli,terminat,ghbywtccf,slowhand,soccer12,cricket1,fuckhead,10
02,seagull,achtung,blam,bigbob,bdsm,nostromo,survivor,cnfybckfd,lemonade,b
oomer1,rainbow1,rober,irinka,cocksuck,peaches1,itsme,sugar1,zodiac,upyours
,dinara,135791,sunny1,chiara,johnson1,02041989,solitude,habibi,sushi,marki
z,smoke1,rockies,catwoman,johnny1,qwerty7,bearcats,username,01011978,wande
rer,ohshit,02101986,sigma,stephen1,paradigm,02011989,flanker,sanity,jsbach
,spotty,bologna,fantasia,chevys,borabora,cocker,74108520,123ewq,12021988,0
1061990,gtnhjdbx,02071981,01011960,sundevil,3000gt,mustang6,gagging,maggi,
armstron,yfnfkb,13041987,revolver,02021976,trouble1,madcat,jeremy1,jackass
1,volkswag,30051985,corndog,pool6123,marines1,03041991,pizza1,piggy,sissy,
02031979,sunfire,angelus,undead,24061986,14061991,wildbill,shinobi,45m2do5
bs,123qwer,21011989,cleopatr,lasvega,hornets,amorcit,11081989,coventry,nir
vana1,destin,sidekick,20061988,02081983,gbhfvblf,sneaky,bmw325,22021989,nf
ytxrf,sekret,kalina,zanzibar,hotone,qazws,wasabi,heidi1,highlander,blues1,
hitachi,paolo,23041987,slayer1,simba1,02011981,tinkerbe,kieran,01121986,17
2839,boiler,1125,bluesman,waffle,asdfgh01,threesom,conan,1102,reflex,18011

987,nautilus,everlast,fatty,vader1,01071986,cyborg,ghbdtn123,birddog,rubbl
e,02071983,suckers,02021973,skyhawk,12qw12qw,dakota1,joebob,nokia6233,wood
ie,longdong,lamer,troll,ghjcnjgfhjkm,420000,boating,nitro,armada,messiah,1
031,penguin1,02091989,americ,02071989,redeye,asdqwe123,07071987,monty1,got
en,spikey,sonata,635241,tokiohotel,sonyericsson,citroen,compaq1,1812,umpir
e,belmont,jonny,pantera1,nudes,palmtree,14111986,fenway,bighead,razor,gryp
hon,andyod22,aaaaa1,taco,10031988,enterme,malachi,dogface,reptile,01041985
,dindom,handball,marseille,candy1,19101987,torino,tigge,matthias,viewsoni,
13031987,stinker,evangelion,24011985,123456123,rampage,sandrine,02081980,t
hecrow,astral,28041987,sprinter,private1,seabee,shibby,02101988,25081988,f
earless,junkie,01091987,aramis,antelope,draven,fuck1,mazda6,eggman,0202199
0,barselona,buddy123,19061987,fyfnjkbq,nancy1,12121990,10071987,sluggo,kil
le,hotties,irishka,zxcasdqwe123,shamus,fairlane,honeybee,soccer10,13061986
,fantomas,17051988,10051987,20111986,gladiato,karachi,gambler,gordo,010119
95,biatch,matthe,25800852,papito,excite,buffalo1,bobdole,cheshire,player1,
28021992,thewho,10101986,pinky1,mentor,tomahawk,brown1,03041986,bismillah,
bigpoppa,ijrjkfl,01121988,runaway,08121986,skibum,studman,helper,squeak,ho
lycow,manfred,harlem,glock,gideon,987321,14021985,yellow1,wizard1,margarit
,success1,medved,sf49ers,lambda,pasadena,johngalt,quasar,1776,02031980,col
dplay,amand,playa,bigpimp,04041991,capricorn,elefant,sweetness,bruce1,luca
,dominik,10011990,biker,09051945,datsun,elcamino,trinitro,malice,audi,voya
ger1,02101983,joe123,carpente,spartan1,mario1,glamour,diaper,12121985,2201
1988,winter1,asimov,callisto,nikolai,pebble,02101981,vendetta,david123,boy
toy,11061985,02031989,iloveyou1,stupid1,cayman,casper1,zippo,yamahar1,wild
wood,foxylady,calibra,02041980,27061988,dungeon,leedsutd,30041986,11051990
,bestbuy,antares,dominion,24680,01061986,skillet,enforcer,derparol,0104198
8,196969,29071983,f00tball,purple1,mingus,25031987,21031990,remingto,giggl
es,klaste,3x7pxr,01011994,coolcat,29051989,megane,20031987,02051980,040419
88,synergy,0000007,macman,iforget,adgjmp,vjqgfhjkm,28011987,rfvfcenhf,1605
1989,25121987,16051987,rogue,mamamia,08051990,20091991,1210,carnival,bolit
as,paris1,dmitriy,dimas,05051989,papillon,knuckles,29011985,hola,tophat,28
021990,100500,cutiepie,devo,415263,ducks,ghjuhfvvf,asdqwe,22021986,freefal
l,parol,02011983,zarina,buste,vitamin,warez,bigones,17061988,baritone,jame
ss,twiggy,mischief,bitchy,hetfield,1003,dontknow,grinch,sasha_007,18061990
,12031985,12031987,calimero,224466,letmei,15011987,acmilan,alexandre,02031
977,08081988,whiteboy,21051991,barney1,02071978,money123,18091985,bigdawg,
02031988,cygnusx1,zoloto,31011987,firefigh,blowfish,screamer,lfybbk,200519
88,chelse,11121986,01031989,harddick,sexylady,30031988,02041974,auditt,piz
dec,kojak,kfgjxrf,20091988,123456ru,wp2003wp,1204,15051990,slugger,kordell
1,03031986,swinging,01011974,02071979,rockie,dimples,1234123,1dragon,truck
ing,rusty2,roger1,marijuana,kerouac,02051978,08031985,paco,thecure,keepout
,kernel,noname123,13121985,francisc,bozo,02011982,22071986,02101979,obsidi
an,12345qw,spud,tabasco,02051985,jaguars,dfktynby,kokomo,popova,notused,se
vens,4200,magneto,02051976,roswell,15101986,21101986,lakeside,bigbang,aspe
n,little1,14021986,loki,suckmydick,strawber,carlos1,nokian73,dirty1,joshu,
25091987,16121987,02041975,advent,17011987,slimshady,whistler,10101990,str
yker,22031984,15021985,01031985,blueball,26031988,ksusha,bahamut,robocop,w
_pass,chris123,impreza,prozac,bookie,bricks,13021990,alice1,cassandr,11111

q,john123,4ever,korova,02051973,142857,25041988,paramedi,eclipse1,salope,0
7091990,1124,darkangel,23021986,999666,nomad,02051981,smackdow,01021990,yo
yoma,argentin,moonligh,57chevy,bootys,hardone,capricor,galant,spanker,dkfl
br,24111989,magpies,krolik,21051988,cevthrb,cheddar,22041988,bigbooty,scub
a1,qwedsa,duffman,bukkake,acura,johncena,sexxy,p@ssw0rd,258369,cherries,12
345s,asgard,leopold,fuck123,mopar,lalakers,dogpound,matrix1,crusty,spanner
,kestrel,fenris,universa,peachy,assasin,lemmein,eggplant,hejsan,canucks,we
ndy1,doggy1,aikman,tupac,turnip,godlike,fussball,golden1,19283746,april1,d
jango,petrova,captain1,vincent1,ratman,taekwondo,chocha,serpent,perfect1,c
apetown,vampir,amore,gymnast,timeout,nbvjatq,blue32,ksenia,k.lvbkf,nazgul,
budweiser,clutch,mariya,sylveste,02051972,beaker,cartman1,q11111,sexxx,for
ever1,loser1,marseill,magellan,vehpbr,sexgod,jktxrf,hallo123,132456,liverp
ool1,southpaw,seneca,camden,357159,camero,tenchi,johndoe,145236,roofer,741
963,vlad,02041978,fktyrf,zxcv123,wingnut,wolfpac,notebook,pufunga7782,bran
dy1,biteme1,goodgirl,redhat,02031978,challeng,millenium,hoops,maveric,nona
me,angus1,gaell,onion,olympus,sabrina1,ricard,sixpack,gratis,gagged,camaro
ss,hotgirls,flasher,02051977,bubba123,goldfing,moonshin,gerrard,volkov,son
yfuck,mandrake,258963,tracer,lakers1,asians,susan1,money12,helmut,boater,d
iablo2,1234zxcv,dogwood,bubbles1,happy2,randy1,aries,beach1,marcius2,navig
ator,goodie,hellokitty,fkbyjxrf,earthlink,lookout,jumbo,opendoor,stanley1,
marie1,12345m,07071977,ashle,wormix,murzik,02081976,lakewood,bluejays,love
ya,commande,gateway2,peppe,01011976,7896321,goth,oreo,slammer,rasmus,faith
1,knight1,stone1,redskin,ironmaiden,gotmilk,destiny1,dejavu,1master,midnit
e,timosha,espresso,delfin,toriamos,oberon,ceasar,markie,1a2s3d,ghhh47hj764
9,vjkjrj,daddyo,dougie,disco,auggie,lekker,therock1,ou8123,start1,noway,p4
ssw0rd,shadow12,333444,saigon,2fast4u,capecod,23skidoo,qazxcv,beater,breme
n,aaasss,roadrunner,peace1,12345qwer,02071975,platon,bordeaux,vbkfirf,1357
98642,test12,supernov,beatles1,qwert40,optimist,vanessa1,prince1,ilovegod,
nightwish,natasha1,alchemy,bimbo,blue99,patches1,gsxr1000,richar,hattrick,
hott,solaris,proton,nevets,enternow,beavis1,amigos,159357a,ambers,lenochka
,147896,suckdick,shag,intercourse,blue1234,spiral,02061977,tosser,ilove,02
031975,cowgirl,canuck,q2w3e4,munch,spoons,waterboy,123567,evgeniy,savior,z
asada,redcar,mamacita,terefon,globus,doggies,htubcnhfwbz,1008,cuervo,susli
k,azertyui,limewire,houston1,stratfor,steaua,coors,tennis1,12345qwerty,sti
gmata,derf,klondike,patrici,marijuan,hardball,odyssey,nineinch,boston1,pas
s1,beezer,sandr,charon,power123,a1234,vauxhall,875421,awesome1,reggae,boul
der,funstuff,iriska,krokodil,rfntymrf,sterva,champ1,bball,peeper,m123456,t
oolbox,cabernet,sheepdog,magic32,pigpen,02041977,holein1,lhfrjy,banan,dabo
mb,natalie1,jennaj,montana1,joecool,funky,steven1,ringo,junio,sammy123,qqq
www,baltimor,footjob,geezer,357951,mash4077,cashmone,pancake,monic,grandam
,bongo,yessir,gocubs,nastia,vancouve,barley,dragon69,watford,ilikepie,0207
1976,laddie,123456789m,hairball,toonarmy,pimpdadd,cvthnm,hunte,davinci,lba
ck,sophie1,firenze,q1234567,admin1,bonanza,elway7,daman,strap,azert,wxcvbn
,afrika,theforce,123456t,idefix,wolfen,houdini,scheisse,default,beech,mase
rati,02061976,sigmachi,dylan1,bigdicks,eskimo,mizzou,02101976,riccardo,egg
head,111777,kronos,ghbrjk,chaos1,jomama,rfhnjirf,rodeo,dolemite,cafc91,nit
tany,pathfind,mikael,password9,vqsablpzla,purpl,gabber,modelsne,myxworld,h
ellsing,punker,rocknrol,fishon,fuck69,02041976,lolol,twinkie,tripleh,cirru

s,redbone,killer123,biggun,allegro,gthcbr,smith1,wanking,bootsy,barry1,moh
awk,koolaid,5329,futurama,samoht,klizma,996633,lobo,honeys,peanut1,556677,
zxasqw,joemama,javelin,samm,223322,sandra1,flicks,montag,nataly,3006,tasha
1,1235789,dogbone,poker1,p0o9i8u7,goodday,smoothie,toocool,max333,metroid,
archange,vagabond,billabon,22061941,tyson1,02031973,darkange,skateboard,ev
olutio,morrowind,wizards,frodo1,rockin,cumslut,plastics,zaqwsxcde,5201314,
doit,outback,bumble,dominiqu,persona,nevermore,alinka,02021971,forgetit,se
xo,all4one,c2h5oh,petunia,sheeba,kenny1,elisabet,aolsucks,woodstoc,pumper,
02011975,fabio,granada,scrapper,123459,minimoni,q123456789,breaker,1004,02
091976,ncc74656,slimshad,friendster,austin31,wiseguy,donner,dilbert1,13246
5,blackbird,buffet,jellybean,barfly,behappy,01011971,carebear,fireblad,020
51975,boxcar,cheeky,kiteboy,hello12,panda1,elvisp,opennow,doktor,alex12,02
101977,pornking,flamengo,02091975,snowbird,lonesome,robin1,11111a,weed420,
baracuda,bleach,12345abc,nokia1,metall,singapor,mariner,herewego,dingo,tyc
oon,cubs,blunts,proview,123456789d,kamasutra,lagnaf,vipergts,navyseal,star
war,masterbate,wildone,peterbil,cucumber,butkus,123qwert,climax,deniro,got
ribe,cement,scooby1,summer69,harrier,shodan,newyear,02091977,starwars1,rom
eo1,sedona,harald,doubled,sasha123,bigguns,salami,awnyce,kiwi,homemade,pim
ping,azzer,bradley1,warhamme,linkin,dudeman,qwe321,pinnacle,maxdog,flipflo
p,lfitymrf,fucker1,acidburn,esquire,sperma,fellatio,jeepster,thedon,sexybi
tch,pookey,spliff,widget,vfntvfnbrf,trinity1,mutant,samuel1,meliss,gohome,
1q2q3q,mercede,comein,grin,cartoons,paragon,henrik,rainyday,pacino,senna,b
igdog1,alleycat,12345qaz,narnia,mustang2,tanya1,gianni,apollo11,wetter,clo
vis,escalade,rainbows,freddy1,smart1,daisydog,s123456,cocksucker,pushkin,l
efty,sambo,fyutkjxtr,hiziad,boyz,whiplash,orchard,newark,adrenalin,1598753
,bootsie,chelle,trustme,chewy,golfgti,tuscl,ambrosia,5wr2i7h8,penetration,
shonuf,jughead,payday,stickman,gotham,kolokol,johnny5,kolbasa,stang,puppyd
og,charisma,gators1,mone,jakarta,draco,nightmar,01011973,inlove,laetitia,0
2091973,tarpon,nautica,meadow,0192837465,luckyone,14881488,chessie,goldene
y,tarakan,69camaro,bungle,wordup,interne,fuckme2,515000,dragonfl,sprout,02
081974,gerbil,bandit1,02071971,melanie1,phialpha,camber,kathy1,adriano,gon
zo1,10293847,bigjohn,bismarck,7777777a,scamper,12348765,rabbits,222777,byn
thytn,dima123,alexander1,mallorca,dragster,favorite6,beethove,burner,coope
r1,fosters,hello2,normandy,777999,sebring,1michael,lauren1,blake1,killa,02
091971,nounours,trumpet1,thumper1,playball,xantia,rugby1,rocknroll,guillau
m,angela1,strelok,prosper,buttercup,masterp,dbnfkbr,cambridg,venom,treefro
g,lumina,1234566,supra,sexybabe,freee,shen,frogs,driller,pavement,grace1,d
icky,checker,smackdown,pandas,cannibal,asdffdsa,blue42,zyjxrf,nthvbyfnjh,m
elrose,neon,jabber,gamma,369258147,aprilia,atticus,benessere,catcher,skipp
er1,azertyuiop,sixty9,thierry,treetop,jello,melons,123456789qwe,tantra,buz
zer,catnip,bouncer,computer1,sexyone,ananas,young1,olenka,sexman,mooses,ki
ttys,sephiroth,contra,hallowee,skylark,sparkles,777333,1qazxsw23edc,lucas1
,q1w2e3r,gofast,hannes,amethyst,ploppy,flower2,hotass,amatory,volleyba,dix
ie1,bettyboo,ticklish,02061974,frenchy,phish1,murphy1,trustno,02061972,lei
nad,mynameis,spooge,jupiter1,hyundai,frosch,junkmail,abacab,marbles,32167,
casio,sunshine1,wayne1,longhair,caster,snicker,02101973,gannibal,skinhead,
hansol,gatsby,segblue2,montecar,plato,gumby,kaboom,matty,bosco1,888999,jaz
zy,panter,jesus123,charlie2,giulia,candyass,sex69,travis1,farmboy,special1

,02041973,letsdoit,password01,allison1,abcdefg1,notredam,ilikeit,789654123
,liberty1,rugger,uptown,alcatraz,123456w,airman,007bond,navajo,kenobi,terr
ier,stayout,grisha,frankie1,fluff,1qazzaq1,1234561,virginie,1234568,tango1
,werdna,octopus,fitter,dfcbkbcf,blacklab,115599,montrose,allen1,supernova,
frederik,ilovepussy,justice1,radeon,playboy2,blubber,sliver,swoosh,motocro
s,lockdown,pearls,thebear,istheman,pinetree,biit,1234rewq,rustydog,tampaba
y,titts,babycake,jehovah,vampire1,streaming,collie,camil,fidelity,calvin1,
stitch,gatit,restart,puppy1,budgie,grunt,capitals,hiking,dreamcas,zorro1,3
21678,riffraff,makaka,playmate,napalm,rollin,amstel,zxcvb123,samanth,rumbl
e,fuckme69,jimmys,951357,pizzaman,1234567899,tralala,delpiero,alexi,yamato
,itisme,1million,vfndtq,kahlua,londo,wonderboy,carrots,tazz,ratboy,rfgecnf
,02081973,nico,fujitsu,tujhrf,sergbest,blobby,02051970,sonic1,1357911,smir
nov,video1,panhead,bucky,02031974,44332211,duffer,cashmoney,left4dead,bagp
uss,salman,01011972,titfuck,66613666,england1,malish,dresden,lemans,darina
,zapper,123456as,123456qqq,met2002,02041972,redstar,blue23,1234509876,paje
ro,booyah,please1,tetsuo,semper,finder,hanuman,sunlight,123456n,02061971,t
reble,cupoi,password99,dimitri,3ip76k2,popcorn1,lol12345,stellar,nympho,sh
ark1,keith1,saskia,bigtruck,revoluti,rambo1,asd222,feelgood,phat,gogators,
bismark,cola,puck,furball,burnout,slonik,bowtie,mommy1,icecube,fabienn,mou
ser,papamama,rolex,giants1,blue11,trooper1,momdad,iklo,morten,rhubarb,gare
th,123456d,blitz,canada1,r2d2,brest,tigercat,usmarine,lilbit,benny1,azrael
,lebowski,12345r,madagaskar,begemot,loverman,dragonballz,italiano,mazda3,n
aughty1,onions,diver1,cyrano,capcom,asdfg123,forlife,fisherman,weare138,re
quiem,mufasa,alpha123,piercing,hellas,abracadabra,duckman,caracas,macintos
,02011971,jordan2,crescent,fduecn,hogtied,eatmenow,ramjet,18121812,kicksas
s,whatthe,discus,rfhfvtkmrf,rufus1,sqdwfe,mantle,vegitto,trek,dan123,palad
in1,rudeboy,liliya,lunchbox,riversid,acapulco,libero,dnsadm,maison,toomuch
,boobear,hemlock,sextoy,pugsley,misiek,athome,migue,altoids,marcin,123450,
rhfcfdbwf,jeter2,rhinos,rjhjkm,mercury1,ronaldinho,shampoo,makayla,kamilla
,masterbating,tennesse,holger,john1,matchbox,hores,poptart,parlament,goody
ear,asdfgh1,02081970,hardwood,alain,erection,hfytnrb,highlife,implants,ben
jami,dipper,jeeper,bendover,supersonic,babybear,laserjet,gotenks,bama,nate
dogg,aol123,pokemo,rabbit1,raduga,sopranos,cashflow,menthol,pharao,hacking
,334455,ghjcnbnenrf,lizzy,muffin1,pooky,penis1,flyer,gramma,dipset,becca,i
reland1,diana1,donjuan,pong,ziggy1,alterego,simple1,cbr900,logger,111555,c
laudia1,cantona7,matisse,ljxtymrf,victori,harle,mamas,encore,mangos,iceman
1,diamon,alexxx,tiamat,5000,desktop,mafia,smurf,princesa,shojou,blueberr,w
elkom,maximka,123890,123q123,tammy1,bobmarley,clips,demon666,ismail,termit
e,laser1,missie,altair,donna1,bauhaus,trinitron,mogwai,flyers88,juniper,no
kia5800,boroda,jingles,qwerasdfzxcv,shakur,777666,legos,mallrats,1qazxsw,g
oldeneye,tamerlan,julia1,backbone,spleen,49ers,shady,darkone,medic1,justi,
giggle,cloudy,aisan,douche,parkour,bluejay,huskers1,redwine,1qw23er4,satch
mo,1231234,nineball,stewart1,ballsack,probes,kappa,amiga,flipper1,dortmund
,963258,trigun,1237895,homepage,blinky,screwy,gizzmo,belkin,chemist,coolha
nd,chachi,braves1,thebest,greedisgood,pro100,banana1,101091m,123456g,wonde
rfu,barefeet,8inches,1111qqqq,kcchiefs,qweasdzxc123,metal1,jennifer1,xian,
asdasd123,pollux,cheerleaers,fruity,mustang5,turbos,shopper,photon,espana,
hillbill,oyster,macaroni,gigabyte,jesper,motown,tuxedo,buster12,triplex,cy

clones,estrell,mortis,holla,456987,fiddle,sapphic,jurassic,thebeast,ghjcnj
q,baura,spock1,metallica1,karaoke,nemrac58,love1234,02031970,flvbybcnhfnjh
,frisbee,diva,ajax,feathers,flower1,soccer11,allday,mierda,pearl1,amature,
marauder,333555,redheads,womans,egorka,godbless,159263,nimitz,aaaa1111,sas
hka,madcow,socce,greywolf,baboon,pimpdaddy,123456789r,reloaded,lancia,rfhf
ylfi,dicker,placid,grimace,22446688,olemiss,whores,culinary,wannabe,maxi,1
234567aa,amelie,riley1,trample,phantom1,baberuth,bramble,asdfqwer,vides,4y
ou,abc123456,taichi,aztnm,smother,outsider,hakr,blackhawk,bigblack,girlie,
spook,valeriya,gianluca,freedo,1q2q3q4q,handbag,lavalamp,cumm,pertinant,wh
atup,nokia123,redlight,patrik,111aaa,poppy1,dfytxrf,aviator,sweeps,kristin
1,cypher,elway,yinyang,access1,poophead,tucson,noles1,monterey,waterfal,da
nk,dougal,918273,suede,minnesot,legman,bukowski,ganja,mammoth,riverrat,ass
wipe,daredevi,lian,arizona1,kamikadze,alex1234,smile1,angel2,55bgates,bell
agio,0001,wanrltw,stiletto,lipton,arsena,biohazard,bbking,chappy,tetris,as
123456,darthvad,lilwayne,nopassword,7412369,123456789987654321,natchez,gli
tter,14785236,mytime,rubicon,moto,pyon,wazzup,tbird,shane1,nightowl,getoff
,beckham7,trueblue,hotgirl,nevermin,deathnote,13131,taffy,bigal,copenhag,a
pricot,gallaries,dtkjcbgtl,totoro,onlyone,civicsi,jesse1,baby123,sierra1,f
estus,abacus,sickboy,fishtank,fungus,charle,golfpro,teensex,mario66,seasid
e,aleksei,rosewood,blackberry,1020304050,bedlam,schumi,deerhunt,contour,da
rkelf,surveyor,deltas,pitchers,741258963,dipstick,funny1,lizzard,112233445
566,jupiter2,softtail,titman,greenman,z1x2c3v4b5,smartass,12345677,notnow,
myworld,nascar1,chewbacc,nosferatu,downhill,dallas22,kuan,blazers,whales,s
oldat,craving,powerman,yfcntyf,hotrats,cfvceyu,qweasdzx,princess1,feline,q
qwwee,chitown,1234qaz,mastermind,114477,dingbat,care1839,standby,kismet,at
reides,dogmeat,icarus,monkeyboy,alex1,mouses,nicetits,sealteam,chopper1,cr
ispy,winter99,rrpass1,myporn,myspace1,corazo,topolino,ass123,lawman,muffy,
orgy,1love,passord,hooyah,ekmzyf,pretzel,amonra,nestle,01011950,jimbeam,ha
ppyman,z12345,stonewal,helios,manunited,harcore,dick1,gaymen,2hot4u,light1
,qwerty13,kakashi,pjkjnj,alcatel,taylo,allah,buddydog,ltkmaby,mongo,blonds
,start123,audia6,123456v,civilwar,bellaco,turtles,mustan,deadspin,aaa123,f
ynjirf,lucky123,tortoise,amor,summe,waterski,zulu,drag0n,dtxyjcnm,gizmos,s
trife,interacial,pusyy,goose1,bear1,equinox,matri,jaguar1,tobydog,sammys,n
achos,traktor,bryan1,morgoth,444555,dasani,miami1,mashka,xxxxxx1,ownage,ni
ghtwin,hotlips,passmast,cool123,skolko,eldiablo,manu,1357908642,screwyou,b
adabing,foreplay,hydro,kubrick,seductive,demon1,comeon,galileo,aladdin,met
oo,happines,902100,mizuno,caddy,bizzare,girls1,redone,ohmygod,sable,bonovo
x,girlies,hamper,opus,gizmodo1,aaabbb,pizzahut,999888,rocky2,anton1,kikimo
ra,peavey,ocelot,a1a2a3a4,2wsx3edc,jackie1,solace,sprocket,galary,chuck1,v
olvo1,shurik,poop123,locutus,virago,wdtnjxtr,tequier,bisexual,doodles,make
itso,fishy,789632145,nothing1,fishcake,sentry,libertad,oaktree,fivestar,ad
idas1,vegitta,mississi,spiffy,carme,neutron,vantage,agassi,boners,12345678
9v,hilltop,taipan,barrage,kenneth1,fister,martian,willem,lfybkf,bluestar,m
oonman,ntktdbpjh,paperino,bikers,daffy,benji,quake,dragonfly,suckcock,dani
lka,lapochka,belinea,calypso,asshol,camero1,abraxas,mike1234,womam,q1q2q3q
4q5,youknow,maxpower,pic's,audi80,sonora,raymond1,tickler,tadpole,belair,c
razyman,finalfantasy,999000,jonatha,paisley,kissmyas,morgana,monste,mantra
,spunk,magic123,jonesy,mark1,alessand,741258,baddest,ghbdtnrfrltkf,zxccxz,

tictac,augustin,racers,7grout,foxfire,99762000,openit,nathanie,1z2x3c4v5b,
seadog,gangbanged,lovehate,hondacbr,harpoon,mamochka,fisherma,bismilla,loc
ust,wally1,spiderman1,saffron,utjhubq,123456987,20spanks,safeway,pisser,bd
fyjd,kristen1,bigdick1,magenta,vfhujif,anfisa,friday13,qaz123wsx,098765432
1q,tyrant,guan,meggie,kontol,nurlan,ayanami,rocket1,yaroslav,websol76,mutl
ey,hugoboss,websolutions,elpaso,gagarin,badboys,sephirot,918273645,newuser
,qian,edcrfv,booger1,852258,lockout,timoxa94,mazda323,firedog,sokolova,sky
diver,jesus777,1234567890z,soulfly,canary,malinka,guillerm,hookers,dogfart
,surfer1,osprey,india123,rhjkbr,stoppedby,nokia5530,123456789o,blue1,werte
r,divers,3000,123456f,alpina,cali,whoknows,godspeed,986532,foreskin,fuzzy1
,heyyou,didier,slapnuts,fresno,rosebud1,sandman1,bears1,blade1,honeybun,qu
een1,baronn,pakista,philipp,9111961,topsecret,sniper1,214365,slipper,letsf
uck,pippen33,godawgs,mousey,qw123456,scrotum,loveis,lighthou,bp2002,nancy1
23,jeffrey1,susieq,buddy2,ralphie,trout1,willi,antonov,sluttey,rehbwf,mart
y1,darian,losangeles,letme1n,12345d,pusssy,godiva,ender,golfnut,leonidas,a
1b2c3d4e5,puffer,general1,wizzard,lehjxrf,racer1,bigbucks,cool12,buddys,zi
nger,esprit,vbienrf,josep,tickling,froggie,987654321a,895623,daddys,crumbs
,gucci,mikkel,opiate,tracy1,christophe,came11,777555,petrovich,humbug,dirt
ydog,allstate,horatio,wachtwoord,creepers,squirts,rotary,bigd,georgia1,fuj
ifilm,2sweet,dasha,yorkie,slimjim,wiccan,kenzie,system1,skunk,b12345,getit
,pommes,daredevil,sugars,bucker,piston,lionheart,1bitch,515051,catfight,re
con,icecold,fantom,vodafone,kontakt,boris1,vfcnth,canine,01011961,valleywa
,faraon,chickenwing101,qq123456,livewire,livelife,roosters,jeepers,ilya123
4,coochie,pavlik,dewalt,dfhdfhf,architec,blackops,1qaz2wsx3edc4rfv,rhfcjnf
,wsxedc,teaser,sebora,25252,rhino1,ankara,swifty,decimal,redleg,shanno,ner
mal,candies,smirnova,dragon01,photo1,ranetki,a1s2d3f4g5,axio,wertzu,mauriz
io,6uldv8,zxcvasdf,punkass,flowe,graywolf,peddler,3rjs1la7qe,mpegs,seawolf
,ladyboy,pianos,piggies,vixen,alexus,orpheus,gdtrfb,z123456,macgyver,huget
its,ralph1,flathead,maurici,mailru,goofball,nissan1,nikon,stopit,odin,big1
,smooch,reboot,famil,bullit,anthony7,gerhard,methos,124038,morena,eagle2,j
essica2,zebras,getlost,gfynthf,123581321,sarajevo,indon,comets,tatjana,rfg
bnjirf,joystick,batman12,123456c,sabre,beerme,victory1,kitties,1475369,bad
boy1,booboo1,comcast,slava,squid,saxophon,lionhear,qaywsx,bustle,nastena,r
oadway,loader,hillside,starlight,24681012,niggers,access99,bazooka,molly12
3,blackice,bandi,cocacol,nfhfrfy,timur,muschi,horse1,quant4307s,squerting,
oscars,mygirls,flashman,tangerin,goofy1,p0o9i8,housewifes,newness,monkey69
,escorpio,password11,hippo,warcraft3,qazxsw123,qpalzm,ribbit,ghbdtndctv,bo
gota,star123,258000,lincoln1,bigjim,lacoste,firestorm,legenda,indain,ludac
ris,milamber,1009,evangeli,letmesee,a111111,hooters1,bigred1,shaker,husky,
a4tech,cnfkrth,argyle,rjhjdf,nataha,0o9i8u7y,gibson1,sooners1,glendale,arc
hery,hoochie,stooge,aaaaaa1,scorpions,school1,vegas1,rapier,mike23,bassoon
,groupd2013,macaco,baker1,labia,freewill,santiag,silverado,butch1,vflfufcr
fh,monica1,rugrat,cornhole,aerosmit,bionicle,gfgfvfvf,daniel12,virgo,fmale
,favorite2,detroit1,pokey,shredder,baggies,wednesda,cosmo1,mimosa,sparhawk
,firehawk,romario,911turbo,funtimes,fhntvrf,nexus6,159753456,timothy1,baji
ngan,terry1,frenchie,raiden,1mustang,babemagnet,74123698,nadejda,truffles,
rapture,douglas1,lamborghini,motocross,rjcvjc,748596,skeeter1,dante1,angel
666,telecom,carsten,pietro,bmw318,astro1,carpediem,samir,orang,helium,scir

occo,fuzzball,rushmore,rebelz,hotspur,lacrimosa,chevys10,madonna1,domenico
,yfnfirf,jachin,shelby1,bloke,dawgs,dunhill,atlanta1,service1,mikado,devil
man,angelit,reznor,euphoria,lesbain,checkmat,browndog,phreak,blaze1,crash1
,farida,mutter,luckyme,horsemen,vgirl,jediknig,asdas,cesare,allnight,rocke
y,starlite,truck1,passfan,close-up,samue,cazzo,wrinkles,homely,eatme1,sexp
ot,snapshot,dima1995,asthma,thetruth,ducky,blender,priyanka,gaucho,dutchma
n,sizzle,kakarot,651550,passcode,justinbieber,666333,elodie,sanjay,110442,
alex01,lotus1,2300mj,lakshmi,zoomer,quake3,12349876,teapot,12345687,ramada
,pennywis,striper,pilot1,chingon,optima,nudity,ethan1,euclid,beeline,loyol
a,biguns,zaq12345,bravo1,disney1,buffa,assmunch,vivid,6661313,wellingt,aqw
zsx,madala11,9874123,sigmar,pictere,tiptop,bettyboop,dinero,tahiti,gregory
1,bionic,speed1,fubar1,lexus1,denis1,hawthorn,saxman,suntzu,bernhard,domin
ika,camaro1,hunter12,balboa,bmw2002,seville,diablo1,vfhbyjxrf,1234abc,carl
ing,lockerroom,punani,darth,baron1,vaness,1password,libido,picher,232425,k
aramba,futyn007,daydream,11001001,dragon123,friends1,bopper,rocky123,chooc
h,asslover,shimmer,riddler,openme,tugboat,sexy123,midori,gulnara,christo,s
watch,laker,offroad,puddles,hackers,mannheim,manager1,horseman,roman1,danc
er1,komputer,pictuers,nokia5130,ejaculation,lioness,123456y,evilone,nasten
ka,pushok,javie,lilman,3141592,mjolnir,toulouse,pussy2,bigworm,smoke420,fu
llback,extensa,dreamcast,belize,delboy,willie1,casablanca,csyjxtr,ricky1,b
onghit,salvator,basher,pussylover,rosie1,963258741,vivitron,cobra427,meonl
y,armageddon,myfriend,zardoz,qwedsazxc,kraken,fzappa,starfox,333999,illmat
ic,capoeira,weenie,ramzes,freedom2,toasty,pupkin,shinigami,fhvfutljy,noctu
rne,churchil,thumbnils,tailgate,neworder,sexymama,goarmy,cerebus,michelle1
,vbifyz,surfsup,earthlin,dabulls,basketbal,aligator,mojojojo,saibaba,welco
me2,wifes,wdtnjr,12345w,slasher,papabear,terran,footman,hocke,153759,texan
s,tom123,sfgiants,billabong,aassdd,monolith,xxx777,l3tm31n,ticktock,newone
,hellno,japanees,contortionist,admin123,scout1,alabama1,divx1,rochard,priv
at,radar1,bigdad,fhctybq,tortuga,citrus,avanti,fantasy1,woodstock,s12345,f
ireman1,embalmer,woodwork,bonzai,konyor,newstart,jigga,panorama,goats,smit
hy,rugrats,hotmama,daedalus,nonstop,fruitbat,lisenok,quaker,violator,12345
123,my3sons,cajun,fraggle,gayboy,oldfart,vulva,knickerless,orgasms,underto
w,binky,litle,kfcnjxrf,masturbation,bunnie,alexis1,planner,transexual,spar
ty,leeloo,monies,fozzie,stinger1,landrove,anakonda,scoobie,yamaha1,henti,s
tar12,rfhlbyfk,beyonce,catfood,cjytxrf,zealots,strat,fordtruc,archangel,si
lvi,sativa,boogers,miles1,bigjoe,tulip,petite,greentea,shitter,jonboy,volt
ron,morticia,evanescence,3edc4rfv,longshot,windows1,serge,aabbcc,starbucks
,sinful,drywall,prelude1,www123,camel1,homebrew,marlins,123412,letmeinn,do
mini,swampy,plokij,fordf350,webcam,michele1,bolivi,27731828,wingzero,qawse
drftg,shinji,sverige,jasper1,piper1,cummer,iiyama,gocats,amour,alfarome,ju
manji,mike69,fantasti,1monkey,w00t88,shawn1,lorien,1a2s3d4f5g,koleso,murph
,natascha,sunkist,kennwort,emine,grinder,m12345,q1q2q3q4,cheeba,money2,qaz
wsxedc1,diamante,prosto,pdiddy,stinky1,gabby1,luckys,franci,pornographic,m
oochie,gfhjdjp,samdog,empire1,comicbookdb,emili,motdepasse,iphone,bravehea
rt,reeses,nebula,sanjose,bubba2,kickflip,arcangel,superbow,porsche911,xyzz
y,nigger1,dagobert,devil1,alatam,monkey2,barbara1,12345v,vfpfafrf,alessio,
babemagn,aceman,arrakis,kavkaz,987789,jasons,berserk,sublime1,rogue1,myspa
ce,buckwhea,csyekz,pussy4me,vette1,boots1,boingo,arnaud,budlite,redstorm,p

aramore,becky1,imtheman,chango,marley1,milkyway,666555,giveme,mahalo,lux20
00,lucian,paddy,praxis,shimano,bigpenis,creeper,newproject2004,rammstei,j3
qq4h7h2v,hfljcnm,lambchop,anthony2,bugman,gfhjkm12,dreamer1,stooges,cybers
ex,diamant,cowboyup,maximus1,sentra,615243,goethe,manhatta,fastcar,selmer,
1213141516,yfnfitymrf,denni,chewey,yankee1,elektra,123456789p,trousers,fis
hface,topspin,orwell,vorona,sodapop,motherfu,ibilltes,forall,kookie,ronald
1,balrog,maximilian,mypasswo,sonny1,zzxxcc,tkfkdg,magoo,mdogg,heeled,gitar
a,lesbos,marajade,tippy,morozova,enter123,lesbean,pounded,asd456,fialka,sc
arab,sharpie,spanky1,gstring,sachin,12345asd,princeto,hellohel,ursitesux,b
illows,1234kekc,kombat,cashew,duracell,kseniya,sevenof9,kostik,arthur1,cor
vet07,rdfhnbhf,songoku,tiberian,needforspeed,1qwert,dropkick,kevin123,pana
che,libra,a123456a,kjiflm,vfhnsirf,cntgfy,iamcool,narut,buffer,sk8ordie,ur
laub,fireblade,blanked,marishka,gemini1,altec,gorillaz,chief1,revival47,ir
onman1,space1,ramstein,doorknob,devilmaycry,nemesis1,sosiska,pennstat,mond
ay1,pioner,shevchenko,detectiv,evildead,blessed1,aggie,coffees,tical,scott
s,bullwink,marsel,krypto,adrock,rjitxrf,asmodeus,rapunzel,theboys,hotdogs,
deepthro,maxpayne,veronic,fyyeirf,otter,cheste,abbey1,thanos,bedrock,barto
k,google1,xxxzzz,rodent,montecarlo,hernande,mikayla,123456789l,bravehea,12
locked,ltymub,pegasus1,ameteur,saltydog,faisal,milfnew,momsuck,everques,yt
ngfhjkz,m0nkey,businessbabe,cooki,custard,123456ab,lbvjxrf,outlaws,753357,
qwerty78,udacha,insider,chees,fuckmehard,shotokan,katya,seahorse,vtldtlm,t
urtle1,mike12,beebop,heathe,everton1,darknes,barnie,rbcekz,alisher,toohot,
theduke,555222,reddog1,breezy,bulldawg,monkeyman,baylee,losangel,mastermi,
apollo1,aurelie,zxcvb12345,cayenne,bastet,wsxzaq,geibcnbr,yello,fucmy69,re
dwall,ladybird,bitchs,cccccc1,rktjgfnhf,ghjdthrf,quest1,oedipus,linus,impa
lass,fartman,12345k,fokker,159753a,optiplex,bbbbbb1,realtor,slipkno,santac
ru,rowdy,jelena,smeller,3984240,ddddd1,sexyme,janet1,3698741,eatme69,cazzo
ne,today1,poobear,ignatius,master123,newpass1,heather2,snoopdogg,blondinka
,pass12,honeydew,fuckthat,890098890,lovem,goldrush,gecko,biker1,llama,pend
ejo,avalanche,fremont,snowman1,gandolf,chowder,1a2b3c4d5e,flyguy,magadan,1
fuck,pingvin,nokia5230,ab1234,lothar,lasers,bignuts,renee1,royboy,skynet,1
2340987,1122334,dragrace,lovely1,22334455,booter,12345612,corvett,123456qq
,capital1,videoes,funtik,wyvern,flange,sammydog,hulkster,13245768,not4you,
vorlon,omegared,l58jkdjp!,filippo,123mudar,samadams,petrus,chris12,charlie
123,123456789123,icetea,sunderla,adrian1,123qweas,kazanova,aslan,monkey123
,fktyeirf,goodsex,123ab,lbtest,banaan,bluenose,837519,asd12345,waffenss,wh
ateve,1a2a3a4a,trailers,vfhbirf,bhbcrf,klaatu,turk182,monsoon,beachbum,sun
beam,succes,clyde1,viking1,rawhide,bubblegum,princ,mackenzi,hershey1,22255
5,dima55,niggaz,manatee,aquila,anechka,pamel,bugsbunn,lovel,sestra,newport
1,althor,hornyman,wakeup,zzz111,phishy,cerber,torrent,thething,solnishko,b
abel,buckeye1,peanu,ethernet,uncencored,baraka,665544,chris2,rb26dett,will
y1,choppers,texaco,biggirl,123456b,anna2614,sukebe,caralho,callofduty,rt6y
tere,jesus7,angel12,1money,timelord,allblack,pavlova,romanov,tequiero,yitb
os,lookup,bulls23,snowflake,dickweed,barks,lever,irisha,firestar,fred1234,
ghjnjnbg,danman,gatito,betty1,milhouse,kbctyjr,masterbaiting,delsol,papit,
doggys,123698741,bdfyjdf,invictus,bloods,kayla1,yourmama,apple2,angelok,bi
gboy1,pontiac1,verygood,yeshua,twins2,porn4me,141516,rasta69,james2,bossho
g,candys,adventur,stripe,djkjlz,dokken,austin316,skins,hogwarts,vbhevbh,na

vigato,desperado,xxx666,cneltyn,vasiliy,hazmat,daytek,eightbal,fred1,four2
0,74227422,fabia,aerosmith,manue,wingchun,boohoo,hombre,sanity72,goatboy,f
uckm,partizan,avrora,utahjazz,submarin,pussyeat,heinlein,control1,costaric
,smarty,chuan,triplets,snowy,snafu,teacher1,vangogh,vandal,evergree,cochis
e,qwerty99,pyramid1,saab900,sniffer,qaz741,lebron23,mark123,wolvie,blackbe
lt,yoshi,feeder,janeway,nutella,fuking,asscock,deepak,poppie,bigshow,house
wife,grils,tonto,cynthia1,temptress,irakli,belle1,russell1,manders,frank12
3,seabass,gforce,songbird,zippy1,naught,brenda1,chewy1,hotshit,topaz,43046
721,girfriend,marinka,jakester,thatsme,planeta,falstaff,patrizia,reborn,ri
ptide,cherry1,shuan,nogard,chino,oasis1,qwaszx12,goodlife,davis1,1911a1,ha
rrys,shitfuck,12345678900,russian7,007700,bulls1,porshe,danil,dolphi,river
1,sabaka,gobigred,deborah1,volkswagen,miamo,alkaline,muffdive,1letmein,fkb
yrf,goodguy,hallo1,nirvan,ozzie,cannonda,cvbhyjdf,marmite,germany1,joeblow
,radio1,love11,raindrop,159852,jacko,newday,fathead,elvis123,caspe,citiban
k,sports1,deuce,boxter,fakepass,golfman,snowdog,birthday4,nonmembe,niklas,
parsifal,krasota,theshit,1235813,maganda,nikita1,omicron,cassie1,columbo,b
uick,sigma1,thistle,bassin,rickster,apteka,sienna,skulls,miamor,coolgirl,g
ravis,1qazxc,virgini,hunter2,akasha,batma,motorcyc,bambino,tenerife,fordf2
50,zhuan,iloveporn,markiza,hotbabes,becool,fynjybyf,wapapapa,forme,mamont,
pizda,dragonz,sharon1,scrooge,mrbill,pfloyd,leeroy,natedog,ishmael,777111,
tecumseh,carajo,nfy.irf,0000000000o,blackcock,fedorov,antigone,feanor,novi
kova,bobert,peregrin,spartan117,pumkin,rayman,manuals,tooltime,555333,bone
thug,marina1,bonnie1,tonyhawk,laracroft,mahalkita,18273645,terriers,gamer,
hoser,littlema,molotok,glennwei,lemon1,caboose,tater,12345654321,brians,fr
itz1,mistral,jigsaw,fuckshit,hornyguy,southside,edthom,antonio1,bobmarle,p
itures,ilikesex,crafty,nexus,boarder,fulcrum,astonvil,yanks1,yngwie,accoun
t1,zooropa,hotlegs,sammi,gumbo,rover1,perkele,maurolarastefy,lampard,35775
3,barracud,dmband,abcxyz,pathfinder,335577,yuliya,micky,jayman,asdfg12345,
1596321,halcyon,rerfhtre,feniks,zaxscd,gotyoass,jaycee,samson1,jamesb,vibr
ate,grandpri,camino,colossus,davidb,mamo4ka,nicky1,homer123,pinguin,waterm
elon,shadow01,lasttime,glider,823762,helen1,pyramids,tulane,osama,rostov,j
ohn12,scoote,bhbyrf,gohan,galeries,joyful,bigpussy,tonka,mowgli,astalavist
a,zzz123,leafs,dalejr8,unicorn1,777000,primal,bigmama,okmijn,killzone,qaz1
2345,snookie,zxcvvcxz,davidc,epson,rockman,ceaser,beanbag,katten,3151020,d
uckhunt,segreto,matros,ragnar,699669,sexsexse,123123z,fuckyeah,bigbutts,gb
cmrf,element1,marketin,saratov,elbereth,blaster1,yamahar6,grime,masha,june
au,1230123,pappy,lindsay1,mooner,seattle1,katzen,lucent,polly1,lagwagon,pi
xie,misiaczek,666666a,smokedog,lakers24,eyeball,ironhors,ametuer,volkodav,
vepsrf,kimmy,gumby1,poi098,ovation,1q2w3,drinker,penetrating,summertime,1d
allas,prima,modles,takamine,hardwork,macintosh,tahoe,passthie,chiks,sundow
n,flowers1,boromir,music123,phaedrus,albert1,joung,malakas,gulliver,parker
1,balder,sonne,jessie1,domainlock2005,express1,vfkbyf,youandme,raketa,koal
a,dhjnvytyjub,nhfrnjh,testibil,ybrbnjc,987654321q,axeman,pintail,pokemon12
3,dogggg,shandy,thesaint,11122233,x72jhhu3z,theclash,raptors,zappa1,djdjxr
f,hell666,friday1,vivaldi,pluto1,lance1,guesswho,jeadmi,corgan,skillz,skip
py1,mango1,gymnastic,satori,362514,theedge,cxfcnkbdfz,sparkey,deicide,bage
ls,lololol,lemmings,r4e3w2q1,silve,staind,schnuffi,dazzle,basebal1,leroy1,
bilbo1,luckie,qwerty2,goodfell,hermione,peaceout,davidoff,yesterda,killah,

flippy,chrisb,zelda1,headless,muttley,fuckof,tittys,catdaddy,photog,beeker
,reaver,ram1500,yorktown,bolero,tryagain,arman,chicco,learjet,alexei,jenna
1,go2hell,12s3t4p55,momsanaladventure,mustang9,protoss,rooter,ginola,dingo
1,mojave,erica1,1qazse4,marvin1,redwolf,sunbird,dangerou,maciek,girsl,hawk
s1,packard1,excellen,dashka,soleda,toonces,acetate,nacked,jbond007,alligat
or,debbie1,wellhung,monkeyma,supers,rigger,larsson,vaseline,rjnzhf,maripos
,123456asd,cbr600rr,doggydog,cronic,jason123,trekker,flipmode,druid,sonyva
io,dodges,mayfair,mystuff,fun4me,samanta,sofiya,magics,1ranger,arcane,sixt
ynin,222444,omerta,luscious,gbyudby,bobcats,envision,chance1,seaweed,holde
m,tomate,mensch,slicer,acura1,goochi,qweewq,punter,repoman,tomboy,never1,c
ortina,gomets,147896321,369852147,dogma,bhjxrf,loglatin,eragon,strato,gaze
lle,growler,885522,klaudia,payton34,fuckem,butchie,scorpi,lugano,123456789
k,nichola,chipper1,spide,uhbujhbq,rsalinas,vfylfhby,longhorns,bugatti,ever
quest,!qaz2wsx,blackass,999111,snakeman,p455w0rd,fanatic,family1,pfqxbr,77
7vlad,mysecret,marat,phoenix2,october1,genghis,panties1,cooker,citron,ace1
23,1234569,gramps,blackcoc,kodiak1,hickory,ivanhoe,blackboy,escher,sincity
,beaks,meandyou,spaniel,canon1,timmy1,lancaste,polaroid,edinburg,fuckedup,
hotman,cueball,golfclub,gopack,bookcase,worldcup,dkflbvbhjdbx,twostep,1717
1717aa,letsplay,zolushka,stella1,pfkegf,kingtut,67camaro,barracuda,wiggles
,gjhjkm,prancer,patata,kjifhf,theman1,romanova,sexyass,copper1,dobber,soko
lov,pomidor,algernon,cadman,amoremio,william2,silly1,bobbys,hercule,hd764n
w5d7e1vb1,defcon,deutschland,robinhood,alfalfa,machoman,lesbens,pandora1,e
asypay,tomservo,nadezhda,goonies,saab9000,jordyn,f15eagle,dbrecz,12qwerty,
greatsex,thrawn,blunted,baywatch,doggystyle,loloxx,chevy2,january1,kodak,b
ushel,78963214,ub6ib9,zz8807zpl,briefs,hawker,224488,first1,bonzo,brent1,e
rasure,69213124,sidewind,soccer13,622521,mentos,kolibri,onepiece,united1,p
onyboy,keksa12,wayer,mypussy,andrej,mischa,mille,bruno123,garter,bigpun,ta
lgat,familia,jazzy1,mustang8,newjob,747400,bobber,blackbel,hatteras,ginge,
asdfjkl;,camelot1,blue44,rebbyt34,ebony1,vegas123,myboys,aleksander,ijrjkf
lrf,lopata,pilsner,lotus123,m0nk3y,andreev,freiheit,balls1,drjynfrnt,mazda
1,waterpolo,shibumi,852963,123bbb,cezer121,blondie1,volkova,rattler,kleene
x,ben123,sanane,happydog,satellit,qazplm,qazwsxedcrfvtgb,meowmix,badguy,fa
cefuck,spice1,blondy,major1,25000,anna123,654321a,sober1,deathrow,patterso
,china1,naruto1,hawkeye1,waldo1,butchy,crayon,5tgb6yhn,klopik,crocodil,mot
hra,imhorny,pookie1,splatter,slippy,lizard1,router,buratino,yahweh,123698,
dragon11,123qwe456,peepers,trucker1,ganjaman,1hxboqg2,cheyanne,storys,seba
stie,zztop,maddison,4rfv3edc,darthvader,jeffro,iloveit,victor1,hotty,delph
in,lifeisgood,gooseman,shifty,insertions,dude123,abrupt,123masha,boogaloo,
chronos,stamford,pimpster,kthjxrf,getmein,amidala,flubber,fettish,grapeape
,dantes,oralsex,jack1,foxcg33,winchest,francis1,getin,archon,cliffy,bluema
n,1basebal,sport1,emmitt22,porn123,bignasty,morga,123hfjdk147,ferrar,juani
to,fabiol,caseydog,steveo,peternorth,paroll,kimchi,bootleg,gaijin,secre,ac
acia,eatme2,amarillo,monkey11,rfhfgep,tylers,a1a2a3a4a5,sweetass,blower,ro
dina,babushka,camilo,cimbom,tiffan,vfnbkmlf,ohbaby,gotigers,lindsey1,drago
n13,romulus,qazxsw12,zxcvbn1,dropdead,hitman47,snuggle,eleven11,bloopers,3
57mag,avangard,bmw320,ginscoot,dshade,masterkey,voodoo1,rootedit,caramba,l
eahcim,hannover,8phrowz622,tim123,cassius,000000a,angelito,zzzzz1,badkarma
,star1,malaga,glenwood,footlove,golf1,summer12,helpme1,fastcars,titan1,pol

ice1,polinka,k.jdm,marusya,augusto,shiraz,pantyhose,donald1,blaise,arabell
a,brigada,c3por2d2,peter01,marco1,hellow,dillweed,uzumymw,geraldin,loveyou
2,toyota1,088011,gophers,indy500,slainte,5hsu75kpot,teejay,renat,racoon,sa
brin,angie1,shiznit,harpua,sexyred,latex,tucker1,alexandru,wahoo,teamwork,
deepblue,goodison,rundmc,r2d2c3p0,puppys,samba,ayrton,boobed,999777,topsec
re,blowme1,123321z,loudog,random1,pantie,drevil,mandolin,121212q,hottub,br
other1,failsafe,spade1,matvey,open1234,carmen1,priscill,schatzi,kajak,good
dog,trojans1,gordon1,kayak,calamity,argent,ufhvjybz,seviyi,penfold,assface
,dildos,hawkwind,crowbar,yanks,ruffles,rastus,luv2epus,open123,aquafina,da
wns,jared1,teufel,12345c,vwgolf,pepsi123,amores,passwerd,01478520,boliva,s
mutty,headshot,password3,davidd,zydfhm,gbgbcmrf,pornpass,insertion,ceckbr,
test2,car123,checkit,dbnfkbq,niggas,nyyankee,muskrat,nbuhtyjr,gunner1,ocea
n1,fabienne,chrissy1,wendys,loveme89,batgirl,cerveza,igorek,steel1,ragman,
boris123,novifarm,sexy12,qwerty777,mike01,giveitup,123456abc,fuckall,crevi
ce,hackerz,gspot,eight8,assassins,texass,swallows,123458,baldur,moonshine,
labatt,modem,sydney1,voland,dbnfkz,hotchick,jacker,princessa,dawgs1,holida
y1,booper,reliant,miranda1,jamaica1,andre1,badnaamhere,barnaby,tiger7,davi
d12,margaux,corsica,085tzzqi,universi,thewall,nevermor,martin6,qwerty77,ci
pher,apples1,0102030405,seraphim,black123,imzadi,gandon,ducati99,1shadow,d
kflbvbhjdyf,44magnum,bigbad,feedme,samantha1,ultraman,redneck1,jackdog,usm
c0311,fresh1,monique1,tigre,alphaman,cool1,greyhoun,indycar,crunchy,55chev
y,carefree,willow1,063dyjuy,xrated,assclown,federica,hilfiger,trivia,bronc
o1,mamita,100200300,simcity,lexingky,akatsuki,retsam,johndeere,abudfv,rast
er,elgato,businka,satanas,mattingl,redwing1,shamil,patate,mannn,moonstar,e
vil666,b123456,bowl300,tanechka,34523452,carthage,babygir,santino,bondaren
ko,jesuss,chico1,numlock,shyguy,sound1,kirby1,needit,mostwanted,427900,fun
ky1,steve123,passions,anduril,kermit1,prospero,lusty,barakuda,dream1,brood
war,porky,christy1,mahal,yyyyyy1,allan1,1sexy,flintsto,capri,cumeater,here
tic,robert2,hippos,blindax,marykay,collecti,kasumi,1qaz!qaz,112233q,123258
,chemistr,coolboy,0o9i8u,kabuki,righton,tigress,nessie,sergej,andrew12,yfa
fyz,ytrhjvfyn,angel7,victo,mobbdeep,lemming,transfor,1725782,myhouse,aeynb
r,muskie,leno4ka,westham1,cvbhyjd,daffodil,pussylicker,pamela1,stuffer,war
ehous,tinker1,2w3e4r,pluton,louise1,polarbea,253634,prime1,anatoliy,januar
,wysiwyg,cobraya,ralphy,whaler,xterra,cableguy,112233a,porn69,jamesd,aqual
ung,jimmy123,lumpy,luckyman,kingsize,golfing1,alpha7,leeds1,marigold,lol12
34,teabag,alex11,10sne1,saopaulo,shanny,roland1,basser,3216732167,carol1,y
ear2005,morozov,saturn1,joseluis,bushed,redrock,memnoch,lalaland,indiana1,
lovegod,gulnaz,buffalos,loveyou1,anteater,pattaya,jaydee,redshift,bartek,s
ummerti,coffee1,ricochet,incest,schastie,rakkaus,h2opolo,suikoden,perro,da
nce1,loveme1,whoopass,vladvlad,boober,flyers1,alessia,gfcgjhn,pipers,papay
a,gunsling,coolone,blackie1,gonads,gfhjkzytn,foxhound,qwert12,gangrel,ghjv
tntq,bluedevi,mywife,summer01,hangman,licorice,patter,vfr750,thorsten,5152
53,ninguna,dakine,strange1,mexic,vergeten,12345432,8phrowz624,stampede,flo
yd1,sailfish,raziel,ananda,giacomo,freeme,crfprf,74185296,allstars,master0
1,solrac,gfnhbjn,bayliner,bmw525,3465xxx,catter,single1,michael3,pentium4,
nitrox,mapet123456,halibut,killroy,xxxxx1,phillip1,poopsie,arsenalfc,buffy
s,kosova,all4me,32165498,arslan,opensesame,brutis,charles2,pochta,nadegda,
backspac,mustang0,invis,gogeta,654321q,adam25,niceday,truckin,gfdkbr,bicep

s,sceptre,bigdave,lauras,user345,sandys,shabba,ratdog,cristiano,natha,marc
h13,gumball,getsdown,wasdwasd,redhead1,dddddd1,longlegs,13572468,starsky,d
ucksoup,bunnys,omsairam,whoami,fred123,danmark,flapper,swanky,lakings,yfhe
nj,asterios,rainier,searcher,dapper,ltdjxrf,horsey,seahawk,shroom,tkfkdgo,
aquaman,tashkent,number9,messi10,1asshole,milenium,illumina,vegita,jodeci,
buster01,bareback,goldfinger,fire1,33rjhjds,sabian,thinkpad,smooth1,sully,
bonghits,sushi1,magnavox,colombi,voiture,limpone,oldone,aruba,rooster1,zhe
nya,nomar5,touchdow,limpbizkit,rhfcfdxbr,baphomet,afrodita,bball1,madiso,l
adles,lovefeet,matthew2,theworld,thunderbird,dolly1,123rrr,forklift,alfons
,berkut,speedy1,saphire,oilman,creatine,pussylov,bastard1,456258,wicked1,f
ilimon,skyline1,fucing,yfnfkbz,hot123,abdulla,nippon,nolimits,billiard,boo
ty1,buttplug,westlife,coolbean,aloha1,lopas,asasin,1212121,october2,whodat
,good4u,d12345,kostas,ilya1992,regal,pioneer1,volodya,focus1,bastos,nbvjif
,fenix,anita1,vadimka,nickle,jesusc,123321456,teste,christ1,essendon,evgen
ii,celticfc,adam1,forumwp,lovesme,26exkp,chillout,burly,thelast1,marcus1,m
etalgear,test11,ronaldo7,socrate,world1,franki,mommie,vicecity,postov1000,
charlie3,oldschool,333221,legoland,antoshka,counterstrike,buggy,mustang3,1
23454,qwertzui,toons,chesty,bigtoe,tigger12,limpopo,rerehepf,diddle,nokia3
250,solidsnake,conan1,rockroll,963369,titanic1,qwezxc,cloggy,prashant,kath
arin,maxfli,takashi,cumonme,michael9,mymother,pennstate,khalid,48151623,fi
ghtclub,showboat,mateusz,elrond,teenie,arrow1,mammamia,dustydog,dominator,
erasmus,zxcvb1,1a2a3a,bones1,dennis1,galaxie,pleaseme,whatever1,junkyard,g
aladriel,charlies,2wsxzaq1,crimson1,behemoth,teres,master11,fairway,shady1
,pass99,1batman,joshua12,baraban,apelsin,mousepad,melon,twodogs,123321qwe,
metalica,ryjgrf,pipiska,rerfhfxf,lugnut,cretin,iloveu2,powerade,aaaaaaa1,o
manko,kovalenko,isabe,chobits,151nxjmt,shadow11,zcxfcnkbdf,gy3yt2rgls,vfhb
yrf,159753123,bladerunner,goodone,wonton,doodie,333666999,fuckyou123,kitty
123,chisox,orlando1,skateboa,red12345,destroye,snoogans,satan1,juancarlo,g
oheels,jetson,scottt,fuckup,aleksa,gfhfljrc,passfind,oscar123,derrick1,hat
eme,viper123,pieman,audi100,tuffy,andover,shooter1,10000,makarov,grant1,ni
ghthaw,13576479,browneye,batigol,nfvfhf,chocolate1,7hrdnw23,petter,bantam,
morlii,jediknight,brenden,argonaut,goodstuf,wisconsi,315920,abigail1,dirtb
ag,splurge,k123456,lucky777,valdepen,gsxr600,322223,ghjnjrjk,zaq1xsw2cde3,
schwanz,walter1,letmein22,nomads,124356,codeblue,nokian70,fucke,footbal1,a
gyvorc,aztecs,passw0r,smuggles,femmes,ballgag,krasnodar,tamuna,schule,sixt
ynine,empires,erfolg,dvader,ladygaga,elite1,venezuel,nitrous,kochamcie,oli
via1,trustn01,arioch,sting1,131415,tristar,555000,maroon,135799,marsik,555
556,fomoco,natalka,cwoui,tartan,davecole,nosferat,hotsauce,dmitry,horus,di
masik,skazka,boss302,bluebear,vesper,ultras,tarantul,asd123asd,azteca,thef
lash,8ball,1footbal,titlover,lucas123,number6,sampson1,789852,party1,drago
n99,adonai,carwash,metropol,psychnau,vthctltc,hounds,firework,blink18,1456
32,wildcat1,satchel,rice80,ghtktcnm,sailor1,cubano,anderso,rocks1,mike11,f
amili,dfghjc,besiktas,roygbiv,nikko,bethan,minotaur,rakesh,orange12,hfleuf
,jackel,myangel,favorite7,1478520,asssss,agnieszka,haley1,raisin,htubyf,1b
uster,cfiekz,derevo,1a2a3a4a5a,baltika,raffles,scruffy1,clitlick,louis1,bu
ddha1,fy.nrf,walker1,makoto,shadow2,redbeard,vfvfvskfhfve,mycock,sandydog,
lineman,network1,favorite8,longdick,mustangg,mavericks,indica,1killer,cisc
o1,angelofwar,blue69,brianna1,bubbaa,slayer666,level42,baldrick,brutus1,lo

wdown,haribo,lovesexy,500000,thissuck,picker,stephy,1fuckme,characte,telec
ast,1bigdog,repytwjdf,thematrix,hammerhe,chucha,ganesha,gunsmoke,georgi,sh
eltie,1harley,knulla,sallas,westie,dragon7,conker,crappie,margosha,lisboa,
3e2w1q,shrike,grifter,ghjcnjghjcnj,asdfg1,mnbvcxz1,myszka,posture,boggie,r
ocketman,flhtyfkby,twiztid,vostok,pi314159,force1,televizor,gtkmvtym,samha
in,imcool,jadzia,dreamers,strannik,k2trix,steelhea,nikitin,commodor,brian1
23,chocobo,whopper,ibilljpf,megafon,ararat,thomas12,ghbrjkbcn,q1234567890,
hibernia,kings1,jim123,redfive,68camaro,iawgk2,xavier1,1234567u,d123456,nd
irish,airborn,halfmoon,fluffy1,ranchero,sneaker,soccer2,passion1,cowman,bi
rthday1,johnn,razzle,glock17,wsxqaz,nubian,lucky2,jelly1,henderso,eric1,12
3123e,boscoe01,fuck0ff,simpson1,sassie,rjyjgkz,nascar3,watashi,loredana,ja
nus,wilso,conman,david2,mothe,iloveher,snikers,davidj,fkmnthyfnbdf,mettss,
ratfink,123456h,lostsoul,sweet16,brabus,wobble,petra1,fuckfest,otters,sabl
e1,svetka,spartacu,bigstick,milashka,1lover,pasport,champagn,papichul,hrva
tska,hondacivic,kevins,tacit,moneybag,gohogs,rasta1,246813579,ytyfdbcnm,gu
bber,darkmoon,vitaliy,233223,playboys,tristan1,joyce1,oriflame,mugwump,acc
ess2,autocad,thematri,qweqwe123,lolwut,ibill01,multisyn,1233211,pelikan,ro
b123,chacal,1234432,griffon,pooch,dagestan,geisha,satriani,anjali,rocketma
,gixxer,pendrago,vincen,hellokit,killyou,ruger,doodah,bumblebe,badlands,ga
lactic,emachines,foghorn,jackso,jerem,avgust,frontera,123369,daisymae,horn
yboy,welcome123,tigger01,diabl,angel13,interex,iwantsex,rockydog,kukolka,s
awdust,online1,3234412,bigpapa,jewboy,3263827,dave123,riches,333222,tony1,
toggle,farter,124816,tities,balle,brasilia,southsid,micke,ghbdtn12,patit,c
tdfcnjgjkm,olds442,zzzzzz1,nelso,gremlins,gypsy1,carter1,slut69,farcry,741
5963,michael8,birdie1,charl,123456789abc,100001,aztec,sinjin,bigpimpi,clos
eup,atlas1,nvidia,doggone,classic1,manana,malcolm1,rfkbyf,hotbabe,rajesh,d
imebag,ganjubas,rodion,jagr68,seren,syrinx,funnyman,karapuz,123456789n,blo
omin,admin18533362,biggdogg,ocarina,poopy1,hellome,internet1,booties,blowj
obs,matt1,donkey1,swede,1jennife,evgeniya,lfhbyf,coach1,444777,green12,pat
ryk,pinewood,justin12,271828,89600506779,notredame,tuborg,lemond,sk8ter,mi
llion1,wowser,pablo1,st0n3,jeeves,funhouse,hiroshi,gobucs,angeleye,bereza,
winter12,catalin,qazedc,andros,ramazan,vampyre,sweethea,imperium,murat,jam
est,flossy,sandeep,morgen,salamandra,bigdogg,stroller,njdevils,nutsack,vit
torio,%%passwo,playful,rjyatnrf,tookie,ubnfhf,michi,777444,shadow13,devils
1,radiance,toshiba1,beluga,amormi,dandfa,trust1,killemall,smallville,polga
ra,billyb,landscap,steves,exploite,zamboni,damage11,dzxtckfd,trader12,poke
y1,kobe08,damager,egorov,dragon88,ckfdbr,lisa69,blade2,audis4,nelson1,nibb
les,23176djivanfros,mutabor,artofwar,matvei,metal666,hrfzlz,schwinn,poohbe
a,seven77,thinker,123456789qwerty,sobriety,jakers,karamelka,vbkfyf,volodin
,iddqd,dale03,roberto1,lizaveta,qqqqqq1,cathy1,08154711,davidm,quixote,blu
enote,tazdevil,katrina1,bigfoot1,bublik,marma,olechka,fatpussy,marduk,arin
a,nonrev67,qqqq1111,camill,wtpfhm,truffle,fairview,mashina,voltaire,qazxsw
edcvfr,dickface,grassy,lapdance,bosstone,crazy8,yackwin,mobil,danielit,mou
nta1n,player69,bluegill,mewtwo,reverb,cnthdf,pablito,a123321,elena1,warcra
ft1,orland,ilovemyself,rfntyjr,joyride,schoo,dthjxrf,thetachi,goodtimes,bl
acksun,humpty,chewbacca,guyute,123xyz,lexicon,blue45,qwe789,galatasaray,ce
ntrino,hendrix1,deimos,saturn5,craig1,vlad1996,sarah123,tupelo,ljrnjh,hotw
ife,bingos,1231231,nicholas1,flamer,pusher,1233210,heart1,hun999,jiggy,gid

dyup,oktober,123456zxc,budda,galahad,glamur,samwise,oneton,bugsbunny,domin
ic1,scooby2,freetime,internat,159753852,sc00ter,wantit,mazinger,inflames,l
aracrof,greedo,014789,godofwar,repytwjd,water123,fishnet,venus1,wallace1,t
enpin,paula1,1475963,mania,novikov,qwertyasdfgh,goldmine,homies,777888999,
8balls,holeinon,paper1,samael,013579,mansur,nikit,ak1234,blueline,polska1,
hotcock,laredo,windstar,vbkbwbz,raider1,newworld,lfybkrf,catfish1,shorty1,
piranha,treacle,royale,2234562,smurfs,minion,cadence,flapjack,123456p,sydn
e,135531,robinhoo,nasdaq,decatur,cyberonline,newage,gemstone,jabba,touchme
,hooch,pigdog,indahous,fonzie,zebra1,juggle,patrick2,nihongo,hitomi,oldnav
y,qwerfdsa,ukraina,shakti,allure,kingrich,diane1,canad,piramide,hottie1,cl
arion,college1,5641110,connect1,therion,clubber,velcro,dave1,astra1,13579-
,astroboy,skittle,isgreat,photoes,cvzefh1gkc,001100,2cool4u,7555545,ginger
12,2wsxcde3,camaro69,invader,domenow,asd1234,colgate,qwertasdfg,jack123,pa
ss01,maxman,bronte,whkzyc,peter123,bogie,yecgaa,abc321,1qay2wsx,enfield,ca
maroz2,trashman,bonefish,system32,azsxdcfvgb,peterose,iwantyou,dick69,temp
1234,blastoff,capa200,connie1,blazin,12233445,sexybaby,123456j,brentfor,ph
easant,hommer,jerryg,thunders,august1,lager,kapusta,boobs1,nokia5300,rocco
1,xytfu7,stars1,tugger,123sas,blingbling,1bubba,0wnsyo0,1george,baile,rich
ard2,habana,1diamond,sensatio,1golfer,maverick1,1chris,clinton1,michael7,d
ragons1,sunrise1,pissant,fatim,mopar1,levani,rostik,pizzapie,987412365,oce
ans11,748159263,cum4me,palmetto,4r3e2w1q,paige1,muncher,arsehole,kratos,ga
ffer,banderas,billys,prakash,crabby,bungie,silver12,caddis,spawn1,xboxlive
,sylvania,littlebi,524645,futura,valdemar,isacs155,prettygirl,big123,55544
4,slimer,chicke,newstyle,skypilot,sailormoon,fatluvr69,jetaime,sitruc,jesu
schrist,sameer,bear12,hellion,yendor,country1,etnies,conejo,jedimast,darkk
night,toobad,yxcvbn,snooks,porn4life,calvary,alfaromeo,ghostman,yannick,fn
kfynblf,vatoloco,homebase,5550666,barret,1111111111zz,odysseus,edwardss,fa
vre4,jerrys,crybaby,xsw21qaz,firestor,spanks,indians1,squish,kingair,babyc
akes,haters,sarahs,212223,teddyb,xfactor,cumload,rhapsody,death123,three3,
raccoon,thomas2,slayer66,1q2q3q4q5q,thebes,mysterio,thirdeye,orkiox.,nodou
bt,bugsy,schweiz,dima1996,angels1,darkwing,jeronimo,moonpie,ronaldo9,peach
es2,mack10,manish,denise1,fellowes,carioca,taylor12,epaulson,makemoney,oc2
47ngucz,kochanie,3edcvfr4,vulture,1qw23e,1234567z,munchie,picard1,xthtgfir
f,sportste,psycho1,tahoe1,creativ,perils,slurred,hermit,scoob,diesel1,card
s1,wipeout,weeble,integra1,out3xf,powerpc,chrism,kalle,ariadne,kailua,phat
ty,dexter1,fordman,bungalow,paul123,compa,train1,thejoker,jys6wz,pussyeate
r,eatmee,sludge,dominus,denisa,tagheuer,yxcvbnm,bill1,ghfdlf,300zx,nikita1
23,carcass,semaj,ramone,muenchen,animal1,greeny,annemari,dbrf134,jeepcj7,m
ollys,garten,sashok,ironmaid,coyotes,astoria,george12,westcoast,primetim,1
23456o,panchito,rafae,japan1,framer,auralo,tooshort,egorova,qwerty22,callm
e,medicina,warhawk,w1w2w3w4,cristia,merli,alex22,kawaii,chatte,wargames,ut
vols,muaddib,trinket,andreas1,jjjjj1,cleric,scooters,cuntlick,gggggg1,slip
knot1,235711,handcuff,stussy,guess1,leiceste,ppppp1,passe,lovegun,chevyman
,hugecock,driver1,buttsex,psychnaut1,cyber1,black2,alpha12,melbourn,man123
,metalman,yjdsqujl,blondi,bungee,freak1,stomper,caitlin1,nikitina,flyaway,
prikol,begood,desperad,aurelius,john1234,whosyourdaddy,slimed123,bretagne,
den123,hotwheel,king123,roodypoo,izzicam,save13tx,warpten,nokia3310,samole
t,ready1,coopers,scott123,bonito,1aaaaa,yomomma,dawg1,rache,itworks,asecre

t,fencer,451236,polka,olivetti,sysadmin,zepplin,sanjuan,479373,lickem,hond
acrx,pulamea,future1,naked1,sexyguy,w4g8at,lollol1,declan,runner1,rumple,d
addy123,4snz9g,grandprix,calcio,whatthefuck,nagrom,asslick,pennst,negrit,s
quiggy,1223334444,police22,giovann,toronto1,tweet,yardbird,seagate,trucker
s,554455,scimitar,pescator,slydog,gaysex,dogfish,fuck777,12332112,qazxswed
,morkovka,daniela1,imback,horny69,789123456,123456789w,jimmy2,bagger,ilove
69,nikolaus,atdhfkm,rebirth,1111aaaa,pervasive,gjgeufq,dte4uw,gfhnbpfy,ske
letor,whitney1,walkman,delorean,disco1,555888,as1234,ishikawa,fuck12,reape
r1,dmitrii,bigshot,morrisse,purgen,qwer4321,itachi,willys,123123qwe,kisska
,roma123,trafford,sk84life,326159487,pedros,idiom,plover,bebop,159875321,j
ailbird,arrowhea,qwaszx123,zaxscdvf,catlover,bakers,13579246,bones69,vermo
nt1,helloyou,simeon,chevyz71,funguy,stargaze,parolparol,steph1,bubby,apath
y,poppet,laxman,kelly123,goodnews,741236,boner1,gaetano,astonvilla,virtua,
luckyboy,rocheste,hello2u,elohim,trigger1,cstrike,pepsicola,miroslav,96385
274,fistfuck,cheval,magyar,svetlanka,lbfyjxrf,mamedov,123123123q,ronaldo1,
scotty1,1nicole,pittbull,fredd,bbbbb1,dagwood,gfhkfvtyn,ghblehrb,logan5,1j
ordan,sexbomb,omega2,montauk,258741,dtythf,gibbon,winamp,thebomb,millerli,
852654,gemin,baldy,halflife2,dragon22,mulberry,morrigan,hotel6,zorglub,sur
fin,951159,excell,arhangel,emachine,moses1,968574,reklama,bulldog2,cuties,
barca,twingo,saber,elite11,redtruck,casablan,ashish,moneyy,pepper12,cnhtkt
w,rjcnbr,arschloch,phenix,cachorro,sunita,madoka,joselui,adams1,mymoney,he
micuda,fyutkjr,jake12,chicas,eeeee1,sonnyboy,smarties,birdy,kitten1,cnfcbr
,island1,kurosaki,taekwond,konfetka,bennett1,omega3,jackson2,fresca,minako
,octavian,kban667,feyenoord,muaythai,jakedog,fktrcfylhjdyf,1357911q,phuket
,sexslave,fktrcfylhjdbx,asdfjk,89015173454,qwerty00,kindbud,eltoro,sex6969
,nyknicks,12344321q,caballo,evenflow,hoddle,love22,metro1,mahalko,lawdog,t
ightass,manitou,buckie,whiskey1,anton123,335533,password4,primo,ramair,tim
bo,brayden,stewie,pedro1,yorkshir,ganster,hellothe,tippy1,direwolf,genesi,
rodrig,enkeli,vaz21099,sorcerer,winky,oneshot,boggle,serebro,badger1,japan
es,comicbook,kamehame,alcat,denis123,echo45,sexboy,gr8ful,hondo,voetbal,bl
ue33,2112rush,geneviev,danni1,moosey,polkmn,matthew7,ironhead,hot2trot,ash
ley12,sweeper,imogen,blue21,retep,stealth1,guitarra,bernard1,tatian,frankf
ur,vfnhbwf,slacking,haha123,963741,asdasdas,katenok,airforce1,123456789qaz
,shotgun1,12qwasz,reggie1,sharo,976431,pacifica,dhip6a,neptun,kardon,spook
y1,beaut,555555a,toosweet,tiedup,11121314,startac,lover69,rediska,pirata,v
fhrbp,1234qwerty,energize,hansolo1,playbo,larry123,oemdlg,cnjvfnjkju,a1231
23,alexan,gohawks,antonius,fcbayern,mambo,yummy1,kremlin,ellen1,tremere,vf
iekz,bellevue,charlie9,izabella,malishka,fermat,rotterda,dawggy,becket,cha
sey,kramer1,21125150,lolit,cabrio,schlong,arisha,verity,3some,favorit,mari
con,travelle,hotpants,red1234,garrett1,home123,knarf,seven777,figment,asde
wq,canseco,good2go,warhol,thomas01,pionee,al9agd,panacea,chevy454,brazzers
,oriole,azerty123,finalfan,patricio,northsta,rebelde,bulldo,stallone,boogi
e1,7uftyx,cfhfnjd,compusa,cornholi,config,deere,hoopster,sepultura,grassho
p,babygurl,lesbo,diceman,proverbs,reddragon,nurbek,tigerwoo,superdup,buzzs
aw,kakaroto,golgo13,edwar,123qaz123,butter1,sssss1,texas2,respekt,ou812ic,
123456qaz,55555a,doctor1,mcgwire,maria123,aol999,cinders,aa1234,joness,ghb
rjkmyj,makemone,sammyboy,567765,380zliki,theraven,testme,mylene,elvira26,i
ndiglo,tiramisu,shannara,baby1,123666,gfhreh,papercut,johnmish,orange8,bog

ey1,mustang7,bagpipes,dimarik,vsijyjr,4637324,ravage,cogito,seven11,natash
ka,warzone,hr3ytm,4free,bigdee,000006,243462536,bigboi,123333,trouts,sandy
123,szevasz,monica2,guderian,newlife1,ratchet,r12345,razorbac,12345i,piazz
a31,oddjob,beauty1,fffff1,anklet,nodrog,pepit,olivi,puravida,robert12,tran
sam1,portman,bubbadog,steelers1,wilson1,eightball,mexico1,superboy,4rfv5tg
b,mzepab,samurai1,fuckslut,colleen1,girdle,vfrcbvec,q1w2e3r4t,soldier1,198
44891,alyssa1,a12345a,fidelis,skelter,nolove,mickeymouse,frehley,password6
9,watermel,aliska,soccer15,12345e,ladybug1,abulafia,adagio,tigerlil,takeha
na,hecate,bootneck,junfan,arigato,wonkette,bobby123,trustnoone,phantasm,13
2465798,brianjo,w12345,t34vfrc1991,deadeye,1robert,1daddy,adida,check1,gri
mlock,muffi,airwalk,prizrak,onclick,longbeac,ernie1,eadgbe,moore1,geniu,sh
adow123,bugaga,jonathan1,cjrjkjdf,orlova,buldog,talon1,westport,aenima,541
233432442,barsuk,chicago2,kellys,hellbent,toughguy,iskander,skoal,whatisit
,jake123,scooter2,fgjrfkbgcbc,ghandi,love13,adelphia,vjhrjdrf,adrenali,niu
nia,jemoeder,rainbo,all4u8,anime1,freedom7,seraph,789321,tommys,antman,fir
etruc,neogeo,natas,bmwm3,froggy1,paul1,mamit,bayview,gateways,kusanagi,iha
teu,frederi,rock1,centurion,grizli,biggin,fish1,stalker1,3girls,ilovepor,k
lootzak,lollo,redsox04,kirill123,jake1,pampers,vasya,hammers1,teacup,towin
g,celtic1,ishtar,yingyang,4904s677075,dahc1,patriot1,patrick9,redbirds,dor
emi,rebecc,yoohoo,makarova,epiphone,rfgbnfy,milesd,blister,chelseafc,katan
a1,blackrose,1james,primrose,shock5,hard1,scooby12,c6h12o6,dustoff,boing,c
hisel,kamil,1william,defiant1,tyvugq,mp8o6d,aaa340,nafets,sonnet,flyhigh,2
42526,crewcom,love23,strike1,stairway,katusha,salamand,cupcake1,password0,
007james,sunnie,multisync,harley01,tequila1,fred12,driver8,q8zo8wzq,hunter
01,mozzer,temporar,eatmeraw,mrbrownxx,kailey,sycamore,flogger,tincup,rahas
ia,ganymede,bandera,slinger,1111122222,vander,woodys,1cowboy,khaled,jamies
,london12,babyboo,tzpvaw,diogenes,budice,mavrick,135797531,cheeta,macros,s
quonk,blackber,topfuel,apache1,falcon16,darkjedi,cheeze,vfhvtkfl,sparco,ch
ange1,gfhfif,freestyl,kukuruza,loveme2,12345f,kozlov,sherpa,marbella,44445
555,bocephus,1winner,alvar,hollydog,gonefish,iwantin,barman,godislove,aman
da18,rfpfynbg,eugen,abcdef1,redhawk,thelema,spoonman,baller1,harry123,4758
69,tigerman,cdtnjxrf,marillio,scribble,elnino,carguy,hardhead,l2g7k3,troop
ers,selen,dragon76,antigua,ewtosi,ulysse,astana,paroli,cristo,carmex,marja
n,bassfish,letitbe,kasparov,jay123,19933991,blue13,eyecandy,scribe,mylord,
ukflbjkec,ellie1,beaver1,destro,neuken,halfpint,ameli,lilly1,satanic,xngwo
j,12345trewq,asdf1,bulldogg,asakura,jesucrist,flipside,packers4,biggy,kade
tt,biteme69,bobdog,silverfo,saint1,bobbo,packman,knowledg,foolio,fussbal,1
2345g,kozerog,westcoas,minidisc,nbvcxw,martini1,alastair,rasengan,superbee
,memento,porker,lena123,florenc,kakadu,bmw123,getalife,bigsky,monkee,peopl
e1,schlampe,red321,memyself,0147896325,12345678900987654321,soccer14,reald
eal,gfgjxrf,bella123,juggs,doritos,celtics1,peterbilt,ghbdtnbrb,gnusmas,xc
ountry,ghbdtn1,batman99,deusex,gtnhjdf,blablabl,juster,marimba,love2,rerjk
rf,alhambra,micros,siemens1,assmaste,moonie,dashadasha,atybrc,eeeeee1,wild
rose,blue55,davidl,xrp23q,skyblue,leo123,ggggg1,bestfriend,franny,1234rmvb
,fun123,rules1,sebastien,chester2,hakeem,winston2,fartripper,atlant,078315
05,iluvsex,q1a2z3,larrys,009900,ghjkju,capitan,rider1,qazxsw21,belochka,an
dy123,hellya,chicca,maximal,juergen,password1234,howard1,quetzal,daniel123
,qpwoeiruty,123555,bharat,ferrari3,numbnuts,savant,ladydog,phipsi,lovepuss

y,etoile,power2,mitten,britneys,chilidog,08522580,2fchbg,kinky1,bluerose,l
oulo,ricardo1,doqvq3,kswbdu,013cpfza,timoha,ghbdtnghbdtn,3stooges,gearhead
,browns1,g00ber,super7,greenbud,kitty2,pootie,toolshed,gamers,coffe,ibill1
23,freelove,anasazi,sister1,jigger,natash,stacy1,weronika,luzern,soccer7,h
oopla,dmoney,valerie1,canes,razdvatri,washere,greenwoo,rfhjkbyf,anselm,pkx
e62,maribe,daniel2,maxim1,faceoff,carbine,xtkjdtr,buddy12,stratos,jumpman,
buttocks,aqswdefr,pepsis,sonechka,steeler1,lanman,nietzsch,ballz,biscuit1,
wrxsti,goodfood,juventu,federic,mattman,vika123,strelec,jledfyxbr,sideshow
,4life,fredderf,bigwilly,12347890,12345671,sharik,bmw325i,fylhtqrf,dannon4
,marky,mrhappy,drdoom,maddog1,pompier,cerbera,goobers,howler,jenny69,evely
,letitrid,cthuttdyf,felip,shizzle,golf12,t123456,yamah,bluearmy,squishy,ro
xan,10inches,dollface,babygirl1,blacksta,kaneda,lexingto,canadien,222888,k
ukushka,sistema,224422,shadow69,ppspankp,mellons,barbie1,free4all,alfa156,
lostone,2w3e4r5t,painkiller,robbie1,binger,8dihc6,jaspe,rellik,quark,sogoo
d,hoopstar,number2,snowy1,dad2ownu,cresta,qwe123asd,hjvfyjdf,gibsonsg,qbg2
6i,dockers,grunge,duckling,lfiekz,cuntsoup,kasia1,1tigger,woaini,reksio,tm
oney,firefighter,neuron,audia3,woogie,powerboo,powermac,fatcock,12345666,u
pnfmc,lustful,porn1,gotlove,amylee,kbytqrf,11924704,25251325,sarasota,sexm
e,ozzie1,berliner,nigga1,guatemal,seagulls,iloveyou!,chicken2,qwerty21,010
203040506,1pillow,libby1,vodoley,backlash,piglets,teiubesc,019283,vonnegut
,perico,thunde,buckey,gtxtymrf,manunite,iiiii1,lost4815162342,madonn,27087
3_,britney1,kevlar,piano1,boondock,colt1911,salamat,doma77ns,anuradha,cnhj
qrf,rottweil,newmoon,topgun1,mauser,fightclu,birthday21,reviewpa,herons,aa
ssddff,lakers32,melissa2,vredina,jiujitsu,mgoblue,shakey,moss84,12345zxcvb
,funsex,benji1,garci,113322,chipie,windex,nokia5310,pwxd5x,bluemax,cosita,
chalupa,trotsky,new123,g3ujwg,newguy,canabis,gnaget,happydays,felixx,1patr
ick,cumface,sparkie,kozlova,123234,newports,broncos7,golf18,recycle,hahah,
harrypot,cachondo,open4me,miria,guessit,pepsione,knocker,usmc1775,countach
,playe,wiking,landrover,cracksevi,drumline,a7777777,smile123,manzana,panty
,liberta,pimp69,dolfan,quality1,schnee,superson,elaine22,webhompass,mrbrow
nx,deepsea,4wheel,mamasita,rockport,rollie,myhome,jordan12,kfvgjxrf,hockey
12,seagrave,ford1,chelsea2,samsara,marissa1,lamesa,mobil1,piotrek,tommygun
,yyyyy1,wesley1,billy123,homersim,julies,amanda12,shaka,maldini,suzenet,sp
ringst,iiiiii1,yakuza,111111aa,westwind,helpdesk,annamari,bringit,hopefull
,hhhhhhh1,saywhat,mazdarx8,bulova,jennife1,baikal,gfhjkmxbr,victoria1,gizm
o123,alex99,defjam,2girls,sandrock,positivo,shingo,syncmast,opensesa,silic
one,fuckina,senna1,karlos,duffbeer,montagne,gehrig,thetick,pepino,hamburge
,paramedic,scamp,smokeweed,fabregas,phantoms,venom121293,2583458,badone,po
rno69,manwhore,vfvf123,notagain,vbktyf,rfnthbyrf,wildblue,kelly001,dragon6
6,camell,curtis1,frolova,1212123,dothedew,tyler123,reddrago,planetx,promet
he,gigolo,1001001,thisone,eugeni,blackshe,cruzazul,incognito,puller,joonas
,quick1,spirit1,gazza,zealot,gordito,hotrod1,mitch1,pollito,hellcat,mythos
,duluth,383pdjvl,easy123,hermos,binkie,its420,lovecraf,darien,romina,dorae
mon,19877891,syclone,hadoken,transpor,ichiro,intell,gargamel,dragon2,wavpz
t,557744,rjw7x4,jennys,kickit,rjynfrn,likeit,555111,corvus,nec3520,133113,
mookie1,bochum,samsung2,locoman0,154ugeiu,vfvfbgfgf,135792,[start],tenni,2
0001,vestax,hufmqw,neveragain,wizkid,kjgfnf,nokia6303,tristen,saltanat,lou
ie1,gandalf2,sinfonia,alpha3,tolstoy,ford150,f00bar,1hello,alici,lol12,rik

er1,hellou,333888,1hunter,qw1234,vibrator,mets86,43211234,gonzale,cookies1
,sissy1,john11,bubber,blue01,cup2006,gtkmvtyb,nazareth,heybaby,suresh,tedd
ie,mozilla,rodeo1,madhouse,gamera,123123321,naresh,dominos,foxtrot1,taras,
powerup,kipling,jasonb,fidget,galena,meatman,alpacino,bookmark,farting,hum
per,titsnass,gorgon,castaway,dianka,anutka,gecko1,fucklove,connery,wings1,
erika1,peoria,moneymaker,ichabod,heaven1,paperboy,phaser,breakers,nurse1,w
estbrom,alex13,brendan1,123asd123,almera,grubber,clarkie,thisisme,welkom01
,51051051051,crypto,freenet,pflybwf,black12,testme2,changeit,autobahn,atti
ca,chaoss,denver1,tercel,gnasher23,master2,vasilii,sherman1,gomer,bigbuck,
derek1,qwerzxcv,jumble,dragon23,art131313,numark,beasty,cxfcnmttcnm,updown
,starion,glist,sxhq65,ranger99,monkey7,shifter,wolves1,4r5t6y,phone1,favor
ite5,skytommy,abracada,1martin,102030405060,gatech,giulio,blacktop,cheer1,
africa1,grizzly1,inkjet,shemales,durango1,booner,11223344q,supergirl,vanya
respekt,dickless,srilanka,weaponx,6string,nashvill,spicey,boxer1,fabien,2s
exy2ho,bowhunt,jerrylee,acrobat,tawnee,ulisse,nolimit8,l8g3bkde,pershing,g
ordo1,allover,gobrowns,123432,123444,321456987,spoon1,hhhhh1,sailing1,gard
enia,teache,sexmachine,tratata,pirate1,niceone,jimbos,314159265,qsdfgh,bob
byy,ccccc1,carla1,vjkjltw,savana,biotech,frigid,123456789g,dragon10,yesiam
,alpha06,oakwood,tooter,winsto,radioman,vavilon,asnaeb,google123,nariman,k
ellyb,dthyjcnm,password6,parol1,golf72,skate1,lthtdj,1234567890s,kennet,ro
ssia,lindas,nataliya,perfecto,eminem1,kitana,aragorn1,rexona,arsenalf,plan
ot,coope,testing123,timex,blackbox,bullhead,barbarian,dreamon,polaris1,cfv
jktn,frdfhbev,gametime,slipknot666,nomad1,hfgcjlbz,happy69,fiddler,brazil1
,joeboy,indianali,113355,obelisk,telemark,ghostrid,preston1,anonim,wellcom
e,verizon1,sayangku,censor,timeport,dummies,adult1,nbnfybr,donger,thales,i
amgay,sexy1234,deadlift,pidaras,doroga,123qwe321,portuga,asdfgh12,happys,c
adr14nu,pi3141,maksik,dribble,cortland,darken,stepanova,bommel,tropic,soch
i2014,bluegras,shahid,merhaba,nacho,2580456,orange44,kongen,3cudjz,78girl,
my3kids,marcopol,deadmeat,gabbie,saruman,jeepman,freddie1,katie123,master9
9,ronal,ballbag,centauri,killer7,xqgann,pinecone,jdeere,geirby,aceshigh,55
832811,pepsimax,rayden,razor1,tallyho,ewelina,coldfire,florid,glotest,9993
33,sevenup,bluefin,limaperu,apostol,bobbins,charmed1,michelin,sundin,centa
ur,alphaone,christof,trial1,lions1,45645,just4you,starflee,vicki1,cougar1,
green2,jellyfis,batman69,games1,hihje863,crazyzil,w0rm1,oklick,dogbite,yss
up,sunstar,paprika,postov10,124578963,x24ik3,kanada,buckster,iloveamy,bear
123,smiler,nx74205,ohiostat,spacey,bigbill,doudo,nikolaeva,hcleeb,sex666,m
indy1,buster11,deacons,boness,njkcnsq,candy2,cracker1,turkey1,qwertyu1,gog
reen,tazzzz,edgewise,ranger01,qwerty6,blazer1,arian,letmeinnow,cigar1,jjjj
jj1,grigio,frien,tenchu,f9lmwd,imissyou,filipp,heathers,coolie,salem1,wood
duck,scubadiv,123kat,raffaele,nikolaev,dapzu455,skooter,9inches,lthgfhjkm,
gr8one,ffffff1,zujlrf,amanda69,gldmeo,m5wkqf,rfrltkf,televisi,bonjou,palea
le,stuff1,cumalot,fuckmenow,climb7,mark1234,t26gn4,oneeye,george2,utyyflbq
,hunting1,tracy71,ready2go,hotguy,accessno,charger1,rudedog,kmfdm,goober1,
sweetie1,wtpmjgda,dimensio,ollie1,pickles1,hellraiser,mustdie,123zzz,99887
766,stepanov,verdun,tokenbad,anatol,bartende,cidkid86,onkelz,timmie,moosem
an,patch1,12345678c,marta1,dummy1,bethany1,myfamily,history1,178500,lsutig
er,phydeaux,moren,dbrnjhjdbx,gnbxrf,uniden,drummers,abpbrf,godboy,daisy123
,hogan1,ratpack,irland,tangerine,greddy,flore,sqrunch,billyjoe,q55555,clem

son1,98745632,marios,ishot,angelin,access12,naruto12,lolly,scxakv,austin12
,sallad,cool99,rockit,mongo1,mark22,ghbynth,ariadna,senha,docto,tyler2,mob
ius,hammarby,192168,anna12,claire1,pxx3eftp,secreto,greeneye,stjabn,baguvi
x,satana666,rhbcnbyjxrf,dallastx,garfiel,michaelj,1summer,montan,1234ab,fi
lbert,squids,fastback,lyudmila,chucho,eagleone,kimberle,ar3yuk3,jake01,nok
ids,soccer22,1066ad,ballon,cheeto,review69,madeira,taylor2,sunny123,chubbs
,lakeland,striker1,porche,qwertyu8,digiview,go1234,ferari,lovetits,aditya,
minnow,green3,matman,cellphon,fortytwo,minni,pucara,69a20a,roman123,fuente
,12e3e456,paul12,jacky,demian,littleman,jadakiss,vlad1997,franca,282860,mi
dian,nunzio,xaccess2,colibri,jessica0,revilo,654456,harvey1,wolf1,macarena
,corey1,husky1,arsen,milleniu,852147,crowes,redcat,combat123654,hugger,psa
lms,quixtar,ilovemom,toyot,ballss,ilovekim,serdar,james23,avenger1,serendi
p,malamute,nalgas,teflon,shagger,letmein6,vyjujnjxbt,assa1234,student1,dix
iedog,gznybwf13,fuckass,aq1sw2de3,robroy,hosehead,sosa21,123345,ias100,ted
dy123,poppin,dgl70460,zanoza,farhan,quicksilver,1701d,tajmahal,depechemode
,paulchen,angler,tommy2,recoil,megamanx,scarecro,nicole2,152535,rfvtgb,sku
nky,fatty1,saturno,wormwood,milwauke,udbwsk,sexlover,stefa,7bgiqk,gfnhbr,o
mar10,bratan,lbyfvj,slyfox,forest1,jambo,william3,tempus,solitari,lucydog,
murzilka,qweasdzxc1,vehpbkrf,12312345,fixit,woobie,andre123,123456789x,lif
ter,zinaida,soccer17,andone,foxbat,torsten,apple12,teleport,123456i,leglov
er,bigcocks,vologda,dodger1,martyn,d6o8pm,naciona,eagleeye,maria6,rimshot,
bentley1,octagon,barbos,masaki,gremio,siemen,s1107d,mujeres,bigtits1,cherr
,saints1,mrpink,simran,ghzybr,ferrari2,secret12,tornado1,kocham,picolo,den
eme,onelove1,rolan,fenster,1fuckyou,cabbie,pegaso,nastyboy,password5,aidan
a,mine2306,mike13,wetone,tigger69,ytreza,bondage1,myass,golova,tolik,happy
boy,poilkj,nimda2k,rammer,rubies,hardcore1,jetset,hoops1,jlaudio,misskitt,
1charlie,google12,theone1,phred,porsch,aalborg,luft4,charlie5,password7,gn
osis,djgabbab,1daniel,vinny,borris,cumulus,member1,trogdor,darthmau,andrew
2,ktjybl,relisys,kriste,rasta220,chgobndg,weener,qwerty66,fritter,followme
,freeman1,ballen,blood1,peache,mariso,trevor1,biotch,gtfullam,chamonix,fri
endste,alligato,misha1,1soccer,18821221,venkat,superd,molotov,bongos,mpowe
r,acun3t1x,dfcmrf,h4x3d,rfhfufylf,tigran,booyaa,plastic1,monstr,rfnhby,loo
katme,anabolic,tiesto,simon123,soulman,canes1,skyking,tomcat1,madona,bassl
ine,dasha123,tarheel1,dutch1,xsw23edc,qwerty123456789,imperator,slaveboy,b
ateau,paypal,house123,pentax,wolf666,drgonzo,perros,digger1,juninho,hellom
oto,bladerun,zzzzzzz1,keebler,take8422,fffffff1,ginuwine,israe,caesar1,cra
ck1,precious1,garand,magda1,zigazaga,321ewq,johnpaul,mama1234,iceman69,san
jeev,treeman,elric,rebell,1thunder,cochon,deamon,zoltan,straycat,uhbyuj,lu
vfur,mugsy,primer,wonder1,teetime,candycan,pfchfytw,fromage,gitler,salvati
o,piggy1,23049307,zafira,chicky,sergeev,katze,bangers,andriy,jailbait,vaz2
107,ghbhjlf,dbjktnnf,aqswde,zaratustra,asroma,1pepper,alyss,kkkkk1,ryan1,r
adish,cozumel,waterpol,pentium1,rosebowl,farmall,steinway,dbrekz,baranov,j
kmuf,another1,chinacat,qqqqqqq1,hadrian,devilmaycry4,ratbag,teddy2,love21,
pullings,packrat,robyn1,boobo,qw12er34,tribe1,rosey,celestia,nikkie,fortun
e12,olga123,danthema,gameon,vfrfhjys,dilshod,henry14,jenova,redblue,chimae
ra,pennywise,sokrates,danimal,qqaazz,fuaqz4,killer2,198200,tbone1,kolyan,w
abbit,lewis1,maxtor,egoist,asdfas,spyglass,omegas,jack12,nikitka,esperanz,
doozer,matematika,wwwww1,ssssss1,poiu0987,suchka,courtney1,gungho,alpha2,f

ktyjxrf,summer06,bud420,devildriver,heavyd,saracen,foucault,choclate,rjdfk
tyrj,goblue1,monaro,jmoney,dcpugh,efbcapa201,qqh92r,pepsicol,bbb747,ch5nmk
,honeyb,beszoptad,tweeter,intheass,iseedeadpeople,123dan,89231243658s,fars
ide1,findme,smiley1,55556666,sartre,ytcnjh,kacper,costarica,134679258,mike
ys,nolimit9,vova123,withyou,5rxypn,love143,freebie,rescue1,203040,michael6
,12monkey,redgreen,steff,itstime,naveen,good12345,acidrain,1dawg,miramar,p
layas,daddio,orion2,852741,studmuff,kobe24,senha123,stephe,mehmet,allalone
,scarface1,helloworld,smith123,blueyes,vitali,memphis1,mybitch,colin1,1598
74,1dick,podaria,d6wnro,brahms,f3gh65,dfcbkmtd,xxxman,corran,ugejvp,qcfmtz
,marusia,totem,arachnid,matrix2,antonell,fgntrf,zemfira,christos,surfing1,
naruto123,plato1,56qhxs,madzia,vanille,043aaa,asq321,mutton,ohiostate,gold
e,cdznjckfd,rhfcysq,green5,elephan,superdog,jacqueli,bollock,lolitas,nick1
2,1orange,maplelea,july23,argento,waldorf,wolfer,pokemon12,zxcvbnmm,flicka
,drexel,outlawz,harrie,atrain,juice2,falcons1,charlie6,19391945,tower1,dra
gon21,hotdamn,dirtyboy,love4ever,1ginger,thunder2,virgo1,alien1,bubblegu,4
wwvte,123456789qqq,realtime,studio54,passss,vasilek,awsome,giorgia,bigbass
,2002tii,sunghile,mosdef,simbas,count0,uwrl7c,summer05,lhepmz,ranger21,sug
arbea,principe,5550123,tatanka,9638v,cheerios,majere,nomercy,jamesbond007,
bh90210,7550055,jobber,karaganda,pongo,trickle,defamer,6chid8,1q2a3z,tusca
n,nick123,.adgjm,loveyo,hobbes1,note1234,shootme,171819,loveporn,9788960,m
onty123,fabrice,macduff,monkey13,shadowfa,tweeker,hanna1,madball,telnet,lo
veu2,qwedcxzas,thatsit,vfhcbr,ptfe3xxp,gblfhfcs,ddddddd1,hakkinen,liverune
,deathsta,misty123,suka123,recon1,inferno1,232629,polecat,sanibel,grouch,h
itech,hamradio,rkfdbfnehf,vandam,nadin,fastlane,shlong,iddqdidkfa,ledzeppe
lin,sexyfeet,098123,stacey1,negras,roofing,lucifer1,ikarus,tgbyhn,melnik,b
arbaria,montego,twisted1,bigal1,jiggle,darkwolf,acerview,silvio,treetops,b
ishop1,iwanna,pornsite,happyme,gfccdjhl,114411,veritech,batterse,casey123,
yhntgb,mailto,milli,guster,q12345678,coronet,sleuth,fuckmeha,armadill,kros
hka,geordie,lastochka,pynchon,killall,tommy123,sasha1996,godslove,hikaru,c
lticic,cornbrea,vfkmdbyf,passmaster,123123123a,souris,nailer,diabolo,skipj
ack,martin12,hinata,mof6681,brookie,dogfight,johnso,karpov,326598,rfvbrflp
t,travesti,caballer,galaxy1,wotan,antoha,art123,xakep1234,ricflair,pervert
1,p00kie,ambulanc,santosh,berserker,larry33,bitch123,a987654321,dogstar,an
gel22,cjcbcrf,redhouse,toodles,gold123,hotspot,kennedy1,glock21,chosen1,sc
hneide,mainman,taffy1,3ki42x,4zqauf,ranger2,4meonly,year2000,121212a,kfyls
i,netzwerk,diese,picasso1,rerecz,225522,dastan,swimmer1,brooke1,blackbea,o
neway,ruslana,dont4get,phidelt,chrisp,gjyxbr,xwing,kickme,shimmy,kimmy1,48
15162342lost,qwerty5,fcporto,jazzbo,mierd,252627,basses,sr20det,00133,flor
in,howdy1,kryten,goshen,koufax,cichlid,imhotep,andyman,wrest666,saveme,dut
chy,anonymou,semprini,siempre,mocha1,forest11,wildroid,aspen1,sesam,kfgekz
,cbhbec,a55555,sigmanu,slash1,giggs11,vatech,marias,candy123,jericho1,king
me,123a123,drakula,cdjkjxm,mercur,oneman,hoseman,plumper,ilovehim,lancers,
sergey1,takeshi,goodtogo,cranberr,ghjcnj123,harvick,qazxs,1972chev,horsesh
o,freedom3,letmein7,saitek,anguss,vfvfgfgfz,300000,elektro,toonporn,999111
999q,mamuka,q9umoz,edelweis,subwoofer,bayside,disturbe,volition,lucky3,123
45678z,3mpz4r,march1,atlantida,strekoza,seagrams,090909t,yy5rbfsc,jack1234
,sammy12,sampras,mark12,eintrach,chaucer,lllll1,nochance,whitepower,197000
,lbvekz,passer,torana,12345as,pallas,koolio,12qw34,nokia8800,findout,1thom

as,mmmmm1,654987,mihaela,chinaman,superduper,donnas,ringo1,jeroen,gfdkjdf,
professo,cdtnrf,tranmere,tanstaaf,himera,ukflbfnjh,667788,alex32,joschi,w1
23456,okidoki,flatline,papercli,super8,doris1,2good4u,4z34l0ts,pedigree,fr
eeride,gsxr1100,wulfgar,benjie,ferdinan,king1,charlie7,djdxbr,fhntvbq,ripc
url,2wsx1qaz,kingsx,desade,sn00py,loveboat,rottie,evgesha,4money,dolittle,
adgjmpt,buzzers,brett1,makita,123123qweqwe,rusalka,sluts1,123456e,jameson1
,bigbaby,1z2z3z,ckjybr,love4u,fucker69,erhfbyf,jeanluc,farhad,fishfood,mer
kin,giant1,golf69,rfnfcnhjaf,camera1,stromb,smoothy,774411,nylon,juice1,rf
n.irf,newyor,123456789t,marmot,star11,jennyff,jester1,hisashi,kumquat,alex
777,helicopt,merkur,dehpye,cummin,zsmj2v,kristjan,april12,englan,honeypot,
badgirls,uzumaki,keines,p12345,guita,quake1,duncan1,juicer,milkbone,hurtme
,123456789b,qq123456789,schwein,p3wqaw,54132442,qwertyytrewq,andreeva,ruff
ryde,punkie,abfkrf,kristinka,anna1987,ooooo1,335533aa,umberto,amber123,456
123789,456789123,beelch,manta,peeker,1112131415,3141592654,gipper,wrinkle5
,katies,asd123456,james11,78n3s5af,michael0,daboss,jimmyb,hotdog1,david69,
852123,blazed,sickan,eljefe,2n6wvq,gobills,rfhfcm,squeaker,cabowabo,luebri
,karups,test01,melkor,angel777,smallvil,modano,olorin,4rkpkt,leslie1,koffi
e,shadows1,littleon,amiga1,topeka,summer20,asterix1,pitstop,aloysius,k1234
5,magazin,joker69,panocha,pass1word,1233214,ironpony,368ejhih,88keys,pizza
123,sonali,57np39,quake2,1234567890qw,1020304,sword1,fynjif,abcde123,dfkty
jr,rockys,grendel1,harley12,kokakola,super2,azathoth,lisa123,shelley1,girl
ss,ibragim,seven1,jeff24,1bigdick,dragan,autobot,t4nvp7,omega123,900000,he
cnfv,889988,nitro1,doggie1,fatjoe,811pahc,tommyt,savage1,pallino,smitty1,j
g3h4hfn,jamielee,1qazwsx,zx123456,machine1,asdfgh123,guinnes,789520,sharkm
an,jochen,legend1,sonic2,extreme1,dima12,photoman,123459876,nokian95,77553
3,vaz2109,april10,becks,repmvf,pooker,qwer12345,themaster,nabeel,monkey10,
gogetit,hockey99,bbbbbbb1,zinedine,dolphin2,anelka,1superma,winter01,muggs
y,horny2,669966,kuleshov,jesusis,calavera,bullet1,87t5hdf,sleepers,winkie,
vespa,lightsab,carine,magister,1spider,shitbird,salavat,becca1,wc18c2,shir
ak,galactus,zaskar,barkley1,reshma,dogbreat,fullsail,asasa,boeder,12345ta,
zxcvbnm12,lepton,elfquest,tony123,vkaxcs,savatage,sevilia1,badkitty,munkey
,pebbles1,diciembr,qapmoc,gabriel2,1qa2ws3e,cbcmrb,welldone,nfyufh,kaizen,
jack11,manisha,grommit,g12345,maverik,chessman,heythere,mixail,jjjjjjj1,sy
lvia1,fairmont,harve,skully,global1,youwish,pikachu1,badcat,zombie1,495278
43,ultra1,redrider,offsprin,lovebird,153426,stymie,aq1sw2,sorrento,0000001
,r3ady41t,webster1,95175,adam123,coonass,159487,slut1,gerasim,monkey99,slu
twife,159963,1pass1page,hobiecat,bigtymer,all4you,maggie2,olamide,comcast1
,infinit,bailee,vasileva,.ktxrf,asdfghjkl1,12345678912,setter,fuckyou7,nna
gqx,lifesuck,draken,austi,feb2000,cable1,1234qwerasdf,hax0red,zxcv12,vlad7
788,nosaj,lenovo,underpar,huskies1,lovegirl,feynman,suerte,babaloo,alskdjf
hg,oldsmobi,bomber1,redrover,pupuce,methodman,phenom,cutegirl,countyli,gre
tsch,godisgood,bysunsu,hardhat,mironova,123qwe456rty,rusty123,salut,187211
,555666777,11111z,mahesh,rjntyjxtr,br00klyn,dunce1,timebomb,bovine,makelov
e,littlee,shaven,rizwan,patrick7,42042042,bobbijo,rustem,buttmunc,dongle,t
iger69,bluecat,blackhol,shirin,peaces,cherub,cubase,longwood,lotus7,gwju3g
,bruin,pzaiu8,green11,uyxnyd,seventee,dragon5,tinkerbel,bluess,bomba,fedor
ova,joshua2,bodyshop,peluche,gbpacker,shelly1,d1i2m3a4,ghtpbltyn,talons,se
rgeevna,misato,chrisc,sexmeup,brend,olddog,davros,hazelnut,bridget1,hzze92

9b,readme,brethart,wild1,ghbdtnbr1,nortel,kinger,royal1,bucky1,allah1,drak
kar,emyeuanh,gallaghe,hardtime,jocker,tanman,flavio,abcdef123,leviatha,squ
id1,skeet,sexse,123456x,mom4u4mm,lilred,djljktq,ocean11,cadaver,baxter1,80
8state,fighton,primavera,1andrew,moogle,limabean,goddess1,vitalya,blue56,2
58025,bullride,cicci,1234567d,connor1,gsxr11,oliveoil,leonard1,legsex,gavr
ik,rjnjgtc,mexicano,2bad4u,goodfellas,ornw6d,mancheste,hawkmoon,zlzfrh,sch
orsch,g9zns4,bashful,rossi46,stephie,rfhfntkm,sellout,123fuck,stewar1,soln
ze,00007,thor5200,compaq12,didit,bigdeal,hjlbyf,zebulon,wpf8eu,kamran,eman
uele,197500,carvin,ozlq6qwm,3syqo15hil,pennys,epvjb6,asdfghjkl123,198000,n
fbcbz,jazzer,asfnhg66,zoloft,albundy,aeiou,getlaid,planet1,gjkbyjxrf,alex2
000,brianb,moveon,maggie11,eieio,vcradq,shaggy1,novartis,cocoloco,dunamis,
554uzpad,sundrop,1qwertyu,alfie,feliks,briand,123www,red456,addams,fhntv19
98,goodhead,theway,javaman,angel01,stratoca,lonsdale,15987532,bigpimpin,sk
ater1,issue43,muffie,yasmina,slowride,crm114,sanity729,himmel,carolcox,bus
tanut,parabola,masterlo,computador,crackhea,dynastar,rockbott,doggysty,wan
tsome,bigten,gaelle,juicy1,alaska1,etower,sixnine,suntan,froggies,nokia761
0,hunter11,njnets,alicante,buttons1,diosesamo,elizabeth1,chiron,trustnoo,a
matuers,tinytim,mechta,sammy2,cthulu,trs8f7,poonam,m6cjy69u35,cookie12,blu
e25,jordans,santa1,kalinka,mikey123,lebedeva,12345689,kissss,queenbee,vjyb
njh,ghostdog,cuckold,bearshare,rjcntyrj,alinochka,ghjcnjrdfibyj,aggie1,tee
ns1,3qvqod,dauren,tonino,hpk2qc,iqzzt580,bears85,nascar88,theboy,njqcw4,ma
syanya,pn5jvw,intranet,lollone,shadow99,00096462,techie,cvtifhbrb,redeemed
,gocanes,62717315,topman,intj3a,cobrajet,antivirus,whyme,berserke,ikilz083
,airedale,brandon2,hopkig,johanna1,danil8098,gojira,arthu,vision1,pendrago
n,milen,chrissie,vampiro,mudder,chris22,blowme69,omega7,surfers,goterps,it
aly1,baseba11,diego1,gnatsum,birdies,semenov,joker123,zenit2011,wojtek,cab
4ma99,watchmen,damia,forgotte,fdm7ed,strummer,freelanc,cingular,orange77,m
cdonalds,vjhjpjdf,kariya,tombston,starlet,hawaii1,dantheman,megabyte,nbvji
rf,anjing,ybrjkftdbx,hotmom,kazbek,pacific1,sashimi,asd12,coorslig,yvtte54
5,kitte,elysium,klimenko,cobblers,kamehameha,only4me,redriver,triforce,sid
orov,vittoria,fredi,dank420,m1234567,fallout2,989244342a,crazy123,crapola,
servus,volvos,1scooter,griffin1,autopass,ownzyou,deviant,george01,2kgwai,b
oeing74,simhrq,hermosa,hardcor,griffy,rolex1,hackme,cuddles1,master3,bujht
r,aaron123,popolo,blader,1sexyred,gerry1,cronos,ffvdj474,yeehaw,bob1234,ca
rlos2,mike77,buckwheat,ramesh,acls2h,monster2,montess,11qq22ww,lazer,zx123
456789,chimpy,masterch,sargon,lochness,archana,1234qwert,hbxfhl,sarahb,alt
oid,zxcvbn12,dakot,caterham,dolomite,chazz,r29hqq,longone,pericles,grand1,
sherbert,eagle3,pudge,irontree,synapse,boome,nogood,summer2,pooki,gangsta1
,mahalkit,elenka,lbhtrnjh,dukedog,19922991,hopkins1,evgenia,domino1,x12345
6,manny1,tabbycat,drake1,jerico,drahcir,kelly2,708090a,facesit,11c645df,ma
c123,boodog,kalani,hiphop1,critters,hellothere,tbirds,valerka,551scasi,lov
e777,paloalto,mrbrown,duke3d,killa1,arcturus,spider12,dizzy1,smudger,goddo
g,75395,spammy,1357997531,78678,datalife,zxcvbn123,1122112211,london22,23d
p4x,rxmtkp,biggirls,ownsu,lzbs2twz,sharps,geryfe,237081a,golakers,nemesi,s
asha1995,pretty1,mittens1,d1lakiss,speedrac,gfhjkmm,sabbat,hellrais,159753
258,qwertyuiop123,playgirl,crippler,salma,strat1,celest,hello5,omega5,chee
se12,ndeyl5,edward12,soccer3,cheerio,davido,vfrcbr,gjhjctyjr,boscoe,inessa
,shithole,ibill,qwepoi,201jedlz,asdlkj,davidk,spawn2,ariel1,michael4,jamie

123,romantik,micro1,pittsbur,canibus,katja,muhtar,thomas123,studboy,masahi
ro,rebrov,patrick8,hotboys,sarge1,1hammer,nnnnn1,eistee,datalore,jackdani,
sasha2010,mwq6qlzo,cmfnpu,klausi,cnhjbntkm,andrzej,ilovejen,lindaa,hunter1
23,vvvvv1,novembe,hamster1,x35v8l,lacey1,1silver,iluvporn,valter,herson,al
exsandr,cojones,backhoe,womens,777angel,beatit,klingon1,ta8g4w,luisito,ben
edikt,maxwel,inspecto,zaq12ws,wladimir,bobbyd,peterj,asdfg12,hellspawn,bit
ch69,nick1234,golfer23,sony123,jello1,killie,chubby1,kodaira52,yanochka,bu
ckfast,morris1,roaddogg,snakeeye,sex1234,mike22,mmouse,fucker11,dantist,br
ittan,vfrfhjdf,doc123,plokijuh,emerald1,batman01,serafim,elementa,soccer9,
footlong,cthuttdbx,hapkido,eagle123,getsmart,getiton,batman2,masons,mastif
f,098890,cfvfhf,james7,azalea,sherif,saun24865709,123red,cnhtrjpf,martina1
,pupper,michael5,alan12,shakir,devin1,ha8fyp,palom,mamulya,trippy,deerhunt
er,happyone,monkey77,3mta3,123456789f,crownvic,teodor,natusik,0137485,vovc
hik,strutter,triumph1,cvetok,moremone,sonnen,screwbal,akira1,sexnow,pernil
le,independ,poopies,samapi,kbcbxrf,master22,swetlana,urchin,viper2,magica,
slurpee,postit,gilgames,kissarmy,clubpenguin,limpbizk,timber1,celin,lilkim
,fuckhard,lonely1,mom123,goodwood,extasy,sdsadee23,foxglove,malibog,clark1
,casey2,shell1,odense,balefire,dcunited,cubbie,pierr,solei,161718,bowling1
,areyukesc,batboy,r123456,1pionee,marmelad,maynard1,cn42qj,cfvehfq,heathro
w,qazxcvbn,connecti,secret123,newfie,xzsawq21,tubitzen,nikusha,enigma1,yfc
nz123,1austin,michaelc,splunge,wanger,phantom2,jason2,pain4me,primetime21,
babes1,liberte,sugarray,undergro,zonker,labatts,djhjyf,watch1,eagle5,madis
on2,cntgfirf,sasha2,masterca,fiction7,slick50,bruins1,sagitari,12481632,pe
niss,insuranc,2b8riedt,12346789,mrclean,ssptx452,tissot,q1w2e3r4t5y6u7,ava
tar1,comet1,spacer,vbrjkf,pass11,wanker1,14vbqk9p,noshit,money4me,sayana,f
ish1234,seaways,pipper,romeo123,karens,wardog,ab123456,gorilla1,andrey123,
lifesucks,jamesr,4wcqjn,bearman,glock22,matt11,dflbvrf,barbi,maine1,dima19
97,sunnyboy,6bjvpe,bangkok1,666666q,rafiki,letmein0,0raziel0,dalla,london9
9,wildthin,patrycja,skydog,qcactw,tmjxn151,yqlgr667,jimmyd,stripclub,deadw
ood,863abgsg,horses1,qn632o,scatman,sonia1,subrosa,woland,kolya,charlie4,m
oleman,j12345,summer11,angel11,blasen,sandal,mynewpas,retlaw,cambria,musta
ng4,nohack04,kimber45,fatdog,maiden1,bigload,necron,dupont24,ghost123,turb
o2,.ktymrf,radagast,balzac,vsevolod,pankaj,argentum,2bigtits,mamabear,bumb
lebee,mercury7,maddie1,chomper,jq24nc,snooky,pussylic,1lovers,taltos,warch
ild,diablo66,jojo12,sumerki,aventura,gagger,annelies,drumset,cumshots,azim
ut,123580,clambake,bmw540,birthday54,psswrd,paganini,wildwest,filibert,tea
seme,1test,scampi,thunder5,antosha,purple12,supersex,hhhhhh1,brujah,111222
333a,13579a,bvgthfnjh,4506802a,killians,choco,qqqwwweee,raygun,1grand,koet
su13,sharp1,mimi92139,fastfood,idontcare,bluered,chochoz,4z3al0ts,target1,
sheffiel,labrat,stalingrad,147123,cubfan,corvett1,holden1,snapper1,4071505
,amadeo,pollo,desperados,lovestory,marcopolo,mumbles,familyguy,kimchee,mar
cio,support1,tekila,shygirl1,trekkie,submissi,ilaria,salam,loveu,wildstar,
master69,sales1,netware,homer2,arseniy,gerrity1,raspberr,atreyu,stick1,ald
ric,tennis12,matahari,alohomora,dicanio,michae1,michaeld,666111,luvbug,boy
scout,esmerald,mjordan,admiral1,steamboa,616913,ybhdfyf,557711,555999,sunr
ay,apokalipsis,theroc,bmw330,buzzy,chicos,lenusik,shadowma,eagles05,444222
,peartree,qqq123,sandmann,spring1,430799,phatass,andi03,binky1,arsch,bamba
,kenny123,fabolous,loser123,poop12,maman,phobos,tecate,myxworld4,metros,co

corico,nokia6120,johnny69,hater,spanked,313233,markos,love2011,mozart1,vik
toriy,reccos,331234,hornyone,vitesse,1um83z,55555q,proline,v12345,skaven,a
lizee,bimini,fenerbahce,543216,zaqqaz,poi123,stabilo,brownie1,1qwerty1,din
esh,baggins1,1234567t,davidkin,friend1,lietuva,octopuss,spooks,12345qq,mys
hit,buttface,paradoxx,pop123,golfin,sweet69,rfghbp,sambuca,kayak1,bogus1,g
irlz,dallas12,millers,123456zx,operatio,pravda,eternal1,chase123,moroni,pr
oust,blueduck,harris1,redbarch,996699,1010101,mouche,millenni,1123456,scor
e1,1234565,1234576,eae21157,dave12,pussyy,gfif1991,1598741,hoppy,darrian,s
noogins,fartface,ichbins,vfkbyrf,rusrap,2741001,fyfrjylf,aprils,favre,this
is,bannana,serval,wiggum,satsuma,matt123,ivan123,gulmira,123zxc123,oscar2,
acces,annie2,dragon0,emiliano,allthat,pajaro,amandine,rawiswar,sinead,tass
ie,karma1,piggys,nokias,orions,origami,type40,mondo,ferrets,monker,biteme2
,gauntlet,arkham,ascona,ingram01,klem1,quicksil,bingo123,blue66,plazma,onf
ire,shortie,spjfet,123963,thered,fire777,lobito,vball,1chicken,moosehea,el
efante,babe23,jesus12,parallax,elfstone,number5,shrooms,freya,hacker1,roxe
tte,snoops,number7,fellini,dtlmvf,chigger,mission1,mitsubis,kannan,whitedo
g,james01,ghjgecr,rfnfgekmnf,everythi,getnaked,prettybo,sylvan,chiller,car
rera4,cowbo,biochem,azbuka,qwertyuiop1,midnight1,informat,audio1,alfred1,0
range,sucker1,scott2,russland,1eagle,torben,djkrjlfd,rocky6,maddy1,bonobo,
portos,chrissi,xjznq5,dexte,vdlxuc,teardrop,pktmxr,iamtheone,danijela,eyph
ed,suzuki1,etvww4,redtail,ranger11,mowerman,asshole2,coolkid,adriana1,boot
camp,longcut,evets,npyxr5,bighurt,bassman1,stryder,giblet,nastja,blackadd,
topflite,wizar,cumnow,technolo,bassboat,bullitt,kugm7b,maksimus,wankers,mi
ne12,sunfish,pimpin1,shearer9,user1,vjzgjxnf,tycobb,80070633pc,stanly,vita
ly,shirley1,cinzia,carolyn1,angeliqu,teamo,qdarcv,aa123321,ragdoll,bonit,l
adyluck,wiggly,vitara,jetbalance,12345600,ozzman,dima12345,mybuddy,shilo,s
atan66,erebus,warrio,090808qwe,stupi,bigdan,paul1234,chiapet,brooks1,phill
y1,dually,gowest,farmer1,1qa2ws3ed4rf,alberto1,beachboy,barne,aa12345,aliy
ah,radman,benson1,dfkthbq,highball,bonou2,i81u812,workit,darter,redhook,cs
fbr5yy,buttlove,episode1,ewyuza,porthos,lalal,abcd12,papero,toosexy,keeper
1,silver7,jujitsu,corset,pilot123,simonsay,pinggolf,katerinka,kender,drunk
1,fylhjvtlf,rashmi,nighthawk,maggy,juggernaut,larryb,cabibble,fyabcf,24736
5,gangstar,jaybee,verycool,123456789qw,forbidde,prufrock,12345zxc,malaika,
blackbur,docker,filipe,koshechka,gemma1,djamaal,dfcbkmtdf,gangst,9988aa,du
cks1,pthrfkj,puertorico,muppets,griffins,whippet,sauber,timofey,larinso,12
3456789zxc,quicken,qsefth,liteon,headcase,bigdadd,zxc321,maniak,jamesc,bas
smast,bigdogs,1girls,123xxx,trajan,lerochka,noggin,mtndew,04975756,domin,w
er123,fumanchu,lambada,thankgod,june22,kayaking,patchy,summer10,timepass,p
oiu1234,kondor,kakka,lament,zidane10,686xqxfg,l8v53x,caveman1,nfvthkfy,hol
ymoly,pepita,alex1996,mifune,fighter1,asslicker,jack22,abc123abc,zaxxon,mi
dnigh,winni,psalm23,punky,monkey22,password13,mymusic,justyna,annushka,luc
ky5,briann,495rus19,withlove,almaz,supergir,miata,bingbong,bradpitt,kamasu
tr,yfgjktjy,vanman,pegleg,amsterdam1,123a321,letmein9,shivan,korona,bmw520
,annette1,scotsman,gandal,welcome12,sc00by,qpwoei,fred69,m1sf1t,hamburg1,1
access,dfkmrbhbz,excalibe,boobies1,fuckhole,karamel,starfuck,star99,breakf
as,georgiy,ywvxpz,smasher,fatcat1,allanon,12345n,coondog,whacko,avalon1,sc
ythe,saab93,timon,khorne,atlast,nemisis,brady12,blenheim,52678677,mick7278
,9skw5g,fleetwoo,ruger1,kissass,pussy7,scruff,12345l,bigfun,vpmfsz,yxkck87

8,evgeny,55667788,lickher,foothill,alesis,poppies,77777778,californi,manni
e,bartjek,qhxbij,thehulk,xirt2k,angelo4ek,rfkmrekznjh,tinhorse,1david,spar
ky12,night1,luojianhua,bobble,nederland,rosemari,travi,minou,ciscokid,beeh
ive,565hlgqo,alpine1,samsung123,trainman,xpress,logistic,vw198m2n,hanter,z
aqwsx123,qwasz,mariachi,paska,kmg365,kaulitz,sasha12,north1,polarbear,migh
ty1,makeksa11,123456781,one4all,gladston,notoriou,polniypizdec110211,gosia
,grandad,xholes,timofei,invalidp,speaker1,zaharov,maggiema,loislane,gonole
s,br5499,discgolf,kaskad,snooper,newman1,belial,demigod,vicky1,pridurok,al
ex1990,tardis1,cruzer,hornie,sacramen,babycat,burunduk,mark69,oakland1,me1
234,gmctruck,extacy,sexdog,putang,poppen,billyd,1qaz2w,loveable,gimlet,azw
ebitalia,ragtop,198500,qweas,mirela,rock123,11bravo,sprewell,tigrenok,jare
dleto,vfhbif,blue2,rimjob,catwalk,sigsauer,loqse,doromich,jack01,lasombra,
jonny5,newpassword,profesor,garcia1,123as123,croucher,demeter,4_life,rfhfv
tkm,superman2,rogues,assword1,russia1,jeff1,mydream,z123456789,rascal1,dar
re,kimberl,pickle1,ztmfcq,ponchik,lovesporn,hikari,gsgba368,pornoman,chbju
n,choppy,diggity,nightwolf,viktori,camar,vfhecmrf,alisa1,minstrel,wishmast
er,mulder1,aleks,gogirl,gracelan,8womys,highwind,solstice,dbrnjhjdyf,night
man,pimmel,beertje,ms6nud,wwfwcw,fx3tuo,poopface,asshat,dirtyd,jiminy,luv2
fuck,ptybnxtvgbjy,dragnet,pornogra,10inch,scarlet1,guido1,raintree,v123456
,1aaaaaaa,maxim1935,hotwater,gadzooks,playaz,harri,brando1,defcon1,ivanna,
123654a,arsenal2,candela,nt5d27,jaime1,duke1,burton1,allstar1,dragos,newpo
int,albacore,1236987z,verygoodbot,1wildcat,fishy1,ptktysq,chris11,puschel,
itdxtyrj,7kbe9d,serpico,jazzie,1zzzzz,kindbuds,wenef45313,1compute,tatung,
sardor,gfyfcjybr,test99,toucan,meteora,lysander,asscrack,jowgnx,hevnm4,suc
kthis,masha123,karinka,marit,oqglh565,dragon00,vvvbbb,cheburashka,vfrfrf,d
ownlow,unforgiven,p3e85tr,kim123,sillyboy,gold1,golfvr6,quicksan,irochka,f
roglegs,shortsto,caleb1,tishka,bigtitts,smurfy,bosto,dropzone,nocode,jazzb
ass,digdug,green7,saltlake,therat,dmitriev,lunita,deaddog,summer0,1212qq,b
obbyg,mty3rh,isaac1,gusher,helloman,sugarbear,corvair,extrem,teatime,tujaz
opi,titanik,efyreg,jo9k2jw2,counchac,tivoli,utjvtnhbz,bebit,jacob6,clayton
1,incubus1,flash123,squirter,dima2010,cock1,rawks,komatsu,forty2,98741236,
cajun1,madelein,mudhoney,magomed,q111111,qaswed,consense,12345b,bakayaro,s
ilencer,zoinks,bigdic,werwolf,pinkpuss,96321478,alfie1,ali123,sarit,minett
e,musics,chato,iaapptfcor,cobaka,strumpf,datnigga,sonic123,yfnecbr,vjzctvm
z,pasta1,tribbles,crasher,htlbcrf,1tiger,shock123,bearshar,syphon,a654321,
cubbies1,jlhanes,eyespy,fucktheworld,carrie1,bmw325is,suzuk,mander,dorina,
mithril,hondo1,vfhnbyb,sachem,newton1,12345x,7777755102q,230857z,xxxsex,sc
ubapro,hayastan,spankit,delasoul,searock6,fallout3,nilrem,24681357,pashka,
voluntee,pharoh,willo,india1,badboy69,roflmao,gunslinger,lovergir,mama12,m
elange,640xwfkv,chaton,darkknig,bigman1,aabbccdd,harleyd,birdhouse,giggsy,
hiawatha,tiberium,joker7,hello1234,sloopy,tm371855,greendog,solar1,bignose
,djohn11,espanol,oswego,iridium,kavitha,pavell,mirjam,cyjdsvujljv,alpha5,d
eluge,hamme,luntik,turismo,stasya,kjkbnf,caeser,schnecke,tweety1,tralfaz,l
ambrett,prodigy1,trstno1,pimpshit,werty1,karman,bigboob,pastel,blackmen,ma
tthew8,moomin,q1w2e,gilly,primaver,jimmyg,house2,elviss,15975321,1jessica,
monaliza,salt55,vfylfhbyrf,harley11,tickleme,murder1,nurgle,kickass1,there
sa1,fordtruck,pargolf,managua,inkognito,sherry1,gotit,friedric,metro2033,s
lk230,freeport,cigarett,492529,vfhctkm,thebeach,twocats,bakugan,yzerman1,c

harlieb,motoko,skiman,1234567w,pussy3,love77,asenna,buffie,260zntpc,kinkos
,access20,mallard1,fuckyou69,monami,rrrrr1,bigdog69,mikola,1boomer,godzila
,ginger2,dima2000,skorpion39,dima1234,hawkdog79,warrior2,ltleirf,supra1,je
rusale,monkey01,333z333,666888,kelsey1,w8gkz2x1,fdfnfh,msnxbi,qwe123rty,ma
ch1,monkey3,123456789qq,c123456,nezabudka,barclays,nisse,dasha1,1234567898
7654321,dima1993,oldspice,frank2,rabbitt,prettyboy,ov3ajy,iamthema,kawasak
,banjo1,gtivr6,collants,gondor,hibees,cowboys2,codfish,buster2,purzel,ruby
red,kayaker,bikerboy,qguvyt,masher,sseexx,kenshiro,moonglow,semenova,rosar
i,eduard1,deltaforce,grouper,bongo1,tempgod,1taylor,goldsink,qazxsw1,1jesu
s,m69fg2w,maximili,marysia,husker1,kokanee,sideout,googl,south1,plumber1,t
rillian,00001,1357900,farkle,1xxxxx,pascha,emanuela,bagheera,hound1,mylov,
newjersey,swampfox,sakic19,torey,geforce,wu4etd,conrail,pigman,martin2,ber
02,nascar2,angel69,barty,kitsune,cornet,yes90125,goomba,daking,anthea,siva
rt,weather1,ndaswf,scoubidou,masterchief,rectum,3364068,oranges1,copter,1s
amanth,eddies,mimoza,ahfywbz,celtic88,86mets,applemac,amanda11,taliesin,1a
ngel,imhere,london11,bandit12,killer666,beer1,06225930,psylocke,james69,sc
humach,24pnz6kc,endymion,wookie1,poiu123,birdland,smoochie,lastone,rclaki,
olive1,pirat,thunder7,chris69,rocko,151617,djg4bb4b,lapper,ajcuivd289,colo
le57,shadow7,dallas21,ajtdmw,executiv,dickies,omegaman,jason12,newhaven,aa
aaaas,pmdmscts,s456123789,beatr

/*
* Copyright (c) 2013 Pavol Rusnak
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
of
* this software and associated documentation files (the "Software"), to deal
in
* the Software without restriction, including without limitation the rights
to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies
* of the Software, and to permit persons to whom the Software is furnished
to do
* so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
* Javascript port from python by Ian Coleman
*
* Requires code from sjcl
* https://github.com/bitwiseshiftleft/sjcl
*/
var Mnemonic = function(language) {
var PBKDF2_ROUNDS = 2048;
var RADIX = 2048;
var self = this;
var wordlist = [];
var hmacSHA512 = function(key) {
var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
this.encrypt = function() {
return hasher.encrypt.apply(hasher, arguments);

};
};
function init() {
wordlist = WORDLISTS[language];
if (wordlist.length != RADIX) {
err = 'Wordlist should contain ' + RADIX + ' words, but it contains
' + wordlist.length + ' words.';
throw err;
}
}
self.generate = function(strength) {
strength = strength || 128;
var r = strength % 32;
if (r > 0) {
throw 'Strength should be divisible by 32, but it is not (' + r
+ ').';
}
var hasStrongCrypto = 'crypto' in window && window['crypto'] !== null;
if (!hasStrongCrypto) {
throw 'Mnemonic should be generated with strong randomness, but
crypto.getRandomValues is unavailable';
}
var buffer = new Uint8Array(strength / 8);
var data = crypto.getRandomValues(buffer);
return self.toMnemonic(data);
}
self.toMnemonic = function(byteArray) {
if (byteArray.length % 4 > 0) {
throw 'Data length in bits should be divisible by 32, but it is
not (' + byteArray.length + ' bytes = ' + byteArray.length*8 + ' bits).'
}
//h = hashlib.sha256(data).hexdigest()
var data = byteArrayToWordArray(byteArray);
var hash = sjcl.hash.sha256.hash(data);
var h = sjcl.codec.hex.fromBits(hash);
// b is a binary string, eg '00111010101100...'
//b = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8)
+ \
// bin(int(h, 16))[2:].zfill(256)[:len(data) * 8 / 32]
//
// a = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8)
// c = bin(int(h, 16))[2:].zfill(256)
// d = c[:len(data) * 8 / 32]

var a = byteArrayToBinaryString(byteArray);
var c = zfill(hexStringToBinaryString(h), 256);
var d = c.substring(0, byteArray.length * 8 / 32);
// b = line1 + line2
var b = a + d;
var result = [];
var blen = b.length / 11;
for (var i=0; i<blen; i++) {
var idx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);
result.push(wordlist[idx]);
}
return self.joinWords(result);
}
self.check = function(mnemonic) {
var mnemonic = self.splitWords(mnemonic);
if (mnemonic.length == 0 || mnemonic.length % 3 > 0) {
return false
}
// idx = map(lambda x: bin(self.wordlist.index(x))[2:].zfill(11),
mnemonic)
var idx = [];
for (var i=0; i<mnemonic.length; i++) {
var word = mnemonic[i];
var wordIndex = wordlist.indexOf(word);
if (wordIndex == -1) {
return false;
}
var binaryIndex = zfill(wordIndex.toString(2), 11);
idx.push(binaryIndex);
}
var b = idx.join('');
var l = b.length;
//d = b[:l / 33 * 32]
//h = b[-l / 33:]
var d = b.substring(0, l / 33 * 32);
var h = b.substring(l - l / 33, l);
//nd = binascii.unhexlify(hex(int(d, 2))[2:].rstrip('L').zfill(l /
33 * 8))
var nd = binaryStringToWordArray(d);
//nh = bin(int(hashlib.sha256(nd).hexdigest(),
16))[2:].zfill(256)[:l / 33]
var ndHash = sjcl.hash.sha256.hash(nd);
var ndHex = sjcl.codec.hex.fromBits(ndHash);
var ndBstr = zfill(hexStringToBinaryString(ndHex), 256);
var nh = ndBstr.substring(0,l/33);
return h == nh;

}
self.toSeed = function(mnemonic, passphrase) {
passphrase = passphrase || '';
mnemonic = self.joinWords(self.splitWords(mnemonic)); // removes
duplicate blanks
var mnemonicNormalized = self.normalizeString(mnemonic);
passphrase = self.normalizeString(passphrase)
passphrase = "mnemonic" + passphrase;
var mnemonicBits =
sjcl.codec.utf8String.toBits(mnemonicNormalized);
var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits,
PBKDF2_ROUNDS, 512, hmacSHA512);
var hashHex = sjcl.codec.hex.fromBits(result);
return hashHex;
}
self.splitWords = function(mnemonic) {
return mnemonic.split(/\s/g).filter(function(x) { return x.length;
});
}
self.joinWords = function(words) {
// Set space correctly depending on the language
// see
https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md
#japanese
var space = " ";
if (language == "japanese") {
space = "\u3000"; // ideographic space
}
return words.join(space);
}
self.normalizeString = function(str) {
return str.normalize("NFKD");
}
function byteArrayToWordArray(data) {
var a = [];
for (var i=0; i<data.length/4; i++) {
v = 0;
v += data[i*4 + 0] << 8 * 3;
v += data[i*4 + 1] << 8 * 2;
v += data[i*4 + 2] << 8 * 1;
v += data[i*4 + 3] << 8 * 0;
a.push(v);

}
return a;
}
function byteArrayToBinaryString(data) {
var bin = "";
for (var i=0; i<data.length; i++) {
bin += zfill(data[i].toString(2), 8);
}
return bin;
}
function hexStringToBinaryString(hexString) {
binaryString = "";
for (var i=0; i<hexString.length; i++) {
binaryString += zfill(parseInt(hexString[i],
16).toString(2),4);
}
return binaryString;
}
function binaryStringToWordArray(binary) {
var aLen = binary.length / 32;
var a = [];
for (var i=0; i<aLen; i++) {
var valueStr = binary.substring(0,32);
var value = parseInt(valueStr, 2);
a.push(value);
binary = binary.slice(32);
}
return a;
}
// Pad a numeric string on the left with zero digits until the given width
// is reached.
// Note this differs to the python implementation because it does not
// handle numbers starting with a sign.
function zfill(source, length) {
source = source.toString();
while (source.length < length) {
source = '0' + source;
}
return source;
}
init();
}

/*
* Copyright (c) 2013 Pavol Rusnak
*
* Permission is hereby granted, free of charge, to any person obtaining a copy
of
* this software and associated documentation files (the "Software"), to deal
in
* the Software without restriction, including without limitation the rights
to
* use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies
* of the Software, and to permit persons to whom the Software is furnished
to do
* so, subject to the following conditions:
*
* The above copyright notice and this permission notice shall be included in
all
* copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
* IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
* FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
* AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY,
* WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF
OR IN
* CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
* Javascript port from python by Ian Coleman
*
* Requires code from sjcl
* https://github.com/bitwiseshiftleft/sjcl
*/
var Mnemonic = function(language) {
var PBKDF2_ROUNDS = 2048;
var RADIX = 2048;
var self = this;
var wordlist = [];
var hmacSHA512 = function(key) {
var hasher = new sjcl.misc.hmac(key, sjcl.hash.sha512);
this.encrypt = function() {
return hasher.encrypt.apply(hasher, arguments);

};
};
function init() {
wordlist = WORDLISTS[language];
if (wordlist.length != RADIX) {
err = 'Wordlist should contain ' + RADIX + ' words, but it contains
' + wordlist.length + ' words.';
throw err;
}
}
self.generate = function(strength) {
strength = strength || 128;
var r = strength % 32;
if (r > 0) {
throw 'Strength should be divisible by 32, but it is not (' + r
+ ').';
}
var hasStrongCrypto = 'crypto' in window && window['crypto'] !== null;
if (!hasStrongCrypto) {
throw 'Mnemonic should be generated with strong randomness, but
crypto.getRandomValues is unavailable';
}
var buffer = new Uint8Array(strength / 8);
var data = crypto.getRandomValues(buffer);
return self.toMnemonic(data);
}
self.toMnemonic = function(byteArray) {
if (byteArray.length % 4 > 0) {
throw 'Data length in bits should be divisible by 32, but it is
not (' + byteArray.length + ' bytes = ' + byteArray.length*8 + ' bits).'
}
//h = hashlib.sha256(data).hexdigest()
var data = byteArrayToWordArray(byteArray);
var hash = sjcl.hash.sha256.hash(data);
var h = sjcl.codec.hex.fromBits(hash);
// b is a binary string, eg '00111010101100...'
//b = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8)
+ \
// bin(int(h, 16))[2:].zfill(256)[:len(data) * 8 / 32]
//
// a = bin(int(binascii.hexlify(data), 16))[2:].zfill(len(data) * 8)
// c = bin(int(h, 16))[2:].zfill(256)
// d = c[:len(data) * 8 / 32]

var a = byteArrayToBinaryString(byteArray);
var c = zfill(hexStringToBinaryString(h), 256);
var d = c.substring(0, byteArray.length * 8 / 32);
// b = line1 + line2
var b = a + d;
var result = [];
var blen = b.length / 11;
for (var i=0; i<blen; i++) {
var idx = parseInt(b.substring(i * 11, (i + 1) * 11), 2);
result.push(wordlist[idx]);
}
return self.joinWords(result);
}
self.check = function(mnemonic) {
var mnemonic = self.splitWords(mnemonic);
if (mnemonic.length == 0 || mnemonic.length % 3 > 0) {
return false
}
// idx = map(lambda x: bin(self.wordlist.index(x))[2:].zfill(11),
mnemonic)
var idx = [];
for (var i=0; i<mnemonic.length; i++) {
var word = mnemonic[i];
var wordIndex = wordlist.indexOf(word);
if (wordIndex == -1) {
return false;
}
var binaryIndex = zfill(wordIndex.toString(2), 11);
idx.push(binaryIndex);
}
var b = idx.join('');
var l = b.length;
//d = b[:l / 33 * 32]
//h = b[-l / 33:]
var d = b.substring(0, l / 33 * 32);
var h = b.substring(l - l / 33, l);
//nd = binascii.unhexlify(hex(int(d, 2))[2:].rstrip('L').zfill(l /
33 * 8))
var nd = binaryStringToWordArray(d);
//nh = bin(int(hashlib.sha256(nd).hexdigest(),
16))[2:].zfill(256)[:l / 33]
var ndHash = sjcl.hash.sha256.hash(nd);
var ndHex = sjcl.codec.hex.fromBits(ndHash);
var ndBstr = zfill(hexStringToBinaryString(ndHex), 256);
var nh = ndBstr.substring(0,l/33);
return h == nh;

}
self.toSeed = function(mnemonic, passphrase) {
passphrase = passphrase || '';
mnemonic = self.joinWords(self.splitWords(mnemonic)); // removes
duplicate blanks
var mnemonicNormalized = self.normalizeString(mnemonic);
passphrase = self.normalizeString(passphrase)
passphrase = "mnemonic" + passphrase;
var mnemonicBits =
sjcl.codec.utf8String.toBits(mnemonicNormalized);
var passphraseBits = sjcl.codec.utf8String.toBits(passphrase);
var result = sjcl.misc.pbkdf2(mnemonicBits, passphraseBits,
PBKDF2_ROUNDS, 512, hmacSHA512);
var hashHex = sjcl.codec.hex.fromBits(result);
return hashHex;
}
self.splitWords = function(mnemonic) {
return mnemonic.split(/\s/g).filter(function(x) { return x.length;
});
}
self.joinWords = function(words) {
// Set space correctly depending on the language
// see
https://github.com/bitcoin/bips/blob/master/bip-0039/bip-0039-wordlists.md
#japanese
var space = " ";
if (language == "japanese") {
space = "\u3000"; // ideographic space
}
return words.join(space);
}
self.normalizeString = function(str) {
return str.normalize("NFKD");
}
function byteArrayToWordArray(data) {
var a = [];
for (var i=0; i<data.length/4; i++) {
v = 0;
v += data[i*4 + 0] << 8 * 3;
v += data[i*4 + 1] << 8 * 2;
v += data[i*4 + 2] << 8 * 1;
v += data[i*4 + 3] << 8 * 0;
a.push(v);

}
return a;
}
function byteArrayToBinaryString(data) {
var bin = "";
for (var i=0; i<data.length; i++) {
bin += zfill(data[i].toString(2), 8);
}
return bin;
}
function hexStringToBinaryString(hexString) {
binaryString = "";
for (var i=0; i<hexString.length; i++) {
binaryString += zfill(parseInt(hexString[i],
16).toString(2),4);
}
return binaryString;
}
function binaryStringToWordArray(binary) {
var aLen = binary.length / 32;
var a = [];
for (var i=0; i<aLen; i++) {
var valueStr = binary.substring(0,32);
var value = parseInt(valueStr, 2);
a.push(value);
binary = binary.slice(32);
}
return a;
}
// Pad a numeric string on the left with zero digits until the given width
// is reached.
// Note this differs to the python implementation because it does not
// handle numbers starting with a sign.
function zfill(source, length) {
source = source.toString();
while (source.length < length) {
source = '0' + source;
}
return source;
}
init();
}

// Polyfill for NFKD normalization
// See https://github.com/walling/unorm
(function (root) {
"use strict";
/***** unorm.js *****/
/*
* UnicodeNormalizer 1.0.0
* Copyright (c) 2008 Matsuza
* Dual licensed under the MIT (MIT-LICENSE.txt) and GPL (GPL-LICENSE.txt)
licenses.
* $Date: 2008-06-05 16:44:17 +0200 (Thu, 05 Jun 2008) $
* $Rev: 13309 $
*/
var DEFAULT_FEATURE = [null, 0, {}];
var CACHE_THRESHOLD = 10;
var SBase = 0xAC00, LBase = 0x1100, VBase = 0x1161, TBase = 0x11A7, LCount
= 19, VCount = 21, TCount = 28;
var NCount = VCount * TCount; // 588
var SCount = LCount * NCount; // 11172
var UChar = function(cp, feature){
this.codepoint = cp;
this.feature = feature;
};
// Strategies
var cache = {};
var cacheCounter = [];
for (var i = 0; i <= 0xFF; ++i){
cacheCounter[i] = 0;
}
function fromCache(next, cp, needFeature){
var ret = cache[cp];
if(!ret){
ret = next(cp, needFeature);
if(!!ret.feature && ++cacheCounter[(cp >> 8) & 0xFF] >
CACHE_THRESHOLD){
cache[cp] = ret;
}
}
return ret;
}

function fromData(next, cp, needFeature){
var hash = cp & 0xFF00;
var dunit = UChar.udata[hash] || {};
var f = dunit[cp];
return f ? new UChar(cp, f) : new UChar(cp, DEFAULT_FEATURE);
}
function fromCpOnly(next, cp, needFeature){
return !!needFeature ? next(cp, needFeature) : new UChar(cp, null);
}
function fromRuleBasedJamo(next, cp, needFeature){
var j;
if(cp < LBase || (LBase + LCount <= cp && cp < SBase) || (SBase + SCount
< cp)){
return next(cp, needFeature);
}
if(LBase <= cp && cp < LBase + LCount){
var c = {};
var base = (cp - LBase) * VCount;
for (j = 0; j < VCount; ++j){
c[VBase + j] = SBase + TCount * (j + base);
}
return new UChar(cp, [,,c]);
}
var SIndex = cp - SBase;
var TIndex = SIndex % TCount;
var feature = [];
if(TIndex !== 0){
feature[0] = [SBase + SIndex - TIndex, TBase + TIndex];
} else {
feature[0] = [LBase + Math.floor(SIndex / NCount), VBase +
Math.floor((SIndex % NCount) / TCount)];
feature[2] = {};
for (j = 1; j < TCount; ++j){
feature[2][TBase + j] = cp + j;
}
}
return new UChar(cp, feature);
}
function fromCpFilter(next, cp, needFeature){
return cp < 60 || 13311 < cp && cp < 42607 ? new UChar(cp, DEFAULT_FEATURE)
: next(cp, needFeature);
}
var strategies = [fromCpFilter, fromCache, fromCpOnly, fromRuleBasedJamo,
fromData];
UChar.fromCharCode = strategies.reduceRight(function (next, strategy) {

return function (cp, needFeature) {
return strategy(next, cp, needFeature);
};
}, null);
UChar.isHighSurrogate = function(cp){
return cp >= 0xD800 && cp <= 0xDBFF;
};
UChar.isLowSurrogate = function(cp){
return cp >= 0xDC00 && cp <= 0xDFFF;
};
UChar.prototype.prepFeature = function(){
if(!this.feature){
this.feature = UChar.fromCharCode(this.codepoint, true).feature;
}
};
UChar.prototype.toString = function(){
if(this.codepoint < 0x10000){
return String.fromCharCode(this.codepoint);
} else {
var x = this.codepoint - 0x10000;
return String.fromCharCode(Math.floor(x / 0x400) + 0xD800, x % 0x400
+ 0xDC00);
}
};
UChar.prototype.getDecomp = function(){
this.prepFeature();
return this.feature[0] || null;
};
UChar.prototype.isCompatibility = function(){
this.prepFeature();
return !!this.feature[1] && (this.feature[1] & (1 << 8));
};
UChar.prototype.isExclude = function(){
this.prepFeature();
return !!this.feature[1] && (this.feature[1] & (1 << 9));
};
UChar.prototype.getCanonicalClass = function(){
this.prepFeature();
return !!this.feature[1] ? (this.feature[1] & 0xff) : 0;
};
UChar.prototype.getComposite = function(following){
this.prepFeature();
if(!this.feature[2]){

return null;
}
var cp = this.feature[2][following.codepoint];
return cp ? UChar.fromCharCode(cp) : null;
};
var UCharIterator = function(str){
this.str = str;
this.cursor = 0;
};
UCharIterator.prototype.next = function(){
if(!!this.str && this.cursor < this.str.length){
var cp = this.str.charCodeAt(this.cursor++);
var d;
if(UChar.isHighSurrogate(cp) && this.cursor < this.str.length &&
UChar.isLowSurrogate((d = this.str.charCodeAt(this.cursor)))){
cp = (cp - 0xD800) * 0x400 + (d -0xDC00) + 0x10000;
++this.cursor;
}
return UChar.fromCharCode(cp);
} else {
this.str = null;
return null;
}
};
var RecursDecompIterator = function(it, cano){
this.it = it;
this.canonical = cano;
this.resBuf = [];
};
RecursDecompIterator.prototype.next = function(){
function recursiveDecomp(cano, uchar){
var decomp = uchar.getDecomp();
if(!!decomp && !(cano && uchar.isCompatibility())){
var ret = [];
for(var i = 0; i < decomp.length; ++i){
var a = recursiveDecomp(cano, UChar.fromCharCode(decomp[i]));
ret = ret.concat(a);
}
return ret;
} else {
return [uchar];
}
}
if(this.resBuf.length === 0){
var uchar = this.it.next();

if(!uchar){
return null;
}
this.resBuf = recursiveDecomp(this.canonical, uchar);
}
return this.resBuf.shift();
};
var DecompIterator = function(it){
this.it = it;
this.resBuf = [];
};
DecompIterator.prototype.next = function(){
var cc;
if(this.resBuf.length === 0){
do{
var uchar = this.it.next();
if(!uchar){
break;
}
cc = uchar.getCanonicalClass();
var inspt = this.resBuf.length;
if(cc !== 0){
for(; inspt > 0; --inspt){
var uchar2 = this.resBuf[inspt - 1];
var cc2 = uchar2.getCanonicalClass();
if(cc2 <= cc){
break;
}
}
}
this.resBuf.splice(inspt, 0, uchar);
} while(cc !== 0);
}
return this.resBuf.shift();
};
var CompIterator = function(it){
this.it = it;
this.procBuf = [];
this.resBuf = [];
this.lastClass = null;
};
CompIterator.prototype.next = function(){
while(this.resBuf.length === 0){
var uchar = this.it.next();

if(!uchar){
this.resBuf = this.procBuf;
this.procBuf = [];
break;
}
if(this.procBuf.length === 0){
this.lastClass = uchar.getCanonicalClass();
this.procBuf.push(uchar);
} else {
var starter = this.procBuf[0];
var composite = starter.getComposite(uchar);
var cc = uchar.getCanonicalClass();
if(!!composite && (this.lastClass < cc || this.lastClass === 0)){
this.procBuf[0] = composite;
} else {
if(cc === 0){
this.resBuf = this.procBuf;
this.procBuf = [];
}
this.lastClass = cc;
this.procBuf.push(uchar);
}
}
}
return this.resBuf.shift();
};
var createIterator = function(mode, str){
switch(mode){
case "NFD":
return new DecompIterator(new RecursDecompIterator(new
UCharIterator(str), true));
case "NFKD":
return new DecompIterator(new RecursDecompIterator(new
UCharIterator(str), false));
case "NFC":
return new CompIterator(new DecompIterator(new
RecursDecompIterator(new UCharIterator(str), true)));
case "NFKC":
return new CompIterator(new DecompIterator(new
RecursDecompIterator(new UCharIterator(str), false)));
}
throw mode + " is invalid";
};
var normalize = function(mode, str){
var it = createIterator(mode, str);
var ret = "";
var uchar;

while(!!(uchar = it.next())){
ret += uchar.toString();
}
return ret;
};
/* API functions */
function nfd(str){
return normalize("NFD", str);
}
function nfkd(str){
return normalize("NFKD", str);
}
function nfc(str){
return normalize("NFC", str);
}
function nfkc(str){
return normalize("NFKC", str);
}
/* Unicode data */
UChar.udata={
0:{60:[,,{824:8814}],61:[,,{824:8800}],62:[,,{824:8815}],65:[,,{768:192,76
9:193,770:194,771:195,772:256,774:258,775:550,776:196,777:7842,778:197,780
:461,783:512,785:514,803:7840,805:7680,808:260}],66:[,,{775:7682,803:7684,
817:7686}],67:[,,{769:262,770:264,775:266,780:268,807:199}],68:[,,{775:769
0,780:270,803:7692,807:7696,813:7698,817:7694}],69:[,,{768:200,769:201,770
:202,771:7868,772:274,774:276,775:278,776:203,777:7866,780:282,783:516,785
:518,803:7864,807:552,808:280,813:7704,816:7706}],70:[,,{775:7710}],71:[,,
{769:500,770:284,772:7712,774:286,775:288,780:486,807:290}],72:[,,{770:292
,775:7714,776:7718,780:542,803:7716,807:7720,814:7722}],73:[,,{768:204,769
:205,770:206,771:296,772:298,774:300,775:304,776:207,777:7880,780:463,783:
520,785:522,803:7882,808:302,816:7724}],74:[,,{770:308}],75:[,,{769:7728,7
80:488,803:7730,807:310,817:7732}],76:[,,{769:313,780:317,803:7734,807:315
,813:7740,817:7738}],77:[,,{769:7742,775:7744,803:7746}],78:[,,{768:504,76
9:323,771:209,775:7748,780:327,803:7750,807:325,813:7754,817:7752}],79:[,,
{768:210,769:211,770:212,771:213,772:332,774:334,775:558,776:214,777:7886,
779:336,780:465,783:524,785:526,795:416,803:7884,808:490}],80:[,,{769:7764
,775:7766}],82:[,,{769:340,775:7768,780:344,783:528,785:530,803:7770,807:3
42,817:7774}],83:[,,{769:346,770:348,775:7776,780:352,803:7778,806:536,807
:350}],84:[,,{775:7786,780:356,803:7788,806:538,807:354,813:7792,817:7790}
],85:[,,{768:217,769:218,770:219,771:360,772:362,774:364,776:220,777:7910,
778:366,779:368,780:467,783:532,785:534,795:431,803:7908,804:7794,808:370,
813:7798,816:7796}],86:[,,{771:7804,803:7806}],87:[,,{768:7808,769:7810,77
0:372,775:7814,776:7812,803:7816}],88:[,,{775:7818,776:7820}],89:[,,{768:7

922,769:221,770:374,771:7928,772:562,775:7822,776:376,777:7926,803:7924}],
90:[,,{769:377,770:7824,775:379,780:381,803:7826,817:7828}],97:[,,{768:224
,769:225,770:226,771:227,772:257,774:259,775:551,776:228,777:7843,778:229,
780:462,783:513,785:515,803:7841,805:7681,808:261}],98:[,,{775:7683,803:76
85,817:7687}],99:[,,{769:263,770:265,775:267,780:269,807:231}],100:[,,{775
:7691,780:271,803:7693,807:7697,813:7699,817:7695}],101:[,,{768:232,769:23
3,770:234,771:7869,772:275,774:277,775:279,776:235,777:7867,780:283,783:51
7,785:519,803:7865,807:553,808:281,813:7705,816:7707}],102:[,,{775:7711}],
103:[,,{769:501,770:285,772:7713,774:287,775:289,780:487,807:291}],104:[,,
{770:293,775:7715,776:7719,780:543,803:7717,807:7721,814:7723,817:7830}],1
05:[,,{768:236,769:237,770:238,771:297,772:299,774:301,776:239,777:7881,78
0:464,783:521,785:523,803:7883,808:303,816:7725}],106:[,,{770:309,780:496}
],107:[,,{769:7729,780:489,803:7731,807:311,817:7733}],108:[,,{769:314,780
:318,803:7735,807:316,813:7741,817:7739}],109:[,,{769:7743,775:7745,803:77
47}],110:[,,{768:505,769:324,771:241,775:7749,780:328,803:7751,807:326,813
:7755,817:7753}],111:[,,{768:242,769:243,770:244,771:245,772:333,774:335,7
75:559,776:246,777:7887,779:337,780:466,783:525,785:527,795:417,803:7885,8
08:491}],112:[,,{769:7765,775:7767}],114:[,,{769:341,775:7769,780:345,783:
529,785:531,803:7771,807:343,817:7775}],115:[,,{769:347,770:349,775:7777,7
80:353,803:7779,806:537,807:351}],116:[,,{775:7787,776:7831,780:357,803:77
89,806:539,807:355,813:7793,817:7791}],117:[,,{768:249,769:250,770:251,771
:361,772:363,774:365,776:252,777:7911,778:367,779:369,780:468,783:533,785:
535,795:432,803:7909,804:7795,808:371,813:7799,816:7797}],118:[,,{771:7805
,803:7807}],119:[,,{768:7809,769:7811,770:373,775:7815,776:7813,778:7832,8
03:7817}],120:[,,{775:7819,776:7821}],121:[,,{768:7923,769:253,770:375,771
:7929,772:563,775:7823,776:255,777:7927,778:7833,803:7925}],122:[,,{769:37
8,770:7825,775:380,780:382,803:7827,817:7829}],160:[[32],256],168:[[32,776
],256,{768:8173,769:901,834:8129}],170:[[97],256],175:[[32,772],256],178:[
[50],256],179:[[51],256],180:[[32,769],256],181:[[956],256],184:[[32,807],
256],185:[[49],256],186:[[111],256],188:[[49,8260,52],256],189:[[49,8260,5
0],256],190:[[51,8260,52],256],192:[[65,768]],193:[[65,769]],194:[[65,770]
,,{768:7846,769:7844,771:7850,777:7848}],195:[[65,771]],196:[[65,776],,{77
2:478}],197:[[65,778],,{769:506}],198:[,,{769:508,772:482}],199:[[67,807],
,{769:7688}],200:[[69,768]],201:[[69,769]],202:[[69,770],,{768:7872,769:78
70,771:7876,777:7874}],203:[[69,776]],204:[[73,768]],205:[[73,769]],206:[[
73,770]],207:[[73,776],,{769:7726}],209:[[78,771]],210:[[79,768]],211:[[79
,769]],212:[[79,770],,{768:7890,769:7888,771:7894,777:7892}],213:[[79,771]
,,{769:7756,772:556,776:7758}],214:[[79,776],,{772:554}],216:[,,{769:510}]
,217:[[85,768]],218:[[85,769]],219:[[85,770]],220:[[85,776],,{768:475,769:
471,772:469,780:473}],221:[[89,769]],224:[[97,768]],225:[[97,769]],226:[[9
7,770],,{768:7847,769:7845,771:7851,777:7849}],227:[[97,771]],228:[[97,776
],,{772:479}],229:[[97,778],,{769:507}],230:[,,{769:509,772:483}],231:[[99
,807],,{769:7689}],232:[[101,768]],233:[[101,769]],234:[[101,770],,{768:78
73,769:7871,771:7877,777:7875}],235:[[101,776]],236:[[105,768]],237:[[105,
769]],238:[[105,770]],239:[[105,776],,{769:7727}],241:[[110,771]],242:[[11
1,768]],243:[[111,769]],244:[[111,770],,{768:7891,769:7889,771:7895,777:78
93}],245:[[111,771],,{769:7757,772:557,776:7759}],246:[[111,776],,{772:555
}],248:[,,{769:511}],249:[[117,768]],250:[[117,769]],251:[[117,770]],252:[

[117,776],,{768:476,769:472,772:470,780:474}],253:[[121,769]],255:[[121,77
6]]},
256:{256:[[65,772]],257:[[97,772]],258:[[65,774],,{768:7856,769:7854,771:7
860,777:7858}],259:[[97,774],,{768:7857,769:7855,771:7861,777:7859}],260:[
[65,808]],261:[[97,808]],262:[[67,769]],263:[[99,769]],264:[[67,770]],265:
[[99,770]],266:[[67,775]],267:[[99,775]],268:[[67,780]],269:[[99,780]],270
:[[68,780]],271:[[100,780]],274:[[69,772],,{768:7700,769:7702}],275:[[101,
772],,{768:7701,769:7703}],276:[[69,774]],277:[[101,774]],278:[[69,775]],2
79:[[101,775]],280:[[69,808]],281:[[101,808]],282:[[69,780]],283:[[101,780
]],284:[[71,770]],285:[[103,770]],286:[[71,774]],287:[[103,774]],288:[[71,
775]],289:[[103,775]],290:[[71,807]],291:[[103,807]],292:[[72,770]],293:[[
104,770]],296:[[73,771]],297:[[105,771]],298:[[73,772]],299:[[105,772]],30
0:[[73,774]],301:[[105,774]],302:[[73,808]],303:[[105,808]],304:[[73,775]]
,306:[[73,74],256],307:[[105,106],256],308:[[74,770]],309:[[106,770]],310:
[[75,807]],311:[[107,807]],313:[[76,769]],314:[[108,769]],315:[[76,807]],3
16:[[108,807]],317:[[76,780]],318:[[108,780]],319:[[76,183],256],320:[[108
,183],256],323:[[78,769]],324:[[110,769]],325:[[78,807]],326:[[110,807]],3
27:[[78,780]],328:[[110,780]],329:[[700,110],256],332:[[79,772],,{768:7760
,769:7762}],333:[[111,772],,{768:7761,769:7763}],334:[[79,774]],335:[[111,
774]],336:[[79,779]],337:[[111,779]],340:[[82,769]],341:[[114,769]],342:[[
82,807]],343:[[114,807]],344:[[82,780]],345:[[114,780]],346:[[83,769],,{77
5:7780}],347:[[115,769],,{775:7781}],348:[[83,770]],349:[[115,770]],350:[[
83,807]],351:[[115,807]],352:[[83,780],,{775:7782}],353:[[115,780],,{775:7
783}],354:[[84,807]],355:[[116,807]],356:[[84,780]],357:[[116,780]],360:[[
85,771],,{769:7800}],361:[[117,771],,{769:7801}],362:[[85,772],,{776:7802}
],363:[[117,772],,{776:7803}],364:[[85,774]],365:[[117,774]],366:[[85,778]
],367:[[117,778]],368:[[85,779]],369:[[117,779]],370:[[85,808]],371:[[117,
808]],372:[[87,770]],373:[[119,770]],374:[[89,770]],375:[[121,770]],376:[[
89,776]],377:[[90,769]],378:[[122,769]],379:[[90,775]],380:[[122,775]],381
:[[90,780]],382:[[122,780]],383:[[115],256,{775:7835}],416:[[79,795],,{768
:7900,769:7898,771:7904,777:7902,803:7906}],417:[[111,795],,{768:7901,769:
7899,771:7905,777:7903,803:7907}],431:[[85,795],,{768:7914,769:7912,771:79
18,777:7916,803:7920}],432:[[117,795],,{768:7915,769:7913,771:7919,777:791
7,803:7921}],439:[,,{780:494}],452:[[68,381],256],453:[[68,382],256],454:[
[100,382],256],455:[[76,74],256],456:[[76,106],256],457:[[108,106],256],45
8:[[78,74],256],459:[[78,106],256],460:[[110,106],256],461:[[65,780]],462:
[[97,780]],463:[[73,780]],464:[[105,780]],465:[[79,780]],466:[[111,780]],4
67:[[85,780]],468:[[117,780]],469:[[220,772]],470:[[252,772]],471:[[220,76
9]],472:[[252,769]],473:[[220,780]],474:[[252,780]],475:[[220,768]],476:[[
252,768]],478:[[196,772]],479:[[228,772]],480:[[550,772]],481:[[551,772]],
482:[[198,772]],483:[[230,772]],486:[[71,780]],487:[[103,780]],488:[[75,78
0]],489:[[107,780]],490:[[79,808],,{772:492}],491:[[111,808],,{772:493}],4
92:[[490,772]],493:[[491,772]],494:[[439,780]],495:[[658,780]],496:[[106,7
80]],497:[[68,90],256],498:[[68,122],256],499:[[100,122],256],500:[[71,769
]],501:[[103,769]],504:[[78,768]],505:[[110,768]],506:[[197,769]],507:[[22
9,769]],508:[[198,769]],509:[[230,769]],510:[[216,769]],511:[[248,769]],66
045:[,220]},
512:{512:[[65,783]],513:[[97,783]],514:[[65,785]],515:[[97,785]],516:[[69,

783]],517:[[101,783]],518:[[69,785]],519:[[101,785]],520:[[73,783]],521:[[
105,783]],522:[[73,785]],523:[[105,785]],524:[[79,783]],525:[[111,783]],52
6:[[79,785]],527:[[111,785]],528:[[82,783]],529:[[114,783]],530:[[82,785]]
,531:[[114,785]],532:[[85,783]],533:[[117,783]],534:[[85,785]],535:[[117,7
85]],536:[[83,806]],537:[[115,806]],538:[[84,806]],539:[[116,806]],542:[[7
2,780]],543:[[104,780]],550:[[65,775],,{772:480}],551:[[97,775],,{772:481}
],552:[[69,807],,{774:7708}],553:[[101,807],,{774:7709}],554:[[214,772]],5
55:[[246,772]],556:[[213,772]],557:[[245,772]],558:[[79,775],,{772:560}],5
59:[[111,775],,{772:561}],560:[[558,772]],561:[[559,772]],562:[[89,772]],5
63:[[121,772]],658:[,,{780:495}],688:[[104],256],689:[[614],256],690:[[106
],256],691:[[114],256],692:[[633],256],693:[[635],256],694:[[641],256],695
:[[119],256],696:[[121],256],728:[[32,774],256],729:[[32,775],256],730:[[3
2,778],256],731:[[32,808],256],732:[[32,771],256],733:[[32,779],256],736:[
[611],256],737:[[108],256],738:[[115],256],739:[[120],256],740:[[661],256]
,66272:[,220]},
768:{768:[,230],769:[,230],770:[,230],771:[,230],772:[,230],773:[,230],774
:[,230],775:[,230],776:[,230,{769:836}],777:[,230],778:[,230],779:[,230],7
80:[,230],781:[,230],782:[,230],783:[,230],784:[,230],785:[,230],786:[,230
],787:[,230],788:[,230],789:[,232],790:[,220],791:[,220],792:[,220],793:[,
220],794:[,232],795:[,216],796:[,220],797:[,220],798:[,220],799:[,220],800
:[,220],801:[,202],802:[,202],803:[,220],804:[,220],805:[,220],806:[,220],
807:[,202],808:[,202],809:[,220],810:[,220],811:[,220],812:[,220],813:[,22
0],814:[,220],815:[,220],816:[,220],817:[,220],818:[,220],819:[,220],820:[
,1],821:[,1],822:[,1],823:[,1],824:[,1],825:[,220],826:[,220],827:[,220],8
28:[,220],829:[,230],830:[,230],831:[,230],832:[[768],230],833:[[769],230]
,834:[,230],835:[[787],230],836:[[776,769],230],837:[,240],838:[,230],839:
[,220],840:[,220],841:[,220],842:[,230],843:[,230],844:[,230],845:[,220],8
46:[,220],848:[,230],849:[,230],850:[,230],851:[,220],852:[,220],853:[,220
],854:[,220],855:[,230],856:[,232],857:[,220],858:[,220],859:[,230],860:[,
233],861:[,234],862:[,234],863:[,233],864:[,234],865:[,234],866:[,233],867
:[,230],868:[,230],869:[,230],870:[,230],871:[,230],872:[,230],873:[,230],
874:[,230],875:[,230],876:[,230],877:[,230],878:[,230],879:[,230],884:[[69
7]],890:[[32,837],256],894:[[59]],900:[[32,769],256],901:[[168,769]],902:[
[913,769]],903:[[183]],904:[[917,769]],905:[[919,769]],906:[[921,769]],908
:[[927,769]],910:[[933,769]],911:[[937,769]],912:[[970,769]],913:[,,{768:8
122,769:902,772:8121,774:8120,787:7944,788:7945,837:8124}],917:[,,{768:813
6,769:904,787:7960,788:7961}],919:[,,{768:8138,769:905,787:7976,788:7977,8
37:8140}],921:[,,{768:8154,769:906,772:8153,774:8152,776:938,787:7992,788:
7993}],927:[,,{768:8184,769:908,787:8008,788:8009}],929:[,,{788:8172}],933
:[,,{768:8170,769:910,772:8169,774:8168,776:939,788:8025}],937:[,,{768:818
6,769:911,787:8040,788:8041,837:8188}],938:[[921,776]],939:[[933,776]],940
:[[945,769],,{837:8116}],941:[[949,769]],942:[[951,769],,{837:8132}],943:[
[953,769]],944:[[971,769]],945:[,,{768:8048,769:940,772:8113,774:8112,787:
7936,788:7937,834:8118,837:8115}],949:[,,{768:8050,769:941,787:7952,788:79
53}],951:[,,{768:8052,769:942,787:7968,788:7969,834:8134,837:8131}],953:[,
,{768:8054,769:943,772:8145,774:8144,776:970,787:7984,788:7985,834:8150}],
959:[,,{768:8056,769:972,787:8000,788:8001}],961:[,,{787:8164,788:8165}],9
65:[,,{768:8058,769:973,772:8161,774:8160,776:971,787:8016,788:8017,834:81

66}],969:[,,{768:8060,769:974,787:8032,788:8033,834:8182,837:8179}],970:[[
953,776],,{768:8146,769:912,834:8151}],971:[[965,776],,{768:8162,769:944,8
34:8167}],972:[[959,769]],973:[[965,769]],974:[[969,769],,{837:8180}],976:
[[946],256],977:[[952],256],978:[[933],256,{769:979,776:980}],979:[[978,76
9]],980:[[978,776]],981:[[966],256],982:[[960],256],1008:[[954],256],1009:
[[961],256],1010:[[962],256],1012:[[920],256],1013:[[949],256],1017:[[931]
,256],66422:[,230],66423:[,230],66424:[,230],66425:[,230],66426:[,230]},
1024:{1024:[[1045,768]],1025:[[1045,776]],1027:[[1043,769]],1030:[,,{776:1
031}],1031:[[1030,776]],1036:[[1050,769]],1037:[[1048,768]],1038:[[1059,77
4]],1040:[,,{774:1232,776:1234}],1043:[,,{769:1027}],1045:[,,{768:1024,774
:1238,776:1025}],1046:[,,{774:1217,776:1244}],1047:[,,{776:1246}],1048:[,,
{768:1037,772:1250,774:1049,776:1252}],1049:[[1048,774]],1050:[,,{769:1036
}],1054:[,,{776:1254}],1059:[,,{772:1262,774:1038,776:1264,779:1266}],1063
:[,,{776:1268}],1067:[,,{776:1272}],1069:[,,{776:1260}],1072:[,,{774:1233,
776:1235}],1075:[,,{769:1107}],1077:[,,{768:1104,774:1239,776:1105}],1078:
[,,{774:1218,776:1245}],1079:[,,{776:1247}],1080:[,,{768:1117,772:1251,774
:1081,776:1253}],1081:[[1080,774]],1082:[,,{769:1116}],1086:[,,{776:1255}]
,1091:[,,{772:1263,774:1118,776:1265,779:1267}],1095:[,,{776:1269}],1099:[
,,{776:1273}],1101:[,,{776:1261}],1104:[[1077,768]],1105:[[1077,776]],1107
:[[1075,769]],1110:[,,{776:1111}],1111:[[1110,776]],1116:[[1082,769]],1117
:[[1080,768]],1118:[[1091,774]],1140:[,,{783:1142}],1141:[,,{783:1143}],11
42:[[1140,783]],1143:[[1141,783]],1155:[,230],1156:[,230],1157:[,230],1158
:[,230],1159:[,230],1217:[[1046,774]],1218:[[1078,774]],1232:[[1040,774]],
1233:[[1072,774]],1234:[[1040,776]],1235:[[1072,776]],1238:[[1045,774]],12
39:[[1077,774]],1240:[,,{776:1242}],1241:[,,{776:1243}],1242:[[1240,776]],
1243:[[1241,776]],1244:[[1046,776]],1245:[[1078,776]],1246:[[1047,776]],12
47:[[1079,776]],1250:[[1048,772]],1251:[[1080,772]],1252:[[1048,776]],1253
:[[1080,776]],1254:[[1054,776]],1255:[[1086,776]],1256:[,,{776:1258}],1257
:[,,{776:1259}],1258:[[1256,776]],1259:[[1257,776]],1260:[[1069,776]],1261
:[[1101,776]],1262:[[1059,772]],1263:[[1091,772]],1264:[[1059,776]],1265:[
[1091,776]],1266:[[1059,779]],1267:[[1091,779]],1268:[[1063,776]],1269:[[1
095,776]],1272:[[1067,776]],1273:[[1099,776]]},
1280:{1415:[[1381,1410],256],1425:[,220],1426:[,230],1427:[,230],1428:[,23
0],1429:[,230],1430:[,220],1431:[,230],1432:[,230],1433:[,230],1434:[,222]
,1435:[,220],1436:[,230],1437:[,230],1438:[,230],1439:[,230],1440:[,230],1
441:[,230],1442:[,220],1443:[,220],1444:[,220],1445:[,220],1446:[,220],144
7:[,220],1448:[,230],1449:[,230],1450:[,220],1451:[,230],1452:[,230],1453:
[,222],1454:[,228],1455:[,230],1456:[,10],1457:[,11],1458:[,12],1459:[,13]
,1460:[,14],1461:[,15],1462:[,16],1463:[,17],1464:[,18],1465:[,19],1466:[,
19],1467:[,20],1468:[,21],1469:[,22],1471:[,23],1473:[,24],1474:[,25],1476
:[,230],1477:[,220],1479:[,18]},
1536:{1552:[,230],1553:[,230],1554:[,230],1555:[,230],1556:[,230],1557:[,2
30],1558:[,230],1559:[,230],1560:[,30],1561:[,31],1562:[,32],1570:[[1575,1
619]],1571:[[1575,1620]],1572:[[1608,1620]],1573:[[1575,1621]],1574:[[1610
,1620]],1575:[,,{1619:1570,1620:1571,1621:1573}],1608:[,,{1620:1572}],1610
:[,,{1620:1574}],1611:[,27],1612:[,28],1613:[,29],1614:[,30],1615:[,31],16
16:[,32],1617:[,33],1618:[,34],1619:[,230],1620:[,230],1621:[,220],1622:[,
220],1623:[,230],1624:[,230],1625:[,230],1626:[,230],1627:[,230],1628:[,22

0],1629:[,230],1630:[,230],1631:[,220],1648:[,35],1653:[[1575,1652],256],1
654:[[1608,1652],256],1655:[[1735,1652],256],1656:[[1610,1652],256],1728:[
[1749,1620]],1729:[,,{1620:1730}],1730:[[1729,1620]],1746:[,,{1620:1747}],
1747:[[1746,1620]],1749:[,,{1620:1728}],1750:[,230],1751:[,230],1752:[,230
],1753:[,230],1754:[,230],1755:[,230],1756:[,230],1759:[,230],1760:[,230],
1761:[,230],1762:[,230],1763:[,220],1764:[,230],1767:[,230],1768:[,230],17
70:[,220],1771:[,230],1772:[,230],1773:[,220]},
1792:{1809:[,36],1840:[,230],1841:[,220],1842:[,230],1843:[,230],1844:[,22
0],1845:[,230],1846:[,230],1847:[,220],1848:[,220],1849:[,220],1850:[,230]
,1851:[,220],1852:[,220],1853:[,230],1854:[,220],1855:[,230],1856:[,230],1
857:[,230],1858:[,220],1859:[,230],1860:[,220],1861:[,230],1862:[,220],186
3:[,230],1864:[,220],1865:[,230],1866:[,230],2027:[,230],2028:[,230],2029:
[,230],2030:[,230],2031:[,230],2032:[,230],2033:[,230],2034:[,220],2035:[,
230]},
2048:{2070:[,230],2071:[,230],2072:[,230],2073:[,230],2075:[,230],2076:[,2
30],2077:[,230],2078:[,230],2079:[,230],2080:[,230],2081:[,230],2082:[,230
],2083:[,230],2085:[,230],2086:[,230],2087:[,230],2089:[,230],2090:[,230],
2091:[,230],2092:[,230],2093:[,230],2137:[,220],2138:[,220],2139:[,220],22
76:[,230],2277:[,230],2278:[,220],2279:[,230],2280:[,230],2281:[,220],2282
:[,230],2283:[,230],2284:[,230],2285:[,220],2286:[,220],2287:[,220],2288:[
,27],2289:[,28],2290:[,29],2291:[,230],2292:[,230],2293:[,230],2294:[,220]
,2295:[,230],2296:[,230],2297:[,220],2298:[,220],2299:[,230],2300:[,230],2
301:[,230],2302:[,230],2303:[,230]},
2304:{2344:[,,{2364:2345}],2345:[[2344,2364]],2352:[,,{2364:2353}],2353:[[
2352,2364]],2355:[,,{2364:2356}],2356:[[2355,2364]],2364:[,7],2381:[,9],23
85:[,230],2386:[,220],2387:[,230],2388:[,230],2392:[[2325,2364],512],2393:
[[2326,2364],512],2394:[[2327,2364],512],2395:[[2332,2364],512],2396:[[233
7,2364],512],2397:[[2338,2364],512],2398:[[2347,2364],512],2399:[[2351,236
4],512],2492:[,7],2503:[,,{2494:2507,2519:2508}],2507:[[2503,2494]],2508:[
[2503,2519]],2509:[,9],2524:[[2465,2492],512],2525:[[2466,2492],512],2527:
[[2479,2492],512]},
2560:{2611:[[2610,2620],512],2614:[[2616,2620],512],2620:[,7],2637:[,9],26
49:[[2582,2620],512],2650:[[2583,2620],512],2651:[[2588,2620],512],2654:[[
2603,2620],512],2748:[,7],2765:[,9],68109:[,220],68111:[,230],68152:[,230]
,68153:[,1],68154:[,220],68159:[,9],68325:[,230],68326:[,220]},
2816:{2876:[,7],2887:[,,{2878:2891,2902:2888,2903:2892}],2888:[[2887,2902]
],2891:[[2887,2878]],2892:[[2887,2903]],2893:[,9],2908:[[2849,2876],512],2
909:[[2850,2876],512],2962:[,,{3031:2964}],2964:[[2962,3031]],3014:[,,{300
6:3018,3031:3020}],3015:[,,{3006:3019}],3018:[[3014,3006]],3019:[[3015,300
6]],3020:[[3014,3031]],3021:[,9]},
3072:{3142:[,,{3158:3144}],3144:[[3142,3158]],3149:[,9],3157:[,84],3158:[,
91],3260:[,7],3263:[,,{3285:3264}],3264:[[3263,3285]],3270:[,,{3266:3274,3
285:3271,3286:3272}],3271:[[3270,3285]],3272:[[3270,3286]],3274:[[3270,326
6],,{3285:3275}],3275:[[3274,3285]],3277:[,9]},
3328:{3398:[,,{3390:3402,3415:3404}],3399:[,,{3390:3403}],3402:[[3398,3390
]],3403:[[3399,3390]],3404:[[3398,3415]],3405:[,9],3530:[,9],3545:[,,{3530
:3546,3535:3548,3551:3550}],3546:[[3545,3530]],3548:[[3545,3535],,{3530:35
49}],3549:[[3548,3530]],3550:[[3545,3551]]},

3584:{3635:[[3661,3634],256],3640:[,103],3641:[,103],3642:[,9],3656:[,107]
,3657:[,107],3658:[,107],3659:[,107],3763:[[3789,3762],256],3768:[,118],37
69:[,118],3784:[,122],3785:[,122],3786:[,122],3787:[,122],3804:[[3755,3737
],256],3805:[[3755,3745],256]},
3840:{3852:[[3851],256],3864:[,220],3865:[,220],3893:[,220],3895:[,220],38
97:[,216],3907:[[3906,4023],512],3917:[[3916,4023],512],3922:[[3921,4023],
512],3927:[[3926,4023],512],3932:[[3931,4023],512],3945:[[3904,4021],512],
3953:[,129],3954:[,130],3955:[[3953,3954],512],3956:[,132],3957:[[3953,395
6],512],3958:[[4018,3968],512],3959:[[4018,3969],256],3960:[[4019,3968],51
2],3961:[[4019,3969],256],3962:[,130],3963:[,130],3964:[,130],3965:[,130],
3968:[,130],3969:[[3953,3968],512],3970:[,230],3971:[,230],3972:[,9],3974:
[,230],3975:[,230],3987:[[3986,4023],512],3997:[[3996,4023],512],4002:[[40
01,4023],512],4007:[[4006,4023],512],4012:[[4011,4023],512],4025:[[3984,40
21],512],4038:[,220]},
4096:{4133:[,,{4142:4134}],4134:[[4133,4142]],4151:[,7],4153:[,9],4154:[,9
],4237:[,220],4348:[[4316],256],69702:[,9],69759:[,9],69785:[,,{69818:6978
6}],69786:[[69785,69818]],69787:[,,{69818:69788}],69788:[[69787,69818]],69
797:[,,{69818:69803}],69803:[[69797,69818]],69817:[,9],69818:[,7]},
4352:{69888:[,230],69889:[,230],69890:[,230],69934:[[69937,69927]],69935:[
[69938,69927]],69937:[,,{69927:69934}],69938:[,,{69927:69935}],69939:[,9],
69940:[,9],70003:[,7],70080:[,9]},
4608:{70197:[,9],70198:[,7],70377:[,7],70378:[,9]},
4864:{4957:[,230],4958:[,230],4959:[,230],70460:[,7],70471:[,,{70462:70475
,70487:70476}],70475:[[70471,70462]],70476:[[70471,70487]],70477:[,9],7050
2:[,230],70503:[,230],70504:[,230],70505:[,230],70506:[,230],70507:[,230],
70508:[,230],70512:[,230],70513:[,230],70514:[,230],70515:[,230],70516:[,2
30]},
5120:{70841:[,,{70832:70844,70842:70843,70845:70846}],70843:[[70841,70842]
],70844:[[70841,70832]],70846:[[70841,70845]],70850:[,9],70851:[,7]},
5376:{71096:[,,{71087:71098}],71097:[,,{71087:71099}],71098:[[71096,71087]
],71099:[[71097,71087]],71103:[,9],71104:[,7]},
5632:{71231:[,9],71350:[,9],71351:[,7]},
5888:{5908:[,9],5940:[,9],6098:[,9],6109:[,230]},
6144:{6313:[,228]},
6400:{6457:[,222],6458:[,230],6459:[,220]},
6656:{6679:[,230],6680:[,220],6752:[,9],6773:[,230],6774:[,230],6775:[,230
],6776:[,230],6777:[,230],6778:[,230],6779:[,230],6780:[,230],6783:[,220],
6832:[,230],6833:[,230],6834:[,230],6835:[,230],6836:[,230],6837:[,220],68
38:[,220],6839:[,220],6840:[,220],6841:[,220],6842:[,220],6843:[,230],6844
:[,230],6845:[,220]},
6912:{6917:[,,{6965:6918}],6918:[[6917,6965]],6919:[,,{6965:6920}],6920:[[
6919,6965]],6921:[,,{6965:6922}],6922:[[6921,6965]],6923:[,,{6965:6924}],6
924:[[6923,6965]],6925:[,,{6965:6926}],6926:[[6925,6965]],6929:[,,{6965:69
30}],6930:[[6929,6965]],6964:[,7],6970:[,,{6965:6971}],6971:[[6970,6965]],
6972:[,,{6965:6973}],6973:[[6972,6965]],6974:[,,{6965:6976}],6975:[,,{6965
:6977}],6976:[[6974,6965]],6977:[[6975,6965]],6978:[,,{6965:6979}],6979:[[
6978,6965]],6980:[,9],7019:[,230],7020:[,220],7021:[,230],7022:[,230],7023
:[,230],7024:[,230],7025:[,230],7026:[,230],7027:[,230],7082:[,9],7083:[,9

],7142:[,7],7154:[,9],7155:[,9]},
7168:{7223:[,7],7376:[,230],7377:[,230],7378:[,230],7380:[,1],7381:[,220],
7382:[,220],7383:[,220],7384:[,220],7385:[,220],7386:[,230],7387:[,230],73
88:[,220],7389:[,220],7390:[,220],7391:[,220],7392:[,230],7394:[,1],7395:[
,1],7396:[,1],7397:[,1],7398:[,1],7399:[,1],7400:[,1],7405:[,220],7412:[,2
30],7416:[,230],7417:[,230]},
7424:{7468:[[65],256],7469:[[198],256],7470:[[66],256],7472:[[68],256],747
3:[[69],256],7474:[[398],256],7475:[[71],256],7476:[[72],256],7477:[[73],2
56],7478:[[74],256],7479:[[75],256],7480:[[76],256],7481:[[77],256],7482:[
[78],256],7484:[[79],256],7485:[[546],256],7486:[[80],256],7487:[[82],256]
,7488:[[84],256],7489:[[85],256],7490:[[87],256],7491:[[97],256],7492:[[59
2],256],7493:[[593],256],7494:[[7426],256],7495:[[98],256],7496:[[100],256
],7497:[[101],256],7498:[[601],256],7499:[[603],256],7500:[[604],256],7501
:[[103],256],7503:[[107],256],7504:[[109],256],7505:[[331],256],7506:[[111
],256],7507:[[596],256],7508:[[7446],256],7509:[[7447],256],7510:[[112],25
6],7511:[[116],256],7512:[[117],256],7513:[[7453],256],7514:[[623],256],75
15:[[118],256],7516:[[7461],256],7517:[[946],256],7518:[[947],256],7519:[[
948],256],7520:[[966],256],7521:[[967],256],7522:[[105],256],7523:[[114],2
56],7524:[[117],256],7525:[[118],256],7526:[[946],256],7527:[[947],256],75
28:[[961],256],7529:[[966],256],7530:[[967],256],7544:[[1085],256],7579:[[
594],256],7580:[[99],256],7581:[[597],256],7582:[[240],256],7583:[[604],25
6],7584:[[102],256],7585:[[607],256],7586:[[609],256],7587:[[613],256],758
8:[[616],256],7589:[[617],256],7590:[[618],256],7591:[[7547],256],7592:[[6
69],256],7593:[[621],256],7594:[[7557],256],7595:[[671],256],7596:[[625],2
56],7597:[[624],256],7598:[[626],256],7599:[[627],256],7600:[[628],256],76
01:[[629],256],7602:[[632],256],7603:[[642],256],7604:[[643],256],7605:[[4
27],256],7606:[[649],256],7607:[[650],256],7608:[[7452],256],7609:[[651],2
56],7610:[[652],256],7611:[[122],256],7612:[[656],256],7613:[[657],256],76
14:[[658],256],7615:[[952],256],7616:[,230],7617:[,230],7618:[,220],7619:[
,230],7620:[,230],7621:[,230],7622:[,230],7623:[,230],7624:[,230],7625:[,2
30],7626:[,220],7627:[,230],7628:[,230],7629:[,234],7630:[,214],7631:[,220
],7632:[,202],7633:[,230],7634:[,230],7635:[,230],7636:[,230],7637:[,230],
7638:[,230],7639:[,230],7640:[,230],7641:[,230],7642:[,230],7643:[,230],76
44:[,230],7645:[,230],7646:[,230],7647:[,230],7648:[,230],7649:[,230],7650
:[,230],7651:[,230],7652:[,230],7653:[,230],7654:[,230],7655:[,230],7656:[
,230],7657:[,230],7658:[,230],7659:[,230],7660:[,230],7661:[,230],7662:[,2
30],7663:[,230],7664:[,230],7665:[,230],7666:[,230],7667:[,230],7668:[,230
],7669:[,230],7676:[,233],7677:[,220],7678:[,230],7679:[,220]},
7680:{7680:[[65,805]],7681:[[97,805]],7682:[[66,775]],7683:[[98,775]],7684
:[[66,803]],7685:[[98,803]],7686:[[66,817]],7687:[[98,817]],7688:[[199,769
]],7689:[[231,769]],7690:[[68,775]],7691:[[100,775]],7692:[[68,803]],7693:
[[100,803]],7694:[[68,817]],7695:[[100,817]],7696:[[68,807]],7697:[[100,80
7]],7698:[[68,813]],7699:[[100,813]],7700:[[274,768]],7701:[[275,768]],770
2:[[274,769]],7703:[[275,769]],7704:[[69,813]],7705:[[101,813]],7706:[[69,
816]],7707:[[101,816]],7708:[[552,774]],7709:[[553,774]],7710:[[70,775]],7
711:[[102,775]],7712:[[71,772]],7713:[[103,772]],7714:[[72,775]],7715:[[10
4,775]],7716:[[72,803]],7717:[[104,803]],7718:[[72,776]],7719:[[104,776]],
7720:[[72,807]],7721:[[104,807]],7722:[[72,814]],7723:[[104,814]],7724:[[7

3,816]],7725:[[105,816]],7726:[[207,769]],7727:[[239,769]],7728:[[75,769]]
,7729:[[107,769]],7730:[[75,803]],7731:[[107,803]],7732:[[75,817]],7733:[[
107,817]],7734:[[76,803],,{772:7736}],7735:[[108,803],,{772:7737}],7736:[[
7734,772]],7737:[[7735,772]],7738:[[76,817]],7739:[[108,817]],7740:[[76,81
3]],7741:[[108,813]],7742:[[77,769]],7743:[[109,769]],7744:[[77,775]],7745
:[[109,775]],7746:[[77,803]],7747:[[109,803]],7748:[[78,775]],7749:[[110,7
75]],7750:[[78,803]],7751:[[110,803]],7752:[[78,817]],7753:[[110,817]],775
4:[[78,813]],7755:[[110,813]],7756:[[213,769]],7757:[[245,769]],7758:[[213
,776]],7759:[[245,776]],7760:[[332,768]],7761:[[333,768]],7762:[[332,769]]
,7763:[[333,769]],7764:[[80,769]],7765:[[112,769]],7766:[[80,775]],7767:[[
112,775]],7768:[[82,775]],7769:[[114,775]],7770:[[82,803],,{772:7772}],777
1:[[114,803],,{772:7773}],7772:[[7770,772]],7773:[[7771,772]],7774:[[82,81
7]],7775:[[114,817]],7776:[[83,775]],7777:[[115,775]],7778:[[83,803],,{775
:7784}],7779:[[115,803],,{775:7785}],7780:[[346,775]],7781:[[347,775]],778
2:[[352,775]],7783:[[353,775]],7784:[[7778,775]],7785:[[7779,775]],7786:[[
84,775]],7787:[[116,775]],7788:[[84,803]],7789:[[116,803]],7790:[[84,817]]
,7791:[[116,817]],7792:[[84,813]],7793:[[116,813]],7794:[[85,804]],7795:[[
117,804]],7796:[[85,816]],7797:[[117,816]],7798:[[85,813]],7799:[[117,813]
],7800:[[360,769]],7801:[[361,769]],7802:[[362,776]],7803:[[363,776]],7804
:[[86,771]],7805:[[118,771]],7806:[[86,803]],7807:[[118,803]],7808:[[87,76
8]],7809:[[119,768]],7810:[[87,769]],7811:[[119,769]],7812:[[87,776]],7813
:[[119,776]],7814:[[87,775]],7815:[[119,775]],7816:[[87,803]],7817:[[119,8
03]],7818:[[88,775]],7819:[[120,775]],7820:[[88,776]],7821:[[120,776]],782
2:[[89,775]],7823:[[121,775]],7824:[[90,770]],7825:[[122,770]],7826:[[90,8
03]],7827:[[122,803]],7828:[[90,817]],7829:[[122,817]],7830:[[104,817]],78
31:[[116,776]],7832:[[119,778]],7833:[[121,778]],7834:[[97,702],256],7835:
[[383,775]],7840:[[65,803],,{770:7852,774:7862}],7841:[[97,803],,{770:7853
,774:7863}],7842:[[65,777]],7843:[[97,777]],7844:[[194,769]],7845:[[226,76
9]],7846:[[194,768]],7847:[[226,768]],7848:[[194,777]],7849:[[226,777]],78
50:[[194,771]],7851:[[226,771]],7852:[[7840,770]],7853:[[7841,770]],7854:[
[258,769]],7855:[[259,769]],7856:[[258,768]],7857:[[259,768]],7858:[[258,7
77]],7859:[[259,777]],7860:[[258,771]],7861:[[259,771]],7862:[[7840,774]],
7863:[[7841,774]],7864:[[69,803],,{770:7878}],7865:[[101,803],,{770:7879}]
,7866:[[69,777]],7867:[[101,777]],7868:[[69,771]],7869:[[101,771]],7870:[[
202,769]],7871:[[234,769]],7872:[[202,768]],7873:[[234,768]],7874:[[202,77
7]],7875:[[234,777]],7876:[[202,771]],7877:[[234,771]],7878:[[7864,770]],7
879:[[7865,770]],7880:[[73,777]],7881:[[105,777]],7882:[[73,803]],7883:[[1
05,803]],7884:[[79,803],,{770:7896}],7885:[[111,803],,{770:7897}],7886:[[7
9,777]],7887:[[111,777]],7888:[[212,769]],7889:[[244,769]],7890:[[212,768]
],7891:[[244,768]],7892:[[212,777]],7893:[[244,777]],7894:[[212,771]],7895
:[[244,771]],7896:[[7884,770]],7897:[[7885,770]],7898:[[416,769]],7899:[[4
17,769]],7900:[[416,768]],7901:[[417,768]],7902:[[416,777]],7903:[[417,777
]],7904:[[416,771]],7905:[[417,771]],7906:[[416,803]],7907:[[417,803]],790
8:[[85,803]],7909:[[117,803]],7910:[[85,777]],7911:[[117,777]],7912:[[431,
769]],7913:[[432,769]],7914:[[431,768]],7915:[[432,768]],7916:[[431,777]],
7917:[[432,777]],7918:[[431,771]],7919:[[432,771]],7920:[[431,803]],7921:[
[432,803]],7922:[[89,768]],7923:[[121,768]],7924:[[89,803]],7925:[[121,803
]],7926:[[89,777]],7927:[[121,777]],7928:[[89,771]],7929:[[121,771]]},

7936:{7936:[[945,787],,{768:7938,769:7940,834:7942,837:8064}],7937:[[945,7
88],,{768:7939,769:7941,834:7943,837:8065}],7938:[[7936,768],,{837:8066}],
7939:[[7937,768],,{837:8067}],7940:[[7936,769],,{837:8068}],7941:[[7937,76
9],,{837:8069}],7942:[[7936,834],,{837:8070}],7943:[[7937,834],,{837:8071}
],7944:[[913,787],,{768:7946,769:7948,834:7950,837:8072}],7945:[[913,788],
,{768:7947,769:7949,834:7951,837:8073}],7946:[[7944,768],,{837:8074}],7947
:[[7945,768],,{837:8075}],7948:[[7944,769],,{837:8076}],7949:[[7945,769],,
{837:8077}],7950:[[7944,834],,{837:8078}],7951:[[7945,834],,{837:8079}],79
52:[[949,787],,{768:7954,769:7956}],7953:[[949,788],,{768:7955,769:7957}],
7954:[[7952,768]],7955:[[7953,768]],7956:[[7952,769]],7957:[[7953,769]],79
60:[[917,787],,{768:7962,769:7964}],7961:[[917,788],,{768:7963,769:7965}],
7962:[[7960,768]],7963:[[7961,768]],7964:[[7960,769]],7965:[[7961,769]],79
68:[[951,787],,{768:7970,769:7972,834:7974,837:8080}],7969:[[951,788],,{76
8:7971,769:7973,834:7975,837:8081}],7970:[[7968,768],,{837:8082}],7971:[[7
969,768],,{837:8083}],7972:[[7968,769],,{837:8084}],7973:[[7969,769],,{837
:8085}],7974:[[7968,834],,{837:8086}],7975:[[7969,834],,{837:8087}],7976:[
[919,787],,{768:7978,769:7980,834:7982,837:8088}],7977:[[919,788],,{768:79
79,769:7981,834:7983,837:8089}],7978:[[7976,768],,{837:8090}],7979:[[7977,
768],,{837:8091}],7980:[[7976,769],,{837:8092}],7981:[[7977,769],,{837:809
3}],7982:[[7976,834],,{837:8094}],7983:[[7977,834],,{837:8095}],7984:[[953
,787],,{768:7986,769:7988,834:7990}],7985:[[953,788],,{768:7987,769:7989,8
34:7991}],7986:[[7984,768]],7987:[[7985,768]],7988:[[7984,769]],7989:[[798
5,769]],7990:[[7984,834]],7991:[[7985,834]],7992:[[921,787],,{768:7994,769
:7996,834:7998}],7993:[[921,788],,{768:7995,769:7997,834:7999}],7994:[[799
2,768]],7995:[[7993,768]],7996:[[7992,769]],7997:[[7993,769]],7998:[[7992,
834]],7999:[[7993,834]],8000:[[959,787],,{768:8002,769:8004}],8001:[[959,7
88],,{768:8003,769:8005}],8002:[[8000,768]],8003:[[8001,768]],8004:[[8000,
769]],8005:[[8001,769]],8008:[[927,787],,{768:8010,769:8012}],8009:[[927,7
88],,{768:8011,769:8013}],8010:[[8008,768]],8011:[[8009,768]],8012:[[8008,
769]],8013:[[8009,769]],8016:[[965,787],,{768:8018,769:8020,834:8022}],801
7:[[965,788],,{768:8019,769:8021,834:8023}],8018:[[8016,768]],8019:[[8017,
768]],8020:[[8016,769]],8021:[[8017,769]],8022:[[8016,834]],8023:[[8017,83
4]],8025:[[933,788],,{768:8027,769:8029,834:8031}],8027:[[8025,768]],8029:
[[8025,769]],8031:[[8025,834]],8032:[[969,787],,{768:8034,769:8036,834:803
8,837:8096}],8033:[[969,788],,{768:8035,769:8037,834:8039,837:8097}],8034:
[[8032,768],,{837:8098}],8035:[[8033,768],,{837:8099}],8036:[[8032,769],,{
837:8100}],8037:[[8033,769],,{837:8101}],8038:[[8032,834],,{837:8102}],803
9:[[8033,834],,{837:8103}],8040:[[937,787],,{768:8042,769:8044,834:8046,83
7:8104}],8041:[[937,788],,{768:8043,769:8045,834:8047,837:8105}],8042:[[80
40,768],,{837:8106}],8043:[[8041,768],,{837:8107}],8044:[[8040,769],,{837:
8108}],8045:[[8041,769],,{837:8109}],8046:[[8040,834],,{837:8110}],8047:[[
8041,834],,{837:8111}],8048:[[945,768],,{837:8114}],8049:[[940]],8050:[[94
9,768]],8051:[[941]],8052:[[951,768],,{837:8130}],8053:[[942]],8054:[[953,
768]],8055:[[943]],8056:[[959,768]],8057:[[972]],8058:[[965,768]],8059:[[9
73]],8060:[[969,768],,{837:8178}],8061:[[974]],8064:[[7936,837]],8065:[[79
37,837]],8066:[[7938,837]],8067:[[7939,837]],8068:[[7940,837]],8069:[[7941
,837]],8070:[[7942,837]],8071:[[7943,837]],8072:[[7944,837]],8073:[[7945,8
37]],8074:[[7946,837]],8075:[[7947,837]],8076:[[7948,837]],8077:[[7949,837

]],8078:[[7950,837]],8079:[[7951,837]],8080:[[7968,837]],8081:[[7969,837]]
,8082:[[7970,837]],8083:[[7971,837]],8084:[[7972,837]],8085:[[7973,837]],8
086:[[7974,837]],8087:[[7975,837]],8088:[[7976,837]],8089:[[7977,837]],809
0:[[7978,837]],8091:[[7979,837]],8092:[[7980,837]],8093:[[7981,837]],8094:
[[7982,837]],8095:[[7983,837]],8096:[[8032,837]],8097:[[8033,837]],8098:[[
8034,837]],8099:[[8035,837]],8100:[[8036,837]],8101:[[8037,837]],8102:[[80
38,837]],8103:[[8039,837]],8104:[[8040,837]],8105:[[8041,837]],8106:[[8042
,837]],8107:[[8043,837]],8108:[[8044,837]],8109:[[8045,837]],8110:[[8046,8
37]],8111:[[8047,837]],8112:[[945,774]],8113:[[945,772]],8114:[[8048,837]]
,8115:[[945,837]],8116:[[940,837]],8118:[[945,834],,{837:8119}],8119:[[811
8,837]],8120:[[913,774]],8121:[[913,772]],8122:[[913,768]],8123:[[902]],81
24:[[913,837]],8125:[[32,787],256],8126:[[953]],8127:[[32,787],256,{768:81
41,769:8142,834:8143}],8128:[[32,834],256],8129:[[168,834]],8130:[[8052,83
7]],8131:[[951,837]],8132:[[942,837]],8134:[[951,834],,{837:8135}],8135:[[
8134,837]],8136:[[917,768]],8137:[[904]],8138:[[919,768]],8139:[[905]],814
0:[[919,837]],8141:[[8127,768]],8142:[[8127,769]],8143:[[8127,834]],8144:[
[953,774]],8145:[[953,772]],8146:[[970,768]],8147:[[912]],8150:[[953,834]]
,8151:[[970,834]],8152:[[921,774]],8153:[[921,772]],8154:[[921,768]],8155:
[[906]],8157:[[8190,768]],8158:[[8190,769]],8159:[[8190,834]],8160:[[965,7
74]],8161:[[965,772]],8162:[[971,768]],8163:[[944]],8164:[[961,787]],8165:
[[961,788]],8166:[[965,834]],8167:[[971,834]],8168:[[933,774]],8169:[[933,
772]],8170:[[933,768]],8171:[[910]],8172:[[929,788]],8173:[[168,768]],8174
:[[901]],8175:[[96]],8178:[[8060,837]],8179:[[969,837]],8180:[[974,837]],8
182:[[969,834],,{837:8183}],8183:[[8182,837]],8184:[[927,768]],8185:[[908]
],8186:[[937,768]],8187:[[911]],8188:[[937,837]],8189:[[180]],8190:[[32,78
8],256,{768:8157,769:8158,834:8159}]},
8192:{8192:[[8194]],8193:[[8195]],8194:[[32],256],8195:[[32],256],8196:[[3
2],256],8197:[[32],256],8198:[[32],256],8199:[[32],256],8200:[[32],256],82
01:[[32],256],8202:[[32],256],8209:[[8208],256],8215:[[32,819],256],8228:[
[46],256],8229:[[46,46],256],8230:[[46,46,46],256],8239:[[32],256],8243:[[
8242,8242],256],8244:[[8242,8242,8242],256],8246:[[8245,8245],256],8247:[[
8245,8245,8245],256],8252:[[33,33],256],8254:[[32,773],256],8263:[[63,63],
256],8264:[[63,33],256],8265:[[33,63],256],8279:[[8242,8242,8242,8242],256
],8287:[[32],256],8304:[[48],256],8305:[[105],256],8308:[[52],256],8309:[[
53],256],8310:[[54],256],8311:[[55],256],8312:[[56],256],8313:[[57],256],8
314:[[43],256],8315:[[8722],256],8316:[[61],256],8317:[[40],256],8318:[[41
],256],8319:[[110],256],8320:[[48],256],8321:[[49],256],8322:[[50],256],83
23:[[51],256],8324:[[52],256],8325:[[53],256],8326:[[54],256],8327:[[55],2
56],8328:[[56],256],8329:[[57],256],8330:[[43],256],8331:[[8722],256],8332
:[[61],256],8333:[[40],256],8334:[[41],256],8336:[[97],256],8337:[[101],25
6],8338:[[111],256],8339:[[120],256],8340:[[601],256],8341:[[104],256],834
2:[[107],256],8343:[[108],256],8344:[[109],256],8345:[[110],256],8346:[[11
2],256],8347:[[115],256],8348:[[116],256],8360:[[82,115],256],8400:[,230],
8401:[,230],8402:[,1],8403:[,1],8404:[,230],8405:[,230],8406:[,230],8407:[
,230],8408:[,1],8409:[,1],8410:[,1],8411:[,230],8412:[,230],8417:[,230],84
21:[,1],8422:[,1],8423:[,230],8424:[,220],8425:[,230],8426:[,1],8427:[,1],
8428:[,220],8429:[,220],8430:[,220],8431:[,220],8432:[,230]},
8448:{8448:[[97,47,99],256],8449:[[97,47,115],256],8450:[[67],256],8451:[[

176,67],256],8453:[[99,47,111],256],8454:[[99,47,117],256],8455:[[400],256
],8457:[[176,70],256],8458:[[103],256],8459:[[72],256],8460:[[72],256],846
1:[[72],256],8462:[[104],256],8463:[[295],256],8464:[[73],256],8465:[[73],
256],8466:[[76],256],8467:[[108],256],8469:[[78],256],8470:[[78,111],256],
8473:[[80],256],8474:[[81],256],8475:[[82],256],8476:[[82],256],8477:[[82]
,256],8480:[[83,77],256],8481:[[84,69,76],256],8482:[[84,77],256],8484:[[9
0],256],8486:[[937]],8488:[[90],256],8490:[[75]],8491:[[197]],8492:[[66],2
56],8493:[[67],256],8495:[[101],256],8496:[[69],256],8497:[[70],256],8499:
[[77],256],8500:[[111],256],8501:[[1488],256],8502:[[1489],256],8503:[[149
0],256],8504:[[1491],256],8505:[[105],256],8507:[[70,65,88],256],8508:[[96
0],256],8509:[[947],256],8510:[[915],256],8511:[[928],256],8512:[[8721],25
6],8517:[[68],256],8518:[[100],256],8519:[[101],256],8520:[[105],256],8521
:[[106],256],8528:[[49,8260,55],256],8529:[[49,8260,57],256],8530:[[49,826
0,49,48],256],8531:[[49,8260,51],256],8532:[[50,8260,51],256],8533:[[49,82
60,53],256],8534:[[50,8260,53],256],8535:[[51,8260,53],256],8536:[[52,8260
,53],256],8537:[[49,8260,54],256],8538:[[53,8260,54],256],8539:[[49,8260,5
6],256],8540:[[51,8260,56],256],8541:[[53,8260,56],256],8542:[[55,8260,56]
,256],8543:[[49,8260],256],8544:[[73],256],8545:[[73,73],256],8546:[[73,73
,73],256],8547:[[73,86],256],8548:[[86],256],8549:[[86,73],256],8550:[[86,
73,73],256],8551:[[86,73,73,73],256],8552:[[73,88],256],8553:[[88],256],85
54:[[88,73],256],8555:[[88,73,73],256],8556:[[76],256],8557:[[67],256],855
8:[[68],256],8559:[[77],256],8560:[[105],256],8561:[[105,105],256],8562:[[
105,105,105],256],8563:[[105,118],256],8564:[[118],256],8565:[[118,105],25
6],8566:[[118,105,105],256],8567:[[118,105,105,105],256],8568:[[105,120],2
56],8569:[[120],256],8570:[[120,105],256],8571:[[120,105,105],256],8572:[[
108],256],8573:[[99],256],8574:[[100],256],8575:[[109],256],8585:[[48,8260
,51],256],8592:[,,{824:8602}],8594:[,,{824:8603}],8596:[,,{824:8622}],8602
:[[8592,824]],8603:[[8594,824]],8622:[[8596,824]],8653:[[8656,824]],8654:[
[8660,824]],8655:[[8658,824]],8656:[,,{824:8653}],8658:[,,{824:8655}],8660
:[,,{824:8654}]},
8704:{8707:[,,{824:8708}],8708:[[8707,824]],8712:[,,{824:8713}],8713:[[871
2,824]],8715:[,,{824:8716}],8716:[[8715,824]],8739:[,,{824:8740}],8740:[[8
739,824]],8741:[,,{824:8742}],8742:[[8741,824]],8748:[[8747,8747],256],874
9:[[8747,8747,8747],256],8751:[[8750,8750],256],8752:[[8750,8750,8750],256
],8764:[,,{824:8769}],8769:[[8764,824]],8771:[,,{824:8772}],8772:[[8771,82
4]],8773:[,,{824:8775}],8775:[[8773,824]],8776:[,,{824:8777}],8777:[[8776,
824]],8781:[,,{824:8813}],8800:[[61,824]],8801:[,,{824:8802}],8802:[[8801,
824]],8804:[,,{824:8816}],8805:[,,{824:8817}],8813:[[8781,824]],8814:[[60,
824]],8815:[[62,824]],8816:[[8804,824]],8817:[[8805,824]],8818:[,,{824:882
0}],8819:[,,{824:8821}],8820:[[8818,824]],8821:[[8819,824]],8822:[,,{824:8
824}],8823:[,,{824:8825}],8824:[[8822,824]],8825:[[8823,824]],8826:[,,{824
:8832}],8827:[,,{824:8833}],8828:[,,{824:8928}],8829:[,,{824:8929}],8832:[
[8826,824]],8833:[[8827,824]],8834:[,,{824:8836}],8835:[,,{824:8837}],8836
:[[8834,824]],8837:[[8835,824]],8838:[,,{824:8840}],8839:[,,{824:8841}],88
40:[[8838,824]],8841:[[8839,824]],8849:[,,{824:8930}],8850:[,,{824:8931}],
8866:[,,{824:8876}],8872:[,,{824:8877}],8873:[,,{824:8878}],8875:[,,{824:8
879}],8876:[[8866,824]],8877:[[8872,824]],8878:[[8873,824]],8879:[[8875,82
4]],8882:[,,{824:8938}],8883:[,,{824:8939}],8884:[,,{824:8940}],8885:[,,{8

24:8941}],8928:[[8828,824]],8929:[[8829,824]],8930:[[8849,824]],8931:[[885
0,824]],8938:[[8882,824]],8939:[[8883,824]],8940:[[8884,824]],8941:[[8885,
824]]},
8960:{9001:[[12296]],9002:[[12297]]},
9216:{9312:[[49],256],9313:[[50],256],9314:[[51],256],9315:[[52],256],9316
:[[53],256],9317:[[54],256],9318:[[55],256],9319:[[56],256],9320:[[57],256
],9321:[[49,48],256],9322:[[49,49],256],9323:[[49,50],256],9324:[[49,51],2
56],9325:[[49,52],256],9326:[[49,53],256],9327:[[49,54],256],9328:[[49,55]
,256],9329:[[49,56],256],9330:[[49,57],256],9331:[[50,48],256],9332:[[40,4
9,41],256],9333:[[40,50,41],256],9334:[[40,51,41],256],9335:[[40,52,41],25
6],9336:[[40,53,41],256],9337:[[40,54,41],256],9338:[[40,55,41],256],9339:
[[40,56,41],256],9340:[[40,57,41],256],9341:[[40,49,48,41],256],9342:[[40,
49,49,41],256],9343:[[40,49,50,41],256],9344:[[40,49,51,41],256],9345:[[40
,49,52,41],256],9346:[[40,49,53,41],256],9347:[[40,49,54,41],256],9348:[[4
0,49,55,41],256],9349:[[40,49,56,41],256],9350:[[40,49,57,41],256],9351:[[
40,50,48,41],256],9352:[[49,46],256],9353:[[50,46],256],9354:[[51,46],256]
,9355:[[52,46],256],9356:[[53,46],256],9357:[[54,46],256],9358:[[55,46],25
6],9359:[[56,46],256],9360:[[57,46],256],9361:[[49,48,46],256],9362:[[49,4
9,46],256],9363:[[49,50,46],256],9364:[[49,51,46],256],9365:[[49,52,46],25
6],9366:[[49,53,46],256],9367:[[49,54,46],256],9368:[[49,55,46],256],9369:
[[49,56,46],256],9370:[[49,57,46],256],9371:[[50,48,46],256],9372:[[40,97,
41],256],9373:[[40,98,41],256],9374:[[40,99,41],256],9375:[[40,100,41],256
],9376:[[40,101,41],256],9377:[[40,102,41],256],9378:[[40,103,41],256],937
9:[[40,104,41],256],9380:[[40,105,41],256],9381:[[40,106,41],256],9382:[[4
0,107,41],256],9383:[[40,108,41],256],9384:[[40,109,41],256],9385:[[40,110
,41],256],9386:[[40,111,41],256],9387:[[40,112,41],256],9388:[[40,113,41],
256],9389:[[40,114,41],256],9390:[[40,115,41],256],9391:[[40,116,41],256],
9392:[[40,117,41],256],9393:[[40,118,41],256],9394:[[40,119,41],256],9395:
[[40,120,41],256],9396:[[40,121,41],256],9397:[[40,122,41],256],9398:[[65]
,256],9399:[[66],256],9400:[[67],256],9401:[[68],256],9402:[[69],256],9403
:[[70],256],9404:[[71],256],9405:[[72],256],9406:[[73],256],9407:[[74],256
],9408:[[75],256],9409:[[76],256],9410:[[77],256],9411:[[78],256],9412:[[7
9],256],9413:[[80],256],9414:[[81],256],9415:[[82],256],9416:[[83],256],94
17:[[84],256],9418:[[85],256],9419:[[86],256],9420:[[87],256],9421:[[88],2
56],9422:[[89],256],9423:[[90],256],9424:[[97],256],9425:[[98],256],9426:[
[99],256],9427:[[100],256],9428:[[101],256],9429:[[102],256],9430:[[103],2
56],9431:[[104],256],9432:[[105],256],9433:[[106],256],9434:[[107],256],94
35:[[108],256],9436:[[109],256],9437:[[110],256],9438:[[111],256],9439:[[1
12],256],9440:[[113],256],9441:[[114],256],9442:[[115],256],9443:[[116],25
6],9444:[[117],256],9445:[[118],256],9446:[[119],256],9447:[[120],256],944
8:[[121],256],9449:[[122],256],9450:[[48],256]},
10752:{10764:[[8747,8747,8747,8747],256],10868:[[58,58,61],256],10869:[[61
,61],256],10870:[[61,61,61],256],10972:[[10973,824],512]},
11264:{11388:[[106],256],11389:[[86],256],11503:[,230],11504:[,230],11505:
[,230]},
11520:{11631:[[11617],256],11647:[,9],11744:[,230],11745:[,230],11746:[,23
0],11747:[,230],11748:[,230],11749:[,230],11750:[,230],11751:[,230],11752:
[,230],11753:[,230],11754:[,230],11755:[,230],11756:[,230],11757:[,230],11

758:[,230],11759:[,230],11760:[,230],11761:[,230],11762:[,230],11763:[,230
],11764:[,230],11765:[,230],11766:[,230],11767:[,230],11768:[,230],11769:[
,230],11770:[,230],11771:[,230],11772:[,230],11773:[,230],11774:[,230],117
75:[,230]},
11776:{11935:[[27597],256],12019:[[40863],256]},
12032:{12032:[[19968],256],12033:[[20008],256],12034:[[20022],256],12035:[
[20031],256],12036:[[20057],256],12037:[[20101],256],12038:[[20108],256],1
2039:[[20128],256],12040:[[20154],256],12041:[[20799],256],12042:[[20837],
256],12043:[[20843],256],12044:[[20866],256],12045:[[20886],256],12046:[[2
0907],256],12047:[[20960],256],12048:[[20981],256],12049:[[20992],256],120
50:[[21147],256],12051:[[21241],256],12052:[[21269],256],12053:[[21274],25
6],12054:[[21304],256],12055:[[21313],256],12056:[[21340],256],12057:[[213
53],256],12058:[[21378],256],12059:[[21430],256],12060:[[21448],256],12061
:[[21475],256],12062:[[22231],256],12063:[[22303],256],12064:[[22763],256]
,12065:[[22786],256],12066:[[22794],256],12067:[[22805],256],12068:[[22823
],256],12069:[[22899],256],12070:[[23376],256],12071:[[23424],256],12072:[
[23544],256],12073:[[23567],256],12074:[[23586],256],12075:[[23608],256],1
2076:[[23662],256],12077:[[23665],256],12078:[[24027],256],12079:[[24037],
256],12080:[[24049],256],12081:[[24062],256],12082:[[24178],256],12083:[[2
4186],256],12084:[[24191],256],12085:[[24308],256],12086:[[24318],256],120
87:[[24331],256],12088:[[24339],256],12089:[[24400],256],12090:[[24417],25
6],12091:[[24435],256],12092:[[24515],256],12093:[[25096],256],12094:[[251
42],256],12095:[[25163],256],12096:[[25903],256],12097:[[25908],256],12098
:[[25991],256],12099:[[26007],256],12100:[[26020],256],12101:[[26041],256]
,12102:[[26080],256],12103:[[26085],256],12104:[[26352],256],12105:[[26376
],256],12106:[[26408],256],12107:[[27424],256],12108:[[27490],256],12109:[
[27513],256],12110:[[27571],256],12111:[[27595],256],12112:[[27604],256],1
2113:[[27611],256],12114:[[27663],256],12115:[[27668],256],12116:[[27700],
256],12117:[[28779],256],12118:[[29226],256],12119:[[29238],256],12120:[[2
9243],256],12121:[[29247],256],12122:[[29255],256],12123:[[29273],256],121
24:[[29275],256],12125:[[29356],256],12126:[[29572],256],12127:[[29577],25
6],12128:[[29916],256],12129:[[29926],256],12130:[[29976],256],12131:[[299
83],256],12132:[[29992],256],12133:[[30000],256],12134:[[30091],256],12135
:[[30098],256],12136:[[30326],256],12137:[[30333],256],12138:[[30382],256]
,12139:[[30399],256],12140:[[30446],256],12141:[[30683],256],12142:[[30690
],256],12143:[[30707],256],12144:[[31034],256],12145:[[31160],256],12146:[
[31166],256],12147:[[31348],256],12148:[[31435],256],12149:[[31481],256],1
2150:[[31859],256],12151:[[31992],256],12152:[[32566],256],12153:[[32593],
256],12154:[[32650],256],12155:[[32701],256],12156:[[32769],256],12157:[[3
2780],256],12158:[[32786],256],12159:[[32819],256],12160:[[32895],256],121
61:[[32905],256],12162:[[33251],256],12163:[[33258],256],12164:[[33267],25
6],12165:[[33276],256],12166:[[33292],256],12167:[[33307],256],12168:[[333
11],256],12169:[[33390],256],12170:[[33394],256],12171:[[33400],256],12172
:[[34381],256],12173:[[34411],256],12174:[[34880],256],12175:[[34892],256]
,12176:[[34915],256],12177:[[35198],256],12178:[[35211],256],12179:[[35282
],256],12180:[[35328],256],12181:[[35895],256],12182:[[35910],256],12183:[
[35925],256],12184:[[35960],256],12185:[[35997],256],12186:[[36196],256],1
2187:[[36208],256],12188:[[36275],256],12189:[[36523],256],12190:[[36554],

256],12191:[[36763],256],12192:[[36784],256],12193:[[36789],256],12194:[[3
7009],256],12195:[[37193],256],12196:[[37318],256],12197:[[37324],256],121
98:[[37329],256],12199:[[38263],256],12200:[[38272],256],12201:[[38428],25
6],12202:[[38582],256],12203:[[38585],256],12204:[[38632],256],12205:[[387
37],256],12206:[[38750],256],12207:[[38754],256],12208:[[38761],256],12209
:[[38859],256],12210:[[38893],256],12211:[[38899],256],12212:[[38913],256]
,12213:[[39080],256],12214:[[39131],256],12215:[[39135],256],12216:[[39318
],256],12217:[[39321],256],12218:[[39340],256],12219:[[39592],256],12220:[
[39640],256],12221:[[39647],256],12222:[[39717],256],12223:[[39727],256],1
2224:[[39730],256],12225:[[39740],256],12226:[[39770],256],12227:[[40165],
256],12228:[[40565],256],12229:[[40575],256],12230:[[40613],256],12231:[[4
0635],256],12232:[[40643],256],12233:[[40653],256],12234:[[40657],256],122
35:[[40697],256],12236:[[40701],256],12237:[[40718],256],12238:[[40723],25
6],12239:[[40736],256],12240:[[40763],256],12241:[[40778],256],12242:[[407
86],256],12243:[[40845],256],12244:[[40860],256],12245:[[40864],256]},
12288:{12288:[[32],256],12330:[,218],12331:[,228],12332:[,232],12333:[,222
],12334:[,224],12335:[,224],12342:[[12306],256],12344:[[21313],256],12345:
[[21316],256],12346:[[21317],256],12358:[,,{12441:12436}],12363:[,,{12441:
12364}],12364:[[12363,12441]],12365:[,,{12441:12366}],12366:[[12365,12441]
],12367:[,,{12441:12368}],12368:[[12367,12441]],12369:[,,{12441:12370}],12
370:[[12369,12441]],12371:[,,{12441:12372}],12372:[[12371,12441]],12373:[,
,{12441:12374}],12374:[[12373,12441]],12375:[,,{12441:12376}],12376:[[1237
5,12441]],12377:[,,{12441:12378}],12378:[[12377,12441]],12379:[,,{12441:12
380}],12380:[[12379,12441]],12381:[,,{12441:12382}],12382:[[12381,12441]],
12383:[,,{12441:12384}],12384:[[12383,12441]],12385:[,,{12441:12386}],1238
6:[[12385,12441]],12388:[,,{12441:12389}],12389:[[12388,12441]],12390:[,,{
12441:12391}],12391:[[12390,12441]],12392:[,,{12441:12393}],12393:[[12392,
12441]],12399:[,,{12441:12400,12442:12401}],12400:[[12399,12441]],12401:[[
12399,12442]],12402:[,,{12441:12403,12442:12404}],12403:[[12402,12441]],12
404:[[12402,12442]],12405:[,,{12441:12406,12442:12407}],12406:[[12405,1244
1]],12407:[[12405,12442]],12408:[,,{12441:12409,12442:12410}],12409:[[1240
8,12441]],12410:[[12408,12442]],12411:[,,{12441:12412,12442:12413}],12412:
[[12411,12441]],12413:[[12411,12442]],12436:[[12358,12441]],12441:[,8],124
42:[,8],12443:[[32,12441],256],12444:[[32,12442],256],12445:[,,{12441:1244
6}],12446:[[12445,12441]],12447:[[12424,12426],256],12454:[,,{12441:12532}
],12459:[,,{12441:12460}],12460:[[12459,12441]],12461:[,,{12441:12462}],12
462:[[12461,12441]],12463:[,,{12441:12464}],12464:[[12463,12441]],12465:[,
,{12441:12466}],12466:[[12465,12441]],12467:[,,{12441:12468}],12468:[[1246
7,12441]],12469:[,,{12441:12470}],12470:[[12469,12441]],12471:[,,{12441:12
472}],12472:[[12471,12441]],12473:[,,{12441:12474}],12474:[[12473,12441]],
12475:[,,{12441:12476}],12476:[[12475,12441]],12477:[,,{12441:12478}],1247
8:[[12477,12441]],12479:[,,{12441:12480}],12480:[[12479,12441]],12481:[,,{
12441:12482}],12482:[[12481,12441]],12484:[,,{12441:12485}],12485:[[12484,
12441]],12486:[,,{12441:12487}],12487:[[12486,12441]],12488:[,,{12441:1248
9}],12489:[[12488,12441]],12495:[,,{12441:12496,12442:12497}],12496:[[1249
5,12441]],12497:[[12495,12442]],12498:[,,{12441:12499,12442:12500}],12499:
[[12498,12441]],12500:[[12498,12442]],12501:[,,{12441:12502,12442:12503}],
12502:[[12501,12441]],12503:[[12501,12442]],12504:[,,{12441:12505,12442:12

506}],12505:[[12504,12441]],12506:[[12504,12442]],12507:[,,{12441:12508,12
442:12509}],12508:[[12507,12441]],12509:[[12507,12442]],12527:[,,{12441:12
535}],12528:[,,{12441:12536}],12529:[,,{12441:12537}],12530:[,,{12441:1253
8}],12532:[[12454,12441]],12535:[[12527,12441]],12536:[[12528,12441]],1253
7:[[12529,12441]],12538:[[12530,12441]],12541:[,,{12441:12542}],12542:[[12
541,12441]],12543:[[12467,12488],256]},
12544:{12593:[[4352],256],12594:[[4353],256],12595:[[4522],256],12596:[[43
54],256],12597:[[4524],256],12598:[[4525],256],12599:[[4355],256],12600:[[
4356],256],12601:[[4357],256],12602:[[4528],256],12603:[[4529],256],12604:
[[4530],256],12605:[[4531],256],12606:[[4532],256],12607:[[4533],256],1260
8:[[4378],256],12609:[[4358],256],12610:[[4359],256],12611:[[4360],256],12
612:[[4385],256],12613:[[4361],256],12614:[[4362],256],12615:[[4363],256],
12616:[[4364],256],12617:[[4365],256],12618:[[4366],256],12619:[[4367],256
],12620:[[4368],256],12621:[[4369],256],12622:[[4370],256],12623:[[4449],2
56],12624:[[4450],256],12625:[[4451],256],12626:[[4452],256],12627:[[4453]
,256],12628:[[4454],256],12629:[[4455],256],12630:[[4456],256],12631:[[445
7],256],12632:[[4458],256],12633:[[4459],256],12634:[[4460],256],12635:[[4
461],256],12636:[[4462],256],12637:[[4463],256],12638:[[4464],256],12639:[
[4465],256],12640:[[4466],256],12641:[[4467],256],12642:[[4468],256],12643
:[[4469],256],12644:[[4448],256],12645:[[4372],256],12646:[[4373],256],126
47:[[4551],256],12648:[[4552],256],12649:[[4556],256],12650:[[4558],256],1
2651:[[4563],256],12652:[[4567],256],12653:[[4569],256],12654:[[4380],256]
,12655:[[4573],256],12656:[[4575],256],12657:[[4381],256],12658:[[4382],25
6],12659:[[4384],256],12660:[[4386],256],12661:[[4387],256],12662:[[4391],
256],12663:[[4393],256],12664:[[4395],256],12665:[[4396],256],12666:[[4397
],256],12667:[[4398],256],12668:[[4399],256],12669:[[4402],256],12670:[[44
06],256],12671:[[4416],256],12672:[[4423],256],12673:[[4428],256],12674:[[
4593],256],12675:[[4594],256],12676:[[4439],256],12677:[[4440],256],12678:
[[4441],256],12679:[[4484],256],12680:[[4485],256],12681:[[4488],256],1268
2:[[4497],256],12683:[[4498],256],12684:[[4500],256],12685:[[4510],256],12
686:[[4513],256],12690:[[19968],256],12691:[[20108],256],12692:[[19977],25
6],12693:[[22235],256],12694:[[19978],256],12695:[[20013],256],12696:[[199
79],256],12697:[[30002],256],12698:[[20057],256],12699:[[19993],256],12700
:[[19969],256],12701:[[22825],256],12702:[[22320],256],12703:[[20154],256]
},
12800:{12800:[[40,4352,41],256],12801:[[40,4354,41],256],12802:[[40,4355,4
1],256],12803:[[40,4357,41],256],12804:[[40,4358,41],256],12805:[[40,4359,
41],256],12806:[[40,4361,41],256],12807:[[40,4363,41],256],12808:[[40,4364
,41],256],12809:[[40,4366,41],256],12810:[[40,4367,41],256],12811:[[40,436
8,41],256],12812:[[40,4369,41],256],12813:[[40,4370,41],256],12814:[[40,43
52,4449,41],256],12815:[[40,4354,4449,41],256],12816:[[40,4355,4449,41],25
6],12817:[[40,4357,4449,41],256],12818:[[40,4358,4449,41],256],12819:[[40,
4359,4449,41],256],12820:[[40,4361,4449,41],256],12821:[[40,4363,4449,41],
256],12822:[[40,4364,4449,41],256],12823:[[40,4366,4449,41],256],12824:[[4
0,4367,4449,41],256],12825:[[40,4368,4449,41],256],12826:[[40,4369,4449,41
],256],12827:[[40,4370,4449,41],256],12828:[[40,4364,4462,41],256],12829:[
[40,4363,4457,4364,4453,4523,41],256],12830:[[40,4363,4457,4370,4462,41],2
56],12832:[[40,19968,41],256],12833:[[40,20108,41],256],12834:[[40,19977,4

1],256],12835:[[40,22235,41],256],12836:[[40,20116,41],256],12837:[[40,208
45,41],256],12838:[[40,19971,41],256],12839:[[40,20843,41],256],12840:[[40
,20061,41],256],12841:[[40,21313,41],256],12842:[[40,26376,41],256],12843:
[[40,28779,41],256],12844:[[40,27700,41],256],12845:[[40,26408,41],256],12
846:[[40,37329,41],256],12847:[[40,22303,41],256],12848:[[40,26085,41],256
],12849:[[40,26666,41],256],12850:[[40,26377,41],256],12851:[[40,31038,41]
,256],12852:[[40,21517,41],256],12853:[[40,29305,41],256],12854:[[40,36001
,41],256],12855:[[40,31069,41],256],12856:[[40,21172,41],256],12857:[[40,2
0195,41],256],12858:[[40,21628,41],256],12859:[[40,23398,41],256],12860:[[
40,30435,41],256],12861:[[40,20225,41],256],12862:[[40,36039,41],256],1286
3:[[40,21332,41],256],12864:[[40,31085,41],256],12865:[[40,20241,41],256],
12866:[[40,33258,41],256],12867:[[40,33267,41],256],12868:[[21839],256],12
869:[[24188],256],12870:[[25991],256],12871:[[31631],256],12880:[[80,84,69
],256],12881:[[50,49],256],12882:[[50,50],256],12883:[[50,51],256],12884:[
[50,52],256],12885:[[50,53],256],12886:[[50,54],256],12887:[[50,55],256],1
2888:[[50,56],256],12889:[[50,57],256],12890:[[51,48],256],12891:[[51,49],
256],12892:[[51,50],256],12893:[[51,51],256],12894:[[51,52],256],12895:[[5
1,53],256],12896:[[4352],256],12897:[[4354],256],12898:[[4355],256],12899:
[[4357],256],12900:[[4358],256],12901:[[4359],256],12902:[[4361],256],1290
3:[[4363],256],12904:[[4364],256],12905:[[4366],256],12906:[[4367],256],12
907:[[4368],256],12908:[[4369],256],12909:[[4370],256],12910:[[4352,4449],
256],12911:[[4354,4449],256],12912:[[4355,4449],256],12913:[[4357,4449],25
6],12914:[[4358,4449],256],12915:[[4359,4449],256],12916:[[4361,4449],256]
,12917:[[4363,4449],256],12918:[[4364,4449],256],12919:[[4366,4449],256],1
2920:[[4367,4449],256],12921:[[4368,4449],256],12922:[[4369,4449],256],129
23:[[4370,4449],256],12924:[[4366,4449,4535,4352,4457],256],12925:[[4364,4
462,4363,4468],256],12926:[[4363,4462],256],12928:[[19968],256],12929:[[20
108],256],12930:[[19977],256],12931:[[22235],256],12932:[[20116],256],1293
3:[[20845],256],12934:[[19971],256],12935:[[20843],256],12936:[[20061],256
],12937:[[21313],256],12938:[[26376],256],12939:[[28779],256],12940:[[2770
0],256],12941:[[26408],256],12942:[[37329],256],12943:[[22303],256],12944:
[[26085],256],12945:[[26666],256],12946:[[26377],256],12947:[[31038],256],
12948:[[21517],256],12949:[[29305],256],12950:[[36001],256],12951:[[31069]
,256],12952:[[21172],256],12953:[[31192],256],12954:[[30007],256],12955:[[
22899],256],12956:[[36969],256],12957:[[20778],256],12958:[[21360],256],12
959:[[27880],256],12960:[[38917],256],12961:[[20241],256],12962:[[20889],2
56],12963:[[27491],256],12964:[[19978],256],12965:[[20013],256],12966:[[19
979],256],12967:[[24038],256],12968:[[21491],256],12969:[[21307],256],1297
0:[[23447],256],12971:[[23398],256],12972:[[30435],256],12973:[[20225],256
],12974:[[36039],256],12975:[[21332],256],12976:[[22812],256],12977:[[51,5
4],256],12978:[[51,55],256],12979:[[51,56],256],12980:[[51,57],256],12981:
[[52,48],256],12982:[[52,49],256],12983:[[52,50],256],12984:[[52,51],256],
12985:[[52,52],256],12986:[[52,53],256],12987:[[52,54],256],12988:[[52,55]
,256],12989:[[52,56],256],12990:[[52,57],256],12991:[[53,48],256],12992:[[
49,26376],256],12993:[[50,26376],256],12994:[[51,26376],256],12995:[[52,26
376],256],12996:[[53,26376],256],12997:[[54,26376],256],12998:[[55,26376],
256],12999:[[56,26376],256],13000:[[57,26376],256],13001:[[49,48,26376],25
6],13002:[[49,49,26376],256],13003:[[49,50,26376],256],13004:[[72,103],256

],13005:[[101,114,103],256],13006:[[101,86],256],13007:[[76,84,68],256],13
008:[[12450],256],13009:[[12452],256],13010:[[12454],256],13011:[[12456],2
56],13012:[[12458],256],13013:[[12459],256],13014:[[12461],256],13015:[[12
463],256],13016:[[12465],256],13017:[[12467],256],13018:[[12469],256],1301
9:[[12471],256],13020:[[12473],256],13021:[[12475],256],13022:[[12477],256
],13023:[[12479],256],13024:[[12481],256],13025:[[12484],256],13026:[[1248
6],256],13027:[[12488],256],13028:[[12490],256],13029:[[12491],256],13030:
[[12492],256],13031:[[12493],256],13032:[[12494],256],13033:[[12495],256],
13034:[[12498],256],13035:[[12501],256],13036:[[12504],256],13037:[[12507]
,256],13038:[[12510],256],13039:[[12511],256],13040:[[12512],256],13041:[[
12513],256],13042:[[12514],256],13043:[[12516],256],13044:[[12518],256],13
045:[[12520],256],13046:[[12521],256],13047:[[12522],256],13048:[[12523],2
56],13049:[[12524],256],13050:[[12525],256],13051:[[12527],256],13052:[[12
528],256],13053:[[12529],256],13054:[[12530],256]},
13056:{13056:[[12450,12497,12540,12488],256],13057:[[12450,12523,12501,124
49],256],13058:[[12450,12531,12506,12450],256],13059:[[12450,12540,12523],
256],13060:[[12452,12491,12531,12464],256],13061:[[12452,12531,12481],256]
,13062:[[12454,12457,12531],256],13063:[[12456,12473,12463,12540,12489],25
6],13064:[[12456,12540,12459,12540],256],13065:[[12458,12531,12473],256],1
3066:[[12458,12540,12512],256],13067:[[12459,12452,12522],256],13068:[[124
59,12521,12483,12488],256],13069:[[12459,12525,12522,12540],256],13070:[[1
2460,12525,12531],256],13071:[[12460,12531,12510],256],13072:[[12462,12460
],256],13073:[[12462,12491,12540],256],13074:[[12461,12517,12522,12540],25
6],13075:[[12462,12523,12480,12540],256],13076:[[12461,12525],256],13077:[
[12461,12525,12464,12521,12512],256],13078:[[12461,12525,12513,12540,12488
,12523],256],13079:[[12461,12525,12527,12483,12488],256],13080:[[12464,125
21,12512],256],13081:[[12464,12521,12512,12488,12531],256],13082:[[12463,1
2523,12476,12452,12525],256],13083:[[12463,12525,12540,12493],256],13084:[
[12465,12540,12473],256],13085:[[12467,12523,12490],256],13086:[[12467,125
40,12509],256],13087:[[12469,12452,12463,12523],256],13088:[[12469,12531,1
2481,12540,12512],256],13089:[[12471,12522,12531,12464],256],13090:[[12475
,12531,12481],256],13091:[[12475,12531,12488],256],13092:[[12480,12540,124
73],256],13093:[[12487,12471],256],13094:[[12489,12523],256],13095:[[12488
,12531],256],13096:[[12490,12494],256],13097:[[12494,12483,12488],256],130
98:[[12495,12452,12484],256],13099:[[12497,12540,12475,12531,12488],256],1
3100:[[12497,12540,12484],256],13101:[[12496,12540,12524,12523],256],13102
:[[12500,12450,12473,12488,12523],256],13103:[[12500,12463,12523],256],131
04:[[12500,12467],256],13105:[[12499,12523],256],13106:[[12501,12449,12521
,12483,12489],256],13107:[[12501,12451,12540,12488],256],13108:[[12502,124
83,12471,12455,12523],256],13109:[[12501,12521,12531],256],13110:[[12504,1
2463,12479,12540,12523],256],13111:[[12506,12477],256],13112:[[12506,12491
,12498],256],13113:[[12504,12523,12484],256],13114:[[12506,12531,12473],25
6],13115:[[12506,12540,12472],256],13116:[[12505,12540,12479],256],13117:[
[12509,12452,12531,12488],256],13118:[[12508,12523,12488],256],13119:[[125
07,12531],256],13120:[[12509,12531,12489],256],13121:[[12507,12540,12523],
256],13122:[[12507,12540,12531],256],13123:[[12510,12452,12463,12525],256]
,13124:[[12510,12452,12523],256],13125:[[12510,12483,12495],256],13126:[[1
2510,12523,12463],256],13127:[[12510,12531,12471,12519,12531],256],13128:[

[12511,12463,12525,12531],256],13129:[[12511,12522],256],13130:[[12511,125
22,12496,12540,12523],256],13131:[[12513,12460],256],13132:[[12513,12460,1
2488,12531],256],13133:[[12513,12540,12488,12523],256],13134:[[12516,12540
,12489],256],13135:[[12516,12540,12523],256],13136:[[12518,12450,12531],25
6],13137:[[12522,12483,12488,12523],256],13138:[[12522,12521],256],13139:[
[12523,12500,12540],256],13140:[[12523,12540,12502,12523],256],13141:[[125
24,12512],256],13142:[[12524,12531,12488,12466,12531],256],13143:[[12527,1
2483,12488],256],13144:[[48,28857],256],13145:[[49,28857],256],13146:[[50,
28857],256],13147:[[51,28857],256],13148:[[52,28857],256],13149:[[53,28857
],256],13150:[[54,28857],256],13151:[[55,28857],256],13152:[[56,28857],256
],13153:[[57,28857],256],13154:[[49,48,28857],256],13155:[[49,49,28857],25
6],13156:[[49,50,28857],256],13157:[[49,51,28857],256],13158:[[49,52,28857
],256],13159:[[49,53,28857],256],13160:[[49,54,28857],256],13161:[[49,55,2
8857],256],13162:[[49,56,28857],256],13163:[[49,57,28857],256],13164:[[50,
48,28857],256],13165:[[50,49,28857],256],13166:[[50,50,28857],256],13167:[
[50,51,28857],256],13168:[[50,52,28857],256],13169:[[104,80,97],256],13170
:[[100,97],256],13171:[[65,85],256],13172:[[98,97,114],256],13173:[[111,86
],256],13174:[[112,99],256],13175:[[100,109],256],13176:[[100,109,178],256
],13177:[[100,109,179],256],13178:[[73,85],256],13179:[[24179,25104],256],
13180:[[26157,21644],256],13181:[[22823,27491],256],13182:[[26126,27835],2
56],13183:[[26666,24335,20250,31038],256],13184:[[112,65],256],13185:[[110
,65],256],13186:[[956,65],256],13187:[[109,65],256],13188:[[107,65],256],1
3189:[[75,66],256],13190:[[77,66],256],13191:[[71,66],256],13192:[[99,97,1
08],256],13193:[[107,99,97,108],256],13194:[[112,70],256],13195:[[110,70],
256],13196:[[956,70],256],13197:[[956,103],256],13198:[[109,103],256],1319
9:[[107,103],256],13200:[[72,122],256],13201:[[107,72,122],256],13202:[[77
,72,122],256],13203:[[71,72,122],256],13204:[[84,72,122],256],13205:[[956,
8467],256],13206:[[109,8467],256],13207:[[100,8467],256],13208:[[107,8467]
,256],13209:[[102,109],256],13210:[[110,109],256],13211:[[956,109],256],13
212:[[109,109],256],13213:[[99,109],256],13214:[[107,109],256],13215:[[109
,109,178],256],13216:[[99,109,178],256],13217:[[109,178],256],13218:[[107,
109,178],256],13219:[[109,109,179],256],13220:[[99,109,179],256],13221:[[1
09,179],256],13222:[[107,109,179],256],13223:[[109,8725,115],256],13224:[[
109,8725,115,178],256],13225:[[80,97],256],13226:[[107,80,97],256],13227:[
[77,80,97],256],13228:[[71,80,97],256],13229:[[114,97,100],256],13230:[[11
4,97,100,8725,115],256],13231:[[114,97,100,8725,115,178],256],13232:[[112,
115],256],13233:[[110,115],256],13234:[[956,115],256],13235:[[109,115],256
],13236:[[112,86],256],13237:[[110,86],256],13238:[[956,86],256],13239:[[1
09,86],256],13240:[[107,86],256],13241:[[77,86],256],13242:[[112,87],256],
13243:[[110,87],256],13244:[[956,87],256],13245:[[109,87],256],13246:[[107
,87],256],13247:[[77,87],256],13248:[[107,937],256],13249:[[77,937],256],1
3250:[[97,46,109,46],256],13251:[[66,113],256],13252:[[99,99],256],13253:[
[99,100],256],13254:[[67,8725,107,103],256],13255:[[67,111,46],256],13256:
[[100,66],256],13257:[[71,121],256],13258:[[104,97],256],13259:[[72,80],25
6],13260:[[105,110],256],13261:[[75,75],256],13262:[[75,77],256],13263:[[1
07,116],256],13264:[[108,109],256],13265:[[108,110],256],13266:[[108,111,1
03],256],13267:[[108,120],256],13268:[[109,98],256],13269:[[109,105,108],2
56],13270:[[109,111,108],256],13271:[[80,72],256],13272:[[112,46,109,46],2

56],13273:[[80,80,77],256],13274:[[80,82],256],13275:[[115,114],256],13276
:[[83,118],256],13277:[[87,98],256],13278:[[86,8725,109],256],13279:[[65,8
725,109],256],13280:[[49,26085],256],13281:[[50,26085],256],13282:[[51,260
85],256],13283:[[52,26085],256],13284:[[53,26085],256],13285:[[54,26085],2
56],13286:[[55,26085],256],13287:[[56,26085],256],13288:[[57,26085],256],1
3289:[[49,48,26085],256],13290:[[49,49,26085],256],13291:[[49,50,26085],25
6],13292:[[49,51,26085],256],13293:[[49,52,26085],256],13294:[[49,53,26085
],256],13295:[[49,54,26085],256],13296:[[49,55,26085],256],13297:[[49,56,2
6085],256],13298:[[49,57,26085],256],13299:[[50,48,26085],256],13300:[[50,
49,26085],256],13301:[[50,50,26085],256],13302:[[50,51,26085],256],13303:[
[50,52,26085],256],13304:[[50,53,26085],256],13305:[[50,54,26085],256],133
06:[[50,55,26085],256],13307:[[50,56,26085],256],13308:[[50,57,26085],256]
,13309:[[51,48,26085],256],13310:[[51,49,26085],256],13311:[[103,97,108],2
56]},
27136:{92912:[,1],92913:[,1],92914:[,1],92915:[,1],92916:[,1]},
27392:{92976:[,230],92977:[,230],92978:[,230],92979:[,230],92980:[,230],92
981:[,230],92982:[,230]},
42496:{42607:[,230],42612:[,230],42613:[,230],42614:[,230],42615:[,230],42
616:[,230],42617:[,230],42618:[,230],42619:[,230],42620:[,230],42621:[,230
],42652:[[1098],256],42653:[[1100],256],42655:[,230],42736:[,230],42737:[,
230]},
42752:{42864:[[42863],256],43000:[[294],256],43001:[[339],256]},
43008:{43014:[,9],43204:[,9],43232:[,230],43233:[,230],43234:[,230],43235:
[,230],43236:[,230],43237:[,230],43238:[,230],43239:[,230],43240:[,230],43
241:[,230],43242:[,230],43243:[,230],43244:[,230],43245:[,230],43246:[,230
],43247:[,230],43248:[,230],43249:[,230]},
43264:{43307:[,220],43308:[,220],43309:[,220],43347:[,9],43443:[,7],43456:
[,9]},
43520:{43696:[,230],43698:[,230],43699:[,230],43700:[,220],43703:[,230],43
704:[,230],43710:[,230],43711:[,230],43713:[,230],43766:[,9]},
43776:{43868:[[42791],256],43869:[[43831],256],43870:[[619],256],43871:[[4
3858],256],44013:[,9]},
48128:{113822:[,1]},
53504:{119134:[[119127,119141],512],119135:[[119128,119141],512],119136:[[
119135,119150],512],119137:[[119135,119151],512],119138:[[119135,119152],5
12],119139:[[119135,119153],512],119140:[[119135,119154],512],119141:[,216
],119142:[,216],119143:[,1],119144:[,1],119145:[,1],119149:[,226],119150:[
,216],119151:[,216],119152:[,216],119153:[,216],119154:[,216],119163:[,220
],119164:[,220],119165:[,220],119166:[,220],119167:[,220],119168:[,220],11
9169:[,220],119170:[,220],119173:[,230],119174:[,230],119175:[,230],119176
:[,230],119177:[,230],119178:[,220],119179:[,220],119210:[,230],119211:[,2
30],119212:[,230],119213:[,230],119227:[[119225,119141],512],119228:[[1192
26,119141],512],119229:[[119227,119150],512],119230:[[119228,119150],512],
119231:[[119227,119151],512],119232:[[119228,119151],512]},
53760:{119362:[,230],119363:[,230],119364:[,230]},
54272:{119808:[[65],256],119809:[[66],256],119810:[[67],256],119811:[[68],
256],119812:[[69],256],119813:[[70],256],119814:[[71],256],119815:[[72],25
6],119816:[[73],256],119817:[[74],256],119818:[[75],256],119819:[[76],256]

,119820:[[77],256],119821:[[78],256],119822:[[79],256],119823:[[80],256],1
19824:[[81],256],119825:[[82],256],119826:[[83],256],119827:[[84],256],119
828:[[85],256],119829:[[86],256],119830:[[87],256],119831:[[88],256],11983
2:[[89],256],119833:[[90],256],119834:[[97],256],119835:[[98],256],119836:
[[99],256],119837:[[100],256],119838:[[101],256],119839:[[102],256],119840
:[[103],256],119841:[[104],256],119842:[[105],256],119843:[[106],256],1198
44:[[107],256],119845:[[108],256],119846:[[109],256],119847:[[110],256],11
9848:[[111],256],119849:[[112],256],119850:[[113],256],119851:[[114],256],
119852:[[115],256],119853:[[116],256],119854:[[117],256],119855:[[118],256
],119856:[[119],256],119857:[[120],256],119858:[[121],256],119859:[[122],2
56],119860:[[65],256],119861:[[66],256],119862:[[67],256],119863:[[68],256
],119864:[[69],256],119865:[[70],256],119866:[[71],256],119867:[[72],256],
119868:[[73],256],119869:[[74],256],119870:[[75],256],119871:[[76],256],11
9872:[[77],256],119873:[[78],256],119874:[[79],256],119875:[[80],256],1198
76:[[81],256],119877:[[82],256],119878:[[83],256],119879:[[84],256],119880
:[[85],256],119881:[[86],256],119882:[[87],256],119883:[[88],256],119884:[
[89],256],119885:[[90],256],119886:[[97],256],119887:[[98],256],119888:[[9
9],256],119889:[[100],256],119890:[[101],256],119891:[[102],256],119892:[[
103],256],119894:[[105],256],119895:[[106],256],119896:[[107],256],119897:
[[108],256],119898:[[109],256],119899:[[110],256],119900:[[111],256],11990
1:[[112],256],119902:[[113],256],119903:[[114],256],119904:[[115],256],119
905:[[116],256],119906:[[117],256],119907:[[118],256],119908:[[119],256],1
19909:[[120],256],119910:[[121],256],119911:[[122],256],119912:[[65],256],
119913:[[66],256],119914:[[67],256],119915:[[68],256],119916:[[69],256],11
9917:[[70],256],119918:[[71],256],119919:[[72],256],119920:[[73],256],1199
21:[[74],256],119922:[[75],256],119923:[[76],256],119924:[[77],256],119925
:[[78],256],119926:[[79],256],119927:[[80],256],119928:[[81],256],119929:[
[82],256],119930:[[83],256],119931:[[84],256],119932:[[85],256],119933:[[8
6],256],119934:[[87],256],119935:[[88],256],119936:[[89],256],119937:[[90]
,256],119938:[[97],256],119939:[[98],256],119940:[[99],256],119941:[[100],
256],119942:[[101],256],119943:[[102],256],119944:[[103],256],119945:[[104
],256],119946:[[105],256],119947:[[106],256],119948:[[107],256],119949:[[1
08],256],119950:[[109],256],119951:[[110],256],119952:[[111],256],119953:[
[112],256],119954:[[113],256],119955:[[114],256],119956:[[115],256],119957
:[[116],256],119958:[[117],256],119959:[[118],256],119960:[[119],256],1199
61:[[120],256],119962:[[121],256],119963:[[122],256],119964:[[65],256],119
966:[[67],256],119967:[[68],256],119970:[[71],256],119973:[[74],256],11997
4:[[75],256],119977:[[78],256],119978:[[79],256],119979:[[80],256],119980:
[[81],256],119982:[[83],256],119983:[[84],256],119984:[[85],256],119985:[[
86],256],119986:[[87],256],119987:[[88],256],119988:[[89],256],119989:[[90
],256],119990:[[97],256],119991:[[98],256],119992:[[99],256],119993:[[100]
,256],119995:[[102],256],119997:[[104],256],119998:[[105],256],119999:[[10
6],256],120000:[[107],256],120001:[[108],256],120002:[[109],256],120003:[[
110],256],120005:[[112],256],120006:[[113],256],120007:[[114],256],120008:
[[115],256],120009:[[116],256],120010:[[117],256],120011:[[118],256],12001
2:[[119],256],120013:[[120],256],120014:[[121],256],120015:[[122],256],120
016:[[65],256],120017:[[66],256],120018:[[67],256],120019:[[68],256],12002
0:[[69],256],120021:[[70],256],120022:[[71],256],120023:[[72],256],120024:

[[73],256],120025:[[74],256],120026:[[75],256],120027:[[76],256],120028:[[
77],256],120029:[[78],256],120030:[[79],256],120031:[[80],256],120032:[[81
],256],120033:[[82],256],120034:[[83],256],120035:[[84],256],120036:[[85],
256],120037:[[86],256],120038:[[87],256],120039:[[88],256],120040:[[89],25
6],120041:[[90],256],120042:[[97],256],120043:[[98],256],120044:[[99],256]
,120045:[[100],256],120046:[[101],256],120047:[[102],256],120048:[[103],25
6],120049:[[104],256],120050:[[105],256],120051:[[106],256],120052:[[107],
256],120053:[[108],256],120054:[[109],256],120055:[[110],256],120056:[[111
],256],120057:[[112],256],120058:[[113],256],120059:[[114],256],120060:[[1
15],256],120061:[[116],256],120062:[[117],256],120063:[[118],256]},
54528:{120064:[[119],256],120065:[[120],256],120066:[[121],256],120067:[[1
22],256],120068:[[65],256],120069:[[66],256],120071:[[68],256],120072:[[69
],256],120073:[[70],256],120074:[[71],256],120077:[[74],256],120078:[[75],
256],120079:[[76],256],120080:[[77],256],120081:[[78],256],120082:[[79],25
6],120083:[[80],256],120084:[[81],256],120086:[[83],256],120087:[[84],256]
,120088:[[85],256],120089:[[86],256],120090:[[87],256],120091:[[88],256],1
20092:[[89],256],120094:[[97],256],120095:[[98],256],120096:[[99],256],120
097:[[100],256],120098:[[101],256],120099:[[102],256],120100:[[103],256],1
20101:[[104],256],120102:[[105],256],120103:[[106],256],120104:[[107],256]
,120105:[[108],256],120106:[[109],256],120107:[[110],256],120108:[[111],25
6],120109:[[112],256],120110:[[113],256],120111:[[114],256],120112:[[115],
256],120113:[[116],256],120114:[[117],256],120115:[[118],256],120116:[[119
],256],120117:[[120],256],120118:[[121],256],120119:[[122],256],120120:[[6
5],256],120121:[[66],256],120123:[[68],256],120124:[[69],256],120125:[[70]
,256],120126:[[71],256],120128:[[73],256],120129:[[74],256],120130:[[75],2
56],120131:[[76],256],120132:[[77],256],120134:[[79],256],120138:[[83],256
],120139:[[84],256],120140:[[85],256],120141:[[86],256],120142:[[87],256],
120143:[[88],256],120144:[[89],256],120146:[[97],256],120147:[[98],256],12
0148:[[99],256],120149:[[100],256],120150:[[101],256],120151:[[102],256],1
20152:[[103],256],120153:[[104],256],120154:[[105],256],120155:[[106],256]
,120156:[[107],256],120157:[[108],256],120158:[[109],256],120159:[[110],25
6],120160:[[111],256],120161:[[112],256],120162:[[113],256],120163:[[114],
256],120164:[[115],256],120165:[[116],256],120166:[[117],256],120167:[[118
],256],120168:[[119],256],120169:[[120],256],120170:[[121],256],120171:[[1
22],256],120172:[[65],256],120173:[[66],256],120174:[[67],256],120175:[[68
],256],120176:[[69],256],120177:[[70],256],120178:[[71],256],120179:[[72],
256],120180:[[73],256],120181:[[74],256],120182:[[75],256],120183:[[76],25
6],120184:[[77],256],120185:[[78],256],120186:[[79],256],120187:[[80],256]
,120188:[[81],256],120189:[[82],256],120190:[[83],256],120191:[[84],256],1
20192:[[85],256],120193:[[86],256],120194:[[87],256],120195:[[88],256],120
196:[[89],256],120197:[[90],256],120198:[[97],256],120199:[[98],256],12020
0:[[99],256],120201:[[100],256],120202:[[101],256],120203:[[102],256],1202
04:[[103],256],120205:[[104],256],120206:[[105],256],120207:[[106],256],12
0208:[[107],256],120209:[[108],256],120210:[[109],256],120211:[[110],256],
120212:[[111],256],120213:[[112],256],120214:[[113],256],120215:[[114],256
],120216:[[115],256],120217:[[116],256],120218:[[117],256],120219:[[118],2
56],120220:[[119],256],120221:[[120],256],120222:[[121],256],120223:[[122]
,256],120224:[[65],256],120225:[[66],256],120226:[[67],256],120227:[[68],2

56],120228:[[69],256],120229:[[70],256],120230:[[71],256],120231:[[72],256
],120232:[[73],256],120233:[[74],256],120234:[[75],256],120235:[[76],256],
120236:[[77],256],120237:[[78],256],120238:[[79],256],120239:[[80],256],12
0240:[[81],256],120241:[[82],256],120242:[[83],256],120243:[[84],256],1202
44:[[85],256],120245:[[86],256],120246:[[87],256],120247:[[88],256],120248
:[[89],256],120249:[[90],256],120250:[[97],256],120251:[[98],256],120252:[
[99],256],120253:[[100],256],120254:[[101],256],120255:[[102],256],120256:
[[103],256],120257:[[104],256],120258:[[105],256],120259:[[106],256],12026
0:[[107],256],120261:[[108],256],120262:[[109],256],120263:[[110],256],120
264:[[111],256],120265:[[112],256],120266:[[113],256],120267:[[114],256],1
20268:[[115],256],120269:[[116],256],120270:[[117],256],120271:[[118],256]
,120272:[[119],256],120273:[[120],256],120274:[[121],256],120275:[[122],25
6],120276:[[65],256],120277:[[66],256],120278:[[67],256],120279:[[68],256]
,120280:[[69],256],120281:[[70],256],120282:[[71],256],120283:[[72],256],1
20284:[[73],256],120285:[[74],256],120286:[[75],256],120287:[[76],256],120
288:[[77],256],120289:[[78],256],120290:[[79],256],120291:[[80],256],12029
2:[[81],256],120293:[[82],256],120294:[[83],256],120295:[[84],256],120296:
[[85],256],120297:[[86],256],120298:[[87],256],120299:[[88],256],120300:[[
89],256],120301:[[90],256],120302:[[97],256],120303:[[98],256],120304:[[99
],256],120305:[[100],256],120306:[[101],256],120307:[[102],256],120308:[[1
03],256],120309:[[104],256],120310:[[105],256],120311:[[106],256],120312:[
[107],256],120313:[[108],256],120314:[[109],256],120315:[[110],256],120316
:[[111],256],120317:[[112],256],120318:[[113],256],120319:[[114],256]},
54784:{120320:[[115],256],120321:[[116],256],120322:[[117],256],120323:[[1
18],256],120324:[[119],256],120325:[[120],256],120326:[[121],256],120327:[
[122],256],120328:[[65],256],120329:[[66],256],120330:[[67],256],120331:[[
68],256],120332:[[69],256],120333:[[70],256],120334:[[71],256],120335:[[72
],256],120336:[[73],256],120337:[[74],256],120338:[[75],256],120339:[[76],
256],120340:[[77],256],120341:[[78],256],120342:[[79],256],120343:[[80],25
6],120344:[[81],256],120345:[[82],256],120346:[[83],256],120347:[[84],256]
,120348:[[85],256],120349:[[86],256],120350:[[87],256],120351:[[88],256],1
20352:[[89],256],120353:[[90],256],120354:[[97],256],120355:[[98],256],120
356:[[99],256],120357:[[100],256],120358:[[101],256],120359:[[102],256],12
0360:[[103],256],120361:[[104],256],120362:[[105],256],120363:[[106],256],
120364:[[107],256],120365:[[108],256],120366:[[109],256],120367:[[110],256
],120368:[[111],256],120369:[[112],256],120370:[[113],256],120371:[[114],2
56],120372:[[115],256],120373:[[116],256],120374:[[117],256],120375:[[118]
,256],120376:[[119],256],120377:[[120],256],120378:[[121],256],120379:[[12
2],256],120380:[[65],256],120381:[[66],256],120382:[[67],256],120383:[[68]
,256],120384:[[69],256],120385:[[70],256],120386:[[71],256],120387:[[72],2
56],120388:[[73],256],120389:[[74],256],120390:[[75],256],120391:[[76],256
],120392:[[77],256],120393:[[78],256],120394:[[79],256],120395:[[80],256],
120396:[[81],256],120397:[[82],256],120398:[[83],256],120399:[[84],256],12
0400:[[85],256],120401:[[86],256],120402:[[87],256],120403:[[88],256],1204
04:[[89],256],120405:[[90],256],120406:[[97],256],120407:[[98],256],120408
:[[99],256],120409:[[100],256],120410:[[101],256],120411:[[102],256],12041
2:[[103],256],120413:[[104],256],120414:[[105],256],120415:[[106],256],120
416:[[107],256],120417:[[108],256],120418:[[109],256],120419:[[110],256],1

20420:[[111],256],120421:[[112],256],120422:[[113],256],120423:[[114],256]
,120424:[[115],256],120425:[[116],256],120426:[[117],256],120427:[[118],25
6],120428:[[119],256],120429:[[120],256],120430:[[121],256],120431:[[122],
256],120432:[[65],256],120433:[[66],256],120434:[[67],256],120435:[[68],25
6],120436:[[69],256],120437:[[70],256],120438:[[71],256],120439:[[72],256]
,120440:[[73],256],120441:[[74],256],120442:[[75],256],120443:[[76],256],1
20444:[[77],256],120445:[[78],256],120446:[[79],256],120447:[[80],256],120
448:[[81],256],120449:[[82],256],120450:[[83],256],120451:[[84],256],12045
2:[[85],256],120453:[[86],256],120454:[[87],256],120455:[[88],256],120456:
[[89],256],120457:[[90],256],120458:[[97],256],120459:[[98],256],120460:[[
99],256],120461:[[100],256],120462:[[101],256],120463:[[102],256],120464:[
[103],256],120465:[[104],256],120466:[[105],256],120467:[[106],256],120468
:[[107],256],120469:[[108],256],120470:[[109],256],120471:[[110],256],1204
72:[[111],256],120473:[[112],256],120474:[[113],256],120475:[[114],256],12
0476:[[115],256],120477:[[116],256],120478:[[117],256],120479:[[118],256],
120480:[[119],256],120481:[[120],256],120482:[[121],256],120483:[[122],256
],120484:[[305],256],120485:[[567],256],120488:[[913],256],120489:[[914],2
56],120490:[[915],256],120491:[[916],256],120492:[[917],256],120493:[[918]
,256],120494:[[919],256],120495:[[920],256],120496:[[921],256],120497:[[92
2],256],120498:[[923],256],120499:[[924],256],120500:[[925],256],120501:[[
926],256],120502:[[927],256],120503:[[928],256],120504:[[929],256],120505:
[[1012],256],120506:[[931],256],120507:[[932],256],120508:[[933],256],1205
09:[[934],256],120510:[[935],256],120511:[[936],256],120512:[[937],256],12
0513:[[8711],256],120514:[[945],256],120515:[[946],256],120516:[[947],256]
,120517:[[948],256],120518:[[949],256],120519:[[950],256],120520:[[951],25
6],120521:[[952],256],120522:[[953],256],120523:[[954],256],120524:[[955],
256],120525:[[956],256],120526:[[957],256],120527:[[958],256],120528:[[959
],256],120529:[[960],256],120530:[[961],256],120531:[[962],256],120532:[[9
63],256],120533:[[964],256],120534:[[965],256],120535:[[966],256],120536:[
[967],256],120537:[[968],256],120538:[[969],256],120539:[[8706],256],12054
0:[[1013],256],120541:[[977],256],120542:[[1008],256],120543:[[981],256],1
20544:[[1009],256],120545:[[982],256],120546:[[913],256],120547:[[914],256
],120548:[[915],256],120549:[[916],256],120550:[[917],256],120551:[[918],2
56],120552:[[919],256],120553:[[920],256],120554:[[921],256],120555:[[922]
,256],120556:[[923],256],120557:[[924],256],120558:[[925],256],120559:[[92
6],256],120560:[[927],256],120561:[[928],256],120562:[[929],256],120563:[[
1012],256],120564:[[931],256],120565:[[932],256],120566:[[933],256],120567
:[[934],256],120568:[[935],256],120569:[[936],256],120570:[[937],256],1205
71:[[8711],256],120572:[[945],256],120573:[[946],256],120574:[[947],256],1
20575:[[948],256]},
55040:{120576:[[949],256],120577:[[950],256],120578:[[951],256],120579:[[9
52],256],120580:[[953],256],120581:[[954],256],120582:[[955],256],120583:[
[956],256],120584:[[957],256],120585:[[958],256],120586:[[959],256],120587
:[[960],256],120588:[[961],256],120589:[[962],256],120590:[[963],256],1205
91:[[964],256],120592:[[965],256],120593:[[966],256],120594:[[967],256],12
0595:[[968],256],120596:[[969],256],120597:[[8706],256],120598:[[1013],256
],120599:[[977],256],120600:[[1008],256],120601:[[981],256],120602:[[1009]
,256],120603:[[982],256],120604:[[913],256],120605:[[914],256],120606:[[91

5],256],120607:[[916],256],120608:[[917],256],120609:[[918],256],120610:[[
919],256],120611:[[920],256],120612:[[921],256],120613:[[922],256],120614:
[[923],256],120615:[[924],256],120616:[[925],256],120617:[[926],256],12061
8:[[927],256],120619:[[928],256],120620:[[929],256],120621:[[1012],256],12
0622:[[931],256],120623:[[932],256],120624:[[933],256],120625:[[934],256],
120626:[[935],256],120627:[[936],256],120628:[[937],256],120629:[[8711],25
6],120630:[[945],256],120631:[[946],256],120632:[[947],256],120633:[[948],
256],120634:[[949],256],120635:[[950],256],120636:[[951],256],120637:[[952
],256],120638:[[953],256],120639:[[954],256],120640:[[955],256],120641:[[9
56],256],120642:[[957],256],120643:[[958],256],120644:[[959],256],120645:[
[960],256],120646:[[961],256],120647:[[962],256],120648:[[963],256],120649
:[[964],256],120650:[[965],256],120651:[[966],256],120652:[[967],256],1206
53:[[968],256],120654:[[969],256],120655:[[8706],256],120656:[[1013],256],
120657:[[977],256],120658:[[1008],256],120659:[[981],256],120660:[[1009],2
56],120661:[[982],256],120662:[[913],256],120663:[[914],256],120664:[[915]
,256],120665:[[916],256],120666:[[917],256],120667:[[918],256],120668:[[91
9],256],120669:[[920],256],120670:[[921],256],120671:[[922],256],120672:[[
923],256],120673:[[924],256],120674:[[925],256],120675:[[926],256],120676:
[[927],256],120677:[[928],256],120678:[[929],256],120679:[[1012],256],1206
80:[[931],256],120681:[[932],256],120682:[[933],256],120683:[[934],256],12
0684:[[935],256],120685:[[936],256],120686:[[937],256],120687:[[8711],256]
,120688:[[945],256],120689:[[946],256],120690:[[947],256],120691:[[948],25
6],120692:[[949],256],120693:[[950],256],120694:[[951],256],120695:[[952],
256],120696:[[953],256],120697:[[954],256],120698:[[955],256],120699:[[956
],256],120700:[[957],256],120701:[[958],256],120702:[[959],256],120703:[[9
60],256],120704:[[961],256],120705:[[962],256],120706:[[963],256],120707:[
[964],256],120708:[[965],256],120709:[[966],256],120710:[[967],256],120711
:[[968],256],120712:[[969],256],120713:[[8706],256],120714:[[1013],256],12
0715:[[977],256],120716:[[1008],256],120717:[[981],256],120718:[[1009],256
],120719:[[982],256],120720:[[913],256],120721:[[914],256],120722:[[915],2
56],120723:[[916],256],120724:[[917],256],120725:[[918],256],120726:[[919]
,256],120727:[[920],256],120728:[[921],256],120729:[[922],256],120730:[[92
3],256],120731:[[924],256],120732:[[925],256],120733:[[926],256],120734:[[
927],256],120735:[[928],256],120736:[[929],256],120737:[[1012],256],120738
:[[931],256],120739:[[932],256],120740:[[933],256],120741:[[934],256],1207
42:[[935],256],120743:[[936],256],120744:[[937],256],120745:[[8711],256],1
20746:[[945],256],120747:[[946],256],120748:[[947],256],120749:[[948],256]
,120750:[[949],256],120751:[[950],256],120752:[[951],256],120753:[[952],25
6],120754:[[953],256],120755:[[954],256],120756:[[955],256],120757:[[956],
256],120758:[[957],256],120759:[[958],256],120760:[[959],256],120761:[[960
],256],120762:[[961],256],120763:[[962],256],120764:[[963],256],120765:[[9
64],256],120766:[[965],256],120767:[[966],256],120768:[[967],256],120769:[
[968],256],120770:[[969],256],120771:[[8706],256],120772:[[1013],256],1207
73:[[977],256],120774:[[1008],256],120775:[[981],256],120776:[[1009],256],
120777:[[982],256],120778:[[988],256],120779:[[989],256],120782:[[48],256]
,120783:[[49],256],120784:[[50],256],120785:[[51],256],120786:[[52],256],1
20787:[[53],256],120788:[[54],256],120789:[[55],256],120790:[[56],256],120
791:[[57],256],120792:[[48],256],120793:[[49],256],120794:[[50],256],12079

5:[[51],256],120796:[[52],256],120797:[[53],256],120798:[[54],256],120799:
[[55],256],120800:[[56],256],120801:[[57],256],120802:[[48],256],120803:[[
49],256],120804:[[50],256],120805:[[51],256],120806:[[52],256],120807:[[53
],256],120808:[[54],256],120809:[[55],256],120810:[[56],256],120811:[[57],
256],120812:[[48],256],120813:[[49],256],120814:[[50],256],120815:[[51],25
6],120816:[[52],256],120817:[[53],256],120818:[[54],256],120819:[[55],256]
,120820:[[56],256],120821:[[57],256],120822:[[48],256],120823:[[49],256],1
20824:[[50],256],120825:[[51],256],120826:[[52],256],120827:[[53],256],120
828:[[54],256],120829:[[55],256],120830:[[56],256],120831:[[57],256]},
59392:{125136:[,220],125137:[,220],125138:[,220],125139:[,220],125140:[,22
0],125141:[,220],125142:[,220]},
60928:{126464:[[1575],256],126465:[[1576],256],126466:[[1580],256],126467:
[[1583],256],126469:[[1608],256],126470:[[1586],256],126471:[[1581],256],1
26472:[[1591],256],126473:[[1610],256],126474:[[1603],256],126475:[[1604],
256],126476:[[1605],256],126477:[[1606],256],126478:[[1587],256],126479:[[
1593],256],126480:[[1601],256],126481:[[1589],256],126482:[[1602],256],126
483:[[1585],256],126484:[[1588],256],126485:[[1578],256],126486:[[1579],25
6],126487:[[1582],256],126488:[[1584],256],126489:[[1590],256],126490:[[15
92],256],126491:[[1594],256],126492:[[1646],256],126493:[[1722],256],12649
4:[[1697],256],126495:[[1647],256],126497:[[1576],256],126498:[[1580],256]
,126500:[[1607],256],126503:[[1581],256],126505:[[1610],256],126506:[[1603
],256],126507:[[1604],256],126508:[[1605],256],126509:[[1606],256],126510:
[[1587],256],126511:[[1593],256],126512:[[1601],256],126513:[[1589],256],1
26514:[[1602],256],126516:[[1588],256],126517:[[1578],256],126518:[[1579],
256],126519:[[1582],256],126521:[[1590],256],126523:[[1594],256],126530:[[
1580],256],126535:[[1581],256],126537:[[1610],256],126539:[[1604],256],126
541:[[1606],256],126542:[[1587],256],126543:[[1593],256],126545:[[1589],25
6],126546:[[1602],256],126548:[[1588],256],126551:[[1582],256],126553:[[15
90],256],126555:[[1594],256],126557:[[1722],256],126559:[[1647],256],12656
1:[[1576],256],126562:[[1580],256],126564:[[1607],256],126567:[[1581],256]
,126568:[[1591],256],126569:[[1610],256],126570:[[1603],256],126572:[[1605
],256],126573:[[1606],256],126574:[[1587],256],126575:[[1593],256],126576:
[[1601],256],126577:[[1589],256],126578:[[1602],256],126580:[[1588],256],1
26581:[[1578],256],126582:[[1579],256],126583:[[1582],256],126585:[[1590],
256],126586:[[1592],256],126587:[[1594],256],126588:[[1646],256],126590:[[
1697],256],126592:[[1575],256],126593:[[1576],256],126594:[[1580],256],126
595:[[1583],256],126596:[[1607],256],126597:[[1608],256],126598:[[1586],25
6],126599:[[1581],256],126600:[[1591],256],126601:[[1610],256],126603:[[16
04],256],126604:[[1605],256],126605:[[1606],256],126606:[[1587],256],12660
7:[[1593],256],126608:[[1601],256],126609:[[1589],256],126610:[[1602],256]
,126611:[[1585],256],126612:[[1588],256],126613:[[1578],256],126614:[[1579
],256],126615:[[1582],256],126616:[[1584],256],126617:[[1590],256],126618:
[[1592],256],126619:[[1594],256],126625:[[1576],256],126626:[[1580],256],1
26627:[[1583],256],126629:[[1608],256],126630:[[1586],256],126631:[[1581],
256],126632:[[1591],256],126633:[[1610],256],126635:[[1604],256],126636:[[
1605],256],126637:[[1606],256],126638:[[1587],256],126639:[[1593],256],126
640:[[1601],256],126641:[[1589],256],126642:[[1602],256],126643:[[1585],25
6],126644:[[1588],256],126645:[[1578],256],126646:[[1579],256],126647:[[15

82],256],126648:[[1584],256],126649:[[1590],256],126650:[[1592],256],12665
1:[[1594],256]},
61696:{127232:[[48,46],256],127233:[[48,44],256],127234:[[49,44],256],1272
35:[[50,44],256],127236:[[51,44],256],127237:[[52,44],256],127238:[[53,44]
,256],127239:[[54,44],256],127240:[[55,44],256],127241:[[56,44],256],12724
2:[[57,44],256],127248:[[40,65,41],256],127249:[[40,66,41],256],127250:[[4
0,67,41],256],127251:[[40,68,41],256],127252:[[40,69,41],256],127253:[[40,
70,41],256],127254:[[40,71,41],256],127255:[[40,72,41],256],127256:[[40,73
,41],256],127257:[[40,74,41],256],127258:[[40,75,41],256],127259:[[40,76,4
1],256],127260:[[40,77,41],256],127261:[[40,78,41],256],127262:[[40,79,41]
,256],127263:[[40,80,41],256],127264:[[40,81,41],256],127265:[[40,82,41],2
56],127266:[[40,83,41],256],127267:[[40,84,41],256],127268:[[40,85,41],256
],127269:[[40,86,41],256],127270:[[40,87,41],256],127271:[[40,88,41],256],
127272:[[40,89,41],256],127273:[[40,90,41],256],127274:[[12308,83,12309],2
56],127275:[[67],256],127276:[[82],256],127277:[[67,68],256],127278:[[87,9
0],256],127280:[[65],256],127281:[[66],256],127282:[[67],256],127283:[[68]
,256],127284:[[69],256],127285:[[70],256],127286:[[71],256],127287:[[72],2
56],127288:[[73],256],127289:[[74],256],127290:[[75],256],127291:[[76],256
],127292:[[77],256],127293:[[78],256],127294:[[79],256],127295:[[80],256],
127296:[[81],256],127297:[[82],256],127298:[[83],256],127299:[[84],256],12
7300:[[85],256],127301:[[86],256],127302:[[87],256],127303:[[88],256],1273
04:[[89],256],127305:[[90],256],127306:[[72,86],256],127307:[[77,86],256],
127308:[[83,68],256],127309:[[83,83],256],127310:[[80,80,86],256],127311:[
[87,67],256],127338:[[77,67],256],127339:[[77,68],256],127376:[[68,74],256
]},
61952:{127488:[[12411,12363],256],127489:[[12467,12467],256],127490:[[1246
9],256],127504:[[25163],256],127505:[[23383],256],127506:[[21452],256],127
507:[[12487],256],127508:[[20108],256],127509:[[22810],256],127510:[[35299
],256],127511:[[22825],256],127512:[[20132],256],127513:[[26144],256],1275
14:[[28961],256],127515:[[26009],256],127516:[[21069],256],127517:[[24460]
,256],127518:[[20877],256],127519:[[26032],256],127520:[[21021],256],12752
1:[[32066],256],127522:[[29983],256],127523:[[36009],256],127524:[[22768],
256],127525:[[21561],256],127526:[[28436],256],127527:[[25237],256],127528
:[[25429],256],127529:[[19968],256],127530:[[19977],256],127531:[[36938],2
56],127532:[[24038],256],127533:[[20013],256],127534:[[21491],256],127535:
[[25351],256],127536:[[36208],256],127537:[[25171],256],127538:[[31105],25
6],127539:[[31354],256],127540:[[21512],256],127541:[[28288],256],127542:[
[26377],256],127543:[[26376],256],127544:[[30003],256],127545:[[21106],256
],127546:[[21942],256],127552:[[12308,26412,12309],256],127553:[[12308,199
77,12309],256],127554:[[12308,20108,12309],256],127555:[[12308,23433,12309
],256],127556:[[12308,28857,12309],256],127557:[[12308,25171,12309],256],1
27558:[[12308,30423,12309],256],127559:[[12308,21213,12309],256],127560:[[
12308,25943,12309],256],127568:[[24471],256],127569:[[21487],256]},
63488:{194560:[[20029]],194561:[[20024]],194562:[[20033]],194563:[[131362]
],194564:[[20320]],194565:[[20398]],194566:[[20411]],194567:[[20482]],1945
68:[[20602]],194569:[[20633]],194570:[[20711]],194571:[[20687]],194572:[[1
3470]],194573:[[132666]],194574:[[20813]],194575:[[20820]],194576:[[20836]
],194577:[[20855]],194578:[[132380]],194579:[[13497]],194580:[[20839]],194

581:[[20877]],194582:[[132427]],194583:[[20887]],194584:[[20900]],194585:[
[20172]],194586:[[20908]],194587:[[20917]],194588:[[168415]],194589:[[2098
1]],194590:[[20995]],194591:[[13535]],194592:[[21051]],194593:[[21062]],19
4594:[[21106]],194595:[[21111]],194596:[[13589]],194597:[[21191]],194598:[
[21193]],194599:[[21220]],194600:[[21242]],194601:[[21253]],194602:[[21254
]],194603:[[21271]],194604:[[21321]],194605:[[21329]],194606:[[21338]],194
607:[[21363]],194608:[[21373]],194609:[[21375]],194610:[[21375]],194611:[[
21375]],194612:[[133676]],194613:[[28784]],194614:[[21450]],194615:[[21471
]],194616:[[133987]],194617:[[21483]],194618:[[21489]],194619:[[21510]],19
4620:[[21662]],194621:[[21560]],194622:[[21576]],194623:[[21608]],194624:[
[21666]],194625:[[21750]],194626:[[21776]],194627:[[21843]],194628:[[21859
]],194629:[[21892]],194630:[[21892]],194631:[[21913]],194632:[[21931]],194
633:[[21939]],194634:[[21954]],194635:[[22294]],194636:[[22022]],194637:[[
22295]],194638:[[22097]],194639:[[22132]],194640:[[20999]],194641:[[22766]
],194642:[[22478]],194643:[[22516]],194644:[[22541]],194645:[[22411]],1946
46:[[22578]],194647:[[22577]],194648:[[22700]],194649:[[136420]],194650:[[
22770]],194651:[[22775]],194652:[[22790]],194653:[[22810]],194654:[[22818]
],194655:[[22882]],194656:[[136872]],194657:[[136938]],194658:[[23020]],19
4659:[[23067]],194660:[[23079]],194661:[[23000]],194662:[[23142]],194663:[
[14062]],194664:[[14076]],194665:[[23304]],194666:[[23358]],194667:[[23358
]],194668:[[137672]],194669:[[23491]],194670:[[23512]],194671:[[23527]],19
4672:[[23539]],194673:[[138008]],194674:[[23551]],194675:[[23558]],194676:
[[24403]],194677:[[23586]],194678:[[14209]],194679:[[23648]],194680:[[2366
2]],194681:[[23744]],194682:[[23693]],194683:[[138724]],194684:[[23875]],1
94685:[[138726]],194686:[[23918]],194687:[[23915]],194688:[[23932]],194689
:[[24033]],194690:[[24034]],194691:[[14383]],194692:[[24061]],194693:[[241
04]],194694:[[24125]],194695:[[24169]],194696:[[14434]],194697:[[139651]],
194698:[[14460]],194699:[[24240]],194700:[[24243]],194701:[[24246]],194702
:[[24266]],194703:[[172946]],194704:[[24318]],194705:[[140081]],194706:[[1
40081]],194707:[[33281]],194708:[[24354]],194709:[[24354]],194710:[[14535]
],194711:[[144056]],194712:[[156122]],194713:[[24418]],194714:[[24427]],19
4715:[[14563]],194716:[[24474]],194717:[[24525]],194718:[[24535]],194719:[
[24569]],194720:[[24705]],194721:[[14650]],194722:[[14620]],194723:[[24724
]],194724:[[141012]],194725:[[24775]],194726:[[24904]],194727:[[24908]],19
4728:[[24910]],194729:[[24908]],194730:[[24954]],194731:[[24974]],194732:[
[25010]],194733:[[24996]],194734:[[25007]],194735:[[25054]],194736:[[25074
]],194737:[[25078]],194738:[[25104]],194739:[[25115]],194740:[[25181]],194
741:[[25265]],194742:[[25300]],194743:[[25424]],194744:[[142092]],194745:[
[25405]],194746:[[25340]],194747:[[25448]],194748:[[25475]],194749:[[25572
]],194750:[[142321]],194751:[[25634]],194752:[[25541]],194753:[[25513]],19
4754:[[14894]],194755:[[25705]],194756:[[25726]],194757:[[25757]],194758:[
[25719]],194759:[[14956]],194760:[[25935]],194761:[[25964]],194762:[[14337
0]],194763:[[26083]],194764:[[26360]],194765:[[26185]],194766:[[15129]],19
4767:[[26257]],194768:[[15112]],194769:[[15076]],194770:[[20882]],194771:[
[20885]],194772:[[26368]],194773:[[26268]],194774:[[32941]],194775:[[17369
]],194776:[[26391]],194777:[[26395]],194778:[[26401]],194779:[[26462]],194
780:[[26451]],194781:[[144323]],194782:[[15177]],194783:[[26618]],194784:[
[26501]],194785:[[26706]],194786:[[26757]],194787:[[144493]],194788:[[2676

6]],194789:[[26655]],194790:[[26900]],194791:[[15261]],194792:[[26946]],19
4793:[[27043]],194794:[[27114]],194795:[[27304]],194796:[[145059]],194797:
[[27355]],194798:[[15384]],194799:[[27425]],194800:[[145575]],194801:[[274
76]],194802:[[15438]],194803:[[27506]],194804:[[27551]],194805:[[27578]],1
94806:[[27579]],194807:[[146061]],194808:[[138507]],194809:[[146170]],1948
10:[[27726]],194811:[[146620]],194812:[[27839]],194813:[[27853]],194814:[[
27751]],194815:[[27926]]},
63744:{63744:[[35912]],63745:[[26356]],63746:[[36554]],63747:[[36040]],637
48:[[28369]],63749:[[20018]],63750:[[21477]],63751:[[40860]],63752:[[40860
]],63753:[[22865]],63754:[[37329]],63755:[[21895]],63756:[[22856]],63757:[
[25078]],63758:[[30313]],63759:[[32645]],63760:[[34367]],63761:[[34746]],6
3762:[[35064]],63763:[[37007]],63764:[[27138]],63765:[[27931]],63766:[[288
89]],63767:[[29662]],63768:[[33853]],63769:[[37226]],63770:[[39409]],63771
:[[20098]],63772:[[21365]],63773:[[27396]],63774:[[29211]],63775:[[34349]]
,63776:[[40478]],63777:[[23888]],63778:[[28651]],63779:[[34253]],63780:[[3
5172]],63781:[[25289]],63782:[[33240]],63783:[[34847]],63784:[[24266]],637
85:[[26391]],63786:[[28010]],63787:[[29436]],63788:[[37070]],63789:[[20358
]],63790:[[20919]],63791:[[21214]],63792:[[25796]],63793:[[27347]],63794:[
[29200]],63795:[[30439]],63796:[[32769]],63797:[[34310]],63798:[[34396]],6
3799:[[36335]],63800:[[38706]],63801:[[39791]],63802:[[40442]],63803:[[308
60]],63804:[[31103]],63805:[[32160]],63806:[[33737]],63807:[[37636]],63808
:[[40575]],63809:[[35542]],63810:[[22751]],63811:[[24324]],63812:[[31840]]
,63813:[[32894]],63814:[[29282]],63815:[[30922]],63816:[[36034]],63817:[[3
8647]],63818:[[22744]],63819:[[23650]],63820:[[27155]],63821:[[28122]],638
22:[[28431]],63823:[[32047]],63824:[[32311]],63825:[[38475]],63826:[[21202
]],63827:[[32907]],63828:[[20956]],63829:[[20940]],63830:[[31260]],63831:[
[32190]],63832:[[33777]],63833:[[38517]],63834:[[35712]],63835:[[25295]],6
3836:[[27138]],63837:[[35582]],63838:[[20025]],63839:[[23527]],63840:[[245
94]],63841:[[29575]],63842:[[30064]],63843:[[21271]],63844:[[30971]],63845
:[[20415]],63846:[[24489]],63847:[[19981]],63848:[[27852]],63849:[[25976]]
,63850:[[32034]],63851:[[21443]],63852:[[22622]],63853:[[30465]],63854:[[3
3865]],63855:[[35498]],63856:[[27578]],63857:[[36784]],63858:[[27784]],638
59:[[25342]],63860:[[33509]],63861:[[25504]],63862:[[30053]],63863:[[20142
]],63864:[[20841]],63865:[[20937]],63866:[[26753]],63867:[[31975]],63868:[
[33391]],63869:[[35538]],63870:[[37327]],63871:[[21237]],63872:[[21570]],6
3873:[[22899]],63874:[[24300]],63875:[[26053]],63876:[[28670]],63877:[[310
18]],63878:[[38317]],63879:[[39530]],63880:[[40599]],63881:[[40654]],63882
:[[21147]],63883:[[26310]],63884:[[27511]],63885:[[36706]],63886:[[24180]]
,63887:[[24976]],63888:[[25088]],63889:[[25754]],63890:[[28451]],63891:[[2
9001]],63892:[[29833]],63893:[[31178]],63894:[[32244]],63895:[[32879]],638
96:[[36646]],63897:[[34030]],63898:[[36899]],63899:[[37706]],63900:[[21015
]],63901:[[21155]],63902:[[21693]],63903:[[28872]],63904:[[35010]],63905:[
[35498]],63906:[[24265]],63907:[[24565]],63908:[[25467]],63909:[[27566]],6
3910:[[31806]],63911:[[29557]],63912:[[20196]],63913:[[22265]],63914:[[235
27]],63915:[[23994]],63916:[[24604]],63917:[[29618]],63918:[[29801]],63919
:[[32666]],63920:[[32838]],63921:[[37428]],63922:[[38646]],63923:[[38728]]
,63924:[[38936]],63925:[[20363]],63926:[[31150]],63927:[[37300]],63928:[[3
8584]],63929:[[24801]],63930:[[20102]],63931:[[20698]],63932:[[23534]],639

33:[[23615]],63934:[[26009]],63935:[[27138]],63936:[[29134]],63937:[[30274
]],63938:[[34044]],63939:[[36988]],63940:[[40845]],63941:[[26248]],63942:[
[38446]],63943:[[21129]],63944:[[26491]],63945:[[26611]],63946:[[27969]],6
3947:[[28316]],63948:[[29705]],63949:[[30041]],63950:[[30827]],63951:[[320
16]],63952:[[39006]],63953:[[20845]],63954:[[25134]],63955:[[38520]],63956
:[[20523]],63957:[[23833]],63958:[[28138]],63959:[[36650]],63960:[[24459]]
,63961:[[24900]],63962:[[26647]],63963:[[29575]],63964:[[38534]],63965:[[2
1033]],63966:[[21519]],63967:[[23653]],63968:[[26131]],63969:[[26446]],639
70:[[26792]],63971:[[27877]],63972:[[29702]],63973:[[30178]],63974:[[32633
]],63975:[[35023]],63976:[[35041]],63977:[[37324]],63978:[[38626]],63979:[
[21311]],63980:[[28346]],63981:[[21533]],63982:[[29136]],63983:[[29848]],6
3984:[[34298]],63985:[[38563]],63986:[[40023]],63987:[[40607]],63988:[[265
19]],63989:[[28107]],63990:[[33256]],63991:[[31435]],63992:[[31520]],63993
:[[31890]],63994:[[29376]],63995:[[28825]],63996:[[35672]],63997:[[20160]]
,63998:[[33590]],63999:[[21050]],194816:[[27966]],194817:[[28023]],194818:
[[27969]],194819:[[28009]],194820:[[28024]],194821:[[28037]],194822:[[1467
18]],194823:[[27956]],194824:[[28207]],194825:[[28270]],194826:[[15667]],1
94827:[[28363]],194828:[[28359]],194829:[[147153]],194830:[[28153]],194831
:[[28526]],194832:[[147294]],194833:[[147342]],194834:[[28614]],194835:[[2
8729]],194836:[[28702]],194837:[[28699]],194838:[[15766]],194839:[[28746]]
,194840:[[28797]],194841:[[28791]],194842:[[28845]],194843:[[132389]],1948
44:[[28997]],194845:[[148067]],194846:[[29084]],194847:[[148395]],194848:[
[29224]],194849:[[29237]],194850:[[29264]],194851:[[149000]],194852:[[2931
2]],194853:[[29333]],194854:[[149301]],194855:[[149524]],194856:[[29562]],
194857:[[29579]],194858:[[16044]],194859:[[29605]],194860:[[16056]],194861
:[[16056]],194862:[[29767]],194863:[[29788]],194864:[[29809]],194865:[[298
29]],194866:[[29898]],194867:[[16155]],194868:[[29988]],194869:[[150582]],
194870:[[30014]],194871:[[150674]],194872:[[30064]],194873:[[139679]],1948
74:[[30224]],194875:[[151457]],194876:[[151480]],194877:[[151620]],194878:
[[16380]],194879:[[16392]],194880:[[30452]],194881:[[151795]],194882:[[151
794]],194883:[[151833]],194884:[[151859]],194885:[[30494]],194886:[[30495]
],194887:[[30495]],194888:[[30538]],194889:[[16441]],194890:[[30603]],1948
91:[[16454]],194892:[[16534]],194893:[[152605]],194894:[[30798]],194895:[[
30860]],194896:[[30924]],194897:[[16611]],194898:[[153126]],194899:[[31062
]],194900:[[153242]],194901:[[153285]],194902:[[31119]],194903:[[31211]],1
94904:[[16687]],194905:[[31296]],194906:[[31306]],194907:[[31311]],194908:
[[153980]],194909:[[154279]],194910:[[154279]],194911:[[31470]],194912:[[1
6898]],194913:[[154539]],194914:[[31686]],194915:[[31689]],194916:[[16935]
],194917:[[154752]],194918:[[31954]],194919:[[17056]],194920:[[31976]],194
921:[[31971]],194922:[[32000]],194923:[[155526]],194924:[[32099]],194925:[
[17153]],194926:[[32199]],194927:[[32258]],194928:[[32325]],194929:[[17204
]],194930:[[156200]],194931:[[156231]],194932:[[17241]],194933:[[156377]],
194934:[[32634]],194935:[[156478]],194936:[[32661]],194937:[[32762]],19493
8:[[32773]],194939:[[156890]],194940:[[156963]],194941:[[32864]],194942:[[
157096]],194943:[[32880]],194944:[[144223]],194945:[[17365]],194946:[[3294
6]],194947:[[33027]],194948:[[17419]],194949:[[33086]],194950:[[23221]],19
4951:[[157607]],194952:[[157621]],194953:[[144275]],194954:[[144284]],1949
55:[[33281]],194956:[[33284]],194957:[[36766]],194958:[[17515]],194959:[[3

3425]],194960:[[33419]],194961:[[33437]],194962:[[21171]],194963:[[33457]]
,194964:[[33459]],194965:[[33469]],194966:[[33510]],194967:[[158524]],1949
68:[[33509]],194969:[[33565]],194970:[[33635]],194971:[[33709]],194972:[[3
3571]],194973:[[33725]],194974:[[33767]],194975:[[33879]],194976:[[33619]]
,194977:[[33738]],194978:[[33740]],194979:[[33756]],194980:[[158774]],1949
81:[[159083]],194982:[[158933]],194983:[[17707]],194984:[[34033]],194985:[
[34035]],194986:[[34070]],194987:[[160714]],194988:[[34148]],194989:[[1595
32]],194990:[[17757]],194991:[[17761]],194992:[[159665]],194993:[[159954]]
,194994:[[17771]],194995:[[34384]],194996:[[34396]],194997:[[34407]],19499
8:[[34409]],194999:[[34473]],195000:[[34440]],195001:[[34574]],195002:[[34
530]],195003:[[34681]],195004:[[34600]],195005:[[34667]],195006:[[34694]],
195007:[[17879]],195008:[[34785]],195009:[[34817]],195010:[[17913]],195011
:[[34912]],195012:[[34915]],195013:[[161383]],195014:[[35031]],195015:[[35
038]],195016:[[17973]],195017:[[35066]],195018:[[13499]],195019:[[161966]]
,195020:[[162150]],195021:[[18110]],195022:[[18119]],195023:[[35488]],1950
24:[[35565]],195025:[[35722]],195026:[[35925]],195027:[[162984]],195028:[[
36011]],195029:[[36033]],195030:[[36123]],195031:[[36215]],195032:[[163631
]],195033:[[133124]],195034:[[36299]],195035:[[36284]],195036:[[36336]],19
5037:[[133342]],195038:[[36564]],195039:[[36664]],195040:[[165330]],195041
:[[165357]],195042:[[37012]],195043:[[37105]],195044:[[37137]],195045:[[16
5678]],195046:[[37147]],195047:[[37432]],195048:[[37591]],195049:[[37592]]
,195050:[[37500]],195051:[[37881]],195052:[[37909]],195053:[[166906]],1950
54:[[38283]],195055:[[18837]],195056:[[38327]],195057:[[167287]],195058:[[
18918]],195059:[[38595]],195060:[[23986]],195061:[[38691]],195062:[[168261
]],195063:[[168474]],195064:[[19054]],195065:[[19062]],195066:[[38880]],19
5067:[[168970]],195068:[[19122]],195069:[[169110]],195070:[[38923]],195071
:[[38923]]},
64000:{64000:[[20999]],64001:[[24230]],64002:[[25299]],64003:[[31958]],640
04:[[23429]],64005:[[27934]],64006:[[26292]],64007:[[36667]],64008:[[34892
]],64009:[[38477]],64010:[[35211]],64011:[[24275]],64012:[[20800]],64013:[
[21952]],64016:[[22618]],64018:[[26228]],64021:[[20958]],64022:[[29482]],6
4023:[[30410]],64024:[[31036]],64025:[[31070]],64026:[[31077]],64027:[[311
19]],64028:[[38742]],64029:[[31934]],64030:[[32701]],64032:[[34322]],64034
:[[35576]],64037:[[36920]],64038:[[37117]],64042:[[39151]],64043:[[39164]]
,64044:[[39208]],64045:[[40372]],64046:[[37086]],64047:[[38583]],64048:[[2
0398]],64049:[[20711]],64050:[[20813]],64051:[[21193]],64052:[[21220]],640
53:[[21329]],64054:[[21917]],64055:[[22022]],64056:[[22120]],64057:[[22592
]],64058:[[22696]],64059:[[23652]],64060:[[23662]],64061:[[24724]],64062:[
[24936]],64063:[[24974]],64064:[[25074]],64065:[[25935]],64066:[[26082]],6
4067:[[26257]],64068:[[26757]],64069:[[28023]],64070:[[28186]],64071:[[284
50]],64072:[[29038]],64073:[[29227]],64074:[[29730]],64075:[[30865]],64076
:[[31038]],64077:[[31049]],64078:[[31048]],64079:[[31056]],64080:[[31062]]
,64081:[[31069]],64082:[[31117]],64083:[[31118]],64084:[[31296]],64085:[[3
1361]],64086:[[31680]],64087:[[32244]],64088:[[32265]],64089:[[32321]],640
90:[[32626]],64091:[[32773]],64092:[[33261]],64093:[[33401]],64094:[[33401
]],64095:[[33879]],64096:[[35088]],64097:[[35222]],64098:[[35585]],64099:[
[35641]],64100:[[36051]],64101:[[36104]],64102:[[36790]],64103:[[36920]],6
4104:[[38627]],64105:[[38911]],64106:[[38971]],64107:[[24693]],64108:[[148

206]],64109:[[33304]],64112:[[20006]],64113:[[20917]],64114:[[20840]],6411
5:[[20352]],64116:[[20805]],64117:[[20864]],64118:[[21191]],64119:[[21242]
],64120:[[21917]],64121:[[21845]],64122:[[21913]],64123:[[21986]],64124:[[
22618]],64125:[[22707]],64126:[[22852]],64127:[[22868]],64128:[[23138]],64
129:[[23336]],64130:[[24274]],64131:[[24281]],64132:[[24425]],64133:[[2449
3]],64134:[[24792]],64135:[[24910]],64136:[[24840]],64137:[[24974]],64138:
[[24928]],64139:[[25074]],64140:[[25140]],64141:[[25540]],64142:[[25628]],
64143:[[25682]],64144:[[25942]],64145:[[26228]],64146:[[26391]],64147:[[26
395]],64148:[[26454]],64149:[[27513]],64150:[[27578]],64151:[[27969]],6415
2:[[28379]],64153:[[28363]],64154:[[28450]],64155:[[28702]],64156:[[29038]
],64157:[[30631]],64158:[[29237]],64159:[[29359]],64160:[[29482]],64161:[[
29809]],64162:[[29958]],64163:[[30011]],64164:[[30237]],64165:[[30239]],64
166:[[30410]],64167:[[30427]],64168:[[30452]],64169:[[30538]],64170:[[3052
8]],64171:[[30924]],64172:[[31409]],64173:[[31680]],64174:[[31867]],64175:
[[32091]],64176:[[32244]],64177:[[32574]],64178:[[32773]],64179:[[33618]],
64180:[[33775]],64181:[[34681]],64182:[[35137]],64183:[[35206]],64184:[[35
222]],64185:[[35519]],64186:[[35576]],64187:[[35531]],64188:[[35585]],6418
9:[[35582]],64190:[[35565]],64191:[[35641]],64192:[[35722]],64193:[[36104]
],64194:[[36664]],64195:[[36978]],64196:[[37273]],64197:[[37494]],64198:[[
38524]],64199:[[38627]],64200:[[38742]],64201:[[38875]],64202:[[38911]],64
203:[[38923]],64204:[[38971]],64205:[[39698]],64206:[[40860]],64207:[[1413
86]],64208:[[141380]],64209:[[144341]],64210:[[15261]],64211:[[16408]],642
12:[[16441]],64213:[[152137]],64214:[[154832]],64215:[[163539]],64216:[[40
771]],64217:[[40846]],195072:[[38953]],195073:[[169398]],195074:[[39138]],
195075:[[19251]],195076:[[39209]],195077:[[39335]],195078:[[39362]],195079
:[[39422]],195080:[[19406]],195081:[[170800]],195082:[[39698]],195083:[[40
000]],195084:[[40189]],195085:[[19662]],195086:[[19693]],195087:[[40295]],
195088:[[172238]],195089:[[19704]],195090:[[172293]],195091:[[172558]],195
092:[[172689]],195093:[[40635]],195094:[[19798]],195095:[[40697]],195096:[
[40702]],195097:[[40709]],195098:[[40719]],195099:[[40726]],195100:[[40763
]],195101:[[173568]]},
64256:{64256:[[102,102],256],64257:[[102,105],256],64258:[[102,108],256],6
4259:[[102,102,105],256],64260:[[102,102,108],256],64261:[[383,116],256],6
4262:[[115,116],256],64275:[[1396,1398],256],64276:[[1396,1381],256],64277
:[[1396,1387],256],64278:[[1406,1398],256],64279:[[1396,1389],256],64285:[
[1497,1460],512],64286:[,26],64287:[[1522,1463],512],64288:[[1506],256],64
289:[[1488],256],64290:[[1491],256],64291:[[1492],256],64292:[[1499],256],
64293:[[1500],256],64294:[[1501],256],64295:[[1512],256],64296:[[1514],256
],64297:[[43],256],64298:[[1513,1473],512],64299:[[1513,1474],512],64300:[
[64329,1473],512],64301:[[64329,1474],512],64302:[[1488,1463],512],64303:[
[1488,1464],512],64304:[[1488,1468],512],64305:[[1489,1468],512],64306:[[1
490,1468],512],64307:[[1491,1468],512],64308:[[1492,1468],512],64309:[[149
3,1468],512],64310:[[1494,1468],512],64312:[[1496,1468],512],64313:[[1497,
1468],512],64314:[[1498,1468],512],64315:[[1499,1468],512],64316:[[1500,14
68],512],64318:[[1502,1468],512],64320:[[1504,1468],512],64321:[[1505,1468
],512],64323:[[1507,1468],512],64324:[[1508,1468],512],64326:[[1510,1468],
512],64327:[[1511,1468],512],64328:[[1512,1468],512],64329:[[1513,1468],51
2],64330:[[1514,1468],512],64331:[[1493,1465],512],64332:[[1489,1471],512]

,64333:[[1499,1471],512],64334:[[1508,1471],512],64335:[[1488,1500],256],6
4336:[[1649],256],64337:[[1649],256],64338:[[1659],256],64339:[[1659],256]
,64340:[[1659],256],64341:[[1659],256],64342:[[1662],256],64343:[[1662],25
6],64344:[[1662],256],64345:[[1662],256],64346:[[1664],256],64347:[[1664],
256],64348:[[1664],256],64349:[[1664],256],64350:[[1658],256],64351:[[1658
],256],64352:[[1658],256],64353:[[1658],256],64354:[[1663],256],64355:[[16
63],256],64356:[[1663],256],64357:[[1663],256],64358:[[1657],256],64359:[[
1657],256],64360:[[1657],256],64361:[[1657],256],64362:[[1700],256],64363:
[[1700],256],64364:[[1700],256],64365:[[1700],256],64366:[[1702],256],6436
7:[[1702],256],64368:[[1702],256],64369:[[1702],256],64370:[[1668],256],64
371:[[1668],256],64372:[[1668],256],64373:[[1668],256],64374:[[1667],256],
64375:[[1667],256],64376:[[1667],256],64377:[[1667],256],64378:[[1670],256
],64379:[[1670],256],64380:[[1670],256],64381:[[1670],256],64382:[[1671],2
56],64383:[[1671],256],64384:[[1671],256],64385:[[1671],256],64386:[[1677]
,256],64387:[[1677],256],64388:[[1676],256],64389:[[1676],256],64390:[[167
8],256],64391:[[1678],256],64392:[[1672],256],64393:[[1672],256],64394:[[1
688],256],64395:[[1688],256],64396:[[1681],256],64397:[[1681],256],64398:[
[1705],256],64399:[[1705],256],64400:[[1705],256],64401:[[1705],256],64402
:[[1711],256],64403:[[1711],256],64404:[[1711],256],64405:[[1711],256],644
06:[[1715],256],64407:[[1715],256],64408:[[1715],256],64409:[[1715],256],6
4410:[[1713],256],64411:[[1713],256],64412:[[1713],256],64413:[[1713],256]
,64414:[[1722],256],64415:[[1722],256],64416:[[1723],256],64417:[[1723],25
6],64418:[[1723],256],64419:[[1723],256],64420:[[1728],256],64421:[[1728],
256],64422:[[1729],256],64423:[[1729],256],64424:[[1729],256],64425:[[1729
],256],64426:[[1726],256],64427:[[1726],256],64428:[[1726],256],64429:[[17
26],256],64430:[[1746],256],64431:[[1746],256],64432:[[1747],256],64433:[[
1747],256],64467:[[1709],256],64468:[[1709],256],64469:[[1709],256],64470:
[[1709],256],64471:[[1735],256],64472:[[1735],256],64473:[[1734],256],6447
4:[[1734],256],64475:[[1736],256],64476:[[1736],256],64477:[[1655],256],64
478:[[1739],256],64479:[[1739],256],64480:[[1733],256],64481:[[1733],256],
64482:[[1737],256],64483:[[1737],256],64484:[[1744],256],64485:[[1744],256
],64486:[[1744],256],64487:[[1744],256],64488:[[1609],256],64489:[[1609],2
56],64490:[[1574,1575],256],64491:[[1574,1575],256],64492:[[1574,1749],256
],64493:[[1574,1749],256],64494:[[1574,1608],256],64495:[[1574,1608],256],
64496:[[1574,1735],256],64497:[[1574,1735],256],64498:[[1574,1734],256],64
499:[[1574,1734],256],64500:[[1574,1736],256],64501:[[1574,1736],256],6450
2:[[1574,1744],256],64503:[[1574,1744],256],64504:[[1574,1744],256],64505:
[[1574,1609],256],64506:[[1574,1609],256],64507:[[1574,1609],256],64508:[[
1740],256],64509:[[1740],256],64510:[[1740],256],64511:[[1740],256]},
64512:{64512:[[1574,1580],256],64513:[[1574,1581],256],64514:[[1574,1605],
256],64515:[[1574,1609],256],64516:[[1574,1610],256],64517:[[1576,1580],25
6],64518:[[1576,1581],256],64519:[[1576,1582],256],64520:[[1576,1605],256]
,64521:[[1576,1609],256],64522:[[1576,1610],256],64523:[[1578,1580],256],6
4524:[[1578,1581],256],64525:[[1578,1582],256],64526:[[1578,1605],256],645
27:[[1578,1609],256],64528:[[1578,1610],256],64529:[[1579,1580],256],64530
:[[1579,1605],256],64531:[[1579,1609],256],64532:[[1579,1610],256],64533:[
[1580,1581],256],64534:[[1580,1605],256],64535:[[1581,1580],256],64536:[[1
581,1605],256],64537:[[1582,1580],256],64538:[[1582,1581],256],64539:[[158

2,1605],256],64540:[[1587,1580],256],64541:[[1587,1581],256],64542:[[1587,
1582],256],64543:[[1587,1605],256],64544:[[1589,1581],256],64545:[[1589,16
05],256],64546:[[1590,1580],256],64547:[[1590,1581],256],64548:[[1590,1582
],256],64549:[[1590,1605],256],64550:[[1591,1581],256],64551:[[1591,1605],
256],64552:[[1592,1605],256],64553:[[1593,1580],256],64554:[[1593,1605],25
6],64555:[[1594,1580],256],64556:[[1594,1605],256],64557:[[1601,1580],256]
,64558:[[1601,1581],256],64559:[[1601,1582],256],64560:[[1601,1605],256],6
4561:[[1601,1609],256],64562:[[1601,1610],256],64563:[[1602,1581],256],645
64:[[1602,1605],256],64565:[[1602,1609],256],64566:[[1602,1610],256],64567
:[[1603,1575],256],64568:[[1603,1580],256],64569:[[1603,1581],256],64570:[
[1603,1582],256],64571:[[1603,1604],256],64572:[[1603,1605],256],64573:[[1
603,1609],256],64574:[[1603,1610],256],64575:[[1604,1580],256],64576:[[160
4,1581],256],64577:[[1604,1582],256],64578:[[1604,1605],256],64579:[[1604,
1609],256],64580:[[1604,1610],256],64581:[[1605,1580],256],64582:[[1605,15
81],256],64583:[[1605,1582],256],64584:[[1605,1605],256],64585:[[1605,1609
],256],64586:[[1605,1610],256],64587:[[1606,1580],256],64588:[[1606,1581],
256],64589:[[1606,1582],256],64590:[[1606,1605],256],64591:[[1606,1609],25
6],64592:[[1606,1610],256],64593:[[1607,1580],256],64594:[[1607,1605],256]
,64595:[[1607,1609],256],64596:[[1607,1610],256],64597:[[1610,1580],256],6
4598:[[1610,1581],256],64599:[[1610,1582],256],64600:[[1610,1605],256],646
01:[[1610,1609],256],64602:[[1610,1610],256],64603:[[1584,1648],256],64604
:[[1585,1648],256],64605:[[1609,1648],256],64606:[[32,1612,1617],256],6460
7:[[32,1613,1617],256],64608:[[32,1614,1617],256],64609:[[32,1615,1617],25
6],64610:[[32,1616,1617],256],64611:[[32,1617,1648],256],64612:[[1574,1585
],256],64613:[[1574,1586],256],64614:[[1574,1605],256],64615:[[1574,1606],
256],64616:[[1574,1609],256],64617:[[1574,1610],256],64618:[[1576,1585],25
6],64619:[[1576,1586],256],64620:[[1576,1605],256],64621:[[1576,1606],256]
,64622:[[1576,1609],256],64623:[[1576,1610],256],64624:[[1578,1585],256],6
4625:[[1578,1586],256],64626:[[1578,1605],256],64627:[[1578,1606],256],646
28:[[1578,1609],256],64629:[[1578,1610],256],64630:[[1579,1585],256],64631
:[[1579,1586],256],64632:[[1579,1605],256],64633:[[1579,1606],256],64634:[
[1579,1609],256],64635:[[1579,1610],256],64636:[[1601,1609],256],64637:[[1
601,1610],256],64638:[[1602,1609],256],64639:[[1602,1610],256],64640:[[160
3,1575],256],64641:[[1603,1604],256],64642:[[1603,1605],256],64643:[[1603,
1609],256],64644:[[1603,1610],256],64645:[[1604,1605],256],64646:[[1604,16
09],256],64647:[[1604,1610],256],64648:[[1605,1575],256],64649:[[1605,1605
],256],64650:[[1606,1585],256],64651:[[1606,1586],256],64652:[[1606,1605],
256],64653:[[1606,1606],256],64654:[[1606,1609],256],64655:[[1606,1610],25
6],64656:[[1609,1648],256],64657:[[1610,1585],256],64658:[[1610,1586],256]
,64659:[[1610,1605],256],64660:[[1610,1606],256],64661:[[1610,1609],256],6
4662:[[1610,1610],256],64663:[[1574,1580],256],64664:[[1574,1581],256],646
65:[[1574,1582],256],64666:[[1574,1605],256],64667:[[1574,1607],256],64668
:[[1576,1580],256],64669:[[1576,1581],256],64670:[[1576,1582],256],64671:[
[1576,1605],256],64672:[[1576,1607],256],64673:[[1578,1580],256],64674:[[1
578,1581],256],64675:[[1578,1582],256],64676:[[1578,1605],256],64677:[[157
8,1607],256],64678:[[1579,1605],256],64679:[[1580,1581],256],64680:[[1580,
1605],256],64681:[[1581,1580],256],64682:[[1581,1605],256],64683:[[1582,15
80],256],64684:[[1582,1605],256],64685:[[1587,1580],256],64686:[[1587,1581

],256],64687:[[1587,1582],256],64688:[[1587,1605],256],64689:[[1589,1581],
256],64690:[[1589,1582],256],64691:[[1589,1605],256],64692:[[1590,1580],25
6],64693:[[1590,1581],256],64694:[[1590,1582],256],64695:[[1590,1605],256]
,64696:[[1591,1581],256],64697:[[1592,1605],256],64698:[[1593,1580],256],6
4699:[[1593,1605],256],64700:[[1594,1580],256],64701:[[1594,1605],256],647
02:[[1601,1580],256],64703:[[1601,1581],256],64704:[[1601,1582],256],64705
:[[1601,1605],256],64706:[[1602,1581],256],64707:[[1602,1605],256],64708:[
[1603,1580],256],64709:[[1603,1581],256],64710:[[1603,1582],256],64711:[[1
603,1604],256],64712:[[1603,1605],256],64713:[[1604,1580],256],64714:[[160
4,1581],256],64715:[[1604,1582],256],64716:[[1604,1605],256],64717:[[1604,
1607],256],64718:[[1605,1580],256],64719:[[1605,1581],256],64720:[[1605,15
82],256],64721:[[1605,1605],256],64722:[[1606,1580],256],64723:[[1606,1581
],256],64724:[[1606,1582],256],64725:[[1606,1605],256],64726:[[1606,1607],
256],64727:[[1607,1580],256],64728:[[1607,1605],256],64729:[[1607,1648],25
6],64730:[[1610,1580],256],64731:[[1610,1581],256],64732:[[1610,1582],256]
,64733:[[1610,1605],256],64734:[[1610,1607],256],64735:[[1574,1605],256],6
4736:[[1574,1607],256],64737:[[1576,1605],256],64738:[[1576,1607],256],647
39:[[1578,1605],256],64740:[[1578,1607],256],64741:[[1579,1605],256],64742
:[[1579,1607],256],64743:[[1587,1605],256],64744:[[1587,1607],256],64745:[
[1588,1605],256],64746:[[1588,1607],256],64747:[[1603,1604],256],64748:[[1
603,1605],256],64749:[[1604,1605],256],64750:[[1606,1605],256],64751:[[160
6,1607],256],64752:[[1610,1605],256],64753:[[1610,1607],256],64754:[[1600,
1614,1617],256],64755:[[1600,1615,1617],256],64756:[[1600,1616,1617],256],
64757:[[1591,1609],256],64758:[[1591,1610],256],64759:[[1593,1609],256],64
760:[[1593,1610],256],64761:[[1594,1609],256],64762:[[1594,1610],256],6476
3:[[1587,1609],256],64764:[[1587,1610],256],64765:[[1588,1609],256],64766:
[[1588,1610],256],64767:[[1581,1609],256]},
64768:{64768:[[1581,1610],256],64769:[[1580,1609],256],64770:[[1580,1610],
256],64771:[[1582,1609],256],64772:[[1582,1610],256],64773:[[1589,1609],25
6],64774:[[1589,1610],256],64775:[[1590,1609],256],64776:[[1590,1610],256]
,64777:[[1588,1580],256],64778:[[1588,1581],256],64779:[[1588,1582],256],6
4780:[[1588,1605],256],64781:[[1588,1585],256],64782:[[1587,1585],256],647
83:[[1589,1585],256],64784:[[1590,1585],256],64785:[[1591,1609],256],64786
:[[1591,1610],256],64787:[[1593,1609],256],64788:[[1593,1610],256],64789:[
[1594,1609],256],64790:[[1594,1610],256],64791:[[1587,1609],256],64792:[[1
587,1610],256],64793:[[1588,1609],256],64794:[[1588,1610],256],64795:[[158
1,1609],256],64796:[[1581,1610],256],64797:[[1580,1609],256],64798:[[1580,
1610],256],64799:[[1582,1609],256],64800:[[1582,1610],256],64801:[[1589,16
09],256],64802:[[1589,1610],256],64803:[[1590,1609],256],64804:[[1590,1610
],256],64805:[[1588,1580],256],64806:[[1588,1581],256],64807:[[1588,1582],
256],64808:[[1588,1605],256],64809:[[1588,1585],256],64810:[[1587,1585],25
6],64811:[[1589,1585],256],64812:[[1590,1585],256],64813:[[1588,1580],256]
,64814:[[1588,1581],256],64815:[[1588,1582],256],64816:[[1588,1605],256],6
4817:[[1587,1607],256],64818:[[1588,1607],256],64819:[[1591,1605],256],648
20:[[1587,1580],256],64821:[[1587,1581],256],64822:[[1587,1582],256],64823
:[[1588,1580],256],64824:[[1588,1581],256],64825:[[1588,1582],256],64826:[
[1591,1605],256],64827:[[1592,1605],256],64828:[[1575,1611],256],64829:[[1
575,1611],256],64848:[[1578,1580,1605],256],64849:[[1578,1581,1580],256],6

4850:[[1578,1581,1580],256],64851:[[1578,1581,1605],256],64852:[[1578,1582
,1605],256],64853:[[1578,1605,1580],256],64854:[[1578,1605,1581],256],6485
5:[[1578,1605,1582],256],64856:[[1580,1605,1581],256],64857:[[1580,1605,15
81],256],64858:[[1581,1605,1610],256],64859:[[1581,1605,1609],256],64860:[
[1587,1581,1580],256],64861:[[1587,1580,1581],256],64862:[[1587,1580,1609]
,256],64863:[[1587,1605,1581],256],64864:[[1587,1605,1581],256],64865:[[15
87,1605,1580],256],64866:[[1587,1605,1605],256],64867:[[1587,1605,1605],25
6],64868:[[1589,1581,1581],256],64869:[[1589,1581,1581],256],64870:[[1589,
1605,1605],256],64871:[[1588,1581,1605],256],64872:[[1588,1581,1605],256],
64873:[[1588,1580,1610],256],64874:[[1588,1605,1582],256],64875:[[1588,160
5,1582],256],64876:[[1588,1605,1605],256],64877:[[1588,1605,1605],256],648
78:[[1590,1581,1609],256],64879:[[1590,1582,1605],256],64880:[[1590,1582,1
605],256],64881:[[1591,1605,1581],256],64882:[[1591,1605,1581],256],64883:
[[1591,1605,1605],256],64884:[[1591,1605,1610],256],64885:[[1593,1580,1605
],256],64886:[[1593,1605,1605],256],64887:[[1593,1605,1605],256],64888:[[1
593,1605,1609],256],64889:[[1594,1605,1605],256],64890:[[1594,1605,1610],2
56],64891:[[1594,1605,1609],256],64892:[[1601,1582,1605],256],64893:[[1601
,1582,1605],256],64894:[[1602,1605,1581],256],64895:[[1602,1605,1605],256]
,64896:[[1604,1581,1605],256],64897:[[1604,1581,1610],256],64898:[[1604,15
81,1609],256],64899:[[1604,1580,1580],256],64900:[[1604,1580,1580],256],64
901:[[1604,1582,1605],256],64902:[[1604,1582,1605],256],64903:[[1604,1605,
1581],256],64904:[[1604,1605,1581],256],64905:[[1605,1581,1580],256],64906
:[[1605,1581,1605],256],64907:[[1605,1581,1610],256],64908:[[1605,1580,158
1],256],64909:[[1605,1580,1605],256],64910:[[1605,1582,1580],256],64911:[[
1605,1582,1605],256],64914:[[1605,1580,1582],256],64915:[[1607,1605,1580],
256],64916:[[1607,1605,1605],256],64917:[[1606,1581,1605],256],64918:[[160
6,1581,1609],256],64919:[[1606,1580,1605],256],64920:[[1606,1580,1605],256
],64921:[[1606,1580,1609],256],64922:[[1606,1605,1610],256],64923:[[1606,1
605,1609],256],64924:[[1610,1605,1605],256],64925:[[1610,1605,1605],256],6
4926:[[1576,1582,1610],256],64927:[[1578,1580,1610],256],64928:[[1578,1580
,1609],256],64929:[[1578,1582,1610],256],64930:[[1578,1582,1609],256],6493
1:[[1578,1605,1610],256],64932:[[1578,1605,1609],256],64933:[[1580,1605,16
10],256],64934:[[1580,1581,1609],256],64935:[[1580,1605,1609],256],64936:[
[1587,1582,1609],256],64937:[[1589,1581,1610],256],64938:[[1588,1581,1610]
,256],64939:[[1590,1581,1610],256],64940:[[1604,1580,1610],256],64941:[[16
04,1605,1610],256],64942:[[1610,1581,1610],256],64943:[[1610,1580,1610],25
6],64944:[[1610,1605,1610],256],64945:[[1605,1605,1610],256],64946:[[1602,
1605,1610],256],64947:[[1606,1581,1610],256],64948:[[1602,1605,1581],256],
64949:[[1604,1581,1605],256],64950:[[1593,1605,1610],256],64951:[[1603,160
5,1610],256],64952:[[1606,1580,1581],256],64953:[[1605,1582,1610],256],649
54:[[1604,1580,1605],256],64955:[[1603,1605,1605],256],64956:[[1604,1580,1
605],256],64957:[[1606,1580,1581],256],64958:[[1580,1581,1610],256],64959:
[[1581,1580,1610],256],64960:[[1605,1580,1610],256],64961:[[1601,1605,1610
],256],64962:[[1576,1581,1610],256],64963:[[1603,1605,1605],256],64964:[[1
593,1580,1605],256],64965:[[1589,1605,1605],256],64966:[[1587,1582,1610],2
56],64967:[[1606,1580,1610],256],65008:[[1589,1604,1746],256],65009:[[1602
,1604,1746],256],65010:[[1575,1604,1604,1607],256],65011:[[1575,1603,1576,
1585],256],65012:[[1605,1581,1605,1583],256],65013:[[1589,1604,1593,1605],

256],65014:[[1585,1587,1608,1604],256],65015:[[1593,1604,1610,1607],256],6
5016:[[1608,1587,1604,1605],256],65017:[[1589,1604,1609],256],65018:[[1589
,1604,1609,32,1575,1604,1604,1607,32,1593,1604,1610,1607,32,1608,1587,1604
,1605],256],65019:[[1580,1604,32,1580,1604,1575,1604,1607],256],65020:[[15
85,1740,1575,1604],256]},
65024:{65040:[[44],256],65041:[[12289],256],65042:[[12290],256],65043:[[58
],256],65044:[[59],256],65045:[[33],256],65046:[[63],256],65047:[[12310],2
56],65048:[[12311],256],65049:[[8230],256],65056:[,230],65057:[,230],65058
:[,230],65059:[,230],65060:[,230],65061:[,230],65062:[,230],65063:[,220],6
5064:[,220],65065:[,220],65066:[,220],65067:[,220],65068:[,220],65069:[,22
0],65072:[[8229],256],65073:[[8212],256],65074:[[8211],256],65075:[[95],25
6],65076:[[95],256],65077:[[40],256],65078:[[41],256],65079:[[123],256],65
080:[[125],256],65081:[[12308],256],65082:[[12309],256],65083:[[12304],256
],65084:[[12305],256],65085:[[12298],256],65086:[[12299],256],65087:[[1229
6],256],65088:[[12297],256],65089:[[12300],256],65090:[[12301],256],65091:
[[12302],256],65092:[[12303],256],65095:[[91],256],65096:[[93],256],65097:
[[8254],256],65098:[[8254],256],65099:[[8254],256],65100:[[8254],256],6510
1:[[95],256],65102:[[95],256],65103:[[95],256],65104:[[44],256],65105:[[12
289],256],65106:[[46],256],65108:[[59],256],65109:[[58],256],65110:[[63],2
56],65111:[[33],256],65112:[[8212],256],65113:[[40],256],65114:[[41],256],
65115:[[123],256],65116:[[125],256],65117:[[12308],256],65118:[[12309],256
],65119:[[35],256],65120:[[38],256],65121:[[42],256],65122:[[43],256],6512
3:[[45],256],65124:[[60],256],65125:[[62],256],65126:[[61],256],65128:[[92
],256],65129:[[36],256],65130:[[37],256],65131:[[64],256],65136:[[32,1611]
,256],65137:[[1600,1611],256],65138:[[32,1612],256],65140:[[32,1613],256],
65142:[[32,1614],256],65143:[[1600,1614],256],65144:[[32,1615],256],65145:
[[1600,1615],256],65146:[[32,1616],256],65147:[[1600,1616],256],65148:[[32
,1617],256],65149:[[1600,1617],256],65150:[[32,1618],256],65151:[[1600,161
8],256],65152:[[1569],256],65153:[[1570],256],65154:[[1570],256],65155:[[1
571],256],65156:[[1571],256],65157:[[1572],256],65158:[[1572],256],65159:[
[1573],256],65160:[[1573],256],65161:[[1574],256],65162:[[1574],256],65163
:[[1574],256],65164:[[1574],256],65165:[[1575],256],65166:[[1575],256],651
