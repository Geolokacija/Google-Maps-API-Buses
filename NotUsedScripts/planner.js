typeof cfg == "undefined" && (cfg = {
    defaultCity: "intercity"
});
var ti = {
    stops: 0,
    routes: 0,
    shapes: {},
    distances: {},
    taxi: [],
    specialDates: {},
    specialWeekdays: {},
    asciiStops: {},
    cityTransportRoutes: {},
    FLD_ID: 0,
    FLD_CITY: 1,
    FLD_AREA: 2,
    FLD_STREET: 3,
    FLD_NAME: 4,
    FLD_INFO: 5,
    FLD_LNG: 6,
    FLD_LAT: 7,
    FLD_STOPS: 8,
    FLD_DIRS: 9,
    RT_ROUTEID: 0,
    RT_ORDER: 1,
    RT_ROUTENUM: 2,
    RT_AUTHORITY: 3,
    RT_CITY: 4,
    RT_TRANSPORT: 5,
    RT_OPERATOR: 6,
    RT_VALIDITYPERIODS: 7,
    RT_SPECIALDATES: 8,
    RT_ROUTETAG: 9,
    RT_ROUTETYPE: 10,
    RT_COMMERCIAL: 11,
    RT_ROUTENAME: 12,
    RT_WEEKDAYS: 13,
    RT_ENTRY: 14,
    RT_STREETS: 15,
    RT_ROUTESTOPSPLATFORMS: 16,
    RT_ROUTESTOPS: 17,
    accent_map: {
        "ą": "autobusuData",
        "ä": "autobusuData",
        "ā": "autobusuData",
        "č": "c",
        "ę": "e",
        "ė": "e",
        "į": "i",
        "ų": "u",
        "ū": "u",
        "ü": "u",
        "ž": "z",
        "ē": "e",
        "ģ": "g",
        "ī": "i",
        "ķ": "k",
        "ļ": "l",
        "ņ": "n",
        "ö": "o",
        "õ": "o",
        "š": "s",
        "а": "autobusuData",
        "б": "b",
        "в": "v",
        "г": "g",
        "д": "d",
        "е": "e",
        "ё": "e",
        "ж": "zh",
        "з": "z",
        "и": "i",
        "й": "j",
        "к": "k",
        "л": "l",
        "м": "m",
        "н": "n",
        "о": "o",
        "п": "p",
        "р": "r",
        "с": "s",
        "т": "t",
        "у": "u",
        "ф": "f",
        "х": "x",
        "ц": "c",
        "ч": "ch",
        "ш": "sh",
        "щ": "shh",
        "ъ": !0,
        "ы": "y",
        "ь": !0,
        "э": "je",
        "ю": "ju",
        "я": "ja",
        "№": "n",
        "–": "-",
        "—": "-",
        "̶": "-",
        "­": "-",
        "˗": "-",
        "“": !0,
        "”": !0,
        "„": !0,
        "'": !0,
        "\"": !0
    },
    wordSeparators: "–—̶­˗“”„ _-.()'\""
};
ti.SERVER = typeof window == "object" ? 1 : !0, typeof cfg == "object" && cfg.defaultCity == "klaipeda" && (ti.transportRoutes = function(a, b) {
    if (a.slice(-1).toLowerCase() == "e") return "expressbus";
    if (b == "nightbus" || a == "N1" || a == "66" || a == "88" || a == "170") return "nightbus";
    if (a == "31" || a == "32") return "minibus";
    return "bus"
}), typeof window == "object" && typeof console == "undefined" && (window.console = {
    log: function() {}
}), String.prototype.trim = function() {
    return this.replace(/^\s\s*/, "").replace(/\s\s*$/, "")
}, ti.dateToMinutes = function(a, b) {
    var c = +a / 6e4;
    b || (c = Math.floor(c)), c -= a.getTimezoneOffset();
    return c
}, ti.dateToDays = function(a) {
    return Math.floor(ti.dateToMinutes(a) / 1440)
}, ti.printTime = function(a, b, c) {
    if (a < 0) return "";
    !b && b !== "" && (b = ":");
    var d = ~~a,
        e = ~~(d / 60);
    c == "duration" ? c = "" : typeof cfg == "object" && cfg.defaultCity != "intercity" && (e %= 24), d = d % 60;
    return (c && e < 10 ? c : "") + e + b + (d < 10 ? "0" : "") + d
}, ti.toMinutes = function(a) {
    if (typeof a != "string") return 0;
    var b = a.trim(),
        c = b.length,
        d;
    if (b.indexOf(":") < 0) {
        d = parseInt(b.substr(c - 2, 2), 10);
        return c > 2 ? d + parseInt(b.substr(0, c - 2), 10) * 60 : d * 60
    }
    var e = a.split(":");
    d = parseInt(e[0], 10) * 60 + parseInt(e[1], 10), e[2] && parseInt(e[2], 10) >= 30 && ++d;
    return d
}, ti.fDownloadUrl = function(a, b, c, d) {
    if (a && b && c) {
        if (ti.SERVER === !0) {
            http.get(b, function(a) {
                a.setEncoding("utf8");
                var b = "";
                a.on("data", function(a) {
                    b += a
                }), a.on("end", function() {
                    c(b)
                }), a.on("error", function() {})
            }).on("error", function(a) {});
            return
        }
        var e;
        if (!window.XMLHttpRequest || window.location.protocol === "file:" && window.ActiveXObject) {
            try {
                e = new ActiveXObject("MSXML2.XMLHTTP.6.0")
            } catch (f) {}
            if (!e) try {
                e = new ActiveXObject("MSXML2.XMLHTTP")
            } catch (f) {}
            if (!e) try {
                e = new ActiveXObject("Microsoft.XMLHTTP")
            } catch (f) {}
        } else e = new XMLHttpRequest, (d || b.indexOf("http") == 0) && !("withCredentials" in e) && typeof XDomainRequest != "undefined" && (e = new XDomainRequest, e.open(a, b), e.onload = function() {
            c(e.responseText)
        });
        e.open(a, b, !0), e.onreadystatechange = function() {
            if (e.readyState == 4)
                if (e.status == 200 || e.status == 0) typeof e.responseText == "string" ? c(e.responseText) : typeof e.responseXML == "string" ? c(e.responseXML) : c(e.responseText)
        };
        try {
            e.send(null)
        } catch (g) {}
    }
}, ti.toAscii = function(a, b, c) {
    var d = (a || "").toLowerCase(),
        e = d.split(""),
        f, g = ti.accent_map;
    for (var h = e.length; --h >= 0;) c && e[h] == "ž" ? (e[h] = "zh", d = !1) : (f = g[e[h]]) ? (e[h] = f === !0 ? "" : f, d = !1) : b === !0 && e[h] === " " && (e[h] = "", d = !1);
    b === 2 && (d = e.join("").trim().replace(/\s+-/g, "-").replace(/-\s+/g, "-"));
    return d || e.join("")
}, ti.cloneObject = function(a) {
    var b = a instanceof Array ? [] : {};
    for (var c in a) a[c] && typeof a[c] == "object" ? b[c] = a[c].clone() : b[c] = a[c];
    return b
}, ti.naturalSort = function(a, b) {
    var c = /(^-?[0-9]+(\.?[0-9]*)[df]?e?[0-9]?$|^0x[0-9a-f]+$|[0-9]+)/gi,
        d = /(^[ ]*|[ ]*$)/g,
        e = /(^([\w ]+,?[\w ]+)?[\w ]+,?[\w ]+\d+:\d+(:\d+)?[\w ]?|^\d{1,4}[\/\-]\d{1,4}[\/\-]\d{1,4}|^\w+, \w+ \d+, \d{4})/,
        f = /^0x[0-9a-f]+$/i,
        g = /^0/,
        h = a.toString().replace(d, "") || "",
        i = b.toString().replace(d, "") || "",
        j = h.replace(c, "\u0000$1\u0000").replace(/\0$/, "").replace(/^\0/, "").split("\u0000"),
        k = i.replace(c, "\u0000$1\u0000").replace(/\0$/, "").replace(/^\0/, "").split("\u0000"),
        l = parseInt(h.match(f)) || j.length != 1 && h.match(e) && Date.parse(h),
        m = parseInt(i.match(f)) || l && i.match(e) && Date.parse(i) || null;
    if (m) {
        if (l < m) return -1;
        if (l > m) return 1
    }
    for (var n = 0, o = Math.max(j.length, k.length); n < o; n++) {
        oFxNcL = !(j[n] || "").match(g) && parseFloat(j[n]) || j[n] || 0, oFyNcL = !(k[n] || "").match(g) && parseFloat(k[n]) || k[n] || 0;
        if (isNaN(oFxNcL) !== isNaN(oFyNcL)) return isNaN(oFxNcL) ? 1 : -1;
        typeof oFxNcL !== typeof oFyNcL && (oFxNcL += "", oFyNcL += "");
        if (oFxNcL < oFyNcL) return -1;
        if (oFxNcL > oFyNcL) return 1
    }
    return 0
}, ti.loadData = function() {
    if (typeof cfg === "object" && cfg.city && cfg.city.datadir) {
        var a = new Date;
        location.pathname.indexOf("test.html") < 0 ? a = a.setHours(a.getHours() - 2, 0, 0, 0) : a = a.getTime(), cfg.city.datadir.indexOf(".php") < 0 ? (ti.fDownloadUrl("get", cfg.city.datadir + "/routes.txt?" + a, ti.loadRoutes), ti.fDownloadUrl("get", cfg.city.datadir + "/stops.txt?" + a, ti.loadStops)) : (ti.fDownloadUrl("get", cfg.city.datadir + "routes.txt&timestamp=" + a, ti.loadRoutes, !0), ti.fDownloadUrl("get", cfg.city.datadir + "stops.txt&timestamp=" + a, ti.loadStops, !0))
    } else ti.fDownloadUrl("get", "routes.txt", ti.loadRoutes), ti.fDownloadUrl("get", "stops.txt", ti.loadStops);
    cfg.defaultCity === "latvia" && ti.fDownloadUrl("get", "taxi.txt", ti.loadTaxi)
}, ti.loadStops = function(a, b) {
    a = a.split(b || "\n");
    var c = "",
        d = "",
        e = "",
        f = "",
        g = "",
        h = "",
        i = "",
        j = {},
        k = {},
        l = [],
        m = a.length,
        n = a[0].toUpperCase().split(";"),
        o = {};
    for (var p = n.length; --p >= 0;) o[n[p]] = p;
    o.ID = 0;
    for (var p = 1; p < m; p++)
        if (a[p].length > 1) {
            var q = a[p].split(";"),
                r = q[o.CITY];
            r && (d = r === "0" ? "" : r.trim());
            var s = c + ti.toAscii(q[o.ID], !0, !0),
                t = q[o.SIRIID],
                u = ti.toAscii(q[o.STOPS] || "", !0, !0);
            c && (u = c + u.replace(/,/g, "," + c));
            if (r = q[o.AREA]) e = r === "0" ? "" : r.trim();
            if (r = q[o.STREET]) f = r === "0" ? "" : r.trim();
            if (r = q[o.NAME]) {
                g = r === "0" ? "" : r, h = ti.toAscii(r);
                var v = k[h];
                k[h] = v ? v + "," + s : s
            } else k[h] += "," + s;
            if (r = q[o.INFO]) i = r === "0" ? "" : r;
            var w = {
                id: s,
                siriID: t,
                lat: +q[o.LAT] / 1e5,
                lng: +q[o.LNG] / 1e5,
                name: g,
                city: d,
                info: i,
                raw_data: [s, d, e, f, g, i, q[o.LNG], q[o.LAT], u].join(";")
            };
            ti.SERVER && (w.routes = [], w.neighbours = u ? u.split(",") : []), j[s] = w, l.push(w)
        }
    ti.stops = null, ti.stops = j, ti.asciiStops = k, l.sort(function(a, b) {
        return a.lat < b.lat ? -1 : a.lat > b.lat ? 1 : 0
    });
    for (p = l.length; --p > 0;)
        if (l[p].city === "kautra") {
            var x = l[p].lat;
            for (var y = p - 1; --y >= 0;) {
                var z = x - l[y].lat;
                if (z > .015) break;
                var A = l[p].lng - l[y].lng;
                A > -.015 && A < .015 && (l[p].neighbours.push(l[y].id), l[y].neighbours.push(l[p].id))
            }
        }
    typeof ti.routes == "string" && (ti.SERVER === !0 ? ti.loadRoutes(ti.routes) : window.setTimeout(function() {
        ti.loadRoutes(ti.routes)
    }, 10))
}, ti.loadRoutes = function(a, b) {
    if (typeof ti.stops !== "object") ti.routes = a;
    else {
        a = a.split(b || "\n");
        var c = [],
            d = ti.stops,
            e = {},
            f = "",
            g = "",
            h = "",
            i = "",
            j = "",
            k = "",
            l = "",
            m = "",
            n = "",
            o = "",
            p = "",
            q = "",
            r = 0,
            s = a[0].toUpperCase().split(";"),
            t = {};
        for (var u = s.length; --u >= 0;) t[s[u]] = u;
        t.ROUTENUM = 0, t.ROUTESTOPSPLATFORMS || (t.ROUTESTOPSPLATFORMS = -1);
        var v = -1,
            w = a.length;
        for (var u = 1; u < w; u++)
            if (a[u].charAt(0) === "#") {
                var x = a[u].split("#"),
                    y = null,
                    z = null,
                    A = new Date;
                x[1] !== "" && (y = new Date(x[1])), x[2] !== "" && (z = new Date(x[2]));
                if ((!y || y <= A) && (!z || z >= A)) {
                    var B = {
                        comment: x[3]
                    };
                    x[4] && (B.departures = x[4]), x[5] && (B.weekdays = x[5]), x[6] && (B.directions = x[6]);
                    var C = c[v];
                    C.comments ? C.comments.push(B) : C.comments = [B]
                }
            } else if (a[u].length > 1) {
                var x = a[u].split(";"),
                    D;
                if (D = x[t.AUTHORITY]) h = D === "0" ? "" : D;
                if (h === "SpecialDates") {
                    var E = {},
                        F = x[t.VALIDITYPERIODS].split(","),
                        G = 0,
                        H = 0,
                        I = x[t.ROUTENUM] == "";
                    for (var J = -1, K = F.length; ++J < K;) F[J] && (G = +F[J]), H += G, I ? ti.specialWeekdays[H] = +x[t.WEEKDAYS] : E[H] = !0;
                    I || (ti.specialDates[x[t.ROUTENUM]] = E);
                    continue
                }++r;
                if (D = x[t.ROUTENUM]) f = D === "0" ? "" : D, r = 1;
                if (D = x[t.ROUTENAME]) g = D;
                if (D = x[t.CITY]) i = D === "0" ? "" : D, l = i + "_" + k, r = 1;
                if (D = x[t.TRANSPORT]) k = D === "0" ? "" : D, l = i + "_" + k, r = 1;
                var L = k;
                typeof cfg === "object" && cfg.defaultCity == "vilnius" && f.search(/15[0-9]/) >= 0 && (L = "eventbus", l = i + "_" + L), typeof ti.transportRoutes == "function" && (L = ti.transportRoutes(f, k), l = i + "_" + L), l && (ti.cityTransportRoutes[i + "_" + L] = !0, l = "");
                if (D = x[t.OPERATOR]) m = D === "0" ? "" : D;
                if (D = x[t.VALIDITYPERIODS]) n = D === "0" ? "" : D;
                if (D = x[t.SPECIALDATES]) o = D === "0" ? "" : D;
                if (D = x[t.WEEKDAYS]) p = D === "0" ? "" : D;
                q = t.STREETS ? x[t.STREETS] : "";
                if (f.indexOf("разв") >= 0) {
                    ++u;
                    continue
                }++v;
                var M = ti.toAscii(x[t.ROUTESTOPS], !0, !0).split(","),
                    N = !1;
                for (var O = 0, P = M.length; O < P; ++O) {
                    var Q = M[O];
                    Q.charAt(0) === "e" ? (N || (N = (new Array(O + 1)).join("0").split("")), N[O] = "1", Q = Q.substring(1), M[O] = Q) : Q.charAt(0) === "x" ? (N || (N = (new Array(O + 1)).join("0").split("")), N[O] = "2", Q = Q.substring(1), M[O] = Q) : N && (N[O] = "0"), j && (Q = M[O] = j + Q);
                    var R = d[Q];
                    R ? (e[Q] = !0, R.raw_data += ";" + v + ";" + O, (!0 || ti.SERVER) && R.routes.push(v, O)) : (M.splice(O, 1), --P, --O)
                }
                var S = [v, r, f, h, i, L, m, n, o, x[t.ROUTETAG], ti.toAscii(x[t.ROUTETYPE]), x[t.COMMERCIAL], g, p, N && N.join("") || "", q, x[t.ROUTESTOPSPLATFORMS] || "", M.join(";")].join(";");
                ++u, ti.SERVER === !0 ? c[v] = {
                    id: v,
                    authority: h,
                    city: i,
                    transport: L,
                    num: f,
                    name: g,
                    stops: M,
                    platforms: x[t.ROUTESTOPSPLATFORMS] || "",
                    entry: N && N.join("") || "",
                    specialDates: o.split(","),
                    times: a[u],
                    raw_data: S
                } : c[v] = {
                    id: v,
                    times: a[u],
                    raw_data: S
                }
            }
        ti.routes = null, ti.routes = c;
        if (typeof cfg === "object" && cfg.defaultCity !== "mariupol" && cfg.defaultCity !== "helsinki" && cfg.defaultCity !== "pppskov" && cfg.defaultCity !== "kautra")
            for (var Q in d) !e[Q] && Q.charAt(0) != "a" && (d[Q].name = "");
        if (typeof cfg === "object" && cfg.defaultCity == "latvia")
            for (var Q in d) d[Q].city = ti.toAscii(d[Q].city);
        typeof window === "object" && typeof pg === "object" && (pg.fCreateNavigation(), pg.fTabActivate(), pg.loadGoogleMapsScript(function() {
            cfg.defaultCity != "rrrostov" && (cfg.city.areaBounds ? pg.geocoder = {
                bounds: new google.maps.LatLngBounds(new google.maps.LatLng(cfg.city.areaBounds.southWest.lat, cfg.city.areaBounds.southWest.lng), new google.maps.LatLng(cfg.city.areaBounds.northEast.lat, cfg.city.areaBounds.northEast.lng)),
                places: new google.maps.places.PlacesService($("divMapForPlaces")),
                autocomplete: new google.maps.places.AutocompleteService,
                index: {},
                interval: 300,
                timer: null,
                getPlaceId: function(a, b) {
                    var c = this,
                        d = {
                            placeId: a.slice(1)
                        };
                    this.places.getDetails(d, function(a, d) {
                        if (d == google.maps.places.PlacesServiceStatus.OK) {
                            var e = Math.round(a.geometry.location.lat() * 1e5) / 1e5,
                                f = Math.round(a.geometry.location.lng() * 1e5) / 1e5,
                                g = [e, f].join(";");
                            c.index[g] = a.name, b(g)
                        }
                    })
                },
                search: function(a, b) {
                    var c = this;
                    this.timer !== null && (window.clearTimeout(this.timer), this.timer = null), this.timer = window.setTimeout(function() {
                        c.autocomplete.getPlacePredictions({
                            input: a,
                            bounds: c.bounds,
                            componentRestrictions: {
                                country: cfg.defaultLanguage
                            }
                        }, function(a, c) {
                            if (c == google.maps.places.PlacesServiceStatus.OK) {
                                var d = [];
                                for (var e = 0, f; f = a[e]; e++) {
                                    var g = f.description;
                                    if (cfg.city.addressFilter && f.description.toLowerCase().indexOf(cfg.city.addressFilter) == -1) continue;
                                    var h = g.split(",");
                                    h.length > 1 && (g = h[0], h[1] != " Vilnius" && (g += ", " + h[1]));
                                    var i = "@" + f.place_id;
                                    d.push({
                                        name: g,
                                        type: (f.types || []).join(", "),
                                        key: i
                                    })
                                }
                                b(d)
                            } else b([])
                        })
                    }, c.interval)
                }
            } : pg.geocoder = {
                g: new google.maps.Geocoder,
                interval: 300,
                previousInput: "",
                timer: null,
                cache: {},
                index: {},
                search: function(a, b) {
                    a = (a || "").trim();
                    if (a.length < 3) return [];
                    this.previousInput = a, this.timer !== null && (window.clearTimeout(this.timer), this.timer = null), a in this.cache ? b(this.cache[a]) : this.timer = window.setTimeout(function() {
                        pg.geocoder.g.geocode({
                            address: a,
                            region: cfg.defaultLanguage,
                            componentRestrictions: {
                                country: cfg.defaultLanguage,
                                locality: cfg.defaultCity == "intercity" ? "Lithuania" : cfg.defaultCity
                            }
                        }, function(c, d) {
                            if (d == google.maps.GeocoderStatus.OK) {
                                c.length && c[0].formatted_address.indexOf("Riga, ") == 0 && (c = []), c.length && c[0].formatted_address.indexOf("Vilnius, ") == 0 && (c = []);
                                var e = [];
                                for (var f = 0; f < c.length; ++f) {
                                    var g = c[f],
                                        h = g.formatted_address.split(","),
                                        i = h.length > 1 && (h[0] + h[1]).length <= 36 ? [h[0], h[1]].join(",") : h[0],
                                        j = Math.round(g.geometry.location.lat() * 1e5) / 1e5,
                                        k = Math.round(g.geometry.location.lng() * 1e5) / 1e5;
                                    pg.geocoder.index[[j, k].join(";")] = i, e.push({
                                        name: i,
                                        address: g.formatted_address,
                                        lat: j,
                                        lng: k
                                    })
                                }
                                pg.geocoder.cache[a] = e, b(e)
                            } else b([])
                        })
                    }, this.interval)
                }
            })
        }))
    }
}, ti.loadTaxi = function(a, b) {
    ti.taxi = [], a = a.split(b || "\n");
    var c = a.length,
        d = a[0].toUpperCase().split(";"),
        e = {};
    for (var f = d.length; --f >= 0;) e[d[f]] = f;
    for (var f = 1; f < c; f++)
        if (a[f].length > 1) {
            var g = a[f].split(";"),
                h = {
                    name: g[e.NAME],
                    lat: parseFloat(g[e.LAT].replace(",", ".")),
                    lng: parseFloat(g[e.LNG].replace(",", ".")),
                    radius: parseInt(g[e.RADIUS]),
                    phone: g[e.PHONE]
                };
            h.radius *= h.radius, ti.taxi.push(h)
        }
}, ti.fGetStopsByName = function(a, b) {
    if (typeof ti.stops !== "object") return [];
    var c = ti.toAscii(a);
    if (!c) return [];
    var d = c.replace(/\W/g, ""),
        e = a.toLowerCase().replace(/\W/g, ""),
        f = [],
        g = ti.wordSeparators,
        h = ti.asciiStops,
        i = ti.stops[a];
    i && typeof cfg == "object" && cfg.defaultCity == "krasnodar" && f.push(ti.stops[a]);
    for (var j in h) {
        var k = -1;
        for (;;) {
            k = j.indexOf(c, k + 1);
            if (k < 0) break;
            if (k === 0 || g.indexOf(j.charAt(k - 1)) >= 0) {
                var l = h[j].split(",");
                for (var m = l.length; --m >= 0;) {
                    var i = ti.fGetStopDetails(l[m]);
                    i.name && (e === d || i.name.toLowerCase().replace(/\W/g, "").indexOf(e) >= 0) && (i.indexOf = k, f.push(i))
                }
            }
        }
    }
    var n = {};
    for (var m = 0; m < f.length; m++) {
        var i = f[m],
            o = parseInt(i.id, 10) || i.id;
        if (b) {
            var p = n[o];
            p && (p.name != i.name && (o = i.id))
        }
        var q = n[o];
        q ? q.id += "," + i.id : (n[o] = q = i, q.streetIsIncluded = {}), i.street && i.street !== "-" && !q.streetIsIncluded[i.street] && (q.streetIsIncluded[i.street] = !0, q.streets = (q.streets ? q.streets + ", " : "") + i.street)
    }
    var r = {},
        s = [];
    for (var t in n) {
        var i = n[t],
            o = i.name.replace(/[^a-zA-Z0-9\u0400-\u04FF]/g, "") + ";" + i.streets;
        typeof cfg == "object" && cfg.defaultCity == "intercity" && (o += ";" + i.area);
        var q = r[o];
        q ? q.id += "," + i.id : (r[o] = i, s.push(i))
    }
    s.sort(function(a, b) {
        if (typeof cfg == "object" && cfg.defaultCity == "intercity") {
            if (a.info && !b.info) return -1;
            if (!a.info && b.info) return 1;
            var c = /[a-zA-Z]/g;
            if (c.test(a.name)) {
                if (!c.test(b.name)) return -1
            } else if (c.test(b.name)) return 1
        }
        if (a.id.charAt(0) === "autobusuData" && b.id.charAt(0) !== "autobusuData") return -1;
        if (b.id.charAt(0) === "autobusuData" && a.id.charAt(0) !== "autobusuData") return 1;
        if (typeof pg !== "undefined") {
            if (a.city === pg.city && b.city !== pg.city) return -1;
            if (a.city !== pg.city && b.city === pg.city) return 1
        }
        if (a.indexOf === 0 && b.indexOf !== 0) return -1;
        if (b.indexOf === 0 && a.indexOf !== 0) return 1;
        if (a.name < b.name) return -1;
        if (b.name < a.name) return 1;
        if (a.area < b.area) return -1;
        if (b.area < a.area) return 1;
        if (a.streets < b.streets) return -1;
        if (b.streets < a.streets) return 1;
        return 0
    });
    return s
}, ti.fGetAnyStopDetails = function(a, b) {
    if (!a) {
        if (b) {
            b({});
            return
        }
        return {}
    }
    if (typeof ti.stops !== "object") {
        if (b) {
            setTimeout(function() {
                ti.fGetAnyStopDetails(a, b)
            }, 200);
            return
        }
        return {}
    }
    var c = typeof a == "string" ? a.split(",") : a,
        d, e, f, g;
    e = f = g = 0;
    for (var h = 0; h < c.length; ++h) {
        var i = ti.fGetStopDetails(c[h]);
        !d && i.id && (d = i), i && i.lat && i.lng && (e += i.lat, f += i.lng, ++g)
    }
    g && (d.latAvg = e / g, d.lngAvg = f / g);
    if (b) b(d || {});
    else return d || {}
}, ti.fGetStopDetails = function(a) {
    if (typeof ti.stops !== "object" || !a) return {};
    var b = ti.stops[a],
        c;
    if (!b) {
        var d = a.indexOf(";");
        if (d > 0) {
            c = {
                id: a,
                name: typeof pg != "undefined" && a == pg.myLocation && i18n.myLocation || typeof mobile != "undefined" && mobile.geocoder && mobile.geocoder.index[a] || typeof pg != "undefined" && pg.geocoder2 && pg.geocoder2.index[a] || typeof pg != "undefined" && pg.geocoder && pg.geocoder.index[a] || (typeof i18n == "object" ? i18n.mapPoint : "Point on map"),
                neighbours: "",
                lat: parseFloat(a.substr(0, d)),
                lng: parseFloat(a.substr(d + 1)),
                raw_data: ""
            };
            return c
        }
        return {}
    }
    var e = b.raw_data.split(";");
    c = {
        id: e[ti.FLD_ID],
        city: e[ti.FLD_CITY],
        area: e[ti.FLD_AREA],
        street: e[ti.FLD_STREET],
        name: b.name,
        info: e[ti.FLD_INFO],
        neighbours: e[ti.FLD_STOPS],
        lng: ti.stops[a].lng,
        lat: ti.stops[a].lat,
        raw_data: b.raw_data
    };
    return c
}, ti.fGetTransfersAtStop = function(a, b, c) {
    var d = ti.stops,
        e = [a],
        f = parseInt(a, 10);
    if (f && "" + f !== "" + a && cfg.defaultCity !== "druskininkai" && cfg.defaultCity !== "riga")
        for (var g in d) f == parseInt(g, 10) && e.push(g);
    return ti.fGetRoutesAtStop(e, !1, b, c)
}, ti.fGetRoutesAtStop = function(a, b, c, d) {
    var e = d && d.dirType || "-",
        f = d && d.id || null,
        g = [],
        h = typeof a == "string" ? a.split(",") : a,
        i = e.split("-"),
        j = i[0],
        k = i[i.length - 1],
        l = j.charAt(0),
        m = k.charAt(0);
    for (var n = h.length; --n >= 0;) {
        var o = (ti.stops[h[n]] || {
                raw_data: ""
            }).raw_data.split(";"),
            p = o.length;
        for (var q = ti.FLD_DIRS; q < p; q += 2) {
            var r = ti.fGetRoutes(o[q]),
                s = +o[q + 1] < r.stops.length - 1;
            (s || c) && (b || !r.routeTag || r.id === f) && (r.stopId = h[n], e && (r.dirType.indexOf(e) < 0 && e.indexOf(r.dirType) < 0 && r.dirType.indexOf("-d") < 0 && j !== k && (r.dirType.indexOf(k) == 0 || r.dirType.indexOf(j) == r.dirType.length - 1 || r.dirType.indexOf("-" + m) < 0 && r.dirType.indexOf(j + "-") < 0 && r.dirType.indexOf(l + "-") < 0 && (r.dirType.indexOf("c") < 0 || r.dirType.indexOf("c") >= r.dirType.length - 2))) ? r.sortKey = "1" : r.sortKey = "0", r.sortKey = [cfg.transportOrder[r.transport] || "Z", ("000000" + parseInt(r.num, 10)).slice(-6), ("000000" + parseInt(r.num.substr(1), 10)).slice(-6), (r.num + "00000000000000000000").substr(0, 20), n === 0 ? "0" : "1", s ? "0" : "1", r.sortKey, ("000000" + r.order).slice(-6)].join(""), g.push(r))
        }
    }
    g.sort(function(a, b) {
        if (a.sortKey < b.sortKey) return -1;
        if (a.sortKey > b.sortKey) return 1;
        return 0
    });
    return g
}, ti.fGetRoutes = function(a, b, c, d, e, f) {
    var g = [],
        h = {},
        i = -1,
        j = 0,
        k, l, m, n, o = ti.wordSeparators;
    f && (f = ti.toAscii("" + f, 2)), isNaN(a) ? a && typeof a == "object" ? l = a : (k = ti.routes, i = 0, j = k.length, m = c && ti.toAscii(c, !0), a = "," + a + ",") : l = ti.routes[+a];
    if (ti.SERVER === !0 && i == -1) return l;
    while (i < j) {
        i >= 0 && (l = k[i]);
        var p = l.raw_data.split(";"),
            q = p[ti.RT_CITY],
            r = p[ti.RT_TRANSPORT],
            s = p[ti.RT_ORDER],
            t = p[ti.RT_ROUTENUM],
            u;
        r == "expressbus" && t && t.charAt(t.length - 1) == "G" ? u = t.substring(0, t.length - 1) + "<sup>G</sup>" : u = t, t = ti.toAscii(t, !0);
        var v = p[ti.RT_ROUTETAG];
        if (i < 0 || ("," + q + ",").indexOf(a) >= 0 && (!b || b === r || b == "xxxbus" && r == "eventbus") && (!m || m === t && (!v || e === !0 || e === "0" && v.indexOf("0") < 0)) && (!d || d === p[ti.RT_ROUTETYPE])) {
            if (f) {
                var w = t.indexOf(f);
                w === 0 && t.length > f.length && "0123456789".indexOf(t.charAt(f.length)) >= 0 && (w = -1);
                if (w !== 0) {
                    var x = ti.toAscii(p[ti.RT_ROUTENAME], 2);
                    w = x.indexOf(f), w > 0 && o.indexOf(x.charAt(w - 1)) < 0 && o.indexOf(f.charAt(0)) < 0 && (w = -1)
                }
                if (w >= 0 || f === "*") {
                    w = 0, n = ti.toAscii(q + ";" + r + ";" + t + ";" + p[ti.RT_ROUTENAME], !0);
                    var y = h[n];
                    y && (w = -1, y.weekdays += p[ti.RT_WEEKDAYS])
                }
                if (w < 0 || v) {
                    ++i;
                    continue
                }
            } else if (i >= 0 && !m) {
                n = ti.toAscii(q + ";" + r + ";" + t, !0);
                var y = h[n];
                if (y) {
                    var z = p[ti.RT_ROUTETYPE];
                    if (z === "autobusuData-b" || z.indexOf("autobusuData-b_") === 0) p[ti.RT_ROUTENAME] !== y.name && (y = null);
                    y && y.dirType.indexOf("_") < 0 && (y.weekdays += p[ti.RT_WEEKDAYS])
                }
                if (y && s !== "1") {
                    ++i;
                    continue
                }
            }
            var A = (p[ti.RT_VALIDITYPERIODS] || "").split(",");
            for (var B = 0; B < 7; ++B) A[B] = parseInt(A[B], 10) || 0, B > 0 && (A[B] += A[B - 1], A[B] <= 0 && (A[B] = A[B - 1]));
            var C = "Z";
            typeof cfg === "object" && cfg.transportOrder && (C = cfg.transportOrder[r] || "Z"), C += ("000000" + parseInt(t, 10)).slice(-6) + ("000000" + parseInt(t.substr(1), 10)).slice(-6) + (t + "!!!!!!!!!!!!!!!!!!!!").substr(0, 20) + ("000000" + s).slice(-6), g.push({
                id: p[0],
                authority: p[ti.RT_AUTHORITY],
                city: q,
                transport: r,
                operator: p[ti.RT_OPERATOR],
                commercial: p[ti.RT_COMMERCIAL],
                num: p[ti.RT_ROUTENUM],
                numHTML: u,
                name: p[ti.RT_ROUTENAME],
                routeTag: v,
                dirType: p[ti.RT_ROUTETYPE],
                weekdays: p[ti.RT_WEEKDAYS],
                validityPeriods: A,
                specialDates: (p[ti.RT_SPECIALDATES] || "").split(","),
                entry: p[ti.RT_ENTRY],
                streets: p[ti.RT_STREETS],
                platforms: p[ti.RT_ROUTESTOPSPLATFORMS],
                stops: p.slice(ti.RT_ROUTESTOPS),
                times: l.times,
                order: s,
                sortKey: C,
                raw_data: l.raw_data
            }), n && (h[n] = g[g.length - 1])
        }++i
    }
    if (!j) return g[0];
    g.sort(function(a, b) {
        if (a.sortKey < b.sortKey) return -1;
        if (a.sortKey > b.sortKey) return 1;
        return ti.naturalSort(a.num, b.num) || (a.order < b.order ? -1 : a.order > b.order ? 1 : 0)
    });
    return g
}, ti.fOperatorDetails = function(a, b) {
    var c = cfg.operators[a || b];
    if (!c) return a;
    c = b && c[b] || c;
    return c[pg.language] || c.en || c
}, ti.encodeNumber = function(a) {
    a = a << 1, a < 0 && (a = ~a);
    var b = "";
    while (a >= 32) b += String.fromCharCode((32 | a & 31) + 63), a >>= 5;
    b += String.fromCharCode(a + 63);
    return b
}, ti.explodeTimes = function(a) {
    var b = [],
        c = [],
        d = [],
        e = [],
        f = [],
        g = [],
        h = [],
        i = [],
        j, k, l = a.split(","),
        m, n, o = l.length,
        p = [],
        q = "+",
        r = "-";
    for (m = -1, j = 0, k = 0, n = 0; ++m < o;) {
        var s = l[m];
        if (s == "") break;
        var t = s.charAt(0);
        t === q ? p[m] = s.charAt(1) === "0" && s !== "+0" ? "2" : "1" : t === r && s.charAt(1) === "0" && (p[m] = s.charAt(2) === "0" ? "2" : "1"), n += +s, b[j++] = n
    }
    for (var u = p.length; --u >= 0;) p[u] || (p[u] = "0");
    for (var u = 0; ++m < o;) {
        var v = +l[m],
            w = l[++m];
        w === "" ? (w = j - u, o = 0) : w = +w;
        while (w-- > 0) d[u++] = v
    }--m;
    for (var u = 0, o = l.length; ++m < o;) {
        var v = +l[m],
            w = l[++m];
        w === "" ? (w = j - u, o = 0) : w = +w;
        while (w-- > 0) e[u++] = v
    }--m;
    for (var u = 0, o = l.length; ++m < o;) {
        var x = l[m],
            w = l[++m];
        w === "" ? (w = j - u, o = 0) : w = +w;
        while (w-- > 0) c[u++] = x
    }
    if (ti.has_trips_ids) {
        --m;
        var o = l.length;
        for (var u = 0; ++m < o;) {
            if (l[m] === "") break;
            f[u] = +l[m], u > 0 && (f[u] += f[u - 1]), ++u
        }
        for (var u = 0; ++m < o;) {
            if (l[m] === "") break;
            g[u] = l[m], ++u
        }
        if (ti.has_trips_ids === 2) {
            for (var u = 0; ++m < o;) {
                if (l[m] === "") break;
                i[u] = l[m], ++u
            }
            for (var u = 0; ++m < o;) {
                if (l[m] === "") break;
                h[u] = l[m], ++u
            }
        }++m
    }--m, k = 1;
    for (var u = j, y = j, z = 5, o = l.length; ++m < o;) {
        z += +l[m] - 5;
        var w = l[++m];
        w !== "" ? (w = +w, y -= w) : (w = y, y = 0);
        while (w-- > 0) b[u] = z + b[u - j], ++u;
        y <= 0 && (y = j, z = 5, ++k)
    }
    final_data = {
        workdays: c,
        times: b,
        tag: p.join(""),
        valid_from: d,
        valid_to: e,
        trip_ids: f,
        trip_codes: g,
        trip_operators: h,
        trip_groups: i
    };
    return final_data
}, ti.fGetDirTag = function(a) {
    if (a.indexOf("-d") >= 0) return "0";
    if (a.indexOf("2") >= 0) return "2";
    if (a.indexOf("3") >= 0) return "3";
    var b = a.search(/[\dcefghijklmnopqrstuvwyz]/);
    if (b > 0) {
        var c = a.indexOf("_");
        if (c < 0 || c > b) return "1"
    }
    return ""
}, ti.parseParams = function(a) {
    var b = {};
    if (!a) {
        b.status = "UNDEFINED";
        return b
    }
    a.origin || (b.status = "NO_ORIGIN"), a.destination || (b.status += (b.status ? "," : "") + "NO_DESTINATION");
    var c, d, e = 1;
    if (a.departure_time || a.arrival_time) {
        var f = a.departure_time || a.arrival_time;
        typeof f == "string" ? f = new Date(f.replace(/-/g, "/")) : (f = parseInt(a.departure_time || a.arrival_time, 10), ti.TimeZoneOffset = -(new Date).getTimezoneOffset() / 60, ti.TimeZoneOffset || (ti.TimeZoneOffset = 3, f * 1e3 > +(new Date(2015, 9, 25, 3, 0, 0)) && (ti.TimeZoneOffset = 2), f += ti.TimeZoneOffset * 3600), f = new Date(f * 1e3)), c = new Date(f.getFullYear(), f.getMonth(), f.getDate()), d = f.getHours() * 60 + f.getMinutes(), e = a.departure_time ? 1 : -1
    }
    var g = {};
    if (typeof a.transport == "object") g = a.transport;
    else if (a.transport) {
        var h = "," + a.transport + ",";
        g = {
            train: h.indexOf("train") >= 0,
            tram: h.indexOf("tram") >= 0 || h.indexOf("city") >= 0,
            trol: h.indexOf("trol") >= 0 || h.indexOf("city") >= 0,
            bus: h.indexOf("cb") >= 0 || h.indexOf("city") >= 0
        }, g.regionalbus = g.internationalbus = h.indexOf("bus") >= 0
    }
    b = {
        status: b.status || "OK",
        mode: a.mode,
        optimization: a.optimization,
        origin: a.origin,
        origin_name: a.origin_name,
        start_stops: a.origin,
        destination: a.destination,
        destination_name: a.destination_name,
        finish_stops: a.destination,
        reverse: e,
        date: c,
        start_time: d,
        time_window: a.time_window,
        results_max: a.results_max,
        walk_min: parseInt(a.walk_min || ti.walk_min || 10, 10),
        walk_max: parseInt(a.walk_max || ti.walk_max || 1e3, 10),
        walk_max_total: parseInt(a.walk_max_total || ti.walk_max_total || 999999, 10),
        lowFloor: !1,
        transport: g,
        walk_speed_kmh: parseInt(a.walk_speed || 4, 10),
        change_time: parseInt(a.change_time || 3, 10),
        operators: a.operators,
        added_trips: a.added_trips,
        removed_trips: a.removed_trips,
        max_changes: a.max_changes,
        route_nums: a.route_nums,
        shapes_url: a.shapes_url
    };
    if (a.origin && a.origin.indexOf(";") > 0) {
        var i = a.origin.split(";"),
            j = parseFloat(i[0]),
            k = parseFloat(i[1]);
        if (j > 1e3 || k > 1e3) {
            b.start_east = j, b.start_north = k;
            var l = ti.ENtoLatLng(j, k);
            b.start_stops = l[0] + ";" + l[1]
        }
    }
    if (a.destination && a.destination.indexOf(";") > 0) {
        var i = a.destination.split(";"),
            j = parseFloat(i[0]),
            k = parseFloat(i[1]);
        if (j > 1e3 || k > 1e3) {
            b.end_east = j, b.end_north = k;
            var l = ti.ENtoLatLng(j, k);
            b.finish_stops = l[0] + ";" + l[1]
        }
    }
    return b
}, ti.printParameters = function(a) {
    if (!a.date) {
        var b = new Date;
        a.date = new Date(b.getFullYear(), b.getMonth(), b.getDate())
    }
    var c = {
        origin: a.origin,
        origin_name: a.origin_name,
        destination: a.destination,
        destination_name: a.destination_name,
        optimization: a.optimization,
        results_max: a.results_max,
        walk_min: a.walk_min + " m",
        walk_max: a.walk_max / 1e3 + " km",
        walk_speed: a.walk_speed_kmh + " km/h",
        change_time: a.change_time + " minutes",
        max_changes: a.max_changes,
        time_zone_offset: ti.TimeZoneOffset,
        operators: a.operators,
        added_trips: a.added_trips,
        removed_trips: a.removed_trips,
        time_window: a.time_window
    };
    a.date && (c.date = a.date.yyyymmdd(".")), a.reverse == 1 && (c.departure_time = ti.printTime(a.start_time)), a.reverse == -1 && (c.arrival_time = ti.printTime(a.start_time)), a.walk_max_total && (c.walk_max_total = a.walk_max_total / 1e3 + " km");
    if (typeof a.transport == "object") c.transport = a.transport;
    else if (a.transport) {
        var d = "";
        for (var e in a.transport) a.transport[e] && (d += ", " + e);
        d && (c.transport = d.substring(2))
    }
    return c
}, ti.toUnixTime = function(a, b) {
    var c = new Date(a.getFullYear(), a.getMonth(), a.getDate(), Math.floor((b || 0) / 60), (b || 0) % 60);
    ti.TimeZoneOffset = -c.getTimezoneOffset() / 60, c = +c / 1e3, ti.TimeZoneOffset || (ti.TimeZoneOffset = 3, a > new Date(2017, 9, 29, 3, 0, 0) && (ti.TimeZoneOffset = 2), c -= ti.TimeZoneOffset * 3600);
    return c
}, Date.prototype.yyyymmdd = function(a) {
    var b = this.getFullYear().toString(),
        c = (this.getMonth() + 1).toString(),
        d = this.getDate().toString();
    a || (a = "");
    return b + a + (c[1] ? c : "0" + c[0]) + a + (d[1] ? d : "0" + d[0])
}, ti.gtfs_vehicle_name = {
    bus: "bus",
    regionalbus: "bus",
    internationalbus: "bus",
    trol: "trol",
    train: "train",
    tram: "tram",
    ferry: "ferry",
    ship: "ship",
    plane: "plane",
    1: "tram",
    2: "train",
    3: "bus",
    4: "ferry",
    800: "trol",
    1e3: "ship",
    1100: "plane"
}, ti.gtfs_vehicle_type = {
    bus: "LOCALBUS",
    regionalbus: "BUS",
    internationalbus: "BUS",
    trol: "TROLLEYBUS",
    train: "RAIL",
    tram: "TRAM",
    ferry: "FERRY",
    ship: "SHIP",
    plane: "AIR",
    1: "TRAM",
    2: "RAIL",
    3: "BUS",
    4: "FERRY",
    800: "TROLLEYBUS",
    1e3: "WATER_TRANSPORT",
    1100: "AIR"
}, ti.ToGoogleFormat = function(a) {
    if (!a || !a.status) {
        var b = {
            status: "UNDEFINED",
            parsed_parameters: {},
            routes: []
        };
        return b
    }
    if (a.status != "OK") {
        var b = {
            status: a.status,
            parsed_parameters: ti.printParameters(a),
            routes: []
        };
        return b
    }
    var c = a.results,
        b = {
            parsed_parameters: ti.printParameters(a),
            status: c.length ? "OK" : "ZERO_RESULTS",
            calculation_time: a.search_duration + "ms",
            text: undefined,
            summary: undefined,
            routes: []
        };
    for (var d = 0; d < c.length; d++) {
        var e = c[d],
            f = c[d].legs,
            g = {
                bounds: {
                    northeast: {
                        lat: undefined,
                        lng: undefined
                    },
                    southwest: {
                        lat: undefined,
                        lng: undefined
                    }
                },
                overview_polyline: {
                    points: undefined
                },
                legs: [],
                warnings: [],
                copyrights: undefined,
                waypoint_order: undefined
            };
        g.bounds = undefined, g.overview_polyline = undefined, g.warnings = undefined;
        var h = {
            duration: {
                value: undefined,
                text: undefined
            },
            walking_duration: {
                value: undefined,
                text: undefined
            },
            distance: {
                value: undefined,
                text: undefined
            },
            departure_time: {
                value: undefined,
                text: undefined,
                time_zone: undefined
            },
            arrival_time: {
                value: undefined,
                text: undefined,
                time_zone: undefined
            },
            start_location: {
                lat: undefined,
                lng: undefined
            },
            end_location: {
                lat: undefined,
                lng: undefined
            },
            start_address: undefined,
            end_address: undefined,
            origin_name: a.origin_name,
            destination_name: a.destination_name
        };
        h.departure_time.value = ti.toUnixTime(a.date, e.start_time), h.departure_time.text = ti.printTime(e.start_time), h.departure_time.time_zone = ti.TimeZone, h.arrival_time.value = ti.toUnixTime(a.date, e.finish_time), h.arrival_time.text = ti.printTime(e.finish_time), h.arrival_time.time_zone = ti.TimeZone, h.duration.value = e.travel_time * 60, h.duration.text = e.travel_time + " min", h.walking_duration.value = e.walk_time * 60, h.walking_duration.text = e.walk_time + " min", h.distance = Math.round(e.distance), h.cost = e.cost, h.steps = [];
        if (e.legs && e.legs[0]) {
            var i = f[0];
            h.start_location.lat = i.start_stop.lat, h.start_location.lng = i.start_stop.lng;
            if (a.start_east && a.start_north) h.start_location.east = a.start_east, h.start_location.north = a.start_north;
            else if (a.mode == "vintra") {
                var j = ti.LatLngToEN(h.start_location.lat, h.start_location.lng);
                h.start_location.east = j[0], h.start_location.north = j[1]
            }
        }
        if (e.legs && f.length && e.legs[f.length - 1]) {
            var k = f[f.length - 1];
            h.end_location.lat = k.finish_stop.lat, h.end_location.lng = k.finish_stop.lng;
            if (a.end_east && a.end_north) h.end_location.east = a.end_east, h.end_location.north = a.end_north;
            else if (a.mode == "vintra") {
                var j = ti.LatLngToEN(h.end_location.lat, h.end_location.lng);
                h.end_location.east = j[0], h.end_location.north = j[1]
            }
        }
        g.legs.push(h);
        for (var l = 0; l < f.length; l++) {
            var m = f[l],
                n = {
                    travel_mode: undefined,
                    duration: {
                        value: undefined,
                        text: undefined
                    },
                    distance: {
                        value: undefined,
                        text: undefined
                    },
                    start_location: {
                        lat: undefined,
                        lng: undefined
                    },
                    end_location: {
                        lat: undefined,
                        lng: undefined
                    },
                    polyline: {
                        points: undefined
                    },
                    html_instructions: undefined,
                    transit_details: {
                        departure_time: {
                            value: undefined,
                            text: undefined,
                            time_zone: undefined
                        },
                        arrival_time: {
                            value: undefined,
                            text: undefined,
                            time_zone: undefined
                        },
                        weekdays: undefined,
                        departure_stop: {
                            name: undefined,
                            location: {
                                lat: undefined,
                                lng: undefined
                            },
                            street: undefined,
                            id: undefined,
                            platform: undefined
                        },
                        arrival_stop: {
                            name: undefined,
                            location: {
                                lat: undefined,
                                lng: undefined
                            },
                            street: undefined,
                            id: undefined,
                            platform: undefined
                        },
                        headsign: undefined,
                        num_stops: undefined,
                        stops: undefined,
                        line: {
                            name: undefined,
                            short_name: undefined,
                            vehicle: {
                                name: undefined,
                                type: undefined,
                                icon: undefined
                            },
                            trip_id: undefined,
                            trip_date: undefined,
                            trip_num: undefined,
                            trip_operator: undefined,
                            trip_group: undefined,
                            agencies: [],
                            weekdays: undefined,
                            url: undefined,
                            color: undefined,
                            icon: undefined
                        }
                    }
                };
            n.travel_mode = m.route ? "TRANSIT" : "WALKING", n.distance = undefined, n.polyline = undefined;
            if (m.shape && m.shape.length) {
                n.geometry = [];
                for (var o = 0; o < m.shape.length; ++o) {
                    var p = [m.shape[o][0], m.shape[o][1]];
                    m.route && (p = ti.LatLngToEN(m.shape[o][0], m.shape[o][1])), n.geometry.push(p)
                }
            }
            m.distance && (n.distance = {
                value: m.distance,
                text: m.distance + " meters"
            }), n.start_location.lat = n.transit_details.departure_stop.location.lat = m.start_stop.lat, n.start_location.lng = n.transit_details.departure_stop.location.lng = m.start_stop.lng, n.end_location.lat = n.transit_details.arrival_stop.location.lat = m.finish_stop.lat, n.end_location.lng = n.transit_details.arrival_stop.location.lng = m.finish_stop.lng;
            if (a.mode == "vintra") {
                var j = ti.LatLngToEN(n.start_location.lat, n.start_location.lng);
                n.start_location.east = n.transit_details.departure_stop.location.east = j[0], n.start_location.north = n.transit_details.departure_stop.location.north = j[1], j = ti.LatLngToEN(n.end_location.lat, n.end_location.lng), n.end_location.east = n.transit_details.arrival_stop.location.east = j[0], n.end_location.north = n.transit_details.arrival_stop.location.north = j[1], n.geometry || (n.geometry = [
                    [n.start_location.east, n.start_location.north],
                    [n.end_location.east, n.end_location.north]
                ])
            }
            n.duration.value = (m.finish_time - m.start_time) * 60, n.duration.text = m.finish_time - m.start_time + " min", n.transit_details.departure_time.value = ti.toUnixTime(a.date, m.start_time), n.transit_details.departure_time.text = ti.printTime(m.start_time), n.transit_details.departure_time.time_zone = ti.TimeZone, n.transit_details.arrival_time.value = ti.toUnixTime(a.date, m.finish_time), n.transit_details.arrival_time.text = ti.printTime(m.finish_time), n.transit_details.arrival_time.time_zone = ti.TimeZone, m.start_stop.id.indexOf(";") < 0 && (n.transit_details.departure_stop.name = m.start_stop.name, n.transit_details.departure_stop.id = m.start_stop.id, n.transit_details.departure_stop.street = m.start_stop.street, n.transit_details.departure_stop.platform = m.start_platform), m.finish_stop.id.indexOf(";") < 0 && (n.transit_details.arrival_stop.name = m.finish_stop.name, n.transit_details.arrival_stop.id = m.finish_stop.id, n.transit_details.arrival_stop.street = m.finish_stop.street, n.transit_details.arrival_stop.platform = m.finish_platform);
            if (m.route) {
                n.transit_details.headsign = m.route.name, n.transit_details.num_stops = m.finish_pos - m.start_pos, n.transit_details.stops = m.stops, n.transit_details.cost = m.cost, n.transit_details.line.name = m.route.name, n.transit_details.line.short_name = m.route.num, n.transit_details.line.vehicle.name = ti.gtfs_vehicle_name[m.route.transport.toLowerCase()] || m.route.transport, n.transit_details.line.vehicle.type = ti.gtfs_vehicle_type[m.route.transport.toLowerCase()] || "OTHER", n.transit_details.line.trip_id = m.trip_id, n.transit_details.line.trip_date = m.trip_date && m.trip_date.yyyymmdd("."), n.transit_details.line.trip_num = m.trip_code, n.transit_details.line.trip_operator = m.trip_operator, n.transit_details.line.trip_group = m.trip_group, n.transit_details.weekdays = m.weekdays, n.transit_details.line.weekdays = m.route.weekdays, n.transit_details.line.track_id = m.route.route_id || ti.toAscii([m.route.city, m.route.transport, m.route.num, m.route.dirType].join("_"));
                if (m.route.operator) {
                    var q = {
                        name: undefined,
                        phone: undefined,
                        url: undefined
                    };
                    q.name = m.route.operator, n.transit_details.line.agencies.push(q)
                }
                m.online_data && (n.transit_details.online_data = m.online_data)
            } else n.transit_details.line = undefined;
            n.taxi = m.taxi, g.legs[0].steps.push(n)
        }
        b.routes.push(g)
    }
    return b
};

function SHA1(a) {
    function b(a, b) {
        var c = a << b | a >>> 32 - b;
        return c
    }

    function c(a) {
        var b = "",
            c, d, e;
        for (c = 0; c <= 6; c += 2) d = a >>> c * 4 + 4 & 15, e = a >>> c * 4 & 15, b += d.toString(16) + e.toString(16);
        return b
    }

    function d(a) {
        var b = "",
            c, d;
        for (c = 7; c >= 0; c--) d = a >>> c * 4 & 15, b += d.toString(16);
        return b
    }

    function e(a) {
        a = a.replace(/\r\n/g, "\n");
        var b = "";
        for (var c = 0; c < a.length; c++) {
            var d = a.charCodeAt(c);
            d < 128 ? b += String.fromCharCode(d) : d > 127 && d < 2048 ? (b += String.fromCharCode(d >> 6 | 192), b += String.fromCharCode(d & 63 | 128)) : (b += String.fromCharCode(d >> 12 | 224), b += String.fromCharCode(d >> 6 & 63 | 128), b += String.fromCharCode(d & 63 | 128))
        }
        return b
    }
    var f, g, h, i = new Array(80),
        j = 1732584193,
        k = 4023233417,
        l = 2562383102,
        m = 271733878,
        n = 3285377520,
        o, p, q, r, s, t;
    a = e(a);
    var u = a.length,
        v = new Array;
    for (g = 0; g < u - 3; g += 4) h = a.charCodeAt(g) << 24 | a.charCodeAt(g + 1) << 16 | a.charCodeAt(g + 2) << 8 | a.charCodeAt(g + 3), v.push(h);
    switch (u % 4) {
        case 0:
            g = 2147483648;
            break;
        case 1:
            g = a.charCodeAt(u - 1) << 24 | 8388608;
            break;
        case 2:
            g = a.charCodeAt(u - 2) << 24 | a.charCodeAt(u - 1) << 16 | 32768;
            break;
        case 3:
            g = a.charCodeAt(u - 3) << 24 | a.charCodeAt(u - 2) << 16 | a.charCodeAt(u - 1) << 8 | 128
    }
    v.push(g);
    while (v.length % 16 != 14) v.push(0);
    v.push(u >>> 29), v.push(u << 3 & 4294967295);
    for (f = 0; f < v.length; f += 16) {
        for (g = 0; g < 16; g++) i[g] = v[f + g];
        for (g = 16; g <= 79; g++) i[g] = b(i[g - 3] ^ i[g - 8] ^ i[g - 14] ^ i[g - 16], 1);
        o = j, p = k, q = l, r = m, s = n;
        for (g = 0; g <= 19; g++) t = b(o, 5) + (p & q | ~p & r) + s + i[g] + 1518500249 & 4294967295, s = r, r = q, q = b(p, 30), p = o, o = t;
        for (g = 20; g <= 39; g++) t = b(o, 5) + (p ^ q ^ r) + s + i[g] + 1859775393 & 4294967295, s = r, r = q, q = b(p, 30), p = o, o = t;
        for (g = 40; g <= 59; g++) t = b(o, 5) + (p & q | p & r | q & r) + s + i[g] + 2400959708 & 4294967295, s = r, r = q, q = b(p, 30), p = o, o = t;
        for (g = 60; g <= 79; g++) t = b(o, 5) + (p ^ q ^ r) + s + i[g] + 3395469782 & 4294967295, s = r, r = q, q = b(p, 30), p = o, o = t;
        j = j + o & 4294967295, k = k + p & 4294967295, l = l + q & 4294967295, m = m + r & 4294967295, n = n + s & 4294967295
    }
    var t = d(j) + d(k) + d(l) + d(m) + d(n);
    return t.toLowerCase()
}

function DoTest() {
    var a = ti.LatLngToEN(54.69564, 25.27743),
        b = ti.ENtoLngLat(582346.92226, 6062885.2678);
    return
}
ti.ENtoLatLng = function(a, b) {
    var c = 3.14159265,
        d = 6378137,
        e = 6356752.3141,
        f = 0,
        g = 0,
        h = 5e5,
        i = .9998,
        j = 24,
        k = g * (c / 180),
        l = j * (c / 180),
        m = d * i,
        n = e * i,
        o = (Math.pow(m, 2) - Math.pow(n, 2)) / Math.pow(m, 2),
        p = (m - n) / (m + n),
        q = a - h,
        r = ti.InitialLat(b, f, m, k, p, n),
        s = 1 / Math.cos(r),
        t = Math.tan(r),
        u = m / Math.sqrt(1 - o * Math.pow(Math.sin(r), 2)),
        v = u * (1 - o) / (1 - o * Math.pow(Math.sin(r), 2)),
        w = u / v - 1,
        x = t / (2 * v * u),
        y = t / (24 * v * Math.pow(u, 3)) * (5 + 3 * Math.pow(t, 2) + w - 9 * w * Math.pow(t, 2)),
        z = t / (720 * v * Math.pow(u, 5)) * (61 + 90 * Math.pow(t, 2) + 45 * Math.pow(t, 4)),
        A = 180 / c * (r - Math.pow(q, 2) * x + Math.pow(q, 4) * y - Math.pow(q, 6) * z),
        B = s / u,
        C = s / (6 * Math.pow(u, 3)) * (u / v + 2 * Math.pow(t, 2)),
        D = s / (120 * Math.pow(u, 5)) * (5 + 28 * Math.pow(t, 2) + 24 * Math.pow(t, 4)),
        E = s / (5040 * Math.pow(u, 7)) * (61 + 662 * Math.pow(t, 2) + 1320 * Math.pow(t, 4) + 720 * Math.pow(t, 6)),
        F = 180 / c * (l + q * B - Math.pow(q, 3) * C + Math.pow(q, 5) * D - Math.pow(q, 7) * E);
    return [A, F]
}, ti.LatLngToEN = function(a, b) {
    var c = 3.14159265,
        d = 6378137,
        e = 6356752.3141,
        f = 0,
        g = 0,
        h = 5e5,
        i = .9998,
        j = 24,
        k = a * (c / 180),
        l = b * (c / 180),
        m = g * (c / 180),
        n = j * (c / 180),
        o = d * i,
        p = e * i,
        q = (o * o - p * p) / (o * o),
        r = (o - p) / (o + p),
        s = o / Math.sqrt(1 - q * Math.pow(Math.sin(k), 2)),
        t = s * (1 - q) / (1 - q * Math.pow(Math.sin(k), 2)),
        u = s / t - 1,
        v = l - n,
        w = ti.Marc(p, r, m, k),
        x = Math.sin(k),
        y = Math.cos(k),
        z = Math.tan(k),
        A = w + f,
        B = s / 2 * x * y,
        C = s / 24 * x * Math.pow(y, 3) * (5 - z * z + 9 * u),
        D = s / 720 * x * Math.pow(y, 5) * (61 - 58 * (z * z) + Math.pow(z, 4));
    Y = A + v * v * B + Math.pow(v, 4) * C + Math.pow(v, 6) * D, Y = Math.round(Y);
    var E = s * y,
        F = s / 6 * Math.pow(y, 3) * (s / t - z * z),
        G = s / 120 * Math.pow(y, 5) * (5 - 18 * (z * z) + Math.pow(z, 4) + 14 * u - 58 * (z * z) * u);
    X = h + v * E + Math.pow(v, 3) * F + Math.pow(v, 5) * G, X = Math.round(X);
    return [X, Y]
}, ti.InitialLat = function(a, b, c, d, e, f) {
    var g = (a - b) / c + d,
        h = ti.Marc(f, e, d, g),
        i = (a - b - h) / c + g;
    while (Math.abs(a - b - h) > 1e-5) i = (a - b - h) / c + g, h = ti.Marc(f, e, d, i), g = i;
    return i
}, ti.Marc = function(a, b, c, d) {
    return a * ((1 + b + 1.25 * (b * b) + 1.25 * (b * b * b)) * (d - c) - (3 * b + 3 * (b * b) + 21 / 8 * (b * b * b)) * Math.sin(d - c) * Math.cos(d + c) + (15 / 8 * (b * b) + 15 / 8 * (b * b * b)) * Math.sin(2 * (d - c)) * Math.cos(2 * (d + c)) - 35 / 24 * (b * b * b) * Math.sin(3 * (d - c)) * Math.cos(3 * (d + c)))
}, ti.distance = function(a, b, c, d) {
    if (!(a && b && c && d)) return 0;
    var e = 6378137,
        f = Math.PI / 180,
        g = f * (c - a),
        h = f * (d - b),
        i = Math.sin(g / 2),
        j = Math.sin(h / 2),
        k = i * i + Math.cos(f * a) * Math.cos(f * c) * j * j,
        l = 2 * Math.atan2(Math.sqrt(k), Math.sqrt(1 - k)),
        m = e * l;
    return m
}, ti.encodeNumber = function(a) {
    a = a << 1, a < 0 && (a = ~a);
    var b = "";
    while (a >= 32) b += String.fromCharCode((32 | a & 31) + 63), a >>= 5;
    b += String.fromCharCode(a + 63);
    return b
}, ti.stringToFields = function(a, b, c) {
    var d = a.split(/,(?=(?:[^"]*"[^"]*")*[^"]*$)/);
    if (d.length < b.length) return {
        error: "Missing data, fields found; " + d.length + ", required: " + b.length
    };
    var e = {};
    for (var f = 0; f < b.length; ++f) {
        var g = d[f];
        if (g.indexOf("\"") >= 0) {
            g = g.replace(/""/g, "\"");
            var h = g.length;
            g.charAt(0) === "\"" && g.charAt(h - 1) === "\"" && h > 1 && (g = g.slice(1, -1))
        }
        e[b[f]] = g
    }
    return e
};
if (typeof module !== "undefined" && module.exports) {
    module.exports = ti;
    var http = require("http")
}
var Hash = function() {
    var a = this,
        b = document.documentMode,
        c = a.history,
        d = a.location,
        e, f, g, h = function() {
            var a = d.href.indexOf("#");
            return a == -1 ? "" : decodeURI(d.href.substr(a + 1))
        },
        i = function() {
            var b = h();
            b != f && (f = b, e(b, !1), pg.timeOfActivity = (new Date).getTime(), typeof _gaq != "undefined" && _gaq.push(["_trackPageview", "/" + a.location.hash]))
        },
        j = function(a) {
            try {
                var b = g.contentWindow.document;
                b.open(), b.write("<html><body>" + a + "</body></html>"), b.close(), f = a
            } catch (c) {
                setTimeout(function() {
                    j(a)
                }, 10)
            }
        },
        k = function() {
            try {
                g.contentWindow.document
            } catch (a) {
                setTimeout(k, 10);
                return
            }
            j(f);
            var b = f;
            setInterval(function() {
                var a, c;
                try {
                    a = g.contentWindow.document.body.innerText, a != b ? (b = a, d.hash = f = a, e(a, !0)) : (c = h(), c != f && j(c))
                } catch (i) {}
            }, 50)
        };
    return {
        getHash: h,
        init: function(d, j) {
            e || (e = d, f = h(), d(f, !0), a.ActiveXObject ? !b || b < 8 ? (g = j, k()) : a.attachEvent("onhashchange", i) : (c.navigationMode && (c.navigationMode = "compatible"), setInterval(i, 50)))
        },
        go: function(a) {
            if (a != f) {
                if (top !== self && (typeof cfg != "object" || cfg.defaultCity != "jelgava")) {
                    top.location.replace(self.location.href.split("#")[0] + "#" + a);
                    return
                }
                g ? j(a) : (d.hash = f = a, e(a, !1))
            }
        }
    }
}();
if (typeof module !== "undefined" && module.exports) {
    var fs = require("fs"),
        ti = require(fs.existsSync(__dirname + "/ti.js") ? __dirname + "/ti.js" : "../JS/ti.js");
    module.exports = ti
}
var pikasRoute = ti.pikasRoute = function(a, b) {
    a.mode == "vintra" && typeof cfg != "undefined" && (cfg.defaultCity = "vilnius"), a = a || {
        origin: "3540",
        destination: "54.68561;25.28670",
        departure_time: "1355295600",
        walk_max: "1000"
    };
    var c = ti.parseParams(a);
    c.callback = function(a) {
        var c = "";
        a.search_duration && (c += "Search took " + a.search_duration + "ms<br /><br />"), c += "Optimal routes:";
        var d = a.results || [];
        for (var e = 0; e < d.length; e++) {
            var f = d[e],
                g = d[e].legs;
            c += ["<br /><b>Option", e + 1, "</b> travel time " + ti.printTime(f.travel_time)].join("&nbsp;"), f.distance && (c += ", distance " + Math.round(f.distance) / 1e3 + " km"), typeof f.cost == "number" && (c += ", cost " + f.cost + "&euro;"), c += "<br />";
            for (var h = 0; h < g.length; h++) {
                var i = g[h];
                c += [i.start_stop.name, ti.printTime(i.start_time), ti.printTime(i.finish_time), i.finish_stop.name, " "].join(" "), i.route ? c += [ti.gtfs_vehicle_name[i.route.transport] || i.route.transport, i.route.num, i.route.name, i.weekdays, i.cost + " Euro", "<br />"].join(" ") : c += "walk<br />"
            }
        }
        b === "JSON" || b === "json" ? document.body.innerHTML = JSON.stringify(ti.ToGoogleFormat(a), null, 4) : typeof b === "string" ? document.body.innerHTML = c : typeof b === "function" ? (d = ti.ToGoogleFormat(a), d.text = c, d.version = "2017-09-17", b(d)) : window.JSClassObject.receiveResult(JSON.stringify(ti.ToGoogleFormat(a), null, 4))
    }, ti.findTrips(c)
};
ti.findTrips = function(args) {
    ti.args = args, ti.distances = ti.distances || {}, ti.walking_responses = ti.walking_responses || [];
    if (args && args.callback) {
        if (args.status && args.status != "OK") {
            args.callback(args);
            return
        }
        if (args.distances_missing) return;
        ti.timeout_for_finding_distances && (clearTimeout(ti.timeout_for_finding_distances), ti.timeout_for_finding_distances = null);
        if (!args.stops_processed && args.mode === "vintra") {
            args.stops_processed = !0, args.distances_missing = 0;
            var walk_max_km2 = (args.walk_max || 500) / 1e3;
            walk_max_km2 = walk_max_km2 * walk_max_km2;
            var walk_min_km2 = (args.walk_min || 10) / 1e3;
            walk_min_km2 = walk_min_km2 * walk_min_km2;
            var start_point = null;
            for (var k = 1; k <= 2; ++k) {
                var latlng;
                if (k == 1 && args.start_stops && args.start_stops.indexOf(";") > 0) latlng = args.start_stops.split(";");
                else if (k == 2 && args.finish_stops && args.finish_stops.indexOf(";") > 0) latlng = args.finish_stops.split(";");
                else continue;
                var lat = parseFloat(latlng[0]).toFixed(5),
                    lng = parseFloat(latlng[1]).toFixed(5);
                latlng = lat + ";" + lng, args[k == 1 ? "start_stops" : "finish_stops"] = latlng, k == 1 && (start_point = {
                    id: "start_point;" + latlng,
                    lat: lat,
                    lng: lng
                });
                var stops = ti.stops,
                    nearest_stops = [];
                for (var stop_id in stops) {
                    var stop = stops[stop_id];
                    if (!stop.lat || !stop.lng || stop.id == "gps") continue;
                    var dx = (lng - stop.lng) * 58.1,
                        dy = (lat - stop.lat) * 111.2,
                        distance = dx * dx + dy * dy;
                    if (distance > walk_min_km2) distance <= walk_max_km2 && nearest_stops.push([distance, stop]);
                    else {
                        nearest_stops = [];
                        break
                    }
                }
                if (k == 2 && start_point) {
                    var dx = (lng - start_point.lng) * 58.1,
                        dy = (lat - start_point.lat) * 111.2,
                        distance = dx * dx + dy * dy;
                    distance <= walk_max_km2 && nearest_stops.push([-999, start_point])
                }
                nearest_stops.sort(function(a, b) {
                    return a[0] - b[0]
                });
                for (var i = 0; i < 10; i++) {
                    if (i >= nearest_stops.length) break;
                    var stop = nearest_stops[i][1];
                    shape_name = ["distance", lat, lng, stop.id].join(";"), shape_name.indexOf(";start_point;") >= 0 && (args.walking_shape_name = shape_name);
                    if (ti.distances[shape_name]) continue;
                    args.walking_shape_name != shape_name && args.distances_missing++;
                    var url = cfg.walk_path_url;
                    if (url) {
                        var p1 = ti.LatLngToEN(lat, lng),
                            p2 = ti.LatLngToEN(stop.lat, stop.lng);
                        url = url.replace("$x1", p1[0]), url = url.replace("$y1", p1[1]), url = url.replace("$x2", p2[0]), url = url.replace("$y2", p2[1]), url.replace("esriNAOutputLineTrueShape", "esriNAOutputLineNone")
                    }
                    var handler = function() {
                        var curr_shape_name = shape_name,
                            curr_url = url,
                            curr_time = +(new Date);
                        return function(lines) {
                            shape_name.indexOf(";start_point;") < 0 && args.distances_missing--;
                            if (lines.indexOf("DOCTYPE") < 0) {
                                !ti.timeout_for_finding_distances && ti.print_log == "function" && ti.print_log("WARNING: late response in " + (+(new Date) - curr_time) + "ms from " + curr_url);
                                try {
                                    var w;
                                    JSON ? w = JSON.parse(lines) : w = eval("(function(){return " + lines + ";})()"), w = w.routes || {}, w = (w.features || [])[0] || {}, w = (w.attributes || {}).Total_Meters, typeof w == "number" && w && (ti.distances[curr_shape_name] = w / 1e3)
                                } catch (error) {
                                    typeof ti.print_log == "function" && (ti.print_log("WARNING: invalid JSON data from walking path service: " + error), ti.print_log("JSON data: " + ti.shapes[shape_name]), ti.shapes[curr_shape_name] = !1)
                                }
                                args.distances_missing <= 0 && ti.timeout_for_finding_distances && (args.distances_missing = 0, ti.findTrips(args))
                            } else ti.print_log == "function" && ti.print_log("WARNING: response from walking path service for requested shape " + curr_shape_name + " is not JSON data:\n" + lines)
                        }
                    }();
                    url && ti.fDownloadUrl("get", url, handler)
                }
            }
            if (args.distances_missing) {
                ti.timeout_for_finding_distances = setTimeout(function() {
                    args.distances_missing = 0, ti.findTrips(args)
                }, cfg.timeout_for_geometry || 1e3);
                return
            }
        }
        args.optimization ? args.optimization = args.optimization.toString() : args.optimization = "", args.no_just_walking = !1, args.reverseOriginal = args.reverse;
        if (!args.attempt) {
            if (typeof pg === "object") {
                if (pg.optimalSearchRunning) return;
                pg.optimalSearchRunning = !0
            }
            args.timeStarted = +(new Date), ti.timeStarted = +(new Date), args.attempt = 1, args.curr_time = args.start_time, args.direct_routes = [], args.results0 = [];
            var d = args.date;
            d || (d = new Date, d = new Date(d.getFullYear(), d.getMonth(), d.getDate()), args.date = d), args.transport || (args.transport = {}), args.transportOriginal = ti.cloneObject(args.transport), typeof args.reverse == "undefined" && (args.reverse = 1, args.reverseOriginal = args.reverse);
            if (typeof cfg === "object" && cfg.defaultCity === "intercity") args.transport.internationalbus = !1;
            else if (typeof cfg === "object" && cfg.defaultCity === "latvia") args.transport.internationalbus = !1;
            else if (args.transport.bus || args.transport.trol || args.transport.tram) args.transport.regionalbus && (args.transport.regionalbus = !1, args.attempt = -1), args.transport.commercialbus && (args.transport.commercialbus = !1, args.attempt = -1), args.transport.intercitybus && (args.transport.intercitybus = !1, args.attempt = -1), args.transport.train && (args.transport.train = !1, args.attempt = -1);
            dijkstra(args, args.start_time, args.reverse);
            return
        }
        if (args.attempt == -1) {
            args.attempt = 1;
            if (args.results.length <= 0) {
                args.transport = args.transportOriginal, dijkstra(args, args.start_time, args.reverse);
                return
            }
        }
        if (args.attempt == 1 && args.results.length <= 0)
            if (typeof cfg !== "object" || cfg.defaultCity !== "intercity")
                if (args.mode != "vintra") {
                    args.attempt = 2, args.reverse = -args.reverse, args.sort = "no sort", dijkstra(args, args.reverse == 1 ? 0 : 4320, args.reverse);
                    return
                }
        if (args.attempt == 2 && args.results.length > 0) {
            args.attempt = 999, args.reverse = -args.reverse;
            var time = null;
            for (var i = 0; i < args.results.length; i++) args.reverse == 1 && (time === null || time < args.results[i].start_time) && (time = args.results[i].start_time), args.reverse == -1 && (time === null || time > args.results[i].finish_time) && (time = args.results[i].finish_time);
            dijkstra(args, time, args.reverse);
            return
        }
        if (args.attempt == 1) {
            var time = null;
            for (var i = 0; i < args.results.length; i++) {
                if (args.results[i].code == "W") continue;
                args.reverse == 1 && (time === null || time > args.results[i].finish_time) && (time = args.results[i].finish_time), args.reverse == -1 && (time === null || time < args.results[i].start_time) && (time = args.results[i].start_time)
            }
            args.results0 = ti.filterSearchResults(args.results, args.reverse), args.callback1 && (args.results = args.results0.slice(0, 1), args.results = ti.finalizeSearchResults(args), args.callback1(args)), args.attempt = 6, args.no_just_walking = !0;
            if (time === null) args.results = [];
            else {
                dijkstra(args, time, -args.reverse, args.start_time);
                return
            }
        }
        var no_later_trips = args.optimization && args.optimization.indexOf("2") < 0;
        if (!1 && args.attempt >= 3 && args.attempt <= 5) {
            args.results.push.apply(args.results, args.results0), args.results = ti.filterSearchResults(args.results, args.reverse);
            if (args.results.length > 0)
                if (!0 || args.results.length == 1 || args.results0.length >= args.results.length)
                    if (args.results[0].legs.length != 1 || args.results[0].legs[0].route)
                        if (!no_later_trips) {
                            args.attempt = 6, args.results0 = args.results, args.no_just_walking = !0, dijkstra(args, args.reverse == 1 ? args.results[0].start_time + 1 : args.results[0].finish_time - 1, args.reverse);
                            return
                        }
        }
        if (!no_later_trips && args.attempt < 999)
            if (+(new Date) - args.timeStarted <= 6e3 || args.curr_reverse == args.reverse || args.start_time == 1)
                if (args.attempt >= 6 && (args.curr_reverse != args.reverse || args.results.length > 0 && (cfg.defaultCity === "intercity" || args.attempt < 11 || args.start_time == 1) && (args.reverse == 1 ? args.results[0].start_time < 1800 : args.results[0].finish_time > 0))) {
                    var start_time = null,
                        finish_time = null;
                    for (var i = 0; i < args.results.length; i++)
                        if (args.curr_reverse == 1) {
                            if (start_time === null || start_time > args.results[i].start_time) start_time = args.results[i].start_time;
                            if (finish_time === null || finish_time > args.results[i].finish_time) finish_time = args.results[i].finish_time
                        } else {
                            if (start_time === null || start_time < args.results[i].start_time) start_time = args.results[i].start_time;
                            if (finish_time === null || finish_time < args.results[i].finish_time) finish_time = args.results[i].finish_time
                        }
                    args.curr_reverse *= -1, ++args.attempt, args.results0.push.apply(args.results0, args.results), args.no_just_walking = !0, args.curr_reverse == args.reverse ? (args.curr_reverse == 1 ? (time = start_time !== null && start_time > args.curr_time ? start_time : args.curr_time, ++time) : (time = finish_time !== null && finish_time < args.curr_time ? finish_time : args.curr_time, --time), args.curr_time = time, dijkstra(args, time, args.curr_reverse)) : (args.curr_reverse == -1 ? (time = finish_time, args.curr_time < start_time && start_time !== null && (args.curr_time = start_time)) : (time = start_time, args.curr_time > finish_time && finish_time !== null && (args.curr_time = finish_time)), dijkstra(args, time, args.curr_reverse, args.curr_time - 0 * args.reverse));
                    return
                }
        args.attempt >= 6 && args.results.push.apply(args.results, args.results0), args.results = ti.filterSearchResults(args.results, args.reverse, args.start_time == 1), args.results_max > 0 && args.results.length > args.results_max && (args.results.length = args.results_max), args.search_duration = +(new Date) - args.timeStarted;
        if (args.shapes_url || ti.SERVER === !0) {
            ti.timeout_for_search_results = setTimeout(ti.returnSearchResults, cfg.timeout_for_geometry || 1e3), ti.applyShapes(!0);
            return
        }
        if (typeof cfg == "object" && cfg.defaultCity === "disable_temporary_latvia" && args.attempt <= 999) {
            typeof pg === "object" && (pg.optimalSearchRunning = !1, ($("online_results") || {}).innerHTML = ""), args.attempt = 1e3;
            var start_finish_stops = {};
            args.online_results = [], args.online_results_required_count = 0;
            for (var i = 0; i < args.results.length; i++) {
                var result = args.results[i],
                    legs = result.legs;
                for (var j = 0; j < legs.length; j++) {
                    var leg = legs[j];
                    if (leg.route) {
                        var start_stop = leg.start_stop && ti.fGetStopDetails(leg.start_stop.id),
                            finish_stop = leg.finish_stop && ti.fGetStopDetails(leg.finish_stop.id);
                        start_stop && start_stop.info && finish_stop && finish_stop.info && !start_finish_stops[start_stop.info + ";separator;" + finish_stop.info] && (start_finish_stops[start_stop.info + ";separator;" + finish_stop.info] = [start_stop.info, finish_stop.info], ++args.online_results_required_count)
                    }
                }
            }
            for (var i in start_finish_stops) {
                var start_stop = start_finish_stops[i][0],
                    finish_stop = start_finish_stops[i][1],
                    key = "timetable" + args.date.yyyymmdd() + start_stop + finish_stop;
                key += "7xk$n1Lp1*9E!3", key = SHA1(key);
                var query_url = "/api/ltc.php?action=timetable";
                query_url += "&date=" + args.date.yyyymmdd(), query_url += "&from=" + start_stop, query_url += "&to=" + finish_stop, query_url += "&signature=" + key, ti.SERVER === !0 ? typeof http != "undefined" && http.get({
                    host: "bezrindas.lv",
                    port: 80,
                    path: query_url
                }, function(a) {
                    a.setEncoding("utf8");
                    var b = "";
                    a.on("data", function(a) {
                        b += a
                    }), a.on("end", function() {
                        if (b) {
                            var a = JSON.parse(b);
                            a.contents && (a = a.contents), a && a.length && args.online_results.push.apply(args.online_results, [].concat(a)), --args.online_results_required_count == 0 && ti.findTrips(args)
                        }
                    })
                }) : (query_url = "http://bezrindas.lv" + query_url, args.online_query_url = query_url, query_url = "http://www.stops.lt/latviatest/proxy.php?url=" + encodeURIComponent(query_url), ($("online_results") || {}).innerHTML = "<br/>Waiting data from bezrindas.lv for stops pairs: " + args.online_results_required_count, ti.fDownloadUrl("get", query_url, function(a) {
                    if (a) {
                        args.online_results_JSON = a;
                        var b = JSON.parse(a);
                        b.contents && (b = b.contents), b && b.length && args.online_results.push.apply(args.online_results, [].concat(b)), ($("online_results") || {}).innerHTML = "<br/>Waiting data from bezrindas.lv for stops pairs: " + (args.online_results_required_count - 1), --args.online_results_required_count == 0 && ti.findTrips(args)
                    }
                }, !0))
            }
            if (args.online_results_required_count > 0) return
        }
        ti.args = args, ti.returnSearchResults()
    }
}, ti.returnSearchResults = function() {
    ti.timeout_for_search_results && (clearTimeout(ti.timeout_for_search_results), ti.timeout_for_search_results = null);
    var a = ti.args;
    a.results = ti.finalizeSearchResults(a, a.online_results), a.transport = a.transportOriginal, typeof pg === "object" && (pg.optimalSearchRunning = !1);
    if (a.callback) a.callback(a, !0);
    else {
        if (typeof pg === "object") return a;
        if (typeof window == "object") document.body.innerHTML = JSON.stringify(a.results);
        else return a
    }
}, ti.applyShapes = function(bDownloadShapes) {
    if (ti.args && ti.args.results && ti.args.results.length) {
        var shapes_missing = 0,
            shape_name;
        if (bDownloadShapes)
            for (shape_name in ti.shapes) ti.shapes[shape_name] === !1 && (ti.shapes[shape_name] = "");
        for (var i = 0; i < ti.args.results.length; i++) {
            var legs = ti.args.results[i].legs;
            for (var j = 0; j < legs.length; j++) {
                var leg = legs[j];
                if (leg.shape) continue;
                var shape_name, lat1, lng1, lat2, lng2;
                if (leg.route) {
                    var route = ti.fGetRoutes(leg.route);
                    shape_name = route.shape_id || ti.toAscii([route.city, route.transport == "eventbus" ? "bus" : route.transport, route.num, route.dirType].join("_"), !0)
                } else lat1 = leg.start_stop.lat, lng1 = leg.start_stop.lng, lat2 = leg.finish_stop.lat, lng2 = leg.finish_stop.lng, shape_name = ["walk", lat1, lng1, lat2, lng2].join(";");
                if (ti.shapes[shape_name]) {
                    leg.shape = ti.shapes[shape_name];
                    if (leg.route) leg.shape = ti.splitShape(leg.shape, leg.start_stop.lat, leg.start_stop.lng, leg.finish_stop.lat, leg.finish_stop.lng);
                    else try {
                        var w;
                        JSON ? w = JSON.parse(ti.shapes[shape_name]) : w = eval("(function(){return " + ti.shapes[shape_name] + ";})()"), w = w.routes || {}, w = (w.features || [])[0] || {}, leg.distance = (w.attributes || {}).Total_Meters, w = (w.geometry || {}).paths || [
                            []
                        ], w = w[0], leg.shape = w
                    } catch (error) {
                        typeof ti.print_log == "function" && (ti.print_log("WARNING: invalid JSON data from walking path service: " + error), ti.print_log("JSON data: " + ti.shapes[shape_name]), ti.shapes[shape_name] = !1)
                    }
                } else if (ti.shapes[shape_name] === !1) ++shapes_missing;
                else if (bDownloadShapes) {
                    ti.shapes[shape_name] = !1, ++shapes_missing;
                    var url = cfg.walk_path_url;
                    if (leg.route) url = ti.args.shapes_url + shape_name + ".txt";
                    else if (url) {
                        var p1 = ti.LatLngToEN(lat1, lng1),
                            p2 = ti.LatLngToEN(lat2, lng2);
                        url = url.replace("$x1", p1[0]), url = url.replace("$y1", p1[1]), url = url.replace("$x2", p2[0]), url = url.replace("$y2", p2[1])
                    }
                    var handler = function() {
                        var a = shape_name,
                            b = url,
                            c = +(new Date);
                        return function(d) {
                            d.indexOf("DOCTYPE") < 0 ? (ti.shapes[a] = d, ti.applyShapes(), !ti.timeout_for_search_results && ti.print_log == "function" && ti.print_log("WARNING: late response in " + (+(new Date) - c) + "ms from " + b)) : ti.print_log == "function" && ti.print_log("WARNING: response from walking path service for requested shape " + a + " is not JSON data:\n" + d)
                        }
                    }();
                    leg.route ? ti.fDownloadUrl("get", ti.args.shapes_url + shape_name + ".txt", handler) : url && ti.fDownloadUrl("get", url, handler)
                }
            }
        }
        shapes_missing == 0 && ti.returnSearchResults()
    }
};

function dijkstra(a, b, c, d) {
    var e = (new Date).getFullYear();
    typeof cfg == "object" && cfg.defaultLanguage == "lt" && (ti.specialWeekdays[ti.dateToDays(new Date(e, 0, 1))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(2018, 3, 2))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 1, 16))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 2, 11))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 4, 1))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 5, 24))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 6, 6))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 7, 15))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 10, 1))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 11, 24))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 11, 25))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 11, 26))] = 7), typeof cfg == "object" && cfg.defaultLanguage == "ee" && (ti.specialWeekdays[ti.dateToDays(new Date(e, 0, 1))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 1, 24))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(2016, 2, 25))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(2016, 2, 27))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 4, 1))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 5, 23))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 5, 24))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 7, 20))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 11, 24))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 11, 25))] = 7, ti.specialWeekdays[ti.dateToDays(new Date(e, 11, 26))] = 7);
    var f = "",
        g = "autobusuData",
        h = a.mode === "vintra";
    typeof cfg == "object" && cfg.defaultCity == "latvia" && (f = ";bus;trol;tram;minibus;", g = "nothing");
    var i = !1,
        j = c == -1 ? a.finish_stops.split(",") : a.start_stops.split(","),
        k = c == -1 ? a.start_stops.split(",") : a.finish_stops.split(","),
        l = a.finish_stops === "0;0";
    c || (i = !0, c = 1, a.direct_routes = []), a.results = [], a.curr_reverse = c, b = typeof b != "undefined" ? b * c : 0, d = typeof d != "undefined" ? d * c : 7200;
    var m = b,
        n = c == 1 ? "1" : "2",
        o = c == 1 ? "2" : "1",
        p = a.route_nums ? "," + a.route_nums.toLowerCase().replace(/\s/g, "") + "," : "",
        q = a.lowFloor;
    p.indexOf(",z,") >= 0 && (q = !0, p = p.replace(/,z,/g, "")), a.date || (a.date = new Date);
    var r = ti.dateToDays(a.date),
        s = "" + (a.date.getDay() || 7),
        t = "" + (ti.specialWeekdays[r] || ""),
        u = t == "7";
    t || (t = s);
    var v = a.max_changes || Number.POSITIVE_INFINITY,
        w = a.change_time || 3;
    if (h || cfg.defaultCity == "xxxintercity") w = 0;
    var x = a.walk_speed_kmh || 4,
        y = a.walk_max || 500;
    y > 0 && (y = i ? .05 : y / 1e3, y = y * y);
    var z = (a.walk_min || 10) / 1e3;
    z = z * z;
    var A = ti.stops,
        B = ti.routes,
        C = ti.specialDates,
        D = a.direct_routes || [],
        E = a.transport,
        F = a.operators,
        G = a.removed_trips ? "," + a.removed_trips.replace(/\s/g, "") + "," : "",
        H = a.added_trips ? "," + a.added_trips.replace(/\s/g, "") + "," : "",
        I = a.commercial,
        J = a.routetypes,
        K = J != 1,
        L = a.area,
        M = 0,
        N = a.middle_stops;
    if (N) {
        M = 10;
        for (var O in N) {
            var P = A[O].routes;
            for (var Q = 0; Q < P.length; Q += 2) B[P[Q]].available = 10
        }
    }
    var R, S, T = {},
        U = {},
        V = {};
    for (var W = 1, X = j; W <= 2; ++W) {
        for (var Q = X.length; --Q >= 0;)
            if (X[Q].charAt(0) == g) {
                var Y = A[X[Q]];
                if (Y)
                    for (var Z = Y.neighbours.length; --Z >= 0;) X.push(Y.neighbours[Z]);
                X[Q] = "removed stop"
            } else if (X[Q].indexOf(";") > 0) {
                var $ = X[Q].split(";"),
                    _ = parseFloat($[0]),
                    ba = parseFloat($[1]);
                if (_ > 1e3 || ba > 1e3) {
                    var bb = ti.ENtoLatLng(_, ba);
                    _ = bb[0], ba = bb[1]
                }
                W == 1 ? R = {
                    id: X[Q],
                    lat: _,
                    lng: ba,
                    neighbours: []
                } : (S = {
                    id: X[Q],
                    lat: _,
                    lng: ba
                }, U[S.id] = !0, R && (V[R.id] = !0))
            }
        X = k
    }
    var bc = [],
        bd = {};
    bd[m] = [];
    for (var O in A) {
        var Y = A[O];
        Y.time = Number.POSITIVE_INFINITY, Y.trip_date = null, l && (Y.rideStart = Y.rideEnd = 0);
        if (!Y.lat || !Y.lng) continue;
        if (R) {
            var be = (R.lng - Y.lng) * 58.1,
                bf = (R.lat - Y.lat) * 111.2,
                bg = be * be + bf * bf;
            if (bg > z || Y.id == "gps") {
                if (bg <= y && Y.id != "gps") {
                    var bh = ["distance", R.lat, R.lng, Y.id].join(";");
                    bg = ti.distances[bh], bg ? bg *= bg : h && bg !== 0 && (bg = y + 1), (!bg || bg <= y) && R.neighbours.push(Y.id), typeof cfg == "object" && cfg.defaultCity == "latvia" && Y.city && Y.city.toLowerCase().indexOf("latvija") < 0 && (E.internationalbus = !0), typeof cfg == "object" && cfg.defaultCity == "intercity" && Y.city != "LT" && (E.internationalbus = !0)
                }
            } else j.push(Y.id), R.remove = !0
        }
        if (S) {
            var be = (S.lng - Y.lng) * 58.1,
                bf = (S.lat - Y.lat) * 111.2,
                bg = be * be + bf * bf;
            bg <= z && Y.id != "gps" && (k.push(Y.id), S.remove = !0);
            if (bg <= y && Y.id != "gps") {
                var bh = ["distance", S.lat, S.lng, Y.id].join(";");
                bg = ti.distances[bh], bg ? bg *= bg : h && bg !== 0 && (bg = y + 1);
                if (!bg || bg <= y) {
                    V[Y.id] = !0;
                    var bi = Y.neighbours;
                    for (var Z = bi.length; --Z >= 0;) Y.name === (A[bi[Z]] || {}).name && (V[bi[Z]] = !0)
                }
                typeof cfg == "object" && cfg.defaultCity == "latvia" && Y.city && Y.city.toLowerCase().indexOf("latvija") < 0 && (E.internationalbus = !0), typeof cfg == "object" && cfg.defaultCity == "intercity" && Y.city != "LT" && (E.internationalbus = !0)
            }
        }
    }
    for (var Z = j.length; --Z >= -1;) {
        var Y = Z >= 0 ? A[j[Z]] : R;
        if (Y) {
            if (Z == -1 && R.remove) {
                R = null;
                break
            }
            Y.prev_stop = !1, Y.route = null, Y.changes = 0, Y.visited_stops = 0, T[Y.id] = !0, Z == -1 && c == -1 && w ? (m -= w, bd[m] = [R]) : bd[m].push(Y), Y.time = m, typeof cfg == "object" && cfg.defaultCity == "latvia" && Y.city && Y.city.toLowerCase().indexOf("latvija") < 0 && (E.internationalbus = !0), typeof cfg == "object" && cfg.defaultCity == "intercity" && Y.city != "LT" && (E.internationalbus = !0)
        }
    }
    for (var Z = k.length; --Z >= 0;) {
        if (Z == -1 && S.remove) {
            U[S.id] = !1, S = null, V = {};
            break
        }
        var O = k[Z],
            Y = A[O];
        Y && (U[O] = !0, typeof cfg == "object" && cfg.defaultCity == "latvia" && Y.city && Y.city.toLowerCase().indexOf("latvija") < 0 && (E.internationalbus = !0), typeof cfg == "object" && cfg.defaultCity == "intercity" && Y.city != "LT" && (E.internationalbus = !0))
    }
    if (!0 || i)
        for (var bj = B.length; --bj >= 0;) {
            var bk = ti.fGetRoutes(bj),
                bl = B[bj];
            bl.weekdays = bk.weekdays, bl.available = E && E[bk.transport] === !1 || M && M !== bl.available || p && p.indexOf("," + bk.num.toLowerCase() + ",") < 0 || I && I != bk.commercial || J && K != !_transport_data[bk.transport].region || L && L != bk.cities[0] ? 0 : 1
        }
    for (var Z = D.length; --Z >= 0;) D[Z].available = 0;
    for (var bj in B) {
        var bl = B[bj];
        bl.trip_start_time = Number.POSITIVE_INFINITY
    }
    a.finish_stops || (k = !1);
    var bm = +(new Date),
        bn, bo = 0,
        bp = function() {
            for (var b = 0;;) {
                for (var e; !(e = bd[m]) || !e.length;)
                    if (++m > d) {
                        if (!bc.length) {
                            a.results = [];
                            if (i) return [];
                            a.callback2 ? window.setTimeout(a.callback2, 10) : typeof window === "object" ? window.setTimeout(function() {
                                ti.findTrips(a)
                            }, 10) : ti.findTrips(a);
                            return
                        }
                        e = !1;
                        break
                    }
                if (!e) break;
                e = e.pop();
                if (e.time < m || e.changes < 0) continue;
                if (++b == 3e3 && !i && typeof window == "object") {
                    +(new Date) - bm > 3e4 ? (a.results = [], window.setTimeout(function() {
                        ti.findTrips(a)
                    }, 10)) : window.setTimeout(bp, 100);
                    return
                }
                if (U[e.id]) {
                    d > m + 60 && (d = m + 60);
                    continue
                }
                var g = e.changes || 0,
                    j = e.visited_stops || 0,
                    p = null,
                    z = null;
                if (!i && y > 0 && (g > 0 || !a.no_start_walking)) {
                    var C = e;
                    while (!C.route && C.prev_stop) C = C.prev_stop;
                    var D = C.lat,
                        E = C.lng,
                        I = e.neighbours;
                    for (var J = I.length; --J >= -1;) {
                        if (typeof cfg === "object" && cfg.defaultCity === "kaunas") {
                            if (({
                                    549: !0,
                                    548: !0,
                                    547: !0,
                                    546: !0,
                                    545: !0,
                                    708: !0,
                                    709: !0,
                                    805: !0,
                                    786: !0,
                                    787: !0,
                                    "787a": !0,
                                    397: !0,
                                    398: !0,
                                    403: !0,
                                    404: !0,
                                    405: !0,
                                    641: !0
                                })[e.id] && ({
                                    20: !0,
                                    21: !0,
                                    22: !0,
                                    23: !0,
                                    24: !0,
                                    25: !0,
                                    26: !0,
                                    27: !0,
                                    196: !0,
                                    195: !0,
                                    664: !0,
                                    201: !0,
                                    202: !0,
                                    203: !0,
                                    204: !0,
                                    207: !0,
                                    208: !0,
                                    209: !0,
                                    210: !0
                                })[I[J]]) continue;
                            if (({
                                    549: !0,
                                    548: !0,
                                    547: !0,
                                    546: !0,
                                    545: !0,
                                    708: !0,
                                    709: !0,
                                    805: !0,
                                    786: !0,
                                    787: !0,
                                    "787a": !0,
                                    397: !0,
                                    398: !0,
                                    403: !0,
                                    404: !0,
                                    405: !0,
                                    641: !0
                                })[I[J]] && ({
                                    20: !0,
                                    21: !0,
                                    22: !0,
                                    23: !0,
                                    24: !0,
                                    25: !0,
                                    26: !0,
                                    27: !0,
                                    196: !0,
                                    195: !0,
                                    664: !0,
                                    201: !0,
                                    202: !0,
                                    203: !0,
                                    204: !0,
                                    207: !0,
                                    208: !0,
                                    209: !0,
                                    210: !0
                                })[e.id]) continue
                        }
                        if (typeof cfg === "object" && cfg.defaultCity.indexOf("viln") == 0) {
                            if (({
                                    2367: !0,
                                    2366: !0,
                                    "0906": !0,
                                    "0905": !0,
                                    "0904": !0,
                                    "0903": !0,
                                    "0902": !0,
                                    "0901": !0,
                                    2309: !0,
                                    2308: !0,
                                    2310: !0,
                                    2311: !0,
                                    2316: !0,
                                    2317: !0
                                })[e.id] && ({
                                    2368: !0,
                                    2369: !0,
                                    1103: !0,
                                    1104: !0,
                                    1107: !0,
                                    1110: !0,
                                    1113: !0,
                                    1114: !0,
                                    1115: !0,
                                    1116: !0,
                                    2314: !0,
                                    2315: !0,
                                    2318: !0,
                                    2319: !0,
                                    2320: !0
                                })[I[J]]) continue;
                            if (({
                                    2367: !0,
                                    2366: !0,
                                    "0906": !0,
                                    "0905": !0,
                                    "0904": !0,
                                    "0903": !0,
                                    "0902": !0,
                                    "0901": !0,
                                    2309: !0,
                                    2308: !0,
                                    2310: !0,
                                    2311: !0,
                                    2316: !0,
                                    2317: !0
                                })[I[J]] && ({
                                    2368: !0,
                                    2369: !0,
                                    1103: !0,
                                    1104: !0,
                                    1107: !0,
                                    1110: !0,
                                    1113: !0,
                                    1114: !0,
                                    1115: !0,
                                    1116: !0,
                                    2314: !0,
                                    2315: !0,
                                    2318: !0,
                                    2319: !0,
                                    2320: !0
                                })[e.id]) continue
                        }
                        var K;
                        if (J < 0)
                            if (V[e.id]) K = S;
                            else break;
                        else K = A[I[J]] || {
                            lat: 999,
                            lng: 999
                        };
                        var L = (E - K.lng) * 58.1,
                            M = (D - K.lat) * 111.2,
                            O = e.distances && e.distances[J];
                        !1 && O ? O = O * O / 1e6 : O = L * L + M * M;
                        if (K === C || K === e) continue;
                        if (K === S) {
                            if (C === R && K.id.indexOf(";") > 0) {
                                if (h) {
                                    O = ti.distances[a.walking_shape_name];
                                    if (O) O *= O;
                                    else continue
                                }
                                if (O > y) continue
                            }
                        } else if (O > y && (!e.name || K.name !== e.name)) continue;
                        O = Math.sqrt(O);
                        var P = Math.round(O / x * 60);
                        P += C.time;
                        var Q = P;
                        if (!C.route || !C.prev_stop && c < 0) P += w;
                        P < m && (P = Q = m);
                        if (P > d) continue;
                        if (U[K.id])
                            if (!1 && g === 1 && C.prev_stop && typeof cfg === "object" && cfg.defaultCity === "latvia") e = C.prev_stop, p = C.id, z = C.prev_stop_start_time;
                            else {
                                if (P > K.time) continue;
                                if (P == K.time && g >= K.changes) continue;
                                var W = {
                                    legs: [{
                                        start_stop: C,
                                        start_time: c * (C.time - (C.route ? w : 0)),
                                        finish_stop: K,
                                        finish_time: c * (P - w),
                                        route: null
                                    }]
                                };
                                bc.push(W)
                            }
                        else {
                            if (P > K.time) continue;
                            if (P != K.time || g < K.changes) K.route = !1, K.prev_stop = C, K.prev_stop_start_time = C.time - (C.route ? w : 0);
                            else continue
                        }
                        l && (typeof cfg != "object" || cfg.defaultCity != "vilnius" ? (K.rideStart = C.rideStart, K.rideEnd = Q) : C.route && (K.rideStart = C.rideStart, K.rideEnd = C.rideEnd)), K.time = P, K.changes = g, K.visited_stops = j;
                        var X = bd[P];
                        X ? X[X.length] = K : bd[P] = [K]
                    }
                }
                g = e.changes || 0;
                if (g <= v) {
                    var Y = e.routes || [];
                    for (var J = 0, Z = Y.length; J < Z; J += 2) {
                        var $ = B[Y[J]];
                        $.num == "M-491" && (J = J + 0);
                        if (i) {
                            if ($.available === 0 && k) continue;
                            a.direct_routes.push($), J + 2 < Z && Y[J + 2] == Y[J] && (J += 2)
                        } else if (!$.available) continue;
                        if (typeof $.times === "string") {
                            var _ = ti.fGetRoutes($.id);
                            $.times = ti.explodeTimes($.times), $.city = _.city, $.transport = _.transport, $.num = _.num, $.stops = _.stops, $.platforms = _.platforms, $.entry = _.entry, $.specialDates = _.specialDates
                        }
                        var ba = $.times,
                            bb = "";
                        f && f.indexOf($.transport) < 0 ? e.city.indexOf("riga") < 0 ? e.city.indexOf("liep") < 0 ? e.city.indexOf("jelg") >= 0 && (bb = "jelg") : bb = "liep" : bb = "riga" : e.city == "LT" && $.transport == "internationalbus" && (bb = "LT");
                        var be = Y[J + 1],
                            bf = $.stops || $.raw_data.split(";").slice(ti.RT_ROUTESTOPS);
                        if (c == 1 && be >= bf.length - 1 || c == -1 && be == 0) continue;
                        var bg = $.entry;
                        if (bg && bg.charAt(be) == o) continue;
                        bf[be] == bf[be + c] && (be += c);
                        if (!ba) continue;
                        var bh = ba.workdays,
                            bi = ba.valid_from,
                            bj = ba.valid_to,
                            bk = ba.exceptions || [],
                            bl = ba.trip_operators,
                            bn = ba.trip_groups,
                            bq = ba.trip_ids,
                            br = ba.tag,
                            bs = ba.times;
                        ba = null;
                        var bt = "",
                            bu, bv = 0,
                            bw = 0,
                            bx = $.specialDates;
                        for (var by = 0, bz = bx.length; by < bx.length; by += 2)
                            if ((ti.specialDates[bx[by]] || {})[r]) {
                                (bt = bx[by + 1]) === "*" && (bt = t);
                                break
                            }
                        if (bt == "0") continue;
                        bt = t;
                        if ($.weekdays)
                            if ($.weekdays.indexOf("!") < 0) {
                                if ($.weekdays.indexOf("~") >= 0 && u) continue
                            } else {
                                if ($.weekdays.indexOf(s) < 0) continue;
                                bt = s
                            }
                        var bA = z || m;
                        if (e.route && $.num === e.route.num && $.transport === e.route.transport && $.city === e.route.city) bA -= w;
                        else if (g < 0 || a.mode != "vintra" || z) {
                            if (g > 0 && typeof cfg == "object" && cfg.defaultCity == "latvia" && !z) {
                                bA -= w;
                                var bB = $;
                                c == -1 && (bB = e.route || e.prev_stop && e.prev_stop.route), bB && (bB.transport == "internationalbus" ? bA += Math.max(w, 20) : bB.transport == "train" ? bA += Math.max(w, ({
                                    1: 10,
                                    2: 15,
                                    3: 20
                                })[bB.num.charAt(1)] || 10) : bA += Math.max(w, ({
                                    2: 5,
                                    3: 5,
                                    4: 10,
                                    5: 10,
                                    6: 10,
                                    7: 15,
                                    8: 20
                                })[bB.num.charAt(0)] || w))
                            }
                        } else {
                            var bB = $;
                            c == -1 && (bB = e.route || e.prev_stop && e.prev_stop.route);
                            if (bB) {
                                var bC = a.transport[bB.transport];
                                typeof bC == "number" && bC >= 0 && (bA += bC - w)
                            }
                        }
                        var bD = bA * c;
                        bA >= 1440 && (bv = bA - bA % 1440);
                        var bE = !1,
                            bF, bG = bF = bh.length,
                            bH = c != -1 ? -1 : bG;
                        do {
                            var bI = -1,
                                bJ = Number.POSITIVE_INFINITY,
                                bK, bL, bM, bN = null,
                                bO = !i || !N,
                                bP = c * bG,
                                bQ = +(new Date);
                            for (var bR = bH + be * bG; bF-- > 0;) {
                                bH += c, bR += c;
                                if (F) {
                                    var bS = F[bl[bH]];
                                    if (typeof bS != "string") continue;
                                    if (bS != "" && ("," + bS + ",").indexOf("," + bn[bH] + ",") < 0) continue
                                }
                                if (G && G.indexOf("," + bq[bH] + ",") >= 0) continue;
                                bK = bL = bs[bR];
                                if (bK < 0) continue;
                                if (!h) {
                                    if (bK - bD >= 1440 || bK * c - bA >= 1440) bK = bD + (bK - bD) % 1440;
                                    bK < bD == (c == 1) && bK != bD && (bK = (bA + 1440) * c - (bD - bK) % 1440)
                                }
                                bL = bK - bL, bK *= c;
                                if (!i && (bK < bA || bK >= bJ)) continue;
                                bL ? (bM = ((+s + Math.floor(bL / 1440)) % 7 || 7).toString(), bu = r + bL / 1440) : (bM = bt, bu = r);
                                var bT = (bk[bH] || {})[bu];
                                if (bT === !1) continue;
                                bT && (bK++, bK--);
                                if ((bK < bJ || i || bE) && (!t || bh[bH].indexOf(bM) >= 0 || bT || bh[bH].charAt(0) == "0" || H && H.indexOf("," + bq[bH] + ",") >= 0) && (!q || br.charAt(bH) === "1") && (!bj[bH] || bj[bH] >= bu) && bi[bH] <= bu) {
                                    if (bs[bR + bP] < 0) continue;
                                    if (bh[bH].charAt(0) == "0") {
                                        var bU = +bh[bH];
                                        if ((bu - bi[bH]) % bU) continue
                                    }
                                    bI = bR, bJ = bK, bw = bL;
                                    if (h && bK < 1440 && bL <= 0) break;
                                    if (bE || i) {
                                        if (!k) {
                                            var W = {
                                                route: ti.fGetRoutes($.id),
                                                start_time: bJ,
                                                date: bN,
                                                trip_num: bI % bG
                                            };
                                            W.route.stopId = e.id, bc.push(W), bI = -2;
                                            continue
                                        }
                                        break
                                    }
                                }
                            }
                            bo += +(new Date) - bQ;
                            if (bI < 0) {
                                if (bI != -2 && !k) {
                                    var W = {
                                        route: ti.fGetRoutes($.id),
                                        start_time: -1,
                                        trip_num: -1
                                    };
                                    W.route.stopId = e.id, bc.push(W)
                                }
                                break
                            }
                            var bV, bW = c * bs[bI % bG];
                            if (bv || bw) bN = new Date(a.date.valueOf()), bN.setDate(bN.getDate() + Math.floor(bw / 1440));
                            i || bE || p ? bV = c === -1 ? 1 : bf.length : bW < $.trip_start_time ? (bV = c == 1 ? bf.length : 1, $.trip_start_time = bW, $.pos_max = c * be) : (bV = $.pos_max, bV > c * be && bW == $.trip_start_time && ($.pos_max = c * be));
                            var bP = c * bG;
                            j = e.visited_stops || 0;
                            for (var bX = be; c * (bX += c) < bV;) {
                                bI += bP;
                                if (bg.charAt(bX) == n) continue;
                                var P;
                                if ((P = bs[bI]) >= 0) {
                                    P = c * (P + bw) + w;
                                    if (P > d && !bE) break;
                                    if (P < m && !p) continue;
                                    var K;
                                    if (!(K = A[bf[bX]])) continue;
                                    if (bb && K.city.indexOf(bb) >= 0) continue;
                                    ++j;
                                    var bY;
                                    i && !bO && (bO = K.id in N);
                                    if ((U[K.id] || K.id === p) && bO) {
                                        if (g > 0 && P > K.time) continue;
                                        if (g > 0 && P == K.time && g >= K.changes) continue;
                                        if (typeof cfg === "object" && cfg.defaultCity === "intercity" && g == 0 && !bE) {
                                            bE = !0, bF = bG, bH = c != -1 ? -1 : bG, a.direct_routes.push($);
                                            break
                                        }
                                        if (i || bE) {
                                            $.available = 0;
                                            if (e.id.indexOf(";") < 0)
                                                for (var bZ = 0; bZ < bX; ++bZ) {
                                                    if (bg.charAt(bZ) == n || bf[bZ] == bf[bZ + 1]) continue;
                                                    if (T[bf[bZ]] && bs[bI + bP * (bZ - bX)] >= 0) {
                                                        e = A[bf[bZ]], bJ = bs[bI + bP * (bZ - bX)] + bw;
                                                        break
                                                    }
                                                }
                                            for (var bZ = bV; --bZ > bX;) {
                                                if (bg.charAt(bZ) == n || bf[bZ] == bf[bZ - 1]) continue;
                                                ++j;
                                                if (U[bf[bZ]] && bs[bI + bP * (bZ - bX)] >= 0) {
                                                    K = A[bf[bZ]], P = bs[bI + bP * (bZ - bX)] + w + bw;
                                                    break
                                                }
                                            }
                                        }
                                        var W = {
                                            direct_trip: bE || i,
                                            legs: [{
                                                start_stop: e,
                                                start_time: c * bJ,
                                                time_adjusted: bw,
                                                trip_date: bN,
                                                finish_stop: K,
                                                finish_time: c * (P - w),
                                                route: $,
                                                trip_num: bI % bP,
                                                start_pos: c >= 0 ? be : bX,
                                                finish_pos: c >= 0 ? bX : be
                                            }]
                                        };
                                        bc.push(W), bX = bV;
                                        if (bE && P >= K.time) break
                                    } else {
                                        if (i || bE || p) continue;
                                        if (P >= (bY = K.time)) {
                                            if (bY < m) break;
                                            continue
                                        }
                                        if ($.available === 2) {
                                            K.time = P, K.changes = -1, K.visited_stops = j, K.trip_date = bN, K.time_adjusted = bw;
                                            continue
                                        }
                                        K.route = $, K.prev_stop = e, K.prev_stop_start_time = bJ, K.trip_num = bI % bP, K.start_pos = c >= 0 ? be : bX, K.finish_pos = c >= 0 ? bX : be
                                    }
                                    K.time = P, K.trip_date = bN, K.time_adjusted = bw, K.changes = g + 1, K.visited_stops = j, l && (typeof cfg != "object" || cfg.defaultCity != "vilnius" ? (K.rideEnd = P - w, K.id == "00105-1" && (--g, ++g), g == 0 && e.prev_stop ? K.rideStart = bJ - (e.time - e.prev_stop_start_time) : K.rideStart = e.rideStart || bJ) : (K.rideStart = g > 0 ? e.rideStart : bJ, K.rideEnd = P - w));
                                    var X = bd[P];
                                    X ? X[X.length] = K : bd[P] = [K]
                                }
                            }
                        } while (i || bE);
                        bs = null
                    }
                }
            }
            if (!k) {
                bc.sort(function(a, b) {
                    if (a.route.sortKey < b.route.sortKey) return -1;
                    if (a.route.sortKey > b.route.sortKey) return 1;
                    if (a.start_time < b.start_time) return -1;
                    if (a.start_time > b.start_time) return 1;
                    return 0
                });
                return bc
            }
            var b$ = {},
                b_ = Number.POSITIVE_INFINITY;
            for (var J = bc.length; --J >= 0;) {
                var W = bc[J],
                    ca = W.legs[0].route ? ";" + W.legs[0].route.id : "",
                    cb = W.legs[W.legs.length - 1];
                W.finish_time = cb.finish_time, W.walk_time = cb.route ? 0 : Math.abs(cb.finish_time - cb.start_time), P = W.departure_time;
                for (var cc = W.legs[0].start_stop; cc; cc = cc.prev_stop) {
                    if (!cc.prev_stop) break;
                    cb = {
                        start_stop: cc.prev_stop,
                        start_time: c * cc.prev_stop_start_time,
                        finish_stop: cc,
                        finish_time: c * (cc.time - w),
                        route: cc.route,
                        trip_num: cc.trip_num,
                        trip_date: cc.trip_date,
                        time_adjusted: cc.time_adjusted,
                        start_pos: cc.start_pos,
                        finish_pos: cc.finish_pos
                    }, cc.route ? ca = c == 1 ? ";" + cc.route.id + ca : ca + ";" + cc.route.id : (c < 0 && (!cc.prev_stop || !cc.prev_stop.prev_stop) && (cb.finish_time -= w, cb.start_time -= w), W.walk_time += Math.abs(cb.finish_time - cb.start_time)), W.legs.splice(0, 0, cb)
                }
                if (c == -1) {
                    var cd = W.legs[0];
                    if (!cd.route) {
                        var ce = W.legs[1];
                        ce && ce.route ? (cd.start_time += ce.start_time - cd.finish_time, cd.finish_time = ce.start_time) : (cd.start_time -= w, cd.finish_time -= w)
                    }
                    W.finish_time = W.legs[0].start_time, W.legs = W.legs.reverse();
                    for (var cf = -1, cg = W.legs.length; ++cf < cg;) {
                        cb = W.legs[cf];
                        var P = cb.start_time - cb.finish_time;
                        !cb.route && cf > 0 ? (cb.start_time = W.legs[cf - 1].finish_time, cb.finish_time = cb.start_time + P) : (cb.finish_time = cb.start_time, cb.start_time -= P);
                        var e = cb.finish_stop;
                        cb.finish_stop = cb.start_stop, cb.start_stop = e
                    }
                }
                var cd = W.legs[0],
                    ce = W.legs[1];
                if (!cd.route)
                    if (ce && ce.route) {
                        var bC = w;
                        if (a.mode == "vintra") {
                            bC = a.transport[ce.route.transport];
                            if (typeof bC != "number" || bC < 0) bC = w
                        }
                        cd.start_time += ce.start_time - bC - cd.finish_time, cd.finish_time = ce.start_time - bC
                    } else if (a.no_just_walking) continue;
                W.start_time = W.legs[0].start_time, W.travel_time = W.finish_time - W.start_time, ca == "" ? (ca = "W", W.code = ca, b_ = W.walk_time) : (ca += ";", W.code = ca, W.direct_trip && (ca = W.legs[0].start_time + "T" + ca));
                var ch = b$[ca];
                if (!ch || c == 1 && W.finish_time < ch.finish_time || c != 1 && W.start_time > ch.start_time) b$[ca] = W
            }
            if (i) a.results = bc;
            else {
                var ci = [];
                for (var ca in b$) {
                    var W = b$[ca],
                        cj = W.code;
                    if (W.walk_time >= b_ && ca != "W") continue;
                    for (var J = ci.length; --J >= 0;) {
                        var ck = ci[J];
                        if (ck.code.indexOf(cj) >= 0 || cj.indexOf(ck.code) >= 0)
                            if (c == 1 && ck.finish_time <= W.finish_time || c != 1 && ck.start_time >= W.start_time) {
                                if (ck.walk_time + ck.travel_time <= W.walk_time + W.travel_time && cj.length >= ck.code.length) break
                            } else !ck.direct_trip && ck.walk_time + ck.travel_time >= W.walk_time + W.travel_time && ci.splice(J, 1)
                    }(J < 0 || W.direct_trip) && ci.push(W)
                }
                for (var J = ci.length; --J >= 0;) {
                    var W = ci[J];
                    a.reverseOriginal == -1 ? W.code = W.code + "T" + W.legs[W.legs.length - 1].finish_time : W.code = W.legs[0].start_time + "T" + W.code
                }
                a.results = ci, typeof window === "object" ? window.setTimeout(function() {
                    ti.findTrips(a)
                }, 10) : ti.findTrips(a)
            }
        };
    return bp()
}
ti.filterSearchResults = function(a, b, c) {
    if (ti.args.time_window) {
        b == -1 ? a.sort(function(a, b) {
            return -(a.finish_time - b.finish_time)
        }) : a.sort(function(a, b) {
            return a.start_time - b.start_time
        });
        for (var d = a.length; --d >= 1;) {
            var e = a[d];
            if (b == -1) {
                if (ti.args.start_time - e.finish_time <= ti.args.time_window) break
            } else if (e.start_time - ti.args.start_time <= ti.args.time_window) break
        }
        a.length = d + 1
    }
    if (ti.args && ti.args.mode && ti.args.mode.indexOf("vintra") >= 0) {
        var f = .64,
            g = .93;
        for (var d = a.length; --d >= 0;) {
            var h = a[d].legs,
                i = 0,
                j = ticket_expiration_time = 0,
                k = 0;
            for (var l = 0; l <= h.length - 1; l++) {
                var m = h[l],
                    n = m.route;
                if (n) {
                    m.fares = {};
                    var o = 0,
                        p, q = "";
                    for (var r = 1;; ++r) {
                        var s = n.route_id || ti.toAscii([n.city, n.transport == "eventbus" ? "bus" : n.transport, n.num].join("_"), !0),
                            t = [s, r, m.start_stop.id, m.finish_stop.id].join("#"),
                            u = ti.fare_rules[t];
                        if (u) {
                            o = ti.fare_attributes[u].price || 0;
                            break
                        }
                        t = [s, r, "", ""].join("#"), u = ti.fare_rules[t];
                        if (!u) break;
                        var v = ti.fare_attributes[u];
                        if (v.transfer_duration)
                            if (v.transfer_duration < m.finish_time - m.start_time) {
                                if (!q)
                                    if (!p || v.transfer_duration > p) o = v.price, p = v.transfer_duration
                            } else {
                                for (var w = l; --w >= 0;) {
                                    var x = (h[w].fares || {})[u] || {
                                        transfer_duration: Number.NEGATIVE_INFINITY
                                    };
                                    if (x.transfer_duration >= m.finish_time - h[w].start_time) {
                                        i += x.price - h[w].cost, h[w].cost = x.price, o = -1, q = u, m.fares = {};
                                        break
                                    }
                                }
                                if (o < 0) {
                                    o = 0;
                                    break
                                }
                                if (!q || v.price < o) o = v.price, q = u;
                                m.fares[u] = v
                            }
                        else if (!q || v.price < o) o = v.price, q = u
                    }
                    m.cost = o, i += o
                }
                continue
            }
            if (!!0)
                if (ticket_expiration_time < k) {
                    i += f;
                    var y = 0;
                    for (var l = h.length; --l >= 0;) {
                        var m = h[l];
                        if (m.route) {
                            y == 0 && (y = m.finish_time - 30);
                            if (y > m.start_time) break
                        } else if (y > m.start_time && y > 0) {
                            y = m.start_time;
                            break
                        }
                    }
                    j + 30 >= y && (i += f - g)
                }
            a[d].cost = i
        }
    }
    if (ti.args && ti.args.optimization.indexOf("shortest") >= 0)
        for (var d = a.length; --d >= 0;) {
            var h = a[d].legs,
                z = 0;
            for (var l = 0; l < h.length; l++) {
                var m = h[l];
                if (m.route) {
                    var A = null,
                        B;
                    for (var C = m.start_pos; C <= m.finish_pos; ++C) {
                        var D = m.route.stops[C];
                        B = ti.stops[D], A && B && (z += ti.distance(A.lat, A.lng, B.lat, B.lng)), A = B
                    }
                } else {
                    var A = m.start_stop,
                        B = m.finish_stop;
                    z += ti.distance(A.lat, A.lng, B.lat, B.lng)
                }
            }
            a[d].distance = z
        } else {
        for (var d = a.length; --d >= 0;) {
            var e = a[d];
            if (e.remove) continue;
            for (l = a.length; --l >= 0;) {
                if (d === l) continue;
                a[l].code.indexOf(e.code) < 0 ? e.direct_trip && !a[l].direct_trip && e.start_time >= a[l].start_time && e.finish_time <= a[l].finish_time && (a[l].remove = !0) : a[l].walk_time < e.walk_time ? e.remove = !0 : a[l].remove = !0
            }
        }
        var E = 0;
        for (var d = a.length; --d >= 0;) {
            var e = a[d];
            if (e.remove) continue;
            for (l = a.length; --l >= 0;) {
                if (d === l) continue;
                if (a[l].remove || a[l].legs.length <= 1) continue;
                a[l].legs.length >= e.legs.length + E && (e.start_time > a[l].start_time && e.finish_time <= a[l].finish_time ? a[l].remove = !0 : e.start_time >= a[l].start_time && e.finish_time < a[l].finish_time && (a[l].remove = !0))
            }
        }
    }
    if (cfg.defaultCity == "intercity" || cfg.defaultCity == "latvia")
        for (var d = a.length; --d >= 0;) {
            var e = a[d];
            e.start_time >= 1440 && (e.remove = !0)
        }
    var F = {};
    for (var d = a.length; --d >= 0;) {
        var e = a[d];
        if (e.remove) continue;
        if (e.start_time >= 1680 || e.finish_time < 0) {
            e.remove = !0;
            continue
        }
        ti.args && ti.args.optimization.indexOf("shortest") >= 0 ? e.penalty_time = e.distance : e.penalty_time = e.travel_time + 5 * e.legs.length;
        var G = F[e.code];
        if (!G || G.penalty_time > e.penalty_time) F[e.code] = e
    }
    a = [];
    for (var H in F) a.push(F[H]);
    a.sort(function(a, b) {
        return a.penalty_time - b.penalty_time
    });
    if (ti.args && ti.args.optimization.indexOf("shortest") >= 0) return a;
    var I = Number.POSITIVE_INFINITY;
    for (var d = a.length; --d >= 0;) a[d].ok = d < 5 ? 1 : 0, I > a[d].travel_time && (I = a[d].travel_time);
    a.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }), b == -1 && a.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    });
    if (cfg.defaultCity != "intercity" && !c) {
        for (var d = a.length; --d >= 0;) {
            if (a[d].direct_trip) {
                a[d].ok = 1;
                continue
            }
            var J = b == 1 ? a[d].finish_time - a[0].finish_time : a[0].start_time - a[d].start_time;
            if (J > a[0].travel_time / 2 + 60 && cfg.defaultCity != "latvia") a[d].ok = 0;
            else if (a[d].penalty_time > 2 * I && J > I && d >= 2) a[d].ok = 0;
            else if (a[d].walk_time > I && J > I && d >= 2) a[d].ok = 0;
            else if (d < 3 || cfg.defaultCity == "latvia" || ti.args.mode == "vintra") a[d].ok = 1
        }
        a.sort(function(a, b) {
            return b.ok - a.ok
        });
        for (var d = a.length; --d > 0;)
            if (a[d].ok == 1) {
                a.length = d + 1;
                break
            }
    }
    a.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }), b == -1 && a.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    });
    return a
}, ti.finalizeSearchResults = function(a, b) {
    var c = a.results || [],
        d = Array(c.length);
    for (var e = 0; e < c.length; e++) {
        var f = c[e],
            g = f.legs,
            h = 0;
        d[e] = {
            start_time: f.start_time - h,
            finish_time: f.finish_time - h,
            travel_time: f.travel_time,
            distance: f.distance,
            cost: f.cost,
            walk_time: f.walk_time,
            direct_trip: f.direct_trip,
            legs: [],
            code: f.code
        };
        var i = Number.POSITIVE_INFINITY;
        for (var j = 0; j < g.length; j++) {
            var k = g[j],
                l = k.route ? k.route.times.workdays[k.trip_num] : "",
                m = k.route ? k.route.times.trip_ids[k.trip_num] : 0,
                n = k.route ? k.route.times.trip_codes[k.trip_num] : 0,
                o = k.route ? k.route.times.trip_operators[k.trip_num] : "",
                p = k.route ? k.route.times.trip_groups[k.trip_num] : "",
                q = k.start_stop && ti.fGetStopDetails(k.start_stop.id),
                r = k.finish_stop && ti.fGetStopDetails(k.finish_stop.id),
                s = k.route && k.route.platforms && k.route.platforms.split(",") || [],
                t = {
                    trip_num: k.trip_num,
                    trip_id: m,
                    trip_code: n,
                    trip_date: k.trip_date,
                    trip_operator: o,
                    trip_group: p,
                    start_pos: k.start_pos,
                    finish_pos: k.finish_pos,
                    start_time: k.start_time - h,
                    start_platform: s[k.start_pos || 0],
                    finish_platform: s[k.finish_pos || 0],
                    finish_time: k.finish_time - h,
                    weekdays: l,
                    cost: k.cost,
                    distance: k.distance,
                    start_stop: q && {
                        id: q.id,
                        name: q.name,
                        street: q.street,
                        lat: q.lat,
                        lng: q.lng
                    },
                    finish_stop: r && {
                        id: r.id,
                        name: r.name,
                        street: r.street,
                        lat: r.lat,
                        lng: r.lng
                    },
                    shape: k.shape
                };
            if (k.route) {
                t.stops = [];
                var u = k.route.times.workdays.length,
                    v = k.route.times.times;
                for (var w = t.start_pos; ++w < t.finish_pos;) {
                    var x = k.route.stops[w],
                        y = ti.stops[x],
                        z = v[t.trip_num + w * u] + k.time_adjusted;
                    y = y && {
                        id: y.id,
                        name: y.name,
                        street: y.street,
                        lat: y.lat,
                        lng: y.lng
                    }, y.arrival_time = y.departure_time = {
                        minutes: z,
                        value: ti.toUnixTime(a.date, z),
                        text: ti.printTime(z)
                    }, y && k.route.stops[w] == k.route.stops[w + 1] && (++w, z = v[t.trip_num + w * u] + k.time_adjusted, y.departure_time = {
                        minutes: z,
                        value: ti.toUnixTime(a.date, z),
                        text: ti.printTime(z)
                    });
                    if (a.mode == "vintra") {
                        var A = ti.LatLngToEN(y.lat, y.lng);
                        y.east = A[0], y.north = A[1]
                    }
                    t.stops.push(y)
                }
                t.route = ti.fGetRoutes(k.route);
                if (b) {
                    var B = k.start_time - h,
                        C = Number.POSITIVE_INFINITY;
                    n = t.route.num + String("0000" + n).slice(-4);
                    for (var D = 0; D < b.length; ++D) {
                        var f = b[D];
                        if (f.code == n && f.fromStopId == q.info && f.toStopId == r.info) {
                            t.online_data = f;
                            break
                        }
                        if (!1 && f.code && f.code.indexOf(t.route.num) === 0) {
                            var E = Math.abs(B - ti.toMinutes(f.departureAsStr));
                            C > E && E <= 5 && (C = E, t.online_data = f)
                        }
                    }
                }
            }
            if (ti.taxi)
                if (k.route && k.start_time - i > 30 && (j == g.length - 1 || j == g.length - 2 && !g[g.length - 1].route) || !k.route && k.finish_time - k.start_time >= 15 || j == 0 && k.start_time - a.start_time > 120) {
                    for (var D = 0; D < ti.taxi.length; ++D) {
                        var F = ti.taxi[D],
                            G = (q.lng - F.lng) * 58.1,
                            H = (q.lat - F.lat) * 111.2,
                            I = G * G + H * H,
                            G = (r.lng - F.lng) * 58.1,
                            H = (r.lat - F.lat) * 111.2,
                            J = G * G + H * H;
                        I <= F.radius && J <= F.radius && (t.taxi || (t.taxi = []), t.taxi.push({
                            name: F.name,
                            phone: F.phone,
                            km: Math.round(Math.sqrt(I))
                        }))
                    }
                    if (t.taxi) {
                        t.taxi.sort(function(a, b) {
                            return a.km - b.km
                        });
                        var K = t.taxi[0].km;
                        for (var D = 1; D < t.taxi.length; ++D)
                            if (t.taxi[D].km > K) {
                                t.taxi.length = D;
                                break
                            }
                    }
                }
            d[e].legs.push(t), k.route && (i = k.finish_time)
        }
    }
    typeof cfg === "object" && cfg.defaultCity === "intercity" ? (d.sort(function(a, b) {
        return a.start_time - b.start_time
    }), a.reverse == -1 && d.sort(function(a, b) {
        return -(a.finish_time - b.finish_time)
    })) : (d.sort(function(a, b) {
        return a.finish_time - b.finish_time
    }), a.reverse == -1 && d.sort(function(a, b) {
        return -(a.start_time - b.start_time)
    })), typeof ti.args == "object" && ti.args.optimization && (ti.args && ti.args.optimization.indexOf("short") >= 0 ? d.sort(function(b, c) {
        if (b.distance < c.distance) return -1;
        if (b.distance > c.distance) return 1;
        return a.reverse == -1 ? -(b.start_time - c.start_time) : b.finish_time - c.finish_time
    }) : ti.args && ti.args.optimization.indexOf("fast") >= 0 ? d.sort(function(b, c) {
        if (b.travel_time < c.travel_time) return -1;
        if (b.travel_time > c.travel_time) return 1;
        return a.reverse == -1 ? -(b.start_time - c.start_time) : b.finish_time - c.finish_time
    }) : ti.args && ti.args.optimization.indexOf("cheap") >= 0 && d.sort(function(b, c) {
        if (b.cost < c.cost) return -1;
        if (b.cost > c.cost) return 1;
        return a.reverse == -1 ? -(b.start_time - c.start_time) : b.finish_time - c.finish_time
    }));
    return d
}, ti.splitShape = function(a, b, c, d, e) {
    var f;
    ti.SERVER === !0 ? f = a : f = a.split("\n");
    var g = [],
        h = Number.POSITIVE_INFINITY,
        i, j, k = 0,
        l = 0,
        m = 0,
        n, o, p;
    b *= 1e5, d *= 1e5, c *= 1e5, e *= 1e5;
    for (var q = 0; q < f.length; ++q) ti.SERVER === !0 ? (n = f[q], o = n[0], p = n[1]) : (n = f[q].split(","), o = +(n[0] || 0), p = +(n[1] || 0)), o && p && (i = (o - b) * (o - b) + (p - c) * (p - c), h > i && (h = i, k = l = q, j = Number.POSITIVE_INFINITY), i = (o - d) * (o - d) + (p - e) * (p - e), j > i && (j = i, l = q), g.push([o / 1e5, p / 1e5]));
    k < g.length && l < g.length && (g = g.slice(k, l + 1));
    return g
};

function $(a) {
    return document.getElementById(a)
}
var pg = {
    urlPrevious: "",
    urlLoaded: "",
    urlUnderSchedulePane: "",
    language: "",
    languageUnderSchedulePane: "",
    city: "",
    transport: "",
    schedule: null,
    optimalResults: [],
    transfers: [],
    showDeparturesWithNumbers: "",
    GMap: null,
    hashForMap: "",
    map: {},
    mapOverlays: [],
    mapStops: {},
    mapStopForZones: "",
    mapShowVehicles: -1,
    mapShowAllStops: !0,
    inputActive: null,
    stopsSuggested: [],
    stopsSuggestedForText: "",
    realTimeDepartures: {},
    vehicleCourses: {},
    inputStop: "",
    inputStopText: "",
    inputStart: "",
    inputFinish: "",
    timerSuggestedStopsHide: 0,
    timerSuggestedStopsShow: 0,
    imagesFolder: "images/",
    translationFolder: "translation/",
    browserVersion: 999
};
pg.startVisibilityTest = function() {
    var a = "hidden";
    a in document ? document.addEventListener("visibilitychange", b) : (a = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", b) : (a = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", b) : (a = "msHidden") in document ? document.addEventListener("msvisibilitychange", b) : "onfocusin" in document ? document.onfocusin = document.onfocusout = b : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = b;

    function b(b) {
        var c = "visible",
            d = "hidden",
            e = {
                focus: c,
                focusin: c,
                pageshow: c,
                blur: d,
                focusout: d,
                pagehide: d
            };
        b = b || window.event, pg.visibility = d, b.type in e ? pg.visibility = e[b.type] : pg.visibility = this[a] ? "hidden" : "visible"
    }
    b({
        type: "focus"
    })
}, pg.addCSS = function(a) {
    var b = document.createElement("style");
    b.type = "text/css", b.styleSheet ? b.styleSheet.cssText = a : b.appendChild(document.createTextNode(a)), document.getElementsByTagName("head")[0].appendChild(b)
};
var ej = function(a) {
    var b = [],
        c = [],
        d = [],
        e = [],
        f = [],
        g = [],
        h = [],
        i = [],
        j, k, l = a.split(","),
        m, n, o = l.length,
        p = [],
        q = "+",
        r = "-",
        s = l[0],
        t = s.length,
        u = 0,
        v = [],
        w = 0;
    while (u < t) {
        var x, y = 0,
            z = 0;
        do x = s.charCodeAt(u++) - 63, z |= (x & 31) << y, y += 5; while (x >= 32);
        var A = z & 1 ? ~(z >> 1) : z >> 1;
        y = 0, z = 0, v.push(A)
    }
    H = 10, n = 240, t = v.length;
    for (m = -1, j = 0; ++m < t;) {
        var B = v[m];
        p[m] = B & 1 ? "1" : B & 2 ? "2" : B & 4 ? "4" : "0", B >>= 3, m ? (H += B, n += H) : n += B, b[j++] = n
    }
    for (var C = p.length; --C >= 0;) p[C] || (p[C] = "0");
    m = 1;
    for (var C = 0; ++m < o;) {
        var D = +l[m],
            E = l[++m];
        E === "" ? (E = j - C, o = 0) : E = +E;
        while (E-- > 0) d[C++] = D
    }--m;
    for (var C = 0, o = l.length; ++m < o;) {
        var D = +l[m],
            E = l[++m];
        E === "" ? (E = j - C, o = 0) : E = +E;
        while (E-- > 0) e[C++] = D
    }--m;
    for (var C = 0, o = l.length; ++m < o;) {
        var F = l[m],
            E = l[++m];
        E === "" ? (E = j - C, o = 0) : E = +E;
        while (E-- > 0) c[C++] = F
    }
    if (ti.has_trips_ids) {
        --m;
        var o = l.length;
        for (var C = 0; ++m < o;) {
            if (l[m] === "") break;
            f[C] = +l[m], C > 0 && (f[C] += f[C - 1]), ++C
        }
        for (var C = 0; ++m < o;) {
            if (l[m] === "") break;
            g[C] = l[m], ++C
        }
        if (ti.has_trips_ids === 2) {
            for (var C = 0; ++m < o;) {
                if (l[m] === "") break;
                i[C] = l[m], ++C
            }
            for (var C = 0; ++m < o;) {
                if (l[m] === "") break;
                h[C] = l[m], ++C
            }
        }++m
    }--m, k = 1;
    for (var C = j, G = j, H = 5, o = l.length; ++m < o;) {
        H += +l[m] - 5;
        var E = l[++m];
        E !== "" ? (E = +E, G -= E) : (E = G, G = 0);
        while (E-- > 0) b[C] = H + b[C - j], ++C;
        G <= 0 && (G = j, H = 5, ++k)
    }
    final_data = {
        workdays: c,
        times: b,
        tag: p.join(""),
        valid_from: d,
        valid_to: e,
        trip_ids: f,
        trip_codes: g,
        trip_operators: h,
        trip_groups: i
    };
    return final_data
};
(function() {
    navigator.appVersion.indexOf("MSIE") >= 0 && (pg.browserVersion = parseFloat(navigator.appVersion.split("MSIE")[1])), typeof document.body.style.transform != "undefined" ? pg.transformCSS = "transform" : typeof document.body.style.MozTransform != "undefined" ? pg.transformCSS = "-moz-transform" : typeof document.body.style.webkitTransform != "undefined" ? pg.transformCSS = "-webkit-transform" : typeof document.body.style.msTransform != "undefined" ? pg.transformCSS = "-ms-transform" : typeof document.body.style.OTransform != "undefined" && (pg.transformCSS = "-o-transform"), cfg.defaultCity == "tallinna-linn" && (pg.translationFolder = "tallinn/translation/");
    if (window.location.host.indexOf("soiduplaan.tallinn.ee") < 0) {
        var a = ["stops.lt", "ridebus.org", "marsruty.ru"];
        for (var b = 0; b < a.length; ++b)
            if (window.location.host.indexOf(a[b]) >= 0) {
                pg.imagesFolder = "../_images/", pg.translationFolder = "../_translation/";
                break
            }
    } else pg.imagesFolder = "/_images/", pg.translationFolder = "/_translation/";
    cfg.transport_colors = {
        walk: "black",
        metro: "#ff6A00",
        bus: "#0073ac",
        trol: "#dc3131",
        tram: "#009900",
        nightbus: "#303030",
        regionalbus: "#004a7f",
        suburbanbus: "#004a7f",
        commercialbus: "purple",
        intercitybus: "purple",
        internationalbus: "purple",
        seasonalbus: "purple",
        expressbus: "green",
        minibus: "green",
        train: "#009900",
        plane: "#404040",
        festal: "orange",
        eventbus: "#ff6a00"
    }, cfg.transport_icons = {};
    for (var b in cfg.transport_colors) cfg.transport_icons[b] = "'" + pg.imagesFolder + b + ".png'";
    cfg.transport_icons.expressbus = "'" + pg.imagesFolder + "bus_green.png'", cfg.transport_icons.eventbus = "'" + pg.imagesFolder + "bus_orange.png'", pg.browserVersion >= 8 && (cfg.transport_icons.walk = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkBAMAAAATLoWrAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAhUExURQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAG3RSMEAAAAKdFJOUwDrWzmzzpF1Hw5JKzDNAAAA0klEQVQoz6WSKw/CQBCEL31BHWlIKKdAEBIUoEgVslShq9BVaFQNHoXAFXotmV/J9Qy3W0WY5MyXfcxOTojf5O56aD7hZAjMGHKAEx/VrxKL3iyxLDm54sVHSVQ3ii4AzoQEmmBKi5QEWoLyFKirklyzBWIZkWvuwH6DgzVd+XphmKkv8poHsBbO2GpME27LWH0ylKHrJJJ1gZjF3AZQ5O6BjiajSfsYmWdppSscvC0SSp2fS3INjCmSToJjl1BNjHY2C2UbbcyOyv4iJigvEn/pAzWNQeXuoaM3AAAAAElFTkSuQmCC", cfg.transport_icons.bus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD///8Ac6wQQkMlAAAAAXRSTlMAQObYZgAAAD1JREFUeF5lysEJACAMA8CAg7mPMzlBKLiCI/UtQi0WCmIC9wjBk2rTXVSgmG23sbuk/MYnHSbX3KHeMHIA4toiwKUahYMAAAAASUVORK5CYII=", cfg.transport_icons.expressbus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURQAAAACAAP///8DAwFdGW0MAAAABdFJOUwBA5thmAAAANklEQVQI12NgQAaioQ5AMmpVAAMDY2hoCJB8tWoLkFy1aglWEqIGQi4NXQInwSIMAUAII0EAAGCcFKbJihAOAAAAAElFTkSuQmCC", cfg.transport_icons.trol = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD////cMTHYIE0PAAAAAXRSTlMAQObYZgAAAEFJREFUeF5lytEJACEMA9BAB3DPm+kmKAVXEFyoAwgxWPDHBN5HCIBMYXPI1gRILUYu+fkv3eO1PtfOON4dqZaVDa25JKCSbwixAAAAAElFTkSuQmCC", cfg.transport_icons.tram = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD///8Afw6EL87tAAAAAXRSTlMAQObYZgAAAEZJREFUeF5lzLEJQCEMBNBA2g8uJPyVnCuVIziHI1ilV4wXFBsv8LgiHBEPIvi5vxVoprBKgk3y6/659nn6XQgBUGTvittZX1shrS0B3oUAAAAASUVORK5CYII=", cfg.transport_icons.nightbus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAAwMDA////MDAwFsRlHAAAAAF0Uk5TAEDm2GYAAAA3SURBVHjaY2BABvb/DwDJX6s+MDAw////B0hmrZoDJFetWoOVhKiBkOv/r4GTYBGGD0AII0EAAOLaIsCN4ck7AAAAAElFTkSuQmCC", cfg.transport_icons.regionalbus = cfg.transport_icons.suburbanbus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD///8ASn8BHE3xAAAAAXRSTlMAQObYZgAAAD1JREFUeF5lysEJACAMA8CAg7mPMzlBKLiCI/UtQi0WCmIC9wjBk2rTXVSgmG23sbuk/MYnHSbX3KHeMHIA4toiwKUahYMAAAAASUVORK5CYII=", cfg.transport_icons.commercialbus = cfg.transport_icons.intercitybus = cfg.transport_icons.internationalbus = cfg.transport_icons.seasonalbus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD///+AAIDHvR5zAAAAAXRSTlMAQObYZgAAAD1JREFUeF5lysEJACAMA8CAg7mPMzlBKLiCI/UtQi0WCmIC9wjBk2rTXVSgmG23sbuk/MYnHSbX3KHeMHIA4toiwKUahYMAAAAASUVORK5CYII=", cfg.transport_icons.eventbus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURQAAAP9qAP///8DAwAwZbqEAAAABdFJOUwBA5thmAAAANklEQVQI12NgQAaioQ5AMmpVAAMDY2hoCJB8tWoLkFy1aglWEqIGQi4NXQInwSIMAUAII0EAAGCcFKbJihAOAAAAAElFTkSuQmCC", cfg.transport_icons.minibus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAABGdBTUEAALGPC/xhBQAAAAxQTFRFAAAAwMDA////AH8OhC/O7QAAAAF0Uk5TAEDm2GYAAAAzSURBVHjaY2DABPz/QaTd6gNA8v//D0Dy1qoCIPlq1QY4CRGHkK//bYCTEBEb5gNwEgEAnKMcHFzyiOMAAAAASUVORK5CYII=", cfg.transport_icons.train = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAADFBMVEUAAADAwMD///8Afw6EL87tAAAAAXRSTlMAQObYZgAAAEJJREFUeF5lzLEJACAMBMAXV7J0ImdyguAIFtnHxgHEGEhI4xdXPM/DI7KBLHLURl0lGr+2Cdedpjf+g5I4PhkVlgctPiXCztUWnAAAAABJRU5ErkJggg==", cfg.transport_icons.plane = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASBAMAAACk4JNkAAAAD1BMVEUAAABAQEBLS0uAgIA5OTlhl+UMAAAAAXRSTlMAQObYZgAAAEBJREFUeF5tzNEJACAIRVGtBXqjOEL7LxXesJ98oBwVtC++Siq5csqwCsRloptG/qTlql8D5a+JIjti3saSanMATQYDyukaLU8AAAAASUVORK5CYII="), cfg.defaultCity == "rostov" ? (cfg.transport_colors.bus = "#dc3131", cfg.transport_colors.trol = "#0073ac", cfg.transport_colors.minibus = "#FF6600", cfg.transport_colors.suburbanbus = "#9c1630", cfg.transport_icons.bus = "images/bus_red.png", cfg.transport_icons.trol = "images/trol_blue.png", cfg.transport_icons.minibus = "images/minibus_FF6600.png") : cfg.defaultCity == "tallinna-linn" ? (cfg.transport_colors.bus = "#00c7b8", cfg.transport_colors.trol = "#0064d7", cfg.transport_colors.tram = "#ff601e", cfg.transport_colors.regionalbus = "#9c1630", cfg.transport_colors.commercialbus = "#6900B8", cfg.transport_icons.bus = "images_tallinn/bus.png", cfg.transport_icons.trol = "images_tallinn/trol.png", cfg.transport_icons.tram = "images_tallinn/tram.png", cfg.transport_icons.regionalbus = "images_tallinn/regionalbus.png", cfg.transport_icons.commercialbus = "images_tallinn/commercialbus.png", cfg.transport_icons.train = "images_tallinn/train.png") : cfg.defaultCity == "krasnodar" || cfg.defaultCity == "mariupol" ? (cfg.transport_colors.bus = "green", cfg.transport_colors.trol = "#0073ac", cfg.transport_colors.tram = "#dc3131", cfg.transport_colors.minibus = "#ff6600", cfg.transport_icons.bus = "images/bus_green.png", cfg.transport_icons.trol = "images/trol_blue.png", cfg.transport_icons.tram = "images/tram_red.png", cfg.transport_icons.minibus = "images/minibus_FF6600.png") : cfg.defaultCity == "chelyabinsk" ? (cfg.transport_colors.minibus = "#7f237e", cfg.transport_icons.minibus = "images/minibus_magenta.png") : cfg.defaultCity == "klaipeda" && (cfg.transport_colors.minibus = "#ff6600", cfg.transport_icons.minibus = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASAgMAAAAroGbEAAAACVBMVEUAAADy0CQAAAB9nBbiAAAAAXRSTlMAQObYZgAAAB1JREFUCNdjwAUYQ0ND0MioKAS5dOkSKImpEhcAAHlGC+u+8/jOAAAAAElFTkSuQmCC");
    if (cfg.defaultCity == "vilnius" && cfg.city.datadir != "vilniusGTFS" || cfg.defaultCity == "rostov" || cfg.defaultCity == "krasnodar" || cfg.defaultCity == "siauliai" || cfg.defaultCity == "novorossiysk" || cfg.defaultCity == "klaipeda" || cfg.defaultCity == "mariupol") ti["explodeTimes"] = ej;
    var c = "";
    for (var b in cfg.transport_colors) {
        var d = cfg.transport_colors[b];
        c += "." + b + "{ background-color:" + d + "; }", typeof mobile != "undefined" && (c += ".nav-transport ." + b + " span, .nav-transport ." + b + " autobusuData, .icon.icon-" + b + "{ background-image:url(" + cfg.transport_icons[b] + "); }", c += ".icon-" + b + "{ width:18px; height:18px;}", c += ".label-" + b + " {background-color:" + d + ";}"), cfg.city.defaultTransport != "tablo" && (c += ".icon.icon_" + b + "{ background-image:url(" + cfg.transport_icons[b] + ");}"), c += ".transfer" + b + ",autobusuData.transfer" + b + "{ color:" + d + "; font-weight:bold; }", c += ".departure" + b + "{ color:" + d + "; font-size:smaller; font-style:normal; }"
    }
    cfg.city.custom_css && (cfg.city.custom_css = cfg.city.custom_css.replace(new RegExp("_images/", "g"), pg.imagesFolder), c += cfg.city.custom_css || ""), pg.addCSS(c)
})(), pg.bodyKeyDown = function(a, b) {
    b || (b = window.event ? window.event.keyCode : a.keyCode);
    if (b == 27) {
        var c = $("ulScheduleDirectionsList");
        c && c.style && c.style.display != "none" ? c.style.display = "none" : pg.schedule && pg.aScheduleClose_Click(a)
    }
}, pg.fLang_Click = function(a) {
    var b = a && (a.target || a.srcElement);
    if (b && (b.tagName || "").toLowerCase() == "autobusuData") {
        if (b.innerHTML.length < 10) {
            pg.fUrlSet({
                schedule: pg.schedule,
                language: b.innerHTML
            });
            return pg.cancelEvent(a)
        }
    } else if (b && (b.tagName || "").toLowerCase() == "img") {
        pg.fUrlSet({
            schedule: pg.schedule,
            language: b.src.slice(-6, -4)
        });
        return pg.cancelEvent(a)
    }
    return !1
}, pg.divHeader_Click = function(a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    while (b && b.nodeName.toLowerCase() !== "a") b = b.parentNode;
    if (b && b.href && b.href.indexOf("http:") >= 0) return !0;
    pg.aScheduleClose_Click(a)
}, pg.aScheduleClose_Click = function(a) {
    a = a || window.event;
    if (pg.schedule)
        if (pg.urlUnderSchedulePane == "") pg.city = "nothing", pg.fUrlSet({
            city: pg.schedule.city,
            transport: pg.schedule.transport,
            schedule: null
        });
        else {
            var b = pg.fUrlParse(pg.urlUnderSchedulePane);
            b.language != pg.language && (b.language = pg.language, pg.city = "nothing"), b.schedule = null, pg.fUrlSet(b)
        }
    return pg.cancelEvent(a)
}, pg.fCreateLanguagesBar = function() {
    var a = $("divLang"),
        b = "",
        c = cfg.city.languages.split(",");
    for (var d = 0; d < c.length; d++) {
        var e = c[d];
        cfg.city.languageFlags ? b += "<autobusuData title=\"" + cfg.languages[e] + "\"><img src=\"" + e + ".png\" style=\"width:32px; height:26px; padding:0 5px;\"></autobusuData>" : (b += "<autobusuData title=\"" + cfg.languages[e] + "\" class=\"underlined\">" + e + "</autobusuData>", cfg.city.navigation === "riga" && d % 3 === 2 ? b += " " : b += "&nbsp;")
    }(a || {}).innerHTML = b
}, pg.fTranslateStaticTexts = function() {
    if (cfg.defaultCity === "chelyabinsk" && (pg.language === "ru" || pg.language === "" && cfg.defaultLanguage === "ru")) {
        i18n.transport.minibus = i18n.transport1.minibus = cfg.city.minibus;
        var a = i18n.lowFloorVehicles.lastIndexOf(",");
        a > 1 && (i18n.lowFloorVehicles = i18n.lowFloorVehicles.substr(0, a)), a = i18n.lowFloorDepartures.lastIndexOf(","), a > 80 && (i18n.lowFloorDepartures = i18n.lowFloorDepartures.substr(0, a) + "."), a = i18n.checkHandicapped.lastIndexOf(",")
    }
    cfg.defaultCity === "rostov" && (pg.language === "ru" || pg.language === "" && cfg.defaultLanguage === "ru") && (i18n.transport.minibus = i18n.transport1.minibus = cfg.city.minibus), cfg.defaultCity === "siauliai" && (pg.language === "lt" || pg.language === "" && cfg.defaultLanguage === "lt") && (i18n.transport.minibus = "Prive&#382;amieji autobusai", i18n.transport1.minibus = "Prive&#382;amasis autobusas");
    if (cfg.defaultCity === "klaipeda") {
        i18n.smallBus12Departures = (i18n.smallBus12Departures || "").replace("Melsvu", "Geltonu"), i18n.smallBus12Departures = (i18n.smallBus12Departures || "").replace("Blue", "Yellow");
        if (pg.language === "lt" || pg.language === "" && cfg.defaultLanguage === "lt") i18n.lowFloorVehicleMapTip = "pritaikytas ne&#303;galiesiems", i18n.transport.expressbus = "Ekspresiniai autobusai"
    }
    cfg.defaultCity === "vilnius" && (i18n.menuTickets = i18n.moreInformation || ""), cfg.defaultCity !== "tallinna-linn", document.title = i18n.headerTitle, ($("header") || {}).innerHTML = (cfg.city.logoInHeader || "") + i18n.headerTitle, ($("spanYouAreHere") || {}).innerHTML = i18n.youAreHere, ($("aYouAreHere") || {}).href = pg.hashHome = (pg.hashHome + "map").split("map")[0] + "map/" + pg.language, ($("spanRoutesFromStop") || {}).innerHTML = i18n.departingRoutes + ":", ($("spanPlan") || {}).innerHTML = cfg.city.navigation !== "top" ? i18n.tripPlanner : i18n.tripPlanner.replace("<br/>", " ").replace("<br>", " "), ($("spanShowMap") || {}).innerHTML = i18n.showStopsMap, ($("spanShowVehicles") || {}).innerHTML = i18n.mapShowVehicles, ($("spanShowTraffic") || {}).innerHTML = i18n.mapShowTraffic, ($("aPlanShowMap") || {}).innerHTML = "<br/><br/>" + i18n.showStopsMap.toLowerCase(), ($("spanPrintSchedule") || {}).innerHTML = i18n.print, ($("spanReturnToRoutes") || {}).innerHTML = i18n.returnToRoutes, ($("spanShowDirectionsMap") || {}).innerHTML = i18n.showInMap, ($("buttonSearch") || {}).value = i18n.searchRoute, ($("inputReverseDepart") || {}).text = i18n.depart, ($("inputReverseArrive") || {}).text = i18n.arrive, ($("labelDepartureDate") || {}).innerHTML = i18n.departuresFor, ($("inputDepartureDate-1") || {}).text = i18n.fromNow, ($("inputDate0") || {}).text = ($("inputDepartureDate0") || {}).text = i18n.today, ($("inputDate1") || {}).text = ($("inputDepartureDate1") || {}).text = i18n.tomorrow, ($("mapShowAllStops") || {}).title = i18n.mapShowAllStops, ($("mapShowTraffic") || {}).title = i18n.mapShowTraffic, ($("mapShowVehicles") || {}).title = i18n.mapShowVehicles;
    var b = new Date;
    for (var a = 2; a <= 31; a++) {
        var c = new Date(b.getFullYear(), b.getMonth(), b.getDate() + a);
        ($("inputDate" + a) || {}).text = pg.formatDate(c), ($("inputDepartureDate" + a) || {}).text = pg.formatDate(c)
    }($("labelHandicapped") || {}).title = i18n.checkHandicapped, ($("aExtendedOptions") || {}).innerHTML = ($("divContentPlannerOptionsExtended") || {
        style: {}
    }).style.display ? i18n.extendedOptions : i18n.extendedOptionsHide, ($("labelRoutes") || {}).innerHTML = i18n.rideOnlyRoutes + "", ($("labelChangeTimeText") || {}).innerHTML = i18n.timeForConnection + "", ($("labelWalkMaxText") || {}).innerHTML = i18n.walkingMax + "", ($("labelWalkSpeedText") || {}).innerHTML = i18n.walkingSpeed + "";
    var d = $("inputStop");
    d && (d.title = i18n.typeStartStop, d.className == "empty" && (d.value = i18n.startStop)), d = $("inputStart"), d && (d.title = i18n.typeStartStop, d.className == "empty" && (d.value = i18n.startStop)), d = $("inputFinish"), d && (d.title = i18n.typeFinishStop, d.className == "empty" && (d.value = i18n.finishStop)), d = $("inputRoutes"), d && (d.title = i18n.typeRouteNameOrNumber, d.className == "empty" && (d.value = i18n.typeRouteNameOrNumber)), ($("labelInputRoutes") || {}).innerHTML = i18n.filter + ":"
}, pg.fGetCity = function(a) {
    for (var b in cfg.cities)
        if (cfg.cities[b].region === a) return b;
    return a
}, pg.fCreateNavigation = function(a) {
    if (typeof mobile == "undefined" || typeof a != "undefined") {
        var b = "<dt class=\"splitter\"></dt><!-- -->",
            c = pg.fGetCity(pg.city),
            d = 0;
        if (typeof mobile != "undefined") var e = [];
        if (cfg.cities[c]) {
            var f = "",
                g = "",
                h = {};
            for (var i = 1; i <= 2; i++) {
                var j = pg.fUrlSet({
                    city: c,
                    transport: null,
                    hashForMap: null
                }, !0);
                typeof mobile != "undefined" && e.push({
                    hash: j,
                    city: c,
                    type: i == 1 ? "city" : "region",
                    transport: [],
                    timeout: cfg.cities[c].goHomeTimeout
                });
                if (!cfg.cities[c].goHomeTimeout) {
                    f += "<dt><autobusuData id=\"" + (i == 1 ? "city" : "region") + "\" href=\"#" + j + "\">" + (cfg.cities[c].logo || "") + "<span class=\"hover\">";
                    var k = cfg.cities[c].name;
                    if (k) var l = k[pg.language] || k.en || (i == 1 ? i18n.cityRoutes : i18n.regionRoutes);
                    else var l = i == 1 ? i18n.cityRoutes : i18n.regionRoutes;
                    f += l, typeof mobile != "undefined" && (e[i - 1].name = l, e[i - 1].logo = cfg.cities[c].logo || ""), f += "</span></autobusuData></dt>"
                }
                for (var m = 0; m < cfg.cities[c].transport.length; m++) {
                    var n = cfg.cities[c].transport[m];
                    if ((cfg.cities[c].transportTemporary || {})[n] && !(ti.cityTransportRoutes || {})[c + "_" + n]) {
                        ti.routes && (cfg.cities[c].transport.splice(m, 1), --m);
                        continue
                    }
                    var o = " checked=\"checked\"";
                    cfg.cities[c].transportPlannerUncheck && cfg.cities[c].transportPlannerUncheck[n] && (o = "");
                    var p = pg.fUrlSet({
                            city: c,
                            transport: n,
                            hashForMap: null
                        }, !0),
                        q = ((cfg.cities[c].transportTip || {})[n] || {})[pg.language];
                    q && (q = " title=\"" + q + "\""), f += ("<dt><autobusuData id=\"" + c + "_{tr}\" href=\"#" + p + "\"" + q + "><span class=\"icon icon_{tr}\"></span><span class=\"hover\">" + i18n.transport[n] + "</span></autobusuData></dt>").replace(/{tr}/g, n), typeof mobile != "undefined" && e[i - 1].transport.push({
                        hash: p,
                        transport: n,
                        name: i18n.transport[n]
                    }), h[n] || (h[n] = !0, g += ("<label for=\"checkbox{tr}\"><input name=\"checkbox{tr}\" id=\"checkbox{tr}\" type=\"checkbox\" value=\"{tr}\"" + o + "/>").replace(/{tr}/g, n) + i18n.transport[n] + "</label> "), cfg.transportOrder[n] = ++d
                }
                c = cfg.cities[c].region;
                if (!c || !cfg.cities[c]) break;
                f += b
            }
            if (cfg.defaultCity == "pskov") {
                f += b;
                var r = ["dedovichi", "nevel", "novorzhev", "ostrov", "porxov"];
                for (var m = 0; m < r.length; ++m) {
                    var c = r[m];
                    f += "<dt><autobusuData id=\"" + c + "_bus\" href=\"#" + c + "/bus\"><span class=\"hover\">" + cfg.cities[c].name[pg.language] + "</span></autobusuData></dt>"
                }
            }($("listTransports") || {}).innerHTML = f, ($("divContentPlannerOptionsTransport") || {}).innerHTML = i18n.optionsTransport + "&nbsp;" + g
        }
        cfg.transportOrder.commercialbus && cfg.transportOrder.regionalbus && (cfg.transportOrder.commercialbus = cfg.transportOrder.regionalbus), a && a(e)
    }
}, pg.fLoadPage = function() {
    cfg.city.languages = cfg.city.languages || "en,ru", cfg.defaultLanguage = cfg.city.defaultLanguage || cfg.city.languages.split(",")[0], pg.showDeparturesWithNumbers !== !0 && pg.showDeparturesWithNumbers !== !1 && (pg.showDeparturesWithNumbers = cfg.city.showDeparturesWithNumbers, pg.toggleClass($("divScheduleContentInner"), "HideNumbers", !pg.showDeparturesWithNumbers)), pg.fTranslateStaticTexts(), pg.fCreateLanguagesBar(), pg.loadedRoutesHash = null, pg.loadedDepartingRoutes = null, pg.loadedPlannerParams = null, pg.fCreateNavigation(), pg.fTabActivate();
    pg.schedule && pg.fScheduleLoad()
}, pg.fLoadLanguageScript = function(a, b) {
    var c = $("scriptLanguage");
    c && document.getElementsByTagName("head")[0].removeChild(c);
    var d = document.createElement("script");
    d.setAttribute("id", "scriptLanguage"), d.setAttribute("type", "text/javascript"), d.setAttribute("src", pg.translationFolder + a + ".js"), b && d.addEventListener("load", function(a) {
        b(a)
    }, !1), document.getElementsByTagName("head")[0].appendChild(d)
}, pg.fTogglePlannerOptions = function(a) {
    var b = $("divContentPlannerOptionsExtended");
    b.style.display && a !== !1 ? (b.style.display = "", ($("aExtendedOptions") || {}).innerHTML = i18n.extendedOptionsHide) : (b.style.display = "none", ($("aExtendedOptions") || {}).innerHTML = i18n.extendedOptions);
    if (a) return pg.cancelEvent(a)
}, pg.storeMyLocation = function(a) {
    var b = a.coords.latitude = Math.round(a.coords.latitude * 1e6) / 1e6,
        c = a.coords.longitude = Math.round(a.coords.longitude * 1e6) / 1e6;
    pg.myLocation = b + ";" + c
}, pg.replaceHtml = function(a, b) {
    if (a) {
        var c = a.nextSibling,
            d = a.parentNode;
        d.removeChild(a), a.innerHTML = b, c ? d.insertBefore(a, c) : d.appendChild(a)
    }
}, pg.storeStyles = function() {
    pg.styles = {};
    var a = document.styleSheets || [];
    for (var b = 0; b < a.length; ++b) {
        var c = [];
        try {
            c = a[b].rules || a[b].cssRules || []
        } catch (d) {}
        for (var e = c.length; --e >= 0;) {
            var f = c[e].selectorText;
            if (f) {
                var g = c[e].style,
                    h = f.split(",");
                for (var i = h.length; --i >= 0;) pg.styles[h[i].trim()] = g
            }
        }
    }
}, pg.getProtocol = function() {
    return location.protocol == "https:" ? "https:" : "http:"
}, pg.getStyle = function(a) {
    if (a && a.indexOf("transport_icon_") == 0) {
        var b = a.substring("transport_icon_".length),
            c = (pg.styles[".icon.icon_" + b] || pg.styles[".icon_" + b + ".icon"] || pg.styles[".icon-" + b] || {
                backgroundImage: pg.imagesFolder + b + ".png"
            }).backgroundImage || "";
        c = c.replace(/\"/g, ""), c = c.replace(/\'/g, ""), c.indexOf("url(") == 0 && (c = c.substring(4, c.length - 1));
        return c
    }
    return pg.styles[a]
}, pg.styleRGBtoHex = function(a) {
    if (a == "green") return "008000";
    if (a == "purple") return "800080";
    if (a == "orange") return "FFA500";
    if (a.indexOf("#") === 0) return a.substring(1);
    var b = a.replace("rgb(", "").replace(")", ""),
        c = b.split(",");
    b = ((1 << 24) + (+c[0] << 16) + (+c[1] << 8) + +c[2]).toString(16).slice(1);
    return b
}, pg.toggleClass = function(a, b, c) {
    if (a) {
        var d = " " + (a.className || "") + " ";
        c && d.indexOf(" " + b + " ") < 0 ? a.className = (d + b).trim() : !c && d.indexOf(" " + b + " ") >= 0 && (a.className = d.replace(" " + b + " ", "").trim())
    }
}, pg.cancelEvent = function(a) {
    a && (a.cancelBubble = !0, a.returnValue = !1, a.preventDefault && a.preventDefault(), a.stopPropagation && a.stopPropagation());
    return !1
}, pg.formatDate = function(a, b) {
    typeof a == "number" && (a = new Date(a * 1e3 * 60 * 60 * 24));
    var c = a.getDate(),
        d = 1 + a.getMonth(),
        e = a.getFullYear();
    if (typeof b != "undefined" || (pg.language == "ru" || pg.language == "ee")) e = c, c = a.getFullYear();
    var f = (e < 10 ? "0" : "") + e + (d < 10 ? "-0" : "-") + d + (c < 10 ? "-0" : "-") + c;
    return b ? f.replace(/-/g, b) : f
}, pg.nonEmptyCount = function(a) {
    var b = 0;
    for (var c in a) a.hasOwnProperty(c) && a[c] && ++b;
    return b
}, pg.render_airport_icon = function(a, b) {
    if (a && a.length >= 9 && a.toLowerCase().indexOf("ro uostas") >= (b ? a.length - 9 : 0)) return "&nbsp;<img style=\"vertical-align:text-top;\" height=\"16\" width=\"16\" src=\"" + pg.imagesFolder + "airport_gray_36.png\" alt=\"airport\" title=\"\" />";
    return ""
}, pg.fUrlSet = function(a, b) {
    if (a) {
        a.schedule && pg.schedule && (typeof a.schedule.city == "undefined" && (a.schedule.city = pg.schedule.city), typeof a.schedule.transport == "undefined" && (a.schedule.transport = pg.schedule.transport), typeof a.schedule.num == "undefined" && (a.schedule.num = pg.schedule.num), typeof a.schedule.dirType == "undefined" && (a.schedule.dirType = pg.schedule.dirType), typeof a.schedule.stopId == "undefined" && (a.schedule.stopId = pg.schedule.stopId));
        var c = ["city", "transport", "inputStop", "inputStart", "inputFinish", "hashForMap", "language"];
        for (var d = c.length; --d >= 0;) typeof a[c[d]] == "undefined" && (a[c[d]] = pg[c[d]])
    } else a = pg;
    var e = "";
    if (a.schedule) e = (a.schedule.tripNum || "") + (e ? "/" + e : ""), e = (a.schedule.stopId || "") + (e ? "/" + e : ""), e = (typeof mobile != "undefined" && !b ? a.schedule.dirUrl || "" : a.schedule.dirType || "") + (e ? "/" + e : ""), e = (a.schedule.num || "") + (e ? "/" + e : ""), e = (a.schedule.transport || "") + (e ? "/" + e : ""), a.schedule.city && a.schedule.city != cfg.defaultCity && (e = a.schedule.city + (e ? "/" + e : "")), e += a.hashForMap ? "/map" : "";
    else {
        a.transport == "stop" ? (a.city = pg.fGetCity(a.city), e = "stop" + (a.inputStop ? "/" + a.inputStop : "")) : a.transport == "plan" ? (a.city = pg.fGetCity(a.city), e = "plan/" + (a.inputStart || "") + (a.inputFinish ? "/" + a.inputFinish : "")) : e = (a.transport || "") + (e ? "/" + e : "");
        if (!e || a.city !== cfg.defaultCity) e = a.city + (e ? "/" + e : "");
        e += a.hashForMap ? "/" + a.hashForMap : ""
    }
    e += a.language != cfg.defaultLanguage ? "/" + a.language : "", e = ti.toAscii(e, !0);
    if (b) return e;
    Hash.go(e);
    return e
}, pg.fUrlSetMap = function(a, b) {
    var c = pg.hashForMap || "map";
    a ? (typeof a != "object" && (a = {}), a.optimalRoute && (c = "map,,," + a.optimalRoute), a.maximized && c.indexOf(",max") < 0 && (c += ",max"), a.maximized === !1 && (c = c.replace(",max", "")), a.clusters && c.indexOf(",stops") < 0 && (c += ",stops"), a.clusters === !1 && (c = c.replace(",stops", ""))) : c = "";
    if (b) return c;
    pg.hashForMap = c, c = pg.fUrlSet(null, !0), c != Hash.getHash() ? Hash.go(c) : pg.fMapShow()
}, pg.fUrlParse = function(a) {
    a = decodeURI(a);
    var b = {},
        c = a.indexOf("#");
    c >= 0 && (a = a.substring(c + 1)), a = a ? a.split("/") : [], a.length && ("," + cfg.city.languages + ",").indexOf("," + a[a.length - 1] + ",") >= 0 ? b.language = a.pop() : b.language = cfg.defaultLanguage, a.length && "map" === a[a.length - 1].substring(0, 3) ? b.hashForMap = a.pop() : b.hashForMap = "", b.transport = "", a[0] || (b.transport = typeof cfg.city.defaultTransport != "undefined" ? cfg.city.defaultTransport : cfg.city.transport[0]), a.length && cfg.cities[a[0]] ? b.city = a.shift() : b.city = cfg.defaultCity, a[0] && (b.transport = a[0], a[0] === "stop" ? b.inputStop = a[1] || "" : a[0] === "plan" ? (b.inputStart = a[1] || "", b.inputFinish = a[2] || "") : a[1] && (b.schedule = {
        city: b.city,
        transport: a[0],
        num: a[1],
        dirType: a[2] || "",
        stopId: a[3] || "",
        tripNum: isNaN(a[4]) ? 0 : +a[4],
        dirUrl: a[2] || ""
    }));
    return b
}, pg.fUrlExecute = function(a) {
    var b = pg.fUrlParse(a),
        c = pg.language;
    pg.language = b.language;
    var d = pg.city;
    pg.city = b.city;
    var e = pg.hashForMap;
    pg.hashForMap = b.hashForMap, pg.transport = b.transport, pg.inputStop = b.inputStop || pg.inputStop, pg.inputStart = b.inputStart || pg.inputStart, pg.inputFinish = b.inputFinish || pg.inputFinish, pg.urlPrevious = pg.urlLoaded, pg.urlLoaded = a, b.schedule ? pg.fScheduleShow(b.schedule) : (pg.fScheduleHide(), pg.fTabActivate()), c != pg.language && (c || pg.language != cfg.defaultLanguage) && pg.fLoadLanguageScript(pg.language), d !== pg.city && cfg.defaultCity != "pskov" && (cfg.cities[d] || {
        region: ""
    }).region !== pg.city && pg.fLoadPage(), pg.hashForMap ? (e !== pg.hashForMap, pg.fMapShow()) : document.body.className.indexOf("Map") >= 0 && pg.fMapHide(), typeof mobile != "undefined" && (b.hash = a, mobile.render(b))
}, typeof jq == "undefined" && (jq = function(a) {
    var b = null;
    if (typeof a == "string") {
        var c = a.charAt(0);
        c == "#" ? b = document.getElementById(a.substr(1)) : c == "." ? b = document.getElementsByClassName(a.substr(1))[0] : b = document.getElementsByTagName(a)[0]
    } else b = a;
    return {
        el: b,
        hasClass: function(a) {
            return this.el.className.match(new RegExp("(\\s|^)" + a + "(\\s|$)"))
        },
        addClass: function(a) {
            this.hasClass(a) || (this.el.className += " " + a);
            return this
        },
        removeClass: function(a) {
            this.el.className = this.el.className.replace(new RegExp("\\b" + a + "\\b"), "");
            return this
        },
        toggleClass: function(a) {
            var b = this.el.className.split(" "),
                c = b.indexOf(a);
            c != -1 ? b.splice(c, 1) : b.push(a), this.el.className = b.join(" ")
        },
        bind: function(a, b) {
            this.el && ("addEventListener" in this.el ? this.el.addEventListener(a, b, !1) : this.el.attachEvent && this.el.attachEvent("on" + a, b))
        },
        html: function(a) {
            this.el.innerHTML = a
        },
        remove: function() {
            this.el.parentNode.removeChild(this.el)
        }
    }
});
var v3 = {
    ready: !1,
    iconClickField: 7,
    setMap: function(a) {
        this.map = a;
        var b = new google.maps.OverlayView;
        b.draw = function() {}, b.onAdd = function() {
            v3.ready = !0
        }, b.setMap(a), this.overlay = b
    },
    getPanes: function() {
        return this.overlay.getPanes()
    },
    getZoomByBounds: function(a) {
        var b = this.map.mapTypes.get(this.map.getMapTypeId()),
            c = b.maxZoom || 21,
            d = b.minZoom || 0,
            e = this.map.getProjection().fromLatLngToPoint(a.getNorthEast()),
            f = this.map.getProjection().fromLatLngToPoint(a.getSouthWest()),
            g = Math.abs(e.x - f.x),
            h = Math.abs(e.y - f.y),
            i = 40;
        for (var j = c; j >= d; --j)
            if (g * (1 << j) + 2 * i < this.map.getDiv().clientWidth && h * (1 << j) + 2 * i < this.map.getDiv().clientHeight) return j;
        return 0
    },
    decodeLevels: function(a) {
        var b = [];
        for (var c = 0; c < a.length; ++c) {
            var d = a.charCodeAt(c) - 63;
            b.push(d)
        }
        return b
    },
    fromLatLngToDivPixel: function(a, b) {
        var c = this.map.getProjection().fromLatLngToPoint(a),
            d = Math.pow(2, b),
            e = new google.maps.Point(c.x * d, c.y * d);
        return e
    },
    fromDivPixelToLatLng: function(a, b) {
        var c = Math.pow(2, b),
            d = new google.maps.Point(a.x / c, a.y / c),
            e = this.map.getProjection().fromPointToLatLng(d);
        return e
    },
    fromLatLngToContainerPixel: function(a) {
        return this.overlay.getProjection().fromLatLngToContainerPixel(a)
    },
    fromLatLngToDivPixel2: function(a) {
        return this.overlay.getProjection().fromLatLngToDivPixel(a)
    },
    findClosestCluster: function(a, b) {
        var c = b.slice(),
            d = a,
            e = b[0],
            f = Number.MAX_VALUE;
        for (var g = 0; g < b.length; g++) {
            var h = ti.fGetStopDetails(b[g]);
            c = c.concat(h.neighbours.split(","))
        }
        for (var g = 0; g < c.length; g++) {
            var h = ti.fGetStopDetails(c[g]),
                i = this.fromLatLngToContainerPixel(new google.maps.LatLng(h.lat, h.lng)),
                j = (i.x - a.x) * (i.x - a.x) + (i.y - a.y) * (i.y - a.y);
            j < f && (d = i, e = c[g], f = j)
        }
        var k = e in pg.clusterManager.stopCluster ? pg.clusterManager.stopCluster[e] : b;
        return {
            point: d,
            cluster: k
        }
    }
};
pg.fTabShowMap_Click = function(a, b) {
    b == "traffic" ? (pg.fShowTraffic(!0), pg.mapShowAllStops = !1) : b == "vehicles" ? pg.fToggleVehicles(2) : (pg.fShowTraffic(!1), pg.mapShowAllStops = typeof mobile == "undefined"), pg.hashForMap == "map" && b != "mylocation" ? pg.fMapShow() : (pg.hashForMap = "map", b == "mylocation" && (pg.hashForMap = "map,mylocation"), pg.fUrlSet());
    return pg.cancelEvent(a)
}, pg.fTabDrive_Click = function(a) {
    pg.mapShowAllStops = !1, pg.hashForMap === "map" ? (pg.hashForMap = "map,drive", pg.fMapShow()) : (pg.hashForMap = "map,drive", pg.fUrlSet());
    return pg.cancelEvent(a)
}, pg.fMapHide = function() {
    pg.mapShowVehiclesInterval && (clearInterval(pg.mapShowVehiclesInterval), pg.mapShowVehiclesInterval = 0), pg.schedule && (document.body.className = "ScheduleDisplayed"), pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML), jq("body").removeClass("ScheduleMapDisplayed").removeClass("MapDisplayed").removeClass("MapDisplayedMax")
}, pg.loadGoogleMapsScript = function(a) {
    if (!1 && typeof google == "object") pg._googleMapsStatus = 2, a();
    else {
        if (pg._googleMapsStatus === 0) {
            pg._googleMapsStatus = null;
            return
        }
        if (pg._googleMapsStatus == 2) {
            a();
            return
        }
        if (pg._googleMapsStatus == 1) {
            window.setTimeout(function() {
                pg.loadGoogleMapsScript(a)
            }, 300);
            return
        }
        pg._googleMapsStatus = 1;
        var b = document.createElement("script");
        b.type = "text/javascript", b.async = !0;
        var c = pg.language || pg.fUrlParse(window.location.href).language;
        c = c == "ee" ? "et" : c, b.src = "https://maps.googleapis.com/maps/api/js?" + (cfg.city.googleAPIkey ? "key=" + cfg.city.googleAPIkey + "&" : "") + "v=3.31&libraries=geometry,places&callback=pg.GMapScriptLoaded&language=" + c;
        if (b.onprogress) {
            var d = "";
            b.onprogress = function() {
                d += ".", $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + d + "</div>"
            }
        }
        var e = function() {
            typeof google != "object" && (pg._googleMapsStatus = 0, $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.failedMap + "</div>", pg.GMap = null), b.onload = b.onreadystatechange = b.onerror = null
        };
        b.onreadystatechange = function() {
            (this.readyState == "complete" || this.readyState == "loaded") && setTimeout(e, 10)
        }, b.onload = b.onerror = e, document.getElementsByTagName("head")[0].appendChild(b), window.setTimeout(function() {
            pg.loadGoogleMapsScript(a)
        }, 300)
    }
}, pg.GMapScriptLoaded = function() {
    pg._googleMapsStatus = 2
}, pg.fMapShow = function() {
    cfg.isMobilePage && pg.urlPrevious && pg.urlPrevious.indexOf("map") == -1 && (pg.urlUnderMobileMap = pg.urlPrevious);
    var a = pg.hashForMap.split(","),
        b, c = !1;
    a[a.length - 1] == "max" && (b = !0, a.pop()), a[a.length - 1] == "drive" && (b = !0, a.pop()), a[a.length - 1] == "stops" && (c = !0, a.pop());
    var d = a[1] || cfg.defaultCity,
        e, f, g, h;
    pg.schedule ? (b ? jq("body").removeClass("ScheduleMapDisplayed").addClass("ScheduleMapDisplayedMax") : jq("body").removeClass("ScheduleMapDisplayedMax").addClass("ScheduleMapDisplayed"), d = pg.schedule.city, e = pg.schedule.transport, f = pg.schedule.num, g = pg.schedule.dirType, h = pg.schedule.stopId) : (b ? jq("body").removeClass("MapDisplayed").addClass("MapDisplayedMax") : jq("body").removeClass("MapDisplayedMax").addClass("MapDisplayed"), pg.browserVersion <= 7 && ($("divContent").innerHTML = $("divContent").innerHTML), d = a[1] || cfg.defaultCity, e = a[2] || "", f = a[3] || "", g = a[4] || "", h = a[5] || "");
    if (pg.GMap) {
        if (typeof ti.stops !== "object" || typeof ti.routes !== "object" || typeof pg.GMap.getProjection() == "undefined" || !pg.stopLabelSelected._ready) {
            setTimeout(pg.fMapShow, 200);
            return
        }
        var i, j;
        if (pg.transport == "plan") pg.stopLabelSelected.hide(), pg.fToggleVehicles(-Math.abs(pg.mapShowVehicles));
        else {
            pg.fToggleVehicles(pg.mapShowVehicles), h || pg.transport == "stop" && (h = pg.inputStop, pg.mapShowAllStops = !0);
            if (h) {
                j = ti.fGetAnyStopDetails(h), pg.schedule ? B = pg.fUrlSet({
                    schedule: {
                        stopId: j.id
                    }
                }, !0) : B = pg.fUrlSet({
                    transport: "stop",
                    stopId: j.id
                }, !0);
                if (typeof j.latAvg == "number" && typeof j.lngAvg == "number") {
                    i = new google.maps.LatLng(j.latAvg, j.lngAvg), pg.stopLabelSelected.setContents(j.name, B), pg.stopLabelSelected.setPoint(i), pg.stopLabelSelected.show();
                    if (pg.transport == "stop" && cfg.defaultCity === "vilnius" && pg.mapStopForZones != h && !cfg.city.goHomeTimeout) {
                        pg.mapStopForZones = h;
                        var k = new Date,
                            l = k.getDay() || 7,
                            m = {
                                start_stops: h,
                                finish_stops: "0;0",
                                date: k,
                                weekday: l,
                                transport: {},
                                walk_max: 500,
                                callback2: function() {
                                    pg.clusterManager.refresh()
                                }
                            };
                        setTimeout(function() {
                            dijkstra(m, 720, 1)
                        }, 100)
                    }
                } else pg.stopLabelSelected.hide()
            } else pg.stopLabelSelected.hide()
        }
        if (f || pg.transport == "plan") {
            if (pg.map.city == d && pg.map.transport == e && pg.map.num == f && pg.map.dirType == g) {
                i && !pg.GMap.getBounds().contains(i) && pg.GMap.panTo(i), cfg.isMobilePage && google.maps.event.trigger(pg.GMap, "resize");
                return
            }
            pg.map.city = d, pg.map.transport = e, pg.map.num = f, pg.map.dirType = g, pg.mapStops = {}, pg.clusterManager.refresh(), pg.mapMarkerStart.setMap(null), pg.mapMarkerFinish.setMap(null);
            while (pg.mapOverlays.length) pg.mapOverlays.pop().setMap(null);
            var n = 999,
                o = -999,
                p = 999,
                q = -999,
                r = "",
                s = "";
            if (pg.transport == "plan") {
                var t;
                if (f && pg.optimalResults && pg.optimalResults.length) {
                    if (typeof mobile == "undefined" && cfg.defaultCity == "tallinna-linn") {
                        var u = jQuery(jQuery("#planner .results .option header"));
                        jQuery.each(u, function(a, b) {
                            var c = jQuery(b);
                            c.hasClass("active") ? a != f - 1 && c.click() : a == f - 1 && c.click()
                        })
                    }
                    x = f ? +f - 1 : 0, x >= pg.optimalResults.length && (x = 0), t = pg.optimalResults[x].legs || [], s = i18n.option + " " + (x + 1);
                    for (var v = 0; v < pg.optimalResults.length; ++v) r += "<autobusuData href=\"#map,,," + (v + 1) + "\"><span class=\"icon icon_narrow" + (v == x ? " icon_checked" : "") + "\"></span>" + i18n.option + " " + (v + 1) + "</autobusuData>"
                } else pg.mapShowAllStops = !0, t = [{
                    start_stop: ti.fGetAnyStopDetails(pg.inputStart),
                    finish_stop: ti.fGetAnyStopDetails(pg.inputFinish)
                }];
                var w;
                for (var x = 0; x <= t.length; ++x) {
                    var y, j, z, A;
                    x == t.length ? (y = t[x - 1], j = y.finish_stop, A = y.finish_time, typeof j.lat == "number" && typeof j.lng == "number" && (pg.mapMarkerFinish.setPosition(new google.maps.LatLng(j.latAvg || j.lat, j.lngAvg || j.lng)), pg.mapMarkerFinish.setMap(pg.GMap))) : (y = t[x], j = y.start_stop, typeof j.lat == "number" && typeof j.lng == "number" && (x == 0 && (pg.mapMarkerStart.setPosition(new google.maps.LatLng(j.latAvg || j.lat, j.lngAvg || j.lng)), pg.mapMarkerStart.setMap(pg.GMap))), A = y.start_time);
                    if (!j || !j.id) continue;
                    n > j.lat && (n = j.lat), p > j.lng && (p = j.lng), o < j.lat && (o = j.lat), q < j.lng && (q = j.lng);
                    var z = y.route || {},
                        B, C = w && z.num === w.num && z.transport === w.transport && z.city === w.city;
                    A = A && ti.printTime(A) + " " || "", j.id.indexOf(";") < 0 && (y.route ? B = pg.fUrlSet({
                        schedule: {
                            city: z.city,
                            transport: z.transport,
                            num: z.num,
                            dirType: z.dirType,
                            stopId: j.id,
                            tripNum: (y.trip_num || -1) + 1
                        }
                    }, !0) : j.id ? B = "stop/" + j.id + "/map" : B = "map", pg.mapStops[j.id] = {
                        lat: j.latAvg || j.lat,
                        lng: j.lngAvg || j.lng,
                        href: B,
                        info: j.info,
                        img: !z.transport && f && (x == 0 || x == t.length) ? "stopGray" : C ? "stop" : "stopOnRoute",
                        time: A,
                        name: j.name
                    });
                    if (!f || pg.optimalSearchRunning || !pg.optimalResults || !pg.optimalResults.length) continue;
                    C || j.id.indexOf(";") < 0 && x !== t.length && (z.transport || x == t.length - 1) && (pg.mapStops["transport" + j.id] = {
                        lat: j.latAvg || j.lat,
                        lng: j.lngAvg || j.lng,
                        href: B,
                        info: j.info,
                        img: "MarkerStart",
                        time: A,
                        name: i18n.stop.toLowerCase() + "&nbsp;" + j.name,
                        transport: z.transport || "walk",
                        num: z.numHTML || ""
                    });
                    if (x < t.length)
                        if (z.transport) {
                            var D = {};
                            D[z.dirType] = !0;
                            if (y.shape) {
                                var E = pg.getStyle("." + z.transport),
                                    F = [];
                                for (var G = 0; G < y.shape.length; ++G) F.push(new google.maps.LatLng(y.shape[G][0], y.shape[G][1]));
                                var H = new google.maps.Polyline({
                                    path: F,
                                    strokeColor: E && (E.backgroundColor || E.color) || "#0000FF",
                                    strokeOpacity: .8,
                                    strokeWeight: 5,
                                    clickable: !1,
                                    map: pg.GMap
                                });
                                pg.mapOverlays.push(H)
                            } else pg.loadPolyline(z.city, z.transport, z.num, D, y.start_stop.lat, y.start_stop.lng, y.finish_stop.lat, y.finish_stop.lng);
                            w = z;
                            if (!isNaN(y.start_pos) && !isNaN(y.finish_pos)) {
                                var I = typeof z.times === "string" ? ti.explodeTimes(z.times) : z.times,
                                    J = I.workdays.length;
                                I = I.times;
                                for (var K = y.start_pos; ++K < y.finish_pos;) {
                                    var j = ti.fGetStopDetails(z.stops[K]),
                                        B = pg.fUrlSet({
                                            schedule: {
                                                city: z.city,
                                                transport: z.transport,
                                                num: z.num,
                                                dirType: z.dirType,
                                                stopId: j.id,
                                                tripNum: (y.trip_num || -1) + 1
                                            }
                                        }, !0);
                                    pg.mapStops[j.id] = {
                                        lat: j.lat,
                                        lng: j.lng,
                                        href: B,
                                        img: "stop",
                                        name: ti.printTime(I[y.trip_num + K * J]) + " " + j.name
                                    }
                                }
                            }
                        } else if (pg.optimalResults) {
                            w = null;
                            var F = [];
                            if (y.shape && y.shape.length && y.shape.length > 1)
                                for (var G = 0; G < y.shape.length; ++G) {
                                    var L = ti.ENtoLatLng(y.shape[G][0], y.shape[G][1]);
                                    F.push(new google.maps.LatLng(L[0], L[1]))
                                } else F = [new google.maps.LatLng(y.start_stop.lat, y.start_stop.lng), new google.maps.LatLng(y.finish_stop.lat, y.finish_stop.lng)];
                            var H = new google.maps.Polyline({
                                path: F,
                                strokeOpacity: 0,
                                icons: [{
                                    icon: {
                                        path: "M 0,-0.5 0,0.5",
                                        strokeOpacity: .6,
                                        scale: 4
                                    },
                                    offset: "0",
                                    repeat: "10px"
                                }],
                                clickable: !1,
                                map: pg.GMap
                            });
                            pg.mapOverlays.push(H)
                        }
                }
            } else if (e) {
                if (pg.mapShowVehicles > 0 || f && pg.mapShowVehicles == -1) pg.fToggleVehicles(Math.abs(pg.mapShowVehicles)), pg.fShowVehicles();
                var M = ti.fGetRoutes(d, e, f, pg.schedule ? g : !1, !0),
                    D = {};
                if (M.length) {
                    var N = {};
                    for (var x = M.length; --x >= 0;) {
                        var z = M[x];
                        if (z.routeTag && z.dirType != g) continue;
                        D[z.dirType] = !g || z.dirType == g;
                        var O = "map," + z.city + "," + z.transport + "," + z.num + "," + z.dirType;
                        O = ti.toAscii(O, !0), r = "<autobusuData href=\"#" + O + "\"><span class=\"icon icon_narrow" + (z.dirType == g ? " icon_checked" : "") + "\"></span>" + z.name + "</autobusuData>" + r;
                        if (!D[z.dirType]) continue;
                        var F = [];
                        for (var v = z.stops.length; --v >= 0;) {
                            j = ti.fGetStopDetails(z.stops[v]);
                            if (!j.lat || !j.lng) continue;
                            i = new google.maps.LatLng(j.lat, j.lng), F.push(i);
                            var B = pg.fUrlSet({
                                schedule: {
                                    city: z.city,
                                    transport: z.transport,
                                    num: z.num,
                                    dirType: z.dirType,
                                    stopId: j.id
                                }
                            }, !0);
                            pg.mapStops[j.id] = {
                                lat: j.lat,
                                lng: j.lng,
                                href: B,
                                img: "stopOnRoute" + (!g && x ? "2" : ""),
                                name: j.name,
                                hidden: !0
                            }, N[j.name] = j.id, n > j.lat && (n = j.lat), p > j.lng && (p = j.lng), o < j.lat && (o = j.lat), q < j.lng && (q = j.lng), (x == 0 || g) && (v == 0 || v == z.stops.length - 1) && (pg.mapStops[v == 0 ? "MarkerStart" : "MarkerFinish"] = {
                                lat: j.lat,
                                lng: j.lng,
                                href: B,
                                img: v == 0 ? "MarkerStart" : "MarkerRed",
                                transport: e,
                                num: z.numHTML,
                                name: (v == 0 ? i18n.stop.toLowerCase() + "&nbsp;" : "") + j.name
                            })
                        }
                        if (cfg.defaultCity === "latvia" && z.stops) {
                            var P = "http://routelatvia.azurewebsites.net/?shape=" + z.stops.join(",");
                            P = "http://www.stops.lt/latviatest/proxy.php?url=" + encodeURIComponent(P), ti.fDownloadUrl("get", P, function(a) {
                                var b = JSON.parse(a);
                                b.contents && (b = b.contents), b = b.split(",");
                                var c = [];
                                for (var d = 0; d < b.length; d += 2) {
                                    var f = new GLatLng(parseFloat(b[d]), parseFloat(b[d + 1]));
                                    c.push(f)
                                }
                                if (c.length > 1) {
                                    var g = pg.getStyle("." + e),
                                        h = d > 0 ? .6 : .8,
                                        i = g && g.backgroundColor || "#0000FF",
                                        j = 5,
                                        k = new GPolyline(c, i, j, h);
                                    pg.GMap.addOverlay(k), pg.mapOverlays.push(k)
                                }
                            }, !0)
                        }
                    }
                    for (var Q in N) pg.mapStops[N[Q]].hidden = !1;
                    M.length > 1 && (O = "map," + z.city + "," + z.transport + "," + z.num, r = "<autobusuData href=\"#" + O + "\"><span class=\"icon icon_narrow" + (g ? "" : " icon_checked") + "\"></span>" + i18n.mapShowAllDirections + "</autobusuData>" + r);
                    var R = pg.getStyle("transport_icon_" + e);
                    s = "<img class=\"icon icon_narrow\" src=\"" + R + "\"/><span class=\"transfer" + e + "\">&nbsp;" + M[0].numHTML + "</span>";
                    if (cfg.defaultCity !== "latvia")
                        if (cfg.defaultCity === "helsinki") {
                            var E = pg.getStyle("." + e),
                                S = x > 0 ? .6 : .8,
                                T = E && E.backgroundColor || "#0000FF",
                                U = 5,
                                H = new GPolyline(F, T, U, S);
                            pg.GMap.addOverlay(H), pg.mapOverlays.push(H)
                        } else pg.loadPolyline(d, e, f, D)
                }
            }
            pg.$mapRoutesDropdown && (r ? (r = "<div id=\"mapDropDownHeader\" style=\"float:left;\"><autobusuData href=\"#\" aria-haspopup=\"true\">" + s + "&nbsp;<span class=\"arrow-down\"></span><span id=\"mapRemoveRoute\"></span><!--[if gte IE 7]><!--></autobusuData><!--<![endif]--><div id=\"mapDropDownContent\" class=\"dropdown2\">" + r + "<autobusuData id=\"mapShowStopsNames\" href=\"#map\" style=\"border-top:solid 1px #CCCCCC; margin-top:3px;\"><span class=\"icon icon_narrow stopsnames" + (pg.mapShowStopsNames ? " icon_checked" : "") + "\"></span>" + i18n.mapShowRouteStopsNames + "</autobusuData>" + (pg.schedule && typeof mobile == "undefined" ? "" : "<autobusuData href=\"#map\"><span class=\"icon icon_narrow\"></span>" + i18n.mapClearRoute + "</autobusuData>") + "</div><!--[if lte IE 6]></autobusuData><![endif]--></div>", pg.$mapRoutesDropdown.innerHTML = r, pg.$mapRoutesDropdown.style.display = "", resizeDropDown()) : pg.$mapRoutesDropdown.style.display = "none"), f && pg.clusterManager.hideMarkers(), f && google.maps.event.addDomListenerOnce(pg.GMap, "resize", function() {
                if (n == o && p == q) pg.GMap.panTo(new google.maps.LatLng(n, p));
                else {
                    var a = new google.maps.LatLngBounds(new google.maps.LatLng(n, p), new google.maps.LatLng(o, q));
                    pg.GMap.fitBounds(a), pg.clusterManager.refresh()
                }
            })
        }
        if (!f) {
            pg.$mapRoutesDropdown && (pg.$mapRoutesDropdown.style.display = "none"), pg.transport !== "plan" && (pg.mapMarkerStart.setMap(null), pg.mapMarkerFinish.setMap(null), pg.mapStops = {});
            while (pg.mapOverlays.length) pg.mapOverlays.pop().setMap(null);
            pg.map = {}, pg.clusterManager.draw(), h && j && j.id && typeof j.lat == "number" && typeof j.lng == "number" ? (pg.mapStops[h] = {
                lat: j.latAvg,
                lng: j.lngAvg,
                href: "stop/" + h,
                info: j.info,
                img: "stopOnRoute",
                name: j.name
            }, i = new google.maps.LatLng(j.lat, j.lng)) : i = null, i ? window.setTimeout(function() {
                pg.GMap.panTo(i)
            }, 300) : pg.clusterManager.refresh()
        }
        setTimeout(function() {
            google.maps.event.trigger(pg.GMap, "resize")
        }, 300)
    } else pg.GMap === null ? (pg.GMap = !1, $("divMap").innerHTML = "<div style=\"margin:10px;\">" + i18n.loadingMap + "</div>", ($("preload") || {}).innerHTML = "<img src=\"" + pg.imagesFolder + "stop.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "cluster.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" /><img src=\"" + pg.imagesFolder + "stopGray.png\" width=\"1\" height=\"1\" />", pg.loadGoogleMapsScript(pg.GMapScriptLoadedMap)) : pg.GMap !== !1 && pg.GMapScriptLoadedMap()
}, pg.GMapScriptLoadedMap = function() {
    if (!google) {
        alert("Sorry, the Google Maps API is not compatible with this browser");
        return !1
    }
    if (typeof ti.stops !== "object" || typeof ti.routes !== "object") setTimeout(pg.GMapScriptLoadedMap, 200);
    else {
        pg.storeStyles(), pg.GMap = 0;
        if ((document.body.className || "").indexOf("Map") < 0) return;
        var a, b = cfg.cities[pg.city] || {};
        b.streetMap = b.streetMap || "GMaps";
        var c = pg.urlLoaded.indexOf("mylocation") != -1 && gps ? [gps.lat, gps.lng] : [b.lat || 59.43923, b.lng || 24.7588],
            d = {
                zoom: b.zoom || 12,
                center: new google.maps.LatLng(c[0], c[1]),
                scaleControl: !0,
                panControl: !1,
                mapTypeControl: !0,
                mapTypeControlOptions: {
                    position: cfg.defaultCity === "tallinna-linn" && typeof mobile == "undefined" ? google.maps.ControlPosition.TOP_LEFT : google.maps.ControlPosition.RIGHT_BOTTOM,
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR
                },
                streetViewControl: !0,
                streetViewControlOptions: {
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                zoomControl: !0,
                zoomControlOptions: {
                    style: google.maps.ZoomControlStyle.DEFAULT,
                    position: google.maps.ControlPosition.LEFT_BOTTOM
                },
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    featureType: "poi",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }, {
                    featureType: "transit",
                    elementType: "labels",
                    stylers: [{
                        visibility: "off"
                    }]
                }]
            };
        v3.mapTypeIds = [];
        for (var e in google.maps.MapTypeId) v3.mapTypeIds.push(google.maps.MapTypeId[e]);
        b.streetMap.indexOf("OSM") >= 0 && (v3.mapTypeIds.push("OSM"), d.mapTypeControlOptions.mapTypeIds = v3.mapTypeIds, d.mapTypeId = "OSM"), google.maps.Map.prototype.panToWithOffset = function(a, b, c) {
            var d = this,
                e = new google.maps.OverlayView;
            e.onAdd = function() {
                var e = this.getProjection(),
                    f = e.fromLatLngToContainerPixel(a);
                f.x = f.x + b, f.y = f.y + c, d.panTo(e.fromContainerPixelToLatLng(f))
            }, e.draw = function() {}, e.setMap(this)
        };
        var f = pg.GMap = new google.maps.Map($("divMap"), d);
        b.streetMap.indexOf("OSM") >= 0 && f.mapTypes.set("OSM", new google.maps.ImageMapType({
            getTileUrl: function(a, b) {
                return "http://tile.openstreetmap.org/" + b + "/" + a.x + "/" + a.y + ".png"
            },
            tileSize: new google.maps.Size(256, 256),
            name: "OpenStreetMap",
            maxZoom: 18
        })), v3.setMap(f);
        if (b.streetMap != "OSMlocal") {
            var g;
            cfg.isMobilePage && (pg.mapShowVehicles = 2)
        }
        typeof mobile != "undefined" && (pg.$mapClose = document.createElement("div"), pg.$mapClose.id = "divMapHide", pg.$mapClose.className = "map_hide", pg.$mapClose.style.left = "5px", pg.$mapClose.style.top = "5px", pg.$mapClose.innerHTML = ["<autobusuData onclick=\"return true;\" alt=\"", i18n.btnBack, "\" title=\"", i18n.btnBack, "\" class=\"btn btn-back pull-left\"></autobusuData>"].join(""), f.getDiv().appendChild(pg.$mapClose), jq(pg.$mapClose).bind("click", function(a) {
            pg.divMapHide_Click(a)
        }));
        var h = typeof mobile == "undefined" ? 30 : 0,
            j = 48;
        pg.$mapRoutesDropdown = document.createElement("div"), pg.$mapRoutesDropdown.id = "mapDropDown", pg.$mapRoutesDropdown.className = "dropdown", pg.$mapRoutesDropdown.style.display = "none", f.getDiv().appendChild(pg.$mapRoutesDropdown), pg.$mapShowAllStops = document.createElement("div"), pg.$mapShowAllStops.id = "divMapShowAllStops", pg.$mapShowAllStops.style.right = "0", pg.$mapShowAllStops.style.top = h + "px", h += j, pg.$mapShowAllStops.className = "map_button", pg.$mapShowAllStops.innerHTML = "<div id=\"mapShowAllStops\" class=\"map_button_icon\" title=\"" + i18n.mapShowAllStops + "\"></div>", f.getDiv().appendChild(pg.$mapShowAllStops), typeof pg.mapShowAllStops == "undefined" && (pg.mapShowAllStops = !1), cfg.city.showWifiStops && (pg.$mapShowWifiStops = document.createElement("div"), pg.$mapShowWifiStops.id = "divMapShowWifiStops", pg.$mapShowWifiStops.style.right = "0", pg.$mapShowWifiStops.style.top = h + "px", h += j, pg.$mapShowWifiStops.className = "map_button", pg.$mapShowWifiStops.innerHTML = "<div id=\"mapShowWifiStops\" class=\"map_button_icon\" title=\"" + i18n.mapShowWifiStops + "\"></div>", f.getDiv().appendChild(pg.$mapShowWifiStops), pg.$mapShowWifiStops = !1), cfg.city.bicycles && (pg.$mapShowBicyclesRent = document.createElement("div"), pg.$mapShowBicyclesRent.id = "divMapShowBicyclesRent", pg.$mapShowBicyclesRent.style.right = "0", pg.$mapShowBicyclesRent.style.top = h + "px", h += j, pg.$mapShowBicyclesRent.className = "map_button", pg.$mapShowBicyclesRent.innerHTML = "<div id=\"mapShowBicyclesRent\" class=\"map_button_icon\" title=\"" + i18n.mapShowBicyclesRent + "\"></div>", f.getDiv().appendChild(pg.$mapShowBicyclesRent), pg.mapShowBicyclesRent = !1), b.streetMap != "OSMlocal" && (cfg.city.showTraffic && (pg.$mapShowTraffic = document.createElement("div"), pg.$mapShowTraffic.id = "divMapShowTraffic", pg.$mapShowTraffic.style.right = "0", pg.$mapShowTraffic.style.top = h + "px", h += j, pg.$mapShowTraffic.className = "map_button", pg.$mapShowTraffic.innerHTML = "<div id=\"mapShowTraffic\" class=\"map_button_icon\" title=\"" + i18n.mapShowTraffic + "\"></div>", f.getDiv().appendChild(pg.$mapShowTraffic)), cfg.city.urlGPS && (pg.$mapShowVehicles = document.createElement("div"), pg.$mapShowVehicles.id = "divMapShowVehicles", pg.$mapShowVehicles.style.right = "0", pg.$mapShowVehicles.style.top = h + "px", h += j, pg.$mapShowVehicles.className = "map_button", pg.$mapShowVehicles.innerHTML = "<div id=\"mapShowVehicles\" class=\"map_button_icon\" title=\"" + i18n.mapShowVehicles + "\"></div>", f.getDiv().appendChild(pg.$mapShowVehicles), jq(pg.$mapShowVehicles).bind("click", function(a) {
            pg.mapShowVehicles > 0 ? pg.hashForMap == "map" ? pg.fToggleVehicles(-1) : pg.fToggleVehicles(0) : pg.hashForMap == "map" ? pg.fToggleVehicles(2) : pg.fToggleVehicles(1);
            return pg.cancelEvent(a)
        }))), pg.$mapMenu = document.createElement("div"), pg.$mapMenu.style.display = "none", pg.$mapMenu.style.position = "absolute", pg.$mapMenu.style.zIndex = 1e3, pg.$mapMenu.className = "mapMenu", f.getDiv().appendChild(pg.$mapMenu), pg.mapShowTraffic && pg.fShowTraffic(!0), pg.mapShowVehicles > 0 && pg.fToggleVehicles(pg.mapShowVehicles);
        var k;
        google.maps.event.addDomListener(f, "rightclick", function(a) {
            k = null, $("divSuggestedStops").style.display = "none", a || (a = window.event);
            var b = a && (a.target || a.srcElement);
            if (!b || b.className == "map_button") return pg.cancelEvent(a);
            var c = b && (b.tagName || "").toLowerCase() || "";
            b && c !== "autobusuData" && c !== "img" && (b = b.parentNode, c = b && (b.tagName || "").toLowerCase() || "");
            var d = b && (c === "autobusuData" && b.href || c === "img" && b.id || "") || "";
            if (b && b.parentNode && (b.parentNode.tagName || "").toLowerCase() == "td") return pg.cancelEvent(a);
            if (d && d.indexOf("#") >= d.length - 1) return pg.cancelEvent(a);
            d ? k = b : k = {}
        });
        var l = f.getStreetView();
        google.maps.event.addListener(l, "visible_changed", function() {
            var a = ["divMapShowAllStops", "divMapShowWifiStops", "divMapShowBicyclesRent", "divMapShowTraffic", "divMapShowVehicles", "divMapYouAreHere"],
                b = l.getVisible() ? "none" : "block";
            pg.$mapRoutesDropdown.style.visibility = l.getVisible() ? "hidden" : "visible";
            for (var c = 0; c < a.length; ++c)($(a[c]) || {
                style: {}
            }).style.display = b
        });
        var m = function(a) {
            var b = a.pixel.x,
                c = a.pixel.y,
                d = Math.round(1e6 * a.latLng.lat()) / 1e6 + ";" + Math.round(1e6 * a.latLng.lng()) / 1e6;
            pg.openMapInfoWindow(b, c, "", "", d, a.latLng)
        };
        google.maps.event.addListener(f, "rightclick", m), cfg.defaultCity === "tallinna-linn" && typeof mobile == "undefined" && google.maps.event.addListener(f, "click", function(a) {
            jQuery(pg.$mapMenu).is(":visible") ? pg.hideMapInfoWindow() : m(a)
        });

        function n(a, b) {
            this.length_ = b;
            var c = this;
            c.map_ = a, c.timeoutId_ = null, google.maps.event.addListener(a, "mousedown", function(a) {
                c.onMouseDown_(a)
            }), google.maps.event.addListener(a, "mouseup", function(a) {
                c.onMouseUp_(a)
            }), google.maps.event.addListener(a, "drag", function(a) {
                c.onMapDrag_(a)
            })
        }
        n.prototype.onMouseUp_ = function(a) {
            clearTimeout(this.timeoutId_)
        }, n.prototype.onMouseDown_ = function(a) {
            pg.hideMapInfoWindow(), clearTimeout(this.timeoutId_);
            var b = this.map_,
                c = a;
            this.timeoutId_ = setTimeout(function() {
                google.maps.event.trigger(b, "longpress", c)
            }, this.length_)
        }, n.prototype.onMapDrag_ = function(a) {
            pg.hideMapInfoWindow(), clearTimeout(this.timeoutId_)
        };
        if (cfg.defaultCity !== "tallinna-linn" || typeof mobile != "undefined") new n(f, 500), google.maps.event.addListener(f, "longpress", m);
        google.maps.event.addListenerOnce(f, "idle", function() {
            typeof jQuery == "function" && jQuery(window).trigger("resize")
        }), google.maps.event.addDomListener(f.getDiv(), "click", function(a) {
            pg.timeOfActivity = (new Date).getTime(), pg.inputSuggestedStops_Blur(), a = a || window.event;
            var b = a && (a.target || a.srcElement);
            pg.realTimeDepartures.vehicleID = b && b.getAttribute && b.getAttribute("data-vehicle-id");
            if (pg.realTimeDepartures.vehicleID) {
                pg.realTimeDepartures.mapStop = "", pg.realTimeDepartures.vehicleTransport = b.getAttribute("data-transport"), pg.realTimeDepartures.vehicleRouteNum = b.getAttribute("data-route"), pg.realTimeDepartures.$mapPopup = {}, pg.fProcessVehicleDepartures();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowTraffic") {
                pg.fShowTraffic(!pg.mapShowTraffic);
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowVehicles") {
                pg.mapShowVehicles > 0 ? pg.hashForMap == "map" ? pg.fToggleVehicles(-1) : pg.fToggleVehicles(0) : pg.hashForMap == "map" ? pg.fToggleVehicles(2) : pg.fToggleVehicles(1);
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowAllStops") {
                pg.mapShowAllStops = !pg.mapShowAllStops, pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowBicyclesRent") {
                pg.mapShowBicyclesRent = !pg.mapShowBicyclesRent, pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowWifiStops") {
                pg.mapShowWifiStops = !pg.mapShowWifiStops, pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            if (b.id == "mapShowStopsNames") {
                pg.mapShowStopsNames = !pg.mapShowStopsNames;
                var c = pg.$mapRoutesDropdown.innerHTML.replace("stopsnames icon_checked", "stopsnames");
                pg.$mapRoutesDropdown.innerHTML = pg.mapShowStopsNames ? c.replace("stopsnames", "stopsnames icon_checked") : c, pg.clusterManager.refresh();
                return pg.cancelEvent(a)
            }
            var d = b && (b.tagName || "").toLowerCase() || "",
                e, f = "";
            b && b.id == "mapRemoveRoute" ? (e = "#map", (pg.mapShowVehicles < 0 || pg.mapShowVehicles == 1) && pg.fToggleVehicles(-Math.abs(pg.mapShowVehicles))) : (b && d !== "a" && d !== "img" && (b = b.parentNode), e = b && (d === "a" && b.href || d === "img" && b.id || "") || "", f = b.id);
            if (e.indexOf("#") < 0 || e.indexOf("#") >= e.length - 1) return pg.cancelEvent(a);
            var g = pg.fUrlParse(e);
            if (g.schedule && d !== "img" && f != "specialstop") e = pg.fUrlSet({
                schedule: g.schedule
            });
            else if (g.transport == "stop" || g.schedule) {
                var h = g.schedule && g.schedule.stopId || g.inputStop;
                if ((b.className || "").toLowerCase().indexOf("cluster") < 0)
                    if (d === "img" || f == "specialstop") {
                        if (h) {
                            var i = a.clientX,
                                j = a.clientY;
                            typeof mobile == "undefined" && (i -= $("divMapWrapper").offsetLeft, j -= $("divContainer").offsetTop);
                            var k = v3.findClosestCluster({
                                    x: i,
                                    y: j
                                }, h.split(",")),
                                h = k.cluster.join(",");
                            pg.realTimeDepartures.mapStop = h, pg.realTimeDepartures.vehicleID = null;
                            var l = [];
                            h.indexOf(";") == -1 && l.push("<br/><autobusuData href=\"#stop/" + h + (cfg.isMobilePage ? "" : "/map") + "\"><span class=\"icon icon_narrow\"></span>" + i18n.mapShowRoutesFromStop + "</autobusuData>"), l.push("<autobusuData href=\"#stop/" + h + "/map\" class=\"cluster\"><span class=\"icon icon_narrow\"></span>" + i18n.mapZoomIn + "</autobusuData>");
                            var m = ti.fGetRoutesAtStop(h, !1, !0),
                                c = [],
                                n = null,
                                o = 16,
                                p = 1,
                                q = null;
                            for (var r = 0; r < m.length; r++) {
                                route = m[r], n != route.transport && (n != null && c.push("<br/>"), n = route.transport, c.push("<span class=\"icon icon_narrow icon_" + route.transport + "\"></span>"), p = 1, q = null);
                                var s = {
                                    id: route.id,
                                    city: route.city,
                                    transport: route.transport,
                                    num: ti.toAscii(route.num, !0),
                                    dirType: route.dirType,
                                    routeTag: route.stopId,
                                    stopId: route.stopId
                                };
                                if (s.num === q) continue;
                                q = s.num;
                                var t = pg.fUrlSet({
                                        schedule: s
                                    }, !0),
                                    u = "<autobusuData class=\"hover " + (cfg.defaultCity == "riga" ? "activetransfer " : "transfer") + route.transport + "\" href=\"#" + t + "\" title=\"" + (route.name || "").replace(/"/g, "") + "\">" + route.numHTML.replace(/\s/g, "&nbsp;") + "</autobusuData> ";
                                c.push(u), p % o || c.push("<br/><span style=\"margin-left:22px;\"></span>"), p += 1
                            }
                            var v = ti.fGetAnyStopDetails(h),
                                w = v.name,
                                x = [c.join(""), l.join("")].join("");
                            pg.openMapInfoWindow(k.point.x, k.point.y, w, x, h, new google.maps.LatLng(v.latAvg, v.lngAvg))
                        }
                    } else g.transport == "stop" && (pg.hashForMap = cfg.isMobilePage ? "" : "map", pg.map = {}, pg.fTabStop_Click(g.inputStop));
                else {
                    var y = h.split(","),
                        z = new google.maps.LatLngBounds;
                    for (var A = 0; A < y.length; A++) {
                        var B = ti.fGetStopDetails(y[A]);
                        B.lat && B.lng && z.extend(new google.maps.LatLng(B.lat, B.lng))
                    }
                    pg.GMap.fitBounds(z)
                }
            } else g.transport == "plan" ? (pg.hashForMap = g.hashForMap, pg.map = {}, pg.optimalResults = null, pg.fTabPlanner_Click(g.inputStart, g.inputFinish)) : (pg.hashForMap = g.hashForMap, pg.hashForMap == "map" && (pg.mapShowAllStops = !0), typeof mobile != "unknown" && (pg.schedule = null), cfg.defaultCity == "tallinna-linn" && g.hashForMap == "map" && (pg.inputStart = "", pg.inputStop = "", pg.inputFinish = ""), pg.fUrlSet(pg));
            return pg.cancelEvent(a)
        }), google.maps.event.addDomListener(f.getDiv(), "mouseout", function(a) {
            a || (a = window.event);
            var b = a && (a.target || a.srcElement),
                c = f.getDiv();
            b && b == c, b = a.relatedTarget || a.toElement;
            while (b && (b.tagName || "").toLowerCase() != "body") {
                if (b === c) return;
                b = b.parentNode
            }
        }), ELabel = function(a, b, c, d, e, f, g, h) {
            this.div_ = null, this.map_ = a, this.point = b, this.html = c, this.href = d, this.classname = e || "", this.pixelOffset = f || new google.maps.Size(0, 0), g && (g < 0 && (g = 0), g > 100 && (g = 100)), this.percentOpacity = g, this.overlap = h || !1, this.hidden = !1, this._ready = !1
        }, ELabel.prototype = new google.maps.OverlayView, ELabel.prototype.onAdd = function() {
            var a = document.createElement("autobusuData");
            a.style.position = "absolute", a.className = this.classname, a.href = "#" + this.href, this.div_ = a, this.percentOpacity && (typeof a.style.filter == "string" && (a.style.filter = "alpha(opacity:" + this.percentOpacity + ")"), typeof a.style.KHTMLOpacity == "string" && (a.style.KHTMLOpacity = this.percentOpacity / 100), typeof a.style.MozOpacity == "string" && (a.style.MozOpacity = this.percentOpacity / 100), typeof a.style.opacity == "string" && (a.style.opacity = this.percentOpacity / 100));
            if (this.overlap) {
                var b = 1e3 * (90 - this.point.lat());
                this.div_.style.zIndex = parseInt(b)
            }
            this.hidden && this.hide();
            var c = this.getPanes();
            c.overlayMouseTarget.style.zIndex = 102, c.overlayMouseTarget.appendChild(a), this._ready = !0
        }, ELabel.prototype.onRemove = function() {
            this.div_.parentNode.removeChild(this.div_)
        }, ELabel.prototype.draw = function(a) {
            var b = this.getProjection(),
                c = b.fromLatLngToDivPixel(this.point),
                d = parseInt(this.div_.clientHeight);
            this.div_.style.left = c.x + this.pixelOffset.width + "px", this.div_.style.top = c.y + this.pixelOffset.height - d + "px"
        }, ELabel.prototype.show = function() {
            this.div_ && (this.div_.style.display = "", this.draw()), this.hidden = !1
        }, ELabel.prototype.hide = function() {
            this.div_ && (this.div_.style.display = "none"), this.hidden = !0
        }, ELabel.prototype.copy = function() {
            return new ELabel(this.point, this.html, this.classname, this.pixelOffset, this.percentOpacity, this.overlap)
        }, ELabel.prototype.isHidden = function() {
            return this.hidden
        }, ELabel.prototype.supportsHide = function() {
            return !0
        }, ELabel.prototype.setContents = function(a, b) {
            this.div_.innerHTML = this.html = a, typeof b != "undefined" && (this.div_.href = "#" + b), this.draw(!0)
        }, ELabel.prototype.setPoint = function(a) {
            this.point = a;
            if (this.overlap) {
                var b = GOverlay.getZIndex(this.point.lat());
                this.div_.style.zIndex = b
            }
            this.draw(!0)
        }, ELabel.prototype.setOpacity = function(a) {
            a && (a < 0 && (a = 0), a > 100 && (a = 100)), this.percentOpacity = a, this.percentOpacity && (typeof this.div_.style.filter == "string" && (this.div_.style.filter = "alpha(opacity:" + this.percentOpacity + ")"), typeof this.div_.style.KHTMLOpacity == "string" && (this.div_.style.KHTMLOpacity = this.percentOpacity / 100), typeof this.div_.style.MozOpacity == "string" && (this.div_.style.MozOpacity = this.percentOpacity / 100), typeof this.div_.style.opacity == "string" && (this.div_.style.opacity = this.percentOpacity / 100))
        }, ELabel.prototype.getPoint = function() {
            return this.point
        }, ClusterManager = function(a, b) {
            this._map = a, this._mapMarkers = [], this._markersHidden = !1, this._ready = !1, this.stopCluster = {}, b = b || {}, this.fitMapToMarkers = b.fitMapToMarkers === !0, b.fitMapMaxZoom && (this.fitMapMaxZoom = b.fitMapMaxZoom), this.clusterMaxZoom = b.clusterMaxZoom ? b.clusterMaxZoom : 99, b.markers && (this._mapMarkers = b.markers), this.borderPadding = b.borderPadding || 256, this.intersectPadding = b.intersectPadding || 0, this.clusteringEnabled = b.clusteringEnabled !== !1, this.ZoomLevel = this._map.getZoom()
        }, ClusterManager.prototype = new google.maps.OverlayView, ClusterManager.prototype.onAdd = function() {
            typeof this._div == "undefined" && (this._div = document.createElement("div"), this._div.id = "ClusterManagerStopsPane", this.getPanes().overlayMouseTarget.style.zIndex = 103, this.getPanes().overlayMouseTarget.appendChild(this._div));
            var a = this._mapMarkers;
            for (var b = a.length; --b >= 0;) {
                var c = a[b],
                    d = v3.fromLatLngToDivPixel(new google.maps.LatLng(c.lat, c.lng), 19);
                c._x = d.x, c._y = d.y
            }
            a.sort(function(a, b) {
                return b._y - a._y
            }), this._mapMarkers = a, this._ready = !0
        }, ClusterManager.prototype.showLayer = function() {
            this._div && (this._div.style.display = "block")
        }, ClusterManager.prototype.hideLayer = function() {
            this._div && (this._div.style.display = "none")
        }, ClusterManager.prototype.refresh = function() {
            if (this._ready) {
                pg.timeOfActivity = (new Date).getTime(), pg.toggleClass($("divMapShowAllStops"), "pressed", pg.mapShowAllStops), pg.toggleClass($("divMapShowWifiStops"), "pressed", pg.mapShowWifiStops), pg.toggleClass($("divMapShowBicyclesRent"), "pressed", pg.mapShowBicyclesRent);
                var a = this._markersHidden ? "Gray" : "",
                    b = this._map,
                    c = this.getProjection(),
                    d = [],
                    e = v3.fromLatLngToDivPixel(this._map.getBounds().getSouthWest(), 19),
                    f = v3.fromLatLngToDivPixel(this._map.getBounds().getNorthEast(), 19),
                    g = this._mapMarkers,
                    h = pg.mapStops,
                    j, k, l, m = {};
                this.stopCluster = {};
                if (pg.mapShowAllStops || pg.mapShowWifiStops) {
                    var n = 19 - this._map.getZoom(),
                        o = 1 << n + 8,
                        p = e.x - o,
                        q = f.x + o,
                        s = e.y + o,
                        t = f.y - o,
                        u = cfg.defaultCity === "xxxkautra" ? 1 : 12,
                        v = this._map.getZoom(),
                        w = this.clusteringEnabled && v <= this.clusterMaxZoom,
                        x = cfg.defaultCity === "vilnius" && pg.transport === "stop";
                    o = 1 << n + 3 + (v < 12 ? 1 : 0);
                    for (i = g.length; --i >= 0;) {
                        j = g[i];
                        var y = j._y;
                        if (y < t || !j.name || j.id == "gps") continue;
                        if (y > s) break;
                        var z = j._x;
                        if (z >= p && z <= q) {
                            if (j.id in m) continue;
                            var A = z,
                                B = y,
                                C = [],
                                D, E = [],
                                F = 1,
                                G = j.rideEnd - j.rideStart,
                                H = (j.info || "").indexOf("wifi") >= 0;
                            if (!H && !pg.mapShowAllStops) continue;
                            if (w) {
                                var I = h[j.id],
                                    J = j.name;
                                J.length > 1 && !isNaN(J.charAt(J.length - 1)) && (J = J.substring(0, J.length - 1));
                                for (var K = i; --K >= 0;) {
                                    var L = g[K];
                                    if (L._y > B + o) break;
                                    if (L.id in m) continue;
                                    var M = (L.info || "").indexOf("wifi") >= 0;
                                    if (!M && !pg.mapShowAllStops) continue;
                                    L._x <= A + o && L._x >= A - o && (v < u || L.name.indexOf(J) == 0) && (I = I || h[L.id], m[L.id] = !0, C.push(L.id), E.push(L.name), H = H || M, G < j.rideEnd - j.rideStart && L.time < 4320 && (G = j.rideEnd - j.rideStart), F++, A = (z += L._x) / F, B = (y += L._y) / F)
                                }
                            }
                            if (I) continue;
                            C.push(j.id);
                            if (F > 1) {
                                r = v3.fromDivPixelToLatLng(new google.maps.Point(A, B), 19), k = c.fromLatLngToDivPixel(r), cfg.isMobilePage && (k.x = k.x - v3.iconClickField, k.y = k.y - v3.iconClickField), F = 1;
                                if (v < 12) {
                                    E.sort();
                                    for (var K = E.length; --K > 0;) E[K] != E[K - 1] && ++F;
                                    D = F > 2 ? i18n.totalStops + ": " + F : (E[0] + (F > 1 ? ", " + E[E.length - 1] : "")).replace(/"/g, "")
                                } else D = J.replace(/"/g, "")
                            } else D = (j.name || "").replace(/"/g, ""), k = c.fromLatLngToDivPixel(new google.maps.LatLng(j.lat, j.lng));
                            cfg.isMobilePage && (k.x = k.x - v3.iconClickField, k.y = k.y - v3.iconClickField), x && G >= 0 && (a = G <= 30 ? "30" : G <= 60 ? "60" : "", D = D + ", " + i18n.ride + " " + G + " " + i18n.minutesShort);
                            var N = "<img id=\"#stop/" + C.join(",") + "/map\" style=\"cursor:pointer; vertical-align:top; position:absolute;";
                            if (F > 1) {
                                for (var O = 0; O < C.length; O++) this.stopCluster[C[O]] = C;
                                N += " width:9px; height:9px; top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" class=\"cluster\" src=\"" + pg.imagesFolder + "cluster" + a + ".png\" title=\"" + D + "\" />"
                            } else {
                                this.stopCluster[j.id] = [j.id], H && !pg.mapShowWifiStops && (H = !1), H && (N += " width:16px; height:17px; top:" + (k.y - 13) + "px; left:" + (k.x - 8) + "px;\" src=\"" + pg.imagesFolder + "stop_wifi.png\" title=\"" + D + "\" />" + (a ? N : ""));
                                if (!a && D == "Stotis" && j.id.length > 4) N = (H ? N : "") + "<autobusuData id=\"specialstop\" href=\"#stop/" + C.join(",") + "/map\" style=\"display:block; cursor:pointer;border-radius:50%; border: 1px solid black; text-align: center; font-weight:bold; line-height: 12px; background-color:yellow;z-index:999; width:12px; height:12px; position:absolute; top:" + (k.y - 6) + "px; left:" + (k.x - 6) + "px;\">" + j.id.slice(-1).toUpperCase() + "</autobusuData>";
                                else if (!H || a) N += " width:8px; height:8px; top:" + (k.y - 4) + "px; left:" + (k.x - 4) + "px;\" src=\"" + pg.imagesFolder + "stop" + a + ".png\" title=\"" + D + "\" />"
                            }
                            d.push(N)
                        }
                    }
                }
                pg.mapLabelHeight = pg.mapLabelHeight || parseInt(pg.stopLabelSelected.div_.clientHeight, 10);
                for (l in h) {
                    j = h[l], k = c.fromLatLngToDivPixel(new google.maps.LatLng(j.lat, j.lng)), cfg.isMobilePage && (k.x = k.x - v3.iconClickField, k.y = k.y - v3.iconClickField);
                    var D = pg.browserVersion < 7 && (!pg.mapShowStopsNames || j.hidden) ? " title=\"" + j.name.replace(/"/g, "") + "\"" : "",
                        P = "";
                    if (j.img == "MarkerStart") {
                        var Q = pg.getStyle("transport_icon_" + j.transport);
                        cfg.isMobilePage && (k.x = k.x + v3.iconClickField, k.y = k.y + v3.iconClickField), d.push("<autobusuData href=\"#" + j.href + "\" class=\"label_transport\" style=\"position:absolute; left:" + (k.x + 11) + "px; top:" + (k.y - 29) + "px;\"><img class=\"icon_narrow\" src=\"" + Q + "\" />" + (j.num && "<span class=\"transfer" + j.transport + "\" style=\"line-height:18px; vertical-align:top;\">" + j.num + "</span>&nbsp;") + (j.time ? "<span style=\"line-height:18px; vertical-align:top; border:0 none;\">&nbsp;" + j.time + "&nbsp;</span>" : "") + "<span" + (pg.mapShowStopsNames ? "" : " class=\"unhide\"") + " style=\"line-height:18px; vertical-align:top; border:0 none;\">" + j.name + "&nbsp;</span></autobusuData><img src=\"" + pg.imagesFolder + "tip.png\" class=\"tip\" style=\"position:absolute; z-index:105; left:" + (k.x + 4) + "px; top:" + (k.y - 11) + "px;\" />")
                    } else j.img == "MarkerRed" ? d.push("<autobusuData class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 6) + "px; top:" + (k.y - 20) + "px;\">") : (j.img || "").indexOf("stopOnRoute") < 0 ? j.img && d.push("<autobusuData class=\"mapStop\" href=\"#" + j.href + "/map\" style=\"position:absolute; left:" + (k.x - 4) + "px; top:" + (k.y - 4) + "px;\">") : d.push("<autobusuData class=\"mapStopOnRoute\" href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x - 5) + "px; top:" + (k.y - 5) + "px;\">");
                    j.img != "MarkerStart" && (d.push("<img id=\"#" + j.href + "/map\" src=\"" + pg.imagesFolder + j.img + ".png\"" + D + " style=\"vertical-align:top;\" /></autobusuData>"), D || (cfg.isMobilePage && (k.x = k.x + v3.iconClickField, k.y = k.y + v3.iconClickField), d.push("<autobusuData href=\"#" + j.href + "\" style=\"position:absolute; left:" + (k.x + 4) + "px; top:" + (k.y - 4 - pg.mapLabelHeight) + "px;\" class=\"mapStopName" + (pg.mapShowStopsNames && !j.hidden ? "" : "Hidden") + "\">" + (j.time && j.img == "stop" ? j.time : "") + j.name + "</autobusuData>")))
                }
                if (cfg.city.bicycles && pg.mapShowBicyclesRent) {
                    var R = v <= 12 ? 12 : 16;
                    for (l = 0; l < cfg.city.bicycles.length; ++l) {
                        j = cfg.city.bicycles[l], k = c.fromLatLngToDivPixel(new google.maps.LatLng(j.lat, j.lng));
                        var D = " title=\"" + j.name.replace(/"/g, "") + "\"",
                            N = "<img style=\"vertical-align:top; position:absolute; width:" + R + "px; height:" + R + "px; top:" + (k.y - R / 2) + "px; left:" + (k.x - R / 2) + "px; z-index: -1;\" src=\"" + pg.imagesFolder + "cycling.png\"" + D + "\" />";
                        d.push(N)
                    }
                }
                this._div.innerHTML = d.join("")
            } else window.setTimeout(function() {
                pg.clusterManager.refresh()
            }, 100)
        }, ClusterManager.prototype.onRemove = function() {
            this._div.innerHTML = "", this._mapMarkers = []
        }, ClusterManager.prototype.hideMarkers = function() {
            this._markersHidden || (this._markersHidden = !0, this.refresh())
        }, ClusterManager.prototype.draw = function() {
            this._markersHidden !== !1 && (this._markersHidden = !1, this.refresh())
        }, pg.hideMapInfoWindow = function() {
            pg.$mapMenu && (pg.$mapMenu.style.display = "none")
        }, pg.openStreetView = function(a, b) {
            pg.hideMapInfoWindow();
            var c = pg.GMap.getStreetView();
            c.setPosition(new google.maps.LatLng(a, b)), c.setPov({
                heading: 0,
                pitch: 0
            }), c.setVisible(!0)
        }, pg.openMapInfoWindow = function(a, b, c, d, e, f) {
            var g = ["<div class=\"content\">", c ? "<div class=\"hide\" onclick=\"pg.hideMapInfoWindow();\"></div><span class=\"baloon_title\">" + c + "</span><br/>" : "", "<div id=\"streetview\" style=\"display:none;width:250px;height:70px;\"><img onclick=\"pg.openStreetView(" + f.lat() + "," + f.lng() + ")\"", " style=\"width:250px;height:70px;cursor:pointer;\" width=\"250\" height=\"70\" src=//maps.googleapis.com/maps/api/streetview?", cfg.city.googleAPIkey ? "key=" + cfg.city.googleAPIkey + "&" : "", "size=250x70&location=", f.lat(), ",", f.lng(), "&fov=120&heading=0&pitch=0></div>", d];
            if (typeof e != "undefined") {
                var h = pg.fUrlSet({
                        transport: "plan",
                        inputStart: e,
                        hashForMap: "map"
                    }, !0),
                    i = pg.fUrlSet({
                        transport: "plan",
                        inputFinish: e,
                        hashForMap: "map"
                    }, !0);
                g.push("<div class=\"autobusuData\" id=\"start-set\"><span class=\"icon icon_stopGreen\"></span>" + (e.indexOf(";") == -1 ? i18n.mapDirectionsFromStop : i18n.mapDirectionsFromHere) + "</div>"), g.push("<div class=\"autobusuData\" id=\"finish-set\"><span class=\"icon icon_stopRed\"></span>" + (e.indexOf(";") == -1 ? i18n.mapDirectionsToStop : i18n.mapDirectionsToThere) + "</div>")
            }
            g.push("</div>"), pg.$mapMenu.innerHTML = g.join(""), typeof e != "undefined" && (jq("#start-set").bind("click", function() {
                pg.hideMapInfoWindow(), pg.inputStart = "", pg.loadedPlannerParams = "", pg.map.num = "", pg.optimalResults = null, pg.fUrlSet({
                    transport: "plan",
                    inputStart: e
                })
            }), jq("#finish-set").bind("click", function() {
                pg.hideMapInfoWindow(), pg.inputFinish = "", pg.loadedPlannerParams = "", pg.map.num = "", pg.optimalResults = null, pg.fUrlSet({
                    transport: "plan",
                    inputFinish: e
                })
            })), pg.$mapMenu.style.display = "block", pg.$mapMenu.style.left = a + "px", pg.$mapMenu.style.top = b + "px", pg.$mapMenu.style.bottom = "", pg.$mapMenu.style.height = "";
            var j = pg.GMap.getDiv(),
                k = Math.max(260, pg.$mapMenu.offsetWidth),
                l = pg.$mapMenu.offsetHeight,
                m = k / 2;
            pg.$mapMenu.style.top = pg.$mapMenu.offsetTop - l + "px", pg.$mapMenu.style.left = pg.$mapMenu.offsetLeft - m + "px";
            if (pg.$mapMenu.offsetLeft < 0) m = m + pg.$mapMenu.offsetLeft - 5, pg.$mapMenu.style.left = "5px";
            else if (pg.$mapMenu.offsetLeft + k > j.offsetWidth) {
                var n = pg.$mapMenu.offsetLeft + k - j.offsetWidth;
                m = m + n + 5, pg.$mapMenu.style.left = pg.$mapMenu.offsetLeft - n - 5 + "px"
            }
            if (c) {
                var o = document.createElement("div");
                o.style.left = m - 7 + "px", o.className = "baloon_arrow", pg.$mapMenu.offsetTop < 0 ? (pg.$mapMenu.style.top = pg.$mapMenu.offsetTop + pg.$mapMenu.offsetHeight + "px", o.className = "baloon_arrow top", pg.$mapMenu.insertBefore(o, pg.$mapMenu.firstChild)) : (pg.$mapMenu.style.height = "auto", pg.$mapMenu.style.bottom = pg.$mapMenu.parentNode.offsetHeight - pg.$mapMenu.offsetTop - l + "px", pg.$mapMenu.style.top = "auto"), pg.$mapMenu.appendChild(o)
            }
            if (cfg.defaultCity == "mariupol")
                if (v3.yandex) pg.loadYandexPanorama(f);
                else {
                    var p = document.createElement("script");
                    p.onload = function() {
                        ymaps.ready(function() {
                            v3.yandex = !0, pg.loadYandexPanorama(f)
                        })
                    }, p.src = "https://api-maps.yandex.ru/2.1/?lang=en_RU&load=panorama.isSupported,panorama.locate,panorama.createPlayer,panorama.Player", document.head.appendChild(p)
                }
            else(new google.maps.StreetViewService).getPanoramaByLocation(f, 50, function(a, b) {
                if (b == google.maps.StreetViewStatus.OK) {
                    $("streetview").style.display = "block";
                    var c = pg.$mapMenu.offsetTop;
                    c < 0 && (pg.GMap.panToWithOffset(pg.GMap.getCenter(), 0, c), pg.$mapMenu.style.top = "0px", pg.$mapMenu.style.bottom = "auto")
                }
            })
        }, pg.loadYandexPanorama = function(a) {
            typeof ymaps != "undefined" && ymaps.panorama.isSupported() && ymaps.panorama.locate([a.lat(), a.lng()]).done(function(a) {
                if (a.length > 0) {
                    $("streetview").innerHTML = "", $("streetview").style.display = "block", $("streetview").style.height = "150px";
                    var b = new ymaps.panorama.Player("streetview", a[0], {
                            controls: []
                        }),
                        c = pg.$mapMenu.offsetTop;
                    c < 0 && (pg.GMap.panToWithOffset(pg.GMap.getCenter(), 0, c), pg.$mapMenu.style.top = "0px", pg.$mapMenu.style.bottom = "auto")
                }
            }, function(a) {
                alert(a.message)
            })
        }, pg.splitEncodedPolyline = function(a, b, c, d, e, f) {
            var g = a.length,
                h = 0,
                i = [],
                j = 0,
                k = 0,
                l = Number.POSITIVE_INFINITY,
                m, n, o = 0,
                p = 0,
                q = 0;
            c *= 1e5, e *= 1e5, d *= 1e5, f *= 1e5;
            while (h < g) {
                var r, s = 0,
                    t = 0;
                do r = a.charCodeAt(h++) - 63, t |= (r & 31) << s, s += 5; while (r >= 32);
                var u = t & 1 ? ~(t >> 1) : t >> 1;
                j += u, s = 0, t = 0;
                do r = a.charCodeAt(h++) - 63, t |= (r & 31) << s, s += 5; while (r >= 32);
                var v = t & 1 ? ~(t >> 1) : t >> 1;
                k += v, m = (j - c) * (j - c) + (k - d) * (k - d), l > m && (l = m, o = p = q, n = Number.POSITIVE_INFINITY), m = (j - e) * (j - e) + (k - f) * (k - f), n > m && (n = m, p = q), i[q++] = j, i[q++] = k
            }
            var w = 0,
                x = 0,
                y = [];
            h = o;
            while (h <= p) j = i[h++], k = i[h++], y.push(ti.encodeNumber(j - w), ti.encodeNumber(k - x)), w = j, x = k;
            o /= 2, p /= 2;
            var z = "R" + (o < p ? b.substring(o + 1, p) + "R" : "");
            return {
                points: y.join(""),
                levels: z
            }
        }, pg.loadPolyline = function(a, b, c, d, e, f, g, h) {
            var i = cfg.city.datadir + "/" + ti.toAscii([a, b == "eventbus" || cfg.defaultCity == "klaipeda" ? "bus" : b, c].join("_"), !0) + ".txt";
            ti.fDownloadUrl("get", i, function(a) {
                a.indexOf("\r\n") < 0 ? a = a.split("\n") : a = a.split("\r\n");
                var c = pg.getStyle("." + b),
                    i = .8;
                for (var j = 2; j < a.length; j += 3) {
                    if (!d[a[j - 2]]) continue;
                    var k = {
                        points: a[j - 1],
                        levels: a[j]
                    };
                    e && f && (k = pg.splitEncodedPolyline(k.points, k.levels, e, f, g, h)), k.color = c && (c.backgroundColor || c.color) || "#0000FF", k.opacity = i, i = .6, k.weight = 5, k.zoomFactor = 2, k.numLevels = 20;
                    var l = google.maps.geometry.encoding.decodePath(k.points),
                        m = new google.maps.Polyline({
                            path: l,
                            strokeColor: k.color,
                            strokeOpacity: k.opacity,
                            strokeWeight: k.weight,
                            clickable: !1,
                            map: pg.GMap
                        });
                    pg.mapOverlays.push(m)
                }
            })
        }, pg.stopLabelSelected = new ELabel(pg.GMap, new google.maps.LatLng(b.lat, b.lng), cfg.defaultCity, "map", "mapStopSelected", new google.maps.Size(4, -4)),
            pg.stopLabelSelected.setMap(pg.GMap),
            pg.stopLabelSelected.hide(),
            pg.mapMarkerStart = new google.maps.Marker({
            position: new google.maps.LatLng(0, 0),
            icon: pg.imagesFolder + "MarkerStart.png",
            title: i18n.mapDragToChangeStart,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function(a, b) {
                return 104
            }
        }), pg.mapMarkerFinish = new google.maps.Marker({
            position: new google.maps.LatLng(0, 0),
            icon: pg.imagesFolder + "MarkerFinish.png",
            title: i18n.mapDragToChangeFinish,
            draggable: !0,
            dragCrossMove: !1,
            bouncy: !1,
            zIndexProcess: function(a, b) {
                return 104
            }
        }), pg.mapMarkerStart.setMap(null), pg.mapMarkerFinish.setMap(null), google.maps.event.addListener(pg.mapMarkerStart, "dragend", function() {
            pg.map = {}, pg.optimalResults = null;
            var a = pg.mapMarkerStart.getPosition(),
                b = o(a),
                c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(c, pg.inputFinish, "map")
        }), google.maps.event.addListener(pg.mapMarkerFinish, "dragend", function() {
            pg.map = {}, pg.optimalResults = null;
            var a = pg.mapMarkerFinish.getPosition(),
                b = o(a),
                c = b.length ? b.join(",") : a.toUrlValue().replace(",", ";");
            pg.fTabPlanner_Click(pg.inputStart, c, "map")
        }), google.maps.event.addListener(pg.mapMarkerStart, "dragstart", function() {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0, setTimeout(function() {
                pg.clusterManager.refresh()
            }, 100))
        }), google.maps.event.addListener(pg.mapMarkerFinish, "dragstart", function() {
            pg.mapShowAllStops || (pg.mapShowAllStops = !0, pg.clusterManager.refresh())
        });

        function o(a) {
            var b = v3.fromLatLngToDivPixel(a, 19),
                c = 19 - pg.GMap.getZoom(),
                d = 1 << c + 2,
                e = b.x - d,
                f = b.x + d,
                g = b.y - d,
                h = b.y + d,
                j = pg.clusterManager._mapMarkers,
                k = [];
            for (i = j.length; --i >= 0;) {
                marker = j[i];
                var l = marker._x,
                    m = marker._y;
                if (m > h) break;
                m >= g && l >= e && l <= f && k.push(marker.id)
            }
            return k
        }
        var p = [],
            q = ti.stops;
        for (var s in q) p.push(q[s]);
        pg.clusterManager = new ClusterManager(f, {
            markers: p,
            clusterMaxZoom: 14
        }), pg.clusterManager.setMap(pg.GMap);
        var t = new google.maps.MarkerImage(pg.imagesFolder + "location2_wait.png", new google.maps.Size(20, 20), new google.maps.Point(0, 0), new google.maps.Point(10, 10));
        pg.youAreHere = new google.maps.Marker({
            title: i18n.youAreHere,
            position: new google.maps.LatLng(0, 0),
            icon: t,
            draggable: !0,
            clickable: !1,
            raiseOnDrag: !1
        }), pg.locationAccuracyCircle = new google.maps.Circle({
            strokeColor: "#FF0000",
            strokeOpacity: .2,
            strokeWeight: 1,
            fillColor: "#FF0000",
            fillOpacity: .05,
            draggable: !1,
            clickable: !1
        }), pg.youAreHereInfowindow = new google.maps.InfoWindow({
            content: i18n.dragMarkerText,
            disableAutoPan: !0
        }), v3.directionsService = new google.maps.DirectionsService, v3.directionsDisplay = new google.maps.DirectionsRenderer, pg.hashForMap && pg.hashForMap.indexOf("mylocation") != -1 && window.gps ? pg.renderMyLocation(jQuery("#divContentRoutes"), window.gps) : typeof pg.updateMyLocationMarker == "function" && window.gps ? pg.updateMyLocationMarker(window.gps) : typeof mobile != "undefined" && typeof mobile.updateMyLocationMarker == "function" && window.gps && mobile.updateMyLocationMarker(window.gps), google.maps.event.addListener(f, "zoom_changed", function() {
            (pg.clusterManager._div || {}).innerHTML = "", (pg.getMapVehicles() || {}).innerHTML = "", pg.hideMapInfoWindow()
        }), google.maps.event.addListener(f, "idle", function() {
            setTimeout(function() {
                pg.clusterManager.refresh(), pg.fShowVehicles()
            }, 100)
        }), google.maps.event.addListener(f, "maptypeid_changed", function() {
            setTimeout(function() {
                pg.clusterManager.refresh(), pg.clusterManager.showLayer(), pg.fShowVehicles()
            }, 100)
        }), pg.fMapShow()
    }
}, pg.getMapVehicles = function() {
    if (typeof pg.$mapVehicles == "undefined") {
        var a = v3.getPanes();
        if (a) pg.$mapVehicles = document.createElement("div"), pg.$mapVehicles.id = "divMapVehicles", a.overlayMouseTarget.appendChild(pg.$mapVehicles);
        else return {}
    }
    return pg.$mapVehicles
}, pg.divMapHide_Click = function() {
    if (typeof mobile == "undefined" && pg.GMap && pg.GMap.getStreetView().getVisible()) pg.GMap.getStreetView().setVisible(!1);
    else {
        pg.fMapHide(), pg.hashForMap = "";
        if (typeof mobile != "undefined") {
            if (pg.urlUnderMobileMap) {
                window.location.hash = "#" + pg.urlUnderMobileMap;
                return
            }
            if (mobile.current_page == "schedule4" && mobile.previous_page == "stop") {
                mobile.back();
                return
            }
            if (mobile.current_page == "stop" && pg.inputStop && pg.inputStop.indexOf(";") != -1) {
                pg.fUrlSet({
                    transport: "search"
                });
                return
            }
            if (pg.urlPrevious == "" || pg.urlPrevious == "/" + pg.language) {
                pg.fUrlSet({
                    transport: "",
                    city: ""
                });
                return
            }
        }
        pg.fUrlSet()
    }
}, pg.divMapMaximize_Click = function(a) {
    var b = pg.GMap && pg.GMap.getCenter();
    pg.fUrlSetMap({
        maximized: !0
    }), b && setTimeout(function() {
        google.maps.event.trigger(pg.GMap, "resize"), pg.GMap.setCenter(b)
    }, 300);
    return pg.cancelEvent(a)
}, pg.divMapRestore_Click = function(a) {
    var b = pg.GMap && pg.GMap.getCenter();
    pg.fUrlSetMap({
        maximized: !1
    }), b && (google.maps.event.trigger(pg.GMap, "resize"), pg.GMap.setCenter(b));
    return pg.cancelEvent(a)
}, pg.fShowTraffic = function(a) {
    pg.mapShowTraffic = a, pg.GMap && (pg.trafficOverlay || (pg.trafficOverlay = new google.maps.TrafficLayer), a ? (pg.GMap.getMapTypeId() == "OSM" && (pg.clusterManager && pg.clusterManager.hideLayer(), pg.GMap.setMapTypeId("roadmap")), pg.trafficOverlay.setMap(pg.GMap)) : (v3.mapTypeIds.indexOf("OSM") >= 0 && (pg.GMap.getMapTypeId() == "roadmap" && (pg.clusterManager && pg.clusterManager.hideLayer(), pg.GMap.setMapTypeId("OSM"))), pg.trafficOverlay.setMap(null)), pg.toggleClass($("divMapShowTraffic"), "pressed", a))
}, pg.fToggleVehicles = function(a) {
    pg.mapShowVehicles = a, pg.GMap && cfg.city.urlGPS && (pg.toggleClass($("divMapShowVehicles"), "pressed", a > 0), a > 0 && !pg.mapShowVehiclesInterval ? (pg.mapShowVehiclesInterval = setInterval(pg.fShowVehicles, 5e3), window.setTimeout(function() {
        pg.fShowVehicles()
    }, 200)) : a <= 0 && ((pg.getMapVehicles() || {}).innerHTML = ""))
}, pg.fShowVehicles = function() {
    if (v3.ready) {
        if (!cfg.city.urlGPS || pg.mapShowVehicles <= 0) {
            pg.mapShowVehiclesInterval && (clearInterval(pg.mapShowVehiclesInterval), pg.mapShowVehiclesInterval = 0), (pg.getMapVehicles() || {}).innerHTML = "";
            return
        }
        if (pg.hashForMap == "map" && pg.mapShowVehicles != 2) {
            pg.fToggleVehicles(-1);
            return
        }
        var a = cfg.city.urlGPS;
        a += a.indexOf("?") >= 0 ? "&time=" : "?", a += +(new Date), (!pg.visibility || pg.visibility == "visible") && ti.fDownloadUrl("GET", a, pg.fProcessGPSData)
    }
}, pg.fProcessGPSData = function(a) {
    if (pg.mapShowVehicles > 0) {
        a = a.split("\n");
        var b = [],
            c = "," + pg.hashForMap + ",",
            d = c.lastIndexOf("(");
        d >= 0 && (c = c.substring(0, d) + ",");
        var e = pg.transport || pg.schedule && pg.schedule.transport;
        e === "stop" && (e = "");
        var f = pg.schedule && pg.schedule.num || "",
            g = cfg.city.courseOrigin || 0,
            h = cfg.city.courseCounterClockwise ? -1 : 1,
            i = pg.GMap.getBounds(),
            j = i.getSouthWest(),
            k = i.getNorthEast();
        for (var d = a.length; d--;) {
            var l = a[d].split(",");
            if (l.length >= 4) {
                var m = l[1];
                if (m === "0") continue;
                var n = ({
                    1: "trol",
                    3: "tram",
                    4: "minibus",
                    5: "seasonalbus"
                })[l[0]] || "bus";
                l[1].length && (typeof ti.transportRoutes == "function" ? n = ti.transportRoutes(l[1]) : cfg.defaultCity == "vilnius" && l[1].charAt(l[1].length - 1).toLowerCase() == "g" ? n = "expressbus" : cfg.defaultCity == "vilnius" && n == "bus" && l[1].charAt(l[1].length - 1).toLowerCase() == "n" && (n = "nightbus"));
                if (e != "plan")
                    if (pg.hashForMap === "map" || pg.hashForMap == "map,max") {
                        if (e && (f || cfg.defaultCity == "rostov" || cfg.defaultCity == "mariupol") && n !== e) continue;
                        if (f && ti.toAscii(m) !== f) continue
                    } else if (c.indexOf("," + n + "," + ti.toAscii(m) + ",") < 0) continue;
                var o = l[6],
                    p = l[4] ? l[4] + " km/h" : "",
                    q = null;
                l[5] && +l[5] < 999 ? pg.vehicleCourses[o] = q = g + +l[5] * h : cfg.defaultCity == "mariupol" && (q = pg.vehicleCourses[o]);
                var r = +l[2] / 1e6,
                    s = +l[3] / 1e6;
                if (s < j.lat() || s > k.lat() || (r > k.lng() || r < j.lng())) continue;
                var t = new google.maps.LatLng(s, r),
                    u = v3.fromLatLngToDivPixel2(t),
                    v = pg.getStyle("." + n),
                    w = v && (v.backgroundColor || v.color);
                w = w && pg.styleRGBtoHex(w) || "0000FF";
                var x = p,
                    y = !1;
                cfg.defaultCity == "klaipeda" ? (y = o.slice(-1) == "t", x = y ? i18n.lowFloorVehicleMapTip || "" : "", x = (x ? x + ", " : "") + (o || "") + " " + p) : cfg.defaultCity == "tallinna-linn" ? y = (cfg.city.lowFloorVehicles || "").indexOf("," + o + ",") >= 0 : (y = o.slice(-1) == "Z", x = y ? o.slice(0, -1) + (i18n.lowFloorVehicleMapTip || "") : o || "", x = (x ? x + ", " : "") + p);
                var z = y ? "color:gold; border-color:gold;" : "";
                n == "minibus" && (z += "z-index: 0;"), pg.transformCSS ? (typeof q == "number" && b.push("<div class=\"arrow\" style=\"left:" + (u.x - 10) + "px; top:" + (u.y - 10) + "px; background-color:#" + w + ";" + z + pg.transformCSS + ":rotate(" + (45 + q) + "deg);\"></div>"), b.push("<div class=\"circle\"  style=\"left:" + (u.x - 9) + "px; top:" + (u.y - 9) + "px; background-color:#" + w + ";" + z + (m.length > 2 ? ";font-size:smaller" : "") + ";\" title=\"" + x + "\" data-vehicle-id=\"" + o + "\" data-transport=\"" + n + "\" data-route=\"" + m + "\">" + m + "</div>")) : b.push("<img src=\"http://chart.apis.google.com/chart?cht=it&chs=20x20&chco=" + w + ",00000000,00000000&chx=ffffff&chf=bg,s,00000000&ext=.png&chl=" + m + "\" title=\"" + x + "\" style=\"z-index:110; position:absolute; width:20px; height:20px; left:" + (u.x - 10) + "px; top:" + (u.y - 10) + "px; cursor:pointer;\" />")
            }
        }
        a = null, (pg.getMapVehicles() || {}).innerHTML = b.join("")
    }
};

function resizeDropDown() {
    var a = $("mapDropDown"),
        b = $("mapDropDownContent");
    if (a && b) {
        var c = document.body.clientWidth,
            d = a.offsetLeft,
            e = a.offsetWidth,
            f = b.offsetWidth,
            g = 0;
        if (d + f >= c) {
            var g = -(f / 2) + e / 2;
            g = d + g > 0 ? g : -d, b.style.left = g + "px", b.style.borderTopLeftRadius = "4px"
        }
    }
}
jq(window).bind("resize", function(a) {
    resizeDropDown()
}), pg.fScheduleShow = function(a) {
    a.num && (a.num = a.num.toLowerCase()), pg.schedule || (pg.schedulePane = 1, ($("spanReturnToRoutes") || {}).href = pg.urlPrevious, pg.urlUnderSchedulePane = pg.urlPrevious, pg.languageUnderSchedulePane = pg.language), document.body.className.indexOf("Schedule") < 0 && (cfg.isMobilePage && pg.hashForMap ? document.body.className = "ScheduleMapDisplayed" : document.body.className = "ScheduleDisplayed"), $("aDir1") && setTimeout(function() {
        try {
            $("aDir1").focus()
        } catch (a) {}
    }, 100);
    pg.schedule && pg.schedule.city == a.city && pg.schedule.transport == a.transport && pg.schedule.num == a.num && pg.schedule.dirType == a.dirType && pg.schedule.tripNum == a.tripNum ? (pg.schedule.dirType = a.dirType, pg.schedule.stopId = a.stopId, typeof mobile == "undefined" && pg.fScheduleStopActivate()) : (pg.schedule = a, ($("spanDir1") || {}).innerHTML = "&nbsp;", ($("spanDir2") || {}).innerHTML = "&nbsp;", ($("dlDirStops1") || {}).innerHTML = "&nbsp;", ($("dlDirStops2") || {}).innerHTML = "&nbsp;", ($("divScheduleContentInner") || {}).innerHTML = "<br/>" + i18n.loading, pg.fScheduleLoad())
}, pg.fScheduleHide = function() {
    pg.schedule = null, document.body.className.indexOf("Schedule") >= 0 && (document.body.className = "", $("divMap").style.width = "100%", $("divMap").style.height = "100%")
}, pg.fScheduleLoad = function(a) {
    if (typeof mobile == "undefined" || typeof a != "undefined") {
        pg.schedules = null, cfg.city.doNotShowTimetables = cfg.city.doNotShowTimetables || {}, ($("ulScheduleDirectionsList") || {
            style: {}
        }).style.display = "none";
        if (typeof ti.routes !== "object" || typeof ti.stops !== "object") {
            setTimeout(function() {
                pg.fScheduleLoad(a)
            }, 200);
            return
        }
        var b = null,
            c;
        cfg.city.showAllDirections ? (c = ti.fGetRoutes(pg.schedule.city, pg.schedule.transport, pg.schedule.num, pg.schedule.dirType), $("aDir2").style.display = "none", $("aDir1").innerHTML = $("aDir1").innerHTML.replace("▼", "")) : c = ti.fGetRoutes(pg.schedule.city, pg.schedule.transport, pg.schedule.num, null, !0, null);
        if (typeof mobile != "undefined") var d = {
            directions: {
                1: [],
                2: []
            },
            stops: [],
            trip: {},
            streets: []
        };
        if (!c.length) {
            a && a(d), $("divScheduleContentInner").innerHTML = "Error: route not found.";
            return
        }
        var e = {},
            f = {
                1: "",
                2: ""
            };
        for (var g = 0; g < c.length; g++) {
            var h = c[g],
                i = h.name,
                j = "";
            if (h.routeTag.indexOf("0") >= 0 && pg.schedule.dirType != h.dirType) continue;
            !b && pg.schedule.dirType && pg.schedule.dirType == h.dirType && (b = h, j = "strong");
            if (!e[i + h.dirType]) {
                e[i + h.dirType] = !0;
                var k = h.dirType.split("-"),
                    l = k[0],
                    m = k[k.length - 1];
                c.length > 1 && l !== "autobusuData" && m !== "b" ? l.charAt(0) === "b" || m.charAt(0) === "autobusuData" || l.charAt(0) !== "autobusuData" && m.charAt(0) !== "b" ? (h.dirNum = 2, j = "indented" + (j ? " " + j : "")) : h.dirNum = 1 : h.dirNum = 1;
                var n = pg.fUrlSet({
                        schedule: {
                            dirType: h.dirType
                        },
                        hashForMap: ""
                    }, !0),
                    o = pg.fUrlSet({
                        schedule: {
                            dirType: h.dirType
                        },
                        hashForMap: !0
                    }, !0);
                f[h.dirNum] += "<autobusuData href=\"#" + n + "\"" + (j ? " class=\"" + j + "\"" : "") + ">" + i + "</autobusuData>", typeof mobile != "undefined" && d.directions[h.dirNum].push({
                    hash: n,
                    hashForMap: o,
                    name: i
                })
            }
        }($("ulScheduleDirectionsList") || {}).innerHTML = f[1] + f[2], b || (b = c[0]), pg.schedule.dirType = b.dirType, pg.schedule.dirTypes = {}, pg.schedule.route = b;
        var p = pg.schedulePane == 2 ? 2 : 1,
            q = [];
        for (var r = 1; r <= 2; r++) {
            pg.schedule.dirTypes[b.dirType] = p, ($("spanDir" + p) || {}).innerHTML = (b.num && b.num.length <= 5 ? "<span class=\"num num3 " + b.transport + "\" title=\"" + i18n.transport[b.transport] + " " + b.num + "\">" + b.numHTML + "</span>" : "") + b.name, q = [];
            var s = null,
                t = 0,
                u = (b.streets || "").split(",") || [],
                v, w = null,
                x, y = pg.schedule.tripNum && r == 1 && !cfg.city.doNotShowTimetables[pg.schedule.transport] ? pg.schedule.tripNum : 0;
            y && (v = typeof b.times === "string" ? ti.explodeTimes(b.times) : b.times, x = v.workdays.length, w = v.times);
            var z = {};
            for (g = 0; g < b.stops.length; g++) {
                if (g < b.stops.length - 1 && b.stops[g] == b.stops[g + 1]) continue;
                var A = ti.fGetStopDetails(b.stops[g]);
                z[A.name] = A.street
            }
            for (g = 0; g < b.stops.length; g++) {
                if (g < b.stops.length - 1 && b.stops[g] == b.stops[g + 1])
                    if (typeof cfg == "object" && cfg.defaultCity != "intercity") continue;
                var A = ti.fGetStopDetails(b.stops[g]),
                    n = pg.fUrlSet({
                        schedule: {
                            dirType: b.dirType,
                            stopId: A.id,
                            tripNum: y
                        },
                        hashForMap: ""
                    }, !0),
                    o = pg.fUrlSet({
                        schedule: {
                            dirType: b.dirType,
                            stopId: A.id,
                            tripNum: y
                        },
                        hashForMap: !0
                    }, !0);
                q.push("<dt><autobusuData href=\"#" + n + "\" class=\"hover\">" + ((A.info || "").indexOf("wifi") < 0 ? "" : "<img style=\"margin:-2px 0 0-16px;\" src=\"" + pg.imagesFolder + "stop_wifi.png\" alt=\"wifi stop\" title=\"" + i18n.stopHasWiFi + "\" />") + (A.name == "Stotis" && /[a-zA-Z]/.test(A.id.slice(-1)) ? "<span style=\"display:inline-block; border-radius:50%; border: 1px solid black; text-align: center; font-size:12px; font-weight:bold; line-height: 13px; background-color:yellow;z-index:999; width:12px; height:12px; margin:0 1px 0 -15px;\">" + A.id.slice(-1).toUpperCase() + "</span>" : "") + (w ? ti.printTime(w[y - 1 + g * x], null, "&#x2007;") + "&nbsp;&nbsp;" : "") + A.name + (z[A.name] == A.street ? "" : " (" + A.street + ")") + "</autobusuData>"), z[A.name] = A.street, cfg.defaultCity == "latvia" && g < b.stops.length - 1 && q.push("<autobusuData class=\"draw\" target=\"_blank\" href=\"http://www.stops.lt/latviatest/latvia/editor.html#" + b.stops[g] + "," + b.stops[g + 1] + "\">draw</autobusuData>"), q.push("</dt>");
                if (typeof mobile != "undefined" && r == 1) {
                    var B = w ? ti.printTime(w[y - 1 + g * x], null, "&#x2007;") : "";
                    d.stops.push({
                        hash: n,
                        hashForMap: o,
                        id: A.id,
                        name: A.name,
                        time: B
                    }), d.trip[A.id] = {
                        time: B,
                        workdays: v ? v.workdays[y - 1] : "",
                        previous_trip: v && y > 1 && v.workdays[y - 2] == v.workdays[y - 1] ? y - 1 : "",
                        next_trip: v && y < v.workdays.length && v.workdays[y] == v.workdays[y - 1] ? y + 1 : ""
                    }
                }
                if (r == 1 && A.street) {
                    while (u[t]) ++t;
                    u[t] = {
                        name: A.street,
                        stops: A.name,
                        hash: n
                    }, ++t
                }
            }($("dlDirStops" + p) || {}).innerHTML = q.join(""), ($("dlDirStops" + p) || {
                style: {}
            }).style.display = "";
            if (r == 2) break;
            for (t = u.length; --t >= 0;) s = u[t], typeof s == "string" && (s = u[t] = {
                name: s
            }), s.name.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"), t + 1 < u.length && s.name == u[t + 1].name && (s.stops += ", " + u[t + 1].stops, s.hash = s.hash || u[t + 1].hash, u[t + 1].name = null);
            var C = "";
            for (t = 0; t < u.length; ++t) s = u[t], s.name && (C ? C += ", " : C = i18n.routeStreets + ": ", s.hash ? C += "<autobusuData href=\"#" + s.hash + "\" class=\"hover\" title=\"" + i18n.stops + ": " + s.stops.replace(/"/g, "") + "\">" + s.name + "</autobusuData>" : C += s.name, typeof mobile != "undefined" && d.streets.push(s));
            ($("divScheduleRoute") || {}).innerHTML = "<span class=\"icon icon_" + b.transport + "\"></span><span class=\"num num3 " + b.transport + "\">" + b.numHTML + "</span>&nbsp;&nbsp; " + C + "<div class=\"RouteDetails\"" + (pg.scheduleDetailsExpanded ? "" : " style=\"display:none;\"") + ">" + (cfg.defaultCity == "vilnius" ? "" : i18n.operator + ": ") + ti.fOperatorDetails(b.operator, b.transport) + "</div>";
            if (c.length <= 1) break;
            p = 3 - p;
            var k = b.dirType.split("-"),
                l = k[0],
                m = k[k.length - 1],
                D = m + "-" + l,
                E = b.dirNum;
            b = null;
            for (g = 0; g < c.length; g++) {
                if (!b || E == b.dirNum && E != c[g].dirNum) b = c[g];
                if (c[g].dirType === D) {
                    b = c[g];
                    break
                }
            }
            typeof mobile != "undefined" && (d.backDir = l != m ? b : null);
            if (!b || l == m || cfg.defaultCity == "latvia") {
                $("aDir2" || {}).style.display = "none", $("dlDirStops2" || {}).style.display = "none";
                break
            }
        }
        a ? a(d) : pg.fScheduleStopActivate(), pg.schedule.tripNum || (($("divScheduleBody") || {}).scrollTop = 0)
    }
}, pg.aDir_Click = function(a) {
    setTimeout(function() {
        try {
            a.focus()
        } catch (b) {}
    }, 100);
    var b = $("ulScheduleDirectionsList");
    (a.id || "").indexOf("2") >= 0 && a.offsetLeft > 100 ? (pg.scheduleProposedPane = 2, b.style.right = "10px", b.style.left = "") : (pg.scheduleProposedPane = 1, b.style.left = a.offsetLeft + "px", b.style.right = ""), b.style.display = "block"
}, pg.aDir_Blur = function() {
    $("ulScheduleDirectionsList").style.display = "none"
}, pg.ulScheduleDirectionsList_Click = function(a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    if (b.nodeName.toLowerCase() == "a") {
        var c = b.href.split("#")[1],
            d = pg.fUrlParse(c);
        pg.schedulePane = pg.scheduleProposedPane || 1, c = pg.fUrlSet({
            schedule: {
                dirType: d.schedule.dirType,
                stopId: null,
                tripNum: 0
            }
        }, !0), c != Hash.getHash() ? Hash.go(c) : pg.fScheduleLoad();
        return pg.cancelEvent(a)
    }
}, pg.fScheduleStops_Click = function(a, b) {
    a = a || window.event;
    var c = a.target || a.srcElement;
    if (c.nodeName.toLowerCase() == "a") {
        pg.schedulePane = b;
        var d = c.href.split("#")[1],
            e = pg.fUrlParse(d);
        pg.fUrlSet({
            schedule: {
                dirType: e.schedule.dirType,
                stopId: e.schedule.stopId,
                tripNum: e.schedule.tripNum
            }
        });
        return pg.cancelEvent(a)
    }
}, pg.fTransferHideMenu = function() {
    if (pg.transfersMenuHide) {
        var a = $("divTransfersMenu");
        a.style.display = "none"
    }
}, pg.fTransfer_MouseOver = function(a) {
    a = a || window.event;
    var b = a.target || a.srcElement;
    if (b.id == "divTransfersMenu" || (b.parentNode || {}).id == "divTransfersMenu" || b.id == "checkTransfer" || b.id == "spanCheckTransfer") pg.transfersMenuHide = !1;
    else {
        var c = b.getAttribute("data-transport");
        pg.transfersMenuHide = !0;
        if (cfg.defaultCity != "tallinna-linn" && cfg.defaultCity != "riga" && cfg.defaultCity != "rostov" || typeof b.className != "string" || b.className.indexOf("transfer") < 0 || !b.href) {
            if (c && pg.transfersDisplayed) {
                pg.addSchedule = c;
                var d = !0;
                if (pg.schedules)
                    for (var e in pg.transfersDisplayed) {
                        d = pg.transfersDisplayed[e];
                        if (d && d.transport == c && !pg.schedules[e]) {
                            d = !0;
                            break
                        }
                    }
                $("checkTransfer").checked = d !== !0, $("spanCheckTransfer").innerHTML = i18n.transport[c.replace("-remove", "")], pg.transfersMenuHide = !1
            }
        } else {
            pg.addSchedule = pg.fUrlParse(b.href).schedule;
            if (pg.addSchedule) {
                var d = ti.fGetRoutes(pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num, pg.addSchedule.dirType, !0)[0];
                $("checkTransfer").checked = b.className.indexOf("active") >= 0, $("spanCheckTransfer").innerHTML = i18n.transport1[d.transport] + (d.num.length > 15 ? "" : " " + d.numHTML) + " " + i18n.towards + " " + d.name, pg.transfersMenuHide = !1
            }
        }
        var f = $("divTransfersMenu");
        pg.transfersMenuHide ? f.style.display == "block" && pg.fTransfer_MouseOut() : (f.style.left = b.offsetLeft + "px", f.style.top = b.offsetTop + b.offsetHeight + "px", f.style.display = "block")
    }
}, pg.fTransfer_MouseOut = function() {
    pg.transfersMenuHide = !0, setTimeout(pg.fTransferHideMenu, 200)
}, pg.fScheduleStopActivate = function() {
    var a = "/" + pg.schedule.dirType + "/" + pg.schedule.stopId + "/",
        b = pg.schedule.dirTypes[pg.schedule.dirType],
        c;
    for (var d = 1; d <= 2; d++) {
        c = $("dlDirStops" + d).getElementsByTagName("autobusuData");
        for (var e = 0; e < c.length; ++e) {
            var f = c[e],
                g = (f.className || "").replace("current", "");
            d == b && a && pg.schedule.stopId && ("/" + f.href + "/").indexOf(a) >= 0 ? (f.className = g + " current" + ti.fGetDirTag(pg.schedule.dirType), a = "") : f.className.indexOf("current") >= 0 && (f.className = g)
        }
    }
    if (a) {
        c = $("dlDirStops" + (b || 1)).getElementsByTagName("autobusuData");
        if (c && (c[0] || {}).href) {
            a = c[0].href.split("#")[1], pg.fUrlExecute(a);
            return
        }
    }
    $("aDir1").className = $("divScheduleLeft").className = b == 1 ? "active" : "", $("aDir2").className = $("divScheduleRight").className = b == 2 ? "active" : "", pg.browserVersion >= 8 && pg.toggleClass($("divScheduleContentInner"), "Right", b == 2), pg.fScheduleLoadTimetable()
}, pg.fScheduleLoadTimetable = function(a) {
    if (typeof mobile == "undefined" || typeof a != "undefined") {
        var b, c, d, e = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"),
            f = pg.schedules || {};
        pg.schedules || (f[e] = pg.schedule);
        var g = pg.nonEmptyCount(f) > (f[e] ? 1 : 0),
            h = ti.fGetTransfersAtStop(pg.schedule.stopId, !0, pg.schedule.route);
        if (typeof a == "function") var i = {
            workdays: [],
            timetables: {},
            timetables_html: [],
            maxlength: {},
            transfers: [],
            transfers_routes: []
        };
        pg.transfersDisplayed = {};
        var j = null,
            k = null,
            l = [],
            m = [];
        for (d = 0; d < h.length; d++) {
            b = h[d], e = ti.toAscii([b.city, b.transport, b.num].join("_"), !0);
            if (pg.transfersDisplayed[e]) continue;
            var n = {
                id: b.id,
                city: b.city,
                transport: b.transport,
                num: ti.toAscii(b.num, !0),
                numHTML: b.numHTML,
                dirType: b.dirType,
                routeTag: b.stopId,
                stopId: b.stopId
            };
            pg.transfersDisplayed[e] = n;
            if (pg.city === "druskininkai" || pg.city === "liepaja") parseInt(pg.schedule.num, 10) === parseInt(b.num, 10) && pg.schedule.num.toLowerCase().indexOf("s") < 0 && b.num.toLowerCase().indexOf("s") < 0 && (f[e] = n, g = g || pg.schedule.num !== b.num);
            else if (pg.city === "xxxklaipeda")
                if (pg.schedule.num + "e" === b.num.toLowerCase() || pg.schedule.num.indexOf("(") >= 0 && pg.schedule.num.replace("(", "e(") === b.num.toLowerCase().replace(/\s/g, "")) f[e] = n, g = g || pg.schedule.num !== b.num.toLowerCase();
            c = pg.fUrlSet({
                schedule: n
            }, !0), j !== b.transport && (j = b.transport, l.push(" <span class=\"icon icon_narrow icon_" + b.transport + "\" data-transport=\"" + b.transport + "\"></span>&nbsp;"));
            var o = "<autobusuData class=\"hover " + (f[e] ? "activetransfer " : "transfer") + j + "\" href=\"#" + c + "\" title=\"" + (b.name || "").replace(/"/g, "") + "\">" + h[d].numHTML.replace(/\s/g, "&nbsp;") + "</autobusuData> ";
            typeof a == "function" && (i.transfers.push(c), i.transfers_routes.push(b)), l.push(o), f[e] && (k !== b.transport && (k = b.transport, o = " <span class=\"icon icon_narrow icon_" + b.transport + "\" data-transport=\"" + b.transport + "-remove\"></span>&nbsp;" + o), m.push(o), f[e].stopId = b.stopId)
        }
        l.push("<span style=\"display:inline-block; width:2px;\"></span>");
        var p = ti.fGetStopDetails(pg.schedule.stopId),
            q = (p.street ? ", " + p.street : "") + (p.area && !cfg.cities[pg.city].skipStopArea ? ", " + p.area : "") + (p.city && !cfg.cities[pg.city].skipStopCity ? ", " + p.city : "");
        p[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (q += ", " + i18n.fareZone + " " + p[cfg.cities[pg.city].stopFareZone]), q = q.length > 0 ? "<span class=\"details\"> (" + q.substring(2) + ")</span>" : "", ($("divScheduleStop") || {}).innerHTML = "<span class=\"stop-name\">" + i18n.stop + "</span><strong> " + p.name + "</strong>" + q + "&nbsp;&nbsp; " + l.join("");
        if (p.street) {
            var r = p.street.replace(/"/g, "&quote;").replace(/\s/, "&nbsp;"),
                s = $("divScheduleRoute") && $("divScheduleRoute").getElementsByTagName("autobusuData");
            if (s)
                for (d = s.length; --d >= 0;) s[d].innerHTML.indexOf(r) < 0 ? s[d].className == "hover strong" && (s[d].className = "hover") : s[d].className = "hover strong"
        }
        var t = [],
            u = 0,
            v = Number.POSITIVE_INFINITY,
            w = 0,
            x = cfg.city.doNotMergeTimetables;
        pg.schedule.stopId != pg.schedule.route.stops[0] && cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[pg.transport] && (f = null);
        for (var e in f) {
            var n = f[e];
            if (!n || !n.stopId) continue;
            if (!pg.transfersDisplayed[e]) continue;
            var y = ti.fGetStopDetails(n.stopId),
                z = {},
                A = (y || {
                    raw_data: ""
                }).raw_data.split(";"),
                B = n.dirType.split("-"),
                C = B[0],
                D = B[B.length - 1],
                E = 2;
            C === "autobusuData" || D === "b" ? E = 1 : C.charAt(0) !== "b" && D.charAt(0) !== "autobusuData" && (C.charAt(0) === "autobusuData" || D.charAt(0) === "b") && (E = 1);
            var F = ti.toAscii(pg.schedule.route.name, !0);
            for (var d = ti.FLD_DIRS; d < A.length; d += 2) {
                b = ti.fGetRoutes(A[d]);
                if (b.city === n.city && b.transport === n.transport && ti.toAscii(b.num, !0) === n.num && b.times && (!pg.schedule.route.routeTag || pg.schedule.route.routeTag == "0" && !b.routeTag || b.id === pg.schedule.route.id || ti.toAscii(b.name, !0) === F)) {
                    B = b.dirType.split("-"), C = B[0], D = B[B.length - 1];
                    var G = 2;
                    C === "autobusuData" || D === "b" ? G = 1 : C.charAt(0) !== "b" && D.charAt(0) !== "autobusuData" && (C.charAt(0) === "autobusuData" || D.charAt(0) === "b") && (G = 1);
                    if (E !== G) continue;
                    if (z[b.id]) continue;
                    z[b.id] = !0, b.tag = (!g && b.dirType != pg.schedule.dirType && ti.toAscii(b.name, !0) !== F ? "other" : "current") + ti.fGetDirTag(b.dirType);
                    if (b.tag == "current" || b.tag == "other" && C.charAt(0) == "d") b.tag = "";
                    (pg.city === "druskininkai" || pg.city === "liepaja") && pg.schedule.num === b.num && (b.tag = ""), pg.city === "klaipeda" && (b.num.substring(b.num.length - 1).toLowerCase() === "e" || b.num.toLowerCase().indexOf("e (") > 0) && (b.tag = "express");
                    var H = typeof b.times === "string" ? ti.explodeTimes(b.times) : b.times,
                        I = H.workdays,
                        J = H.tag,
                        K = H.times,
                        L = +A[d + 1];
                    b.stops[L] == b.stops[L + 1] && ++L;
                    var M = I.length,
                        N = M;
                    for (var O = M + L * M; N--;) {
                        var P = K[--O];
                        v > P && P >= 0 && (v = P), w < P && P >= 0 && (w = P);
                        var Q = b.tag,
                            R = !1,
                            S = !1;
                        J.charAt(N) === "1" ? Q = (Q ? Q + " " : "") + "highlighted" : J.charAt(N) === "4" ? (Q = (Q ? Q + " " : "") + "smallbus", S = !0) : J.charAt(N) === "2" && (R = !0, pg.city == "druskininkai" && (Q = (Q ? Q + " " : "") + "highlighted")), pg.schedule.tripNum && b.dirType === pg.schedule.dirType && pg.schedule.tripNum - 1 == N && (Q = (Q ? Q + " " : "") + "clicked");
                        if (x) t[u++] = {
                            time: P,
                            workday: I[N],
                            route: b,
                            tag: Q,
                            bicycle: R,
                            small_capacity: S,
                            tripNum: N
                        };
                        else
                            for (var T = 1; T <= 7; T++) I[N].indexOf(T) >= 0 && (t[u++] = {
                                time: P,
                                workday: T,
                                route: b,
                                tag: Q,
                                bicycle: R,
                                small_capacity: S,
                                tripNum: N
                            })
                    }
                }
            }
        }
        t.sort(function(a, b) {
            if (a.workday < b.workday) return -1;
            if (a.workday > b.workday) return 1;
            if (a.time < b.time) return -1;
            if (a.time > b.time) return 1;
            if (a.route.id < b.route.id) return -1;
            if (a.route.id > b.route.id) return 1;
            return 0
        });
        var U = "";
        $("divScheduleRoute") && (g && (U = "<div class=\"selectedNumbers\" style=\"width:100%; margin-top:10px;\">" + m.join(" &nbsp;") + " &nbsp;<label id=\"labelShowDeparturesWithNumbers\" for=\"showDeparturesWithNumbers\"><input name=\"showDeparturesWithNumbers\" id=\"showDeparturesWithNumbers\" type=\"checkbox\" value=\"showDeparturesWithNumbers\"" + (pg.showDeparturesWithNumbers ? " checked=\"checked\"" : "") + " onclick=\"pg.fToggleNumbersAtDepartures();\" />" + i18n.showDeparturesWithRouteNumbers + "</label></div>")), l = [];
        if (t.length) {
            var V, W = v = ~~(v / 60) - 1,
                w = ~~(w / 60),
                X = [],
                Y = [],
                Z;
            for (d = 0, O = t.length; d <= O; d++) {
                if (d > 0 && (d === O || t[d].workday != t[d - 1].workday)) {
                    var Z = l.join(";"),
                        M = t[d - 1].workday;
                    for (kk = 1; kk <= 7; ++kk)
                        if (X[kk] === Z) {
                            Y[kk] += M;
                            break
                        }
                    kk > 7 && (X[M] = Z, Y[M] = "" + M);
                    if (d === O) break;
                    l = []
                }
                Z = t[d];
                var b = Z.route;
                l.push(Z.time, b.city, b.transport, b.num, b.dirType)
            }
            l = [];
            for (d = 0, O = t.length; d <= O; d++) {
                if (d < O) {
                    Z = t[d];
                    if (x) Y[Z.workday] = Z.workday;
                    else if (!Y[Z.workday]) continue
                }
                if (d > 0 && (d === O || Z.workday != t[d - 1].workday)) {
                    W != -999 && l.push("</td></tr>");
                    if (cfg.defaultCity === "tallinna-linn")
                        for (var _ = 0; _ < w - W; _++) l.push("<tr><th>—</th><td></td></tr>");
                    l.push("</tbody></table>"), U += l.join(""), typeof a == "function" && i.timetables_html.push(l.join("")), l = [];
                    if (d === O) break
                }
                if (d == 0 || Z.workday != t[d - 1].workday) {
                    W = v;
                    var ba = pg.fWeekdaysName(Y[t[d].workday], pg.transport);
                    ba.length > 20 && (ba = ba.replace(",", ",<br/>")), l.push("<table class=\"table table-bordered timetable ", "days-", Y[t[d].workday], "\" cellspacing=\"0\" cellpadding=\"0\"><tbody><tr><th></th><th class=\"workdays\">" + ba + "</th></tr>"), typeof a == "function" && (i.workdays.push(Y[t[d].workday]), i.timetables[Y[t[d].workday]] = [], i.maxlength[Y[t[d].workday]] = 0)
                }
                var bb = Z.time;
                if (bb < 0) continue;
                var bc = ~~(bb / 60);
                bb = bb % 60;
                if (W !== bc) {
                    if (W != v) {
                        l.push("</td></tr>");
                        while (++W < bc) l.push("<tr><th>&mdash;</th><td></td></tr>")
                    } else
                        while (++W < bc) l.push("<tr><th>" + (cfg.defaultCity === "tallinna-linn" ? "&mdash;" : "&nbsp;") + "</th><td></td></tr>");
                    W = bc, l.push("<tr><th>" + bc % 24 + "</th><td" + (g ? " style=\"white-space:normal;\"" : "") + ">"), typeof a == "function" && i.timetables[Y[t[d].workday]].push({
                        hour: bc % 24,
                        minutes: []
                    })
                }
                var bd = Z.route;
                c = pg.fUrlSet({
                    schedule: {
                        city: bd.city,
                        transport: bd.transport,
                        num: bd.num,
                        dirType: bd.dirType,
                        stopId: bd.stopId,
                        tripNum: Z.tripNum + 1
                    }
                }, !0);
                var be = bd.numHTML;
                if (cfg.defaultCity === "tallinna-linn" && be.length > 5) {
                    var bf = be.indexOf(" ");
                    bf != -1 && (be = be.substring(0, bf) + "*")
                }
                l.push("<autobusuData href=\"#" + c + "\" title=\"" + (g ? i18n.transport1[bd.transport] + (bd.num.length > 15 ? "" : " " + bd.numHTML) + " " + i18n.towards + " " : "") + bd.name.replace(/"/g, "") + "\"" + (Z.tag ? "class=\"" + Z.tag + "\"" : "") + ">" + (bb < 10 ? "0" : "") + bb + (g ? "<span class=\"departure" + bd.transport + "\">" + (cfg.defaultCity === "tallinna-linn" ? "" : "\\") + be + "</span>" : "") + (Z.bicycle ? "<img class=\"icon\" style=\"margin:0 1px;\" src=\"" + pg.imagesFolder + "bicycle.png\">" : "") + (g && cfg.defaultCity != "tallinna-linn" ? "</autobusuData>&#x200A;" : "</autobusuData>"));
                if (typeof a == "function") {
                    var bg = i.timetables[Y[t[d].workday]],
                        bh = bg[bg.length - 1];
                    bh.minutes.push({
                        hash: c,
                        min: bb,
                        title: g ? i18n.transport1[bd.transport] + (bd.num.length > 15 ? "" : " " + bd.num) + " " + i18n.towards + " " : "",
                        classname: Z.tag || "",
                        bicycle: Z.bicycle,
                        small_capacity: Z.small_capacity
                    }), bh.minutes.length > i.maxlength[Y[t[d].workday]] && (i.maxlength[Y[t[d].workday]] = bh.minutes.length)
                }
            }
        }
        if (pg.schedule.route && pg.schedule.route.transport) {
            b = pg.schedule.route, l = [];
            var bi = cfg.city["notes_" + b.transport + "_" + b.num.toLowerCase()] || cfg.city["notes_" + b.operator] || cfg.city["notes_" + b.transport];
            bi && (typeof a == "function" && (i.notes = bi), U = "<div style=\"margin-top:10px; clear:both;\">" + (bi[pg.language] || bi.en || bi) + "</div>" + U), bi = cfg.city.skipOperator ? "" : ti.fOperatorDetails(b.operator, b.transport), bi && l.push("<p class=\"noindent\">" + (cfg.defaultCity == "vilnius" ? "" : "<strong>" + i18n.operator + ":</strong> ") + bi + "</p>"), bi = (cfg.operators[b.operator] || cfg.operators[b.transport] || cfg.operators[b.transport + "_" + b.num] || {
                notes: ""
            }).notes, bi && l.push("<p>" + (bi[pg.language] || bi.en || bi).replace("%operator", b.operator) + "</p><br /><br />"), f && (l.push("<p class=\"noindent\"><strong>" + i18n.scheduleCommentsInfo + ":</strong>"), U.indexOf("bicycle") >= 0 && l.push("<p>" + (i18n["transferBicyclesDepartures_" + cfg.defaultCity] || i18n.transferBicyclesDepartures || "").replace("&#128690;", "<img class=\"icon\" style=\"margin:0;\" src=\"" + pg.imagesFolder + "bicycle.png\">")), bi = (cfg.operators[b.operator] || cfg.operators[b.transport] || {
                comments: ""
            }).comments, bi ? l.push("<p>" + (bi[pg.language] || bi.en || bi).replace("%operator", b.operator) + "</p>") : (i18n.scheduleDelaysWarning && i18n.scheduleDelaysWarning.length > 10 && l.push("<p>" + i18n.scheduleDelaysWarning), l.push("<p>" + i18n.scheduleComments)), U.indexOf("smallbus") >= 0 && l.push("<p>" + i18n.smallBus12Departures), U.indexOf("highlighted") >= 0 && l.push("<p>" + (cfg.defaultCity === "tallinna-linn" ? i18n.lowFloorDepartures2 : i18n.lowFloorDepartures)), U.indexOf("other") >= 0 && l.push("<p>" + (cfg.defaultCity === "tallinna-linn" ? i18n.scheduleChangedDepartures2 : i18n.scheduleChangedDepartures))), ($("divScheduleContentBottom") || {}).innerHTML = l.join("</p>") + "</p>"
        }
        pg.replaceHtml($("divScheduleContentInner"), U + "<div style=\"clear:both;\"></div>"), a && a(i)
    }
}, pg.fCheckTransfer_Click = function() {
    if (!pg.addSchedule) return !1;
    $e = $("checkTransfer");
    var a;
    pg.schedules || (a = [pg.schedule.city, pg.schedule.transport, pg.schedule.num].join("_"), pg.schedules = {}, pg.schedules[a] = pg.schedule);
    if (typeof pg.addSchedule == "object") a = ti.toAscii([pg.addSchedule.city, pg.addSchedule.transport, pg.addSchedule.num].join("_")), pg.schedules[a] = $e.checked ? pg.addSchedule : null;
    else {
        pg.addSchedule = (pg.addSchedule || "").replace("-remove", "");
        for (var a in pg.transfersDisplayed) {
            var b = pg.transfersDisplayed[a];
            b.transport == pg.addSchedule && (pg.schedules[a] = $e.checked ? b : null)
        }
    }
    pg.fScheduleLoadTimetable();
    return
}, pg.fToggleNumbersAtDepartures = function() {
    pg.showDeparturesWithNumbers = $("showDeparturesWithNumbers").checked, pg.toggleClass($("divScheduleContentInner"), "HideNumbers", !pg.showDeparturesWithNumbers)
}, pg.fWeekdaysName = function(a, b) {
    var c = "";
    pg.schedule && pg.schedule.route && (pg.schedule.route.weekdays || "").indexOf("!") >= 0 && (a || "").indexOf("7") >= 0 && (c = "notfestal");
    var d = i18n[b + "weekdays" + a + c] || i18n[b + "weekdays" + a] || i18n["weekdays" + a + c] || i18n["weekdays" + a] || "";
    if (d) return d;
    var e = a.split("");
    d;
    for (var f = e.length; --f >= 0;) d = e[f], e[f] = i18n[b + "weekdays" + d + c] || i18n[b + "weekdays" + d] || i18n["weekdays" + d + c] || i18n["weekdays" + d] || d;
    d = e.join(", ");
    return d
}, pg.inputSuggestedStops_Focus = function(a) {
    pg.inputActive !== a && (pg.inputActive = a, pg.stopsSuggestedForText = pg[pg.inputActive.id] ? pg.inputActive.value : null);
    if (pg.inputActive.className === "empty" || pg.inputActive.value == i18n.mapPoint || pg.inputActive.value == "Point on map" || pg.inputActive.value == i18n.myLocation || pg.inputActive.value == "My location") pg.inputActive.className = "", pg.inputActive.value = "";
    pg.timerSuggestedStopsShow === !1 ? pg.timerSuggestedStopsShow = 0 : (pg.fSuggestedStopsShow(!0), pg.timerSuggestedStopsShow === 0 && (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200)))
}, pg.inputSuggestedStops_Blur = function(a) {
    if (!document.activeElement || document.activeElement.id != "divSuggestedStops") pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow), pg.timerSuggestedStopsShow = 0, a && !a.value && (a.value = a.id == "inputFinish" ? i18n.finishStop : i18n.startStop, a.className = "empty"), pg.timerSuggestedStopsHide || (pg.timerSuggestedStopsHide = setTimeout(function() {
        pg.timerSuggestedStopsHide = 0, a && a.id == "inputStop" && a.value != pg.inputStopText && pg.fSuggestedStopsSelectFirst(a), pg.timerSuggestedStopsShow || pg.fSuggestedStopsHide()
    }, 200))
}, pg.divSuggestedStops_Blur = function() {
    (!document.activeElement || !pg.inputActive || document.activeElement.id !== pg.inputActive.id) && pg.inputSuggestedStops_Blur(pg.inputActive)
}, pg.fSuggestedStopsShow = function(a) {
    if (pg.inputActive) {
        var b = pg.inputActive.value || "",
            c = $("divSuggestedStops");
        if (a !== !0 && pg.stopsSuggestedForText === b && c.style.display === "block") return;
        if (a !== !0 && pg.stopLastTyped !== b) {
            pg.stopLastTyped = b;
            return
        }
        pg.stopsSuggestedForText != b && pg.inputStopText != pg.stopSuggestedForMap && (pg[pg.inputActive.id] = ""), pg.stopLastTyped = b, typeof ti.stops === "object" && (pg.stopsSuggestedForText = b);
        var d = [];
        if (b.length < 2 || typeof ti.stops != "object") d.push("<autobusuData id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + (typeof ti.stops != "object" ? i18n.receivingData : i18n.typeSomeChars) + "</autobusuData>");
        else {
            var e = ti.fGetStopsByName(pg.stopSuggestedForMap || b);
            if (e.length == 0) d.push("<autobusuData id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + i18n.noStopsFound + "</autobusuData>");
            else {
                var f = "," + pg[pg.inputActive.id] + ",";
                for (var g = 0; g < e.length; g++) {
                    var h = e[g],
                        i = [];
                    h.city && !cfg.cities[pg.city].skipStopCity && i.push(h.city), h.area && !cfg.cities[pg.city].skipStopArea && i.push(h.area), h.streets && i.push(h.streets), i = i.length > 0 ? "<span class=\"details\"> (" + i.join(", ") + ")</span>" : "", i = "<autobusuData id=\"" + h.id + "\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></span>" + (f.indexOf("," + h.id + ",") >= 0 ? "<strong>" + h.name + "</strong>" : h.name) + i + "</autobusuData>", !1 && f.indexOf("," + h.id + ",") >= 0 ? d.splice(0, 0, i) : d.push(i)
                }
            }
        }
        b.length >= 3 && (pg.geocoder || typeof mobile != "undefined") && d.push("<div id=\"geocaching-results\"><span style=\"display:block; padding-left:10px;line-height:26px;\"><b>" + i18n.addressesAndPlaces + ":</b><br/>" + i18n.loading + "</span></div>"), d.push("<autobusuData id=\"aSuggestShowMap\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_stops\"></span>" + i18n.selectFromMap + "</autobusuData>"), typeof mobile != "undefined" && mobile.kautra && d.pop(), (c || {}).innerHTML = d.join("");
        if (b && b.length >= 3) {
            if (typeof mobile != "undefined") mobile.searchPlaces(b, function(a) {
                var b = $("geocaching-results");
                if (b) {
                    var c = [];
                    a.length ? c.push(["<span style=\"display:block; padding-left:10px;line-height:26px;\"><b>", i18n.addressesAndPlaces, ":</b></span>"].join("")) : c.push(["<autobusuData id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>", i18n.noAddressesAndPlacesFound, "</autobusuData>"].join("")), jQuery.each(a, function(a, b) {
                        c.push(["<autobusuData id=\"", b.key, "\" onclick=\"return false;\" href=\"\">", b.name, "</autobusuData>"].join(""))
                    }), b.innerHTML = c.join(""), jQuery("#geocaching-results autobusuData").bind("click", function() {
                        mobile.geocoder.getPlaceId(jQuery(this).attr("id"), function(a) {
                            var b = mobile.geocoder.index[a];
                            b.indexOf(",") != -1 && (b = b.substring(0, b.indexOf(","))), pg.inputActive.value = b, pg.inputActive.className = "", pg.stopsSuggestedForText = b, pg[pg.inputActive.id] = a, pg.fSuggestedStopsHide(), pg.timerSuggestedStopsShow = !1, pg.inputSuggestedStops_KeyDown(null, -13)
                        })
                    })
                }
            });
            else if (cfg.defaultCity === "tallinna-linn" && typeof pg.searchPlaces == "function") pg.searchPlaces(b, function(a) {
                var b = $("geocaching-results");
                if (b) {
                    var c = [];
                    a.length ? c.push(["<span style=\"display:block; padding-left:10px;line-height:26px;\"><b>", i18n.addressesAndPlaces, ":</b></span>"].join("")) : c.push(["<autobusuData id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>", i18n.noAddressesAndPlacesFound, "</autobusuData>"].join("")), jQuery.each(a, function(a, b) {
                        c.push(["<autobusuData id=\"", b.key, "\" onclick=\"return false;\" href=\"\">", b.name, "</autobusuData>"].join(""))
                    }), b.innerHTML = c.join(""), jQuery("#geocaching-results autobusuData").bind("click", function() {
                        pg.geocoder2.getPlaceId(jQuery(this).attr("id"), function(a) {
                            var b = pg.geocoder2.index[a];
                            b.indexOf(",") != -1 && (b = b.substring(0, b.indexOf(","))), pg.inputActive.value = b, pg.inputActive.className = "", pg.stopsSuggestedForText = b, pg[pg.inputActive.id] = a, pg.fSuggestedStopsHide(), pg.timerSuggestedStopsShow = !1, pg.inputSuggestedStops_KeyDown(null, -13)
                        })
                    })
                }
            });
            else if (pg.geocoder)
                if (pg.inputActive.id == "inputStop") {
                    var j = $("geocaching-results");
                    j && (j.style.display = "none")
                } else pg.geocoder.search(b, function(a) {
                    var b = $("geocaching-results");
                    if (b) {
                        var c = "";
                        a.length ? c = "<span style=\"display:block; padding-left:10px;line-height:26px;\"><b>" + i18n.addressesAndPlaces + ":</b></span>" : c = "<autobusuData id=\"aMoreChars\" href=\"\" onclick=\"return false;\"><span class=\"icon icon_info\"></span>" + i18n.noAddressesAndPlacesFound + "</autobusuData>";
                        for (var d = 0; d < a.length; d++) {
                            var e = a[d];
                            c += "<autobusuData " + (e.key ? ["data-key=\"", e.key, "\""].join("") : ["id=\"", e.lat, ";", e.lng, "\""].join("")) + " onclick=\"return false;\" href=\"\"><span class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></span>" + e.name + "</autobusuData>"
                        }
                        b.innerHTML = c, b.style.display = "block"
                    }
                })
        } else typeof mobile != "undefined" && pg.loadGoogleMapsScript(function() {});
        if (c && pg.inputActive.offsetHeight) {
            var k = $("divContentWrapper") || {
                    offsetLeft: 0,
                    offsetTop: 0
                },
                l = pg.inputActive.offsetLeft,
                m = pg.inputActive.offsetTop + pg.inputActive.offsetHeight + 1;
            getComputedStyle(pg.inputActive.parentNode).position == "relative" && (l += pg.inputActive.parentNode.offsetLeft, m += pg.inputActive.parentNode.offsetTop), $("tblContentPlannerOptions") && pg.inputActive.id !== "inputStop" && (k.offsetLeft === 0 || l < k.offsetLeft || cfg.searchOnly) && (m += $("tblContentPlannerOptions").offsetTop, l += $("tblContentPlannerOptions").offsetLeft), pg.inputActive.id === "inputStop" && k.offsetLeft === 0 && (m = 0), pg.inputActive.id !== "inputStop" && l < k.offsetLeft && (l += k.offsetLeft, m += k.offsetTop), typeof mobile != "undefined" && mobile.tallinn && (m = 120, pg.inputActive.id == "inputFinish" && (m += 35));
            if (typeof mobile != "undefined" && mobile.kautra) {
                var n = jQuery(pg.inputActive).offset();
                m = n.top + 40, l = n.left, c.style.width = jQuery(pg.inputActive).width() + "px"
            }
            typeof mobile == "undefined" && cfg.defaultCity == "tallinna-linn" && typeof jQuery != "undefined" && (m = jQuery("#planner .plan-stations").position().top + 20 + 40, pg.inputActive.id == "inputFinish" && (m += 38), l = pg.hashForMap ? 120 : 300), c.style.top = m + "px", c.style.left = l + "px"
        }
        pg.inputActive.offsetWidth > 2 && (typeof mobile == "undefined" || mobile.kautra ? c.style.minWidth = pg.inputActive.offsetWidth - 2 + "px" : c.style.right = window.innerWidth - (pg.inputActive.offsetWidth + l) + "px"), c.scrollTop = 0, c.style.overflowX = "hidden";
        if (typeof mobile != "object" || !mobile.kautra) c.style.overflowY = d.length > 6 ? "scroll" : "hidden";
        c.style.height = d.length > 6 ? "156px" : "auto", c.style.display = "block"
    }
}, pg.fSuggestedStopsHide = function() {
    pg.stopSuggestedForMap = "", $("divSuggestedStops").style.display != "none" && ($("divSuggestedStops").style.display = "none")
}, pg.divSuggestedStops_MouseDown = function(a) {
    var b = a && (a.target || a.srcElement);
    return !b || b.id !== "divSuggestedStops"
}, pg.eSuggestedStops_Click = function(a) {
    pg.timerSuggestedStopsHide && (clearTimeout(pg.timerSuggestedStopsHide), pg.timerSuggestedStopsHide = 0);
    var b = a && (a.target || a.srcElement),
        c = b && (b.className || "").toLowerCase(),
        d = b.getAttribute("data-key");
    if (b && !b.id && !d) {
        b = b.parentNode;
        var d = b.getAttribute("data-key")
    }
    if (!b) return pg.cancelEvent(a);

    function e(b, c) {
        if (c && c.indexOf("map") >= 0) {
            pg.inputStopText = pg.stopSuggestedForMap = pg.stopSuggestedForMap || pg.stopsSuggestedForText;
            if (pg.transport == "plan") {
                var d;
                pg.inputActive.id === "inputStart" ? (pg.loadedPlannerParams = "clear start", d = "plan/" + b + "/" + (pg.inputFinish || "")) : (pg.loadedPlannerParams = "clear finish", d = "plan/" + (pg.inputStart || "") + "/" + b), Hash.go(d + "/map")
            } else Hash.go("stop/" + b + "/map");
            setTimeout(function() {
                try {
                    pg.inputActive.focus()
                } catch (a) {}
            }, 100)
        }
        if (b && b.indexOf("ShowMap") >= 0) {
            pg.fSuggestedStopsHide(), pg.fUrlSetMap({});
            return pg.cancelEvent(a)
        }
        if (b && b.indexOf("MoreChars") < 0) {
            if (b.charAt(0) != "@") {
                var e = ti.fGetAnyStopDetails(b);
                pg.inputActive.value = e.name, pg.inputActive.className = "", pg.stopsSuggestedForText = e.name, pg[pg.inputActive.id] = b, pg.fSuggestedStopsHide(), pg.timerSuggestedStopsShow = !1, pg.inputSuggestedStops_KeyDown(null, -13)
            }
        } else {
            try {
                pg.inputActive.focus()
            } catch (f) {}
            pg[pg.inputActive.id] = ""
        }
    }
    d ? pg.geocoder.getPlaceId(d, function(a) {
        e(a, c)
    }) : e(b.id, c);
    return pg.cancelEvent(a)
}, pg.inputKeyTab = function(a) {
    var b = window.event ? window.event.keyCode : a.keyCode;
    b == 9 && pg.inputSuggestedStops_KeyDown(null, 13)
}, pg.inputSuggestedStops_KeyDown = function(a, b) {
    pg.stopSuggestedForMap = "", b || (b = window.event ? window.event.keyCode : a.keyCode);
    b == 27 ? (pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow), pg.timerSuggestedStopsShow = 0, pg.fSuggestedStopsHide()) : b == 13 || b == -13 || b == -13 ? (pg.timerSuggestedStopsShow && clearInterval(pg.timerSuggestedStopsShow), pg.timerSuggestedStopsShow = 0, b == 13 && pg.fSuggestedStopsSelectFirst(), pg[pg.inputActive.id] && pg.fSuggestedStopsHide(), pg.inputActive.id === "inputStop" ? pg.inputStop && pg.fTabStop_Click(pg.inputStop) : (pg.loadedPlannerParams != pg.inputStart + "/" + pg.inputFinish && (pg.loadedPlannerParams = "clear results"), pg.fTabPlanner_Click(pg.inputStart, pg.inputFinish), pg.inputActive.id === "inputStart" && pg.inputStart && !pg.inputFinish ? setTimeout(function() {
        try {
            $("inputFinish").focus()
        } catch (a) {}
    }, 100) : pg.inputActive.id === "inputFinish" && pg.inputFinish && !pg.inputStart ? setTimeout(function() {
        try {
            $("inputStart").focus()
        } catch (a) {}
    }, 100) : pg.inputStart && pg.inputFinish && setTimeout(function() {
        try {
            $("buttonSearch").focus()
        } catch (a) {}
    }, 100))) : b != 9 && (pg.inputActive.className == "empty" && (pg.inputActive.value = "", pg.inputActive.className = ""), pg.fSuggestedStopsShow(), pg.timerSuggestedStopsShow || (pg.timerSuggestedStopsShow = setInterval(pg.fSuggestedStopsShow, 200)))
}, pg.fSuggestedStopsSelectFirst = function(a) {
    a = a || pg.inputActive;
    if (a) {
        pg[a.id] = "";
        if (a.value && a.value.length >= 2) {
            var b = ti.fGetStopsByName(a.value);
            b.length > 0 && (a.value != b[0].name && (a.value = b[0].name), pg.stopsSuggestedForText = b[0].name, pg[a.id] = b[0].id, a.id === "inputStop" && pg.fLoadDepartingRoutes())
        }
    }
}, pg.fTabStop_Click = function(a) {
    pg.fUrlSet({
        transport: "stop",
        inputStop: a || pg.inputStop,
        hashForMap: pg.hashForMap && "map"
    });
    return !1
}, pg.fTabPlanner_Click = function(a, b) {
    pg.fUrlSet({
        transport: "plan",
        inputStart: a || pg.inputStart || pg.inputStop,
        inputFinish: b || pg.inputFinish,
        hashForMap: pg.hashForMap && "map"
    });
    return !1
}, pg.fTabActivate = function() {
    var a = pg.city + "_" + pg.transport;
    pg.transport || (a = "city", cfg.cities[pg.city] && pg.city !== pg.fGetCity(pg.city) && (a = "region"));
    var b = $("divNav") && $("divNav").getElementsByTagName("autobusuData");
    if (b)
        for (var c = b.length; --c >= 0;) b[c].id === a ? b[c].className = "active" : b[c].className.indexOf("active") >= 0 && (b[c].className = "");
    ($("dt_stop") || {}).className = pg.transport === "stop" ? "active" : "";
    if (pg.transport === "stop")(cfg.defaultCity == "tallinna-linn" || pg.loadedDepartingRoutes !== pg.inputStop) && setTimeout(pg.fLoadDepartingRoutes, 10);
    else if (pg.transport === "plan") {
        typeof mobile == "undefined" && (($("plan") || {}).className = "active"), pg.loadedPlannerParams !== pg.inputStart + "/" + pg.inputFinish && setTimeout(pg.fLoadPlannerTab, 10);
        var d = "" + (($("inputTime") || {}).value || "");
        d.trim() === "" && (d = ti.dateToMinutes(new Date) % 1440, ($("inputTime") || {}).value = ti.printTime(d))
    } else if (!pg.loadedRoutesHash || pg.loadedRoutesHash.indexOf(pg.city + "/" + pg.transport + "/") != 0)($("inputRoutes") || {}).value = pg.routesFilter = "", pg.inputRoutes_Blur(), pg.fLoadRoutesList();
    ($("divContentRoutes") || {
        style: {}
    }).style.display = pg.transport === "stop" || pg.transport === "plan" || pg.transport === "favourites" || pg.transport === "contacts" || pg.transport === "help" ? "none" : "block", ($("divContentDepartingRoutes") || {
        style: {}
    }).style.display = pg.transport === "stop" ? "block" : "none", ($("divContentPlanner") || {
        style: {}
    }).style.display = pg.transport === "plan" ? "block" : "none"
}, pg.footerHTML = function() {
    var a = ["<div class=\"footer-info\">"],
        b = cfg.cities[pg.city].footer;
    b = b && (b[pg.language] || b.en), b && a.push(b);
    if (!cfg.isMobilePage) {
        cfg.programmedBy && a.push("<p id=\"programmedBy\" class=\"smalltext graytext\">" + (cfg.programmedBy[pg.language] || cfg.programmedBy.en || "") + "</p>");
        var c = cfg.cities[cfg.defaultCity].webcounter;
        c && (a.push("<autobusuData id=\"webcounter\" href=\"http://whos.amung.us/stats/" + c + "\" target=\"_blank\" style=\"float:right; position:relative; bottom:20px; padding:10px;\">"), a.push("<img width=\"80\" height=\"15\" border=\"0\" title=\"web tracker\" alt=\"web tracker\" src=\"//whos.amung.us/swidget/" + c + ".gif\"></autobusuData>"))
    }
    a.push("</div>");
    return a.join("")
}, pg.fLoadRoutesList = function(a) {
    if (typeof mobile == "undefined" || typeof a != "undefined") {
        var b = $("divContentRoutesResults");
        if (typeof ti.routes !== "object") {
            pg.loadedRoutesHash = "", (b || {}).innerHTML = "<br/>" + i18n.receivingData, setTimeout(function() {
                pg.fLoadRoutesList(a)
            }, 200);
            return
        }
        var c = $("inputRoutes") && ($("inputRoutes").className == "empty" ? "" : ti.toAscii($("inputRoutes").value, 2));
        if (c && pg.routesFilter != c) {
            pg.routesFilter = c, setTimeout(function() {
                pg.fLoadRoutesList(a)
            }, 200);
            return
        }
        pg.routesFilter = c;
        if (pg.loadedRoutesHash == pg.city + "/" + pg.transport + "/" + c && typeof mobile == "undefined" && pg.transport != "favourites") return;
        pg.loadedRoutesHash = pg.city + "/" + pg.transport + "/" + c;
        var d = ti.fGetRoutes(pg.city, pg.transport, null, null, null, c || (cfg.city.showAllDirections ? "*" : ""));
        a && a(d);
        if (!d || !d.length) {
            (b || {}).innerHTML = "<br/>&nbsp;" + i18n.noRoutesFound;
            return
        }
        var e = function() {
            var a = [];
            a.push("<table id=\"tblRoutes\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            for (var b = 0; b < d.length; b++) a.push(pg.fMakeRouteRowHTML(d[b], "tblRoutes", b));
            a.push("</tbody></table><br/>"), a.push(pg.footerHTML()), pg.replaceHtml($("divContentRoutesResults"), a.join(""))
        };
        if (pg.browserVersion <= 8 && d.length > 25 && !c) {
            (b || {}).innerHTML = "<br/>" + i18n.loading, setTimeout(e, 100);
            return
        }
        e()
    }
}, pg.fLoadDepartingRoutes = function(a, b) {
    pg.loadedDepartingRoutes = null, pg.realTimeDepartures.timer && a && (clearTimeout(pg.realTimeDepartures.timer), pg.realTimeDepartures.timer = 0);
    var c = $("divContentDepartingRoutesResults");
    pg.inputStop && pg.stopsByIP && pg.inputStop.indexOf("192.168.") >= 0 && cfg.city.defaultTransport == "tablo" && (pg.IP = pg.inputStop, pg.tablo = pg.stopsByIP[pg.IP] || {
        stops: "unknown"
    }, pg.inputStop = pg.tablo.stops, reloadTabloContent());
    var d = ti.fGetAnyStopDetails(pg.inputStop);
    if (a) var e = [];
    if (cfg.city.defaultTransport != "tablo")
        if (d.id) $("inputStop") && ($("inputStop").value = pg.inputStopText = d.name || "", $("inputStop").className = ""), pg.startStop || (pg.startStop = pg.inputStop);
        else if (c && !pg.inputStop && typeof ti.stops == "object") {
            var f = pg.fUrlSet({
                hashForMap: "map"
            }, !0);
            $("divContentDepartingRoutesHeader").style.display = "none", (c || {}).innerHTML = ("<p class=\"help\">" + i18n.searchDeparturesHelp + "<p/><p class=\"help\">" + i18n.tripPlannerHelpMap).replace(/<a>/g, "<autobusuData class=\"underlined map\" href=\"#" + f + "\">"), document.activeElement && document.activeElement.id !== "inputStop" && ($("inputStop").value = i18n.startStop, $("inputStop").className = "empty", setTimeout(function() {
                try {
                    $("inputStop").focus()
                } catch (a) {}
            }, 100));
            return
        }
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object") cfg.city.defaultTransport != "tablo" && ((c || {}).innerHTML = "<br/>" + i18n.receivingData), setTimeout(function() {
        pg.fLoadDepartingRoutes(a, b)
    }, 200);
    else {
        pg.loadedDepartingRoutes = pg.inputStop, pg.stopsSuggestedForText = d.name;
        if (cfg.city.defaultTransport == "tablo")($("spanContentDepartingRoutesStop") || {}).innerHTML = d.name || "", d.name && d.name.length >= 30 && (($("spanContentDepartingRoutesStop") || {
            style: {}
        }).style.fontSize = "54px"), ($("spanDepartureDate") || {}).innerHTML = ti.printTime(ti.dateToMinutes(new Date));
        else {
            var g = (d.street ? ", " + d.street : "") + (d.area && !cfg.cities[pg.city].skipStopArea ? ", " + d.area : "") + (d.city && !cfg.cities[pg.city].skipStopCity ? ", " + d.city : "");
            d[cfg.cities[pg.city].stopFareZone || "noFareZone"] && (g += ", " + i18n.fareZone + " " + d[cfg.cities[pg.city].stopFareZone]), g = g.length > 0 ? "<span class=\"details\"> (" + g.substring(2) + ")</span>" : "";
            var h = [],
                f = pg.fUrlSet({
                    hashForMap: "map"
                }, !0),
                i = pg.transfers = ti.fGetRoutesAtStop(pg.inputStop, !1),
                j = {},
                k = null,
                h = [];
            for (var l = 0; l < i.length; l++) {
                var m = i[l],
                    n = ti.toAscii([m.city, m.transport, m.num].join(","), !0);
                if (j[n]) continue;
                var o = {
                    city: m.city,
                    transport: m.transport,
                    num: ti.toAscii(m.num, !0),
                    dirType: m.dirType,
                    stopId: m.stopId
                };
                j[n] = o;
                var p = pg.fUrlSet({
                    schedule: o
                }, !0);
                k !== m.transport && (k = m.transport, h.push(" <span class=\"icon icon_narrow icon_" + m.transport + "\" data-transport=\"" + m.transport + "\"></span>&nbsp;"));
                var q = "<autobusuData class=\"hover transfer" + k + "\" href=\"#" + p + "\" title=\"" + (m.name || "").replace(/"/g, "") + "\">" + i[l].numHTML.replace(/\s/g, "&nbsp;") + "</autobusuData> ";
                h.push(q)
            }
            h.push("<span style=\"display:inline-block; width:2px;\"></span>"), ($("spanContentDepartingRoutesStop") || {}).innerHTML = "<autobusuData href=\"#" + f + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></autobusuData>" + i18n.stop + " <strong>" + d.name + "</strong>" + g + h.join("") + "<br />"
        }
        h = [];
        var r = new Date,
            s = -1;
        typeof mobile != "undefined" && typeof b != "undefined" ? s = b : $("inputDepartureDate") && (s = +$("inputDepartureDate").value);
        var t = {
            start_stops: pg.inputStop,
            finish_stops: "",
            transport: {}
        };
        s < 0 ? (t.date = r, startTime = ti.dateToMinutes(r) % 1440) : (t.date = new Date(r.getFullYear(), r.getMonth(), r.getDate() + s), startTime = -1);
        var u = dijkstra(t, cfg.city.defaultTransport == "tablo" || typeof mobile != "undefined" ? startTime : 0 * startTime, 0);
        if (cfg.city.urlVehicleDepartures && s < 0) {
            c && ($("divContentDepartingRoutesHeader").style.display = "", (c || {}).innerHTML = "<br/>" + i18n.loading), pg.departuresBySchedule = u, pg.fProcessVehicleDepartures(null, a);
            if (cfg.city.defaultTransport != "tablo") return
        }
        if (!u || !u.length) {
            (c || {}).innerHTML = "<br/>" + i18n.noDepartingRoutes;
            return
        }
        h.push("<table id=\"tblDepartingRoutes\" class=\"routes-list\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
        var v = {};
        for (var w = 0; w < u.length; w++) {
            var m = u[w].route,
                x = ti.toAscii(m.city + ";" + m.transport + ";" + m.num + ";" + m.name + ";" + m.stopId, !0);
            if (x in v) {
                var y = v[x];
                u[y].route.departures.push(u[w].start_time), u[y].route.tripNums.push(u[w].tripNum)
            } else v[x] = w, u[w].route.departures = [u[w].start_time], u[w].route.tripNums = [u[w].tripNum]
        }
        for (var w = 0, y = 0; w < u.length; w++) u[w].route.departures && (u[w].route.departures.sort(function(a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0
        }), u[w].route.departures[0] < 0 && u[w].route.num.indexOf("(") >= 0 ? w = w : (a ? e.push(pg.fMakeRouteRowHTML(u[w].route, "tblDepartingRoutes", y, startTime, !0, d.id)) : h.push(pg.fMakeRouteRowHTML(u[w].route, "tblDepartingRoutes", y, startTime, !1, d.id)), ++y));
        if (cfg.city.defaultTransport == "tablo") {
            pg.realTimeData && (pg.realTimeData = "", pg.realTimeDepartures.timer2 && (clearTimeout(pg.realTimeDepartures.timer2), pg.realTimeDepartures.timer2 = setTimeout(function() {
                pg.realTimeDepartures.timer2 = 0, pg.fLoadDepartingRoutes()
            }, 15e3))), pg.fMakeTabloHTML(u);
            return
        }
        c && ((c || {}).innerHTML = h.join("") + "</tbody></table>", $("divContentDepartingRoutesHeader").style.display = ""), a && a(e)
    }
}, pg.fMakeTabloHTML = function(a) {
    if (pg.inputStop == "unknown") setTimeout(function() {
        location.reload(!0)
    }, 3e4), $("divContentDepartingRoutes").innerHTML = "<p style=\"font-size:96px; padding-top:128px; text-align:center; text-transform:none;\">Vyksta sistemos derinimo<br />darbai</p>" + (cfg.defaultCity != "vilnius" ? "" : "<div style=\"position:absolute; bottom:20px; right:20px; color:#606060; font-size:34px; text-transform:none;\"><img src=\"" + pg.imagesFolder + "sisp_logo.png\" /><br />www.vilniustransport.lt</div>");
    else {
        var b = [];
        for (var c = a.length; --c >= 0;) {
            var d = a[c].route;
            if (d.departures)
                for (var e = d.departures.length; --e >= 0;) b.push({
                    route: d,
                    start_time: d.departures[e],
                    vehicleID: ((d.vehicles || [])[e] || {}).vehicleID
                })
        }
        b.sort(function(a, b) {
            if (a.start_time < b.start_time) return -1;
            if (a.start_time > b.start_time) return 1;
            return ti.naturalSort(a.route.num, b.route.num)
        });
        var f = new Date,
            g = (f.getTime() - f.setHours(10, 0, 0, 0)) / 1e3 + 36e3;
        g /= 60;
        var h;
        for (h = 0; h < (cfg.defaultCity == "vilnius" ? 6 : 9);) {
            var i = {},
                j = !1;
            for (var c = 0; c < b.length; c++) {
                var k = b[c],
                    d = k.route,
                    l = ti.toAscii(d.city + ";" + d.transport + ";" + d.num + ";", !0),
                    m, n = d.destination || d.name,
                    o = ["–", "—", "- ", " -", "-"];
                if (cfg.defaultCity != "tallinna-linn" || !pg.realTimeData)
                    for (var p = 0; p < o.length; ++p) {
                        e = n.lastIndexOf(o[p]);
                        if (e >= 3) {
                            n = n.substring(e + 1).trim();
                            if (o[p + 1] == "-") break
                        }
                    }
                n.toLowerCase().slice(-10) == "oro uostas" && (n = "oro uostas&nbsp;&nbsp;&nbsp;<img style=\"vertical-align: baseline;\" height=\"52\" width=\"52\" src=\"images/airport_blue_52.png\" />"), ({
                    4008: !0,
                    595: !0,
                    3009: !0
                })[(k.vehicleID || "").replace("Z", "")] && (n += "&nbsp;&nbsp;<img style=\"vertical-align: baseline;\" height=\"52\" width=\"72\" src=\"images/bicycle_blue_52.png\" />");
                if (k.html || k.start_time < 0) continue;
                if (!pg.realTimeData && k.start_time <= g) continue;
                if (k.start_time <= g - .5) continue;
                if (cfg.defaultCity == "klaipeda" && k.start_time <= g + .5) continue;
                pg.realTimeData && (c = c + 1 - 1);
                if (cfg.defaultCity == "tallinna-linn") {
                    if (";tram;trol;bus;".indexOf(";" + d.transport + ";") < 0) continue;
                    m = ti.fGetStopDetails(k.route.stopId), l = l + ti.toAscii(m.name, !0) + ";";
                    if (i[l]) {
                        var q;
                        k.start_time < g + 60 && pg.realTimeData ? q = Math.floor(k.start_time - g + .5) + " min" : q = ti.printTime(Math.floor(k.start_time + .5));
                        var r = i[l];
                        r.html = (r.html || "").replace("%1", q);
                        continue
                    }
                } else if (i[l]) continue;
                i[l] = k, j = !0;
                var s = /[ztZT]/,
                    t = !1,
                    u = "";
                cfg.defaultCity == "tallinna-linn" ? t = (cfg.city.lowFloorVehicles || "").indexOf("," + k.vehicleID + ",") >= 0 : t = s.test((k.vehicleID || "x").slice(-1)), cfg.defaultCity == "klaipeda" && ((k.vehicleID || "x").slice(-1).toLowerCase() == "k" && (u = "<div class=\"usb\"><img src=\"christmastree.png\"></div>", t = s.test(k.vehicleID.slice(-2, -1)))), k.html = "<tr><td><div><span class=\"icon icon_" + d.transport + "\"></span></div></td><td><div class=\"num " + d.transport + "\">" + d.numHTML + "</div></td><td class=\"name\" style=\"position:relative; left:0;top:0;\"><div>" + n + "</div>" + ((k.vehicleID || "").replace("Z", "") == "937" && cfg.defaultCity == "vilnius" ? "<div class=\"usb\"><img src=\"usb.png\"></div>" : "") + u + (t ? "<div class=\"wheelchair\">" + (cfg.defaultCity != "tallinna-linn" ? "<img src=\"wheelchair.svg\">" : "") + "</div>" : "") + "</td><td class=\"time\"><div>", k.start_time < g + 60 && pg.realTimeData ? cfg.defaultCity == "klaipeda" && k.start_time < g + 1 ? k.html += "<1 min." : k.html += Math.floor(k.start_time - g + .5) + " min" + (cfg.defaultCity != "tallinna-linn" ? "." : "") + (pg.realTimeData ? "" : "*") : k.html += ti.printTime(Math.floor(k.start_time + .5)), k.html += "</div></td>";
                if (cfg.defaultCity == "tallinna-linn") {
                    k.html += "<td><div class=\"next-departures\">%1<br/>%1</div></td>";
                    var m = ti.fGetStopDetails(k.route.stopId);
                    k.html += "<td><div class=\"white-circle\">&nbsp;</div></td><td><div class=\"stop_name\"><b>" + (m.name || "") + "</b><br/><i>" + (m.street || "") + "</i></div></td>"
                }
                k.html += "</tr>";
                if (cfg.defaultCity != "tallinna-linn")
                    if (++h >= (cfg.defaultCity == "vilnius" ? 6 : 9)) break
            }
            if (cfg.defaultCity == "tallinna-linn") break;
            if (!j) break
        }
        var v = "<table id=\"tblDepartingRoutes\" class=\"routes-list\" cellpadding=\"0\" cellspacing=\"0\"><tbody><tr><th colspan=\"2\">Maršrutas</th><th class=\"name\">Kryptis</th><th class=\"time\">Laikas</th></tr>";
        for (var c = 0, h = 0; c < b.length; c++)
            if (b[c].html) {
                v += b[c].html.replace("%1", "&nbsp;").replace("%1", "&nbsp;"), ++h;
                if (cfg.defaultCity == "tallinna-linn" && h >= 1007) break
            }
        if (cfg.defaultCity == "tallinna-linn" && h < 8) {
            v += "<tr class=\"bottom\"><td rowspan=\"" + (8 - h).toString() + "\" colspan=\"7\"", h > 4 ? v += "><div>" : v += " class=\"phone\"><div><span id=\"spanPhone1\"></span><br/><span id=\"spanPhone2\"></span><br/>", v += "transport.tallinn.ee</div></td></tr>";
            for (; ++h < 8;) v += "<tr class=\"bottom\"></tr>"
        }
        v += "</tbody></table>", ($("spanDepartureDate") || {}).innerHTML = ti.printTime(ti.dateToMinutes(new Date)), ($("divContentDepartingRoutesResults") || {}).innerHTML = v, ($("divContentDepartingRoutesHeader") || {
            style: {}
        }).style.display = "";
        if (pg.tablo) {
            var w = new Date;
            if (pg.tablo.validFrom instanceof Date && !isNaN(pg.tablo.validFrom.getTime()) && (!pg.tablo.validTo || pg.tablo.validTo instanceof Date && !isNaN(pg.tablo.validTo.getTime()))) {
                if (!pg.tablo.validFrom || w < pg.tablo.validFrom || pg.tablo.validTo && w > pg.tablo.validTo) pg.tablo.message = !1
            } else pg.tablo.message = !1;
            if (cfg.defaultCity != "klaipeda")
                if (pg.tablo.imageValidFrom instanceof Date && !isNaN(pg.tablo.imageValidFrom.getTime()) && (!pg.tablo.imageValidTo || pg.tablo.imageValidTo instanceof Date && !isNaN(pg.tablo.imageValidTo.getTime()))) {
                    if (!pg.tablo.imageValidFrom || w < pg.tablo.imageValidFrom || pg.tablo.imageValidTo && w > pg.tablo.imageValidTo) pg.tablo.image = !1
                } else pg.tablo.image = !1;
            ($("TabloImage") || {
                style: {}
            }).style.display = pg.tablo.image ? "block" : "none", pg.tablo.image && (($("TabloImage") || {
                style: {}
            }).style.backgroundImage = cfg.defaultCity == "vilnius" && location.hostname.indexOf("stops.lt") < 0 && window.location.hostname != "xxxlocalhost" ? "url(\"http://192.168.14.14/Media/" + pg.tablo.image + "\")" : "url(\"Media/" + pg.tablo.image + "\")"), ($("divTabloMessagePanel") || {
                style: {}
            }).style.display = pg.tablo.message ? "block" : "none", ($("divTabloMessage") || {
                style: {}
            }).style.visibility = pg.tablo.message ? "visible" : "hidden"
        }
    }
}, pg.fProcessVehicleDepartures = function(a, b) {
    if (typeof mobile == "undefined" || typeof b != "undefined") {
        if (cfg.defaultCity == "tallinna-linn") {
            var c = new Date;
            if (c >= new Date(2018, 1, 23, 19, 0) && c <= new Date(2018, 1, 23, 23, 59) || c >= new Date(2018, 1, 24, 7, 0) && c <= new Date(2018, 1, 24, 14, 30)) {
                pg.realTimeData = "";
                if (typeof b == "function") b([]);
                else {
                    var d = $("divContentDepartingRoutesResults");
                    (d || {}).innerHTML = "<br/>" + i18n.stopNoRealtimeDepartures
                }
                return
            }
        }
        if (pg.realTimeDepartures.timer) {
            clearTimeout(pg.realTimeDepartures.timer), pg.realTimeDepartures.timer = 0;
            if (typeof mobile != "undefined" && ["favourites", "schedule4", "schedule5", "stop", "index"].indexOf(mobile.current_page) == -1) return
        }
        if (!cfg.city.urlVehicleDepartures) return;
        pg.realTimeDepartures.timer = setTimeout(function() {
            pg.realTimeDepartures.timer = 0, pg.fProcessVehicleDepartures(null, b)
        }, location.hostname == "xxxlocalhost" ? 999e4 : 1e4);
        if (cfg.isApp && a && typeof a == "object") {
            b(a);
            return
        }
        if (typeof a !== "string") {
            pg.realTimeDepartures.timer2 || (pg.realTimeDepartures.timer2 = setTimeout(function() {
                pg.realTimeDepartures.timer2 = 0, pg.fLoadDepartingRoutes()
            }, location.hostname == "localhost" ? 15e3 : pg.realTimeData ? 9e5 : 15e3));
            if (typeof mobile == "object" && ["favourites", "index"].indexOf(mobile.current_page) != -1 || pg.transport == "favourites" && typeof pg.favouriteStops != "undefined") var e = (pg.favouriteStops || "").split(",");
            else if ((typeof mobile == "object" || cfg.defaultCity == "tallinna-linn") && pg.schedule && pg.schedule.stopId) {
                var e = [pg.schedule.stopId];
                if (pg.schedules) {
                    e = [];
                    for (var f in pg.schedules) {
                        var g = pg.schedules[f];
                        g && e.indexOf(g.stopId) == -1 && e.push(g.stopId)
                    }
                }
            } else var e = (pg.inputStop || "").split(",");
            if (e.join(",").indexOf(";") != -1) return;
            pg.stopsBySiriID = {};
            for (var h = 0; h < e.length; ++h) {
                var i = (ti.stops[e[h]] || {}).siriID || 0;
                i && (pg.stopsBySiriID[i] = e[h], e[h] = i)
            }
            if (e && e.length == 1 && e[0] == "") return;
            (!pg.visibility || pg.visibility == "visible") && ti.fDownloadUrl("GET", cfg.city.urlVehicleDepartures + "?stopid=" + e.join(",") + "&time=" + +(new Date), function(a) {
                pg && pg.fProcessVehicleDepartures(a, b)
            }, cfg.city.defaultTransport == "tablo" ? !0 : !1);
            return
        }
        a && pg.realTimeDepartures.timer2 && (clearTimeout(pg.realTimeDepartures.timer2), pg.realTimeDepartures.timer2 = 0);
        if (a && a.substring(0, 6) == "reload") {
            location.reload(!0);
            return
        }
        a = a || pg.realTimeData || "", pg.realTimeData = a;
        if (!a && cfg.city.defaultTransport == "tablo") return;
        a = a.split("\n");
        if (pg.realTimeDepartures.$mapPopup)
            if (!pg.realTimeDepartures.mapStop)
                if (pg.realTimeDepartures.vehicleID) {
                    var j = {};
                    for (var h = 0; h < a.length; h++) {
                        var k = a[h].trim().split(",");
                        while (k[k.length - 1] == "") k.pop();
                        if (k.length < 2) continue;
                        var l = ({
                            1: "trol",
                            3: "tram",
                            4: "minibus"
                        })[k[0]] || "bus";
                        j[l + ";" + k[3]] = {
                            transport_number: k[0],
                            route_number: k[1],
                            direction_type: k[2].replace(/>/g, "-"),
                            stops: k.slice(4)
                        }
                    }
                    var m = j[pg.realTimeDepartures.vehicleTransport + ";" + pg.realTimeDepartures.vehicleID],
                        n = "<br/>No data available";
                    if (m) {
                        n = [];
                        for (var h = 0; h < m.stops.length - 1; h += 2) n.push(ti.printTime((+m.stops[h + 1] + 30) / 60) + "&nbsp;&nbsp;<autobusuData href=\"#stop/" + m.stops[h] + "/map\">" + ti.fGetStopDetails(m.stops[h]).name) + "</autobusuData>";
                        n = n.join("</br>")
                    }
                    var o = pg.realTimeDepartures.vehicleTransport,
                        p = pg.realTimeDepartures.vehicleRouteNum,
                        q = ti.fGetRoutes(cfg.defaultCity, o, p, m ? m.direction_type : !1),
                        r = "";
                    q && q.length && q[0].name && (r = "<strong>" + q[0].name + "</strong></br>");
                    var s = "<div class=\"baloon_close\"></div><div class=\"baloon_content\"><span class=\"baloon_title\"><span class=\"icon icon_" + o + "\"></span><span class=\"num num3 " + o + "\">" + (p || "?") + "</span>" + pg.realTimeDepartures.vehicleID + "</span><br/>" + r + "<div style=\"padding:8px 20px 0 0; height:150px; overflow-y:auto; overflow-x:hidden;\">" + n + "</div></div>";
                    pg.realTimeDepartures.vehicleID = null
                }
        if (pg.transport == "stop" && pg.loadedDepartingRoutes && pg.loadedDepartingRoutes != null && +($("inputDepartureDate") || {
                value: 0
            }).value === -1 || cfg.city.defaultTransport == "tablo" && pg.loadedDepartingRoutes || typeof mobile == "object" && pg.schedule && pg.schedule.stopId && pg.loadedDepartingRoutes || typeof mobile == "object" && pg.loadedDepartingRoutes && pg.transport === "stop" && jQuery("#stop .nav-departures li.active").attr("data-departure") == "-1" || typeof mobile == "object" && mobile.current_page == "favourites" && pg.loadedDepartingRoutes || typeof mobile == "object" && mobile.current_page == "index" && pg.loadedDepartingRoutes || typeof b == "function" && pg.loadedDepartingRoutes && (pg.schedule || pg.transport == "favourites" && typeof pg.favouriteStops != "undefined")) {
            var t = {},
                u = pg.loadedDepartingRoutes.split(",");
            for (var h = 0; h < u.length; ++h) t[u[h]] = !0;
            var v = [];
            v.push("<table id=\"tblDepartingRoutes\" class=\"routes-list\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\"><tbody>");
            var w = {},
                x = [],
                y = ti.dateToMinutes(new Date, !0) % 1440;
            y < 180 && cfg.defaultCity != "tallinna-linn" && (y += 1440);
            if (cfg.defaultCity != "rostov") {
                var z = 1e4;
                for (var h = 0; h < a.length; h++) {
                    var k = a[h].trim().split(","),
                        A, B;
                    if (h == 0 && k[0] !== "stop") continue;
                    if (k.length >= 2 && k[0] === "stop") {
                        H = k[1];
                        if (cfg.defaultCity == "tallinna-linn") H = pg.stopsBySiriID[H];
                        else if (cfg.city.urlVehicleDepartures.indexOf("departures.txt") >= 0) {
                            if (t[H]) continue;
                            for (; h < a.length - 1; h++)
                                if (a[h + 1].trim().indexOf("stop") >= 0) break
                        }
                        continue
                    }
                    if (k.length <= 3) continue;
                    if (cfg.defaultCity === "tallinna-linn") {
                        A = {
                            city: cfg.defaultCity,
                            transport: k[0],
                            num: k[1],
                            numHTML: k[1],
                            name: k[4] || "",
                            destination: k[4] || ""
                        };
                        var C = [A.city, A.transport, A.num.toLowerCase()].join("_");
                        if (pg.good_siri_direction && !pg.good_siri_direction(C, pg.transfers, A.destination)) continue;
                        B = +k[2], z > B - y * 60 && (z = B - y * 60), B = Math.floor(B / 60);
                        for (var D = 0; D < pg.transfers.length; ++D)
                            if (A.num === pg.transfers[D].num && A.transport === pg.transfers[D].transport && A.city === pg.transfers[D].city && H === pg.transfers[D].stopId) {
                                var E = A.destination;
                                A = pg.transfers[D], A.destination = E;
                                break
                            }
                    } else {
                        typeof ti.transportRoutes == "function" && (k[0] = ti.transportRoutes(k[1]));
                        if (cfg.defaultCity == "vilnius" && k[0] == "bus" && k[1].length && k[1].charAt(k[1].length - 1).toLowerCase() == "n") k[0] = "nightbus", cfg.city.defaultTransport == "tablo" && (k[1] = k[1].substring(0, k[1].length - 1)), A = null;
                        else {
                            A = (ti.fGetRoutes(cfg.defaultCity, k[0], k[1], k[2], !0) || [])[0];
                            if (!A && !k[5]) continue
                        }
                        A = A || {
                            city: cfg.defaultCity,
                            transport: k[0],
                            num: k[1],
                            numHTML: k[1],
                            name: k[5] || "",
                            destination: k[5] || ""
                        }, A && k[5] && (A.name = A.name || k[5], A.destination = k[5]), B = +k[3] / 60
                    }
                    var f = ti.toAscii(A.city + ";" + A.transport + ";" + A.num + ";" + A.name, !0);
                    f += ";" + H;
                    var F = w[f];
                    if (B < y - .5) B = B;
                    else if (F) {
                        if (cfg.defaultCity != "tallinna-linn" || B <= y + 30) F.route.departures.push(B), F.route.vehicles.push({
                            vehicleID: k[4],
                            departure: B
                        })
                    } else A.departures = [B], A.vehicles = [{
                        vehicleID: k[4],
                        departure: B
                    }], A.stopId = H, w[f] = {
                        route: A
                    }
                }
                for (var f in w) {
                    var A = w[f];
                    A.route.departures.sort(function(a, b) {
                        return a - b
                    }), A.route.vehicles.sort(function(a, b) {
                        return a.departure - b.departure
                    }), A.start_time = A.route.vehicles[0].departure, x.push(A)
                }
                x.sort(function(a, b) {
                    if (a.route.sortKey < b.route.sortKey) return -1;
                    if (a.route.sortKey > b.route.sortKey) return 1;
                    return ti.naturalSort(a.route.num, b.route.num)
                }), pg.realTimeDepartures.timer && cfg.defaultCity === "tallinna-linn" && z >= 30 && (clearTimeout(pg.realTimeDepartures.timer), pg.realTimeDepartures.timer = setTimeout(function() {
                    pg.realTimeDepartures.timer = 0, pg.fProcessVehicleDepartures(null, b)
                }, z <= 90 ? 3e4 : 6e4))
            } else {
                for (var h = 0; h < a.length; h++) {
                    var k = a[h].trim().replace(/,/g, "|");
                    k = k.split("|");
                    var G = k.length - 1;
                    if (G < 4) continue;
                    var A = {
                            city: cfg.defaultCity,
                            transport: ({
                                1: "trol",
                                3: "tram",
                                4: "minibus"
                            })[k[0]] || "bus",
                            num: k[1],
                            name: k[2].replace(/>/g, "-")
                        },
                        q = ti.fGetRoutes(A.city, A.transport, A.num, A.name) || [];
                    A = q[0] || A;
                    var f = ti.toAscii(A.city + ";" + A.transport + ";" + A.num + ";" + A.name, !0);
                    for (var D = 4; D < G; D += 2) {
                        var H = k[D];
                        if (D > 4 && H.indexOf("#") >= 0) break;
                        if (t[H] && k[D + 1]) {
                            var F = w[f],
                                I = +k[D + 1] / 60;
                            F ? F.route.departures.push(I) : (A.departures = [I], A.stopId = H, w[f] = {
                                route: A
                            })
                        }
                    }
                }
                for (var f in w) {
                    var A = w[f];
                    A.route.departures.sort();
                    for (var h = 1, D = 0; h < A.route.departures.length; ++h) A.route.departures[D] != A.route.departures[h] && (D++, A.route.departures[D] = A.route.departures[h]);
                    A.route.departures.length = D + 1, x.push(A)
                }
                x.sort(function(a, b) {
                    if (a.route.departures[0] < b.route.departures[0]) return -1;
                    if (a.route.departures[0] > b.route.departures[0]) return 1;
                    return 0
                })
            }
            if (typeof b == "function") {
                var J = [];
                for (var h = 0; h < x.length; h++) J[h] = pg.fMakeRouteRowHTML(x[h].route, "tblDepartingRoutes", 0, y, !0), J[h].timetowait = Math.floor(x[h].route.departures[0] - y + .5);
                b(J)
            } else if (cfg.city.defaultTransport == "tablo") pg.fMakeTabloHTML(x);
            else {
                for (var h = 0; h < x.length; h++) x[h].route.timetowait = Math.floor(x[h].route.departures[0] - y + .5), v.push(pg.fMakeRouteRowHTML(x[h].route, "tblDepartingRoutes", 0, -1, !1, x[h].route.destination));
                ($("divContentDepartingRoutesResults") || {}).innerHTML = v.join("") + "</tbody></table>"
            }
        }
    }
}, pg.fLoadPlannerTab = function(a, b) {
    a === !0 && (pg.optimalResults = null, pg.loadedPlannerParams = null, pg.hashForMap = "");
    if (b) var c = {
        errors: []
    };
    var d = "" + ((typeof mobile != "undefined" ? jQuery(".inputTime").val() : ($("inputTime") || {}).value) || "");
    d === "" ? (d = ti.dateToMinutes(new Date) % 1440, ($("inputTime") || {}).value = ti.printTime(d), typeof mobile != "undefined" && jQuery(".inputTime").val(ti.printTime(d))) : d = ti.toMinutes(d);
    var e = ti.fGetAnyStopDetails(pg.inputStart),
        f = ti.fGetAnyStopDetails(pg.inputFinish);
    f.id ? (($("inputFinish") || {}).value = f.name || "", ($("inputFinish") || {}).className = "") : !pg.inputFinish && typeof ti.stops == "object" && (($("divContentPlannerResults") || {}).innerHTML = i18n.typeFinishStop, b && c.errors.push({
        text: i18n.typeFinishStop
    }), document.activeElement && document.activeElement.id !== "inputFinish" && (($("inputFinish") || {}).value = i18n.finishStop, ($("inputFinish") || {}).className = "empty"));
    if (e.id)($("inputStart") || {}).value = e.name || "", ($("inputStart") || {}).className = "";
    else if (!pg.inputStart || typeof ti.stops == "object")($("divContentPlannerResults") || {}).innerHTML = i18n.typeStartStop, b && c.errors.push({
        text: i18n.typeStartStop
    }), document.activeElement && document.activeElement.id !== "inputStart" && (($("inputStart") || {}).value = i18n.startStop, ($("inputStart") || {}).className = "empty");
    if (typeof ti.routes !== "object" || typeof ti.stops !== "object")($("divContentPlannerResults") || {}).innerHTML = "<br/>" + i18n.receivingData, setTimeout(function() {
        pg.fLoadPlannerTab(!1, b)
    }, 200);
    else {
        if (!pg.inputStart && !pg.inputFinish || (pg.loadedPlannerParams || "").indexOf("clear") >= 0) {
            pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish, pg.optimalResults = null, pg.hashForMap && pg.hashForMap != "map" && (pg.map = {}, pg.hashForMap = "map", pg.fMapShow());
            var g = pg.fUrlSet({
                hashForMap: "map"
            }, !0);
            ($("divContentPlannerResults") || {}).innerHTML = "<p class=\"help\">" + i18n.tripPlannerHelp + "</p><p class=\"help\">" + i18n.tripPlannerHelpMap.replace(/<a>/g, "<autobusuData class=\"underlined map\" href=\"#" + g + "\">") + "</p>", b && (c.errors.push({
                text: i18n.tripPlannerHelp
            }), b(c));
            return
        }
        pg.loadedPlannerParams = pg.inputStart + "/" + pg.inputFinish;
        if (!e.id || !f.id) {
            b && b(c);
            return
        }
        var h = new Date,
            i = new Date(h.getFullYear(), h.getMonth(), h.getDate() + +(typeof mobile != "undefined" ? jQuery(".inputDate").val() : $("inputDate").value)),
            j = {
                start_stops: pg.inputStart == "gps" ? [ti.stops.gps.lat, ti.stops.gps.lng].join(";") : pg.inputStart,
                finish_stops: pg.inputFinish == "gps" ? [ti.stops.gps.lat, ti.stops.gps.lng].join(";") : pg.inputFinish,
                reverse: typeof mobile != "undefined" ? parseInt(jQuery(".inputReverse").val(), 10) : parseInt($("inputReverse").value, 10),
                date: i,
                start_time: d,
                lowFloor: typeof mobile != "undefined" ? jQuery(".checkHandicapped").is(":checked") : $("checkHandicapped").checked,
                transport: {},
                route_nums: ((typeof mobile != "undefined" ? jQuery(".inputRoutesFilter").val() : ($("inputRoutesFilter") || {}).value) || "").trim(),
                walk_speed_kmh: typeof mobile != "undefined" ? parseInt(jQuery(".inputWalkSpeed").val() || 4, 10) : parseInt($("inputWalkSpeed").value || 4, 10),
                walk_max: typeof mobile != "undefined" ? jQuery(".inputWalkMax").val() : $("inputWalkMax").value,
                change_time: typeof mobile != "undefined" ? parseInt(jQuery(".inputChangeTime").val() || 3, 10) : parseInt($("inputChangeTime").value || 3, 10),
                callback1: b || (typeof mobile != "undefined" ? mobile.renderPlannerResults : pg.fPrintOptimalTrips),
                callback: b || (typeof mobile != "undefined" ? mobile.renderPlannerResults : pg.fPrintOptimalTrips)
            },
            k = pg.fGetCity(pg.city);
        for (var l = 1; l <= 2; l++) {
            for (var m = 0, n = cfg.cities[k].transport; m < n.length; m++) j.transport[n[m]] = typeof mobile != "undefined" ? jQuery(".checkbox" + n[m]).is(":checked") : ($("checkbox" + n[m]) || {
                checked: !0
            }).checked;
            k = cfg.cities[k].region;
            if (!k || !cfg.cities[k]) break
        }
        cfg.defaultCity == "vilnius" && "plane" in j.transport && (j.transport.plane = 120, j.mode = "vintra", j.shapes_url = "http://www.stops.lt/shapes/"), ($("divContentPlannerResults") || {}).innerHTML = "<br/>" + i18n.calculating;
        if (typeof mobile == "undefined" || typeof mobile != "undefined" && (pg.hashForMap || mobile.tallinnPlannerReady) || a) typeof mobile != "undefined" && jq("#loading").show(), setTimeout(function() {
            ti.findTrips(j)
        }, 100)
    }
}, pg.fPrintOptimalTrips = function(a, b, c) {
    var d = pg.optimalResults = a.results;
    pg.map = {};
    var e = [];
    for (var f = 0; f < d.length; f++) {
        var g = d[f],
            h = d[f].legs,
            i = [],
            j = [];
        for (var k = 0; k < h.length; k++) {
            var l = h[k],
                m = l.route,
                n = (h[k + 1] || {
                    route: null
                }).route;
            if (m && m.transport) {
                n && m.city === n.city && m.transport === n.transport && m.num === n.num && (cfg.defaultCity != "intercity" && (l.finish_stop.name = h[k + 1].finish_stop.name, l.finish_time = h[k + 1].finish_time, ++k)), j.push("<span class=\"icon icon_narrow icon_" + m.transport + "\" title=\"" + i18n.transport1[m.transport] + " " + m.num + " " + i18n.towards + " " + m.name + "\"></span>"), g.direct_trip && m.num.length <= 8 && (j.push("<span class=\"num num" + Math.min(l.route.num.length, 4) + " " + l.route.transport + "\">" + l.route.numHTML + "</span>"), l.online_data && j.push(" " + l.online_data.code + " " + l.online_data.departureAsStr + " &rarr; " + l.online_data.arrivalAsStr)), m.stopId = l.start_stop.id, m.tripNum = (l.trip_num || -1) + 1;
                var o = pg.fUrlSet({
                        schedule: m,
                        mapHash: ""
                    }, !0),
                    p = l.finish_time - l.start_time;
                p = p >= 60 ? ti.printTime(p, ":", "duration") : p + "&nbsp;" + i18n.minutesShort;
                var q = "";
                if (l.stops && l.stops.length) {
                    q = " style=\"cursor: default;\" title=\"" + l.stops.length + " stops:";
                    for (var r = 0; r < l.stops.length; ++r) q += (r ? ", " : " ") + ti.printTime(l.stops[r].departure_time.minutes) + " " + l.stops[r].name;
                    q += "\""
                }
                i.push("<p class=\"results\"><span class=\"icon icon_" + l.route.transport + "\"></span><span class=\"num num" + Math.min(l.route.num.length, 4) + " " + l.route.transport + "\">" + l.route.numHTML + "</span>" + (cfg.searchOnly ? "" : "<autobusuData class=\"hover\" href=\"#" + o + "\" title=\"" + i18n.showSchedule + "\">") + i18n.transport1[l.route.transport] + " " + i18n.towards + "&nbsp;" + l.route.name + (cfg.searchOnly ? "" : "</autobusuData>") + " <br/><strong>" + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.start_time)) + (l.online_data ? "(" + l.online_data.departureAsStr + ")" : "") + " " + l.start_stop.name + (l.start_platform && "(" + l.start_platform + ")" || "") + "</strong> &rarr; " + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.finish_time)) + (l.online_data ? "(" + l.online_data.arrivalAsStr + ")" : "") + " " + l.finish_stop.name + (l.finish_platform && "(" + l.finish_platform + ")" || "") + (cfg.defaultCity == "xxxvilnius2" ? "" : "<span class=\"graytext\"" + q + "> (" + i18n.ride + " " + p + (cfg.city.has_trips_ids ? " trip ID=" + l.trip_id + (l.trip_date ? "(" + l.trip_date.yyyymmdd("-") + ")" : "") + ", trip num=" + l.trip_code + (l.online_data ? ", bezrindas trip ID=" + l.online_data.code : "") : "") + (cfg.city.has_trips_ids === 2 ? ", trip operator=" + l.trip_operator + ", trip group=" + l.trip_group : "") + ")</span>") + "</p>")
            } else {
                if (l.start_time == l.finish_time && parseInt(l.start_stop.id, 10) == parseInt(l.finish_stop.id, 10)) continue;
                j.push("<span class=\"icon icon_narrow icon_walk\" title=\"" + i18n.walk + " " + (l.finish_time - l.start_time) + "&nbsp;" + i18n.minutesShort + "\"></span>"), i.push("<p class=\"results\"><span class=\"icon icon_walk\"></span><strong>" + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.start_time)) + " " + l.start_stop.name + "</strong> &rarr; " + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(l.finish_time)) + " " + l.finish_stop.name + "<span class=\"graytext\"> (" + i18n.walk + " " + (l.finish_time - l.start_time) + "&nbsp;" + i18n.minutesShort + ")</span></p></autobusuData>")
            }
            if (l.taxi)
                for (var s = 0; s < l.taxi.length; ++s) {
                    var t = l.taxi[s];
                    i.push((s ? "<br />" : "") + "km: " + t.km + ", " + t.name + ", phone: " + t.phone)
                }
        }
        e.push("<div" + (f % 2 ? "" : " class=\"grey\"") + " style=\"border-bottom: solid 1px gray; padding:5px 0 5px 5px;\"><table><tbody><tr><td><autobusuData href=\"\" onclick=\"return false;\" title=\"" + (f ? i18n.showDetails : i18n.hideDetails) + "\" class=\"" + (f ? "expand" : "collapse") + "\"><span class=\"icon\"></span><strong class=\"hover\">" + i18n.option + "&nbsp;" + (f + 1) + ".</strong></autobusuData> <autobusuData href=\"#" + pg.city + "/" + pg.transport + "/map,,," + (f + 1) + "\" class=\"icon icon_map\" title=\"" + i18n.showInMap + "\"></autobusuData> " + (cfg.defaultCity == "xxxvilnius2" ? "" : ti.printTime(g.start_time, null, "&#x2007;") + " &mdash; " + ti.printTime(g.finish_time, null, "&#x2007;")) + ",</td><td style=\"white-space:pre-wrap;\">" + (g.distance ? "atstumas&nbsp;" + Math.round(g.distance) / 1e3 + "&nbsp;km" : i18n.travelDuration + "&nbsp;<strong>" + ti.printTime(g.travel_time, ":", "duration")) + "</strong>  " + (typeof g.cost == "number" ? "kaina&nbsp;" + g.cost + "&euro;  " : "") + "<span style=\"white-space:nowrap;\">" + j.join("") + "</span></td></tr></tbody></table><div class=\"RouteDetails\" style=\"" + (f ? "display:none;" : "") + "\">"), e.push(i.join("") + "</autobusuData></div></div>")
    }
    if (d.length > 0) {
        pg.fTogglePlannerOptions(!1), b && document.body.className.indexOf("Map") >= 0 && (pg.mapShowAllStops = !1, pg.fUrlSetMap({
            optimalRoute: 1
        }));
        if (cfg.defaultCity === "latvia") {
            ti.TimeZoneOffset = 2;
            var u = "http://routelatvia.azurewebsites.net/?";
            u += "origin=" + a.start_stops, u += "&destination=" + a.finish_stops, u += "&departure_time=" + ti.toUnixTime(a.date, a.start_time), e.push("<br/><autobusuData target=\"_blank\" href=\"" + u + "\">" + u + "</autobusuData>"), e.push("<div id=\"online_results\">"), a.online_query_url ? e.push("<autobusuData target=\"_blank\" href=\"" + a.online_query_url + "\">" + a.online_query_url + "</autobusuData>") : b || e.push("<br/>Calculating alternative routes...");
            if (a.online_results_JSON) {
                var d = JSON.parse(a.online_results_JSON);
                e.push("<div style=\"white-space:pre;\">", JSON.stringify(d, null, 4), "</div>")
            }
            e.push("</div>")
        }
    } else e.push("<br/>" + i18n.noOptimalRoutes);
    var v = $("divContentPlannerResults");
    (v || {}).innerHTML = e.join("")
}, pg.fMakeRouteRowHTML = function(a, b, c, d, e) {
    var f, g = "map," + a.city + "," + a.transport + "," + a.num;
    cfg.city.showAllDirections && (g = g + "," + a.dirType), g = ti.toAscii(g, !0), b == "tblRoutes" ? (f = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType
        },
        hashForMap: ""
    }, !0), pg.routesFilter && (g += "," + a.dirType), g = pg.fUrlSet({
        hashForMap: g
    }, !0)) : (f = pg.fUrlSet({
        schedule: {
            city: a.city,
            transport: a.transport,
            num: a.num,
            dirType: a.dirType,
            stopId: a.stopId
        },
        hashForMap: ""
    }, !0), g = pg.fUrlSet({
        hashForMap: g + "," + a.dirType + "," + a.stopId
    }, !0));
    var h = "<autobusuData style=\"display:inline-block\" href=\"#" + f + "\" title=\"" + i18n.showSchedule + "\">",
        i = "";
    for (var j = 1; j <= 7; j++)
        if ((a.weekdays || "").indexOf(j) < 0) i += "<span class=\"blankday\" title=\"" + i18n["weekdays" + j] + ": " + i18n.routeNotOperate + "\">" + i18n.weekdaysShort[j] + "</span>";
        else {
            var k = a.validityPeriods[j - 1];
            k = k ? ": " + i18n.validFrom + " " + pg.formatDate(k) : "", i += "<span" + (j >= 6 ? "" : " class=\"weekend\"") + " title=\"" + i18n["weekdays" + j] + k + "\">" + i18n.weekdaysShort[j] + "</span>"
        }
    cfg.city.planHandicappedOption !== !1 && (a.weekdays && a.weekdays.indexOf("z") >= 0 && (i += "<img src=\"" + pg.imagesFolder + "handicapped.png\" alt=\"low floor\" title=\"" + i18n.lowFloorVehicles + "\" />")), a.weekdays && a.weekdays.indexOf("s") >= 0 && (i += "<img src=\"" + pg.imagesFolder + "minibus_16_1E90FF.png\" alt=\"small bus\" title=\"" + i18n.smallBus12Service + "\" />"), a.weekdays && a.weekdays.indexOf("b") >= 0 && (i += "<img src=\"" + pg.imagesFolder + "bicycle16.png\" alt=\"transfer bicycle\" title=\"" + (i18n["transferBicycles_" + cfg.defaultCity] || i18n.transferBicycles) + "\" />");
    var l = h + (!0 || b == "tblDepartingRoutes" ? "" : "<span class=\"icon icon_expand\" title=\"" + i18n.showDetails + "\"></span>") + "<span class=\"icon icon_" + a.transport + "\"></span>";
    a.transport == "train" || a.transport == "metro" ? l += "<span style=\"display:none;\">" + a.num + "</span>" : l += "<span class=\"num num" + Math.min(a.num.length, 4) + " " + a.transport + "\">" + a.numHTML + "</span>";
    if (e) var m = {
        route: a,
        hash: f,
        times: [],
        notes: []
    };
    var n = "<span class=\"hover\">" + a.name + ((a.commercial || "").indexOf("E") >= 0 ? " (" + i18n.express + ")" : "") + "</span>";
    i += pg.render_airport_icon(a.name, pg.routesFilter != "").replace("&nbsp;", ""), n = "<tr" + (b != "tblDepartingRoutes" && c % 2 != 0 ? " class=\"white\"" : "") + "><td class=\"routeName\"><autobusuData class=\"icon icon_map\" title=\"" + i18n.showInMap + "\" href=\"#" + g + "\"></autobusuData>" + l + n + "</autobusuData>", n += "</td><td class=\"weekdays\"><autobusuData href=\"#" + f + "\">" + i + "</autobusuData></td><td class=\"lastcol\"></td></tr>";
    if (b === "tblDepartingRoutes") {
        if (cfg.city.doNotShowTimetables && cfg.city.doNotShowTimetables[a.transport] && a.departures.length && a.departures[0] >= 0)
            if (("," + pg.inputStop + ",").indexOf("," + a.stops[0] + ",") < 0) {
                n += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\">", n += "</td></tr>";
                return n
            }
        n += "<tr class=\"white\"><td class=\"DeparturesRow\" colspan=\"4\"><span><span class=\"icon icon_collapse\"></span><span class=\"icon";
        var o = Infinity,
            p = Infinity,
            q = 0,
            r = 18;
        for (var s = a.departures.length; --s >= 0;) {
            var t = a.departures[s];
            if (t < 0) continue;
            if (t < d) break;
            ++q, t = ~~t;
            var u = ~~(t / 60);
            if (o != u) {
                if (++q > r && t < d) break;
                o = u
            }
            p = t
        }
        s < 0 && q < r ? n += "\">" : n += " icon_expand\" title=\"" + i18n.stopShowAllDepartures + "\">";
        var v = -1;
        q = 0;
        for (s = 0; s < a.departures.length; ++s) {
            var t = a.departures[s];
            if (t < 0) continue;
            e && m.times.push(~~(.5 + t)), t = ~~t;
            var u = ~~(t / 60);
            t >= p && ++q, v != u && (v = u, t >= p && ++q, n += "</span></span><span style=\"display:inline-block;\"><span class=\"DeparturesHour" + (u < o || q > r ? " collapse" : "") + "\">&nbsp;" + u % 24 + "</span><span style=\"vertical-align:top\"" + (t < p || q > r ? " class=\"collapse\"" : "") + ">&#x200A;"), t == p && (n += "</span><span style=\"vertical-align:top\">"), q == r + 1 && (n += "</span><span style=\"vertical-align:top\" class=\"collapse\">"), t = t % 60, n += (t < 10 ? "0" : "") + t + " "
        }
        v === -1 ? (e && m.notes.push(i18n.routeNotOperate), n += "</span><span>" + i18n.routeNotOperate) : !q && a.departures.length ? (a.departures.sort(function(a, b) {
            return a - b
        }), e && m.times.length == 0 && m.notes.push(i18n.stopLatestDeparture + "&nbsp;" + ti.printTime(a.departures[a.departures.length - 1])), n += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">" + i18n.stopLatestDeparture + "&nbsp;" + ti.printTime(a.departures[a.departures.length - 1])) : q > r && (n += "</span><span style=\"cursor:default;\" class=\"hideWhenExpanded\">..."), n += "</span></span></td></tr>", (v === -1 || !q) && a.dirType.indexOf("d") >= 0 && (n = "")
    }
    return e ? m : n
}, pg.fContent_Click = function(a) {
    pg.stopSuggestedForMap && (pg.stopSuggestedForMap = "", pg.fSuggestedStopsHide());
    var b = a && (a.target || a.srcElement);
    if (!b) return !0;
    var c, d, e;
    for (var f = b; f; f = f.parentNode) {
        if ((f.tagName || "").toLowerCase() === "tr") break;
        d || (c = f && (f.className || "").toLowerCase(), c.indexOf("expand") < 0 ? c.indexOf("collapse") < 0 ? (f.href || "").indexOf("#") >= 0 && (e = pg.fUrlParse(f.href), f.className.indexOf("map") < 0 ? e.schedule ? d = pg.fUrlSet({
            schedule: e.schedule
        }, !0) : (d = "hash", e.language = pg.language, e.hashForMap || pg.hashForMap && (pg.city === e.city && pg.transport === e.transport ? e.hashForMap = pg.hashForMap : e.hashForMap = "map")) : d = pg.fUrlSet({
            hashForMap: e.hashForMap
        }, !0)) : (d = "collapse", b = f) : (d = "expand", b = f));
        if ((f.tagName || "").toLowerCase() === "autobusuData") break;
        if ((f.className || "").toLowerCase() === "departuresrow" && d === "expand") {
            d = "", f.className = "DeparturesRowFull";
            break
        }
        if ((f.className || "").toLowerCase() === "departuresrowfull" && d === "collapse") {
            d = "", f.className = "DeparturesRow";
            break
        }
    }
    var g = [];
    while (f) {
        f = f.parentNode, g = f && f.getElementsByTagName("div") || [];
        if (g.length) break
    }
    d == "expand" ? (b.className = b.className.replace("expand", "collapse"), b.title = i18n.hideDetails, (g[0] || {
        style: {}
    }).style.display = "", pg.schedule && (pg.scheduleDetailsExpanded = !0), d = "") : d == "collapse" ? (b.className = b.className.replace("collapse", "expand"), b.title = i18n.showDetails, (g[0] || {
        style: {}
    }).style.display = "none", pg.schedule && (pg.scheduleDetailsExpanded = !1), d = "") : d == "hash" && (pg.fUrlSet(e), d = "");
    if (d || d === "") {
        d && Hash.go(d);
        return pg.cancelEvent(a)
    }
    return !0
}, pg.inputRoutes_KeyDown = function(a, b) {
    var c = $("inputRoutes");
    b || (b = window.event ? window.event.keyCode : a.keyCode), b == 27 ? (c.value = "", setTimeout(pg.fLoadRoutesList, 200)) : b != 9 && (c.className == "empty" && (c.value = "", c.className = ""), pg.routesFilter = "", setTimeout(pg.fLoadRoutesList, 200))
}, pg.inputRoutes_Focus = function() {
    $e = $("inputRoutes"), $e.className === "empty" && ($e.className = "", $e.value = "")
}, pg.inputRoutes_Blur = function() {
    $e = $("inputRoutes"), $e && !$e.value && ($e.value = i18n.typeRouteNameOrNumber, $e.className = "empty")
}
