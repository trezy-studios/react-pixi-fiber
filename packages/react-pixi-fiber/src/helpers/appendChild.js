/**
 * Adds elements to our scene and attaches geometry and material to meshes.
 *
 * @param {*} parentInstance
 * @param {*} child
 * @returns
 */
export function appendChild(parentInstance, child) {
	if (!child) {
		return
	}

	parentInstance.addChild(child)
}
