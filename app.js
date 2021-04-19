const app = () => {

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle'); //the outline we want of the circle
    const video = document.querySelector('.video-container video');


    //select sounds

    const sounds = document.querySelectorAll('.sound-picker button');

    //time display

    const time_display = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    //the length of the outline 
    const outline_length = outline.getTotalLength();
    //console.log(outline_length);

    //Duration 

    let fakeDuration = 600;

    outline.style.strokeDasharray = outline_length;
    outline.style.strokeDashoffset = outline_length; //more space


    // pick different sounds

    sounds.forEach(sound => {

            sound.addEventListener('click', function() {

                sound.src = this.getAttribute('data-sound');
                video.src = this.getAttribute('data-video');
                checkPlaying(song);
            })

        })
        //play sound

    play.addEventListener('click', () => {

        checkPlaying(song);
    });


    //diferent duration of sound select

    timeSelect.forEach(option => {

        //normal function because i want to add the this keyword
        option.addEventListener("click", function() {

            fakeDuration = this.getAttribute("data-time");
            console.log(fakeDuration);
            //minute and second
            time_display.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;

        });

    });


    //create a function specific to stop and play the sounds and change the icon

    const checkPlaying = (song) => {

        if (song.paused) {


            song.play();
            video.play();
            play.src = "./svg/pause.svg";

        } else {

            //altfel daca mere atunci punel pe pauza
            song.pause();
            video.pause();
            play.src = "./svg/play.svg";
        }

    };

    //I can animate the circle and check the time. THis function runs every time the song runs

    song.ontimeupdate = () => {

        //get the current of the song
        let currentTime = song.currentTime;
        let elapsed = fakeDuration - currentTime;
        let seconds = Math.floor(elapsed % 60); //(60- reset back to 0)
        let minutes = Math.floor(elapsed / 60); //(60 / 60 = 1 min)

        //ANiamte the circle

        let progress = outline_length - (currentTime / fakeDuration) * outline_length;
        outline.style.strokeDashoffset = progress;

        //ANimate the text
        time_display.textContent = `${minutes}:${seconds}`;

        if (currentTime >= fakeDuration) {

            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };

};

app();