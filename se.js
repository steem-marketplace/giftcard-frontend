const SSC = require('sscjs');
const ssc = new SSC('https://api.steem-engine.com/rpc/');

function getTokenBalances(symbol, limit = 1000, offset = 0, tokens = []) {
    return new Promise((resolve, reject) => {
        ssc.find('tokens', 'balances', {'symbol': symbol }, limit, offset, [], (err, result) => {
            if (err) {
                return reject(err);
            }
            
            if (result.length) {
                tokens = [...tokens, ...result];
                const pagingOffset = (offset === 0 ? limit * 1 : offset + limit);

                getTokenBalances(symbol, limit, pagingOffset, tokens)
                    .then(resolve)
                    .catch(reject);
            } else {
                resolve(tokens);
            }
        });
    })
}

// ssc.stream((err, res) => {
//     console.log(err, res);
// });

getTokenBalances('ENG').then(balances => {
    console.log(balances);
});
