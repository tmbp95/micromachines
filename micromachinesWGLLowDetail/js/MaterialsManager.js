const BASIC = 0;
const LAMBERT = 1;
const PHONG = 2;

const S_BGREEN = 0;
const S_ORANGE = 1;
const S_DARKGREY = 2;
const S_GREY = 3;


const O_GREEN = 4;
const O_FGREEN = 5;
const O_GREY = 6;

const B_YELLOW = 7;

const BACK_MAT = 8;
const S_CHEERIO = 9;

class MaterialsManager {
    constructor(){
        this.materials = [[],[],[]];
        this.fillItUp(this);
        this.lighting = false;
        this.lambert = true;
    }

    fillItUp(man) {
        // S_MAT: 0 - bluegreen; 1 - orange; 2 - darkgrey; 3 - grey;
        // O_MAT: 4 - green; 5 - fluorgreen; 6 - grey;
        // B_MAT: 7 - fluorpink;
        // BACK_MAT: 8 - grey;
        var colours = [0x2f4f4f,0xffa500,0x404040,0xB22222,
            0x849f7d,0x6dde4c,0x757575,
            0xffff00,
            0x202020, 0xf1b338];

        ["Basic","Lambert","Phong"].forEach(function(type,i) {
            colours.forEach(function(col,iCol) {
                man.materials[i].push(man.createMaterial(type,col,iCol));
            });
        });
    }

    createMaterial(type, col, iCol) {
        if(type == "Basic") {
            var mat = new THREE.MeshBasicMaterial({ color: col });
        }
        else if(type == "Lambert") {
            var mat = new THREE.MeshLambertMaterial({color: col});
        }
        else if(type == "Phong") {
            mat = new THREE.MeshPhongMaterial({color: col});
            mat.specular = new THREE.Color(0x111111);
            mat.shininess = 10;
            mat.shading = THREE.SmoothShading;
        }
        mat.myColor = iCol;
        return mat;
    }

    toggleWireframe() {
        for(var j=0; j < this.materials.length; j++)
            for(var i=0; i<this.materials[j].length; i++)
                this.materials[j][i].wireframe = !this.materials[j][i].wireframe;
    }

    getCurrentMaterial(color) {
        var type;
        if(this.lighting && this.lambert) type = LAMBERT;
        else if(this.lighting) type = PHONG;
        else type = BASIC;
        return this.getMaterial(type,color);
    }

    getMaterial(type, color) {
        return this.materials[type][color];
    }

}
