(function() {

    if (/msie6.0/.test(window.navigator.userAgent.toLowerCase().replace(/\s/g, "")) || /msie7.0/.test(window.navigator.userAgent.toLowerCase().replace(/\s/g, ""))) {
        return false;
    }

    if (typeof QQTAT == "undefined") {
        QQTAT = {};
    };
    String.prototype.realLength = function() {
        return this.replace(/[^\x00-\xff]/g, "**").length;
    };

    String.prototype.cut = function(limit) {
        if (this.realLength() <= limit) {
            return this;
        }
        var len = Math.min(this.length, limit);
        var tmp = '';
        for (var i = len; i >= 0; --i) {
            var tmp = this.substring(0, i);
            if (tmp.realLength() <= limit) {
                return tmp;
            }
        }
        return tmp;
    };

    String.prototype.trim = function() {
        return this.replace(/(^\s*)|(\s*$)/g, "");
    };

    QQTAT.config = {
        "zoomCurr": 0,
        "zooMmultiples": [1, 1.1, 1.3, 1.5]
    }

    QQTAT.lib = {
        "$Id": function(sId) {
            return document.getElementById(sId);
        },
        "$Tag": function(sTag) {
            return document.getElementsByTagName(sTag);
        },
        "$Create": function(sTag) {
            return document.createElement(sTag);
        },
        "$CreateText": function(sText) {
            return document.createTextNode(sText);
        },
        "$GetAttr": function(eTarget, sAttrName) {
            return eTarget.getAttribute(sAttrName);
        },
        "$SetAttr": function(eTarget, sAttrName, sAttrValue) {
            return eTarget.setAttribute(sAttrName, sAttrValue);
        },
        "$AddEvent": function(eTarget, sEvtName, fCallBack) {

            if (eTarget.attachEvent) {
                eTarget.attachEvent("on" + sEvtName, fCallBack)
            } else {
                eTarget.addEventListener(sEvtName, fCallBack, false)
            }
        },
        "$DelEvent": function(eTarget, sEvtName, fCallBack) {
            if (eTarget.detachEvent) {
                eTarget.detachEvent("on" + sEvtName, fCallBack)
            } else {
                eTarget.removeEventListener(sEvtName, fCallBack, false)
            }
        },
        "$Ready": function(eTarget, fCallback) {
            if (eTarget.attachEvent) {
                eTarget.onreadystatechange = function() {
                    if (this.readyState == 'loaded' || this.readyState == 'complete') {
                        fCallback()
                    }
                }
            } else {
                if (Object.prototype.toString.call(eTarget) === "[object HTMLDocument]") {
                    document.addEventListener('DOMContentLoaded', fCallback, false);
                    return;
                }
                eTarget.addEventListener('load', fCallback, false);
            }
        },
        "$Browser": {
            "ie": /msie|trident/.test(window.navigator.userAgent.toLowerCase()),
            "ie6": /msie6.0/.test(window.navigator.userAgent.toLowerCase().replace(/\s/g, "")),
            "ie7": /msie7.0/.test(window.navigator.userAgent.toLowerCase().replace(/\s/g, "")),
            "ie11": /rv11.0/.test(window.navigator.userAgent.toLowerCase().replace(/\s/g, "")),
            "mozilla": /firefox/.test(window.navigator.userAgent.toLowerCase()),
            "opera": /opera|opr/.test(window.navigator.userAgent.toLowerCase())
        },
        "$Contains": function(fatherobj, childobj) {
            if (!fatherobj.contains) {
                while (childobj != null && typeof(childobj.tagName) != "undefind") {
                    if (childobj == fatherobj) {
                        return true
                    };
                    childobj = childobj.parentNode

                }
                return false;
            } else {
                return fatherobj.contains(childobj);
            }
        },
        "$loadedJs": function(file, callback, charset) {
            var _doc = document.getElementsByTagName('head')[0];
            var js = document.createElement('script');
            js.setAttribute('type', 'text/javascript');
            js.setAttribute('src', file);
            js.setAttribute('charset', charset || "utf-8");
            _doc.appendChild(js);
            if (! /*@cc_on!@*/ 0) {
                js.onload = function() {
                    callback();
                    _doc && setTimeout(function() {
                        _doc.removeChild(js)
                    }, 5)
                }
            } else {
                js.onreadystatechange = function() {
                    if (js.readyState == 'loaded' || js.readyState == 'complete') {
                        js.onreadystatechange = null;
                        callback && callback();
                        _doc && setTimeout(function() {
                            _doc.removeChild(js)
                        }, 5)
                    }
                }
            }

            return false;
        },
        "$Tips": {
            "eMask": document.createElement("div"),
            "show": function(sText, from) {
                var eBody = QQTAT.lib.$Tag("body")[0];
                var nClW = QQTAT.lib.$Browser.ie ? document.documentElement.clientWidth : window.innerWidth;
                var nClH = QQTAT.lib.$Browser.ie ? document.documentElement.clientHeight : window.innerHeight;
                this.eMask.style.position = "fixed";
                this.eMask.style.fontSize = "20px";
                this.eMask.style.top = "0px";
                this.eMask.style.bottom = "0px";
                this.eMask.style.left = "0px";
                this.eMask.style.right = "0px";
                this.eMask.style.color = "#000";
                this.eMask.style.backgroundImage = "url(/tat/c.png)";
                if (QQTAT.lib.$Browser.ie) {
                    //this.eMask.style.background = "rgba(0,0,0,0.6)";
                    this.eMask.style.filter = 'progid:DXImageTransform.Microsoft.gradient( GradientType = 0,startColorstr = "#60000000",endColorstr = "#60000000") 6;';
                } else {
                    this.eMask.style.background = "rgba(0,0,0,0.6)";
                }

                this.eMask.style.zIndex = "11017";
                this.eMask.innerHTML = sText;
                //浮层关闭
                this.eMask.onclick = function() {
                    var target = event.toElement || event.srcElement;
                    if (QQTAT.lib.$Contains(this.children[0], target)) {
                        return false;
                    }
                    QQTAT.lib.$Tips.close(from.id);
                }
                this.status = 1;
                eBody.appendChild(this.eMask);
                if (QQTAT.lib.$Browser.mozilla) {
                    var eTips = QQTAT.lib.$Id("a11y_TAT_Tips") || QQTAT.lib.$Id("a11y_TAT_Copyrighs");
                    eTips.style.top = nClH / 2 + "px";
                    this.eMask.style.MozTransform = "scale(" + 1 / QQTAT.config.zooMmultiples[QQTAT.config.zoomCurr] + ")";
                    this.eMask.style.MozTransformOrigin = eBody.offsetWidth * (QQTAT.config.zooMmultiples[QQTAT.config.zoomCurr] - 1) / 2 + "px top";
                } else {
                    if (!QQTAT.lib.$Browser.ie) {
                        this.eMask.style.zoom = 1 / QQTAT.config.zooMmultiples[QQTAT.config.zoomCurr];
                    }
                }
            },
            "close": function(sId) {
                if (typeof sId != "undefined") {
                    document.getElementById(sId).className = "a11y_TAT_Btn";
                }
                this.status = 0;
                QQTAT.lib.$Tag("body")[0].removeChild(this.eMask);
            },
            status: 0
        },
        $fixed: {
            "oTarget": null,
            "nZoomMult": null,
            "fScrollDone": function() {
                var dPanel = QQTAT.lib.$Id("a11y_TAT_Panel"),
                    dSubPanel = QQTAT.lib.$Id("a11y_TAT_Subtitle_Panel"),
                    oTarget = QQTAT.lib.$fixed.oTarget,
                    nZoomMult = QQTAT.lib.$fixed.nZoomMult;

                dPanel.style.left = oTarget.scrollLeft * nZoomMult + "px";
                dPanel.style.top = oTarget.scrollTop * nZoomMult + "px";

                dSubPanel.style.top = (oTarget.scrollTop + oTarget.clientHeight - 194) * nZoomMult + "px";
                dSubPanel.style.left = oTarget.scrollLeft * nZoomMult + "px";
            },
            "init": function(oWho, oTarget, nZoomMult, bCanncel) {
                var oLib = QQTAT.lib,
                    dPanel = oLib.$Id("a11y_TAT_Panel"),
                    dSubPanel = oLib.$Id("a11y_TAT_Subtitle_Panel");
                this.oTarget = oTarget || oWho;
                this.nZoomMult = nZoomMult || 1;

                if (bCanncel) {
                    oLib.$DelEvent(oWho, "scroll", this.fScrollDone);
                    dPanel.style.top = "0px";
                    dSubPanel.style.top = null;
                    dSubPanel.style.bottom = "54px";
                    if (parseInt(dPanel.style.left) >= 0) {
                        dPanel.style.left = "0px";
                        dSubPanel.style.left = "0px";
                        return false;
                    }
                    dPanel.style.left = "-69px";
                    return false;
                }
                dPanel.style.left = oTarget.scrollLeft * nZoomMult + "px";
                dPanel.style.top = oTarget.scrollTop * nZoomMult + "px";

                dSubPanel.style.top = (oTarget.scrollTop + oTarget.clientHeight - 194) * nZoomMult + "px";
                dSubPanel.style.left = oTarget.scrollLeft * nZoomMult + "px";
                dSubPanel.style.bottom = null;

                oLib.$DelEvent(oWho, "scroll", this.fScrollDone);
                oLib.$AddEvent(oWho, "scroll", this.fScrollDone);
            }
        },
        css: function(obj, attr, value) {
            if (arguments.length == 2) {
                if (attr != 'opacity') {
                    return parseInt(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]);
                } else {
                    return Math.round(100 * parseFloat(obj.currentStyle ? obj.currentStyle[attr] : document.defaultView.getComputedStyle(obj, false)[attr]));
                }
            } else if (arguments.length == 3)
                switch (attr) {
                    case 'width':
                    case 'height':
                    case 'paddingLeft':
                    case 'paddingTop':
                    case 'paddingRight':
                    case 'paddingBottom':
                        value = Math.max(value, 0);
                    case 'left':
                    case 'top':
                    case 'marginLeft':
                    case 'marginTop':
                    case 'marginRight':
                    case 'marginBottom':
                        obj.style[attr] = value + 'px';
                        break;
                    case 'opacity':
                        obj.style.filter = "alpha(opacity:" + value + ")";
                        obj.style.opacity = value / 100;
                        break;
                    default:
                        obj.style[attr] = value;
                }

            return function(attr_in, value_in) {
                QQTAT.lib.css(obj, attr_in, value_in)
            };
        },
        "ANIMATE_TYPE": {
            BUFFER: 1,
            FLEX: 2
        },
        StopAnimate: function(obj) {
            clearInterval(obj.timer);
        },
        animateBuffer: function(obj, oTarget, fnCallBack, fnDuring) {
            var bStop = true;
            var attr = '';
            var speed = 0;
            var cur = 0;

            for (attr in oTarget) {
                cur = QQTAT.lib.css(obj, attr);
                if (oTarget[attr] != cur) {
                    bStop = false;

                    speed = (oTarget[attr] - cur) / 20;
                    speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

                    QQTAT.lib.css(obj, attr, cur + speed);
                }
            }

            if (fnDuring)
                fnDuring.call(obj);

            if (bStop) {
                clearInterval(obj.timer);
                obj.timer = null;

                if (fnCallBack)
                    fnCallBack.call(obj);
            }
        },
        animateFlex: function(obj, oTarget, fnCallBack, fnDuring) {
            var bStop = true;
            var attr = '';
            var speed = 0;
            var cur = 0;

            for (attr in oTarget) {
                if (!obj.oSpeed)
                    obj.oSpeed = {};
                if (!obj.oSpeed[attr])
                    obj.oSpeed[attr] = 0;
                cur = QQTAT.lib.css(obj, attr);
                if (Math.abs(oTarget[attr] - cur) >= 1 || Math.abs(obj.oSpeed[attr]) >= 1) {
                    bStop = false;
                    obj.oSpeed[attr] += (oTarget[attr] - cur) / 5;
                    obj.oSpeed[attr] *= 0.7;
                    QQTAT.lib.css(obj, attr, cur + obj.oSpeed[attr]);
                }
            }

            if (fnDuring)
                fnDuring.call(obj);

            if (bStop) {
                clearInterval(obj.timer);
                obj.timer = null;

                if (fnCallBack)
                    fnCallBack.call(obj);
            }
        },
        animate: function(obj, oTarget, iType, fnCallBack, fnDuring) {
            var fnMove = null;
            if (obj.timer) {
                clearInterval(obj.timer);
            }
            switch (iType) {
                case this.ANIMATE_TYPE.BUFFER:
                    fnMove = this.animateBuffer;
                    break;
                case this.ANIMATE_TYPE.FLEX:
                    fnMove = this.animateFlex;
                    break;
            }
            obj.timer = setInterval(function() {
                fnMove(obj, oTarget, fnCallBack, fnDuring);
            }, 30);
        }
    }

    QQTAT.sWitch = {
        "hide": function(a) {
            var timer;
            var eBody = QQTAT.lib.$Tag("body")[0];
            QQTAT.subtitle.setSwitchBtn(false);
            QQTAT.subtitle.setAudioSwitchBtn(false);
            if (QQTAT.config.zoomCurr != 0) {
                QQTAT.zoom.Revert();
            }
            if (a) {
                var fHide = function() {
                    QQTAT.lib.animate(QQTAT.lib.$Id("a11y_TAT_Hook"), {
                        left: "0"
                    }, 1);
                    QQTAT.lib.animate(QQTAT.lib.$Id("a11y_TAT_Panel"), {
                        left: "-69"
                    }, 1, function() {
                        QQTAT.sWitch.cursor(false);
                        QQTAT.lib.$Id("a11y_TAT_Subtitle_Panel").innerHTML = '把光标移到文字上看看';
                    });
                    QQTAT.lib.animate(eBody, {
                        paddingLeft: "0"
                    }, 1);
                }
                fHide();
                return;
            }
            timer = setTimeout(fHide, 1000);
            timer = null
        },
        "show": function() {
            var eBody = QQTAT.lib.$Tag("body")[0];
            QQTAT.subtitle.setSwitchBtn(true);
            QQTAT.subtitle.setAudioSwitchBtn(false);
            QQTAT.lib.animate(QQTAT.lib.$Id("a11y_TAT_Hook"), {
                left: "-69"
            }, 1);
            QQTAT.lib.animate(eBody, {
                paddingLeft: "69"
            }, 1);
            QQTAT.lib.animate(QQTAT.lib.$Id("a11y_TAT_Panel"), {
                left: "0"
            }, 1, function() {
                QQTAT.sWitch.cursor(true);
                QQTAT.lib.$Tag("head")[0].appendChild(QQTAT.sWitch.bigPoint);
            })
        },
        bigPoint: null,
        cursor: function(sSwitch, sIsLoading) {
            var sTatStyle = 'body{cursor:url(/tat/aero_arrow_xl.cur),auto !important}a{cursor:url(/tat/aero_link_xl.cur),auto !important}';
            var $Lib = QQTAT.lib;
            if (sSwitch) {
                if (sIsLoading) {
                    sTatStyle = 'body{cursor:wait !important}a {cursor:wait !important}';
                    if (QQTAT.sWitch.bigPoint) {
                        QQTAT.lib.$Tag("head")[0].removeChild(QQTAT.sWitch.bigPoint);
                        QQTAT.sWitch.bigPoint = null;
                    }
                }

                if (!QQTAT.sWitch.bigPoint) {
                    this.bigPoint = $Lib.$Create("style");
                    $Lib.$Tag("head")[0].appendChild(this.bigPoint);
                    if (this.bigPoint.styleSheet) {
                        this.bigPoint.styleSheet.cssText = sTatStyle;
                    } else {
                        this.bigPoint.appendChild(QQTAT.lib.$CreateText(sTatStyle));
                    };
                }
            } else {
                if (QQTAT.sWitch.bigPoint) {
                    QQTAT.lib.$Tag("head")[0].removeChild(QQTAT.sWitch.bigPoint);
                    QQTAT.sWitch.bigPoint = null;
                }
                if (sIsLoading) {
                    QQTAT.sWitch.cursor(true);
                }
            }

        }
    }

    QQTAT.zoom = {
        zoom: function(m) {
            var d = false;
            var l = QQTAT.lib.$Tag("body")[0],
                k = l.offsetWidth,
                allyHook = QQTAT.lib.$Id("a11y_TAT_Hook"),
                ally = QQTAT.lib.$Id("a11y_TAT_Panel"),
                allySub = QQTAT.lib.$Id("a11y_TAT_Subtitle_Panel"),
                panelMult = "scale(" + (1 / m) + ")",
                transOrigin = k * (m - 1) / 2 + "px top",
                bodyMult = "scale(" + m + ")";

            if (QQTAT.lib.$Browser.mozilla) {
                if (1 / m == 1) {
                    QQTAT.lib.$fixed.init(window, null, null, true);
                    allyHook.style.MozTransform = null;
                    ally.style.MozTransform = null;
                    allySub.style.MozTransform = null;
                    l.style.MozTransform = null;
                    return false;
                }

                QQTAT.lib.$fixed.init(window, document.documentElement, 1 / m);
                allyHook.style.MozTransform = panelMult;
                allyHook.style.left = transOrigin;
                allyHook.style.MozTransformOrigin = transOrigin;
                ally.style.MozTransform = panelMult;
                ally.style.MozTransformOrigin = transOrigin;
                allySub.style.MozTransform = panelMult;
                allySub.style.MozTransformOrigin = transOrigin;
                l.style.MozTransform = bodyMult;
                l.style.MozTransformOrigin = transOrigin;
            } else {
                l.style.zoom = m;
                if (!QQTAT.lib.$Browser.ie) {
                    ally.style.zoom = 1 / m;
                    allySub.style.zoom = 1 / m;
                }
                l.style.marginLeft = -(69 * (m - 1)) + 'px';
            }
        },
        zoomIn: function() {
            var oSelf = QQTAT.zoom,
                config = QQTAT.config,
                aMult = config.zooMmultiples;
            if (config.zoomCurr < aMult.length - 1) {
                QQTAT.lib.$Id("a11y_TAT_Zoom_Out").className = QQTAT.lib.$Id("a11y_TAT_Zoom_Out").className.replace(" a11y_TAT_Dis_Zoom_Out", "");
                QQTAT.lib.$Id("a11y_TAT_Zoom_F").className = QQTAT.lib.$Id("a11y_TAT_Zoom_F").className.replace(" a11y_TAT_Dis_Zoom_F", "");
                QQTAT.config.zoomCurr++;
            } else {
                return false;
            }
            if (config.zoomCurr == aMult.length - 1) {
                QQTAT.lib.$Id("a11y_TAT_Zoom_In").className += " a11y_TAT_Dis_Zoom_In";
            }
            oSelf.zoom(aMult[config.zoomCurr]);
        },
        zoomOut: function() {
            var oSelf = QQTAT.zoom,
                config = QQTAT.config,
                aMult = config.zooMmultiples;
            if (config.zoomCurr > 0) {
                QQTAT.lib.$Id("a11y_TAT_Zoom_In").className = QQTAT.lib.$Id("a11y_TAT_Zoom_In").className.replace(" a11y_TAT_Dis_Zoom_In", "");
                QQTAT.config.zoomCurr--;
            } else {
                return false;
            }
            if (config.zoomCurr == 0) {
                QQTAT.lib.$Id("a11y_TAT_Zoom_Out").className += " a11y_TAT_Dis_Zoom_Out";
                QQTAT.lib.$Id("a11y_TAT_Zoom_F").className += " a11y_TAT_Dis_Zoom_F";
            }
            oSelf.zoom(aMult[config.zoomCurr]);
        },
        Revert: function() {
            var oSelf = QQTAT.zoom,
                config = QQTAT.config;
            if (config.zoomCurr == 0) {

                return false;
            }
            QQTAT.config.zoomCurr = 0;
            QQTAT.lib.$Id("a11y_TAT_Zoom_In").className = QQTAT.lib.$Id("a11y_TAT_Zoom_In").className.replace(" a11y_TAT_Dis_Zoom_In", "");
            QQTAT.lib.$Id("a11y_TAT_Zoom_Out").className += " a11y_TAT_Dis_Zoom_Out";
            QQTAT.lib.$Id("a11y_TAT_Zoom_F").className += " a11y_TAT_Dis_Zoom_F";
            oSelf.zoom(1);
        },
        init: function() {
            var oSelf = QQTAT.zoom;
            var eZoomIn = QQTAT.lib.$Id("a11y_TAT_Zoom_In");
            var eZoomOut = QQTAT.lib.$Id("a11y_TAT_Zoom_Out");
            var eZoomRevert = QQTAT.lib.$Id("a11y_TAT_Zoom_F");
            QQTAT.lib.$AddEvent(eZoomIn, "click", oSelf.zoomIn);
            QQTAT.lib.$AddEvent(eZoomOut, "click", oSelf.zoomOut);
            QQTAT.lib.$AddEvent(eZoomRevert, "click", oSelf.Revert);
        }
    }

    QQTAT.help = {
        "init": function() {
            var eHelp = QQTAT.lib.$Id("a11y_TAT_Help"),
                eCopyRight = QQTAT.lib.$Id("a11y_TAT_Copyrighs"),
                oSelf = this;
            QQTAT.lib.$AddEvent(eHelp, "click", function() {
                eHelp.setAttribute('aria-pressed', 'true');
                QQTAT.lib.$Id('a11y_TAT_Help').className = "a11y_TAT_Btn a11y_TAT_Help_ed";
                QQTAT.lib.$Tips.show('<div id="a11y_TAT_Copyrighs" class="a11y_TAT_Tips"style="display:block"><a id="close_a11y_TAT_Tips" href="javascript:void(0)" onclick="QQTAT.lib.$Tips.close(\'a11y_TAT_Help\')">关闭</a><div id="a11y_Explain"><ul><li><span id="a11y_icon1"></span>打开文字提醒</li><li><span id="a11y_icon2"></span>关闭文字提醒</li><li><span id="a11y_icon3"></span>播放网页内容语音</li><li><span id="a11y_icon4"></span>关闭网页内容语音</li><li><span id="a11y_icon5"></span>放大网页尺寸</li><li><span id="a11y_icon6"></span>缩小网页尺寸</li><li><span id="a11y_icon7"></span>还原网页尺寸</li><li><span id="a11y_icon8"></span>使用帮助</li></ul></div><p id="a11y_TAT_A11y_Intr">网站无障碍是指任何人都可以平等的访问网站，无论他们是什么样的软件、硬件、视觉、听觉、语言、文化、地域、物理和精神能力。<em>为您的网站添加&quot;T Accessibility Tools&quot;</em><br /><strong>&lt;script src=&quot;http:\/\/mat1.gtimg.com\/www\/a11y\/js\/tat.v1.0.js&quot; type=&quot;text\/javascript&quot;&gt;&lt;\/script&gt;</strong></p><a href="mailto:rockywen@tencent.com" target="_blank" id="a11y_contacts">任何疑问请联系 rockywen@tencent.com</a></div>', eHelp);
                oSelf.a11y_TAT_Help = 1;
            });
        }
    }
    QQTAT.screen = {
        windowWidth: (document.documentElement && document.documentElement.clientWidth || document.body.clientWidth),
        type: function() {
            var type = 1,
                w = this.windowWidth;
            type = w >= 1920 ? 7 : (w >= 1690 ? 6 : (w >= 1600 ? 5 : w >= 1440 ? 4 : w >= 1366 ? 3 : w >= 1280 ? 2 : 1));
            return type;
        }
    }
    QQTAT.subtitle = {
        "TAT_timer": null,
        "oldBgColor": "",
        "playSound": false,
        "audioPlayer": QQTAT.lib.$Create('audio'),
        "audioPlayerIe": QQTAT.lib.$Create('bgsound'),
        "audioSwitch": false,
        "subtitleSwitch": true,
        "setSubtitleSwitch": function() {
            var _body = QQTAT.lib.$Tag('body')[0];
            if (QQTAT.subtitle.subtitleSwitch || QQTAT.subtitle.audioSwitch) {
                QQTAT.lib.$DelEvent(_body, 'mouseover', QQTAT.subtitle.tatOver);
                QQTAT.lib.$DelEvent(_body, 'mouseout', QQTAT.subtitle.tatOut);
                QQTAT.lib.$AddEvent(_body, 'mouseover', QQTAT.subtitle.tatOver);
                QQTAT.lib.$AddEvent(_body, 'mouseout', QQTAT.subtitle.tatOut);
            } else {
                QQTAT.lib.$DelEvent(_body, 'mouseover', QQTAT.subtitle.tatOver);
                QQTAT.lib.$DelEvent(_body, 'mouseout', QQTAT.subtitle.tatOut);
            }
        },
        "setSwitchBtn": function(sWitch) {
            var setSwitch = function(sw) {
                var dis = sw ? "block" : "none";
                var cls = sw ? "a11y_TAT_Btn a11y_TAT_Subtitle_ed" : "a11y_TAT_Btn";
                QQTAT.subtitle.subtitleSwitch = sw;
                QQTAT.lib.$Id('a11y_TAT_Subtitle_Panel').style.display = dis;
                a11y_TAT_Subtitle_Panel.className = 'subTitle_ft' + QQTAT.screen.type() + ' subTitle_lh' + QQTAT.screen.type();
                QQTAT.lib.$Id('a11y_TAT_Subtitle').className = cls;
            }
            if (typeof sWitch != "boolean") {
                if (QQTAT.subtitle.subtitleSwitch) {
                    QQTAT.subtitle.subtitleSwitch = false;
                } else {
                    QQTAT.subtitle.subtitleSwitch = true;
                }
                setSwitch(QQTAT.subtitle.subtitleSwitch);
            } else {
                setSwitch(sWitch);
            }
            QQTAT.subtitle.setSubtitleSwitch();
        },
        "setAudioSwitchBtn": function(sWitch) {
            var setSwitch = function(sw) {
                var cls = sw ? "a11y_TAT_Btn a11y_TAT_TTS_ed" : "a11y_TAT_Btn";
                QQTAT.subtitle.audioSwitch = sw;
                if (sw) {
                    QQTAT.lib.$Id('ally_TAT_flashPlayer').innerHTML = ""
                };
                QQTAT.lib.$Id('a11y_TAT_TTS').className = cls;
            }
            if (typeof sWitch != "boolean") {
                if (QQTAT.subtitle.audioSwitch) {
                    QQTAT.subtitle.audioSwitch = false;
                } else {
                    QQTAT.subtitle.audioSwitch = true;
                }
                setSwitch(QQTAT.subtitle.audioSwitch);
            } else {
                setSwitch(sWitch);
            }
            QQTAT.subtitle.setSubtitleSwitch();
        },
        "soundStatus": function(sStatus) {
            var sStat;
            if (typeof sStatus == "string") {
                sStat = sStatus;
            } else {
                sStat = "play_complete";
            }
            switch (sStat) {
                case "play_complete":
                    QQTAT.sWitch.cursor(false, true);
                    break;
            }
        },
        "sound": function(txt) {
            var src = 'http://www.ispeech.org/p/generic/getaudio?text=' + encodeURI(txt) + '&voice=chchinesefemale&speed=0&action=convert';
            //QQTAT.sWitch.cursor(true, true);
            if (QQTAT.lib.$Browser.mozilla || QQTAT.lib.$Browser.opera) {
                if (typeof window["qt_soundStatus"] != "function") {
                    window["qt_soundStatus"] = QQTAT.subtitle.soundStatus;
                }

                if (typeof FlashObject == "undefined") {
                    QQTAT.lib.$loadedJs("/tat/flash/swfobject.js", function() {
                        var so = new FlashObject("/tat/flash/QtPlayMp3.swf", "soundPlayer", "0", "0", "0", "#ffffff");
                        so.addVariable("_text", encodeURI(txt));
                        so.addParam("allowScriptAccess", "always");
                        so.addParam("menu", "false");
                        so.write("ally_TAT_flashPlayer");
                        so = null;
                    }, "gb2312");
                    return;
                }
                var so = new FlashObject("/tat/flash/QtPlayMp3.swf", "soundPlayer", "0", "0", "0", "#ffffff");
                so.addVariable("_text", encodeURI(txt));
                so.addParam("allowScriptAccess", "always");
                so.addParam("menu", "false");
                so.write("ally_TAT_flashPlayer");
                so = null;

            } else if (!QQTAT.lib.$Browser.ie) {
                //QQTAT.lib.$DelEvent(this.audioPlayer, "ended", this.soundStatus);
                //QQTAT.lib.$AddEvent(this.audioPlayer, "ended", this.soundStatus);
                this.audioPlayer.setAttribute('src', src);
                this.audioPlayer.setAttribute('autoplay', "autoplay");
                QQTAT.lib.$Id('ally_TAT_flashPlayer').appendChild(this.audioPlayer);
                this.audioPlayer.load();
                this.audioPlayer.play();
            } else {
                this.audioPlayerIe.loop = "1";
                this.audioPlayerIe.src = src;
                QQTAT.lib.$Id('ally_TAT_flashPlayer').innerHTML = "";
                QQTAT.lib.$Id('ally_TAT_flashPlayer').appendChild(this.audioPlayerIe);
            }

        },
        "createTat": function(txt) {
            var fragment = document.createDocumentFragment(),
                ele, $C = QQTAT.lib.$Create,
                $CT = QQTAT.lib.$CreateText;

            txt = txt.replace(/\s\n\r\t/, '');
            if (!txt) return;
            if (txt.match(/[，,。,！,？,: ,：]/g)) {
                var arr = txt.match(/([“”]?([0-9\-\u4e00-\u9fa5\A-Z“”|\s]+)[“”]?[，,。,！,？,: ,：,；,、,《 ,》,| ,·]?)?/g);
                for (var i = 0; i < arr.length; i++) {
                    //if(txt)txt = txt.replace(/\s\n\r\t/, '');
                    if (!txt) continue;
                    ele = $C('tat'), txt = $CT(arr[i]), ele.appendChild(txt), fragment.appendChild(ele);
                }
            } else {
                //if(!txt){
                if (!/[\s\n\r\t]/.test(txt)) {
                    ele = $C('tat'), txt = $CT(txt);
                    ele.appendChild(txt);
                    fragment.appendChild(ele);
                }
                //}
            }
            return fragment;
        },
        "tatOver": function(e) {
            var ele = e.target || e.srcElement,
                i, j, str = '';
            if (ele.id == "a11y_TAT_Subtitle_Panel" || ele.parentNode.id == "a11y_TAT_Subtitle_Panel" || ele.id == "close_A11y_TAT" || ele.parentNode.id == "close_A11y_TAT" || QQTAT.lib.$Tips.status) {
                return;
            }
            clearTimeout(QQTAT.subtitle.TAT_timer);
            for (i = 0; i < ele.childNodes.length; i++) {
                var node = ele.childNodes[i],
                    parent = node.parentNode,
                    html = '',
                    arr;
                if (node.nodeType == 3) {
                    if (parent.childNodes.length == 1) {
                        if (parent.nodeName.toLowerCase() == 'tat') {
                            //ui.addEvent(parent, 'mouseover', function(){
                            var txt = parent.innerHTML;
                            QQTAT.subtitle.TAT_timer = setTimeout(function() {
                                var n = txt.realLength() > 44 ? 2 : 1;
                                //ln
                                var cln = a11y_TAT_Subtitle_Panel.className;

                                if (cln.search(/lh/) > -1) {
                                    a11y_TAT_Subtitle_Panel.className = cln.replace(/(.+lh)(\d)+/, function(a, b, c) {
                                        return n == 2 ? a + c : b + c;
                                    });
                                } else {
                                    a11y_TAT_Subtitle_Panel.className = cln + ' subTitle_lh' + QQTAT.screen.type() + (n == 2 ? QQTAT.screen.type() : '')
                                }

                                QQTAT.lib.$Id('a11y_TAT_Subtitle_Panel').innerHTML = txt;
                                parent.className = 'tat_vis';
                                if (QQTAT.subtitle.audioSwitch) {
                                    QQTAT.subtitle.sound(txt);
                                };
                                //clearTimeout(QQTAT.subtitle.TAT_timer);
                            }, 200);
                            //});
                            return;
                        } else {
                            html = '<tat>' + parent.innerHTML + '</tat>';
                            html = html.replace(/([，,。,！,？,: ,：,；])/g, '$1</tat><tat>').replace(/<tat><\/tat>/i, '');
                            parent.innerHTML = html;
                        }
                    } else {
                        arr = [];
                        for (j = 0; j < parent.childNodes.length; j++) {
                            var _node = parent.childNodes[j];

                            if (_node.nodeType == 3) {
                                parent.replaceChild(QQTAT.subtitle.createTat(_node.nodeValue), _node);
                            }
                        }
                    }
                }
            };
        },
        "tatOut": function(e) {
            var ele = e.target || e.srcElement,
                i, j, str = '';
            for (i = 0; i < ele.childNodes.length; i++) {
                var node = ele.childNodes[i],
                    parent = node.parentNode,
                    html = '',
                    arr;
                if (node.nodeType == 3) {
                    clearTimeout(QQTAT.subtitle.TAT_timer);
                    if (parent.childNodes.length == 1) {
                        if (parent.nodeName.toLowerCase() == 'tat') {
                            parent.className = '';
                            clearTimeout(QQTAT.subtitle.TAT_timer);
                            QQTAT.subtitle.TAT_timer = null;
                            if (QQTAT.subtitle.audioSwitch) {
                                QQTAT.sWitch.cursor(false, true);
                            };
                            return;
                        } else {
                            html = '<tat>' + parent.innerHTML + '</tat>';
                            html = html.replace(/([，,。,！,？,: ,：,；])/g, '$1</tat><tat>').replace(/<tat><\/tat>/i, '');
                            parent.innerHTML = html;
                        }
                    }
                }
            };
        },
        init: function() {
            QQTAT.lib.$AddEvent(QQTAT.lib.$Id('a11y_TAT_Subtitle'), 'click', QQTAT.subtitle.setSwitchBtn);
            QQTAT.lib.$AddEvent(QQTAT.lib.$Id('a11y_TAT_TTS'), 'click', QQTAT.subtitle.setAudioSwitchBtn);
            QQTAT.subtitle.setSubtitleSwitch();
        }
    }

    QQTAT.boss = {
        bossFn: function(name) {
            var _uin = document.cookie.match(new RegExp('(^|)o_cookie=([^;]*)(;|$)')),
                uin = (_uin == null ? "" : unescape(_uin[2]));
            var iurl = 'http://btrace.qq.com/collect?sIp=&iQQ=' + uin + '&sBiz=TAT&sOp=' + name + '&iSta=&iTy=1617&iFlow=&sUrl=' + escape(location.href) + '&iBak=&sBak=&ran=' + Math.random();
            gImage = new Image(1, 1);
            gImage.src = iurl;

        },
        bind: function() {
            QQTAT.lib.$AddEvent(QQTAT.lib.$Id('a11y_TAT_Hook'), 'click', function() {
                QQTAT.boss.bossFn('tat');
            });
        }
    }

    QQTAT.init = function() {
        var sTatHtml, sTatStyle, $Lib = QQTAT.lib,
            eTmpStyle;

        sTatHtml = '<a id="a11y_TAT_Hook" href="javascript:void(0)" onClick="QQTAT.sWitch.show()" role="button" title="无障碍辅助工具">TAT</a><div id="a11y_TAT_Panel"><a id="close_A11y_TAT" class="a11y_TAT_Btn" href="javascript:void(0)" onclick="QQTAT.sWitch.hide(true)"><em>关闭</em></a><div class="a11y_TAT_Btn a11y_TAT_Subtitle_ed" id="a11y_TAT_Subtitle" tabindex="0"><em>字幕</em><span></span></div><div class="a11y_TAT_Btn" id="a11y_TAT_TTS" tabindex="0"><em>语音阅读</em><span></span></div><div class="a11y_TAT_Btn" id="a11y_TAT_Zoom_In" tabindex="0" role="button" aria-pressed="false"><em>放大网页</em><span></span></div><div class="a11y_TAT_Btn a11y_TAT_Dis_Zoom_F" id="a11y_TAT_Zoom_F" tabindex="0" role="button" aria-pressed="false"><em>还原网页</em><span></span></div><div class="a11y_TAT_Btn a11y_TAT_Dis_Zoom_Out" id="a11y_TAT_Zoom_Out" tabindex="0" role="button" aria-pressed="false"><em>缩小网页</em><span></span></div><div class="a11y_TAT_Btn" id="a11y_TAT_Help" tabindex="0" role="button" aria-pressed="false"><em>帮助</em><span></span></div><div id="ally_TAT_flashPlayer"></div></div><div id="a11y_TAT_Subtitle_Panel">把光标移到文字上看看</div>';
        sTatStyle = '#a11y_TAT_Hook{width:54px;height:0;padding-top:54px;display:block;overflow:hidden;position:fixed;left:-69px;bottom:10%;z-index:10010;background:url(/tat/TAT.png) no-repeat 0 0;}#a11y_TAT_Panel{width:54px;position:fixed;left:0;top:0;bottom:0;padding:47px 7px 0;border-right:1px solid #e1e1e1;background:#fff;box-shadow:1px 0 3px #ccc;z-index:1926;zoom:1}#a11y_TAT_Panel:after{content:"";display:table;clear:both}.a11y_TAT_Btn{height:54px;cursor:url(/tat/aero_link_xl.cur),auto;position:relative;background:url(/tat/TAT.png) no-repeat;display:block;border:1px solid #fff;}.a11y_TAT_Btn:hover{border:1px solid #0081dc}.a11y_TAT_Btn em{display:block;height:0;padding-top:54px;overflow:hidden;font-style:normal;}#a11y_TAT_Panel .a11y_TAT_Subtitle_ed,#a11y_Explain #a11y_icon1{background-position:0 -108px}#a11y_TAT_Subtitle,#a11y_Explain #a11y_icon2{background-position:0 -162px}#a11y_TAT_Panel .a11y_TAT_TTS_ed,#a11y_Explain #a11y_icon3{background-position:0 -216px}#a11y_TAT_TTS,#a11y_Explain #a11y_icon4{background-position:0 -270px}#a11y_TAT_Zoom_In,#a11y_Explain #a11y_icon5{background-position:0 -378px}#a11y_TAT_Panel .a11y_TAT_Dis_Zoom_In{background-position:0 -323px;cursor:url(/tat/aero_arrow_xl.cur),auto}#a11y_TAT_Zoom_F,#a11y_Explain #a11y_icon7{background-position:0 -486px}#a11y_TAT_Panel .a11y_TAT_Dis_Zoom_F{background-position:0 -432px;cursor:url(/tat/aero_arrow_xl.cur),auto}#a11y_TAT_Zoom_Out,#a11y_Explain #a11y_icon6{background-position:0 -594px}#a11y_TAT_Panel .a11y_TAT_Dis_Zoom_Out{background-position:0 -540px;cursor:url(/tat/aero_arrow_xl.cur),auto}#a11y_TAT_Help,#a11y_Explain #a11y_icon8{background-position:0 -702px}#a11y_TAT_Panel .a11y_TAT_Help_ed{background-position:0 -648px}#a11y_TAT_Subtitle_Panel{width:94%;padding:0 3%;position:fixed;bottom:54px;left:0;right:0;z-index:1918;color:#1460ad;font-family:"微软雅黑","幼圆";font-weight:bold;text-align:center;text-shadow:1px 1px 1px #666;overflow:hidden;background:url(bg.png?v=20150120_185323.png)}#a11y_TAT_Copyrighs{height:650px;width:750px;margin:-400px 0 0 -350px;}#a11y_Explain{height:399px;border-top:1px solid #dcdcdc;clear:both}#a11y_Explain li{float:left;display:inline;width:325px;height:93px;margin-left:47px;font:24px/93px "微软雅黑"}#a11y_Explain li span{width:54px;float:left;height:54px;margin:21px 18px 0 0;background:url(/tat/TAT.png) no-repeat}#a11y_TAT_A11y_Intr{font:14px/26px "Arial";padding:45px 19px 17px;border-top:1px solid #dcdcdc;display:block}#a11y_TAT_A11y_Intr strong{font-weight:normal;color:#e51b00}#a11y_TAT_A11y_Intr em{font-weight:bold}#a11y_contacts{font:12px/24px "simsun";margin:0 19px;color:#9d9d9d}#close_A11y_TAT{background-position:0 -810px}#close_A11y_TAT:hover{background-position:0 -756px}.a11y_TAT_Tips{width:592px;height:270px;padding:25px;position:fixed;left:50%;top:50%;margin:-135px 0 0 -296px;background:#fff;display:none;z-index:100001}#close_a11y_TAT_Tips{width:25px;height:0;padding-top:25px;float:right;margin:7px 0 20px;overflow:hidden;background:url(/tat/TAT.png) no-repeat -14px -825px}#close_a11y_TAT_Tips:hover{background-position:-14px -771px}.a11y_TAT_Tips_Content{font:30px/70px "微软雅黑";padding-top:65px;clear:both;border-top:1px solid #dcdcdc;text-align:center;}.subTitle_ft1{font-size:43px;height:90px }.subTitle_lh1{line-height:90px }.subTitle_lh11{line-height:45px }.subTitle_ft2{font-size:54px;height:110px }.subTitle_lh2{line-height:110px }.subTitle_lh22{line-height:55px }.subTitle_ft3{font-size:58px;height:120px }.subTitle_lh3{line-height:120px }.subTitle_lh33{line-height:60px }.subTitle_ft4{font-size:61px;height:130px }.subTitle_lh4{line-height:130px }.subTitle_lh44{line-height:65px }.subTitle_ft5{font-size:68px;height:140px }.subTitle_lh5{line-height:140px }.subTitle_lh55{line-height:70px }.subTitle_ft6{font-size:71px;height:150px }.subTitle_lh6{line-height:150px }.subTitle_lh66{line-height:75px }.subTitle_ft7{font-size:82px;height:170px }.subTitle_lh7{line-height:170px }.subTitle_lh77{line-height:85px }.tat_vis{background:#6b6b6b;color:#fff}#a11y_Explain *{padding:0;margin:0;}';
        eTmpStyle = $Lib.$Create("style");

        $Lib.$Tag("head")[0].appendChild(eTmpStyle);
        if (eTmpStyle.styleSheet) {
            eTmpStyle.styleSheet.cssText = sTatStyle;
        } else {
            eTmpStyle.appendChild(QQTAT.lib.$CreateText(sTatStyle));
        };
        $Lib.$Tag("body")[0].insertAdjacentHTML("beforeEnd", sTatHtml);
        QQTAT.lib.$Id("a11y_TAT_Hook").style.left = "0";
        QQTAT.lib.$Id("a11y_TAT_Panel").style.left = "-69px";
        QQTAT.sWitch.hide();
        QQTAT.zoom.init();
        QQTAT.subtitle.init();
        QQTAT.help.init();
        QQTAT.boss.bind();
        eTmpDiv = null;
    };

    // QQTAT.lib.$Ready(document, QQTAT.init);
    QQTAT.init();
})();