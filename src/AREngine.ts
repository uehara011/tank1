import type { ARScene } from "./scene";
import useLogger from './logger';
import * as THREE from "three";
import { THREEx } from "@ar-js-org/ar.js-threejs"
import Cannon from 'cannon';
import type { ArMarkerControls } from "@ar-js-org/ar.js-threejs/types/ArMarkerControls";
//import { moveObject } from "./tank/Move";
import { createTank, Tank } from "./tank/createTank"
import { create_enemy_Tank, enemyTank } from "./tank/enemy_Tank"
THREEx.ArToolkitContext.baseURL = "./";

const log = useLogger();

export interface AREngineDelegate {
    onRender?(renderer: THREE.Renderer): void;
    onMarkerFound?(marker: ArMarkerControls): void;
}

// log.info("webar.ts")

export const useAREngine = (): AREngine => {
    return AREngine.getSingleton();
}

export class AREngine {
    scene = new THREE.Scene;
    renderer = new THREE.WebGLRenderer;
    baseNode?: THREE.Object3D;
    delegate?: AREngineDelegate;
    arScene?: ARScene;
    camera = new THREE.Camera();
    world = new Cannon.World();

    //シングルトンを作る（インスタンスがアプリケーション内で唯一であることを保証する）
    private static instance: AREngine | null = null;
    public static getSingleton(): AREngine {
        if (!AREngine.instance) {
            AREngine.instance = new AREngine();
        }
        return AREngine.instance;
    }

    private constructor() { }

    replaceScene(ar_scene: ARScene) {
        const nodes = ar_scene.makeObjectTree();
        if (this.baseNode) {
            this.scene.remove(this.baseNode);
        }
        this.baseNode = new THREE.Object3D();
        this.baseNode.add(nodes);
        this.scene.add(this.baseNode!);
        this.arScene = ar_scene;
    }

