import React, { Component } from 'react'
import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";

class Home_bak extends Component{
    loaderManager = new THREE.LoadingManager()

    constructor(props){
        super(props)
        this.state = {}
    }

    initThreeLoadingManager(){
        this.loaderManager.onStart = function (url, itemsLoaded, itemsTotal) {
            console.log("开始加载：url:"+url + "\nitemsLoaded："+itemsLoaded + "itemsTotal:" +itemsTotal)
        }
        this.loaderManager.onError = function (url) {
            console.log("加载失败："+ url)
            console.log(arguments)
        }
        this.loaderManager.onProgress = function (url, itemsLoaded, itemsTotal) {
            console.log( 'url: ' + url + '.\nLoaded ' + itemsLoaded + ' of ' + itemsTotal + ' files.' );
        }
    }

    initThree(){

        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

        var renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.getElementById('canvas-container').appendChild( renderer.domElement );
        var geometry = new THREE.BoxGeometry( 1, 1, 1 );
        var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
        var cube = new THREE.Mesh( geometry, material );
        scene.add( cube );

        //
        //
        camera.position.z = 5;
        //
        var loader = new GLTFLoader(this.loaderManager)

        // let planetTexture = require("../models/scene.gltf");
        // console.log(planetTexture)
        loader.load("models/scene.gltf",
            (gltf) => {
                console.log(gltf)
                scene.add( gltf.scene );
            },
            ()=>{

            },
            (error)=>{
                console.log('=========')
                console.log(error)
            }
        )

        var animate = function () {

            requestAnimationFrame( animate );
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render( scene, camera );
        };

        animate();



        var loader = new THREE.FontLoader(this.loaderManager);

        loader.load( 'fonts/helvetiker_regular.typeface.json', function ( font ) {
            console.log(1)
            var geometry = new THREE.TextGeometry( 'Hello three.js!', {
                font: font,
                size: 80,
                height: 5,
                curveSegments: 12,
                bevelEnabled: true,
                bevelThickness: 10,
                bevelSize: 8,
                bevelSegments: 5
            } );
        } );
    }

    componentDidMount(){
        this.initThreeLoadingManager()
        this.initThree()
    }

    onWindowResize() {

        // camera.aspect = window.innerWidth / window.innerHeight;
        // camera.updateProjectionMatrix();
        //
        // renderer.setSize( window.innerWidth, window.innerHeight );
        //
        // render();

    }



    render(){
        return (
            <div id="canvas-container">
            </div>
        )
    }
}

export default Home_bak