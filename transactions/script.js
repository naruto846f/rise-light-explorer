rise.nodeAddress = 'https://wallet.rise.vision';
//rise.nodeAddress = 'http://45.76.143.15:5555';

$( document ).ready(function() {
    setInterval(transactions,5000);
});

function transactions() {
    rise.transactions.getList({limit: 5, orderBy:"timestamp:desc"}).then(function ({transactions}) {
            console.log(transactions[0]);
            let tid_link = 'https://explorer.rise.vision/tx/';
            $('#t1').text((transactions[0].senderId).substring(0,5) + '...R' + ' -- ' + Math.round(transactions[0].amount/100000000) + 'RISE --> ' + (transactions[0].recipientId).substring(0,5)+'...R ' + transactions[0].confirmations + ' blocks ago');
            $('#tl1').attr("href", tid_link + transactions[0].id);
            $('#t2').text((transactions[1].senderId).substring(0,5) + '...R' + ' -- ' + Math.round(transactions[1].amount/100000000) + 'RISE --> ' + (transactions[1].recipientId).substring(0,5)+'...R ' + transactions[1].confirmations + ' blocks ago');
            $('#tl2').attr("href", tid_link + transactions[1].id);
            $('#t3').text((transactions[2].senderId).substring(0,5) + '...R' + ' -- ' + Math.round(transactions[2].amount/100000000) + 'RISE --> ' + (transactions[2].recipientId).substring(0,5)+'...R ' + transactions[2].confirmations + ' blocks ago');
            $('#tl3').attr("href", tid_link + transactions[2].id);
            $('#t4').text((transactions[3].senderId).substring(0,5) + '...R' + ' -- ' + Math.round(transactions[3].amount/100000000) + 'RISE --> ' + (transactions[3].recipientId).substring(0,5)+'...R ' + transactions[3].confirmations + ' blocks ago');
            $('#tl4').attr("href", tid_link + transactions[3].id);
            $('#t5').text((transactions[4].senderId).substring(0,5) + '...R' + ' -- ' + Math.round(transactions[4].amount/100000000) + 'RISE --> ' + (transactions[4].recipientId).substring(0,5)+'...R ' + transactions[4].confirmations + ' blocks ago');
            $('#tl5').attr("href", tid_link + transactions[4].id);
            //i have 5 tx. i store, i check if this array updates every 5 sec?
        // {by: if id of transactions[0] is = to prev check --> new tx} # update html
        })
        .catch(function (err) {
            console.log('Error: ', err) // handle error
        });
}