rise.nodeAddress = 'https://wallet.rise.vision';
//rise.nodeAddress = 'http://45.76.143.15:5555';

$( document ).ready(function() {

});

function button_click(){
    var secret = $('#secret').val();
    var amount = $('#amount').val();
    var recipient = $('#recipient').val();

    const riseTx = Rise.txs.createAndSign(
        {
            kind: 'send',
            amount: amount, // Satoshi
            recipient: recipient
        },
        secret
    )
    console.log(riseTx);

    rise.transactions.put(riseTx).then(function ( {invalid} ) {
        //ensures transaction is accepted by network before anything else...
        console.log(invalid[0])
        if (invalid.length >= 1) {
            alert_error(invalid[0].reason);
            $('#exampleModal').modal('hide')
        } else {
            console.log( 'tx ' + invalid[0].id + ' accepted by network ');
            alert_success('Transaction sent to network with id: ' + invalid[0].id);
            $('#exampleModal').modal('hide')
        }
    })
        .catch(function (err) {
            console.log('Error: ', err);
            alert_error(err);// handle error
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

function alert_warning(message){
    warning = $.notify({
        // options
        //icon: 'vendor/img/spinner.gif',
        title: '<div class="spinner-border spinner-border-sm" role="status">\n' +
            '  <span class="sr-only"></span>\n' +
            '</div>',
        message: message
    }, {
        // settings
        type: 'warning',
        allow_dismiss: false,
        newest_on_top: false,
        delay: 30000,
        //icon_type: 'image',
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
