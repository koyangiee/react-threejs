import React, { Component } from 'react'
import * as THREE from 'three'
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
// import {RGBELoader} from "three/examples/jsm/loaders/RGBELoader";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls";
import {PerspectiveCamera, WebGLRenderer} from "three";
// import gltfPath from "../../public/models/scene.gltf"

class Home extends Component{
    loaderManager = new THREE.LoadingManager()
    camera
    scene
    renderer
    // mixer

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
    initCamera(){
        this.camera.position.x=5;
        this.camera.position.y=5;
        this.camera.position.z=5;
        var controls = new OrbitControls(this.camera, this.renderer.domElement);
        controls.autoRotate = true;
    }
    initGltf(){
        var loader=new GLTFLoader(this.loaderManager)
        loader.load("models/scene.gltf",
            (gltf)=>{

                this.scene.add(gltf.scene)
                this.mixer = new THREE.AnimationMixer( gltf.scene );
                //同时将这个外部模型的动画全部绑定到动画混合器里面
                for (var i=0;i<gltf.animations.length;i++){
                    gltf.clipAction(gltf.animations[i]).play();
                }
            },
            ()=>{

            },
            (error)=>{
                    console.log(error)
        })


    }

    initThree(){
        this.initThreeLoadingManager() //注册错误
        this.scene = new THREE.Scene()
        this.renderer = new WebGLRenderer({alpha: true,antialias:true});
        this.renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( this.renderer.domElement );
        this.camera= new PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
        this.initCamera()
        this.initGltf()
        this.go()
    }
    go(){
        var clock = new THREE.Clock();
        var animate = ()=>{
            requestAnimationFrame( animate );
            var time = clock.getDelta();
            if (this.mixer) {
                this.mixer.update(time);
            }
            this.renderer.render( this.scene, this.camera );
        }
        animate();
    }

    componentDidMount(){
         this.initThree()
    }

    render(){
        return (
            <div id="canvas-container">
            </div>
        )
    }
}

export default Home