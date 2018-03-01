
chrome.storage.local.get('sids', function (res) {
    if (res.sids) {
        for (var i = 0; i < res.sids.length; ++i) {
            $(document.querySelector('[data-sid="' + res.sids[i] + '"]')).hide();
        }
    }
});

var actions = document.querySelectorAll('.actions');

    for (var i = 0; i < actions.length; ++i) {
        if (actions[i].parentElement.parentElement.parentElement.parentElement.classList.contains('new-status')) {

            var closeButton = document.createElement('a');
            closeButton.innerText = '关闭';
            closeButton.className += 'closeBtn btn';
            closeButton.style.marginLeft = 8 + 'px';

            actions[i].appendChild(closeButton);
        }
    }

    $('body').on('click', '.closeBtn', function (e) {
        e.preventDefault();
        var id = $(this).closest('.new-status').data('sid');
        chrome.storage.local.get({sids:[]}, function (result) {
            var arr = result.sids;
            arr.push(id);
            chrome.storage.local.set({sids: arr});

        });

        $(this).closest('.new-status').fadeOut();
    })



chrome.runtime.sendMessage({ action: "show" });