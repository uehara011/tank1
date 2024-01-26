/*
import { useAREngine } from "@/AREngine";
import * as CANNON from "cannon";
import * as THREE from "three"
import { Tank } from "./createTank";

const ar_Engine = useAREngine();

ar_Engine.world.gravity.set(0, -9.82, 0);

const animate = () => {
    createBaret();
    ar_Engine.world.step(1 / 60);
    ar_Engine.renderer.render(ar_Engine.scene, ar_Engine.camera);
    requestAnimationFrame(animate);
  }
  

// 地面の作成
var groundShape = new CANNON.Plane();
var groundBody = new CANNON.Body({ mass: 0 ,shape: groundShape });
groundBody.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
groundBody.position.set(0, 1, 0);
ar_Engine.world.addBody(groundBody);

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
Tank.position.copy(Baret.position)

export function createBaret() {
    
    Baret.name = "Baret"; // オブジェクトに名前を付けて識別

    if (!hasBaret) {
        ar_Engine.scene.add(Baret);
        ar_Engine.world.addBody(Baret_Body);
        hasBaret = true;
        Baret_Body.velocity.set(0, 1, 0); // 例として初速度を設定
        Baret_Body.applyForce(new CANNON.Vec3(1,0.5,0), new CANNON.Vec3(0, 0, 0));
        ar_Engine.world.step(1 / 60);
        // 一定時間が経過したらオブジェクトを削除
        setTimeout(() => {
            removeBaret();
        }, 2000); // 5000ミリ秒 (5秒) 後に削除する例
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