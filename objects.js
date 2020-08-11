const player = {
    name: `player`,
    label: `Shitcoin Guy`,
    level: 1,
    maxlevel: undefined,// value set in main.js
    reaction_tier: 50,
    hp: 999,
    rb: 100,
    gifs: {
        default:`./assets/gifs/player_default.gif`,
        damaged:`./assets/gifs/player_damaged.gif`,
        wins:`./assets/gifs/player_wins.gif`,
        "Virtue Signal":`./assets/gifs/player_virtue_signal.gif`,
        "Proof of Social Media":`./assets/gifs/player_proof_of_social_media.gif`,
        "Ethereum 2.0":`./assets/gifs/player_ethereum_2.0.gif`,
        "Lightning Network":`./assets/gifs/player_lightning_network.gif`,
        "Circlejerking":`./assets/gifs/player_circlejerking.gif`,
    },
    view_rb: document.getElementById(`playerReactionBar`),
    view_hp: document.getElementById(`playerHp`),
    view_gif: document.getElementById(`playerGif`),
    view_attackList: document.getElementById(`player_attacks`),
    damage: function(value){
        this.hp-=value;
        if(this.hp>999)this.hp=999;
        if(this.hp<0)this.hp=0;
    },
    reaction: function(value){
        this.rb+=value;
        if(this.rb>=100){
            this.rb=100;
            boss.rb=0;
            if(this.level<this.maxlevel)this.level+=1;

        }
    },
    attack: function(attackType){
        screen.enabledButtons(false);
        attackGlobal(attackType,this,boss);
        setTimeout(() => {
            if(this.isMyTurn(boss)){
                screen.reset();
                screen.enabledButtons(true);
            }   else {
                screen.addAttackItem(boss);
                screen.reset();
                boss.attack();
            }
        }, screen.delayReset);
    },
    isMyTurn: function(obj){
        if(obj.rb<100){
            return true;
        } else {
            return false;
        }
    }
}

const boss = {
    name: `boss`,
    label: `Satoshi`,
    hp: 999,
    rb: 0,
    level: 0,
    maxlevel: undefined,// value set in main.js
    reaction_tier: 50,
    gifs: {
        default:`./assets/gifs/boss_default.gif`,
        damaged:`./assets/gifs/boss_damaged.gif`,
        wins:`./assets/gifs/boss_wins.gif`,
        "Satoshi's Rage":`./assets/gifs/boss_rage.gif`,
        "Middle Finger":`./assets/gifs/boss_middle_finger.gif`,
        "Jimmy's Attack":`./assets/gifs/boss_jimmy_attack.gif`,
        "Ayre's Attack":`./assets/gifs/boss_parties_girls_money.gif`,
        "Patents":`./assets/gifs/boss_patents.gif`,
    },

    view_rb: document.getElementById(`bossReactionBar`),
    view_hp: document.getElementById(`bossHp`),
    view_gif: document.getElementById(`bossGif`),
    view_attackList: document.getElementById(`boss_attacks`),
    damage: function(value){
        this.hp-=value;
        if(this.hp>999)this.hp=999;
        if(this.hp<0)this.hp=0;
    },
    reaction: function(value){
        this.rb+=value;
        if(this.rb>=100){
            this.rb=100;
            player.rb=0;
            if(this.level<this.maxlevel)this.level+=1;

        }
    },
    attack: function(){
        player.view_attackList.parentNode.classList.add("noPointer");
        let ceiling=this.level+3;
        ceiling>this.maxlevel?ceiling=this.maxlevel:ceiling=ceiling;//prevents index out of bounds
        min = Math.ceil(3);        
        max = Math.floor(ceiling);
        randomAttack = Math.floor(Math.random() * (max - min + 1)) + min;

        document.getElementById(Object.keys(this.gifs)[randomAttack]).classList.add("activated");;
        setTimeout(() => {
            document.getElementById(Object.keys(this.gifs)[randomAttack]).classList.remove("activated");
        }, 2500);

        setTimeout(() => {
            attackGlobal(Object.keys(this.gifs)[randomAttack],this,player);
        }, 2000);// autoattack delay

        setTimeout(() => {
            if(this.isMyTurn(player)){
                screen.reset();
                setTimeout(()=>{ 
                    boss.attack();
                    },1000);
            }   else {
                
                screen.addAttackItem(player);
                screen.reset();
                screen.enabledButtons(true);
                player.view_attackList.parentNode.classList.remove("noPointer");

            }
        }, screen.delayReset);// reset delay
    },
    isMyTurn: function(obj){
        if(obj.rb<100){
            return true;
        } else {
            return false;
        }
    }
}

