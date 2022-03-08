(()=>{var n,t,e={1917:(n,t,e)=>{"use strict";var r=e(7825),s=e(9916);class o{static getBlankLineLocations(n,t=0,e=n.length){const r=/\n\s*\n/gim;let s;const o=[];for(;s=r.exec(n);)t<s.index&&s.index<e&&o.push(s.index);return o}static stringEndsWithAny(n,t){let e=!1;for(const r of t)e=e||n.endsWith(r);return e}}function l(n,t){const e=typeof n,r=typeof t;return e!==r?l(e,r):n<t?-1:n>t?1:0}function i(n,t,e,r){if(e.length!==r.length)throw new Error("Sortier ran into a problem - Expected the same number of unsorted types and sorted types to be provided");if(1===e.length)return n;let s=n.slice(),o=0;for(let l=0;l<e.length;l++){const i=e[l],a=r[l];if(i===a)continue;const f=i.range,g=a.range;if(null==f||null==g)throw new Error("Range cannot be null");if(f[0]===g[0]&&f[1]===g[1])continue;let h=c(n,t,i),p=c(n,t,a),d=h[0]===h[1]&&p[0]===p[1];if(!d&&h[0]!==p[0]&&h[1]!==p[1]){const t=h[0]+o,e=h[1]+o,r=s.slice(0,t),l=s.slice(e),i=p[0],c=p[1];s=r+n.substring(i,c)+l,o+=c-i-(e-t)}{const t=f[0]+o,e=f[1]+o,r=s.slice(0,t),l=s.slice(e),i=g[0],c=g[1];s=r+n.substring(i,c)+l,o+=c-i-(e-t)}if(h=u(n,t,i),p=u(n,t,a),d=h[0]===h[1]&&p[0]===p[1],!d&&h[0]!==p[0]&&h[1]!==p[1]){const t=h[0]+o,e=h[1]+o,r=s.slice(0,t),l=s.slice(e),i=p[0],c=p[1];s=r+n.substring(i,c)+l,o+=c-i-(e-t)}}return s}function c(n,t,e){const r=e.range;if(null==r)throw new Error("Specifier range cannot be null");const s=a(n,t,e);if(s.length>=1&&"Block"===s[0].type){const t=s[0].range,e=s[s.length-1].range;if(null==t||null==e)throw new Error("Comment cannot have a null range");const o=n.substring(e[1],r[0]);if(-1===o.indexOf("\n"))return[t[0],e[1]+o.length]}const o=Math.max(0,n.substring(0,r[0]).lastIndexOf("\n")),l=n.substring(o,r[0]);let i=l.search(/[^(\s)]/gim);-1===i&&(i=l.length);const c=o+i;if(0!==s.length){const n=s[0];if(null!=n.range&&null!=e.range)return[n.range[0],c]}return[c,c]}function u(n,t,e){const r=e.range;if(null==r)throw new Error("Specifier range cannot be null");let s=n.indexOf("\r",r[1]);-1===s&&(s=n.indexOf("\n",r[1])),-1===s&&(s=n.length);const o=f(n,t,e);if(0===o.length)return[s,s];const l=o[0].range,i=o[o.length-1].range;if(null==l||null==i)return[s,s];const c=n.substring(r[1],l[0]),u=c.match(/[^(\s)]/gim);let a=0;return null!=u&&0!==u.length&&(a=c.lastIndexOf(u[u.length-1])+1),[r[1]+a,i[1]]}function a(n,t,e){t=t.filter((t=>g(n,t)));const r=e.range;if(null==r)return[];let s=-1,o=0,l=Math.max(0,t.length-1),i=Math.floor((l+o)/2);for(;Math.abs(o-l)>1;){const n=t[i].range;null!=n&&(n[0]<r[0]&&(o=i,i=Math.floor((l+i)/2)),n[0]>r[0]&&(l=i,i=Math.floor((o+i)/2)))}for(let e=i;e<t.length;e++){const o=t[e].range;if(null==o)continue;if(o[0]>r[0])break;const l=n.substring(n.lastIndexOf("\n",o[0])+1,o[0]),i=n.substring(o[1],r[0]),c=!(null==l.match(/[^\s]/gim))&&-1!==i.indexOf("\n"),u=null==i.match(/[^\s]/gim);(i.match(/\n/gim)||0)<=1&&u&&!c&&(s=e)}let c=s;if(-1!==s)for(;c>0;){const e=t[c-1].range,r=t[c].range;if(null==e||null==r)throw new Error("Comment cannot have a null range");const s=n.substring(e[1],r[0]),o=!(null==n.substring(n.lastIndexOf("\n",e[0]),e[0]).match(/[^\s]/gim))&&-1!==s.indexOf("\n"),l=s.match(/\n/gim);if(s.match(/[^(|&+\-*/\s)]/gim)||null!=l&&1<l.length||o)break;c--}return-1===s?[]:(-1===c&&(c=s),t.slice(c,s+1))}function f(n,t,e){t=t.filter((t=>g(n,t)));const r=e.range;if(null==r)return[];let s=0,o=Math.max(0,t.length-1),l=Math.floor((o+s)/2);for(;Math.abs(s-o)>1;){const n=t[l].range;null!=n&&(n[0]<r[0]&&(s=l,l=Math.floor((o+l)/2)),n[0]>r[0]&&(o=l,l=Math.floor((s+l)/2)))}for(let e=l;e<t.length;e++){const s=t[e].range;if(null==s)continue;if(s[0]<r[0])continue;const o=n.substring(r[1],s[0]),l=n.indexOf("\n",r[1]),i=n.substring(s[1],-1===l?void 0:l),c=null==o.match(/[\w\n]/gim),u=null==i.match(/[\w\n]/gim);if(c&&u)return t.slice(e,e+1);break}return[]}function g(n,t){const e=t.range;return!(null==e||"Line"===t.type&&!n.substring(e[0],e[1]).startsWith("//")||"Block"===t.type&&!n.substring(e[0],e[1]).startsWith("/*"))}function h(n){if(null!=n.prop)return n.prop;if(null!=n.source)return n.source;throw new Error("Unknown object type provided")}function p(n,t){const e=t.indexOf(n);let r=t.indexOf("*");return-1===r&&(r=t.length),-1===e?r:e}class d{getRewrittenContents(n,t,e){const r=this.getValidatedOptions(e),s=this.getParser(r,n)(t,{});return this.sortNode(r,s,t)}isFileSupported(n){return o.stringEndsWithAny(n,[...d.SCSS_EXTENSIONS,...d.LESS_EXTENSIONS])}getValidatedOptions(n){return{sortDeclarations:{overrides:[]},...n.css}}getParser(n,t){if("less"===n.parser)return r.parse;if("scss"===n.parser)return s.Qc;if(o.stringEndsWithAny(t,d.LESS_EXTENSIONS))return r.parse;if(o.stringEndsWithAny(t,d.SCSS_EXTENSIONS))return s.Qc;throw new Error("File not supported")}sortNode(n,t,e){const r=[];for(const n of t.nodes)"rule"===n.type&&r.push(n);for(const t of r)e=this.sortNode(n,t,e);return function(n,t,e){const r=[],s=[];for(const t of n.nodes)switch(t.type){case"comment":r.push(t);break;case"decl":s.push(t)}if(0===s.length)return t;const c=[0];for(let n=0;n<t.length;n++)"\n"===t[n]&&c.push(n);const u=function(n,t,e){if(t=t.filter((n=>g(e,n))),0===n.length)return[{comments:t,nodes:n}];const r=n[0].range,s=n[n.length-1].range;if(null==r||null==s)throw new Error("Node location is null?");let l=r[0],i=s[1],c=a(e,t,n[0]);if(c.length>0){const n=c[0].range;null!=n&&(l=n[0])}const u=f(e,t,n[n.length-1]);if(u.length>0){const n=u[u.length-1].range;null!=n&&(i=n[1])}t=t.filter((n=>null==n.range||l<=n.range[0]&&n.range[0]<=i));const h=o.getBlankLineLocations(e,l,i),p=[];let d=0;for(;h.length>0;){const r=[];let s=[],o=h.shift();if(null==o)throw new Error("Context barrier index is null?");for(;d<n.length;){const l=n[d],i=l.range;if(null==i)continue;if(null!=o&&d>0){const t=n[d-1].range;if(null!=t){for(;null!=o&&o<t[1];)o=h.shift();if(null!=o&&o>=t[1]&&o<=i[0])break}}r.push(l);const c=a(e,t,l),u=f(e,t,l);s.push(...c,...u),d++}c=[],r.length>0&&(c=a(e,t,r[0])),s.length===c.length&&(s=[]),p.push({comments:s,nodes:r})}const m=n.slice(d);let b=[];return m.forEach((n=>{const r=a(e,t,n),s=f(e,t,n);b.push(...r,...s)})),c=[],m.length>0&&(c=a(e,t,m[0])),b.length===c.length&&(b=[]),(0<t.length||d<n.length)&&p.push({comments:b,nodes:n.slice(d)}),p}(s.map((n=>{const e=c[n.source.start.line-1]+n.source.start.column,r=c[n.source.end.line-1]+n.source.end.column,s=t.substring(e,r);return{prop:n.prop,range:[e,r],source:s,value:n.value}})),r.map((n=>{const e=c[n.source.start.line-1]+n.source.start.column,r=c[n.source.end.line-1]+n.source.end.column+1;return{range:[e,r],type:t.substring(e,r).trim().startsWith("/*")?"Block":"Line"}})),t);let d=t;for(const n of u){let t=!1;for(let e=0;e<n.nodes.length;e++){for(let r=e+1;r<n.nodes.length;r++){const s=n.nodes[e];if(-1!==n.nodes[r].value.indexOf(s.prop)){t=!0;break}}if(t)break}if(t)continue;const r=n.nodes,s=r.slice(),o=new Map;for(const n of s)o.set(n,h(n));s.sort(((n,t)=>{const r=p(n.prop,e.overrides),s=p(t.prop,e.overrides);return r!==s?r-s:l(o.get(n)||"",o.get(t)||"")})),d=i(d,n.comments,r,s)}return d}(t,e,n.sortDeclarations)}}d.LESS_EXTENSIONS=[".less",".less.txt"],d.SCSS_EXTENSIONS=[".css",".css.txt",".scss",".scss.txt"],onmessage=function(n){const{data:t}=n;if(null==t)return;const{text:e,options:r}=t,s=new d;try{const n=s.getRewrittenContents("test.css",e,r||{});postMessage({text:n})}catch(n){const t=(o=n)instanceof Error?o.toString():"string"==typeof o?o:JSON.stringify(o);postMessage({text:t})}var o}},764:()=>{},5158:()=>{},8635:()=>{},139:()=>{},3653:()=>{}},r={};function s(n){var t=r[n];if(void 0!==t)return t.exports;var o=r[n]={exports:{}};return e[n](o,o.exports,s),o.exports}s.m=e,s.x=()=>{var n=s.O(void 0,[938],(()=>s(1917)));return s.O(n)},n=[],s.O=(t,e,r,o)=>{if(!e){var l=1/0;for(a=0;a<n.length;a++){for(var[e,r,o]=n[a],i=!0,c=0;c<e.length;c++)(!1&o||l>=o)&&Object.keys(s.O).every((n=>s.O[n](e[c])))?e.splice(c--,1):(i=!1,o<l&&(l=o));if(i){n.splice(a--,1);var u=r();void 0!==u&&(t=u)}}return t}o=o||0;for(var a=n.length;a>0&&n[a-1][2]>o;a--)n[a]=n[a-1];n[a]=[e,r,o]},s.d=(n,t)=>{for(var e in t)s.o(t,e)&&!s.o(n,e)&&Object.defineProperty(n,e,{enumerable:!0,get:t[e]})},s.f={},s.e=n=>Promise.all(Object.keys(s.f).reduce(((t,e)=>(s.f[e](n,t),t)),[])),s.u=n=>n+".63d9724489a03d70abd1.js",s.miniCssF=n=>{},s.o=(n,t)=>Object.prototype.hasOwnProperty.call(n,t),s.r=n=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(n,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(n,"__esModule",{value:!0})},s.p="/playground/",(()=>{var n={155:1};s.f.i=(t,e)=>{n[t]||importScripts(s.p+s.u(t))};var t=self.webpackChunksortier_playground=self.webpackChunksortier_playground||[],e=t.push.bind(t);t.push=t=>{var[r,o,l]=t;for(var i in o)s.o(o,i)&&(s.m[i]=o[i]);for(l&&l(s);r.length;)n[r.pop()]=1;e(t)}})(),t=s.x,s.x=()=>s.e(938).then(t),s.x()})();