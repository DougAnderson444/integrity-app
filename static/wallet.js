/**
 * Secure Bookmark Bootloader
 * Compiles the app HTML and creates a base64 Data URL
 */
const encoded = `<!doctype html>
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<link rel="icon" type="image/svg+xml" href="./favicon.ico" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<title>Vite + Svelte + TS</title>
		<script type="module" crossorigin>var I=Object.defineProperty;var C=(e,t,n)=>t in e?I(e,t,{enumerable:!0,configurable:!0,writable:!0,value:n}):e[t]=n;var g=(e,t,n)=>(C(e,typeof t!="symbol"?t+"":t,n),n);(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const c of r)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function n(r){const c={};return r.integrity&&(c.integrity=r.integrity),r.referrerPolicy&&(c.referrerPolicy=r.referrerPolicy),r.crossOrigin==="use-credentials"?c.credentials="include":r.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function o(r){if(r.ep)return;r.ep=!0;const c=n(r);fetch(r.href,c)}})();function \$(){}function N(e){return e()}function O(){return Object.create(null)}function _(e){e.forEach(N)}function P(e){return typeof e=="function"}function A(e,t){return e!=e?t==t:e!==t||e&&typeof e=="object"||typeof e=="function"}function F(e){return Object.keys(e).length===0}function M(e){e.parentNode&&e.parentNode.removeChild(e)}function R(e){return Array.from(e.childNodes)}let h;function d(e){h=e}function U(){if(!h)throw new Error("Function called outside component initialization");return h}function B(e){U().\$\$.on_mount.push(e)}const l=[],E=[];let a=[];const L=[],W=Promise.resolve();let y=!1;function q(){y||(y=!0,W.then(S))}function b(e){a.push(e)}const m=new Set;let f=0;function S(){if(f!==0)return;const e=h;do{try{for(;f<l.length;){const t=l[f];f++,d(t),z(t.\$\$)}}catch(t){throw l.length=0,f=0,t}for(d(null),l.length=0,f=0;E.length;)E.pop()();for(let t=0;t<a.length;t+=1){const n=a[t];m.has(n)||(m.add(n),n())}a.length=0}while(l.length);for(;L.length;)L.pop()();y=!1,m.clear(),d(e)}function z(e){if(e.fragment!==null){e.update(),_(e.before_update);const t=e.dirty;e.dirty=[-1],e.fragment&&e.fragment.p(e.ctx,t),e.after_update.forEach(b)}}function K(e){const t=[],n=[];a.forEach(o=>e.indexOf(o)===-1?t.push(o):n.push(o)),n.forEach(o=>o()),a=t}const V=new Set;function D(e,t){e&&e.i&&(V.delete(e),e.i(t))}function G(e,t,n){const{fragment:o,after_update:r}=e.\$\$;o&&o.m(t,n),b(()=>{const c=e.\$\$.on_mount.map(N).filter(P);e.\$\$.on_destroy?e.\$\$.on_destroy.push(...c):_(c),e.\$\$.on_mount=[]}),r.forEach(b)}function H(e,t){const n=e.\$\$;n.fragment!==null&&(K(n.after_update),_(n.on_destroy),n.fragment&&n.fragment.d(t),n.on_destroy=n.fragment=null,n.ctx=[])}function J(e,t){e.\$\$.dirty[0]===-1&&(l.push(e),q(),e.\$\$.dirty.fill(0)),e.\$\$.dirty[t/31|0]|=1<<t%31}function Q(e,t,n,o,r,c,u=null,j=[-1]){const p=h;d(e);const i=e.\$\$={fragment:null,ctx:[],props:c,update:\$,not_equal:r,bound:O(),on_mount:[],on_destroy:[],on_disconnect:[],before_update:[],after_update:[],context:new Map(t.context||(p?p.\$\$.context:[])),callbacks:O(),dirty:j,skip_bound:!1,root:t.target||p.\$\$.root};u&&u(i.root);let w=!1;if(i.ctx=n?n(e,t.props||{},(s,x,...v)=>{const k=v.length?v[0]:x;return i.ctx&&r(i.ctx[s],i.ctx[s]=k)&&(!i.skip_bound&&i.bound[s]&&i.bound[s](k),w&&J(e,s)),x}):[],i.update(),w=!0,_(i.before_update),i.fragment=o?o(i.ctx):!1,t.target){if(t.hydrate){const s=R(t.target);i.fragment&&i.fragment.l(s),s.forEach(M)}else i.fragment&&i.fragment.c();t.intro&&D(e.\$\$.fragment),G(e,t.target,t.anchor),S()}d(p)}class T{constructor(){g(this,"\$\$");g(this,"\$\$set")}\$destroy(){H(this,1),this.\$destroy=\$}\$on(t,n){if(!P(n))return \$;const o=this.\$\$.callbacks[t]||(this.\$\$.callbacks[t]=[]);return o.push(n),()=>{const r=o.indexOf(n);r!==-1&&o.splice(r,1)}}\$set(t){this.\$\$set&&!F(t)&&(this.\$\$.skip_bound=!0,this.\$\$set(t),this.\$\$.skip_bound=!1)}}const X="4";typeof window<"u"&&(window.__svelte||(window.__svelte={v:new Set})).v.add(X);const Y=\`console.log('Worker loaded');
\`;function Z(e){return B(async()=>{new Worker(new URL(\`data:application/javascript,\${encodeURIComponent(Y)}\`),{type:"module"})}),[]}class ee extends T{constructor(t){super(),Q(this,t,Z,null,A,{})}}new ee({target:document.getElementById("app")});
</script>
		<style rel="stylesheet" crossorigin>@tailwind base;@tailwind components;@tailwind utilities;
</style>
	</head>
	<body>
		<div id="app"></div>
	</body>
</html>
`;

// decode from base64 then write to document
// let decoded = atob(encoded);
document.write(encoded);
