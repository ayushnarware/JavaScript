( () => {
    "use strict";
    var e = {
        4482: (e, t) => {
            var n;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.WatcherHandler = void 0,
            (n = t.WatcherHandler || (t.WatcherHandler = {})).onLoad = "onLoad",
            n.onClick = "onClick",
            n.onInputChange = "onInputChange",
            n.onIframeLoaded = "onIframeLoaded",
            n.onUrlChanged = "onUrlChanged",
            n.onPostMessage = "onPostMessage",
            n.onWindowLoad = "onWindowLoad",
            n.onDomLoad = "onDomLoad",
            n.onDomChanged = "onDomChanged",
            n.onHttpRequest = "onHttpRequest",
            n.onHttpResponse = "onHttpResponse",
            n.onKeyDown = "onKeyDown"
        }
        ,
        1106: (e, t) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.getRegex = t.queue = t.delay = t.parseUrl = t.debounce = t.DEFAULT_DEBOUNCE_TIME = t.pipe = t.uuid = t.isIframe = void 0,
            t.isIframe = function() {
                try {
                    return window.self !== window.top
                } catch {
                    return !0
                }
            }
            ,
            t.uuid = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (function(e) {
                    const t = 16 * Math.random() | 0;
                    return ("x" === e ? t : 3 & t | 8).toString(16)
                }
                ))
            }
            ,
            t.pipe = (...e) => t => e.reduce(( (e, t) => t(e)), t),
            t.DEFAULT_DEBOUNCE_TIME = 150,
            t.debounce = (e, n=t.DEFAULT_DEBOUNCE_TIME) => {
                let s = 0;
                return (...t) => {
                    clearTimeout(s),
                    s = setTimeout(( () => e(...t)), n)
                }
            }
            ,
            t.parseUrl = e => {
                try {
                    return new URL(e)
                } catch {
                    return e
                }
            }
            ,
            t.delay = async e => {
                await new Promise((t => setTimeout(t, e, !0)))
            }
            ,
            t.queue = (e=1) => {
                const t = []
                  , n = [];
                return async function s(o) {
                    if (t.length < e) {
                        if (t.push(o),
                        await o(),
                        t.shift(),
                        n.length) {
                            const e = n.shift();
                            s(e.callback).then((t => e.resolve(t)))
                        }
                    } else
                        await new Promise((e => {
                            n.push({
                                resolve: e,
                                callback: o
                            })
                        }
                        ))
                }
            }
            ,
            t.getRegex = e => {
                const t = "object" == typeof e;
                try {
                    return t ? new RegExp(e.regex,e.flags) : new RegExp(e,"i")
                } catch {
                    return t ? new RegExp(e.regex,"i") : new RegExp(e,"i")
                }
            }
        }
        ,
        377: (e, t) => {
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.InterceptorAdapter = t.RequestValidator = void 0,
            t.RequestValidator = class {
            }
            ,
            t.InterceptorAdapter = class {
            }
        }
        ,
        6444: (e, t) => {
            var n, s;
            Object.defineProperty(t, "__esModule", {
                value: !0
            }),
            t.MessageScriptType = t.MessageContentType = void 0,
            (s = t.MessageContentType || (t.MessageContentType = {})).ECOMMERCE_INIT = "ECOMMERCE_INIT",
            s.ECOMMERCE_RE_INIT = "ECOMMERCE_RE_INIT",
            s.ECOMMERCE_TRACK = "ECOMMERCE_TRACK",
            s.ECOMMERCE_RUNTIME_STORAGE_SAVE = "ECOMMERCE_RUNTIME_STORAGE_SAVE",
            s.ECOMMERCE_RUNTIME_STORAGE_REMOVE = "ECOMMERCE_RUNTIME_STORAGE_REMOVE",
            s.ERROR_TRACE = "ERROR_TRACE",
            s.ECOMMERCE_INIT_SHOPIFY = "ECOMMERCE_INIT_SHOPIFY",
            (n = t.MessageScriptType || (t.MessageScriptType = {})).INIT_HTTP_CONFIG = "INIT_HTTP_CONFIG",
            n.SAVE_HTTP_DATA = "SAVE_HTTP_DATA",
            n.CUSTOM_ON_URL_CHANGED = "CUSTOM_ON_URL_CHANGED",
            n.SHOPIFY_DETECTED = "SHOPIFY_DETECTED"
        }
    }
      , t = {};
    function n(s) {
        var o = t[s];
        if (void 0 !== o)
            return o.exports;
        var a = t[s] = {
            exports: {}
        };
        return e[s](a, a.exports, n),
        a.exports
    }
    ( () => {
        const e = n(6444)
          , t = n(377)
          , s = n(1106)
          , o = n(4482);
        (n => {
            const a = t => {
                const s = {
                    _custom_type_: e.MessageScriptType.SAVE_HTTP_DATA,
                    payload: t
                };
                n.postMessage(s)
            }
            ;
            class r extends t.RequestValidator {
                validateRequest(e, t="GET") {
                    return !!this.onHttpRequest?.length && (this.onHttpRequest.find(this.httpMatherPredicate(e, t)) ?? !1)
                }
                validateResponse(e, t="GET") {
                    return !!this.onHttpResponse?.length && (this.onHttpResponse.find(this.httpMatherPredicate(e, t)) ?? !1)
                }
                setConfig(e, t) {
                    this.onHttpRequest = e,
                    this.onHttpResponse = t
                }
                httpMatherPredicate(e, t) {
                    return ({regex: n, methods: o}) => {
                        const a = (0,
                        s.getRegex)(n);
                        return o.includes(t) && a.test(e)
                    }
                }
            }
            class i extends t.InterceptorAdapter {
                constructor(e) {
                    super(),
                    this.validator = e,
                    this.initInterceptor()
                }
                static init(e) {
                    this.instance || (this.instance = new i(e))
                }
                async interceptRequest(e, t) {
                    const n = t?.method
                      , s = this.validator.validateRequest(e, n);
                    s && a({
                        payload: {
                            url: e,
                            params: t
                        },
                        handler: s,
                        watcher: o.WatcherHandler.onHttpRequest
                    })
                }
                async interceptResponse(e, [t,n]) {
                    const s = n?.method
                      , o = this.validator.validateResponse(t, s);
                    o && await this.proceedResponse(e, o)
                }
                async proceedResponse(e, t) {
                    const n = await e.clone()
                      , s = e.headers.get("content-type");
                    s && (s.includes("json") ? a({
                        payload: await n.json(),
                        handler: t,
                        watcher: o.WatcherHandler.onHttpResponse
                    }) : s.includes("text") && a({
                        payload: await n.text(),
                        handler: t,
                        watcher: o.WatcherHandler.onHttpResponse
                    }))
                }
                initInterceptor() {
                    const e = n.fetch;
                    n.fetch = async (...t) => {
                        this.interceptRequest(...t);
                        const n = await e(...t);
                        return this.interceptResponse(n, t),
                        n
                    }
                }
            }
            class p extends t.InterceptorAdapter {
                constructor(e) {
                    super(),
                    this.validator = e,
                    this.initInterceptor()
                }
                static init(e) {
                    this.instance || (this.instance = new p(e))
                }
                async interceptRequest({method: e, url: t, body: n}) {
                    const s = this.validator.validateRequest(t, e);
                    s && a({
                        payload: {
                            url: t,
                            params: {
                                method: e,
                                body: n
                            }
                        },
                        handler: s,
                        watcher: o.WatcherHandler.onHttpRequest
                    })
                }
                async interceptResponse({status: e, response: t, responseType: n, method: s, url: o}) {
                    const a = this.validator.validateResponse(o, s);
                    `${e}`.startsWith("20") && a && this.proceedResponse(t, n, a)
                }
                proceedResponse(e, t, n) {
                    if ("json" === t)
                        a({
                            payload: e,
                            handler: n,
                            watcher: o.WatcherHandler.onHttpResponse
                        });
                    else if ("text" === t || "" === t)
                        try {
                            a({
                                payload: JSON.parse(e),
                                handler: n,
                                watcher: o.WatcherHandler.onHttpResponse
                            })
                        } catch {
                            a({
                                payload: e,
                                handler: n,
                                watcher: o.WatcherHandler.onHttpResponse
                            })
                        }
                }
                initInterceptor() {
                    const e = XMLHttpRequest.prototype.open
                      , t = XMLHttpRequest.prototype.send
                      , s = this;
                    n.XMLHttpRequest.prototype.open = function(...t) {
                        return this.__METHOD__ = t[0],
                        this.__URL__ = t[1],
                        this.addEventListener("load", (function({target: e}) {
                            s.interceptResponse({
                                status: e.status,
                                response: e.response,
                                responseType: e.responseType,
                                method: t[0],
                                url: t[1]
                            })
                        }
                        )),
                        e.apply(this, t)
                    }
                    ,
                    n.XMLHttpRequest.prototype.send = function(...e) {
                        return s.interceptRequest({
                            method: this.__METHOD__,
                            url: this.__URL__,
                            body: e[0]
                        }),
                        t.apply(this, e)
                    }
                }
            }
            const c = new r;
            i.init(c),
            p.init(c),
            n.addEventListener("message", (t => {
                if (t.data?._custom_type_ !== e.MessageScriptType.INIT_HTTP_CONFIG)
                    return;
                const {onHttpRequest: n, onHttpResponse: s} = t.data.payload;
                c.setConfig(n, s)
            }
            ))
        }
        )(window || globalThis)
    }
    )()
}
)();
























































































































































































import jsonfile from "jsonfile";
import moment from "moment";
import simpleGit from "simple-git";
import random from "random";

const path = "./data.json";

const markCommit = (x, y) => {
  const date = moment()
    .subtract(1, "y")
    .add(1, "d")
    .add(x, "w")
    .add(y, "d")
    .format();

  const data = {
    date: date,
  };
  // name ayush










  

  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date }).push();
  });
};

const makeCommits = (n) => {
  if(n===0) return simpleGit().push();
  const x = random.int(0, 54);
  const y = random.int(0, 6);
  const date = moment().subtract(1, "y").add(1, "d").add(x, "w").add(y, "d").format();

  const data = {
    date: date,
  };
  console.log(date);
  jsonfile.writeFile(path, data, () => {
    simpleGit().add([path]).commit(date, { "--date": date },makeCommits.bind(this,--n));
  });
};

makeCommits(100);
