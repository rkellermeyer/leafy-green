GRPN = window.GRPN || {};
GROUPON_WIDGET_CSS_URL = 'http://groupon.com/stylesheets/widget.css';

if (!Array.forEach) {
    Array.prototype.forEach = function (D, E) {
        var C = E || window;
        for (var B = 0, A = this.length; B < A; ++B) {
            D.call(C, this[B], B, this);
        }
    };
    Array.prototype.filter = function (E, F) {
        var D = F || window;
        var A = [];
        for (var C = 0, B = this.length; C < B; ++C) {
            if (!E.call(D, this[C], C, this)) {
                continue;
            }
            A.push(this[C]);
        }
        return A;
    };
    Array.prototype.indexOf = function (B, C) {
        C = C || 0;
        for (var A = 0; A < this.length; ++A) {
            if (this[A] === B) {
                return A;
            }
        }
        return -1;
    };
} 
String.prototype.template = function (o) {
    return this.replace(/{\s+?([^{}]*)\s+?}/g,
        function (a, b) {
            var r = o[b];
            return typeof r === 'string' || typeof r === 'number' ? r : a;
        }
    );

};

(function () {
    if (GRPN && GRPN.Widget) {
      return;
    }

    GRPN.countdown = function (opts) {
      this.init(opts);
      return this;
    };
    GRPN.countdown.prototype = {
      init: function(opts) {
        this.targetTime = opts.targetDate;
        this.periods = ["days", "hours", "minutes", "seconds"];
        this.lengths = ["86400","3600","60","1"];
        this.timer = {};
        this.domContainer = 'groupon_widget';
        this.dom = {
          days: 'grpn_days_remaining',
          hours: 'grpn_hours_remaining',
          minutes: 'grpn_minutes_remaining',
          seconds: 'grpn_seconds_remaining'
        };
        var self = this;
        window.onunload = function() {
          self.destroy();
        };
        return self;
      },

      tick: function(){
        //adjust local time to utc
        var now = new Date().getTime() + (new Date().getTimezoneOffset() * 60 * 1000);
        var difference = (this.targetTime - now)/1000;
        var time_hash = {};
        for(var j = 0; j < this.lengths.length; j++) {
          if(difference >= this.lengths[j]){
            time_hash[this.periods[j]] = Math.floor(difference / this.lengths[j]);
            difference = (difference % this.lengths[j]);
          }
          else{
            time_hash[this.periods[j]] = 0;
          }
        }
        this.update(time_hash);
        return time_hash;
      },

      start: function() {
        var self = this;
        this.tick();
        this.timer = setInterval(function(){ self.tick(); }, 1000);
        return self;
      },

      stop: function() {
        clearInterval(this.timer);
        return self;
      },

      update: function(time_hash) {
        var $ = this.$;
        $(this.dom.days).innerHTML = time_hash.days;
        $(this.dom.hours).innerHTML = time_hash.hours;
        $(this.dom.minutes).innerHTML = time_hash.minutes;
        $(this.dom.seconds).innerHTML = time_hash.seconds;
        return this;
      },

      destroy: function() {
        clearInterval(this.timer);
        this.targetTime = null;
      },

      $: function(id){
        return document.getElementById(id);
      }
    };
    
    GRPN.Widget = function (opts) {
        this.init(opts);
    };
    
    GRPN.Widget.userIpRetrieved = function(response) {
      GRPN.Widget.getGeoFromIp(response.ip);
    };

		GRPN.Widget.getGeoFromIp = function(ip) {
			var yql = 'select latitude,longitude from pidgets.geoip'+
								' where ip="'+ip+'"';
			GRPN.Widget.loadFromYQL(yql,'GRPN.Widget.geoFromIpRetrieved', 'http://datatables.org/alltables.env');

		};
		
		GRPN.Widget.geoFromIpRetrieved = function(response) {
			var result = response.query.results.Result;
			GRPN.Widget.userLat = result.latitude;
			GRPN.Widget.userLng = result.longitude;
			GRPN.Widget.hasLoadedUserLoc = true;
		};

		GRPN.Widget.loadFromYQL = function(query, callback, table) {
			var src = 'http://query.yahooapis.com/v1/public/yql?q='+
								encodeURIComponent(query) + '&format=json&callback=' + callback; 
			if(table)
			  src += "&env=" + table;
			var head = document.getElementsByTagName('head')[0];
			var s = document.createElement('script');
			s.setAttribute('src',src);
			s.setAttribute('type', 'text/javascript');
			head.appendChild(s);
		};
    
    (function () {
        var Util = {};
        
        var isIE = function () {
            var agent = navigator.userAgent;
            return {
                ie: agent.match(/MSIE\s([^;]*)/)
            };
        } ();
        
				var G = function(id){
					if (typeof id == "string") {
						return document.getElementById(id);
					}
					return id;
				};
				
        var classNameRegex = function (a) {
          return new RegExp("(?:^|\\s+)" + a + "(?:\\s+|$)");
        };
				
				var getElementsByClassName = function (matchClass, tag, container, callback) {
          tag = tag || "*";
          container = container || document;
          var a = [],
              els = container.getElementsByTagName(tag),
              regex = classNameRegex(matchClass);
          for (var i = 0, d = els.length; i < d; ++i) {
              if (regex.test(els[i].className)) {
                  a[a.length] = els[i];
                  if (callback) {
                      callback.call(els[i], els[i]);
                  }
              }
          }
          return a;
      };

        var prepend = function (a, Z) {
            Z.parentNode.insertBefore(a, Z.nextSibling);
        };
        var remove = function (a) {
            try {
                a.parentNode.removeChild(a);
            } catch(Z) {}
        };
        var getFirstChild = function (Z) {
            return Z.firstChild;
        };
        
        var removeElement = function (el) {
            try {
                c.parentNode.removeChild(el);
            } catch (err) {}
        };
        
        var getStyle = function () {
            if (document.defaultView && document.defaultView.getComputedStyle) {
                return function (a, d) {
                    var c = null;
                    var b = document.defaultView.getComputedStyle(a, "");
                    if (b) {
                        c = b[d];
                    }
                    var Z = a.style[d] || c;
                    return Z;
                };
            } else {
                if (document.documentElement.currentStyle && isIE.ie) {
                    return function (Z, b) {
                        var a = Z.currentStyle ? Z.currentStyle[b] : null;
                        return (Z.style[b] || a);
                    };
                }
            }
        }();
        var className = {
            has: function (Z, a) {
                return new RegExp("(^|\\s)" + a + "(\\s|$)").test(G(Z).className);
            },
            add: function (Z, a) {
                if (!this.has(Z, a)) {
                    G(Z).className = G(Z).className + " " + a;
                }
            },
            remove: function (Z, a) {
                if (this.has(Z, a)) {
                    G(Z).className = G(Z).className.replace(new RegExp("(^|\\s)" + a + "(\\s|$)", "g"), "");
                }
            }
        };
        
        var Extend = function(obj, target) {
          for (property in obj) {
              target[property] = obj[property];
            }
            return target;
          };
        
        var Event = {
            add: function (b, a, Z) {
                if (b.addEventListener) {
                    b.addEventListener(a, Z, false);
                } else {
                    b.attachEvent("on" + a, function () {
                        Z.call(b, window.event);
                    });
                }
            },
            remove: function (b, a, Z) {
                if (b.removeEventListener) {
                    b.removeEventListener(a, Z, false);
                } else {
                    b.detachEvent("on" + a, Z);
                }
            }
        };
        var is = {
            bool: function (Z) {
                return typeof Z === "boolean";
            },
            def: function (Z) {
                return ! (typeof Z === "undefined");
            },
            number: function (Z) {
                return typeof Z === "number" && isFinite(Z);
            },
            string: function (Z) {
                return typeof Z === "string";
            },
            fn: function (Z) {
                return typeof Z === "function";
            },
            array: function (Z) {
                if (Z) {
                    return is.number(Z.length) && is.fn(Z.splice);
                }
                return false;
            }
        };
        
        var strToTime = function(date){
          return Date.parse(date.replace(/-/g, '/').replace(/Z$/, "").split("T").join(" "));
          
        };
        
        Util.loadStyleSheet = function (b, a) {
            if (!GRPN.Widget.loadingStyleSheet) {
                GRPN.Widget.loadingStyleSheet = true;
                var Z = document.createElement("link");
                Z.href = b;
                Z.rel = "stylesheet";
                Z.type = "text/css";
                document.getElementsByTagName("head")[0].appendChild(Z);
                var c = setInterval(function () {
                    var d = getStyle(a, "position");
                    if (d == "relative") {
                        clearInterval(c);
                        GRPN.Widget.hasLoadedStyleSheet = true;
                    }
                },
                50);
            }
        };
        
        Util.loadUserLoc = function(ip) {
          if (!GRPN.Widget.loadingGeoFromIP) {
          	GRPN.Widget.loadingGeoFromIP = true;
						Util.retrieveUserIP();
					}              
        };
        
        Util.retrieveUserIP = function() {
          GRPN.Widget.jsonP('http://jsonip.appspot.com/?callback=GRPN.Widget.userIpRetrieved', function(){});
				};

        Util.param = function(obj) {
          var s = [];
          for(var prop in obj) {
            s[s.length] = encodeURIComponent(prop) + "=" + encodeURIComponent(obj[prop]);
          }
          return '?' + s.join("&").replace(/%20/g, "+");
        };

        (function () {
            var Z = false;
            Util.css = function (c) {
                var b = document.createElement("style");
                b.type = "text/css";
                if (isIE.ie) {
                    b.styleSheet.cssText = c;
                } else {
                    var d = document.createDocumentFragment();
                    d.appendChild(document.createTextNode(c));
                    b.appendChild(d);
                }

                function a() {
                    document.getElementsByTagName("head")[0].appendChild(b);
                }
                if (!isIE.ie || Z) {
                    a();
                } else {
                    window.attachEvent("onload", function () {
                        Z = true;
                        a();
                    });
                }
            };
        })();
        GRPN.Widget.isLoaded = false;
        GRPN.Widget.loadingStyleSheet = false;
        GRPN.Widget.hasLoadedStyleSheet = false;
        GRPN.Widget.loadingGeoIpScript = false;
        GRPN.Widget.hasLoadedUserLoc = false;
        GRPN.Widget.WIDGET_NUMBER = 0;
        
        GRPN.Widget.jsonP = function (a, b) {
            var Z = document.createElement("script");
            Z.type = "text/javascript";
            Z.src = a;
            document.getElementsByTagName("head")[0].appendChild(Z);
            b(Z);
            return Z;
        };
        GRPN.Widget.prototype = function () {
            return {
                init: function (options) {
                    var self = this;
                    this._widgetNumber = ++GRPN.Widget.WIDGET_NUMBER;
                    this.apiToken = '9d9f91550e5f4093226e96b83f064e664bdee437';
                    GRPN.Widget["receiveCallback_" + this._widgetNumber] = function (response) {
                      if(response.deals){
                      //	console.log(response.deals);
                        self.deals = response.deals;
                        self.deal = self.deals[0] || self.deals;
                        self.deal.referralCode = self.opts.referral_code;
                        self.deal.medium = 'widget';
                        self.deal.price = self.deal.options[0].price.formattedAmount.replace(/\.\d+/, '');
                        self.deal.value = self.deal.options[0].value.formattedAmount.replace(/\.\d+/, '');
                        self.deal.discountPercent = self.deal.options[0].discountPercent;
                        self.deal.discountAmount = self.deal.options[0].discount.formattedAmount.replace(/\.\d+/, '');
                        self.city = self.deal.division.name;
                        self._addReferralCodeToLinks(self.deal);
                        self._normalizeUrlParams(self.deal);
                      }
                      self.renderHTML();
                      self.countDown = new GRPN.countdown({targetDate: strToTime(self.deal.endAt)}).start();
                    };
                    this._cb = "GRPN.Widget.receiveCallback_" + this._widgetNumber;
                    this.opts = options;
                    this._rendered = false;
                    this.jsonMaxRequestTimeOut = 19000;
                    this.id = options.id || "groupon_widget";
                    this.deal = {};
                    this.theme = Extend(options.theme || {}, this._getDefaultTheme());
                    //buttons needs extended too
                    this.theme.buttons = Extend(this.theme.buttons, this._getDefaultTheme().buttons);
                     var roundedClass = this.theme.rounded ? 'rounded' : '';
                    if (!options.id) {
                        document.write('<div id="groupon_widget" class="' + roundedClass + '"></div>');
                    }
                    this.widgetEl = G(this.id);
                    if (options.id) {
                        className.add(this.widgetEl, "GRPN-widget " + roundedClass);
                    }
                    Util.loadStyleSheet(GROUPON_WIDGET_CSS_URL, this.widgetEl);
                    this._ready = is.fn(options.ready) ? options.ready : function () {};
                    return this;
                },
                setDimensions: function (w, h) {
                    //maybe nothing to do here, but might need later
                    return this;
                },
                
                setTitle: function (f) {
                    this.title = f;
                    this.widgetEl.getElementsByTagName("h3")[0].innerHTML = this.title;
                    return this;
                },
                _setUrl: function () {
                    var params = {};
                    if(this.city && this.city !== "")
                      params['division_id'] = this.city;
                    params['callback'] = this._cb;
                    params['client_id'] = this.apiToken;
                    this.url = "http://api.groupon.com/v2/deals.json" + Util.param(params);
                    return this;
                },
                setTheme: function (k, f) {
                    var i = this;
                    var g = " !important";
                    
                    var h = "#groupon_widget #grpn_widget_get_it {background: " + this.theme.buttons.get_it_btn.background + ";}";
                    h += "#groupon_widget h1 {color:" + this.theme.header.color + ";}";
                    h += "#groupon_widget #grpn_widget_price_tag {background: " + this.theme.buttons.price_tag_btn.background  + "} ";
                    h += "#groupon_widget #grpn_widget_groupon_box {background:" + this.theme.deal.background + "; color: " + this.theme.deal.color + ";}";
                    h += "#groupon_widget a {color: " + this.theme.deal.link_color + "}";
                    h += "#groupon_widget { background-color: " + this.theme.shell.background + "; color: " + this.theme.shell.color + ";}";
                    h += "#groupon_widget #grpn_widget_price_tag_wrap #grpn_widget_triangle{border-right-color:" + this.theme.buttons.price_tag_btn.background + "}";
                    h += "#groupon_widget #grpn_widget_price_tag_wrap #grpn_widget_price_tag{background: " + this.theme.buttons.price_tag_btn.background + "}";
                    if (isIE.ie) {
                        h += "#groupon_widget #grpn_widget_get_it {background: " + this.theme.buttons.get_it_btn.background + "}";
                    }
                    Util.css(h);
                    return this;
                },
                byClass: function (matchClass, tag, single) {
                    var els = getElementsByClassName(matchClass, tag, G(this.id));
                    return (single) ? els : els[0];
                },
                
                
                
                render: function() {
                  var self = this;
                  if(this.opts.city && this.opts.city !== "")
                    this.city = this.opts.city;
									if (!self._externalDependenciesFulfilled()) {
                      window.setTimeout(function () {
                          self.render.call(self);
                      },
                      50);
                      return this;
                  }
                  this._setUrl();
                  this._loadDeal();
                  return this;
                },
                
                renderHTML: function () {
                  var self = this;
                  this.setTheme(this.theme);
                  this.widgetEl.innerHTML = this._getWidgetHtml();
                  
                  this._rendered = true;
                  this._ready();
                  return this;
                },
                removeEvents: function () {},

                _addReferralCodeToLinks: function(deal){
                  var params = {
                    utm_source: this.opts.referral_code,
                    utm_medium: 'widget'
                  };
                  deal.buyUrl = "http://groupon.com/deals/" + deal.id + "/confirmation" + Util.param(params);
                },
                
                _normalizeUrlParams: function(deal){
                  var params = {
                    utm_source: deal.referralCode,
                    medium: deal.medium
                  };
                  deal.dealUrlWithTrackingParams = deal.dealUrl + Util.param(params);
                },
                
                _getDefaultTheme: function () {
                    return {
                        header: {
                          color: "#fff"
                        },
                        shell: {
                            background: "#7fb93c",
                            color: "#000"
                        },
                        rounded: true,
                        deal: {
                          background: "#fff",
                          link_color: "#0981b3"
                        },
                        buttons: {
                          get_it_btn: {
                            background: "#7fb93c"
                          },
                          price_tag_btn: {
                            background: "#67d6f2" 
                          }
                          
                        }
                    };
                },
                _getWidgetHtml: function () {
                    var self = this;

                    function containerClass() {
                      return "container_class";
                    }  
                      
                    function header() {
                      
                       return "<h1>Daily Deal in <span style='text-transform: capitalize;'>" + self.city +"</span></h1>";
                    }
                    
                    function body() {
                      var roundedClass = self.theme.rounded ? 'rounded' : '';
                      var html = '<div id="groupon_box" class=" ' + roundedClass + '">';
                      html += '<h2><a href="{ dealUrlWithTrackingParams }">{ title }</a></h2>';
                      html += '<div id="grpn_widget_left"><div id="grpn_widget_price_tag_wrap"><div id="grpn_widget_triangle"><div id="grpn_widget_hole"><img src="http://groupon.com/images/groupon/widget/hole.png"/></div></div>';
                      html += '<div id="grpn_widget_price_tag">{ price }</div></div><table id="grpn_widget_breakdown">';
                      html += '<tr><th>value</th><th>discount</th><th>save</th></tr>';
                      html += '<tr><td class="grpn_widget_bold">{ value }</td><td class="grpn_widget_bold">{ discountPercent }%</td><td class="bold">{ discountAmount }</td></tr>';
                      html += '</table>';
                      html += '<table id="grpn_widget_time_left_label" cellpadding="0" cellspacing="0">';
  						        html += '<tr><td class="groupon_widget_text">time left to buy</td></tr>';
  						        html += '</table>';
                      html += '<table id="grpn_widget_time_left" class="bold" cellpadding="0" cellspacing="0" valign="top" >';
  						        html += '<tr>';
  						        html += '<td class="groupon_widget_text grpn_widget_number" id="grpn_days_remaining">1</td>';
  						        html += '<td class="groupon_widget_text grpn_widget_number" id="grpn_hours_remaining">12</td>';
  						        html += '<td class="groupon_widget_text grpn_widget_number" id="grpn_minutes_remaining">32</td>';
  						        html += '<td class="groupon_widget_text grpn_widget_number" id="grpn_seconds_remaining">21</td>';
  						        html += '</tr>';
  						        html += '<tr>';
  						        html += '<td class="groupon_widget_text grpn_widget_label">D</td>';
  						        html += '<td class="groupon_widget_text grpn_widget_label">H</td>';
  						        html += '<td class="groupon_widget_text grpn_widget_label">M</td>';
  						        html += '<td class="groupon_widget_text grpn_widget_label">S</td>';
  						        html += '</tr></table>';
                      html += '<table cellspacing="0" cellpadding="0" id="grpn_widget_number_bought" class="bold"><tr><td id="grpn_widget_number">{ soldQuantity }</td></tr>';
                      html += '<tr><td>bought</td></tr></table>';
                      html += '</div><div id="grpn_widget_right"><p id="grpn_widget_deal_image"><a href="{ dealUrlWithTrackingParams }"><img src="{ sidebarImageUrl }" /></a></p><div id="grpn_widget_get_it" class="grpn_widget_get_it_rounded">';
                      html += '<a href="{ buyUrl }">GET IT!</a></div></div></div>';
                      return html;
                    }
                    
                    function footer() {
                      var html = '<div id="footer">';
                      html += '</div></div>';
                      return html;
                    }
                    
                    var widgetHTML = (header() + body() + footer()).template(self.deal);
                    return widgetHTML;
                },
                
                _loadDeal: function() {
                  var self = this;
                  GRPN.Widget.jsonP(self.url, function (response) {
                      this.scriptElement = response;
                  });
                },
                
                _externalDependenciesFulfilled: function() {
                  var fulfilled = false;
                  var deps = [GRPN.Widget.hasLoadedStyleSheet];
                  for(var i = 0; i < deps.length; i++){
                    fulfilled = deps[i];
                  }
                  return fulfilled;
                },
                
                stop: function() {
                  this.countDown.destroy();
                  this.countDown.targetDate = null;
                },
                
                clear: function () {
                    var g = this.byClass("GRPN-tweet", "div", true);
                    var f = this.byClass("GRPN-new-results", "div", true);
                    g = g.concat(f);
                    g.forEach(function (h) {
                      removeElement(h);
                    });
                    return this;
                },
               
                destroy: function () {
                    this.stop();
                    this.clear();
                    this._hasOfficiallyStarted = false;
                    this._isRunning = false;
                    if (this.jsonRequestRunning) {
                      clearTimeout(this.jsonRequestTimer);
                      className.add(this.spinner, "GRPN-inactive");
                    }
                    className.remove(this.widgetEl, "GRPN-scroll");
                    this.removeEvents();
                    return this;
                }
            };
        }();
    })();
})();

