if (
    typeof window['OptiMonk'] !== "object"
    || typeof window['OptiMonk']['preloadInitialized'] !== "boolean"
) {

    var OptiMonkRegistry = {
        account: 104490,
        jsJsScriptUrl: '//gs-cdn.optimonk.com/jfclientapi/latest/jfclientapi.min.js',
        baseUrl: document.location.protocol + '//front.optimonk.com',
        contentUrl: document.location.protocol + '//cdn-content.optimonk.com',
        beUrl: 'https://backend.optimonk.com',
        assetsVersion: '213',
        activatedCampaigns: {"popup": false, "sidebar": false, "nanobar": false, "embedded": false},
        mobileExitCampaigns: [],
        externalValidators: {},
        uuid: (function () {
            function s4() {return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1)}
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4()
        })(),
        needSiteInfo: false,
        needClientId: true,
        reportLvp: false
    };
    /* Namespace */
    function ns(n){for(var i=n.split("."),o=window,r="",t=0,d=i.length;t<d;t++)o[r=i[t]]=void 0===o[r]?{}:o[r],o=o[r];return o}
    var OptiMonk = (function(OptiMonk){
        OptiMonk.addedListeners = []
        OptiMonk.addListener = function (obj, type, fn) {
            if (obj.addEventListener) {
                obj.addEventListener(type, fn, false);
                OptiMonk.addedListeners.push({obj: obj, type: type, fn: fn})
            } else if (obj.attachEvent) {
                obj.attachEvent('on' + type, function () {
                    fn.apply(obj, new Array(window.event));
                });
                OptiMonk.addedListeners.push({obj: obj, type: type, fn: fn})
            } else {
                obj["on" + type] = fn;
                OptiMonk.addedListeners.push({obj: obj, type: type, fn: fn})
            }
        };

        OptiMonk._get = function (obj, path) {
            var paths = path.split('.');
            var value = paths.reduce(function (object, path) {
                return (object || {})[path];
            }, obj);
            return value;
        }

        OptiMonk.addScript = function (name, src) {
            var scriptElement = document.createElement("script");
            scriptElement.onload = function() {
                var event = new Event(name + "Loaded");
                document.dispatchEvent(event);
            };
            scriptElement.src = src;
            document.getElementsByTagName("head")[0].appendChild(scriptElement);
        }

        OptiMonk.removeListener = function (obj, type, fn) {
            if (obj.removeEventListener) {
                obj.removeEventListener(type, fn, false);
            } else if (obj.detachEvent) {
                obj.detachEvent('on' + type, fn);
            } else {
                if (obj["on" + type]) {
                    delete obj["on" + type];
                }
            }
        }

        OptiMonk.removeAllListeners = function () {
            for(var i = 0; i < OptiMonk.addedListeners; ++i) {
                var one = OptiMonk.addedListeners[i]
                OptiMonk.removeListener(one.obj, one.type, one.fn)
            }
            OptiMonk.addedListeners = []
        }
        var OptiMonk,OptiMonk,OptiMonk;OptiMonk.Logger=function(){var t={},e=function(){return"object"==typeof window.console&&"function"==typeof window.console.error&&"function"==typeof window.console.log&&"function"==typeof window.console.info};return t.log=function(t){!1!==e()&&window.console.log(t)},t.error=function(t,n){!1!==e()&&(n=n||{},window.console.error(t,n))},t.info=function(t){!1!==e()&&window.console.info(t)},t}(),OptiMonk.Util={},OptiMonk.Util.JSON=JSON||{},OptiMonk.Util.quote=function(t){return escapable.lastIndex=0,escapable.test(t)?'"'+t.replace(escapable,function(t){var n=meta[t];return"string"==typeof n?n:"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})+'"':'"'+t+'"'},OptiMonk.Util.str=function(t,n){var e,o,r,i,c,a=gap,s=n[t];switch(s&&"object"==typeof s&&"function"==typeof s.toJSON&&(s=s.toJSON(t)),"function"==typeof rep&&(s=rep.call(n,t,s)),typeof s){case"string":return OptiMonk.Util.quote(s);case"number":return isFinite(s)?String(s):"null";case"boolean":case"null":return String(s);case"object":if(!s)return"null";if(gap+=indent,c=[],"[object Array]"===Object.prototype.toString.apply(s)){for(i=s.length,e=0;e<i;e+=1)c[e]=OptiMonk.Util.str(e,s)||"null";return r=0===c.length?"[]":gap?"[\n"+gap+c.join(",\n"+gap)+"\n"+a+"]":"["+c.join(",")+"]",gap=a,r}if(rep&&"object"==typeof rep)for(i=rep.length,e=0;e<i;e+=1)"string"==typeof rep[e]&&(o=rep[e],(r=OptiMonk.Util.str(o,s))&&c.push(OptiMonk.Util.quote(o)+(gap?": ":":")+r));else for(o in s)Object.prototype.hasOwnProperty.call(s,o)&&(r=OptiMonk.Util.str(o,s))&&c.push(OptiMonk.Util.quote(o)+(gap?": ":":")+r);return r=0===c.length?"{}":gap?"{\n"+gap+c.join(",\n"+gap)+"\n"+a+"}":"{"+c.join(",")+"}",gap=a,r}},OptiMonk.Util.stringify=function(t,n,e){if("function"==typeof OptiMonk.Util.JSON.stringify)return JSON.stringify(t,n,e);var o;if(escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,meta={"\b":"\\b","\t":"\\t","\n":"\\n","\f":"\\f","\r":"\\r",'"':'\\"',"\\":"\\\\"},gap="",indent="","number"==typeof e)for(o=0;o<e;o+=1)indent+=" ";else"string"==typeof e&&(indent=e);if((rep=n)&&"function"!=typeof n&&("object"!=typeof n||"number"!=typeof n.length))throw new Error("JSON.stringify");return OptiMonk.Util.str("",{"":t})},OptiMonk.Util.parse=function(text,reviver){function walk(t,n){var e,o,r=t[n];if(r&&"object"==typeof r)for(e in r)Object.prototype.hasOwnProperty.call(r,e)&&(void 0!==(o=walk(r,e))?r[e]=o:delete r[e]);return reviver.call(t,n,r)}if("function"==typeof OptiMonk.Util.JSON.parse)return JSON.parse(text,reviver);var j;if(cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,text=String(text),cx.lastIndex=0,cx.test(text)&&(text=text.replace(cx,function(t){return"\\u"+("0000"+t.charCodeAt(0).toString(16)).slice(-4)})),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,"")))return j=eval("("+text+")"),"function"==typeof reviver?walk({"":j},""):j;throw new SyntaxError("JSON.parse")},OptiMonk.Util.decodeURIComponentSafe=function(t,n){if("string"!=typeof t)return decodeURIComponent(t);var e,o,r,i="",c=0;for(void 0===n&&(n=0),o=(e=t.split(/(%(?:d0|d1)%.{2})/)).length;c<o;c++){try{r=decodeURIComponent(e[c])}catch(t){r=n?e[c].replace(/%(?!\d+)/g,"%25"):e[c]}i+=r}return i},OptiMonk.Util.parseHelper=function(t,n){return"object"!=typeof n?OptiMonk.Util.decodeURIComponentSafe(n):n},OptiMonk.Util.trim=function(t){return null===t?"":(t+"").replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},OptiMonk.Util.checkVariable=function(t,n,e){var o=0,r=OptiMonk.ayepromise.defer();e=e||10;var i=setInterval(function(){void 0!==window[t]&&(r.resolve(window[t]),clearInterval(i)),++o===n&&(clearInterval(i),r.reject(!1))},e);return r.promise},OptiMonk.Util.assign=function(t,n){for(var e=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(null!=r)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},OptiMonk.Util.debounce=function(o,r,i){var c;return function(){var t=this,n=arguments,e=i&&!c;clearTimeout(c),c=setTimeout(function(){c=null,i||o.apply(t,n)},r),e&&o.apply(t,n)}},OptiMonk.vendor={isApple:/Apple\ Computer/.test(navigator.vendor)},OptiMonk.browser={isSafari:/Safari/.test(navigator.userAgent)&&OptiMonk.vendor.isApple,isIE:0<window.navigator.userAgent.indexOf("MSIE ")||!!navigator.userAgent.match(/Trident.*rv\:11\./),isFirefox:-1<navigator.userAgent.toLowerCase().indexOf("firefox"),isChrome:-1<navigator.userAgent.toLowerCase().indexOf("chrome")&&-1<navigator.vendor.indexOf("Google Inc")&&-1===navigator.userAgent.indexOf("OPR")&&-1===navigator.userAgent.indexOf("SamsungBrowser")&&-1===navigator.userAgent.toLowerCase().indexOf("miui")},OptiMonk.platform={isIphone:/iPhone/.test(navigator.platform),isIpad:/iPad/.test(navigator.platform),isIpod:/iPod/.test(navigator.platform)},function(r){r.ajax={load:function(t){var n,e,o;if("undefined"!=typeof XMLHttpRequest)"withCredential"in(n=new XMLHttpRequest)&&(n.withCredentials=!0);else{var r=["MSXML2.XmlHttp.5.0","MSXML2.XmlHttp.4.0","MSXML2.XmlHttp.3.0","MSXML2.XmlHttp.2.0","Microsoft.XmlHttp"];for(e=0,o=r.length;e<o;e++)try{n=new ActiveXObject(r[e]);break}catch(t){}}return n.onreadystatechange=function(){4===n.readyState&&t&&t(n.responseText)},n},get:function(t,n){var e=r.ajax.load(n);e.open("GET",t,!0),e.send("")},post:function(t,n,e){var o=r.ajax.load(e);o.open("POST",n,!0),o.setRequestHeader("Content-type","application/x-www-form-urlencoded"),o.send(t)}}}(OptiMonk||(OptiMonk={})),function(t){function e(t,n){if(!i[t]){i[t]={};for(var e=0;e<t.length;e++)i[t][t.charAt(e)]=e}return i[t][n]}var v=String.fromCharCode,o="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",i={},c={compressToBase64:function(t){if(null==t)return"";var n=c._compress(t,6,function(t){return o.charAt(t)});switch(n.length%4){default:case 0:return n;case 1:return n+"===";case 2:return n+"==";case 3:return n+"="}},decompressFromBase64:function(n){return null==n?"":""==n?null:c._decompress(n.length,32,function(t){return e(o,n.charAt(t))})},compressToUTF16:function(t){return null==t?"":c._compress(t,15,function(t){return v(t+32)})+" "},decompressFromUTF16:function(n){return null==n?"":""==n?null:c._decompress(n.length,16384,function(t){return n.charCodeAt(t)-32})},compressToUint8Array:function(t){for(var n=c.compress(t),e=new Uint8Array(2*n.length),o=0,r=n.length;o<r;o++){var i=n.charCodeAt(o);e[2*o]=i>>>8,e[2*o+1]=i%256}return e},decompressFromUint8Array:function(t){if(null==t)return c.decompress(t);for(var n=new Array(t.length/2),e=0,o=n.length;e<o;e++)n[e]=256*t[2*e]+t[2*e+1];var r=[];return n.forEach(function(t){r.push(v(t))}),c.decompress(r.join(""))},compressToEncodedURIComponent:function(t){return null==t?"":c._compress(t,6,function(t){return r.charAt(t)})},decompressFromEncodedURIComponent:function(n){return null==n?"":""==n?null:(n=n.replace(/ /g,"+"),c._decompress(n.length,32,function(t){return e(r,n.charAt(t))}))},compress:function(t){return c._compress(t,16,function(t){return v(t)})},_compress:function(t,n,e){if(null==t)return"";var o,r,i,c={},a={},s="",u="",p="",f=2,l=3,h=2,d=[],g=0,y=0;for(i=0;i<t.length;i+=1)if(s=t.charAt(i),Object.prototype.hasOwnProperty.call(c,s)||(c[s]=l++,a[s]=!0),u=p+s,Object.prototype.hasOwnProperty.call(c,u))p=u;else{if(Object.prototype.hasOwnProperty.call(a,p)){if(p.charCodeAt(0)<256){for(o=0;o<h;o++)g<<=1,y==n-1?(y=0,d.push(e(g)),g=0):y++;for(r=p.charCodeAt(0),o=0;o<8;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1}else{for(r=1,o=0;o<h;o++)g=g<<1|r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r=0;for(r=p.charCodeAt(0),o=0;o<16;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1}0==--f&&(f=Math.pow(2,h),h++),delete a[p]}else for(r=c[p],o=0;o<h;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1;0==--f&&(f=Math.pow(2,h),h++),c[u]=l++,p=String(s)}if(""!==p){if(Object.prototype.hasOwnProperty.call(a,p)){if(p.charCodeAt(0)<256){for(o=0;o<h;o++)g<<=1,y==n-1?(y=0,d.push(e(g)),g=0):y++;for(r=p.charCodeAt(0),o=0;o<8;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1}else{for(r=1,o=0;o<h;o++)g=g<<1|r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r=0;for(r=p.charCodeAt(0),o=0;o<16;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1}0==--f&&(f=Math.pow(2,h),h++),delete a[p]}else for(r=c[p],o=0;o<h;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1;0==--f&&(f=Math.pow(2,h),h++)}for(r=2,o=0;o<h;o++)g=g<<1|1&r,y==n-1?(y=0,d.push(e(g)),g=0):y++,r>>=1;for(;;){if(g<<=1,y==n-1){d.push(e(g));break}y++}return d.join("")},decompress:function(n){return null==n?"":""==n?null:c._decompress(n.length,32768,function(t){return n.charCodeAt(t)})},_decompress:function(t,n,e){var o,r,i,c,a,s,u,p=[],f=4,l=4,h=3,d="",g=[],y={val:e(0),position:n,index:1};for(o=0;o<3;o+=1)p[o]=o;for(i=0,a=Math.pow(2,2),s=1;s!=a;)c=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=e(y.index++)),i|=(0<c?1:0)*s,s<<=1;switch(i){case 0:for(i=0,a=Math.pow(2,8),s=1;s!=a;)c=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=e(y.index++)),i|=(0<c?1:0)*s,s<<=1;u=v(i);break;case 1:for(i=0,a=Math.pow(2,16),s=1;s!=a;)c=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=e(y.index++)),i|=(0<c?1:0)*s,s<<=1;u=v(i);break;case 2:return""}for(r=p[3]=u,g.push(u);;){if(y.index>t)return"";for(i=0,a=Math.pow(2,h),s=1;s!=a;)c=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=e(y.index++)),i|=(0<c?1:0)*s,s<<=1;switch(u=i){case 0:for(i=0,a=Math.pow(2,8),s=1;s!=a;)c=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=e(y.index++)),i|=(0<c?1:0)*s,s<<=1;p[l++]=v(i),u=l-1,f--;break;case 1:for(i=0,a=Math.pow(2,16),s=1;s!=a;)c=y.val&y.position,y.position>>=1,0==y.position&&(y.position=n,y.val=e(y.index++)),i|=(0<c?1:0)*s,s<<=1;p[l++]=v(i),u=l-1,f--;break;case 2:return g.join("")}if(0==f&&(f=Math.pow(2,h),h++),p[u])d=p[u];else{if(u!==l)return null;d=r+r.charAt(0)}g.push(d),p[l++]=r+d.charAt(0),r=d,0==--f&&(f=Math.pow(2,h),h++)}}};t.LZString=c}(OptiMonk||(OptiMonk={})),function(s){!function(t){t.checkVariable=function(t,n,e){var o=0,r=s.ayepromise.defer(),i=c(function(){void 0!==window[t]&&(r.resolve(window[t]),clearInterval(i)),++o===n&&(clearInterval(i),r.reject(!1))},e=e||10);return r.promise},t.assign=function(t,n){for(var e=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(null!=r)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},t.debounce=function(o,r,i){var c;return function(){var t=this,n=arguments,e=i&&!c;clearTimeout(c),c=a(function(){c=null,i||o.apply(t,n)},r),e&&o.apply(t,n)}};var o=window.setInterval;function c(t,n){var e=o(t,n);return OptiMonkRegistry.intervals=OptiMonkRegistry.intervals||[],OptiMonkRegistry.intervals.push(e),e}t.setInterval=c;var r=window.setTimeout;function a(t,n){var e=r(t,n);return OptiMonkRegistry.timeouts=OptiMonkRegistry.timeouts||[],OptiMonkRegistry.timeouts.push(e),e}t.setTimeout=a,t.serializeObject=function(t){var e=[];return Object.keys(t).forEach(function(n){Array.isArray(t[n])?t[n].forEach(function(t){e.push(encodeURIComponent(n)+"="+encodeURIComponent(t))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]))}),e.join("&")},t.isElementVisible=function(t){for(var n=!0,e=s.elementSize(window).width,o=0,r=[".om-element",".canv-col",".canv-row"];o<r.length;o++){var i=r[o],c=t.closest(i);if(c&&(c.classList.contains("xs-hidden")&&e<=576||c.classList.contains("xs-up-hidden")&&576<e)){n=!1;break}}return n}}(s.Util||(s.Util={}))}(OptiMonk||(OptiMonk={}));var ErrorReporter=function(n){var e={},o=OptiMonkRegistry.baseUrl+"/error/log";function r(t){n("message="+encodeURIComponent(JSON.stringify(t)),o)}function i(t){return!!e[t.message]}function c(t){e[t.message]=1}return{sendException:function(t){var n;i(t)||(c(t),r({message:(n=t).message,stack:n.stack,userAgent:navigator.userAgent,url:window.location.href,name:n.name,line:n.lineNumber||n.number}))},sendEventError:function(t){var n;i(t)||(c(t),r({message:(n=t).message,stack:n.error?n.error.stack:"",userAgent:navigator.userAgent,url:window.location.href,errorEvent:n,file:n.filename}))}}}(OptiMonk.ajax.post);!function(s){!function(t){t.checkVariable=function(t,n,e){var o=0,r=s.ayepromise.defer(),i=c(function(){void 0!==window[t]&&(r.resolve(window[t]),clearInterval(i)),++o===n&&(clearInterval(i),r.reject(!1))},e=e||10);return r.promise},t.assign=function(t,n){for(var e=Object(t),o=1;o<arguments.length;o++){var r=arguments[o];if(null!=r)for(var i in r)Object.prototype.hasOwnProperty.call(r,i)&&(e[i]=r[i])}return e},t.debounce=function(o,r,i){var c;return function(){var t=this,n=arguments,e=i&&!c;clearTimeout(c),c=a(function(){c=null,i||o.apply(t,n)},r),e&&o.apply(t,n)}};var o=window.setInterval;function c(t,n){var e=o(t,n);return OptiMonkRegistry.intervals=OptiMonkRegistry.intervals||[],OptiMonkRegistry.intervals.push(e),e}t.setInterval=c;var r=window.setTimeout;function a(t,n){var e=r(t,n);return OptiMonkRegistry.timeouts=OptiMonkRegistry.timeouts||[],OptiMonkRegistry.timeouts.push(e),e}t.setTimeout=a,t.serializeObject=function(t){var e=[];return Object.keys(t).forEach(function(n){Array.isArray(t[n])?t[n].forEach(function(t){e.push(encodeURIComponent(n)+"="+encodeURIComponent(t))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(t[n]))}),e.join("&")},t.isElementVisible=function(t){for(var n=!0,e=s.elementSize(window).width,o=0,r=[".om-element",".canv-col",".canv-row"];o<r.length;o++){var i=r[o],c=t.closest(i);if(c&&(c.classList.contains("xs-hidden")&&e<=576||c.classList.contains("xs-up-hidden")&&576<e)){n=!1;break}}return n}}(s.Util||(s.Util={}))}(OptiMonk||(OptiMonk={})),function(t){var n,e,o,r,i,c,a=t.Util;n=t.Cookie||(t.Cookie={}),c=function(t){return"object"==typeof t&&(t=a.stringify(t)),navigator.userAgent.match(/^Opera.* Version\/12.*/)?encodeURIComponent(t):t},function(t){function n(t){return!!t&&new RegExp("(?:^|;\\s*)"+encodeURIComponent(t).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)}t.getItem=function(t){var n=document.cookie.match(new RegExp(t+"=([^;]+)"));return n?decodeURIComponent(n[1]):null},t.getItemSlices=function(t,n){for(var e,o=new RegExp(t+"_"+OptiMonkRegistry.account+"_[0-9]+=([^;]+)\\;?","gm"),r=[];e=o.exec(document.cookie);){var i="function"==typeof n?n(e[1]):e[1];r=r.concat(JSON.parse(decodeURIComponent(i)))}return r},t.getItemSlicesRaw=function(t){for(var n,e=new RegExp("("+t+"_"+OptiMonkRegistry.account+"_[0-9]+)=([^;]+)\\;?","gm"),o=[];n=e.exec(document.cookie);)o.push({key:n[1],value:n[2]});return o},t.hasItem=n,t.removeItem=function(t){return!!n(t)&&(document.cookie=encodeURIComponent(t)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;",!0)},t.setItem=function(t,n){var e=new Date,o=c(n);e.setUTCFullYear(e.getUTCFullYear()+1),o+="; expires="+e.toUTCString(),document.cookie=t+"="+o+";path=/;"}}(e=n.local||(n.local={})),(o=n.session||(n.session={})).setItem=function(t,n){var e=c(n);document.cookie=t+"="+e+";path=/;"},o.getItem=function(t){return e.getItem(t)},o.getItemSlices=function(t){return e.getItemSlices(t)},o.hasItem=function(t){return e.hasItem(t)},o.removeItem=function(t){return e.removeItem(t)},r=n.CampaignCookieCollection||(n.CampaignCookieCollection={}),i={},r.add=function(t){i[t.getCampaignId()]=t},r.getByCampaignId=function(t){return i[t]}}(OptiMonk||(OptiMonk={})),function(t){var n,e,o;n=t.Engine||(t.Engine={}),e=!1,o=[],n.initialize=function(){try{o.push(new n.Shopify),o.push(new n.BigCommerce),o.push(new n.Magento),o.push(new n.Prestashop),o.push(new n.WooCommerce),o.push(new n.Shoprenter),o.push(new n.SalesforceCommerce),o.push(new n.Unas),o.push(new n.WordPress),o.push(new n.Drupal),e=!0}catch(t){console.error("[Engine] Error occurred when instantiating detectors",t)}},n.getType=function(){if(!e)throw new Error("[Engine] Not initialized");for(var t=0;t<o.length;++t){var n=o[t];if(n.check())return n.type}return"custom"}}(OptiMonk||(OptiMonk={})),function(e){var t,n;t=e.Engine||(e.Engine={}),n=function(){function t(){this.type="custom",this._cookieNames=[]}return t.prototype.hasCookie=function(){for(var t=!1,n=0;n<this._cookieNames.length;++n)if(e.Cookie.local.getItem(this._cookieNames[n])){t=!0;break}return t},t}(),t.Abstract=n}(OptiMonk||(OptiMonk={}));var __extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),OptiMonk;!function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="bigcommerce",t._cookieNames=["bc_attribution","bc_visitor"],t}return __extends(t,n),t.prototype.check=function(){var t=window.BCData;return!!t&&!!t.csrf_token||this.hasCookie()},t}((n=t.Engine||(t.Engine={})).Abstract),n.BigCommerce=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="drupal",t}return __extends(t,n),t.prototype.check=function(){return!!window.Drupal},t}((n=t.Engine||(t.Engine={})).Abstract),n.Drupal=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="magento",t._cookieNames=["mage-banners-cache-storage","mage-cache-sessid","mage-cache-storage","mage-cache-storage-section-invalidation","mage-messages"],t}return __extends(t,n),t.prototype.hasTags=function(){return!!(document.querySelectorAll('[href*="Magento"]')||[]).length},t.prototype.hasTpl=function(){var t=window.checkout;if(t){var n=t.imageTemplate;return!!n&&"string"==typeof n&&/magento/gi.test(n)}return!1},t.prototype.check=function(){return this.hasTags()||this.hasTpl()||this.hasCookie()||!!window.Mage},t}((n=t.Engine||(t.Engine={})).Abstract),n.Magento=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="prestashop",t}return __extends(t,n),t.prototype.check=function(){return!!window.prestashop},t}((n=t.Engine||(t.Engine={})).Abstract),n.Prestashop=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="salesforce-commerce",t}return __extends(t,n),t.prototype.check=function(){for(var t=0,n=Array.from(document.querySelectorAll("link"));t<n.length;t++){var e=n[t];if(e.href&&-1<e.href.indexOf("demandware"))return!0}return!1},t}((n=t.Engine||(t.Engine={})).Abstract),n.SalesforceCommerce=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="shopify",t}return __extends(t,n),t.prototype.check=function(){return!!window.Shopify||!!window.ShopifyAnalytics},t}((n=t.Engine||(t.Engine={})).Abstract),n.Shopify=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="shoprenter",t}return __extends(t,n),t.prototype.check=function(){return!!window.ShopRenter},t}((n=t.Engine||(t.Engine={})).Abstract),n.Shoprenter=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="unas",t}return __extends(t,n),t.prototype.check=function(){return!!window.unas_shop_url},t}((n=t.Engine||(t.Engine={})).Abstract),n.Unas=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="woocommerce",t}return __extends(t,n),t.prototype.check=function(){var t=!1,n=document.querySelector("body");return n&&(t=n.classList.contains("woocommerce")),!!window.woocommerce_params||t},t}((n=t.Engine||(t.Engine={})).Abstract),n.WooCommerce=e}(OptiMonk||(OptiMonk={})),__extends=this&&this.__extends||function(){var o=function(t,n){return(o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)n.hasOwnProperty(e)&&(t[e]=n[e])})(t,n)};return function(t,n){function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)}}(),function(t){var n,e;e=function(n){function t(){var t=null!==n&&n.apply(this,arguments)||this;return t.type="wordpress",t}return __extends(t,n),t.prototype.check=function(){for(var t=0,n=Array.from(document.querySelectorAll("link"));t<n.length;t++){var e=n[t];if(e.href){var o=-1<e.href.indexOf("/wp-content/"),r=-1<e.href.indexOf("/wp-includes/");if(o||r)return!0}}return!1},t}((n=t.Engine||(t.Engine={})).Abstract),n.WordPress=e}(OptiMonk||(OptiMonk={})),function(e){var t,o;t=e.SiteInfo||(e.SiteInfo={}),o=!1,t.initialize=function(){e.Engine.initialize(),o=!0},t.send=function(){if(!o)throw new Error("[SiteInfo] Not initialized");var t,n={account:OptiMonkRegistry.account,platform:e.Engine.getType(),hostname:location.hostname};((t=new XMLHttpRequest).open("POST",OptiMonkRegistry.baseUrl+"/analytics/siteinfo",!0),t.setRequestHeader("Content-Type","application/x-www-form-urlencoded"),t).send("data="+JSON.stringify(n))}}(OptiMonk||(OptiMonk={}));

        OptiMonk.sendLoadRequest = function () {
            var body = 'url=' + encodeURIComponent(window.location.href) + '&cookie=' + OptiMonk.Util.stringify(OptiMonk.getCookie())

            if (OptiMonkRegistry.clientId) {
                body = body + '&clientId=' + encodeURIComponent(OptiMonkRegistry.clientId)
            }

            OptiMonk.ajax.post(
                body,
                OptiMonkRegistry.baseUrl + '/public/' + OptiMonkRegistry.account + '/js/load',
                OptiMonk.addResponseToHead
            );
        };

        OptiMonk.sendMetrics = function (event, properties) {
            properties.frontend = true
            fetch(OptiMonkRegistry.baseUrl + '/metrics', {
                method: 'POST',
                headers: {'Content-Type': 'application/json' },
                body: JSON.stringify({
                    account: OptiMonkRegistry.account,
                    event,
                    properties
                })
            })
        };

        OptiMonk.preloadInitialized = true;

        return OptiMonk;
    })(OptiMonk || {});
    (function (OptiMonk) {
        function logProductView () {
            var productId = null
            var variantId = null

            if (window.ShopifyAnalytics) {
                productId = OptiMonk._get(ShopifyAnalytics, 'meta.product.id')
                variantId = OptiMonk._get(ShopifyAnalytics, 'meta.selectedVariantId')
            } else if (window.ShopRenter) {
                variantId = OptiMonk._get(ShopRenter, 'product.id')
                productId = OptiMonk._get(ShopRenter, 'product.parent.id') || variantId
            }

            if (productId && variantId) {
                return JFClientAPI.v1.registerProductView({
                    product: {
                        productId: productId.toString(),
                        variantId: variantId.toString()
                    }
                })
                .go()
            }

            return null
        }

        function setClientId() {
            var clientId = OptiMonk.Cookie.local.getItem('optiMonkClientId');
            if (!clientId) {
                clientId = OptiMonk.uuid();
                OptiMonk.Cookie.local.setItem('optiMonkClientId', clientId);
            }

            OptiMonkRegistry.clientId = clientId
        }
        var ErrorReporter=function(r){var n={},t=OptiMonkRegistry.baseUrl+"/error/log";function o(e){r("message="+encodeURIComponent(JSON.stringify(e)),t)}function s(e){return!!n[e.message]}function a(e){n[e.message]=1}return{sendException:function(e){var r;s(e)||(a(e),o({message:(r=e).message,stack:r.stack,userAgent:navigator.userAgent,url:window.location.href,name:r.name,line:r.lineNumber||r.number}))},sendEventError:function(e){var r;s(e)||(a(e),o({message:(r=e).message,stack:r.error?r.error.stack:"",userAgent:navigator.userAgent,url:window.location.href,errorEvent:r,file:r.filename}))}}}(OptiMonk.ajax.post);
        OptiMonk.hasError = false;
        try {
            var OptiMonk;OptiMonk.ayepromise=function(){"use strict";var e={},s=function(){var t=!1;return function(e){return function(){t||(t=!0,e.apply(null,arguments))}}},p=function(i,r){var c=e.defer(),a=function(t,n){setTimeout(function(){var e;try{e=t(n)}catch(e){return void c.reject(e)}e===c.promise?c.reject(new TypeError("Cannot resolve promise with itself")):c.resolve(e)},1)};return{promise:c.promise,handle:function(e,t){var n,o;e===l?(o=t,i&&i.call?a(i,o):c.resolve(o)):(n=t,r&&r.call?a(r,n):c.reject(n))}}},l=1;return e.defer=function(){var o,i=0,r=[],c=function(e,t){i=e,o=t,r.forEach(function(e){e.handle(i,o)}),r=null},a=function(e){c(2,e)},t=function(e,t){var n=p(e,t);return 0===i?r.push(n):n.handle(i,o),n.promise},u=function(e){var t,n,o;try{o=(n=e)&&n.then,t="object"==typeof n&&"function"==typeof o?function(){return o.apply(n,arguments)}:void 0}catch(e){return void a(e)}t?function(e){var t=s();try{e(t(u),t(a))}catch(e){t(a)(e)}}(t):c(l,e)},e=s();return{resolve:e(u),reject:e(a),promise:{then:t,fail:function(e){return t(null,e)}}}},e}(),function(t){var e=function(){function e(){}return e.load=function(){var e=t.ayepromise.defer();return this.Loader.load(e),e.promise},e}();(t.Data=e).Loader={load:function(e){e.resolve()}}}(OptiMonk||(OptiMonk={})),OptiMonk.Util.checkVariable("ShopifyAnalytics",20).then(function(){var e,t;e=window.Shopify,t=window.ShopifyAnalytics,window.OptiMonk.ShopifyAdapter={isShopifyShop:function(){return void 0!==t&&void 0!==e},isProductPage:function(){return"product"===t.meta.page.pageType},getProductId:function(){return t.meta.product.id},getVariantId:function(){return t.meta.selectedVariantId},getProductPageData:function(){return{product_id:this.getProductId()}},getShopName:function(){return e.shop||e.Checkout.apiHost},getShopCurrency:function(){return t.meta.currency}},OptiMonk.triggerEvent(document.querySelector("html"),"optimonk#shopify-vars-loaded",window.OptiMonk.ShopifyAdapter)},function(){OptiMonk.triggerEvent(document.querySelector("html"),"optimonk#shopify-vars-not-loaded")}),function(e){var t,n,o,i,r,c,a=e.Util;t=e.Cookie||(e.Cookie={}),c=function(e){return"object"==typeof e&&(e=a.stringify(e)),navigator.userAgent.match(/^Opera.* Version\/12.*/)?encodeURIComponent(e):e},function(e){function t(e){return!!e&&new RegExp("(?:^|;\\s*)"+encodeURIComponent(e).replace(/[\-\.\+\*]/g,"\\$&")+"\\s*\\=").test(document.cookie)}e.getItem=function(e){var t=document.cookie.match(new RegExp(e+"=([^;]+)"));return t?decodeURIComponent(t[1]):null},e.getItemSlices=function(e,t){for(var n,o=new RegExp(e+"_"+OptiMonkRegistry.account+"_[0-9]+=([^;]+)\\;?","gm"),i=[];n=o.exec(document.cookie);){var r="function"==typeof t?t(n[1]):n[1];i=i.concat(JSON.parse(decodeURIComponent(r)))}return i},e.getItemSlicesRaw=function(e){for(var t,n=new RegExp("("+e+"_"+OptiMonkRegistry.account+"_[0-9]+)=([^;]+)\\;?","gm"),o=[];t=n.exec(document.cookie);)o.push({key:t[1],value:t[2]});return o},e.hasItem=t,e.removeItem=function(e){return!!t(e)&&(document.cookie=encodeURIComponent(e)+"=; expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/;",!0)},e.setItem=function(e,t){var n=new Date,o=c(t);n.setUTCFullYear(n.getUTCFullYear()+1),o+="; expires="+n.toUTCString(),document.cookie=e+"="+o+";path=/;"}}(n=t.local||(t.local={})),(o=t.session||(t.session={})).setItem=function(e,t){var n=c(t);document.cookie=e+"="+n+";path=/;"},o.getItem=function(e){return n.getItem(e)},o.getItemSlices=function(e){return n.getItemSlices(e)},o.hasItem=function(e){return n.hasItem(e)},o.removeItem=function(e){return n.removeItem(e)},i=t.CampaignCookieCollection||(t.CampaignCookieCollection={}),r={},i.add=function(e){r[e.getCampaignId()]=e},i.getByCampaignId=function(e){return r[e]}}(OptiMonk||(OptiMonk={})),function(e){var t,n,o,i,r,c,a,u,s,p,l,f,m,d;t=e.Storage||(e.Storage={}),i=e.Util,r=e.Cookie.local.setItem,c=e.Cookie.local.getItem,a=e.Cookie.local.getItemSlices,u=e.Cookie.local.removeItem,s=e.Cookie.local.hasItem,p=e.Cookie.session.setItem,l=e.Cookie.session.getItem,f=e.Cookie.session.getItemSlices,m=e.Cookie.session.removeItem,d=e.Cookie.session.hasItem,"object"==typeof localStorage&&(r=function(e,t){localStorage.setItem(e,i.stringify(t))},c=function(e){return i.parse(localStorage.getItem(e),i.parseHelper)},a=function(e){return i.parse(localStorage.getItemSlices(e),i.parseHelper)},u=function(e){return localStorage.removeItem(e),!0},s=function(e){return null!==c(e)},p=function(e,t){sessionStorage.setItem(e,i.stringify(t))},l=function(e){return i.parse(sessionStorage.getItem(e),i.parseHelper)},f=function(e){return i.parse(sessionStorage.getItemSlices(e),i.parseHelper)},m=function(e){return sessionStorage.removeItem(e),!0},d=function(e){return null!==l(e)}),(n=t.local||(t.local={})).getItem=function(e){return c(e)},n.setItem=function(e,t){r(e,t)},n.getItemSlices=function(e){return a(e)},n.removeItem=function(e){return u(e)},n.hasItem=function(e){return s(e)},(o=t.session||(t.session={})).getItem=function(e){return l(e)},o.setItem=function(e,t){p(e,t)},o.getItemSlices=function(e){return f(e)},o.removeItem=function(e){return m(e)},o.hasItem=function(e){return d(e)}}(OptiMonk||(OptiMonk={})),OptiMonk.messaging=function(){var e,o,i,r=1,c=this;return{postMessage:function(e,t,n){t&&(n=n||parent,c.postMessage?n.postMessage(e,t.replace(/([^:]+:\/\/[^\/]+).*/,"$1")):t&&(n.location=t.replace(/#.*$/,"")+"#"+ +new Date+r+++"&"+e))},receiveMessage:function(n,t){c.postMessage?(n&&(i=function(e){if("string"==typeof t&&e.origin!==t||"[object Function]"===Object.prototype.toString.call(t)&&!1===t(e.origin))return!1;n(e)}),c.addEventListener?c[n?"addEventListener":"removeEventListener"]("message",i,!1):c[n?"attachEvent":"detachEvent"]("onmessage",i)):(e&&clearInterval(e),e=null,n&&(e=setInterval(function(){var e=document.location.hash,t=/^#?\d+&/;e!==o&&t.test(e)&&n({data:(o=e).replace(t,"")})},100)))}}}(),OptiMonk.each=function(e,t){var n;for(n in e)e.hasOwnProperty(n)&&"length"!==n&&t(n,e[n])},OptiMonk.getCookie=function(){var e=OptiMonk.Cookie.local.getItem("optiMonkClient");if(e){var t=-1===e.indexOf("{");if(e=OptiMonk.Util.parse(t?OptiMonk.LZString.decompressFromBase64(e):e),Array.isArray(e[OptiMonkRegistry.account].ca)){for(var n=OptiMonk.Cookie.local.getItemSlicesRaw("optiMonkClient"),o=e[OptiMonkRegistry.account].ca,i=0,r=n.length;i<r;i+=1){var c=n[i];t=-1===c.value.indexOf("{");var a=c.value;t&&(a=OptiMonk.LZString.decompressFromBase64(a)),Array.prototype.push.apply(o,JSON.parse(decodeURIComponent(a)))}var u={};return o.forEach(function(e){var t=e.caId;delete e.caId,u[t]=e}),e[OptiMonkRegistry.account].ca=u,e}return e}return(e={})[OptiMonkRegistry.account]={},e},OptiMonk.saveCookie=function(){function n(e){return OptiMonk.LZString.compressToBase64(JSON.stringify(e))}var e=OptiMonk.getCookie();e[OptiMonkRegistry.account]=OptiMonkRegistry.Cookie;var t=e[OptiMonkRegistry.account].ca;if(14<Object.keys(t).length){var o=[],i=[],r=1;for(var c in t)if(t.hasOwnProperty(c)){var a=t[c];a.caId=c,i.push(a),r%14==0&&(o.push(i),i=[]),r++}o.push(i),o.forEach(function(e,t){t&&OptiMonk.Cookie.local.setItem("optiMonkClient_"+OptiMonkRegistry.account+"_"+t,n(e))});var u=JSON.parse(JSON.stringify(e));u[OptiMonkRegistry.account].ca=o[0],OptiMonk.Cookie.local.setItem("optiMonkClient",n(u))}else OptiMonk.Cookie.local.setItem("optiMonkClient",n(e));for(var s=OptiMonk.Cookie.local.getItemSlicesRaw("optiMonkClient"),p=0,l=s.length;p<l;p+=1){var f=s[p];-1===f.value.indexOf("{")||OptiMonk.Cookie.local.removeItem(f.key)}},OptiMonk.isCookieEnabled=function(){var e=navigator.cookieEnabled,t=!!e;return void 0!==e||t||(document.cookie="isCookie",t=-1!=document.cookie.indexOf("isCookie")),t},OptiMonk.isPreRender=function(){return!!document.webkitVisibilityState&&"prerender"===document.webkitVisibilityState},OptiMonk.shouldContinueLoading=function(){return OptiMonk.isCookieEnabled()&&!1===OptiMonk.isPreRender()},OptiMonk.addResponseToHead=function(e){var t=document.createElement("script"),n=document.createTextNode(e);t.appendChild(n),t.type="text/javascript",document.getElementsByTagName("head")[0].appendChild(t)},OptiMonk.triggerEvent=function(e,t,n){var o;document.createEvent?(o=document.createEvent("HTMLEvents")).initEvent(t,!0,!0):document.createEventObject&&((o=document.createEventObject()).eventType=t),o.eventName=t,o.parameters=n||{},e.dispatchEvent?e.dispatchEvent(o):e.fireEvent?e.fireEvent("on"+o.eventType,o):e[t]?e[t]():e["on"+t]&&e["on"+t]()},OptiMonk.uuid=function(){function e(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return e()+e()+"-"+e()+"-"+e()+"-"+e()+"-"+e()+e()+e()};
            OptiMonk.triggerEvent(document.querySelector('html'), 'optimonk#preload-initialized');
            if (OptiMonkRegistry.needClientId) setClientId();
            if (OptiMonkRegistry.needSiteInfo) {
                setTimeout(function() {
                    OptiMonk.SiteInfo.initialize();
                    OptiMonk.SiteInfo.send();
                }, 5000)
            }
            if (OptiMonkRegistry.reportLvp) {
                OptiMonk.addScript('jetfabric', OptiMonkRegistry.jsJsScriptUrl)
            }
            document.addEventListener('jetfabricLoaded', function () {
                var shopId = null
                var customerId = undefined
                if (window.Shopify) {
                    shopId = window.Shopify.shop
                    if (window.ShopifyAnalytics) {
                      customerId = OptiMonk._get(ShopifyAnalytics, 'meta.page.customerId')
                    }
                } else if (window.ShopRenter && window.ShopRenter.shop) {
                    shopId = window.ShopRenter.shop.name
                    customerId = OptiMonk._get(ShopRenter, 'customer.userId')
                }
                if (!customerId) {
                    customerId = undefined
                } else {
                    customerId = '' + customerId
                }

                if (shopId) {
                    JFClientAPI.v1
                        .identifyStore({
                            accountId: '' + OptiMonkRegistry.account,
                            shopId: shopId
                        })
                        .identifyCustomer({
                            deviceId: OptiMonkRegistry.clientId,
                            customerId: customerId
                        })

                    logProductView()
                }
            });

            OptiMonk.Data.load()
                .then(function () {
                    if (OptiMonk.shouldContinueLoading()) {
                        OptiMonk.sendLoadRequest();
                    }
                });
            // Logging
            if (OptiMonkRegistry.account === 30818) {
                OptiMonk.addListener(window, 'error', ErrorReporter.sendEventError)
            }
        } catch (exception) {
            ErrorReporter.sendException(exception);
            OptiMonk.Logger.error(exception)
            ErrorReporter.sendException('preload', exception);
        }
    })(OptiMonk);
}
