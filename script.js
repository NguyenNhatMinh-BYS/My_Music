
//change page when click
$=document.querySelector.bind(document);
$$=document.querySelectorAll.bind(document);
var poiter = $('.poiter');
var listIteam =$$(`.playList_lists_item`)
var check=0;
poiter.innerHTML =`<i class="bi bi-broadcast"></i>`
// render
function render(index){
    
    $$('.bi-play-circle-fill')[check].classList.remove('none');
    $$('.listPlayButton')[check].classList.add('none')
    audio.src=`${data.songs[index].path}`
    
    $('.poiter').innerHTML=`0${++check}`
    check=index;
    $('.play').classList.remove('play');
    $('.poiter').classList.remove('poiter');
    $$(".playList_lists_item_number")[index].classList.add('poiter');
    $$(".playList_lists_item_content")[index].classList.add('play');
    $('.poiter').innerHTML=`<i class="bi bi-broadcast"></i>`
    $('.songMusic_infor_author_name').innerText=data['songs'][index].author;
    $('.songMusic_infor_author_delta').innerText=data['songs'][index].delta;
    $('.songMusic_avarta img').src=`${data['songs'][index].img_author}`
    $('.songMusic_avarta img').classList.add('animation_click');
    $('.songMusic_infor_author').classList.add('animation_click');
    setTimeout(function() {
        $('.songMusic_avarta img').classList.remove('animation_click')
       
    },1000)
    setTimeout(function() {
        $('.songMusic_infor_author').classList.remove('animation_click')
    },0)
    $('h3').innerText = data['songs'][index].name;
    $('.songMusic_play_bg_cd img').src=`${data['songs'][index].image_mp3}`
}
// select one item of list music
var result=0 ;
listIteam.forEach(function(value,index) {
    
    
    value.addEventListener('click',function(e){
       
        pauses(index);
        render(index);
        plays(index);
        result=index;
    })
});
function returnIndex() {
    return result;
}
//data
var data={
    songs:[{
        name:'Gone Too Long',
        author:'Cat Dealers, Bruno Martini, Joy Corporation',
        delta:'“Gone Too Long” é nosso primeiro lançamento do ano. Estamos animados e muito felizes com o resultado alcançado junto com o Bruno Martini e o Joy Corporation”, afirma Cat Dealers.',
        path:'./mp3/1.mp3',
        image_mp3:'./img/01.jpg',
        img_author:'./img/pic1.png'
    },
    {
        name:' Don\'t Say Goodbye ',
        author:'ALOK & Ilkay Sencan (feat. Tove Lo)',
        delta:'“Tove Lo tried to save this song. It is just another re-recycling of Alok\'s production.',
        path:'./mp3/2.mp3',
        image_mp3:'./img/2.jpg',
        img_author:'./img/pic2.png'
    },
    {
        name:' Party On My Own ',
        author:'Alok & Vintage Culture',
        delta:'Discover Party on My Own by Alok, Vintage Culture released in 2020. Find album reviews, track lists, credits, awards and more at AllMusic.',
        path:'./mp3/3.mp3',
        image_mp3:'./img/3.jpg',
        img_author:'./img/pic3.png'
    },
    {
        name:' It Don\'t Matter ',
        author:'Alok, Sofi Tukker & INNA',
        delta:'How not to love Inna? She is one of the best vocalists in Romania and she has remained that person since the first day she started singing.',
        path:'./mp3/4.mp3',
        image_mp3:'./img/4.jpg',
        img_author:'./img/pic4.png'
    },
    {
        name:'FUEGO (Original Mix)',
        author:'Alok & Bhaskar',
        delta:'Tenho certeza que não sou único que sente orgulho desses monstro serem Brasileiros🔥',
        path:'./mp3/5.mp3',
        image_mp3:'./img/5.jpg',
        img_author:'./img/pic5.png'
    },
    {
        name:'Borderline',
        author:'Lena Leon & Disco Fries',
        delta:'Summer might be over, but Lena Leon and Disco Fries are here to remind you of all of the good times! ',
        path:'./mp3/6.mp3',
        image_mp3:'./img/6.jpg',
        img_author:'./img/pic6.png'
    },
],
}
// init audio
var audio=document.querySelector('audio');
audio.src=`${data.songs[0].path}`


