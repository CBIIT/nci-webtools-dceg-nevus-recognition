/**
 * Updated version of details polyfill to register click events from children of summary nodes
 * Original available at: https://github.com/rstacruz/details-polyfill
 */
void (function (root, factory) {
    if (typeof define === 'function' && define.amd) define(factory)
    else if (typeof exports === 'object') module.exports = factory()
    else factory()
}(this, function () {
    if (checkSupport()) return;
    document.documentElement.className += ' no-details'
    window.addEventListener('click', handleClick);

    injectStyle('details-polyfill-style', 
        // remove applied styles from some css resets
        'html.no-details details summary { list-style: none; } ' +
        // [open] controls visibility of details tag's contents
        'html.no-details details:not([open]) > :not(summary) { display: none; } ' +
        // add unicode icons before summary using consistent font
        'html.no-details details > summary:before {' + 
            'font-family: Arial, Helvetica, sans-serif;' +   
            'content: "\u25b6";' +
            'display: inline-block;' +
            'font-size: .8em;' +
            'width: 1.5em;' +
        '} ' +
        'html.no-details details[open] > summary:before { content: "\u25bc"; } ');

    /** Toggles the [open] attribute of the event target's summary element */
    function handleClick(e) {
        var targetNode = e.target;

        // find closest parent summary node
        while (targetNode.nodeName.toLowerCase() !== 'summary') {
            if (!targetNode.parentNode) return;
            targetNode = targetNode.parentNode;
        }

        // details must be an immediate parent of summary
        var detailsNode = targetNode.parentNode;
        if (!detailsNode || detailsNode.nodeName.toLowerCase() !== 'details')
            return;

        // when a summary is clicked, toggle the [open] attribute to the details element
        if (detailsNode.getAttribute('open')) {
            detailsNode.open = false;
            detailsNode.removeAttribute('open');
        } else {
            detailsNode.open = true;
            detailsNode.setAttribute('open', 'open');
        }
    }

    /** Returns true if <details> is supported */
    function checkSupport() {
        var el = document.createElement('details');
        if (!('open' in el)) return false;

        el.innerHTML = '<summary>a</summary>b';
        document.body.appendChild(el);

        var diff = el.offsetHeight;
        el.open = true;
        var result = (diff != el.offsetHeight);

        document.body.removeChild(el);
        return result
    }

    /** Injects style into head */
    function injectStyle(id, style) {
        if (document.getElementById(id)) return

        var el = document.createElement('style');
        el.id = id;
        el.innerHTML = style;

        document.getElementsByTagName('head')[0].appendChild(el);
    }
}));