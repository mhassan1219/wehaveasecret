/*global document, $*/

"use strict";

document.addEventListener("DOMContentLoaded", function () {
    var CURSOR_BLINK = 400,
        TEXT_SPEED = 100,
        PAGE_TRANSITION = 300,
        PAGE_WAIT = 3000,
        text = $('#title-paragraph'),
        cursor = $('#title-cursor'),
        totalTime = 0,
        BLINK_STEP,
        steps1,
        steps2;

    function blinkCursor() {
        cursor.toggleClass('hidden');
    }

    function fadeText() {
        text.text(this.text);
        text.addClass('fade-in');
    }
    function fadeoutText() {
        text.text(this.text);
        text.addClass('fade-out');
        setTimeout(function() {
          text.text('');
          text.removeClass('fade-out');
        }, 1000);
      }      

    function writeText(i) {
        text.text(this.text.slice(0, i + 1));
    }

    function clearText() {
        text.text('');
    }
    
    BLINK_STEP = {
        delay: CURSOR_BLINK,
        times: 4,
        method: blinkCursor
    };


    steps1 = [
        {
            delay: TEXT_SPEED,
            text: "From Reeda and Mohsin, with love...",
            method: fadeText,
        },
        {
            delay: 10,
            text: "From Reeda and Mohsin, with love...",
            method: fadeoutText,
        },
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "Hello World!",
            method: writeText,
        },
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "My Mommy and Daddy wanted me to introduce myself...",
            method: writeText,
        },
        BLINK_STEP,

    ];

    steps2 = [
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "You must be wondering if I'm a boy or a girl...",
            method: writeText,
        },
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "but Mommy and Daddy want everyone to be suprised when I am born... including themselves.",
            method: writeText,
        },
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "My Mommy and Daddy say you're very important to them...",
            method: writeText,
        },
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "which means you're important to me too!",
            method: writeText,
        },
        BLINK_STEP,
        {
            delay: TEXT_SPEED,
            text: "I can't wait to meet you!",
            method: writeText,
        },
        BLINK_STEP,
    ];

    function processStep(step) {
        var times = step.times || step.text.length,
            i;

        for (i = 0; i < times; i += 1) {
            totalTime += step.delay;
            setTimeout(step.method.bind(step, i), totalTime);
        }

        if (step.reverse) {
            processStep(BLINK_STEP);
            for (i = times; i >= -1; i -= 1) {
                totalTime += step.delay;
                setTimeout(step.method.bind(step, i), totalTime);
            }
        }
        if (step.method === fadeoutText) {
            totalTime += 1000;
        }
    }

    (function queueSteps() {
        steps1.forEach(processStep);

        // Show the baby
        setTimeout(function () {
            $('#title-text').addClass('title-previous');
        }, totalTime);

        totalTime += PAGE_TRANSITION;
        setTimeout(function () {
            $('#title-text').removeClass('title-current');
            $('#title-img').addClass('title-current');
        }, totalTime);

        totalTime += PAGE_TRANSITION;
        setTimeout(function () {
            $('#title-img').removeClass('title-next');
        }, totalTime);

        // Go to the next step
        totalTime += PAGE_WAIT;
        setTimeout(function () {
            $('#title-img').addClass('title-previous');
            $('#title-text').removeClass('title-previous').addClass('title-next');
        }, totalTime);

        totalTime += PAGE_TRANSITION;
        setTimeout(function () {
            $('#title-img').removeClass('title-current').find('img').attr('src', '/img/baby2.png');
            $('#title-text').addClass('title-current');
            text.text('');
        }, totalTime);

        totalTime += PAGE_TRANSITION;
        setTimeout(function () {
            $('#title-text').removeClass('title-next');
        }, totalTime);

        steps2.forEach(processStep);

        // Show the baby
        setTimeout(function () {
            $('#title-text').addClass('title-previous');
            $('#title-img').removeClass('title-previous').addClass('title-next');
        }, totalTime);

        totalTime += PAGE_TRANSITION;
        setTimeout(function () {
            $('#title-text').removeClass('title-current');
            $('#title-img').addClass('title-current');
        }, totalTime);

        totalTime += PAGE_TRANSITION;
        setTimeout(function () {
            $('#title-img').removeClass('title-next');
        }, totalTime);
    }());
});