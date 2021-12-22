'use strict';

(function () {
    let clicked = false;
    let head = window;
    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('resize', windowHandler);
    window.addEventListener('click', scrollIntoHandler);
    document.querySelector('[put-type="wiki"]').addEventListener('scroll', scrollSpy);

    windowHandler();

    function readyToResize(ev) {
        let target = ev.target;
        if (target.id == 'resizer' && ev.which == 1) clicked = true;
    }

    function cancelResize(ev) {
        clicked = false;
    }

    function moveHandler(ev) {
        if (!clicked && ev.type !== 'touchmove') return;

        let left = ev.x;
        if (ev.type == 'touchmove') {
            left = ev.touches[0].clientX;
        }
        let leftSideBar = document.querySelector('#lsb');
        leftSideBar.style.flex = `0 0 ${left}px`;
    }

    function windowHandler(ev) {
        if (window.innerWidth - 17 < 576) {
            resizer.style.display = 'none';
        } else {
            resizer.style.display = 'flex';
        }

        if (navigator.userAgentData.mobile) {
            head = resizer;
            head.addEventListener('touchmove', moveHandler, {
                passive: true
            });
        } else {
            head = window;
        }
    }

    function scrollIntoHandler(ev) {
        let target = ev.target;
        if (!target.getAttribute('scroll-to')) return;
        let focus = target.getAttribute('scroll-to');
        let scrollHead = null;
        for (let key of [...document.querySelectorAll('.h3, .h6')]) {
            if (key.getAttribute('scroll-focus') == focus) {
                if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                else scrollHead = document.querySelector('.main');
                scrollHead.scrollTo({
                    behavior: 'smooth',
                    left: 0,
                    top: key.offsetTop
                });
            }
        }
    }

    function scrollSpy(ev) {
        let spy = [...document.querySelectorAll(`[scroll-to]`)];

        spy.map(s => s.classList.remove('highlight'));

        [...document.querySelectorAll('.h3, .h6')].forEach((key,i)=>{
            let top = document.querySelector('[put-type="wiki"]').scrollTop;
            if (key.offsetTop - 16 < top) {
                let focus = key.getAttribute('scroll-focus');
                spy.map(s => {
                    if (document.querySelector(`[scroll-to="${focus}-${i}"]`) == s) {
                        s.classList.add('highlight');
                    } else {
                        s.classList.remove('highlight');
                    }
                });
            }
        });
    }
})();