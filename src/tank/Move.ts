
import { Tank } from './createTank'
import { enemyTank_move } from './enemy_move';
import { useAREngine } from '@/AREngine';
import * as Three from 'three';
/*
// キーボードで動く関数
export function moveObject() {
    document.addEventListener('keydown', (event) => {
        switch (event.key) {
            case 's':
                Tank.position.z -= 0.1;
                enemyTank_move();
                break;
            case 'w':
                Tank.position.z += 0.1;
                enemyTank_move();
                break;
            case 'a':
                Tank.position.x -= 0.1;
                enemyTank_move();
                break;
            case 'd':
                Tank.position.x += 0.1;
                enemyTank_move();
                break;
            case 'q':
                shoot(Tank);
                break;    
        }
    });
}
*/
//ボタン対応できるように関数でもいけるよ★
const ar_Engine = useAREngine();
export class Move {
    moveUp() {
    Tank.position.z += 1;
    //enemyTank_move();
    };

  moveDown() {
    Tank.position.z -= 1;
    //enemyTank_move();
    };

  moveLeft() {
    Tank.position.x -= 1;
    //enemyTank_move();
    }

  moveRight() {
    Tank.position.x += 1;
    //enemyTank_move();
    }
    
}

    

