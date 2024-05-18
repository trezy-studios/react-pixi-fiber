/* eslint-disable @typescript-eslint/no-explicit-any */

// this does not make sense due to using infer often in this file,
// in those cases the variables/parameters are not used but the types are.
/* eslint-disable no-unused-vars */
import * as PIXI from 'pixi.js'
import * as React from 'react'

// in most cases the auto-generated names are correct but in some cases they are not
// for example the class name is `HTMLText` but the component name should be `htmlText`
export const nameOverrides = {
	HTMLText: 'htmlText',
} as const


type PixiType = typeof PIXI

type Options =
	| PIXI.ContainerOptions
	| PIXI.NineSliceSpriteOptions
	| PIXI.TilingSpriteOptions
	| PIXI.SpriteOptions
	| PIXI.MeshOptions
	| PIXI.GraphicsOptions
	| PIXI.TextOptions
	| PIXI.HTMLTextOptions;

type Overloads<T> = T extends {
	new (...args: infer A1): infer R1;
	new (...args: infer A2): infer R2;
	new (...args: infer A3): infer R3;
	new (...args: infer A4): infer R4;
}
	? [
			new (...args: A1) => R1,
			new (...args: A2) => R2,
			new (...args: A3) => R3,
			new (...args: A4) => R4
		]
	: T extends {
			new (...args: infer A1): infer R1;
			new (...args: infer A2): infer R2;
			new (...args: infer A3): infer R3;
		}
	? [new (...args: A1) => R1, new (...args: A2) => R2, new (...args: A3) => R3]
	: T extends {
			new (...args: infer A1): infer R1;
			new (...args: infer A2): infer R2;
		}
	? [new (...args: A1) => R1, new (...args: A2) => R2]
	: T extends {
			new (...args: infer A1): infer R1;
		}
	? [new (...args: A1) => R1]
	: any;

type ConstructorWithOneParam<T extends new (...args: any[]) => any> =
	T extends new (args: infer A) => any ? A : never;

type ConstructorParams<T extends new (...args: any[]) => any> =
	ConstructorWithOneParam<Overloads<T>[number]>;

// type TargetKeys = keyof Omit<
// 	PixiType,
// 	| 'Application'
// 	| 'ApplicationOptions'
// 	| `${string}Blend`
// 	| `${string}Plugin`
// 	| 'Loader'
// 	| `${string}Loader`
// 	| 'Assets'
// 	| `${string}Class`
// 	| `${string}Renderer`
// 	| `${string}System`
// 	| `${string}Event`
// 	| `${string}Pipe`
// 	| `${string}Pass`
// 	| 'RenderTarget'
// 	| `${string}RenderTarget`
// 	| `${string}RenderTargetAdaptor`
// 	| `${string}Data`
// 	| 'Batch'
// 	| 'BatchTextureArray'

// // for now
// 	| `${string}Filter`
// 	| 'AlphaMask'
// >;

type TargetKeys =
	| 'Container'
	| 'AnimatedSprite'
	| 'NineSliceSprite'
	| 'TilingSprite'
	| 'Mesh'
	| 'Sprite'
	| 'Graphics'
	| 'Text'
	| 'HTMLText';

type AutoFilteredKeys = {
	[K in keyof PixiType]: K extends TargetKeys
		? PixiType[K] extends new (...args: any) => any
			? K
			: never
		: never;
}[keyof PixiType];


type OptionsType<T> = T extends Options ? T : never

// this computes the correct props for each component with the original name since we need
// the name to index into PixiType
type PixiElements = {
	[K in AutoFilteredKeys]: [
		K extends keyof typeof nameOverrides ? typeof nameOverrides[K] : Uncapitalize<K>,
			React.PropsWithChildren<
				OptionsType<ConstructorParams<PixiType[K]>>
				& { init?: ConstructorParams<PixiType[K]> }
		> & React.PropsWithRef<{ ref?: React.MutableRefObject<InstanceType<PixiType[K]>> }>
	];
};

// because the names of the components are not the same as the pixi class names we convert
// our record of KV pairs a record with the correct keys and values.
type PixiElementsImpl = {
	[K in keyof PixiElements as PixiElements[K][0]]: PixiElements[K][1];
};

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace React.JSX {
		interface IntrinsicElements extends PixiElementsImpl {}
	}
}
