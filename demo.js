'use scritc';
new Sticky(document.querySelector('#sticky1'), {
    start: 'sticky-1-start',
    end: 'sticky-1-end',
    movePosition: 20
});
new Sticky(document.querySelector('#sticky2'), {
    start: 'sticky-2-start',
    end: 'sticky-2-end',
    moveEnd: -10
});
new Sticky(document.querySelector('#sticky3'), {
    start: 'sticky-3-start',
    end: 'sticky-3-end',
    stickTo: 'bottom',
    moveEnd: -10
});

new Sticky(document.querySelector('#sticky4'), {
    start: 'sticky-4-start',
    end: 'sticky-4-end'
});
new Sticky(document.querySelector('#sticky5'), {
    start: 'sticky-5-start',
    end: 'sticky-5-end',
    stickTo: 'bottom',
    moveEnd: -20
});