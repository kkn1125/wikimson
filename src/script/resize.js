'use strict';

(function () {
    let clicked = false;
    let head = window;
    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('resize', windowHandler);
    window.addEventListener('click', scrollIntoHandler);
    // window.addEventListener('click', imageHandler);
    window.addEventListener('mousemove', navScrollHandler);

    windowHandler();

    function navScrollHandler(ev) {
        const target = ev.target;
        const near = target.closest('#gnbMenu');
        if (!near) return;
        near.scrollTo({
            behavior: 'auto',
            left: near.scrollLeft + ev.movementX,
            top: 0,
        });
    }

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
        let resizer = document.querySelector('#resizer');
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
        let asideHeight = 0;

        setTimeout(() => {
            for (let key of [...document.querySelectorAll('*')]) {
                if (key.getAttribute('scroll-focus') == focus) {
                    if (window.innerWidth - 17 > 576) scrollHead = document.querySelector('[put-type="wiki"]');
                    else {
                        scrollHead = document.querySelector('.main');
                        asideHeight = document.querySelector('aside').clientHeight;
                    }

                    scrollHead.scrollTo({
                        behavior: 'smooth',
                        left: 0,
                        top: key.offsetTop + asideHeight
                    });
                }
            }
        }, 10);
    }
})();