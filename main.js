const songs =[
    {
        name: 'Warrior Songs',
        singer_name: 'TheFatRat',
        src: './music/TheFatRat - Warrior Songs - TheFatRat.mp3',
        img: './img/warriorsongs.jpg',
    },
    {
        name: 'Attention',
        singer_name: 'Charlie Puth',
        src: './music/Attention - Charlie Puth.mp3',
        img: './img/Attention.jpg',
    },
    {
        name: 'Mặt trời lại mọc rồi ư ^^',
        singer_name: 'TikTok',
        src: './music//Mat-troi-lai-moc-roi-u.mp3',
        img: './img/mat troi.png',
    },
    {
        name: 'Kimi No Toriko',
        singer_name: 'DJ DESA',
        src: './music/Kimi No Toriko Tik Tok Remix_ - DJ DESA.mp3',
        img: './img/Kimi No Toriko.jpg',
    },
    {
        name: 'Monsters',
        singer_name: 'Katie Sky',
        src: './music/Monsters - Katie Sky.mp3',
        img: './img/Monsters.jpg',
    },
    {
        name: 'My Love',
        singer_name: 'Westlife',
        src: './music/My Love - Westlife.mp3',
        img: './img/My Love.jpg',
    },
    {
        name: 'Nevada',
        singer_name: 'Vicetone_ Cozi Zuehlsdorff',
        src: './music/Nevada - Vicetone_ Cozi Zuehlsdorff.mp3',
        img: './img/Nevada.jpg',
    },
    {
        name: 'Ngay Khac La',
        singer_name: 'Den_ Giang Pham_ Triple D',
        src: './music/Ngay Khac La - Den_ Giang Pham_ Triple D.mp3',
        img: './img/Ngay Khac La.jpg',
    },
    {
        name: 'Reality',
        singer_name: 'Lost Frequencies_ Janieck Devy',
        src: './music/Reality - Lost Frequencies_ Janieck Devy.mp3',
        img: './img/Reality.jpg',
    },
    {
        name: 'Sugar',
        singer_name: 'Maroon 5',
        src: './music/Sugar - Maroon 5.mp3',
        img: './img/Sugar.jpg',
    },
    {
        name: 'Summertime',
        singer_name: 'K-391',
        src: './music/Summertime - K-391.mp3',
        img: './img/Summertime.jpg',
    },
    
]

const $= document.querySelector.bind(document)
const $$= document.querySelectorAll.bind(document)
const songName = $('.singer-name')
const cdThumb = document.getElementById('headingImg')
const audio = document.getElementById('audio-heading')
const nextBtn = $('.next')
const backBtn = $('.back')
const playBtn = $('.play-pause')
const repeatBtn = $('.repeat')
const randomBtn = $('.random')
const boxSongs = $('.box-songs')
var isplaying = false
var isrepeat = false
var israndom = false
var progress = $('#progress')
var indexCurrentSong=0;
var indexRandom;

function App(){
    renderClasslist(songs)
    handleEvents()
    loadCurrentSong(getCurrentSong(songs))
    
}
App()

const cdThumbAnimate = cdThumb.animate([
    { transform: 'rotate(360deg)'}
],{
    duration: 10000,
    iterations: Infinity
})
cdThumbAnimate.pause()

function renderClasslist(songs){
    var htmls=songs.map(function (element,index) {
        return`
             <div class="song-classlist ${index===indexCurrentSong?'active-song':''}" data-index=" ${index}" >
            <div class="img-classlist-block">
                 <img class="img-classlist" src="${element.img}" alt="">
             </div>
             <div class="singer-classlist">
                 <h4 class="song-name-classlist">${element.name}</h4>
                 <p class="singer-name-classlist">${element.singer_name}</p>
             </div>
             <i class="fas fa-ellipsis more-classlist"></i>
             <div class="class"></div>
             </div>
         `
    });
    $('.box-songs').innerHTML=htmls.join('')
}
function getCurrentSong(songs,indexCurrentSong=0){
    return songs[indexCurrentSong]
 }