function pauses(index) { // pause audio
    $('.btn_pause').classList.add('none');
    $('.btn_play').classList.remove('none');
    $$('.bi-play-circle-fill')[index].classList.remove('none');
    $$('.listPlayButton')[index].classList.add('none')
    audio.pause();
    progress.pause()
}
function plays(index) { //play audio
    $('.btn_play').classList.add('none');
    $('.btn_pause').classList.remove('none');
    $$('.bi-play-circle-fill')[index].classList.add('none');
    $$('.listPlayButton')[index].classList.remove('none')
audio.play();
progress.play();

}

//select button music
$('.btn_pause').addEventListener('click',()=>{
    var results= returnIndex();
    pauses(results)
   
})

$('.btn_play').addEventListener('click',()=>{
    var results = returnIndex();
    plays(results);
})
// repeat 
var isRepeat=false
$('.songMusic_play_bg_control_repeat').addEventListener('click',()=>{
    isRepeat=!isRepeat;
    $('.songMusic_play_bg_control_repeat').classList.toggle('random',isRepeat);

    
    

});
// loading music input
var inputLoading = document.querySelector('input');
audio.addEventListener('timeupdate',()=>{
   
    if(audio.duration){
        var loading =Math.floor( audio.currentTime/audio.duration *100);
        // console.log(audio.duration)
        inputLoading.value=loading
    }
    
    
})


inputLoading.addEventListener('click',()=>{
        
       const seek=inputLoading.value*audio.duration/100;
        audio.currentTime = seek
        plays(result);
        
    
})

//progress cd
var circleProgress = $('.songMusic_play_bg_cd img');
//cd effect circle progress
var progress=circleProgress.animate([
    {transform:'rotate(360deg)'}
],{
    duration:10000,
    iterations:Infinity
})
progress.pause()
//prev song
function prevSong() {
    // if(isRandom){
    //     result=resultInit;
    //     render(result);
    //     plays(result);
    // }
    // else{

    
    if(result){
        result--;
        render(result);
        plays(result);
    }
    else{
        result=data.songs.length-1; 
        render(result);
        plays(result);
      }
    // }
}
$('.btn_prev').addEventListener('click',()=>{
    prevSong();
})
//next song
function nextSong(){
    // isRandom=true
    if(isRandom){
        result=randomSong();
        render(result);
            plays(result);
    }
    else{
        if(result<data.songs.length-1){
            result++;
            render(result);
            plays(result);
            }
            else{
              result=0; 
              render(result);
              plays(result);
            }
    }
    
}
$('.btn_next').addEventListener('click',()=>{
    nextSong();
    progress.play()
    
    
})
// random song
var random=$('.btn_random');
var isRandom=false;
var resultInit=0;
function randomSong(){
    resultInit=result
    
    do{
        result=Math.floor(Math.random() * data.songs.length);
    }while(result===resultInit);
    return result
}
random.addEventListener('click',()=>{
    isRandom=!isRandom;
    random.classList.toggle('random',isRandom);
    
});
//next audio new when end audio 
audio.addEventListener('ended',()=>{
    //isRepeat = true;
    if(isRepeat){
        plays(result);
    }
    else{
        nextSong();
    }
    
});


// function click  list music
var buttonIconPlayList=$('.playList_text .bi-list')
var playList =$('.playList ');
var playSong=$('.songMusic')
buttonIconPlayList.addEventListener('click',()=>{
    playList.classList.add('opacity');
    playSong.classList.add('widthMax');
    $('.songMusic .bi-list').classList.remove('none')
});
$('.songMusic .bi-list').addEventListener('click',()=>{
    playList.classList.remove('opacity');
    playSong.classList.remove('widthMax');
    $('.songMusic .bi-list').classList.add('none')
    console.log($('.songMusic .bi-list'))
});