var main = {
    do: function () {
        var _this = this;
        _this.menuHandle();
        _this.paginator();

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
        var cur = pageData.curPage >> 0;
        var total = pageData.totalPage >> 0;

        if (cur < count - offset) {
            for (var i = 1;i <= (total < count ? total : count);i++) {
                var $item = $(document.createElement('a'))
                    .text(i)
                    .attr('href', pageData.postsUrl + '/' + (i == 1 ? '' : i));
                $paginator.append($item);
            }
            return;
        }

        if (cur > total - offset) {
            for (var j = total;j > (total < count ? 0 : total - count);j--) {
                var $item = $(document.createElement('a'))
                    .text(j)
                    .attr('href', pageData.postsUrl + '/' + (j == 1 ? '' : j));
                $paginator.prepend($item);
            }
            return;
        }

        var $cur = $(document.createElement('a'))
            .text(cur)
            .attr('href', pageData.postsUrl + '/' + (cur == 1 ? '' : cur));
        $paginator.append($cur);
        for (var m = 1;m <= offset;m++) {
            var pre = cur - m;
            var next = cur + m;
            var $pre = $(document.createElement('a'))
                .text(pre)
                .attr('href', pageData.postsUrl + '/' + (pre == 1 ? '' : pre));
            var $next = $(document.createElement('a'))
                .text(next)
                .attr('href', pageData.postsUrl + '/' + (next == 1 ? '' : next));
            $paginator.prepend($pre);
            $paginator.append($next);
        }
    }
};

main.do();
