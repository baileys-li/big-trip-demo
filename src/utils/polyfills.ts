if (Array.prototype.at === undefined) {
	Array.prototype.at = function (index: number) {
		return index >= 0 ? this[index] : this[this.length + index];
	};
}
