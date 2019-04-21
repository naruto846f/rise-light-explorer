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
            $('#words').text(numberToWords.toWords(height) + ' blocks');
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