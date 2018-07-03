var hatLib = require("motor-hat");

export default class Steppers {
	private motorHat: any;

	constructor(address: number) {
		this.motorHat = hatLib(
			{
				address: address,
				steppers: [
					{ W1: 'M1', W2: 'M2' },
					{ W1: 'M3', W2: 'M4' },
				],
			});
		this.motorHat.init();
		this.motorHat.steppers[0].setSteps(48);
		this.motorHat.steppers[1].setSteps(48);
		this.motorHat.steppers[0].setSpeed({ rpm: 50 });
		this.motorHat.steppers[1].setSpeed({ rpm: 50 });
	}

	public async Step(motor: number, steps: number) {
		return new Promise<any>((resolve, reject) => {
			this.motorHat.steppers[motor].step(steps > 0 ? "fwd" : "back", Math.abs(steps), (err: any, result: any) => {
				if (err) {
					reject(err);
				} else {
					resolve(result);
				}
			});
		});
	}

	public async Rotate(degrees: number) {
		console.log("stepping");
		await Promise.all([
			this.Step(0, degrees),
			this.Step(1, -degrees),
		]);
		console.log("releasing");
		await this.ReleaseAll();
	}

	public async ReleaseAll(): Promise<void> {
		await Promise.all([
			this.Release(0),
			this.Release(1),
		]);
	}
	public async Release(motor: number): Promise<void> {
		return new Promise<any>((resolve, reject) => {
			this.motorHat.steppers[motor].release((err: any) => {
				if (err) {
					reject(err);
				} else {
					resolve();
				}
			});
		});
	}
}
