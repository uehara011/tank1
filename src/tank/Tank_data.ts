//画像処理で送られてくるデータを想定
//表示されるglbファイルの位置などを設定している
import { value1 , value2 , value3 } from '@/catch_data';
import * as THREE from 'three';

// オブジェクトごとのサイズ範囲を指定
const stationerySizeRanges: Record<string, { min: number, max: number }> = {
    pen: { min: 2, max: 4 },
    note: { min: 3, max: 6 },
    eraser: { min: 2, max: 3 },
    pen_case: { min:0.05, max:0.3 },
    ruler: { min:0.3, max:1 },
    pencil: { min:5, max:7 },
    // 他のオブジェクトに対する範囲を追加
};

let call_Count = 0.1;

export function value_1 (){
    const sizeRange = stationerySizeRanges[value1];
    // オブジェクトごとに異なるサイズの範囲からランダムで選ぶ
    const randomSize = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
    // 回数に応じて表示位置をずらす
    const position = new THREE.Vector3(0, call_Count,0);
    call_Count += 0.1;
    // 文房具データ
    return {
        objectType: value1,
        position : position,
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(randomSize, randomSize, randomSize),
    };
}

export function value_2 (){
    const sizeRange = stationerySizeRanges[value2];
    // オブジェクトごとに異なるサイズの範囲からランダムで選ぶ
    const randomSize = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
    // 回数に応じて表示位置をずらす
    const position = new THREE.Vector3(0, call_Count,0);
    call_Count += 0.2;
    // 文房具データ
    return {
        objectType: value2,
        position : position,
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(randomSize, randomSize, randomSize),
    };
}

export function value_3 (){
    const sizeRange = stationerySizeRanges[value3];
    // オブジェクトごとに異なるサイズの範囲からランダムで選ぶ
    const randomSize = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;
    // 回数に応じて表示位置をずらす
    const position = new THREE.Vector3(0, call_Count,0);
    call_Count += 0.3;
    // 文房具データ
    return {
        objectType: value1,
        position : position,
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(randomSize, randomSize, randomSize),
    };
}
/*
export function generateRandomStationeryData() {
    const stationeryList: string[] = 
    [
        'pen', 'note','eraser','pen_case','ruler','pencil'
    ]; // 他のオブジェクトも追加
    const randomIndex: number = Math.floor(Math.random() * stationeryList.length);
    const selectedStationery: string = stationeryList[randomIndex];
    const sizeRange = stationerySizeRanges[selectedStationery];
    if (!sizeRange) {
        console.error('Invalid stationery type:', selectedStationery);
        return null; // またはデフォルトのサイズを指定するなど
    }

    // オブジェクトごとに異なるサイズの範囲からランダムで選ぶ
    const randomSize = Math.random() * (sizeRange.max - sizeRange.min) + sizeRange.min;

    // 回数に応じて表示位置をずらす
    const position = new THREE.Vector3(0, call_Count,0);
    call_Count += 0.1;


    // 生成されたランダムな文房具データ
    return {
        objectType: selectedStationery,
        position : position,
        rotation: new THREE.Euler(0, 0, 0),
        scale: new THREE.Vector3(randomSize, randomSize, randomSize),
        
    };
}
*/