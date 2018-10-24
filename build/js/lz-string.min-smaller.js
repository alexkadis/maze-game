var LZString=function(){var o=String.fromCharCode,r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$",t={};var n={compressToEncodedURIComponent:function(o){return null==o?"":n._compress(o,6,function(o){return r.charAt(o)})},decompressFromEncodedURIComponent:function(o){return null==o?"":""==o?null:(o=o.replace(/ /g,"+"),n._decompress(o.length,32,function(n){return function(o,r){if(!t[o]){t[o]={};for(var n=0;n<o.length;n++)t[o][o.charAt(n)]=n}return t[o][r]}(r,o.charAt(n))}))},compress:function(r){return n._compress(r,16,function(r){return o(r)})},_compress:function(o,r,t){if(null==o)return"";var n,e,i,s={},p={},a="",c="",h="",u=2,l=3,f=2,d=[],v=0,w=0;for(i=0;i<o.length;i+=1)if(a=o.charAt(i),Object.prototype.hasOwnProperty.call(s,a)||(s[a]=l++,p[a]=!0),c=h+a,Object.prototype.hasOwnProperty.call(s,c))h=c;else{if(Object.prototype.hasOwnProperty.call(p,h)){if(h.charCodeAt(0)<256){for(n=0;n<f;n++)v<<=1,w==r-1?(w=0,d.push(t(v)),v=0):w++;for(e=h.charCodeAt(0),n=0;n<8;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1}else{for(e=1,n=0;n<f;n++)v=v<<1|e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e=0;for(e=h.charCodeAt(0),n=0;n<16;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1}0==--u&&(u=Math.pow(2,f),f++),delete p[h]}else for(e=s[h],n=0;n<f;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1;0==--u&&(u=Math.pow(2,f),f++),s[c]=l++,h=String(a)}if(""!==h){if(Object.prototype.hasOwnProperty.call(p,h)){if(h.charCodeAt(0)<256){for(n=0;n<f;n++)v<<=1,w==r-1?(w=0,d.push(t(v)),v=0):w++;for(e=h.charCodeAt(0),n=0;n<8;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1}else{for(e=1,n=0;n<f;n++)v=v<<1|e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e=0;for(e=h.charCodeAt(0),n=0;n<16;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1}0==--u&&(u=Math.pow(2,f),f++),delete p[h]}else for(e=s[h],n=0;n<f;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1;0==--u&&(u=Math.pow(2,f),f++)}for(e=2,n=0;n<f;n++)v=v<<1|1&e,w==r-1?(w=0,d.push(t(v)),v=0):w++,e>>=1;for(;;){if(v<<=1,w==r-1){d.push(t(v));break}w++}return d.join("")},decompress:function(o){return null==o?"":""==o?null:n._decompress(o.length,32768,function(r){return o.charCodeAt(r)})},_decompress:function(r,t,n){var e,i,s,p,a,c,h,u=[],l=4,f=4,d=3,v="",w=[],m={val:n(0),position:t,index:1};for(e=0;e<3;e+=1)u[e]=e;for(s=0,a=Math.pow(2,2),c=1;c!=a;)p=m.val&m.position,m.position>>=1,0==m.position&&(m.position=t,m.val=n(m.index++)),s|=(p>0?1:0)*c,c<<=1;switch(s){case 0:for(s=0,a=Math.pow(2,8),c=1;c!=a;)p=m.val&m.position,m.position>>=1,0==m.position&&(m.position=t,m.val=n(m.index++)),s|=(p>0?1:0)*c,c<<=1;h=o(s);break;case 1:for(s=0,a=Math.pow(2,16),c=1;c!=a;)p=m.val&m.position,m.position>>=1,0==m.position&&(m.position=t,m.val=n(m.index++)),s|=(p>0?1:0)*c,c<<=1;h=o(s);break;case 2:return""}for(u[3]=h,i=h,w.push(h);;){if(m.index>r)return"";for(s=0,a=Math.pow(2,d),c=1;c!=a;)p=m.val&m.position,m.position>>=1,0==m.position&&(m.position=t,m.val=n(m.index++)),s|=(p>0?1:0)*c,c<<=1;switch(h=s){case 0:for(s=0,a=Math.pow(2,8),c=1;c!=a;)p=m.val&m.position,m.position>>=1,0==m.position&&(m.position=t,m.val=n(m.index++)),s|=(p>0?1:0)*c,c<<=1;u[f++]=o(s),h=f-1,l--;break;case 1:for(s=0,a=Math.pow(2,16),c=1;c!=a;)p=m.val&m.position,m.position>>=1,0==m.position&&(m.position=t,m.val=n(m.index++)),s|=(p>0?1:0)*c,c<<=1;u[f++]=o(s),h=f-1,l--;break;case 2:return w.join("")}if(0==l&&(l=Math.pow(2,d),d++),u[h])v=u[h];else{if(h!==f)return null;v=i+i.charAt(0)}w.push(v),u[f++]=i+v.charAt(0),i=v,0==--l&&(l=Math.pow(2,d),d++)}}};return n}(); "function"==typeof define&&define.amd?define(function(){return LZString}):"undefined"!=typeof module&&null!=module?module.exports=LZString:"undefined"!=typeof angular&&null!=angular&&angular.module("LZString",[]).factory("LZString",function(){return LZString});