    start(video_canvas: string) {

        const ar_base_element = document.getElementById(video_canvas)

        if (!ar_base_element) {
            console.log(`${video_canvas} is not found`);
            return;
        }

        /* RENDERER */
        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        ar_base_element.appendChild(renderer.domElement);
        
        /* Scene */
        const scene = this.scene; //new THREE.Scene();
        // scene.background = new THREE.Color(0x000000);

        //Tank表示
        createTank();
        scene.add(Tank);
        create_enemy_Tank();
        scene.add(enemyTank);
        //moveObject();

        /* Camera */
        //const camera = new THREE.Camera();
        const camera = this.camera;
        scene.add(camera);

        // cannon.jsの世界を作成
        const world = new Cannon.World();
        world.gravity.set(0, -9.82, 0); // 重力

        /* Light */
        const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
        light.position.set(0.5, 1, 0.25);
        scene.add(light);


        //////////////////////////////////////////////////////////////////////////////////
        //		add an object in the scene
        //////////////////////////////////////////////////////////////////////////////////

        // // add a torus knot
        // var geometry = new THREE.BoxGeometry(1, 1, 1);
        // var material = new THREE.MeshNormalMaterial({
        //     transparent: true,
        //     opacity: 0.5,
        //     side: THREE.DoubleSide
        // });
        // var mesh = new THREE.Mesh(geometry, material);
        // mesh.position.y = geometry.parameters.height / 2
        // scene.add(mesh);

        // var torusKnotGeometry = new THREE.TorusKnotGeometry(0.3, 0.1, 64, 16);
        // var material = new THREE.MeshNormalMaterial();
        // var torusMesh = new THREE.Mesh(torusKnotGeometry, material);
        // torusMesh.position.y = 0.5
        // scene.add(torusMesh);
        //make_coordinate_arrows(scene, 1);


        ////
        // set up ARToolKit
        ///

        //AR.jsのマーカー検出エンジンの初期化
        const arToolkitSource = new THREEx.ArToolkitSource({
            // to read from the webcam
            sourceType: 'webcam',

            sourceWidth: window.innerWidth > window.innerHeight ? 640 * 2 : 480 * 2,
            sourceHeight: window.innerWidth > window.innerHeight ? 480 * 2 : 640 * 2,
        })

        //ARtoolkitのカメラ(webcamera)パラメータの読み込み
        const arToolkitContext = new THREEx.ArToolkitContext({
            cameraParametersUrl: THREEx.ArToolkitContext.baseURL + './data/camera_para.dat',
            detectionMode: 'mono',
        })

        // ARToolkitの初期化が終了してから呼び出される
        const initARContext = () => { // create atToolkitContext

            //ここは変更の必要なし
            // initialize it
            arToolkitContext.init(() => { // copy projection matrix to camera
                camera.projectionMatrix.copy(arToolkitContext.getProjectionMatrix());

                arToolkitContext.arController.orientatio = getSourceOrientation();
                // arToolkitContext.arController.options.orientation = getSourceOrientation();
                console.log('arToolkitContext', arToolkitContext);
                window.arToolkitContext = arToolkitContext;
            })

            // MARKER
            var arMarkerControls = new THREEx.ArMarkerControls(arToolkitContext, camera, {
                type: 'pattern',
                // マーカーの内側のマークに対応するパターンファイル
                patternUrl: THREEx.ArToolkitContext.baseURL + './data/pattern-marker.patt', //ここを変更したhiro->自作マーカー 2023/12/5
                // patternUrl : THREEx.ArToolkitContext.baseURL + '../data/data/patt.kanji',
                // as we controls the camera, set changeMatrixMode: 'cameraTransformMatrix'
                // カメラを制御する設定。マーカーの中心が、ワールドの原点になる。
                changeMatrixMode: 'cameraTransformMatrix',
                // マーカー識別の閾値。
                minConfidence: 0.001,
                // size: 1
            })

            //マーカーが見つかった時に実行されるコールバック
            arMarkerControls.addEventListener("markerFound", () => {
                console.log("marker found!");
                if(this.delegate){
                    this.delegate?.onMarkerFound?.(arMarkerControls);
                }
                //マーカーが見つかったらシーンを表示
                scene.visible = true;
            })

            arMarkerControls.addEventListener("markerlost", () =>{
                console.log("marker lost!");
                //マーカーが消失したら非表示
                scene.visible = true;
                
            });

            console.log('ArMarkerControls', arMarkerControls);

            //マーカー検出オブジェクトをグローバルに保存
            window.arMarkerControls = arMarkerControls;
        }

        

        

        // ARtoolkitの初期化
        arToolkitSource.init(function onReady() {

            arToolkitSource.domElement.addEventListener('canplay', () => {
                console.log(
                    'canplay',
                    'actual source dimensions',
                    arToolkitSource.domElement.videoWidth,
                    arToolkitSource.domElement.videoHeight,
                );
                initARContext();
            }) as unknown as HTMLVideoElement;
            window.arToolkitSource = arToolkitSource;
            setTimeout(() => {
                onResize()
            }, 2000);
        }, function onError() { })


        //ブラウザをリサイズした時の処理
        // handle resize
        window.addEventListener('resize', function () {
            onResize()
        })
        function onResize() {
            arToolkitSource.onResizeElement()
            arToolkitSource.copyElementSizeTo(renderer.domElement)
            if (window.arToolkitContext.arController !== null) {
                arToolkitSource.copyElementSizeTo(window.arToolkitContext.arController.canvas)
            }
        }

        // スマホの向きを検出している？
        function getSourceOrientation(): string {
            if (!arToolkitSource) {
                return '';
            }

            console.log(
                'actual source dimensions',
                arToolkitSource.domElement.videoWidth,
                arToolkitSource.domElement.videoHeight
            );

            if (arToolkitSource.domElement.videoWidth > arToolkitSource.domElement.videoHeight) {
                console.log('source orientation', 'landscape');
                return 'landscape';
            } else {
                console.log('source orientation', 'portrait');
                return 'portrait';
            }
        }


        // レンダリングループ。Three.jsのシーンが更新される度に実行
        const render = (delta_sec: number) => {
            this.arScene?.animate(delta_sec); // 設定したシーンのアニメーションの実行
            this.delegate?.onRender?.(renderer); //カスタムルーチンを実行
            renderer.render(scene, camera); //Three.jsのシーンを描画

        }

        // artoolkitの処理（フレームごとの処理）
        const update_ar = () => {
            if (!arToolkitContext || !arToolkitSource || !arToolkitSource.ready) {
                return;
            }

            //ここで、マーカーの検出が行われる（多分）
            arToolkitContext.update(arToolkitSource.domElement)

            // update scene.visible if the marker is seen
            scene.visible = camera.visible
        }

        // フレームごとに関数を呼び出すように設定する（アニメーションのため）
        var lastTimeMsec: number;
        const animate = (nowMsec: number) => {
            // keep looping
            requestAnimationFrame(animate);
            // measure time
            lastTimeMsec = lastTimeMsec || nowMsec - 1000 / 60;
            var deltaMsec = Math.min(200, nowMsec - lastTimeMsec);
            lastTimeMsec = nowMsec;

            // call each update function
            update_ar();
            render(deltaMsec / 1000);

            // console.log("render")
        }
        requestAnimationFrame(animate);
    }
};
/*
function make_coordinate_arrows(node: THREE.Object3D, len: number) {
    // X軸の矢印（赤色）
    const arrowX = new THREE.ArrowHelper(new THREE.Vector3(1, 0, 0), new THREE.Vector3(0, 0, 0), len, 0xff0000);
    node.add(arrowX);

    // Y軸の矢印（緑色）
    const arrowY = new THREE.ArrowHelper(new THREE.Vector3(0, 1, 0), new THREE.Vector3(0, 0, 0), len, 0x00ff00);
    node.add(arrowY);

    // Z軸の矢印（青色）
    const arrowZ = new THREE.ArrowHelper(new THREE.Vector3(0, 0, 1), new THREE.Vector3(0, 0, 0), len, 0x0000ff);
    node.add(arrowZ);
}
*/