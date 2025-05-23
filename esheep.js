"use strict";


function _typeof(e) {
    return (_typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
        return typeof e
    } : function(e) {
        return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
    })(e)
}

function _classCallCheck(e, t) {
    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function")
}

function _defineProperties(e, t) {
    for (var i = 0; i < t.length; i++) {
        var n = t[i];
        n.enumerable = n.enumerable || !1, n.configurable = !0, "value" in n && (n.writable = !0), Object.defineProperty(e, _toPropertyKey(n.key), n)
    }
}

function _createClass(e, t, i) {
    return t && _defineProperties(e.prototype, t), i && _defineProperties(e, i), Object.defineProperty(e, "prototype", {
        writable: !1
    }), e
}

function _toPropertyKey(e) {
    var t = _toPrimitive(e, "string");
    return "symbol" === _typeof(t) ? t : String(t)
}

function _toPrimitive(e, t) {
    if ("object" !== _typeof(e) || null === e) return e;
    var i = e[Symbol.toPrimitive];
    if (void 0 !== i) {
        var n = i.call(e, t || "default");
        if ("object" !== _typeof(n)) return n;
        throw new TypeError("@@toPrimitive must return a primitive value.")
    }
    return ("string" === t ? String : Number)(e)
}
var VERSION = "0.9.2",
    ACTIVATE_DEBUG = !1,
    DEFAULT_XML = "https://adrianotiger.github.io/desktopPet/Pets/esheep64/animations.xml",
    COLLISION_WITH = ["div", "hr"],
    eSheep = function() {
        function eSheep(e, t) {
            _classCallCheck(this, eSheep), this.userOptions = e || {
                allowPets: "none",
                allowPopup: "yes"
            }, this.userOptions.allowPopup || (this.userOptions.allowPopup = "yes"), this.userOptions.allowPets || (this.userOptions.allowPets = "none"), this.animationFile = DEFAULT_XML, this.id = Date.now() + Math.random(), this.DOMdiv = document.createElement("div"), this.DOMdiv.setAttribute("id", this.id), this.DOMimg = document.createElement("img"), this.DOMinfo = document.createElement("div"), this.parser = new DOMParser, this.xmlDoc = null, this.prepareToDie = !1, this.isChild = null != t, this.tilesX = 1, this.tilesY = 1, this.imageW = 1, this.imageH = 1, this.imageX = 1, this.imageY = 1, this.flipped = !1, this.dragging = !1, this.infobox = !1, this.animationId = 0, this.animationStep = 0, this.animationNode = null, this.sprite = new Image, this.HTMLelement = null, this.randS = 100 * Math.random(), this.screenW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, this.screenH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
        }
        return _createClass(eSheep, [{
            key: "Start",
            value: function(e) {
                if (getCookie('feature2') === "true") {
                    return; // Exit if esheep should be disabled
                }                
                void 0 !== e && null != e && (this.animationFile = e);
                var t = new XMLHttpRequest,
                    i = this;
                t.open("GET", this.animationFile, !0), t.addEventListener("readystatechange", function() {
                    4 == this.readyState && (200 == this.status ? i._parseXML(this.responseText) : console.error("XML not available:" + this.statusText + "\n" + this.responseText))
                }), t.send(null)
                
            }
        }, {
            key: "remove",
            value: function() {
                var e = this;
                this.prepareToDie = !0, this.DOMinfo.Hide(), setTimeout(function() {
                    e.DOMdiv = e.DOMimg = e.DOMinfo = null, document.getElementById(e.id).outerHTML = ""
                }, 500)
            }
        }, {
            key: "_parseXML",
            value: function(e) {
                var t = this;
                this.xmlDoc = this.parser.parseFromString(e, "text/xml");
                var i = this.xmlDoc.getElementsByTagName("image")[0];
                this.tilesX = i.getElementsByTagName("tilesx")[0].textContent, this.tilesY = i.getElementsByTagName("tilesy")[0].textContent, this.sprite.addEventListener("load", function() {
                    ACTIVATE_DEBUG && console.log("Sprite image loaded");
                    var e = "width:" + t.sprite.width + "px;height:" + t.sprite.height + "px;position:absolute;top:0px;left:0px;max-width: none;";
                    t.DOMimg.setAttribute("style", e), t.DOMimg.addEventListener("dragstart", function(e) {
                        return e.preventDefault(), !1
                    }), t.imageW = t.sprite.width / t.tilesX, t.imageH = t.sprite.height / t.tilesY, e = "width:" + t.imageW + "px;height:" + t.imageH + "px;position:fixed;top:" + t.imageY + "px;left:" + t.imageX + "px;transform:rotatey(0deg);cursor:move;z-index:2000;overflow:hidden;image-rendering: crisp-edges;", t.DOMdiv.setAttribute("style", e), t.DOMdiv.appendChild(t.DOMimg), t.isChild ? t._spawnChild() : t._spawnESheep()
                }), this.sprite.src = "data:image/png;base64," + i.getElementsByTagName("png")[0].textContent, this.DOMimg.setAttribute("src", this.sprite.src), this.DOMdiv.addEventListener("mousemove", function(e) {
                    if (!t.dragging && 1 == e.buttons && 0 == e.button) {
                        t.dragging = !0, t.HTMLelement = null;
                        for (var i = t.xmlDoc.getElementsByTagName("animations")[0].getElementsByTagName("animation"), n = 0; n < i.length; n++)
                            if ("drag" == i[n].getElementsByTagName("name")[0].textContent) {
                                t.animationId = i[n].getAttribute("id"), t.animationStep = 0, t.animationNode = i[n];
                                break
                            }
                    }
                }), document.body.addEventListener("mousemove", function(e) {
                    t.dragging && (t.imageX = parseInt(e.clientX) - t.imageW / 2, t.imageY = parseInt(e.clientY) - t.imageH / 2, t.DOMdiv.style.left = t.imageX + "px", t.DOMdiv.style.top = t.imageY + "px", t.DOMinfo.style.left = parseInt(t.imageX + t.imageW / 2) + "px", t.DOMinfo.style.top = t.imageY + "px")
                }), document.body.addEventListener("resize", function() {
                    t.screenW = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth, t.screenH = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight, t.imageY + t.imageH > t.screenH && (t.imageY = t.screenH - t.imageH, t.DOMdiv.style.top = t.imageY + "px"), t.imageX + t.imageW > t.screenW && (t.imageX = t.screenW - t.imageW, t.DOMdiv.style.left = t.imageX + "px")
                }), this.DOMdiv.addEventListener("contextmenu", function(e) {
                    return e.preventDefault(), !1
                }), this.DOMdiv.addEventListener("mouseup", function(e) {
                    t.dragging ? t.dragging = !1 : t.infobox ? (t.DOMinfo.Hide(), t.infobox = !1) : "yes" === t.userOptions.allowPopup && (t.DOMinfo.style.left = Math.min(t.screenW - t.imageW, Math.max(t.imageW, parseInt(t.imageX + t.imageW / 2))) + "px", t.DOMinfo.style.top = parseInt(t.imageY) + "px", t.DOMinfo.Show(), t.infobox = !0)
                }), this.DOMinfo.addEventListener("mouseup", function(e) {
                    t.DOMinfo.Hide(), t.infobox = !1
                });
                this.DOMinfo.setAttribute("style", "width:200px;height:100px;transform:translate(-50%, -50%) scale(0.1);position:fixed;top:100px;left:10px;display:none;border-width:2px;border-radius:5px;border-style:ridge;border-color:#0000ab;text-align:center;text-shadow: 1px 1px 3px #ffff88;box-shadow: 3px 3px 10px #888888;color:black;opacity:0.9;z-index:9999;overflow:auto;transition:transform 0.3s ease;background: linear-gradient(to bottom right, rgba(128,128,255,0.7), rgba(200,200,255,0.4));");
                var n = this.xmlDoc.getElementsByTagName("header")[0],
                    a = document.createElement("b").appendChild(document.createTextNode(n.getElementsByTagName("title")[0].textContent)),
                    s = document.createElement("sup"),
                    o = document.createElement("a"),
                    r = document.createElement("p");
                s.appendChild(document.createTextNode("App v." + VERSION)), s.appendChild(document.createElement("br")), s.appendChild(document.createTextNode("Pet v." + n.getElementsByTagName("version")[0].textContent)), s.setAttribute("style", "float:right;text-align:right;"), o.appendChild(document.createTextNode("🏠")), o.setAttribute("href", "https://github.com/Adrianotiger/web-esheep"), o.setAttribute("target", "_blank"), o.setAttribute("style", "float:left"), r.appendChild(document.createTextNode(n.getElementsByTagName("info")[0].textContent)), r.setAttribute("style", "font-size:" + (100 - parseInt(n.getElementsByTagName("info")[0].textContent.length / 10)) + "%;"), this.DOMinfo.appendChild(s), this.DOMinfo.appendChild(o), "none" !== this.userOptions.allowPets && ((o = document.createElement("a")).appendChild(document.createTextNode("⚙")), o.setAttribute("href", "javascript:;"), o.setAttribute("style", "float:left"), this.DOMinfo.appendChild(o), setTimeout(function() {
                    t._loadPetList(o)
                }, 100)), this.DOMinfo.appendChild(a), this.DOMinfo.appendChild(document.createElement("br")), this.DOMinfo.appendChild(document.createElement("hr")), this.DOMinfo.appendChild(r), document.body.appendChild(this.DOMinfo), document.body.appendChild(this.DOMdiv), this.DOMinfo.Show = function() {
                    t.DOMinfo.style.display = "block", t.DOMinfo.style.transform = "translate(-50%, -100%) scale(1.0)"
                }, this.DOMinfo.Hide = function() {
                    t.DOMinfo.style.transform = "translate(-50%, -50%) scale(0.1)", setTimeout(function() {
                        t.DOMinfo.style.display = "none"
                    }, 300)
                }
            }
        }, {
            key: "_setPosition",
            value: function(e, t, i) {
                this.DOMdiv && (i ? (this.imageX = parseInt(e), this.imageY = parseInt(t)) : (this.imageX = parseInt(this.imageX) + parseInt(e), this.imageY = parseInt(this.imageY) + parseInt(t)), this.DOMdiv.style.left = this.imageX + "px", this.DOMdiv.style.top = this.imageY + "px")
            }
        }, {
            key: "_spawnESheep",
            value: function() {
                for (var e = this.xmlDoc.getElementsByTagName("spawns")[0].getElementsByTagName("spawn"), t = 0, i = 0; i < e.length; i++) t += parseInt(e[0].getAttribute("probability"));
                var n = Math.random() * t;
                for (t = 0, i = 0; i < e.length; i++)
                    if ((t += parseInt(e[i].getAttribute("probability"))) >= n || i == e.length - 1) {
                        this._setPosition(this._parseKeyWords(e[i].getElementsByTagName("x")[0].textContent), this._parseKeyWords(e[i].getElementsByTagName("y")[0].textContent), !0), ACTIVATE_DEBUG && console.log("Spawn: " + this.imageX + ", " + this.imageY), this.animationId = e[i].getElementsByTagName("next")[0].textContent, this.animationStep = 0;
                        for (var a = this.xmlDoc.getElementsByTagName("animations")[0].getElementsByTagName("animation"), s = 0; s < a.length; s++)
                            if (a[s].getAttribute("id") == this.animationId) {
                                this.animationNode = a[s];
                                a = this.xmlDoc.getElementsByTagName("childs")[0].getElementsByTagName("child");
                                for (var o = 0; o < a.length; o++)
                                    if (a[o].getAttribute("animationid") == this.animationId) {
                                        ACTIVATE_DEBUG && console.log("Child from Spawn");
                                        var r = new eSheep(null, !0);
                                        r.animationId = a[o].getElementsByTagName("next")[0].textContent;
                                        var m = a[o].getElementsByTagName("x")[0].textContent,
                                            l = a[o].getElementsByTagName("y")[0].textContent;
                                        r._setPosition(this._parseKeyWords(m), this._parseKeyWords(l), !0), r.Start(this.animationFile);
                                        break
                                    }
                                break
                            }
                        break
                    }
                this._nextESheepStep()
            }
        }, {
            key: "_spawnChild",
            value: function() {
                for (var e = this.xmlDoc.getElementsByTagName("animations")[0].getElementsByTagName("animation"), t = 0; t < e.length; t++)
                    if (e[t].getAttribute("id") == this.animationId) {
                        this.animationNode = e[t];
                        break
                    }
                this._nextESheepStep()
            }
        }, {
            key: "_parseKeyWords",
            value: function _parseKeyWords(value) {
                value = value.replace(/screenW/g, this.screenW), value = value.replace(/screenH/g, this.screenH), value = value.replace(/areaW/g, this.screenH), value = value.replace(/areaH/g, this.screenH), value = value.replace(/imageW/g, this.imageW), value = value.replace(/imageH/g, this.imageH), value = value.replace(/random/g, 100 * Math.random()), value = value.replace(/randS/g, this.randS), value = value.replace(/imageX/g, this.imageX), value = value.replace(/imageY/g, this.imageY);
                var ret = 0;
                try {
                    ret = eval(value)
                } catch (e) {
                    console.error("Unable to parse this position: \n'" + value + "'\n Error message: \n" + e.message)
                }
                return ret
            }
        }, {
            key: "_getNextRandomNode",
            value: function(e) {
                var t = e.getElementsByTagName("next"),
                    i = this.xmlDoc.getElementsByTagName("animations")[0].getElementsByTagName("animation"),
                    n = 0,
                    a = !1;
                if (0 == t.length) return this.isChild ? (ACTIVATE_DEBUG && console.log("Remove child"), document.body.removeChild(this.DOMinfo), document.body.removeChild(this.DOMdiv)) : this._spawnESheep(), !1;
                for (var s = 0; s < t.length; s++) n += parseInt(t[s].getAttribute("probability"));
                var o = Math.random() * n,
                    r = 0;
                for (n = 0, s = 0; s < t.length; s++)
                    if ((n += parseInt(t[s].getAttribute("probability"))) >= o) {
                        r = s;
                        break
                    }
                for (s = 0; s < i.length; s++)
                    if (i[s].getAttribute("id") == t[r].textContent) {
                        this.animationId = i[s].getAttribute("id"), this.animationStep = 0, this.animationNode = i[s], a = !0;
                        break
                    }
                if (a) {
                    i = this.xmlDoc.getElementsByTagName("childs")[0].getElementsByTagName("child");
                    for (s = 0; s < i.length; s++)
                        if (i[s].getAttribute("animationid") == this.animationId) {
                            ACTIVATE_DEBUG && console.log("Child from Animation");
                            var m = new eSheep(null, !0);
                            m.animationId = i[s].getElementsByTagName("next")[0].textContent;
                            var l = i[s].getElementsByTagName("x")[0].textContent,
                                h = i[s].getElementsByTagName("y")[0].textContent;
                            m._setPosition(this._parseKeyWords(l), this._parseKeyWords(h), !0), m.Start(this.animationFile);
                            break
                        }
                }
                return a
            }
        }, {
            key: "_checkOverlapping",
            value: function() {
                var e, t = this.imageX,
                    i = this.imageY + this.imageH,
                    n = 20;
                for (var a in this.HTMLelement && (n = 5), COLLISION_WITH)
                    for (var s = document.body.getElementsByTagName(COLLISION_WITH[a]), o = 0; o < s.length; o++)
                        if (i > (e = s[o].getBoundingClientRect()).top - 2 && i < e.top + n && t > e.left && t < e.right - this.imageW) {
                            var r = window.getComputedStyle(s[o]);
                            if ("" != r.borderTopStyle && "none" != r.borderTopStyle && "none" != r.display) return s[o]
                        }
                return !1
            }
        }, {
            key: "_getNodeValue",
            value: function(e, t, i) {
                if (this.animationNode && this.animationNode.getElementsByTagName(e)) {
                    if (this.animationNode.getElementsByTagName(e)[0].getElementsByTagName(t)[0]) {
                        var n = this.animationNode.getElementsByTagName(e)[0].getElementsByTagName(t)[0].textContent;
                        return this._parseKeyWords(n)
                    }
                    return i
                }
            }
        }, {
            key: "_nextESheepStep",
            value: function() {
                if (!this.prepareToDie) {
                    var e, t = this._getNodeValue("start", "x", 0),
                        i = this._getNodeValue("start", "y", 0),
                        n = (this._getNodeValue("start", "offsety", 0), this._getNodeValue("start", "opacity", 1), this._getNodeValue("start", "interval", 1e3)),
                        a = this._getNodeValue("end", "x", 0),
                        s = this._getNodeValue("end", "y", 0),
                        o = (this._getNodeValue("end", "offsety", 0), this._getNodeValue("end", "interval", 1), this._getNodeValue("end", "interval", 1e3)),
                        r = this._parseKeyWords(this.animationNode.getElementsByTagName("sequence")[0].getAttribute("repeat")),
                        m = this.animationNode.getElementsByTagName("sequence")[0].getAttribute("repeatfrom"),
                        l = this.animationNode.getElementsByTagName("gravity"),
                        h = this.animationNode.getElementsByTagName("border"),
                        g = this.animationNode.getElementsByTagName("frame").length + (this.animationNode.getElementsByTagName("frame").length - m) * r;
                    if (e = this.animationStep < this.animationNode.getElementsByTagName("frame").length ? this.animationNode.getElementsByTagName("frame")[this.animationStep].textContent : 0 == m ? this.animationNode.getElementsByTagName("frame")[this.animationStep % this.animationNode.getElementsByTagName("frame").length].textContent : this.animationNode.getElementsByTagName("frame")[parseInt(m) + parseInt((this.animationStep - m) % (this.animationNode.getElementsByTagName("frame").length - m))].textContent, this.DOMimg.style.left = -this.imageW * (e % this.tilesX) + "px", this.DOMimg.style.top = -this.imageH * parseInt(e / this.tilesX) + "px", this.dragging || this.infobox) return this.animationStep++, void setTimeout(this._nextESheepStep.bind(this), 50);
                    if (this.flipped && (t = -t, a = -a), 0 == this.animationStep ? this._setPosition(t, i, !1) : this._setPosition(parseInt(t) + parseInt((a - t) * this.animationStep / g), parseInt(i) + parseInt((s - i) * this.animationStep / g), !1), this.animationStep++, this.animationStep >= g) {
                        if (this.animationNode.getElementsByTagName("action")[0]) switch (this.animationNode.getElementsByTagName("action")[0].textContent) {
                            case "flip":
                                "rotateY(0deg)" == this.DOMdiv.style.transform ? (this.DOMdiv.style.transform = "rotateY(180deg)", this.flipped = !0) : (this.DOMdiv.style.transform = "rotateY(0deg)", this.flipped = !1)
                        }
                        if (!this._getNextRandomNode(this.animationNode.getElementsByTagName("sequence")[0])) return
                    }
                    var d = !1;
                    if (!(h && h[0] && h[0].getElementsByTagName("next") && (a < 0 && this.imageX < 0 ? (this.imageX = 0, d = !0) : a > 0 && this.imageX > this.screenW - this.imageW ? (this.imageX = this.screenW - this.imageW, this.DOMdiv.style.left = parseInt(this.imageX) + "px", d = !0) : s < 0 && this.imageY < 0 ? (this.imageY = 0, d = !0) : s > 0 && this.imageY > this.screenH - this.imageH ? (this.imageY = this.screenH - this.imageH, d = !0) : s > 0 ? this._checkOverlapping() && this.imageY > this.imageH && (this.HTMLelement = this._checkOverlapping(), this.imageY = Math.ceil(this.HTMLelement.getBoundingClientRect().top) - this.imageH, d = !0) : this.HTMLelement && (this._checkOverlapping() || (this.imageY + this.imageH > this.HTMLelement.getBoundingClientRect().top + 3 || this.imageY + this.imageH < this.HTMLelement.getBoundingClientRect().top - 3 ? this.HTMLelement = null : this.imageX < this.HTMLelement.getBoundingClientRect().left ? (this.imageX = parseInt(this.imageX + 3), d = !0) : (this.imageX = parseInt(this.imageX - 3), d = !0), this.DOMdiv.style.left = parseInt(this.imageX) + "px")), d && !this._getNextRandomNode(h[0])) || !d && l && l[0] && l[0].getElementsByTagName("next") && this.imageY < this.screenH - this.imageH - 2 && (null == this.HTMLelement ? d = !0 : this._checkOverlapping() || (d = !0, this.HTMLelement = null), d && !this._getNextRandomNode(l[0])))) return !d && (this.imageX < -this.imageW && a < 0 || this.imageX > this.screenW && a > 0 || this.imageY < -this.imageH && i < 0 || this.imageY > this.screenH && s > 0) ? (d = !0, void(this.isChild || this._spawnESheep())) : void setTimeout(this._nextESheepStep.bind(this), parseInt(n) + parseInt((o - n) * this.animationStep / g))
                }
            }
        }, {
            key: "_loadPetList",
            value: function(e) {
                var t = this;
                fetch("https://adrianotiger.github.io/desktopPet/Pets/pets.json", {
                    credentials: "same-origin",
                    cache: "force-cache"
                }).then(function(e) {
                    return e.json()
                }).then(function(i) {
                    console.log(i), i.pets && e.addEventListener("mouseup", function(n) {
                        n.preventDefault(), n.stopPropagation();
                        var a = document.createElement("div");
                        a.setAttribute("style", "position:absolute;left:0px;top:20px;width:183px;min-height:100px;background:linear-gradient(to bottom, #8080ff, #3030a1);color:yellow;"), e.parentNode.appendChild(a);
                        var s, o = function(e) {
                            (s = document.createElement("b")).setAttribute("style", "cursor:pointer;display:block;"), s.appendChild(document.createTextNode(i.pets[e].folder)), s.addEventListener("click", function() {
                                new eSheep(t.userOptions).Start("https://adrianotiger.github.io/desktopPet/Pets/" + i.pets[e].folder + "/animations.xml"), t.remove()
                            }), a.appendChild(s)
                        };
                        for (var r in i.pets) o(r);
                        a.addEventListener("click", function(t) {
                            e.parentNode.removeChild(a)
                        })
                    })
                })
            }
        }]), eSheep
    }();
//# sourceMappingURL=../dist/esheep.min.js.map
