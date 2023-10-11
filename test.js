const list = ["a", "b", "c", "d", "e", "f"];

const limit = 2;
const page = 4;

const offset = console.log(list.slice((page - 1) * limit, page * limit));

const total = Math.ceil(list.length / limit);

console.log(("totalPage", total));
