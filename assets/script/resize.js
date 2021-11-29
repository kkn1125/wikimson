'use strict';

(function () {
    let clicked = false;
    window.addEventListener('mousedown', doResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('resize', windowHandler);
    window.addEventListener('click', scrollIntoHandler);
    document.querySelector('[put-type="wiki"]').addEventListener('scroll', scrollSpy);

    windowHandler();

    function doResize(ev) {
        let target = ev.target;
        if (target.id == 'resizer') clicked = true;
    }

    function cancelResize(ev) {
        clicked = false;
    }

    function moveHandler(ev) {
        if (!clicked) return;
        let left = ev.x;
        let leftSideBar = document.querySelector('#lsb');
        leftSideBar.style.flex = `0 0 ${left}px`;
    }

    function windowHandler(ev) {
        if (window.innerWidth - 17 < 576) {
            resizer.style.display = 'none';
        } else {
            resizer.style.display = 'flex';
        }
    }

    function scrollIntoHandler(ev) {
        let target = ev.target;
        if (!target.getAttribute('scroll-to')) return;
        let focus = target.getAttribute('scroll-to');
        for (let key of [...document.querySelectorAll('.h3, .h6')]) {
            if (key.getAttribute('scroll-focus') == focus) {
                document.querySelector('[put-type="wiki"]').scrollTo({behavior:'smooth', left: 0, top: key.offsetTop})
            }
        }
    }

    function scrollSpy(ev){
        let spy = [...document.querySelectorAll(`[scroll-to]`)];

        spy.map(s=>s.classList.remove('highlight'));

        for (let key of [...document.querySelectorAll('.h3, .h6')]) {
            let top = document.querySelector('[put-type="wiki"]').scrollTop;
            if (key.offsetTop-16 < top) {
                let focus = key.getAttribute('scroll-focus');
                spy.map(s=>{
                    if(document.querySelector(`[scroll-to="${focus}"]`)==s){
                        s.classList.add('highlight');
                    } else {
                        s.classList.remove('highlight');
                    }
                });
            }
        }
    }
})();