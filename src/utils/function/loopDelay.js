const loop = (l, i, d, f) => {
  setTimeout(function () {
    f(i);
    i++;
    if (i < l) {
      loop(l, i, f);
    }
  }, d);
};
module.exports = loop;
