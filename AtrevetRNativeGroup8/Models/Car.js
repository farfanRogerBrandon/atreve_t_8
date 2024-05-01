class Car {
    constructor(id, height, length, width, description,plate, cID){
        this.id = id;
        this.height = height;
        this.length = length;
        this.width = width;
        this.description = description;
        this.plate = plate;
        this.cID = cID;
    }


    toJSON() {
        return {
            id: this.id,
            height: this.height,
            length: this.length,
            width: this.width,
            description: this.description,
            plate: this.plate,
            cID: this.cID
        };
    }
}
export default Car;