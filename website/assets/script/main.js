var main = {
    do: function () {
        var _this = this;
        _this.menuHandle();

        hljs.initHighlightingOnLoad();
    },
    menuHandle: function () {
        var $menu = $('.js_menu');
        var $btn = $('.js_menu_btn');
        $btn.on('click', function () {
            var status = $(this).hasClass('close');
            if (status) {
                $(this).removeClass('rollingB close').addClass('rollingF');
                $menu.slideUp();
            } else {
                $(this).removeClass('rollingF').addClass('rollingB close');
                $menu.slideDown();
            }
        });
    }
};

main.do();
