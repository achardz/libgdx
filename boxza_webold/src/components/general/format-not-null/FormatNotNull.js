/* eslint-disable */
function mapField(r, e, t, a) {
  a && (a = a);
  var i = e.toString().trim().split("."),
      n = "";
  const o = function(r) {
    if (r || 0 === r ? "object" == typeof r && 0 === Object.keys(r).length && 0 !== (r = r instanceof Array ? "array" : "object") && (r = t || "") : t && (r = t), !0 === a && "number" == typeof r) {
      if (parseFloat(r)) {
        for (;
            /(\d+)(\d{3})/.test(r.toString());) r = r.toString().replace(/(\d+)(\d{3})/, "$1,$2");
        return r
      }
      return r
    }
    if ("number" == typeof a && "number" == typeof r) {
      if (parseFloat(r)) {
        for (var e = parseFloat(r).toFixed(a), i = (e += "").split("."), n = i[0], o = i.length > 1 ? "." + i[1] : "", s = /(\d+)(\d{3})/; s.test(n);) n = n.replace(s, "$1,$2");
        return n + o
      }
      return r
    }
    return r
  };
  try {
    const e = function(r) {
          return r.indexOf("[") > -1
        },
        a = function(r, e) {
          return r[e.split("[")[0]][e.split("[").pop().split("]")[0]]
        };
    if ("object" == typeof r && 0 !== Object.keys(r).length) {
      for (var s = 0; s < i.length; s++) switch (s) {
        case 0:
          var c = e(i[s]) ? a(r, i[s]) : r[i[s].trim()];
          n = c;
          break;
        case 1:
          var f = c && (e(i[s]) ? a(c, i[s]) : c[i[s].trim()]);
          n = f;
          break;
        case 2:
          var p = c && f && (e(i[s]) ? a(f, i[s]) : f[i[s].trim()]);
          n = p;
          break;
        case 3:
          var l = c && f && p && (e(i[s]) ? a(p, i[s]) : p[i[s].trim()]);
          n = l;
          break;
        case 4:
          var b = c && f && p && l && (e(i[s]) ? a(l, i[s]) : l[i[s].trim()]);
          n = b;
          break;
        case 5:
          var u = c && f && p && l && b && (e(i[s]) ? a(b, i[s]) : b[i[s].trim()]);
          n = u;
          break;
        case 6:
          var m = c && f && p && l && b && u && (e(i[s]) ? a(u, i[s]) : u[i[s].trim()]);
          n = m;
          break;
        case 7:
          var d = c && f && p && l && b && u && m && (e(i[s]) ? a(m, i[s]) : m[i[s].trim()]);
          n = d;
          break;
        case 8:
          var k = c && f && p && l && b && u && m && d && (e(i[s]) ? a(d, i[s]) : d[i[s].trim()]);
          n = k;
          break;
        case 9:
          n = c && f && p && l && b && u && m && d && k && (e(i[s]) ? a(k, i[s]) : k[i[s].trim()]);
          break;
        default:
          n = ""
      }
      n = o(n)
    } else n = o(r);
    return n
  } catch (r) {
    return t
  }
}
export default mapField;
