'use strict';

(function () {
    let clicked = false;
    let head = window;
    window.addEventListener('mousedown', readyToResize);
    window.addEventListener('mouseup', cancelResize);
    window.addEventListener('mousemove', moveHandler);
    window.addEventListener('resize', windowHandler);
    window.addEventListener('click', imageHandler);
    window.addEventListener('keyup', clearImageHandler);
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

    function clearImgPopup(){
        document.querySelectorAll('.imgWrap').forEach(e=>e?e.remove():null);
    }

    function clearImageHandler(ev){
        const key = ev.key;
        if(key.toLowerCase() != 'escape') return;
        clearImgPopup();
    }

    function imageHandler(ev){
        const target = ev.target;

        if(target.classList.contains('imgInner') || target.classList.contains('del-btn')) {
            clearImgPopup();
        }

        if(target.closest('.imgWrap')) return;
        if(target.tagName != 'IMG') return;

        const cloned = target.cloneNode(true);
        const imgWrap = document.createElement('div');
        const imgInner = document.createElement('div');
        const delBtn = document.createElement('button');

        imgWrap.classList.add('imgWrap');
        imgInner.classList.add('imgInner');
        delBtn.classList.add('del-btn');

        delBtn.innerHTML = '&times;';

        imgInner.append(cloned)
        imgWrap.append(imgInner, delBtn);
        document.body.append(imgWrap);
    }
})();