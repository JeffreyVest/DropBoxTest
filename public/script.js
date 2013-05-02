$(function() {
    document.getElementById("db-chooser").addEventListener("DbxChooserSuccess",
        function(e) {
            var file = e.files[0].link;
            var extension = file.substr( (file.lastIndexOf('.') +1) );
            switch(extension) {
                case 'mp3':
                    $(chosenAudio).attr("src", file);
                    $(chosenAudio).show();
                    $(chosenImg).attr("src", "");
                    $(chosenImg).hide();
                    break;
                default:
                    $(chosenImg).attr("src", file);
                    $(chosenImg).show();
                    $(chosenAudio).attr("src", "");
                    $(chosenAudio).hide();
            }

        }, false);
});
