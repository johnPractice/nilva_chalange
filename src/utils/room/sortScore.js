const sortResult = async (datas) => {
  try {
    return await datas.sort(sortItem);
  } catch (e) {
    console.log(e);
  }
};
function sortItem(a, b) {
  if (a.totalScore < b.totalScore) {
    return -1;
  } else if (a.totalScore > b.totalScore) {
    return 1;
  } else {
    return 0;
  }
}

module.exports = sortResult;
