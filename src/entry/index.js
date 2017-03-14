import _ from 'lodash';

const main = async () => {
  const obj = _.assign({}, {
    a: 1,
    b: 2,
  });
  console.log(obj);
};

main();
