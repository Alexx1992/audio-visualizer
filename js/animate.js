/**
 * Created by Alex on 04.04.2016.
 */

var animate = {
    barsRender: null,
    initCircle: function() {
        var circle = document.querySelector('.progress circle'),
            r = circle.getAttribute('r'),
            length = 2 * Math.PI * r,
            currentTime = 0;

        circle.style.strokeDasharray = length;
        circle.style.strokeDashoffset = length;
        circle.getBoundingClientRect();

        return function() {
            currentTime = songContext.context.currentTime - songContext.startTime;
            circle.style.strokeDashoffset = length - (length * currentTime) / songContext.buffer.duration;
        }
    },

    barsAnimation: function() {
        this.barsRender = requestAnimationFrame(this.barsAnimation.bind(this));

        songContext.analyser.getByteFrequencyData(songContext.bFrequencyData);

        var j = 0;
        while (j < visualizer.allBarsLen) {
            visualizer.allBars[j].style.height = songContext.bFrequencyData[j]/2 + 'px';
            j++;
        }
    },

    stopBarsAnimation: function() {
        cancelAnimationFrame(this.barsRender);
    }
};


var animateCircle = animate.initCircle();