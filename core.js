$(document).ready(function(){

  var config = {
    type: Phaser.AUTO,
    height: 600,
    width: 800,
    physics: {
      gravity: {x: 0},
      debug: true
    },
    scenes: [
      World1
    ]
  }


  var game = new Phaser.Game(config);


});
