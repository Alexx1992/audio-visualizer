/**
 * Created by Alex on 02.04.2016.
 */

(function() {
    var fileInput = document.getElementById('add-file');

    fileInput.addEventListener('change', function() {
        var reader = new FileReader();

        document.getElementById('loader').style.display = 'block';

        reader.onload = function(event) {
            songContext.loadSound(event.target.result);
        };
        reader.readAsDataURL(this.files[0]);
    });

    document.getElementById('add').addEventListener('click',  function() {
        fileInput.click();
    });
    document.getElementById('play').addEventListener('click', function() {
        songContext.play();
    });
}());