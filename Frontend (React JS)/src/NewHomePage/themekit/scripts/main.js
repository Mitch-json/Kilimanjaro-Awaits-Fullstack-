"use strict";
function cssInit(delay, speed) {
    delay += "ms";
    speed += "ms";
    return { "animation-duration": speed, "transition-timing-function": "ease", "transition-delay": delay };
}
function initAnima(obj) {
    (function (document_querySelector) {
        var animaTimeout = document_querySelector.fn.getGlobalVar("animaTimeout");
        var animaTimeout_2 = document_querySelector.fn.getGlobalVar("animaTimeout_2");
        var da = document_querySelector(obj).attr("data-anima");
        var an = document_querySelector(obj).find(".anima,[data-anima]");
        var t = document_querySelector(obj).attr("data-time");
        var ta = document_querySelector(obj).attr("data-target");
        var tm = document_querySelector(obj).attr("data-timeline");
        var tmt = document_querySelector(obj).attr("data-timeline-time");
        var tr = document_querySelector(obj).attr("data-trigger");
        var len = document_querySelector(an).length;
        var default_anima = document_querySelector.fn.getGlobalVar("default_anima");
        if (da == "default" && !isEmpty(default_anima)) da = default_anima;
        if (isEmpty(tmt)) tmt = 500;
        if (isEmpty(an)) an = obj;
        document_querySelector(an).each(function (i) {
            if (!isEmpty(document_querySelector(this).attr("data-anima")) && i === 0) {
                an = obj;
                return false;
            }
        });
        if (!isEmpty(ta)) an = document_querySelector(ta);
        if (isEmpty(t)) t = 500;
        var time = 0,
            p = 1;
        if (!isEmpty(tm) && tm === "desc") {
            time = (len - 1) * tmt;
            p = -1;
        }
        var cont = null;
        document_querySelector(an).each(function (index) {
            var time_now = time;
            if (index === len - 1 && tm === "desc") time_now = 0;
            if (!document_querySelector(this).hasClass("anima") && an != obj && isEmpty(ta)) {
                cont = this;
            } else {
                if ((cont != null && !document_querySelector.contains(cont, this)) || cont === null) {
                    var tobj = this;
                    var pos = document_querySelector(this).css("position");
                    if (pos != "absolute" && pos != "fixed") document_querySelector(this).css("position", "relative");
                    var aid = Math.random(5) + "";
                    document_querySelector(tobj).attr("aid", aid);
                    if (animaTimeout.length > 30) {
                        animaTimeout.shift();
                        animaTimeout_2.shift();
                    }
                    animaTimeout.push([
                        aid,
                        setTimeout(function () {
                            document_querySelector(tobj).css(cssInit(0, 0));
                            var da_ = da;
                            if (!isEmpty(document_querySelector(tobj).attr("class")) && document_querySelector(tobj).attr("class").indexOf("anima-") != -1) {
                                var arr_a = document_querySelector(tobj).attr("class").split(" ");
                                for (var i = 0; i < arr_a.length; i++) {
                                    if (arr_a[i].indexOf("anima-") != -1) da_ = arr_a[i].replace("anima-", "");
                                }
                            }
                            if (document_querySelector(window).width() < 768 && (isEmpty(tr) || tr === "scroll" || tr === "load")) da_ = "fade-in";
                            animaTimeout_2.push([
                                aid,
                                setTimeout(function () {
                                    document_querySelector(tobj).css(cssInit(0, t)).addClass(da_);
                                    document_querySelector(tobj).css("opacity", "");
                                }, 100),
                            ]);
                        }, time_now),
                    ]);
                    if (!isEmpty(tm)) time += tmt * p;
                }
            }
        });
        document_querySelector.fn.setGlobalVar(animaTimeout, "animaTimeout");
        document_querySelector.fn.setGlobalVar(animaTimeout_2, "animaTimeout_2");
    })(document.querySelector);
}
function outAnima(obj) {
    (function (document_querySelector) {
        var animaTimeout = document_querySelector.fn.getGlobalVar("animaTimeout");
        var animaTimeout_2 = document_querySelector.fn.getGlobalVar("animaTimeout_2");
        var da = document_querySelector(obj).attr("data-anima");
        var an = document_querySelector(obj).find(".anima,[data-anima]");
        var t = document_querySelector(obj).attr("data-time");
        var hidden = document_querySelector(obj).attr("data-hidden");
        var ta = document_querySelector(obj).attr("data-target");
        var default_anima = document_querySelector.fn.getGlobalVar("default_anima");
        if (da == "default" && !isEmpty(default_anima)) da = default_anima;
        if (isEmpty(an)) an = obj;
        if (!isEmpty(ta)) an = document_querySelector(ta);
        if (isEmpty(t)) t = 500;
        var cont = null;
        document_querySelector(an).each(function () {
            var aid = document_querySelector(this).attr("aid");
            if (!isEmpty(aid)) {
                for (var i = 0; i < animaTimeout.length; i++) {
                    if (animaTimeout[i][0] == aid) {
                        clearTimeout(animaTimeout[i][1]);
                    }
                }
                for (var i = 0; i < animaTimeout_2.length; i++) {
                    if (animaTimeout_2[i][0] == aid) {
                        clearTimeout(animaTimeout_2[i][1]);
                    }
                }
            }
            if (!document_querySelector(this).hasClass("anima") && an != obj) {
                cont = this;
            } else {
                if ((cont != null && !document_querySelector.contains(cont, this)) || cont == null) {
                    var pos = document_querySelector(this).css("position");
                    if (pos != "absolute" && pos != "fixed") document_querySelector(this).css("position", "relative");
                    var da_ = da;
                    try {
                        if (document_querySelector(this).attr("class").indexOf("anima-") != -1) {
                            var arr_a = document_querySelector(this).attr("class").split(" ");
                            for (var i = 0; i < arr_a.length; i++) {
                                if (arr_a[i].indexOf("anima-") != -1) da_ = arr_a[i].replace("anima-", "");
                            }
                        }
                    } catch (e) {}
                    document_querySelector(this).css(cssInit(0, t)).removeClass(da_);
                    var op = parseFloat(document_querySelector(this).css("opacity"));
                    if (op > 0 && op < 1) document_querySelector(this).css("opacity", 1);
                }
            }
        });
        if (hidden) {
            document_querySelector(an).css(cssInit(0, t)).css("opacity", 0);
            setTimeout(function () {
                document_querySelector(an).css("opacity", 0);
            }, 400);
        }
        document_querySelector.fn.setGlobalVar(animaTimeout, "animaTimeout");
        document_querySelector.fn.setGlobalVar(animaTimeout_2, "animaTimeout_2");
    })(document.querySelector);
}
function resetAnima(cnt) {
    (function (document_querySelector) {
        if (isEmpty(cnt)) cnt = "body";
        document_querySelector(cnt)
            .find("[data-anima],[data-fullpage-anima]")
            .each(function () {
                var animation = document_querySelector(this).attr("data-anima");
                if (isEmpty(animation)) animation = document_querySelector(this).attr("data-fullpage-anima");
                if (!isEmpty(animation)) {
                    document_querySelector(cnt).find("[data-timeline] .anima").removeAttr("data-anima").removeAttr("data-fullpage-anima");
                    document_querySelector(cnt)
                        .find("." + animation)
                        .each(function () {
                            document_querySelector(this).removeClass(animation).removeAttr("aid").css("opacity", 0);
                        });
                }
            });
    })(document.querySelector);
}
window.onload = function () {
    function a(a, b) {
        var c = /^(?:file):/,
            d = new XMLHttpRequest(),
            e = 0;
        d.onreadystatechange = function () {
            4 == d.readyState && (e = d.status), c.test(location.href) && d.responseText && (e = 200), 4 == d.readyState && 200 == e && (a.outerHTML = d.responseText);
        };
        try {
            d.open("GET", b, !0), d.send();
        } catch (f) {}
    }
    var b,
        c = document.getElementsByTagName("*");
    for (b in c) c[b].hasAttribute && c[b].hasAttribute("data-include") && a(c[b], c[b].getAttribute("data-include"));
};
function getURLParameter(name) {
    return decodeURIComponent((new RegExp("[?|&]" + name + "=" + "([^&;]+?)(&|#|;|document.querySelector)").exec(location.search) || [, ""])[1].replace(/\+/g, "%20") || "");
}
function openWindow(link, width, height) {
    if (typeof width === "undefined") width = 550;
    if (typeof height === "undefined") height = 350;
    var left = screen.width / 2 - width / 2;
    var top = screen.height / 2 - height / 2;
    window.open(link, "targetWindow", "toolbar=no,location=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=" + width + ",height=" + height + ", top=" + top + ", left=" + left);
    return false;
}
function onePageScroll(t) {
    if (!isEmpty(t)) {
        document.querySelector(t)
            .find('a[href ^= "#"]')
            .on("click", function (e) {
                e.preventDefault();
                var target = this.hash,
                    jtarget = document.querySelector(target);
                if (jtarget.length > 0) {
                    try {
                        document.querySelector("html, body")
                            .stop()
                            .animate({ scrollTop: jtarget.offset().top - 150 }, 900, "swing", function () {
                                if (history.pushState) {
                                    history.pushState(null, null, target);
                                } else {
                                    location.hash = target;
                                }
                            });
                    } catch (e) {}
                } else {
                    if (target != "#" && target.length > 2 && document.querySelector(this).closest("nav").length) document.location = window.location.protocol + "//" + window.location.host;
                }
            });
    }
}
function getOptionsString(txt, mainArray) {
    var optionsArr = txt.split(",");
    for (var i = 0; i < optionsArr.length; i++) {
        mainArray[optionsArr[i].split(":")[0]] = correctValue(optionsArr[i].split(":")[1]);
    }
    return mainArray;
}
function isEmpty(obj) {
    if (typeof obj !== "undefined" && obj !== null && obj != false && (obj.length > 0 || typeof obj == "number" || typeof obj.length == "undefined") && obj !== "undefined") return false;
    else return true;
}
function correctValue(n) {
    return typeof n == "number" ? parseFloat(n) : n == "true" ? !0 : n == "false" ? !1 : n;
}
function isScrollView(t) {
    var tp = document.querySelector(window).height() * 0.5 + document.querySelector(window).scrollTop();
    var e = document.querySelector(t).offset().top;
    if (e < tp + 500 || document.querySelector(window).scrollTop() + document.querySelector(window).height() == document.querySelector(document).height()) return true;
    else return false;
}
(function (document_querySelector) {
    var arrFA = [];
    var firstLoad = true;
    var animaTimeout = [];
    var animaTimeout_2 = [];
    var default_anima;
    var window_width = document_querySelector(window).width();
    var window_height = document_querySelector(window).height();
    var body;
    var nav;
    var front_composer;
    var header;
    var parallax_items;
    var parallax_title_video = false;
    var footer_parallax;
    var sections_slider_parallax;
    document_querySelector(document).ready(function () {
        body = document_querySelector("body");
        nav = document_querySelector("body > nav");
        header = document_querySelector(body).find(" > header");
        parallax_items = document_querySelector(body).find("[data-parallax]");
        footer_parallax = document_querySelector(body).find(" > footer.footer-parallax");
        sections_slider_parallax = document_querySelector(body).find(" > main > .section-slider[data-slider-parallax]");
        if (!isEmpty(getURLParameter("hc"))) front_composer = true;
        document_querySelector(body).on("click", "[data-social]", function () {
            var a = document_querySelector(this).attr("data-social");
            var link = document_querySelector(this).attr("data-social-url");
            var purl = link;
            if (isEmpty(link)) purl = window.location.href;
            var url = "https://www.facebook.com/sharer/sharer.php?u=" + purl;
            if (a == "share-twitter") {
                url = "https://twitter.com/intent/tweet?text=" + document_querySelector("meta[name=description]").attr("content");
                if (!isEmpty(link)) url = "https://twitter.com/intent/tweet?url=" + link;
            }
            if (a == "share-google") url = "https://plus.google.com/share?url=" + purl;
            if (a == "share-linkedin") url = "https://www.linkedin.com/shareArticle?url=" + purl;
            openWindow(url);
        });
        document_querySelector(body)
            .find("[data-anima]")
            .each(function () {
                var tr = document_querySelector(this).attr("data-trigger");
                if (isEmpty(tr) || tr == "scroll" || tr == "load") {
                    var an = document_querySelector(this).find(".anima,*[data-anima]");
                    if (isEmpty(an)) an = this;
                    var cont = null;
                    var x = 0;
                    document_querySelector(an).each(function () {
                        if (!document_querySelector(this).hasClass("anima") && an != this) {
                            cont = this;
                        } else {
                            if ((cont != null && !document_querySelector.contains(cont, this)) || cont == null) {
                                document_querySelector(this).css("opacity", 0);
                                x++;
                            }
                        }
                    });
                    if (x == 0) document_querySelector(this).css("opacity", 0);
                }
                if (!isEmpty(tr) && tr == "load") initAnima(this);
            });
        document_querySelector(body).on("click", "[data-anima][data-trigger=click]", function () {
            outAnima(this);
            initAnima(this);
        });
        document_querySelector(body).on("mouseenter", "[data-anima][data-trigger=hover]", function () {
            initAnima(this);
        });
        document_querySelector(body).on("mouseleave", "[data-anima][data-trigger=hover]", function () {
            document_querySelector(this).stop(true, false);
            outAnima(this);
        });
        if (window_width > 992) {
            document_querySelector(nav).on("click", ".search-box-menu > i", function () {
                document_querySelector(this).parent().toggleClass("active");
            });
            document_querySelector(body).on("mouseenter", "nav[data-menu-anima] .menu-cnt > ul > li > a,nav[data-menu-anima] .lan-menu > li > a", function () {
                document_querySelector(this).parent().find(" > ul, > .mega-menu").css("opacity", 0).css("transition-duration", "0ms").showAnima(document_querySelector("nav").data("menu-anima"));
            });
            document_querySelector(body).on("mouseenter", ".menu-subline .menu-cnt > ul li", function () {
                document_querySelector(nav).find(".subline-bar ul").removeClass("active").eq(document_querySelector(this).index()).addClass("active");
            });
            document_querySelector(nav).on("mouseleave", ".subline-bar", function () {
                document_querySelector(this).find("ul").removeClass("active");
            });
            if (document_querySelector(nav).hasClass("menu-side-collapse")) {
                document_querySelector(nav).on("click", ".menu-cnt > ul > li > a", function () {
                    var item = document_querySelector(this).parent();
                    var active = document_querySelector(item).hasClass("active");
                    document_querySelector(nav).find(".menu-cnt > ul > li").removeClass("active");
                    if (!active) {
                        var sub_menu = document_querySelector(item).find(" > ul,.mega-menu");
                        document_querySelector(item).addClass("active");
                        if (sub_menu.length) {
                            var item_height = document_querySelector(sub_menu).height() + 15;
                            document_querySelector(sub_menu).css("height", "0");
                            document_querySelector(sub_menu).animate({ height: item_height }, 500, function () {
                                document_querySelector(sub_menu).css("height", "");
                            });
                        }
                    }
                });
            }
            if (document_querySelector(nav).hasClass("menu-fixed")) {
                document_querySelector(header).css("margin-top", document_querySelector(nav).height());
            }
        } else {
            document_querySelector(body).on("click", ".menu-cnt > ul > li > a,.lan-menu a", function () {
                var li = document_querySelector(this).parent();
                var active = document_querySelector(li).hasClass("active");
                document_querySelector(body).find(" > nav .menu-cnt > ul > li,.shop-menu-cnt,.lan-menu li").removeClass("active");
                if (!active) document_querySelector(li).addClass("active");
                if (document_querySelector(nav).hasClass("menu-subline")) {
                    var bar = document_querySelector(".subline-bar");
                    document_querySelector(nav).find(".subline-bar ul").removeClass("active");
                    document_querySelector(bar).css("margin-top", document_querySelector(li).offset().top + document_querySelector(li).height() + "px");
                    if (!active) {
                        document_querySelector(nav).find(".subline-bar ul").removeClass("active").eq(document_querySelector(li).index()).addClass("active");
                    }
                }
            });
            document_querySelector(nav).on("click", ".dropdown > a", function (e) {
                e.preventDefault();
            });
            document_querySelector(body).on("click", ".shop-menu-cnt", function () {
                document_querySelector(this).toggleClass("active");
            });
            document_querySelector(body).on("click", ".menu-inner:not(.menu-inner-vertical) > ul > li > a", function () {
                document_querySelector(this).parent().toggleClass("active");
            });
            if (document_querySelector(nav).hasClass("menu-fixed")) {
                document_querySelector(nav)
                    .find(".menu-cnt")
                    .css("max-height", window_height - 5 - document_querySelector(nav).find(" > .container").outerHeight() + "px");
            }
        }
        document_querySelector(nav).on("click", ".menu-btn", function () {
            let active = document_querySelector(nav).hasClass("active");
            let menu_cnt = document_querySelector(nav).find(".menu-cnt");
            let h;
            if (active) {
                h = 0;
            } else {
                document_querySelector(menu_cnt).css({ opacity: "0", height: "auto" });
                h = document_querySelector(menu_cnt).outerHeight();
                document_querySelector(menu_cnt).css({ opacity: "", height: "" });
            }
            if (!active) document_querySelector(nav).addClass("active");
            document_querySelector(menu_cnt).animate({ height: h }, 300, function () {
                setTimeout(function () {
                    if (active) {
                        document_querySelector(nav).removeClass("active");
                        document_querySelector(menu_cnt).css("height", "0");
                    } else {
                        document_querySelector(menu_cnt).css("height", "auto");
                    }
                }, 300);
            });
        });
        document_querySelector(body).on("click", ".menu-inner-vertical .dropdown", function () {
            var active = document_querySelector(this).hasClass("active");
            document_querySelector(this).closest(".menu-inner").find(".dropdown").removeClass("active");
            if (!active) document_querySelector(this).addClass("active");
        });
        document_querySelector(body).on("click", ".menu-inner:not(.menu-inner-vertical) > div", function () {
            document_querySelector(this).parent().toggleClass("active");
        });
        onePageScroll(document_querySelector(".menu-inner,.menu-one-page"));
        if (navigator.userAgent.indexOf("MSIE") !== -1 || navigator.appVersion.indexOf("Trident/") > 0) {
            document_querySelector(body).addClass("iex");
        }
        document_querySelector(body).on("click", 'a[href="#"]', function (e) {
            e.preventDefault();
        });
        document_querySelector(body)
            .find("[data-href].lightbox")
            .each(function () {
                document_querySelector(this).attr("href", document_querySelector(this).attr("data-href"));
                document_querySelector(this).initMagnificPopup();
            });
        document_querySelector(body).on("click", "[data-href]", function (e) {
            var css = document_querySelector(this).attr("class");
            if (css.indexOf("scroll-to") == -1 && css.indexOf("lightbox") == -1) {
                var link = document_querySelector(this).attr("data-href");
                if (link.indexOf("#") == 0) {
                    if (link != "#") {
                        document_querySelector(link).scrollTo();
                    }
                    e.preventDefault();
                } else {
                    var target = document_querySelector(this).attr("data-target");
                    if (!isEmpty(target) && target == "_blank") window.open(link);
                    else document.location = link;
                }
            }
        });
        document_querySelector(body)
            .find(".full-screen")
            .each(function () {
                document_querySelector(this).sizeFullScreen(document_querySelector(this).attr("data-offset"));
            });
        document_querySelector(body).on("click", ".icon-links-popup > i", function () {
            document_querySelector(this).parent().toggleClass("active");
        });
        if (window_width > 992) {
            document_querySelector(".section-two-blocks .content").each(function () {
                var t = this;
                setTimeout(function () {
                    var h = document_querySelector(t).outerHeight();
                    var cnt = document_querySelector(t).closest(".section-two-blocks");
                    if (isEmpty(document_querySelector(cnt).attr("data-parallax"))) document_querySelector(cnt).css("height", h);
                    document_querySelector(cnt.find(".row > div:first-child")).renderLoadedImgs();
                }, 300);
            });
            if (document_querySelector(footer_parallax).length) {
                document_querySelector(body)
                    .find("main")
                    .addClass("footer-parallax-cnt")
                    .css("margin-bottom", document_querySelector(footer_parallax).outerHeight() + "px");
            }
        }
        if (document_querySelector(body).hasClass("admin-bar")) {
            if (document_querySelector(nav).hasClass("menu-fixed") || document_querySelector(nav).hasClass("menu-side")) document_querySelector(nav).css("margin-top", "32px");
        }
        document_querySelector(nav)
            .find("a")
            .each(function () {
                if (document_querySelector(this).attr("href") == window.location.href) {
                    if (document_querySelector(this).closest(".dropdown-menu").length) {
                        document_querySelector(this).closest(".dropdown.multi-level:not(.dropdown-submenu),.dropdown.mega-dropdown").addClass("active");
                    } else {
                        document_querySelector(this).closest("li").addClass("active");
                    }
                }
            });
        document_querySelector(body).on("click", ".album-box", function () {
            var album = document_querySelector(this).closest(".album");
            var animation = document_querySelector(album).attr("data-album-anima");
            if (isEmpty(animation)) {
                animation = "fade-bottom";
            }
            document_querySelector(".album-title > span").html(document_querySelector(this).find(".caption h3").html());
            document_querySelector(album).addClass("active");
            document_querySelector(album).find(".album-item").removeClass(["active", animation]).eq(document_querySelector(this).index()).addClass("active").showAnima(animation);
        });
        document_querySelector(body).on("click", ".album-title > a", function () {
            var album = document_querySelector(this).closest(".album");
            document_querySelector(album).removeClass("active");
            document_querySelector(album).find(".album-list").css("opacity", 0).showAnima("fade-in");
        });
        if (document_querySelector(header).hasClass("header-video")) {
            document_querySelector(header).find(" > video").set_video_size(document_querySelector(header).width(), document_querySelector(header).height());
            if (document_querySelector(header).hasClass("video-parallax")) parallax_title_video = true;
        }
        document_querySelector(body)
            .find("[data-video-youtube]")
            .each(function () {
                document_querySelector(this).initYoutubeVideo();
            });
        document_querySelector(".section-video,.section-block .block-media").each(function () {
            document_querySelector(this).find(" > video").set_video_size(document_querySelector(this).width(), document_querySelector(this).height());
        });
        document_querySelector(".section-slider").each(function () {
            document_querySelector(this).init_background_slider();
        });
        if (document_querySelector(header).hasClass("header-slider")) {
            document_querySelector(header).init_background_slider();
        }
        setTimeout(function () {
            document_querySelector(window).scroll();
        }, 50);
        document_querySelector(body).on("click", ".scroll-top", function () {
            document_querySelector("html, body").stop().animate({ scrollTop: 0 }, "500", "swing");
        });
        document_querySelector(body).on("click", ".scroll-to", function (e) {
            var t = document_querySelector(this).attr("data-scroll-to");
            if (isEmpty(t)) t = document_querySelector(this).attr("href");
            if (isEmpty(t)) t = document_querySelector(this).attr("data-href");
            try {
                document_querySelector(t).scrollTo();
            } catch (e) {}
            if (t.indexOf("#") == 0 && (document_querySelector(this).hasClass("btn") || document_querySelector(this).hasClass("btn-text"))) e.preventDefault();
        });
        document_querySelector(body).addClass("no-transactions");
        document_querySelector(body).find(" > #preloader").fadeOut(300);
        setTimeout(function () {
            document_querySelector(body).removeClass("no-transactions");
        }, 400);
        var header_cnt = document_querySelector(header).find(".container");
        var data_anima = document_querySelector("[data-anima]");
        var scroll_1 = document_querySelector(".scroll-hide");
        var scroll_2 = document_querySelector(".scroll-change");
        var scroll_3 = document_querySelector(".scroll-show");
        var scroll_4 = document_querySelector(".scroll-top-btn");
        var scroll_5 = document_querySelector(".scroll-show-mobile");
        var scroll_6 = document_querySelector("nav.scroll-change .navbar-brand");
        var scroll_len = document_querySelector(".fp-enabled").length;
        var old_scroll = 0;
        var scroll_detect = document_querySelector("[data-scroll-detect] li");
        var scroll_detect_items = [];
        if (scroll_detect.length) {
            document_querySelector(scroll_detect).each(function () {
                var target = document_querySelector(this).find("a").attr("href");
                if (target.length > 1) {
                    scroll_detect_items.push(document_querySelector(body).find(document_querySelector(this).find("a").attr("href")));
                }
            });
        }
        document_querySelector(window).scroll(function () {
            var scroll = document_querySelector(window).scrollTop();
            if (old_scroll != scroll || old_scroll == 0) {
                var po = window.pageYOffset;
                var go = true;
                var dh = document_querySelector(document).height();
                old_scroll = scroll;
                if (scroll < 2200) {
                    document_querySelector(header_cnt)
                        .css("margin-top", po)
                        .css("opacity", 100 / po < 1 ? 100 / po : 1);
                    if (parallax_title_video) {
                        document_querySelector(header).find(" > video").css("margin-top", po);
                    }
                }
                if (scroll > 100 && go) {
                    go = false;
                    document_querySelector(scroll_1).addClass("hidden");
                    document_querySelector(scroll_2).addClass("scroll-css");
                    document_querySelector(scroll_3).addClass("showed");
                    document_querySelector(scroll_4).css("opacity", 1);
                    document_querySelector(nav).addClass("scroll-menu");
                    if (window_width < 994) document_querySelector(scroll_5).removeClass("hidden");
                    document_querySelector(scroll_6).hide().show(0);
                    if (document_querySelector(footer_parallax).length) {
                        if (scroll + window_height > dh - window_height) {
                            document_querySelector(footer_parallax).css("opacity", 1);
                        } else document_querySelector(footer_parallax).css("opacity", 0);
                    }
                }
                if (scroll < 100) {
                    go = true;
                    document_querySelector(scroll_1).removeClass("hidden");
                    if (!scroll_len) document_querySelector(scroll_2).removeClass("scroll-css");
                    document_querySelector(scroll_3).removeClass("showed");
                    document_querySelector(scroll_5).css("opacity", 0);
                    document_querySelector(scroll_6).hide().show(0);
                    document_querySelector(nav).removeClass("scroll-menu");
                }
                document_querySelector(data_anima).each(function () {
                    var tr = document_querySelector(this).attr("data-trigger");
                    if (isEmpty(tr) || tr == "scroll") {
                        if (isScrollView(this)) {
                            if (!isEmpty(document_querySelector(this).attr("data-anima"))) initAnima(this);
                            document_querySelector(this).attr("data-anima", "");
                        }
                    }
                });
                document_querySelector(scroll_detect_items).each(function (index) {
                    if (isScrollView(this)) {
                        document_querySelector(scroll_detect).removeClass("active").eq(index).addClass("active");
                    }
                });
                document_querySelector(sections_slider_parallax).each(function (index) {
                    if (isScrollView(this)) {
                        document_querySelector(sections_slider_parallax).eq(index).addClass("active");
                    } else {
                        document_querySelector(this).removeClass("active");
                    }
                });
            }
        });
        document_querySelector(window).resize(function () {
            window_width = document_querySelector(window).width();
            window_height = document_querySelector(window).height();
        });
        var shop_menu = document_querySelector(body).find(".shop-menu-cnt");
        populateShoppingCart();
        function populateShoppingCart() {
            if (document_querySelector("meta[content='wordpress']").length && document_querySelector(shop_menu).length) {
                document_querySelector.ajax({ method: "POST", url: ajax_url, data: { action: "hc_get_wc_cart_items" } }).done(function (response) {
                    if (!isEmpty(response) && response.length > 10) {
                        var arr = JSON.parse(response);
                        if (arr.length > 0) {
                            var currency = document_querySelector(shop_menu).find(".cart-total").attr("data-currency");
                            var total = 0;
                            var html = "";
                            for (var i = 0; i < arr.length; i++) {
                                total += arr[i]["price"] * arr[i]["quantity"];
                                html +=
                                    "<li onclick=\"document.location = '" +
                                    arr[i]["link"] +
                                    '\'" class="cart-item"><img src="' +
                                    arr[i]["image"] +
                                    '" alt=""><div class="cart-content"><h5>' +
                                    arr[i]["title"] +
                                    '</h5><span class="cart-quantity">' +
                                    arr[i]["quantity"] +
                                    " x " +
                                    currency +
                                    "" +
                                    arr[i]["price"] +
                                    "</span></div></li>";
                            }
                            document_querySelector(shop_menu).find(".shop-cart").html(html);
                            document_querySelector(shop_menu)
                                .find(".cart-total span")
                                .html(currency + "" + total);
                            document_querySelector(shop_menu).removeClass("shop-menu-empty");
                            document_querySelector(shop_menu)
                                .find("i")
                                .html('<span class="cart-count">' + arr.length + "</span>");
                        }
                    }
                });
            }
        }
        document_querySelector(body).on("click", ".ajax_add_to_cart,.product-remove a", function () {
            setTimeout(function () {
                populateShoppingCart();
            }, 2000);
        });
        if (document_querySelector(body).find(".comment-list .item").length == 0) {
            document_querySelector(body).find(".comments-cnt").addClass("no-comments");
        }
        document_querySelector(body)
            .find("[data-minitip]")
            .executeFunction("miniTip", function () {
                document_querySelector("[data-minitip]").each(function () {
                    document_querySelector(this).initMinitip();
                });
            });
        document_querySelector(body)
            .find(".img-box,.media-box")
            .executeFunction("imagesLoaded", function () {
                document_querySelector(".img-box,.media-box").each(function () {
                    document_querySelector(this).renderLoadedImgs();
                });
            });
        document_querySelector(body)
            .find(".maso-list")
            .executeFunction("isotope", function () {
                setTimeout(function () {
                    document_querySelector.fn.setGlobalVar(false, "firstLoad");
                }, 1000);
                document_querySelector(".maso-list").each(function () {
                    if (document_querySelector(this).attr("data-trigger") != "manual") document_querySelector(this).initIsotope();
                });
            });
        document_querySelector(body).on("click", ".maso-list .menu-inner a", function () {
            var f = document_querySelector(this).attr("data-filter");
            var t = document_querySelector(this).closest(".maso-list");
            if (!isEmpty(f))
                document_querySelector(t)
                    .find(".maso-box")
                    .isotope({ filter: "." + document_querySelector(this).attr("data-filter") });
            var lm = document_querySelector(t).find(".load-more");
            if (lm.length) {
                setTimeout(function () {
                    var i = 0;
                    var num = parseInt(document_querySelector(lm).attr("data-page-items"), 10);
                    document_querySelector(t)
                        .find(".maso-box .maso-item")
                        .each(function () {
                            if (document_querySelector(this).attr("style").indexOf("display: none") == -1) i++;
                        });
                    if (i < num) {
                        document_querySelector(t).find(".load-more").click();
                        var intervalMaso = setInterval(function () {
                            if (document_querySelector(t).find(".maso-box").height() < 10) {
                                document_querySelector(t).find(".load-more").click();
                            } else {
                                clearInterval(intervalMaso);
                            }
                        }, 100);
                    }
                }, 450);
            }
            if (document_querySelector(t).find(".maso-box .maso-item").length < 3) document_querySelector(t).find(".load-more-maso").click();
            document_querySelector(t).find("li").removeClass("active");
            document_querySelector(this).closest("li").addClass("active");
        });
        document_querySelector(body).on("click", ".maso-order", function () {
            var t = document_querySelector(this).closest(".maso-list").find(".maso-box");
            var sort = document_querySelector(this).attr("data-sort");
            if (sort == "asc") {
                t.isotope({ sortAscending: false });
                document_querySelector(this).attr("data-sort", "desc");
                document_querySelector(this).html("<i class='fa fa-arrow-up'></i>");
            } else {
                t.isotope({ sortAscending: true });
                document_querySelector(this).attr("data-sort", "asc");
                document_querySelector(this).html("data-sort");
                document_querySelector(this).html("<i class='fa fa-arrow-down'></i>");
            }
        });
        document_querySelector(body)
            .find(".grid-list.list-gallery .grid-box,.maso-list.list-gallery .maso-box, .lightbox,.box-lightbox,.lightbox-trigger,.woocommerce-product-gallery__image a")
            .executeFunction("magnificPopup", function () {
                document_querySelector(body)
                    .find(".grid-list.list-gallery .grid-box,.maso-list.list-gallery .maso-box,.lightbox,.woocommerce-product-gallery__image a")
                    .each(function () {
                        document_querySelector(this).initMagnificPopup();
                    });
                document_querySelector(window).scroll(function (event) {
                    document_querySelector(body)
                        .find("[data-trigger=scroll].lightbox-trigger")
                        .each(function () {
                            if (isScrollView(this)) {
                                document_querySelector(document_querySelector(this).attr("href")).initMagnificPopup();
                                document_querySelector(this).attr("data-trigger", "null");
                            }
                        });
                });
                var url = getURLParameter("lightbox");
                var id = getURLParameter("id");
                if (!isEmpty(id)) id = "#" + id + " ";
                if (!isEmpty(url)) {
                    if (url.indexOf("list") > -1) {
                        document_querySelector(id + ".grid-box .grid-item:nth-child(" + url.replace("list-", "") + ") .img-box").click();
                        document_querySelector(id + ".maso-box .maso-item:nth-child(" + url.replace("list-", "") + ") .img-box").click();
                    } else {
                        if (url.indexOf("slide") > -1) {
                            document_querySelector(id + ".slides > li:nth-child(" + url.replace("slide-", "") + ") .img-box").click();
                        } else {
                            var t = document_querySelector("#" + url);
                            if (document_querySelector(t).length) {
                                if (document_querySelector(t).hasClass("img-box") || document_querySelector(t).hasClass("lightbox")) {
                                    document_querySelector(t).click();
                                } else {
                                    var c = document_querySelector(t).find(".img-box,.lightbox");
                                    if (c.length) {
                                        document_querySelector(c).click();
                                    } else {
                                        if (document_querySelector(t).hasClass("box-lightbox")) {
                                            document_querySelector.magnificPopup.open({ type: "inline", items: { src: "#" + url }, mainClass: "lightbox-on-load" });
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            });
        document_querySelector(body)
            .find("[data-trigger=load].box-lightbox")
            .each(function () {
                var e = document_querySelector(this).attr("data-expire");
                if (!isEmpty(e) && e > 0) {
                    var id = document_querySelector(this).attr("id");
                    if (isEmpty(Cookies.get(id))) {
                        document_querySelector(this).initMagnificPopup();
                        Cookies.set(id, "expiration-cookie", { expire: e });
                    }
                } else document_querySelector(this).initMagnificPopup();
            });
        document_querySelector(body)
            .find(".scroll-box,.menu-side")
            .executeFunction("slimScroll", function () {
                document_querySelector(body)
                    .find(".scroll-box")
                    .each(function () {
                        document_querySelector(this).initSlimScroll();
                    });
                if (window_width > 992) {
                    var menu = document_querySelector(body).find(".menu-side-collapse .menu-cnt");
                    document_querySelector(menu).slimScroll({ height: document_querySelector(menu).height() - 20, color: document_querySelector(menu).attr("data-bar-color"), size: "4px", distance: "0px", start: "bottom" });
                }
            });
        document_querySelector(parallax_items).executeFunction("parallax", function () {
            document_querySelector(parallax_items).each(function (index) {
                var ken = "";
                document_querySelector(this).initParallax();
                if (document_querySelector(this).hasClass("ken-burn-in")) ken = "ken-burn-in";
                if (document_querySelector(this).hasClass("ken-burn-out")) ken = "ken-burn-out";
                if (document_querySelector(this).hasClass("ken-burn-center")) ken = "ken-burn-center";
                if (document_querySelector(this).hasClass("parallax-side")) ken += " parallax-side-cnt";
                if (ken != "") {
                    setTimeout(function () {
                        document_querySelector(".parallax-mirror:eq(" + (index - 1) + ")").addClass(ken);
                    }, 100);
                }
            });
            var timerVar;
            var times = 0;
            var isFP = document_querySelector("html").hasClass("fp-enabled");
            timerVar = self.setInterval(function () {
                if (times > 30) {
                    clearInterval(timerVar);
                } else {
                    if (!isFP) document_querySelector(window).trigger("resize").trigger("scroll");
                }
                times = times + 1;
            }, 100);
            if (!front_composer && document_querySelector(parallax_items).length) {
                setInterval(function () {
                    document_querySelector(window).trigger("resize").trigger("scroll");
                }, 400);
            }
        });
        document_querySelector(body)
            .find(".countdown [data-time],[data-to],[data-progress]")
            .executeFunction("downCount", function () {
                document_querySelector(body).init_progress_all();
            });
    });
    (function (n) {
        if (typeof define == "function" && define.amd) define(n);
        else if (typeof exports == "object") module.exports = n();
        else {
            var i = window.Cookies,
                t = (window.Cookies = n());
            t.noConflict = function () {
                return (window.Cookies = i), t;
            };
        }
    })(function () {
        function n() {
            for (var n = 0, r = {}, t, i; n < arguments.length; n++) {
                t = arguments[n];
                for (i in t) r[i] = t[i];
            }
            return r;
        }
        function t(i) {
            function r(t, u, f) {
                var o, s;
                if (arguments.length > 1) {
                    f = n({ path: "/" }, r.defaults, f);
                    typeof f.expires == "number" && ((s = new Date()), s.setMilliseconds(s.getMilliseconds() + f.expires * 864e5), (f.expires = s));
                    try {
                        o = JSON.stringify(u);
                        /^[\{\[]/.test(o) && (u = o);
                    } catch (y) {}
                    return (
                        (u = encodeURIComponent(String(u))),
                        (u = u.replace(/%(23|24|26|2B|3A|3C|3E|3D|2F|3F|40|5B|5D|5E|60|7B|7D|7C)/g, decodeURIComponent)),
                        (t = encodeURIComponent(String(t))),
                        (t = t.replace(/%(23|24|26|2B|5E|60|7C)/g, decodeURIComponent)),
                        (t = t.replace(/[\(\)]/g, escape)),
                        (document.cookie = [t, "=", u, f.expires && "; expires=" + f.expires.toUTCString(), f.path && "; path=" + f.path, f.domain && "; domain=" + f.domain, f.secure ? "; secure" : ""].join(""))
                    );
                }
                t || (o = {});
                for (var l = document.cookie ? document.cookie.split("; ") : [], a = /(%[0-9A-Z]{2})+/g, h = 0; h < l.length; h++) {
                    var v = l[h].split("="),
                        c = v[0].replace(a, decodeURIComponent),
                        e = v.slice(1).join("=");
                    e.charAt(0) === '"' && (e = e.slice(1, -1));
                    try {
                        if (((e = (i && i(e, c)) || e.replace(a, decodeURIComponent)), this.json))
                            try {
                                e = JSON.parse(e);
                            } catch (y) {}
                        if (t === c) {
                            o = e;
                            break;
                        }
                        t || (o[c] = e);
                    } catch (y) {}
                }
                return o;
            }
            return (
                (r.get = r.set = r),
                (r.getJSON = function () {
                    return r.apply({ json: !0 }, [].slice.call(arguments));
                }),
                (r.defaults = {}),
                (r.remove = function (t, i) {
                    r(t, "", n(i, { expires: -1 }));
                }),
                (r.withConverter = t),
                r
            );
        }
        return t();
    });
    document_querySelector.fn.toggleClick = function (n) {
        var t = arguments,
            r = n.guid || document_querySelector.guid++,
            i = 0,
            u = function (r) {
                var u = (document_querySelector._data(this, "lastToggle" + n.guid) || 0) % i;
                return document_querySelector._data(this, "lastToggle" + n.guid, u + 1), r.preventDefault(), t[u].apply(this, arguments) || !1;
            };
        for (u.guid = r; i < t.length; ) t[i++].guid = r;
        return this.click(u);
    };
    document_querySelector.fn.showAnima = function (a, b) {
        var t = this;
        if (a === "default") a = document_querySelector.fn.getGlobalVar("default_anima");
        document_querySelector(t).removeClass(a);
        if (!isEmpty(b) && b === "complete") {
            document_querySelector(t).attr("data-anima", a).attr("data-trigger", "manual");
            initAnima(t);
        } else {
            setTimeout(function () {
                var time = document_querySelector(t).data("time");
                document_querySelector(t)
                    .css(cssInit(0, isEmpty(time) ? 500 : time))
                    .addClass(a);
                document_querySelector(t).css("opacity", "");
            }, 100);
        }
    };
    document_querySelector.fn.sizeFullScreen = function (offset) {
        if (isEmpty(offset)) offset = 0;
        if (!isEmpty(this)) {
            document_querySelector(this).css("height", window_height - offset);
        }
    };
    document_querySelector.fn.scrollTo = function () {
        if (!isEmpty(this)) {
            document_querySelector("html, body").animate({ scrollTop: document_querySelector(this).offset().top - 50 }, 1000);
        }
    };
    document_querySelector.fn.expandItem = function () {
        var t = this;
        document_querySelector(t).css("display", "block").css("height", "");
        var h = document_querySelector(t).height();
        document_querySelector(t).css("height", 0).css("opacity", 1);
        document_querySelector(t).animate({ height: h }, 300, function () {
            document_querySelector(t).css("height", "");
        });
    };
    document_querySelector.fn.collapseItem = function () {
        var t = this;
        document_querySelector(t).animate({ height: 0 }, 300, function () {
            document_querySelector(t).css("display", "none");
        });
    };
    document_querySelector.fn.set_video_size = function (w, h) {
        var video_height = document_querySelector(this).height();
        var video_width = document_querySelector(this).width();
        var new_width;
        var new_height;
        if (video_height < h || video_width < w) {
            var proportion = h / video_height;
            new_width = w * proportion;
            document_querySelector(this).css("width", new_width + "px");
        }
        new_height = document_querySelector(this).height();
        if (new_width > w) {
            document_querySelector(this).css("margin-left", "-" + (new_width - w) / 2 + "px");
        }
        if (new_height > h) {
            document_querySelector(this).css("margin-top", "-" + (new_height - h) / 2 + "px");
        }
    };
    document_querySelector.fn.initYoutubeVideo = function () {
        var id = document_querySelector(this).attr("data-video-youtube");
        if (!isEmpty(id)) {
            if (id.indexOf("http:") != -1 || id.indexOf("www.you") != -1 || id.indexOf("youtu.be") != -1) {
                if (id.indexOf("?v=") != -1) id = id.substring(id.indexOf("v=") + 2);
                if (id.indexOf("youtu.be") != -1) id = id.substring(id.lastIndexOf("/") + 1);
            }
            var vq = document_querySelector(this).attr("data-video-quality");
            var pars = "";
            if (!isEmpty(vq)) {
                if (vq == "hc-hd") pars += "&amp;vq=hd1080";
            }
            document_querySelector(this).html(
                '<iframe frameborder="0" allowfullscreen="0" src="https://www.youtube.com/embed/' +
                    id +
                    "?playlist=" +
                    id +
                    "&amp;vq=hd1080&amp;loop=1&amp;start=0&amp;autoplay=1&amp;mute=1&amp;controls=0&amp;showinfo=0&amp;wmode=transparent&amp;iv_load_policy=3&amp;modestbranding=1&amp;rel=0&amp;enablejsapi=1&amp;volume=0" +
                    pars +
                    '"></iframe>'
            );
        }
    };
    document_querySelector.fn.getHeight = function () {
        if (!isEmpty(this)) return document_querySelector(this)[0].clientHeight;
        else return 0;
    };
    document_querySelector.fn.executeFunction = function (functionName, myfunction) {
        var timer;
        if (document_querySelector(this).length > 0) {
            if (typeof window["document_querySelector"]["fn"][functionName] === "function" || typeof window[functionName] === "function") {
                myfunction();
            } else {
                timer = setInterval(function () {
                    if (typeof window["document_querySelector"]["fn"][functionName] === "function" || typeof window[functionName] === "function") {
                        myfunction();
                        clearInterval(timer);
                    }
                }, 300);
            }
        }
    };
    document_querySelector.fn.getGlobalVar = function (name) {
        return eval(name);
    };
    document_querySelector.fn.setGlobalVar = function (value, name) {
        window[name] = value;
    };
    document_querySelector.fn.init_background_slider = function () {
        var interval = document_querySelector(this).attr("data-interval");
        var slides = document_querySelector(this).find(" > .background-slider > div");
        var count = document_querySelector(slides).length;
        var index = 1;
        if (interval != "0") {
            if (isEmpty(interval)) interval = 3000;
            setInterval(function () {
                index += 1;
                document_querySelector(slides).removeClass("active");
                document_querySelector(slides)
                    .eq(index % count)
                    .addClass("active");
            }, interval);
        }
    };
    document_querySelector.fn.initMinitip = function () {
        document_querySelector(this).miniTip({ title: document_querySelector(this).attr("data-title"), content: document_querySelector(this).attr("data-minitip"), anchor: document_querySelector(this).attr("data-pos"), delay: 500 });
    };
    document_querySelector.fn.renderLoadedImgs = function () {
        if (document_querySelector.isFunction(document_querySelector.fn.imagesLoaded)) {
            var isIsotope = false;
            var document_querySelectorisotope;
            var imgLoad = imagesLoaded(document_querySelector(this));
            if (document_querySelector(this).hasClass("maso-box")) {
                isIsotope = true;
                document_querySelectorisotope = this;
            }
            imgLoad.on("progress", function (instance, image) {
                if (!document_querySelector(image.img).parent().hasClass("hc-image")) {
                    var result = image.isLoaded ? "loaded" : "broken";
                    var target = "a";
                    if (document_querySelector(image.img).closest(".img-box").length) target = ".img-box";
                    else if (document_querySelector(image.img).closest(".media-box").length) target = ".media-box";
                    else if (document_querySelector(image.img).closest("ul.glide__slides").length) target = ".glide__slides";
                    else if (document_querySelector(image.img).closest("figure").length) target = "figure";
                    var cont = document_querySelector(image.img).closest(target);
                    var imgHeight = image.img.clientHeight;
                    var imgWidth = image.img.clientWidth;
                    var colWidth = 0;
                    var colHeight = 0;
                    if (!isEmpty(cont.get(0))) {
                        colWidth = cont.get(0).clientWidth;
                        colHeight = cont.get(0).clientHeight;
                    }
                    if (result == "loaded") {
                        if (isIsotope) {
                            document_querySelectorisotope.isotope("layout");
                            var mi = document_querySelector(image.img).closest(".maso-item");
                            document_querySelector(mi).css("visibility", "visible");
                            document_querySelector(mi).find("> *").animate({ opacity: 1 }, 300);
                        }
                        document_querySelector(image.img).css("transition", "none");
                        if (imgHeight > colHeight) {
                            document_querySelector(image.img).css("margin-top", "-" + Math.floor((imgHeight - colHeight) / 2) + "px");
                        } else {
                            var proportion = colHeight / imgHeight;
                            var newWidth = imgWidth * proportion;
                            if (newWidth / imgWidth > 1) {
                                document_querySelector(image.img)
                                    .css("max-width", Math.ceil(newWidth) + "px")
                                    .css("width", Math.ceil(newWidth) + "px");
                                document_querySelector(image.img).css("margin-left", "-" + Math.floor((newWidth - colWidth) / 2) + "px");
                            }
                        }
                        setTimeout(function () {
                            document_querySelector(image.img).css("transition", "");
                        }, 100);
                    }
                }
            });
        }
    };
    document_querySelector.fn.initPagination = function () {
        var opt = document_querySelector(this).attr("data-options");
        var a = document_querySelector(this).attr("data-pagination-anima");
        var p = parseInt(document_querySelector(this).attr("data-page-items"), 10);
        var c = document_querySelector(this).closest(".maso-list");
        var t = document_querySelector(c).find(".maso-box");
        var items = t.isotope("getItemElements");
        var n = document_querySelector(items).length;
        var type = "";
        if (document_querySelector(this).hasClass("load-more")) type = "load-more";
        if (document_querySelector(this).hasClass("pagination")) type = "pagination";
        for (var i = p; i < n; i++) {
            t.isotope("remove", items[i]);
        }
        t.isotope("layout");
        if (type == "pagination") {
            var optionsArr;
            var options = {
                totalPages: Math.ceil(n / p),
                visiblePages: 7,
                first: "First",
                last: "Last",
                next: "Next",
                prev: "Previous",
                onPageClick: function (event, page) {
                    t.isotope("remove", t.isotope("getItemElements"));
                    for (var i = p * (page - 1); i < p * page; i++) {
                        t.isotope("insert", items[i]);
                    }
                    t.isotope("layout");
                    if (!isEmpty(opt) && opt.indexOf("scrollTop:true") != -1) document_querySelector(c).scrollTo();
                },
            };
            if (!isEmpty(opt)) {
                optionsArr = opt.split(",");
                options = getOptionsString(opt, options);
            }
            document_querySelector(this).twbsPagination(options);
        }
        if (type == "load-more") {
            var tl = this;
            document_querySelector(tl).on("click", function (index) {
                loadMoreMaso(this);
            });
            if (!isEmpty(opt) && opt.indexOf("lazyLoad:true") != -1) {
                document_querySelector(window).scroll(function () {
                    if (document_querySelector(window).scrollTop() + window_height == document_querySelector(document).height()) {
                        if (document_querySelector.fn.getGlobalVar("firstLoad"))
                            setTimeout(function () {
                                loadMoreMaso(tl);
                            }, 800);
                        else loadMoreMaso(tl);
                    }
                });
            }
        }
        function loadMoreMaso(obj) {
            var page = document_querySelector(obj).attr("data-current-page");
            if (isEmpty(page)) page = 1;
            page++;
            document_querySelector(obj).attr("data-current-page", page);
            var s = p * (page - 1);
            var e = p * page;
            for (var i = s; i < p * page; i++) {
                t.isotope("insert", items[i]);
            }
            t.isotope("layout");
            if (document_querySelector.isFunction(document_querySelector.fn.renderLoadedImgs)) {
                document_querySelector(t).renderLoadedImgs();
            }
            if (e >= n) document_querySelector(obj).hide(300);
        }
    };
    document_querySelector.fn.initIsotope = function () {
        if (document_querySelector.isFunction(document_querySelector.fn.isotope)) {
            var m = document_querySelector(this).find(".maso-box");
            var menu = document_querySelector(this).find(".menu-inner");
            var optionsString = document_querySelector(this).attr("data-options");
            var optionsArr;
            var options = {
                itemSelector: ".maso-item",
                percentPosition: true,
                masonry: { columnWidth: ".maso-item", horizontalOrder: true },
                getSortData: {
                    number: function (e) {
                        return parseInt(document_querySelector(e).attr("data-sort"), 10);
                    },
                },
                sortBy: "number",
            };
            if (!isEmpty(optionsString)) {
                optionsArr = optionsString.split(",");
                options = getOptionsString(optionsString, options);
            }
            if (document_querySelector(menu).length && !front_composer) {
                var len = document_querySelector(m).find(".maso-item").length;
                document_querySelector(menu)
                    .find("li a:not(.maso-filter-auto)")
                    .each(function () {
                        var cat = document_querySelector(this).attr("data-filter");
                        var current_len = document_querySelector(m).find("." + cat).length;
                        if ((current_len == len || current_len == 0) && cat != "maso-item" && !isEmpty(cat)) {
                            document_querySelector(this).closest("li").remove();
                        }
                    });
            }
            document_querySelector(m).isotope(options);
            if (document_querySelector.isFunction(document_querySelector.fn.renderLoadedImgs)) {
                var items = m.isotope("getItemElements");
                document_querySelector(m).renderLoadedImgs();
            }
            if (document_querySelector(this).find("img").length == 0) {
                document_querySelector(this).find(".maso-item").css("visibility", "visible");
                document_querySelector(this).find(".maso-item > *").animate({ opacity: 1 }, 300);
            }
            document_querySelector(this).find(".pagination,.load-more").initPagination();
        }
    };
    document_querySelector.fn.initParallax = function (img) {
        var bleed = document_querySelector(this).attr("data-bleed");
        var pos = document_querySelector(this).attr("data-position");
        var id = document_querySelector(this).attr("id");
        if (isEmpty(bleed) && !(bleed == "0")) bleed = 70;
        if (isEmpty(pos)) pos = "center";
        var arr = { bleed: bleed, positionY: pos };
        if (!isEmpty(img)) {
            arr["imageSrc"] = img;
        }
        document_querySelector(this).parallax(arr);
    };
    document_querySelector.fn.initMagnificPopup = function () {
        var obj = this;
        var optionsString = document_querySelector(obj).attr("data-options");
        var trigger = document_querySelector(obj).attr("data-trigger");
        if (isEmpty(trigger)) trigger = "";
        var a = document_querySelector(obj).attr("data-lightbox-anima");
        var href = document_querySelector(obj).attr("href");
        if (isEmpty(href)) href = "";
        if (isEmpty(a)) a = document_querySelector(obj).parent().attr("data-lightbox-anima");
        var optionsArr;
        var options = { type: "iframe" };
        if (!isEmpty(optionsString)) {
            optionsArr = optionsString.split(",");
            options = getOptionsString(optionsString, options);
        }
        if (isEmpty(options["mainClass"])) options["mainClass"] = "";
        if (trigger == "load" || trigger == "scroll") {
            var l = document_querySelector(obj).attr("data-link");
            var c = document_querySelector(obj).attr("data-click");
            if (isEmpty(l)) {
                href = "#" + document_querySelector(this).attr("id");
                options["mainClass"] += " custom-lightbox";
            } else href = l;
            if (!isEmpty(c)) {
                document_querySelector("body").on("click", ".lightbox-on-load", function () {
                    if (document_querySelector(obj).attr("data-click-target") == "_blank") window.open(c);
                    else document.location = c;
                });
            }
        }
        if (document_querySelector(obj).hasClass("grid-box") || document_querySelector(obj).hasClass("maso-box")) {
            options["type"] = "image";
            options["delegate"] = "a.img-box,.cnt-box a:not(.img-box),.media-box";
            options["gallery"] = { enabled: 1 };
        }
        if (href.indexOf(".jpg") != -1 || href.indexOf(".png") != -1 || href.indexOf("placehold.it") != -1) {
            options["type"] = "image";
        }
        if (href.indexOf("#") == 0) {
            options["type"] = "inline";
            options["mainClass"] += " box-inline";
            options["closeBtnInside"] = 0;
        }
        options["callbacks"] = {
            open: function () {
                var mfp_cnt = document_querySelector(".mfp-content");
                if (!isEmpty(a)) {
                    document_querySelector(mfp_cnt).showAnima(a);
                    document_querySelector(mfp_cnt).css("opacity", 0);
                } else {
                    if (!isEmpty(optionsString) && optionsString.indexOf("anima:") != -1) {
                        document_querySelector(mfp_cnt).showAnima(options["anima"]);
                        document_querySelector(mfp_cnt).css("opacity", 0);
                    }
                }
                if (href.indexOf("#") == 0) {
                    document_querySelector(href).css("display", "block");
                }
                var gm = document_querySelector(mfp_cnt).find(".google-map");
                if (document_querySelector.isFunction(document_querySelector.fn.googleMap) && document_querySelector(gm).length) document_querySelector(gm).googleMap();
            },
            change: function (item) {
                var h = this.content;
                document_querySelector(".mfp-container").removeClass("active");
                setTimeout(function () {
                    document_querySelector(".mfp-container").addClass("active");
                }, 500);
                var gm = document_querySelector(h).find(".google-map");
                if (document_querySelector.isFunction(document_querySelector.fn.googleMap) && document_querySelector(gm).length) document_querySelector(gm).googleMap();
            },
            close: function () {
                if (document_querySelector.isFunction(document_querySelector.fn.fullpage) && document_querySelector.isFunction(document_querySelector.fn.fullpage.setMouseWheelScrolling)) document_querySelector.fn.fullpage.setMouseWheelScrolling(true);
            },
        };
        if (trigger != "load" && trigger != "scroll") document_querySelector(obj).magnificPopup(options);
        else {
            if (href.indexOf("#") == 0) document_querySelector(href).css("display", "block");
            options["items"] = { src: href };
            options["mainClass"] += " lightbox-on-load";
            document_querySelector.magnificPopup.open(options);
        }
    };
    document_querySelector.fn.restartSlimScroll = function () {
        var parent = document_querySelector(this).parent();
        if (document_querySelector(parent).hasClass("slimScrollDiv")) {
            document_querySelector(this).removeData("slimScroll");
            document_querySelector(parent).find(".slimScrollBar").remove();
            document_querySelector(parent).find(".slimScrollRail").remove();
            document_querySelector(parent).replaceWith(this);
        }
        document_querySelector(this).initSlimScroll();
    };
    document_querySelector.fn.initSlimScroll = function () {
        function getHeightFullscreen(t, wh) {
            if (vh == "fullscreen") {
                var h = wh;
                if (!isEmpty(lh) && wh - lh > 150) h = wh - lh;
                else h = wh - 100;
                vh = h;
            }
            return vh;
        }
        let disable_md = document_querySelector(this).hasClass("disable-md");
        let disable_sm = document_querySelector(this).hasClass("disable-sm");
        if ((disable_md && window_width > 992) || (disable_sm && window_width > 768) || (!disable_md && !disable_sm) || window_width > 992) {
            var vh = document_querySelector(this).attr("data-height");
            var lh = document_querySelector(this).attr("data-offset");
            var railColor = document_querySelector(this).attr("data-rail-color");
            var barColor = document_querySelector(this).attr("data-bar-color");
            var optionsString = document_querySelector(this).attr("data-options");
            var optionsArr;
            var options = { height: 0, size: "4px", railVisible: true, alwaysVisible: true, color: isEmpty(barColor) ? "#888888" : barColor, railColor: isEmpty(railColor) ? "#e6e6e6" : railColor, railOpacity: 1 };
            if (!isEmpty(optionsString)) {
                optionsArr = optionsString.split(",");
                options = getOptionsString(optionsString, options);
            }
            if (window_width < 993) options["alwaysVisible"] = true;
            if (vh == "fullscreen") {
                if (!isEmpty(lh) && window_width - lh > 150) h = window_width - lh;
                else h = window_width - 100;
                vh = h;
            }
            var lh = document_querySelector(this).attr("data-height-remove");
            if (isEmpty(lh)) lh = 0;
            vh += "";
            if (vh.indexOf("#") != -1 || vh.indexOf(".") != -1) {
                document_querySelector(this).css("height", "0px").css("overflow", "hidden");
                vh = "" + (document_querySelector(this).closest(vh).height() - lh);
                document_querySelector(this).css("height", "").css("overflow", "");
            }
            options["height"] = vh + "px";
            document_querySelector(this).slimScroll(options);
            var gm = document_querySelector(this).find(".google-map");
            if (document_querySelector.isFunction(document_querySelector.fn.googleMap) && document_querySelector(gm).length) document_querySelector(gm).googleMap();
            if (!options["alwaysVisible"]) document_querySelector(".slimScrollBar").hide();
            if (window_width < 993) document_querySelector(this).find(".slimScrollBar").css("height", "50px");
            document_querySelector(this).on("mousewheel DOMMouseScroll", function (n) {
                n.preventDefault();
            });
            document_querySelector(this)
                .slimScroll()
                .bind("slimscroll", function (e, pos) {
                    if (pos != "scrolling") {
                        document_querySelector(this).removeClass("scroll-pos-top").removeClass("scroll-pos-bottom");
                    }
                    document_querySelector(this).addClass("scroll-pos-" + pos);
                });
        }
    };
})(document.querySelector);
document.querySelector.fn.extend({
    cssInt: function (prop) {
        return parseInt(this.css(prop), 10) || 0;
    },
    hasAnyClass: function () {
        for (var i = 0; i < arguments.length; i++) {
            if (this.hasClass(arguments[i])) {
                return true;
            }
        }
        return false;
    },
});
