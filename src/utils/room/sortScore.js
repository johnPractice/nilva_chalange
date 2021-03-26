const sortResult = async (datas) => {
  try {
    return datas.sort(sortItem);
  } catch (e) {
    console.log(e);
  }
};
function sortItem(a, b) {
  if (a.score < b.score) {
    return -1;
  } else if (a.score > b.score) {
    return 1;
  } else {
    return 0;
  }
}
