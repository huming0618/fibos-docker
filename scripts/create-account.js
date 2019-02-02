var FIBOS = require('fibos.js');
var fs = require('fs')
var path = require('path')
var bpaccounts = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../common/bpaccounts.json')))

var chainId = '68cee14f598d88d340b50940b6ddfba28c444b46cd5f33201ace82c78896793a'

//var creatorPubKey = "FO6AeVkhDUE61fv4j2wVdZs45CVEQEGuiEqHQMbgFgojTUKoQt7L"
//var creatorPriKey = "5JcuZCceBMyYJ46sf1RWdQLELBpYnmQKYyqFLCA66TxqvisLpbW"
var creator = "testnetbppa1"
var creatorPriKey = bpaccounts.filter(x=>x.account === creator)[0].private_key
var creatorPubKey = bpaccounts.filter(x=>x.account === creator)[0].public_key

var fibos_client = FIBOS({
  chainId: chainId,
  keyProvider: creatorPriKey,
  httpEndpoint: 'http://127.0.0.1:8801',
  logger: {
    log: null,
    error: null
  }
});

//var creator = "testnetbppa1"
var newAccount = process.argv[2] || "testnetnewc1" 
console.log(fibos_client.getInfoSync());
console.log(fibos_client.getAccountSync(creator))

var auth = {
	"authorization": creator
}
var r = fibos_client.transactionSync(tr => {
  tr.newaccount({
    creator: creator,
    name: newAccount,
    owner: creatorPubKey,
    active: creatorPubKey
  }, auth);
  tr.buyrambytes({
    payer: creator,
    receiver: newAccount,
    bytes: 4096
  }, auth);
  tr.delegatebw({
    from: creator,
    receiver: newAccount,
    stake_net_quantity: '0.1000 FO',
    stake_cpu_quantity: '0.1000 FO',
    transfer: 1
  }, auth);
}, auth);
console.log(r);
