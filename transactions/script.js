rise.nodeAddress = 'https://wallet.rise.vision';
//rise.nodeAddress = 'http://45.76.143.15:5555';

$( document ).ready(function() {
    transactions();
    setInterval(transactions,5000);
});

function transactions() {
    rise.transactions.getList({limit: 5, orderBy:"timestamp:desc"}).then(function ({transactions}) {
            console.log(transactions);
            let tid_link = 'https://explorer.rise.vision/tx/';
            //for (tx in range) {}
            let i;
            for (i = 0; i < 5; i++) {
                    $('#sndr'+(i+1)).text((transactions[i].senderId).substring(0,5) + '...R');
                    if (transactions[i].amount/100000000 > 10000){
                        $('#tl'+(i+1)).addClass('btn-outline-success');
                    } else {
                        $('#tl'+(i+1)).addClass('btn-outline-primary');
                    }
                    $('#amnt'+(i+1)).text(Math.round(transactions[i].amount/100000000) + 'RISE');
                    $('#rcvr'+(i+1)).text((' ' + transactions[i].recipientId).substring(0,6)+'...R ');
                    $('#confs'+(i+1)).text(transactions[i].confirmations + ' blocks ago');
                    $('#tl'+(i+1)).attr("href", tid_link + transactions[i].id);
                    $('#tl'+(i+1)).removeClass('invisible');
                    $('#tl'+(i+1)).addClass('animated fadeInRight');
                }
        })
        .catch(function (err) {
            console.log('Error: ', err); // handle error
        });
}