function handleEvents(){
    // scroll handle
    const cd = $('.cd img')
    const cdWidth = cd.offsetWidth
    document.onscroll=function(){
        var scrollTop = window.scrollY||document.documentElement.scrollTop
        var newCdWidth = cdWidth - scrollTop
        cd.style.width=newCdWidth >0?newCdWidth+'px':0;
        cd.style.opacity=newCdWidth/cdWidth
    }
    // play pause handle
    playBtn.onclick = function(){
        var playBTN = $('.icon-play')
        var pauseBTN = $('.icon-pause')
        if(isplaying){
            audio.pause()
        }else{
            audio.play()
        }
        audio.onplay = function(){
            isplaying=true
            playBTN.classList.add('playing')
            pauseBTN.classList.add('playing')
            cdThumbAnimate.play()
        }
        audio.onpause = function(){
            isplaying=false
            playBTN.classList.remove('playing')
            pauseBTN.classList.remove('playing')
            cdThumbAnimate.pause()
        }
    }
    // get progress handdle
    audio.ontimeupdate = function(){
        if(audio.duration !== NaN){
            var progressPercent = Math.floor(audio.currentTime/audio.duration*100)
            progress.value=progressPercent
        }
    }
    // set progress handle
    progress.onchange = function(e){
        if(audio.duration !== NaN){
            var progressNow = Number(e.target.value)
            audio.currentTime = audio.duration * progressNow/100
        }
    }
    // next song
    nextBtn.onclick = function(){
        if(israndom){
            do{
                indexRandom= Math.floor(Math.random()*songs.length)
            }while(indexRandom==indexCurrentSong)
            indexCurrentSong=indexRandom
            loadCurrentSong(songs[indexCurrentSong])
            audio.play()
            renderClasslist(songs)

        }else{
            indexCurrentSong++;
            if(indexCurrentSong>=songs.length){
            indexCurrentSong=0
        }
        loadCurrentSong(songs[indexCurrentSong])
        audio.play()
        renderClasslist(songs)
    }
    }
    // back song
    backBtn.onclick = function(){
        indexCurrentSong--;
        if(indexCurrentSong<0){
            indexCurrentSong=songs.length-1;
        }
        loadCurrentSong(songs[indexCurrentSong])
        audio.play()
        renderClasslist(songs)
    }
    // auto next handle
    audio.addEventListener('ended',()=>{
        if(israndom){
            do{
                indexRandom= Math.floor(Math.random()*songs.length)
            }while(indexRandom==indexCurrentSong)
            indexCurrentSong=indexRandom
            loadCurrentSong(songs[indexCurrentSong])
            audio.play()
            renderClasslist(songs)

        }else{
        indexCurrentSong++;
        if(indexCurrentSong>=songs.length){
            indexCurrentSong=0
        }
        loadCurrentSong(songs[indexCurrentSong])
        audio.play()
    }})
    //repeat mode handle
    repeatBtn.onclick = function() {
        if(isrepeat){
            isrepeat= false
            repeatBtn.classList.remove('active-propoto')
        }else{
            isrepeat=true
            repeatBtn.classList.add('active-propoto')
        }
        audio.loop=isrepeat
        if(audio.loop){
            audio.addEventListener('ended',()=>{
                audio.currentTime=0
                audio.play()
            })
        }                                          
    }
    //random mode handle
    randomBtn.onclick = function () {
        if(israndom){
            israndom= false
            randomBtn.classList.remove('active-propoto')
        }else{
            israndom=true
            randomBtn.classList.add('active-propoto')
        }
        
    }
    // choices handel
    boxSongs.onclick = function (e){
        var songElementActive = e.target.closest('.song-classlist:not(.active-song)')
        if(songElementActive&&!e.target.closest('.more-classlist')){
                indexCurrentSong=Number(songElementActive.dataset.index)
                loadCurrentSong(songs[indexCurrentSong])
                audio.play()
                renderClasslist(songs)
            }
        if(e.target.closest('.more-classlist')){
                alert('Comming son')
            }    
        }
}
function loadCurrentSong(song){
    songName.textContent = song.name
    cdThumb.src= song.img
    audio.src= song.src
}
