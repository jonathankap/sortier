(()=>{var t,e,r={7498:(t,e,r)=>{"use strict";var s=r(397),n=r(5564),o=r(4194),i=r(4779),c=r(2972);function a(t){if(null!=t.prop)return t.prop;if(null!=t.source)return t.source;throw new Error("Unknown object type provided")}function u(t,e){const r=e.indexOf(t);let s=e.indexOf("*");return-1===s&&(s=e.length),-1===r?s:r}class l{getRewrittenContents(t,e,r){const s=this.getValidatedOptions(r),n=this.getParser(s,t)(e,{});return this.sortNode(s,n,e)}isFileSupported(t){return i.x.stringEndsWithAny(t,[...l.SCSS_EXTENSIONS,...l.LESS_EXTENSIONS])}getValidatedOptions(t){return{sortDeclarations:{overrides:[]},...t.css}}getParser(t,e){if("less"===t.parser)return n.parse;if("scss"===t.parser)return o.Qc;if(i.x.stringEndsWithAny(e,l.LESS_EXTENSIONS))return n.parse;if(i.x.stringEndsWithAny(e,l.SCSS_EXTENSIONS))return o.Qc;throw new Error("File not supported")}sortNode(t,e,r){const s=[];for(const t of e.nodes)"rule"===t.type&&s.push(t);for(const e of s)r=this.sortNode(t,e,r);return r=function(t,e,r){const s=[],n=[];for(const e of t.nodes)switch(e.type){case"comment":s.push(e);break;case"decl":n.push(e)}if(0===n.length)return e;const o=[0];for(let t=0;t<e.length;t++)"\n"===e[t]&&o.push(t);const i=n.map((t=>{const r=o[t.source.start.line-1]+t.source.start.column,s=o[t.source.end.line-1]+t.source.end.column,n=e.substring(r,s);return{prop:t.prop,range:[r,s],source:n,value:t.value}})),l=s.map((t=>{const r=o[t.source.start.line-1]+t.source.start.column,s=o[t.source.end.line-1]+t.source.end.column+1;return{range:[r,s],type:e.substring(r,s).trim().startsWith("/*")?"Block":"Line"}})),f=(0,c.cN)(i,l,e);let p=e;for(const t of f){let e=!1;for(let r=0;r<t.nodes.length;r++){for(let s=r+1;s<t.nodes.length;s++){const n=t.nodes[r];if(-1!==t.nodes[s].value.indexOf(n.prop)){e=!0;break}}if(e)break}if(e)continue;const s=t.nodes,n=s.slice(),o=new Map;for(const t of n)o.set(t,a(t));n.sort(((t,e)=>{const s=u(t.prop,r.overrides),n=u(e.prop,r.overrides);if(s!==n)return s-n;const i=o.get(t)||"",a=o.get(e)||"";return(0,c.qu)(i,a)})),p=(0,c.rD)(p,t.comments,s,n)}return p}(e,r,t.sortDeclarations),r}}l.LESS_EXTENSIONS=[".less",".less.txt"],l.SCSS_EXTENSIONS=[".css",".css.txt",".scss",".scss.txt"];var f=r(2455);function p(t,e,r){if(e.length!==r.length)throw new Error("Sortier ran into a problem - Expected the same number of unsorted types and sorted types to be provided");let s=0,n=t.slice();for(let t=0;t<e.length;t++){const o=e[t],i=r[t],c=n.slice(0,o.startOffset+s),a=n.slice(o.endOffset+s);n=c+i.source+a,s+=i.source.length-(o.endOffset-o.startOffset)}return n}class d{getRewrittenContents(t,e,r){const n=(0,s.Qc)(e,{canSelfClose:!0});if(n.errors.length>0)throw new Error(n.errors[0].msg);return this.sortNode(r,{children:n.rootNodes},e)}isFileSupported(t){return i.x.stringEndsWithAny(t,d.EXTENSIONS)}sortNode(t,e,r){if(r=function(t,e){if(null==t||null==t.attrs)return e;const r=t.attrs;if(r.length<=1)return e;const s=i.x.getBlankLineLocations(e,t.sourceSpan.start.offset,t.sourceSpan.end.offset),n=r.map((t=>{const r=t.sourceSpan.start.offset,s=t.sourceSpan.end.offset;return{endOffset:s,source:e.substring(r,s),startOffset:r}})),o=[];let a=[];for(;0<s.length;){const t=s.shift();if(null==t)break;for(;0<n.length;){const e=n.shift();if(null==e)break;e.startOffset>t&&0!==a.length&&(o.push(a),a=[]),a.push(e)}}0!==a.length&&o.push(a),0!==n.length&&o.push(n);let u=e;for(const t of o){const e=t.slice();e.sort(((t,e)=>(0,c.qu)(t.source,e.source))),u=p(u,t,e)}return u}(e,r),null!=e.children)for(const s of e.children)r=this.sortNode(t,s,r);return"style"===e.name&&(r=this.sortStyleTagContents(t,e,r)),"script"===e.name&&(r=this.sortScriptTagContents(t,e,r)),r}sortStyleTagContents(t,e,r){if(!this.cantFindOrMatchesAttributeKeyValue(e,"type",["text/css"]))return r;for(let s=0;s<e.children.length;s++){const n=e.children[s];r=this.sortSubstring(r,n.sourceSpan.start.offset,n.sourceSpan.end.offset,(e=>(new l).getRewrittenContents("example.css",e,t)))}return r}sortScriptTagContents(t,e,r){if(!this.cantFindOrMatchesAttributeKeyValue(e,"type",["text/javascript","application/javascript"]))return r;for(let s=0;s<e.children.length;s++){const n=e.children[s];r=this.sortSubstring(r,n.sourceSpan.start.offset,n.sourceSpan.end.offset,(e=>(new f.$).getRewrittenContents("example.js",e,t)))}return r}cantFindOrMatchesAttributeKeyValue(t,e,r){const s=t.attrs.filter((t=>t.name===e));return 0===s.length||-1!==r.indexOf(s[0].value)}sortSubstring(t,e,r,s){const n=t.substring(0,e),o=t.substring(e,r),i=t.substring(r);return n+s(o)+i}}d.EXTENSIONS=[".html",".html.txt"];var h=r(5065);onmessage=function(t){const{data:e}=t;if(null==e)return;const{options:r,text:s,type:n}=e,o=new d;try{const t=o.getRewrittenContents(`test.${n}`,s,r);postMessage({text:t})}catch(t){const e=(0,h.H)(t);postMessage({text:e})}}},5219:()=>{},9550:()=>{},1305:()=>{},6659:()=>{}},s={};function n(t){var e=s[t];if(void 0!==e)return e.exports;var o=s[t]={exports:{}};return r[t].call(o.exports,o,o.exports,n),o.exports}n.m=r,n.x=()=>{var t=n.O(void 0,[893,36,397,6],(()=>n(7498)));return n.O(t)},t=[],n.O=(e,r,s,o)=>{if(!r){var i=1/0;for(l=0;l<t.length;l++){for(var[r,s,o]=t[l],c=!0,a=0;a<r.length;a++)(!1&o||i>=o)&&Object.keys(n.O).every((t=>n.O[t](r[a])))?r.splice(a--,1):(c=!1,o<i&&(i=o));if(c){t.splice(l--,1);var u=s();void 0!==u&&(e=u)}}return e}o=o||0;for(var l=t.length;l>0&&t[l-1][2]>o;l--)t[l]=t[l-1];t[l]=[r,s,o]},n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.f={},n.e=t=>Promise.all(Object.keys(n.f).reduce(((e,r)=>(n.f[r](t,e),e)),[])),n.u=t=>t+"."+{6:"55b9738d85fc7ef53682",36:"a440b0d5d87fb95fe0cd",397:"e1d66e461dfc65ed001a",893:"98b23c59cae628df0bcd"}[t]+".js",n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.p="/sortier/playground/",(()=>{var t={189:1};n.f.i=(e,r)=>{t[e]||importScripts(n.p+n.u(e))};var e=self.webpackChunksortier_playground=self.webpackChunksortier_playground||[],r=e.push.bind(e);e.push=e=>{var[s,o,i]=e;for(var c in o)n.o(o,c)&&(n.m[c]=o[c]);for(i&&i(n);s.length;)t[s.pop()]=1;r(e)}})(),e=n.x,n.x=()=>Promise.all([893,36,397,6].map(n.e,n)).then(e),n.x()})();