var outsideState={
	preload:function(){
		game.load.image("map","assets/map.png);
		console.log("into outside state");

	},
	create:function(){
		console.log('create start');
		if (!game.device.desktop){ game.input.onDown.add(gofull, this); } //go fullscreen on mobile devices
		//game.stage.backgroundColor = '#182d3b';
		background = game.add.sprite(0, 0, 'map');
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

	}

}
