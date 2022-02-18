const got = require('got')
const cheerio = require('cheerio')
const fs = require('fs')

const init = async (i) => {
  const request = await got(`https://yz.ahnu.edu.cn/sszs/zxdt/${i}.htm`)
  const $ = cheerio.load(request.body);
  const ele = $('.list_r_line  .list_r_div .list_r_div_l .itemtitle')
  ele.each((_, element) => {
    if (
      $(element).text().indexOf('真题') > -1
    ) {
      fs.appendFile(
        "./info.txt",
        $(element).text() + '  ' + 'https://yz.ahnu.edu.cn' + $(element).attr('href').split('../..')[1] + '\n',
        (err) => {
          if (err) throw err;
        }
      );
    }
  });
}

for (let index = 1; index < 93; index++) {
  init(index)
}