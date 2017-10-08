var method = {
    getUrlParam: function (key) {
        var search = location.search;
        var tmp = [];
        var value = '';
        if (search) {
            tmp = search.substr(1).split('&');
        }
        for (var i = 0; i < tmp.length; i++) {
            if (tmp[i].substring(0, tmp[i].indexOf('=')) == key) {
                value = tmp[i].substr(tmp[i].indexOf('=') + 1);
                break;
            }
        }
        return value;
    }
};

var main = {
    do: function () {
        var _this = this;
        _this.menuHandle();
        _this.browserHandle();
        _this.gotop();
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
        $('.js_goto_posts').on('click', function (e) {
            e.preventDefault();
            var page = method.getUrlParam('page');
            var url = $(this).attr('href');
            location.href = (page == 1) ? url : url + '/' + page;
        });
    },
    browserHandle: function () {
        var $browser = $('.js_browser');
        var $img = $browser.find('img');
        $('.js_article').on('click', 'img', function () {
            var src = $(this).attr('src');
            $img.attr('src', src);
            $browser.show();
        });
        $browser.on('click', function () {
            $browser.hide();
            $img.attr('src', '');
        });
    },
    gotop: function () {
        var $btn = $('.js_gotop');
        var $win = $(window);
        var $body = $('body');
        var dbase = 3 * $body.height();
        var timeout = null;
        var scrolling = function (initPos) {
            var pos = initPos;
            var interval = setInterval(function () {
                var dPos = pos / 10;
                if (dPos < 0.2) {
                    pos = 0;
                    clearInterval(interval);
                } else {
                    pos -= dPos;
                }
                $win.scrollTop(pos);
            }, 16);
        };
        $btn.on('click', function () {
            scrolling($win.scrollTop());
        });
        $win.on('scroll', function () {
            if (timeout == null) {
                timeout = setTimeout(function () {
                    dbase <= $win.scrollTop() ? $btn.show() : $btn.hide();
                    timeout = null;
                }, 16);
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
            for (var i = 1; i <= (total < count ? total : count); i++) {
                var $item = createItem(i);
                $paginator.append($item);
            }
            setActive();
            return;
        }

        if (cur > total - offset) {
            for (var j = total; j > (total < count ? 0 : total - count); j--) {
                var $item = createItem(j);
                $paginator.prepend($item);
            }
            setActive();
            return;
        }

        var $cur = createItem(cur);
        $paginator.append($cur);
        for (var m = 1; m <= offset; m++) {
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
