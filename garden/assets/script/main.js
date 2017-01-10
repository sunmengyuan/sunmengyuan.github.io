var main = {
    do: function () {
        var _this = this;
        _this.menuHandle();
        pageData.postsData && _this.paginator();

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
    },
    paginator: function () {
        var $paginator = $('.js_paginator');
        var offset = 2;
        var count = 2 * offset + 1;
        var cur = pageData.postsData.curPage >> 0;
        var total = pageData.postsData.totalPage >> 0;
        var createItem = function (value) {
            var $item = $(document.createElement('A'))
                .text(value)
                .attr('href', pageData.postsData.postsUrl + '/' + (value == 1 ? '' : value));
            return $item;
        };
        var setActive = function () {
            $paginator.find('a:contains(' + cur + ')').addClass('active');
        };

        if (cur < count - offset) {
            for (var i = 1;i <= (total < count ? total : count);i++) {
                var $item = createItem(i);
                $paginator.append($item);
            }
            setActive();
            return;
        }

        if (cur > total - offset) {
            for (var j = total;j > (total < count ? 0 : total - count);j--) {
                var $item = createItem(j);
                $paginator.prepend($item);
            }
            setActive();
            return;
        }

        var $cur = createItem(cur);
        $paginator.append($cur);
        for (var m = 1;m <= offset;m++) {
            var pre = cur - m;
            var next = cur + m;
            var $pre = createItem(pre);
            var $next = createItem(next);
            $paginator.prepend($pre);
            $paginator.append($next);
        }
        setActive();
    }
};

main.do();
