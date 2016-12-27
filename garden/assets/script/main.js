var main = {
    do: function () {
        var _this = this;
        _this.menuHandle();
    },
    menuHandle: function () {
        var $menu = $('.js_menu');
        var $btn = $('.js_menu_btn');
        $btn.on('click', function () {
            var status = $(this).hasClass('close');
            if (status) {
                $(this).removeClass('rollingF close').addClass('rollingB');
                $menu.slideUp();
            } else {
                $(this).removeClass('rollingB').addClass('rollingF close');
                $menu.slideDown();
            }
        });
    }
};

main.do();
