//\////\\//////
/// RUN \///\\
//\\\\//\\////
screen.reset();
player.maxlevel=Object.keys(player.gifs).length - 2;
boss.maxlevel=Object.keys(boss.gifs).length - 2;
screen.addAttackItem(player);
screen.enabledButtons(true);
screen.setTitleAnimation();
document.getElementById("bgMusic").volume = 0.25;
document.getElementById('endMusic').volume = 0.25;
screen.show("title");