const screen = {
    title: document.getElementById("title"),
    game: document.getElementById("game"),
    fullScreenAnimation: document.getElementById("fullScreenAnimation"),
    playerWins: document.getElementById("player_wins"),
    bossWins: document.getElementById("boss_wins"),
    buttons: document.getElementsByTagName("button"),
    screens: document.getElementsByClassName("screens"),
    delayReset: 6000, // how much the attack cicle lasts
    images: {
        gameLogo:`./assets/images/gameLogo.png`,
        playLogo:`./assets/images/playLogo.png`,
        "Proof of Social Media":`./assets/images/aussieManBad.gif`
    },
    enabledButtons: function(value){
        if(player.hp<=0||boss.hp<=0){
            value=false;
        }
        if(value==false){
            for(let i in this.buttons){
                this.buttons[i].disabled=true;
            }
        }
        else{
            for(let i in this.buttons){
                this.buttons[i].disabled=false;
            }
        }
    },
    update_hp: function(object){
        object.view_hp.textContent=object.hp;
        object.view_hp.style.backgroundColor = "lime";
        object.view_hp.style.width = (object.hp*0.1)+"%";

    },
    set_red_hp: function(object){
        setTimeout(() => {
            object.view_hp.style.backgroundColor = "red";
        }, 2000);
        setTimeout(() => {
            object.view_hp.style.backgroundColor = "lime";
        }, 6000);
    },
    update_reactionBar: function(object){
        object.view_rb.style.width = object.rb+"%";
        if(object.rb==0){
            object.view_rb.classList.remove("activatedRB");
            object.view_rb.parentElement.style.opacity = 0.15;
            object.view_attackList.style.opacity = 0.50;
        } else if((object.rb==100)) {
            object.view_rb.classList.add("activatedRB");
            object.view_rb.parentElement.style.opacity = 1;
            object.view_attackList.style.opacity = 1;
        }
    },
    statusText: function(attackType,damage,obj1,obj2){
        textContent=`[${obj1.label}][${attackType}][${damage}]`;
        console.log(textContent);
    },
    setAnimation: function(object,value,delay){
        if(delay=="undefined")delay=0;
        setTimeout(() => {
            object.view_gif.setAttribute("src",object["gifs"][value]);
        }, delay);
    },
    show: function(value){
        for(i=0;i<screen.screens.length;i++){
            screen.screens[i].style.display="none";
        }
        if(value=="title"){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color: #4eb8d9");
            this.title.style.display="block";
        }
        if(value=="game"){
            document.getElementsByTagName("body")[0].setAttribute("style","background-color: white");
            this.game.style.display="block";
        }
        if(value=="boss_wins"){
            document.getElementById('endMusic').play();
            document.getElementsByTagName("body")[0].setAttribute("style","background-color: white");
            this.bossWins.style.display="block";
        }
        if(value=="player_wins"){
            document.getElementById('endMusic').play();
            document.getElementsByTagName("body")[0].setAttribute("style","background-color: white");
            this.playerWins.style.display="block";
        }
    },
    reset: function(){
        if(player.hp<=0||boss.hp<=0){                     	            //  If there is a winner the 
            player.hp<=0?player.view_hp.parentNode.style.backgroundColor = "red":boss.view_hp.parentNode.style.backgroundColor = "red";
            document.getElementById('bgMusic').pause();                 //  game ends right here
            setTimeout(()=>{                            	            //  I know the code sucks
                if(player.hp<=0){
                    screen.show("boss_wins");boss.hp=999;
                    document.getElementById("boss_wins").style.display='block';
                }   	                                                //  who cares
                if(boss.hp<=0){
                    screen.show("player_wins");player.hp=999;
                    document.getElementById("player_wins").style.display='block';
                }                                                       //  it's just for fun
            },1000);                                    	            //  have a nice day
            }    
        
        screen.setAnimation(player,"default");
        screen.setAnimation(boss,"default");
        screen.update_hp(player);
        screen.update_hp(boss);
        screen.update_reactionBar(player);
        screen.update_reactionBar(boss);
    },
    addAttackItem: function(obj){
        if(obj.level==obj.maxlevel){return;}// no ability is added when max level is reached
        let index=obj.level+2;
        
        let ObjPropertiesKeyNames = Object.keys(obj.gifs);// attacks list

        if(obj.name=="player"){

            buttonNode = document.createElement("BUTTON");
            buttonNode.style.display="block";
            buttonNode.setAttribute("class","player");
            buttonNode.setAttribute(
                                    "onclick","player.attack('"     +
                                    ObjPropertiesKeyNames[index]    +
                                    "');"                           +
                                    "this.parentNode.classList.add('noPointer');"   +
                                    "setTimeout(() => {this.parentNode.classList.remove('noPointer');}, 6500);"   +
                                    "this.style.backgroundColor='aqua';" +
                                    "setTimeout(() => {this.style.backgroundColor='silver';}, 2500);"
                                    );



            buttonNode.setAttribute("value",ObjPropertiesKeyNames[index]);
            buttonNode.setAttribute("id",ObjPropertiesKeyNames[index]);
            buttonNode.textContent=ObjPropertiesKeyNames[index];
            document.getElementById("player_attacks").appendChild(buttonNode);
        };
        if(obj.name=="boss"){
            divNode = document.createElement("DIV");
            divNode.setAttribute("class","boss");
            divNode.style.display="block";
            divNode.textContent=ObjPropertiesKeyNames[index];
            divNode.setAttribute("id",ObjPropertiesKeyNames[index]);
            document.getElementById("boss_attacks").appendChild(divNode);

        };
    },
    setTitleAnimation: function(obj){

        imgJimmyNode = document.createElement("IMG");
        imgJimmyNode.setAttribute("src","./assets/gifs/jimmy_default.gif");
        imgJimmyNode.setAttribute("class","jimmyFullscreen");

        imgGameLogoNode = document.createElement("IMG");
        imgGameLogoNode.setAttribute("src",this.images["gameLogo"]);
        imgGameLogoNode.setAttribute("id","gameLogo");

        imgPlayLogoNode = document.createElement("IMG");
        imgPlayLogoNode.setAttribute("src",this.images["playLogo"]);
        imgPlayLogoNode.setAttribute("onclick",
                                    "screen.show('game');"  +
                                    "document.getElementById('credits').style.display='none';" +
                                    "document.getElementById('bgMusic').play();"
                                    );
        imgPlayLogoNode.setAttribute("id","playLogo");


        this.title.appendChild(imgJimmyNode);
        this.title.appendChild(imgGameLogoNode);
        this.title.appendChild(imgPlayLogoNode);
    }
}

