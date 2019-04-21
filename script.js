rise.nodeAddress = 'https://wallet.rise.vision';

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
            document.getElementById("height").innerHTML = result["height"];
            document.getElementById("supply").innerHTML = result["supply"]/100000000;
            document.getElementById('words').innerHTML = inWords(height);
            return height, supply;
        } else {
            alert_error('Cannot retrieve height at this time, check console for error');
            console.log('error: ', error);
        }
    });
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

$( document ).ready(function() {
    alert_success('Connected');
    setInterval(get_height,5000);
});

//get newest block id
function height_id() {
    rise.blocks.getBlocks({limit: 1, orderBy:"height:desc"}).then(function ({blocks}) {
        let id = blocks[0].id;
        let ntxs = blocks[0].numberOfTransactions;
        let txed = blocks[0].totalAmount/100000000;
        console.log(block_info(id)); //shows block info of newest block
        $('#id').text(id);
        $('#ntxs').text(ntxs);
        $('#txed').text(txed);
        //if (blocks.totalAmount > 0){
            //$('#txed').text(txed);
        //}
        return id;
    }).catch(function (err) {
        console.log('Error: ', err) // handle error
    })
}
//blockinfo using id
function block_info(id) {
    rise.blocks.getBlock(id).then(function({ block }) {
        console.log(block);
    })
    .catch(function(err) {
        console.log('Error: ', err) // handle error
    })
}