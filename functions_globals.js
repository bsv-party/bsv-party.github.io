function attackGlobal(attackType,obj1,obj2){
    let damage;
    let delay1 = 0;
    let delay2 = 2000;
    switch (attackType) {
        default:
            damage=0;
            break;
        case "Virtue Signal":
            damage=43;
            break;
        case "Proof of Social Media":
            damage=60;
            break;
        case "Middle Finger":
            damage=85;
            break;
        case "Satoshi's Rage":
            damage=35;
            break;           
        case "Jimmy's Attack":
            damage=119;
            break;
        case "Ethereum 2.0":
            damage=0;
            break;
        case "Lightning Network":
            damage=0;
            break;
        case "Ayre's Attack":
            damage=119;
            break;
        case "Circlejerking"://cure potion
            damage=-50;
            break;
        case "Patents":
            damage=149;
            break;
    };
    screen.statusText(attackType,damage,obj1,obj2);
    obj1.reaction(-obj1.reaction_tier);
    if(damage>=0)    {
            obj2.damage(damage);//attacks
        } else      {
            obj1.damage(damage);//cure potions
        }
    obj2.reaction(obj1.reaction_tier);
    screen.setAnimation(obj1,attackType,delay1);
    if(damage>0)   {
        screen.setAnimation(obj2,'damaged',delay2);
        screen.set_red_hp(obj2);
    }
}