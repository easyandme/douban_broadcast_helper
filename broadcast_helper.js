/**
 *  copyright @maxim-xu 2018
 */
chrome.storage.local.get('sids', function (res) {
    if (res.sids) {
        for (var i = 0; i < res.sids.length; ++i) {
            $(document.querySelector('[data-sid="' + res.sids[i] + '"]')).hide();
        }
        if (res.sids.length > 500) {
            chrome.storage.local.clear(function() {
                var error = chrome.runtime.lastError;
                if (error) {
                    console.error(error);
                }
            });
        }
    }
});


var actions = document.querySelectorAll('.actions');

    for (var i = 0; i < actions.length; ++i) {
        if (actions[i].parentElement.parentElement.parentElement.parentElement.classList.contains('new-status')) {

            var rtdButton = document.createElement('a');
            rtdButton.innerText = '喷';
            rtdButton.className += 'rtdBtn btn';
            rtdButton.style.marginLeft = 8 + 'px';

            var closeButton = document.createElement('a');
            closeButton.innerText = '关闭';
            closeButton.className += 'closeBtn btn';
            closeButton.style.marginLeft = 10 + 'px';

            actions[i].appendChild(rtdButton);
            actions[i].appendChild(closeButton);
        }
    }

    $('body').on('click', '.rtdBtn, .retard', function (e) {
        e.preventDefault();

        var id = $(this).closest('.new-status').data('sid');
        var retard = document.createElement('div');
        var $parentStatus = $(this).closest('.new-status');
        var height = $parentStatus.height();
        retard.innerText = '傻逼';
        retard.className += 'retard';
        retard.id = 'r' + id;
        retard.style.position = 'absolute';
        retard.style.color = '#027623';
        retard.style.bottom = 'calc(50% - ' + .25 * height + 'px)';
        retard.style.left = 30 + '%';
        retard.style.fontSize = (height < 600) ? (height / 4 + 12 + 'px' ) : (600 / 4 + 12 + 'px' );
        retard.style.backgroundColor = '#c8c8c8';
        retard.style.border = '2px solid';
        retard.style.padding = '0 10px';
        retard.style.height = .5 * height + 7 + 'px';
        retard.style.maxHeight = 600 + 'px';
        retard.style.textAlign = 'center';
        retard.style.zIndex = '10';

        if (!document.getElementById(retard.id)) {
            $parentStatus.append(retard);
        } else $(document.getElementById(retard.id)).toggle();


    });


    $('body').on('click', '.closeBtn', function (e) {
        e.preventDefault();
        var id = $(this).closest('.new-status').data('sid');
        chrome.storage.local.get({sids:[]}, function (result) {
            var arr = result.sids;
            arr.push(id);
            chrome.storage.local.set({sids: arr});

        });

        $(this).closest('.new-status').fadeOut();
    });



chrome.runtime.sendMessage({ action: "show" });