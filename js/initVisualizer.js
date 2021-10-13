/**
 * Created by Alex on 03.04.2016.
 */

var visualizer = (function() {
    var countElement = ~~(document.getElementById('visual-wrapper').clientWidth / 5), //8 = (5width) + (3margin-right)
        i = 0, div, allBars,
        barContainer = document.getElementById('visualizer');

    while (i < countElement) {
        div = document.createElement('div');
        div.className = 'bar b' + i;
        barContainer.appendChild(div);
        i++;
    }

    allBars = document.querySelectorAll('.bar');

    return {
        allBars: allBars,
        allBarsLen: allBars.length
    };
}());