var insideState={
	text:null,
	counter:null,
	button:null,
	background:null,
	sprite:null,
	step:0,
	movable:true,
	destination:null,
	direction:0,
	stay:null,
	left:null,
	currentCharacterFrame:null,
	popup:null,
	yes:null,
	no:null,
	popupOnscreen:false,
	delayForPopup:0,
	preload:function(){
		console.log('preload');
		game.load.image('robot', 'assets/stand.png');
		game.load.image('box', 'assets/box.png');
		game.load.image('yes', 'assets/yes.png');
		game.load.image('no', 'assets/no.png');
		game.load.image('stepA', 'assets/stepA.png');
		game.load.image('stepB', 'assets/stepB.png');
		game.load.image('left1', 'assets/left1.png');
		game.load.image('left2', 'assets/left2.png');
		game.load.image('left3', 'assets/left3.png');
		game.load.spritesheet('button', 'assets/button_sprite_sheet.png', 193, 71);
		game.load.image('background','assets/back.png');
		console.log('preload end');
	},
	create:function(){
		console.log('create start');
		if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices
		//game.stage.backgroundColor = '#182d3b';
		background = game.add.sprite(0, 0, 'background');
		background.scale.setTo(2,2);
		background.visible=true;
		sprite=game.add.sprite(200, 150, 'robot');
		sprite.anchor.set(0.5,0.5);
		sprite.scale.setTo(2,2);
		sprite.inputEnabled=true;
		destination=sprite.x;
		text = game.add.text(250, 80, '', { fill: '#ffffff' });
		sprite.events.onInputDown.add(listener,this);
		game.camera.follow(sprite);
		game.input.onTap.add(onTap,this);
		left=['left1','left2','left3'];
		stay=['robot'];
		currentCharacterFrame=stay[0];
		console.log('create end');
	},
	update:function(){
		console.log('update');
		sprite.loadTexture(currentCharacterFrame);
		//text.text='destination1'+destination;
		if(this.direction==0){
			currentCharacterFrame=animate(stay);
		}else if(this.direction==-1){
			currentCharacterFrame=animate(left);
		}else if(this.direction==1){	
			currentCharacterFrame=animate(left);
		}
		if(destination+5<sprite.x){
			sprite.x-=5;
			direction=-1;
		}else if(destination-5>sprite.x){
			sprite.x+=5;
			direction=1;
		}else{
			destination=sprite.x;
			movable=true;
			direction=0;
		}
		if(delayForPopup>0){
			delayForPopup--;	
		}


	},
	animate:function(){
		//animates any number of frames
		var length=arrayOfFrames.length;
		console.log('1');
		var frame;
		console.log('2');
		var index=step%length;
		console.log('step:'+step+'/index:'+index+'/length:'+length);
		frame=arrayOfFrames[index];
		console.log(frame);
		step++;
		if(step>=length){
			console.log('3');
			step=0;
		}
		return frame;
	},
	gofull:function(){
		game.scale.startFullScreen(false);
	},
	onTap:function(pointer,doubleTap){
		console.log("tap");
		if(movable && popupOnscreen==false && delayForPopup==0){
			movable=false;
			mX=pointer.x;
			destination=mX;
			if(destination>=420 && destination<=530 && sprite.x>=420 && sprite.x<=530){
				text.text="door found";
				popup=game.add.sprite(game.world.centerX,game.world.centerY,'box');
				popup.alpha=0.8;
				popup.anchor.set(0.5);
				var style = { font: "32px Arial", fill: "#ff0044", wordWrap: true, wordWrapWidth: popup.width, align: "center", backgroundColor: "#ffff00" };
				text = game.add.text(popup.x, popup.y-20, "Enter Door?", style);
				text.anchor.set(0.5);
				yes=game.add.sprite(text.x-120,text.y-40,'yes');
				no=game.add.sprite(text.x,text.y-40,'no');
				no.inputEnabled = true;
				yes.inputEnabled = true;
				popupOnscreen=true;
				no.events.onInputDown.add(noClick, this);
				yes.events.onInputDown.add(yesClick, this);
			}
		}
		if(destination<sprite.x){
			sprite.scale.x=-2;
		}else{
			sprite.scale.x=2;	
		}
		//sprite.x=pointer.x;

	},
	noClick:function(){
		popup.destroy();
		yes.destroy();
		no.destroy();
		text.destroy();
		popupOnscreen=false;
		delayForPopup=10;

	},
	yesClick:function(){
		popup.destroy();
		yes.destroy();
		no.destroy();
		text.destroy();
		popupOnscreen=false;
		delayForPopup=10;
		game.state.start('outside');

	}

}
