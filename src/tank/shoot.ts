import { useAREngine } from "@/AREngine";
import * as CANNON from "cannon";
import * as THREE from "three"
import { Tank } from "./createTank";
import { enemyTank } from "./enemy_Tank";
import { reactive, ref, watchEffect } from 'vue';
import useHeart from "@/Heart";


const ar_Engine = useAREngine();
export　const remainingTime = ref(30); 

let hasBaret = false;

const radius = 0.25;
const Baret_Body = new CANNON.Body({
    mass: 5,
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3(0, Tank.position.y + 1, 0),
});

const Baret = new THREE.Mesh(
    new THREE.SphereGeometry(radius),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
);

Baret.userData.physicsBody = Baret_Body;
Baret_Body.threeMesh = Baret;
Baret.position.copy(Tank.position)

export function createBaret() {
    ar_Engine.scene.add(Baret);
    Tank.position.copy(Baret.position)
    setInterval(() => {
        Baret.position.x += 0.25;
        console.log("0.25秒ごとに実行されるコード");
    }, 250); 
    if(Baret.position === enemyTank.position){
        removeBaret()
        //useHeart()
    }else{
        setTimeout(() => {
            removeBaret();
        }, 1500);
    }
}

function removeBaret() {
    if (ar_Engine.scene.getObjectByName("Baret")) {
        ar_Engine.scene.remove(Baret);
        ar_Engine.world.remove(Baret_Body);
        hasBaret = false;
    }
}

/*
export function createBaret(){
    const radius = 0.1;
    const Baret_Body = new CANNON.Body({
    mass: 5, // kg
    shape: new CANNON.Sphere(radius),
    position: new CANNON.Vec3(0, Tank.position.y + 1, 0),
    //material: new CANNON.Material({restitution: 1}),
    });

    const Baret = new THREE.Mesh(
        new THREE.SphereGeometry(radius),
        new THREE.MeshBasicMaterial({ color:0x00ff00 }),
    )
   
    //Baret.position.copy(Baret_Body.position)
    Baret.userData.physicsBody = Baret_Body;
    Baret_Body.threeMesh = Baret;

    Baret_Body.velocity.set(0, 1, 0); // 例として初速度を設定
    Baret_Body.applyForce(new CANNON.Vec3(1,0.5,0), new CANNON.Vec3(0, 0, 0));
    //applyForceの一つ目の引数に加える力のベクトル
    //二つ目の引数に力が加わる場所。中心の場合は000

    ar_Engine.scene.add(Baret);
    ar_Engine.world.addBody(Baret_Body);

    ar_Engine.world.step(1 / 60);
    ar_Engine.renderer.render(ar_Engine.scene, ar_Engine.camera);
    requestAnimationFrame(createBaret);
    

}
*/


//animate();