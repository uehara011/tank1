import * as THREE from "three";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';  
import { value_1 , value_2 , value_3 } from "./Tank_data"

export const Tank = new THREE.Group();
//Tankにaddされる
export function createTank(){
    async function loadAndAddModel(url: string, position: THREE.Vector3, rotation: THREE.Euler, scale: THREE.Vector3) {
        try {
            const Model: THREE.Object3D = await new Promise((resolve, reject) => {
                const loader = new GLTFLoader();
                loader.load(url, (gltf) => {
                    const model = gltf.scene;
                    model.position.copy(position);
                    model.rotation.copy(rotation);
                    model.scale.copy(scale);
                    Tank.add(model);
                    resolve(model);
                }, undefined, reject);
            });
        } catch (error) {
            console.error('Error loading GLB model:', error);
        }
    }
    //場合わけ
    function addData(data: any): void {
        if (!data) {
            console.error('Invalid data.');
            return;
        }

        switch (data.objectType) {
            case 'pen':
                loadAndAddModel('./src/glb_file/pen.glb', data.position, data.rotation, data.scale);
                break;
            case 'note':
                loadAndAddModel('./src/glb_file/note.glb', data.position, data.rotation, data.scale);
                break;
            case 'eraser':
                loadAndAddModel('./src/glb_file/erasel.glb', data.position, data.rotation, data.scale);
                break;    
            case 'pen_case':
                loadAndAddModel('./src/glb_file/pen_case.glb', data.position, data.rotation, data.scale);
                break;     
            case 'ruler':
                loadAndAddModel('./src/glb_file/ruler.glb', data.position, data.rotation, data.scale);
                break; 
            case 'pencil':
                loadAndAddModel('./src/glb_file/pencil.glb', data.position, data.rotation, data.scale);
                break;              
            // Add cases for other object types if needed
            default:
                console.warn('Unknown object type:', data.objectType);
                break;
        }
    }

    const test_data_1 = value_1();
    addData(test_data_1)
    const test_data_2 = value_2();
    addData(test_data_2)
    const test_data_3 = value_3();
    addData(test_data_3)
    loadAndAddModel('./src/glb_file/caterpillar.glb', new THREE.Vector3(0, 0, 0), new THREE.Euler(0, 0, 0), new THREE.Vector3(0.1, 0.1, 0.1));
}