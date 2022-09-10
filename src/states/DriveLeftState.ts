export default class DriveLeftState
{
    /** @type {Phaser.Physics.Arcade.Sprite} */
    vehicle

    /**
     * @param {Phaser.Physics.Arcade.Sprite} vehicle
     */
    constructor(vehicle)
    {
        this.vehicle = vehicle
    }

    enter()
    {
        this.vehicle.play('left-drive')

        const speed = 200
        this.vehicle.setVelocity(-speed, 0)
    }
}