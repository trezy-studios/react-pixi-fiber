// Module imports
import { DefaultEventPriority } from 'react-reconciler/constants.js'
import Reconciler from 'react-reconciler'
import * as PIXI from 'pixi.js'





// Local imports
import { appendChild } from './helpers/appendChild.js'
import { applyProps } from './helpers/applyProps.js'
import { convertStringToPascalCase } from './helpers/convertStringToPascalCase.js'
import { removeChild } from './helpers/removeChild.js'





/** @type {Reconciler.HostConfig} */
const reconcilerConfig = {
	isPrimaryRenderer: false,
	noTimeout: -1,
  supportsHydration: false,
	supportsMutation: true,
  supportsPersistence: false,

	appendChild,
	appendChildToContainer: appendChild,
	appendInitialChild: appendChild,
  cancelTimeout: clearTimeout,
	removeChild,
	removeChildFromContainer: removeChild,
  scheduleTimeout: setTimeout,

	afterActiveInstanceBlur() {},
	beforeActiveInstanceBlur() {},
	createTextInstance() {},
	detachDeletedInstance() {},
	getInstanceFromScope() {},
	insertBefore() {},
	preparePortalMount() {},
	prepareScopeUpdate() {},

	clearContainer() {
		return false
	},
	finalizeInitialChildren() {
		return false
	},
	getChildHostContext() {
		return {}
	},
	getCurrentEventPriority() {
		return DefaultEventPriority
	},
	getInstanceFromNode() {
		return null
	},
	getPublicInstance(instance) {
		return instance
	},
	getRootHostContext() {
		return {}
	},
	prepareForCommit() {
		return {}
	},
	prepareUpdate() {
		return {}
	},
	resetAfterCommit() {
		return {}
	},
	shouldSetTextContent() {
		return false
	},

	/**
	 *
	 * @param {*} instance
	 * @param {*} _updatePayload Unused.
	 * @param {*} _type Unused.
	 * @param {*} oldProps
	 * @param {*} newProps
	 */
	commitUpdate(instance, _updatePayload, _type, oldProps, newProps) {
		// This is where we mutate Pixi.js objects in the render phase
		instance.busy = true
		applyProps(instance, newProps, oldProps)
		instance.busy = false
	},

	/**
	 *
	 * @param {*} type
	 * @param {*} props
	 * @returns
	 */
	createInstance(type, props) {
		const {
			object,
			args,
			...remainingProps
		} = props

		// Convert lowercase primitive to PascalCase
		const name = convertStringToPascalCase(type)

		let instance

		// Get class from Pixi.js namespace
		const target = PIXI[name]

		// Validate Pixi.js elements
		if (type !== 'primitive' && !target) {
			throw `${type} is not a part of the Pixi.js namespace.`
		}

		// Validate primitives
		if (type === 'primitive' && !object) {
			throw '"object" must be set when using primitives.'
		}

		// Create instance
		instance = object || (Array.isArray(args) ? new target(...args) : new target(args))

		// Set initial props
		applyProps(instance, props, {})

		return instance
	},
}

export const reconciler = Reconciler(reconcilerConfig)
