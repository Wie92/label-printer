// var base_url = window.location.origin;

$(document).ready(function () {
    var articles;


    $('#inputExcelFile').change(function (e) {

        showLoading();

        //read data in excel file and convert it to json file
        var reader = new FileReader();
        reader.readAsArrayBuffer(e.target.files[0]);
        reader.onload = function () {
            var data = new Uint8Array(reader.result);
            var arr = new Array();

            for(var i=0; i != data.length; i++) arr[i] = String.fromCharCode(data[i]);

            var bstr = arr.join("");
            var workbook = XLSX.read(bstr, {type: 'binary'});
            var worksheet = workbook.Sheets["List of Articles"];

            articles = XLSX.utils.sheet_to_json(worksheet);

            //show article layout
            $('#articles-layout').css('display', 'block');

            //destroy data table
            $('#table-articles').DataTable().destroy();

            //construct data table
            var table = $('#table-articles').DataTable({
                "searching": false, //disable search
                "bLengthChange": false, //remove show entries
                "data": articles,
                "paging": false,
                "columns": [
                    {
                        "data" : "UPC No",
                        "className": "text-center"
                    },
                    {"data" : "Description"},
                    {
                        "data" : "MFG Date",
                        "className": "text-center"
                    },
                    {
                        "data" : "Batch Number",
                        "className": "text-center"
                    },
                    {
                        "data" : "Exp Date",
                        "className": "text-center"
                    },
                    {
                        "data" : "BPOM No",
                        "className": "text-center"
                    },
                    {
                        "data" : "Quantity",
                        "className": "text-right"
                    }
                ]
            });

            Swal.close();
        };
    });

    $('#print-label-btn').click(function () {
        if(articles){
            generateLabel();

            var doc = new jsPDF();

            var elementHandler = {
                '#ignorePDF': function (element, renderer) {
                    return true;
                }
            };

            doc.fromHTML(
                document.getElementById("label-content").innerHTML,
                15,
                15,
                {
                    'width': 180//,'elementHandlers': elementHandler
                });

            // Output as Data URI
            doc.output('datauri');
        }
    });

    function generateLabel(){
        var qrCounter = 0;
        var upcNo, description, mfgDate, batchNumber, expDate, bpomNo, qrCodeId;

        //set label conent empty
        $('#label-content').empty();

        for(var i=0; i<articles.length; i++){

            upcNo = articles[i]["UPC No"];
            description = articles[i]["Description"];
            mfgDate = articles[i]["MFG Date"];
            batchNumber = articles[i]["Batch Number"];
            expDate = articles[i]["Exp Date"];
            bpomNo = articles[i]["BPOM No"];
            qrCodeId = "qrcode"+qrCounter;

            for(var j=0; j<articles[i].Quantity; j++){
                qrCodeId = "qrcode"+qrCounter;

                $('#label-content').append(
                    '<div class="label-frame"> '
                    + '<div class="label-desciption"> ' + description+ ' </div>'
                    + '<div class="label-detail-left">'
                    + '<div>'
                    + '<div class="label-mfg"> MFG Date: ' + mfgDate + '</div>'
                    + '<div class="label-batch"> BATCH: ' + batchNumber + '</div>'
                    + '</div>'
                    + '<div class="label-detail1">EXP Date: ' + expDate + '</div>'
                    + '<div class="label-detail1">BPOM No.: ' + bpomNo + '</div>'
                    + '<div class="label-company">'
                    + '<Diimpor & didistribusikan oleh PT. Sephora Indonesia<br>'
                    + 'Recapital Building Lt.9 Jl. Adityawarman Kav.55 Keb Baru<br>Jakarta - Indonesia'
                    + '</div>'

                    + '</div>'
                    + '<div class="label-detail-right">'
                    + '<div id="'+qrCodeId+'" align="center"></div>'
                    + '<div class="label-upc">UPC NO: ' + upcNo + '</div>'
                    + '<div class="label-bpom-title">BPOM RI</div>'
                    + '</div>'
                    + ' </div>'
                );

                new QRCode(document.getElementById(qrCodeId), {
                    text: upcNo,
                    width: 32,
                    height: 32,
                    colorDark : "#000000",
                    colorLight : "#ffffff",
                    correctLevel :  QRCode.CorrectLevel.H
                });

                qrCounter++;
            }
        }
    }

    function showLoading(){
        Swal.fire({
            title: 'Loading',
            text: 'Please wait while loading data...',
            showConfirmButton: false,
            allowOutsideClick: false,
            imageWidth: 100,
            imageHeight: 100,
            //imageUrl: base_url+'/images/loading.gif'
        });
    }

});


