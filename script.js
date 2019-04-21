rise.nodeAddress = 'https://wallet.rise.vision';

$( document ).ready(function() {
    get_height();
    alert_success('Connected');
    setInterval(get_height,5000);
});

function get_height(){
    rise.blocks.getStatus(function(error, result) {
        let height = result["height"];
        let supply = result["supply"];
        let displayed_height = document.getElementById("height").innerHTML;
        if (!error) {
            if (parseInt(displayed_height) < parseInt(height)) {
                //console.log(displayed_height);
                //console.log(height);
                alert_info('New block');
                height_id();
            }
            $('#height').text(height);
            $('#supply').text(Math.round(supply/100000000));
            $('#words').text(inWords(height));
            return height, supply;
        } else {
            alert_error('Cannot retrieve height at this time, check console for error');
            console.log('error: ', error);
        }
    });
}

function get_delegate(public_key){
    rise.delegates.getByPublicKey(public_key).then(function({ delegate }) {
        let username = delegate.username;
        $('#forger').text(username);
        return username;
    })
        .catch(function(err) {
            console.log('Error: ', err) // handle error
        })
}

function block_info(id) {
    rise.blocks.getBlock(id).then(function({ block }) {
        console.log(block);
    })
        .catch(function(err) {
            console.log('Error: ', err) // handle error
        })
}

var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];

function inWords (num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'blocks ' : '';
    return str;
}

function height_id() {
    rise.blocks.getBlocks({limit: 1, orderBy:"height:desc"}).then(function ({blocks}) {
        let id = blocks[0].id;
        let ntxs = blocks[0].numberOfTransactions;
        let txed = Math.round(blocks[0].totalAmount/100000000);
        let generatorPublicKey = blocks[0].generatorPublicKey;
        get_delegate(generatorPublicKey);
        console.log(block_info(id));
        $('#id').text(id);
        $('#ntxs').text(ntxs);
        $('#txed').text(txed);
        return id;
    }).catch(function (err) {
        console.log('Error: ', err) // handle error
    })
}

function alert_success(message){
    $.notify({
        // options
        //icon: 'glyphicon glyphicon-warning-sign',
        title: 'Success: ',
        message: message
    },{
        // settings
        type: 'success',
        allow_dismiss: false,
        newest_on_top: false,
        delay: 5000,
        placement: {
            from: "bottom",
            align: "right"
        },
        animate: {
            enter: 'animated bounceIn',
            exit: 'animated bounceOut'
        }
    });
}

function alert_info(message){
    $.notify({
        // options
        //icon: 'glyphicon glyphicon-warning-sign',
        title: 'Info: ',
        message: message
    },{
        // settings
        type: 'info',
        allow_dismiss: false,
        newest_on_top: false,
        delay: 5000,
        placement: {
            from: "bottom",
            align: "right"
        },
        animate: {
            enter: 'animated bounceIn',
            exit: 'animated bounceOut'
        }
    });
}

function alert_error(message){
    $.notify({
        // options
        //icon: 'glyphicon glyphicon-warning-sign',
        title: 'Error: ',
        message: message
    },{
        // settings
        type: 'danger',
        allow_dismiss: false,
        newest_on_top: false,
        delay: 5000,
        placement: {
            from: "bottom",
            align: "right"
        },
        animate: {
            enter: 'animated bounceIn',
            exit: 'animated bounceOut'
        }
    });
}