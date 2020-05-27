/*
  Copyright 2017 - present Sean O'Shea

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
function t(t){for(var r={},n=0,e=t.length;n<e;n+=1)r[t.charAt(n)]=0;for(var a=0,h=t.length;a<h;a+=1)r[t.charAt(a)]|=1<<t.length-a-1;return r}function r(t,r,n,e,a){var h=t/e.length,l=Math.abs(n-r);return a?h+l/a:l?1:h}function n(n,e){var a=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,h=arguments.length>3?arguments[3]:void 0,l=t(e),i=h&&h.distance||1e3,o=h&&h.threshold||.5,f=o,v=n.indexOf(e,a);-1!==v&&(f=Math.min(r(0,v,a,e,i),f),-1!==(v=n.lastIndexOf(e,a+e.length))&&(f=Math.min(r(0,v,a,e,i),f)));var g,u,c=1<<e.length-1;v=-1;for(var d,s=e.length+n.length,M=0;M<e.length;M+=1){for(g=0,u=s;g<u;)r(M,a+u,a,e,i)<=f?g=u:s=u,u=Math.floor((s-g)/2+g);s=u;var m=Math.max(1,a-u+1),x=Math.min(a+u,n.length)+e.length;x||(x=0);var y=Array(x+2);y[x+1]=(1<<M)-1;for(var z=x;z>=m;z-=1){var p=l[n.charAt(z-1)];if(y[z]=0===M?(y[z+1]<<1|1)&p:(y[z+1]<<1|1)&p|(d[z+1]|d[z])<<1|1|d[z+1],y[z]&c){var A=r(M,z-1,a,e,i);if(A<=f){if(f=A,!((v=z-1)>a))break;m=Math.max(1,2*a-v)}}}if(r(M+1,a,a,e,i)>f)break;d=y}return v}
/**
 * Executes a fuzzy match on the `text` parameter using the `pattern` parameter.
 * @param {String} text - the text to search through for the pattern.
 * @param {String} pattern - the pattern within the text to search for.
 * @param {String} loc - defines the approximate position in the text where the pattern is expected to be found.
 * @param {Object} options
 * @param {String} [options.distance] - Defines where in the text to look for the pattern.
 * @param {String} [options.threshold] - Defines how strict you want to be when fuzzy matching. A value of 0.0 is equivalent to an exact match. A value of 1.0 indicates a very loose understanding of whether a match has been found.
 * @since 0.1.0
 * @return An Int indicating where the fuzzy matched pattern can be found in the text.
 */function e(t,r){var e=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3?arguments[3]:void 0;if(null==t||null==r)throw new Error("Null input. (fuzzyMatchPattern)");var h=Math.max(0,Math.min(e,t.length));return t===r?0:t.length?t.substring(e,e+r.length)===r?h:n(t,r,h,a):-1}
/**
 * Provides a confidence score relating to how likely the `pattern` parameter is to be found in the `text` parameter.
 * @param {String} text - the text to search through for the pattern.
 * @param {String} pattern - the pattern to search for.
 * @param {Int} loc - the index in the element from which to search.
 * @param {Int} distance - determines how close the match must be to the fuzzy location. See `loc` parameter.
 * @since 0.1.0
 * @return A number which indicates how confident we are that the pattern can be found in the host string. A low value (0.001) indicates that the pattern is likely to be found. A high value (0.999) indicates that the pattern is not likely to be found.
 */var a={confidenceScore:function(t,r){
// start at a low threshold and work our way up
for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3,h=1;h<1e3;h+=1){var l=h/1e3;if(-1!==e(t,r,n,{threshold:l,distance:a}))return l}return-1}
/**
 * Iterates over all elements in the array and executes a fuzzy match using the `pattern` parameter.
 * @param {Array} array - the array of Strings to sort.
 * @param {String} pattern - the pattern to search for.
 * @param {Int} loc - the index in the element from which to search.
 * @param {Int} distance - determines how close the match must be to the fuzzy location. See `loc` parameter.
 * @since 0.2.0
 * @return The `array` parameter sorted according to how close each element is fuzzy matched to the `pattern` parameter.
 */,fuzzyMatchPattern:e,sortArrayByFuzzyMatchPattern:function(t,r){for(var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:0,a=arguments.length>3&&void 0!==arguments[3]?arguments[3]:1e3,h=[],l=[],i=1,o=10;i<=o&&l.length!==t.length;i+=1)for(var f={threshold:i/10,distance:a},v=0,g=t.length;v<g;v+=1)if(!h.includes(v)){var u=t[v],c=e(u,r,n,f);-1!==c&&(l.push(u),h.push(v))}for(var d=0,s=t.length;d<s;d+=1)h.includes(d)||l.push(t[d]);return l},
/*
  Copyright 2017 - present Sean O'Shea

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

       http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/
version:"0.3.0"};export default a;
